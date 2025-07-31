import LayoutApp from "@/app/components/layout/layout-app"
import { cn } from "@/lib/utils"
import Link from "next/link"
import DocsContent from "@/app/docs/docs-content"
import { Button } from "@/components/ui/button"
import { Upload, FileText } from "lucide-react"
import Footer from "@/app/components/layout/footer"

export default function DocsPage() {
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
            <h1 className="text-3xl font-bold mb-2">Documentation</h1>
            <p className="text-gray-600 mb-4">
              Comprehensive guides and references
            </p>
            {/* <div className="flex justify-center gap-4">
              <Link href="/docs/upload">
                <Button variant="outline" className="flex items-center gap-2">
                  <Upload size={16} />
                  Upload Markdown
                </Button>
              </Link>
              <Link href="/docs/editor">
                <Button variant="outline" className="flex items-center gap-2">
                  <FileText size={16} />
                  Markdown Editor
                </Button>
              </Link>
            </div> */}
          </div>

          {/* Docs Content (Client Component) */}
          <DocsContent />
          <Footer />
        </div>
      </div>
    </LayoutApp>
  )
}
