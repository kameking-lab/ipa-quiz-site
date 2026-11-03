import type { AutomotiveStagedQuestion } from "./draft-types";

export type AutomotiveReviewDisposition =
  | "grading-candidate"
  | "official-all-accepted"
  | "technical-hold"
  | "needs-review";

// This unresolved source conflict requires evidence before its grading hold can be lifted.
const TECHNICAL_HOLD_IDS: ReadonlySet<string> = new Set([
  "jidosha-2026-first-2-gasoline-q31",
]);

/** A manuscript review flag alone cannot resolve a recorded source conflict. */
export function getAutomotiveReviewDisposition(question: AutomotiveStagedQuestion): AutomotiveReviewDisposition {
  if (TECHNICAL_HOLD_IDS.has(question.id)) return "technical-hold";
  if (question.officialQuestionStatus === "withdrawn-all-accepted") return "official-all-accepted";
  return question.needsReview === false ? "grading-candidate" : "needs-review";
}
