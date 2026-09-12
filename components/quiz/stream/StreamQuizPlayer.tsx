"use client";
import { questionSourceEdition, questionSourceExam } from "@/lib/questions/source-label";


import * as React from "react";
import { QuestionBody } from "../QuestionBody";
import { QuestionFigures } from "../QuestionFigures";
import { isAcceptedAnswer, formatAcceptedAnswers, CHOICE_SHORTCUTS, getChoiceKeys } from "@/lib/questions/answers";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { ChoiceKey, Question } from "@/lib/questions/types";
import { createHistoryStore } from "@/lib/storage/history";
import { FOCUSABLE_SELECTOR, trapTabTarget } from "@/lib/a11y/focus-trap";
import { ArrowLeft, ChevronUp, ChevronDown, Check, X, Flame } from "lucide-react";
import { StreamSummary } from "./StreamSummary";
import { ComboFireworks } from "./ComboFireworks";

const SUMMARY_AT = 10;

interface AnswerLog {
  questionId: string;
  selected: ChoiceKey | null;
  correct: boolean;
}

export function StreamQuizPlayer({ questions, backHref = "/ipa" }: { questions: Question[]; backHref?: string }) {
  const router = useRouter();
  const history = React.useMemo(() => createHistoryStore(), []);
  const [index, setIndex] = React.useState(0);
  const [answers, setAnswers] = React.useState<AnswerLog[]>([]);
  const [selected, setSelected] = React.useState<ChoiceKey | null>(null);
  const [revealed, setRevealed] = React.useState(false);
  const [combo, setCombo] = React.useState(0);
  const [showFireworks, setShowFireworks] = React.useState(false);
  const [showSummary, setShowSummary] = React.useState(false);
  const [transitioning, setTransitioning] = React.useState<"none" | "out">("none");
  const [reviewing, setReviewing] = React.useState(false);
  const advancingRef = React.useRef(false);
  // The review trigger unmounts while the overlay is open (canReview === false),
  // so restore focus to it when the overlay closes — otherwise keyboard users
  // are stranded at document.body (WCAG 2.4.3).
  const reviewTriggerRef = React.useRef<HTMLButtonElement | null>(null);
  const prevReviewingRef = React.useRef(reviewing);
  React.useEffect(() => {
    if (prevReviewingRef.current && !reviewing) {
      reviewTriggerRef.current?.focus({ preventScroll: true });
    }
    prevReviewingRef.current = reviewing;
  }, [reviewing]);

  const question = questions[index];
  const lastAnswer = answers[answers.length - 1];
  const lastAnsweredQuestion = lastAnswer
    ? questions.find((q) => q.id === lastAnswer.questionId) ?? null
    : null;
  const canReview = !reviewing && lastAnsweredQuestion !== null && lastAnsweredQuestion.id !== question?.id;

  const goNext = React.useCallback(() => {
    if (advancingRef.current) return;
    advancingRef.current = true;
    setTransitioning("out");
    window.setTimeout(() => {
      setSelected(null);
      setRevealed(false);
      setTransitioning("none");
      advancingRef.current = false;
      setIndex((prev) => {
        const next = prev + 1;
        if ((prev + 1) % SUMMARY_AT === 0) {
          setShowSummary(true);
          return prev;
        }
        if (next >= questions.length) {
          setShowSummary(true);
          return prev;
        }
        return next;
      });
    }, 280);
  }, [questions.length]);

  const onSelect = React.useCallback(
    (key: ChoiceKey) => {
      if (!question || revealed) return;
      const correct = isAcceptedAnswer(question.answer, key);
      setSelected(key);
      setRevealed(true);
      setAnswers((prev) => [
        ...prev,
        { questionId: question.id, selected: key, correct },
      ]);
      history.record({ id: question.id, selected: key, correct, at: Date.now() });
      if (correct) {
        setCombo((c) => {
          const next = c + 1;
          if (next >= 3) {
            setShowFireworks(true);
            window.setTimeout(() => setShowFireworks(false), 1600);
          }
          return next;
        });
      } else {
        setCombo(0);
      }
    },
    [question, revealed, history],
  );

  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!question || showSummary || reviewing) return;
      if (e.target instanceof HTMLElement) {
        const tag = e.target.tagName;
        if (tag === "INPUT" || tag === "TEXTAREA") return;
      }
      // Don't hijack browser/OS shortcuts: Ctrl/Cmd+1–4 switches tabs, etc.
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      if (!revealed) {
        const i = CHOICE_SHORTCUTS.indexOf(e.key);
        if (i >= 0 && i < getChoiceKeys(question.choices).length) {
          e.preventDefault();
          onSelect(getChoiceKeys(question.choices)[i]);
        }
      } else if (e.key === "Enter" && !(e.target instanceof HTMLElement && e.target.closest("button, a, summary"))) {
        e.preventDefault();
        goNext();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onSelect, goNext, revealed, showSummary, reviewing, question]);

  if (!question) return null;

  if (showSummary) {
    const recent = answers.slice(-SUMMARY_AT);
    return (
      <StreamSummary
        backHref={backHref}
        recentAnswers={recent}
        totalAnswered={answers.length}
        onContinue={() => {
          if (index + 1 >= questions.length) {
            router.push(backHref);
            return;
          }
          setIndex((i) => i + 1);
          setShowSummary(false);
        }}
        canContinue={index + 1 < questions.length}
      />
    );
  }

  const answerKey = formatAcceptedAnswers(question.answer);

  return (
    <div
      className="relative flex h-[100dvh] min-h-[100dvh] flex-col overflow-hidden bg-gradient-to-b from-zinc-950 via-zinc-900 to-black text-zinc-50 select-none"
    >
      <header className="relative z-20 flex items-center justify-between px-4 pt-4 pb-2">
        <Link
          href={backHref}
          className="rounded-full bg-white/10 p-2 backdrop-blur hover:bg-white/20"
          aria-label="戻る"
        >
          <ArrowLeft className="h-4 w-4" />
        </Link>
        <div className="flex items-center gap-3 text-xs">
          <span className="rounded-full bg-white/10 px-3 py-1 backdrop-blur">
            {index + 1} / {questions.length}
          </span>
          {canReview && (
            <button
              ref={reviewTriggerRef}
              type="button"
              onClick={() => setReviewing(true)}
              className="flex items-center gap-1 rounded-full bg-white/10 px-3 py-1 text-zinc-200 backdrop-blur transition-colors hover:bg-white/20"
              aria-label="直前に解いた問題に戻る"
            >
              <ChevronDown className="h-3 w-3" />
              直前の問題
            </button>
          )}
          {combo >= 2 && (
            <span className="flex items-center gap-1 rounded-full bg-amber-500/30 px-3 py-1 text-amber-200 backdrop-blur">
              <Flame className="h-3 w-3" />
              {combo} 連続正解
            </span>
          )}
        </div>
      </header>

      <main
        className={`relative z-10 flex min-h-0 flex-1 flex-col overflow-y-auto px-5 pb-20 transition-all duration-300 ${
          transitioning === "out" ? "-translate-y-8 opacity-0" : "translate-y-0 opacity-100"
        }`}
        key={question.id}
      >
        <div className="mb-3 flex flex-wrap gap-2 text-[10px] text-zinc-300">
          <span className="rounded-full bg-white/5 px-2 py-0.5 ring-1 ring-white/10">
            {questionSourceExam(question)} {questionSourceEdition(question)}
          </span>
          <span className="rounded-full bg-white/5 px-2 py-0.5 ring-1 ring-white/10">
            問{question.qNumber}
          </span>
          <span className="rounded-full bg-sky-500/20 px-2 py-0.5 text-sky-200 ring-1 ring-sky-400/30">
            {question.category}
          </span>
        </div>

        <div className="mb-4 shrink-0 rounded-2xl bg-white/5 p-5 text-[15px] leading-relaxed ring-1 ring-white/10 backdrop-blur">
          <QuestionBody text={question.question} />
          <QuestionFigures question={question} />
        </div>

        <div className="space-y-2">
          {question.choices &&
            getChoiceKeys(question.choices).map((key) => {
              const isCorrect = isAcceptedAnswer(question.answer, key);
              const isSelected = selected === key;
              let cls =
                "border-white/10 bg-white/5 text-zinc-100 hover:bg-white/10 active:bg-white/15";
              if (revealed) {
                if (isCorrect) cls = "border-emerald-400 bg-emerald-500/20 text-emerald-50";
                else if (isSelected) cls = "border-red-400 bg-red-500/20 text-red-50";
                else cls = "border-white/5 bg-white/5 text-zinc-400 opacity-60";
              } else if (isSelected) {
                cls = "border-sky-400 bg-sky-500/20 text-sky-50";
              }
              return (
                <button
                  key={key}
                  onClick={() => onSelect(key)}
                  disabled={revealed}
                  className={`flex w-full items-start gap-3 rounded-2xl border-2 px-4 py-3 text-left text-sm leading-snug backdrop-blur transition-all ${cls}`}
                >
                  <span
                    className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                      revealed && isCorrect
                        ? "bg-emerald-500 text-white"
                        : revealed && isSelected
                          ? "bg-red-500 text-white"
                          : isSelected
                            ? "bg-sky-500 text-white"
                            : "bg-white/10"
                    }`}
                  >
                    {key}
                  </span>
                  <span className="flex-1 pt-0.5">{question.choices![key]}</span>
                  {revealed && isCorrect && (
                    <Check className="h-4 w-4 shrink-0 text-emerald-300" />
                  )}
                  {revealed && isSelected && !isCorrect && (
                    <X className="h-4 w-4 shrink-0 text-red-300" />
                  )}
                </button>
              );
            })}
        </div>

        {revealed && (
          <div className="animate-in slide-in-from-bottom-4 mt-4 rounded-2xl bg-white/5 p-4 text-sm ring-1 ring-white/10 backdrop-blur">
            <div className="mb-1 flex items-center justify-between text-xs">
              <span className="font-semibold text-emerald-300">
                正解: {answerKey}
              </span>
              <span className="text-zinc-400">読んだら次の問題へ</span>
            </div>
            <div className="mt-2 text-zinc-200"><QuestionBody text={question.explanation || "解説は準備中です。"} /></div>
          </div>
        )}
      </main>

      {revealed && (
        <button
          onClick={goNext}
          className="pb-safe absolute inset-x-0 bottom-0 z-20 flex items-center justify-center gap-2 bg-gradient-to-t from-black/80 to-transparent py-4 text-xs text-zinc-300 hover:text-white"
        >
          <ChevronUp className="h-4 w-4 animate-bounce" />
          次の問題へ
        </button>
      )}

      {reviewing && lastAnsweredQuestion && lastAnswer && (
        <ReviewOverlay
          question={lastAnsweredQuestion}
          answer={lastAnswer}
          onClose={() => setReviewing(false)}
        />
      )}

      {showFireworks && <ComboFireworks />}
    </div>
  );
}

function ReviewOverlay({
  question,
  answer,
  onClose,
}: {
  question: Question;
  answer: AnswerLog;
  onClose: () => void;
}) {
  const dialogRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  // Push focus into the overlay on open so keyboard users land inside this
  // aria-modal dialog instead of staying on the page behind it.
  React.useEffect(() => {
    const t = window.setTimeout(() => {
      dialogRef.current
        ?.querySelector<HTMLElement>(FOCUSABLE_SELECTOR)
        ?.focus({ preventScroll: true });
    }, 0);
    return () => window.clearTimeout(t);
  }, []);

  // Trap Tab focus inside the overlay (WCAG 2.4.3). aria-modal alone does not
  // stop the browser from tabbing into the inert quiz behind it.
  const onDialogKeyDown = (e: React.KeyboardEvent) => {
    if (e.key !== "Tab" || !dialogRef.current) return;
    const focusables = Array.from(
      dialogRef.current.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR),
    ).filter((el) => el.offsetParent !== null || el === document.activeElement);
    const target = trapTabTarget(
      focusables,
      document.activeElement as HTMLElement | null,
      e.shiftKey,
    );
    if (target) {
      e.preventDefault();
      target.focus({ preventScroll: true });
    }
  };

  const answerKey = formatAcceptedAnswers(question.answer);

  return (
    <div
      ref={dialogRef}
      className="fixed inset-0 z-50 flex flex-col bg-zinc-950/95 backdrop-blur"
      role="dialog"
      aria-modal="true"
      aria-label="直前に解いた問題の復習"
      onKeyDown={onDialogKeyDown}
    >
      <header className="flex items-center justify-between px-4 pt-4 pb-2">
        <button
          type="button"
          onClick={onClose}
          className="rounded-full bg-white/10 p-2 text-zinc-100 hover:bg-white/20"
          aria-label="閉じる"
        >
          <ChevronUp className="h-4 w-4" />
        </button>
        <span className="rounded-full bg-white/10 px-3 py-1 text-xs text-zinc-200">
          直前の問題（復習）
        </span>
        <span className="w-9" aria-hidden="true" />
      </header>

      <div className="flex-1 overflow-y-auto px-5 pb-8">
        <div className="mb-3 flex flex-wrap gap-2 text-[10px] text-zinc-300">
          <span className="rounded-full bg-white/5 px-2 py-0.5 ring-1 ring-white/10">
            {questionSourceExam(question)} {questionSourceEdition(question)}
          </span>
          <span className="rounded-full bg-white/5 px-2 py-0.5 ring-1 ring-white/10">
            問{question.qNumber}
          </span>
          <span className="rounded-full bg-sky-500/20 px-2 py-0.5 text-sky-200 ring-1 ring-sky-400/30">
            {question.category}
          </span>
        </div>

        <div className="mb-4 rounded-2xl bg-white/5 p-5 text-[15px] leading-relaxed text-zinc-100 ring-1 ring-white/10">
          <QuestionBody text={question.question} />
          <QuestionFigures question={question} />
        </div>

        <div className="mb-4 space-y-2">
          {question.choices &&
            getChoiceKeys(question.choices).map((key) => {
              const isCorrect = isAcceptedAnswer(question.answer, key);
              const isSelected = answer.selected === key;
              let cls = "border-white/10 bg-white/5 text-zinc-300 opacity-70";
              if (isCorrect) cls = "border-emerald-400 bg-emerald-500/20 text-emerald-50";
              else if (isSelected) cls = "border-red-400 bg-red-500/20 text-red-50";
              return (
                <div
                  key={key}
                  className={`flex w-full items-start gap-3 rounded-2xl border-2 px-4 py-3 text-left text-sm leading-snug ${cls}`}
                >
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white/10 text-xs font-bold">
                    {key}
                  </span>
                  <span className="flex-1 pt-0.5">{question.choices![key]}</span>
                  {isCorrect && <Check className="h-4 w-4 shrink-0 text-emerald-300" />}
                  {isSelected && !isCorrect && (
                    <X className="h-4 w-4 shrink-0 text-red-300" />
                  )}
                </div>
              );
            })}
        </div>

        <div className="rounded-2xl bg-white/5 p-4 text-sm text-zinc-100 ring-1 ring-white/10">
          <div className="mb-2 flex items-center justify-between text-xs">
            <span className="font-semibold text-emerald-300">正解: {answerKey}</span>
            <span className={answer.correct ? "text-emerald-300" : "text-red-300"}>
              あなたの回答: {answer.selected ?? "—"} / {answer.correct ? "正解" : "不正解"}
            </span>
          </div>
          <div className="whitespace-pre-wrap leading-relaxed text-zinc-200">
            <QuestionBody text={question.explanation || "解説は準備中です。"} />
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={onClose}
        className="pb-safe absolute inset-x-0 bottom-0 z-20 flex items-center justify-center gap-2 bg-gradient-to-t from-black/90 to-transparent py-4 text-xs text-zinc-200 hover:text-white"
      >
        <ChevronUp className="h-4 w-4" />
        現在の問題に戻る
      </button>
    </div>
  );
}
