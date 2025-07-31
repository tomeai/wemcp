"use client"

import { APP_NAME } from "@/app/lib/config"
import { cn } from "@/lib/utils"
import { useState } from "react"
import { CodeBlock, CodeBlockCode } from "@/components/prompt-kit/code-block"
import { ButtonCopy } from "@/components/common/button-copy"
import Footer from "@/app/components/layout/footer"

export default function HomePage() {
  const [hasDialogAuth, setHasDialogAuth] = useState(false)

  return (
    <div
      className={cn(
        "@container/main relative flex min-h-screen flex-col items-center justify-start pt-16"
      )}
    >
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="relative">
          <img
            src="/bg.webp"
            alt={`calm paint generate by ${APP_NAME}`}
            className="h-120 w-full object-cover rounded-md"
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center p-6">
            <h1 className="text-3xl font-bold text-center mb-2 text-white drop-shadow-lg">Awesome Mcp Server</h1>
            <p className="text-center mb-4 text-white drop-shadow-lg">The largest collection of MCP Servers.</p>
            <div className="w-full flex justify-center">
              <div className="w-1/2 mb-6 relative">
                <CodeBlock>
                  <div className="absolute right-2 top-2">
                    <ButtonCopy code={`from openai import OpenAI

client = OpenAI(
    base_url="https://api.opentools.com",
    api_key="<OPENTOOLS_API_KEY>"
)

completion = client.chat.completions.create(
    model="anthropic/claude-3.7-sonnet",
    messages=[
        { "role": "user", "content": "Compare specs of top 5 EVs on caranddriver.com" }
    ],
    tools=[{ "type": "mcp", "ref": "firecrawl" }]
)`} />
                  </div>
                  <CodeBlockCode 
                    code={`from openai import OpenAI

client = OpenAI(
    base_url="https://api.opentools.com",
    api_key="<OPENTOOLS_API_KEY>"
)

completion = client.chat.completions.create(
    model="anthropic/claude-3.7-sonnet",
    messages=[
        { "role": "user", "content": "Compare specs of top 5 EVs on caranddriver.com" }
    ],
    tools=[{ "type": "mcp", "ref": "firecrawl" }]
)`} 
                    language="python"
                  />
                </CodeBlock>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-12 flex flex-col md:flex-row items-center justify-between px-4 md:px-6">
          <div className="w-full md:w-1/2 pr-0 md:pr-8">
            <h2 className="text-2xl font-bold mb-4">Switch LLMs seamlessly</h2>
            <p className="text-gray-700">
              Use any LLM you want — your application stays resilient against outages. 
              Our API is OpenAI-compatible and backwards compatible with traditional function calling.
            </p>
          </div>
          <div className="w-full md:w-1/2 mt-6 md:mt-0 flex justify-center">
            <img 
              src="/multi-model.svg" 
              alt="Multiple LLM models illustration" 
              className="max-w-full h-auto"
            />
          </div>
        </div>
        
        <div className="mt-16 px-4 md:px-6">
          <h2 className="text-3xl font-bold text-center mb-2">FAQ</h2>
          <p className="text-center text-gray-700 mb-8">Frequently Asked Questions about MCP Servers</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="space-y-6">
              <div className="border border-gray-200 rounded-lg p-6 shadow-sm">
                <h3 className="text-lg font-semibold mb-2">What is an MCP Server?</h3>
                <p className="text-gray-700">
                  MCP (Model Context Protocol) Servers are specialized servers that extend AI capabilities by providing tools and resources that can connect to external APIs, databases, and services.
                </p>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-6 shadow-sm">
                <h3 className="text-lg font-semibold mb-2">How do I create an MCP Server?</h3>
                <p className="text-gray-700">
                  You can create an MCP Server using the MCP SDK. Start with the create-typescript-server tool to bootstrap a new project, then implement your server logic using the SDK's APIs.
                </p>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-6 shadow-sm">
                <h3 className="text-lg font-semibold mb-2">What are MCP Resources?</h3>
                <p className="text-gray-700">
                  MCP Resources represent any kind of UTF-8 encoded data that an MCP server wants to make available to clients, such as database records, API responses, log files, and more.
                </p>
              </div>
            </div>
            
            {/* Right Column */}
            <div className="space-y-6">
              <div className="border border-gray-200 rounded-lg p-6 shadow-sm">
                <h3 className="text-lg font-semibold mb-2">What are MCP Tools?</h3>
                <p className="text-gray-700">
                  MCP Tools enable servers to expose executable functionality to AI systems. Through these tools, AI can interact with external systems, perform computations, and take actions in the real world.
                </p>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-6 shadow-sm">
                <h3 className="text-lg font-semibold mb-2">How do I connect to an MCP Server?</h3>
                <p className="text-gray-700">
                  You can connect to an MCP Server by adding its configuration to your MCP settings file. This includes specifying the command to run the server, any arguments, and environment variables.
                </p>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-6 shadow-sm">
                <h3 className="text-lg font-semibold mb-2">Can MCP Servers handle authentication?</h3>
                <p className="text-gray-700">
                  Yes, MCP Servers can handle authentication through environment variables provided in the MCP settings configuration. However, they operate in a non-interactive environment and cannot initiate OAuth flows.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <Footer />
      </div>
    </div>
  )
}
