"use client";

import * as React from "react";
import { LS_KEYS } from "@/lib/storage/keys";
import { EXAM_LABELS } from "@/lib/utils";
import type { ExamCode } from "@/lib/questions/types";
import { Card, CardContent } from "@/components/ui/card";

interface StoredEntry {
  id: string;
  selected: string;
  correct: boolean;
  at: number;
}

const EXAMS: { code: ExamCode; passLine: number; targetCoverage: number }[] = [
  { code: "ip", passLine: 0.6, targetCoverage: 600 },
  { code: "sg", passLine: 0.6, targetCoverage: 500 },
  { code: "fe", passLine: 0.6, targetCoverage: 1500 },
  { code: "ap", passLine: 0.6, targetCoverage: 1500 },
  { code: "sc", passLine: 0.6, targetCoverage: 1000 },
  { code: "nw", passLine: 0.6, targetCoverage: 600 },
  { code: "db", passLine: 0.6, targetCoverage: 600 },
  { code: "es", passLine: 0.6, targetCoverage: 600 },
  { code: "st", passLine: 0.6, targetCoverage: 500 },
  { code: "sa", passLine: 0.6, targetCoverage: 500 },
  { code: "pm", passLine: 0.6, targetCoverage: 500 },
  { code: "sm", passLine: 0.6, targetCoverage: 500 },
  { code: "au", passLine: 0.6, targetCoverage: 500 },
];

function daysUntil(dateStr: string): number {
  const target = new Date(dateStr);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return Math.ceil((target.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
}

export function PassSimulatorClient() {
  const [exam, setExam] = React.useState<ExamCode>("ap");
  const [examDate, setExamDate] = React.useState<string>("");
  const [entries, setEntries] = React.useState<StoredEntry[]>([]);

  React.useEffect(() => {
    try {
      const raw = localStorage.getItem(LS_KEYS.history);
      if (raw) {
        const parsed = JSON.parse(raw) as { entries?: StoredEntry[] };
        setEntries(parsed.entries ?? []);
      }
    } catch {
      // ignore
    }
  }, []);

  const examEntries = entries.filter((e) => e.id.startsWith(`${exam}-`));
  // Use latest answer per question
  const byId = new Map<string, StoredEntry>();
  for (const e of examEntries) {
    const cur = byId.get(e.id);
    if (!cur || e.at > cur.at) byId.set(e.id, e);
  }
  const uniqueAnswered = byId.size;
  const correctCount = [...byId.values()].filter((e) => e.correct).length;
  const accuracy = uniqueAnswered === 0 ? 0 : correctCount / uniqueAnswered;

  // Recent trend (last 100 unique)
  const recentSorted = [...byId.values()].sort((a, b) => b.at - a.at).slice(0, 100);
  const recentAccuracy =
    recentSorted.length === 0
      ? 0
      : recentSorted.filter((e) => e.correct).length / recentSorted.length;

  const cfg = EXAMS.find((e) => e.code === exam)!;
  const days = examDate ? daysUntil(examDate) : 0;
  const coverage = Math.min(1, uniqueAnswered / cfg.targetCoverage);

  // Pass probability heuristic:
  // weighted accuracy (60% recent, 40% all) × coverage_factor
  // coverage_factor ranges 0.3..1.0 based on uniqueAnswered/targetCoverage
  const weightedAccuracy = recentSorted.length >= 20
    ? 0.6 * recentAccuracy + 0.4 * accuracy
    : accuracy;
  const coverageFactor = 0.3 + 0.7 * coverage;
  const adjustedAccuracy = weightedAccuracy * coverageFactor;
  // Map to pass probability: accuracy=passLine → 50%, +20pt → 90%, -20pt → 10%
  const margin = adjustedAccuracy - cfg.passLine;
  const passProbability = uniqueAnswered === 0
    ? null
    : Math.max(0.05, Math.min(0.95, 0.5 + margin * 2));

  // Suggested target per day
  const remaining = Math.max(0, cfg.targetCoverage - uniqueAnswered);
  const targetPerDay = days > 0 ? Math.ceil(remaining / days) : remaining;

  const verdict = passProbability === null
    ? null
    : passProbability >= 0.7
      ? { label: "合格圏内", tone: "good" as const }
      : passProbability >= 0.45
        ? { label: "ボーダーライン", tone: "warn" as const }
        : { label: "学習量不足", tone: "bad" as const };

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="space-y-4 pt-5">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <label className="block text-sm">
              <span className="mb-1 block font-medium text-foreground">志望試験区分</span>
              <select
                value={exam}
                onChange={(e) => setExam(e.target.value as ExamCode)}
                className="w-full rounded-lg border border-border bg-card px-3 py-2 text-sm"
              >
                {EXAMS.map((e) => (
                  <option key={e.code} value={e.code}>
                    {EXAM_LABELS[e.code] ?? e.code.toUpperCase()}
                  </option>
                ))}
              </select>
            </label>
            <label className="block text-sm">
              <span className="mb-1 block font-medium text-foreground">試験日</span>
              <input
                type="date"
                value={examDate}
                onChange={(e) => setExamDate(e.target.value)}
                className="w-full rounded-lg border border-border bg-card px-3 py-2 text-sm"
              />
            </label>
          </div>
        </CardContent>
      </Card>

      {uniqueAnswered === 0 ? (
        <div className="rounded-2xl border border-border bg-card p-6 text-center text-sm text-muted-foreground">
          {EXAM_LABELS[exam]} の回答履歴がありません。クイズを始めて履歴を作成してください。
        </div>
      ) : (
        <>
          <Card>
            <CardContent className="pt-5">
              <h2 className="mb-3 text-sm font-semibold text-foreground">
                合格確率（{EXAM_LABELS[exam]}）
              </h2>
              <div className="flex items-baseline gap-2">
                <div
                  className={
                    "text-5xl font-extrabold tracking-tight " +
                    (verdict?.tone === "good"
                      ? "text-emerald-600 dark:text-emerald-400"
                      : verdict?.tone === "warn"
                        ? "text-amber-600 dark:text-amber-400"
                        : "text-rose-600 dark:text-rose-400")
                  }
                >
                  {passProbability === null ? "—" : `${Math.round(passProbability * 100)}%`}
                </div>
                {verdict && (
                  <span
                    className={
                      "rounded-full px-2.5 py-0.5 text-xs font-bold " +
                      (verdict.tone === "good"
                        ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-200"
                        : verdict.tone === "warn"
                          ? "bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-200"
                          : "bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-200")
                    }
                  >
                    {verdict.label}
                  </span>
                )}
              </div>
              <p className="mt-2 text-xs text-muted-foreground">
                合格ボーダー {Math.round(cfg.passLine * 100)}%　/　現在の調整正答率 {(adjustedAccuracy * 100).toFixed(1)}%
              </p>
            </CardContent>
          </Card>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            <Stat label="回答済み" value={uniqueAnswered.toLocaleString("ja-JP")} unit="問" />
            <Stat
              label="正答率（全体）"
              value={(accuracy * 100).toFixed(1)}
              unit="%"
            />
            <Stat
              label="正答率（直近）"
              value={recentSorted.length === 0 ? "—" : (recentAccuracy * 100).toFixed(1)}
              unit={recentSorted.length === 0 ? "" : "%"}
            />
            <Stat
              label="網羅率"
              value={Math.round(coverage * 100).toString()}
              unit="%"
            />
          </div>

          <Card>
            <CardContent className="pt-5">
              <h2 className="mb-3 text-sm font-semibold text-foreground">学習プラン</h2>
              <div className="space-y-1.5 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">試験まで</span>
                  <span className="font-semibold">
                    {examDate ? `${days} 日` : "試験日未設定"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">目標到達まで残り</span>
                  <span className="font-semibold">{remaining.toLocaleString("ja-JP")} 問</span>
                </div>
                {days > 0 && remaining > 0 && (
                  <div className="flex justify-between border-t border-border pt-2 text-base">
                    <span className="font-semibold">1日あたりの目標</span>
                    <span className="font-bold text-primary">
                      {targetPerDay.toLocaleString("ja-JP")} 問 / 日
                    </span>
                  </div>
                )}
              </div>
              <p className="mt-3 text-xs text-muted-foreground">
                目標到達網羅: {cfg.targetCoverage.toLocaleString("ja-JP")} 問（過去問演習で実力固めの目安）
              </p>
            </CardContent>
          </Card>

          <p className="text-xs text-muted-foreground">
            ※ 合格確率は履歴データに基づく簡易推定です。実際の合否を保証するものではありません。
          </p>
        </>
      )}
    </div>
  );
}

function Stat({ label, value, unit }: { label: string; value: string; unit: string }) {
  return (
    <div className="rounded-xl border border-border bg-card p-3">
      <div className="text-xs text-muted-foreground">{label}</div>
      <div className="mt-1 text-xl font-bold text-foreground">
        {value}
        {unit && <span className="ml-0.5 text-xs font-normal text-muted-foreground">{unit}</span>}
      </div>
    </div>
  );
}
