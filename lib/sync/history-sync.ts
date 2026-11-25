"use client";

import { LS_KEYS } from "@/lib/storage/keys";
import type { HistoryEntry } from "@/lib/storage/history";
import { HISTORY_BATCH, type HistoryAnswer, type HistoryWindow } from "./history-protocol";
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
    if (previous && previous.correct !== entry.correct) {
      if (!entry.correct) entries.set(key, entry);
      continue;
    }
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

function* uploadBatches(snapshot: SyncEntry[]): Generator<HistoryAnswer[]> {
  const encoder = new TextEncoder();
  let batch: HistoryAnswer[] = [];
  let bytes = 0;
  for (const { id, at, correct } of [...snapshot].sort((a, b) => a.at - b.at)) {
    const entry = { id, at, correct };
    const size = encoder.encode(JSON.stringify(entry)).byteLength + 1;
    if (batch.length && (batch.length === HISTORY_BATCH || bytes + size > 512 * 1024)) {
      yield batch;
      batch = [];
      bytes = 0;
    }
    batch.push(entry);
    bytes += size;
  }
  yield batch;
}

export async function syncHistoryWithContext(context: SyncContext): Promise<SyncStatus> {
  try {
    const snapshot = readHistory();
    const entries: SyncEntry[] = [];
    const batches = uploadBatches(snapshot.entries);
    let current = batches.next();
    let after: number | undefined;
    let mergedCount = 0;
    let total = 0;
    let limitReached = false;
    while (!current.done) {
      const batch = current.value;
      const next = batches.next();
      const last = batch.at(-1);
      // When a timestamp straddles batches, read that timestamp only after
      // all its uploads have committed. Every saved row is counted once.
      let through: number | undefined;
      if (last && !next.done) {
        through = next.value[0].at === last.at ? last.at - 1 : last.at;
      }
      const historyPage: HistoryWindow = { after, through };
      do {
        const reply = await postSync<SyncEntry>("/api/account/history-sync", batch, context, { historyPage });
        if (reply.status.state !== "ok") return reply.status;
        if (!reply.entries.every(isEntry)) return { state: "error", message: "invalid_history_response" };
        const previous = historyPage.cursor;
        const cursor = reply.nextCursor;
        if (previous && cursor && (cursor.at < previous.at || (cursor.at === previous.at && cursor.rowId <= previous.rowId))) {
          return { state: "error", message: "invalid_history_cursor" };
        }
        if (reply.fullHistory) {
          entries.length = 0;
          total = 0;
        }
        for (const entry of reply.entries) entries.push(entry);
        mergedCount += reply.status.merged;
        total += reply.status.total;
        limitReached ||= !!reply.status.limitReached;
        historyPage.cursor = cursor;
      } while (historyPage.cursor);
      after = through;
      current = next;
    }
    if (!ownsSyncContext(context)) return { state: "deferred", reason: "account_changed" };
    const latest = readHistory();
    const merged = mergeHistory(snapshot, latest, entries);
    window.localStorage.setItem(LS_KEYS.history, JSON.stringify(merged));
    if (JSON.stringify(merged.entries) !== JSON.stringify(latest.entries)) window.dispatchEvent(new Event("study-activity:synced"));
    return { state: "ok", merged: mergedCount, total, ...(limitReached && { limitReached }) };
  } catch (error) {
    return { state: "error", message: error instanceof Error ? error.message : "history" };
  }
}

/** Manual history-only entry point uses the same ownership/account guard as syncAll. */
export async function syncHistory(options: SyncOptions = {}): Promise<SyncStatus> {
  const started = await beginSync(options);
  return started.context ? syncHistoryWithContext(started.context) : started.status;
}
