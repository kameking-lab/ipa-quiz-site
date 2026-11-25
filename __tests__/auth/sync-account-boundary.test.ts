// @vitest-environment node
import { beforeEach, afterEach, describe, expect, it, vi } from "vitest";
const mocks = vi.hoisted(() => ({
  auth: vi.fn(),
  history: { findMany: vi.fn(), createMany: vi.fn() },
  bookmarks: { findMany: vi.fn(), upsert: vi.fn() },
  tags: { findMany: vi.fn(), upsert: vi.fn() },
  plans: { findMany: vi.fn(), findUnique: vi.fn(), create: vi.fn(), updateMany: vi.fn() },
}));
vi.mock("@/lib/auth", () => ({ auth: mocks.auth }));
vi.mock("@/lib/db/prisma", () => ({ prisma: {
  studyRecord: mocks.history, bookmark: mocks.bookmarks, customTag: mocks.tags, studyPlan: mocks.plans,
} }));
import { POST as history } from "@/app/api/account/history-sync/route";
import { POST as bookmarks } from "@/app/api/account/bookmark-sync/route";
import { POST as tags } from "@/app/api/account/custom-tag-sync/route";
import { POST as plans } from "@/app/api/account/study-plan-sync/route";
beforeEach(() => {
  vi.resetAllMocks();
  vi.stubEnv("DATABASE_URL", "postgresql://unit.invalid/mock-only");
  mocks.auth.mockResolvedValue({ user: { id: "authenticated-A" } });
  for (const model of [mocks.history, mocks.bookmarks, mocks.tags, mocks.plans]) model.findMany.mockResolvedValue([]);
});
describe("study plan format compatibility", () => {
  it.each([1, 0])("preserves weekdays on an old-client write and guards concurrent edits (count=%i)", async count => {
    const oldClientPayload = { kind: "exam-pace-v1", exam: "ip", examDate: "2026-11-27" };
    const updatedAt = new Date(2000);
    mocks.plans.findMany.mockResolvedValueOnce([{ id: "pace", updatedAt, payload: {
      ...oldClientPayload, examDate: "2026-11-26", studyWeekdays: [1, 3, 5],
    } }]);
    mocks.plans.updateMany.mockResolvedValue({ count });
    const response = await plans(request({ entries: [{ id: "pace", payload: oldClientPayload, updatedAt: 3000 }],
      expectedUserId: "authenticated-A", includePace: true }));
    expect(response.status).toBe(count > 0 ? 200 : 409);
    expect(mocks.plans.updateMany).toHaveBeenCalledWith({
      where: { id: "pace", userId: "authenticated-A", updatedAt },
      data: expect.objectContaining({ payload: { ...oldClientPayload, studyWeekdays: [1, 3, 5] } }),
    });
  });
  it.each([false, true])("only returns tagged pace/activity rows to a supporting client (%s)", async includePace => {
    const row = { createdAt: new Date(1000), updatedAt: new Date(2000), progress: null };
    mocks.plans.findMany.mockResolvedValue([
      { ...row, id: "legacy", payload: { daily: [] } },
      { ...row, id: "pace", payload: { kind: "exam-pace-v1" } },
      { ...row, id: "activity", payload: { kind: "study-activity-v1" } },
    ]);
    const response = await plans(request({ entries: [], expectedUserId: "authenticated-A", ...(includePace ? { includePace } : {}) }));
    const body = await response.json();
    expect(body.entries.map((entry: { id: string }) => entry.id)).toEqual(includePace ? ["legacy", "pace", "activity"] : ["legacy"]);
    expect(body.total).toBe(includePace ? 3 : 1);
  });
});
afterEach(() => vi.unstubAllEnvs());
const request = (body: unknown) => new Request("https://unit.invalid/sync", {
  method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body),
});
describe.each([["history", history], ["bookmarks", bookmarks], ["tags", tags], ["plans", plans]] as const)("%s account boundary", (_name, handler) => {
  it.each([
    [{ entries: [] }, 400],
    [{ entries: [], expectedUserId: "other-B" }, 409],
    [null, 400],
  ] as const)("rejects invalid or switched expected account before any database access", async (body, status) => {
    expect((await handler(request(body))).status).toBe(status);
    for (const model of [mocks.history, mocks.bookmarks, mocks.tags, mocks.plans]) {
      for (const fn of Object.values(model)) expect(fn).not.toHaveBeenCalled();
    }
  });
  it("reads only the authenticated account, ignoring client owner fields", async () => {
    const response = await handler(request({ entries: [], expectedUserId: "authenticated-A", userId: "other-B" }));
    expect(response.status).toBe(200);
    await response.json(); // The legacy history reader pulls pages as the body is consumed.
    const model = _name === "history" ? mocks.history : _name === "bookmarks" ? mocks.bookmarks : _name === "tags" ? mocks.tags : mocks.plans;
    expect(model.findMany.mock.calls[0][0].where).toEqual({ userId: "authenticated-A" });
  });
});
