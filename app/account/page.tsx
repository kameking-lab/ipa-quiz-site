import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { redirect } from "next/navigation";
import { ArrowRight, LogOut } from "lucide-react";
import { auth } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { HistorySyncPanel } from "./HistorySyncPanel";

export const metadata: Metadata = {
  title: "アカウント", description: "プロフィールと利用状況。",
  robots: { index: false, follow: false },
};

export default async function AccountPage() {
  const session = await auth();
  if (!session?.user) redirect("/auth/signin?callbackUrl=/account");
  const dbReady = !!process.env.DATABASE_URL;
  const user = session.user;
  const initials = (user.name?.trim()[0] ?? user.email?.[0] ?? "?").toUpperCase();
  return (
    <main className="mx-auto w-full max-w-2xl flex-1 px-4 pb-20 pt-8 sm:px-6 sm:pt-10">
      <header className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">アカウント</h1>
      </header>
      <section aria-label="プロフィール" className="mb-8 flex items-center gap-4 rounded-2xl border border-border bg-card p-5">
        {user.image ? <Image src={user.image} alt="" width={56} height={56} className="h-14 w-14 shrink-0 rounded-full object-cover" />
          : <div aria-hidden="true" className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-primary-soft text-xl font-semibold text-primary-soft-foreground">{initials}</div>}
        <dl className="min-w-0 space-y-2">
          <div><dt className="text-xs text-muted-foreground">名前</dt><dd className="break-words text-sm font-medium">{user.name ?? "—"}</dd></div>
          <div><dt className="text-xs text-muted-foreground">メール</dt><dd className="break-all text-sm">{user.email ?? "—"}</dd></div>
        </dl>
      </section>
      <section aria-labelledby="account-records" className="mb-8">
        <h2 id="account-records" className="mb-3 text-base font-semibold">学習記録</h2>
        <nav aria-label="学習記録" className="divide-y divide-border overflow-hidden rounded-2xl border border-border bg-card">
          {[
            ["/account/dashboard", "学習ダッシュボード"],
            ["/account/dashboard?tab=weakness", "弱点ヒートマップ"],
            ["/account/dashboard#mock-scores", "模試の記録"],
          ].map(([href, label]) => <Link key={href} href={href} className="flex min-h-14 items-center justify-between gap-3 px-5 py-3 text-sm font-medium transition-colors hover:bg-muted"><span>{label}</span><ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground" aria-hidden="true" /></Link>)}
        </nav>
      </section>
      <section aria-labelledby="account-history" className="mb-8">
        <h2 id="account-history" className="mb-3 text-base font-semibold">学習履歴</h2>
        <div className="rounded-2xl border border-border bg-card p-5">
          {dbReady ? <HistorySyncPanel /> : <p className="text-sm text-muted-foreground">学習履歴はこの端末に保存されます。</p>}
        </div>
      </section>
      <nav aria-label="アカウント操作" className="flex flex-col items-start gap-2 border-t border-border pt-4 sm:flex-row sm:items-center sm:justify-between">
        <Button asChild variant="outline" size="lg"><Link href="/auth/signout"><LogOut className="h-4 w-4" aria-hidden="true" />ログアウト</Link></Button>
        <Link href="/account/delete" className="inline-flex min-h-11 items-center text-sm text-muted-foreground underline underline-offset-4">アカウントとデータを削除</Link>
      </nav>
    </main>
  );
}
