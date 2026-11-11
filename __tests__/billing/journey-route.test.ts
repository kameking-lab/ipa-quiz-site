// @vitest-environment node
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
const mocks = vi.hoisted(() => ({ record: vi.fn(async () => true), status: vi.fn(), identity: vi.fn() }));
vi.mock("@/lib/billing/journey", async original => ({ ...await original<typeof import("@/lib/billing/journey")>(), recordJourney: mocks.record }));
vi.mock("@/lib/billing/runtime", () => ({ billingIdentity: mocks.identity, billingRuntime: () => ({ service: { status: mocks.status } }) }));
vi.mock("@/lib/billing/subscription/config", () => ({ monthlySelected: () => false }));
import { POST } from "@/app/api/funnel/journey/route";
const row = { day: "2026-11-11", qualification: "ap", page: "quiz", offer: "none", stage: "learning", answers: 10, outcome: "unconfirmed", delta: 1 };
let ip = 0;
function request(body: unknown, headers: Record<string, string> = {}) {
  return new Request("https://www.kakomon-ai.jp/api/funnel/journey", { method: "POST", body: JSON.stringify(body), headers: {
    origin: "https://www.kakomon-ai.jp", "sec-fetch-site": "same-origin", "user-agent": "Mozilla/5.0 Safari/604.1", "x-forwarded-for": `192.0.2.${++ip}`, ...headers,
  } });
}
beforeEach(() => { vi.clearAllMocks(); mocks.identity.mockResolvedValue("fixture-user"); });
afterEach(() => { vi.unstubAllEnvs(); });
describe("aggregate journey beacon", () => {
  it("awaits aggregate writes and accepts no user or question identifiers", async () => {
    expect((await POST(request({ changes: [row] }))).status).toBe(204);
    expect(mocks.record).toHaveBeenCalledWith({ changes: [row] }, expect.any(Number));
    expect((await POST(request({ changes: [row], userId: "private" }))).status).toBe(400);
    expect(mocks.identity).not.toHaveBeenCalled();
  });
  it.each<Record<string, string>>([{ "user-agent": "Googlebot" }, { origin: "https://evil.invalid" }, { "sec-fetch-site": "cross-site" }])("ignores bots and cross-site requests", async headers => {
    expect((await POST(request({ changes: [row] }, headers))).status).toBe(204);
    expect(mocks.record).not.toHaveBeenCalled();
  });
  it("requires the existing status service to verify ownership, paid status and entitlement", async () => {
    const body = { changes: [{ ...row, outcome: "purchased", stage: "purchased" }], purchaseOrder: "fixture-order" };
    mocks.status.mockResolvedValueOnce({ entitled: false, purchase: { id: "fixture-order", status: "pending" } });
    expect((await POST(request(body))).status).toBe(403);
    mocks.status.mockResolvedValueOnce({ entitled: true, purchase: { id: "other-order", status: "paid" } });
    expect((await POST(request(body))).status).toBe(403);
    expect(mocks.record).not.toHaveBeenCalled();
    mocks.status.mockResolvedValueOnce({ entitled: true, purchase: { id: "fixture-order", status: "paid" } });
    expect((await POST(request(body))).status).toBe(204);
    expect(mocks.status).toHaveBeenLastCalledWith("fixture-user", "fixture-order");
    expect(mocks.record).toHaveBeenCalledOnce();
  });
  it("rejects purchase claims with no order or no authenticated owner", async () => {
    expect((await POST(request({ changes: [{ ...row, outcome: "purchased" }] }))).status).toBe(400);
    mocks.identity.mockRejectedValueOnce(new Error("fixture unauthenticated"));
    expect((await POST(request({ changes: [{ ...row, outcome: "purchased" }], purchaseOrder: "fixture-order" }))).status).toBe(403);
    expect(mocks.record).not.toHaveBeenCalled();
  });
  it("limits beacon volume without changing existing funnel rate limits", async () => {
    let status = 0;
    for (let i = 0; i < 21; i++) status = (await POST(request({ changes: [row] }, { "x-forwarded-for": "198.51.100.240" }))).status;
    expect(status).toBe(429);
  });
});
