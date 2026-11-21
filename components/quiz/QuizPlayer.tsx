"use client";
import { WeakMark } from "@/components/quiz/WeakMark";
import { isSelfReviewedDescriptiveQuestion } from "@/lib/questions/descriptive";
import { NativeQuestionGate } from "@/mobile/shared/NativeQuestionGate";

import * as React from "react";
import dynamic from "next/dynamic";
import { LearningPetCorner } from "@/components/pet/LearningPetCorner";
import { isReferenceOnlyQuestionId } from "@/lib/questions/assessment";
import type { NativeBGrade } from "@/lib/questions/types";
import { gradeNativeB, serializeNativeBSelections, formatNativeBAnswer, type NativeBSelections } from "@/lib/questions/native-b";
import { NativeBAnswerInput } from "./NativeBAnswer";
import { isAcceptedAnswer, formatAcceptedAnswers, CHOICE_SHORTCUTS, getChoiceKeys, requiredSelectionCount, isCompleteSelectionCorrect, formatSelection, selectionInstruction } from "@/lib/questions/answers";
import { useRouter } from "next/navigation";
import type { Question, ChoiceKey, ExamCode } from "@/lib/questions/types";
import { choiceDisplayLabel, choiceImageAlt, formatQuestionAnswerForDisplay, usesNumberedChoices } from "@/lib/questions/display";
import { PracticeLoading } from "./PracticeTransition";
import { ChihuahuaMascot } from "@/components/ChihuahuaMascot";
import { recordStudyReward } from "@/lib/study-reward";
import { usePetLearning } from "@/components/pet/usePetLearning";
import type { PetLearningSubmission } from "@/lib/pet/client/learning-submission-contracts";
import { QuestionCard } from "./QuestionCard";
import { DescriptiveAnswerCard } from "./DescriptiveAnswerCard";
import { NumericAnswerInput } from "./NumericAnswerInput";
import { OrderingAnswerInput } from "./OrderingAnswerInput";
import { formatOrderingAnswer, isOrderingAnswerCorrect } from "@/lib/questions/ordering";
import { formatNumericAnswer, isNumericAnswerCorrect } from "@/lib/questions/numeric";
import { ChoiceButton } from "./ChoiceButton";
import { AfternoonEssayHint } from "./AfternoonEssayHint";
import { useQuizChoiceRoving } from "@/lib/a11y/use-quiz-choice-roving";
import { ExplanationCard } from "./ExplanationCard";
import { createHistoryStore } from "@/lib/storage/history";
import { writeLastQuestion } from "@/lib/storage/last-question";

import { Button } from "@/components/ui/button";
import { ArrowLeft, Timer } from "lucide-react";
import { examLabel } from "@/lib/utils";
import { comboLevel } from "@/lib/motivation/combo";
import { recordSessionAnswer } from "@/lib/motivation/session";
import { recordStudyOnDate } from "@/lib/motivation/heatmap";
import { useQuestionActivity } from "@/lib/study-plan/use-question-activity";
import { posthogCapture } from "@/lib/posthog";
import { observeJourney } from "@/lib/billing/journey-client";
import { readSettings } from "@/lib/storage/settings";
import { evaluateAchievementsAfterAnswer } from "@/lib/gamification/achievements";
import { tsuginoScheduleUrl } from "@/lib/tsugino-qualification";
import { onBrowserIdle } from "@/lib/performance/browser-idle";

// Decorations must not ship the animation runtime before the learner needs it.
const FireworksBurst = dynamic(() => import("@/components/motivation/FireworksBurst").then(module => module.FireworksBurst), { ssr: false });
const ComboCounter = dynamic(() => import("@/components/motivation/ComboCounter").then(module => module.ComboCounter), { ssr: false });
const AchievementToast = dynamic(() => import("@/components/motivation/AchievementToast").then(module => module.AchievementToast), { ssr: false });

export function quizModeLabel(mode: string): string {
  const labels: Record<string, string> = { random: "ランダム", year: "年度別", topic: "分野別", review: "復習", starred: "あとで復習", mock: "模試", sequential: "順番に解く", unanswered: "未回答" };
  return labels[mode] ?? "過去問演習";
}

function formatElapsed(s: number) {
  const m = Math.floor(s / 60);
  const sec = s % 60;
  return `${m}:${sec.toString().padStart(2, "0")}`;
}

interface Props {
  question: Question | null;
  index: number;
  total: number;
  mode: string;
  backHref?: string;
  backLabel?: string;
  exam?: string;
  onNext: () => void;
  onFinish?: () => void;
  quiet?: boolean;
}


export function QuizPlayer(props: Props) {
  if (isReferenceOnlyQuestionId(props.question?.id)) {
    return <p role="note">この問題は参照専用です。採点・学習記録・報酬の対象には含まれません。</p>;
  }
  return <NativeQuestionGate id={props.question?.id}><ScoredQuizPlayer {...props} /></NativeQuestionGate>;
}

function ScoredQuizPlayer({
  question,
  index,
  total,
  mode,
  backHref = "/",
  backLabel = "モード選択に戻る",
  exam = "ap",
  onNext,
  onFinish,
  quiet = false,
}: Props) {
  const pet = usePetLearning();
  const router = useRouter();
  const history = React.useMemo(() => createHistoryStore(), []);
  const [selected, setSelected] = React.useState<ChoiceKey | undefined>(undefined);
  // 「二つとも答えなさい」形式で選択中の肢。規定数そろった時点で採点する。
  const [picked, setPicked] = React.useState<ChoiceKey[]>([]);
  const [numericSelected, setNumericSelected] = React.useState<string | undefined>(undefined);
  const [orderedSelected, setOrderedSelected] = React.useState<ChoiceKey[] | undefined>(undefined);
  const [nativeBResult, setNativeBResult] = React.useState<NativeBGrade | undefined>();
  const [revealed, setRevealed] = React.useState(false);
  const answerFinalized = React.useRef(false);
  const { recordAnswer: recordActivityAnswer, recordExplanation, endRef: explanationEndRef } = useQuestionActivity(question, revealed);
  const [preparedExplanationId, setPreparedExplanationId] = React.useState<string | null>(null);
  const [completed, setCompleted] = React.useState(false);
  const questionStartRef = React.useRef<HTMLDivElement>(null);
  const answerResultRef = React.useRef<HTMLDivElement>(null);
  const [stats, setStats] = React.useState({ answered: 0, correct: 0 });
  const [showKeyboardHelp, setShowKeyboardHelp] = React.useState(false);
  const [elapsed, setElapsed] = React.useState(0);
  const [combo, setCombo] = React.useState(0);
  const [burst, setBurst] = React.useState<{ level: "small" | "big"; nonce: number } | null>(null);
  const [pendingAchievement, setPendingAchievement] = React.useState<string | null>(null);
  const quizStartedFiredRef = React.useRef(false);

  React.useEffect(() => {
    if (question?.type !== "multiple-choice") return;
    const id = question.id;
    return onBrowserIdle(() => setPreparedExplanationId(id));
  }, [question?.id, question?.type]);

  React.useEffect(() => {
    if (!revealed) return;
    let frame = 0, attempts = 0;
    // Touch/reduced-motion can ignore the first focus while a prepared result
    // becomes visible. Retry after paint only if focus was lost to the body;
    // never steal it from a learner who already chose another action.
    // Chromium may keep the formerly invisible result hidden for another
    // style/transition frame in reduced motion. Retry for a bounded interval.
    const recover = () => {
      if (document.activeElement !== document.body) return;
      answerResultRef.current?.focus({ preventScroll: true });
      if (document.activeElement === document.body && ++attempts < 8) frame = requestAnimationFrame(recover);
    };
    frame = requestAnimationFrame(() => { frame = requestAnimationFrame(recover); });
    return () => cancelAnimationFrame(frame);
  }, [revealed, question?.id]);

  // 最初の問題がロードされた瞬間に quiz_started を一度だけ送信
  React.useEffect(() => {
    if (quizStartedFiredRef.current || !question || isReferenceOnlyQuestionId(question.id)) return;
    quizStartedFiredRef.current = true;
    posthogCapture("quiz_started", {
      exam: question.exam,
      mode,
      total,
    });
  }, [question, mode, total]);

  React.useEffect(() => {
    if (completed) return;
    const id = setInterval(() => setElapsed((e) => e + 1), 1000);
    return () => clearInterval(id);
  }, [completed]);

  const questionId = question?.id;
  React.useEffect(() => {
    answerFinalized.current = false;
    setNativeBResult(undefined);
    setSelected(undefined);
    setPicked([]);
    setNumericSelected(undefined);
    setOrderedSelected(undefined);
    setRevealed(false);
  }, [questionId, index]);

  // Arrow-key roving for the answer radiogroup (focus-only; Enter/Space/click
  // commits via ChoiceButton's native activation). Called unconditionally before
  // the early returns below to respect the rules of hooks.
  const choiceRoving = useQuizChoiceRoving(
    getChoiceKeys(question?.choices).length,
    selected ? getChoiceKeys(question?.choices).indexOf(selected) : -1,
    revealed,
    question?.id ?? "",
  );

  const goNext = React.useCallback(() => {
    recordExplanation();
    if (index + 1 >= total) {
      onFinish?.();
      setCompleted(true);
      window.scrollTo?.({ top: 0, behavior: "instant" });
      return;
    }
    onNext();
  }, [index, total, onNext, onFinish, recordExplanation]);

  const commitAnswer = React.useCallback(
    (selection: string, correct: boolean, petAnswer: Extract<PetLearningSubmission, { source: "question" }>["answer"], nativeBResult?: NativeBGrade) => {
      if (!question || isReferenceOnlyQuestionId(question.id) || answerFinalized.current) return;
      // Click, shortcut and form events can share the same ungraded render.
      answerFinalized.current = true;
      setRevealed(true);
      const now = Date.now();
      recordActivityAnswer(correct, now);
      requestAnimationFrame(() => {
        answerResultRef.current?.focus({ preventScroll: true });
        answerResultRef.current?.scrollIntoView({ block: "start", behavior: "instant" });
      });
      posthogCapture("question_answered", {
        questionId: question.id,
        exam: question.exam,
        correct,
      });
      observeJourney({ qualification: question.exam, answer: true });
      if (!nativeBResult || nativeBResult.slotResults.every(slot => Boolean(slot.selectedCandidateId))) {
        recordStudyReward({ scope: `quiz:${question.exam}`, questionId: question.id, exam: question.exam, label: examLabel(question.exam) });
      }
      if (readSettings().recordHistory) {
        history.record({ id: question.id, selected: selection, correct, at: now, ...(nativeBResult ? { nativeBResult } : {}) });
      }
      writeLastQuestion({
        exam: question.exam,
        year: question.year,
        season: question.season,
        session: question.session,
        qNumber: question.qNumber,
        part: question.part,
        answeredAt: now,
      });
      recordSessionAnswer({
        id: question.id,
        correct,
        category: question.category ?? "未分類",
        at: now,
      });
      recordStudyOnDate();
      pet.answer(question, petAnswer);
      const nextCombo = correct ? combo + 1 : 0;
      const allStats = history.getStats();
      const newlyUnlocked = evaluateAchievementsAfterAnswer(allStats.total, allStats.correct, nextCombo);
      if (newlyUnlocked.length > 0 && !pendingAchievement) {
        setPendingAchievement(newlyUnlocked[0].id);
      }
      setStats((s) => ({ answered: s.answered + 1, correct: s.correct + (correct ? 1 : 0) }));
      setCombo(nextCombo);
      const level = comboLevel(nextCombo);
      if (level !== "none" && !window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
        setBurst({ level, nonce: Date.now() });
      }
    },
    [question, history, combo, pendingAchievement, pet, recordActivityAnswer],
  );

  const onNativeBAnswer = React.useCallback((selections: NativeBSelections) => {
    if (!question?.nativeB || isReferenceOnlyQuestionId(question.id) || question.type !== "native-b" || answerFinalized.current) return;
    const result = gradeNativeB(question.nativeB, selections);
    setNativeBResult(result);
    const selectedSlots = Object.fromEntries(Object.entries(selections).filter((entry): entry is [string, string] => typeof entry[1] === "string"));
    commitAnswer(serializeNativeBSelections(question.nativeB, selections), result.isCorrect, { kind: "native-b", selections: selectedSlots }, result);
  }, [question, commitAnswer]);

  const onSelect = React.useCallback(
    (key: ChoiceKey) => {
      if (!question || isReferenceOnlyQuestionId(question.id) || answerFinalized.current || question.type === "ordering") return;
      const required = requiredSelectionCount(question);
      if (question.acceptedAnswerCombinations && !picked.includes(key) && picked.length >= required) return;
      if (required > 1) {
        const next = picked.includes(key) ? picked.filter((k) => k !== key) : [...picked, key];
        setPicked(next);
        if (!question.acceptedAnswerCombinations && next.length === required) commitAnswer(formatSelection(next), isCompleteSelectionCorrect(question.answer, next, required, question.acceptedAnswerCombinations), { kind: "multiple-choice", selected: [...next] });
        return;
      }
      setSelected(key);
      commitAnswer(key, isAcceptedAnswer(question.answer, key), { kind: "multiple-choice", selected: [key] });
    },
    [question, picked, commitAnswer],
  );

  const onNumericAnswer = React.useCallback((value: string) => {
    if (!question || isReferenceOnlyQuestionId(question.id) || question.type !== "numeric" || answerFinalized.current) return;
    setNumericSelected(value);
    commitAnswer(value, isNumericAnswerCorrect(question, value), { kind: "numeric", value });
  }, [question, commitAnswer]);

  const onOrderingAnswer = React.useCallback((value: ChoiceKey[]) => {
    if (!question || isReferenceOnlyQuestionId(question.id) || question.type !== "ordering" || answerFinalized.current) return;
    setOrderedSelected(value);
    commitAnswer(value.join("→"), isOrderingAnswerCorrect(question, value), { kind: "ordering", selected: [...value] });
  }, [question, commitAnswer]);

  React.useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (!question || isReferenceOnlyQuestionId(question.id) || isSelfReviewedDescriptiveQuestion(question)) return;
      if (e.isComposing || e.keyCode === 229) return;
      if (e.target instanceof HTMLElement) {
        if (e.target.isContentEditable || e.target.closest('[contenteditable]:not([contenteditable="false"]), [role="textbox"], [role="combobox"]')) return;
        const control = e.target.closest('input, textarea, select, button, summary, a, [contenteditable="true"], [role="dialog"]');
        const choiceShortcut = !revealed && e.target.closest('[role="radio"], [role="checkbox"]') && CHOICE_SHORTCUTS.includes(e.key);
        if (control && !choiceShortcut) return;
      }
      // Don't hijack browser/OS shortcuts: Ctrl/Cmd+R reloads, Ctrl/Cmd+1–4
      // switches tabs, etc. Shift is allowed (no modifier-less "?" conflict).
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      if (!revealed && question.type !== "ordering") {
        const i = CHOICE_SHORTCUTS.indexOf(e.key);
        if (i >= 0 && i < getChoiceKeys(question.choices).length) {
          e.preventDefault();
          onSelect(getChoiceKeys(question.choices)[i]);
          return;
        }
      } else if (revealed) {
        if ((e.target === document.body || e.target === document || e.target === window) &&
          (e.key === "Enter" || e.key === " " || e.key === "ArrowRight")) {
          e.preventDefault();
          goNext();
          return;
        }
      }
      if (e.key === "?") {
        e.preventDefault();
        setShowKeyboardHelp((v) => !v);
        return;
      }
      if (e.key === "Escape") {
        if (showKeyboardHelp) {
          setShowKeyboardHelp(false);
        }
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [question, revealed, onSelect, goNext, showKeyboardHelp]);

  const touchStart = React.useRef<{ x: number; y: number } | null>(null);
  const onTouchStart = (e: React.TouchEvent) => {
    touchStart.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (!touchStart.current || !revealed) return;
    const dx = e.changedTouches[0].clientX - touchStart.current.x;
    const dy = e.changedTouches[0].clientY - touchStart.current.y;
    if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy) * 2 && dx < 0) {
      // Suppress the synthetic click the browser fires after touchend. Without
      // it, a left-swipe that began on a choice both advances to the next
      // question AND lets the simulated click land on the next question's
      // (now-enabled) choice — selecting an answer the user never intended.
      e.preventDefault();
      goNext();
    }
    touchStart.current = null;
  };

  if (total === 0) {
    return (
      <div className="flex flex-1 items-center justify-center p-8">
        <div className="text-center">
          <p className="mb-4 text-zinc-600 dark:text-zinc-400">
            該当する問題がありませんでした。
          </p>
          <Button className="min-h-11 min-w-11 h-auto whitespace-normal py-2.5" variant="outline" onClick={() => router.push(backHref)}>
            <ArrowLeft className="h-4 w-4" /> {backLabel}
          </Button>
        </div>
      </div>
    );
  }

  if (completed && isSelfReviewedDescriptiveQuestion(question) && stats.answered === 0) {
    return (
      <main className="mx-auto max-w-3xl space-y-5 px-4 py-6">
        <h1 className="text-xl font-semibold">記述の確認を終えました</h1>
        <p>記述答案は自動採点していません。独自解答例とご自身の答案を照らして確認してください。</p>
        <Button className="min-h-11 min-w-11 h-auto whitespace-normal py-2.5" variant="outline" onClick={() => router.push(backHref)}>{backLabel}</Button>
      </main>
    );
  }

  if (completed || (!question && index >= total && total > 0)) {
    return (
      <QuizCompleteScreen
        stats={stats}
        showBatchScore={!!onFinish}
        elapsed={elapsed}
        exam={exam}
        mode={mode}
        scheduleUrl={tsuginoScheduleUrl(question?.exam)}
        onBack={() => router.push(backHref)}
        backLabel={backLabel}
      />
    );
  }

  if (!question) {
    return (
      <PracticeLoading index={index} total={total} />
    );
  }

  if (isSelfReviewedDescriptiveQuestion(question)) {
    return (
      <main className="mx-auto max-w-3xl space-y-5 px-4 py-6">
        <Button className="min-h-11 min-w-11 h-auto whitespace-normal py-2.5" variant="outline" onClick={() => router.push(backHref)}>{backLabel}</Button>
        <div ref={questionStartRef} tabIndex={-1} className="scroll-mt-24 outline-none">
          <QuestionCard question={question} progress={{ current: index, total }} />
        </div>
        <DescriptiveAnswerCard
          key={question.id}
          question={question}
          onReveal={setRevealed}
          onNext={goNext}
          nextLabel={index + 1 >= total ? "結果を見る" : "次の問題へ"}
        />
      </main>
    );
  }

  const native = question.type === "native-b";
  const numeric = question.type === "numeric";
  const ordering = question.type === "ordering";
  const answerKey = native ? formatNativeBAnswer(question.nativeB!) : ordering ? formatOrderingAnswer(question.exam, question.answer as ChoiceKey[]) : numeric ? formatNumericAnswer(question) : usesNumberedChoices(question.exam)
    ? formatQuestionAnswerForDisplay(question, question.answer as ChoiceKey | ChoiceKey[])
    : formatAcceptedAnswers(question.answer);
  const requiredSelections = requiredSelectionCount(question);
  const multiSelect = !ordering && requiredSelections > 1;
  const isCorrect = native ? nativeBResult?.isCorrect === true : ordering ? isOrderingAnswerCorrect(question, orderedSelected ?? []) : numeric ? isNumericAnswerCorrect(question, numericSelected ?? "") : multiSelect
    ? isCompleteSelectionCorrect(question.answer, picked, requiredSelections, question.acceptedAnswerCombinations)
    : isAcceptedAnswer(question.answer, selected);
  const selectionLabel = native ? nativeBResult?.slotResults.map((slot) => `${slot.label}: ${slot.selectedCandidateId ?? "未回答"}`).join(" / ") : ordering ? (orderedSelected ? formatOrderingAnswer(question.exam, orderedSelected) : undefined) : numeric ? numericSelected : multiSelect ? (picked.length > 0 ? formatSelection(picked) : undefined) : selected;

  return (
    <div className="p3-page p3-quiz flex min-h-[calc(100dvh-3.5rem)] flex-col bg-background" data-revealed={revealed || undefined}>
      <div role="region" aria-label="クイズナビゲーション" className="sticky top-0 z-20 flex flex-col border-b border-border bg-card">
        <div className="flex items-center gap-2 px-3 py-2 sm:py-2.5">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.push(backHref)}
            aria-label={backLabel}
            className="hover:bg-muted min-h-11 min-w-11 h-auto whitespace-normal py-2.5"
          >
            <ArrowLeft aria-hidden="true" className="h-5 w-5" />
          </Button>
          {!onFinish && <div className="text-sm font-medium text-zinc-700 dark:text-zinc-300">モード: {quizModeLabel(mode)}</div>}
          <div className="ml-auto flex items-center gap-2 text-sm font-medium text-zinc-700 sm:gap-3 dark:text-zinc-300">
            {combo >= 2 && <ComboCounter combo={combo} />}
            <span
              className="flex items-center gap-1"
              aria-label={`経過時間 ${formatElapsed(elapsed)}`}
            >
              <Timer aria-hidden="true" className="h-4 w-4" />
              <span aria-hidden="true" className="tabular-nums">{formatElapsed(elapsed)}</span>
            </span>
            <span
              aria-label={`過去問の正答 ${stats.correct} / 回答済み ${stats.answered}${
                stats.answered > 0
                  ? `（正答率 ${Math.round((stats.correct / stats.answered) * 100)}%）`
                  : ""
              }`}
              className="tabular-nums"
            >
              <span aria-hidden="true">
                過去問 {stats.correct}/{stats.answered}
                {stats.answered > 0 && (
                  <span className="ml-1 text-xs text-zinc-500 dark:text-zinc-400">
                    ({Math.round((stats.correct / stats.answered) * 100)}%)
                  </span>
                )}
              </span>
            </span>
          </div>
        </div>
        <div
          role="progressbar"
          aria-label="クイズ進捗"
          aria-valuenow={index + 1}
          aria-valuemin={1}
          aria-valuemax={total}
          aria-valuetext={`${index + 1}問目 / 全${total}問`}
          className="p3-quiz-progress h-2 bg-muted"
        >
          <div
            className="h-full bg-primary motion-safe:transition-all motion-safe:duration-300"
            style={{ width: `${((index + 1) / total) * 100}%` }}
          />
        </div>
      </div>

      <div className="mx-3 mt-2 sm:mx-6"><WeakMark id={question.id} /></div>
      <div className="flex flex-1">
        <main aria-label="問題と解説"
          className="min-w-0 w-full flex-1 px-3 pb-12 pt-3 sm:px-6"
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          <div ref={questionStartRef} tabIndex={-1} className="relative mx-auto max-w-2xl scroll-mt-24 space-y-4 outline-none">
            <QuestionCard
              illustrated
              question={question}
              progress={{ current: index, total }}
            />

            {question.acceptedAnswerCombinations && !revealed && (
              <Button className="min-h-11 min-w-11 h-auto whitespace-normal py-2.5" disabled={picked.length < 1 || picked.length > requiredSelections}
                onClick={() => commitAnswer(formatSelection(picked), isCompleteSelectionCorrect(question.answer, picked, requiredSelections, question.acceptedAnswerCombinations), { kind: "multiple-choice", selected: [...picked] })}>
                回答を確定
              </Button>
            )}
            {multiSelect && !revealed && (
              <p className="rounded-xl border border-amber-300/60 bg-amber-50 px-3 py-2 text-sm font-semibold text-amber-900 dark:border-amber-700/50 dark:bg-amber-950/40 dark:text-amber-100" data-testid="multi-select-hint">
                {selectionInstruction(question.answer, requiredSelections)}（選択中 {picked.length}/{requiredSelections}）
              </p>
            )}
            {native ? (
              <NativeBAnswerInput key={question.id} data={question.nativeB!} displayedImageUrls={question.imageUrls} disabled={revealed} onAnswer={onNativeBAnswer} />
            ) : ordering ? (
              <OrderingAnswerInput key={question.id} question={question} disabled={revealed} onAnswer={onOrderingAnswer} />
            ) : numeric ? (
              <NumericAnswerInput key={question.id} unit={question.numericAnswer!.unit} specification={question.numericAnswer} disabled={revealed} onAnswer={onNumericAnswer} />
            ) : <div
              role={multiSelect ? "group" : "radiogroup"}
              aria-label={multiSelect ? `選択肢（${requiredSelections}つ選ぶ。数字キー1〜9・0・Enter/スペースで選択・解除）` : "選択肢（矢印キーで移動、数字キー1〜9・0・Enter/スペースで選択）"}
              className="space-y-2"
            >
              {question.choices &&
                getChoiceKeys(question.choices).map((key, idx) => (
                  <ChoiceButton
                    key={key}
                    choiceKey={key}
                    displayLabel={choiceDisplayLabel(question.exam, key)}
                    text={question.choices![key]!}
                    imageUrl={question.choiceImageUrls?.[key]}
                    imageAlt={choiceImageAlt(question.exam, key)}
                    revealed={revealed}
                    selected={multiSelect ? picked.includes(key) : selected === key}
                    correct={isAcceptedAnswer(question.answer, key)}
                    disabled={revealed}
                    onClick={() => onSelect(key)}
                    shortcutIndex={idx < 10 ? (idx + 1) % 10 : null}
                    multiSelect={multiSelect}
                    {...choiceRoving.getRadioProps(idx)}
                  />
                ))}
            </div>}

            <div role="status" aria-live="polite" aria-atomic="true" className="sr-only">
              {revealed
                ? isCorrect
                  ? `正解です。解説が表示されました。`
                  : `不正解です。正解は ${answerKey} です。解説が表示されました。`
                : ""}
            </div>

            {/* Shape/layout the static explanation while the learner reads. Keep
                it invisible, out of flow and inert until the explicit answer. */}
            {(revealed || preparedExplanationId === question.id) && (
              <div key={`explanation:${question.id}`} ref={answerResultRef} tabIndex={-1} aria-hidden={!revealed} inert={!revealed}
                className={`scroll-mt-24 space-y-4 outline-none${revealed ? "" : " invisible pointer-events-none absolute inset-x-0 top-0 h-0 overflow-hidden"}`} aria-label="解答結果">
                <ExplanationCard
                  question={question}
                  nativeBResult={nativeBResult}
                  selected={selectionLabel}
                  isCorrect={isCorrect}
                  onNext={goNext}
                  nextLabel={index + 1 >= total ? "結果を見る" : "次の問題へ"}
                />
                <span ref={explanationEndRef} aria-hidden="true" className="block h-px" />
              </div>
            )}

            {showKeyboardHelp && (
              <KeyboardShortcutHelp onClose={() => setShowKeyboardHelp(false)} />
            )}
            {!revealed && <LearningPetCorner qualificationId={question.exam} questionId={question.id} compact appearanceOnly />}
          </div>

        </main>

      </div>


      {!quiet && burst && <FireworksBurst
        active
        level={burst?.level ?? "small"}
        onDone={() => setBurst(null)}
        key={burst?.nonce ?? 0}
      />}

      {!quiet && pendingAchievement && (
        <AchievementToast
          achievementId={pendingAchievement}
          onClose={() => setPendingAchievement(null)}
        />
      )}
    </div>
  );
}

function KeyboardShortcutHelp({ onClose }: { onClose: () => void }) {
  return (
    <div
      role="dialog"
      aria-label="キーボードショートカット一覧"
      aria-modal="false"
      className="mt-4 rounded-xl border border-border bg-card p-4 shadow-sm"
    >
      <div className="mb-3 flex items-center justify-between">
        <span className="text-sm font-semibold text-zinc-800 dark:text-zinc-100">
          キーボードショートカット
        </span>
        <button
          type="button"
          onClick={onClose}
          aria-label="ショートカット一覧を閉じる"
          className="inline-flex min-h-11 min-w-11 items-center justify-center rounded text-zinc-400 hover:bg-zinc-100 hover:text-zinc-600 dark:hover:bg-zinc-800 dark:hover:text-zinc-300"
        >
          ✕
        </button>
      </div>
      <dl className="grid grid-cols-[auto_1fr] gap-x-3 gap-y-2 text-xs">
        <dt className="rounded bg-zinc-100 px-1.5 py-0.5 font-mono font-medium text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
          1 / 2 / 3 / 4
        </dt>
        <dd className="self-center text-zinc-600 dark:text-zinc-400">選択肢を選ぶ</dd>
        <dt className="rounded bg-zinc-100 px-1.5 py-0.5 font-mono font-medium text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
          Enter / →
        </dt>
        <dd className="self-center text-zinc-600 dark:text-zinc-400">次の問題へ（解答後）</dd>
        <dt className="rounded bg-zinc-100 px-1.5 py-0.5 font-mono font-medium text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
          R
        </dt>
        <dd className="self-center text-zinc-600 dark:text-zinc-400">スターをつける / 外す</dd>
        <dt className="rounded bg-zinc-100 px-1.5 py-0.5 font-mono font-medium text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
          Esc
        </dt>
        <dd className="self-center text-zinc-600 dark:text-zinc-400">ダイアログを閉じる</dd>
        <dt className="rounded bg-zinc-100 px-1.5 py-0.5 font-mono font-medium text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
          ?
        </dt>
        <dd className="self-center text-zinc-600 dark:text-zinc-400">このヘルプを表示 / 非表示</dd>
      </dl>
    </div>
  );
}

export function QuizCompleteScreen({
  stats,
  elapsed,
  exam,
  mode,
  onBack,
  backLabel = "モード選択に戻る",
  scheduleUrl,
  showBatchScore = false,
}: {
  stats: { answered: number; correct: number };
  elapsed: number;
  exam: string;
  mode: string;
  onBack: () => void;
  backLabel?: string;
  scheduleUrl?: string;
  showBatchScore?: boolean;
}) {
  const resultHeadingRef = React.useRef<HTMLHeadingElement>(null);
  React.useEffect(() => { resultHeadingRef.current?.focus({ preventScroll: true }); resultHeadingRef.current?.scrollIntoView?.({ block: "center", behavior: "instant" }); }, []);
  const accuracy = stats.answered > 0 ? Math.round((stats.correct / stats.answered) * 100) : 0;

  React.useEffect(() => {
    posthogCapture("quiz_completed", {
      exam,
      mode,
      total: stats.answered,
      correct: stats.correct,
      accuracy,
      elapsed_seconds: elapsed,
    });
    // fire once on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <main className="flex flex-1 flex-col items-center justify-center bg-background px-4 py-12">
      <div className="w-full max-w-md rounded-2xl border border-border bg-card p-5 shadow-sm sm:p-8">
        <div className="mb-6 text-center">
          <ChihuahuaMascot pose="celebrate" size={100} className="mx-auto mb-2" />
          <h1 ref={resultHeadingRef} tabIndex={-1} className="text-2xl font-bold text-zinc-900 outline-none dark:text-zinc-50">{showBatchScore ? <>{stats.answered}問中{stats.correct}問正解</> : "クイズ完了！"}</h1>
          {!showBatchScore && <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
            {accuracy >= 80 ? "素晴らしい！" : accuracy >= 60 ? "いい調子です！" : "次は満点を狙おう！"}
          </p>}
        </div>

        <div className="mb-6 grid grid-cols-3 gap-2 text-center sm:gap-3">
          <div className="rounded-2xl bg-sky-50 p-3 dark:bg-sky-950/30">
            <div className="text-2xl font-bold tabular-nums text-sky-600 dark:text-sky-400">{accuracy}%</div>
            <div className="text-xs text-zinc-500 dark:text-zinc-400">正答率</div>
          </div>
          <div className="rounded-2xl bg-zinc-100 p-3 dark:bg-zinc-800">
            <div className="text-xl font-bold tabular-nums text-zinc-800 sm:text-2xl dark:text-zinc-100">{stats.correct}/{stats.answered}</div>
            <div className="text-xs text-zinc-500 dark:text-zinc-400">正解数</div>
          </div>
          <div className="rounded-2xl bg-zinc-100 p-3 dark:bg-zinc-800">
            <div className="text-xl font-bold tabular-nums text-zinc-800 sm:text-2xl dark:text-zinc-100">{`${Math.floor(elapsed / 60)}:${String(elapsed % 60).padStart(2, "0")}`}</div>
            <div className="text-xs text-zinc-500 dark:text-zinc-400">経過時間</div>
          </div>
        </div>

        <Button variant="primary" onClick={onBack} className="w-full min-h-11 min-w-11 h-auto whitespace-normal py-2.5">
          <ArrowLeft className="h-4 w-4" /> {backLabel}
        </Button>

        {scheduleUrl && (
          <details className="mt-5 rounded-xl border border-border px-4 text-sm">
            <summary className="min-h-11 cursor-pointer py-3 font-semibold">試験日程</summary>
            <a href={scheduleUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center underline">
              試験日・申込締切を次の資格で確認
            </a>
          </details>
        )}

        {/* 旗艦＝午後II論述AI採点への導線。論述区分 (ST/SA/PM/SM/AU) を解き終えた
            読者にだけ 1 回だけ提示する（解説カードと違い問題ごとに繰り返さない）。
            ゲートは AfternoonEssayHint 内の ESSAY_EXAM_CODES 単一情報源。 */}
        <AfternoonEssayHint exam={exam as ExamCode} />
      </div>
    </main>
  );
}
