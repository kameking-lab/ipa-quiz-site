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
          <CartesianGrid strokeDasharray="3 3" stroke="rgb(161 161 170 / 0.25)" />
          <XAxis
            dataKey="name"
            tick={{ fontSize: 11, fill: "currentColor" }}
            interval={0}
            angle={-15}
            textAnchor="end"
          />
          <YAxis
            yAxisId="left"
            tick={{ fontSize: 11, fill: "currentColor" }}
            label={{ value: "解答数", angle: -90, position: "insideLeft", fontSize: 11 }}
          />
          <YAxis
            yAxisId="right"
            orientation="right"
            domain={[0, 100]}
            tick={{ fontSize: 11, fill: "currentColor" }}
            label={{ value: "正答率(%)", angle: 90, position: "insideRight", fontSize: 11 }}
          />
          <Tooltip
            contentStyle={{
              background: "rgb(24 24 27 / 0.95)",
              border: "1px solid rgb(63 63 70)",
              borderRadius: 8,
              color: "white",
              fontSize: 12,
            }}
          />
          <Bar yAxisId="left" dataKey="解答数" fill="#0284c7" radius={[4, 4, 0, 0]} />
          <Bar yAxisId="right" dataKey="正答率" fill="#10b981" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
