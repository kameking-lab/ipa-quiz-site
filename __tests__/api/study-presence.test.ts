import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
const { record, read } = vi.hoisted(() => ({ record: vi.fn(), read: vi.fn() }));
vi.mock("@/lib/study-presence-store", () => ({ recordStudyPresence: record, readStudyPresence: read }));
import { GET, POST } from "@/app/api/stats/study-presence/route";
const id = "00000000-0000-4000-8000-000000000001";
const data = { count: 3, exams: [{ exam: "fe", count: 2 }, { exam: "denko2", count: 1 }] };
const body = { visitorId: id, idleMs: 20_000, exam: "fe" };
const req = (value: unknown = body, origin = "https://www.kakomon-ai.jp", extra = {}) => new Request("https://www.kakomon-ai.jp/api/stats/study-presence", {
  method: "POST", headers: { Origin: origin, "Content-Type": "application/json", ...extra }, body: JSON.stringify(value),
});
beforeEach(() => { vi.stubEnv("DATABASE_URL", "postgresql://test"); vi.stubEnv("NODE_ENV", "production"); vi.stubEnv("VERCEL_ENV", "production"); record.mockReset(); read.mockReset(); });
afterEach(() => vi.unstubAllEnvs());
describe("presence endpoint", () => {
  it("returns only uncached qualification counts from storage", async () => {
    record.mockResolvedValue(data);
    const response = await POST(req());
    expect(await response.json()).toEqual(data);
    expect(record).toHaveBeenCalledWith(id, 20_000, "fe", undefined);
    expect(response.headers.get("cache-control")).toBe("no-store");
  });
  it("reads a home snapshot without recording the visitor", async () => {
    read.mockResolvedValue(data);
    const response = await GET(new Request("https://www.kakomon-ai.jp/api/stats/study-presence"));
    expect(await response.json()).toEqual(data); expect(record).not.toHaveBeenCalled();
  });
  it("keeps a measured zero distinct from unavailable data", async () => {
    read.mockResolvedValue({ count: 0, exams: [] });
    expect(await (await GET(new Request("https://www.kakomon-ai.jp/api/stats/study-presence"))).json()).toEqual({ count: 0, exams: [] });
    read.mockRejectedValue(new Error("offline"));
    expect(await (await GET(new Request("https://www.kakomon-ai.jp/api/stats/study-presence"))).json()).toEqual({ count: null, exams: null });
  });
  it("rejects cross-origin requests", async () => {
    expect((await POST(req(undefined, "https://other.example"))).status).toBe(403); expect(record).not.toHaveBeenCalled();
  });
  it.each(["Googlebot", "HeadlessChrome", "Playwright", "ipa-quiz-cron-health-check/1.0"])("excludes known automation: %s", async userAgent => {
    expect((await POST(req(body, undefined, { "user-agent": userAgent }))).status).toBe(403); expect(record).not.toHaveBeenCalled();
  });
  it.each([{ ...body, visitorId: "fake" }, { ...body, idleMs: -1 }, { ...body, idleMs: 120_000 }, { ...body, exam: "unknown" }, { ...body, exam: null }, { visitorId: id, idleMs: 0 }])("rejects invalid/legacy unqualified heartbeats", async value => {
    expect((await POST(req(value))).status).toBe(400); expect(record).not.toHaveBeenCalled();
  });
  it.each(["preview", "development"])("does not record %s deployments", async env => {
    vi.stubEnv("VERCEL_ENV", env);
    expect((await POST(req())).status).toBe(503); expect(record).not.toHaveBeenCalled();
  });
  it("excludes local/test servers even when they have DB access", async () => {
    vi.stubEnv("NODE_ENV", "test"); expect((await POST(req())).status).toBe(503);
    vi.stubEnv("NODE_ENV", "production");
    expect((await GET(new Request("http://127.0.0.1:3000/api/stats/study-presence"))).status).toBe(503);
    expect(read).not.toHaveBeenCalled(); expect(record).not.toHaveBeenCalled();
  });
  it("does not invent a zero on storage or migration failure", async () => {
    record.mockRejectedValue(new Error("missing exam column"));
    const response = await POST(req()); expect(response.status).toBe(503);
    expect(await response.json()).toEqual({ count: null, exams: null });
  });
});

it("passes a rotated previous ID only for atomic cleanup", async () => {
  const previousVisitorId = "00000000-0000-4000-8000-000000000099";
  record.mockResolvedValue(data); await POST(req({ ...body, previousVisitorId }));
  expect(record).toHaveBeenCalledWith(id, 20_000, "fe", previousVisitorId);
  expect((await POST(req({ ...body, previousVisitorId: id }))).status).toBe(400);
});
