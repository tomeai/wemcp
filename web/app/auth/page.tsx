"use client"

import { signInWithGithub } from "@/app/lib/api"
import { APP_NAME } from "@/app/lib/config"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useState } from "react"
import { HeaderGoBack } from "../components/header-go-back"

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)


  async function handleSignInWithGithub() {
    try {
      setIsLoading(true)
      setError(null)

      const data = await signInWithGithub()

      // Redirect to the provider URL
      if (data?.url) {
        window.location.href = data.url
      }
    } catch (err: any) {
      console.error("Error signing in with Github:", err)
      setError(err.message || "An unexpected error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="bg-background flex h-screen flex-col">
      <HeaderGoBack href="/" />

      <main className="flex flex-1 flex-col items-center justify-center px-4 sm:px-6">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h1 className="text-foreground text-3xl font-medium tracking-tight sm:text-4xl">
              Welcome to {APP_NAME}
            </h1>
            <p className="text-muted-foreground mt-3">
              Sign in below to increase your message limits.
            </p>
          </div>
          {error && (
            <div className="bg-destructive/10 text-destructive rounded-md p-3 text-sm">
              {error}
            </div>
          )}
          <div className="mt-8">
            <Button
              variant="secondary"
              className="w-full text-base sm:text-base"
              size="lg"
              onClick={handleSignInWithGithub}
              disabled={isLoading}
            >
              <img
                src="https://www.github.com/favicon.ico"
                alt="Github logo"
                width={20}
                height={20}
                className="mr-2 size-4"
              />
              <span>
                {isLoading ? "Connecting..." : "Continue with Github"}
              </span>
            </Button>
          </div>
        </div>
      </main>

      <footer className="text-muted-foreground py-6 text-center text-sm">
        {/* @todo */}
        <p>
          By continuing, you agree to our{" "}
          <Link href="/" className="text-foreground hover:underline">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link href="/" className="text-foreground hover:underline">
            Privacy Policy
          </Link>
        </p>
      </footer>
    </div>
  )
}
