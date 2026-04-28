"use client";

import * as React from "react";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PremiumGate } from "@/components/PremiumGate";
import { createHistoryStore } from "@/lib/storage/history";
import { aggregateByCategory, estimateRequiredPractice } from "@/lib/learning/analytics";
import type { CategoryStat } from "@/lib/learning/analytics";

const TARGET = 0.7;

interface Props {
  categoryById: Record<string, string>;
}

export function WeaknessHeatmapClient({ categoryById }: Props) {
  return (
    <PremiumGate
      featureTitle="弱点ヒートマップ"
      featurePitch="あなたの学習データから「最も伸びしろのある分野」を学習科学に基づいて特定し、合格ラインまでの距離を1問単位で可視化します。"
    >
      <Inner categoryById={categoryById} />
    </PremiumGate>
  );
}

function Inner({ categoryById }: Props) {
  const [stats, setStats] = React.useState<CategoryStat[] | null>(null);
  const [overall, setOverall] = React.useState({ accuracy: 0, attempts: 0, unique: 0 });

  React.useEffect(() => {
    const history = createHistoryStore();
    const data = history.getStats();
    const lookup = new Map<string, { category: string }>();
    for (const [id, category] of Object.entries(categoryById)) {
      lookup.set(id, { category });
    }
    setStats(aggregateByCategory(history.getAllEntries(), lookup));
    setOverall({
      accuracy: data.accuracy,
      attempts: data.total,
      unique: data.uniqueAnswered,
    });
  }, [categoryById]);

  if (!stats) {
    return <div className="h-64 animate-pulse rounded-2xl bg-zinc-100 dark:bg-zinc-900" />;
  }

  if (stats.length === 0) {
    return (
      <Card>
        <CardContent className="pt-6 text-sm text-zinc-600 dark:text-zinc-400">
          まだ十分なデータがありません。20 問以上回答するとヒートマップが表示されます。
        </CardContent>
      </Card>
    );
  }

  const chartData = stats.map((s) => ({
    category: s.category.length > 8 ? s.category.slice(0, 7) + "…" : s.category,
    accuracy: Math.round(s.accuracy * 100),
    fullCategory: s.category,
  }));

  const sortedByWeakness = [...stats].sort((a, b) => a.accuracy - b.accuracy);
  const weakest = sortedByWeakness.slice(0, 3);
  const strongest = [...stats].sort((a, b) => b.accuracy - a.accuracy).slice(0, 3);

  const required = estimateRequiredPractice(overall.accuracy, overall.unique, TARGET);
  const gapPct = Math.max(0, Math.round((TARGET - overall.accuracy) * 100));

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-base">合格まであと正答率 {gapPct}%</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 text-sm sm:grid-cols-4">
            <Stat label="現在の正答率" value={`${Math.round(overall.accuracy * 100)}%`} />
            <Stat label="目標" value={`${Math.round(TARGET * 100)}%`} highlight />
            <Stat label="必要演習量" value={`${required.questionsNeeded}問`} />
            <Stat label="目安学習時間" value={`${required.hoursNeeded.toFixed(1)}h`} />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">分野別レーダーチャート</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={chartData}>
                <PolarGrid stroke="#cbd5e1" />
                <PolarAngleAxis dataKey="category" tick={{ fontSize: 11 }} />
                <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fontSize: 10 }} />
                <Radar
                  name="正答率(%)"
                  dataKey="accuracy"
                  stroke="#0284c7"
                  fill="#0284c7"
                  fillOpacity={0.3}
                />
                <Tooltip />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">優先強化分野</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm">
              {weakest.map((s) => (
                <li
                  key={s.category}
                  className="flex items-center justify-between rounded-lg border border-rose-200 bg-rose-50 px-3 py-2 dark:border-rose-900/60 dark:bg-rose-950/30"
                >
                  <span className="font-medium">{s.category}</span>
                  <Badge variant="outline">
                    {Math.round(s.accuracy * 100)}% ({s.attempts}問)
                  </Badge>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">得意分野</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm">
              {strongest.map((s) => (
                <li
                  key={s.category}
                  className="flex items-center justify-between rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 dark:border-emerald-900/60 dark:bg-emerald-950/30"
                >
                  <span className="font-medium">{s.category}</span>
                  <Badge variant="outline">
                    {Math.round(s.accuracy * 100)}% ({s.attempts}問)
                  </Badge>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">全分野</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {sortedByWeakness.map((s) => (
              <CategoryBar key={s.category} stat={s} />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function Stat({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div>
      <div className="text-xs text-zinc-500 dark:text-zinc-400">{label}</div>
      <div
        className={
          highlight
            ? "text-xl font-bold text-sky-700 dark:text-sky-300"
            : "text-xl font-bold"
        }
      >
        {value}
      </div>
    </div>
  );
}

function CategoryBar({ stat }: { stat: CategoryStat }) {
  const pct = Math.round(stat.accuracy * 100);
  const color =
    pct >= 70
      ? "bg-emerald-500"
      : pct >= 50
        ? "bg-amber-500"
        : "bg-rose-500";
  return (
    <div>
      <div className="mb-1 flex items-center justify-between text-xs">
        <span className="font-medium text-zinc-700 dark:text-zinc-300">{stat.category}</span>
        <span className="text-zinc-500 dark:text-zinc-400">
          {pct}% ({stat.correct}/{stat.attempts})
        </span>
      </div>
      <div className="h-2 w-full overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-800">
        <div className={`h-full ${color}`} style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}
