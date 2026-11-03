import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { syncAll, readSyncMeta } from "@/lib/sync";
import { syncBookmarks } from "@/lib/sync/bookmark-sync";
import { syncCustomTags } from "@/lib/sync/custom-tag-sync";
import { syncStudyPlans } from "@/lib/sync/study-plan-sync";
import { postSync, type SyncStatus } from "@/lib/sync/client";
import { LS_KEYS } from "@/lib/storage/keys";

vi.mock("@/lib/sync/bookmark-sync", () => ({ syncBookmarks: vi.fn() }));
vi.mock("@/lib/sync/custom-tag-sync", () => ({ syncCustomTags: vi.fn() }));
vi.mock("@/lib/sync/study-plan-sync", () => ({ syncStudyPlans: vi.fn() }));
vi.mock("@/lib/sync/client", () => ({ postSync: vi.fn() }));
const USER = "user-a";
const metaKey = LS_KEYS.syncMetaUserPrefix + USER;
function status(state: SyncStatus["state"]): SyncStatus {
  if (state === "ok") return { state, merged: 0, total: 0 };
  if (state === "error") return { state, message: "boom" };
  if (state === "deferred") return { state, reason: "account_changed" };
  return { state };
}
function drive(...states: [SyncStatus["state"], SyncStatus["state"], SyncStatus["state"], SyncStatus["state"]]) {
  vi.mocked(postSync).mockResolvedValue({ status: status(states[0]), entries: [] });
  vi.mocked(syncBookmarks).mockResolvedValue(status(states[1]));
  vi.mocked(syncCustomTags).mockResolvedValue(status(states[2]));
  vi.mocked(syncStudyPlans).mockResolvedValue(status(states[3]));
}
beforeEach(() => {
  vi.clearAllMocks();
  localStorage.clear();
  localStorage.setItem(LS_KEYS.syncLocalOwner, JSON.stringify({ userId: USER, token: "owner-token" }));
  vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: true, json: async () => ({ user: { id: USER } }) }));
  vi.spyOn(Date, "now").mockReturnValue(1_700_000_000_000);
});
afterEach(() => { vi.restoreAllMocks(); vi.unstubAllGlobals(); });
describe("user-scoped completion metadata", () => {
  it("ignores old browser-global metadata and other users", () => {
    localStorage.setItem(LS_KEYS.syncMeta, JSON.stringify({ lastSyncedAt: 42 }));
    localStorage.setItem(metaKey, JSON.stringify({ lastSyncedAt: 84 }));
    expect(readSyncMeta()).toEqual({ lastSyncedAt: 0 });
    expect(readSyncMeta("user-b")).toEqual({ lastSyncedAt: 0 });
    expect(readSyncMeta(USER)).toEqual({ lastSyncedAt: 84 });
  });
  it.each(['{"lastSyncedAt":"nope"}', "{broken"])("fails soft on invalid metadata", (raw) => {
    localStorage.setItem(metaKey, raw);
    expect(readSyncMeta(USER).lastSyncedAt).toBe(0);
  });
  it.each([
    ["unauthenticated", "unauthenticated", "unauthenticated", "unauthenticated", "unauthenticated"],
    ["unavailable", "unavailable", "unavailable", "unavailable", "unavailable"],
    ["ok", "ok", "ok", "ok", "ok"],
    ["ok", "unauthenticated", "error", "unavailable", "partial"],
    ["unauthenticated", "unavailable", "error", "unauthenticated", "error"],
    ["ok", "deferred", "ok", "ok", "deferred"],
  ] as const)("reports %s/%s/%s/%s as %s", async (a, b, c, d, expected) => {
    drive(a, b, c, d);
    const result = await syncAll();
    expect(result.overall).toBe(expected);
    expect(readSyncMeta(USER).lastSyncedAt).toBe(expected === "ok" ? 1_700_000_000_000 : 0);
    expect(syncBookmarks).toHaveBeenCalledWith({ userId: USER, ownerToken: "owner-token" });
  });
  it("defers all uploads for unknown or other ownership", async () => {
    drive("ok", "ok", "ok", "ok");
    localStorage.removeItem(LS_KEYS.syncLocalOwner);
    expect((await syncAll()).overall).toBe("deferred");
    localStorage.setItem(LS_KEYS.syncLocalOwner, JSON.stringify({ userId: "user-b", token: "b" }));
    expect((await syncAll({ expectedUserId: USER, confirmUnowned: true })).overall).toBe("deferred");
    expect(postSync).not.toHaveBeenCalled();
    expect(syncBookmarks).not.toHaveBeenCalled();
  });
  it("does not stamp completion when session changes while wrappers finish", async () => {
    drive("ok", "ok", "ok", "ok");
    vi.mocked(syncBookmarks).mockImplementationOnce(async () => {
      vi.mocked(fetch).mockResolvedValue({ ok: true, json: async () => ({ user: { id: "user-b" } }) } as Response);
      return status("ok");
    });
    expect((await syncAll()).overall).toBe("deferred");
    expect(readSyncMeta(USER).lastSyncedAt).toBe(0);
  });
});
