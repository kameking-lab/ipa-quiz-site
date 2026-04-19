"use client";

import { Badge } from "@/components/ui/badge";
import type { Question } from "@/lib/questions/types";
import { examLabel, formatYearSeason } from "@/lib/utils";

export function QuestionCard({
  question,
  progress,
}: {
  question: Question;
  progress?: { current: number; total: number };
}) {
  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center gap-2 text-xs">
        <Badge variant="outline">
          {examLabel(question.exam)} {formatYearSeason(question.year, question.season)}
        </Badge>
        <Badge variant="default">問{question.qNumber}</Badge>
        <Badge variant="default">{question.category}</Badge>
        {question.topicTags.slice(0, 3).map((t) => (
          <Badge key={t} variant="outline">
            #{t}
          </Badge>
        ))}
        {question.isCalculation && <Badge variant="warn">計算</Badge>}
        {progress && (
          <span className="ml-auto font-medium text-zinc-600 dark:text-zinc-300">
            {progress.current + 1}問目 / {progress.total}問中
          </span>
        )}
      </div>
      <div className="selectable-content rounded-2xl border border-zinc-200 bg-white p-5 text-base leading-relaxed text-zinc-900 shadow-sm dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50">
        {question.question.split("\n").map((line, i) => (
          <p key={i} className="mb-2 last:mb-0">
            {line}
          </p>
        ))}
      </div>
    </div>
  );
}
