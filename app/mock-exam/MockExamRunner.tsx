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
import {
  clearActiveSession,
  computeRemainingSec,
  saveActiveSession,
  type MockExamActiveSession,
} from "@/lib/mock-exam/session";
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
  resumeFrom?: MockExamActiveSession;
}

type Phase = "running" | "submitted";

function getVerdict(scorePct: number, passThreshold: number): "合格圏内" | "あと一歩" | "要対策" {
  const threshold = passThreshold * 100;
  if (scorePct >= threshold + 10) return "合格圏内";
  if (scorePct >= threshold) return "あと一歩";
  return "要対策";
}

export function MockExamRunner({ questions, config, onFinish, resumeFrom }: Props) {
  const totalSec = config.minutes * 60;
  const [startedAt] = React.useState(() => resumeFrom?.startedAt ?? Date.now());
  const [remaining, setRemaining] = React.useState(() =>
    resumeFrom
      ? computeRemainingSec({ ...resumeFrom, totalSec })
      : totalSec,
  );
  const [index, setIndex] = React.useState(resumeFrom?.index ?? 0);
  const [answers, setAnswers] = React.useState<(ChoiceKey | undefined)[]>(() =>
    resumeFrom?.answers && resumeFrom.answers.length === questions.length
      ? [...resumeFrom.answers]
      : Array(questions.length).fill(undefined),
  );
  const [phase, setPhase] = React.useState<Phase>("running");
  const [result, setResult] = React.useState<MockExamResult | null>(null);

  const questionTimingsRef = React.useRef<number[]>(Array(questions.length).fill(0));
  const questionStartTimeRef = React.useRef<number>(Date.now());
  const prevIndexRef = React.useRef<number>(resumeFrom?.index ?? 0);

  // Accumulate time spent on the previous question when navigating away
  React.useEffect(() => {
    if (phase !== "running") return;
    const now = Date.now();
    const elapsed = Math.round((now - questionStartTimeRef.current) / 1000);
    questionTimingsRef.current[prevIndexRef.current] =
      (questionTimingsRef.current[prevIndexRef.current] ?? 0) + elapsed;
    prevIndexRef.current = index;
    questionStartTimeRef.current = now;
  }, [index, phase]);

  // Persist running state so a tab close / refresh can resume mid-exam.
  React.useEffect(() => {
    if (phase !== "running") return;
    const snapshot: MockExamActiveSession = {
      exam: config.exam,
      startedAt,
      savedAt: Date.now(),
      totalSec,
      questions,
      answers,
      index,
    };
    saveActiveSession(snapshot);
  }, [answers, index, phase, config.exam, startedAt, totalSec, questions]);

  const submit = React.useCallback(
    (auto: boolean) => {
      const finishedAt = Date.now();
      const timeUsedSec = Math.round((finishedAt - startedAt) / 1000);

      // Finalize timing for the currently displayed question
      const now = Date.now();
      const elapsed = Math.round((now - questionStartTimeRef.current) / 1000);
      questionTimingsRef.current[prevIndexRef.current] =
        (questionTimingsRef.current[prevIndexRef.current] ?? 0) + elapsed;
      const questionTimings = [...questionTimingsRef.current];

      let correct = 0;
      const byCategory: Record<string, { total: number; correct: number }> = {};
      const wrongQuestionIds: string[] = [];
      const store = createHistoryStore();
      for (let i = 0; i < questions.length; i++) {
        const q = questions[i];
        const ans = answers[i];
        const correctKey = Array.isArray(q.answer) ? q.answer[0] : q.answer;
        const isCorrect = ans === correctKey;
        if (isCorrect) correct++;
        else wrongQuestionIds.push(q.id);
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
        questionTimings,
        wrongQuestionIds,
      };
      recordMockExam(r);
      clearActiveSession();

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
    return (
      <ResultView
        result={result}
        config={config}
        questions={questions}
        answers={answers}
        onClose={onFinish}
      />
    );
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
            aria-live="off"
            aria-label={`残り時間 ${m}分${s}秒`}
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
          role="alert"
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
                    aria-pressed={selected}
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
                  aria-label={`問${i + 1}へ移動${ans !== undefined ? "（解答済）" : ""}`}
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
  questions,
  answers,
  onClose,
}: {
  result: MockExamResult;
  config: MockExamConfig;
  questions: SlimMockQuestion[];
  answers: (ChoiceKey | undefined)[];
  onClose: () => void;
}) {
  const [wrongExpanded, setWrongExpanded] = React.useState(false);

  const verdict = getVerdict(result.scorePct, config.passThreshold);

  type VerdictKey = "合格圏内" | "あと一歩" | "要対策";
  const verdictColors: Record<VerdictKey, { bg: string; score: string; badge: string }> = {
    "合格圏内": {
      bg: "bg-gradient-to-br from-emerald-50 to-sky-50 dark:from-emerald-950/40 dark:to-sky-950/40",
      score: "text-emerald-600 dark:text-emerald-400",
      badge: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300",
    },
    "あと一歩": {
      bg: "bg-gradient-to-br from-amber-50 to-yellow-50 dark:from-amber-950/40 dark:to-yellow-950/40",
      score: "text-amber-600 dark:text-amber-400",
      badge: "bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300",
    },
    "要対策": {
      bg: "bg-gradient-to-br from-rose-50 to-orange-50 dark:from-rose-950/40 dark:to-orange-950/40",
      score: "text-rose-600 dark:text-rose-400",
      badge: "bg-rose-100 text-rose-800 dark:bg-rose-900/40 dark:text-rose-300",
    },
  };
  const vc = verdictColors[verdict];

  const cats = Object.entries(result.byCategory).sort(
    (a, b) => a[1].correct / a[1].total - b[1].correct / b[1].total,
  );
  const weakCats = cats.filter(([, v]) => v.correct / v.total < 0.6);

  const timings = result.questionTimings ?? [];
  const nonZeroTimings = timings.filter((t) => t > 0);
  const avgTimeSec = nonZeroTimings.length > 0
    ? Math.round(nonZeroTimings.reduce((a, b) => a + b, 0) / nonZeroTimings.length)
    : 0;
  const maxTimeSec = nonZeroTimings.length > 0 ? Math.max(...nonZeroTimings) : 0;
  const slowestIdx = timings.indexOf(maxTimeSec);

  const wrongQuestions = questions
    .map((q, i) => ({ q, i, userAns: answers[i] }))
    .filter(({ q, userAns }) => {
      const correctKey = Array.isArray(q.answer) ? q.answer[0] : q.answer;
      return userAns !== correctKey;
    });

  const weakCatParam = weakCats.map(([cat]) => cat).join(",");
  const reviewUrl = `/quiz?mode=random&exam=${config.exam}${weakCatParam ? `&categoryGroup=${encodeURIComponent(weakCatParam)}` : ""}`;

  const tweetLines = [
    `IPA ${config.label} 模試: ${result.scorePct}点【${verdict}】`,
    `正答率 ${result.correct}/${result.totalQuestions}問`,
    weakCats.length > 0 ? `苦手分野: ${weakCats[0][0]}` : null,
    "#IPA過去問 #IPA試験",
  ].filter((l): l is string => l !== null);
  const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetLines.join("\n"))}`;

  const displayWrong = wrongExpanded ? wrongQuestions : wrongQuestions.slice(0, 5);

  return (
    <main className="mx-auto w-full max-w-3xl flex-1 px-4 pb-10 pt-8 sm:px-6">
      {/* スコアヘッダー */}
      <Card className="mb-4 overflow-hidden">
        <div className={`p-6 text-center ${vc.bg}`}>
          <div className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
            {config.label} 結果
          </div>
          <div className="my-2 text-7xl font-extrabold tabular-nums">
            <span className={vc.score}>{result.scorePct}</span>
            <span className="text-2xl text-zinc-400">%</span>
          </div>
          <span
            className={`inline-block rounded-full px-3 py-1 text-sm font-bold ${vc.badge}`}
            aria-label={`判定: ${verdict}`}
          >
            {verdict === "合格圏内" && "🎉 "}
            {verdict === "あと一歩" && "📈 "}
            {verdict === "要対策" && "📚 "}
            {verdict}
          </span>
          <div className="mt-3 text-xs text-zinc-500">
            {result.correct}/{result.totalQuestions}問正解 ・{" "}
            {Math.round(result.timeUsedSec / 60)}分{result.timeUsedSec % 60}秒使用
          </div>
          <div className="mt-1 text-xs text-zinc-400">
            合格基準: {Math.round(config.passThreshold * 100)}点以上
          </div>
        </div>
      </Card>

      {/* 分野別正答率 */}
      <Card className="mb-4">
        <CardContent className="pt-5">
          <h2 className="mb-3 text-sm font-semibold" id="result-categories">
            分野別正答率
          </h2>
          <ul className="space-y-2" aria-labelledby="result-categories">
            {cats.map(([cat, v]) => {
              const acc = v.correct / v.total;
              const pct = Math.round(acc * 100);
              const isWeak = acc < 0.6;
              return (
                <li key={cat}>
                  <div className="mb-1 flex justify-between text-xs">
                    <span
                      className={`flex items-center gap-1 truncate ${
                        isWeak ? "font-semibold text-rose-600 dark:text-rose-400" : ""
                      }`}
                    >
                      {isWeak && <span aria-label="苦手分野">⚠</span>}
                      {cat}
                    </span>
                    <span
                      className={`tabular-nums ${
                        isWeak ? "text-rose-600 dark:text-rose-400" : ""
                      }`}
                    >
                      {v.correct}/{v.total} ({pct}%)
                    </span>
                  </div>
                  <div
                    className="h-2 overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-800"
                    role="progressbar"
                    aria-valuenow={pct}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-label={`${cat}: ${pct}%`}
                  >
                    <div
                      className={`h-full transition-all ${
                        acc >= 0.7
                          ? "bg-emerald-500"
                          : acc >= 0.6
                            ? "bg-sky-500"
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
          {weakCats.length > 0 && (
            <div className="mt-4 rounded-lg border border-rose-200 bg-rose-50 p-3 dark:border-rose-800 dark:bg-rose-950/30">
              <div className="mb-2 text-xs font-semibold text-rose-700 dark:text-rose-300">
                ⚠ 苦手分野（60%未満）を集中的に練習しましょう
              </div>
              <ul className="mb-3 space-y-0.5 text-xs text-rose-600 dark:text-rose-400">
                {weakCats.map(([cat, v]) => (
                  <li key={cat}>
                    {cat}: {Math.round((v.correct / v.total) * 100)}%（{v.correct}/{v.total}問）
                  </li>
                ))}
              </ul>
              <a
                href={reviewUrl}
                className="flex w-full items-center justify-center rounded-lg bg-rose-600 px-3 py-2 text-center text-xs font-semibold text-white hover:bg-rose-700 dark:bg-rose-700 dark:hover:bg-rose-600"
                aria-label="苦手分野の問題を集中練習する"
              >
                苦手分野を集中練習 →
              </a>
            </div>
          )}
        </CardContent>
      </Card>

      {/* 時間配分 */}
      {nonZeroTimings.length > 0 && (
        <Card className="mb-4">
          <CardContent className="pt-5">
            <h2 className="mb-3 text-sm font-semibold" id="result-time">
              時間配分分析
            </h2>
            <div
              className="grid grid-cols-3 gap-3"
              aria-labelledby="result-time"
              role="group"
            >
              <div className="rounded-lg bg-zinc-50 p-3 text-center dark:bg-zinc-900">
                <div className="text-xl font-bold tabular-nums" aria-label={`平均${avgTimeSec}秒`}>
                  {avgTimeSec}秒
                </div>
                <div className="text-[10px] text-zinc-500">平均/問</div>
              </div>
              <div className="rounded-lg bg-zinc-50 p-3 text-center dark:bg-zinc-900">
                <div className="text-xl font-bold tabular-nums" aria-label={`最長${maxTimeSec}秒 問${slowestIdx + 1}`}>
                  {maxTimeSec}秒
                </div>
                <div className="text-[10px] text-zinc-500">最長（問{slowestIdx + 1}）</div>
              </div>
              <div className="rounded-lg bg-zinc-50 p-3 text-center dark:bg-zinc-900">
                <div className="text-xl font-bold tabular-nums" aria-label={`合計${Math.round(result.timeUsedSec / 60)}分`}>
                  {Math.round(result.timeUsedSec / 60)}分
                </div>
                <div className="text-[10px] text-zinc-500">合計時間</div>
              </div>
            </div>
            {avgTimeSec > 0 && avgTimeSec < 30 && result.answered > 0 && (
              <p className="mt-3 text-[11px] text-amber-600 dark:text-amber-400" role="note">
                1問あたりの平均時間が短めです。見直しに時間を活用できたか確認しましょう。
              </p>
            )}
          </CardContent>
        </Card>
      )}

      {/* 不正解一覧 */}
      {wrongQuestions.length > 0 && (
        <Card className="mb-4">
          <CardContent className="pt-5">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-sm font-semibold" id="result-wrong">
                不正解問題（{wrongQuestions.length}問）
              </h2>
              {wrongQuestions.length > 5 && (
                <button
                  onClick={() => setWrongExpanded((v) => !v)}
                  className="text-[11px] text-sky-600 hover:underline dark:text-sky-400"
                  aria-expanded={wrongExpanded}
                  aria-controls="wrong-list"
                >
                  {wrongExpanded ? "折りたたむ" : `全${wrongQuestions.length}問を表示`}
                </button>
              )}
            </div>
            <ul
              id="wrong-list"
              className="space-y-3"
              aria-labelledby="result-wrong"
            >
              {displayWrong.map(({ q, i, userAns }) => {
                const correctKey = Array.isArray(q.answer)
                  ? (q.answer[0] as ChoiceKey)
                  : (q.answer as ChoiceKey);
                const correctText = q.choices?.[correctKey];
                const userText = userAns ? q.choices?.[userAns] : undefined;
                return (
                  <li
                    key={q.id}
                    className="rounded-lg border border-zinc-100 p-3 dark:border-zinc-800"
                  >
                    <div className="mb-1 flex items-center gap-2">
                      <Badge variant="outline">問{i + 1}</Badge>
                      <span className="text-[10px] text-zinc-500">{q.category}</span>
                    </div>
                    <p className="mb-2 line-clamp-2 text-[11px] text-zinc-700 dark:text-zinc-300">
                      {q.question}
                    </p>
                    <div className="space-y-1 text-[11px]">
                      {userAns ? (
                        <div className="flex items-start gap-1 text-rose-600 dark:text-rose-400">
                          <span className="mt-0.5 shrink-0 font-bold" aria-hidden="true">✗</span>
                          <span>あなたの回答: {userAns} — {userText ?? ""}</span>
                        </div>
                      ) : (
                        <div className="text-zinc-400">未回答</div>
                      )}
                      <div className="flex items-start gap-1 text-emerald-700 dark:text-emerald-400">
                        <span className="mt-0.5 shrink-0 font-bold" aria-hidden="true">✓</span>
                        <span>正解: {correctKey} — {correctText ?? ""}</span>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
            {!wrongExpanded && wrongQuestions.length > 5 && (
              <button
                onClick={() => setWrongExpanded(true)}
                className="mt-3 w-full rounded-lg border border-zinc-200 py-2 text-xs text-zinc-600 hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-400 dark:hover:bg-zinc-900"
              >
                残り {wrongQuestions.length - 5} 問を表示
              </button>
            )}
          </CardContent>
        </Card>
      )}

      {/* アクションボタン */}
      <div className="flex flex-col gap-2 sm:flex-row">
        <Button onClick={onClose} variant="primary" className="flex-1">
          模試一覧に戻る
        </Button>
        <a
          href={tweetUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-zinc-200 px-4 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-900"
          aria-label="結果をXでシェア"
        >
          <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4 fill-current">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.732-8.855L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
          結果をシェア
        </a>
      </div>
    </main>
  );
}
