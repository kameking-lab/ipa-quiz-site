"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Search, UserRound } from "lucide-react";
import { isLearningFocusRoute } from "@/lib/navigation/learning-focus";
import { cn } from "@/lib/utils";
const tabs = [{ href: "/", label: "ホーム", icon: Home }, { href: "/search", label: "さがす", icon: Search }, { href: "/me", label: "わたし", icon: UserRound }];
export function MobileBottomNav() {
  const pathname = usePathname();
  if (isLearningFocusRoute(pathname) || pathname?.startsWith("/auth/") || pathname === "/account/delete") return null;
  return <nav aria-label="モバイル底タブ" className="mobile-bottom-nav pb-safe fixed inset-x-0 bottom-0 z-30 border-t border-border bg-background/95 backdrop-blur md:hidden print:hidden"><ul className="mx-auto flex max-w-[640px]">{tabs.map(tab => {
    const active = tab.href === "/" ? pathname === "/" : pathname?.startsWith(tab.href) || tab.href === "/me" && pathname?.startsWith("/account");
    const Icon = tab.icon;
    return <li key={tab.href} className="flex-1"><Link href={tab.href} prefetch={false} aria-current={active ? "page" : undefined} className={cn("flex min-h-14 flex-col items-center justify-center gap-1 text-[11px]", active ? "font-semibold text-primary" : "text-muted-foreground")}><Icon className="h-5 w-5" aria-hidden="true" />{tab.label}</Link></li>;
  })}</ul></nav>;
}
