import type { ExamCode } from "./types";

/** Historical codes for the same qualification, introduced by separate data pools. */
export const EXAM_CODE_ALIASES = {
  "haidenban-kumitate3": "haiden-seigyo3",
  "haikan-plant1": "plant-haikan1",
  "haikan-plant2": "plant-haikan2",
} as const satisfies Partial<Record<ExamCode, ExamCode>>;

export function canonicalExamCode(exam: ExamCode): ExamCode {
  return EXAM_CODE_ALIASES[exam as keyof typeof EXAM_CODE_ALIASES] ?? exam;
}

export function isCanonicalExamCode(exam: ExamCode): boolean {
  return canonicalExamCode(exam) === exam;
}
