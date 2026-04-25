"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { ExamProgress } from "@/lib/team/mock-data";

export function ExamProgressChart({ data }: { data: ExamProgress[] }) {
  const chartData = data.map((p) => ({
    name: p.label,
    解答数: p.answered,
    正答率: Math.round(p.accuracy * 10) / 10,
  }));

  return (
    <div className="h-72 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData} margin={{ top: 12, right: 12, left: 0, bottom: 32 }}>
          <defs>
            <linearGradient id="answeredGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#6366f1" stopOpacity={1} />
              <stop offset="100%" stopColor="#8b5cf6" stopOpacity={0.85} />
            </linearGradient>
            <linearGradient id="accuracyGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#10b981" stopOpacity={1} />
              <stop offset="100%" stopColor="#34d399" stopOpacity={0.85} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgb(161 161 170 / 0.2)" />
          <XAxis
            dataKey="name"
            tick={{ fontSize: 11, fill: "currentColor" }}
            interval={0}
            angle={-15}
            textAnchor="end"
            stroke="rgb(161 161 170 / 0.4)"
          />
          <YAxis
            yAxisId="left"
            tick={{ fontSize: 11, fill: "currentColor" }}
            stroke="rgb(161 161 170 / 0.4)"
            label={{ value: "解答数", angle: -90, position: "insideLeft", fontSize: 11, fill: "currentColor" }}
          />
          <YAxis
            yAxisId="right"
            orientation="right"
            domain={[0, 100]}
            tick={{ fontSize: 11, fill: "currentColor" }}
            stroke="rgb(161 161 170 / 0.4)"
            label={{ value: "正答率(%)", angle: 90, position: "insideRight", fontSize: 11, fill: "currentColor" }}
          />
          <Tooltip
            cursor={{ fill: "rgb(99 102 241 / 0.08)" }}
            contentStyle={{
              background: "rgb(17 17 20 / 0.96)",
              border: "1px solid rgb(63 63 70)",
              borderRadius: 12,
              color: "white",
              fontSize: 12,
              padding: "8px 12px",
              boxShadow: "0 10px 20px -3px rgb(0 0 0 / 0.25)",
            }}
            labelStyle={{ color: "rgb(212 212 216)", fontWeight: 600, marginBottom: 4 }}
          />
          <Bar yAxisId="left" dataKey="解答数" fill="url(#answeredGrad)" radius={[6, 6, 0, 0]} />
          <Bar yAxisId="right" dataKey="正答率" fill="url(#accuracyGrad)" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
