import type { Metadata } from "next";
import Link from "next/link";
import { auth } from "@/lib/auth";
import { authConfig } from "@/lib/auth/config";
import { redirect } from "next/navigation";
import {
  AlertCircle,
  Cloud,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { SignInButtons } from "./SignInButtons";
import { EmailSignInForm } from "./EmailSignInForm";

export const metadata: Metadata = {
  title: "ログイン",
  description: "過去問AI にログインして学習履歴をクラウド同期。α公開中・全機能無料。",
  robots: { index: false, follow: false },
};

type SearchParams = { callbackUrl?: string; error?: string };

const KNOWN_AUTH_ERRORS: Record<string, string> = {
  OAuthSignin: "外部プロバイダへの接続に失敗しました。",
  OAuthCallback: "外部プロバイダからの応答に問題がありました。",
  OAuthCreateAccount: "アカウント作成に失敗しました。",
  EmailCreateAccount: "アカウント作成に失敗しました。",
  Callback: "ログイン処理に失敗しました。",
  OAuthAccountNotLinked: "別のログイン方法で登録済みのメールアドレスです。同じ方法でログインしてください。",
  EmailSignin: "メール送信に失敗しました。",
  CredentialsSignin: "認証情報が正しくありません。",
  SessionRequired: "ログインが必要です。",
  AccessDenied: "アクセスが拒否されました。",
  Verification: "認証リンクの有効期限が切れています。再度お試しください。",
  Default: "ログインに失敗しました。",
};

/**
 * Only allow same-origin relative paths as redirect targets to prevent open redirect.
 * Reject protocol-relative URLs ("//evil.com"), absolute URLs ("https://evil.com"),
 * and anything that doesn't start with a single "/".
 */
function safeCallbackUrl(raw: string | undefined): string {
  if (!raw) return "/";
  if (typeof raw !== "string") return "/";
  if (!raw.startsWith("/")) return "/";
  if (raw.startsWith("//")) return "/";
  if (raw.startsWith("/\\")) return "/";
  return raw;
}

function friendlyAuthError(code: string | undefined): string {
  if (!code) return KNOWN_AUTH_ERRORS.Default;
  return KNOWN_AUTH_ERRORS[code] ?? KNOWN_AUTH_ERRORS.Default;
}

export default async function SignInPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const sp = await searchParams;
  const callbackUrl = safeCallbackUrl(sp.callbackUrl);
  const session = await auth();
  if (session?.user) redirect(callbackUrl);

  const errorMessage = sp.error ? friendlyAuthError(sp.error) : null;

  const providerIds = new Set(
    authConfig.providers.map((p) => (typeof p === "function" ? p().id : p.id)),
  );

  return (
    <main className="relative flex flex-1 items-center justify-center px-4 py-10 sm:py-16">
      {/* Decorative background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-radial-spotlight"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[420px] bg-grid opacity-30 [mask-image:radial-gradient(60%_50%_at_50%_0%,#000_30%,transparent_70%)]"
      />

      <div className="relative w-full max-w-md">
        {/* Hero */}
        <div className="mb-8 text-center">
          <Badge variant="success" className="mb-4">
            α公開中・全機能無料
          </Badge>
          <h1 className="text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            <span className="bg-gradient-to-r from-primary via-violet-500 to-fuchsia-500 bg-clip-text text-transparent">
              過去問AI
            </span>
            {" "}にログイン
          </h1>
          <p className="mx-auto mt-3 max-w-sm text-pretty text-sm leading-relaxed text-muted-foreground">
            未ログインでも全機能を利用できます。
            学習履歴をクラウド同期したい方のみログインしてください。
          </p>
        </div>

        {/* Card */}
        <div className="relative overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-lg sm:p-7">
          {errorMessage && (
            <div className="mb-4 flex items-start gap-2.5 rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
              <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
              <div>
                <p className="font-semibold">ログインに失敗しました</p>
                <p className="mt-0.5 text-xs opacity-90">
                  {errorMessage} 時間をおいて再度お試しください。
                </p>
              </div>
            </div>
          )}

          {providerIds.size > 0 ? (
            <>
              <SignInButtons
                callbackUrl={callbackUrl}
                hasGoogle={providerIds.has("google")}
                hasGitHub={providerIds.has("github")}
              />

              {providerIds.has("nodemailer") && (
                <>
                  <div className="my-5 flex items-center gap-3 text-xs uppercase tracking-wider text-muted-foreground">
                    <span className="h-px flex-1 bg-border" />
                    または
                    <span className="h-px flex-1 bg-border" />
                  </div>
                  <EmailSignInForm callbackUrl={callbackUrl} />
                </>
              )}
            </>
          ) : (
            <div className="rounded-xl border border-dashed border-border bg-muted/40 px-4 py-6 text-center text-sm text-muted-foreground">
              <p className="mb-1">
                ログイン機能は{" "}
                <strong className="font-semibold text-foreground">
                  2026年5月公開予定
                </strong>{" "}
                です。
              </p>
              <p className="text-xs">
                現在は未ログインでも全機能を無制限にご利用いただけます。
              </p>
              <Link
                href="/pricing"
                className="mt-4 inline-flex items-center gap-1 text-xs font-medium text-primary underline-offset-4 hover:underline"
              >
                プラン詳細を見る →
              </Link>
            </div>
          )}
        </div>

        {/* Benefit pills */}
        <div className="mt-6 grid grid-cols-1 gap-2 text-xs sm:grid-cols-3">
          <BenefitPill
            icon={<Cloud className="h-3.5 w-3.5" />}
            label="履歴クラウド同期"
          />
          <BenefitPill
            icon={<Sparkles className="h-3.5 w-3.5" />}
            label="β 期間中は全機能無料"
          />
          <BenefitPill
            icon={<ShieldCheck className="h-3.5 w-3.5" />}
            label="メアドのみ・解除自由"
          />
        </div>

        {/* Legal */}
        <p className="mt-6 text-center text-[11px] leading-relaxed text-muted-foreground">
          続行すると{" "}
          <Link
            href="/terms"
            className="underline decoration-border underline-offset-2 hover:text-foreground"
          >
            利用規約
          </Link>{" "}
          と{" "}
          <Link
            href="/privacy"
            className="underline decoration-border underline-offset-2 hover:text-foreground"
          >
            プライバシーポリシー
          </Link>{" "}
          に同意したものとみなされます。
        </p>
      </div>
    </main>
  );
}

function BenefitPill({
  icon,
  label,
}: {
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <div className="flex items-center justify-center gap-1.5 rounded-full border border-border bg-card px-3 py-1.5 text-muted-foreground shadow-sm">
      <span className="text-primary">{icon}</span>
      <span>{label}</span>
    </div>
  );
}
