"use client";
import { NativeQuestionGate } from "@/mobile/shared/NativeQuestionGate";

import { QuestionBody } from "./QuestionBody";
import { RikuTech2CylinderGuide } from "./RikuTech2CylinderGuide";
import { isReferenceOnlyQuestionId } from "@/lib/questions/assessment";

import * as React from "react";
import { Check, X } from "lucide-react";
import { usePetLearning } from "@/components/pet/usePetLearning";
import { LearningPetCorner } from "@/components/pet/LearningPetCorner";
import type { PetLearningSubmission } from "@/lib/pet/client/learning-submission-contracts";
import type { NativeBGrade } from "@/lib/questions/types";
import { gradeNativeB, serializeNativeBSelections, formatNativeBAnswer, type NativeBSelections } from "@/lib/questions/native-b";
import { NativeBAnswerInput, NativeBFeedback } from "./NativeBAnswer";
import { QuestionAiFollowup } from "./QuestionAiFollowup";
import { isAcceptedAnswer, formatAcceptedAnswers, CHOICE_SHORTCUTS, getChoiceKeys, isCompleteSelectionCorrect, formatSelection, selectionInstruction } from "@/lib/questions/answers";
import { Button } from "@/components/ui/button";

import { ChoiceButton } from "./ChoiceButton";
import { NumericAnswerInput } from "./NumericAnswerInput";
import { OrderingAnswerInput } from "./OrderingAnswerInput";
import { formatOrderingAnswer, isOrderingAnswerCorrect } from "@/lib/questions/ordering";
import { formatNumericAnswer, isNumericAnswerCorrect } from "@/lib/questions/numeric";
import { useQuizChoiceRoving } from "@/lib/a11y/use-quiz-choice-roving";
import { createHistoryStore } from "@/lib/storage/history";
import { writeLastQuestion } from "@/lib/storage/last-question";
import { recordReview } from "@/lib/learning/spaced-repetition";
import { recordStudyOnDate } from "@/lib/motivation/heatmap";
import { readSettings } from "@/lib/storage/settings";
import { posthogCapture } from "@/lib/posthog";
import { observeJourney } from "@/lib/billing/journey-client";
import type { ChoiceKey, ExamCode, Question, QuestionPart, Season, Session } from "@/lib/questions/types";
import { choiceDisplayLabel, choiceImageAlt, formatQuestionAnswerForDisplay, usesNumberedChoices } from "@/lib/questions/display";

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
  explanation?: React.ReactNode;
  source?: React.ReactNode;
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
 *     like a /quiz solve. The server-rendered explanation sits directly below.
 *   - Revealing the answer shows the pet's reading pose without recording an attempt.
 */
export function QuestionAnswerCard(props: Props) {
  if (isReferenceOnlyQuestionId(props.questionId) || isReferenceOnlyQuestionId(props.question?.id)) {
    return <><section aria-label="参照専用の選択肢">
      <p role="note">この問題は参照専用です。採点・学習記録・報酬の対象には含まれません。</p>
      <dl className="mt-3 space-y-3">{Object.entries(props.choices ?? props.question?.choices ?? {}).map(([key, text]) => (
        <div key={key} className="rounded-lg border border-border p-3"><dt className="font-semibold">{choiceDisplayLabel(props.exam, key as ChoiceKey)}</dt><dd><QuestionBody text={text} /></dd></div>
      ))}</dl>
      <p className="mt-3 font-semibold">公式正答（参照）: {props.question?.officialAnswerNumber ?? formatAcceptedAnswers(props.answerKey)}</p>
    </section>{props.explanation}{props.source}</>;
  }
  return <NativeQuestionGate id={props.questionId}><ScoredQuestionAnswerCard key={props.questionId} {...props} /></NativeQuestionGate>;
}

function ScoredQuestionAnswerCard({
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
  explanation,
  source,
  requiredSelections = 1,
}: Props) {
  const pet = usePetLearning();
  const native = question?.type === "native-b";
  const [nativeBResult, setNativeBResult] = React.useState<NativeBGrade | undefined>();
  const numeric = question?.type === "numeric";
  const ordering = question?.type === "ordering";
  const multiSelect = !numeric && !ordering && requiredSelections > 1;
  const [selected, setSelected] = React.useState<ChoiceKey | undefined>(undefined);
  // 「二つとも答えなさい」形式で選択中の肢（採点前は何度でも選び直せる）。
  const [picked, setPicked] = React.useState<ChoiceKey[]>([]);
  const [numericSelected, setNumericSelected] = React.useState<string | undefined>(undefined);
  const [orderedSelected, setOrderedSelected] = React.useState<ChoiceKey[] | undefined>(undefined);
  const [revealed, setRevealed] = React.useState(false);
  const answerFinalized = React.useRef(false);
  const [shortcutsReady, setShortcutsReady] = React.useState(false);

  const keys = React.useMemo(
    () => getChoiceKeys(choices),
    [choices],
  );
  const selectedIndex = selected ? keys.indexOf(selected) : -1;
  const roving = useQuizChoiceRoving(keys.length, selectedIndex, revealed, questionId);

  const recordOutcome = React.useCallback(
    (selection: string, correct: boolean, petAnswer: Extract<PetLearningSubmission, { source: "question" }>["answer"], nativeBResult?: NativeBGrade) => {
      if (isReferenceOnlyQuestionId(questionId) || isReferenceOnlyQuestionId(question?.id) || answerFinalized.current) return;
      // The result is final even if another input arrives before React renders it.
      answerFinalized.current = true;
      setRevealed(true);
      const now = Date.now();
      // localStorage may be disabled/full; the answer UX must still work.
      try {
        if (readSettings().recordHistory) {
          createHistoryStore().record({ id: questionId, selected: selection, correct, at: now, ...(nativeBResult ? { nativeBResult } : {}) });
        }
        writeLastQuestion({ exam, year, season, session, qNumber, part, answeredAt: now });
        recordStudyOnDate();
        if (question) pet.record(question, petAnswer, correct);
        else recordReview(questionId, correct);
      } catch {
        /* ignore storage errors */
      }
      // /q/* の inline 回答は元々未計測だった。QuizPlayer と同じイベント名を使うことで、
      // admin/exam-usage の資格別回答数ランキングに自動的に合算される。
      posthogCapture("question_answered", { questionId, exam, correct });
      observeJourney({ qualification: exam, answer: true });
    },
    [questionId, question, exam, year, season, session, qNumber, part, pet],
  );

  const onNativeBAnswer = React.useCallback((selections: NativeBSelections) => {
    if (isReferenceOnlyQuestionId(questionId) || isReferenceOnlyQuestionId(question?.id) || !question?.nativeB || !native || answerFinalized.current) return;
    const result = gradeNativeB(question.nativeB, selections);
    setNativeBResult(result);
    recordOutcome(serializeNativeBSelections(question.nativeB, selections), result.isCorrect, { kind: "native-b", selections: Object.fromEntries(Object.entries(selections).filter((pair): pair is [string, string] => typeof pair[1] === "string")) }, result);
  }, [questionId, question, native, recordOutcome]);

  const onSelect = React.useCallback(
    (key: ChoiceKey) => {
      if (isReferenceOnlyQuestionId(questionId) || isReferenceOnlyQuestionId(question?.id) || answerFinalized.current || ordering) return;
      if (multiSelect) {
        if (question?.acceptedAnswerCombinations && !picked.includes(key) && picked.length >= requiredSelections) return;
        const next = picked.includes(key) ? picked.filter((k) => k !== key) : [...picked, key];
        setPicked(next);
        if (!question?.acceptedAnswerCombinations && next.length === requiredSelections) {
          recordOutcome(formatSelection(next), isCompleteSelectionCorrect(answerKey, next, requiredSelections, question?.acceptedAnswerCombinations), { kind: "multiple-choice", selected: [...next] });
        }
        return;
      }
      setSelected(key);
      recordOutcome(key, isAcceptedAnswer(answerKey, key), { kind: "multiple-choice", selected: [key] });
    },
    [questionId, question, ordering, recordOutcome, multiSelect, picked, requiredSelections, answerKey],
  );

  const onNumericAnswer = React.useCallback((value: string) => {
    if (isReferenceOnlyQuestionId(questionId) || !question || isReferenceOnlyQuestionId(question.id) || !numeric || answerFinalized.current) return;
    setNumericSelected(value);
    recordOutcome(value, isNumericAnswerCorrect(question, value), { kind: "numeric", value });
  }, [questionId, question, numeric, recordOutcome]);

  const onOrderingAnswer = React.useCallback((value: ChoiceKey[]) => {
    if (isReferenceOnlyQuestionId(questionId) || !question || isReferenceOnlyQuestionId(question.id) || !ordering || answerFinalized.current) return;
    setOrderedSelected(value);
    recordOutcome(value.join("→"), isOrderingAnswerCorrect(question, value), { kind: "ordering", selected: [...value] });
  }, [questionId, question, ordering, recordOutcome]);

  function revealOnly() {
    if (answerFinalized.current) return;
    answerFinalized.current = true;
    if (question) pet.reveal(question);
    setPicked([]);
    setRevealed(true);
  }

  // Number-key selection (1–4), mirroring QuizPlayer; ignore when typing in a
  // field so the AI copilot input etc. are unaffected.
  React.useEffect(() => {
    if (revealed || ordering) return;
    const handler = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLElement) {
        const tag = e.target.tagName;
        if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT" || e.target.isContentEditable) return;
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
  }, [revealed, ordering, keys, onSelect]);

  const answered = native ? nativeBResult !== undefined : ordering ? orderedSelected !== undefined : numeric ? numericSelected !== undefined : multiSelect ? revealed && picked.length > 0 : selected !== undefined;
  const isCorrect = native ? nativeBResult?.isCorrect === true : ordering ? isOrderingAnswerCorrect(question!, orderedSelected ?? []) : numeric ? isNumericAnswerCorrect(question!, numericSelected ?? "") : multiSelect ? isCompleteSelectionCorrect(answerKey, picked, requiredSelections, question?.acceptedAnswerCombinations) : isAcceptedAnswer(answerKey, selected);
  const answerLabel = native ? formatNativeBAnswer(question!.nativeB!) : ordering ? formatOrderingAnswer(exam, answerKey as ChoiceKey[]) : numeric ? formatNumericAnswer(question!) : usesNumberedChoices(exam)
    ? question ? formatQuestionAnswerForDisplay(question, answerKey as ChoiceKey | ChoiceKey[])
      : (Array.isArray(answerKey) ? answerKey : [answerKey]).map((key) => choiceDisplayLabel(exam, key as ChoiceKey)).join("・")
    : formatAcceptedAnswers(answerKey);

  return (
    <div data-study-presence-exam={exam} data-question-answered={answered || undefined} data-question-revealed={revealed || undefined} className="space-y-3">
      {question?.acceptedAnswerCombinations && !revealed && (
        <Button className="min-h-12" disabled={picked.length < 1 || picked.length > requiredSelections}
          onClick={() => recordOutcome(formatSelection(picked), isCompleteSelectionCorrect(answerKey, picked, requiredSelections, question.acceptedAnswerCombinations), { kind: "multiple-choice", selected: [...picked] })}>
          回答を確定
        </Button>
      )}
      {multiSelect && !revealed && (
        <p className="rounded-lg bg-warning-soft px-3 py-2 text-sm font-semibold text-warning-soft-foreground" data-testid="multi-select-hint">
          {selectionInstruction(answerKey, requiredSelections)}（選択中 {picked.length}/{requiredSelections}）
        </p>
      )}
      {native ? (
        <NativeBAnswerInput key={questionId} data={question!.nativeB!} displayedImageUrls={question!.imageUrls} disabled={revealed} onAnswer={onNativeBAnswer} />
      ) : ordering ? (
        <OrderingAnswerInput key={questionId} question={question!} disabled={revealed} onAnswer={onOrderingAnswer} />
      ) : numeric ? (
        <NumericAnswerInput key={questionId} unit={question!.numericAnswer!.unit} specification={question!.numericAnswer} disabled={revealed} onAnswer={onNumericAnswer} />
      ) : <div
        role={multiSelect ? "group" : "radiogroup"}
        data-shortcuts-ready={shortcutsReady}
        aria-label={multiSelect ? `選択肢（${requiredSelections}つ選ぶ。数字キー1〜9・0・Enter/スペースで選択・解除）` : "選択肢（矢印キーで移動、数字キー1〜9・0・Enter/スペースで選択）"}
        className="flex flex-col gap-2"
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
            paper
            {...roving.getRadioProps(idx)}
          />
        ))}
      </div>}

      {native && revealed && <NativeBFeedback data={question!.nativeB!} result={nativeBResult} />}

      {/* Screen-reader announcement of the outcome. */}
      <div role="status" aria-live="polite" aria-atomic="true" className="sr-only">
        {native ? "" : revealed
          ? !answered
            ? `正解は ${answerLabel} です。下に解説があります。`
            : isCorrect
              ? "正解です。下に解説があります。"
              : `不正解です。正解は ${answerLabel} です。下に解説があります。`
          : ""}
      </div>

      {!revealed ? (
        <button type="button" onClick={revealOnly} className="study-link">
          採点せずに答えだけ見る
        </button>
      ) : (
        <div role="group" aria-label={answered ? "採点結果" : "正答"}
          data-outcome={answered && !isCorrect ? "incorrect" : "correct"}
          className={
            !answered || isCorrect
              ? "p3-question-result p3-landscape rounded-2xl bg-success-soft px-3.5 py-3 text-success-soft-foreground"
              : "p3-question-result p3-landscape rounded-2xl bg-danger-soft px-3.5 py-3 text-danger-soft-foreground"
          }
        >
          <div className="text-base leading-[1.7] font-bold">
            {!answered ? (
              <span>正解は {answerLabel}</span>
            ) : (
              <div className="flex flex-wrap items-baseline gap-x-3">
                <span className="inline-flex items-center gap-1.5 text-xl">
                  {isCorrect ? (
                    <Check aria-hidden="true" className="size-5 shrink-0" />
                  ) : (
                    <X aria-hidden="true" className="size-5 shrink-0" />
                  )}
                  {isCorrect ? "正解！" : `不正解 — 正解は ${answerLabel}`}
                </span>
                {isCorrect && usesNumberedChoices(exam) && <span>正答は {answerLabel}</span>}
              </div>
            )}
            {answerText && (answerText.includes("\n") ? (
              <div className="mt-2 min-w-0 font-normal text-foreground"><QuestionBody text={answerText} /></div>
            ) : (
              <p className="mt-1 font-normal text-foreground">{answerText}</p>
            ))}
          </div>
          {question ? <div className="mt-3"><LearningPetCorner qualificationId={question.exam} questionId={question.id} compact /></div> : null}
        </div>
      )}
      {revealed && <RikuTech2CylinderGuide questionId={questionId} revealed={revealed} />}
      {explanation}
      {source}
      {question && !native && (
        <QuestionAiFollowup
          paper
          question={question}
          selectedChoice={answered ? (ordering ? orderedSelected?.join("→") : numeric ? numericSelected : multiSelect ? formatSelection(picked) : selected) : undefined}
          isCorrect={answered ? isCorrect : undefined}
        />
      )}
    </div>
  );
}
