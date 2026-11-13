/** These exact originals are reference material, including legacy records that
 * carry no assessment metadata. Never infer this status from an exam or prefix.
 */
export const REFERENCE_ONLY_QUESTION_IDS: ReadonlySet<string> = new Set([
  "tsushin2-2025-late-gakka-q21",
  "kenchiku-setsubishi-2026-annual-am2-q18",
  "radio21-amateur1-2026-05-kogaku-q19",
  "radio21-riku-tech2-2026-01-kogaku-b-q25",
  "sokuryoshiho-2026-annual-gakka-q12",
]);

export function isReferenceOnlyQuestionId(id: unknown): boolean {
  return typeof id === "string" && REFERENCE_ONLY_QUESTION_IDS.has(id);
}
