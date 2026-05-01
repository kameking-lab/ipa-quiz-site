import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { redirect } from "next/navigation";
import {
  Sparkles,
  ArrowRight,
  Heart,
  Mail,
  User as UserIcon,
  Cloud,
  LogOut,
  ShieldCheck,
} from "lucide-react";

import { auth, isAuthConfigured } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { HistorySyncPanel } from "./HistorySyncPanel";

export const metadata: Metadata = {
  title: "アカウント",
  description: "プロフィールと利用状況。",
  robots: { index: false, follow: false },
};

function getInitials(name: string | null | undefined, email: string | null | undefined): string {
  if (name) {
    const parts = name.trim().split(/\s+/);
    return (parts[0]?.[0] ?? "") + (parts[1]?.[0] ?? "");
  }
  if (email) return email[0]?.toUpperCase() ?? "?";
  return "?";
}

export default async function AccountPage() {
  const session = await auth();
  if (!session?.user) {
    redirect("/auth/signin?callbackUrl=/account");
  }

  const dbReady = !!process.env.DATABASE_URL;
  const initials = getInitials(session.user.name, session.user.email);

  return (
    <main className="relative mx-auto w-full max-w-4xl flex-1 px-4 pb-20 pt-8 sm:px-6 sm:pt-12">
      {/* Spotlight background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-72 bg-radial-spotlight opacity-60"
      />

      {/* Dashboard CTA */}
      <Link
        href="/account/dashboard"
        className="mb-6 flex items-center gap-3 rounded-2xl border border-sky-200 bg-gradient-to-r from-sky-50 to-violet-50 p-4 transition hover:-translate-y-0.5 hover:shadow dark:border-sky-900 dark:from-sky-950/30 dark:to-violet-950/30"
      >
        <span className="text-2xl">📊</span>
        <span className="flex-1">
          <span className="block text-sm font-semibold text-sky-900 dark:text-sky-200">
            学習ダッシュボード
          </span>
          <span className="block text-xs text-sky-700/80 dark:text-sky-300/80">
            分野別レーダー・試験別合格確率・弱点TOP3を確認
          </span>
        </span>
        <span className="rounded-full bg-sky-600 px-3 py-1 text-xs font-bold text-white">
          NEW
        </span>
      </Link>

      {/* Hero */}
      <header className="mb-8">
        <div className="mb-3 inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-2.5 py-1 text-[11px] font-medium text-muted-foreground shadow-sm">
          <ShieldCheck className="h-3 w-3" />
          アカウント
        </div>
        <h1 className="text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          ようこそ、{session.user.name ?? session.user.email?.split("@")[0] ?? "ゲスト"} さん
        </h1>
        <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted-foreground">
          プロフィール / 学習履歴のクラウド同期 / セッション管理。
        </p>
      </header>

      {/* Educational contribution hero card */}
      <Card className="mb-6 overflow-hidden border-emerald-200 bg-emerald-50/40 dark:border-emerald-900/60 dark:bg-emerald-950/20">
        <CardContent className="flex flex-col items-start gap-5 p-5 sm:flex-row sm:items-center sm:p-6">
          <div className="flex shrink-0 items-center gap-4">
            <div className="relative">
              {session.user.image ? (
                <Image
                  src={session.user.image}
                  alt={session.user.name ?? "avatar"}
                  width={64}
                  height={64}
                  className="h-16 w-16 rounded-2xl border border-border object-cover shadow-sm"
                />
              ) : (
                <div
                  aria-hidden="true"
                  className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-violet-500 text-xl font-bold text-primary-foreground shadow-md"
                >
                  {initials}
                </div>
              )}
            </div>
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-700 dark:text-emerald-300">
              <Heart className="h-3.5 w-3.5" />
              教育貢献プロジェクト
            </div>
            <p className="mt-1.5 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
              全機能を無料でご利用いただけます。AI コパイロットの利用方法や、応援のお願いについては{" "}
              <Link href="/about" className="underline hover:text-zinc-900 dark:hover:text-zinc-50">
                プロジェクトについて
              </Link>
              {" "}をご覧ください。
            </p>
          </div>

          <div className="w-full shrink-0 sm:w-auto">
            <Button asChild variant="outline" size="lg" className="w-full sm:w-auto">
              <Link href="/support">
                <Heart className="h-4 w-4" />
                応援する
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Profile */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-primary-soft text-primary-soft-foreground">
              <UserIcon className="h-3.5 w-3.5" />
            </span>
            プロフィール
          </CardTitle>
          <CardDescription>サインインに使われている情報です。</CardDescription>
        </CardHeader>
        <CardContent>
          <dl className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-xl border border-border bg-muted/30 p-3.5">
              <dt className="flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                <UserIcon className="h-3 w-3" />
                名前
              </dt>
              <dd className="mt-1 truncate text-sm font-medium text-foreground">
                {session.user.name ?? "—"}
              </dd>
            </div>
            <div className="rounded-xl border border-border bg-muted/30 p-3.5">
              <dt className="flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                <Mail className="h-3 w-3" />
                メール
              </dt>
              <dd className="mt-1 truncate text-sm font-medium text-foreground">
                {session.user.email ?? "—"}
              </dd>
            </div>
          </dl>
        </CardContent>
      </Card>

      {/* Learning science tools */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-primary-soft text-primary-soft-foreground">
              <Sparkles className="h-3.5 w-3.5" />
            </span>
            学習科学ツール
          </CardTitle>
          <CardDescription>合格戦略を最適化するツール（全ユーザー利用可能）。</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="grid gap-2 sm:grid-cols-2">
            <li>
              <Link
                href="/account/weakness"
                className="flex items-center justify-between rounded-xl border border-border bg-muted/30 p-3 text-sm transition-colors hover:bg-muted/60"
              >
                <span>
                  <span className="font-medium">弱点ヒートマップ</span>
                  <span className="ml-2 text-xs text-muted-foreground">分野別正答率</span>
                </span>
                <ArrowRight className="h-4 w-4 text-muted-foreground" />
              </Link>
            </li>
            <li>
              <Link
                href="/account/pass-simulator"
                className="flex items-center justify-between rounded-xl border border-border bg-muted/30 p-3 text-sm transition-colors hover:bg-muted/60"
              >
                <span>
                  <span className="font-medium">合格判定シミュレータ</span>
                  <span className="ml-2 text-xs text-muted-foreground">合格確率</span>
                </span>
                <ArrowRight className="h-4 w-4 text-muted-foreground" />
              </Link>
            </li>
            <li>
              <Link
                href="/account/tutor"
                className="flex items-center justify-between rounded-xl border border-border bg-muted/30 p-3 text-sm transition-colors hover:bg-muted/60"
              >
                <span>
                  <span className="font-medium">AI チューター</span>
                  <span className="ml-2 text-xs text-muted-foreground">月次レポート</span>
                </span>
                <ArrowRight className="h-4 w-4 text-muted-foreground" />
              </Link>
            </li>
            <li>
              <Link
                href="/ranking"
                className="flex items-center justify-between rounded-xl border border-border bg-muted/30 p-3 text-sm transition-colors hover:bg-muted/60"
              >
                <span>
                  <span className="font-medium">全国模試ランキング</span>
                  <span className="ml-2 text-xs text-muted-foreground">パーセンタイル</span>
                </span>
                <ArrowRight className="h-4 w-4 text-muted-foreground" />
              </Link>
            </li>
          </ul>
        </CardContent>
      </Card>

      {/* History sync */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-primary-soft text-primary-soft-foreground">
              <Cloud className="h-3.5 w-3.5" />
            </span>
            学習履歴
          </CardTitle>
          <CardDescription>
            {dbReady
              ? "ブラウザの localStorage と クラウド DB を双方向マージします。"
              : "クラウド同期は未設定です（サーバー側 DB 未接続）。"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {dbReady ? (
            <HistorySyncPanel />
          ) : (
            <p className="text-xs text-muted-foreground">
              現在、履歴はこのブラウザの localStorage にのみ保存されています。
            </p>
          )}
        </CardContent>
      </Card>

      {/* Session */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-primary-soft text-primary-soft-foreground">
              <LogOut className="h-3.5 w-3.5" />
            </span>
            セッション
          </CardTitle>
          <CardDescription>このブラウザの認証セッションを終了します。</CardDescription>
        </CardHeader>
        <CardContent>
          <Button asChild variant="outline" size="md">
            <Link href="/auth/signout">
              <LogOut className="h-4 w-4" />
              ログアウト
            </Link>
          </Button>
        </CardContent>
      </Card>

      {!isAuthConfigured && (
        <p className="mt-6 text-xs text-muted-foreground">
          注意: 認証プロバイダが未設定です。
        </p>
      )}
    </main>
  );
}
