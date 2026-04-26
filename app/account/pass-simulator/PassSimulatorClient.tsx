"use client";

import * as React from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PremiumGate } from "@/components/PremiumGate";
import { LS_KEYS } from "@/lib/storage/keys";
import { createHistoryStore } from "@/lib/storage/history";
import {
  daysUntil,
  dailyTargetQuestions,
  estimatePassProbability,
  estimateRequiredPractice,
} from "@/lib/learning/analytics";

export function PassSimulatorClient() {
  return (
    <PremiumGate
      featureTitle="合格判定シミュレータ"
      featurePitch="現在の正答率・解答数と試験日から、合格確率を学習科学のロジスティック回帰モデルで毎日再計算。残り日数で何問解くべきか、AI が即答します。"
    >
      <Inner />
    </PremiumGate>
  );
}

function Inner() {
  const [examDate, setExamDate] = React.useState<string>("");
  const [accuracy, setAccuracy] = React.useState(0);
  const [attempts, setAttempts] = React.useState(0);
  const [unique, setUnique] = React.useState(0);

  React.useEffect(() => {
    const stored = window.localStorage.getItem(LS_KEYS.examDate) ?? "";
    setExamDate(stored);
    const stats = createHistoryStore().getStats();
    setAccuracy(stats.accuracy);
    setAttempts(stats.total);
    setUnique(stats.uniqueAnswered);
  }, []);

  function persistDate(d: string) {
    setExamDate(d);
    try {
      window.localStorage.setItem(LS_KEYS.examDate, d);
    } catch {
      // ignore
    }
  }

  const days = examDate ? daysUntil(examDate) : 0;
  const passProb = Math.round(estimatePassProbability(accuracy, attempts) * 100);
  const required = estimateRequiredPractice(accuracy, unique);
  const dailyTarget = days > 0 ? dailyTargetQuestions(required.questionsNeeded, days) : 0;

  const projection = React.useMemo(() => {
    const points: { day: number; probability: number }[] = [];
    const totalDays = Math.max(1, days);
    const startProb = passProb / 100;
    const targetGain = Math.max(0, 0.85 - startProb);
    for (let i = 0; i <= totalDays; i += Math.max(1, Math.ceil(totalDays / 24))) {
      const ratio = i / totalDays;
      const easedRatio = 1 - Math.pow(1 - ratio, 1.6);
      const value = Math.min(0.95, startProb + targetGain * easedRatio);
      points.push({ day: i, probability: Math.round(value * 100) });
    }
    if (points[points.length - 1]?.day !== totalDays) {
      points.push({
        day: totalDays,
        probability: Math.min(95, Math.round((startProb + targetGain) * 100)),
      });
    }
    return points;
  }, [days, passProb]);

  const verdict = passProb >= 70 ? "合格圏内" : passProb >= 40 ? "ボーダー" : "演習量不足";
  const verdictColor =
    passProb >= 70
      ? "text-emerald-600 dark:text-emerald-400"
      : passProb >= 40
        ? "text-amber-600 dark:text-amber-400"
        : "text-rose-600 dark:text-rose-400";

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-base">試験日設定</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
            <label className="flex-1">
              <span className="text-xs text-zinc-500 dark:text-zinc-400">受験予定日</span>
              <input
                type="date"
                value={examDate}
                onChange={(e) => persistDate(e.target.value)}
                className="mt-1 block w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-900"
              />
            </label>
            <div className="text-xs text-zinc-500 dark:text-zinc-400">
              {examDate ? `あと ${days} 日` : "未設定"}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">現時点の合格判定</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-3">
            <Stat label="合格確率" value={`${passProb}%`} highlight={passProb >= 60} />
            <Stat label="判定" value={verdict} className={verdictColor} />
            <Stat label="現在の正答率" value={`${Math.round(accuracy * 100)}%`} />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">推奨学習プラン</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-3">
            <Stat
              label="必要演習量"
              value={`${required.questionsNeeded}問`}
            />
            <Stat
              label="目安学習時間"
              value={`${required.hoursNeeded.toFixed(1)}h`}
            />
            <Stat
              label="1日のノルマ"
              value={dailyTarget > 0 ? `${dailyTarget}問` : "—"}
            />
          </div>
          {dailyTarget > 0 && (
            <p className="mt-3 text-sm text-zinc-600 dark:text-zinc-400">
              本日から1日 <strong className="text-sky-700 dark:text-sky-300">{dailyTarget}問</strong> 解けば、試験日までに合格圏到達が見込めます。
            </p>
          )}
        </CardContent>
      </Card>

      {examDate && days > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">合格確率の推移予測</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={projection}>
                  <defs>
                    <linearGradient id="passGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#0284c7" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#0284c7" stopOpacity={0.1} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#cbd5e1" />
                  <XAxis dataKey="day" tick={{ fontSize: 11 }} unit="日後" />
                  <YAxis domain={[0, 100]} tick={{ fontSize: 11 }} unit="%" />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="probability"
                    stroke="#0284c7"
                    fill="url(#passGradient)"
                    name="合格確率(%)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <p className="mt-3 text-xs text-zinc-500 dark:text-zinc-400">
              ※ 推奨学習量を完遂した場合の予測値です。
            </p>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle className="text-base">この計算の根拠</CardTitle>
        </CardHeader>
        <CardContent className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
          <p className="mb-2">
            合格確率は、現在の正答率を中心としたロジスティック関数で推定しています。IPA 試験の実質合格ラインを 60% に置き、それを境に 50% の確率で合格できる地点として正規化しています。
          </p>
          <p>
            十分な演習量（200問以上）に達するまでは、サンプル数による信頼度補正をかけて控えめに見積もります。
          </p>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button variant="outline" onClick={() => persistDate("")}>
          試験日をリセット
        </Button>
      </div>
    </div>
  );
}

function Stat({
  label,
  value,
  highlight,
  className,
}: {
  label: string;
  value: string;
  highlight?: boolean;
  className?: string;
}) {
  return (
    <div>
      <div className="text-xs text-zinc-500 dark:text-zinc-400">{label}</div>
      <div
        className={
          className ??
          (highlight
            ? "text-2xl font-bold text-sky-700 dark:text-sky-300"
            : "text-2xl font-bold")
        }
      >
        {value}
      </div>
    </div>
  );
}
