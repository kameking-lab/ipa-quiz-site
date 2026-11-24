// @vitest-environment node
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const mock = vi.hoisted(() => ({ auth: vi.fn(), lock: vi.fn(), transaction: vi.fn(), count: vi.fn(), findMany: vi.fn(), createMany: vi.fn(), updateMany: vi.fn() }));
vi.mock("@/lib/auth", () => ({ auth: mock.auth }));
vi.mock("@/lib/db/prisma", () => ({ prisma: { $transaction: mock.transaction, studyRecord: {
  findMany: mock.findMany,
  createMany: mock.createMany,
  updateMany: mock.updateMany,
} } }));

import { GET } from "@/app/api/account/history-export/route";
import { POST } from "@/app/api/account/history-sync/route";

beforeEach(() => {
  vi.resetAllMocks();
  mock.transaction.mockImplementation(work => work({ $queryRaw: mock.lock, studyRecord: {
    findMany: mock.findMany, count: mock.count, createMany: mock.createMany, updateMany: mock.updateMany,
  } }));
  mock.count.mockResolvedValue(1);
  vi.stubEnv("DATABASE_URL", "postgresql://unit-test.invalid/mock-only");
  vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error("No external requests in history tests")));
});

afterEach(() => {
  vi.unstubAllGlobals();
  vi.unstubAllEnvs();
});

function request(entries: unknown[] = [], options: object = {}) {
  return new Request("https://app.example.invalid/api/account/history-sync", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ entries, expectedUserId: "unit-user", ...options }),
  });
}

describe("account history contract with mocked auth and database", () => {
  it("reconciles a simultaneous incorrect grade even if another device inserted the correct grade first", async () => {
    const at = 1700000000000;
    const row = { questionId: "q", answeredAt: new Date(at), correct: true };
    mock.auth.mockResolvedValue({ user: { id: "unit-user" } });
    mock.findMany.mockResolvedValueOnce([row]).mockResolvedValueOnce([{ ...row, correct: false }]);
    mock.createMany.mockResolvedValue({ count: 0 });
    mock.updateMany.mockResolvedValue({ count: 1 });
    const response = await POST(request([{ id: "q", correct: false, at }]));
    expect(mock.updateMany).toHaveBeenCalledWith({ where: { userId: "unit-user", correct: true,
      OR: [{ questionId: "q", answeredAt: new Date(at) }] }, data: { correct: false } });
    expect(await response.json()).toMatchObject({ entries: [{ id: "q", correct: false, at }] });
  });
  it("accepts only the remaining new rows, still reconciles misses, and omits matching answers from a page", async () => {
    mock.auth.mockResolvedValue({ user: { id: "unit-user" } });
    const old = { id: "old", correct: false, at: 1 };
    const fresh = { id: "new", correct: true, at: 2 };
    const row = (e: typeof old) => ({ id: "row-" + e.id, questionId: e.id, answeredAt: new Date(e.at), correct: e.correct });
    mock.count.mockResolvedValue(499999);
    mock.findMany.mockResolvedValueOnce([{ ...row(old), correct: true }]).mockResolvedValueOnce([row(old), row(fresh)]);
    mock.updateMany.mockResolvedValue({ count: 1 });
    mock.createMany.mockResolvedValue({ count: 1 });
    const result = await POST(request([old, fresh, fresh, { ...fresh, id: "overflow" }], { historyPage: {} }));
    expect(await result.json()).toEqual({ entries: [], nextCursor: null, merged: 2, total: 2, limitReached: true });
    expect(mock.createMany.mock.calls[0][0].data).toHaveLength(1);
    expect(mock.count).toHaveBeenCalledWith({ where: { userId: "unit-user" }, take: 500000 });
  });

  it("rejects excessive rows and streamed bytes before a DB call", async () => {
    mock.auth.mockResolvedValue({ user: { id: "unit-user" } });
    expect((await POST(request(Array(257).fill({}), { historyPage: {} }))).status).toBe(413);
    expect((await POST(request(Array(200001).fill(null)))).status).toBe(413);
    expect((await POST(request(["x".repeat(8 * 1024 * 1024)]))).status).toBe(413);
    expect(mock.transaction).not.toHaveBeenCalled();
    expect(mock.findMany).not.toHaveBeenCalled();
  });

  it("breaks a page at the byte budget and skips all writes on continuation", async () => {
    mock.auth.mockResolvedValue({ user: { id: "unit-user" } });
    const rows = Array.from({ length: 4 }, (_, i) => ({
      id: "row-" + i, questionId: "長".repeat(30000) + i, answeredAt: new Date(i), correct: true,
    }));
    mock.findMany.mockResolvedValueOnce(rows);
    const result = await POST(request([], { historyPage: {} }));
    const text = await result.text();
    expect(Buffer.byteLength(text)).toBeLessThan(256 * 1024 + 1024);
    expect(JSON.parse(text)).toMatchObject({ total: 2, nextCursor: { at: 1, rowId: "row-1" } });
    mock.findMany.mockResolvedValueOnce(rows.slice(2));
    const end = await POST(request([{ id: "local", correct: true, at: 11 }], { historyPage: { cursor: JSON.parse(text).nextCursor } }));
    expect(await end.json()).toMatchObject({ total: 2, nextCursor: null });
    expect(mock.transaction).not.toHaveBeenCalled();
  });

  it("streams the entire legacy reply and export in stable pages, including a timestamp tie", async () => {
    mock.auth.mockResolvedValue({ user: { id: "unit-user", plan: "free" } });
    const rows = Array.from({ length: 257 }, (_, i) => ({
      id: String(i).padStart(4, "0"), questionId: "q" + i, answeredAt: new Date(10), correct: true,
    }));
    for (const legacy of [true, false]) {
      mock.findMany.mockResolvedValueOnce(rows).mockResolvedValueOnce(rows.slice(256));
      const response = legacy ? await POST(request()) : await GET();
      const body = await response.json();
      expect(body.entries.map((e: { id: string }) => e.id)).toEqual(rows.map(row => row.questionId));
      if (legacy) expect(body).toMatchObject({ merged: 0, total: 257 });
      else {
        expect(response.headers.get("content-disposition")).toContain("attachment");
        expect(body.user).toEqual({ id: "unit-user", plan: "free" });
      }
      expect(mock.findMany.mock.lastCall?.[0]).toMatchObject({ where: { userId: "unit-user", OR: [
        { answeredAt: { gt: new Date(10) } }, { answeredAt: new Date(10), id: { gt: "0255" } },
      ] }, take: 257 });
    }
  });

  it.each([null, { message: "Configuration error" }, { user: {} }])(
    "rejects missing user IDs without touching history",
    async (session) => {
      mock.auth.mockResolvedValue(session);
      const response = await POST(request());
      expect(response.status).toBe(401);
      expect(mock.findMany).not.toHaveBeenCalled();
      expect(mock.createMany).not.toHaveBeenCalled();
    },
  );

  it("retains the existing history and scopes new rows to the authenticated user", async () => {
    const oldAt = 1700000000000;
    const newAt = oldAt + 1000;
    mock.auth.mockResolvedValue({ user: { id: "unit-user" } });
    mock.findMany
      .mockResolvedValueOnce([{ questionId: "old-question", answeredAt: new Date(oldAt) }])
      .mockResolvedValueOnce([
        { questionId: "old-question", correct: true, answeredAt: new Date(oldAt) },
        { questionId: "new-question", correct: false, answeredAt: new Date(newAt) },
      ]);
    mock.createMany.mockResolvedValue({ count: 1 });

    const response = await POST(request([
      { id: "old-question", correct: true, at: oldAt },
      { id: "new-question", correct: false, at: newAt, userId: "ignored-client-user" },
    ]));

    expect(mock.createMany).toHaveBeenCalledWith({
      data: [{ userId: "unit-user", questionId: "new-question", correct: false, answeredAt: new Date(newAt) }],
      skipDuplicates: true,
    });
    expect(mock.lock.mock.invocationCallOrder[0]).toBeLessThan(mock.findMany.mock.invocationCallOrder[0]);
    expect(mock.transaction).toHaveBeenCalledWith(expect.any(Function), { isolationLevel: "ReadCommitted" });
    expect(await response.json()).toEqual({
      entries: [
        { id: "old-question", correct: true, at: oldAt },
        { id: "new-question", correct: false, at: newAt },
      ],
      merged: 1,
      total: 2,
    });
    for (const [query] of mock.findMany.mock.calls) {
      expect(query.where.userId).toBe("unit-user");
      expect(query.take).toBeLessThanOrEqual(257);
    }
    expect(fetch).not.toHaveBeenCalled();
  });
});
