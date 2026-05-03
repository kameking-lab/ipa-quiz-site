"use client";

import * as React from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface ExamRow {
  exam: string;
  label: string;
  count: number;
}

interface MonthlyRow {
  month: string;
  users: number;
  aiCalls: number;
}

export function StatsCharts({
  byExam,
  monthlySeries,
}: {
  byExam: ExamRow[];
  monthlySeries: MonthlyRow[];
}) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="mb-2 text-sm font-semibold text-zinc-700 dark:text-zinc-300">
          試験区分別 収録問題数
        </h3>
        <div className="h-[280px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={byExam} margin={{ top: 8, right: 12, left: 0, bottom: 8 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(100,116,139,0.15)" />
              <XAxis dataKey="label" tick={{ fontSize: 10 }} interval={0} angle={-25} textAnchor="end" height={60} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip
                contentStyle={{ borderRadius: 8, border: "1px solid rgba(100,116,139,0.3)" }}
                formatter={(v) => [`${Number(v).toLocaleString()} 問`, "収録数"]}
              />
              <Bar dataKey="count" fill="#0284c7" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div>
        <h3 className="mb-2 text-sm font-semibold text-zinc-700 dark:text-zinc-300">
          月次利用状況（モック）
        </h3>
        <div className="h-[260px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={monthlySeries} margin={{ top: 8, right: 12, left: 0, bottom: 8 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(100,116,139,0.15)" />
              <XAxis dataKey="month" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip
                contentStyle={{ borderRadius: 8, border: "1px solid rgba(100,116,139,0.3)" }}
              />
              <Line type="monotone" dataKey="users" stroke="#10b981" strokeWidth={2} dot name="ユニーク利用者" />
              <Line type="monotone" dataKey="aiCalls" stroke="#0ea5e9" strokeWidth={2} dot name="AI 呼び出し" />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <p className="mt-2 text-[11px] text-zinc-500 dark:text-zinc-400">
          ※ 集約メトリクスはモックです。本番環境のメトリクス連携は順次実装予定。
        </p>
      </div>
    </div>
  );
}
