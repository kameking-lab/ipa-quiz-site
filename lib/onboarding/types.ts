import type { ExamCode } from "@/lib/questions/types";

export type UserAttribute = "beginner" | "experienced" | "last-minute";

export interface OnboardingState {
  /** ISO 8601 timestamp of the very first visit. */
  firstVisitAt: string | null;
  /** ISO 8601 timestamp when the user finished the tour. */
  completedTour: string | null;
  /** ISO 8601 timestamp when the user explicitly dismissed/skipped. */
  dismissedAt: string | null;
  /** User-selected attribute that drives recommended path. */
  attribute: UserAttribute | null;
  /** Exam the user chose during onboarding. */
  selectedExam: ExamCode | null;
}

export interface RecommendedStep {
  href: string;
  label: string;
  description: string;
  estMin: number;
}

export interface RecommendedPath {
  attribute: UserAttribute;
  title: string;
  summary: string;
  steps: RecommendedStep[];
}
