import { KenchikuQuestionSchema } from "./schema";
import type { KenchikuQuestion as Question } from "./types";

const Q18_ID = "kenchiku-setsubishi-2026-annual-am2-q18";
/** Preserve the saved source verbatim while validating the only non-scoring exception. */
export function readKenchikuSavedSource(value: unknown): Question[] {
  if (!Array.isArray(value)) throw new Error("kenchiku saved source is not an array");
  return value.map((raw) => {
    if (!raw || typeof raw !== "object") throw new Error("kenchiku source item is not an object");
    KenchikuQuestionSchema.parse(raw);
    const q = raw as Question;
    if (q.exam !== "kenchiku-setsubishi" || typeof q.id !== "string") throw new Error("kenchiku exam or ID mismatch");
    if (q.id === Q18_ID) {
      if (q.assessmentMode !== "reference-only" || !q.questionNotice?.trim() || q.needsReview !== true) {
        throw new Error("kenchiku Q18 notice/review boundary mismatch");
      }
    } else if (q.assessmentMode === "reference-only") {
      throw new Error("unexpected kenchiku reference-only ID");
    }
    return q;
  });
}
