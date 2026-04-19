"use client";

import * as React from "react";
import { Eye } from "lucide-react";
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
        variant="outline"
        size="lg"
        onClick={() => setShown(true)}
        className="w-full"
      >
        <Eye className="h-4 w-4" />
        正解を表示
      </Button>
    );
  }

  return (
    <div className="rounded-2xl border-2 border-emerald-300 bg-emerald-50 p-4 dark:border-emerald-800 dark:bg-emerald-950/40">
      <div className="text-xs font-semibold uppercase tracking-wide text-emerald-700 dark:text-emerald-300">
        正解
      </div>
      <div className="mt-1 flex items-baseline gap-3">
        <span className="text-3xl font-bold text-emerald-800 dark:text-emerald-100">
          {answer}
        </span>
        {answerText && (
          <span className="text-sm leading-relaxed text-emerald-900 dark:text-emerald-100">
            {answerText}
          </span>
        )}
      </div>
    </div>
  );
}
