import { beforeEach, afterEach, describe, expect, it, vi } from "vitest";
import { syncHistory } from "@/lib/sync/history-sync";
import { syncAll, readSyncMeta } from "@/lib/sync";
import { beginSync, readOwnership } from "@/lib/sync/ownership";
import { LS_KEYS } from "@/lib/storage/keys";

let current: string | null;
let post: ReturnType<typeof vi.fn>;
const entry = { id: "q1", at: 1000, selected: "ア", correct: true, nativeBResult: { score: 80, detail: "local" } };
const data = () => JSON.parse(localStorage.getItem(LS_KEYS.history)!);
const response = (entries: unknown[], merged = 0) => ({ ok: true, status: 200, json: async () => ({ entries, merged, total: entries.length }) });
function owner(userId = "A", token = "a-token") {
  localStorage.setItem(LS_KEYS.syncLocalOwner, JSON.stringify({ userId, token }));
}
function pending<T>() {
  let resolve!: (value: T) => void;
  const promise = new Promise<T>((done) => { resolve = done; });
  return { promise, resolve };
}
beforeEach(() => {
  localStorage.clear();
  current = "A";
  owner();
  localStorage.setItem(LS_KEYS.history, JSON.stringify({ entries: [entry], starredIds: ["old-star"] }));
  localStorage.setItem(LS_KEYS.studyReward, "reward-sentinel");
  localStorage.setItem(LS_KEYS.xpState, "xp-sentinel");
  post = vi.fn().mockResolvedValue(response([]));
  vi.stubGlobal("fetch", vi.fn(async (url: string, options?: RequestInit) => {
    if (url === "/api/auth/session") return { ok: true, json: async () => current ? { user: { id: current } } : {} };
    return post(url, options);
  }));
});
afterEach(() => {
  expect(localStorage.getItem(LS_KEYS.studyReward)).toBe("reward-sentinel");
  expect(localStorage.getItem(LS_KEYS.xpState)).toBe("xp-sentinel");
  vi.unstubAllGlobals();
});
describe("history merge and account ownership", () => {
  it("retains snapshot fields, new answers, same-question attempts and latest stars", async () => {
    const flight = pending<ReturnType<typeof response>>();
    post.mockReturnValueOnce(flight.promise);
    const result = syncHistory();
    await vi.waitFor(() => expect(post).toHaveBeenCalledTimes(1));
    expect(JSON.parse(post.mock.calls[0][1].body)).toEqual({ entries: [entry], expectedUserId: "A" });
    localStorage.setItem(LS_KEYS.history, JSON.stringify({
      entries: [entry, { id: "q1", at: 2000, selected: "イ", correct: false }],
      starredIds: ["new-star"], customField: "kept",
    }));
    flight.resolve(response([{ id: "q1", at: 1000, correct: true }, { id: "cloud", at: 500, correct: false }]));
    expect((await result).state).toBe("ok");
    expect(data()).toEqual({
      entries: [{ id: "cloud", at: 500, correct: false }, entry, { id: "q1", at: 2000, selected: "イ", correct: false }],
      starredIds: ["new-star"], customField: "kept",
    });
  });
  it.each(["logout", "user", "owner"])("does not apply a response after in-flight %s change", async (change) => {
    const flight = pending<ReturnType<typeof response>>();
    post.mockReturnValueOnce(flight.promise);
    const original = localStorage.getItem(LS_KEYS.history);
    const result = syncHistory();
    await vi.waitFor(() => expect(post).toHaveBeenCalledTimes(1));
    if (change === "logout") current = null;
    if (change === "user") current = "B";
    if (change === "owner") owner("A", "new-token");
    flight.resolve(response([{ id: "cloud", at: 500, correct: false }]));
    expect((await result).state).toBe("deferred");
    expect(localStorage.getItem(LS_KEYS.history)).toBe(original);
    expect(readSyncMeta("A").lastSyncedAt).toBe(0);
  });
  it.each(["unknown", "different"])("holds all auto uploads for %s owner without changing data", async (kind) => {
    if (kind === "unknown") localStorage.removeItem(LS_KEYS.syncLocalOwner);
    else owner("B", "b-token");
    const original = localStorage.getItem(LS_KEYS.history);
    expect((await syncAll()).overall).toBe("deferred");
    expect(post).not.toHaveBeenCalled();
    expect(localStorage.getItem(LS_KEYS.history)).toBe(original);
  });
  it("imports unowned data only with consent tied to the current account", async () => {
    localStorage.removeItem(LS_KEYS.syncLocalOwner);
    expect((await syncHistory()).state).toBe("deferred");
    expect((await syncHistory({ confirmUnowned: true })).state).toBe("deferred");
    expect(post).not.toHaveBeenCalled();
    expect((await syncHistory({ expectedUserId: "A", confirmUnowned: true })).state).toBe("ok");
    expect(readOwnership("A")).toBe("matching");
    expect(data().entries).toEqual([entry]);
  });
  it("does not import into a newly switched account or override another owner", async () => {
    localStorage.removeItem(LS_KEYS.syncLocalOwner);
    current = "B";
    expect((await beginSync({ expectedUserId: "A", confirmUnowned: true })).status?.state).toBe("deferred");
    expect(localStorage.getItem(LS_KEYS.syncLocalOwner)).toBeNull();
    owner("A");
    expect((await syncAll({ expectedUserId: "B", confirmUnowned: true })).overall).toBe("deferred");
    expect(readOwnership("A")).toBe("matching");
    expect(post).not.toHaveBeenCalled();
  });
  it.each(["network", "bad-json", "bad-entries", "bad-counter"])("keeps local history on %s and permits retry", async (failure) => {
    const original = localStorage.getItem(LS_KEYS.history);
    if (failure === "network") post.mockRejectedValueOnce(new Error("offline"));
    if (failure === "bad-json") post.mockResolvedValueOnce({ ok: true, status: 200, json: async () => { throw new Error("json"); } });
    if (failure === "bad-entries") post.mockResolvedValueOnce(response([{ id: "broken" }]));
    if (failure === "bad-counter") post.mockResolvedValueOnce({ ok: true, status: 200, json: async () => ({ entries: [], total: 0 }) });
    expect((await syncHistory()).state).toBe("error");
    expect(localStorage.getItem(LS_KEYS.history)).toBe(original);
    expect((await syncHistory()).state).toBe("ok");
    expect(post).toHaveBeenCalledTimes(2);
  });
  it("stops local application for all four wrappers when the account changes", async () => {
    const flights = Array.from({ length: 4 }, () => pending<ReturnType<typeof response>>());
    post.mockImplementation(() => flights[post.mock.calls.length - 1].promise);
    const original = localStorage.getItem(LS_KEYS.history);
    const result = syncAll();
    await vi.waitFor(() => expect(post).toHaveBeenCalledTimes(4));
    for (const [, options] of post.mock.calls) expect(JSON.parse(options.body).expectedUserId).toBe("A");
    current = "B";
    flights[0].resolve(response([{ id: "cloud", at: 500, correct: false }]));
    flights[1].resolve(response([{ questionId: "ghost", tags: [], updatedAt: 1, bookmarkedAt: 1 }]));
    flights[2].resolve(response([{ name: "ghost", color: "red", sortOrder: 0, updatedAt: 1 }]));
    flights[3].resolve(response([{ id: "ghost", payload: { id: "ghost" }, updatedAt: 1 }]));
    expect((await result).overall).toBe("deferred");
    expect(localStorage.getItem(LS_KEYS.history)).toBe(original);
    expect(localStorage.getItem(LS_KEYS.bookmarks) ?? "").not.toContain("ghost");
    expect(localStorage.getItem(LS_KEYS.customTags) ?? "").not.toContain("ghost");
    expect(readSyncMeta("A").lastSyncedAt).toBe(0);
  });
});
