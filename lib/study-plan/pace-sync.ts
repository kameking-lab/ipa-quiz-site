"use client";

import { LS_KEYS } from "@/lib/storage/keys";
import { readOwnership, readSyncAccount } from "@/lib/sync/ownership";
import type { StudyPlanSyncEntry } from "@/lib/sync/types";
import { getPaceSyncEntries, mergePaceSyncEntries } from "./pace-storage";

/** Auto-sync only this feature's data. Does not opt older history/bookmarks into cloud sync. */
export async function syncPacePlans(readAccount = readSyncAccount): Promise<"ok" | "local-only" | "retry"> {
  try {
    const account = await readAccount();
    if (!account) return "local-only";
    const owner = localStorage.getItem(LS_KEYS.paceSyncOwner);
    if ((owner && owner !== account.id) || readOwnership(account.id) === "different") return "local-only";
    if (!owner) {
      if (readAccount !== readSyncAccount) {
        // A shared display lookup cannot claim an unowned plan after an account switch.
        if ((await readSyncAccount())?.id !== account.id) return "local-only";
        const currentOwner = localStorage.getItem(LS_KEYS.paceSyncOwner);
        if ((currentOwner && currentOwner !== account.id) || readOwnership(account.id) === "different") return "local-only";
      }
      localStorage.setItem(LS_KEYS.paceSyncOwner, account.id);
    }
    const stillOwned = async () => localStorage.getItem(LS_KEYS.paceSyncOwner) === account.id && readOwnership(account.id) !== "different" &&
      (await readSyncAccount())?.id === account.id;
    async function exchange(entries: StudyPlanSyncEntry[]): Promise<StudyPlanSyncEntry[]> {
      const response = await fetch("/api/account/study-plan-sync", { method: "POST", credentials: "same-origin",
        headers: { "Content-Type": "application/json" }, body: JSON.stringify({ entries, expectedUserId: account!.id, includePace: true }) });
      if (!response.ok) throw new Error("sync_unavailable");
      const body: unknown = await response.json();
      if (!body || typeof body !== "object" || !("entries" in body) || !Array.isArray(body.entries)) throw new Error("invalid_sync");
      return body.entries.filter((entry: unknown): entry is StudyPlanSyncEntry => !!entry && typeof entry === "object" &&
        "id" in entry && typeof entry.id === "string" && "updatedAt" in entry && typeof entry.updatedAt === "number" && "payload" in entry);
    }
    // Read before upload: union immutable actions before the existing LWW endpoint writes a row.
    const remote = await exchange([]);
    if (!(await stillOwned())) return "local-only";
    mergePaceSyncEntries(remote);
    const entries = getPaceSyncEntries();
    // The existing API accepts 50 entries/request; tombstones also stay syncable.
    for (let offset = 0; offset < entries.length; offset += 50) {
      if (!(await stillOwned())) return "local-only";
      const result = await exchange(entries.slice(offset, offset + 50));
      if (!(await stillOwned())) return "local-only";
      mergePaceSyncEntries(result);
    }
    return "ok";
  } catch { return "retry"; }
}
/** No toast, consent checkbox, or additional button. Offline writes stay local. */
export function startPaceAutoSync(readAccount = readSyncAccount): () => void {
  let timer: ReturnType<typeof setTimeout> | undefined;
  let running = false, disposed = false, dirty = false;
  const schedule = () => {
    dirty = true;
    if (disposed || running || timer) return;
    timer = setTimeout(() => { timer = undefined; void run(); }, 2000);
  };
  const run = async () => {
    if (disposed || running || navigator.onLine === false) return;
    running = true; dirty = false;
    try { await syncPacePlans(readAccount); } finally { running = false; if (dirty) schedule(); }
  };
  window.addEventListener("study-plan:changed", schedule);
  window.addEventListener("focus", schedule);
  window.addEventListener("online", schedule);
  schedule();
  return () => { disposed = true; if (timer) clearTimeout(timer);
    window.removeEventListener("study-plan:changed", schedule); window.removeEventListener("focus", schedule); window.removeEventListener("online", schedule); };
}
