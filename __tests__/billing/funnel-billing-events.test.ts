import { createHmac } from "node:crypto";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { monthlyStripeFixture } from "./monthly-stripe-fixture";
import { firstTouch } from "@/lib/analytics/first-touch";
const wiring = vi.hoisted(() => ({ runtime: null as unknown, user: "alice", email: undefined as string | undefined }));
const record = vi.hoisted(() => vi.fn<(...args: unknown[]) => Promise<boolean>>(async () => true));
const saveSource = vi.hoisted(() => vi.fn(async () => {}));
const readSource = vi.hoisted(() => vi.fn<(...args: unknown[]) => Promise<unknown>>(async () => null));
vi.mock("@/lib/billing/funnel", () => ({ recordFunnel: record, saveOrderAttribution: saveSource, readOrderAttribution: readSource }));
vi.mock("@/lib/billing/checkout-email", () => ({ checkoutEmail: async () => wiring.email }));
vi.mock("@/lib/billing/subscription/runtime", () => ({ monthlyRuntime: () => wiring.runtime }));
vi.mock("@/lib/billing/runtime", () => ({
  billingIdentity: async () => wiring.user, sameOrigin: (request: Request) => { if (request.headers.get("origin") !== "http://localhost:3338") throw Object.assign(new Error(), { status: 403 }); },
  json: (value: unknown) => Response.json(value), billingFailure: (error: { status?: number; code?: string }) => Response.json({ error: error.code ?? "unavailable" }, { status: error.status ?? 503 }),
}));
import { POST as webhook } from "@/app/api/billing/webhook/route";
import { POST as checkout } from "@/app/api/billing/checkout/route";
import { monthlyTerms } from "@/lib/billing/subscription/service";
import type { Signup } from "@/lib/billing/subscription/domain";

const secret = "whsec_public_fixture_only";
function signed(event: unknown) {
  const body = JSON.stringify(event), time = Math.floor(Date.now() / 1000);
  const signature = createHmac("sha256", secret).update(`${time}.${body}`).digest("hex");
  return new Request("http://localhost:3338/api/billing/webhook", { method: "POST", body, headers: { "stripe-signature": `t=${time},v1=${signature}` } });
}
const post = (body: unknown) => new Request("http://localhost:3338/api/billing/checkout", { method: "POST", headers: { origin: "http://localhost:3338" }, body: JSON.stringify(body) });
beforeEach(() => {
  record.mockClear(); saveSource.mockClear(); readSource.mockReset().mockResolvedValue(null); wiring.user = "alice"; wiring.email = undefined;
  vi.stubGlobal("fetch", () => { throw new Error("External fetch forbidden"); });
  for (const [key, value] of Object.entries({ BILLING_PRODUCT: "subscription", BILLING_WEBHOOK_MODE: "stripe-test", BILLING_SOURCE_INSTANCE: "monthly-fixture", BILLING_ORIGIN: "http://localhost:3338", BILLING_STRIPE_TEST_WEBHOOK_SECRET: secret })) vi.stubEnv(key, value);
});
afterEach(() => { vi.unstubAllEnvs(); vi.unstubAllGlobals(); });

describe("server-confirmed funnel steps", () => {
  it.each([
    ["ap_kakomon_detail_hero_ap", "ap.detail_hero.source-1"],
    ["ap_kakomon_learning_ap", "ap.learning.source-1"],
    ["boiler-1kyu_kakomon_detail_hero_lckohyo-一級ボイラー技士", "boiler-1kyu.detail_hero.source-1"],
    ["work-environment-measurement-expert-first_kakomon_my_next_steps_sagyo-kankyo-sokuteishi", "work-environment-measurement-expert-first.my_next_steps.source-1"],
  ])("links real sender label %s through the checkout and verified webhook", async (raw, content) => {
    const f = await monthlyStripeFixture(); wiring.runtime = f;
    localStorage.clear();
    window.history.replaceState({}, "", `/?utm_source=tsugino_shikaku&utm_content=${encodeURIComponent(raw)}`);
    const touch = { utm_source: "tsugino_shikaku", utm_content: content };
    expect(firstTouch()).toEqual(touch);
    const request = post({ terms: monthlyTerms(f.config) });
    request.headers.set("cookie", document.cookie);
    const response = await checkout(request);
    const result = await response.json();
    expect(response.status).toBe(200);
    expect(saveSource).toHaveBeenCalledWith(result.orderId, touch);
    expect(record).toHaveBeenCalledWith("checkout_started", "user:alice", expect.any(Number), touch);
    readSource.mockResolvedValueOnce(touch);
    const completed = { id: "evt_source_done", type: "checkout.session.completed", livemode: false, data: { object: { ...f.session, status: "complete", mode: "subscription", client_reference_id: result.orderId } } };
    expect((await webhook(signed(completed))).status).toBe(200);
    expect(readSource).toHaveBeenCalledWith(result.orderId);
    expect(record).toHaveBeenCalledWith("checkout_completed", `session:${f.session.id}`, expect.any(Number), touch);
  });
  it("counts checkout_started per signed-in user only after a Checkout session exists", async () => {
    const f = await monthlyStripeFixture(); wiring.runtime = f;
    const response = await checkout(post({ terms: monthlyTerms(f.config) }));
    expect(response.status).toBe(200);
    expect(record).toHaveBeenCalledWith("checkout_started", "user:alice");
    record.mockClear();
    expect((await checkout(post({ terms: "0".repeat(64) }))).status).not.toBe(200);
    expect(record).not.toHaveBeenCalled();
  });
  it("counts checkout_completed once per Stripe session from the verified webhook, not for other events", async () => {
    const f = await monthlyStripeFixture(); wiring.runtime = f;
    expect((await webhook(signed(f.event()))).status).toBe(200);
    expect(record).not.toHaveBeenCalled();
    const completed = { id: "evt_session_done", type: "checkout.session.completed", livemode: false, data: { object: { ...f.session, id: f.session.id, status: "complete", mode: "subscription" } } };
    expect((await webhook(signed(completed))).status).toBe(200);
    expect(record).toHaveBeenCalledWith("checkout_completed", `session:${f.session.id}`);
  });
});

describe("Stripe Checkout stays minimal", () => {
  it("uses Japanese, prefills the signed-in email, and puts the required terms in one line with a terms link", async () => {
    const f = await monthlyStripeFixture();
    const original = vi.mocked(f.fetcher).getMockImplementation()!;
    const calls: { path: string; body: URLSearchParams | undefined }[] = [];
    vi.mocked(f.fetcher).mockImplementation(async (input, options) => {
      const path = new URL(String(input)).pathname.replace("/v1/", "");
      calls.push({ path, body: options?.body as URLSearchParams | undefined });
      return path === "customers/cus_monthly" ? Response.json({ id: "cus_monthly", livemode: false }) : original(input, options);
    });
    f.visible(false);
    const signup: Signup = { id: "00000000-0000-4000-8000-000000000009", createdAt: "2026-02-01T00:00:00Z", terms: monthlyTerms(f.config), amount: 980,
      priceId: f.config.priceId, state: "pending", sessionId: null, url: null, subscriptionId: null };
    await f.provider.checkout("cus_monthly", signup, "buyer@example.com");
    expect(calls.find(c => c.path === "customers/cus_monthly")?.body?.get("email")).toBe("buyer@example.com");
    const session = calls.find(c => c.path === "checkout/sessions")!.body!;
    expect(session.get("locale")).toBe("ja");
    expect(session.get("payment_method_types[0]")).toBeNull();
    expect(session.get("custom_text[submit][message]")).toContain("月額980円（税込）・毎月自動更新・いつでも解約可（期間末まで利用可）。");
    expect(session.get("custom_text[submit][message]")).toContain(`[利用条件](${f.config.origin}/billing/terms)`);
  });
  it("never blocks the purchase when the email prefill fails", async () => {
    const f = await monthlyStripeFixture();
    f.visible(false);
    const signup: Signup = { id: "00000000-0000-4000-8000-000000000010", createdAt: "2026-02-01T00:00:00Z", terms: monthlyTerms(f.config), amount: 980,
      priceId: f.config.priceId, state: "pending", sessionId: null, url: null, subscriptionId: null };
    await expect(f.provider.checkout("cus_monthly", signup, "buyer@example.com")).resolves.toMatchObject({ url: expect.stringMatching(/^https:\/\/checkout\.stripe\.com\//) });
  });
  it("expires an open stale session at Stripe, and refuses (subscription_exists) when it was completed", async () => {
    const f = await monthlyStripeFixture();
    const original = vi.mocked(f.fetcher).getMockImplementation()!;
    let status = "open"; const posts: string[] = [];
    vi.mocked(f.fetcher).mockImplementation(async (input, options) => {
      const path = new URL(String(input)).pathname.replace("/v1/", "");
      if (path === "checkout/sessions/cs_test_old") {
        return Response.json({ id: "cs_test_old", livemode: false, status });
      }
      if (path === "checkout/sessions/cs_test_old/expire") { posts.push(path); status = "expired"; return Response.json({ id: "cs_test_old", livemode: false, status }); }
      return original(input, options);
    });
    await f.provider.expireCheckout("cs_test_old");
    expect(posts).toEqual(["checkout/sessions/cs_test_old/expire"]);
    await f.provider.expireCheckout("cs_test_old");
    expect(posts).toHaveLength(1);
    status = "complete";
    await expect(f.provider.expireCheckout("cs_test_old")).rejects.toMatchObject({ code: "subscription_exists" });
  });
});
