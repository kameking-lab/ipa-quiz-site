import type { Question } from "@/lib/questions/types";
import { KISHO_PRIVATE_QUESTIONS } from "@/lib/kisho-private";
import { KishoCandidateSchema } from "./schema";
import publicAssets from "./public-assets.json";

/** Candidate namespace until the release owner wires the public exam registry. */
export type KishoQuestion = Omit<Question, "exam" | "license"> & {
  exam: "kisho";
  license: "JMBSC-permission-required";
};

/** Accepted originals and explanations, including the accepted Q04 overlay.
 * Image and practical-field bindings live in KISHO_SOURCE_MANIFEST; raw local
 * imageUrls are historical provenance and must not be served by a public route.
 */
export { KISHO_CURRENT_SOURCE_URLS } from "@/lib/kisho-source-urls";
import { KISHO_CURRENT_SOURCE_URLS } from "@/lib/kisho-source-urls";

// Current official download locators. Historical manuscript acceptance is kept
// separate from latest-edition equality; see the source checks in the receipt.
export const KISHO_CANDIDATES: readonly KishoQuestion[] = KISHO_PRIVATE_QUESTIONS.map(({ raw, source }) => KishoCandidateSchema.parse({
  ...raw,
  sourcePdfUrl: KISHO_CURRENT_SOURCE_URLS[source.round],
  sourceAnswerUrl: KISHO_CURRENT_SOURCE_URLS[source.round],
}));
export const KISHO_ACADEMIC_CANDIDATES = KISHO_CANDIDATES.filter(q => q.type === "multiple-choice");
export const KISHO_PRACTICAL_CANDIDATES = KISHO_PRIVATE_QUESTIONS.filter(q => q.raw.type === "descriptive");

/** Public delivery is an explicit projection; never expose historical local paths. */
export const KISHO_QUESTIONS: Question[] = KISHO_ACADEMIC_CANDIDATES.map(q => {
  const source = KISHO_PRIVATE_QUESTIONS.find(item => item.raw.id === q.id)!.source;
  const pageIds = [...new Set([...source.questionPages, ...source.figurePages].map(p => p.assetId))];
  return {
    id: q.id, exam: "kisho", session: q.session, year: q.year, season: q.season,
    qNumber: q.qNumber, type: "multiple-choice", category: q.category, topicTags: q.topicTags,
    difficulty: q.difficulty, question: q.question, choices: q.choices,
    answer: q.answer, explanation: q.explanation, choiceExplanations: q.choiceExplanations,
    officialAnswerNumber: q.officialAnswerNumber, explanationCoverage: "full", needsReview: false,
    hasImage: true, imageUrls: pageIds.map(id => publicAssets.find(a => a.assetId === id)!.url),
    imageAltTexts: pageIds.map(() => `気象予報士 ${q.session === "ippan" ? "学科一般" : "学科専門"} 問${q.qNumber}の原典問題・図表`),
    sourcePdfUrl: q.sourcePdfUrl, sourceAnswerUrl: q.sourceAnswerUrl,
    sourceAttribution: `${q.sourceAttribution}。画像化・表記整理。解説は過去問AIの独自作成。`, license: "JMBSC-permission-required",
  };
});
