import {NativeSignInBoundary} from "@/mobile/src/NativeSignInBoundary";
import type { Metadata } from "next";
import Link from "next/link";
import { auth } from "@/lib/auth";
import { authConfig } from "@/lib/auth/config";
import { redirect } from "next/navigation";
import { AlertCircle } from "lucide-react";
import { SignInButtons } from "./SignInButtons";
import { EmailSignInForm } from "./EmailSignInForm";
import { AppReviewSignInForm } from "./AppReviewSignInForm";
import { appReviewConfig } from "@/lib/auth/app-review-config";
import { safeAuthCallback } from "@/lib/auth/redirect";
import { PurchaseSignInBeacon } from "./PurchaseSignInBeacon";

export const metadata: Metadata = {
  title: "ログイン",
  description: "過去問AI にログインして学習履歴をクラウド同期。無料の学習機能と月額プラン。",
  robots: { index: false, follow: false },
};

type SearchParams = { callbackUrl?: string; error?: string; reauth?: string };

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
  const callbackUrl = safeAuthCallback(sp.callbackUrl);
  const session = await auth();
  const reauthenticate = sp.reauth === "1";
  if (session?.user && !reauthenticate) redirect(callbackUrl);

  const errorMessage = sp.error ? friendlyAuthError(sp.error) : null;
  // On the way to Checkout: the provider buttons only, then straight on to payment.
  const forPurchase = callbackUrl === "/billing" || callbackUrl.startsWith("/billing?") || callbackUrl === "/billing/start" || callbackUrl.startsWith("/billing/start?");
  const nativeLogin=callbackUrl.startsWith("/api/mobile/auth/complete?");

  const providerIds = new Set(
    authConfig.providers.map((p) => (typeof p === "function" ? p().id : p.id)).filter(id => id !== "app-review"),
  );

  return (
    <NativeSignInBoundary returnTo={callbackUrl}>
    <main className="relative flex flex-1 items-center justify-center px-4 py-8 sm:py-12">

      <div className="relative w-full max-w-md">
        {/* Hero */}
        <div className="mb-8 text-center">
          {forPurchase && <><PurchaseSignInBeacon /><span data-purchase-focus hidden /></>}
          <h1 className="text-balance text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            {forPurchase ? "ログインして決済へ" : reauthenticate ? "もう一度ログイン" : "過去問AIにログイン"}
          </h1>

        </div>

        {/* Card */}
        <div className="relative overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-7">
          {errorMessage && (
            <div role="alert" className="mb-4 flex items-start gap-2.5 rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
              <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
              <div>
                <p className="text-sm leading-relaxed">
                  {errorMessage}
                </p>
              </div>
            </div>
          )}

          {providerIds.size > 0 || appReviewConfig() ? (
            <>
              <SignInButtons
                reauthenticate={reauthenticate}
                callbackUrl={callbackUrl}
                hasGoogle={providerIds.has("google") && (!nativeLogin || providerIds.has("apple"))}
                hasGitHub={providerIds.has("github") && (!nativeLogin || providerIds.has("apple"))}
                hasApple={providerIds.has("apple")}
              />
              {nativeLogin&&!providerIds.has("apple")&&<p className="text-sm">アプリの通常ログインはAppleログインの設定後に利用できます。審査担当者は下の審査用ログインをご利用ください。</p>}

              {providerIds.has("nodemailer") && !forPurchase && (
                <>
                  <div className="my-5 flex items-center gap-3 text-xs uppercase tracking-wider text-muted-foreground">
                    <span className="h-px flex-1 bg-border" />
                    または
                    <span className="h-px flex-1 bg-border" />
                  </div>
                  <EmailSignInForm callbackUrl={callbackUrl} />
                </>
              )}
              {/* Review access is for App Review inside the iOS app only; ordinary web visitors never see it. */}
              {appReviewConfig() && <div className={nativeLogin ? undefined : "hidden [.native-app_&]:block"}><AppReviewSignInForm callbackUrl={callbackUrl} /></div>}
            </>
          ) : (
            <div className="rounded-xl border border-dashed border-border bg-muted/40 px-4 py-6 text-center text-sm text-muted-foreground">
              <p className="mb-1">
                <strong className="font-semibold text-foreground">
                  現在ログインを利用できません
                </strong>
              </p>
              <Link
                href="/about"
                className="mt-4 inline-flex min-h-11 items-center gap-1 text-xs font-medium text-primary underline-offset-4 hover:underline"
              >
                プロジェクトについて →
              </Link>
            </div>
          )}
        </div>

        {/* Legal */}
        <p className="mt-5 text-center text-xs leading-6 text-muted-foreground">
          続行すると{" "}
          <Link
            href="/terms"
            className="rounded-sm underline underline-offset-4 hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
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
    </main></NativeSignInBoundary>
  );
}
