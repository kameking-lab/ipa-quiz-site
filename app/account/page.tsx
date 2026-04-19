import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { auth, isAuthConfigured } from "@/lib/auth";
import { Button } from "@/components/ui/button";

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

export default async function AccountPage() {
  const session = await auth();
  if (!session?.user) {
    redirect("/auth/signin?callbackUrl=/account");
  }

  const plan = session.user.plan ?? "free";

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

      <section className="mb-6 rounded-xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900">
        <h2 className="mb-3 text-sm font-semibold text-zinc-500 dark:text-zinc-400">現在のプラン</h2>
        <div className="flex items-center justify-between gap-4">
          <span className="inline-flex items-center rounded-md bg-sky-100 px-2.5 py-1 text-sm font-semibold text-sky-800 dark:bg-sky-950 dark:text-sky-200">
            {PLAN_LABELS[plan]}
          </span>
          {plan === "free" && (
            <Button variant="primary" asChild>
              <Link href="/pricing">アップグレード</Link>
            </Button>
          )}
        </div>
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
