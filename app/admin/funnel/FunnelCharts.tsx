"use client";

import * as React from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { FunnelData, FunnelResponse } from "@/lib/admin/funnel/posthog";

interface Props {
  initial: FunnelResponse;
}

const RANGE_OPTIONS = [
  { label: "24h", days: 1 },
  { label: "7日", days: 7 },
  { label: "30日", days: 30 },
] as const;

const STEP_COLORS = ["#0ea5e9", "#38bdf8", "#7dd3fc", "#bae6fd"];

function FunnelChart({ funnel }: { funnel: FunnelData }) {
  const data = funnel.steps.map((s) => ({ name: s.label, count: s.count }));
  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900">
      <h3 className="mb-1 text-sm font-semibold text-zinc-900 dark:text-zinc-50">{funnel.name}</h3>
      <div className="mb-3 space-y-1.5">
        {funnel.steps.map((step, i) => (
          <div key={step.event} className="flex items-center gap-2 text-xs text-zinc-600 dark:text-zinc-400">
            <span className="inline-block h-2.5 w-2.5 rounded-full flex-shrink-0" style={{ background: STEP_COLORS[i % STEP_COLORS.length] }} />
            <span className="font-medium text-zinc-800 dark:text-zinc-200">{step.label}</span>
            <span className="ml-auto tabular-nums">{step.count.toLocaleString("ja-JP")}</span>
            {step.drop_pct !== null && step.drop_pct > 0 && (
              <span className="text-rose-500 tabular-nums">▼{step.drop_pct}%</span>
            )}
          </div>
        ))}
      </div>
      <ResponsiveContainer width="100%" height={140}>
        <BarChart data={data} barCategoryGap="30%">
          <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="#e4e4e7" />
          <XAxis dataKey="name" tick={{ fontSize: 10 }} />
          <YAxis tick={{ fontSize: 10 }} width={40} />
          <Tooltip
            formatter={(v) => [Number(v).toLocaleString("ja-JP"), "件数"]}
            contentStyle={{ fontSize: 12 }}
          />
          <Bar dataKey="count" radius={[4, 4, 0, 0]}>
            {data.map((_, i) => (
              <Cell key={i} fill={STEP_COLORS[i % STEP_COLORS.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export function FunnelDashboard({ initial }: Props) {
  const [data, setData] = React.useState<FunnelResponse>(initial);
  const [loading, setLoading] = React.useState(false);
  const [activeDays, setActiveDays] = React.useState<number>(initial.range_days);

  const load = React.useCallback(async (days: number) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/funnel?days=${days}`);
      if (res.ok) setData(await res.json() as FunnelResponse);
    } catch { /* ignore */ }
    setLoading(false);
    setActiveDays(days);
  }, []);

  const allEvents = Object.entries(data.event_counts).sort((a, b) => b[1] - a[1]);

  return (
    <div className="space-y-6">
      {/* Range selector */}
      <div className="flex flex-wrap gap-2">
        {RANGE_OPTIONS.map(({ label, days }) => (
          <button
            key={days}
            type="button"
            onClick={() => load(days)}
            disabled={loading}
            className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-colors disabled:opacity-50 ${
              activeDays === days
                ? "bg-sky-600 text-white"
                : "border border-zinc-300 bg-white text-zinc-700 hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200"
            }`}
          >
            {label}
          </button>
        ))}
        {loading && <span className="text-xs text-zinc-400 self-center">読み込み中...</span>}
      </div>

      {/* Funnel charts */}
      {data.configured ? (
        <>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {data.funnels.map((f) => (
              <FunnelChart key={f.name} funnel={f} />
            ))}
          </div>

          {/* All events table */}
          <div className="rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900">
            <h3 className="mb-3 text-sm font-semibold text-zinc-900 dark:text-zinc-50">
              全イベント件数（直近 {activeDays === 1 ? "24時間" : `${activeDays}日`}）
            </h3>
            <div className="space-y-1.5">
              {allEvents.map(([event, count]) => (
                <div key={event} className="flex items-center gap-2 text-xs">
                  <code className="rounded bg-zinc-100 px-1.5 py-0.5 font-mono text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
                    {event}
                  </code>
                  <div className="ml-auto tabular-nums font-medium text-zinc-900 dark:text-zinc-100">
                    {count.toLocaleString("ja-JP")}
                  </div>
                </div>
              ))}
              {allEvents.length === 0 && (
                <p className="text-xs text-zinc-500">イベントデータがありません。</p>
              )}
            </div>
          </div>
        </>
      ) : (
        <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5 text-sm text-amber-800 dark:border-amber-800 dark:bg-amber-950/20 dark:text-amber-300">
          PostHog が未設定です。POSTHOG_API_KEY と POSTHOG_PROJECT_ID を設定してください。
        </div>
      )}
    </div>
  );
}
