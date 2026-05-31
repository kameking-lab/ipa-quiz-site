"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowRight, BookOpenCheck, Eye } from "lucide-react";

import { ChoiceButton } from "./ChoiceButton";
import { useQuizChoiceRoving } from "@/lib/a11y/use-quiz-choice-roving";
import { createHistoryStore } from "@/lib/storage/history";
import { writeLastQuestion } from "@/lib/storage/last-question";
import { recordReview } from "@/lib/learning/spaced-repetition";
import { recordStudyOnDate } from "@/lib/motivation/heatmap";
import { readSettings } from "@/lib/storage/settings";
import type { ChoiceKey, ExamCode, Season, Session } from "@/lib/questions/types";

const CHOICE_KEYS: ChoiceKey[] = ["ア", "イ", "ウ", "エ"];

interface Props {
  questionId: string;
  choices: Partial<Record<ChoiceKey, string>>;
  answerKey: ChoiceKey;
  answerText?: string;
  exam: ExamCode;
  year: number;
  season: Season;
  session: Session;
  qNumber: number;
  /** /q path of the next question in the same session, if any. */
  nextHref?: string;
}

/**
 * Inline "solve in place" answer UI for the /q/* SEO landing pages (致命傷⑤).
 *
 * The /q/* pages are the search-entry surface: their question, choices and
 * explanation are server-rendered (SEO assets). Previously a visitor could only
 * *read* them — to actually answer they had to navigate to /quiz?mode=…, a seam
 * that bled search-traffic conversion. This adds the answer interaction in
 * place as Progressive Enhancement:
 *   - The choice text is rendered by ChoiceButton, so it ships inside the
 *     server-rendered HTML (crawlable / readable with JS off).
 *   - After hydration the choices become interactive (same ChoiceButton +
 *     roving-tabindex + number-key UX as the full QuizPlayer).
 *   - Answering reveals correct/incorrect and records to the *existing* history
 *     store (no new localStorage keys), so a landing-page solve counts exactly
 *     like a /quiz solve. The (already server-rendered, <details open>)
 *     explanation sits directly below.
 *   - A "just reveal" path is preserved for pure readers, and is NOT recorded
 *     so stats stay honest.
 */
export function QuestionAnswerCard({
  questionId,
  choices,
  answerKey,
  answerText,
  exam,
  year,
  season,
  session,
  qNumber,
  nextHref,
}: Props) {
  const [selected, setSelected] = React.useState<ChoiceKey | undefined>(undefined);
  const [revealed, setRevealed] = React.useState(false);

  const keys = React.useMemo(
    () => CHOICE_KEYS.filter((k) => choices[k] != null),
    [choices],
  );
  const selectedIndex = selected ? keys.indexOf(selected) : -1;
  const roving = useQuizChoiceRoving(keys.length, selectedIndex, revealed, questionId);

  const recordOutcome = React.useCallback(
    (key: ChoiceKey) => {
      const correct = key === answerKey;
      const now = Date.now();
      // localStorage may be disabled/full; the answer UX must still work.
      try {
        if (readSettings().recordHistory) {
          createHistoryStore().record({ id: questionId, selected: key, correct, at: now });
        }
        writeLastQuestion({ exam, year, season, session, qNumber, answeredAt: now });
        recordStudyOnDate();
        recordReview(questionId, correct);
      } catch {
        /* ignore storage errors */
      }
    },
    [answerKey, questionId, exam, year, season, session, qNumber],
  );

  const onSelect = React.useCallback(
    (key: ChoiceKey) => {
      if (revealed) return;
      setSelected(key);
      setRevealed(true);
      recordOutcome(key);
    },
    [revealed, recordOutcome],
  );

  // Pure-reader path: reveal the answer without committing/recording.
  const revealOnly = React.useCallback(() => {
    if (revealed) return;
    setSelected(undefined);
    setRevealed(true);
  }, [revealed]);

  // Number-key selection (1–4), mirroring QuizPlayer; ignore when typing in a
  // field so the AI copilot input etc. are unaffected.
  React.useEffect(() => {
    if (revealed) return;
    const handler = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLElement) {
        const tag = e.target.tagName;
        if (tag === "INPUT" || tag === "TEXTAREA" || e.target.isContentEditable) return;
      }
      // Don't hijack browser/OS shortcuts: Ctrl/Cmd+1–4 switches tabs, etc.
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const i = ["1", "2", "3", "4"].indexOf(e.key);
      if (i >= 0 && i < keys.length) {
        e.preventDefault();
        onSelect(keys[i]);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [revealed, keys, onSelect]);

  const isCorrect = selected !== undefined && selected === answerKey;

  return (
    <div className="space-y-4">
      <div
        role="radiogroup"
        aria-label="選択肢（矢印キーで移動、数字キー1〜4・Enter/スペースで選択）"
        className="flex flex-col gap-2.5"
      >
        {keys.map((key, idx) => (
          <ChoiceButton
            key={key}
            choiceKey={key}
            text={choices[key]!}
            revealed={revealed}
            selected={selected === key}
            correct={answerKey === key}
            disabled={revealed}
            onClick={() => onSelect(key)}
            shortcutIndex={idx + 1}
            {...roving.getRadioProps(idx)}
          />
        ))}
      </div>

      {/* Screen-reader announcement of the outcome. */}
      <div role="status" aria-live="polite" aria-atomic="true" className="sr-only">
        {revealed
          ? selected === undefined
            ? `正解は ${answerKey} です。下に解説があります。`
            : isCorrect
              ? "正解です。下に解説があります。"
              : `不正解です。正解は ${answerKey} です。下に解説があります。`
          : ""}
      </div>

      {!revealed ? (
        <button
          type="button"
          onClick={revealOnly}
          className="inline-flex min-h-[44px] items-center gap-1.5 text-sm font-medium text-muted-foreground underline decoration-border underline-offset-4 transition hover:text-foreground"
        >
          <Eye className="h-4 w-4" aria-hidden="true" />
          採点せずに答えだけ見る
        </button>
      ) : (
        <div
          className={
            selected === undefined || isCorrect
              ? "rounded-2xl border border-emerald-300/60 bg-emerald-50 p-4 dark:border-emerald-700/50 dark:bg-emerald-950/40"
              : "rounded-2xl border border-red-300/60 bg-red-50 p-4 dark:border-red-700/50 dark:bg-red-950/40"
          }
        >
          <p className="text-sm font-bold">
            {selected === undefined ? (
              <span className="text-emerald-800 dark:text-emerald-200">正解は {answerKey}</span>
            ) : isCorrect ? (
              <span className="text-emerald-800 dark:text-emerald-200">正解！</span>
            ) : (
              <span className="text-red-800 dark:text-red-200">不正解 — 正解は {answerKey}</span>
            )}
            {answerText && (
              <span className="ml-1 font-normal text-foreground">：{answerText}</span>
            )}
          </p>
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <a
              href="#explanation"
              className="inline-flex min-h-[44px] items-center gap-1.5 rounded-full border border-border bg-card px-4 py-2 text-sm font-semibold text-foreground transition hover:bg-muted"
            >
              <BookOpenCheck className="h-4 w-4 text-primary" aria-hidden="true" />
              解説を読む
            </a>
            {nextHref && (
              <Link
                href={nextHref}
                className="inline-flex min-h-[44px] items-center gap-1.5 rounded-full bg-primary px-5 py-2 text-sm font-bold text-primary-foreground shadow-sm transition hover:bg-primary/90"
              >
                次の問題へ
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
