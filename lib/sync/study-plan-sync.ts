"use client";

import {
  getPlanSyncEntries,
  mergeServerPlans,
} from "@/lib/study-plan/storage";
import type { StudyPlan, ProgressMap } from "@/lib/study-plan/types";
import { postSync, type SyncStatus } from "./client";
import type { StudyPlanSyncEntry } from "./types";

/**
 * Sync study plans (plan object + progress) to the server and merge the
 * authoritative set back. No-op for signed-out users.
 */
export async function syncStudyPlans(): Promise<SyncStatus> {
  const local = getPlanSyncEntries();
  const entries: StudyPlanSyncEntry[] = local.map((p) => ({
    id: p.id,
    payload: p.payload,
    progress: p.progress,
    createdAt: p.createdAt,
    updatedAt: p.updatedAt,
  }));

  const { status, entries: server } = await postSync<StudyPlanSyncEntry>(
    "/api/account/study-plan-sync",
    entries,
  );

  if (status.state === "ok") {
    mergeServerPlans(
      server
        .filter((s) => s.payload && typeof s.payload === "object")
        .map((s) => ({
          id: s.id,
          payload: s.payload as StudyPlan,
          progress: s.progress as ProgressMap | undefined,
          updatedAt: s.updatedAt,
        })),
    );
  }
  return status;
}
