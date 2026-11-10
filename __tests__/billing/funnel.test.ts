// @vitest-environment node
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { CLIENT_FUNNEL_EVENTS, FUNNEL_EVENTS, funnelKey, readFunnel, recordFunnel, readFunnelSources, saveOrderAttribution, readOrderAttribution } from "@/lib/billing/funnel";

const NOW = Date.parse("2026-11-07T15:30:00Z"); // 2026-11-08 00:30 JST
beforeEach(() => { vi.stubEnv("KV_REST_API_URL", "https://kv.example.invalid/"); vi.stubEnv("KV_REST_API_TOKEN", "kv-token"); vi.stubEnv("AUTH_SECRET", "fixture-secret"); });
afterEach(() => { vi.unstubAllEnvs(); vi.unstubAllGlobals(); });

describe("purchase funnel counter (KV, per JST day, distinct visitors)", () => {
  it("keeps global counts and adds daily source/content sets with the same de-duplicated member", async () => {
    const fetcher = vi.fn(async () => Response.json([])); vi.stubGlobal("fetch", fetcher);
    const touch = { utm_source: "tsugino_shikaku", utm_content: "sc.hero" };
    await recordFunnel("free_limit_reached", "guest:private", NOW, touch);
    const commands = JSON.parse(String((fetcher.mock.calls[0] as unknown as [string, RequestInit])[1].body));
    expect(commands[2]).toEqual(["SADD", "funnel:v1:2026-11-08:free_limit_reached:source:tsugino_shikaku:sc.hero", commands[0][2]]);
    expect(commands[4]).toEqual(["SADD", "funnel:v1:2026-11-08:sources", "tsugino_shikaku:sc.hero"]);
    expect(JSON.stringify(commands)).not.toContain("private");
  });
  it("stores order attribution idempotently under a digest and reads it back", async () => {
    const touch = { utm_source: "tsugino", utm_content: "sc" };
    const fetcher = vi.fn(async () => Response.json([{ result: JSON.stringify(touch) }])); vi.stubGlobal("fetch", fetcher);
    await saveOrderAttribution("private-order", touch);
    expect(await readOrderAttribution("private-order")).toEqual(touch);
    const calls = fetcher.mock.calls as unknown as [string, RequestInit][];
    expect(String(calls[0][1].body)).not.toContain("private-order");
    expect(JSON.parse(String(calls[0][1].body))[0]).toEqual(["SET", expect.stringMatching(/^funnel:v1:order-source:[a-f0-9]{32}$/), JSON.stringify(touch), "EX", String(95 * 86400), "NX"]);
  });
  it("reads source rows without conflating qualifications, dates or events", async () => {
    vi.stubGlobal("fetch", vi.fn(async (_url: string, init?: RequestInit) => {
      const commands = JSON.parse(String(init?.body)) as string[][];
      return Response.json(commands.map(([command, key]) => ({ result: command === "SMEMBERS" ? ["tsugino:sc.hero", "tsugino:ap.hero"] : key.endsWith("sc.hero") && key.includes(":checkout_completed:") ? 2 : 0 })));
    }));
    const result = await readFunnelSources(2, NOW);
    expect(result.available).toBe(true);
    expect(result.days).toHaveLength(4);
    expect(result.days.find(r => r.day === "2026-11-08" && r.utm_content === "sc.hero")?.counts.checkout_completed).toBe(2);
    expect(result.days.find(r => r.utm_content === "ap.hero")?.counts.checkout_completed).toBe(0);
  });
  it("adds the visitor's keyed hash to the JST day's set in one awaited pipeline, never the raw identifier", async () => {
    const fetcher = vi.fn<(url: string, init?: RequestInit) => Promise<Response>>(async () => Response.json([{ result: 1 }, { result: 1 }]));
    vi.stubGlobal("fetch", fetcher);
    expect(await recordFunnel("free_limit_reached", "guest:1b4e28ba-2fa1-11d2-883f-0016d3cca427", NOW)).toBe(true);
    expect(fetcher).toHaveBeenCalledTimes(1);
    const [url, init] = fetcher.mock.calls[0];
    expect(url).toBe("https://kv.example.invalid/pipeline");
    expect(init?.headers).toMatchObject({ Authorization: "Bearer kv-token" });
    const commands = JSON.parse(String(init?.body)) as string[][];
    expect(commands[0][0]).toBe("SADD");
    expect(commands[0][1]).toBe("funnel:v1:2026-11-08:free_limit_reached");
    expect(commands[0][2]).toMatch(/^[0-9a-f]{32}$/);
    expect(String(init?.body)).not.toContain("1b4e28ba");
    expect(commands[1]).toEqual(["EXPIRE", "funnel:v1:2026-11-08:free_limit_reached", String(95 * 86400)]);
  });
  it("is idempotent per visitor and day: the same visitor yields the same member, another day a different one", async () => {
    const bodies: string[] = [];
    vi.stubGlobal("fetch", vi.fn(async (_url: string, init?: RequestInit) => { bodies.push(String(init?.body)); return Response.json([]); }));
    await recordFunnel("paywall_plan_click", "net:1.2.3.4:ua", NOW);
    await recordFunnel("paywall_plan_click", "net:1.2.3.4:ua", NOW + 60_000);
    await recordFunnel("paywall_plan_click", "net:1.2.3.4:ua", NOW + 86_400_000);
    const member = (body: string) => (JSON.parse(body) as string[][])[0][2];
    expect(member(bodies[0])).toBe(member(bodies[1]));
    expect(member(bodies[2])).not.toBe(member(bodies[0]));
  });
  it("never throws and never blocks the action: no KV, KV error and unknown steps all resolve false", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => { throw new Error("down"); }));
    expect(await recordFunnel("checkout_started", "user:alice", NOW)).toBe(false);
    vi.stubEnv("KV_REST_API_URL", "");
    const fetcher = vi.fn(); vi.stubGlobal("fetch", fetcher);
    expect(await recordFunnel("checkout_started", "user:alice", NOW)).toBe(false);
    expect(fetcher).not.toHaveBeenCalled();
    expect(await recordFunnel("not_an_event" as never, "user:alice", NOW)).toBe(false);
  });
  it("reads every day and step in one pipeline of set sizes", async () => {
    const fetcher = vi.fn(async (_url: string, init?: RequestInit) => {
      const commands = JSON.parse(String(init?.body)) as string[][];
      return Response.json(commands.map(([, key]) => ({ result: key.endsWith(":checkout_started") ? 2 : key.endsWith(":free_limit_reached") ? 7 : 0 })));
    });
    vi.stubGlobal("fetch", fetcher);
    const result = await readFunnel(2, NOW);
    expect(result.available).toBe(true);
    expect(result.days.map(d => d.day)).toEqual(["2026-11-08", "2026-11-07"]);
    expect(result.days[0].counts).toMatchObject({ free_limit_reached: 7, checkout_started: 2, checkout_completed: 0 });
    const commands = JSON.parse(String(fetcher.mock.calls[0][1]?.body)) as string[][];
    expect(commands).toHaveLength(2 * FUNNEL_EVENTS.length);
    expect(commands.every(([command]) => command === "SCARD")).toBe(true);
    expect(commands[0][1]).toBe(funnelKey("2026-11-08", FUNNEL_EVENTS[0]));
  });
  it("reports unavailable (all zero) instead of guessing when KV is missing or answers malformed", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => Response.json([{ result: "x" }])));
    expect((await readFunnel(1, NOW)).available).toBe(false);
    vi.stubEnv("KV_REST_API_TOKEN", "");
    const result = await readFunnel(1, NOW);
    expect(result.available).toBe(false);
    expect(Object.values(result.days[0].counts).every(n => n === 0)).toBe(true);
  });
  it("lets browsers report only client steps; checkout start/completion are server-confirmed", () => {
    expect(CLIENT_FUNNEL_EVENTS).not.toContain("checkout_started");
    expect(CLIENT_FUNNEL_EVENTS).not.toContain("checkout_completed");
    expect(FUNNEL_EVENTS).toEqual(expect.arrayContaining(["free_limit_reached", "paywall_plan_click", "billing_page_view", "checkout_started", "checkout_completed"]));
  });
});
