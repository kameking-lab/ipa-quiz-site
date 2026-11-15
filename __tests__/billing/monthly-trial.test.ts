import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { monthlyStripeFixture } from "./monthly-stripe-fixture";
import { monthlyTerms } from "@/lib/billing/subscription/service";

beforeEach(() => vi.stubGlobal("fetch", () => { throw new Error("External fetch forbidden"); }));
afterEach(() => vi.unstubAllGlobals());

const day = 86400;
const checkoutBodies = (f: Awaited<ReturnType<typeof monthlyStripeFixture>>) => vi.mocked(f.fetcher).mock.calls
  .filter(([url, init]) => String(url).endsWith("/checkout/sessions") && init?.method === "POST").map(([, init]) => init?.body as URLSearchParams);

/** Stripe's shape for a subscription that starts with a free trial: nothing is charged today. */
function startTrial(f: Awaited<ReturnType<typeof monthlyStripeFixture>>, days = 7) {
  const start = f.sub.items.data[0].current_period_start, end = start + days * day;
  f.session.amount_subtotal = 0; f.session.amount_total = 0;
  Object.assign(f.sub, { status: "trialing", trial_end: end }); f.sub.items.data[0].current_period_end = end;
  Object.assign(f.invoice, { total: 0, amount_paid: 0, amount_due: 0, amount_remaining: 0, status: "paid", billing_reason: "subscription_create" });
  return { start, end };
}

describe("monthly Checkout seller name and first-contract free trial", () => {
  it("names the seller 過去問AI on Checkout and offers no trial when the trial is off", async () => {
    const f = await monthlyStripeFixture();
    const [body] = checkoutBodies(f);
    expect(body.get("branding_settings[display_name]")).toBe("過去問AI");
    expect(body.get("subscription_data[trial_period_days]")).toBeNull();
    expect(body.get("custom_text[submit][message]")).not.toContain("無料");
  });

  it("offers a 7-day trial on the first contract and states when the first charge happens", async () => {
    const f = await monthlyStripeFixture({ trialDays: 7 });
    const [body] = checkoutBodies(f);
    expect(body.get("subscription_data[trial_period_days]")).toBe("7");
    expect(body.get("branding_settings[display_name]")).toBe("過去問AI");
    expect(body.get("custom_text[submit][message]")).toContain("初回7日間無料");
    expect(body.get("custom_text[submit][message]")).toContain("無料期間中に契約管理から解約すれば請求はありません");
    expect(f.store.accounts.get("stripe-test:alice")!.signups[f.result.orderId].trialDays).toBe(7);
    expect(monthlyTerms(f.config)).not.toBe(monthlyTerms({ ...f.config, trialDays: 0 }));
  });

  it("grants access during the trial from the contract, not from the zero-yen invoice", async () => {
    const f = await monthlyStripeFixture({ trialDays: 7 });
    const { end } = startTrial(f);
    await f.service.receive(f.event("checkout.session.completed", f.session.id, "evt_checkout"), "checkout", f.provider);
    await f.service.receive(f.event(), "invoice", f.provider);
    const state = await f.service.status("alice", f.result.orderId);
    expect(state.entitled).toBe(true);
    expect(state.expiresAt).toBe(new Date(end * 1000).toISOString());
    expect(state.purchase?.status).toBe("paid");
    const account = f.store.accounts.get("stripe-test:alice")!;
    expect(account.invoices).toEqual({});
    expect(account.payments).toEqual({});
    expect(await f.service.grant("alice", "any-question")).toEqual({ kind: "pass", remaining: null });
  });

  it("rejects a trial longer than the one offered", async () => {
    const f = await monthlyStripeFixture({ trialDays: 7 });
    startTrial(f, 30);
    await expect(f.service.receive(f.event(), "invoice", f.provider)).rejects.toMatchObject({ code: "unsupported_subscription" });
    expect((await f.service.status("alice")).entitled).toBe(false);
  });

  it("rejects trial subscriptions when the trial is off", async () => {
    const f = await monthlyStripeFixture();
    startTrial(f);
    await expect(f.service.receive(f.event(), "invoice", f.provider)).rejects.toMatchObject({ code: "unsupported_subscription" });
  });

  it("ends access at the trial end when the first charge is not paid", async () => {
    const f = await monthlyStripeFixture({ trialDays: 7 });
    const start = f.sub.items.data[0].current_period_start, trialEnd = start + 7 * day;
    Object.assign(f.sub, { status: "past_due", trial_end: trialEnd });
    f.sub.items.data[0].current_period_start = trialEnd; f.sub.items.data[0].current_period_end = trialEnd + 28 * day;
    Object.assign(f.invoice, { status: "open", amount_paid: 0, amount_remaining: 980, billing_reason: "subscription_cycle" });
    f.line.period = { start: trialEnd, end: trialEnd + 28 * day };
    await f.service.receive(f.event("invoice.payment_failed"), "failed", f.provider);
    expect((await f.service.status("alice")).entitled).toBe(false);
  });

  it("keeps the paid month after the trial like any other paid invoice", async () => {
    const f = await monthlyStripeFixture({ trialDays: 7 });
    const start = Date.parse("2026-01-25T00:00:00Z") / 1000, trialEnd = start + 7 * day;
    Object.assign(f.sub, { status: "active", trial_end: trialEnd });
    f.sub.items.data[0].current_period_start = trialEnd; f.sub.items.data[0].current_period_end = trialEnd + 28 * day;
    f.invoice.billing_reason = "subscription_cycle"; f.line.period = { start: trialEnd, end: trialEnd + 28 * day };
    await f.service.receive(f.event(), "paid", f.provider);
    expect((await f.service.status("alice")).entitled).toBe(true);
  });

  it("offers no second trial once the account had a contract", async () => {
    const f = await monthlyStripeFixture({ trialDays: 7 });
    startTrial(f);
    await f.service.receive(f.event(), "invoice", f.provider);
    f.sub.status = "canceled";
    await f.service.receive(f.event("customer.subscription.deleted", f.sub.id, "evt_deleted"), "deleted", f.provider);
    f.session.amount_subtotal = 980; f.session.amount_total = 980;
    const again = await f.service.checkout("alice", monthlyTerms(f.config), f.provider);
    expect(f.store.accounts.get("stripe-test:alice")!.signups[again.orderId].trialDays).toBeUndefined();
    expect(checkoutBodies(f).at(-1)!.get("subscription_data[trial_period_days]")).toBeNull();
  });
});
