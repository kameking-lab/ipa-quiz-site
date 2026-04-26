import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { redirect } from "next/navigation";
import {
  CheckCircle2,
  XCircle,
  Sparkles,
  Crown,
  Users,
  ArrowRight,
  Mail,
  User as UserIcon,
  Cloud,
  LogOut,
  ShieldCheck,
} from "lucide-react";

import { auth, isAuthConfigured } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { HistorySyncPanel } from "./HistorySyncPanel";
import { BillingActions } from "./BillingActions";

export const metadata: Metadata = {
  title: "アカウント",
  description: "プロフィールと現在のプラン。",
  robots: { index: false, follow: false },
};

type PlanKey = "free" | "premium" | "team";

const PLAN_META: Record<
  PlanKey,
  { label: string; icon: React.ReactNode; ribbon: string; chip: string; tagline: string }
> = {
  free: {
    label: "FREE",
    icon: <Sparkles className="h-3.5 w-3.5" />,
    ribbon:
      "bg-gradient-to-r from-muted to-muted text-foreground border-border",
    chip: "bg-muted text-foreground",
    tagline: "全試験・全機能アクセス。AI 1 日 30 回まで。",
  },
  premium: {
    label: "PREMIUM",
    icon: <Crown className="h-3.5 w-3.5" />,
    ribbon:
      "bg-gradient-to-r from-primary via-violet-500 to-fuchsia-500 text-primary-foreground border-transparent",
    chip:
      "bg-gradient-to-r from-primary to-violet-500 text-primary-foreground",
    tagline: "AI 無制限・上位モデル・広告非表示。",
  },
  team: {
    label: "TEAM",
    icon: <Users className="h-3.5 w-3.5" />,
    ribbon:
      "bg-gradient-to-r from-emerald-500 to-cyan-500 text-white border-transparent",
    chip: "bg-gradient-to-r from-emerald-500 to-cyan-500 text-white",
    tagline: "法人向け管理ダッシュボード付き。",
  },
};

type SearchParams = { checkout?: string };

function getInitials(name: string | null | undefined, email: string | null | undefined): string {
  if (name) {
    const parts = name.trim().split(/\s+/);
    return (parts[0]?.[0] ?? "") + (parts[1]?.[0] ?? "");
  }
  if (email) return email[0]?.toUpperCase() ?? "?";
  return "?";
}

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

  const plan: PlanKey = (session.user.plan ?? "free") as PlanKey;
  const planMeta = PLAN_META[plan];
  const dbReady = !!process.env.DATABASE_URL;
  const initials = getInitials(session.user.name, session.user.email);

  return (
    <main className="relative mx-auto w-full max-w-4xl flex-1 px-4 pb-20 pt-8 sm:px-6 sm:pt-12">
      {/* Spotlight background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-72 bg-radial-spotlight opacity-60"
      />

      {/* Status notices */}
      {sp.checkout === "success" && (
        <div
          role="status"
          className="mb-6 flex items-start gap-3 rounded-2xl border border-emerald-300/60 bg-emerald-50 p-4 text-sm text-emerald-900 shadow-sm dark:border-emerald-700/50 dark:bg-emerald-950/40 dark:text-emerald-100"
        >
          <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600 dark:text-emerald-400" />
          <div>
            <div className="font-semibold">決済を受け付けました</div>
            <div className="mt-0.5 text-xs text-emerald-800/90 dark:text-emerald-200/90">
              プラン反映まで数秒お待ちください（Webhook 処理後に反映）。
              詳細は{" "}
              <Link href="/account/billing" className="underline">
                請求情報
              </Link>
              {" "}から確認できます。
            </div>
          </div>
        </div>
      )}
      {sp.checkout === "canceled" && (
        <div
          role="status"
          className="mb-6 flex items-start gap-3 rounded-2xl border border-border bg-card p-4 text-sm shadow-sm"
        >
          <XCircle className="mt-0.5 h-5 w-5 shrink-0 text-muted-foreground" />
          <div>
            <div className="font-semibold">決済はキャンセルされました</div>
            <div className="mt-0.5 text-xs text-muted-foreground">
              いつでも料金ページから再開できます。
            </div>
          </div>
        </div>
      )}

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
          プロフィール / プラン / 学習履歴のクラウド同期 / セッション管理。
        </p>
      </header>

      {/* Hero card: avatar + plan ribbon */}
      <Card className="mb-6 overflow-hidden">
        <div
          aria-hidden="true"
          className={`h-1.5 w-full ${planMeta.ribbon}`}
        />
        <CardContent className="flex flex-col items-start gap-5 p-5 sm:flex-row sm:items-center sm:p-6">
          {/* Avatar */}
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
              <span
                className={`absolute -bottom-1 -right-1 inline-flex items-center gap-1 rounded-full border-2 border-card px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider shadow-sm ${planMeta.chip}`}
              >
                {planMeta.icon}
                {planMeta.label}
              </span>
            </div>
          </div>

          <div className="min-w-0 flex-1">
            <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              現在のプラン
            </div>
            <div className="mt-1 flex items-baseline gap-2">
              <span className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                {planMeta.label}
              </span>
              <Badge variant="outline" className="text-[10px]">
                {plan === "free" ? "無料" : plan === "premium" ? "月額" : "法人"}
              </Badge>
            </div>
            <p className="mt-1.5 text-sm text-muted-foreground">{planMeta.tagline}</p>
          </div>

          <div className="w-full shrink-0 sm:w-auto">
            {plan === "free" ? (
              <Button asChild variant="gradient" size="lg" className="w-full sm:w-auto">
                <Link href="/pricing">
                  <Crown className="h-4 w-4" />
                  Premium にアップグレード
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            ) : (
              <BillingActions />
            )}
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
          <CardDescription>合格戦略を最適化する Premium 機能。</CardDescription>
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
