import type { Question } from "./types";

/** These papers are compared with a model answer without recording a score. */
export function isSelfReviewedDescriptiveQuestion(q: Question | null | undefined): q is Question & { type: "descriptive" } {
  return q?.type === "descriptive" && (q.exam === "sokuryoshi" || q.exam === "khk-kagaku" || q.exam === "iji-shuzen" || q.exam === "khk-kikai-kou" || q.exam === "gyosei" || q.exam === "chosashi" || q.exam === "khk-reito-1");
}
