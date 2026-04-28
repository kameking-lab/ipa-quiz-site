"use client";

import * as React from "react";
import Link from "next/link";
import { ALL_QUESTIONS } from "@/data/questions";
import type { ExamCode, Question } from "@/lib/questions/types";
import { filterQuestions, shuffleChoices } from "@/lib/questions/filter";
import { createHistoryStore } from "@/lib/storage/history";
import { StreamQuizPlayer } from "./StreamQuizPlayer";
import { Loader2 } from "lucide-react";

export function StreamQuizLoader({
  params,
}: {
  params: { exam?: string; topic?: string; category?: string };
}) {
  const [questions, setQuestions] = React.useState<Question[] | null>(null);

  React.useEffect(() => {
    const history = createHistoryStore();
    const pool = filterQuestions(
      ALL_QUESTIONS,
      {
        mode: "random",
        exam: (params.exam as ExamCode | undefined) ?? "ap",
        topicTag: params.topic,
        category: params.category,
      },
      history,
    )
      .slice(0, 60)
      .map(shuffleChoices);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setQuestions(pool);
  }, [params]);

  if (!questions) {
    return (
      <div className="flex min-h-[100dvh] items-center justify-center bg-zinc-950 text-zinc-50">
        <Loader2 className="h-6 w-6 animate-spin text-sky-400" />
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="flex min-h-[100dvh] flex-col items-center justify-center gap-4 bg-zinc-950 px-6 text-center text-zinc-50">
        <p>該当する問題がありませんでした。</p>
        <Link href="/" className="rounded-xl bg-sky-600 px-4 py-2 text-sm">
          ホームに戻る
        </Link>
      </div>
    );
  }

  return <StreamQuizPlayer questions={questions} />;
}
