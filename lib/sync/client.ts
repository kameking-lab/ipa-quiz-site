"use client";

import type { SyncResponse } from "./types";
import { isSyncContextCurrent, ownsSyncContext, type SyncContext } from "./ownership";

export type SyncStatus =
  | { state: "ok"; merged: number; total: number }
  | { state: "unauthenticated" } // 401 — not signed in, stay local-only
  | { state: "unavailable" } // 503 — DB not provisioned
  | { state: "deferred"; reason: "owner_unknown" | "owner_mismatch" | "account_changed" }
  | { state: "error"; message: string };

/**
 * POST a batch of local entries to a sync endpoint and return the server's
 * authoritative set plus a status. Network / auth / DB-absence failures are
 * returned as non-throwing statuses so callers can silently stay LocalStorage-
 * only (the opt-in contract: signed-out or offline users are unaffected).
 */
export async function postSync<T>(
  endpoint: string,
  entries: T[],
  context: SyncContext,
): Promise<{ status: SyncStatus; entries: T[] }> {
  try {
    if (!ownsSyncContext(context)) return { status: { state: "deferred", reason: "account_changed" }, entries };
    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "same-origin",
      body: JSON.stringify({ entries, expectedUserId: context.userId }),
    });
    if (res.status === 401) return { status: { state: "unauthenticated" }, entries };
    if (res.status === 503) return { status: { state: "unavailable" }, entries };
    if (res.status === 409) return { status: { state: "deferred", reason: "account_changed" }, entries };
    if (!res.ok) {
      return { status: { state: "error", message: `HTTP ${res.status}` }, entries };
    }
    const json = (await res.json()) as SyncResponse<T>;
    if (!json || !Array.isArray(json.entries) ||
      !Number.isFinite(json.merged) || json.merged < 0 ||
      !Number.isFinite(json.total) || json.total < 0) {
      return { status: { state: "error", message: "invalid_sync_response" }, entries };
    }
    if (!(await isSyncContextCurrent(context))) {
      return { status: { state: "deferred", reason: "account_changed" }, entries };
    }
    return {
      status: { state: "ok", merged: json.merged, total: json.total },
      entries: json.entries,
    };
  } catch (err) {
    return {
      status: { state: "error", message: err instanceof Error ? err.message : "network" },
      entries,
    };
  }
}
