import { describe, expect, it, vi } from "vitest";
import { billingConfig, billingWebhookConfig, checkoutReady, gateReady } from "@/lib/billing/config";
import { StripeCheckoutProvider } from "@/lib/billing/stripe";
import { MemoryStore } from "./memory-store";
import { liveEnv } from "./live-fixture";
import { order } from "./stripe-fixture";

/** Synthetic in-memory settings only; never installed into any process/deployment environment. */
function previewEnv(): Record<string, string | undefined> {
  return { ...liveEnv(), VERCEL_ENV: "preview", BILLING_MODE: "stripe-test", BILLING_WEBHOOK_MODE: "stripe-test",
    BILLING_PREVIEW_TEST_ENABLED: "true", BILLING_SOURCE_INSTANCE: "preview-test-fixture" };
}
const blocked: [string, Record<string, string | undefined>][] = [
  ["default opt-in absent", { BILLING_PREVIEW_TEST_ENABLED: undefined }],
  ["opt-in false", { BILLING_PREVIEW_TEST_ENABLED: "false" }],
  ["opt-in is exact", { BILLING_PREVIEW_TEST_ENABLED: "TRUE" }],
  ["production", { VERCEL_ENV: "production" }],
  ["missing hosted environment", { VERCEL_ENV: undefined }],
  ["empty hosted environment", { VERCEL_ENV: "" }],
  ["unknown hosted environment", { VERCEL_ENV: "staging" }],
  ["development hosted environment", { VERCEL_ENV: "development" }],
  ["missing Vercel marker", { VERCEL: undefined }],
  ["invalid Vercel marker", { VERCEL: "0" }],
  ["flag alone on production process", { VERCEL: undefined, VERCEL_ENV: undefined }],
];

describe("explicit isolated Preview test realm", () => {
  it("allows opted-in Vercel Preview despite Next NODE_ENV=production, without granting live", () => {
    const env = previewEnv();
    expect(billingConfig(env).mode).toBe("stripe-test");
    expect(billingWebhookConfig(env).mode).toBe("stripe-test");
    expect(checkoutReady(billingConfig(env))).toBe(true);
  });
  it.each(blocked)("%s cannot enable test checkout or webhook", (_name, patch) => {
    const env = { ...previewEnv(), ...patch };
    expect(billingConfig(env).mode).toBe("off");
    expect(() => billingWebhookConfig(env)).toThrow("not allowed");
  });
  it.each([undefined, "false", "true"])("Preview never allows live, even with activation/keys and opt-in %s", flag => {
    const env = { ...liveEnv(), VERCEL_ENV: "preview", BILLING_PREVIEW_TEST_ENABLED: flag };
    expect(billingConfig(env).mode).toBe("off");
    expect(() => billingWebhookConfig(env)).toThrow("not allowed");
    expect(() => billingWebhookConfig({ ...env, BILLING_MODE: "off" })).toThrow("not allowed");
  });
  it("does not enable anything from the Preview flag alone or allow hosted mock", () => {
    expect(billingConfig({ VERCEL: "1", VERCEL_ENV: "preview", BILLING_PREVIEW_TEST_ENABLED: "true" }).mode).toBe("off");
    expect(billingConfig({ ...previewEnv(), BILLING_MODE: "mock" }).mode).toBe("off");
  });
  it("keeps sale-OFF test webhook reconciliation only inside the allowed Preview realm", () => {
    const env = { ...previewEnv(), BILLING_MODE: "off", BILLING_ORIGIN: "bad", BILLING_PRICE_YEN: "bad" };
    expect(billingConfig(env).mode).toBe("off");
    const webhook = billingWebhookConfig(env);
    expect(webhook.mode).toBe("stripe-test"); expect(checkoutReady(webhook)).toBe(false);
    expect(() => billingWebhookConfig({ ...env, BILLING_PREVIEW_TEST_ENABLED: undefined })).toThrow("not allowed");
  });
  it("preserves local development test/mock and explicit production live", () => {
    for (const mode of ["mock", "stripe-test"] as const) expect(billingConfig({ NODE_ENV: "development", BILLING_MODE: mode }).mode).toBe(mode);
    expect(billingWebhookConfig({ NODE_ENV: "development", BILLING_WEBHOOK_MODE: "stripe-test" }).mode).toBe("stripe-test");
    expect(checkoutReady(billingConfig(liveEnv()))).toBe(true);
    expect(billingWebhookConfig({ ...liveEnv(), BILLING_MODE: "off" }).mode).toBe("stripe-live");
    expect(() => billingWebhookConfig({ ...liveEnv(), BILLING_WEBHOOK_MODE: "stripe-test", BILLING_PREVIEW_TEST_ENABLED: "true" })).toThrow("not allowed");
  });
  it("sale OFF ignores all malformed dormant billing settings in every host boundary", () => {
    for (const patch of [{}, { VERCEL_ENV: "production" }, { VERCEL_ENV: undefined }, { VERCEL_ENV: "unknown" }]) {
      const c = billingConfig({ ...previewEnv(), ...patch, BILLING_MODE: "off", BILLING_ORIGIN: "bad",
        BILLING_PRICE_YEN: "bad", BILLING_PASS_DAYS: "bad", BILLING_NOTICE_AT: "bad", BILLING_TRANSITION_STARTS_AT: "bad" });
      expect(c.mode).toBe("off"); expect(gateReady(c)).toBe(false);
    }
  });
  it("opt-in does not waive seller, notice, migration or legal prerequisites", () => {
    for (const patch of [{ BILLING_SELLER_ADDRESS: "" }, { BILLING_REFUND_TERMS: "" }, { BILLING_NOTICE_AT: undefined },
      { BILLING_TRANSITION_STARTS_AT: undefined }, { BILLING_LEGAL_REVIEWED: "false" }, { BILLING_TRANSITION_STARTS_AT: "2099-01-01T00:00:00.000Z" }]) {
      expect(checkoutReady(billingConfig({ ...previewEnv(), ...patch }))).toBe(false);
    }
  });
  it("existing adapter rejects live key, live event and live order before any provider/DB operation", async () => {
    const config = billingConfig(previewEnv()); const store = new MemoryStore();
    const fetcher = vi.fn(async () => { throw new Error("No external request permitted in this test"); });
    expect(() => new StripeCheckoutProvider(config, "rk_live_fixture_not_real", store, fetcher)).toThrow("payment_mode_key_mismatch");
    const provider = new StripeCheckoutProvider(config, "rk_test_fixture_not_real", store, fetcher);
    await expect(provider.snapshot({ id: "evt_live_fixture", type: "checkout.session.completed", livemode: true,
      data: { object: { id: "cs_live_fixture" } } }, "fixture-digest")).rejects.toThrow("payment_mode_mismatch");
    await expect(provider.create({ ...order, mode: "stripe-live" })).rejects.toThrow("payment_mode_mismatch");
    expect(fetcher).not.toHaveBeenCalled(); expect(store.purchases.size).toBe(0);
  });
});
