import type { Question } from "@/lib/questions/types";
import candidate from "./medical34-live.json";
import completion from "./latest-two-completion-20261011.json";

/** Export only source-complete questions to the partial live catalog. */
export const HOKENSHI_QUESTIONS: Question[] = ([...candidate, ...completion] as Question[]).filter(
  question => question.needsReview === false,
).sort(
  (a, b) => b.year - a.year || a.session.localeCompare(b.session) || a.qNumber - b.qNumber,
);
