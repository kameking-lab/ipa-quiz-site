"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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

// Matches the actual format written by lib/storage/history.ts createHistoryStore
interface StoredEntry {
  id: string;       // e.g. "ap-2023h-am-q1" — exam code is the first segment
  selected: string;
  correct: boolean;
  at: number;
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
    examAnswered: number;
    examAccuracy: number | null;
  } | null>(null);
  const [entries, setEntries] = useState<StoredEntry[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(LS_KEYS.history);
      if (!raw) return;
      // History is stored as { entries: StoredEntry[], starredIds: string[] }
      const parsed = JSON.parse(raw) as { entries?: StoredEntry[] } | StoredEntry[];
      const list = Array.isArray(parsed) ? parsed : (parsed.entries ?? []);
      setEntries(list);
    } catch { /* ignore */ }
  }, []);

  const cfg = EXAM_CONFIGS[exam];
  const expectedQuestions = cfg.sessions.reduce((s, sess) => s + sess.expectedQuestions, 0);

  function generatePlan() {
    if (!examDate) return;
    const days = daysUntil(examDate);
    if (days <= 0) return;

    // Derive exam from question ID prefix (e.g. "ap-2023h-am-q1" → "ap")
    const examEntries = entries.filter((e) => e.id.startsWith(`${exam}-`));
    const uniqueAnswered = new Set(examEntries.map((e) => e.id)).size;
    const correctCount = examEntries.filter((e) => e.correct).length;
    const examAccuracy = examEntries.length > 0 ? correctCount / examEntries.length : null;

    // Daily target: cover full exam scope twice over the available days (min 10)
    const targetPerDay = Math.max(10, Math.ceil(expectedQuestions * 2 / days));

    setPlan({
      daysLeft: days,
      targetPerDay,
      totalTarget: targetPerDay * days,
      examAnswered: uniqueAnswered,
      examAccuracy,
    });
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

          <Card>
            <CardHeader>
              <CardTitle className="text-base">学習状況</CardTitle>
            </CardHeader>
            <CardContent>
              {plan.examAnswered === 0 ? (
                <p className="text-sm text-zinc-500 dark:text-zinc-400">
                  まだこの試験の学習履歴がありません。クイズをプレイすると正答率が表示されます。
                </p>
              ) : (
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-zinc-600 dark:text-zinc-400">解答済み（ユニーク）</span>
                    <span className="font-medium">{plan.examAnswered}問</span>
                  </div>
                  {plan.examAccuracy !== null && (
                    <div className="flex justify-between">
                      <span className="text-zinc-600 dark:text-zinc-400">直近の正答率</span>
                      <span className={`font-medium ${plan.examAccuracy >= 0.7 ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400"}`}>
                        {Math.round(plan.examAccuracy * 100)}%
                      </span>
                    </div>
                  )}
                  <p className="pt-1 text-xs text-zinc-400 dark:text-zinc-500">
                    分野別の弱点分析は今後のアップデートで追加予定です。
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          <div className="rounded-xl border border-sky-200 bg-sky-50 p-4 text-sm dark:border-sky-900 dark:bg-sky-950/30">
            <p className="font-medium text-sky-800 dark:text-sky-300">今日からのプラン</p>
            <ol className="mt-2 list-decimal list-inside space-y-1 text-sky-700 dark:text-sky-400">
              <li>毎日 <strong>{plan.targetPerDay} 問</strong> を目標に解く</li>
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
