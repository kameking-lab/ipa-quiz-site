import type { Question } from "@/lib/questions/types";

/** Source-specific manuscript payload; the integration owner controls publication. */
export type AutomotiveStagedQuestion = Omit<Question, "exam" | "license" | "term"> & {
  qualification: "jidousha-seibishi-gakka";
  term: "first" | "second";
  subject: string;
  sourcePages: number[];
  sourceFigureRequired: boolean;
  officialQuestionStatus: "normal" | "withdrawn-all-accepted";
  reviewNotes: string[];
  sourcePageReferences: Array<{ physicalPage: number; url: string; pdfSha256: string }>;
  sourceFigureAssets: Array<{ physicalPage: number; relativePath: string }>;
  permissionVerified: false;
  publicGo: 0;
};

export type AutomotiveOralSupplement = {
  bookId: "jaspa-2025-second-1-small-oral";
  expectedOriginals: 2;
  officialAnswerComplete: false;
  qualification: "jidousha-seibishi-gakka";
  fiscalYear: number;
  term: "second";
  examDate: string;
  subjectCode: "1-small-oral";
  sourcePdfUrl: string;
  heldReason: string | null;
  lawReferenceDate: string;
  lawRevisionId: string;
  officialLawReferenceUrl: string;
  questions: Array<{
    id: string;
    qNumber: number;
    type: "descriptive";
    question: string;
    officialAnswer: null;
    officialAnswerStatus: "not-listed-in-public-answer-table";
    learningNotes: string;
    needsReview: true;
    sourcePages: number[];
    sourceFigureRequired: boolean;
    vehicleInformation: JsonValue;
    serviceConditions?: JsonValue;
    recordSummary?: JsonValue;
    lawReferenceUrl?: string;
    officialReferenceUrls: string[];
    reviewNotes: string[];
  }>;
  permissionVerified: false;
  publicGo: 0;
};

type JsonValue = string | number | boolean | null | JsonValue[] | { [key: string]: JsonValue };

export type AutomotiveDraftBundle = {
  schemaVersion: 1;
  qualification: "jidousha-seibishi-gakka";
  writtenOriginals: AutomotiveStagedQuestion[];
  oralSupplement: AutomotiveOralSupplement;
  figurePageReferences: Array<{
    bookId: string;
    physicalPage: number;
    pdfSha256: string;
    officialUrl: string;
    originalQuestionIds: string[];
  }>;
  permissionVerified: false;
  publicGo: 0;
};
