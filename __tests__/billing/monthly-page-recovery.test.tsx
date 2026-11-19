import { expect, it, vi } from "vitest";
import MonthlyPage from "@/app/billing/MonthlyPage";
import { monthlyStripeFixture } from "./monthly-stripe-fixture";

const wiring = vi.hoisted(() => ({ fixture: null as Awaited<ReturnType<typeof monthlyStripeFixture>> | null }));
vi.mock("@/lib/billing/runtime", () => ({ billingIdentity: async () => "alice" }));
vi.mock("@/lib/billing/subscription/runtime", () => ({ monthlyRuntime: () => wiring.fixture }));
vi.mock("@/lib/billing/subscription/config", () => ({ monthlyConfig: () => wiring.fixture!.config }));
vi.mock("@/mobile/server/revenuecat", () => ({ revenueCatAccess: async () => null }));

async function renewalFixture() {
  const f = await monthlyStripeFixture();
  wiring.fixture = f;
  await f.service.receive(f.event(), "first-period-paid", f.provider);
  const start = f.line.period.end, end = start + 31 * 86400;
  f.setClock(new Date((start + 3600) * 1000));
  Object.assign(f.sub.items.data[0], { current_period_start: start, current_period_end: end });
  Object.assign(f.invoice, { id: "in_renewed", billing_reason: "subscription_cycle" });
  f.sub.latest_invoice = f.invoice.id;
  Object.assign(f.line.period, { start, end });
  Object.assign(f.allocation, { id: "inpay_renewed", invoice: f.invoice.id, payment: { type: "payment_intent", payment_intent: "pi_renewed" } });
  f.payment.id = "pi_renewed";
  return { ...f, start, end };
}

it.each([true, false])("recovers a paid renewal without its webhook from the contract page (sales open: %s)", async enabled => {
  const f = await renewalFixture();
  f.config.enabled = enabled;
  expect((await f.service.status("alice")).entitled).toBe(false);

  const page = await MonthlyPage();

  expect(page.props).toMatchObject({ hasContract: true, management: { orderId: f.result.orderId } });
  expect(await f.service.status("alice")).toMatchObject({ entitled: true, expiresAt: new Date(f.end * 1000).toISOString() });
  expect(await f.service.grant("alice", "question-after-renewal")).toMatchObject({ kind: "pass" });
  expect(Object.keys(f.store.accounts.get("stripe-test:alice")!.signups)).toEqual([f.result.orderId]);
});

it("limits concurrent page reconciliation per member and waits for verified payment", async () => {
  const f = await renewalFixture();
  const confirm = vi.spyOn(f.service, "confirmCheckout");
  Object.assign(f.invoice, { status: "open", amount_paid: 0, amount_remaining: 980 });

  await Promise.all([MonthlyPage(), MonthlyPage()]);
  expect(confirm).toHaveBeenCalledExactlyOnceWith("alice", f.result.orderId, f.provider);
  expect((await f.service.status("alice")).entitled).toBe(false);
  Object.assign(f.invoice, { status: "paid", amount_paid: 980, amount_remaining: 0 });
  await MonthlyPage();
  expect(confirm).toHaveBeenCalledOnce();
  expect((await f.service.status("alice")).entitled).toBe(false);

  f.setClock(new Date((f.start + 3660) * 1000));
  await MonthlyPage();
  expect(confirm).toHaveBeenCalledTimes(2);
  expect((await f.service.status("alice")).entitled).toBe(true);
});
