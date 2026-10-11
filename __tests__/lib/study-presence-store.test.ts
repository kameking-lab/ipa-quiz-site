import { beforeEach, expect, it, vi } from "vitest";
const db = vi.hoisted(() => ({ $executeRaw: vi.fn(), $queryRaw: vi.fn(), $transaction: vi.fn() }));
vi.mock("@/lib/db/prisma", () => ({ prisma: db }));
import { readStudyPresence, recordStudyPresence } from "@/lib/study-presence-store";
const id = "00000000-0000-4000-8000-000000000001";
beforeEach(() => { vi.clearAllMocks(); db.$executeRaw.mockResolvedValue(1); db.$queryRaw.mockResolvedValue([]); db.$transaction.mockImplementation(ops => Promise.all(ops)); });
it("uses one existing hashed browser key for all exams, never a browser/exam composite", async () => {
  await recordStudyPresence(id, 0, "fe"); await recordStudyPresence(id, 0, "ap");
  const [first, second] = db.$executeRaw.mock.calls.filter(call => call[0].join("").includes("INSERT"));
  expect(first[1]).toMatch(/^[a-f0-9]{64}$/); expect(second[1]).toBe(first[1]); expect(first[1]).not.toBe(id);
  expect(first[0].join("")).toContain('ON CONFLICT ("id") DO UPDATE');
  expect(first[0].join("")).toContain('"exam" = EXCLUDED."exam"');
  expect(first[0].join("")).toContain('"StudyPresence"."lastSeenAt" < EXCLUDED."lastSeenAt"');
});
it("counts only qualified rows inside the two-minute window and removes expiry at its boundary", async () => {
  db.$queryRaw.mockResolvedValue([{ exam: "denko2", count: 1n }, { exam: "fe", count: 2n }]);
  expect(await readStudyPresence()).toEqual({ count: 3, exams: [{ exam: "fe", count: 2 }, { exam: "denko2", count: 1 }] });
  const expire = db.$executeRaw.mock.calls[0]; const query = db.$queryRaw.mock.calls[0];
  expect(expire[0].join("")).toContain('"lastSeenAt" <= NOW()'); expect(expire[1]).toBe(120_000);
  expect(query[0].join("")).toContain('"exam" IS NOT NULL'); expect(query[0].join("")).toContain('"lastSeenAt" > NOW()'); expect(query[1]).toBe(120_000);
  expect(query[0].join("")).toContain('GROUP BY "exam"');
});
it("returns real zero from empty storage, but propagates failure", async () => {
  expect(await readStudyPresence()).toEqual({ count: 0, exams: [] });
  db.$transaction.mockRejectedValue(new Error("offline")); await expect(readStudyPresence()).rejects.toThrow("offline");
});
it("omits obsolete qualifications and rejects invalid aggregate counts", async () => {
  db.$queryRaw.mockResolvedValue([{ exam: "unknown", count: 9n }, { exam: "fe", count: 1n }]);
  expect(await readStudyPresence()).toEqual({ count: 1, exams: [{ exam: "fe", count: 1 }] });
  db.$queryRaw.mockResolvedValue([{ exam: "fe", count: 9007199254740992n }]); await expect(readStudyPresence()).rejects.toThrow("Invalid presence aggregate");
});

it("removes the old browser hash before recording a rotated daily ID in one transaction", async () => {
  await recordStudyPresence(id, 0, "fe", "00000000-0000-4000-8000-000000000099");
  const calls = db.$executeRaw.mock.calls;
  expect(calls[0][0].join("")).toContain('DELETE FROM "StudyPresence" WHERE "id" = ');
  expect(calls[0][1]).toMatch(/^[a-f0-9]{64}$/); expect(calls[1][0].join("")).toContain('INSERT');
  expect(db.$transaction).toHaveBeenCalledOnce(); expect(db.$transaction.mock.calls[0][0]).toHaveLength(4);
});
it("canonicalises safety library qualification aliases into the existing exam code", async () => {
  await recordStudyPresence(id, 0, "dai-1-shu-eisei-kanrisha");
  const insert = db.$executeRaw.mock.calls.find(call => call[0].join("").includes("INSERT"));
  expect(insert?.[3]).toBe("eisei1");
});
