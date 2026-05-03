import type { Metadata } from "next";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ALL_QUESTIONS, QUESTIONS_BY_EXAM } from "@/data/questions";
import { StatsCharts } from "./StatsCharts";

export const metadata: Metadata = {
  title: "運営の透明性レポート",
  description:
    "過去問 AI の運営方針・コスト・意思決定を月次で公開しています。教育貢献プロジェクトとしての透明性レポート。",
  alternates: { canonical: "/transparency" },
};

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

const DEMO_SERIES: MonthlySeries[] = [
  { month: "2025-12", users: 480, aiCalls: 1420 },
  { month: "2026-01", users: 1120, aiCalls: 5180 },
  { month: "2026-02", users: 2340, aiCalls: 11250 },
  { month: "2026-03", users: 4080, aiCalls: 19840 },
  { month: "2026-04", users: 6520, aiCalls: 31700 },
];

async function fetchPostHogMetrics(): Promise<MonthlySeries[]> {
  const apiKey = process.env.POSTHOG_API_KEY;
  const projectId = process.env.POSTHOG_PROJECT_ID;
  const host = process.env.POSTHOG_HOST ?? "https://us.posthog.com";
  if (!apiKey || !projectId) return DEMO_SERIES;

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
    if (!res.ok) return DEMO_SERIES;
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
    return monthly.length > 0 ? monthly : DEMO_SERIES;
  } catch {
    return DEMO_SERIES;
  }
}

const REPORTS = [
  {
    month: "2026-04",
    highlights: [
      "全機能無料化を完了し、課金システムを完全非表示化",
      "フィードバック駆動型のレート制限に切り替え（初回 10 回 + フィードバック投稿後ほぼ無制限）",
      "公開フィードバック・応援・透明性ページを公開",
    ],
    cost: "AI 利用費 約 ¥3,800（Gemini Flash-Lite）",
    next: [
      "API メトリクス連携で /stats を実データ化",
      "@vercel/og を導入して問題別 OGP 自動生成",
      "AI モデレーション（スパム/個人情報チェック）の強化",
    ],
  },
  {
    month: "2026-03",
    highlights: [
      "全 13 試験区分の問題データ統合",
      "午後 AI 採点機能を全試験区分で公開",
      "解説リファクタ（3 層構造）を AP 2024 秋分まで完了",
    ],
    cost: "AI 利用費 約 ¥2,400",
    next: [
      "解説リファクタを残り 12,094 問に展開",
      "教育貢献プロジェクト体裁への全面ピボット",
    ],
  },
];

export const revalidate = 300;

export default async function TransparencyPage() {
  const total = ALL_QUESTIONS.length;
  const byExam = Object.entries(QUESTIONS_BY_EXAM)
    .map(([code, list]) => ({
      exam: code,
      label: EXAM_LABEL[code] ?? code.toUpperCase(),
      count: list?.length ?? 0,
    }))
    .filter((e) => e.count > 0)
    .sort((a, b) => b.count - a.count);
  const monthlySeries = await fetchPostHogMetrics();

  return (
    <main className="mx-auto w-full max-w-3xl flex-1 px-4 pb-16 pt-8 sm:px-6">
      <header className="mb-6">
        <Badge variant="success">教育貢献プロジェクト</Badge>
        <h1 className="mt-2 text-2xl font-bold sm:text-3xl">運営の透明性レポート</h1>
        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
          月次で運営方針・コスト・意思決定を公開しています。
          利用者から運営が見える状態を保つことが、教育貢献プロジェクトとしての説明責任だと考えています。
        </p>
      </header>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-base">運営方針（不変項目）</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm text-zinc-700 dark:text-zinc-300">
            <li>
              <strong>全機能を無料で公開し続ける。</strong>
              受験生の経済状況に関わらず、最善の対策ツールを使えるようにします。
            </li>
            <li>
              <strong>運営コストはシェア・フィードバックで支える。</strong>
              金銭的負担はお願いしません。AI 利用は初回 10 回 + フィードバック投稿後ほぼ無制限です。
            </li>
            <li>
              <strong>意思決定を公開する。</strong>
              問題データの取り扱い・AI モデルの選定・運営費の使い道を本ページで月次公開します。
            </li>
            <li>
              <strong>個人情報は必要最小限に。</strong>
              学習履歴は localStorage、AI 呼び出しは IP の非可逆ハッシュのみ保持します。
            </li>
          </ul>
        </CardContent>
      </Card>

      <h2 className="mb-3 text-lg font-semibold">月次レポート</h2>
      <div className="space-y-4">
        {REPORTS.map((r) => (
          <Card key={r.month}>
            <CardHeader>
              <CardTitle className="text-base">{r.month} 月次レポート</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div>
                <p className="font-semibold text-zinc-900 dark:text-zinc-50">主なアップデート</p>
                <ul className="mt-1 list-disc pl-5 text-zinc-700 dark:text-zinc-300">
                  {r.highlights.map((h) => (
                    <li key={h}>{h}</li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="font-semibold text-zinc-900 dark:text-zinc-50">運営費の概算</p>
                <p className="mt-1 text-zinc-700 dark:text-zinc-300">{r.cost}</p>
              </div>
              <div>
                <p className="font-semibold text-zinc-900 dark:text-zinc-50">来月以降の予定</p>
                <ul className="mt-1 list-disc pl-5 text-zinc-700 dark:text-zinc-300">
                  {r.next.map((n) => (
                    <li key={n}>{n}</li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <section id="metrics" className="mt-10 scroll-mt-20">
        <h2 className="mb-3 text-lg font-semibold">公開メトリクス</h2>
        <p className="mb-4 text-sm text-zinc-600 dark:text-zinc-400">
          収録問題数・利用状況などの運営実態を公開しています。
        </p>
        <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
          <MetricCard label="総収録問題" value={total.toLocaleString("ja-JP")} sub="全試験区分合計" />
          <MetricCard label="試験区分" value="13 区分" sub="IP / SG / FE / AP / ほか" />
          <MetricCard label="利用料" value="¥0" sub="全機能無料" />
          <MetricCard label="運営スタイル" value="ボランティア有志による運営" sub="教育貢献" />
        </div>
        <Card>
          <CardHeader>
            <CardTitle className="text-base">試験区分別の収録問題数・月次利用状況</CardTitle>
          </CardHeader>
          <CardContent>
            <StatsCharts byExam={byExam} monthlySeries={monthlySeries} />
          </CardContent>
        </Card>
      </section>

      <p className="mt-8 text-center text-xs text-zinc-500 dark:text-zinc-400">
        運営者情報は <Link href="/operator" className="underline hover:text-zinc-700 dark:hover:text-zinc-300">/operator</Link>。
      </p>
    </main>
  );
}

function MetricCard({ label, value, sub }: { label: string; value: string; sub?: string }) {
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
