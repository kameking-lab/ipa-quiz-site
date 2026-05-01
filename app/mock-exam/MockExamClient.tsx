"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { LS_KEYS } from "@/lib/storage/keys";
import { EXAM_CONFIGS } from "@/lib/exam-config";
import type { ExamCode } from "@/lib/questions/types";
import type { Question } from "@/lib/questions/types";

const EXAM_OPTIONS: { code: ExamCode; label: string; session: string; minutes: number; questionCount: number }[] = [
  { code: "ip", label: "IT パスポート", session: "am", minutes: 120, questionCount: 100 },
  { code: "sg", label: "情報セキュリティマネジメント（科目A）", session: "am", minutes: 60, questionCount: 48 },
  { code: "fe", label: "基本情報技術者（科目A）", session: "am", minutes: 90, questionCount: 60 },
  { code: "ap", label: "応用情報技術者（午前）", session: "am", minutes: 150, questionCount: 80 },
  { code: "sc", label: "情報処理安全確保支援士（午前I）", session: "am1", minutes: 50, questionCount: 30 },
  { code: "nw", label: "ネットワークスペシャリスト（午前I）", session: "am1", minutes: 50, questionCount: 30 },
  { code: "db", label: "データベーススペシャリスト（午前I）", session: "am1", minutes: 50, questionCount: 30 },
];

type Phase = "setup" | "exam" | "result";

const QUESTION_COUNT_PRESETS = [
  { id: "full" as const, label: "全問", description: "本番と同じ問題数" },
  { id: "half" as const, label: "半分", description: "標準の半分" },
  { id: "20" as const, label: "20問", description: "短時間で要点演習" },
  { id: "10" as const, label: "10問", description: "スキマ時間に最適" },
];
type QuestionCountId = (typeof QUESTION_COUNT_PRESETS)[number]["id"];

function resolveQuestionCount(preset: QuestionCountId, full: number): number {
  switch (preset) {
    case "full":
      return full;
    case "half":
      return Math.max(1, Math.ceil(full / 2));
    case "20":
      return Math.min(20, full);
    case "10":
      return Math.min(10, full);
  }
}

function scaleMinutes(preset: QuestionCountId, fullMinutes: number, fullCount: number, count: number): number {
  if (preset === "full") return fullMinutes;
  return Math.max(5, Math.round((count / fullCount) * fullMinutes));
}

interface AnswerRecord {
  questionId: string;
  selectedAnswer: string;
  correctAnswer: string;
  isCorrect: boolean;
}

interface MockExamClientProps {
  initialExam?: ExamCode;
  allQuestions: Question[];
}

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${String(s).padStart(2, "0")}`;
}

function shuffleArray<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j]!, copy[i]!];
  }
  return copy;
}

export function MockExamClient({ initialExam, allQuestions }: MockExamClientProps) {
  const [phase, setPhase] = useState<Phase>("setup");
  const [selectedConfig, setSelectedConfig] = useState(
    EXAM_OPTIONS.find((o) => o.code === initialExam) ?? EXAM_OPTIONS[3]!,
  );
  const [countPreset, setCountPreset] = useState<QuestionCountId>("full");
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<AnswerRecord[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState(0);
  const [timeTaken, setTimeTaken] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startExam = useCallback(() => {
    const cfg = selectedConfig;
    const pool = allQuestions.filter(
      (q) =>
        q.exam === cfg.code &&
        q.session === cfg.session &&
        q.type === "multiple-choice" &&
        !q.needsReview &&
        !q.hasImage,
    );
    const targetCount = resolveQuestionCount(countPreset, cfg.questionCount);
    const selected = shuffleArray(pool).slice(0, targetCount);
    if (selected.length === 0) return;

    const minutes = scaleMinutes(countPreset, cfg.minutes, cfg.questionCount, selected.length);

    setQuestions(selected);
    setCurrentIndex(0);
    setAnswers([]);
    setSelectedAnswer(null);
    setTimeLeft(minutes * 60);
    setTimeTaken(0);
    setPhase("exam");
  }, [selectedConfig, allQuestions, countPreset]);

  // タイマー
  useEffect(() => {
    if (phase !== "exam") return;
    timerRef.current = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          clearInterval(timerRef.current!);
          setPhase("result");
          return 0;
        }
        setTimeTaken((prev) => prev + 1);
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(timerRef.current!);
  }, [phase]);

  const handleAnswer = useCallback(
    (choice: string) => {
      if (selectedAnswer !== null) return;
      setSelectedAnswer(choice);

      const q = questions[currentIndex];
      if (!q) return;
      const correctAnswer = Array.isArray(q.answer) ? q.answer[0] : q.answer;

      setAnswers((prev) => [
        ...prev,
        {
          questionId: q.id,
          selectedAnswer: choice,
          correctAnswer,
          isCorrect: choice === correctAnswer,
        },
      ]);
    },
    [selectedAnswer, questions, currentIndex],
  );

  const handleNext = useCallback(() => {
    if (currentIndex + 1 >= questions.length) {
      clearInterval(timerRef.current!);
      setPhase("result");
    } else {
      setCurrentIndex((i) => i + 1);
      setSelectedAnswer(null);
    }
  }, [currentIndex, questions.length]);

  const handleFinish = useCallback(() => {
    clearInterval(timerRef.current!);
    setPhase("result");
  }, []);

  // 結果を localStorage に保存
  useEffect(() => {
    if (phase !== "result" || answers.length === 0) return;
    try {
      const history = JSON.parse(localStorage.getItem(LS_KEYS.history) ?? "[]") as object[];
      const newEntries = answers.map((a) => ({
        questionId: a.questionId,
        exam: selectedConfig.code,
        category: questions.find((q) => q.id === a.questionId)?.category ?? "",
        correct: a.isCorrect,
        answeredAt: new Date().toISOString(),
        source: "mock-exam",
      }));
      localStorage.setItem(LS_KEYS.history, JSON.stringify([...history, ...newEntries]));
    } catch { /* ignore */ }
  }, [phase, answers, selectedConfig.code, questions]);

  if (phase === "setup") {
    const targetCount = resolveQuestionCount(countPreset, selectedConfig.questionCount);
    const targetMinutes = scaleMinutes(
      countPreset,
      selectedConfig.minutes,
      selectedConfig.questionCount,
      targetCount,
    );
    return (
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">試験を選択</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {EXAM_OPTIONS.map((opt) => (
              <button
                key={`${opt.code}-${opt.session}`}
                onClick={() => setSelectedConfig(opt)}
                className={`w-full rounded-xl border px-4 py-3 text-left transition-colors ${
                  selectedConfig.code === opt.code && selectedConfig.session === opt.session
                    ? "border-sky-400 bg-sky-50 dark:border-sky-600 dark:bg-sky-950/40"
                    : "border-zinc-200 hover:border-zinc-300 dark:border-zinc-700 dark:hover:border-zinc-600"
                }`}
              >
                <div className="font-medium text-sm">{opt.label}</div>
                <div className="mt-0.5 text-xs text-zinc-500 dark:text-zinc-400">
                  {opt.questionCount}問 / {opt.minutes}分
                </div>
              </button>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">問題数を選ぶ</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
              {QUESTION_COUNT_PRESETS.map((p) => {
                const count = resolveQuestionCount(p.id, selectedConfig.questionCount);
                const minutes = scaleMinutes(
                  p.id,
                  selectedConfig.minutes,
                  selectedConfig.questionCount,
                  count,
                );
                const isActive = countPreset === p.id;
                return (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => setCountPreset(p.id)}
                    className={`rounded-xl border px-3 py-3 text-left transition-colors ${
                      isActive
                        ? "border-sky-400 bg-sky-50 dark:border-sky-600 dark:bg-sky-950/40"
                        : "border-zinc-200 hover:border-zinc-300 dark:border-zinc-700 dark:hover:border-zinc-600"
                    }`}
                    aria-pressed={isActive}
                  >
                    <div className="text-sm font-semibold">{p.label}</div>
                    <div className="mt-0.5 text-[11px] text-zinc-500 dark:text-zinc-400">
                      {count}問 / {minutes}分
                    </div>
                    <div className="mt-1 text-[10px] text-zinc-500 dark:text-zinc-500">
                      {p.description}
                    </div>
                  </button>
                );
              })}
            </div>
            <p className="mt-3 text-xs text-zinc-500 dark:text-zinc-400">
              スキマ時間には10問・20問、本番想定なら全問を選んでください。
            </p>
          </CardContent>
        </Card>

        <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800 dark:border-amber-900 dark:bg-amber-950/30 dark:text-amber-300">
          <p className="font-medium">模擬試験の注意事項</p>
          <ul className="mt-1 list-disc list-inside space-y-1 text-amber-700 dark:text-amber-400">
            <li>選択した問題数（{targetCount}問）と制限時間（{targetMinutes}分）で出題されます</li>
            <li>途中中断すると回答は記録されません</li>
            <li>画像問題は除外されます</li>
          </ul>
        </div>

        <Button
          variant="primary"
          onClick={startExam}
          className="w-full"
        >
          模擬試験を開始（{targetCount}問・{targetMinutes}分）
        </Button>
      </div>
    );
  }

  if (phase === "exam") {
    const q = questions[currentIndex];
    if (!q) return null;
    const choices = Object.entries(q.choices ?? {});
    const progress = ((currentIndex + 1) / questions.length) * 100;
    const isLowTime = timeLeft < 300;

    return (
      <div className="space-y-4">
        {/* ヘッダー */}
        <div className="flex items-center justify-between">
          <span className="text-sm text-zinc-500 dark:text-zinc-400">
            {currentIndex + 1} / {questions.length}
          </span>
          <div className={`font-mono text-lg font-bold tabular-nums ${
            isLowTime ? "text-rose-600 dark:text-rose-400" : "text-zinc-900 dark:text-zinc-50"
          }`}>
            {formatTime(timeLeft)}
          </div>
          <Button variant="outline" onClick={handleFinish} className="text-xs px-2 py-1 h-auto">
            終了
          </Button>
        </div>

        {/* プログレスバー */}
        <div className="h-1.5 overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-700">
          <div
            className="h-full bg-sky-500 transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* 問題 */}
        <Card>
          <CardContent className="p-5">
            <Badge variant="outline" className="mb-3 text-xs">{q.category}</Badge>
            <p className="text-sm leading-relaxed text-zinc-900 dark:text-zinc-50">{q.question}</p>
          </CardContent>
        </Card>

        {/* 選択肢 */}
        <div className="space-y-2">
          {choices.map(([key, value]) => {
            const isSelected = selectedAnswer === key;
            const correctAnswer = Array.isArray(q.answer) ? q.answer[0] : q.answer;
            const isCorrect = key === correctAnswer;
            let className = "w-full rounded-xl border px-4 py-3 text-left text-sm transition-colors ";

            if (selectedAnswer === null) {
              className += "border-zinc-200 hover:border-sky-400 hover:bg-sky-50 dark:border-zinc-700 dark:hover:border-sky-600 dark:hover:bg-sky-950/30";
            } else if (isCorrect) {
              className += "border-emerald-400 bg-emerald-50 dark:border-emerald-600 dark:bg-emerald-950/30";
            } else if (isSelected) {
              className += "border-rose-400 bg-rose-50 dark:border-rose-600 dark:bg-rose-950/30";
            } else {
              className += "border-zinc-200 opacity-60 dark:border-zinc-700";
            }

            return (
              <button key={key} onClick={() => handleAnswer(key)} className={className}>
                <span className="font-medium">{key}</span>
                <span className="ml-2">{value}</span>
              </button>
            );
          })}
        </div>

        {selectedAnswer && (
          <Button variant="primary" onClick={handleNext} className="w-full">
            {currentIndex + 1 >= questions.length ? "採点する" : "次の問題"}
          </Button>
        )}
      </div>
    );
  }

  // 結果画面
  const correct = answers.filter((a) => a.isCorrect).length;
  const total = answers.length;
  const score = total > 0 ? Math.round((correct / total) * 100) : 0;
  const passMark = 60;
  const passed = score >= passMark;

  return (
    <div className="space-y-6">
      <Card className={`border-2 ${passed ? "border-emerald-400" : "border-rose-400"}`}>
        <CardContent className="p-6 text-center">
          <div className={`mb-1 text-4xl font-bold tabular-nums ${
            passed ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400"
          }`}>
            {score}点
          </div>
          <div className="text-sm text-zinc-600 dark:text-zinc-400">
            {correct} / {total} 問正解
          </div>
          <Badge variant={passed ? "success" : "outline"} className="mt-3">
            {passed ? "合格ライン超え" : `合格ライン ${passMark}点 未達`}
          </Badge>
          <div className="mt-2 text-xs text-zinc-500 dark:text-zinc-400">
            所要時間: {formatTime(timeTaken)}
          </div>
        </CardContent>
      </Card>

      <div className="flex gap-3">
        <Button variant="primary" onClick={() => { setPhase("setup"); setAnswers([]); }} className="flex-1">
          もう一度
        </Button>
        <Button asChild variant="outline" className="flex-1">
          <Link href={`/${selectedConfig.code}`}>通常学習</Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">回答詳細</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {answers.slice(0, 20).map((a, i) => (
              <div key={a.questionId} className="flex items-center gap-3 text-sm">
                <span className="w-8 text-right text-zinc-500 dark:text-zinc-400">Q{i + 1}</span>
                <span className={a.isCorrect ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400"}>
                  {a.isCorrect ? "✓" : "✗"}
                </span>
                <span className="text-zinc-600 dark:text-zinc-400">
                  選択: {a.selectedAnswer} / 正解: {a.correctAnswer}
                </span>
              </div>
            ))}
            {answers.length > 20 && (
              <p className="text-xs text-zinc-500 dark:text-zinc-400">... 他 {answers.length - 20} 問</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
