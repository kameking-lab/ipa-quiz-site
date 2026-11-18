"use client";

import { displayQuestionExplanation } from "@/lib/questions/explanation-display";
import { questionReferenceLabel } from "@/lib/questions/reference-label";

import * as React from "react";
import type { NativeBGrade } from "@/lib/questions/types";
import { NativeBFeedback } from "./NativeBAnswer";
import { Star, MessageCircle, ArrowRight, AlertCircle, CheckCircle2, FileText } from "lucide-react";
import type { ChoiceKey, Question } from "@/lib/questions/types";
import { choiceDisplayLabel, formatQuestionAnswerForDisplay } from "@/lib/questions/display";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { getOfficialAnswerPdfUrl, getSafePdfUrl, ipaSourceLabel } from "@/lib/exam-config";
import { BookmarkButton } from "@/components/BookmarkButton";
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
  starred: boolean;
  onToggleStar: () => void;
  onNext: () => void;
  nextLabel?: string;
  afterNavigation?: React.ReactNode;
  onAskAI: () => void;
  /** Accepted for existing callers; the copilot's 「なぜ間違えた？分析」 chip is the single entry point now. */
  onAnalyzeWrong?: () => void;
}

export function ExplanationCard({
  question,
  nativeBResult,
  selected,
  isCorrect,
  starred,
  onToggleStar,
  onNext,
  nextLabel = "次の問題へ",
  afterNavigation,
  onAskAI,
}: Props) {
  if (question.type === "native-b" && question.nativeB) return <div className="space-y-4" role="region" aria-label="五枠の解説">
    <NativeBFeedback data={question.nativeB} result={nativeBResult} />
    <LearningPetCorner qualificationId={question.exam} questionId={question.id} compact />
    <QuestionBody text={displayQuestionExplanation(question.exam, question.explanation)} linkReferences />
    <QuestionSourcePresentation question={question} phase="after" />
    <div className="flex flex-col gap-3 sm:flex-row">
      <Button className="min-h-11 min-w-11 h-auto whitespace-normal py-2.5" onClick={onNext}>{nextLabel}<ArrowRight className="h-4 w-4" /></Button>
      <Button className="min-h-11 min-w-11 h-auto whitespace-normal py-2.5" variant="subtle" onClick={onToggleStar} aria-pressed={starred}>{starred ? "復習から外す" : "あとで復習"}</Button>
    </div>
    {afterNavigation}
    <p className="text-sm"><a href={getSafePdfUrl(question.sourcePdfUrl)} target="_blank" rel="noopener noreferrer" className="underline">公式問題</a> / <a href={getOfficialAnswerPdfUrl(question.sourcePdfUrl, question.sourceAnswerUrl)} target="_blank" rel="noopener noreferrer" className="underline">公式正答</a></p>
    {question.sourceAttribution && <p className="text-xs">{question.sourceAttribution}</p>}
  </div>;
  const selectedChoiceExplanation = selected && question.type !== "ordering"
    ? displayQuestionExplanation(question.exam, question.choiceExplanations?.[selected as ChoiceKey])
    : undefined;
  const answerLabel = formatQuestionAnswerForDisplay(question, question.answer);
  const questionSourceUrl = getSafePdfUrl(question.sourcePdfUrl);
  const answerSourceUrl = getOfficialAnswerPdfUrl(question.sourcePdfUrl, question.sourceAnswerUrl);
  const hasDistinctAnswerSource = questionSourceUrl !== answerSourceUrl
    || ipaSourceLabel(questionSourceUrl, "question") !== ipaSourceLabel(answerSourceUrl, "answer");
  const remainingChoiceExplanations = Object.entries(question.choiceExplanations ?? {}).filter(([key]) =>
    !(!isCorrect && selectedChoiceExplanation && key === selected),
  );

  return (
    <div
      role="region"
      aria-label={isCorrect ? "正解の解説" : "不正解の解説"}
      className={cn(
        "motion-safe:animate-in motion-safe:slide-in-from-bottom-4 motion-safe:duration-200",
        "rounded-2xl border border-border bg-card p-4 sm:p-5",
        "[&:has(>[data-install-nudge=answer])>div.sticky]:static",
      )}
    >
      <div className="mb-4 flex items-start justify-between gap-3">
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
              "text-sm font-semibold",
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
        <div className="flex shrink-0 items-start gap-1.5">
          <button
            onClick={onToggleStar}
            aria-pressed={starred}
            aria-keyshortcuts="r"
            className={cn(
              "inline-flex h-11 w-11 items-center justify-center rounded-full transition-colors",
              "focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-amber-600 focus-visible:ring-offset-2 focus-visible:ring-offset-background dark:focus-visible:ring-amber-300",
              starred
                ? "bg-amber-200 text-amber-900 dark:bg-amber-900/60 dark:text-amber-200"
                : "bg-zinc-200 text-zinc-700 hover:bg-zinc-300 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700",
            )}
            aria-label={starred ? "あとで復習から外す（Rキー）" : "あとで復習に追加（Rキー）"}
            title="R キーでも切替"
          >
            <Star aria-hidden="true" className="h-4 w-4" fill={starred ? "currentColor" : "none"} />
          </button>
          <BookmarkButton question={question} />
        </div>
      </div>

      <div className="mb-5 space-y-3">
        <div className="flex justify-end">
        <Button variant="primary" size="lg" onClick={onNext} className="shrink-0 font-semibold min-h-12 min-w-11 h-auto whitespace-normal py-2.5">
          {nextLabel}
          <ArrowRight className="h-4 w-4" />
        </Button>
        </div>
      </div>

      {afterNavigation}

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
        <section aria-label="選択肢ごとの解説" className="mb-4 rounded-xl border border-zinc-200 bg-white/70 p-3 dark:border-zinc-700 dark:bg-zinc-950/40">
          <h3 className="mb-2 text-sm font-semibold text-zinc-900 dark:text-zinc-50">
            {!isCorrect && selectedChoiceExplanation ? "ほかの選択肢" : "選択肢ごとの解説"}
          </h3>
          <dl className="space-y-2 text-sm leading-relaxed">
            {remainingChoiceExplanations.map(([key, explanation]) => (
              <div
                key={key}
                data-selected-choice={key === selected ? "true" : undefined}
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

      <LearningPetCorner qualificationId={question.exam} questionId={question.id} compact />

      <div className="mt-4 flex flex-col gap-2 sm:flex-row">
        <Button
          variant="subtle"
          size="lg"
          onClick={onAskAI}
          className="sm:flex-1 min-h-12 min-w-11 h-auto whitespace-normal py-2.5"
        >
          <MessageCircle className="h-4 w-4" />
          この問題をAIに質問
        </Button>
      </div>

      <div className="mt-3 space-y-2">
        <div className="flex flex-wrap gap-1.5">
          <a
            href={questionSourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center gap-1 rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2 text-xs text-zinc-600 transition hover:border-zinc-300 hover:bg-zinc-100 hover:text-zinc-800 dark:border-zinc-700 dark:bg-zinc-800/60 dark:text-zinc-400 dark:hover:border-zinc-600 dark:hover:text-zinc-200"
          >
            <FileText className="h-3 w-3 flex-shrink-0" />
            {ipaSourceLabel(questionSourceUrl, "question")}
          </a>
          {hasDistinctAnswerSource && <a
            href={answerSourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center gap-1 rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2 text-xs text-zinc-600 transition hover:border-zinc-300 hover:bg-zinc-100 hover:text-zinc-800 dark:border-zinc-700 dark:bg-zinc-800/60 dark:text-zinc-400 dark:hover:border-zinc-600 dark:hover:text-zinc-200"
          >
            <FileText className="h-3 w-3 flex-shrink-0" />
            {ipaSourceLabel(answerSourceUrl, "answer")}
          </a>}
          {question.officialReferenceUrls?.map((url) => (
            <a
              key={url}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center gap-1 rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2 text-xs text-zinc-600 transition hover:border-zinc-300 hover:bg-zinc-100 hover:text-zinc-800 dark:border-zinc-700 dark:bg-zinc-800/60 dark:text-zinc-400 dark:hover:border-zinc-600 dark:hover:text-zinc-200"
            >
              <FileText className="h-3 w-3 flex-shrink-0" />
              {questionReferenceLabel(question, url)}
            </a>
          ))}
        </div>
        {question.sourceAttribution && (
          <p className="text-xs leading-relaxed text-zinc-500 dark:text-zinc-400">
            {question.sourceAttribution}
          </p>
        )}
      </div>
    </div>
  );
}
