"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { SiteLogo } from "./SiteLogo";
import { StreakBadge } from "@/lib/streak/StreakBadge";

const navLink = "inline-flex min-h-11 items-center gap-2 rounded-lg px-3 text-sm font-medium hover:bg-muted focus-visible:outline-2 focus-visible:outline-primary";

export function SiteHeader() {
  const pathname = usePathname();
  return (
    <header className={`sticky top-0 z-40 w-full border-b border-border bg-background/95 ${pathname === "/me" ? "hidden md:block" : ""}`}>
      <div className={`mx-auto flex h-14 w-full items-center justify-between gap-2 px-4 sm:px-6 ${pathname === "/" ? "max-w-[640px]" : "max-w-6xl"}`}>
        <Link href="/" prefetch={false} aria-label="過去問AI ホーム" className="inline-flex min-h-11 items-center rounded-lg">
          <SiteLogo />
        </Link>
        <nav aria-label="グローバルナビゲーション" className="flex items-center">
          <Link href="/search" className={`hidden md:inline-flex ${navLink}`}>さがす</Link>
          <StreakBadge className="hidden sm:inline-flex" />
          <Link href="/me" className={navLink} aria-current={pathname === "/me" ? "page" : undefined}>
            <Menu aria-hidden="true" className="size-4" />
            メニュー
          </Link>
        </nav>
      </div>
    </header>
  );
}
