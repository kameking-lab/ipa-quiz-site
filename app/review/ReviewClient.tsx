"use client";
import { NativeBReview } from "./NativeBReview";
import { QuestionBody } from "@/components/quiz/QuestionBody";
import { QuestionFigures } from "@/components/quiz/QuestionFigures";
import { choiceDisplayLabel, choiceImageAlt, formatQuestionAnswerForDisplay } from "@/lib/questions/display";
import { isCompleteSelectionCorrect, requiredSelectionCount, selectionInstruction } from "@/lib/questions/answers";
import { OrderingAnswerInput } from "@/components/quiz/OrderingAnswerInput";
import { NumericAnswerInput } from "@/components/quiz/NumericAnswerInput";
import { isOrderingAnswerCorrect } from "@/lib/questions/ordering";
import { isNumericAnswerCorrect } from "@/lib/questions/numeric";
import { displayQuestionExplanation } from "@/lib/questions/explanation-display";

import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { readLastQuestion } from "@/lib/storage/last-question";
import { EXAM_LABELS, examLabel } from "@/lib/utils";
import { jstDateString } from "@/lib/streak/core";
import type { ChoiceKey, Question } from "@/lib/questions/types";
import { quizBackHref } from "@/lib/questions/practice-session";
import { LS_KEYS } from "@/lib/storage/keys";
import { buildReviewRequest } from "@/lib/learning/review-queue";
import { recordReview } from "@/lib/learning/spaced-repetition";
import { recordStudyOnDate } from "@/lib/motivation/heatmap";

const REVIEW_KEY = LS_KEYS.reviewSchedule;

// エビングハウス曲線ベースの復習間隔（日数）
const INTERVALS = [1, 3, 7, 14, 30, 60, 120];

interface ReviewRecord {
  questionId: string;
  level: number; // 0 = 初回, 1 = 1日後, ...
  nextReviewAt: string; // ISO date string
  correctStreak: number;
  lastReviewedAt?: number;
}

type ReviewStore = Record<string, ReviewRecord>;

// 復習スケジュールは JST 暦日基準で扱う（streak / daily-challenge と境界を揃える）。
// toISOString の素の UTC 日付だと JST 00:00〜09:00 の間は「本日が期日」の復習が
// 翌 09:00 まで表示されない off-by-one が起きるため、jstDateString を単一情報源にする。
export function getNextReviewDate(level: number, now: Date = new Date()): string {
  const days = INTERVALS[Math.min(level, INTERVALS.length - 1)] ?? 120;
  return jstDateString(new Date(now.getTime() + days * 24 * 60 * 60 * 1000));
}

export function getTodayStr(now: Date = new Date()): string {
  return jstDateString(now);
}

export function ReviewClient({ examFromQuery, returnTo }: { examFromQuery?: string; returnTo?: string }) {
  const [exam, setExam] = useState(examFromQuery ?? "");
  const knownExam = !exam || Object.hasOwn(EXAM_LABELS, exam);
  const backHref = exam && knownExam ? quizBackHref({ exam, returnTo: exam === examFromQuery ? returnTo : undefined }) : "/search";
  const [store, setStore] = useState<ReviewStore>({});
  const [dueQuestions, setDueQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [graded, setGraded] = useState<boolean>();
  const [picks, setPicks] = useState<ChoiceKey[]>([]);
  const [reviewExams, setReviewExams] = useState<string[]>([]);
  const [sessionStats, setSessionStats] = useState({ correct: 0, incorrect: 0 });
  const [done, setDone] = useState(false);
  const [initialized, setInitialized] = useState(false);
  const [loadError, setLoadError] = useState(false);
  const [lastExam, setLastExam] = useState<string | null>(null);
  const questionFocusRef = useRef<HTMLDivElement>(null);
  const answerFocusRef = useRef<HTMLDivElement>(null);
  const resultFocusRef = useRef<HTMLDivElement>(null);
  const previousStep = useRef<string | null>(null);
  useEffect(() => {
    if (!initialized) return;
    const step = `${currentIndex}:${showAnswer}:${done}`;
    if (previousStep.current !== null && previousStep.current !== step) {
      const target = done ? resultFocusRef.current : showAnswer ? answerFocusRef.current : questionFocusRef.current;
      target?.focus({ preventScroll: true });
      target?.scrollIntoView?.({ block: "start", behavior: "instant" });
    }
    previousStep.current = step;
  }, [initialized, currentIndex, showAnswer, done]);
  const [emptyMeta, setEmptyMeta] = useState<{
    seenCount: number;
    scheduledCount: number;
    nextReviewDate: string | null;
  }>({ seenCount: 0, scheduledCount: 0, nextReviewDate: null });

  const context = (
    <nav aria-label="復習の資格" className="mb-5 space-y-3 empty:hidden">
      {(reviewExams.length > 1 || !knownExam) && <label className="block text-sm font-medium">復習する資格
        <select aria-label="復習する資格" value={exam} onChange={(event) => setExam(event.target.value)} className="mt-1 block h-11 w-full rounded-xl border border-border bg-background px-3">
          <option value="">すべての資格</option>
          {reviewExams.map((code) => <option key={code} value={code}>{examLabel(code)}</option>)}
        </select>
      </label>}
    </nav>
  );

  // localStorageから復習データを収集し、サーバーAPIで本日の復習問題を取得
  useEffect(() => {
    if (!knownExam) return;
    let cancelled = false;
    setInitialized(false);
    setLoadError(false);
    setCurrentIndex(0);
    setShowAnswer(false);
    setGraded(undefined);
    setPicks([]);
    setDone(false);
    setSessionStats({ correct: 0, incorrect: 0 });
    void (async () => {
      try {
        const raw = localStorage.getItem(REVIEW_KEY);
        let loaded: ReviewStore = {};
        try {
          const parsed: unknown = raw ? JSON.parse(raw) : {};
          if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) {
            loaded = Object.fromEntries(Object.entries(parsed).filter(([, record]) => {
              if (!record || typeof record !== "object") return false;
              const r = record as Partial<ReviewRecord>;
              return typeof r.nextReviewAt === "string" && /^\d{4}-\d{2}-\d{2}$/.test(r.nextReviewAt) && typeof r.level === "number" && typeof r.correctStreak === "number";
            }));
          }
        } catch { /* A damaged schedule must not prevent reading the existing answer history. */ }
        setStore(loaded);

        const last = readLastQuestion();
        if (last && Object.hasOwn(EXAM_LABELS, last.exam)) setLastExam(last.exam);
        const { historyIds, reviewStore, today } = buildReviewRequest(loaded);

        const res = await fetch("/api/review/due", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ historyIds, reviewStore, today, ...(exam ? { exam } : {}) }),
        });

        if (!res.ok) throw new Error("review-load-failed");
        if (res.ok) {
          const data = (await res.json()) as {
            questions: Question[];
            seenCount: number;
            scheduledCount: number;
            nextReviewDate: string | null;
          };
          if (cancelled) return;
          setDueQuestions(data.questions);
          if (!exam) setReviewExams([...new Set(data.questions.map((question) => question.exam))]);
          if (exam) setReviewExams((codes) => codes.includes(exam) ? codes : [...codes, exam]);
          setEmptyMeta({
            seenCount: data.seenCount,
            scheduledCount: data.scheduledCount,
            nextReviewDate: data.nextReviewDate,
          });
        }

        setInitialized(true);
      } catch {
        if (cancelled) return;
        setLoadError(true);
        setInitialized(true);
      }
    })();
    return () => { cancelled = true; };
  }, [exam, knownExam]);

  const saveStore = useCallback((newStore: ReviewStore) => {
    setStore(newStore);
    try {
      localStorage.setItem(REVIEW_KEY, JSON.stringify(newStore));
    } catch { /* ignore */ }
  }, []);

  const handleAnswer = useCallback(
    (isCorrect: boolean) => {
      const q = dueQuestions[currentIndex];
      if (!q) return;

      const current = store[q.id] ?? { questionId: q.id, level: 0, nextReviewAt: getTodayStr(), correctStreak: 0 };
      const newLevel = isCorrect ? Math.min(current.level + 1, INTERVALS.length - 1) : 0;
      const newRecord: ReviewRecord = {
        questionId: q.id,
        level: newLevel,
        nextReviewAt: getNextReviewDate(newLevel),
        correctStreak: isCorrect ? current.correctStreak + 1 : 0,
        lastReviewedAt: Date.now(),
      };

      saveStore({ ...store, [q.id]: newRecord });
      recordReview(q.id, isCorrect);
      recordStudyOnDate();
      setSessionStats((prev) => ({
        correct: prev.correct + (isCorrect ? 1 : 0),
        incorrect: prev.incorrect + (isCorrect ? 0 : 1),
      }));

      if (currentIndex + 1 >= dueQuestions.length) {
        setDone(true);
      } else {
        setCurrentIndex((i) => i + 1);
        setShowAnswer(false);
        setGraded(undefined);
        setPicks([]);
      }
    },
    [currentIndex, dueQuestions, store, saveStore],
  );

  if (!knownExam) return <div>{context}<p role="alert">指定された資格を確認できません。復習する資格を選んでください。</p></div>;

  if (!initialized) {
    return (
      <div>{context}<div className="py-12 text-center text-sm text-zinc-500 dark:text-zinc-400">
        読み込み中...
      </div></div>
    );
  }

  if (loadError) return <div>{context}<Card><CardContent className="py-8 text-center"><p role="alert" className="font-semibold">復習問題を読み込めませんでした</p><p className="mt-2 text-sm text-muted-foreground">学習履歴はこの端末に残っています。通信状態を確認して、もう一度お試しください。</p><Button onClick={() => window.location.reload()} className="mt-4 min-h-11 min-w-11 h-auto whitespace-normal py-2.5">もう一度読み込む</Button></CardContent></Card></div>;

  if (dueQuestions.length === 0) {
    const isFreshUser = emptyMeta.seenCount === 0;
    const nextDateLabel = emptyMeta.nextReviewDate
      ? new Date(emptyMeta.nextReviewDate).toLocaleDateString("ja-JP", {
          month: "long",
          day: "numeric",
          weekday: "short",
        })
      : null;

    return (
      <div className="space-y-6">
        {context}
        <Card>
          <CardContent className="py-10 text-center">
            <div className="text-3xl">{isFreshUser ? "📚" : "🎉"}</div>
            <p className="mt-3 font-medium">
              {isFreshUser ? "復習キューはまだ空です" : "今日の復習は完了です"}
            </p>
            <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
              {isFreshUser
                ? "問題を解くと自動で復習スケジュールに追加されます。"
                : null}
            </p>

            {!isFreshUser && (
              <div className="mt-6 grid grid-cols-2 gap-3 text-left">
                <div className="rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2 dark:border-zinc-800 dark:bg-zinc-900/50">
                  <div className="text-xs text-zinc-500 dark:text-zinc-400">学習済み問題</div>
                  <div className="mt-0.5 text-lg font-semibold tabular-nums">
                    {emptyMeta.seenCount.toLocaleString()} 問
                  </div>
                </div>
                <div className="rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2 dark:border-zinc-800 dark:bg-zinc-900/50">
                  <div className="text-xs text-zinc-500 dark:text-zinc-400">復習スケジュール済</div>
                  <div className="mt-0.5 text-lg font-semibold tabular-nums">
                    {emptyMeta.scheduledCount.toLocaleString()} 問
                  </div>
                </div>
              </div>
            )}

            {nextDateLabel && (
              <p className="mt-4 text-xs text-zinc-500 dark:text-zinc-400">
                次回復習予定: <span className="font-medium text-zinc-700 dark:text-zinc-300">{nextDateLabel}</span>
              </p>
            )}
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <Button asChild variant="primary" className="w-full min-h-11 min-w-11 h-auto whitespace-normal py-2.5">
            <Link href={exam ? `/${exam}` : lastExam ? `/${lastExam}` : "/search"}>{exam || lastExam ? `${examLabel(exam || lastExam!)}の問題を解く` : "資格を選ぶ"}</Link>
          </Button>
        </div>
      </div>
    );
  }

  if (done) {
    const total = sessionStats.correct + sessionStats.incorrect;
    const score = total > 0 ? Math.round((sessionStats.correct / total) * 100) : 0;

    return (
      <div ref={resultFocusRef} tabIndex={-1} role="region" aria-label="復習結果" className="scroll-mt-24 space-y-6 outline-none">
        {context}
        <Card>
          <CardContent className="py-8 text-center">
            <div className="text-3xl font-bold tabular-nums text-sky-600 dark:text-sky-400">
              {score}%
            </div>
            <div className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
              {sessionStats.correct} / {total} 問正解
            </div>
            <p className="mt-3 text-sm text-zinc-500 dark:text-zinc-400">
              次回の復習スケジュールが更新されました
            </p>
          </CardContent>
        </Card>

        <div className="flex gap-3">
          <Button asChild variant="outline" className="flex-1 min-h-11 min-w-11 h-auto whitespace-normal py-2.5">
            <Link href={backHref}>{exam ? `${examLabel(exam)}に戻る` : "試験選択に戻る"}</Link>
          </Button>
        </div>
      </div>
    );
  }

  const q = dueQuestions[currentIndex]!;
  const required = requiredSelectionCount(q);
  const hasChoices = Object.keys(q.choices ?? {}).length > 0;
  function revealGrade(correct: boolean) {
    setGraded(correct);
    setShowAnswer(true);
  }
  function selectChoice(key: ChoiceKey) {
    const next = picks.includes(key) ? picks.filter((pick) => pick !== key) : [...picks, key];
    if (next.length > required) return;
    setPicks(next);
    if (next.length === required && !q.acceptedAnswerCombinations) {
      revealGrade(isCompleteSelectionCorrect(q.answer, next, required));
    }
  }
  const correctAnswer = formatQuestionAnswerForDisplay(q, q.answer);
  const record = store[q.id];
  const nextInterval = INTERVALS[Math.min((record?.level ?? 0) + 1, INTERVALS.length - 1)];

  return (
    <div className="space-y-4">
      {context}
      {/* プログレス */}
      <div className="flex items-center justify-between text-sm text-zinc-500 dark:text-zinc-400">
        <span>{currentIndex + 1} / {dueQuestions.length}</span>
        <span aria-label={`正解 ${sessionStats.correct}問、不正解 ${sessionStats.incorrect}問`}>✓ {sessionStats.correct} ✗ {sessionStats.incorrect}</span>
      </div>
      <div role="progressbar" aria-label="復習の進捗" aria-valuemin={0} aria-valuemax={dueQuestions.length} aria-valuenow={currentIndex} className="h-1.5 overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-700">
        <div
          className="h-full bg-emerald-500 transition-all duration-300"
          style={{ width: `${((currentIndex) / dueQuestions.length) * 100}%` }}
        />
      </div>

      {/* 問題 */}
      <Card>
        <CardContent className="p-5">
          <div ref={questionFocusRef} tabIndex={-1} role="group" aria-label={`復習問題 ${currentIndex + 1} / ${dueQuestions.length}`} className="mb-3 flex scroll-mt-24 flex-wrap gap-2 outline-none">
            <Badge variant="outline" className="text-xs">{examLabel(q.exam)}</Badge>
            <Badge variant="outline" className="text-xs">{q.category}</Badge>
            {record && (
              <Badge variant="outline" className="text-xs">Lv.{record.level}</Badge>
            )}
          </div>
          <QuestionBody text={q.question} />
          <QuestionFigures question={q} />
        </CardContent>
      </Card>

      {q.type === "native-b" ? <NativeBReview key={q.id} question={q} onNext={handleAnswer} /> : <>
      {/* 選択肢 */}
      {!showAnswer && q.type === "ordering" && <OrderingAnswerInput question={q} disabled={false} onAnswer={(value) => revealGrade(isOrderingAnswerCorrect(q, value))} />}
      {!showAnswer && q.type === "numeric" && q.numericAnswer && <NumericAnswerInput unit={q.numericAnswer.unit} specification={q.numericAnswer} disabled={false} onAnswer={(value) => revealGrade(isNumericAnswerCorrect(q, value))} />}
      {!showAnswer && q.type !== "ordering" && q.type !== "numeric" && hasChoices && (
        <div className="space-y-2">
          {required > 1 && <p className="text-sm">{selectionInstruction(q.answer, required)}</p>}
          {Object.entries(q.choices ?? {}).map(([key, value]) => (
            <button
              key={key}
              aria-pressed={required > 1 ? picks.includes(key as ChoiceKey) : undefined}
              onClick={() => selectChoice(key as ChoiceKey)}
              className="w-full rounded-xl border border-zinc-200 px-4 py-3 text-left text-sm hover:border-sky-400 hover:bg-sky-50 dark:border-zinc-700 dark:hover:border-sky-600 dark:hover:bg-sky-950/30"
            >
              <span className="font-medium">{choiceDisplayLabel(q.exam, key as ChoiceKey)}</span>
              <span className="ml-2">{value}</span>
              {q.choiceImageUrls?.[key as ChoiceKey] && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={q.choiceImageUrls[key as ChoiceKey]} alt={choiceImageAlt(q.exam, key as ChoiceKey) ?? `${value}の図`} className="mt-3 h-auto max-h-44 max-w-full rounded border border-border bg-white p-2" loading="lazy" />
              )}
            </button>
          ))}
          {q.acceptedAnswerCombinations && <Button disabled={picks.length !== required} onClick={() => revealGrade(isCompleteSelectionCorrect(q.answer, picks, required, q.acceptedAnswerCombinations))}>回答を確定</Button>}
        </div>
      )}

      {!showAnswer && !hasChoices && q.type !== "numeric" && q.type !== "ordering" && (
        <Button onClick={() => setShowAnswer(true)} className="w-full min-h-11 min-w-11 h-auto whitespace-normal py-2.5">解答・解説を見る</Button>
      )}

      {showAnswer && (
        <>
          <Card className="border-emerald-300 bg-emerald-50 dark:border-emerald-800 dark:bg-emerald-950/30">
            <CardContent className="p-4">
              <div ref={answerFocusRef} tabIndex={-1} className="mb-2 scroll-mt-24 font-semibold text-emerald-800 outline-none dark:text-emerald-300">
                {graded === undefined ? "" : graded ? "正解 · " : "不正解 · "}正解 {correctAnswer}
              </div>
              <p className="text-sm leading-7 text-foreground">
                {displayQuestionExplanation(q.exam, q.explanation)}
              </p>
              {nextInterval && (
                <p className="mt-2 text-xs text-muted-foreground">
                  正解すると次回は {nextInterval} 日後
                </p>
              )}
            </CardContent>
          </Card>

          {graded !== undefined ? (
            <Button onClick={() => handleAnswer(graded)} className="min-h-11">
              {currentIndex + 1 === dueQuestions.length ? "結果を見る" : "次の問題へ"}
            </Button>
          ) : <div className="grid grid-cols-2 gap-3">
            <Button
              variant="outline"
              onClick={() => handleAnswer(false)}
              className="border-rose-300 text-rose-700 hover:bg-rose-50 dark:border-rose-700 dark:text-rose-400 dark:hover:bg-rose-950/30 min-h-11 min-w-11 h-auto whitespace-normal py-2.5"
            >
              ✗ 間違えた
            </Button>
            <Button
              variant="outline"
              onClick={() => handleAnswer(true)}
              className="border-emerald-300 text-emerald-700 hover:bg-emerald-50 dark:border-emerald-700 dark:text-emerald-400 dark:hover:bg-emerald-950/30 min-h-11 min-w-11 h-auto whitespace-normal py-2.5"
            >
              ✓ 正解した
            </Button>
          </div>}
        </>
      )}
      </>}
    </div>
  );
}
