"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Menu, Search } from "lucide-react";
import { isLearningFocusRoute } from "@/lib/navigation/learning-focus";
import { cn } from "@/lib/utils";
const tabs = [{ href: "/", label: "ホーム", icon: Home }, { href: "/search", label: "さがす", icon: Search }, { href: "/me", label: "メニュー", icon: Menu }];
export function MobileBottomNav() {
  const pathname = usePathname();
  if (isLearningFocusRoute(pathname) || pathname?.startsWith("/auth/") || pathname === "/account/delete") return null;
  return <nav aria-label="モバイル底タブ" className="mobile-bottom-nav fixed inset-x-0 bottom-0 z-30 border-t border-border bg-card md:hidden print:hidden"><ul className="mx-auto flex max-w-[640px]">{tabs.map(tab => {
    const active = tab.href === "/" ? pathname === "/" : pathname?.startsWith(tab.href) || tab.href === "/me" && pathname?.startsWith("/account");
    const Icon = tab.icon;
    return <li key={tab.href} className="flex-1"><Link href={tab.href} prefetch={false} aria-current={active ? "page" : undefined} className={cn("flex min-h-(--mobile-tab-height) flex-col items-center justify-center gap-0.5 text-[11px]", active ? "font-bold text-primary" : "text-muted-foreground")}><Icon className="size-[22px]" aria-hidden="true" />{tab.label}</Link></li>;
  })}</ul></nav>;
}
