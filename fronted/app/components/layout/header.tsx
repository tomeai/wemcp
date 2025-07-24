"use client";

import { History } from "@/app/components/history/history";
import { AppInfoTrigger } from "@/app/components/layout/app-info/app-info-trigger";
import { NaviMenu } from "@/app/components/layout/navi-menu";
import { UserMenu } from "@/app/components/layout/user-menu";
import { useUser } from "@/app/providers/user-provider";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { APP_NAME } from "../../lib/config"
import { ButtonNewChat } from "./button-new-chat";
import { Info } from "@phosphor-icons/react"


export function Header() {
  const { user, isJwtAuthenticated } = useUser()
  const isLoggedIn = !!user || isJwtAuthenticated

  return (
    <header className="h-app-header fixed left-0 right-0 top-0 z-50">
      <div className="bg-background relative mx-auto flex h-full max-w-6xl items-center justify-between px-4 sm:px-6 lg:bg-transparent lg:px-8">
        <div className="flex items-center gap-8">
          <Link href="/" className="text-xl font-medium tracking-tight">
            {APP_NAME}
          </Link>
          <div className="hidden md:block">
            <NaviMenu />
          </div>
        </div>
        
        <div className="flex items-center">
          {!isLoggedIn ? (
            <>
              <div className="hidden md:flex items-center gap-4">
                <AppInfoTrigger
                  trigger={
                    <Button
                      variant="ghost"
                      size="icon"
                      className="bg-background/80 hover:bg-muted text-muted-foreground h-8 w-8 rounded-full"
                      aria-label={`About ${APP_NAME}`}
                    >
                      <Info className="size-4" />
                    </Button>
                  }
                />
                <Link
                  href="/auth"
                  className="font-base text-muted-foreground hover:text-foreground text-base transition-colors"
                >
                  Login
                </Link>
              </div>
              <div className="md:hidden">
                <NaviMenu />
              </div>
            </>
          ) : (
            <>
              <div className="flex items-center gap-4">
                <ButtonNewChat />
                <History />
                <UserMenu />
              </div>
              <div className="md:hidden ml-4">
                <NaviMenu />
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  )
}
