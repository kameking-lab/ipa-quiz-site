import type { ExamQuestion } from "@/lib/exam-library-model";
/** Gated/native builds grade with granted player data, never a bundled answer key. */
export function loadSurveyAssistantGradingPaper(_id: string): readonly ExamQuestion[] | null {
  void _id;
  return null;
}

export const loadReferenceAwareGradingPaper = loadSurveyAssistantGradingPaper;
