import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
const record = vi.hoisted(() => vi.fn());
vi.mock("@/lib/study-presence-store", () => ({ recordStudyPresence: record }));
import { POST } from "@/app/api/stats/study-presence/route";
const id = "00000000-0000-4000-8000-000000000001";
const req = (body: unknown = { visitorId: id, idleMs: 20_000 }, origin = "https://www.kakomon-ai.jp") => new Request("https://www.kakomon-ai.jp/api/stats/study-presence", {
  method: "POST", headers: { Origin: origin, "Content-Type": "application/json" }, body: JSON.stringify(body),
});
beforeEach(() => { vi.stubEnv("DATABASE_URL", "postgresql://test"); record.mockReset(); });
afterEach(() => vi.unstubAllEnvs());
describe("presence endpoint", () => {
  it("uses server aggregation and returns an uncached count", async () => {
    record.mockResolvedValue(3);
    const response = await POST(req());
    expect(await response.json()).toEqual({ count: 3 });
    expect(record).toHaveBeenCalledWith(id, 20_000);
    expect(response.headers.get("cache-control")).toBe("no-store");
  });
  it("rejects cross-origin requests before recording presence", async () => {
    expect((await POST(req(undefined, "https://other.example"))).status).toBe(403);
    expect(record).not.toHaveBeenCalled();
  });
  it.each([{ visitorId: "fake", idleMs: 0 }, { visitorId: id, idleMs: -1 }, { visitorId: id, idleMs: 120_000 }])("rejects invalid session or activity data", async body => {
    expect((await POST(req(body))).status).toBe(400);
    expect(record).not.toHaveBeenCalled();
  });
  it("does not invent a zero when storage is unavailable", async () => {
    record.mockRejectedValue(new Error("unavailable"));
    const response = await POST(req());
    expect(response.status).toBe(503);
    expect(await response.json()).toEqual({ count: null });
  });
});
