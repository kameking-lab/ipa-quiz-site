import { afterEach, beforeEach, expect, it, vi } from "vitest";
import { firstTouch } from "@/lib/analytics/first-touch";
import { attributionQualification, normalizeAttribution, requestAttribution } from "@/lib/billing/attribution";
import { readOrderAttribution, recordFunnel, saveOrderAttribution } from "@/lib/billing/funnel";
import { GET } from "@/app/api/admin/funnel/billing/route";
import { LS_KEYS } from "@/lib/storage/keys";

// Sender's actual content grammar, including Japanese sourceKey and a >80-character label.
export const referralCases = [
  ["ap", "ap_kakomon_detail_hero_ap", "ap.detail_hero.source-1"],
  ["ap", "ap_kakomon_learning_ap", "ap.learning.source-1"],
  ["boiler-1kyu", "boiler-1kyu_kakomon_detail_hero_lckohyo-一級ボイラー技士", "boiler-1kyu.detail_hero.source-1"],
  ["work-environment-measurement-expert-first", "work-environment-measurement-expert-first_kakomon_my_next_steps_sagyo-kankyo-sokuteishi", "work-environment-measurement-expert-first.my_next_steps.source-1"],
] as const;

let outbound: string[];
beforeEach(() => {
  localStorage.clear();
  window.history.replaceState({}, "", "/");
  document.cookie = "funnel_first_touch=; Path=/; Max-Age=0";
  vi.stubEnv("KV_REST_API_URL", "https://fixture.invalid");
  vi.stubEnv("KV_REST_API_TOKEN", "fixture");
  vi.stubEnv("AUTH_SECRET", "fixture");
  const sets = new Map<string, Set<string>>(), values = new Map<string, string>();
  outbound = [];
  vi.stubGlobal("fetch", vi.fn(async (url: string, init?: RequestInit) => {
    expect(url).toBe("https://fixture.invalid/pipeline");
    outbound.push(String(init?.body));
    const commands = JSON.parse(String(init?.body)) as string[][];
    return Response.json(commands.map(([op, key, value]) => {
      if (op === "SADD") { const set = sets.get(key) ?? new Set<string>(); set.add(value); sets.set(key, set); }
      if (op === "SET" && !values.has(key)) values.set(key, value);
      return { result: op === "GET" ? values.get(key) ?? null : op === "SCARD" ? sets.get(key)?.size ?? 0 : op === "SMEMBERS" ? [...sets.get(key) ?? []] : 1 };
    }));
  }));
});
afterEach(() => { vi.unstubAllEnvs(); vi.unstubAllGlobals(); });

it.each(referralCases)("preserves %s qualification from %s through storage, cookie, order and admin API", async (slug, raw, content) => {
  window.history.replaceState({}, "", `/?utm_source=tsugino_shikaku&utm_content=${encodeURIComponent(raw)}`);
  const touch = firstTouch();
  expect(touch).toEqual({ utm_source: "tsugino_shikaku", utm_content: content });
  expect(attributionQualification(touch!)).toBe(slug);
  window.history.replaceState({}, "", "/billing");
  expect(firstTouch()).toEqual(touch);
  const cookie = requestAttribution(new Request("https://fixture.invalid", { headers: { cookie: document.cookie } }));
  expect(cookie).toEqual(touch);
  await saveOrderAttribution("fixture-order", cookie);
  await recordFunnel("checkout_started", "fixture-user", Date.now(), cookie);
  await recordFunnel("checkout_completed", "fixture-session", Date.now(), await readOrderAttribution("fixture-order"));
  const body = await (await GET(new Request("https://fixture.invalid/api/admin/funnel/billing?days=1"))).json();
  expect(body.attribution.days).toEqual([expect.objectContaining({ qualification_slug: slug, utm_content: content, counts: expect.objectContaining({ checkout_started: 1, checkout_completed: 1 }) })]);
});

it.each(["sample-person-12345", "customer-987654", "ap_kakomon_detail_hero_sample-person-12345", "ap.sample-person-12345", "ap.detail_hero.source-999", "toString", "__proto__"])("never stores or transmits an unlisted content: %s", async content => {
  window.history.replaceState({}, "", `/?utm_source=tsugino_shikaku&utm_content=${content}`);
  expect(firstTouch()?.utm_content).toBe("unknown");
  expect(localStorage.getItem(LS_KEYS.funnelFirstTouch)).not.toContain(content);
  expect(decodeURIComponent(document.cookie)).not.toContain(content);
  // Forged cookie and direct server input are independently validated.
  const input = { utm_source: "tsugino_shikaku", utm_content: content };
  const cookie = requestAttribution(new Request("https://fixture.invalid", { headers: { cookie: `funnel_first_touch=${encodeURIComponent(JSON.stringify(input))}` } }));
  expect(cookie?.utm_content).toBe("unknown");
  await recordFunnel("checkout_started", "fixture-user", Date.now(), input);
  await saveOrderAttribution("fixture-order", input);
  expect(outbound.join()).not.toContain(content);
});

it("rejects unlisted sources and repairs legacy unknown attribution on a known arrival", () => {
  const input = { utm_source: "sample-person-12345", utm_content: "ap" };
  expect(normalizeAttribution(input)).toBeNull();
  localStorage.setItem(LS_KEYS.funnelFirstTouch, JSON.stringify({ capturedAt: Date.now(), attribution: input }));
  expect(firstTouch()).toBeNull();
  expect(localStorage.getItem(LS_KEYS.funnelFirstTouch)).toBeNull();
  localStorage.setItem(LS_KEYS.funnelFirstTouch, JSON.stringify({ capturedAt: Date.now() - 1000, attribution: { utm_source: "tsugino_shikaku", utm_content: "legacy-unrecognized" } }));
  window.history.replaceState({}, "", "/?utm_source=tsugino_shikaku&utm_content=ap_kakomon_learning_ap");
  expect(firstTouch()?.utm_content).toBe("ap.learning.source-1");
});

it("discards an unlisted source at every server write boundary", async () => {
  const input = { utm_source: "sample-person-12345", utm_content: "ap" };
  await recordFunnel("checkout_started", "fixture-user", Date.now(), input);
  await saveOrderAttribution("fixture-order", input);
  expect(outbound.join()).not.toContain(input.utm_source);
  expect(outbound).toHaveLength(1); // Global counter only; no order or source write.
});
