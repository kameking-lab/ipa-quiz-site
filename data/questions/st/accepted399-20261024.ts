import type { Question } from "@/lib/questions/types";
import deltaInput from "./accepted399-20261024.delta.json";

/** These originals belong to the separate annotated/HOLD workflow. */
const HELD_IDS = new Set<string>(["st-2009a-am2-q23"]);
export const ST_A2_HELD_IDS: readonly string[] = Object.freeze([...HELD_IDS]);

function assertAcceptedQuestion(value: unknown): asserts value is Question {
  if (!value || typeof value !== "object" || Array.isArray(value)) throw new Error("invalid ST question");
  const q = value as Record<string, unknown>;
  if (typeof q.id !== "string" || HELD_IDS.has(q.id)
    || q.exam !== "st" || q.type !== "multiple-choice"
    || q.session !== "am2"
    || typeof q.year !== "number" || typeof q.qNumber !== "number"
    || q.season !== (q.year < 2020 ? "autumn" : "spring")
    || !((q.year >= 2009 && q.year <= 2019) || (q.year >= 2021 && q.year <= 2025))
    || q.id !== `st-${q.year}${q.season === "autumn" ? "a" : "h"}-${q.session}-q${q.qNumber}`
    || q.qNumber < 1 || q.qNumber > 25
    || q.license !== "IPA-public" || typeof q.hasImage !== "boolean"
    || typeof q.category !== "string" || !Array.isArray(q.topicTags)
    || !q.topicTags.every(tag => typeof tag === "string")
    || typeof q.difficulty !== "number" || ![1, 2, 3, 4, 5].includes(q.difficulty)
    || ["question", "explanation", "sourcePdfUrl"].some(key => typeof q[key] !== "string" || !(q[key] as string).trim())
  ) throw new Error("invalid accepted ST question: " + String(q.id));
  for (const field of ["choices", "choiceExplanations"]) {
    const values = q[field];
    if (!values || typeof values !== "object" || Array.isArray(values)
      || Object.keys(values).sort().join(",") !== ["ア", "イ", "ウ", "エ"].sort().join(",")
      || Object.values(values).some(value => typeof value !== "string" || !value.trim())
    ) throw new Error("invalid ST choices/reasons: " + q.id);
  }
  if (typeof q.answer !== "string" || !["ア", "イ", "ウ", "エ"].includes(q.answer)) throw new Error("invalid ST key");
  if (q.imageUrls !== undefined && (!Array.isArray(q.imageUrls) || q.imageUrls.some(url => typeof url !== "string" || !url.trim()))) throw new Error("invalid ST images");
  if (q.hasImage && (!Array.isArray(q.imageUrls) || q.imageUrls.length === 0)) throw new Error("missing ST image");
}

function acceptedQuestions(input: unknown): Question[] {
  if (!Array.isArray(input)) throw new Error("ST delta must be an array");
  const ids = new Set<string>();
  for (const value of input) {
    assertAcceptedQuestion(value);
    if (ids.has(value.id)) throw new Error("duplicate ST delta ID: " + value.id);
    ids.add(value.id);
  }
  return input;
}

export const ST_ACCEPTED_399_DELTA = acceptedQuestions(deltaInput);

/** Pure by-ID overlay, applied after legacy corrections and reason overlays.
 * Unrelated originals retain their identity, content, and order. Reapplication
 * replaces the same map positions and introduces no second copy of an ID.
 */
export function mergeStAccepted399(
  current: Question[],
  incoming: Question[] = ST_ACCEPTED_399_DELTA,
): Question[] {
  const merged = new Map<string, Question>();
  for (const question of current) {
    if (merged.has(question.id)) throw new Error("duplicate current ST ID: " + question.id);
    merged.set(question.id, question);
  }
  for (const question of acceptedQuestions(incoming)) merged.set(question.id, question);
  return [...merged.values()].filter(question => !HELD_IDS.has(question.id));
}
