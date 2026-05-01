"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowLeft, BookOpenCheck, Loader2 } from "lucide-react";
import type { Question } from "@/lib/questions/types";
import { QuizPlayer } from "@/components/quiz/QuizPlayer";
import { createHistoryStore } from "@/lib/storage/history";
import { getDueCards, getCards } from "@/lib/learning/spaced-repetition";
import { startSession } from "@/lib/motivation/session";
import { Button } from "@/components/ui/button";

const MAX_POOL = 60;

async function fetchQuestion(id: string): Promise<Question | null> {
  try {
    const res = await fetch(`/api/questions/next?id=${encodeURIComponent(id)}`);
    if (!res.ok) return null;
    return (await res.json()) as Question;
  } catch {
    return null;
  }
}

interface PoolBuild {
  ids: string[];
  hadCards: boolean;
}

function buildReviewPool(): PoolBuild {
  const due = getDueCards().sort((a, b) => a.dueAt - b.dueAt);
  const dueIds = due.map((c) => c.id);
  if (dueIds.length > 0) {
    return { ids: dueIds.slice(0, MAX_POOL), hadCards: true };
  }
  // Fall back to wrong-answer history if SRS has no due cards yet.
  const history = createHistoryStore();
  const wrong = history.getWrongIds();
  if (wrong.length > 0) {
    return { ids: wrong.slice(-MAX_POOL).reverse(), hadCards: getCards().length > 0 };
  }
  return { ids: [], hadCards: getCards().length > 0 };
}

export function ReviewQuizClient() {
  const [sessionIds, setSessionIds] = React.useState<string[] | null>(null);
  const [hadCards, setHadCards] = React.useState(false);
  const [index, setIndex] = React.useState(0);
  const [current, setCurrent] = React.useState<Question | null>(null);
  const cache = React.useRef<Map<string, Question>>(new Map());

  React.useEffect(() => {
    const built = buildReviewPool();
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSessionIds(built.ids);
    setHadCards(built.hadCards);
    setIndex(0);
    cache.current.clear();
    if (built.ids.length > 0) startSession("review");
  }, []);

  React.useEffect(() => {
    if (!sessionIds || sessionIds.length === 0) return;
    const id = sessionIds[index];
    if (!id) return;
    let cancelled = false;
    const load = async (qid: string, setActive: boolean) => {
      if (cache.current.has(qid)) {
        if (setActive && !cancelled) setCurrent(cache.current.get(qid)!);
        return;
      }
      const q = await fetchQuestion(qid);
      if (!q) return;
      cache.current.set(qid, q);
      if (setActive && !cancelled) setCurrent(q);
    };
    setCurrent(cache.current.get(id) ?? null);
    void load(id, true);
    const next = sessionIds[index + 1];
    if (next) void load(next, false);
    return () => {
      cancelled = true;
    };
  }, [sessionIds, index]);

  const handleNext = React.useCallback(() => {
    setIndex((i) => i + 1);
  }, []);

  if (!sessionIds) {
    return (
      <div className="flex flex-1 items-center justify-center p-8">
        <Loader2 className="h-5 w-5 animate-spin text-sky-500" />
      </div>
    );
  }

  if (sessionIds.length === 0) {
    return (
      <main className="mx-auto w-full max-w-2xl flex-1 px-4 py-8 sm:py-12">
        <Button asChild variant="ghost" size="sm" className="mb-4">
          <Link href="/">
            <ArrowLeft className="h-4 w-4" /> ホームに戻る
          </Link>
        </Button>
        <div className="rounded-2xl border-2 border-dashed border-zinc-300 bg-zinc-50/50 p-8 text-center dark:border-zinc-700 dark:bg-zinc-900/30">
          <BookOpenCheck className="mx-auto mb-3 h-12 w-12 text-zinc-400 dark:text-zinc-600" />
          <h1 className="mb-2 text-lg font-semibold text-zinc-700 dark:text-zinc-300">
            復習対象はありません
          </h1>
          <p className="mx-auto max-w-md text-sm text-zinc-600 dark:text-zinc-400">
            {hadCards
              ? "今の時点で復習タイミングの問題はありません。次の復習タイミング（24時間後・1週間後・1ヶ月後）に再びこのページから戻ってきてください。"
              : "まずは問題演習を進めると、エビングハウス曲線に沿って自動的に復習対象が登録されます。"}
          </p>
          <div className="mt-5">
            <Button asChild variant="primary" size="sm">
              <Link href="/quiz?mode=random&exam=ap">問題を解く</Link>
            </Button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <QuizPlayer
      question={current}
      index={index}
      total={sessionIds.length}
      mode="review"
      backHref="/"
      exam="ap"
      onNext={handleNext}
    />
  );
}
