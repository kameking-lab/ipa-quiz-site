"use client";

import * as React from "react";
import { Eye, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export function AnswerReveal({
  answer,
  answerText,
}: {
  answer: string;
  answerText?: string;
}) {
  const [shown, setShown] = React.useState(false);

  if (!shown) {
    return (
      <Button
        variant="primary"
        size="lg"
        onClick={() => setShown(true)}
        className="w-full font-semibold"
      >
        <Eye className="h-4 w-4" />
        正解を表示
      </Button>
    );
  }

  return (
    <div
      className="relative overflow-hidden rounded-2xl border border-emerald-300/60 bg-gradient-to-br from-emerald-50 via-emerald-50/60 to-card p-5 shadow-sm dark:border-emerald-700/50 dark:from-emerald-950/50 dark:via-emerald-950/20 dark:to-card"
      style={{ animation: "scale-in 220ms cubic-bezier(0.2, 0.8, 0.2, 1)" }}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-emerald-400/20 blur-2xl dark:bg-emerald-300/10"
      />
      <div className="relative flex items-start gap-4">
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-500 text-white shadow-md dark:bg-emerald-400 dark:text-emerald-950">
          <CheckCircle2 className="h-6 w-6" />
        </span>
        <div className="min-w-0 flex-1">
          <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-700 dark:text-emerald-300">
            正解
          </div>
          <div className="mt-1 flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <span className="text-3xl font-bold leading-none text-emerald-900 dark:text-emerald-100 sm:text-4xl">
              {answer}
            </span>
            {answerText && (
              <span className="text-sm leading-relaxed text-emerald-900/90 dark:text-emerald-100/90 sm:text-base">
                {answerText}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
