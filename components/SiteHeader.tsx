"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu,
  Settings,
  ChevronDown,
  Search,
  Bookmark,
  ClipboardList,
  CalendarRange,
  Trophy,
  Sparkles,
  HelpCircle,
  FileText,
  BookOpen,
  LineChart,
} from "lucide-react";
import { SiteLogo } from "./SiteLogo";
import { StreakBadge } from "@/lib/streak/StreakBadge";
import { ThemeToggle } from "./ThemeToggle";
import { cn } from "@/lib/utils";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
  SheetHeader,
  SheetTitle,
} from "./ui/sheet";

const QUIZ_MODES = [
  { href: "/quiz?mode=random&exam=ap", label: "通常クイズ" },
  { href: "/quiz/stream", label: "ストリームモード" },
  { href: "/quiz?mode=review&exam=ap", label: "復習モード" },
  { href: "/quiz?mode=weakness&exam=ap", label: "弱点克服" },
  { href: "/essays/sc", label: "論述例（SC）" },
] as const;

export function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [dropOpen, setDropOpen] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isQuizActive =
    pathname?.startsWith("/quiz") || pathname?.startsWith("/mock-exam");
  const isAccountActive = pathname?.startsWith("/account");
  const isBooksActive = pathname?.startsWith("/recommended-books");
  const isSearchActive = pathname?.startsWith("/search");
  const isBookmarksActive = pathname?.startsWith("/bookmarks");
  const isMockExamActive = pathname?.startsWith("/mock-exam");

  return (
    <header
      className={cn(
        "sticky top-0 z-40 w-full transition-all duration-150",
        scrolled
          ? "surface-glass border-b border-border"
          : "border-b border-transparent",
      )}
    >
      <div className="mx-auto flex h-14 w-full max-w-6xl items-center justify-between gap-3 px-4 sm:px-6">
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="flex min-h-[44px] items-center rounded-md outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            aria-label="過去問AI ホーム"
          >
            <SiteLogo />
          </Link>

          {/* Desktop nav */}
          <nav
            className="hidden items-center gap-0.5 md:flex"
            aria-label="グローバルナビゲーション"
          >
            {/* 問題を解く dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setDropOpen(true)}
              onMouseLeave={() => setDropOpen(false)}
              onBlur={(e) => {
                if (!e.currentTarget.contains(e.relatedTarget as Node | null)) {
                  setDropOpen(false);
                }
              }}
            >
              <button
                onClick={() => setDropOpen((v) => !v)}
                onKeyDown={(e) => {
                  if (e.key === "Escape") setDropOpen(false);
                }}
                className={cn(
                  "flex items-center gap-1 rounded-md px-3 py-1.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                  isQuizActive
                    ? "text-foreground"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground",
                )}
                aria-haspopup="true"
                aria-expanded={dropOpen}
              >
                問題を解く
                <ChevronDown className="h-3.5 w-3.5" aria-hidden="true" />
              </button>
              {dropOpen && (
                <ul
                  className="absolute left-0 top-full z-50 mt-1 w-48 list-none rounded-xl border border-border bg-background py-1 shadow-lg"
                  aria-label="問題を解くメニュー"
                >
                  {QUIZ_MODES.map((m) => (
                    <li key={m.href}>
                      <Link
                        href={m.href}
                        className="block rounded-md px-4 py-2 text-sm text-foreground transition-colors hover:bg-muted focus-visible:bg-muted focus-visible:outline-none"
                        onClick={() => setDropOpen(false)}
                      >
                        {m.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <Link
              href="/mock-exam"
              className={cn(
                "flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                isMockExamActive
                  ? "text-foreground"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground",
              )}
              aria-current={isMockExamActive ? "page" : undefined}
            >
              <ClipboardList className="h-4 w-4" aria-hidden="true" />
              模試
            </Link>
            <Link
              href="/search"
              className={cn(
                "flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                isSearchActive
                  ? "text-foreground"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground",
              )}
              aria-current={isSearchActive ? "page" : undefined}
            >
              <Search className="h-4 w-4" aria-hidden="true" />
              検索
            </Link>
            <Link
              href="/bookmarks"
              className={cn(
                "flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                isBookmarksActive
                  ? "text-foreground"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground",
              )}
              aria-current={isBookmarksActive ? "page" : undefined}
            >
              <Bookmark className="h-4 w-4" aria-hidden="true" />
              ブックマーク
            </Link>
            <Link
              href="/account/dashboard"
              className={cn(
                "rounded-md px-3 py-1.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                isAccountActive
                  ? "text-foreground"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground",
              )}
              aria-current={isAccountActive ? "page" : undefined}
            >
              学習進捗
            </Link>
            <Link
              href="/recommended-books"
              className={cn(
                "rounded-md px-3 py-1.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                isBooksActive
                  ? "text-foreground"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground",
              )}
              aria-current={isBooksActive ? "page" : undefined}
            >
              推薦書籍
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-2">
          <StreakBadge className="hidden sm:inline-flex" />
          <Link
            href="/settings"
            className="hidden h-10 w-10 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background md:flex"
            aria-label="設定"
          >
            <Settings className="h-4 w-4" aria-hidden="true" />
          </Link>

          {/* Mobile menu */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <button
                className="inline-flex h-11 w-11 items-center justify-center rounded-md text-muted-foreground transition hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring md:hidden"
                aria-label="メニューを開く"
              >
                <Menu className="h-5 w-5" />
              </button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="flex w-[80vw] max-w-sm flex-col gap-6"
            >
              <SheetHeader>
                <SheetTitle className="flex items-center gap-2">
                  <SiteLogo />
                </SheetTitle>
              </SheetHeader>
              <nav
                className="flex flex-col gap-1 overflow-y-auto"
                aria-label="モバイルナビゲーション"
              >
                <p className="px-3 pb-1 pt-0.5 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                  問題演習
                </p>
                {QUIZ_MODES.map((m) => (
                  <SheetClose asChild key={m.href}>
                    <Link
                      href={m.href}
                      className="flex min-h-[44px] items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-muted"
                    >
                      <Sparkles
                        className="h-4 w-4 text-muted-foreground"
                        aria-hidden="true"
                      />
                      {m.label}
                    </Link>
                  </SheetClose>
                ))}
                <SheetClose asChild>
                  <Link
                    href="/mock-exam"
                    className="flex min-h-[44px] items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-muted"
                  >
                    <ClipboardList
                      className="h-4 w-4 text-muted-foreground"
                      aria-hidden="true"
                    />
                    模試
                  </Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link
                    href="/search"
                    className="flex min-h-[44px] items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-muted"
                  >
                    <Search
                      className="h-4 w-4 text-muted-foreground"
                      aria-hidden="true"
                    />
                    検索
                  </Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link
                    href="/bookmarks"
                    className="flex min-h-[44px] items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-muted"
                  >
                    <Bookmark
                      className="h-4 w-4 text-muted-foreground"
                      aria-hidden="true"
                    />
                    ブックマーク
                  </Link>
                </SheetClose>

                <div className="my-2 border-t border-border" />
                <p className="px-3 pb-1 pt-0.5 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                  学習計画
                </p>
                <SheetClose asChild>
                  <Link
                    href="/account/dashboard"
                    className="flex min-h-[44px] items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-muted"
                  >
                    <LineChart
                      className="h-4 w-4 text-muted-foreground"
                      aria-hidden="true"
                    />
                    学習進捗
                  </Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link
                    href="/study-plan"
                    className="flex min-h-[44px] items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-muted"
                  >
                    <CalendarRange
                      className="h-4 w-4 text-muted-foreground"
                      aria-hidden="true"
                    />
                    学習計画
                  </Link>
                </SheetClose>

                <div className="my-2 border-t border-border" />
                <p className="px-3 pb-1 pt-0.5 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                  サービス紹介
                </p>
                <SheetClose asChild>
                  <Link
                    href="/why-kakomon-ai"
                    className="flex min-h-[44px] items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-muted"
                  >
                    <HelpCircle
                      className="h-4 w-4 text-muted-foreground"
                      aria-hidden="true"
                    />
                    過去問AIを選ぶ理由
                  </Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link
                    href="/features"
                    className="flex min-h-[44px] items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-muted"
                  >
                    <Sparkles
                      className="h-4 w-4 text-muted-foreground"
                      aria-hidden="true"
                    />
                    機能特集
                  </Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link
                    href="/success-stories"
                    className="flex min-h-[44px] items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-muted"
                  >
                    <Trophy
                      className="h-4 w-4 text-muted-foreground"
                      aria-hidden="true"
                    />
                    合格体験記
                  </Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link
                    href="/essays"
                    className="flex min-h-[44px] items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-muted"
                  >
                    <FileText
                      className="h-4 w-4 text-muted-foreground"
                      aria-hidden="true"
                    />
                    論述例
                  </Link>
                </SheetClose>

                <div className="my-2 border-t border-border" />
                <SheetClose asChild>
                  <Link
                    href="/recommended-books"
                    className="flex min-h-[44px] items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-muted"
                  >
                    <BookOpen
                      className="h-4 w-4 text-muted-foreground"
                      aria-hidden="true"
                    />
                    推薦書籍
                  </Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link
                    href="/settings"
                    className="flex min-h-[44px] items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-muted"
                  >
                    <Settings
                      className="h-4 w-4 text-muted-foreground"
                      aria-hidden="true"
                    />
                    設定
                  </Link>
                </SheetClose>
                <div className="mt-1 flex min-h-[44px] items-center justify-between rounded-lg px-3 py-2 text-sm font-medium text-foreground">
                  <span>テーマ切替</span>
                  <ThemeToggle />
                </div>
              </nav>
              <div className="mt-auto">
                <StreakBadge className="w-full justify-center" />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
