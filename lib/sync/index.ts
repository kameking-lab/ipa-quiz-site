"use client";

import { LS_KEYS } from "@/lib/storage/keys";
import type { SyncStatus } from "./client";
import { beginSync, isSyncContextCurrent, ownsSyncContext, type SyncOptions } from "./ownership";
import { syncHistoryWithContext } from "./history-sync";
import { syncBookmarks } from "./bookmark-sync";
import { syncCustomTags } from "./custom-tag-sync";
import { syncStudyPlans } from "./study-plan-sync";

export type SyncDataType = "history" | "bookmarks" | "customTags" | "studyPlans";

export interface SyncMeta {
  /** epoch ms of the last successful syncAll, or 0. */
  lastSyncedAt: number;
}

const EMPTY_META: SyncMeta = { lastSyncedAt: 0 };

export function readSyncMeta(userId?: string): SyncMeta {
  if (typeof window === "undefined" || !userId) return EMPTY_META;
  try {
    const raw = window.localStorage.getItem(`${LS_KEYS.syncMetaUserPrefix}${encodeURIComponent(userId)}`);
    if (!raw) return EMPTY_META;
    const parsed = JSON.parse(raw) as Partial<SyncMeta>;
    return { lastSyncedAt: typeof parsed.lastSyncedAt === "number" ? parsed.lastSyncedAt : 0 };
  } catch {
    return EMPTY_META;
  }
}

function writeSyncMeta(userId: string, meta: SyncMeta): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(`${LS_KEYS.syncMetaUserPrefix}${encodeURIComponent(userId)}`, JSON.stringify(meta));
  } catch {
    /* ignore */
  }
}

export interface SyncAllResult {
  overall: "ok" | "unauthenticated" | "unavailable" | "partial" | "error" | "deferred";
  userId?: string;
  byType: Record<SyncDataType, SyncStatus>;
}

/**
 * Sync all four opt-in data types. Returns per-type status plus an overall
 * verdict. Safe for signed-out users — every endpoint returns 401 and we
 * report "unauthenticated" without mutating anything destructively.
 */
export async function syncAll(options: SyncOptions = {}): Promise<SyncAllResult> {
  const started = await beginSync(options);
  if (!started.context) {
    const status = started.status;
    return { overall: status.state === "ok" ? "error" : status.state, byType: {
      history: status, bookmarks: status, customTags: status, studyPlans: status,
    } };
  }
  const context = started.context;
  const [history, bookmarks, customTags, studyPlans] = await Promise.all([
    syncHistoryWithContext(context),
    syncBookmarks(context),
    syncCustomTags(context),
    syncStudyPlans(context),
  ]);
  const byType: Record<SyncDataType, SyncStatus> = {
    history,
    bookmarks,
    customTags,
    studyPlans,
  };

  const states = Object.values(byType).map((s) => s.state);
  let overall: SyncAllResult["overall"];
  if (states.some((s) => s === "deferred")) overall = "deferred";
  else if (states.every((s) => s === "unauthenticated")) overall = "unauthenticated";
  else if (states.every((s) => s === "unavailable")) overall = "unavailable";
  else if (states.every((s) => s === "ok")) overall = "ok";
  else if (states.some((s) => s === "ok")) overall = "partial";
  else overall = "error";

  try {
    if (!(await isSyncContextCurrent(context))) {
      return { overall: "deferred", userId: context.userId, byType };
    }
  } catch {
    return { overall: "error", userId: context.userId, byType };
  }
  if (!ownsSyncContext(context)) return { overall: "deferred", userId: context.userId, byType };
  if (overall === "ok") writeSyncMeta(context.userId, { lastSyncedAt: Date.now() });
  return { overall, userId: context.userId, byType };
}
