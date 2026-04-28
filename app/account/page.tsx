import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { auth, isAuthConfigured } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { HistorySyncPanel } from "./HistorySyncPanel";

export const metadata: Metadata = {
  title: "アカウント",
  description: "プロフィールと利用状況。",
  robots: { index: false, follow: false },
};

export default async function AccountPage() {
  const session = await auth();
  if (!session?.user) {
    redirect("/auth/signin?callbackUrl=/account");
  }

  const dbReady = !!process.env.DATABASE_URL;

  return (
    <main className="mx-auto w-full max-w-2xl px-4 py-10">
      <h1 className="mb-6 text-2xl font-bold">アカウント</h1>

      <section className="mb-6 rounded-xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900">
        <h2 className="mb-3 text-sm font-semibold text-zinc-500 dark:text-zinc-400">プロフィール</h2>
        <dl className="grid grid-cols-[auto,1fr] gap-x-4 gap-y-2 text-sm">
          <dt className="text-zinc-500 dark:text-zinc-400">名前</dt>
          <dd>{session.user.name ?? "—"}</dd>
          <dt className="text-zinc-500 dark:text-zinc-400">メール</dt>
          <dd>{session.user.email ?? "—"}</dd>
        </dl>
      </section>

      <section className="mb-6 rounded-xl border border-emerald-200 bg-emerald-50/40 p-5 dark:border-emerald-900/60 dark:bg-emerald-950/20">
        <h2 className="mb-2 text-sm font-semibold text-emerald-700 dark:text-emerald-300">
          教育貢献プロジェクト
        </h2>
        <p className="text-sm text-zinc-700 dark:text-zinc-300">
          全機能を無料でご利用いただけます。AI コパイロットの利用方法や、応援のお願いについては{" "}
          <Link href="/pricing" className="underline hover:text-zinc-900 dark:hover:text-zinc-50">
            こちら
          </Link>
          。
        </p>
      </section>

      <section className="mb-6 rounded-xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900">
        <h2 className="mb-3 text-sm font-semibold text-zinc-500 dark:text-zinc-400">学習履歴</h2>
        {dbReady ? (
          <HistorySyncPanel />
        ) : (
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            クラウド同期は未設定です（サーバー側のみ）。履歴はこのブラウザの localStorage に保存されています。
          </p>
        )}
      </section>

      <section className="rounded-xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900">
        <h2 className="mb-3 text-sm font-semibold text-zinc-500 dark:text-zinc-400">セッション</h2>
        <Button variant="outline" asChild>
          <Link href="/auth/signout">ログアウト</Link>
        </Button>
      </section>

      {!isAuthConfigured && (
        <p className="mt-6 text-xs text-zinc-500 dark:text-zinc-400">
          注意: 認証プロバイダが未設定です。
        </p>
      )}
    </main>
  );
}
