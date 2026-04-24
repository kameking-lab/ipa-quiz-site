"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { LS_KEYS } from "@/lib/storage/keys";
import { EXAM_CONFIGS } from "@/lib/exam-config";
import type { ExamCode } from "@/lib/questions/types";

const EXAM_OPTIONS: { code: ExamCode; label: string }[] = [
  { code: "ip", label: "IT パスポート" },
  { code: "sg", label: "情報セキュリティマネジメント" },
  { code: "fe", label: "基本情報技術者" },
  { code: "ap", label: "応用情報技術者" },
  { code: "sc", label: "情報処理安全確保支援士" },
  { code: "nw", label: "ネットワークスペシャリスト" },
  { code: "db", label: "データベーススペシャリスト" },
  { code: "st", label: "IT ストラテジスト" },
  { code: "sa", label: "システムアーキテクト" },
  { code: "pm", label: "プロジェクトマネージャ" },
  { code: "es", label: "エンベデッドシステムスペシャリスト" },
  { code: "sm", label: "IT サービスマネージャ" },
  { code: "au", label: "システム監査技術者" },
];

interface HistoryEntry {
  questionId: string;
  exam: ExamCode;
  category: string;
  correct: boolean;
  answeredAt: string;
}

interface WeakCategory {
  category: string;
  correct: number;
  total: number;
  accuracy: number;
}

function daysUntil(dateStr: string): number {
  const target = new Date(dateStr);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return Math.ceil((target.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
}

export function StudyPlanClient() {
  const [exam, setExam] = useState<ExamCode>("fe");
  const [examDate, setExamDate] = useState("");
  const [plan, setPlan] = useState<{
    daysLeft: number;
    targetPerDay: number;
    totalTarget: number;
    weak: WeakCategory[];
  } | null>(null);
  const [history, setHistory] = useState<HistoryEntry[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(LS_KEYS.history);
      if (raw) setHistory(JSON.parse(raw) as HistoryEntry[]);
    } catch { /* ignore */ }
  }, []);

  const cfg = EXAM_CONFIGS[exam];
  const expectedQuestions = cfg.sessions.reduce((s, sess) => s + sess.expectedQuestions, 0);

  function generatePlan() {
    if (!examDate) return;
    const days = daysUntil(examDate);
    if (days <= 0) return;

    // 弱点カテゴリを履歴から計算
    const examHistory = history.filter((h) => h.exam === exam);
    const catMap = new Map<string, { correct: number; total: number }>();
    for (const h of examHistory) {
      const cur = catMap.get(h.category) ?? { correct: 0, total: 0 };
      catMap.set(h.category, { correct: cur.correct + (h.correct ? 1 : 0), total: cur.total + 1 });
    }
    const weak: WeakCategory[] = Array.from(catMap.entries())
      .map(([category, { correct, total }]) => ({
        category,
        correct,
        total,
        accuracy: total > 0 ? correct / total : 0,
      }))
      .filter((w) => w.accuracy < 0.7)
      .sort((a, b) => a.accuracy - b.accuracy)
      .slice(0, 5);

    // 1日の目標問題数：試験規模を日数で割る（最低 10 問）
    const targetPerDay = Math.max(10, Math.ceil(expectedQuestions * 2 / days));

    setPlan({ daysLeft: days, targetPerDay, totalTarget: targetPerDay * days, weak });
  }

  const today = new Date().toISOString().slice(0, 10);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-base">試験設定</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
              受験する試験
            </label>
            <select
              value={exam}
              onChange={(e) => { setExam(e.target.value as ExamCode); setPlan(null); }}
              className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100"
            >
              {EXAM_OPTIONS.map((o) => (
                <option key={o.code} value={o.code}>{o.label}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
              試験日
            </label>
            <input
              type="date"
              value={examDate}
              min={today}
              onChange={(e) => { setExamDate(e.target.value); setPlan(null); }}
              className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100"
            />
          </div>

          <Button
            variant="primary"
            onClick={generatePlan}
            disabled={!examDate}
            className="w-full"
          >
            学習プランを生成
          </Button>
        </CardContent>
      </Card>

      {plan && (
        <>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            <StatCard label="残り日数" value={`${plan.daysLeft}日`} />
            <StatCard label="1日の目標" value={`${plan.targetPerDay}問`} />
            <StatCard label="総目標問題数" value={plan.totalTarget.toLocaleString()} />
          </div>

          {plan.weak.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-base">強化すべき分野 TOP 5</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {plan.weak.map((w) => (
                    <li key={w.category} className="flex items-center justify-between text-sm">
                      <span className="text-zinc-700 dark:text-zinc-300">{w.category}</span>
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-24 overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-700">
                          <div
                            className="h-full bg-rose-500 dark:bg-rose-400"
                            style={{ width: `${w.accuracy * 100}%` }}
                          />
                        </div>
                        <span className="w-10 text-right font-medium tabular-nums text-rose-600 dark:text-rose-400">
                          {Math.round(w.accuracy * 100)}%
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}

          {plan.weak.length === 0 && (
            <Card>
              <CardContent className="py-4 text-center text-sm text-zinc-500 dark:text-zinc-400">
                {history.filter((h) => h.exam === exam).length === 0
                  ? "まだ学習履歴がありません。クイズをプレイして弱点分析を活用しましょう。"
                  : "✅ 全分野の正答率が 70% 以上です。模擬試験で仕上げをしましょう。"}
              </CardContent>
            </Card>
          )}

          <div className="rounded-xl border border-sky-200 bg-sky-50 p-4 text-sm dark:border-sky-900 dark:bg-sky-950/30">
            <p className="font-medium text-sky-800 dark:text-sky-300">今日からのプラン</p>
            <ol className="mt-2 list-decimal list-inside space-y-1 text-sky-700 dark:text-sky-400">
              <li>毎日 <strong>{plan.targetPerDay} 問</strong> を目標に解く</li>
              {plan.weak.length > 0 && (
                <li>弱点分野（{plan.weak[0]?.category}等）を重点的に</li>
              )}
              <li>間違えた問題は復習モードで反復練習</li>
              <li>直前 2 週間は模擬試験モードで時間感覚をつかむ</li>
            </ol>
          </div>

          <div className="flex gap-3">
            <Button asChild variant="primary" className="flex-1">
              <Link href={`/${exam}`}>今すぐ学習開始</Link>
            </Button>
            <Button asChild variant="outline" className="flex-1">
              <Link href={`/mock-exam?exam=${exam}`}>模擬試験</Link>
            </Button>
          </div>
        </>
      )}
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="text-xs text-zinc-500 dark:text-zinc-400">{label}</div>
        <div className="mt-1 text-2xl font-bold tracking-tight">{value}</div>
      </CardContent>
    </Card>
  );
}
