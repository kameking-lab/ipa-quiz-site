"use client";

import { isAcceptedAnswer } from "@/lib/questions/answers";
import { displayQuestionExplanation } from "@/lib/questions/explanation-display";

import type { NativeBGrade } from "@/lib/questions/types";
import { NativeBFeedback } from "./NativeBAnswer";
import { ArrowRight, AlertCircle, CheckCircle2 } from "lucide-react";
import type { ChoiceKey, Question } from "@/lib/questions/types";
import { choiceDisplayLabel, formatQuestionAnswerForDisplay } from "@/lib/questions/display";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { AiTransparencyDisclaimer } from "./AiTransparencyDisclaimer";
import { QuestionAiFollowup } from "./QuestionAiFollowup";
import { QuestionBody, QuestionInlineText } from "./QuestionBody";
import { QuestionSourcePresentation } from "./QuestionSourcePresentation";
import { RikuTech2CylinderGuide } from "./RikuTech2CylinderGuide";
import { LearningPetCorner } from "@/components/pet/LearningPetCorner";

function isPlaceholderExplanation(explanation: string): boolean {
  return /^正解は[アイウエ]です[。.]?$/.test(explanation.trim()) || explanation.trim() === "";
}

interface Props {
  question: Question;
  nativeBResult?: NativeBGrade;
  selected: string | undefined;
  isCorrect: boolean;
  onNext: () => void;
  nextLabel?: string;
}

export function ExplanationCard({
  question,
  nativeBResult,
  selected,
  isCorrect,
  onNext,
  nextLabel = "次の問題へ",
}: Props) {
  if (question.type === "native-b" && question.nativeB) return <div className="space-y-4" role="region" aria-label="五枠の解説">
    <NativeBFeedback data={question.nativeB} result={nativeBResult} />
    <LearningPetCorner qualificationId={question.exam} questionId={question.id} compact />
    <QuestionBody text={displayQuestionExplanation(question.exam, question.explanation)} linkReferences />
    <QuestionSourcePresentation question={question} phase="after" />
    <AiTransparencyDisclaimer question={question} />
    <Button onClick={onNext} className="min-h-11">{nextLabel}<ArrowRight aria-hidden="true" className="h-4 w-4" /></Button>
  </div>;
  const selectedChoiceExplanation = selected && question.type !== "ordering"
    ? displayQuestionExplanation(question.exam, question.choiceExplanations?.[selected as ChoiceKey])
    : undefined;
  const answerLabel = formatQuestionAnswerForDisplay(question, question.answer);
  const remainingChoiceExplanations = Object.entries(question.choiceExplanations ?? {}).filter(([key]) =>
    !(!isCorrect && selectedChoiceExplanation && key === selected),
  );

  return (
    <div
      role="region"
      aria-label={isCorrect ? "正解の解説" : "不正解の解説"}
      className={cn(
        "motion-safe:animate-in motion-safe:slide-in-from-bottom-4 motion-safe:duration-200",
        "p3-explanation rounded-2xl border border-hairline bg-card p-4 sm:p-5",
      )}
    >
      <div className="p3-question-result p3-landscape mb-4 rounded-2xl p-3" data-outcome={isCorrect ? "correct" : "incorrect"}>
        <div className="flex min-w-0 flex-wrap items-center gap-2">
          {isCorrect ? (
            <CheckCircle2
              aria-hidden="true"
              className="h-5 w-5 text-emerald-700 dark:text-emerald-300"
            />
          ) : (
            <AlertCircle
              aria-hidden="true"
              className="h-5 w-5 text-red-700 dark:text-red-300"
            />
          )}
          <span
            className={cn(
              "text-xl font-bold",
              isCorrect
                ? "text-emerald-900 dark:text-emerald-100"
                : "text-red-800 dark:text-red-200",
            )}
          >
            {isCorrect ? "正解!" : "不正解"}
          </span>
          <span className="basis-full break-words text-sm text-zinc-700 dark:text-zinc-300">
            正解: {answerLabel}
            {selected ? ` / あなた: ${formatQuestionAnswerForDisplay(question, selected)}` : ""}
          </span>
        </div>
        <LearningPetCorner qualificationId={question.exam} questionId={question.id} compact />
      </div>

      {isPlaceholderExplanation(question.explanation) ? (
        <div className="selectable-content mb-4 rounded-xl bg-amber-50 p-3 text-sm text-amber-800 dark:bg-amber-950/30 dark:text-amber-200">
          解説は準備中です。AI コパイロットに詳しい解説を依頼してください。
        </div>
      ) : (
        <div className="selectable-content mb-4 min-w-0 text-sm leading-7 text-zinc-800 [overflow-wrap:anywhere] dark:text-zinc-100">
          <p className={cn(
            "mb-2 font-semibold",
            isCorrect ? "text-emerald-700 dark:text-emerald-300" : "text-red-700 dark:text-red-300",
          )}>
            {`結論: 正解は${answerLabel}です。`}
          </p>
          <QuestionBody text={displayQuestionExplanation(question.exam, question.explanation)} linkReferences />
        </div>
      )}

      <RikuTech2CylinderGuide questionId={question.id} revealed />
      <QuestionSourcePresentation question={question} phase="after" />

      {!isCorrect && selected && selectedChoiceExplanation && (
        <section
          aria-label="あなたが選んだ誤答の理由"
          className="mb-4 rounded-xl border border-red-300 bg-red-50 p-3 text-sm leading-relaxed text-red-950 dark:border-red-800 dark:bg-red-950/40 dark:text-red-100"
        >
          <h3 className="mb-1 font-semibold">あなたが選んだ「{choiceDisplayLabel(question.exam, selected as ChoiceKey)}」が違う理由</h3>
          <p><QuestionInlineText text={selectedChoiceExplanation} linkReferences /></p>
        </section>
      )}

      {remainingChoiceExplanations.length > 0 && (
        <section aria-label="選択肢ごとの解説" className="mb-4 rounded-xl border border-border bg-card p-3">
          <h3 className="mb-2 text-sm font-semibold text-zinc-900 dark:text-zinc-50">
            {!isCorrect && selectedChoiceExplanation ? "ほかの選択肢" : "選択肢ごとの解説"}
          </h3>
          <dl className="space-y-2 text-sm leading-relaxed">
            {remainingChoiceExplanations.map(([key, explanation]) => (
              <div
                key={key}
                data-selected-choice={key === selected ? "true" : undefined}
                data-correct-choice={isAcceptedAnswer(question.answer, key) || undefined}
                className={cn(
                  "grid grid-cols-[1.75rem_1fr] gap-2 rounded-lg px-2 py-1",
                  key === selected && !isCorrect
                    ? "bg-red-100 ring-1 ring-red-300 dark:bg-red-950/50 dark:ring-red-800"
                    : undefined,
                )}
              >
                <dt className="font-bold text-zinc-900 dark:text-zinc-100">{choiceDisplayLabel(question.exam, key as ChoiceKey)}</dt>
                <dd className="text-zinc-700 dark:text-zinc-300">
                  <QuestionInlineText text={displayQuestionExplanation(question.exam, explanation)} linkReferences />
                </dd>
              </div>
            ))}
          </dl>
        </section>
      )}

      <QuestionAiFollowup key={question.id} question={question} selectedChoice={selected} isCorrect={isCorrect} />
      <AiTransparencyDisclaimer question={question} />
      <div className="mt-4">
        <Button size="xl" onClick={onNext} className="min-w-11 whitespace-normal px-5 py-2.5">
          {nextLabel}<ArrowRight aria-hidden="true" className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
