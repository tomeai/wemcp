"use client"

import { useBreakpoint } from "@/app/hooks/use-breakpoint"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer"
import { DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { User } from "@phosphor-icons/react"
import type React from "react"
import { useState } from "react"
import { SettingsContent } from "./settings-content"

export function SettingsTrigger() {
  const [open, setOpen] = useState(false)
  const isMobile = useBreakpoint(768)

  const trigger = (
    <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
      <User className="size-4" />
      <span>Settings</span>
    </DropdownMenuItem>
  )

  if (isMobile) {
    return (
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerTrigger asChild>{trigger}</DrawerTrigger>
        <DrawerContent>
          <SettingsContent isDrawer onClose={() => setOpen(false)} />
        </DrawerContent>
      </Drawer>
    )
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="gap-0 p-0 sm:max-w-xl">
        <DialogHeader className="border-border border-b px-6 py-4">
          <DialogTitle>Settings</DialogTitle>
        </DialogHeader>
        <SettingsContent onClose={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  )
}
