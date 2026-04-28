"use client";

import * as React from "react";
import {
  Bar,
  BarChart,
  Cell,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ALL_EXAM_CODES } from "@/lib/exam-config";
import { examLabel } from "@/lib/utils";
import {
  getMockScores,
  getNickname,
  recordMockScore,
  setNickname,
} from "@/lib/learning/mock-scores";
import type { MockScore } from "@/lib/learning/mock-scores";
import type { ExamCode } from "@/lib/questions/types";

const BUCKETS = [0, 30, 40, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95];

/**
 * Synthetic distribution roughly matching IPA published statistics —
 * skewed normal centered around 55-60, used until real DB-backed ranking lands.
 */
const SYNTHETIC_DISTRIBUTION: Record<string, number[]> = {
  default: [120, 320, 540, 760, 920, 1100, 980, 720, 480, 280, 140, 60, 25],
};

export function RankingClient() {
  const [exam, setExam] = React.useState<ExamCode>("ap");
  const [nickname, setNicknameState] = React.useState("");
  const [scores, setScores] = React.useState<MockScore[]>([]);

  React.useEffect(() => {
    setNicknameState(getNickname());
    setScores(getMockScores());
  }, []);

  function persistNickname(value: string) {
    setNicknameState(value);
    setNickname(value);
  }

  const examScores = scores.filter((s) => s.exam === exam);
  const latest = examScores[examScores.length - 1];
  const latestPct = latest ? Math.round((latest.score / latest.total) * 100) : null;
  const distribution = SYNTHETIC_DISTRIBUTION[exam] ?? SYNTHETIC_DISTRIBUTION.default;
  const totalCount = distribution.reduce((a, b) => a + b, 0);
  const percentile = latestPct !== null ? computePercentile(latestPct, distribution) : null;
  const userBucket = latestPct !== null ? bucketIndex(latestPct) : -1;

  const chartData = distribution.map((count, i) => ({
    range: `${BUCKETS[i]}-${BUCKETS[i + 1] ?? 100}`,
    count,
    isYou: i === userBucket,
  }));

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-base">プロフィール</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-3 sm:flex-row">
            <label className="flex-1">
              <span className="text-xs text-zinc-500 dark:text-zinc-400">表示名（匿名OK）</span>
              <input
                type="text"
                value={nickname}
                placeholder="名無しの受験者"
                maxLength={20}
                onChange={(e) => persistNickname(e.target.value)}
                className="mt-1 block w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-900"
              />
            </label>
            <label className="flex-1">
              <span className="text-xs text-zinc-500 dark:text-zinc-400">対象試験</span>
              <select
                value={exam}
                onChange={(e) => setExam(e.target.value as ExamCode)}
                className="mt-1 block w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-900"
              >
                {ALL_EXAM_CODES.map((c) => (
                  <option key={c} value={c}>
                    {examLabel(c)}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">あなたのスコア</CardTitle>
        </CardHeader>
        <CardContent>
          {latest ? (
            <div className="grid gap-4 sm:grid-cols-3">
              <Stat label="最新スコア" value={`${latest.score}/${latest.total}`} />
              <Stat
                label="得点率"
                value={`${latestPct}%`}
                highlight={(latestPct ?? 0) >= 60}
              />
              <Stat
                label="パーセンタイル"
                value={percentile !== null ? `上位 ${100 - percentile}%` : "—"}
                highlight={(percentile ?? 0) >= 60}
              />
            </div>
          ) : (
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              この試験の模試スコアはまだ記録されていません。模試モードを完了するとここに反映されます。
            </p>
          )}
          <p className="mt-3 text-xs text-zinc-500 dark:text-zinc-400">
            母集団: 約 {totalCount.toLocaleString()} 名（β 期間中はモックデータ）
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">スコア分布</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#cbd5e1" />
                <XAxis dataKey="range" tick={{ fontSize: 10 }} />
                <YAxis tick={{ fontSize: 10 }} />
                <Tooltip />
                <Bar dataKey="count" name="人数">
                  {chartData.map((d, i) => (
                    <Cell key={i} fill={d.isYou ? "#0284c7" : "#cbd5e1"} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          {latest && (
            <p className="mt-3 text-xs text-sky-700 dark:text-sky-300">
              青いバーがあなたの位置です。
            </p>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">スコア履歴</CardTitle>
        </CardHeader>
        <CardContent>
          {examScores.length === 0 ? (
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              履歴はまだありません。
            </p>
          ) : (
            <ul className="space-y-2 text-sm">
              {[...examScores].reverse().map((s) => {
                const pct = Math.round((s.score / s.total) * 100);
                return (
                  <li
                    key={s.id}
                    className="flex items-center justify-between rounded-lg border border-zinc-200 bg-white px-3 py-2 dark:border-zinc-800 dark:bg-zinc-900"
                  >
                    <span className="text-xs text-zinc-500 dark:text-zinc-400">
                      {new Date(s.takenAt).toLocaleDateString("ja-JP")}
                    </span>
                    <span className="font-medium">
                      {s.score}/{s.total}
                    </span>
                    <Badge variant="outline">{pct}%</Badge>
                  </li>
                );
              })}
            </ul>
          )}
          <p className="mt-3 text-xs text-zinc-500 dark:text-zinc-400">
            ※ 模試スコアはこの端末の localStorage に保存されます。クラウド同期は順次対応予定。
          </p>
        </CardContent>
      </Card>

      <Card className="border-sky-200 bg-sky-50/40 dark:border-sky-900/40 dark:bg-sky-950/20">
        <CardContent className="pt-6 text-sm text-zinc-700 dark:text-zinc-300">
          <p className="mb-2 font-medium">模試スコアを記録するには？</p>
          <p className="mb-3 text-xs text-zinc-600 dark:text-zinc-400">
            今後の模試モード完了時に、自動的にここに記録されます。テスト用のサンプル登録も可能です。
          </p>
          <Button size="sm" variant="outline" onClick={() => addSample(exam, setScores)}>
            サンプルスコアを追加
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

function Stat({
  label,
  value,
  highlight,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div>
      <div className="text-xs text-zinc-500 dark:text-zinc-400">{label}</div>
      <div
        className={
          highlight
            ? "text-2xl font-bold text-sky-700 dark:text-sky-300"
            : "text-2xl font-bold"
        }
      >
        {value}
      </div>
    </div>
  );
}

function bucketIndex(pct: number): number {
  for (let i = BUCKETS.length - 1; i >= 0; i--) {
    if (pct >= BUCKETS[i]) return i;
  }
  return 0;
}

function computePercentile(pct: number, distribution: number[]): number {
  const idx = bucketIndex(pct);
  const total = distribution.reduce((a, b) => a + b, 0);
  let below = 0;
  for (let i = 0; i < idx; i++) below += distribution[i];
  return Math.round((below / total) * 100);
}

function addSample(
  exam: ExamCode,
  setScores: React.Dispatch<React.SetStateAction<MockScore[]>>,
) {
  const total = 80;
  const score = Math.floor(40 + Math.random() * 35);
  recordMockScore({ exam, score, total });
  setScores(getMockScores());
}
