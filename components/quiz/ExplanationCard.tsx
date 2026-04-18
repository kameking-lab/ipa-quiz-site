"use client";

import * as React from "react";
import { Star, Sparkles, ArrowRight, AlertCircle, CheckCircle2 } from "lucide-react";
import type { Question } from "@/lib/questions/types";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

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
      className={cn(
        "animate-in slide-in-from-bottom-4 duration-200",
        "rounded-2xl border-2 p-4 sm:p-5",
        isCorrect
          ? "border-emerald-300 bg-emerald-50/60 dark:border-emerald-800 dark:bg-emerald-950/30"
          : "border-red-300 bg-red-50/60 dark:border-red-800 dark:bg-red-950/30",
      )}
    >
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          {isCorrect ? (
            <CheckCircle2 className="h-5 w-5 text-emerald-600 dark:text-emerald-300" />
          ) : (
            <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-300" />
          )}
          <span
            className={cn(
              "text-sm font-semibold",
              isCorrect
                ? "text-emerald-800 dark:text-emerald-200"
                : "text-red-800 dark:text-red-200",
            )}
          >
            {isCorrect ? "正解!" : "不正解"}
          </span>
          <span className="text-xs text-zinc-500 dark:text-zinc-400">
            正解: {Array.isArray(question.answer) ? question.answer.join(", ") : question.answer}
            {selected ? ` / あなた: ${selected}` : ""}
          </span>
        </div>
        <button
          onClick={onToggleStar}
          className={cn(
            "rounded-full p-2 transition-colors",
            starred
              ? "bg-amber-100 text-amber-600 dark:bg-amber-900/40 dark:text-amber-300"
              : "bg-zinc-100 text-zinc-500 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-700",
          )}
          aria-label={starred ? "復習から外す" : "あとで復習"}
          title="R キーでも切替"
        >
          <Star className="h-4 w-4" fill={starred ? "currentColor" : "none"} />
        </button>
      </div>

      {!isCorrect && onAnalyzeWrong && (
        <button
          onClick={onAnalyzeWrong}
          className="mb-3 flex w-full items-center justify-between rounded-xl border-2 border-red-400 bg-white px-4 py-3 text-left text-sm font-semibold text-red-700 transition hover:bg-red-50 dark:border-red-500 dark:bg-zinc-950 dark:text-red-200 dark:hover:bg-red-950/30"
        >
          <span className="flex items-center gap-2">
            <Sparkles className="h-4 w-4" />
            なぜ間違えた？ AI が分析
          </span>
          <ArrowRight className="h-4 w-4" />
        </button>
      )}

      <div className="selectable-content mb-4 text-sm leading-relaxed text-zinc-800 dark:text-zinc-100">
        {question.explanation.split("\n").map((line, i) => (
          <p key={i} className="mb-2 last:mb-0">
            {line}
          </p>
        ))}
      </div>

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
          className="sm:flex-1"
        >
          次の問題へ
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>

      <div className="mt-3 text-[11px] text-zinc-500 dark:text-zinc-400">
        <a
          href={question.sourcePdfUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="underline decoration-zinc-300 underline-offset-2 hover:text-zinc-700 dark:decoration-zinc-700 dark:hover:text-zinc-200"
        >
          出典: IPA 公式 PDF
        </a>
      </div>
    </div>
  );
}
