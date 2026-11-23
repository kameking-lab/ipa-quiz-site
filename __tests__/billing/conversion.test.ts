// @vitest-environment node
import { afterEach, beforeEach, expect, it, vi } from "vitest";
import { CONVERSION_GLOBAL_MINUTE_LIMIT, CONVERSION_VISITOR_MINUTE_LIMIT, recordClientConversion, recordConversion, readConversions, readConversionChannel, saveConversionChannel } from "@/lib/billing/conversion";
import { conversionRate } from "@/lib/billing/conversion-contract";
import { translateLua } from "./guest-lua-kv";

const now = Date.parse("2026-11-17T14:59:00Z");
let values: Map<string, string | Set<string> | Map<string, number>>;
let bodies: string[];
let ttl: Map<string, number>;
let expirations: string[];
let testNamespace = 0;
function command(op: string, key: string, ...args: string[]): unknown {
  if (op === "SADD") {
    const set = values.get(key) as Set<string> ?? new Set<string>(); values.set(key, set);
    if (set.has(args[0])) return 0;
    set.add(args[0]); return 1;
  }
  if (op === "EXPIRE") { expirations.push(key); ttl.set(key, Number(args[0])); return 1; }
  if (op === "HINCRBY") {
    const hash = values.get(key) as Map<string, number> ?? new Map<string, number>(); values.set(key, hash);
    const count = (hash.get(args[0]) ?? 0) + Number(args[1]); hash.set(args[0], count); return count;
  }
  if (op === "HGET") return (values.get(key) as Map<string, number> | undefined)?.get(args[0]) ?? false;
  if (op === "HGETALL") return [...(values.get(key) as Map<string, number> ?? new Map())].flat();
  if (op === "SET") { if (values.has(key)) return null; values.set(key, args[0]); return "OK"; }
  if (op === "GET") return values.get(key) ?? null;
  throw Error(`Unexpected command ${op}`);
}
beforeEach(() => {
  values = new Map(); bodies = []; ttl = new Map(); expirations = [];
  vi.useFakeTimers(); vi.setSystemTime(now);
  vi.stubEnv("KV_REST_API_URL", `https://kv-${++testNamespace}.invalid`); vi.stubEnv("KV_REST_API_TOKEN", "fixture-token"); vi.stubEnv("AUTH_SECRET", "fixture-secret");
  vi.stubEnv("VERCEL_ENV", "production"); vi.stubEnv("BILLING_WEBHOOK_MODE", "stripe-live");
  vi.stubGlobal("fetch", vi.fn(async (_url, init?: RequestInit) => {
    bodies.push(String(init?.body));
    const commands: string[][] = JSON.parse(String(init?.body));
    return Response.json(commands.map(c => ({ result: c[0] === "EVAL"
      ? new Function("call", "KEYS", "ARGV", translateLua(c[1]))(command, [undefined, ...c.slice(3, 3 + Number(c[2]))], [undefined, ...c.slice(3 + Number(c[2]))])
      : command(c[0], c[1], ...c.slice(2)) })));
  }));
});
afterEach(() => { vi.useRealTimers(); vi.unstubAllEnvs(); vi.unstubAllGlobals(); });

it("executes the production Lua atomically: guests once per JST day/platform, occurrences on every call", async () => {
  await Promise.all(Array.from({ length: 5 }, () => recordConversion("guest_answered", "web", "private-guest", now)));
  await recordConversion("guest_answered", "ios", "private-guest", now);
  await recordConversion("guest_answered", "web", "private-guest", now + 120000);
  await recordConversion("offer_viewed", "web", undefined, now);
  await recordConversion("offer_viewed", "web", undefined, now);
  const report = await readConversions(2, now + 120000);
  expect(report.available).toBe(true);
  expect(report.rows.find(r => r.day === "2026-11-17" && r.channel === "web")?.counts).toMatchObject({ guest_answered: 1, offer_viewed: 2 });
  expect(report.rows.find(r => r.day === "2026-11-18" && r.channel === "web")?.counts.guest_answered).toBe(1);
  expect(report.rows.find(r => r.day === "2026-11-17" && r.channel === "ios")?.counts.guest_answered).toBe(1);
  expect(bodies.join()).not.toContain("private-guest");
  expect([...ttl].filter(([key]) => key.includes(":seen:" )).every(([, seconds]) => seconds === 172800)).toBe(true);
});
it("does not count reused checkout orders or retried payment sessions again, including the next day", async () => {
  await recordConversion("checkout_created", "web", "private-order", now);
  await recordConversion("checkout_created", "ios", "private-order", now + 86400000);
  await recordConversion("payment_completed", "web", "private-session", now);
  await recordConversion("payment_completed", "unknown", "private-session", now + 86400000);
  const rows = (await readConversions(2, now + 86400000)).rows;
  expect(rows.reduce((n, r) => n + r.counts.checkout_created, 0)).toBe(1);
  expect(rows.reduce((n, r) => n + r.counts.payment_completed, 0)).toBe(1);
  expect(bodies.join()).not.toContain("private-order");
  expect(bodies.join()).not.toContain("private-session");
});
it("expires each order marker independently so later purchases cannot extend old retention", async () => {
  await recordConversion("checkout_created", "web", "first-order", now);
  await recordConversion("checkout_created", "web", "second-order", now + 86400000);
  const markers = [...ttl].filter(([key]) => key.includes(":seen:order:"));
  expect(markers).toHaveLength(2);
  expect(markers.every(([, seconds]) => seconds === 95 * 86400)).toBe(true);
});
it("keeps first order channel, reports unknown for old orders and separates test/live", async () => {
  await saveConversionChannel("private-order", "ios"); await saveConversionChannel("private-order", "web");
  expect(await readConversionChannel("private-order")).toBe("ios");
  expect(await readConversionChannel("old-order")).toBe("unknown");
  await recordConversion("offer_viewed", "web", undefined, now);
  vi.stubEnv("BILLING_WEBHOOK_MODE", "stripe-test");
  expect((await readConversions(1, now)).rows.every(r => !r.measured)).toBe(true);
});
it("awaits confirmation and fails softly on HTTP errors, Redis errors, malformed data or missing KV", async () => {
  let release!: (value: Response) => void;
  vi.stubGlobal("fetch", vi.fn(() => new Promise<Response>(resolve => { release = resolve; })));
  let done = false;
  const pending = recordConversion("offer_viewed", "web", undefined, now).then(value => { done = true; return value; });
  await Promise.resolve(); expect(done).toBe(false);
  release(Response.json([{ result: 1 }])); expect(await pending).toBe(true);
  for (const response of [Response.json([{ error: "ERR" }]), Response.json([]), new Response(null, { status: 503 })]) {
    vi.stubGlobal("fetch", vi.fn(async () => response));
    expect(await recordConversion("offer_viewed", "web", undefined, now)).toBe(false);
  }
  vi.stubGlobal("fetch", vi.fn(async () => { throw Error("offline"); }));
  expect(await recordConversion("guest_limited", "ios", "guest", now)).toBe(false);
  expect((await readConversions(14, now)).available).toBe(false);
  vi.stubEnv("KV_REST_API_URL", "");
  expect(await recordConversion("offer_viewed", "web", undefined, now)).toBe(false);
});
it("rejects damaged aggregates and leaves zero-denominator ratios undefined", async () => {
  vi.stubGlobal("fetch", vi.fn(async () => Response.json(Array.from({ length: 3 }, () => ({ result: ["offer_viewed", "-1"] })))));
  expect((await readConversions(1, now)).available).toBe(false);
  expect(conversionRate(1, 0)).toBe("—"); expect(conversionRate(3, 2)).toBe("150.0%");
});

it("batches writes and skips warm TTL refreshes while preserving deduplication and retention repair", async () => {
  await recordConversion("guest_answered", "web", "first", now);
  await recordConversion("guest_answered", "web", "second", now);
  await recordConversion("offer_viewed", "web", undefined, now);
  expect(expirations).toHaveLength(2); // daily aggregate and daily guest set
  expect(bodies).toHaveLength(3);
  expect(bodies.every(body => JSON.parse(body).length === 1)).toBe(true);
  vi.advanceTimersByTime(5 * 60_000);
  await recordConversion("guest_answered", "web", "third", now);
  expect(expirations).toHaveLength(4);
  const counts = (await readConversions(1, now)).rows.find(row => row.channel === "web")!.counts;
  expect(counts).toMatchObject({ guest_answered: 3, offer_viewed: 1 });
});

it("limits each network and the whole site atomically inside the existing write", async () => {
  const network = "v4:192.0.2.12";
  const record = (visitor: string) => recordClientConversion("plan_clicked", "web", undefined, now, visitor);
  const results = await Promise.all(Array.from({ length: CONVERSION_VISITOR_MINUTE_LIMIT + 2 }, () => record(network)));
  expect(results.filter(result => result === "ok")).toHaveLength(CONVERSION_VISITOR_MINUTE_LIMIT);
  expect(results.slice(-2)).toEqual(["limited", "limited"]);
  expect(await recordClientConversion("offer_viewed", "ios", undefined, now, network)).toBe("limited");
  const remaining = CONVERSION_GLOBAL_MINUTE_LIMIT - CONVERSION_VISITOR_MINUTE_LIMIT;
  const otherResults = await Promise.all(Array.from({ length: remaining }, (_, i) => record(`other-${i}`)));
  expect(otherResults.every(result => result === "ok")).toBe(true);
  expect(await record("next-network")).toBe("limited");
  expect(bodies.every(body => JSON.parse(body).length === 1)).toBe(true);
  expect(bodies.join()).not.toContain(network);
  expect(expirations.filter(key => key.includes(":rate:"))).toHaveLength(1);

  expect(await recordConversion("checkout_created", "web", "server-side-order", now)).toBe(true);
  const rows = (await readConversions(1, now)).rows;
  expect(rows.find(row => row.channel === "web")?.counts).toMatchObject({ plan_clicked: CONVERSION_GLOBAL_MINUTE_LIMIT, checkout_created: 1 });
  expect(await recordClientConversion("plan_clicked", "web", undefined, now + 60_000, network)).toBe("ok");
});
