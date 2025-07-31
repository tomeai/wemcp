import LayoutApp from "@/app/components/layout/layout-app"
import { cn } from "@/lib/utils"
import PricingContent from "./pricing-content"

export default function PricingPage() {
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
            <h1 className="text-3xl font-bold mb-2">Pricing</h1>
            <p className="text-gray-600">
              Choose the plan that works for you
            </p>
          </div>

          {/* Pricing Content (Client Component) */}
          <PricingContent />
        </div>
      </div>
    </LayoutApp>
  )
}
