import type { ExamCode } from "@/lib/questions/types";

export type KnowledgeLevel =
  | "beginner"
  | "foundation"
  | "learner"
  | "final-review";

export type StudyPhase = "early" | "middle" | "late";

export type TaskKind = "questions" | "blog" | "essay" | "mock" | "review";

export interface StudyPlanInput {
  exam: ExamCode;
  /** ISO date string (YYYY-MM-DD) of the exam. */
  examDate: string;
  level: KnowledgeLevel;
  weekdayMinutes: number;
  weekendMinutes: number;
  /** Categories the user self-identifies as weak. */
  weakCategories: string[];
}

export interface TaskItem {
  /** Stable key derived from date + index. Used for progress tracking. */
  key: string;
  kind: TaskKind;
  title: string;
  description?: string;
  estimatedMinutes: number;
  /** Optional in-app link (e.g. /ap, /blog/...). */
  link?: string;
  /** Optional category focus (for questions / review). */
  category?: string;
}

export interface DailyTask {
  /** ISO date (YYYY-MM-DD). */
  date: string;
  phase: StudyPhase;
  isWeekend: boolean;
  budgetMinutes: number;
  tasks: TaskItem[];
}

export interface StudyPlanSummary {
  totalHoursRequired: number;
  totalHoursAvailable: number;
  daysRemaining: number;
  coveragePercent: number;
  /** Categories that received extra weight beyond their share. */
  focusedCategories: string[];
}

export interface StudyPlan {
  id: string;
  /** ISO datetime when generated. */
  createdAt: string;
  input: StudyPlanInput;
  summary: StudyPlanSummary;
  daily: DailyTask[];
}

export type ProgressMap = Record<string, { done: boolean; doneAt?: string }>;

export interface StoredProgress {
  planId: string;
  progress: ProgressMap;
  updatedAt: string;
}
