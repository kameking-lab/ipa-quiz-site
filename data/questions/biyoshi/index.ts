import type { Question } from "@/lib/questions/types";
import first from "./2026-first.json";
import second from "./2026-second.json";
import mask from "./study-mask.json";

const reviewed = new Set(mask.reviewedQuestionIds);
const excluded = new Set(mask.excludedIds);
/** Reuse the exact accepted 106; an accepted explanation cannot lift a recorded hold. */
export const BIYOSHI_QUESTIONS: Question[] = ([...first, ...second] as Question[]).filter(
  q => reviewed.has(q.id) && !excluded.has(q.id) && q.needsReview === false,
);
