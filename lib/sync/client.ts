"use client";

import type { SyncResponse } from "./types";

export type SyncStatus =
  | { state: "ok"; merged: number; total: number }
  | { state: "unauthenticated" } // 401 — not signed in, stay local-only
  | { state: "unavailable" } // 503 — DB not provisioned
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
): Promise<{ status: SyncStatus; entries: T[] }> {
  try {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ entries }),
    });
    if (res.status === 401) return { status: { state: "unauthenticated" }, entries };
    if (res.status === 503) return { status: { state: "unavailable" }, entries };
    if (!res.ok) {
      return { status: { state: "error", message: `HTTP ${res.status}` }, entries };
    }
    const json = (await res.json()) as SyncResponse<T>;
    return {
      status: { state: "ok", merged: json.merged ?? 0, total: json.total ?? 0 },
      entries: Array.isArray(json.entries) ? json.entries : entries,
    };
  } catch (err) {
    return {
      status: { state: "error", message: err instanceof Error ? err.message : "network" },
      entries,
    };
  }
}
