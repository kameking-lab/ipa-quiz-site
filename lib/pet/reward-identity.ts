import type { PetRewardReference } from "./reward-contracts";
export { petRewardReferenceKey } from "./reward-contracts";

/** Read the actual old answer identity. Never synthesize a question from counts. */
export function parseLegacyPetAnswer(value: string): { exam: string; questionId: string } | null {
  try {
    const parsed: unknown = JSON.parse(value);
    return Array.isArray(parsed) && parsed.length === 2 && parsed.every(part => typeof part === "string" && part.length > 0)
      ? { exam: parsed[0] as string, questionId: parsed[1] as string } : null;
  } catch { return null; }
}
/** A library subject label is not an exam ID. A same-qid alias is ambiguous until
 * real canonical reconciliation; HOLD rather than grant again or invent a map. */
export function legacyPetRewardMatch(reference: PetRewardReference, answers: readonly string[]): "none" | "exact" | "ambiguous" {
  let ambiguous = false;
  for (const value of answers) {
    const old = parseLegacyPetAnswer(value);
    if (!old) { ambiguous = true; continue; }
    if (old.questionId !== reference.questionId) continue;
    if (reference.source === "question" && old.exam === reference.exam) return "exact";
    if (reference.source === "library" && old.exam.startsWith("library:")) ambiguous = true;
  }
  return ambiguous ? "ambiguous" : "none";
}
