import originals from "@/data/prepared-chizai2/questions.json";
import type { PreparedChizai2Question } from "@/data/prepared-chizai2/types";
import type { Question } from "@/lib/questions/types";

/**
 * Fixed content reused without rewriting; the six source files retain their old
 * metadata and byte hashes. Adoption is bound to the independent content review
 * and owner rights instruction in reports/qchizai2-20261103/application-receipt.json.
 * This local registry does not deploy or publish the branch.
 */
export const CHIZAI2_QUESTIONS: Question[] = (originals as PreparedChizai2Question[]).map((source) => {
  const question: Question = {
    id: source.id, exam: "chizai2", session: source.session,
    year: source.year, season: source.season, qNumber: source.qNumber,
    examDate: source.examDate, type: source.type, category: source.category,
    topicTags: source.topicTags, difficulty: source.difficulty,
    question: source.question, answer: source.answer,
    officialAnswerNumber: source.officialAnswerNumber,
    explanation: source.explanation, explanationCoverage: "full",
    hasImage: source.hasImage, imageUrls: source.imageUrls,
    sourcePdfUrl: source.sourcePdfUrl, sourceAnswerUrl: source.sourceAnswerUrl,
    sourceAttribution: source.sourceAttribution,
    officialReferenceUrls: source.officialReferenceUrls,
    lawReferenceDate: source.lawReferenceDate, lastUpdated: source.lastUpdated,
    license: "IP-EDU-authorized-reuse", needsReview: false,
    isCalculation: source.isCalculation,
  };
  // Numeric originals have no invented options. Empty legacy maps are omitted
  // to meet the current numeric player and validation contract.
  if (source.type === "numeric") question.numericAnswer = source.numericAnswer;
  else {
    question.choices = source.choices;
    question.choiceExplanations = source.choiceExplanations;
  }
  return question;
});
