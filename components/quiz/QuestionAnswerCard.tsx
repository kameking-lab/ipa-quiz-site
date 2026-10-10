"use client";

import { QuestionBody } from "./QuestionBody";

import * as React from "react";
import dynamic from "next/dynamic";
import { isAcceptedAnswer, formatAcceptedAnswers, CHOICE_SHORTCUTS, getChoiceKeys, isCompleteSelectionCorrect, formatSelection } from "@/lib/questions/answers";
import Link from "next/link";
import { ArrowRight, BookOpenCheck, Eye, Sparkles } from "lucide-react";

import { ChoiceButton } from "./ChoiceButton";
import { NumericAnswerInput } from "./NumericAnswerInput";
import { formatNumericAnswer, isNumericAnswerCorrect } from "@/lib/questions/numeric";
import { useQuizChoiceRoving } from "@/lib/a11y/use-quiz-choice-roving";
import { createHistoryStore } from "@/lib/storage/history";
import { writeLastQuestion } from "@/lib/storage/last-question";
import { recordReview } from "@/lib/learning/spaced-repetition";
import { recordStudyOnDate } from "@/lib/motivation/heatmap";
import { readSettings } from "@/lib/storage/settings";
import { posthogCapture } from "@/lib/posthog";
import type { ChoiceKey, ExamCode, Question, QuestionPart, Season, Session } from "@/lib/questions/types";
import { choiceDisplayLabel, choiceImageAlt, usesNumberedChoices } from "@/lib/questions/display";

const CopilotDesktopFloating = dynamic(
  () => import("@/components/copilot/CopilotPanel").then((module) => module.CopilotDesktopFloating),
  { ssr: false },
);
const CopilotMobileSheet = dynamic(
  () => import("@/components/copilot/CopilotPanel").then((module) => module.CopilotMobileSheet),
  { ssr: false },
);


interface Props {
  /** Present on real question pages; enables a one-click, in-place AI follow-up. */
  question?: Question;
  questionId: string;
  choices?: Partial<Record<ChoiceKey, string>>;
  choiceImageUrls?: Partial<Record<ChoiceKey, string>>;
  answerKey: Question["answer"];
  answerText?: string;
  exam: ExamCode;
  year: number;
  season: Season;
  session: Session;
  qNumber: number;
  part?: QuestionPart;
  /** /q path of the next question in the same session, if any. */
  nextHref?: string;
  /** 1問で選ぶ肢の数。2以上なら answerKey の全肢をそろえて選ぶと正解。 */
  requiredSelections?: number;
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
  question,
  questionId,
  choices,
  choiceImageUrls,
  answerKey,
  answerText,
  exam,
  year,
  season,
  session,
  qNumber,
  part,
  nextHref,
  requiredSelections = 1,
}: Props) {
  const numeric = question?.type === "numeric";
  const multiSelect = !numeric && requiredSelections > 1;
  const [selected, setSelected] = React.useState<ChoiceKey | undefined>(undefined);
  // 「二つとも答えなさい」形式で選択中の肢（採点前は何度でも選び直せる）。
  const [picked, setPicked] = React.useState<ChoiceKey[]>([]);
  const [numericSelected, setNumericSelected] = React.useState<string | undefined>(undefined);
  const [revealed, setRevealed] = React.useState(false);
  const [shortcutsReady, setShortcutsReady] = React.useState(false);
  const [copilotRequest, setCopilotRequest] = React.useState(0);

  React.useEffect(() => {
    setSelected(undefined);
    setPicked([]);
    setNumericSelected(undefined);
    setRevealed(false);
    setCopilotRequest(0);
  }, [questionId]);

  const keys = React.useMemo(
    () => getChoiceKeys(choices),
    [choices],
  );
  const selectedIndex = selected ? keys.indexOf(selected) : -1;
  const roving = useQuizChoiceRoving(keys.length, selectedIndex, revealed, questionId);

  const recordOutcome = React.useCallback(
    (selection: string, correct: boolean) => {
      const now = Date.now();
      // localStorage may be disabled/full; the answer UX must still work.
      try {
        if (readSettings().recordHistory) {
          createHistoryStore().record({ id: questionId, selected: selection, correct, at: now });
        }
        writeLastQuestion({ exam, year, season, session, qNumber, part, answeredAt: now });
        recordStudyOnDate();
        recordReview(questionId, correct);
      } catch {
        /* ignore storage errors */
      }
      // /q/* の inline 回答は元々未計測だった。QuizPlayer と同じイベント名を使うことで、
      // admin/exam-usage の資格別回答数ランキングに自動的に合算される。
      posthogCapture("question_answered", { questionId, exam, correct });
    },
    [questionId, exam, year, season, session, qNumber, part],
  );

  const onSelect = React.useCallback(
    (key: ChoiceKey) => {
      if (revealed) return;
      if (multiSelect) {
        const next = picked.includes(key) ? picked.filter((k) => k !== key) : [...picked, key];
        setPicked(next);
        if (next.length === requiredSelections) {
          setRevealed(true);
          recordOutcome(formatSelection(next), isCompleteSelectionCorrect(answerKey, next));
        }
        return;
      }
      setSelected(key);
      setRevealed(true);
      recordOutcome(key, isAcceptedAnswer(answerKey, key));
    },
    [revealed, recordOutcome, multiSelect, picked, requiredSelections, answerKey],
  );

  const onNumericAnswer = React.useCallback((value: string) => {
    if (!question || !numeric || revealed) return;
    setNumericSelected(value);
    setRevealed(true);
    recordOutcome(value, isNumericAnswerCorrect(question, value));
  }, [question, numeric, revealed, recordOutcome]);

  // Pure-reader path: reveal the answer without committing/recording.
  const revealOnly = React.useCallback(() => {
    if (revealed) return;
    setSelected(undefined);
    setPicked([]);
    setNumericSelected(undefined);
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
      const i = CHOICE_SHORTCUTS.indexOf(e.key);
      if (i >= 0 && i < keys.length) {
        e.preventDefault();
        onSelect(keys[i]);
      }
    };
    window.addEventListener("keydown", handler);
    setShortcutsReady(true);
    return () => {
      window.removeEventListener("keydown", handler);
      setShortcutsReady(false);
    };
  }, [revealed, keys, onSelect]);

  const answered = numeric ? numericSelected !== undefined : multiSelect ? picked.length === requiredSelections : selected !== undefined;
  const isCorrect = numeric ? isNumericAnswerCorrect(question!, numericSelected ?? "") : multiSelect ? isCompleteSelectionCorrect(answerKey, picked) : isAcceptedAnswer(answerKey, selected);
  const answerLabel = numeric ? formatNumericAnswer(question!) : usesNumberedChoices(exam)
    ? (Array.isArray(answerKey) ? answerKey : [answerKey]).map((key) => choiceDisplayLabel(exam, key as ChoiceKey)).join("・")
    : formatAcceptedAnswers(answerKey);

  return (
    <div className="space-y-4">
      {multiSelect && !revealed && (
        <p className="rounded-xl border border-amber-300/60 bg-amber-50 px-3 py-2 text-sm font-semibold text-amber-900 dark:border-amber-700/50 dark:bg-amber-950/40 dark:text-amber-100" data-testid="multi-select-hint">
          正解は{requiredSelections}つあります。{requiredSelections}つ選ぶと採点します（選択中 {picked.length}/{requiredSelections}）
        </p>
      )}
      {numeric ? (
        <NumericAnswerInput key={questionId} unit={question!.numericAnswer!.unit} disabled={revealed} onAnswer={onNumericAnswer} />
      ) : <div
        role={multiSelect ? "group" : "radiogroup"}
        data-shortcuts-ready={shortcutsReady}
        aria-label={multiSelect ? `選択肢（${requiredSelections}つ選ぶ。数字キー1〜9・0・Enter/スペースで選択・解除）` : "選択肢（矢印キーで移動、数字キー1〜9・0・Enter/スペースで選択）"}
        className="flex flex-col gap-2.5"
      >
        {keys.map((key, idx) => (
          <ChoiceButton
            key={key}
            choiceKey={key}
            displayLabel={choiceDisplayLabel(exam, key)}
            text={choices![key]!}
            imageUrl={choiceImageUrls?.[key]}
            imageAlt={choiceImageAlt(exam, key)}
            revealed={revealed}
            selected={multiSelect ? picked.includes(key) : selected === key}
            correct={isAcceptedAnswer(answerKey, key)}
            disabled={revealed}
            onClick={() => onSelect(key)}
            shortcutIndex={idx < 10 ? (idx + 1) % 10 : null}
            multiSelect={multiSelect}
            {...roving.getRadioProps(idx)}
          />
        ))}
      </div>}

      {/* Screen-reader announcement of the outcome. */}
      <div role="status" aria-live="polite" aria-atomic="true" className="sr-only">
        {revealed
          ? !answered
            ? `正解は ${answerLabel} です。下に解説があります。`
            : isCorrect
              ? "正解です。下に解説があります。"
              : `不正解です。正解は ${answerLabel} です。下に解説があります。`
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
            !answered || isCorrect
              ? "rounded-2xl border border-emerald-300/60 bg-emerald-50 p-4 dark:border-emerald-700/50 dark:bg-emerald-950/40"
              : "rounded-2xl border border-red-300/60 bg-red-50 p-4 dark:border-red-700/50 dark:bg-red-950/40"
          }
        >
          <div className="text-sm font-bold">
            {!answered ? (
              <span className="text-emerald-800 dark:text-emerald-200">正解は {answerLabel}</span>
            ) : isCorrect ? (
              <>
                <span className="text-emerald-800 dark:text-emerald-200">正解！</span>
                {usesNumberedChoices(exam) && <span className="ml-2 text-emerald-800 dark:text-emerald-200">正答は {answerLabel}</span>}
              </>
            ) : (
              <span className="text-red-800 dark:text-red-200">不正解 — 正解は {answerLabel}</span>
            )}
            {answerText && (answerText.includes("\n") ? (
              <div className="mt-2 min-w-0 font-normal text-foreground"><QuestionBody text={answerText} /></div>
            ) : (
              <span className="ml-1 font-normal text-foreground">：{answerText}</span>
            ))}
          </div>
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <a
              href="#explanation"
              className="inline-flex min-h-[44px] items-center gap-1.5 rounded-full bg-primary px-5 py-2 text-sm font-bold text-primary-foreground shadow-sm transition hover:bg-primary/90"
            >
              <BookOpenCheck className="h-4 w-4 text-primary-foreground" aria-hidden="true" />
              解説を読む
            </a>
            {question && (
              <button
                type="button"
                onClick={() => setCopilotRequest((request) => request + 1)}
                className="inline-flex min-h-[44px] items-center gap-1.5 rounded-full border border-primary/40 bg-card px-4 py-2 text-sm font-semibold text-primary transition hover:bg-primary-soft"
              >
                <Sparkles className="h-4 w-4" aria-hidden="true" />
                {answered && !isCorrect ? "誤答をAIに質問" : "この問題をAIに質問"}
              </button>
            )}
            {nextHref && (
              <Link
                href={nextHref}
                className="inline-flex min-h-[44px] items-center gap-1.5 rounded-full border border-border bg-card px-4 py-2 text-sm font-semibold text-foreground transition hover:bg-muted"
              >
                次の問題へ
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            )}
          </div>
        </div>
      )}
      {question && copilotRequest > 0 && (
        <>
          <CopilotDesktopFloating
            key={`desktop-${copilotRequest}`}
            question={question}
            selectedChoice={answered ? (numeric ? numericSelected : multiSelect ? formatSelection(picked) : selected) : undefined}
            isCorrect={answered ? isCorrect : undefined}
            initialPrompt={answered && !isCorrect ? "私が選んだ答えがなぜ違うのか、正解との違いをこの問題に沿って説明してください。" : undefined}
            defaultOpen
          />
          <CopilotMobileSheet
            key={`mobile-${copilotRequest}`}
            question={question}
            selectedChoice={answered ? (numeric ? numericSelected : multiSelect ? formatSelection(picked) : selected) : undefined}
            isCorrect={answered ? isCorrect : undefined}
            initialPrompt={answered && !isCorrect ? "私が選んだ答えがなぜ違うのか、正解との違いをこの問題に沿って説明してください。" : undefined}
            defaultOpen
          />
        </>
      )}
    </div>
  );
}
