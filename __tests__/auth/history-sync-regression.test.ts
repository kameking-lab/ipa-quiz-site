// @vitest-environment node
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const mock = vi.hoisted(() => ({ auth: vi.fn(), findMany: vi.fn(), createMany: vi.fn() }));
vi.mock("@/lib/auth", () => ({ auth: mock.auth }));
vi.mock("@/lib/db/prisma", () => ({ prisma: { studyRecord: {
  findMany: mock.findMany,
  createMany: mock.createMany,
} } }));

import { POST } from "@/app/api/account/history-sync/route";

beforeEach(() => {
  vi.resetAllMocks();
  vi.stubEnv("DATABASE_URL", "postgresql://unit-test.invalid/mock-only");
  vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error("No external requests in history tests")));
});

afterEach(() => {
  vi.unstubAllGlobals();
  vi.unstubAllEnvs();
});

function request(entries: unknown[] = []) {
  return new Request("https://app.example.invalid/api/account/history-sync", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ entries }),
  });
}

describe("account history contract with mocked auth and database", () => {
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
    for (const [query] of mock.findMany.mock.calls) expect(query.where).toEqual({ userId: "unit-user" });
    expect(await response.json()).toEqual({
      entries: [
        { id: "old-question", correct: true, at: oldAt },
        { id: "new-question", correct: false, at: newAt },
      ],
      merged: 1,
      total: 2,
    });
    expect(fetch).not.toHaveBeenCalled();
  });
});
