"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type {
  ConversionRow,
  ErrorRow,
  FeatureUsage,
  FunnelStep,
  InsightItem,
  KeywordRow,
  MetricsPeriod,
  MetricsResponse,
  PageStat,
  SourceRow,
  SummarySection,
} from "@/lib/admin/metrics-types";

const PERIODS: Array<{ value: MetricsPeriod; label: string }> = [
  { value: "24h", label: "24時間" },
  { value: "7d", label: "7日間" },
  { value: "30d", label: "30日間" },
  { value: "90d", label: "90日間" },
];

const PIE_COLORS = ["#0284c7", "#10b981", "#f59e0b", "#8b5cf6", "#ec4899", "#64748b"];

export function MetricsDashboard() {
  const [period, setPeriod] = useState<MetricsPeriod>("7d");
  const [data, setData] = useState<MetricsResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    fetch(`/api/admin/metrics?period=${period}`, { cache: "no-store" })
      .then(async (res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return (await res.json()) as MetricsResponse;
      })
      .then((d) => {
        if (!cancelled) setData(d);
      })
      .catch((err: unknown) => {
        if (!cancelled) setError(err instanceof Error ? err.message : "unknown error");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [period]);

  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-4 pb-10 pt-8 sm:px-6">
      <header className="mb-6 flex flex-wrap items-start justify-between gap-3">
        <div>
          <div className="mb-1 flex items-center gap-2">
            <Badge variant="outline">管理画面</Badge>
            <Badge variant="success">Basic Auth 保護</Badge>
            {data && (
              <Badge variant={data.source === "posthog" ? "success" : "warn"}>
                {data.source === "posthog" ? "PostHog 接続中" : "モックデータ"}
              </Badge>
            )}
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-3xl">
            メトリクスダッシュボード
          </h1>
          <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
            DAU / 機能別利用 / ページ別 / 流入 / フロー / コンバージョン / エラー / インサイト の 8 セクション。
            5 分間サーバーキャッシュ。
          </p>
        </div>
        <PeriodTabs period={period} onChange={setPeriod} />
      </header>

      {error && (
        <Card className="mb-4 border-rose-300 dark:border-rose-900">
          <CardContent className="py-3 text-sm text-rose-700 dark:text-rose-300">
            メトリクスの取得に失敗しました: {error}
          </CardContent>
        </Card>
      )}
      {loading && !data && (
        <div className="rounded-2xl border border-dashed border-zinc-300 p-10 text-center text-sm text-zinc-500 dark:border-zinc-700 dark:text-zinc-400">
          読み込み中…
        </div>
      )}

      {data && (
        <div className="space-y-6">
          <Section title="1. サマリ" subtitle={`前${periodLabel(period)}比較`}>
            <SummaryCards summary={data.summary} />
          </Section>

          <Section title="2. 機能別利用" subtitle="使用回数 / ユニークユーザー">
            <FeaturesChart features={data.features} />
          </Section>

          <Section title="3. ページ別アクセス" subtitle="URL 別 PV / 滞在 / 直帰率">
            <PagesTabs pages={data.pages} />
          </Section>

          <Section title="4. 流入元分析" subtitle="参照元・キーワード">
            <SourcesAndKeywords sources={data.sources.sources} keywords={data.sources.keywords} />
          </Section>

          <Section title="5. ユーザー行動フロー" subtitle="新規 / リピーター 各ステップ通過率">
            <FlowFunnels newUsers={data.flow.newUsers} returning={data.flow.returningUsers} />
          </Section>

          <Section title="6. コンバージョン" subtitle="アフィリエイト クリック">
            <ConversionPanel conversion={data.conversion} />
          </Section>

          <Section title="7. エラー" subtitle="直近 24 時間 TOP 5（Sentry / PostHog 例外）">
            <ErrorsTable errors={data.errors} />
          </Section>

          <Section title="8. 改善判断インサイト" subtitle="使われていない / 離脱率高い / 成長 各 TOP 3">
            <InsightsPanel insights={data.insights} />
          </Section>

          <p className="text-xs text-zinc-400 dark:text-zinc-600">
            生成時刻: {new Date(data.generatedAt).toLocaleString("ja-JP")} ／ ソース: {data.source}
          </p>
        </div>
      )}
    </main>
  );
}

function periodLabel(p: MetricsPeriod): string {
  return PERIODS.find((x) => x.value === p)?.label ?? p;
}

function PeriodTabs({ period, onChange }: { period: MetricsPeriod; onChange: (p: MetricsPeriod) => void }) {
  return (
    <div className="inline-flex rounded-xl border border-zinc-200 bg-white p-1 text-sm dark:border-zinc-800 dark:bg-zinc-900">
      {PERIODS.map((p) => (
        <button
          key={p.value}
          type="button"
          onClick={() => onChange(p.value)}
          className={cn(
            "rounded-lg px-3 py-1.5 font-medium transition-colors",
            p.value === period
              ? "bg-sky-600 text-white shadow"
              : "text-zinc-600 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800",
          )}
        >
          {p.label}
        </button>
      ))}
    </div>
  );
}

function Section({ title, subtitle, children }: { title: string; subtitle?: string; children: React.ReactNode }) {
  return (
    <section>
      <div className="mb-2 flex items-baseline gap-2">
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">{title}</h2>
        {subtitle && <span className="text-xs text-zinc-500 dark:text-zinc-400">{subtitle}</span>}
      </div>
      {children}
    </section>
  );
}

function formatDelta(n: number): { text: string; positive: boolean; neutral: boolean } {
  const positive = n > 0;
  const neutral = Math.abs(n) < 0.005;
  const sign = positive ? "+" : "";
  return {
    text: `${sign}${(n * 100).toFixed(1)}%`,
    positive,
    neutral,
  };
}

function SummaryCards({ summary }: { summary: SummarySection }) {
  const items: Array<{ label: string; v: { value: number; delta: number } }> = [
    { label: "DAU", v: summary.dau },
    { label: "MAU", v: summary.mau },
    { label: "解答数", v: summary.answers },
    { label: "AI 質問数", v: summary.aiQuestions },
    { label: "フィードバック", v: summary.feedback },
  ];
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
      {items.map((it) => {
        const d = formatDelta(it.v.delta);
        return (
          <Card key={it.label}>
            <CardContent className="p-4">
              <div className="text-xs text-zinc-500 dark:text-zinc-400">{it.label}</div>
              <div className="mt-1 text-2xl font-bold tracking-tight">{it.v.value.toLocaleString()}</div>
              <div
                className={cn(
                  "mt-1 text-xs font-medium",
                  d.neutral
                    ? "text-zinc-500 dark:text-zinc-400"
                    : d.positive
                      ? "text-emerald-600 dark:text-emerald-400"
                      : "text-rose-600 dark:text-rose-400",
                )}
              >
                {d.text} 前期比
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}

function FeaturesChart({ features }: { features: FeatureUsage[] }) {
  const chartData = features.map((f) => ({
    name: f.feature,
    使用回数: f.uses,
    UU: f.uu,
  }));
  return (
    <Card>
      <CardContent className="p-4">
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 12, right: 12, left: 0, bottom: 60 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgb(161 161 170 / 0.25)" />
              <XAxis
                dataKey="name"
                tick={{ fontSize: 10, fill: "currentColor" }}
                interval={0}
                angle={-30}
                textAnchor="end"
              />
              <YAxis yAxisId="left" tick={{ fontSize: 10, fill: "currentColor" }} />
              <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 10, fill: "currentColor" }} />
              <Tooltip contentStyle={tooltipStyle} />
              <Legend wrapperStyle={{ fontSize: 12 }} />
              <Bar yAxisId="left" dataKey="使用回数" fill="#0284c7" radius={[4, 4, 0, 0]} />
              <Bar yAxisId="right" dataKey="UU" fill="#10b981" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}

function PagesTabs({ pages }: { pages: MetricsResponse["pages"] }) {
  type Tab = "all" | "exam" | "blog" | "question";
  const [tab, setTab] = useState<Tab>("all");
  const tabs: Array<{ value: Tab; label: string }> = [
    { value: "all", label: "ページ全体" },
    { value: "exam", label: "試験区分 TOP13" },
    { value: "blog", label: "ブログ TOP10" },
    { value: "question", label: "問題 TOP20" },
  ];
  const rows = useMemo(() => {
    switch (tab) {
      case "exam":
        return pages.topExams;
      case "blog":
        return pages.topBlog;
      case "question":
        return pages.topQuestions;
      default:
        return pages.topPages;
    }
  }, [tab, pages]);

  return (
    <Card>
      <CardHeader className="flex flex-wrap gap-2 pb-2">
        {tabs.map((t) => (
          <button
            key={t.value}
            type="button"
            onClick={() => setTab(t.value)}
            className={cn(
              "rounded-full px-3 py-1 text-xs font-medium transition-colors",
              tab === t.value
                ? "bg-sky-600 text-white"
                : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-700",
            )}
          >
            {t.label}
          </button>
        ))}
      </CardHeader>
      <CardContent>
        <PageTable rows={rows} />
      </CardContent>
    </Card>
  );
}

function PageTable({ rows }: { rows: PageStat[] }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[560px] text-sm">
        <thead>
          <tr className="border-b border-zinc-200 text-left text-xs font-semibold text-zinc-500 dark:border-zinc-800 dark:text-zinc-400">
            <th className="py-2 pr-3">URL</th>
            <th className="py-2 pr-3 text-right">PV</th>
            <th className="py-2 pr-3 text-right">平均滞在</th>
            <th className="py-2 pr-3 text-right">直帰率</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.url} className="border-b border-zinc-100 dark:border-zinc-900">
              <td className="py-2 pr-3">
                <div className="font-medium">{r.label ?? r.url}</div>
                <div className="font-mono text-[11px] text-zinc-500 dark:text-zinc-400">{r.url}</div>
              </td>
              <td className="py-2 pr-3 text-right tabular-nums">{r.pv.toLocaleString()}</td>
              <td className="py-2 pr-3 text-right tabular-nums">{formatDuration(r.avgDurationSec)}</td>
              <td className="py-2 pr-3 text-right tabular-nums">{(r.bounceRate * 100).toFixed(1)}%</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function formatDuration(sec: number): string {
  if (sec < 60) return `${sec}秒`;
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return s === 0 ? `${m}分` : `${m}分${s}秒`;
}

function SourcesAndKeywords({ sources, keywords }: { sources: SourceRow[]; keywords: KeywordRow[] }) {
  return (
    <div className="grid gap-4 lg:grid-cols-5">
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle className="text-sm">参照元シェア</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={sources.map((s) => ({ name: s.source, value: s.sessions }))}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={90}
                  label={(entry: { name?: string; percent?: number }) =>
                    `${entry.name ?? ""} ${((entry.percent ?? 0) * 100).toFixed(0)}%`
                  }
                  labelLine={false}
                >
                  {sources.map((_, i) => (
                    <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={tooltipStyle} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
      <Card className="lg:col-span-3">
        <CardHeader>
          <CardTitle className="text-sm">検索キーワード TOP 10</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[480px] text-sm">
              <thead>
                <tr className="border-b border-zinc-200 text-left text-xs font-semibold text-zinc-500 dark:border-zinc-800 dark:text-zinc-400">
                  <th className="py-2 pr-3">キーワード</th>
                  <th className="py-2 pr-3 text-right">表示</th>
                  <th className="py-2 pr-3 text-right">クリック</th>
                  <th className="py-2 pr-3 text-right">CTR</th>
                </tr>
              </thead>
              <tbody>
                {keywords.map((k) => (
                  <tr key={k.keyword} className="border-b border-zinc-100 dark:border-zinc-900">
                    <td className="py-2 pr-3 font-medium">{k.keyword}</td>
                    <td className="py-2 pr-3 text-right tabular-nums">{k.impressions.toLocaleString()}</td>
                    <td className="py-2 pr-3 text-right tabular-nums">{k.clicks.toLocaleString()}</td>
                    <td className="py-2 pr-3 text-right tabular-nums">{(k.ctr * 100).toFixed(1)}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function FlowFunnels({ newUsers, returning }: { newUsers: FunnelStep[]; returning: FunnelStep[] }) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <FunnelCard title="新規ユーザー導線" steps={newUsers} accent="#0284c7" />
      <FunnelCard title="リピーター導線" steps={returning} accent="#10b981" />
    </div>
  );
}

function FunnelCard({ title, steps, accent }: { title: string; steps: FunnelStep[]; accent: string }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm">{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {steps.map((s, i) => {
          const widthPct = Math.max(s.rate * 100, 3);
          return (
            <div key={s.step}>
              <div className="mb-1 flex items-baseline justify-between text-xs">
                <span className="font-medium text-zinc-700 dark:text-zinc-300">
                  {i + 1}. {s.step}
                </span>
                <span className="tabular-nums text-zinc-500 dark:text-zinc-400">
                  {s.users.toLocaleString()}人 ({(s.rate * 100).toFixed(0)}%)
                </span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-800">
                <div className="h-full rounded-full transition-all" style={{ width: `${widthPct}%`, background: accent }} />
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}

function ConversionPanel({ conversion }: { conversion: MetricsResponse["conversion"] }) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <KpiSimple label="Amazon クリック" value={conversion.amazonClicks.toLocaleString()} sub={`CTR ${(conversion.amazonCtr * 100).toFixed(2)}%`} />
        <KpiSimple label="楽天 クリック" value={conversion.rakutenClicks.toLocaleString()} sub={`CTR ${(conversion.rakutenCtr * 100).toFixed(2)}%`} />
        <KpiSimple
          label="合計クリック"
          value={(conversion.amazonClicks + conversion.rakutenClicks).toLocaleString()}
        />
        <KpiSimple
          label="平均 CTR"
          value={`${(((conversion.amazonCtr + conversion.rakutenCtr) / 2) * 100).toFixed(2)}%`}
        />
      </div>
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">書籍別 TOP 10</CardTitle>
        </CardHeader>
        <CardContent>
          <ConversionTable rows={conversion.topBooks} />
        </CardContent>
      </Card>
    </div>
  );
}

function ConversionTable({ rows }: { rows: ConversionRow[] }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[420px] text-sm">
        <thead>
          <tr className="border-b border-zinc-200 text-left text-xs font-semibold text-zinc-500 dark:border-zinc-800 dark:text-zinc-400">
            <th className="py-2 pr-3">書籍</th>
            <th className="py-2 pr-3">チャネル</th>
            <th className="py-2 pr-3 text-right">クリック</th>
            <th className="py-2 pr-3 text-right">CTR</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={`${r.product}-${r.channel}`} className="border-b border-zinc-100 dark:border-zinc-900">
              <td className="py-2 pr-3 font-medium">{r.product}</td>
              <td className="py-2 pr-3 capitalize">{r.channel}</td>
              <td className="py-2 pr-3 text-right tabular-nums">{r.clicks.toLocaleString()}</td>
              <td className="py-2 pr-3 text-right tabular-nums">{(r.ctr * 100).toFixed(2)}%</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function ErrorsTable({ errors }: { errors: MetricsResponse["errors"] }) {
  return (
    <Card>
      <CardHeader className="flex flex-wrap items-baseline gap-3">
        <CardTitle className="text-sm">直近 24 時間 エラー</CardTitle>
        <span className="text-xs text-zinc-500 dark:text-zinc-400">
          発生件数 {errors.totalLast24h} ／ エラー率 {(errors.errorRate * 100).toFixed(3)}%
        </span>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {errors.topErrors.map((e, i) => (
            <ErrorRowItem key={i} row={e} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function ErrorRowItem({ row }: { row: ErrorRow }) {
  const ago = formatRelativeTime(new Date(row.lastSeen));
  return (
    <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-3 text-sm dark:border-zinc-800 dark:bg-zinc-900/50">
      <div className="flex flex-wrap items-baseline gap-2">
        <Badge variant="danger">{row.count} 件</Badge>
        <span className="font-mono text-xs text-zinc-700 dark:text-zinc-300">{row.message}</span>
      </div>
      <div className="mt-1 flex flex-wrap gap-3 text-xs text-zinc-500 dark:text-zinc-400">
        {row.url && <span className="font-mono">{row.url}</span>}
        <span>最終: {ago}</span>
      </div>
    </div>
  );
}

function formatRelativeTime(d: Date): string {
  const diff = Date.now() - d.getTime();
  const min = Math.floor(diff / 60_000);
  if (min < 60) return `${min}分前`;
  const h = Math.floor(min / 60);
  if (h < 24) return `${h}時間前`;
  return `${Math.floor(h / 24)}日前`;
}

function InsightsPanel({ insights }: { insights: MetricsResponse["insights"] }) {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      <InsightColumn title="未活用 TOP 3" tone="warn" items={insights.underused} />
      <InsightColumn title="離脱率高 TOP 3" tone="danger" items={insights.highChurn} />
      <InsightColumn title="成長 TOP 3" tone="success" items={insights.growing} />
    </div>
  );
}

function InsightColumn({
  title,
  tone,
  items,
}: {
  title: string;
  tone: "warn" | "danger" | "success";
  items: InsightItem[];
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm">
          <Badge variant={tone}>{title}</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {items.map((it) => (
          <div key={it.title}>
            <div className="text-sm font-semibold">{it.title}</div>
            <div className="mt-0.5 text-xs text-zinc-600 dark:text-zinc-400">{it.detail}</div>
            <div className="mt-1 font-mono text-xs text-zinc-500 dark:text-zinc-400">{it.metric}</div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

function KpiSimple({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="text-xs text-zinc-500 dark:text-zinc-400">{label}</div>
        <div className="mt-1 text-2xl font-bold tracking-tight tabular-nums">{value}</div>
        {sub && <div className="mt-1 text-[11px] text-zinc-500 dark:text-zinc-400">{sub}</div>}
      </CardContent>
    </Card>
  );
}

const tooltipStyle = {
  background: "rgb(24 24 27 / 0.95)",
  border: "1px solid rgb(63 63 70)",
  borderRadius: 8,
  color: "white",
  fontSize: 12,
} as const;
