import type { Question } from "@/lib/questions/types";
import { KISHO_PRIVATE_QUESTIONS } from "@/lib/kisho-private";
import { KishoCandidateSchema } from "./schema";

/** Candidate namespace until the release owner wires the public exam registry. */
export type KishoQuestion = Omit<Question, "exam" | "license"> & {
  exam: "kisho";
  license: "JMBSC-permission-required";
};

/** Accepted originals and explanations, including the accepted Q04 overlay.
 * Image and practical-field bindings live in KISHO_SOURCE_MANIFEST; raw local
 * imageUrls are historical provenance and must not be served by a public route.
 */
export const KISHO_CURRENT_SOURCE_URLS = {
  65: "https://www.jmbsc.or.jp/jp/examination/z/cwfe_65_z1.zip",
  66: "https://www.jmbsc.or.jp/jp/examination/z/cwfe_66_z_correction1.zip",
} as const;

// Current official download locators. Historical manuscript acceptance is kept
// separate from latest-edition equality; see the source checks in the receipt.
export const KISHO_CANDIDATES: readonly KishoQuestion[] = KISHO_PRIVATE_QUESTIONS.map(({ raw, source }) => KishoCandidateSchema.parse({
  ...raw,
  sourcePdfUrl: KISHO_CURRENT_SOURCE_URLS[source.round],
  sourceAnswerUrl: KISHO_CURRENT_SOURCE_URLS[source.round],
}));
export const KISHO_ACADEMIC_CANDIDATES = KISHO_CANDIDATES.filter(q => q.type === "multiple-choice");
export const KISHO_PRACTICAL_CANDIDATES = KISHO_PRIVATE_QUESTIONS.filter(q => q.raw.type === "descriptive");
