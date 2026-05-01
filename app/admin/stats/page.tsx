import type { Metadata } from "next";
import Link from "next/link";
import {
  Activity,
  BarChart3,
  CheckCircle2,
  Database,
  ExternalLink,
  Gauge,
  LineChart,
  ListChecks,
  Lock,
  Sparkles,
  TrendingUp,
} from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ALL_QUESTIONS, QUESTIONS_BY_EXAM } from "@/data/questions";
import type { ExamCode } from "@/lib/questions/types";
import { examLabel } from "@/lib/utils";

export const metadata: Metadata = {
  title: "アナリティクス（管理画面）",
  description: "過去問AI の内部アナリティクスダッシュボード。Basic Auth 保護。",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default function AdminStatsPage() {
  const totalQuestions = ALL_QUESTIONS.length;
  const examEntries = Object.entries(QUESTIONS_BY_EXAM) as Array<
    [ExamCode, typeof ALL_QUESTIONS | undefined]
  >;
  const examStats = examEntries
    .map(([code, qs]) => ({
      code,
      label: examLabel(code),
      count: qs?.length ?? 0,
    }))
    .sort((a, b) => b.count - a.count);

  const publishedExams = examStats.filter((e) => e.count > 0).length;
  const maxCount = Math.max(...examStats.map((e) => e.count), 1);

  return (
    <main className="relative mx-auto w-full max-w-6xl flex-1 px-4 pb-12 pt-8 sm:px-6 sm:pt-10">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-72 bg-radial-spotlight opacity-50"
      />

      {/* Header */}
      <header className="mb-8 flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="mb-3 flex flex-wrap items-center gap-1.5">
            <Badge variant="primary">
              <Sparkles className="mr-1 h-3 w-3" />
              管理画面
            </Badge>
            <Badge variant="success">
              <Lock className="mr-1 h-3 w-3" />
              Basic Auth
            </Badge>
          </div>
          <h1 className="text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            アナリティクス
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            Vercel Analytics で DAU / WAU / MAU、ページビュー、カスタムイベントを追跡します。
            ここはコンテンツ収録と計測の概況サマリです。
          </p>
          <div className="mt-4">
            <Link
              href="/admin/retention"
              className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:bg-muted"
            >
              <TrendingUp className="h-3.5 w-3.5" />
              翌週リテンションを見る
            </Link>
          </div>
        </div>
      </header>

      {/* KPI cards */}
      <section className="mb-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <KpiCard
          icon={<Gauge className="h-4 w-4" />}
          label="DAU / WAU / MAU"
          value="Vercel"
          sub="Vercel Analytics で確認"
          accent="primary"
        />
        <KpiCard
          icon={<Database className="h-4 w-4" />}
          label="総問題数"
          value={totalQuestions.toLocaleString()}
          sub="全試験合計"
        />
        <KpiCard
          icon={<ListChecks className="h-4 w-4" />}
          label="試験区分"
          value={`${publishedExams}`}
          sub={`/ ${examStats.length} 区分 公開済み`}
        />
        <KpiCard
          icon={<Activity className="h-4 w-4" />}
          label="カスタムイベント"
          value="9種"
          sub="lib/analytics/events.ts"
        />
      </section>

      {/* Exam content table */}
      <Card className="mb-6 overflow-hidden">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-primary-soft text-primary-soft-foreground">
              <BarChart3 className="h-3.5 w-3.5" />
            </span>
            試験別コンテンツ収録状況
          </CardTitle>
          <CardDescription>
            最大 {maxCount.toLocaleString()} 問。バーは収録量を相対的に視覚化しています。
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[560px] text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/30 text-left text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                  <th className="px-5 py-3">試験区分</th>
                  <th className="px-5 py-3 text-right">収録</th>
                  <th className="px-5 py-3">構成比</th>
                  <th className="px-5 py-3">状態</th>
                </tr>
              </thead>
              <tbody>
                {examStats.map((e, i) => {
                  const pct = e.count === 0 ? 0 : (e.count / maxCount) * 100;
                  const isPublished = e.count > 0;
                  return (
                    <tr
                      key={e.code}
                      className={`border-b border-border transition hover:bg-muted/30 ${
                        i % 2 === 0 ? "bg-card" : "bg-muted/10"
                      }`}
                    >
                      <td className="px-5 py-3 font-medium">
                        <div className="flex items-center gap-2">
                          <span className="inline-block rounded-md bg-primary-soft px-2 py-0.5 font-mono text-[10px] font-semibold uppercase text-primary-soft-foreground">
                            {e.code}
                          </span>
                          <span>{e.label}</span>
                        </div>
                      </td>
                      <td className="px-5 py-3 text-right font-mono text-sm tabular-nums">
                        {e.count.toLocaleString()}
                      </td>
                      <td className="px-5 py-3">
                        <div
                          className="h-1.5 w-full max-w-[180px] overflow-hidden rounded-full bg-muted"
                          aria-hidden="true"
                        >
                          <div
                            className={`h-full rounded-full ${
                              isPublished
                                ? "bg-gradient-to-r from-primary to-violet-500"
                                : "bg-muted-foreground/20"
                            }`}
                            style={{ width: `${Math.max(pct, isPublished ? 4 : 0)}%` }}
                          />
                        </div>
                      </td>
                      <td className="px-5 py-3">
                        {isPublished ? (
                          <span className="inline-flex items-center gap-1 text-xs font-medium text-emerald-600 dark:text-emerald-400">
                            <CheckCircle2 className="h-3.5 w-3.5" />
                            公開中
                          </span>
                        ) : (
                          <span className="text-xs text-muted-foreground">未収録</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Tracked events */}
      <Card className="mb-6 overflow-hidden">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-primary-soft text-primary-soft-foreground">
              <Activity className="h-3.5 w-3.5" />
            </span>
            トラッキング対象イベント
          </CardTitle>
          <CardDescription>
            <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-[11px]">
              lib/analytics/events.ts
            </code>{" "}
            の{" "}
            <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-[11px]">
              trackEvent()
            </code>{" "}
            経由で Vercel Analytics に送信。実数は Vercel Dashboard で確認してください。
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/30 text-left text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                  <th className="px-5 py-3">イベント名</th>
                  <th className="px-5 py-3">用途</th>
                  <th className="px-5 py-3">主要プロパティ</th>
                </tr>
              </thead>
              <tbody>
                {EVENT_DOCS.map((e, i) => (
                  <tr
                    key={e.name}
                    className={`border-b border-border align-top transition hover:bg-muted/30 ${
                      i % 2 === 0 ? "bg-card" : "bg-muted/10"
                    }`}
                  >
                    <td className="px-5 py-3">
                      <code className="rounded-md bg-primary-soft px-2 py-0.5 font-mono text-[11px] font-semibold text-primary-soft-foreground">
                        {e.name}
                      </code>
                    </td>
                    <td className="px-5 py-3">{e.purpose}</td>
                    <td className="px-5 py-3 font-mono text-[11px] text-muted-foreground">
                      {e.props}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* External resources */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-primary-soft text-primary-soft-foreground">
              <LineChart className="h-3.5 w-3.5" />
            </span>
            確認先
          </CardTitle>
          <CardDescription>
            実数値・グラフは外部ダッシュボードで確認します。
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="grid gap-3 sm:grid-cols-3">
            {EXTERNAL_LINKS.map((item) => (
              <li
                key={item.title}
                className="rounded-2xl border border-border bg-card p-4 shadow-sm transition hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md"
              >
                <div className="mb-2 inline-flex h-7 w-7 items-center justify-center rounded-lg bg-primary-soft text-primary-soft-foreground">
                  {item.icon}
                </div>
                <div className="text-sm font-semibold text-foreground">{item.title}</div>
                <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{item.body}</p>
                <span className="mt-2 inline-flex items-center gap-1 text-[11px] font-medium text-primary">
                  Vercel ダッシュボード
                  <ExternalLink className="h-3 w-3" />
                </span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </main>
  );
}

function KpiCard({
  icon,
  label,
  value,
  sub,
  accent,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  sub?: string;
  accent?: "primary";
}) {
  const isPrimary = accent === "primary";
  return (
    <div
      className={`relative overflow-hidden rounded-2xl border p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md ${
        isPrimary
          ? "border-primary/30 bg-gradient-to-br from-primary-soft via-card to-card"
          : "border-border bg-card"
      }`}
    >
      <div className="mb-2 inline-flex h-7 w-7 items-center justify-center rounded-lg bg-primary-soft text-primary-soft-foreground">
        {icon}
      </div>
      <div className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
        {label}
      </div>
      <div className="mt-1 text-2xl font-bold tracking-tight text-foreground">{value}</div>
      {sub && <div className="mt-1 text-[11px] text-muted-foreground">{sub}</div>}
    </div>
  );
}

const EVENT_DOCS: Array<{ name: string; purpose: string; props: string }> = [
  { name: "quiz_start", purpose: "クイズ開始", props: "exam, mode" },
  { name: "quiz_answer", purpose: "個別解答", props: "exam, correct" },
  { name: "quiz_complete", purpose: "セッション完了", props: "exam, total, accuracy" },
  { name: "copilot_send", purpose: "AI 送信", props: "exam, premium, actionId?" },
  { name: "copilot_limit_reached", purpose: "上限到達", props: "remaining=0" },
  { name: "pricing_view", purpose: "料金ページ表示", props: "source" },
  { name: "email_signup", purpose: "メアド登録", props: "source, plan?" },
  { name: "streak_milestone", purpose: "ストリーク達成", props: "days" },
  { name: "exam_select", purpose: "試験区分選択", props: "exam" },
  { name: "signin_started", purpose: "ログイン開始", props: "provider, source?" },
  { name: "checkout_started", purpose: "Stripe Checkout 起動", props: "plan, source" },
  { name: "checkout_completed", purpose: "決済完了 (success_url 着地)", props: "plan, sessionId?" },
  { name: "checkout_canceled", purpose: "決済キャンセル", props: "plan?, source?" },
  { name: "billing_portal_opened", purpose: "Customer Portal 起動", props: "plan" },
];

const EXTERNAL_LINKS: Array<{ title: string; body: string; icon: React.ReactNode }> = [
  {
    title: "Vercel Analytics",
    body: "PV / UV / 国別 / カスタムイベントの実数値ダッシュボード。",
    icon: <LineChart className="h-3.5 w-3.5" />,
  },
  {
    title: "Speed Insights",
    body: "LCP / CLS / INP の Web Vitals。Vercel ダッシュボード内。",
    icon: <Gauge className="h-3.5 w-3.5" />,
  },
  {
    title: "Vercel Logs",
    body: "API レスポンスタイムとエラー率。Functions タブで確認。",
    icon: <Activity className="h-3.5 w-3.5" />,
  },
];
