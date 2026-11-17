"use client";

import {
  getPlanSyncEntries,
  mergeServerPlans,
} from "@/lib/study-plan/storage";
import type { StudyPlan, ProgressMap } from "@/lib/study-plan/types";
import { postSync, type SyncStatus } from "./client";
import type { StudyPlanSyncEntry } from "./types";
import { ownsSyncContext, type SyncContext } from "./ownership";
import { getPaceSyncEntries, mergePaceSyncEntries } from "@/lib/study-plan/pace-storage";
import { LS_KEYS } from "@/lib/storage/keys";

/**
 * Sync study plans (plan object + progress) to the server and merge the
 * authoritative set back. No-op for signed-out users.
 */
export async function syncStudyPlans(context: SyncContext): Promise<SyncStatus> {
  const local = getPlanSyncEntries();
  const entries: StudyPlanSyncEntry[] = local.map((p) => ({
    id: p.id,
    payload: p.payload,
    progress: p.progress,
    createdAt: p.createdAt,
    updatedAt: p.updatedAt,
  }));
  const paceOwner = window.localStorage.getItem(LS_KEYS.paceSyncOwner);
  const includePace = !paceOwner || paceOwner === context.userId;

  const { status, entries: server } = await postSync<StudyPlanSyncEntry>(
    "/api/account/study-plan-sync",
    [...entries, ...(includePace ? getPaceSyncEntries() : [])],
    context,
  );

  if (status.state === "ok") {
    if (!ownsSyncContext(context)) return { state: "deferred", reason: "account_changed" };
    if (includePace && (!window.localStorage.getItem(LS_KEYS.paceSyncOwner) || window.localStorage.getItem(LS_KEYS.paceSyncOwner) === context.userId)) {
      window.localStorage.setItem(LS_KEYS.paceSyncOwner, context.userId);
      mergePaceSyncEntries(server);
    }
    mergeServerPlans(
      server
        .filter((s) => s.payload && typeof s.payload === "object" && !("kind" in s.payload))
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
