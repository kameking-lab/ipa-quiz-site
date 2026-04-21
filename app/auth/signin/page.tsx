import type { Metadata } from "next";
import Link from "next/link";
import { auth } from "@/lib/auth";
import { authConfig } from "@/lib/auth/config";
import { redirect } from "next/navigation";
import { SignInButtons } from "./SignInButtons";
import { EmailSignInForm } from "./EmailSignInForm";

export const metadata: Metadata = {
  title: "ログイン",
  description: "IPA Quiz にログインして学習履歴をクラウド同期。",
  robots: { index: false, follow: false },
};

type SearchParams = { callbackUrl?: string; error?: string };

export default async function SignInPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const sp = await searchParams;
  const session = await auth();
  if (session?.user) redirect(sp.callbackUrl || "/");

  const providerIds = new Set(
    authConfig.providers.map((p) => (typeof p === "function" ? p().id : p.id)),
  );

  return (
    <main className="mx-auto flex min-h-[70vh] max-w-md flex-col justify-center px-4 py-12">
      <h1 className="mb-2 text-center text-2xl font-bold">IPA Quiz にログイン</h1>
      <p className="mb-8 text-center text-sm text-zinc-600 dark:text-zinc-400">
        未ログインでも全機能を利用できます。学習履歴をクラウド同期したい方のみログインしてください。
      </p>

      {sp.error && (
        <div className="mb-4 rounded-md border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-800 dark:border-red-900 dark:bg-red-950 dark:text-red-200">
          ログインに失敗しました（{sp.error}）。時間をおいて再度お試しください。
        </div>
      )}

      <SignInButtons
        callbackUrl={sp.callbackUrl}
        hasGoogle={providerIds.has("google")}
        hasGitHub={providerIds.has("github")}
      />

      {providerIds.has("nodemailer") && (
        <>
          <div className="my-6 flex items-center gap-3 text-xs text-zinc-500 dark:text-zinc-400">
            <span className="h-px flex-1 bg-zinc-200 dark:bg-zinc-800" />
            または
            <span className="h-px flex-1 bg-zinc-200 dark:bg-zinc-800" />
          </div>
          <EmailSignInForm callbackUrl={sp.callbackUrl} />
        </>
      )}

      {providerIds.size === 0 && (
        <div className="rounded-md border border-zinc-200 bg-zinc-50 px-4 py-6 text-center text-sm text-zinc-600 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400">
          ログイン機能は準備中です。近日公開予定。
          <br />
          現在は未ログインでも全機能を無制限にご利用いただけます。
          <br />
          <Link href="/pricing" className="mt-3 inline-block underline">
            プラン詳細を見る
          </Link>
        </div>
      )}

      <p className="mt-8 text-center text-xs text-zinc-500 dark:text-zinc-400">
        続行すると <Link href="/terms" className="underline">利用規約</Link> と{" "}
        <Link href="/privacy" className="underline">プライバシーポリシー</Link> に同意したものとみなされます。
      </p>
    </main>
  );
}
