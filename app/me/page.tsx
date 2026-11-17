import Link from "next/link";
import { AccountNavigationLink } from "@/components/account/AccountNavigation";
// Integration fallback until the km lane's room/calendar replaces this page.
export default function MePage() {
  const menu = [{ href: "/account/dashboard", label: "学習の記録" }, { href: "/study-plan", label: "学習計画を作成" },
    { href: "/study-room", label: "自習室" }, { href: "/qualifications", label: "収録資格" },
    { href: "/transparency", label: "出典・運営" }, { href: "/settings", label: "設定" }];
  return <main className="mx-auto w-full max-w-[640px] flex-1 px-4 py-6"><h1 className="mb-6 text-2xl font-bold">わたし</h1><nav aria-label="メニュー" className="divide-y divide-border rounded-2xl border border-border px-4">{menu.map(i => <Link key={i.href} href={i.href} className="block py-4 text-sm">{i.label}　›</Link>)}<AccountNavigationLink className="block py-4 text-sm" /></nav></main>;
}
