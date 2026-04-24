"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { BookOpen, RefreshCw, Trophy, ArrowLeft } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { EXAM_LABELS } from "@/lib/utils";

interface PhaseInfo {
  phase: number;
  title: string;
  days: number;
  dateRange: string;
  dailyGoal: string;
  activities: string[];
  borderClass: string;
  labelClass: string;
}

interface StudyPlanResult {
  examLabel: string;
  examDateLabel: string;
  remainingDays: number;
  phases: PhaseInfo[];
}

function fmt(d: Date): string {
  return d.toLocaleDateString("ja-JP", { year: "numeric", month: "long", day: "numeric" });
}

function calcPlan(examCode: string, examDateStr: string): StudyPlanResult {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const examDate = new Date(examDateStr);
  examDate.setHours(0, 0, 0, 0);

  const remaining = Math.max(0, Math.round((examDate.getTime() - today.getTime()) / 86400000));

  const phase1Days = Math.floor(remaining / 2);
  const phase3Days = Math.min(14, Math.max(0, remaining - phase1Days));
  const phase2Days = Math.max(0, remaining - phase1Days - 14);

  const p1End = new Date(today);
  p1End.setDate(today.getDate() + phase1Days);
  const p2End = new Date(p1End);
  p2End.setDate(p1End.getDate() + phase2Days);

  const dailyQ1 = phase1Days > 0 ? Math.max(10, Math.min(50, Math.ceil(400 / phase1Days))) : 0;
  const dailyQ2 = 20;

  const phases: PhaseInfo[] = [];

  if (phase1Days > 0) {
    phases.push({
      phase: 1,
      title: "フェーズ1：知識習得",
      days: phase1Days,
      dateRange: `${fmt(today)} 〜 ${fmt(p1End)}`,
      dailyGoal: `毎日 ${dailyQ1} 問`,
      activities: [
        `毎日 ${dailyQ1} 問を目標に出題`,
        "解説をしっかり読み込む",
        "苦手分野・カテゴリを把握する",
      ],
      borderClass: "border-sky-300 dark:border-sky-700",
      labelClass: "bg-sky-100 text-sky-800 dark:bg-sky-900 dark:text-sky-200",
    });
  }

  if (phase2Days > 0) {
    phases.push({
      phase: 2,
      title: "フェーズ2：復習",
      days: phase2Days,
      dateRange: `${fmt(p1End)} 〜 ${fmt(p2End)}`,
      dailyGoal: `毎日 ${dailyQ2} 問（復習）`,
      activities: [
        "間違えた問題を反復する",
        "復習モードで弱点を克服",
        "苦手カテゴリを重点的に攻略",
      ],
      borderClass: "border-amber-300 dark:border-amber-700",
      labelClass: "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200",
    });
  }

  if (phase3Days > 0) {
    phases.push({
      phase: 3,
      title: "フェーズ3：仕上げ",
      days: phase3Days,
      dateRange: `${fmt(p2End)} 〜 ${fmt(examDate)}`,
      dailyGoal: "模擬試験 1回 / 2日",
      activities: [
        "模擬試験モードで本番形式を反復",
        "時間配分を体に染み込ませる",
        "苦手分野の最終確認",
      ],
      borderClass: "border-emerald-300 dark:border-emerald-700",
      labelClass: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200",
    });
  }

  return {
    examLabel: EXAM_LABELS[examCode] ?? examCode.toUpperCase(),
    examDateLabel: fmt(examDate),
    remainingDays: remaining,
    phases,
  };
}

const PHASE_ICONS = [
  <BookOpen key={1} className="h-4 w-4 text-sky-600 dark:text-sky-400" />,
  <RefreshCw key={2} className="h-4 w-4 text-amber-600 dark:text-amber-400" />,
  <Trophy key={3} className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />,
];

export default function StudyPlanPage() {
  const [examCode, setExamCode] = useState("ap");
  const [examDateStr, setExamDateStr] = useState("");
  const [result, setResult] = useState<StudyPlanResult | null>(null);
  const [error, setError] = useState("");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!examDateStr) {
      setError("試験日を入力してください");
      return;
    }
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const examDate = new Date(examDateStr);
    if (examDate <= today) {
      setError("試験日は今日より後を指定してください");
      return;
    }
    setError("");
    setResult(calcPlan(examCode, examDateStr));
  }

  return (
    <main className="mx-auto w-full max-w-2xl px-4 py-10">
      <div className="mb-6 flex items-center gap-3">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/account">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <h1 className="text-2xl font-bold">AI 学習プラン</h1>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-base">受験情報を入力</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                受験する試験
              </label>
              <select
                value={examCode}
                onChange={(e) => setExamCode(e.target.value)}
                className="w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-900"
              >
                {Object.entries(EXAM_LABELS).map(([code, label]) => (
                  <option key={code} value={code}>
                    {label}（{code.toUpperCase()}）
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                試験日
              </label>
              <input
                type="date"
                value={examDateStr}
                onChange={(e) => setExamDateStr(e.target.value)}
                className="w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-900"
                required
              />
            </div>

            {error && <p className="text-xs text-red-600 dark:text-red-400">{error}</p>}

            <Button type="submit" variant="primary" className="w-full">
              学習プランを生成
            </Button>
          </form>
        </CardContent>
      </Card>

      {result && (
        <div className="space-y-4">
          <div className="rounded-lg bg-zinc-50 px-4 py-3 dark:bg-zinc-900">
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              <span className="font-semibold text-zinc-900 dark:text-zinc-100">
                {result.examLabel}
              </span>{" "}
              まで残り{" "}
              <span className="font-semibold text-sky-600 dark:text-sky-400">
                {result.remainingDays}日
              </span>
              （試験日：{result.examDateLabel}）
            </p>
          </div>

          {result.phases.map((phase) => (
            <Card key={phase.phase} className={`border-2 ${phase.borderClass}`}>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2 text-base">
                    {PHASE_ICONS[phase.phase - 1]}
                    {phase.title}
                  </CardTitle>
                  <span className={`rounded-md px-2 py-0.5 text-xs font-semibold ${phase.labelClass}`}>
                    {phase.days}日間
                  </span>
                </div>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">{phase.dateRange}</p>
              </CardHeader>
              <CardContent>
                <p className="mb-2 text-sm font-medium text-zinc-700 dark:text-zinc-300">
                  目標：{phase.dailyGoal}
                </p>
                <ul className="space-y-1">
                  {phase.activities.map((a) => (
                    <li
                      key={a}
                      className="flex items-start gap-2 text-sm text-zinc-600 dark:text-zinc-400"
                    >
                      <span className="mt-0.5 select-none text-xs">•</span>
                      {a}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}

          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            ※ 詳細な週次スケジュール、分野別の弱点分析、達成マイルストーン演出などは順次アップデート予定です。
          </p>

          <Button variant="outline" className="w-full" onClick={() => setResult(null)}>
            プランを再設定
          </Button>
        </div>
      )}
    </main>
  );
}
