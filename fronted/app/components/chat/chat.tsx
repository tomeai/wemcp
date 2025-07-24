"use client"

import { ChatInput } from "@/app/components/chat-input/chat-input"
import { Conversation } from "@/app/components/chat/conversation"

import {
  MESSAGE_MAX_LENGTH,
  REMAINING_QUERY_ALERT_THRESHOLD,
  SYSTEM_PROMPT_DEFAULT,
} from "@/app/lib/config"
import {
  Attachment,
  checkFileUploadLimit,
  processFiles,
} from "@/app/lib/file-handling"
import { API_ROUTE_CHAT } from "@/app/lib/routes"
import { toast } from "@/components/ui/toast"
import { cn } from "@/lib/utils"
import { Message, useChat } from "@ai-sdk/react"
import { AnimatePresence, motion } from "motion/react"
import { useCallback, useEffect, useMemo, useState } from "react"
import { DialogAuth } from "./dialog-auth"
import { FeedbackWidget } from "./feedback-widget"

type ChatProps = {
  initialMessages?: Message[]
  chatId?: string
  userId?: string
  preferredModel: string
  systemPrompt?: string
}

export default function Chat({
  initialMessages,
  chatId: propChatId,
  userId: propUserId,
  preferredModel,
  systemPrompt: propSystemPrompt,
}: ChatProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [hasDialogAuth, setHasDialogAuth] = useState(false)
  const [userId, setUserId] = useState<string | null>(propUserId || null)
  const [chatId, setChatId] = useState<string | null>(propChatId || null)
  const [files, setFiles] = useState<File[]>([])
  const [selectedModel, setSelectedModel] = useState(preferredModel)
  const [systemPrompt, setSystemPrompt] = useState(propSystemPrompt)

  const {
    messages,
    input,
    handleSubmit,
    status,
    error,
    reload,
    stop,
    setMessages,
    setInput,
    append,
  } = useChat({
    api: API_ROUTE_CHAT,
    initialMessages,
  })

  useEffect(() => {
    if (error) {
      let errorMsg = "Something went wrong."
      try {
        const parsed = JSON.parse(error.message)
        errorMsg = parsed.error || errorMsg
      } catch {
        errorMsg = error.message || errorMsg
      }
      toast({
        title: errorMsg,
        status: "error",
      })
    }
  }, [error])



  const isFirstMessage = useMemo(() => {
    return messages.length === 0
  }, [messages])

  // useEffect(() => {
  //   const createGuestUserEffect = async () => {
  //     if (!propUserId) {
  //       const storedGuestId = localStorage.getItem("guestId")
  //       if (storedGuestId) {
  //         setUserId(storedGuestId)
  //       } else {
  //         const newGuestId = crypto.randomUUID()
  //         localStorage.setItem("guestId", newGuestId)
  //         await createGuestUser(newGuestId)
  //         setUserId(newGuestId)
  //       }
  //     }
  //   }
  //   createGuestUserEffect()
  // }, [propUserId])

  const ensureChatExists = async () => {
    if (!userId) return null
    if (isFirstMessage) {
      try {
        // const newChatId = await createNewChat(
        //   userId,
        //   input,
        //   selectedModel,
        //   Boolean(propUserId),
        //   systemPrompt
        // )
        // setChatId(newChatId)
        // if (propUserId) {
        //   window.history.pushState(null, "", `/c/${newChatId}`)
        // }
        // return newChatId
      } catch (err: any) {
        let errorMessage = "Something went wrong."
        try {
          const parsed = JSON.parse(err.message)
          errorMessage = parsed.error || errorMessage
        } catch {
          errorMessage = err.message || errorMessage
        }
        toast({
          title: errorMessage,
          status: "error",
        })
        return null
      }
    }
    return chatId
  }

  const handleModelChange = useCallback(
    async (model: string) => {
      setSelectedModel(model)

      if (chatId) {
        // try {
        //   await updateChatModel(chatId, model)
        // } catch (err) {
        //   console.error("Failed to update chat model:", err)
        //   toast({
        //     title: "Failed to update chat model",
        //     status: "error",
        //   })
        // }
      }
    },
    [chatId]
  )

  const submit = async () => {
    if (!userId) {
      return
    }
    setIsSubmitting(true)

    const currentChatId = await ensureChatExists()

    if (!currentChatId) {
      setIsSubmitting(false)
      return
    }

    if (input.length > MESSAGE_MAX_LENGTH) {
      toast({
        title: `The message you submitted was too long, please submit something shorter. (Max ${MESSAGE_MAX_LENGTH} characters)`,
        status: "error",
      })
      setIsSubmitting(false)
      return
    }

    try {
      // const rateData = await checkRateLimits(userId, !!propUserId)

      // if (rateData.remaining === REMAINING_QUERY_ALERT_THRESHOLD) {
      //   toast({
      //     title: `Only ${rateData.remaining} query${rateData.remaining === 1 ? "" : "ies"} remaining today.`,
      //     status: "info",
      //   })
      // }
    } catch (err) {
      setIsSubmitting(false)
      console.error("Rate limit check failed:", err)
    }

    let newAttachments: Attachment[] = []
    if (files.length > 0) {
      try {
        await checkFileUploadLimit(userId)
      } catch (error: any) {
        if (error.code === "DAILY_FILE_LIMIT_REACHED") {
          toast({ title: error.message, status: "error" })
          setIsSubmitting(false)
          return
        }
      }

      const processedAttachments = await processFiles(
        files,
        currentChatId,
        userId
      )

      newAttachments = processedAttachments
      setFiles([])
    }

    const options = {
      body: {
        chatId: currentChatId,
        userId,
        model: selectedModel,
        isAuthenticated: !!propUserId,
        systemPrompt: systemPrompt || SYSTEM_PROMPT_DEFAULT,
      },
      experimental_attachments: newAttachments || undefined,
    }

    handleSubmit(undefined, options)
    setInput("")
    setIsSubmitting(false)
  }

  const handleDelete = (id: string) => {
    setMessages(messages.filter((message) => message.id !== id))
  }

  const handleEdit = (id: string, newText: string) => {
    setMessages(
      messages.map((message) =>
        message.id === id ? { ...message, content: newText } : message
      )
    )
  }

  const handleInputChange = useCallback(
    (value: string) => {
      setInput(value)
    },
    [setInput]
  )

  const handleFileUpload = useCallback((newFiles: File[]) => {
    setFiles((prev) => [...prev, ...newFiles])
  }, [])

  const handleFileRemove = useCallback((file: File) => {
    setFiles((prev) => prev.filter((f) => f !== file))
  }, [])

  const handleSuggestion = useCallback(
    async (suggestion: string) => {
      const currentChatId = await ensureChatExists()

      const options = {
        body: {
          chatId: currentChatId,
          userId,
          model: selectedModel,
          isAuthenticated: !!propUserId,
          systemPrompt: "You are a helpful assistant.",
        },
      }

      append(
        {
          role: "user",
          content: suggestion,
        },
        options
      )
    },
    [ensureChatExists, userId, selectedModel, propUserId, append]
  )

  const handleSelectSystemPrompt = useCallback((newSystemPrompt: string) => {
    setSystemPrompt(newSystemPrompt)
  }, [])

  const handleReload = () => {
    const options = {
      body: {
        chatId,
        userId,
        model: selectedModel,
        isAuthenticated: !!propUserId,
        systemPrompt: systemPrompt || "You are a helpful assistant.",
      },
    }

    reload(options)
  }

  return (
    <div
      className={cn(
        "@container/main relative flex h-full flex-col items-center justify-end md:justify-center"
      )}
    >
      {/*<DialogAuth open={hasDialogAuth} setOpen={setHasDialogAuth} />*/}
      <AnimatePresence initial={false} mode="popLayout">
        {isFirstMessage ? (
          <motion.div
            key="onboarding"
            className="absolute bottom-[60%] mx-auto max-w-[50rem] md:relative md:bottom-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            layout="position"
            layoutId="onboarding"
            transition={{
              layout: {
                duration: 0,
              },
            }}
          >
            <h1 className="mb-6 text-3xl font-medium tracking-tight">
              What's on your mind?
            </h1>
          </motion.div>
        ) : (
          <Conversation
            key="conversation"
            messages={messages}
            status={status}
            onDelete={handleDelete}
            onEdit={handleEdit}
            onReload={handleReload}
          />
        )}
      </AnimatePresence>
      <motion.div
        className={cn(
          "relative inset-x-0 bottom-0 z-50 mx-auto w-full max-w-3xl"
        )}
        layout="position"
        layoutId="chat-input-container"
        transition={{
          layout: {
            duration: messages.length === 1 ? 0.3 : 0,
          },
        }}
      >
        <ChatInput
          value={input}
          onSuggestion={handleSuggestion}
          onValueChange={handleInputChange}
          onSend={submit}
          isSubmitting={isSubmitting}
          files={files}
          onFileUpload={handleFileUpload}
          onFileRemove={handleFileRemove}
          hasSuggestions={isFirstMessage}
          onSelectModel={handleModelChange}
          onSelectSystemPrompt={handleSelectSystemPrompt}
          selectedModel={selectedModel}
          isUserAuthenticated={!!propUserId}
          systemPrompt={systemPrompt}
          stop={stop}
          status={status}
        />
      </motion.div>
      <FeedbackWidget authUserId={propUserId} />
    </div>
  )
}
