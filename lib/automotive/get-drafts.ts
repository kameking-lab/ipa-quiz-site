import { AUTOMOTIVE_DRAFT_BUNDLE } from "@/data/qualification-staging/automotive/latest-two";
import type { AutomotiveStagedQuestion } from "./draft-types";
import { getAutomotiveReviewDisposition } from "./review-disposition";

export interface AutomotiveDraftFilter {
  fiscalYear?: number;
  term?: "first" | "second";
  subject?: string;
  gradableOnly?: boolean;
}

/** Source-specific drafts remain outside the public question registry. */
export function getAutomotiveWrittenDrafts(filter: AutomotiveDraftFilter = {}): AutomotiveStagedQuestion[] {
  return AUTOMOTIVE_DRAFT_BUNDLE.writtenOriginals.filter((question) =>
    (filter.fiscalYear === undefined || question.fiscalYear === filter.fiscalYear) &&
    (filter.term === undefined || question.term === filter.term) &&
    (filter.subject === undefined || question.subject === filter.subject) &&
    (!filter.gradableOnly || getAutomotiveReviewDisposition(question) === "grading-candidate"),
  );
}

export function getAutomotiveOriginalKey(question: AutomotiveStagedQuestion): string {
  return [question.qualification, question.fiscalYear, question.term, question.subject, question.qNumber].join(":");
}

/** Question-level handoff for integration review; these rows do not grant publication approval. */
export function getAutomotiveIntegrationReviewManifest(filter: Omit<AutomotiveDraftFilter, "gradableOnly"> = {}) {
  return getAutomotiveWrittenDrafts(filter).map((question) => ({
    id: question.id,
    originalKey: getAutomotiveOriginalKey(question),
    disposition: getAutomotiveReviewDisposition(question),
    officialQuestionStatus: question.officialQuestionStatus,
    officialAnswerNumber: question.officialAnswerNumber,
    sourcePdfUrl: question.sourcePdfUrl,
    sourceAnswerUrl: question.sourceAnswerUrl,
    sourcePages: question.sourcePages,
  }));
}
