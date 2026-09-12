"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { SiteLogo } from "@/components/SiteLogo";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetClose } from "@/components/ui/sheet";
export const SAFETY_NAV = [
  { href: "/e-learning/exams", label: "試験一覧" },
  { href: "/e-learning/search", label: "検索" },
  { href: "/e-learning/progress", label: "進捗・復習" },
  { href: "/", label: "IPA・安全を選ぶ" },
];
export function SafetySiteHeader({ home = false }: { home?: boolean }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const items = home ? [{ href: "/ipa", label: "IPA" }, { href: "/e-learning/exams", label: "安全" }] : SAFETY_NAV;
  return <header className="sticky top-0 z-40 border-b border-border bg-background/95">
    <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6">
      <Link href="/" aria-label="過去問AI ホーム"><SiteLogo /></Link>
      <nav aria-label="グローバルナビゲーション" className="hidden items-center gap-2 md:flex">
        {items.map(item => <Link key={item.href} href={item.href} aria-current={pathname === item.href ? "page" : undefined} className="rounded-lg px-3 py-3 text-sm font-medium hover:bg-muted">{item.label}</Link>)}
      </nav>
      <Sheet open={open} onOpenChange={setOpen}><SheetTrigger asChild><button aria-label="メニューを開く" className="flex h-11 w-11 items-center justify-center md:hidden"><Menu className="h-5 w-5" /></button></SheetTrigger>
        <SheetContent><SheetHeader><SheetTitle>{home ? "IPA・安全を選ぶ" : "安全衛生の学習"}</SheetTitle></SheetHeader>
          <nav aria-label="モバイルナビゲーション" className="mt-5 flex flex-col">
            {items.map(item => <SheetClose asChild key={item.href}><Link href={item.href} className="rounded-lg px-3 py-4 text-sm hover:bg-muted">{item.label}</Link></SheetClose>)}
          </nav>
        </SheetContent>
      </Sheet>
    </div>
  </header>;
}
