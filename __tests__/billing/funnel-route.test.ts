// @vitest-environment node
import { beforeEach, describe, expect, it, vi } from "vitest";
const record = vi.hoisted(() => vi.fn<(...args: unknown[]) => Promise<boolean>>(async () => true));
vi.mock("@/lib/billing/funnel", async importOriginal => ({ ...(await importOriginal<typeof import("@/lib/billing/funnel")>()), recordFunnel: record }));
import { POST } from "@/app/api/funnel/route";
import { GET } from "@/app/api/admin/funnel/billing/route";

const UA = "Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 Version/18.0 Mobile/15E148 Safari/604.1";
let ip = 0;
function beacon(body: unknown, headers: Record<string, string> = {}) {
  ip += 1;
  return new Request("https://www.kakomon-ai.jp/api/funnel", { method: "POST", body: typeof body === "string" ? body : JSON.stringify(body),
    headers: { "user-agent": UA, origin: "https://www.kakomon-ai.jp", "sec-fetch-site": "same-origin", "x-forwarded-for": `10.0.0.${ip}`, ...headers } });
}
beforeEach(() => record.mockClear());

describe("POST /api/funnel (anonymous beacon)", () => {
  it("returns an observable storage failure instead of a success acknowledgement", async () => {
    record.mockResolvedValueOnce(false);
    expect((await POST(beacon({ event: "free_limit_reached" }))).status).toBe(503);
  });
  it("counts a free limit by the first-touch source and qualification from the cookie", async () => {
    const touch = { utm_source: "tsugino_shikaku", utm_content: "sc.hero" };
    await POST(beacon({ event: "free_limit_reached" }, { cookie: `funnel_first_touch=${encodeURIComponent(JSON.stringify(touch))}` }));
    expect(record).toHaveBeenCalledWith("free_limit_reached", expect.any(String), expect.any(Number), touch);
  });
  it("counts a client step keyed by the practice cookie and awaits the write before answering", async () => {
    let finished = false;
    record.mockImplementationOnce(async () => { await new Promise(r => setTimeout(r, 5)); finished = true; return true; });
    const response = await POST(beacon({ event: "free_limit_reached" }, { cookie: "practice_guest=1b4e28ba-2fa1-11d2-883f-0016d3cca427.1762500000." + "a".repeat(64) }));
    expect(response.status).toBe(204);
    expect(finished).toBe(true);
    expect(record).toHaveBeenCalledWith("free_limit_reached", "guest:1b4e28ba-2fa1-11d2-883f-0016d3cca427", expect.any(Number));
  });
  it("falls back to network address + browser when there is no practice cookie", async () => {
    await POST(beacon({ event: "paywall_plan_click" }));
    expect(String(record.mock.calls[0][1])).toMatch(/^net:10\.0\.0\.\d+:Mozilla/);
  });
  it.each(["Googlebot/2.1 (+http://www.google.com/bot.html)", "Mozilla/5.0 HeadlessChrome/131.0", "curl/8.4.0", ""])("ignores crawlers and automation (%j)", async ua => {
    expect((await POST(beacon({ event: "billing_page_view" }, { "user-agent": ua }))).status).toBe(204);
    expect(record).not.toHaveBeenCalled();
  });
  it("ignores cross-site posts", async () => {
    await POST(beacon({ event: "billing_page_view" }, { "sec-fetch-site": "cross-site", origin: "https://evil.example" }));
    expect(record).not.toHaveBeenCalled();
  });
  it.each([{ event: "checkout_completed" }, { event: "checkout_started" }, { event: "nope" }, {}, "not json"])("rejects server-only or unknown steps (%j)", async body => {
    expect((await POST(beacon(body))).status).toBe(400);
    expect(record).not.toHaveBeenCalled();
  });
  it("rate-limits a single address", async () => {
    const statuses: number[] = [];
    for (let i = 0; i < 22; i++) statuses.push((await POST(new Request("https://www.kakomon-ai.jp/api/funnel", { method: "POST", body: JSON.stringify({ event: "billing_page_view" }), headers: { "user-agent": UA, "x-forwarded-for": "192.0.2.99" } }))).status);
    expect(statuses.slice(0, 20).every(s => s === 204)).toBe(true);
    expect(statuses[21]).toBe(429);
  });
});

describe("GET /api/admin/funnel/billing (behind admin Basic auth in middleware)", () => {
  it("returns per-day distinct counts and totals, read-only", async () => {
    vi.stubEnv("KV_REST_API_URL", ""); vi.stubEnv("KV_REST_API_TOKEN", "");
    const response = await GET(new Request("https://www.kakomon-ai.jp/api/admin/funnel/billing?days=3"));
    const body = await response.json();
    expect(response.headers.get("cache-control")).toBe("no-store");
    expect(body.available).toBe(false);
    expect(body.days).toHaveLength(3);
    expect(body.steps[0]).toBe("free_limit_reached");
    expect(body.totals.checkout_completed).toBe(0);
    vi.unstubAllEnvs();
  });
});
