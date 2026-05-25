"use client";

import { LS_KEYS } from "@/lib/storage/keys";
import { postSync, type SyncStatus } from "./client";
import { syncBookmarks } from "./bookmark-sync";
import { syncCustomTags } from "./custom-tag-sync";
import { syncStudyPlans } from "./study-plan-sync";

export type SyncDataType = "history" | "bookmarks" | "customTags" | "studyPlans";

export interface SyncMeta {
  /** epoch ms of the last successful syncAll, or 0. */
  lastSyncedAt: number;
}

const EMPTY_META: SyncMeta = { lastSyncedAt: 0 };

export function readSyncMeta(): SyncMeta {
  if (typeof window === "undefined") return EMPTY_META;
  try {
    const raw = window.localStorage.getItem(LS_KEYS.syncMeta);
    if (!raw) return EMPTY_META;
    const parsed = JSON.parse(raw) as Partial<SyncMeta>;
    return { lastSyncedAt: typeof parsed.lastSyncedAt === "number" ? parsed.lastSyncedAt : 0 };
  } catch {
    return EMPTY_META;
  }
}

function writeSyncMeta(meta: SyncMeta): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(LS_KEYS.syncMeta, JSON.stringify(meta));
  } catch {
    /* ignore */
  }
}

interface HistoryEntry {
  id: string;
  selected?: string;
  correct: boolean;
  at: number;
}

/** Sync learning history via the existing /api/account/history-sync endpoint. */
async function syncHistory(): Promise<SyncStatus> {
  let local: HistoryEntry[] = [];
  try {
    const raw = window.localStorage.getItem(LS_KEYS.history);
    const parsed = raw ? (JSON.parse(raw) as { entries?: HistoryEntry[]; starredIds?: string[] }) : {};
    local = Array.isArray(parsed.entries) ? parsed.entries : [];
    const { status, entries } = await postSync<HistoryEntry>(
      "/api/account/history-sync",
      local,
    );
    if (status.state === "ok") {
      window.localStorage.setItem(
        LS_KEYS.history,
        JSON.stringify({
          entries,
          starredIds: Array.isArray(parsed.starredIds) ? parsed.starredIds : [],
        }),
      );
    }
    return status;
  } catch (err) {
    return { state: "error", message: err instanceof Error ? err.message : "history" };
  }
}

export interface SyncAllResult {
  overall: "ok" | "unauthenticated" | "unavailable" | "partial" | "error";
  byType: Record<SyncDataType, SyncStatus>;
}

/**
 * Sync all four opt-in data types. Returns per-type status plus an overall
 * verdict. Safe for signed-out users — every endpoint returns 401 and we
 * report "unauthenticated" without mutating anything destructively.
 */
export async function syncAll(): Promise<SyncAllResult> {
  const [history, bookmarks, customTags, studyPlans] = await Promise.all([
    syncHistory(),
    syncBookmarks(),
    syncCustomTags(),
    syncStudyPlans(),
  ]);
  const byType: Record<SyncDataType, SyncStatus> = {
    history,
    bookmarks,
    customTags,
    studyPlans,
  };

  const states = Object.values(byType).map((s) => s.state);
  let overall: SyncAllResult["overall"];
  if (states.every((s) => s === "unauthenticated")) overall = "unauthenticated";
  else if (states.every((s) => s === "unavailable")) overall = "unavailable";
  else if (states.every((s) => s === "ok")) overall = "ok";
  else if (states.some((s) => s === "ok")) overall = "partial";
  else overall = "error";

  if (overall === "ok" || overall === "partial") {
    writeSyncMeta({ lastSyncedAt: Date.now() });
  }
  return { overall, byType };
}
