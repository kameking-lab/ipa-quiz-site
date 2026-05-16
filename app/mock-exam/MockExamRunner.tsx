"use client";

import * as React from "react";
import type { ChoiceKey } from "@/lib/questions/types";
import { createHistoryStore } from "@/lib/storage/history";
import {
  recordMockExam,
  type MockExamResult,
} from "@/lib/mock-exam/storage";
import type { MockExamConfig } from "@/lib/mock-exam/config";
import type { SlimMockQuestion } from "@/lib/mock-exam/types";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { addGold, addXp } from "@/lib/gamification/economy";
import { evaluateAchievementsAfterMock } from "@/lib/gamification/achievements";

const CHOICE_KEYS: ChoiceKey[] = ["ア", "イ", "ウ", "エ"];

interface Props {
  questions: SlimMockQuestion[];
  config: MockExamConfig;
  onFinish: () => void;
}

type Phase = "running" | "submitted";

export function MockExamRunner({ questions, config, onFinish }: Props) {
  const totalSec = config.minutes * 60;
  const [startedAt] = React.useState(() => Date.now());
  const [remaining, setRemaining] = React.useState(totalSec);
  const [index, setIndex] = React.useState(0);
  const [answers, setAnswers] = React.useState<(ChoiceKey | undefined)[]>(
    () => Array(questions.length).fill(undefined),
  );
  const [phase, setPhase] = React.useState<Phase>("running");
  const [result, setResult] = React.useState<MockExamResult | null>(null);

  const submit = React.useCallback(
    (auto: boolean) => {
      const finishedAt = Date.now();
      const timeUsedSec = Math.round((finishedAt - startedAt) / 1000);
      let correct = 0;
      const byCategory: Record<string, { total: number; correct: number }> = {};
      const store = createHistoryStore();
      for (let i = 0; i < questions.length; i++) {
        const q = questions[i];
        const ans = answers[i];
        const correctKey = Array.isArray(q.answer) ? q.answer[0] : q.answer;
        const isCorrect = ans === correctKey;
        if (isCorrect) correct++;
        const cat = q.category || "その他";
        if (!byCategory[cat]) byCategory[cat] = { total: 0, correct: 0 };
        byCategory[cat].total++;
        if (isCorrect) byCategory[cat].correct++;
        if (ans !== undefined) {
          store.record({
            id: q.id,
            selected: ans,
            correct: isCorrect,
            at: finishedAt,
          });
        }
      }
      const answered = answers.filter((a) => a !== undefined).length;
      const scorePct = Math.round((correct / questions.length) * 100);
      const passed = scorePct / 100 >= config.passThreshold;
      const r: MockExamResult = {
        id: `mock-${startedAt}`,
        exam: config.exam,
        startedAt,
        finishedAt,
        totalQuestions: questions.length,
        answered,
        correct,
        scorePct,
        passed,
        timeUsedSec,
        byCategory,
      };
      recordMockExam(r);

      const xpGain = correct * 5 + (passed ? 200 : 50);
      const goldGain = passed ? 100 : 30;
      addXp(xpGain);
      addGold(goldGain);
      evaluateAchievementsAfterMock(r);

      setResult(r);
      setPhase("submitted");
      void auto;
    },
    [answers, questions, startedAt, config],
  );

  React.useEffect(() => {
    if (phase !== "running") return;
    const id = setInterval(() => {
      setRemaining((r) => {
        if (r <= 1) {
          clearInterval(id);
          submit(true);
          return 0;
        }
        return r - 1;
      });
    }, 1000);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase]);

  if (phase === "submitted" && result) {
    return <ResultView result={result} config={config} onClose={onFinish} />;
  }

  const q = questions[index];
  const correctKey = Array.isArray(q.answer) ? q.answer[0] : (q.answer as ChoiceKey);
  void correctKey;
  const answered = answers.filter((a) => a !== undefined).length;
  const m = Math.floor(remaining / 60);
  const s = remaining % 60;
  const danger = remaining <= 600;
  const warn = remaining <= 1800 && !danger;

  return (
    <main className="mx-auto w-full max-w-3xl flex-1 px-4 pb-24 pt-4 sm:px-6">
      <div className="sticky top-0 z-10 -mx-4 mb-4 border-b border-zinc-200 bg-white/95 px-4 py-3 backdrop-blur dark:border-zinc-800 dark:bg-zinc-950/95 sm:-mx-6 sm:px-6">
        <div className="flex items-center justify-between gap-3">
          <div>
            <div className="text-[11px] text-zinc-500">{config.label}</div>
            <div className="text-xs font-medium">
              {index + 1}/{questions.length} ・ 解答済 {answered}
            </div>
          </div>
          <div
            className={`tabular-nums text-2xl font-bold ${
              danger
                ? "animate-pulse text-rose-600 dark:text-rose-400"
                : warn
                  ? "text-amber-600 dark:text-amber-400"
                  : "text-zinc-900 dark:text-zinc-100"
            }`}
          >
            {m}:{s.toString().padStart(2, "0")}
          </div>
        </div>
        <div className="mt-2 h-1 overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-800">
          <div
            className="h-full bg-sky-500"
            style={{ width: `${(answered / questions.length) * 100}%` }}
          />
        </div>
      </div>

      {(warn || danger) && (
        <div
          className={`mb-3 rounded-lg border px-3 py-2 text-xs ${
            danger
              ? "border-rose-300 bg-rose-50 text-rose-800 dark:border-rose-800 dark:bg-rose-950/40 dark:text-rose-200"
              : "border-amber-300 bg-amber-50 text-amber-800 dark:border-amber-800 dark:bg-amber-950/40 dark:text-amber-200"
          }`}
        >
          {danger
            ? "残り10分です。未回答の問題を埋めましょう。"
            : "残り30分です。ペース配分を確認してください。"}
        </div>
      )}

      <Card className="mb-4">
        <CardContent className="pt-5">
          <div className="mb-2 flex items-center gap-2">
            <Badge variant="outline">問{index + 1}</Badge>
            <Badge variant="default">{q.category}</Badge>
          </div>
          <p className="mb-4 whitespace-pre-wrap text-sm leading-relaxed">
            {q.question}
          </p>
          {q.choices && (
            <div className="space-y-2">
              {CHOICE_KEYS.map((k) => {
                const text = q.choices?.[k];
                if (!text) return null;
                const selected = answers[index] === k;
                return (
                  <button
                    key={k}
                    onClick={() => {
                      const next = [...answers];
                      next[index] = k;
                      setAnswers(next);
                    }}
                    className={`block w-full rounded-xl border px-4 py-3 text-left text-sm transition ${
                      selected
                        ? "border-sky-500 bg-sky-50 dark:border-sky-400 dark:bg-sky-950/40"
                        : "border-zinc-200 bg-white hover:border-sky-300 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-sky-700"
                    }`}
                  >
                    <span className="mr-2 inline-flex h-6 w-6 items-center justify-center rounded-full bg-zinc-100 text-xs font-bold dark:bg-zinc-800">
                      {k}
                    </span>
                    {text}
                  </button>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>

      <div className="mb-4 flex items-center justify-between gap-2">
        <Button
          variant="outline"
          onClick={() => setIndex((i) => Math.max(0, i - 1))}
          disabled={index === 0}
        >
          前へ
        </Button>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            onClick={() => {
              const next = [...answers];
              next[index] = undefined;
              setAnswers(next);
            }}
          >
            クリア
          </Button>
          {index === questions.length - 1 ? (
            <Button
              variant="primary"
              onClick={() => {
                if (
                  confirm(
                    `提出します。未回答 ${
                      questions.length - answered
                    }問は不正解扱いです。よろしいですか？`,
                  )
                ) {
                  submit(false);
                }
              }}
            >
              提出する
            </Button>
          ) : (
            <Button
              variant="primary"
              onClick={() => setIndex((i) => Math.min(questions.length - 1, i + 1))}
            >
              次へ
            </Button>
          )}
        </div>
      </div>

      <Card>
        <CardContent className="pt-5">
          <div className="mb-2 text-[11px] font-semibold text-zinc-500">
            回答状況（クリックで移動）
          </div>
          <div className="grid grid-cols-10 gap-1.5 sm:grid-cols-12">
            {questions.map((_, i) => {
              const ans = answers[i];
              const cur = i === index;
              return (
                <button
                  key={i}
                  onClick={() => setIndex(i)}
                  className={`h-7 rounded text-[10px] font-medium ${
                    cur
                      ? "bg-sky-600 text-white"
                      : ans !== undefined
                        ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300"
                        : "bg-zinc-100 text-zinc-500 dark:bg-zinc-800"
                  }`}
                >
                  {i + 1}
                </button>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </main>
  );
}

function ResultView({
  result,
  config,
  onClose,
}: {
  result: MockExamResult;
  config: MockExamConfig;
  onClose: () => void;
}) {
  const cats = Object.entries(result.byCategory).sort(
    (a, b) => a[1].correct / a[1].total - b[1].correct / b[1].total,
  );

  return (
    <main className="mx-auto w-full max-w-3xl flex-1 px-4 pb-10 pt-8 sm:px-6">
      <Card className="mb-4 overflow-hidden">
        <div
          className={`p-6 text-center ${
            result.passed
              ? "bg-gradient-to-br from-emerald-50 to-sky-50 dark:from-emerald-950/40 dark:to-sky-950/40"
              : "bg-gradient-to-br from-rose-50 to-amber-50 dark:from-rose-950/40 dark:to-amber-950/40"
          }`}
        >
          <div className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
            {config.label} 結果
          </div>
          <div className="my-2 text-7xl font-extrabold tabular-nums">
            <span
              className={
                result.passed
                  ? "text-emerald-600 dark:text-emerald-400"
                  : "text-rose-600 dark:text-rose-400"
              }
            >
              {result.scorePct}
            </span>
            <span className="text-2xl text-zinc-400">%</span>
          </div>
          <Badge variant={result.passed ? "success" : "danger"}>
            {result.passed ? "🎉 合格基準達成" : "あと一歩"}
          </Badge>
          <div className="mt-3 text-xs text-zinc-500">
            {result.correct}/{result.totalQuestions}問正解 ・{" "}
            {Math.round(result.timeUsedSec / 60)}分{result.timeUsedSec % 60}秒使用
          </div>
        </div>
      </Card>

      <Card className="mb-4">
        <CardContent className="pt-5">
          <h2 className="mb-3 text-sm font-semibold">分野別正答率</h2>
          <ul className="space-y-2">
            {cats.map(([cat, v]) => {
              const acc = v.correct / v.total;
              const pct = Math.round(acc * 100);
              return (
                <li key={cat}>
                  <div className="mb-1 flex justify-between text-xs">
                    <span className="truncate">{cat}</span>
                    <span className="tabular-nums">
                      {v.correct}/{v.total} ({pct}%)
                    </span>
                  </div>
                  <div className="h-1.5 overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-800">
                    <div
                      className={`h-full ${
                        acc >= 0.7
                          ? "bg-emerald-500"
                          : acc >= 0.5
                            ? "bg-amber-500"
                            : "bg-rose-500"
                      }`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </li>
              );
            })}
          </ul>
        </CardContent>
      </Card>

      <div className="flex flex-col gap-2 sm:flex-row">
        <Button onClick={onClose} variant="primary" className="flex-1">
          模試一覧に戻る
        </Button>
      </div>
    </main>
  );
}
