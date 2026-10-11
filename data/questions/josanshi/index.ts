import type { Question } from "@/lib/questions/types";
import baseline from "./medical34-live.json";
import additions from "./latest-two-additions.json";

/** Official scored questions from rounds 109 and 108; excluded PM31 stays in evidence. */
export const JOSANSHI_QUESTIONS: Question[] = ([...baseline, ...additions] as Question[]).filter(
  question => question.needsReview === false,
).sort(
  (a, b) => b.year - a.year || a.session.localeCompare(b.session) || a.qNumber - b.qNumber,
);
