import LayoutApp from "@/app/components/layout/layout-app"
import { cn } from "@/lib/utils"
import NewsContent from "./news-content"

export default function NewsPage() {
  return (
    // @ts-ignore
    <LayoutApp>
      <div
        className={cn(
          "@container/main relative flex h-full flex-col items-center justify-start pt-12 md:pt-16"
        )}
      >
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold mb-2">News</h1>
            <p className="text-gray-600">
              Compiled notes from the team
            </p>
          </div>

          {/* News Content (Client Component) */}
          <NewsContent />
        </div>
      </div>
    </LayoutApp>
  )
}
