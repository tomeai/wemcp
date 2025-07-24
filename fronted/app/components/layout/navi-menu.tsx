"use client"

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { List } from "@phosphor-icons/react"
import Link from "next/link"
import { useState } from "react"

export function NaviMenu() {
  const [open, setOpen] = useState(false)

  const linkClass =
    "font-base text-muted-foreground hover:text-foreground text-base transition-colors"
  const mobileLinkClass = "font-base text-foreground text-lg py-3 block"

  return (
    <>
      {/* Desktop Navigation */}
      <div className="hidden items-center gap-6 text-xl font-medium md:flex">
        <Link href="/registry" className={linkClass}>
          Registry
        </Link>
        <Link href="/feed" className={linkClass}>
          Feed
        </Link>
        {/* <Link href="/pricing" className={linkClass}>
          Pricing
        </Link> */}
        <Link href="/news" className={linkClass}>
          News
        </Link>
        <Link href="/docs" className={linkClass}>
          Docs
        </Link>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <button className="text-muted-foreground hover:text-foreground p-2">
              <List size={24} />
            </button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[250px] pt-12">
            <nav className="flex flex-col">
              <Link
                href="/registry"
                className={mobileLinkClass}
                onClick={() => setOpen(false)}
              >
                Registry
              </Link>
              <Link
                href="/feed"
                className={mobileLinkClass}
                onClick={() => setOpen(false)}
              >
                Feed
              </Link>
              {/* <Link 
                href="/pricing" 
                className={mobileLinkClass}
                onClick={() => setOpen(false)}
              >
                Pricing
              </Link> */}
              <Link
                href="/news"
                className={mobileLinkClass}
                onClick={() => setOpen(false)}
              >
                News
              </Link>
              <Link
                href="/docs"
                className={mobileLinkClass}
                onClick={() => setOpen(false)}
              >
                Docs
              </Link>
              <Link
                href="/auth"
                className={mobileLinkClass}
                onClick={() => setOpen(false)}
              >
                Sign in
              </Link>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </>
  )
}
