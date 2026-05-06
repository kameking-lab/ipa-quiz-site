import type { ChoiceKey } from "@/lib/questions/types";

/**
 * Minimal question shape sent to the mock-exam client.
 * Excludes explanation/sourcePdfUrl/etc. so the payload stays small —
 * the runner only needs these fields to render and grade.
 */
export interface SlimMockQuestion {
  id: string;
  question: string;
  choices: Partial<Record<ChoiceKey, string>>;
  answer: ChoiceKey | ChoiceKey[] | string;
  category: string;
}

export interface MockExamFetchResponse {
  exam: string;
  total: number;
  questions: SlimMockQuestion[];
}
