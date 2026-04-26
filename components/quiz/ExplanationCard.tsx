"use client";

import * as React from "react";
import { Star, Sparkles, ArrowRight, AlertCircle, CheckCircle2, FileText } from "lucide-react";
import type { Question } from "@/lib/questions/types";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { getSafePdfUrl } from "@/lib/exam-config";

function isPlaceholderExplanation(explanation: string): boolean {
  return /^正解は[アイウエ]です[。.]/.test(explanation) || explanation.trim() === "";
}

interface Props {
  question: Question;
  selected: string | undefined;
  isCorrect: boolean;
  starred: boolean;
  onToggleStar: () => void;
  onNext: () => void;
  onAskAI: () => void;
  onAnalyzeWrong?: () => void;
}

export function ExplanationCard({
  question,
  selected,
  isCorrect,
  starred,
  onToggleStar,
  onNext,
  onAskAI,
  onAnalyzeWrong,
}: Props) {
  return (
    <div
      role="region"
      aria-label={isCorrect ? "正解の解説" : "不正解の解説"}
      className={cn(
        "motion-safe:animate-in motion-safe:slide-in-from-bottom-4 motion-safe:duration-200",
        "rounded-2xl border-2 p-4 sm:p-5",
        isCorrect
          ? "border-emerald-400 bg-emerald-50/60 dark:border-emerald-700 dark:bg-emerald-950/30"
          : "border-red-400 bg-red-50/30 dark:border-red-800 dark:bg-red-950/20",
      )}
    >
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
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
          <span className="text-xs text-zinc-700 dark:text-zinc-300">
            正解: {Array.isArray(question.answer) ? question.answer.join(", ") : question.answer}
            {selected ? ` / あなた: ${selected}` : ""}
          </span>
        </div>
        <button
          onClick={onToggleStar}
          aria-pressed={starred}
          aria-keyshortcuts="r"
          className={cn(
            "rounded-full p-2 transition-colors",
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
      </div>

      {!isCorrect && onAnalyzeWrong && (
        <button
          onClick={onAnalyzeWrong}
          className="mb-3 flex w-full items-center justify-between rounded-xl border border-zinc-300 bg-white px-4 py-3 text-left text-sm font-semibold text-zinc-700 transition hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800"
        >
          <span className="flex items-center gap-2">
            <Sparkles className="h-4 w-4" />
            なぜ間違えた？ AI が分析
          </span>
          <ArrowRight className="h-4 w-4" />
        </button>
      )}

      {isPlaceholderExplanation(question.explanation) ? (
        <div className="selectable-content mb-4 rounded-xl bg-amber-50 p-3 text-sm text-amber-800 dark:bg-amber-950/30 dark:text-amber-200">
          解説は準備中です。AI コパイロットに詳しい解説を依頼してください。
        </div>
      ) : (
        <div className="selectable-content mb-4 text-sm leading-relaxed text-zinc-800 dark:text-zinc-100">
          {question.explanation.split("\n").map((line, i) => (
            <p key={i} className="mb-2 last:mb-0">
              {line}
            </p>
          ))}
        </div>
      )}

      <div className="flex flex-col gap-2 sm:flex-row">
        <Button
          variant="subtle"
          size="lg"
          onClick={onAskAI}
          className="sm:flex-1"
        >
          <Sparkles className="h-4 w-4" />
          もっと詳しく（AI）
        </Button>
        <Button
          variant="primary"
          size="lg"
          onClick={onNext}
          className="font-semibold shadow-md sm:flex-1"
        >
          次の問題へ
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>

      <div className="mt-3 space-y-1.5 text-[11px] text-zinc-500 dark:text-zinc-400">
        <p>
          ※ AI生成の解説は誤りを含む可能性があります。重要な判断はIPA公式資料でご確認ください。
        </p>
        <a
          href={getSafePdfUrl(question.sourcePdfUrl)}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 rounded-lg border border-zinc-200 bg-zinc-50 px-2.5 py-1 text-[11px] text-zinc-600 transition hover:border-zinc-300 hover:bg-zinc-100 hover:text-zinc-800 dark:border-zinc-700 dark:bg-zinc-800/60 dark:text-zinc-400 dark:hover:border-zinc-600 dark:hover:text-zinc-200"
        >
          <FileText className="h-3 w-3 flex-shrink-0" />
          IPA 公式資料で確認
        </a>
      </div>
    </div>
  );
}
