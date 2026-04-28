import type { Metadata } from "next";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ALL_QUESTIONS, QUESTIONS_BY_EXAM } from "@/data/questions";
import { StatsCharts } from "./StatsCharts";

export const metadata: Metadata = {
  title: "公開メトリクス",
  description:
    "過去問 AI の運営状況を公開しています。収録問題数・試験区分別の問題数・利用状況などの透明性レポート。",
  alternates: { canonical: "/stats" },
};

// /stats は SSR で 5 分ごとに再生成（PostHog の集計遅延と整合）
export const revalidate = 300;

const EXAM_LABEL: Record<string, string> = {
  ip: "IT パスポート",
  sg: "情報セキュリティ M",
  fe: "基本情報",
  ap: "応用情報",
  st: "ストラテジスト",
  sa: "システムアーキテクト",
  pm: "プロジェクト M",
  nw: "ネットワーク",
  db: "データベース",
  es: "エンベデッド",
  sc: "情報処理安全確保",
  sm: "サービス M",
  au: "システム監査",
};

interface MonthlySeries {
  month: string;
  users: number;
  aiCalls: number;
}

interface MetricsResult {
  source: "posthog" | "demo";
  monthly: MonthlySeries[];
  fetchedAt: number;
}

const DEMO_SERIES: MonthlySeries[] = [
  { month: "2025-12", users: 480, aiCalls: 1420 },
  { month: "2026-01", users: 1120, aiCalls: 5180 },
  { month: "2026-02", users: 2340, aiCalls: 11250 },
  { month: "2026-03", users: 4080, aiCalls: 19840 },
  { month: "2026-04", users: 6520, aiCalls: 31700 },
];

async function fetchPostHogMetrics(): Promise<MetricsResult> {
  const apiKey = process.env.POSTHOG_API_KEY;
  const projectId = process.env.POSTHOG_PROJECT_ID;
  const host = process.env.POSTHOG_HOST ?? "https://us.posthog.com";
  if (!apiKey || !projectId) {
    return { source: "demo", monthly: DEMO_SERIES, fetchedAt: Date.now() };
  }

  // PostHog Insights API: monthly DAU + ai_query_sent をトレンドで取得。
  // クエリ失敗時は黙ってデモデータにフォールバック（公開ページは絶対に落とさない）。
  try {
    const url = `${host}/api/projects/${projectId}/insights/trend/?events=${encodeURIComponent(
      JSON.stringify([
        { id: "page_view", math: "dau" },
        { id: "ai_query_sent", math: "total" },
      ]),
    )}&date_from=-150d&interval=month`;
    const res = await fetch(url, {
      headers: { Authorization: `Bearer ${apiKey}` },
      next: { revalidate: 300 },
    });
    if (!res.ok) throw new Error(`posthog ${res.status}`);
    const data = (await res.json()) as {
      result?: Array<{ data?: number[]; labels?: string[] }>;
    };
    const usersSeries = data.result?.[0]?.data ?? [];
    const aiSeries = data.result?.[1]?.data ?? [];
    const labels = data.result?.[0]?.labels ?? [];
    const monthly: MonthlySeries[] = labels.map((label, i) => ({
      month: label,
      users: usersSeries[i] ?? 0,
      aiCalls: aiSeries[i] ?? 0,
    }));
    return {
      source: "posthog",
      monthly: monthly.length > 0 ? monthly : DEMO_SERIES,
      fetchedAt: Date.now(),
    };
  } catch {
    return { source: "demo", monthly: DEMO_SERIES, fetchedAt: Date.now() };
  }
}

function formatMinutesAgo(ms: number): string {
  const diffMin = Math.floor((Date.now() - ms) / 60000);
  if (diffMin < 1) return "たった今";
  if (diffMin < 60) return `${diffMin} 分前`;
  const h = Math.floor(diffMin / 60);
  if (h < 24) return `${h} 時間前`;
  return `${Math.floor(h / 24)} 日前`;
}

export default async function StatsPage() {
  const total = ALL_QUESTIONS.length;
  const byExam = Object.entries(QUESTIONS_BY_EXAM)
    .map(([code, list]) => ({
      exam: code,
      label: EXAM_LABEL[code] ?? code.toUpperCase(),
      count: list?.length ?? 0,
    }))
    .filter((e) => e.count > 0)
    .sort((a, b) => b.count - a.count);

  const metrics = await fetchPostHogMetrics();
  const isDemo = metrics.source === "demo";

  return (
    <main className="mx-auto w-full max-w-4xl flex-1 px-4 pb-16 pt-8 sm:px-6">
      <header className="mb-6">
        <Badge variant="success">教育貢献プロジェクト</Badge>
        <h1 className="mt-2 text-2xl font-bold sm:text-3xl">公開メトリクス</h1>
        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
          運営状況を透明性高く公開しています。問題数は実データ、利用状況は{" "}
          {isDemo ? "デモ用集約データ" : "PostHog 集計"} を表示しています。
        </p>
        <p className="mt-2 text-xs text-zinc-500 dark:text-zinc-400">
          最終更新: {formatMinutesAgo(metrics.fetchedAt)}
          {isDemo && (
            <>
              ・<span className="font-semibold text-amber-700 dark:text-amber-400">デモデータ</span>{" "}
              （PostHog 未設定の場合のフォールバック表示）
            </>
          )}
        </p>
      </header>

      <section className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <KpiCard label="総収録問題" value={total.toLocaleString("ja-JP")} sub="全試験区分合計" />
        <KpiCard label="試験区分" value="13 区分" sub="IP / SG / FE / AP / ほか" />
        <KpiCard label="利用料" value="¥0" sub="全機能無料" />
        <KpiCard label="運営スタイル" value="個人 OSS" sub="教育貢献" />
      </section>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-base">試験区分別の収録問題数</CardTitle>
        </CardHeader>
        <CardContent>
          <StatsCharts byExam={byExam} monthlySeries={metrics.monthly} />
        </CardContent>
      </Card>

      <p className="text-center text-xs text-zinc-500 dark:text-zinc-400">
        透明性レポートは <Link href="/transparency" className="underline hover:text-zinc-700 dark:hover:text-zinc-300">/transparency</Link>{" "}
        / 利用者の声は <Link href="/feedback/public" className="underline hover:text-zinc-700 dark:hover:text-zinc-300">/feedback/public</Link>。
      </p>
    </main>
  );
}

function KpiCard({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="text-xs text-zinc-500 dark:text-zinc-400">{label}</div>
        <div className="mt-1 text-2xl font-bold tracking-tight">{value}</div>
        {sub && <div className="mt-1 text-[11px] text-zinc-500 dark:text-zinc-400">{sub}</div>}
      </CardContent>
    </Card>
  );
}
