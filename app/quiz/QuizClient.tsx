"use client";

import * as React from "react";
import type { Question, QuizMode } from "@/lib/questions/types";
import { QuizPlayer } from "@/components/quiz/QuizPlayer";
import { createHistoryStore } from "@/lib/storage/history";
import { startSession } from "@/lib/motivation/session";
import { orderByPriority } from "@/lib/learning/spaced-repetition";
import { Loader2 } from "lucide-react";

const MAX_POOL = 80;

function shuffleInPlace<T>(arr: T[]): T[] {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function deriveSessionPool(poolIds: string[], mode: QuizMode): string[] {
  let ids = [...poolIds];
  if (mode === "review" || mode === "unanswered") {
    const history = createHistoryStore();
    if (mode === "review") {
      const wrong = new Set(history.getWrongIds());
      const starred = new Set(history.getStarredIds());
      ids = ids.filter((id) => wrong.has(id) || starred.has(id));
    } else {
      const answered = new Set(history.getAnsweredIds());
      ids = ids.filter((id) => !answered.has(id));
    }
  }
  if (mode === "review") {
    ids = orderByPriority(ids);
  } else if (mode === "random" || mode === "unanswered") {
    shuffleInPlace(ids);
  }
  return ids.slice(0, MAX_POOL);
}

async function fetchQuestion(id: string, shuffle: boolean): Promise<Question> {
  const qs = new URLSearchParams({ id });
  if (shuffle) qs.set("shuffle", "1");
  const res = await fetch(`/api/questions/next?${qs.toString()}`);
  if (!res.ok) throw new Error(`fetch question failed: ${res.status}`);
  return (await res.json()) as Question;
}

export function QuizClient({
  poolIds,
  mode,
  backHref,
}: {
  poolIds: string[];
  mode: QuizMode;
  backHref: string;
}) {
  const [sessionIds, setSessionIds] = React.useState<string[] | null>(null);
  const [index, setIndex] = React.useState(0);
  const [current, setCurrent] = React.useState<Question | null>(null);
  const cache = React.useRef<Map<string, Question>>(new Map());

  // Derive session pool once on mount (needs localStorage for history modes).
  React.useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSessionIds(deriveSessionPool(poolIds, mode));
    setIndex(0);
    cache.current.clear();
    startSession(mode);
  }, [poolIds, mode]);

  // Load current + prefetch next whenever index advances.
  React.useEffect(() => {
    if (!sessionIds || sessionIds.length === 0) return;
    const currentId = sessionIds[index];
    if (!currentId) return;

    let cancelled = false;
    const shuffle = mode === "random";

    const loadInto = async (id: string, setActive: boolean) => {
      if (cache.current.has(id)) {
        if (setActive && !cancelled) setCurrent(cache.current.get(id)!);
        return;
      }
      try {
        const q = await fetchQuestion(id, shuffle);
        cache.current.set(id, q);
        if (setActive && !cancelled) setCurrent(q);
      } catch {
        // leave current as null; UI shows spinner until navigation
      }
    };

    setCurrent(cache.current.get(currentId) ?? null);
    void loadInto(currentId, true);
    const nextId = sessionIds[index + 1];
    if (nextId) void loadInto(nextId, false);

    return () => {
      cancelled = true;
    };
  }, [sessionIds, index, mode]);

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

  return (
    <QuizPlayer
      question={current}
      index={index}
      total={sessionIds.length}
      mode={mode}
      backHref={backHref}
      onNext={handleNext}
    />
  );
}
