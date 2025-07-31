import React from "react"
import { APP_DESCRIPTION } from "@/app/lib/config"

export function AppInfoContent() {
  return (
    <div className="space-y-4">
      <p className="text-foreground leading-relaxed">
        {APP_DESCRIPTION} Built with Vercel's AI SDK, Supabase, and prompt-kit
        components.
      </p>
      <p className="text-foreground leading-relaxed">
        The code is available on{" "}
        <a
          href="https://github.com/ibelick/zola"
          target="_blank"
          rel="noopener noreferrer"
          className="underline"
        >
          GitHub
        </a>
        . Made by{" "}
        <a
          href="https://twitter.com/ibelick"
          target="_blank"
          rel="noopener noreferrer"
          className="underline"
        >
          @ibelick
        </a>
        .
      </p>
    </div>
  )
}
