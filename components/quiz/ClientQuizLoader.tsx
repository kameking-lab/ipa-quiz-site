"use client";

import * as React from "react";
import { ALL_QUESTIONS } from "@/data/questions";
import type {
  ExamCode,
  Question,
  QuizFilter,
  QuizMode,
  Season,
} from "@/lib/questions/types";
import { filterQuestions, shuffleChoices } from "@/lib/questions/filter";
import { createHistoryStore } from "@/lib/storage/history";
import { QuizPlayer } from "./QuizPlayer";
import { Loader2 } from "lucide-react";

const VALID_MODES: QuizMode[] = ["random", "year", "topic", "review", "unanswered"];

export function ClientQuizLoader({
  params,
}: {
  params: {
    mode?: string;
    exam?: string;
    year?: string;
    season?: string;
    topic?: string;
    category?: string;
    calc?: string;
    order?: string;
  };
}) {
  const [questions, setQuestions] = React.useState<Question[] | null>(null);

  React.useEffect(() => {
    const mode = (VALID_MODES.includes(params.mode as QuizMode) ? params.mode : "random") as QuizMode;
    const filter: QuizFilter = {
      mode,
      exam: (params.exam as ExamCode | undefined) ?? "ap",
      year: params.year ? Number(params.year) : undefined,
      season: params.season as Season | undefined,
      topicTag: params.topic,
      category: params.category,
      calculationOnly: params.calc === "1",
      inOrder: params.order === "1",
    };
    const history = createHistoryStore();
    let pool = filterQuestions(ALL_QUESTIONS, filter, history);
    pool = pool.slice(0, 80);
    if (mode === "random") {
      pool = pool.map(shuffleChoices);
    }
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setQuestions(pool);
  }, [params]);

  if (!questions) {
    return (
      <div className="flex flex-1 items-center justify-center p-8">
        <Loader2 className="h-5 w-5 animate-spin text-sky-500" />
      </div>
    );
  }

  return <QuizPlayer questions={questions} mode={params.mode ?? "random"} backHref="/" />;
}
