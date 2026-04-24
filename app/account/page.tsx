import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { auth, isAuthConfigured } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { HistorySyncPanel } from "./HistorySyncPanel";
import { BillingActions } from "./BillingActions";
import { ChatHistoryPanel } from "./ChatHistoryPanel";

export const metadata: Metadata = {
  title: "アカウント",
  description: "プロフィールと現在のプラン。",
  robots: { index: false, follow: false },
};

const PLAN_LABELS: Record<"free" | "premium" | "team", string> = {
  free: "FREE",
  premium: "PREMIUM",
  team: "TEAM",
};

type SearchParams = { checkout?: string };

export default async function AccountPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const sp = await searchParams;
  const session = await auth();
  if (!session?.user) {
    redirect("/auth/signin?callbackUrl=/account");
  }

  const plan = session.user.plan ?? "free";
  const dbReady = !!process.env.DATABASE_URL;

  return (
    <main className="mx-auto w-full max-w-2xl px-4 py-10">
      <h1 className="mb-6 text-2xl font-bold">アカウント</h1>

      {sp.checkout === "success" && (
        <div className="mb-6 rounded-md border border-emerald-300 bg-emerald-50 px-4 py-3 text-sm dark:border-emerald-800 dark:bg-emerald-950">
          決済を受け付けました。プラン反映まで数秒お待ちください（Webhook 処理後に反映）。
        </div>
      )}
      {sp.checkout === "canceled" && (
        <div className="mb-6 rounded-md border border-zinc-300 bg-zinc-50 px-4 py-3 text-sm dark:border-zinc-700 dark:bg-zinc-900">
          決済はキャンセルされました。
        </div>
      )}

      <section className="mb-6 rounded-xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900">
        <h2 className="mb-3 text-sm font-semibold text-zinc-500 dark:text-zinc-400">プロフィール</h2>
        <dl className="grid grid-cols-[auto,1fr] gap-x-4 gap-y-2 text-sm">
          <dt className="text-zinc-500 dark:text-zinc-400">名前</dt>
          <dd>{session.user.name ?? "—"}</dd>
          <dt className="text-zinc-500 dark:text-zinc-400">メール</dt>
          <dd>{session.user.email ?? "—"}</dd>
        </dl>
      </section>

      <section className="mb-6 rounded-xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900">
        <h2 className="mb-3 text-sm font-semibold text-zinc-500 dark:text-zinc-400">現在のプラン</h2>
        <div className="flex items-center justify-between gap-4">
          <span className="inline-flex items-center rounded-md bg-sky-100 px-2.5 py-1 text-sm font-semibold text-sky-800 dark:bg-sky-950 dark:text-sky-200">
            {PLAN_LABELS[plan]}
          </span>
          {plan === "free" ? (
            <Button variant="primary" asChild>
              <Link href="/pricing">アップグレード</Link>
            </Button>
          ) : (
            <BillingActions />
          )}
        </div>
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

      <section className="mb-6 rounded-xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900">
        <h2 className="mb-3 text-sm font-semibold text-zinc-500 dark:text-zinc-400">AIコパイロット 会話履歴</h2>
        <ChatHistoryPanel isLoggedIn={!!session?.user} />
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
