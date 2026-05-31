"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Legend,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type {
  KpiValue,
  MetricsRange,
  MetricsResponse,
  PageAccess,
} from "@/lib/admin/metrics/types";

const RANGES: Array<{ id: MetricsRange; label: string }> = [
  { id: "today", label: "今日" },
  { id: "7d", label: "7日" },
  { id: "30d", label: "30日" },
  { id: "mtd", label: "今月" },
  { id: "custom", label: "カスタム" },
];

const PIE_COLORS = ["#0284c7", "#10b981", "#f59e0b", "#8b5cf6", "#ec4899", "#14b8a6", "#64748b"];

function pct(n: number): string {
  return `${(n * 100).toFixed(1)}%`;
}

function diff(curr: number, prev: number): { delta: number; ratio: number; dir: "up" | "down" | "flat" } {
  const delta = curr - prev;
  const ratio = prev === 0 ? 0 : delta / prev;
  const dir = Math.abs(ratio) < 0.01 ? "flat" : delta > 0 ? "up" : "down";
  return { delta, ratio, dir };
}

function trendClasses(dir: "up" | "down" | "flat"): string {
  return dir === "up"
    ? "text-emerald-600 dark:text-emerald-400"
    : dir === "down"
      ? "text-rose-600 dark:text-rose-400"
      : "text-zinc-500 dark:text-zinc-400";
}

function trendArrow(dir: "up" | "down" | "flat"): string {
  return dir === "up" ? "▲" : dir === "down" ? "▼" : "→";
}

function KpiCard({ label, kpi, formatter }: { label: string; kpi: KpiValue; formatter?: (n: number) => string }) {
  const fmt = formatter ?? ((n: number) => n.toLocaleString());
  const d = diff(kpi.current, kpi.previous);
  return (
    <Card>
      <CardContent className="p-4">
        <div className="text-xs text-zinc-500 dark:text-zinc-400">{label}</div>
        <div className="mt-1 flex items-baseline gap-1">
          <div className="text-2xl font-bold tracking-tight">{fmt(kpi.current)}</div>
          {kpi.unit && <div className="text-xs text-zinc-500">{kpi.unit}</div>}
        </div>
        <div className={cn("mt-1 text-xs", trendClasses(d.dir))}>
          {trendArrow(d.dir)} {Math.abs(d.ratio * 100).toFixed(1)}%（前期 {fmt(Math.round(kpi.previous))}）
        </div>
      </CardContent>
    </Card>
  );
}

function tooltipStyle() {
  return {
    background: "rgb(24 24 27 / 0.95)",
    border: "1px solid rgb(63 63 70)",
    borderRadius: 8,
    color: "white",
    fontSize: 12,
  } as const;
}

export function MetricsDashboard({ initial }: { initial: MetricsResponse }) {
  const [range, setRange] = useState<MetricsRange>(initial.meta.range);
  const [from, setFrom] = useState(initial.meta.from);
  const [to, setTo] = useState(initial.meta.to);
  const [data, setData] = useState<MetricsResponse>(initial);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let aborted = false;
    const params = new URLSearchParams({ range });
    if (range === "custom") {
      params.set("from", from);
      params.set("to", to);
    }
    setLoading(true);
    setError(null);
    fetch(`/api/admin/metrics?${params.toString()}`, { cache: "no-store" })
      .then(async (res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = (await res.json()) as MetricsResponse;
        if (!aborted) {
          setData(json);
          setFrom(json.meta.from);
          setTo(json.meta.to);
        }
      })
      .catch((err: unknown) => {
        if (!aborted) setError(err instanceof Error ? err.message : "fetch failed");
      })
      .finally(() => {
        if (!aborted) setLoading(false);
      });
    return () => {
      aborted = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [range, range === "custom" ? from : null, range === "custom" ? to : null]);

  return (
    <div className="space-y-6">
      <RangeTabs
        range={range}
        from={from}
        to={to}
        loading={loading}
        meta={data.meta}
        source={data.source}
        cachedAt={data.cachedAt}
        onRange={(r) => setRange(r)}
        onFrom={(v) => setFrom(v)}
        onTo={(v) => setTo(v)}
      />
      {error && (
        <div className="rounded-md border border-rose-200 bg-rose-50 p-3 text-sm text-rose-800 dark:border-rose-900 dark:bg-rose-950 dark:text-rose-200">
          データ取得に失敗しました: {error}
        </div>
      )}

      <Section1Summary data={data} />
      <Section2Features data={data} />
      <Section3Pages data={data} />
      <Section4Traffic data={data} />
      <Section5Flow data={data} />
      <Section6Conversion data={data} />
      <Section7Errors data={data} />
      <Section8Insights data={data} />
    </div>
  );
}

function RangeTabs({
  range,
  from,
  to,
  loading,
  meta,
  source,
  cachedAt,
  onRange,
  onFrom,
  onTo,
}: {
  range: MetricsRange;
  from: string;
  to: string;
  loading: boolean;
  meta: MetricsResponse["meta"];
  source: MetricsResponse["source"];
  cachedAt?: string;
  onRange: (r: MetricsRange) => void;
  onFrom: (v: string) => void;
  onTo: (v: string) => void;
}) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-zinc-200 bg-white p-2 dark:border-zinc-800 dark:bg-zinc-950">
      <div className="flex flex-wrap items-center gap-1">
        {RANGES.map((r) => (
          <button
            key={r.id}
            type="button"
            onClick={() => onRange(r.id)}
            className={cn(
              "rounded-md px-3 py-1.5 text-xs font-medium transition",
              range === r.id
                ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900"
                : "text-zinc-600 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800",
            )}
          >
            {r.label}
          </button>
        ))}
        {range === "custom" && (
          <div className="ml-2 flex items-center gap-1 text-xs">
            <input
              type="date"
              aria-label="集計開始日"
              value={from}
              onChange={(e) => onFrom(e.target.value)}
              className="rounded border border-zinc-300 bg-white px-2 py-1 dark:border-zinc-700 dark:bg-zinc-900"
            />
            <span className="text-zinc-500">〜</span>
            <input
              type="date"
              aria-label="集計終了日"
              value={to}
              onChange={(e) => onTo(e.target.value)}
              className="rounded border border-zinc-300 bg-white px-2 py-1 dark:border-zinc-700 dark:bg-zinc-900"
            />
          </div>
        )}
      </div>
      <div className="flex flex-wrap items-center gap-2 px-1 text-[11px] text-zinc-500 dark:text-zinc-400">
        <span>
          {meta.from} 〜 {meta.to}（前期: {meta.comparedFrom} 〜 {meta.comparedTo}）
        </span>
        <Badge variant={source === "posthog" ? "success" : "warn"}>
          {source === "posthog" ? "PostHog" : "モック"}
        </Badge>
        {cachedAt && (
          <span className="text-[10px]">
            キャッシュ {new Date(cachedAt).toLocaleTimeString("ja-JP")}
          </span>
        )}
        {loading && <span className="text-[10px] text-zinc-400">更新中…</span>}
      </div>
    </div>
  );
}

function Section1Summary({ data }: { data: MetricsResponse }) {
  const s = data.summary;
  return (
    <SectionShell n={1} title="サマリ" subtitle="主要 KPI と前期比">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        <KpiCard label="DAU（平均）" kpi={s.dau} />
        <KpiCard label="MAU" kpi={s.mau} />
        <KpiCard label="解答数（合計）" kpi={s.answers} />
        <KpiCard label="AI 質問数" kpi={s.aiQuestions} />
        <KpiCard label="フィードバック" kpi={s.feedback} />
      </div>
      <Card className="mt-4">
        <CardHeader>
          <CardTitle className="text-base">日次推移</CardTitle>
        </CardHeader>
        <CardContent>
          {/* 日次推移の時系列は近接する表/KPI に代替表現が無く、この折れ線が唯一の表現。
              SR 利用者向けに role=img + 説明ラベルを付与（WCAG 1.1.1・additive）。
              機能別バー(Section2)・流入元円(Section4)は直下に同データの表があるため付与しない。 */}
          <div
            className="h-72 w-full"
            role="img"
            aria-label="DAU と解答数の日次推移グラフ"
          >
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={s.series} margin={{ top: 12, right: 16, left: 0, bottom: 8 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgb(161 161 170 / 0.25)" />
                <XAxis dataKey="date" tick={{ fontSize: 11, fill: "currentColor" }} />
                <YAxis yAxisId="l" tick={{ fontSize: 11, fill: "currentColor" }} />
                <YAxis yAxisId="r" orientation="right" tick={{ fontSize: 11, fill: "currentColor" }} />
                <Tooltip contentStyle={tooltipStyle()} />
                <Legend wrapperStyle={{ fontSize: 12 }} />
                <Line yAxisId="l" type="monotone" dataKey="dau" name="DAU" stroke="#0284c7" strokeWidth={2} dot={false} />
                <Line yAxisId="r" type="monotone" dataKey="answers" name="解答数" stroke="#10b981" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </SectionShell>
  );
}

function Section2Features({ data }: { data: MetricsResponse }) {
  const items = data.features.features;
  const chartData = items.map((f) => ({ name: f.feature, 使用回数: f.uses, UU: f.uniqueUsers }));
  return (
    <SectionShell n={2} title="機能別利用状況" subtitle="クイズ／AI 各機能の使用回数と UU">
      <Card>
        <CardContent className="p-4">
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 12, right: 16, left: 0, bottom: 60 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgb(161 161 170 / 0.25)" />
                <XAxis dataKey="name" tick={{ fontSize: 10, fill: "currentColor" }} angle={-25} textAnchor="end" interval={0} height={70} />
                <YAxis tick={{ fontSize: 11, fill: "currentColor" }} />
                <Tooltip contentStyle={tooltipStyle()} />
                <Legend wrapperStyle={{ fontSize: 12 }} />
                <Bar dataKey="使用回数" fill="#0284c7" radius={[4, 4, 0, 0]} />
                <Bar dataKey="UU" fill="#10b981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-3 overflow-x-auto">
            <table className="w-full min-w-[520px] text-sm">
              <thead>
                <tr className="border-b border-zinc-200 text-left text-xs font-semibold text-zinc-500 dark:border-zinc-800 dark:text-zinc-400">
                  <th className="py-2 pr-3">機能</th>
                  <th className="py-2 pr-3">パス</th>
                  <th className="py-2 pr-3 text-right">使用回数</th>
                  <th className="py-2 pr-3 text-right">UU</th>
                </tr>
              </thead>
              <tbody>
                {items.map((f) => (
                  <tr key={f.feature} className="border-b border-zinc-100 dark:border-zinc-900">
                    <td className="py-2 pr-3 font-medium">{f.feature}</td>
                    <td className="py-2 pr-3 font-mono text-xs text-zinc-500">{f.path}</td>
                    <td className="py-2 pr-3 text-right">{f.uses.toLocaleString()}</td>
                    <td className="py-2 pr-3 text-right">{f.uniqueUsers.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </SectionShell>
  );
}

function Section3Pages({ data }: { data: MetricsResponse }) {
  const { byExam, byBlog, byQuestion } = data.pages;
  return (
    <SectionShell n={3} title="ページ別アクセス" subtitle="試験区分 TOP13 / ブログ TOP10 / 問題 TOP20">
      <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
        <PageTable title="試験区分（TOP13）" rows={byExam} />
        <PageTable title="ブログ（TOP10）" rows={byBlog} />
      </div>
      <div className="mt-3">
        <PageTable title="問題ページ（TOP20）" rows={byQuestion} />
      </div>
    </SectionShell>
  );
}

function PageTable({ title, rows }: { title: string; rows: PageAccess[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[420px] text-sm">
            <thead>
              <tr className="border-b border-zinc-200 text-left text-xs font-semibold text-zinc-500 dark:border-zinc-800 dark:text-zinc-400">
                <th className="py-2 pr-3">URL / タイトル</th>
                <th className="py-2 pr-3 text-right">PV</th>
                <th className="py-2 pr-3 text-right">滞在時間</th>
                <th className="py-2 pr-3 text-right">直帰率</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.url} className="border-b border-zinc-100 dark:border-zinc-900">
                  <td className="py-2 pr-3">
                    <div className="font-medium">{r.title}</div>
                    <div className="font-mono text-[10px] text-zinc-500">{r.url}</div>
                  </td>
                  <td className="py-2 pr-3 text-right">{r.pv.toLocaleString()}</td>
                  <td className="py-2 pr-3 text-right">
                    {Math.floor(r.avgDurationSec / 60)}m{(r.avgDurationSec % 60).toString().padStart(2, "0")}s
                  </td>
                  <td className="py-2 pr-3 text-right">{pct(r.bounceRate)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}

function Section4Traffic({ data }: { data: MetricsResponse }) {
  const { sources, keywords } = data.traffic;
  const pieData = sources.map((s) => ({ name: s.source, value: s.sessions }));
  return (
    <SectionShell n={4} title="流入元分析" subtitle="チャネル別セッションと検索キーワード">
      <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">チャネル別セッション</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={pieData} dataKey="value" nameKey="name" outerRadius={92} label={(p) => `${p.name} ${pct((p.percent as number) ?? 0)}`}>
                    {pieData.map((_, i) => (
                      <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={tooltipStyle()} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-2 overflow-x-auto">
              <table className="w-full min-w-[320px] text-sm">
                <thead>
                  <tr className="border-b border-zinc-200 text-left text-xs font-semibold text-zinc-500 dark:border-zinc-800 dark:text-zinc-400">
                    <th className="py-2 pr-3">チャネル</th>
                    <th className="py-2 pr-3 text-right">セッション</th>
                    <th className="py-2 pr-3 text-right">構成比</th>
                  </tr>
                </thead>
                <tbody>
                  {sources.map((s) => (
                    <tr key={s.source} className="border-b border-zinc-100 dark:border-zinc-900">
                      <td className="py-2 pr-3 font-medium">{s.source}</td>
                      <td className="py-2 pr-3 text-right">{s.sessions.toLocaleString()}</td>
                      <td className="py-2 pr-3 text-right">{pct(s.share)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">検索キーワード TOP10</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[420px] text-sm">
                <thead>
                  <tr className="border-b border-zinc-200 text-left text-xs font-semibold text-zinc-500 dark:border-zinc-800 dark:text-zinc-400">
                    <th className="py-2 pr-3">キーワード</th>
                    <th className="py-2 pr-3 text-right">表示</th>
                    <th className="py-2 pr-3 text-right">CL</th>
                    <th className="py-2 pr-3 text-right">CTR</th>
                  </tr>
                </thead>
                <tbody>
                  {keywords.map((k) => (
                    <tr key={k.keyword} className="border-b border-zinc-100 dark:border-zinc-900">
                      <td className="py-2 pr-3 font-medium">{k.keyword}</td>
                      <td className="py-2 pr-3 text-right">{k.impressions.toLocaleString()}</td>
                      <td className="py-2 pr-3 text-right">{k.clicks.toLocaleString()}</td>
                      <td className="py-2 pr-3 text-right">{pct(k.ctr)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </SectionShell>
  );
}

function Section5Flow({ data }: { data: MetricsResponse }) {
  return (
    <SectionShell n={5} title="ユーザー行動フロー" subtitle="新規・リピーター導線の通過率">
      <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
        <FunnelCard title="新規ユーザー" steps={data.flow.newUserFunnel} />
        <FunnelCard title="リピーター" steps={data.flow.returningUserFunnel} />
      </div>
    </SectionShell>
  );
}

function FunnelCard({ title, steps }: { title: string; steps: MetricsResponse["flow"]["newUserFunnel"] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {steps.map((s, i) => (
            <li key={s.step}>
              <div className="flex items-center justify-between text-sm">
                <span>
                  <span className="mr-2 inline-block w-5 text-center font-mono text-xs text-zinc-500">{i + 1}</span>
                  {s.step}
                </span>
                <span className="font-medium">{s.users.toLocaleString()} 人</span>
              </div>
              <div className="mt-1 h-2 w-full overflow-hidden rounded bg-zinc-100 dark:bg-zinc-800">
                <div className="h-full bg-sky-500" style={{ width: `${Math.min(100, s.passRate * 100)}%` }} />
              </div>
              <div className="mt-0.5 text-right text-[11px] text-zinc-500">通過率 {pct(s.passRate)}</div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}

function Section6Conversion({ data }: { data: MetricsResponse }) {
  const c = data.conversions;
  return (
    <SectionShell n={6} title="コンバージョン" subtitle="アフィリエイトクリックと CTR">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <KpiCard label="Amazon クリック" kpi={c.totals.amazonClicks} />
        <KpiCard label="楽天 クリック" kpi={c.totals.rakutenClicks} />
        <KpiCard
          label="全体 CTR（‰）"
          kpi={c.totals.overallCtr}
          formatter={(n) => (n / 1000).toFixed(2) + "%"}
        />
      </div>
      <Card className="mt-3">
        <CardHeader>
          <CardTitle className="text-base">書籍別 TOP10</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[480px] text-sm">
              <thead>
                <tr className="border-b border-zinc-200 text-left text-xs font-semibold text-zinc-500 dark:border-zinc-800 dark:text-zinc-400">
                  <th className="py-2 pr-3">書籍</th>
                  <th className="py-2 pr-3">ベンダー</th>
                  <th className="py-2 pr-3 text-right">表示</th>
                  <th className="py-2 pr-3 text-right">クリック</th>
                  <th className="py-2 pr-3 text-right">CTR</th>
                </tr>
              </thead>
              <tbody>
                {c.topProducts.map((p) => (
                  <tr key={p.product} className="border-b border-zinc-100 dark:border-zinc-900">
                    <td className="py-2 pr-3 font-medium">{p.product}</td>
                    <td className="py-2 pr-3">
                      <Badge variant={p.vendor === "amazon" ? "warn" : "default"}>
                        {p.vendor === "amazon" ? "Amazon" : "楽天"}
                      </Badge>
                    </td>
                    <td className="py-2 pr-3 text-right">{p.views.toLocaleString()}</td>
                    <td className="py-2 pr-3 text-right">{p.clicks.toLocaleString()}</td>
                    <td className="py-2 pr-3 text-right">{pct(p.ctr)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </SectionShell>
  );
}

function Section7Errors({ data }: { data: MetricsResponse }) {
  const e = data.errors;
  return (
    <SectionShell
      n={7}
      title="エラー"
      subtitle={`直近 24 時間の上位 5 件（${e.source === "sentry" ? "Sentry" : "モック"} ・ 合計 ${e.totalEvents24h} 件）`}
    >
      <Card>
        <CardContent className="p-4">
          <ul className="space-y-3">
            {e.topErrors.map((er) => (
              <li key={er.message} className="rounded-md border border-zinc-200 p-3 dark:border-zinc-800">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <Badge
                    variant={er.level === "fatal" ? "danger" : er.level === "error" ? "danger" : "warn"}
                  >
                    {er.level.toUpperCase()}
                  </Badge>
                  <span className="text-xs text-zinc-500">
                    最終発生 {new Date(er.lastSeen).toLocaleString("ja-JP")}
                  </span>
                </div>
                <div className="mt-1 break-all font-mono text-xs">{er.message}</div>
                <div className="mt-1 flex justify-between text-xs text-zinc-500">
                  <span className="font-mono">{er.url ?? "—"}</span>
                  <span>{er.count} 件</span>
                </div>
              </li>
            ))}
          </ul>
          {e.source === "mock" && (
            <p className="mt-3 text-[11px] text-zinc-500">
              SENTRY_AUTH_TOKEN と SENTRY_ORG / SENTRY_PROJECT を設定すると Sentry の実データに切り替わります（実装は未接続）。
            </p>
          )}
        </CardContent>
      </Card>
    </SectionShell>
  );
}

function Section8Insights({ data }: { data: MetricsResponse }) {
  const i = data.insights;
  return (
    <SectionShell n={8} title="改善判断用インサイト" subtitle="使われていない／離脱率高／成長 TOP3">
      <div className="grid grid-cols-1 gap-3 lg:grid-cols-3">
        <InsightList title="使われていない機能" tone="warn" items={i.unused} />
        <InsightList title="離脱率が高い" tone="danger" items={i.highDropoff} />
        <InsightList title="成長中" tone="success" items={i.growth} />
      </div>
      <Card className="mt-3">
        <CardHeader>
          <CardTitle className="text-base">AI コメント</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="whitespace-pre-wrap text-sm leading-7">{i.aiComment}</p>
        </CardContent>
      </Card>
    </SectionShell>
  );
}

function InsightList({
  title,
  tone,
  items,
}: {
  title: string;
  tone: "warn" | "danger" | "success";
  items: MetricsResponse["insights"]["unused"];
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-base">
          <Badge variant={tone}>{title}</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-3">
          {items.map((it) => (
            <li key={it.title}>
              <div className="flex items-center justify-between gap-2">
                <span className="font-medium">{it.title}</span>
                <span className="font-mono text-xs text-zinc-500">{it.metric}</span>
              </div>
              <div className="mt-0.5 text-xs text-zinc-600 dark:text-zinc-400">{it.detail}</div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}

function SectionShell({
  n,
  title,
  subtitle,
  children,
}: {
  n: number;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  const id = useMemo(() => `section-${n}`, [n]);
  return (
    <section id={id} className="scroll-mt-20">
      <div className="mb-2 flex items-baseline gap-2">
        <Badge variant="outline">Section {n}</Badge>
        <h2 className="text-lg font-semibold tracking-tight">{title}</h2>
        {subtitle && <span className="text-xs text-zinc-500 dark:text-zinc-400">— {subtitle}</span>}
      </div>
      {children}
    </section>
  );
}
