"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Sparkles,
  ClipboardList,
  Search,
  LineChart,
  Menu,
  Bookmark,
  CalendarRange,
  Trophy,
  HelpCircle,
  FileText,
  BookOpen,
  Settings,
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetClose,
  SheetHeader,
  SheetTitle,
} from "./ui/sheet";
import { cn } from "@/lib/utils";
import { isLearningFocusRoute } from "@/lib/navigation/learning-focus";

interface TabItem {
  href: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  /** Pathname prefixes that should mark this tab active. */
  match: string[];
}

const TABS: TabItem[] = [
  { href: "/", label: "問題", icon: Sparkles, match: ["/quiz", "/q/"] },
  { href: "/mock-exam", label: "模試", icon: ClipboardList, match: ["/mock-exam"] },
  { href: "/search", label: "検索", icon: Search, match: ["/search"] },
  {
    href: "/account/dashboard",
    label: "進捗",
    icon: LineChart,
    // /my-progress is permanently redirected to /account/dashboard; keep the
    // prefix in match so a user mid-301 still sees the active state.
    match: ["/account", "/my-progress"],
  },
];

const SECONDARY_NAV: { href: string; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { href: "/bookmarks", label: "ブックマーク", icon: Bookmark },
  { href: "/study-plan", label: "学習計画", icon: CalendarRange },
  { href: "/success-stories", label: "合格体験記", icon: Trophy },
  { href: "/why-kakomon-ai", label: "過去問AIを選ぶ理由", icon: HelpCircle },
  { href: "/features", label: "機能特集", icon: Sparkles },
  { href: "/essays", label: "論述例", icon: FileText },
  { href: "/recommended-books", label: "推薦書籍", icon: BookOpen },
  { href: "/settings", label: "設定", icon: Settings },
];

function isActive(pathname: string | null, tab: TabItem): boolean {
  if (!pathname) return false;
  if (tab.href === "/") {
    if (pathname === "/") return true;
    return tab.match.some((m) => pathname.startsWith(m));
  }
  if (pathname === tab.href) return true;
  return tab.match.some((m) => pathname.startsWith(m));
}

/**
 * Mobile / tablet bottom tab bar. Provides one-thumb access to the four
 * primary destinations (問題 / 模試 / 検索 / 進捗) plus a メニュー sheet
 * with secondary destinations (settings, recommended books, etc). PC keeps
 * the existing top header untouched — this component is hidden at md+.
 *
 * Layout cooperation: the bar adds its own height (≈56px + safe-area) at
 * the bottom of the viewport via fixed positioning. A body-level
 * pb-[64px] md:pb-0 class added in the root layout reserves the space
 * so content does not sit underneath.
 */
export function MobileBottomNav() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = React.useState(false);

  // Hide the bottom tab bar inside focused learning flows (/quiz*, /q/*): those
  // render their own fixed bottom-0 CTA bar that this nav would overlap and
  // whose taps it would intercept on mobile (致命傷⑨). Hooks above run first.
  if (isLearningFocusRoute(pathname)) return null;

  return (
    <>
      <nav
        aria-label="モバイル底タブ"
        className="pb-safe fixed inset-x-0 bottom-0 z-30 border-t border-border bg-background/95 shadow-[0_-2px_10px_-6px_rgba(0,0,0,0.15)] backdrop-blur supports-[backdrop-filter]:bg-background/80 md:hidden print:hidden"
      >
        <ul className="mx-auto flex max-w-3xl items-stretch">
          {TABS.map((tab) => {
            const Icon = tab.icon;
            const active = isActive(pathname, tab);
            return (
              <li key={tab.href} className="flex-1">
                <Link
                  href={tab.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "relative flex min-h-[48px] flex-col items-center justify-center gap-0.5 px-1 pb-1.5 pt-2 text-[10px] font-medium leading-none transition-colors",
                    active
                      ? "text-primary"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {active && (
                    <span
                      aria-hidden="true"
                      className="absolute inset-x-3 top-0 h-0.5 rounded-b-full bg-primary"
                    />
                  )}
                  <Icon className="h-5 w-5" aria-hidden="true" />
                  <span>{tab.label}</span>
                </Link>
              </li>
            );
          })}
          <li className="flex-1">
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="メニューを開く"
              aria-expanded={menuOpen}
              className="relative flex min-h-[48px] w-full flex-col items-center justify-center gap-0.5 px-1 pb-1.5 pt-2 text-[10px] font-medium leading-none text-muted-foreground transition-colors hover:text-foreground"
            >
              <Menu className="h-5 w-5" aria-hidden="true" />
              <span>メニュー</span>
            </button>
          </li>
        </ul>
      </nav>

      <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
        <SheetContent
          side="right"
          className="flex w-[80vw] max-w-sm flex-col gap-4"
        >
          <SheetHeader>
            <SheetTitle>メニュー</SheetTitle>
          </SheetHeader>
          <nav aria-label="二次メニュー" className="flex flex-col gap-1 overflow-y-auto">
            {SECONDARY_NAV.map((item) => {
              const Icon = item.icon;
              return (
                <SheetClose asChild key={item.href}>
                  <Link
                    href={item.href}
                    className="flex min-h-[44px] items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-muted"
                  >
                    <Icon className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
                    {item.label}
                  </Link>
                </SheetClose>
              );
            })}
          </nav>
        </SheetContent>
      </Sheet>
    </>
  );
}
