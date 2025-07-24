import LayoutApp from "@/app/components/layout/layout-app"
import { cn } from "@/lib/utils"
import Footer from "@/app/components/layout/footer"
import SearchPage from "./search-page"

export default function McpPage() {
  return (
    <LayoutApp>
      <div
        className={cn(
          "@container/main relative flex h-full flex-col items-center justify-start pt-12 md:pt-16"
        )}
      >
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold mb-2">Explore MCP Servers</h1>
            <p className="text-gray-600">
              This registry documents the capabilities of 418 tools across 170 MCP servers.
            </p>
          </div>

          {/* Client Component for interactive elements */}
          <SearchPage />
          
          {/* Footer */}
          <Footer />
        </div>
      </div>
    </LayoutApp>
  )
}
