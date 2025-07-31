"use client"

import { useBreakpoint } from "@/app/hooks/use-breakpoint"
import { useEffect, useState } from "react"
import { CommandHistory } from "./command-history"
import { DrawerHistory } from "./drawer-history"

export type ChatHistory = {
  id: string
  title: string
  created_at: string
}

export function History() {
  const isMobile = useBreakpoint(768)
  const [chatHistory, setChatHistory] = useState<ChatHistory[]>([])

  useEffect(() => {
    const fetchChatHistory = async () => {
      
      setChatHistory(chatHistory as ChatHistory[])
    }

    fetchChatHistory()
  }, [])

  const handleSaveEdit = async (id: string, newTitle: string) => {

  }

  const handleConfirmDelete = async (id: string) => {
    
  }

  if (isMobile) {
    return (
      <DrawerHistory
        chatHistory={chatHistory}
        onSaveEdit={handleSaveEdit}
        onConfirmDelete={handleConfirmDelete}
      />
    )
  }

  return (
    <CommandHistory
      chatHistory={chatHistory}
      onSaveEdit={handleSaveEdit}
      onConfirmDelete={handleConfirmDelete}
    />
  )
}
