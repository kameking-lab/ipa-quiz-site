// @vitest-environment node
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { journeyBody, readJourney, recordJourney } from "@/lib/billing/journey";
const row = { day: "2026-11-11", qualification: "ap", page: "quiz" as const, offer: "none" as const, stage: "learning" as const, answers: 10, outcome: "unconfirmed" as const, delta: 1 as const };
const now = Date.parse("2026-11-11T03:00:00Z");
const fetcher = vi.fn();
beforeEach(() => {
  vi.stubEnv("KV_REST_API_URL", "https://fixture.invalid"); vi.stubEnv("KV_REST_API_TOKEN", "public-test-token");
  fetcher.mockReset(); vi.stubGlobal("fetch", fetcher);
});
afterEach(() => { vi.unstubAllEnvs(); vi.unstubAllGlobals(); });
describe("anonymous aggregate storage", () => {
  it("accepts only bounded, enumerated aggregate dimensions", () => {
    expect(journeyBody.safeParse({ changes: [row] }).success).toBe(true);
    for (const change of [{ ...row, email: "private" }, { ...row, qualification: "private" }, { ...row, page: "/q/ap" }, { ...row, answers: -1 }, { ...row, delta: 4 }]) {
      expect(journeyBody.safeParse({ changes: [change] }).success).toBe(false);
    }
  });
  it("writes only daily aggregate hashes atomically and expires them; never stores the order", async () => {
    fetcher.mockResolvedValue(Response.json([{ result: 1 }]));
    expect(await recordJourney({ changes: [row, { ...row, delta: -1 }, { ...row, outcome: "purchased" }], purchaseOrder: "fixture-order" }, now)).toBe(true);
    const commands = JSON.parse(fetcher.mock.calls[0][1].body);
    expect(commands[0].slice(0, 4)).toEqual(["EVAL", expect.stringContaining("HINCRBY"), "1", "funnel:journey:v1:2026-11-11"]);
    expect(commands[0].at(-1)).toBe(String(95 * 86400));
    expect(JSON.stringify(commands)).not.toContain("fixture-order");
    expect(JSON.stringify(commands)).not.toMatch(/SADD|visitor|userId|sessionId/);
  });
  it("does not accept arbitrary old/future days", async () => {
    expect(await recordJourney({ changes: [{ ...row, day: "2026-11-01" }] }, now)).toBe(false);
    expect(await recordJourney({ changes: [{ ...row, day: "2026-11-12" }] }, now)).toBe(false);
    expect(fetcher).not.toHaveBeenCalled();
  });
  it("does not treat HTTP 200 Redis errors as successful writes", async () => {
    fetcher.mockResolvedValue(Response.json([{ error: "fixture error" }]));
    expect(await recordJourney({ changes: [row] }, now)).toBe(false);
  });
  it("reads summed answers and sessions without any individual records", async () => {
    fetcher.mockResolvedValue(Response.json([{ result: ["ap|purchased|billing_success|quiz|purchased|sessions", "2", "ap|purchased|billing_success|quiz|purchased|answers", "15"] }]));
    expect(await readJourney(1, now)).toMatchObject({ available: true, consistent: true, rows: [{ sessions: 2, answers: 15, qualification: "ap" }] });
    expect(JSON.parse(fetcher.mock.calls[0][1].body)).toEqual([["HGETALL", "funnel:journey:v1:2026-11-11"]]);
  });
  it("flags lost difference updates instead of presenting negative averages", async () => {
    fetcher.mockResolvedValue(Response.json([{ result: ["ap|unconfirmed|quiz|none|learning|sessions", "-1"] }]));
    expect(await readJourney(1, now)).toMatchObject({ available: true, consistent: false });
  });
  it("distinguishes empty data, missing KV and failed reads", async () => {
    fetcher.mockResolvedValueOnce(Response.json([{ result: [] }]));
    expect(await readJourney(1, now)).toEqual({ available: true, consistent: true, rows: [] });
    fetcher.mockResolvedValueOnce(Response.json([{ error: "fixture error" }]));
    expect((await readJourney(1, now)).available).toBe(false);
    vi.stubEnv("KV_REST_API_URL", ""); expect((await readJourney(1, now)).available).toBe(false);
  });
});
