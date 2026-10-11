import { AUTOMOTIVE_DRAFT_BUNDLE } from "@/data/qualification-staging/automotive/latest-two";
import type { AutomotiveStagedQuestion } from "./draft-types";

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
    (!filter.gradableOnly || (question.needsReview === false && question.officialQuestionStatus === "normal")),
  );
}

export function getAutomotiveOriginalKey(question: AutomotiveStagedQuestion): string {
  return [question.qualification, question.fiscalYear, question.term, question.subject, question.qNumber].join(":");
}
