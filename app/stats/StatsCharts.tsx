"use client";

import * as React from "react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Legend,
} from "recharts";

import type { GscDailyPoint } from "@/lib/stats/gsc";
import type { FeatureBreakdownRow, ReferrerRow } from "@/lib/stats/posthog";

const FEATURE_PALETTE = ["#0ea5e9", "#22c55e", "#f59e0b", "#a855f7", "#ec4899", "#14b8a6", "#f43f5e", "#94a3b8"];
const REFERRER_PALETTE = ["#0ea5e9", "#22c55e", "#a855f7", "#94a3b8"];

export function ImpressionsTrendChart({ trend }: { trend: GscDailyPoint[] }) {
  return (
    <div className="h-[280px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={trend} margin={{ top: 8, right: 12, left: 0, bottom: 8 }}>
          <defs>
            <linearGradient id="imp-grad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#0ea5e9" stopOpacity={0.45} />
              <stop offset="100%" stopColor="#0ea5e9" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(100,116,139,0.15)" />
          <XAxis
            dataKey="date"
            tick={{ fontSize: 10 }}
            tickFormatter={(d: string) => d.slice(5)}
            minTickGap={28}
          />
          <YAxis tick={{ fontSize: 11 }} />
          <Tooltip
            contentStyle={{ borderRadius: 8, border: "1px solid rgba(100,116,139,0.3)" }}
            formatter={(v) => [Number(v).toLocaleString(), "表示回数"]}
            labelFormatter={(d) => `日付: ${d}`}
          />
          <Area type="monotone" dataKey="impressions" stroke="#0ea5e9" strokeWidth={2} fill="url(#imp-grad)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export function ContentByExamChart({
  rows,
}: {
  rows: Array<{ label: string; total: number }>;
}) {
  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={rows} margin={{ top: 8, right: 12, left: 0, bottom: 40 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(100,116,139,0.15)" />
          <XAxis dataKey="label" tick={{ fontSize: 10 }} interval={0} angle={-25} textAnchor="end" height={64} />
          <YAxis tick={{ fontSize: 11 }} />
          <Tooltip
            contentStyle={{ borderRadius: 8, border: "1px solid rgba(100,116,139,0.3)" }}
            formatter={(v) => [`${Number(v).toLocaleString()} 問`, "収録数"]}
          />
          <Bar dataKey="total" fill="#0ea5e9" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export function FeatureBreakdownChart({ rows }: { rows: FeatureBreakdownRow[] }) {
  return (
    <div className="h-[260px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={rows}
            dataKey="pageviews"
            nameKey="feature"
            innerRadius={48}
            outerRadius={88}
            paddingAngle={2}
          >
            {rows.map((_, i) => (
              <Cell key={i} fill={FEATURE_PALETTE[i % FEATURE_PALETTE.length]} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{ borderRadius: 8, border: "1px solid rgba(100,116,139,0.3)" }}
            formatter={(v, name) => [`${Number(v).toLocaleString()} PV`, String(name ?? "")]}
          />
          <Legend wrapperStyle={{ fontSize: 11 }} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export function ReferrerBreakdownChart({ rows }: { rows: ReferrerRow[] }) {
  return (
    <div className="h-[260px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={rows}
            dataKey="pageviews"
            nameKey="source"
            innerRadius={48}
            outerRadius={88}
            paddingAngle={2}
          >
            {rows.map((_, i) => (
              <Cell key={i} fill={REFERRER_PALETTE[i % REFERRER_PALETTE.length]} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{ borderRadius: 8, border: "1px solid rgba(100,116,139,0.3)" }}
            formatter={(v, name) => [`${Number(v).toLocaleString()} PV`, String(name ?? "")]}
          />
          <Legend wrapperStyle={{ fontSize: 11 }} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
