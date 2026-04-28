"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

// モックデータ
const DAILY_DATA = [
  { date: "4/20", dau: 312, answers: 2840, premium: 4 },
  { date: "4/21", dau: 345, answers: 3100, premium: 5 },
  { date: "4/22", dau: 289, answers: 2650, premium: 3 },
  { date: "4/23", dau: 401, answers: 3820, premium: 7 },
  { date: "4/24", dau: 478, answers: 4310, premium: 9 },
  { date: "4/25", dau: 521, answers: 4780, premium: 11 },
  { date: "4/26", dau: 498, answers: 4520, premium: 10 },
];

const WEEKLY_DATA = [
  { date: "3/31週", dau: 1820, answers: 16400, premium: 22 },
  { date: "4/7週", dau: 2340, answers: 21200, premium: 31 },
  { date: "4/14週", dau: 2890, answers: 26100, premium: 41 },
  { date: "4/21週", dau: 2844, answers: 26020, premium: 49 },
];

const MONTHLY_DATA = [
  { date: "1月", dau: 6800, answers: 61200, premium: 68 },
  { date: "2月", dau: 8200, answers: 73800, premium: 89 },
  { date: "3月", dau: 9600, answers: 86400, premium: 112 },
  { date: "4月", dau: 11300, answers: 101700, premium: 153 },
];

const FUNNEL_DATA = [
  { stage: "訪問", count: 15000, pct: 100, color: "#0ea5e9" },
  { stage: "問題開始", count: 9200, pct: 61, color: "#38bdf8" },
  { stage: "5問完了", count: 5100, pct: 34, color: "#7dd3fc" },
  { stage: "メール登録", count: 1247, pct: 8.3, color: "#bae6fd" },
  { stage: "プレミアム", count: 153, pct: 1.0, color: "#e0f2fe" },
];

type Tab = "daily" | "weekly" | "monthly";

export default function AnalyticsPage() {
  const [tab, setTab] = React.useState<Tab>("daily");

  const data = tab === "daily" ? DAILY_DATA : tab === "weekly" ? WEEKLY_DATA : MONTHLY_DATA;
  const tabLabel = tab === "daily" ? "日次" : tab === "weekly" ? "週次" : "月次";

  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-4 pb-10 pt-8 sm:px-6">
      <div className="mb-6 flex flex-wrap items-start justify-between gap-3">
        <div>
          <div className="mb-1 flex items-center gap-2">
            <Badge variant="outline">管理画面</Badge>
            <Badge variant="outline">モックデータ</Badge>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-3xl">
            アナリティクス ダッシュボード
          </h1>
          <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
            ファネル分析・KPI・コンバージョン追跡（モックデータ表示）
          </p>
        </div>
      </div>

      {/* KPI カード */}
      <section className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <KpiCard label="DAU（日次）" value="498" sub="前日比 -4.4%" trend="down" />
        <KpiCard label="解答数/日" value="4,520" sub="前日比 -5.4%" trend="down" />
        <KpiCard label="プレミアム転換率" value="1.0%" sub="累計 153人" trend="up" />
        <KpiCard label="7日継続率" value="34%" sub="5問完了ユーザー" trend="up" />
      </section>

      {/* タブ切替 */}
      <div className="mb-4 flex gap-2">
        {(["daily", "weekly", "monthly"] as Tab[]).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
              tab === t
                ? "bg-sky-600 text-white"
                : "border border-zinc-300 text-zinc-600 hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-400 dark:hover:bg-zinc-800"
            }`}
          >
            {t === "daily" ? "日次" : t === "weekly" ? "週次" : "月次"}
          </button>
        ))}
      </div>

      {/* グラフ */}
      <div className="mb-6 grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">DAU（{tabLabel}）</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e4e4e7" />
                <XAxis dataKey="date" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="dau"
                  stroke="#0ea5e9"
                  strokeWidth={2}
                  dot={{ r: 3 }}
                  name="DAU"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm">解答数 & プレミアム転換（{tabLabel}）</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e4e4e7" />
                <XAxis dataKey="date" tick={{ fontSize: 11 }} />
                <YAxis yAxisId="left" tick={{ fontSize: 11 }} />
                <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 11 }} />
                <Tooltip />
                <Legend wrapperStyle={{ fontSize: 11 }} />
                <Bar yAxisId="left" dataKey="answers" fill="#7dd3fc" name="解答数" />
                <Bar yAxisId="right" dataKey="premium" fill="#f59e0b" name="プレミアム登録" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* ファネル */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-sm">コンバージョン ファネル（累計）</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {FUNNEL_DATA.map((item, i) => (
              <div key={item.stage}>
                <div className="mb-1 flex items-center justify-between text-sm">
                  <span className="font-medium text-zinc-700 dark:text-zinc-300">
                    {i + 1}. {item.stage}
                  </span>
                  <span className="text-zinc-500 dark:text-zinc-400">
                    {item.count.toLocaleString()} 人 （{item.pct}%）
                  </span>
                </div>
                <div className="h-6 w-full overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-800">
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{ width: `${item.pct}%`, background: "#0ea5e9" }}
                  />
                </div>
                {i < FUNNEL_DATA.length - 1 && (
                  <div className="mt-1 text-right text-[11px] text-zinc-400">
                    → 次ステップへの転換: {((FUNNEL_DATA[i + 1].count / item.count) * 100).toFixed(1)}%
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* メモ */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">実データ確認先</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc space-y-1 pl-5 text-sm text-zinc-600 dark:text-zinc-400">
            <li>
              <strong>DAU / PV / カスタムイベント</strong>: Vercel Dashboard → Analytics タブ
            </li>
            <li>
              <strong>プレミアム課金状況</strong>: Stripe Dashboard（フェーズ4実装後）
            </li>
            <li>
              <strong>メール登録数</strong>: <code>/api/email-list</code> の DB / localStorage
            </li>
            <li>
              <strong>イベント一覧</strong>: <code>lib/analytics/events.ts</code> 参照
            </li>
          </ul>
        </CardContent>
      </Card>
    </main>
  );
}

function KpiCard({
  label,
  value,
  sub,
  trend,
}: {
  label: string;
  value: string;
  sub?: string;
  trend?: "up" | "down";
}) {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="text-xs text-zinc-500 dark:text-zinc-400">{label}</div>
        <div className="mt-1 text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
          {value}
        </div>
        {sub && (
          <div
            className={`mt-1 text-[11px] ${
              trend === "up"
                ? "text-emerald-600 dark:text-emerald-400"
                : trend === "down"
                  ? "text-red-500 dark:text-red-400"
                  : "text-zinc-500 dark:text-zinc-400"
            }`}
          >
            {sub}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
