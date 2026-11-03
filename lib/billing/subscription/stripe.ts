import "server-only";
import { createHash } from "node:crypto";
import { z } from "zod";
import { BillingError } from "../domain";
import { refundState } from "../finance";
import type { ContractStatus, Invoice, MonthlyConfig, MonthlyProvider, Observation, Payment, Signup, Target } from "./domain";

const id = z.string().regex(/^[a-z]+_[A-Za-z0-9_]+$/);
const money = z.number().int().nonnegative();
const seconds = z.number().int().positive();
const automaticTaxOff = z.object({ enabled: z.literal(false) });
const noTaxEntries = z.array(z.unknown()).max(0);
const nullableNoTaxEntries = noTaxEntries.nullable();
const sessionTotals = { automatic_tax: automaticTaxOff, currency: z.literal("jpy"),
  amount_subtotal: money, amount_total: money,
  total_details: z.object({ amount_tax: z.literal(0), amount_discount: z.literal(0), amount_shipping: z.literal(0) }) };
const ref = z.union([id, z.object({ id })]).transform(v => typeof v === "string" ? v : v.id);
const metadata = z.object({ signup_id: z.string().uuid(), source_instance: z.string(), terms_hash: z.string().length(64) });
const priceSchema = z.object({ id, livemode: z.boolean(), currency: z.literal("jpy"), unit_amount: money,
  recurring: z.object({ interval: z.literal("month"), interval_count: z.literal(1), usage_type: z.literal("licensed") }),
  billing_scheme: z.literal("per_unit"), tax_behavior: z.enum(["inclusive", "unspecified"]) });
const subscriptionSchema = z.object({ id, livemode: z.boolean(), customer: ref, metadata,
  automatic_tax: automaticTaxOff, default_tax_rates: nullableNoTaxEntries.optional(),
  status: z.enum(["incomplete", "incomplete_expired", "trialing", "active", "past_due", "unpaid", "canceled", "paused"]),
  cancel_at_period_end: z.boolean(), cancel_at: seconds.nullable().optional(), latest_invoice: ref.nullable(), trial_end: seconds.nullable().optional(),
  collection_method: z.literal("charge_automatically"), pause_collection: z.unknown().nullable().optional(),
  items: z.object({ has_more: z.literal(false), data: z.array(z.object({ id, quantity: z.literal(1), price: priceSchema, tax_rates: nullableNoTaxEntries,
    current_period_start: seconds, current_period_end: seconds })).length(1) }) });
const sessionSchema = z.object({ id, livemode: z.boolean(), mode: z.literal("subscription"), customer: ref, ...sessionTotals,
  metadata, client_reference_id: z.string().uuid(), status: z.enum(["open", "complete", "expired"]), subscription: ref.nullable() });
const invoiceSchema = z.object({ id, livemode: z.boolean(), customer: ref, currency: z.literal("jpy"), total: money,
  automatic_tax: automaticTaxOff, default_tax_rates: noTaxEntries, total_taxes: nullableNoTaxEntries,
  amount_paid: money, amount_due: money, amount_remaining: money, starting_balance: z.literal(0),
  collection_method: z.literal("charge_automatically"), billing_reason: z.enum(["subscription_create", "subscription_cycle"]),
  status: z.enum(["draft", "open", "paid", "uncollectible", "void"]),
  discounts: z.array(z.unknown()).max(0), pre_payment_credit_notes_amount: z.literal(0), post_payment_credit_notes_amount: z.literal(0),
  parent: z.object({ type: z.literal("subscription_details"), subscription_details: z.object({ subscription: ref }) }) });
const lineSchema = z.object({ id, amount: money, currency: z.literal("jpy"), quantity: z.literal(1), taxes: nullableNoTaxEntries,
  period: z.object({ start: seconds, end: seconds }),
  pricing: z.object({ type: z.literal("price_details"), price_details: z.object({ price: ref }) }),
  parent: z.object({ type: z.literal("subscription_item_details"), subscription_item_details: z.object({ subscription: ref, proration: z.literal(false) }) }) });
const paymentSchema = z.object({ id, livemode: z.boolean(), customer: ref, status: z.literal("succeeded"), amount: money, amount_received: money, currency: z.literal("jpy") });
const allocationSchema = z.object({ id, livemode: z.boolean(), invoice: ref, amount_paid: money, currency: z.literal("jpy"), status: z.literal("paid"),
  payment: z.object({ type: z.literal("payment_intent"), payment_intent: ref }) });

/** Fixed-price, one-item monthly subscription adapter. Unsupported credits/trials/proration fail closed. */
export class StripeMonthlyProvider implements MonthlyProvider {
  constructor(private c: MonthlyConfig, private key: string, private fetcher: typeof fetch = fetch) {
    if (!(c.mode === "stripe-live" ? /^rk_live_/ : /^rk_test_/).test(key)) throw new BillingError("payment_mode_key_mismatch", 503);
  }
  private mode(obj: { livemode: boolean }) { if (obj.livemode !== (this.c.mode === "stripe-live")) throw new BillingError("payment_mode_mismatch", 400); }
  private async api(path: string, body?: Record<string, string>, key?: string): Promise<unknown> {
    const r = await this.fetcher(`https://api.stripe.com/v1/${path}`, { method: body ? "POST" : "GET", cache: "no-store",
      signal: AbortSignal.timeout(15000), body: body ? new URLSearchParams(body) : undefined,
      headers: { Authorization: `Bearer ${this.key}`, "Stripe-Version": "2026-09-30.endive",
        ...(body ? { "Content-Type": "application/x-www-form-urlencoded" } : {}), ...(key ? { "Idempotency-Key": key } : {}) } });
    if (!r.ok) throw new BillingError("payment_provider_unavailable", 503);
    return r.json(); // Response bodies and credentials never reach logs or clients.
  }
  private async list(path: string, params: Record<string, string>): Promise<unknown[]> {
    const results: unknown[] = [], seen = new Set<string>(); let cursor = "";
    for (let page = 0; page < 20; page++) {
      const query = new URLSearchParams({ ...params, limit: "100", ...(cursor ? { starting_after: cursor } : {}) });
      const value = z.object({ data: z.array(z.object({ id }).passthrough()), has_more: z.boolean() }).parse(await this.api(`${path}?${query}`));
      for (const item of value.data) { if (seen.has(item.id)) throw new BillingError("provider_pagination_conflict", 503); seen.add(item.id); results.push(item); }
      if (!value.has_more) return results;
      if (!value.data.length) break;
      cursor = value.data[value.data.length - 1].id;
    }
    throw new BillingError("provider_pagination_incomplete", 503);
  }
  async customer(attemptId: string) {
    const customer = z.object({ id, livemode: z.boolean() }).parse(await this.api("customers", { "metadata[source_instance]": this.c.sourceInstance }, `${this.c.sourceInstance}:customer:${attemptId}`));
    this.mode(customer); if (!customer.id.startsWith("cus_")) throw new BillingError("invalid_customer", 503); return customer.id;
  }
  async checkout(customerId: string, signup: Signup) {
    await this.checkPortalConfiguration(this.c.portalConfigurationId);
    const price = priceSchema.extend({ active: z.literal(true) }).parse(await this.api(`prices/${encodeURIComponent(signup.priceId)}`)); this.mode(price);
    if (price.id !== signup.priceId || price.unit_amount !== signup.amount) throw new BillingError("subscription_price_mismatch", 503);
    // Also detect contracts created outside this server, or a successful Checkout whose response/event was lost.
    const existing = await this.list("subscriptions", { customer: customerId, status: "all" });
    if (existing.some(raw => { const s = z.object({ status: z.string() }).parse(raw); return !["canceled", "incomplete_expired"].includes(s.status); })) throw new BillingError("subscription_exists");
    const suffix = [...createHash("sha256").update(signup.id).digest().subarray(0, 8)].map(v => String.fromCharCode(97 + v % 26)).join("");
    const body: Record<string, string> = { mode: "subscription", integration_identifier: `kakomon-monthly-${suffix}`, customer: customerId, client_reference_id: signup.id,
      "line_items[0][price]": signup.priceId, "line_items[0][quantity]": "1", "adaptive_pricing[enabled]": "false", "automatic_tax[enabled]": "false",
      success_url: `${this.c.origin}/billing/success?order=${signup.id}`, cancel_url: `${this.c.origin}/billing/cancel?order=${signup.id}`,
      "custom_text[submit][message]": `月額${signup.amount}円（税込）。毎月自動更新。期間末解約。${this.c.seller.refund}` };
    for (const prefix of ["metadata", "subscription_data[metadata]"]) {
      body[`${prefix}[signup_id]`] = signup.id; body[`${prefix}[source_instance]`] = this.c.sourceInstance; body[`${prefix}[terms_hash]`] = signup.terms;
    }
    const result = sessionSchema.extend({ url: z.string().url() }).parse(await this.api("checkout/sessions", body, `${this.c.sourceInstance}:signup:${signup.id}`)); this.mode(result);
    if (result.customer !== customerId || result.client_reference_id !== signup.id || result.metadata.signup_id !== signup.id
      || result.metadata.source_instance !== this.c.sourceInstance || result.metadata.terms_hash !== signup.terms
      || result.amount_subtotal !== signup.amount || result.amount_total !== signup.amount) throw new BillingError("checkout_total_or_owner_mismatch", 503);
    if (!result.id.startsWith(this.c.mode === "stripe-live" ? "cs_live_" : "cs_test_") || new URL(result.url).origin !== "https://checkout.stripe.com") throw new BillingError("invalid_checkout_url", 503);
    return { id: result.id, url: result.url };
  }
  async portal(customerId: string, configurationId: string) {
    await this.checkPortalConfiguration(configurationId);
    const result = z.object({ url: z.string().url() }).parse(await this.api("billing_portal/sessions", {
      customer: customerId, configuration: configurationId, return_url: `${this.c.origin}/billing`,
    }));
    if (new URL(result.url).origin !== "https://billing.stripe.com") throw new BillingError("invalid_portal_url", 503);
    return result.url;
  }
  private async checkPortalConfiguration(configurationId: string) {
    if (!/^bpc_\w+$/.test(configurationId)) throw new BillingError("portal_unconfigured", 503);
    const configuration = z.object({ id, active: z.literal(true), livemode: z.boolean(), features: z.object({
      subscription_update: z.object({ enabled: z.literal(false) }), payment_method_update: z.object({ enabled: z.literal(true) }),
      invoice_history: z.object({ enabled: z.literal(true) }), subscription_cancel: z.object({ enabled: z.literal(true), mode: z.literal("at_period_end"),
        proration_behavior: z.literal("none"), retention: z.null().optional() }),
    }) }).parse(await this.api(`billing_portal/configurations/${encodeURIComponent(configurationId)}`));
    this.mode(configuration); if (configuration.id !== configurationId) throw new BillingError("portal_configuration_mismatch", 503);
  }
  private async subscription(subId: string) {
    const sub = subscriptionSchema.parse(await this.api(`subscriptions/${encodeURIComponent(subId)}`)); this.mode(sub); this.mode(sub.items.data[0].price);
    if (sub.id !== subId || sub.metadata.source_instance !== this.c.sourceInstance || sub.trial_end || sub.pause_collection) throw new BillingError("unsupported_subscription", 503);
    return sub;
  }
  private async invoice(invoiceId: string) {
    const invoice = invoiceSchema.parse(await this.api(`invoices/${encodeURIComponent(invoiceId)}`)); this.mode(invoice);
    if (invoice.id !== invoiceId) throw new BillingError("invoice_mismatch", 503); return invoice;
  }
  private async session(sessionId: string) {
    const s = sessionSchema.parse(await this.api(`checkout/sessions/${encodeURIComponent(sessionId)}`)); this.mode(s);
    if (s.id !== sessionId || s.client_reference_id !== s.metadata.signup_id || s.metadata.source_instance !== this.c.sourceInstance) throw new BillingError("checkout_owner_mismatch", 503);
    if (s.amount_subtotal !== this.c.priceYen || s.amount_total !== this.c.priceYen) throw new BillingError("checkout_total_mismatch", 503);
    return s;
  }
  async resolve(raw: unknown): Promise<Target | null> {
    const e = z.object({ id: id, type: z.string(), livemode: z.boolean(), data: z.object({ object: z.object({ id }).passthrough() }) }).parse(raw); this.mode(e);
    const object = e.data.object;
    if (["checkout.session.completed", "checkout.session.expired", "checkout.session.async_payment_succeeded", "checkout.session.async_payment_failed"].includes(e.type)) {
      const s = await this.session(object.id); return { customerId: s.customer, subscriptionIds: s.subscription ? [s.subscription] : [], invoiceIds: [], sessionId: s.id };
    }
    if (["customer.subscription.created", "customer.subscription.updated", "customer.subscription.deleted", "customer.subscription.paused", "customer.subscription.resumed"].includes(e.type)) {
      const s = await this.subscription(object.id); return { customerId: s.customer, subscriptionIds: [s.id], invoiceIds: [] };
    }
    if (["invoice.paid", "invoice.payment_failed", "invoice.payment_action_required", "invoice.finalization_failed", "invoice.voided", "invoice.marked_uncollectible"].includes(e.type)) {
      const i = await this.invoice(object.id); return { customerId: i.customer, subscriptionIds: [i.parent.subscription_details.subscription], invoiceIds: [i.id] };
    }
    if (!["charge.refunded", "refund.created", "refund.updated", "refund.failed", "charge.dispute.created", "charge.dispute.updated", "charge.dispute.closed"].includes(e.type)) return null;
    let paymentId = typeof object.payment_intent === "string" ? object.payment_intent : null;
    if (!paymentId) {
      const chargeId = e.type === "charge.refunded" ? object.id : z.string().parse(object.charge);
      const charge = z.object({ id, livemode: z.boolean(), payment_intent: ref }).parse(await this.api(`charges/${encodeURIComponent(chargeId)}`)); this.mode(charge);
      if (charge.id !== chargeId) throw new BillingError("charge_mismatch", 503); paymentId = charge.payment_intent;
    }
    const allocations = (await this.list("invoice_payments", { "payment[type]": "payment_intent", "payment[payment_intent]": paymentId, status: "paid" })).map(v => allocationSchema.parse(v));
    if (!allocations.length) {
      if (!e.type.startsWith("refund.")) return null;
      // Refunds can precede allocation visibility. Preserve verified financial
      // facts without inventing a subscription or granting/revoking any period.
      const signed = z.object({ id, payment_intent: ref, amount: money.positive(), currency: z.literal("jpy"),
        status: z.enum(["pending", "requires_action", "succeeded", "failed", "canceled"]) }).safeParse(object);
      // Resolve identity first. Unsupported currency/status on an unrelated
      // customer's standalone payment must not create endless webhook retries.
      // All financial fields are checked again after ownership, under the lock.
      const pi = z.object({ id, livemode: z.boolean(), customer: ref.nullable() }).parse(await this.api(`payment_intents/${encodeURIComponent(paymentId)}`)); this.mode(pi);
      if (pi.id !== paymentId) throw new BillingError("payment_owner_mismatch", 503);
      if (!pi.customer) return null;
      return { customerId: pi.customer, subscriptionIds: [], invoiceIds: [], unallocatedRefund: true,
        risk: { kind: "refund", id: object.id, paymentId, ...(signed.success && signed.data.payment_intent === paymentId
          ? { signed: { state: signed.data.status, amount: signed.data.amount } } : {}) } };
    }
    let customerId = ""; const subscriptions = new Set<string>(), invoices = new Set<string>();
    for (const a of allocations) {
      this.mode(a); if (a.payment.payment_intent !== paymentId) throw new BillingError("payment_mismatch", 503);
      const invoice = await this.invoice(a.invoice);
      if (customerId && customerId !== invoice.customer) throw new BillingError("cross_customer_allocation", 503);
      customerId = invoice.customer; subscriptions.add(invoice.parent.subscription_details.subscription); invoices.add(invoice.id);
    }
    const kind = e.type.startsWith("refund.") ? "refund" : e.type.startsWith("charge.dispute.") ? "dispute" : null;
    const signed = kind === "refund" ? z.object({ amount: money, currency: z.literal("jpy"), status: z.enum(["pending", "requires_action", "succeeded", "failed", "canceled"]) }).safeParse(object)
      : z.object({ status: z.enum(["won", "lost", "warning_closed", "warning_needs_response", "warning_under_review", "needs_response", "under_review"]) }).safeParse(object);
    return { customerId, subscriptionIds: [...subscriptions], invoiceIds: [...invoices], ...(kind ? { risk: { kind, id: object.id, paymentId,
      ...(signed.success ? { signed: { state: signed.data.status, ...("amount" in signed.data ? { amount: signed.data.amount } : {}) } } : {}) } } : {}) };
  }
  private async payment(piId: string, customerId: string, risk?: Target["risk"]): Promise<Payment> {
    const pi = paymentSchema.parse(await this.api(`payment_intents/${encodeURIComponent(piId)}`)); this.mode(pi);
    if (pi.id !== piId || pi.customer !== customerId || pi.amount !== pi.amount_received) throw new BillingError("payment_owner_mismatch", 503);
    const payment: Payment = { id: pi.id, customerId: pi.customer, amount: pi.amount_received, refunds: {}, disputes: {} };
    const refunds = await this.list("refunds", { payment_intent: pi.id });
    if (risk?.kind === "refund" && risk.paymentId === pi.id) {
      const current = await this.api(`refunds/${encodeURIComponent(risk.id)}`);
      const identity = z.object({ id, payment_intent: ref }).parse(current);
      if (identity.id !== risk.id || identity.payment_intent !== pi.id) throw new BillingError("refund_mismatch", 503);
      refunds.push(current); // A signed trigger must not disappear through a stale list page.
    }
    for (const raw of refunds) {
      const r = z.object({ id, payment_intent: ref, amount: money, currency: z.literal("jpy"), status: z.enum(["pending", "requires_action", "succeeded", "failed", "canceled"]) }).parse(raw);
      if (r.payment_intent !== pi.id || r.amount < 1 || r.amount > payment.amount) throw new BillingError("refund_mismatch", 503);
      if (payment.refunds[r.id] && payment.refunds[r.id].amount !== r.amount) throw new BillingError("refund_amount_conflict", 503);
      let state = refundState(payment.refunds[r.id]?.state, r.status === "requires_action" ? "pending" : r.status);
      if (risk?.kind === "refund" && risk.id === r.id && risk.signed) {
        if (risk.signed.amount !== r.amount) throw new BillingError("refund_amount_conflict", 503);
        const signedState = risk.signed.state;
        if (signedState === "succeeded" || signedState === "failed" || signedState === "canceled") state = refundState(state, signedState);
      }
      payment.refunds[r.id] = { id: r.id, amount: r.amount, state };
    }
    const disputes = await this.list("disputes", { payment_intent: pi.id });
    if (risk?.kind === "dispute" && risk.paymentId === pi.id) disputes.push(await this.api(`disputes/${encodeURIComponent(risk.id)}`));
    for (const raw of disputes) {
      const d = z.object({ id, livemode: z.boolean(), payment_intent: ref, status: z.enum(["warning_needs_response", "warning_under_review", "warning_closed", "needs_response", "under_review", "won", "lost"]) }).parse(raw); this.mode(d);
      if (d.payment_intent !== pi.id) throw new BillingError("dispute_mismatch", 503);
      let state: "won" | "lost" | "open" = d.status === "won" || d.status === "warning_closed" ? "won" : d.status === "lost" ? "lost" : "open";
      if (risk?.kind === "dispute" && risk.id === d.id && risk.signed) {
        const signedState = risk.signed.state;
        const correction = signedState === "won" || signedState === "warning_closed" ? "won" : signedState === "lost" ? "lost" : "open";
        if (state !== "open" && correction !== "open" && state !== correction) throw new BillingError("dispute_conflict", 503);
        if (correction !== "open") state = correction;
      }
      if (!payment.disputes[d.id] || payment.disputes[d.id] === "open") payment.disputes[d.id] = state;
    }
    return payment;
  }
  async observe(target: Target): Promise<Observation> {
    const result: Observation = { contracts: [], invoices: [], payments: [] }, invoiceIds = new Set(target.invoiceIds);
    const subscriptionIds = new Set(target.subscriptionIds);
    if (target.unallocatedRefund) {
      if (target.subscriptionIds.length || target.invoiceIds.length || target.sessionId || target.risk?.kind !== "refund" || !target.risk.signed)
        throw new BillingError("unverified_refund_target", 503);
      result.payments.push(await this.payment(target.risk.paymentId, target.customerId, target.risk));
      return result;
    }
    if (target.sessionId) {
      const s = await this.session(target.sessionId);
      if (s.customer !== target.customerId) throw new BillingError("customer_mismatch", 503);
      if (s.subscription) subscriptionIds.add(s.subscription);
      result.session = { id: s.id, signupId: s.metadata.signup_id, customerId: s.customer, terms: s.metadata.terms_hash, state: s.status, subscriptionId: s.subscription };
    }
    for (const subId of subscriptionIds) {
      const s = await this.subscription(subId), item = s.items.data[0];
      if (s.customer !== target.customerId || item.current_period_start >= item.current_period_end) throw new BillingError("subscription_mismatch", 503);
      // Portal may express period-end cancellation with cancel_at alone. Our
      // contract supports period-end cancellation, not arbitrary dated endings.
      // Compare provider timestamps, never the host clock (Test Clocks differ).
      if (s.cancel_at != null && s.cancel_at !== item.current_period_end && !["canceled", "incomplete_expired"].includes(s.status))
        throw new BillingError("unsupported_subscription_cancellation", 503);
      result.contracts.push({ id: s.id, customerId: s.customer, signupId: s.metadata.signup_id, priceId: item.price.id, amount: item.price.unit_amount,
        status: s.status as ContractStatus, periodStart: item.current_period_start, periodEnd: item.current_period_end,
        cancelAtPeriodEnd: s.cancel_at_period_end || s.cancel_at === item.current_period_end,
        sourceInstance: s.metadata.source_instance, terms: s.metadata.terms_hash,
        ...(s.default_tax_rates === undefined ? { subscriptionTaxState: "unknown" as const } : {}) });
      if (s.latest_invoice) invoiceIds.add(s.latest_invoice);
    }
    const observedPayments = new Map<string, Payment>();
    for (const invoiceId of invoiceIds) {
      const i = await this.invoice(invoiceId), subId = i.parent.subscription_details.subscription;
      if (i.customer !== target.customerId || !subscriptionIds.has(subId)) throw new BillingError("invoice_owner_mismatch", 503);
      const lines = (await this.list(`invoices/${encodeURIComponent(i.id)}/lines`, {})).map(l => lineSchema.parse(l));
      if (lines.length !== 1 || lines[0].parent.subscription_item_details.subscription !== subId || lines[0].amount !== i.total
        || i.amount_due !== i.total || i.total < 1) throw new BillingError("unsupported_invoice", 503);
      const line = lines[0];
      const invoice: Invoice = { id: i.id, customerId: i.customer, subscriptionId: subId, priceId: line.pricing.price_details.price,
        periodStart: line.period.start, periodEnd: line.period.end, amount: i.total, paid: i.status === "paid", payments: [] };
      if (invoice.paid) {
        if (i.amount_paid !== i.total || i.amount_remaining !== 0) throw new BillingError("unsupported_invoice_payment", 503);
        const allocations = (await this.list("invoice_payments", { invoice: i.id, status: "paid" })).map(v => allocationSchema.parse(v));
        for (const a of allocations) {
          this.mode(a); if (a.invoice !== i.id || a.amount_paid < 1) throw new BillingError("invoice_payment_mismatch", 503);
          const piId = a.payment.payment_intent;
          let payment = observedPayments.get(piId);
          if (!payment) {
            payment = await this.payment(piId, i.customer, target.risk);
            observedPayments.set(piId, payment);
          }
          if (a.amount_paid > payment.amount) throw new BillingError("invoice_allocation_overflow", 503);
          invoice.payments.push({ id: a.id, paymentId: piId, amount: a.amount_paid });
        }
        if (invoice.payments.reduce((n, p) => n + p.amount, 0) !== invoice.amount) throw new BillingError("unverified_invoice_payment", 503);
      }
      result.invoices.push(invoice);
    }
    // The paid-allocation endpoint can be newer than the invoice body. Preserve
    // an authenticated refund even when that body still says open/unpaid.
    if (target.risk?.kind === "refund" && !observedPayments.has(target.risk.paymentId)) {
      observedPayments.set(target.risk.paymentId, await this.payment(target.risk.paymentId, target.customerId, target.risk));
    }
    result.payments = [...observedPayments.values()]; return result;
  }
  async stopRenewal(subscriptionId: string, eventId: string) {
    const s = z.object({ id, livemode: z.boolean(), cancel_at_period_end: z.literal(true) }).parse(await this.api(`subscriptions/${encodeURIComponent(subscriptionId)}`,
      { cancel_at_period_end: "true", proration_behavior: "none" }, `${this.c.sourceInstance}:risk:${eventId}:${subscriptionId}`)); this.mode(s);
    if (s.id !== subscriptionId) throw new BillingError("subscription_mismatch", 503);
  }
}
