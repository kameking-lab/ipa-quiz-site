import { describe, it, expect, vi } from "vitest";
import { StripeCheckoutProvider } from "@/lib/billing/stripe";
import { fixture, order } from "./stripe-fixture";
const id = order.id;

describe("Stripe test adapter (no network)", () => {
  it("creates one-time server price with durable idempotency and no live key", async () => {
    const f = fixture(); await f.provider.create(order);
    const [, options] = vi.mocked(f.fetcher).mock.calls[0];
    const body = options!.body as URLSearchParams;
    expect(body.get("mode")).toBe("payment"); expect(body.get("line_items[0][price_data][unit_amount]")).toBe("980");
    expect(body.get("metadata[user_id]")).toBe("alice"); expect(body.get("payment_intent_data[metadata][order_id]")).toBe(id);
    expect((options!.headers as Record<string, string>)["Idempotency-Key"]).toBe(`pass:${id}`);
    expect((options!.headers as Record<string, string>)["Stripe-Version"]).toBe("2026-09-30.endive");
    expect([...body.keys()].some(key => key.startsWith("payment_method_types"))).toBe(false);
    expect(body.get("automatic_tax[enabled]")).toBeNull();
    expect(body.get("integration_identifier")).toMatch(/^kakomon-pass-[a-z]{8}$/);
    await f.provider.create(order);
    expect((vi.mocked(f.fetcher).mock.calls[1][1]!.body as URLSearchParams).toString()).toBe(body.toString());
    expect(() => new StripeCheckoutProvider(f.config, "sk_live_invalid", f.store, f.fetcher)).toThrow();
  });
  it("reconciles paid against current refunds, rejects live and wrong currency", async () => {
    const f = fixture(); expect((await f.provider.snapshot(f.event(), "hash"))?.state).toBe("paid");
    f.intent.latest_charge.amount_refunded = 100; f.refunds.push({ ...f.refund, status: "succeeded" });
    expect((await f.provider.snapshot(f.event(), "hash"))?.state).toBe("refunded");
    await expect(f.provider.snapshot({ ...f.event(), livemode: true }, "hash")).rejects.toThrow();
    f.session.currency = "usd"; await expect(f.provider.snapshot(f.event(), "hash")).rejects.toThrow();
  });
  it("waits for verified asynchronous payment, not just checkout completion", async () => {
    const f = fixture(); f.session.payment_status = "unpaid"; f.intent.status = "processing";
    expect((await f.provider.snapshot(f.event(), "hash"))?.state).toBe("pending");
    f.session.payment_status = "paid"; f.intent.status = "succeeded";
    expect((await f.provider.snapshot(f.event("checkout.session.async_payment_succeeded"), "hash"))?.state).toBe("paid");
  });
  it.each([["pending", "suspended"], ["requires_action", "suspended"], ["succeeded", "refunded"], ["failed", "paid"], ["canceled", "paid"]])("refund %s resolves to %s", async (status, state) => {
    const f = fixture(); f.refund.status = status as string;
    const snapshot = await f.provider.snapshot(f.event("refund.updated"), "hash");
    expect(snapshot?.state).toBe(state); expect(snapshot?.refund).toEqual({ id: "re_fixture", state: status === "requires_action" ? "pending" : status });
  });
  it("handles the dedicated refund.failed notification", async () => {
    const f = fixture(); f.refund.status = "failed";
    expect((await f.provider.snapshot(f.event("refund.failed"), "hash"))?.refund).toEqual({ id: "re_fixture", state: "failed" });
  });
  it("retryable provider failure never returns a successful snapshot or leaks its body", async () => {
    const f = fixture(); vi.mocked(f.fetcher).mockResolvedValueOnce(new Response("private provider error", { status: 500 }));
    await expect(f.provider.snapshot(f.event(), "hash")).rejects.toMatchObject({ code: "payment_provider_unavailable", status: 503 });
  });
});
describe("live adapter code with synthetic fetch only; no external transactions", () => {
  it("references an existing verified inclusive one-time price, never creates live prices/products", async () => {
    const f = fixture(true); await f.provider.create(f.purchase);
    const calls = vi.mocked(f.fetcher).mock.calls;
    expect(String(calls[0][0])).toContain("/prices/price_fixture");
    const body = calls[1][1]!.body as URLSearchParams;
    expect(body.get("line_items[0][price]")).toBe("price_fixture");
    expect([...body.keys()].some(key => key.includes("price_data") || key.includes("payment_method_types"))).toBe(false);
    expect(body.get("adaptive_pricing[enabled]")).toBe("false");
    expect(calls.filter(([, init]) => init?.method === "POST").map(([url]) => String(url))).toEqual(["https://api.stripe.com/v1/checkout/sessions"]);
  });
  it("refuses mismatched price amount, recurring price and wrong realm before checkout", async () => {
    for (const patch of [{ unit_amount: 981 }, { recurring: { interval: "month" } }, { livemode: false }, { tax_behavior: "exclusive" }]) {
      const f = fixture(true); Object.assign(f.price, patch); await expect(f.provider.create(f.purchase)).rejects.toThrow();
      expect(vi.mocked(f.fetcher).mock.calls.some(([, init]) => init?.method === "POST")).toBe(false);
    }
  });
  it("isolates live events, sessions, payments and refunds from the test realm", async () => {
    const f = fixture(true); expect((await f.provider.snapshot(f.event(), "hash"))?.mode).toBe("stripe-live");
    await expect(f.provider.snapshot({ ...f.event(), livemode: false }, "hash")).rejects.toThrow();
    f.intent.latest_charge.amount_refunded = 980; f.refunds.push({ ...f.refund, amount: 980, status: "succeeded" }); expect((await f.provider.snapshot(f.event(), "hash"))?.state).toBe("refunded");
    f.intent.livemode = false; await expect(f.provider.snapshot(f.event(), "hash")).rejects.toThrow();
    expect(() => new StripeCheckoutProvider(f.config, "sk_test_fixture", f.store, f.fetcher)).toThrow();
    await expect(f.provider.create(order)).rejects.toThrow();
  });
});
