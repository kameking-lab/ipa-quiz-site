"use client";
import Link from "next/link";
import { AccountNavigationLink } from "@/components/account/AccountNavigation";
import { PRICE_PAGE_LINK } from "@/lib/billing/price-page-link";
import { useMobileMenu } from "@/components/useMobileMenu";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { SiteLogo } from "@/components/SiteLogo";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetClose } from "@/components/ui/sheet";
export const SAFETY_NAV = [
  { href: "/e-learning/exams", label: "試験一覧" },
  { href: "/e-learning/search", label: "検索" },
  { href: "/e-learning/progress", label: "進捗・復習" },
  { href: "/", label: "IPA・安全を選ぶ" },
  PRICE_PAGE_LINK,
];
export function SafetySiteHeader({ home = false }: { home?: boolean }) {
  const pathname = usePathname();
  const [open, setOpen] = useMobileMenu(pathname);
  const items = home ? [{ href: "/#choose-qualification", label: "資格を選ぶ" }, { href: "/review", label: "復習" }, { href: "/transparency", label: "解説・出典について" }, PRICE_PAGE_LINK] : SAFETY_NAV;
  return <header className="sticky top-0 z-40 border-b border-border bg-background/95">
    <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6">
      <Link href="/" aria-label="過去問AI ホーム"><SiteLogo /></Link>
      <nav aria-label="グローバルナビゲーション" className="hidden items-center gap-2 md:flex">
        <AccountNavigationLink className="rounded-lg px-3 py-3 text-sm font-medium hover:bg-muted" />
        {items.map(item => <Link key={item.href} href={item.href} aria-current={pathname === item.href ? "page" : undefined} className="rounded-lg px-3 py-3 text-sm font-medium hover:bg-muted">{item.label}</Link>)}
      </nav>
      <Sheet open={open} onOpenChange={setOpen}><SheetTrigger asChild><button aria-label="メニューを開く" className="flex min-h-11 items-center justify-center gap-1 rounded-md px-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring md:hidden"><Menu className="h-5 w-5" aria-hidden="true" /><span className="text-sm font-medium">メニュー</span></button></SheetTrigger>
        <SheetContent className="flex h-dvh w-[min(90vw,24rem)] flex-col gap-4 overflow-hidden pb-[max(1.5rem,env(safe-area-inset-bottom))] [&>button]:flex [&>button]:min-h-11 [&>button]:min-w-11 [&>button]:items-center [&>button]:justify-center [&>button]:gap-1 [&>button]:px-2 [&>button>span]:not-sr-only"><SheetHeader className="shrink-0 pr-20"><SheetTitle>{home ? "学習を始める" : "安全衛生の学習"}</SheetTitle></SheetHeader>
          <nav aria-label="モバイルナビゲーション" className="mt-5 flex min-h-0 flex-1 flex-col overflow-y-auto overscroll-contain">
            <SheetClose asChild><AccountNavigationLink className="flex min-h-11 shrink-0 items-center rounded-lg px-3 py-4 text-sm hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" /></SheetClose>
            {items.map(item => <SheetClose asChild key={item.href}><Link href={item.href} aria-current={pathname === item.href ? "page" : undefined} className="flex min-h-11 shrink-0 items-center rounded-lg px-3 py-4 text-sm hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">{item.label}</Link></SheetClose>)}
          </nav>
        </SheetContent>
      </Sheet>
    </div>
  </header>;
}
