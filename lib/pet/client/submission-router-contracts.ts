import type { Question } from "@/lib/questions/types";
import type { ExamQuestion } from "@/lib/exam-library-model";
import type { PetLearningSubmission } from "./learning-submission-contracts";
import type { PetLearningEvent } from "./learning-submission-contracts";

/** Local validation context only; never included in the account wire body. */
export type PetLearningSubmissionContext =
  | { source: "question"; question: Question }
  | { source: "library"; examId: string; question: ExamQuestion };
export interface PetSubmissionRouterView {
  owner: string | null;
  context: number;
  status: "ready" | "working" | "pending" | "retry" | "storage_error" | "legacy_hold" | "unavailable";
  busy: boolean;
  /** Current owner only. No other owner's payload, ID or count is exposed. */
  pendingCount: number;
  lastOutcome: "applied" | "duplicate" | "accepted" | null;
}
export interface PetSubmissionRouterPort {
  getView(): PetSubmissionRouterView;
  subscribe(listener: () => void): () => void;
  /** Explicit recovery only; construction/load/register never resends work. */
  retry(): Promise<unknown>;
}
export interface PetAccountSubmissionSink {
  submit(input: unknown): Promise<unknown>;
  getView?(): { owner: string | null; context: number; status: string; busy: boolean };
  subscribe?(listener: () => void): () => void;
  retry?(): Promise<unknown>;
  resumeEvent?(event: PetLearningEvent): Promise<unknown>;
  setEventPersistence?(persist: (event: PetLearningEvent) => Promise<void>): () => void;
  resetSubmissionContext?(): void;
}
export interface PetSubmissionNotification {
  input: PetLearningSubmission;
  context: PetLearningSubmissionContext;
}
