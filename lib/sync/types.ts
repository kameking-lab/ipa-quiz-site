// Shared payload shapes for the opt-in cloud-sync endpoints. Kept framework-
// agnostic (plain serialisable objects) so both the API routes and the client
// sync modules import the same contract. Timestamps are epoch milliseconds.

export interface BookmarkSyncEntry {
  questionId: string;
  tags: string[];
  questionSnippet?: string;
  exam?: string;
  year?: number;
  season?: string;
  qNumber?: number;
  category?: string;
  bookmarkedAt?: number;
  updatedAt: number;
}

export interface CustomTagSyncEntry {
  name: string;
  color: string;
  sortOrder: number;
  updatedAt: number;
}

export interface StudyPlanSyncEntry {
  id: string;
  /** Full StudyPlan object (lib/study-plan/types). Opaque to the sync layer. */
  payload: unknown;
  /** Optional progress map (StoredProgress.progress). */
  progress?: unknown;
  createdAt?: number;
  updatedAt: number;
}

export interface SyncResponse<T> {
  entries: T[];
  merged: number;
  total: number;
}
