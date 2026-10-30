"use client";

import { LS_KEYS } from "@/lib/storage/keys";
import type { HistoryEntry } from "@/lib/storage/history";
import { postSync, type SyncStatus } from "./client";
import { beginSync, ownsSyncContext, type SyncContext, type SyncOptions } from "./ownership";

type SyncEntry = Omit<HistoryEntry, "selected"> & { selected?: string };
interface HistorySnapshot {
  entries: SyncEntry[];
  starredIds: string[];
  [key: string]: unknown;
}

function isEntry(value: unknown): value is SyncEntry {
  if (!value || typeof value !== "object") return false;
  const entry = value as Partial<SyncEntry>;
  return typeof entry.id === "string" && typeof entry.correct === "boolean" &&
    typeof entry.at === "number" && Number.isFinite(entry.at) &&
    (entry.selected === undefined || typeof entry.selected === "string");
}

function readHistory(): HistorySnapshot {
  const raw = window.localStorage.getItem(LS_KEYS.history);
  if (!raw) return { entries: [], starredIds: [] };
  const parsed = JSON.parse(raw) as HistorySnapshot;
  if (!parsed || !Array.isArray(parsed.entries) || !parsed.entries.every(isEntry) ||
    !Array.isArray(parsed.starredIds) || !parsed.starredIds.every((id) => typeof id === "string")) {
    throw new Error("invalid_local_history");
  }
  return parsed;
}

/** Server rows omit selected/nativeBResult. Local auxiliary fields take precedence. */
function mergeHistory(snapshot: HistorySnapshot, latest: HistorySnapshot, server: SyncEntry[]): HistorySnapshot {
  const entries = new Map<string, SyncEntry>();
  for (const entry of [...server, ...snapshot.entries, ...latest.entries]) {
    const key = JSON.stringify([entry.id, entry.at]);
    const previous = entries.get(key);
    entries.set(key, {
      ...previous,
      ...entry,
      ...(entry.selected === undefined && previous?.selected !== undefined ? { selected: previous.selected } : {}),
      ...(entry.nativeBResult === undefined && previous?.nativeBResult !== undefined ? { nativeBResult: previous.nativeBResult } : {}),
    });
  }
  return {
    ...snapshot,
    ...latest,
    entries: [...entries.values()].sort((a, b) => a.at - b.at),
    // Use latest stars, including unstar operations performed during the request.
    starredIds: latest.starredIds,
  };
}

export async function syncHistoryWithContext(context: SyncContext): Promise<SyncStatus> {
  try {
    const snapshot = readHistory();
    const { status, entries } = await postSync<SyncEntry>("/api/account/history-sync", snapshot.entries, context);
    if (status.state !== "ok") return status;
    if (!entries.every(isEntry)) return { state: "error", message: "invalid_history_response" };
    if (!ownsSyncContext(context)) return { state: "deferred", reason: "account_changed" };
    const latest = readHistory();
    window.localStorage.setItem(LS_KEYS.history, JSON.stringify(mergeHistory(snapshot, latest, entries)));
    return status;
  } catch (error) {
    return { state: "error", message: error instanceof Error ? error.message : "history" };
  }
}

/** Manual history-only entry point uses the same ownership/account guard as syncAll. */
export async function syncHistory(options: SyncOptions = {}): Promise<SyncStatus> {
  const started = await beginSync(options);
  return started.context ? syncHistoryWithContext(started.context) : started.status;
}
