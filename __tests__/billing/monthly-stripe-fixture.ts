import { vi } from "vitest";
import { StripeMonthlyProvider } from "@/lib/billing/subscription/stripe";
import { MonthlyService, monthlyTerms } from "@/lib/billing/subscription/service";
import { MonthlyMemoryStore, monthlyFixtureConfig } from "./monthly-fixture";

/** Public API-shaped fixture; no credential, network, Stripe account or database is used. */
export async function monthlyStripeFixture() {
  const config = structuredClone(monthlyFixtureConfig), store = new MonthlyMemoryStore();
  const price = { id: config.priceId, active: true, livemode: false, unit_amount: 980, currency: "jpy", recurring: { interval: "month", interval_count: 1, usage_type: "licensed" }, billing_scheme: "per_unit", tax_behavior: "unspecified" };
  const start = Date.parse("2026-01-31T00:00:00Z") / 1000, end = Date.parse("2026-02-28T00:00:00Z") / 1000;
  const meta = { signup_id: "00000000-0000-4000-8000-000000000001", source_instance: config.sourceInstance, terms_hash: monthlyTerms(config) };
  const sub = { id: "sub_monthly", customer: "cus_monthly", livemode: false, status: "active", metadata: meta, cancel_at_period_end: false,
    automatic_tax: { enabled: false }, default_tax_rates: [], latest_invoice: "in_monthly", trial_end: null, collection_method: "charge_automatically", pause_collection: null,
    items: { data: [{ id: "si_monthly", price, quantity: 1, tax_rates: [], current_period_start: start, current_period_end: end }], has_more: false } };
  const session = { id: "cs_test_monthly", livemode: false, mode: "subscription", customer: "cus_monthly", metadata: meta,
    automatic_tax: { enabled: false }, currency: "jpy", amount_subtotal: 980, amount_total: 980, total_details: { amount_tax: 0, amount_discount: 0, amount_shipping: 0 },
    client_reference_id: meta.signup_id, status: "complete", subscription: "sub_monthly", url: "https://checkout.stripe.com/c/pay/monthly" };
  const invoice = { id: "in_monthly", customer: "cus_monthly", livemode: false, currency: "jpy", total: 980, amount_paid: 980, amount_due: 980,
    automatic_tax: { enabled: false }, default_tax_rates: [], total_taxes: [], amount_remaining: 0, starting_balance: 0, status: "paid", collection_method: "charge_automatically", billing_reason: "subscription_create", discounts: [],
    pre_payment_credit_notes_amount: 0, post_payment_credit_notes_amount: 0,
    parent: { type: "subscription_details", subscription_details: { subscription: "sub_monthly" } } };
  const line = { id: "il_monthly", livemode: false, taxes: [], amount: 980, currency: "jpy", quantity: 1,
    period: { start, end }, pricing: { type: "price_details", price_details: { price: price.id } },
    parent: { type: "subscription_item_details", subscription_item_details: { subscription: "sub_monthly", proration: false } } };
  const allocation = { id: "inpay_monthly", livemode: false, invoice: "in_monthly", amount_paid: 980, currency: "jpy", status: "paid", payment: { type: "payment_intent", payment_intent: "pi_monthly" } };
  const payment = { id: "pi_monthly", livemode: false, customer: "cus_monthly", currency: "jpy", amount: 980, amount_received: 980, status: "succeeded" };
  const refunds: { id: string; payment_intent: string; amount: number; currency: string; status: string }[] = [];
  const refundDetails = new Map<string, typeof refunds[number]>();
  const disputes: { id: string; payment_intent: string; livemode: boolean; status: string }[] = [];
  const portalConfiguration = { id: "bpc_fixture", active: true, livemode: false, features: {
    subscription_update: { enabled: false }, payment_method_update: { enabled: true }, invoice_history: { enabled: true },
    subscription_cancel: { enabled: true, mode: "at_period_end", proration_behavior: "none", retention: null },
  } };
  let visible = false, failPath = "";
  let allocationsVisible: boolean | undefined;
  const list = (data: unknown[]) => ({ data, has_more: false });
  const fetcher = vi.fn(async (input: string | URL | Request, options?: RequestInit) => {
    const url = new URL(String(input)), path = url.pathname.replace("/v1/", "");
    if (failPath && path === failPath) return new Response("fixture error", { status: 500 });
    if (path === "customers" && options?.method === "POST") return Response.json({ id: "cus_monthly", livemode: false });
    if (path === "checkout/sessions" && options?.method === "POST") {
      const body = options.body as URLSearchParams;
      meta.signup_id = body.get("metadata[signup_id]")!; session.client_reference_id = meta.signup_id;
      return Response.json({ ...session, status: "open", subscription: null });
    }
    if (path === "billing_portal/sessions") return Response.json({ url: "https://billing.stripe.com/p/session/monthly" });
    if (path === "billing_portal/configurations/bpc_fixture") return Response.json(portalConfiguration);
    if (path === "subscriptions") return Response.json(list(visible ? [sub] : []));
    if (path === "subscriptions/sub_monthly") {
      if (options?.method === "POST") sub.cancel_at_period_end = true;
      return Response.json(sub);
    }
    if (path === `prices/${price.id}`) return Response.json(price);
    if (path === `checkout/sessions/${session.id}`) return Response.json(session);
    if (path === "invoices/in_monthly") return Response.json(invoice);
    if (path === "invoices/in_monthly/lines") return Response.json(list([line]));
    if (path === "invoice_payments") return Response.json(list((allocationsVisible ?? invoice.status === "paid") ? [allocation] : []));
    if (path === `payment_intents/${payment.id}`) return Response.json(payment);
    if (path === "refunds") return Response.json(list(refunds));
    if (path.startsWith("refunds/")) return Response.json(refundDetails.get(path.split("/")[1]) ?? refunds.find(r => r.id === path.split("/")[1]));
    if (path === "disputes") return Response.json(list(disputes));
    if (path.startsWith("disputes/")) return Response.json(disputes.find(d => d.id === path.split("/")[1]));
    throw new Error(`Unexpected fixture request: ${path}`);
  }) as unknown as typeof fetch;
  const provider = new StripeMonthlyProvider(config, "rk_test_public_fixture_not_a_key", fetcher);
  const service = new MonthlyService(store, config, () => new Date("2026-02-01T00:00:00Z"));
  const result = await service.checkout("alice", monthlyTerms(config), provider); visible = true;
  const event = (type = "invoice.paid", objectId = invoice.id, eventId = "evt_monthly") => ({ id: eventId, type, livemode: false,
    data: { object: { ...(type.startsWith("refund.") ? refundDetails.get(objectId) ?? refunds.find(r => r.id === objectId) : {}), id: objectId, payment_intent: payment.id } } });
  return { config, store, provider, service, result, fetcher, price, sub, session, invoice, line, allocation, payment, refunds, disputes, portalConfiguration, event,
    refundDetails, allocationsVisible: (value: boolean) => allocationsVisible = value,
    fail: (path: string) => failPath = path, visible: (value: boolean) => visible = value };
}
