import { vi } from "vitest";
import { StripeCheckoutProvider } from "@/lib/billing/stripe";
import { billingConfig } from "@/lib/billing/config";
import { MemoryStore } from "./memory-store";
import type { Purchase } from "@/lib/billing/domain";
import { liveEnv } from "./live-fixture";
const id = "d2977380-e15a-4f9d-962d-111111111111";
const metadata = { order_id: id, user_id: "alice", terms_hash: "a".repeat(64) };
export const order: Purchase = { id, userId: "alice", mode: "stripe-test", createdAt: "2026-10-25T00:00:00Z", amount: 980, days: 30,
  termsHash: metadata.terms_hash, status: "pending", sessionId: "cs_test_fixture", checkoutUrl: null, paymentId: null, activatedAt: null, expiresAt: null };
export function fixture(live = false) {
  const purchase: Purchase = { ...structuredClone(order), mode: live ? "stripe-live" : "stripe-test", sessionId: live ? "cs_live_fixture" : order.sessionId };
  const store = new MemoryStore(); store.purchases.set(id, purchase);
  const intent = { id: "pi_fixture", livemode: false, metadata, status: "succeeded", amount: 980, amount_received: 980, currency: "jpy", latest_charge: { id: "ch_fixture", livemode: false, amount_refunded: 0, disputed: false } };
  const session = { id: "cs_test_fixture", livemode: false, mode: "payment", client_reference_id: "alice", metadata, amount_total: 980, currency: "jpy", status: "complete", payment_status: "paid", payment_intent: intent, url: "https://checkout.stripe.com/c/pay/cs_test_fixture" };
  const refund = { id: "re_fixture", payment_intent: "pi_fixture", status: "pending", amount: 100, currency: "jpy" };
  const refunds: typeof refund[] = [];
  if (live) { intent.livemode = true; intent.latest_charge.livemode = true; session.livemode = true; session.id = "cs_live_fixture"; session.url = "https://checkout.stripe.com/c/pay/cs_live_fixture"; }
  const price = { id: "price_fixture", livemode: true, active: true, unit_amount: 980, currency: "jpy", recurring: null as null | { interval: string }, billing_scheme: "per_unit", tax_behavior: "inclusive" };
  const fetcher = vi.fn(async (input: string | URL | Request, opts?: RequestInit) => {
    const url = String(input);
    return Response.json(opts?.method === "POST" ? { id: session.id, livemode: live, url: session.url }
      : url.includes("/refunds?") ? { data: refunds, has_more: false } : url.includes("/prices/") ? price : url.includes("/checkout/sessions/") ? session : url.includes("/refunds/") ? refund : intent);
  }) as unknown as typeof fetch;
  const config = billingConfig(live ? liveEnv() : { BILLING_MODE: "stripe-test" });
  const provider = new StripeCheckoutProvider(config, live ? "rk_live_fixture_not_real" : "sk_test_fixture_not_real", store, fetcher);
  const event = (type = "checkout.session.completed") => ({ id: "evt_fixture", type, livemode: live,
    data: { object: { id: type.startsWith("refund.") ? "re_fixture" : session.id, payment_intent: intent.id } } });
  return { provider, fetcher, session, intent, refund, event, store, config, purchase, price, refunds };
}
