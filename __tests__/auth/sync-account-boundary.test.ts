// @vitest-environment node
import { beforeEach, afterEach, describe, expect, it, vi } from "vitest";
const mocks = vi.hoisted(() => ({
  auth: vi.fn(),
  history: { findMany: vi.fn(), createMany: vi.fn() },
  bookmarks: { findMany: vi.fn(), upsert: vi.fn() },
  tags: { findMany: vi.fn(), upsert: vi.fn() },
  plans: { findMany: vi.fn(), findUnique: vi.fn(), create: vi.fn(), update: vi.fn() },
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
    const model = _name === "history" ? mocks.history : _name === "bookmarks" ? mocks.bookmarks : _name === "tags" ? mocks.tags : mocks.plans;
    expect(model.findMany.mock.calls[0][0].where).toEqual({ userId: "authenticated-A" });
  });
});
