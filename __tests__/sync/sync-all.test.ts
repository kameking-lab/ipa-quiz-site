import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { syncAll, readSyncMeta } from "@/lib/sync";
import { syncBookmarks } from "@/lib/sync/bookmark-sync";
import { syncCustomTags } from "@/lib/sync/custom-tag-sync";
import { syncStudyPlans } from "@/lib/sync/study-plan-sync";
import { postSync } from "@/lib/sync/client";
import { LS_KEYS } from "@/lib/storage/keys";
import type { SyncStatus } from "@/lib/sync/client";

/**
 * Characterization tests for the sync orchestrator (lib/sync/index.ts). The
 * three opt-in wrappers + postSync are exercised individually in
 * wrappers.test.ts / merge.test.ts; what syncAll adds — and what is otherwise
 * untested — is:
 *   1. readSyncMeta fail-soft parsing of LS_KEYS.syncMeta, and
 *   2. the overall-verdict precedence over the four per-type states
 *      (unauthenticated > unavailable > ok > partial > error), and
 *   3. the writeSyncMeta gate: lastSyncedAt is stamped ONLY on ok/partial,
 *      never on a fully failed sync (so a doomed sync never claims success).
 *
 * The four data-source calls are mocked so each per-type state can be driven
 * independently; the orchestration logic under test is otherwise pure.
 */

vi.mock("@/lib/sync/bookmark-sync", () => ({ syncBookmarks: vi.fn() }));
vi.mock("@/lib/sync/custom-tag-sync", () => ({ syncCustomTags: vi.fn() }));
vi.mock("@/lib/sync/study-plan-sync", () => ({ syncStudyPlans: vi.fn() }));
vi.mock("@/lib/sync/client", () => ({ postSync: vi.fn() }));

function status(state: SyncStatus["state"]): SyncStatus {
  switch (state) {
    case "ok":
      return { state: "ok", merged: 0, total: 0 };
    case "error":
      return { state: "error", message: "boom" };
    default:
      return { state };
  }
}

/** Drive each of the four per-type sync calls to a chosen state. */
function drive(
  history: SyncStatus["state"],
  bookmarks: SyncStatus["state"],
  customTags: SyncStatus["state"],
  studyPlans: SyncStatus["state"],
): void {
  // syncHistory (internal) consumes postSync's status directly.
  vi.mocked(postSync).mockResolvedValue({ status: status(history), entries: [] });
  vi.mocked(syncBookmarks).mockResolvedValue(status(bookmarks));
  vi.mocked(syncCustomTags).mockResolvedValue(status(customTags));
  vi.mocked(syncStudyPlans).mockResolvedValue(status(studyPlans));
}

beforeEach(() => {
  localStorage.clear();
  vi.spyOn(Date, "now").mockReturnValue(1_700_000_000_000);
});

afterEach(() => {
  vi.restoreAllMocks();
});

describe("readSyncMeta", () => {
  it("returns lastSyncedAt 0 when nothing is stored", () => {
    expect(readSyncMeta()).toEqual({ lastSyncedAt: 0 });
  });

  it("reads a previously stored epoch", () => {
    localStorage.setItem(LS_KEYS.syncMeta, JSON.stringify({ lastSyncedAt: 42 }));
    expect(readSyncMeta()).toEqual({ lastSyncedAt: 42 });
  });

  it("coerces a non-numeric lastSyncedAt to 0 (fail-soft)", () => {
    localStorage.setItem(LS_KEYS.syncMeta, JSON.stringify({ lastSyncedAt: "nope" }));
    expect(readSyncMeta()).toEqual({ lastSyncedAt: 0 });
  });

  it("returns 0 on malformed JSON instead of throwing", () => {
    localStorage.setItem(LS_KEYS.syncMeta, "{not json");
    expect(readSyncMeta()).toEqual({ lastSyncedAt: 0 });
  });
});

describe("syncAll overall verdict", () => {
  it('all unauthenticated → "unauthenticated" and does NOT stamp lastSyncedAt', async () => {
    drive("unauthenticated", "unauthenticated", "unauthenticated", "unauthenticated");
    const { overall } = await syncAll();
    expect(overall).toBe("unauthenticated");
    expect(readSyncMeta().lastSyncedAt).toBe(0);
  });

  it('all unavailable → "unavailable" and does NOT stamp lastSyncedAt', async () => {
    drive("unavailable", "unavailable", "unavailable", "unavailable");
    const { overall } = await syncAll();
    expect(overall).toBe("unavailable");
    expect(readSyncMeta().lastSyncedAt).toBe(0);
  });

  it('all ok → "ok" and stamps lastSyncedAt = Date.now()', async () => {
    drive("ok", "ok", "ok", "ok");
    const { overall, byType } = await syncAll();
    expect(overall).toBe("ok");
    expect(byType.history.state).toBe("ok");
    expect(readSyncMeta().lastSyncedAt).toBe(1_700_000_000_000);
  });

  it('some ok, some failed → "partial" and still stamps lastSyncedAt', async () => {
    drive("ok", "unauthenticated", "error", "unavailable");
    const { overall } = await syncAll();
    expect(overall).toBe("partial");
    expect(readSyncMeta().lastSyncedAt).toBe(1_700_000_000_000);
  });

  it('mixed non-ok failures (no ok) collapse to "error" and do NOT stamp', async () => {
    drive("unauthenticated", "unavailable", "error", "unauthenticated");
    const { overall } = await syncAll();
    expect(overall).toBe("error");
    expect(readSyncMeta().lastSyncedAt).toBe(0);
  });
});
