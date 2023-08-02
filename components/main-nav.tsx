"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import { NavItem } from "@/types/nav"
import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { Icons } from "@/components/icons"

interface MainNavProps {
  items?: NavItem[]
}

export function MainNav({ items }: MainNavProps) {
  const pathname = usePathname()

  return (
    <div className="flex gap-6 md:gap-10">
      <Link href="/" className="ml-4 flex items-center space-x-2">
        <Icons.logo className="h-6 w-6" />
        <span className="inline-block font-bold">{siteConfig.name}</span>
      </Link>
      {items?.length ? (
        <nav className="flex gap-6">
          <Link
            href="/"
            className={cn(
              pathname === "/" ? "text-foreground" : "text-foreground/60",
              pathname === "/" && "font-bold",
              "flex items-center text-sm text-muted-foreground transition-colors hover:text-foreground/80"
            )}
          >
            Home
          </Link>
          {items?.map(
            (item, index) =>
              item.href && (
                <Link
                  key={index}
                  href={item.href}
                  className={cn(
                    // "transition-colors hover:text-foreground/80",
                    // pathname?.startsWith(item.href)
                    //   ? "text-foreground font-bold"
                    //   : "text-foreground/60"
                    pathname?.startsWith(item.href)
                      ? "text-foreground"
                      : "text-foreground/60",
                    pathname?.startsWith(item.href) && "font-bold",
                    "flex items-center text-sm text-muted-foreground transition-colors hover:text-foreground/80",
                    item.disabled && "cursor-not-allowed opacity-80"
                  )}
                >
                  {item.title}
                </Link>
              )
          )}
        </nav>
      ) : null}
    </div>
  )
}
