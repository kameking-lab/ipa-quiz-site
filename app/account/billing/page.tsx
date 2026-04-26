// /account/billing
//
// Stripe Checkout からの success リダイレクト先 兼 課金管理ハブ。
// - 現在のプラン状態（DB の Subscription レコード）
// - トライアル残日数 / 次回請求日
// - Customer Portal 起動ボタン（解約・支払い方法変更）
// - 戻るリンク
//
// `/account?checkout=success` の置き換え URL。Checkout Session の
// success_url から `?checkout=success&session_id=...` 付きで遷移してくる。

import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import {
  CheckCircle2,
  XCircle,
  Crown,
  ArrowLeft,
  CalendarDays,
  Receipt,
  Sparkles,
  AlertCircle,
} from "lucide-react";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db/prisma";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BillingActions } from "../BillingActions";
import { CheckoutLandingTracker } from "./CheckoutLandingTracker";

export const metadata: Metadata = {
  title: "請求情報",
  description: "プランと支払いの管理。",
  robots: { index: false, follow: false },
};

type PlanKey = "free" | "premium" | "team";
type SearchParams = { checkout?: string; session_id?: string };

const PLAN_LABEL: Record<PlanKey, string> = {
  free: "FREE",
  premium: "PREMIUM",
  team: "TEAM",
};

const STATUS_LABEL: Record<string, string> = {
  trialing: "トライアル中",
  active: "有効",
  past_due: "支払い遅延",
  canceled: "解約済み",
  unpaid: "未払い",
  incomplete: "登録未完了",
  incomplete_expired: "登録期限切れ",
  paused: "一時停止",
};

function formatDate(d: Date | null | undefined): string {
  if (!d) return "—";
  return new Intl.DateTimeFormat("ja-JP", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(d);
}

function daysUntil(d: Date | null | undefined): number | null {
  if (!d) return null;
  const ms = d.getTime() - Date.now();
  if (ms <= 0) return 0;
  return Math.ceil(ms / (1000 * 60 * 60 * 24));
}

export default async function BillingPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const sp = await searchParams;
  const session = await auth();
  if (!session?.user?.id) {
    redirect("/auth/signin?callbackUrl=/account/billing");
  }

  const plan: PlanKey = (session.user.plan ?? "free") as PlanKey;
  const dbReady = !!process.env.DATABASE_URL;

  const subscription = dbReady
    ? await prisma.subscription
        .findFirst({
          where: { userId: session.user.id },
          orderBy: { updatedAt: "desc" },
        })
        .catch(() => null)
    : null;

  const trialDaysLeft =
    subscription?.status === "trialing"
      ? daysUntil(subscription.currentPeriodEnd)
      : null;

  return (
    <main className="relative mx-auto w-full max-w-3xl flex-1 px-4 pb-20 pt-8 sm:px-6 sm:pt-12">
      <CheckoutLandingTracker outcome={sp.checkout} sessionId={sp.session_id} plan={plan} />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-72 bg-radial-spotlight opacity-60"
      />

      <Link
        href="/account"
        className="mb-4 inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-3 w-3" />
        アカウントに戻る
      </Link>

      <header className="mb-6">
        <div className="mb-3 inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-2.5 py-1 text-[11px] font-medium text-muted-foreground shadow-sm">
          <Receipt className="h-3 w-3" />
          請求情報
        </div>
        <h1 className="text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          プランと支払い
        </h1>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          現在のプラン、次回請求日、解約・支払い方法変更を管理できます。
        </p>
      </header>

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
              トライアル期間中はいつでも解約できます。
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

      {/* Current plan card */}
      <Card className="mb-6">
        <CardHeader>
          <div className="flex items-start justify-between gap-3">
            <div>
              <CardTitle className="flex items-center gap-2 text-base">
                <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-primary-soft text-primary-soft-foreground">
                  <Crown className="h-3.5 w-3.5" />
                </span>
                現在のプラン
              </CardTitle>
              <CardDescription>
                {plan === "free"
                  ? "Premium にアップグレードすると AI が無制限になります。"
                  : "課金中。次回更新日に自動で継続されます。"}
              </CardDescription>
            </div>
            <Badge
              variant={plan === "free" ? "outline" : "primary"}
              className="text-[10px]"
            >
              {PLAN_LABEL[plan]}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          {trialDaysLeft !== null && trialDaysLeft > 0 && (
            <div className="flex items-start gap-2 rounded-xl border border-amber-300/60 bg-amber-50 p-3 text-xs text-amber-900 dark:border-amber-700/50 dark:bg-amber-950/40 dark:text-amber-100">
              <Sparkles className="mt-0.5 h-3.5 w-3.5 shrink-0" />
              <div>
                <div className="font-semibold">
                  トライアル残り {trialDaysLeft} 日
                </div>
                <div className="mt-0.5 opacity-90">
                  {formatDate(subscription?.currentPeriodEnd)} に最初の請求が発生します。
                  期間中の解約は無料です。
                </div>
              </div>
            </div>
          )}

          {subscription && (
            <dl className="grid gap-3 text-sm sm:grid-cols-2">
              <div className="rounded-xl border border-border bg-muted/30 p-3.5">
                <dt className="flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                  <Sparkles className="h-3 w-3" />
                  状態
                </dt>
                <dd className="mt-1 text-sm font-medium text-foreground">
                  {STATUS_LABEL[subscription.status] ?? subscription.status}
                  {subscription.cancelAtPeriodEnd && (
                    <span className="ml-2 text-[11px] text-amber-700 dark:text-amber-400">
                      （期間末で解約予定）
                    </span>
                  )}
                </dd>
              </div>
              <div className="rounded-xl border border-border bg-muted/30 p-3.5">
                <dt className="flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                  <CalendarDays className="h-3 w-3" />
                  次回請求日
                </dt>
                <dd className="mt-1 text-sm font-medium text-foreground">
                  {formatDate(subscription.currentPeriodEnd)}
                </dd>
              </div>
            </dl>
          )}

          {!subscription && plan === "free" && (
            <p className="text-sm text-muted-foreground">
              現在は Free プランです。Premium にアップグレードすると AI コパイロット 500 回 / 日、
              AI 論述添削 無制限、広告非表示が利用できます。
            </p>
          )}

          {!subscription && plan !== "free" && dbReady && (
            <p className="flex items-start gap-2 text-xs text-muted-foreground">
              <AlertCircle className="mt-0.5 h-3.5 w-3.5 shrink-0" />
              プラン情報の同期中です。Webhook 反映まで少々お待ちください。
            </p>
          )}

          <div className="flex flex-wrap items-center justify-end gap-2 pt-2">
            {plan === "free" ? (
              <Button asChild variant="gradient" size="lg">
                <Link href="/pricing">
                  Premium にアップグレード
                </Link>
              </Button>
            ) : (
              <BillingActions />
            )}
          </div>
        </CardContent>
      </Card>

      {/* Trial / billing FAQ */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">よくある質問</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3 text-sm text-muted-foreground">
            <li>
              <strong className="text-foreground">7 日間無料トライアル：</strong>
              初めて Premium に登録すると、最初の 7 日間は無料です。期間中の解約に料金はかかりません。
            </li>
            <li>
              <strong className="text-foreground">解約方法：</strong>
              「プラン・支払い管理」から Stripe Customer Portal を開き、いつでも解約できます。
            </li>
            <li>
              <strong className="text-foreground">支払い方法：</strong>
              クレジットカード（Visa / Master / JCB / Amex）に対応しています。
            </li>
          </ul>
        </CardContent>
      </Card>
    </main>
  );
}
