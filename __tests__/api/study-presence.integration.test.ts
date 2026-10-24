import { afterEach, beforeEach, expect, it, vi } from "vitest";
const db = vi.hoisted(() => ({ $queryRaw: vi.fn(), $executeRaw: vi.fn(), $transaction: vi.fn() }));
vi.mock("@/lib/db/prisma", () => ({ prisma: db }));
let GET: typeof import("@/app/api/stats/study-presence/route").GET;
let POST: typeof import("@/app/api/stats/study-presence/route").POST;
const url = "https://presence.example/api/stats/study-presence";
beforeEach(async () => {
  vi.resetModules(); vi.useFakeTimers(); vi.setSystemTime(new Date("2026-10-23T10:00:00Z"));
  vi.stubEnv("DATABASE_URL", "postgresql://test"); vi.stubEnv("NODE_ENV", "production"); vi.stubEnv("VERCEL_ENV", "production");
  db.$queryRaw.mockReset().mockResolvedValue([]); db.$executeRaw.mockReset().mockResolvedValue(1);
  db.$transaction.mockReset().mockImplementation(ops => Promise.all(ops));
  ({ GET, POST } = await import("@/app/api/stats/study-presence/route"));
});
afterEach(() => { vi.useRealTimers(); vi.unstubAllEnvs(); });
it("runs GET through the real store and preserves a zero snapshot timestamp without any DB write", async () => {
  const first = await (await GET(new Request(url))).json();
  expect(first).toMatchObject({ status: "measured", count: 0, total: 0, exams: [], windowSeconds: 300 });
  vi.advanceTimersByTime(45_000);
  expect(await (await GET(new Request(url))).json()).toEqual(first);
  expect(db.$queryRaw).toHaveBeenCalledOnce(); expect(db.$executeRaw).not.toHaveBeenCalled(); expect(db.$transaction).not.toHaveBeenCalled();
  expect(db.$queryRaw.mock.calls[0][1]).toBe(300_000);
});
it("suppresses store work across GET and heartbeat after a DB failure then recovers with real zero", async () => {
  db.$queryRaw.mockRejectedValueOnce(new Error("database offline"));
  expect((await GET(new Request(url))).status).toBe(503);
  const heartbeat = () => new Request(url, { method: "POST", headers: { Origin: "https://presence.example", "Content-Type": "application/json" },
    body: JSON.stringify({ visitorId: "00000000-0000-4000-8000-000000000001", idleMs: 0, exam: "fe" }) });
  expect((await POST(heartbeat())).headers.get("retry-after")).toBe("90");
  expect(db.$executeRaw).not.toHaveBeenCalled(); expect(db.$queryRaw).toHaveBeenCalledOnce();
  vi.advanceTimersByTime(90_000);
  expect(await (await GET(new Request(url))).json()).toMatchObject({ status: "measured", count: 0, exams: [] });
});
