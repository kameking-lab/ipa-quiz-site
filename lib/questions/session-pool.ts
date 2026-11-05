import type { QuizMode } from "./types";
import { createHistoryStore } from "@/lib/storage/history";
import { getDueCards, orderByPriority } from "@/lib/learning/spaced-repetition";
import { aggregateByCategory } from "@/lib/learning/analytics";
const MAX_POOL = 80;
const WEAKNESS_THRESHOLD = 0.6;
const WEAKNESS_MIN_ATTEMPTS = 3;

function shuffleInPlace<T>(arr: T[]): T[] {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function selectWeakCategories(
  categoryById: Record<string, string>,
): Set<string> | null {
  const history = createHistoryStore();
  const lookup = new Map<string, { category: string }>();
  for (const [id, category] of Object.entries(categoryById)) {
    lookup.set(id, { category });
  }
  const stats = aggregateByCategory(history.getAllEntries(), lookup);
  const weak = stats
    .filter((s) => s.attempts >= WEAKNESS_MIN_ATTEMPTS && s.accuracy < WEAKNESS_THRESHOLD)
    .map((s) => s.category);
  if (weak.length === 0) return null;
  return new Set(weak);
}

export function deriveSessionPool(
  poolIds: string[],
  mode: QuizMode,
  categoryById?: Record<string, string>,
  wrongOnly = false,
): string[] {
  let ids = [...poolIds];
  if (mode === "review" || mode === "unanswered") {
    const history = createHistoryStore();
    if (mode === "review") {
      const wrong = new Set(history.getWrongIds());
      const starred = new Set(wrongOnly ? [] : history.getStarredIds());
      const due = new Set(wrongOnly ? [] : getDueCards().map(card => card.id));
      ids = ids.filter((id) => wrong.has(id) || starred.has(id) || due.has(id));
    } else {
      const answered = new Set(history.getAnsweredIds());
      ids = ids.filter((id) => !answered.has(id));
    }
  }
  if (mode === "weakness" && categoryById) {
    const weakSet = selectWeakCategories(categoryById);
    if (weakSet) {
      ids = ids.filter((id) => {
        const cat = categoryById[id];
        return cat ? weakSet.has(cat) : false;
      });
    }
    // fallback: no weak categories detected → no filter, use random shuffle
  }
  if (mode === "review") {
    ids = orderByPriority(ids);
  } else if (mode === "random" || mode === "unanswered" || mode === "weakness") {
    shuffleInPlace(ids);
  }
  // An annual sitting must include every available original in source order.
  return mode === "year" ? ids : ids.slice(0, MAX_POOL);
}
