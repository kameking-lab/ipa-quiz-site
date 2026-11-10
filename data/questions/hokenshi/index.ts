import type { Question } from "@/lib/questions/types";
import candidate from "./medical34-live.json";
import completion from "./latest-two-completion-20261011.json";
import paper2023 from "./2023-annual.json";

/** Export only source-complete questions to the partial live catalog. */
export const HOKENSHI_QUESTIONS: Question[] = ([...candidate, ...completion, ...paper2023] as Question[]).filter(
  question => question.needsReview === false,
).sort(
  (a, b) => b.year - a.year || a.session.localeCompare(b.session) || a.qNumber - b.qNumber,
);
