import "server-only";
import { createHash } from "node:crypto";
import { z } from "zod";
import { BillingError } from "../domain";
import { refundState } from "../finance";
import { examDateBeforeEnd, examDateLabel, nextJstDate } from "../exam-end";
import { stripeMinimumYenCharge, terminal, type EndingChange, type Invoice, type MemberEnding, type MonthlyConfig, type MonthlyProvider, type Observation, type Payment, type Signup, type Target } from "./domain";

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
const metadata = z.object({ signup_id: z.string().uuid(), source_instance: z.string(), terms_hash: z.string().length(64), exam_end_at: z.string().regex(/^\d{1,12}$/).optional(),
  member_ending: z.string().regex(/^(?:renew|cancel:\d{1,12}|exam:\d{1,12}:\d{1,12})$/).optional() });
const priceSchema = z.object({ id, livemode: z.boolean(), currency: z.literal("jpy"), unit_amount: money,
  recurring: z.object({ interval: z.literal("month"), interval_count: z.literal(1), usage_type: z.literal("licensed") }),
  billing_scheme: z.literal("per_unit"), tax_behavior: z.enum(["inclusive", "unspecified"]) });
const subscriptionSchema = z.object({ id, livemode: z.boolean(), customer: ref, metadata, default_payment_method: ref.nullable().optional(),
  automatic_tax: automaticTaxOff, default_tax_rates: nullableNoTaxEntries.optional(),
  status: z.enum(["incomplete", "incomplete_expired", "trialing", "active", "past_due", "unpaid", "canceled", "paused"]),
  cancel_at_period_end: z.boolean(), cancel_at: seconds.nullable().optional(), ended_at: seconds.nullable().optional(), latest_invoice: ref.nullable(), trial_end: seconds.nullable().optional(),
  billing_cycle_anchor: seconds.optional(),
  collection_method: z.literal("charge_automatically"), pause_collection: z.unknown().nullable().optional(),
  items: z.object({ has_more: z.literal(false), data: z.array(z.object({ id, quantity: z.literal(1), price: priceSchema, tax_rates: nullableNoTaxEntries,
    current_period_start: seconds, current_period_end: seconds })).length(1) }) });
const sessionSchema = z.object({ id, livemode: z.boolean(), mode: z.literal("subscription"), customer: ref, ...sessionTotals,
  metadata, client_reference_id: z.string().uuid(), status: z.enum(["open", "complete", "expired"]), subscription: ref.nullable() });
const invoiceSchema = z.object({ id, livemode: z.boolean(), customer: ref, currency: z.literal("jpy"), total: money,
  automatic_tax: automaticTaxOff, default_tax_rates: noTaxEntries, total_taxes: nullableNoTaxEntries,
  amount_paid: money, amount_due: money, amount_remaining: money, starting_balance: z.number().int(),
  ending_balance: z.number().int().nullable().optional(),
  collection_method: z.literal("charge_automatically"), billing_reason: z.enum(["subscription_create", "subscription_cycle"]),
  status: z.enum(["draft", "open", "paid", "uncollectible", "void"]),
  discounts: z.array(z.unknown()).max(0), pre_payment_credit_notes_amount: z.literal(0), post_payment_credit_notes_amount: z.literal(0),
  status_transitions: z.object({ finalized_at: seconds.nullable() }).optional(),
  parent: z.object({ type: z.literal("subscription_details"), subscription_details: z.object({ subscription: ref }) }) });
const lineSchema = z.object({ id, amount: money, currency: z.literal("jpy"), quantity: z.literal(1), taxes: nullableNoTaxEntries,
  period: z.object({ start: seconds, end: seconds }),
  pricing: z.object({ type: z.literal("price_details"), price_details: z.object({ price: ref }) }),
  parent: z.object({ type: z.literal("subscription_item_details"), subscription_item_details: z.object({ subscription: ref, proration: z.boolean() }) }) });
const paymentSchema = z.object({ id, livemode: z.boolean(), customer: ref, status: z.literal("succeeded"), amount: money, amount_received: money, currency: z.literal("jpy") });
const allocationSchema = z.object({ id, livemode: z.boolean(), invoice: ref, amount_paid: money, currency: z.literal("jpy"), status: z.literal("paid"),
  payment: z.object({ type: z.literal("payment_intent"), payment_intent: ref }) });
const customerBalanceSchema = z.object({ id, livemode: z.boolean(), balance: z.number().int(), currency: z.literal("jpy").nullable() });
const balanceTransactionSchema = z.object({ id, livemode: z.boolean(), customer: ref, invoice: ref.nullable(),
  amount: z.number().int(), ending_balance: z.number().int().optional(), created: seconds, currency: z.literal("jpy"), type: z.string(),
  metadata: z.record(z.string(), z.string()).nullable().optional() });

/** Fixed-price, one-item monthly subscription adapter. Only the first-contract free trial is supported. */
export class StripeMonthlyProvider implements MonthlyProvider {
  constructor(private c: MonthlyConfig, private key: string, private fetcher: typeof fetch = fetch, private deadline?: AbortSignal) {
    if (!(c.mode === "stripe-live" ? /^rk_live_/ : /^rk_test_/).test(key)) throw new BillingError("payment_mode_key_mismatch", 503);
  }
  private mode(obj: { livemode: boolean }) { if (obj.livemode !== (this.c.mode === "stripe-live")) throw new BillingError("payment_mode_mismatch", 400); }
  private async api(path: string, body?: Record<string, string>, key?: string, method = body ? "POST" : "GET"): Promise<unknown> {
    const timeout = AbortSignal.timeout(15000);
    const r = await this.fetcher(`https://api.stripe.com/v1/${path}`, { method, cache: "no-store",
      signal: this.deadline ? AbortSignal.any([timeout, this.deadline]) : timeout, body: body ? new URLSearchParams(body) : undefined,
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
  async checkout(customerId: string, signup: Signup, email?: string) {
    await this.checkPortalConfiguration(this.c.portalConfigurationId);
    // Checkout shows the customer's address, so the buyer never types it again.
    // A failed prefill never blocks the purchase; Checkout then asks for the address.
    if (email) try { await this.api(`customers/${encodeURIComponent(customerId)}`, { email }); } catch { /* optional */ }
    const price = priceSchema.extend({ active: z.literal(true) }).parse(await this.api(`prices/${encodeURIComponent(signup.priceId)}`)); this.mode(price);
    if (price.id !== signup.priceId || price.unit_amount !== signup.amount) throw new BillingError("subscription_price_mismatch", 503);
    // Also detect contracts created outside this server, or a successful Checkout whose response/event was lost.
    const existing = await this.list("subscriptions", { customer: customerId, status: "all" });
    if (existing.some(raw => { const s = z.object({ status: z.string() }).parse(raw); return !["canceled", "incomplete_expired"].includes(s.status); })) throw new BillingError("subscription_exists");
    if (existing.length) {
      // A draft final invoice can still add a debit even if today's balance is zero.
      const previous = z.object({ latest_invoice: ref.nullable().optional(),
        metadata: z.object({ source_instance: z.string().optional(), exam_end_at: z.string().optional() }).optional() });
      for (const raw of existing) {
        const prior = previous.parse(raw);
        if (prior.metadata?.source_instance !== this.c.sourceInstance || !prior.metadata.exam_end_at || !prior.latest_invoice) continue;
        const invoice = await this.invoice(prior.latest_invoice);
        if (invoice.customer !== customerId) throw new BillingError("invoice_owner_mismatch", 503);
        if (["draft", "open", "uncollectible"].includes(invoice.status) && invoice.total > 0 && invoice.total < stripeMinimumYenCharge)
          throw new BillingError("exam_writeoff_pending", 503);
      }
      // Stripe applies debits to the next invoice. Customer credits can reduce
      // the payment without changing the configured monthly price.
      if (await this.customerBalance(customerId) > 0) throw new BillingError("customer_balance_due", 503);
    }
    // First contract only: any earlier subscription at Stripe (even canceled) means no trial.
    const trialDays = signup.trialDays && signup.trialDays === this.c.trialDays && !existing.length ? signup.trialDays : 0;
    const suffix = [...createHash("sha256").update(signup.id).digest().subarray(0, 8)].map(v => String.fromCharCode(97 + v % 26)).join("");
    const body: Record<string, string> = { mode: "subscription", integration_identifier: `kakomon-monthly-${suffix}`, customer: customerId, client_reference_id: signup.id,
      "line_items[0][price]": signup.priceId, "line_items[0][quantity]": "1", "adaptive_pricing[enabled]": "false", "automatic_tax[enabled]": "false",
      success_url: `${this.c.origin}/billing/success?order=${signup.id}`, cancel_url: `${this.c.origin}/billing/cancel?order=${signup.id}`,
      locale: "ja", "branding_settings[display_name]": "過去問AI",
      // One line of required terms next to Stripe's pay button (price, renewal, cancellation, refund, terms link).
      "custom_text[submit][message]": trialDays
        ? `初回${trialDays}日間無料。無料期間が終わる日に月額${signup.amount}円（税込）を請求し、以後毎月自動更新。無料期間中に契約管理から解約すれば請求はありません。以前に無料期間を使ったカードでは無料期間はなく、すぐに請求します。${this.c.seller.refund} [利用条件](${this.c.origin}/billing/terms)`
        : `月額${signup.amount}円（税込）・毎月自動更新・いつでも解約可（期間末まで利用可）。${this.c.seller.refund} [利用条件](${this.c.origin}/billing/terms)` };
    if (trialDays) body["subscription_data[trial_period_days]"] = String(trialDays);
    const examEnd = signup.examEndAt === undefined ? undefined : String(signup.examEndAt);
    if (signup.examEndAt !== undefined) {
      const date = examDateBeforeEnd(signup.examEndAt);
      const deadline = `${examDateLabel(date)}まで利用可（${examDateLabel(nextJstDate(date))} 0時に自動終了・日本時間）。`;
      const created = Math.floor(Date.parse(signup.createdAt) / 1000);
      const firstCharge = signup.examEndAt <= created + trialDays * 86400 ? "無料期間内に終了する場合は請求なし。" : "無料期間の終了日に初回請求。";
      body["custom_text[submit][message]"] = `${deadline}${trialDays
        ? `初回${trialDays}日間無料。${firstCharge}以前に無料期間を使ったカードではすぐに${signup.amount}円（税込）を請求します。`
        : `初回は${signup.amount}円（税込）を今すぐ請求します。`} 終了まで月額${signup.amount}円（税込）。${this.c.seller.refund} [利用条件](${this.c.origin}/billing/terms)`;
      body.expires_at = String(Math.min(signup.examEndAt, created + 23 * 3600));
    }
    for (const prefix of ["metadata", "subscription_data[metadata]"]) {
      body[`${prefix}[signup_id]`] = signup.id; body[`${prefix}[source_instance]`] = this.c.sourceInstance; body[`${prefix}[terms_hash]`] = signup.terms;
      if (examEnd) body[`${prefix}[exam_end_at]`] = examEnd;
    }
    const result = sessionSchema.extend({ url: z.string().url() }).parse(await this.api("checkout/sessions", body, `${this.c.sourceInstance}:signup:${signup.id}`)); this.mode(result);
    if (result.customer !== customerId || result.client_reference_id !== signup.id || result.metadata.signup_id !== signup.id
      || result.metadata.source_instance !== this.c.sourceInstance || result.metadata.terms_hash !== signup.terms || result.metadata.exam_end_at !== examEnd
      || ![signup.amount, ...(trialDays ? [0] : [])].includes(result.amount_total) || result.amount_subtotal !== result.amount_total) throw new BillingError("checkout_total_or_owner_mismatch", 503);
    if (!result.id.startsWith(this.c.mode === "stripe-live" ? "cs_live_" : "cs_test_") || new URL(result.url).origin !== "https://checkout.stripe.com") throw new BillingError("invalid_checkout_url", 503);
    return { id: result.id, url: result.url };
  }
  async checkoutSession(customerId: string, signup: Signup) {
    const schema = z.object({
      id, livemode: z.boolean(), mode: z.literal("subscription"), customer: z.literal(customerId),
      client_reference_id: z.literal(signup.id), metadata: z.object({
        signup_id: z.literal(signup.id), source_instance: z.literal(this.c.sourceInstance), terms_hash: z.literal(signup.terms),
      }),
      status: z.enum(["open", "complete", "expired"]), subscription: ref.nullable().optional(),
    });
    const sessions = signup.sessionId
      ? [await this.api(`checkout/sessions/${encodeURIComponent(signup.sessionId)}`)]
      : (await this.list("checkout/sessions", { customer: customerId, "created[gte]": String(Math.floor(Date.parse(signup.createdAt) / 1000)) }))
        .filter(raw => z.object({ client_reference_id: z.literal(signup.id) }).safeParse(raw).success);
    if (!sessions.length) return null;
    if (sessions.length !== 1) throw new BillingError("checkout_conflict", 503);
    const session = schema.parse(sessions[0]); this.mode(session);
    if (signup.sessionId && session.id !== signup.sessionId) throw new BillingError("checkout_owner_mismatch", 503);
    return { id: session.id, status: session.status, ...(session.subscription ? { subscriptionId: session.subscription } : {}) };
  }
  async expireCheckout(sessionId: string) {
    const path = `checkout/sessions/${encodeURIComponent(sessionId)}`;
    const state = z.object({ id, livemode: z.boolean(), status: z.enum(["open", "complete", "expired"]) });
    const current = state.parse(await this.api(path)); this.mode(current);
    if (current.id !== sessionId) throw new BillingError("checkout_owner_mismatch", 503);
    if (current.status === "complete") throw new BillingError("subscription_exists");
    if (current.status === "open") {
      try {
        const closed = state.parse(await this.api(`${path}/expire`, {})); this.mode(closed);
        if (closed.id !== sessionId || closed.status !== "expired") throw new BillingError("checkout_conflict", 503);
      } catch (error) {
        // The session can complete or expire at Stripe after our initial read.
        const latest = state.parse(await this.api(path)); this.mode(latest);
        if (latest.id !== sessionId || latest.status === "open") throw error;
        if (latest.status === "complete") throw new BillingError("subscription_exists");
      }
    }
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
    if (sub.id !== subId || sub.metadata.source_instance !== this.c.sourceInstance || sub.pause_collection) throw new BillingError("unsupported_subscription", 503);
    if (sub.trial_end) {
      const item = sub.items.data[0];
      const examEnd = confirmedExamEnd(sub);
      const shortened = examEnd === item.current_period_end && item.current_period_end < sub.trial_end;
      const trialPeriod = (item.current_period_end === sub.trial_end || shortened)
        && sub.trial_end > item.current_period_start && sub.trial_end - item.current_period_start <= this.c.trialDays * 86400 + 3600;
      const ok = this.c.trialDays > 0 && (sub.status === "trialing" ? trialPeriod : trialPeriod || sub.trial_end <= item.current_period_start);
      if (!ok) throw new BillingError("unsupported_subscription", 503);
    }
    return sub;
  }
  private async invoice(invoiceId: string) {
    const invoice = invoiceSchema.parse(await this.api(`invoices/${encodeURIComponent(invoiceId)}`)); this.mode(invoice);
    if (invoice.id !== invoiceId) throw new BillingError("invoice_mismatch", 503); return invoice;
  }
  private async session(sessionId: string) {
    const s = sessionSchema.parse(await this.api(`checkout/sessions/${encodeURIComponent(sessionId)}`)); this.mode(s);
    if (s.id !== sessionId || s.client_reference_id !== s.metadata.signup_id || s.metadata.source_instance !== this.c.sourceInstance) throw new BillingError("checkout_owner_mismatch", 503);
    // A trial Checkout charges nothing today; the first invoice after the trial is verified separately.
    if (s.amount_subtotal !== s.amount_total || ![this.c.priceYen, ...(this.c.trialDays > 0 ? [0] : [])].includes(s.amount_total)) throw new BillingError("checkout_total_mismatch", 503);
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
    const examEnds = new Map<string, number>();
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
      const ending = memberEnding(s);
      const examEnd = ending ? undefined : confirmedExamEnd(s);
      // An already-issued, shortened invoice stays valid after its original exam date is edited.
      const invoiceExamEnd = examEnd ?? (ending && Number(s.metadata.exam_end_at));
      if (invoiceExamEnd) examEnds.set(s.id, invoiceExamEnd);
      if (s.cancel_at != null && s.cancel_at !== item.current_period_end && !examEnd && ending?.kind !== "exam" && !terminal(s.status))
        throw new BillingError("unsupported_subscription_cancellation", 503);
      result.contracts.push({ id: s.id, customerId: s.customer, signupId: s.metadata.signup_id, priceId: item.price.id, amount: item.price.unit_amount,
        status: s.status, periodStart: item.current_period_start, periodEnd: item.current_period_end,
        cancelAtPeriodEnd: s.cancel_at_period_end || ending?.kind !== "exam" && s.cancel_at === item.current_period_end,
        ...(examEnd ? { examCancelAt: examEnd } : {}),
        ...(ending ? { memberEnding: ending } : {}),
        sourceInstance: s.metadata.source_instance, terms: s.metadata.terms_hash,
        ...(s.status === "trialing" ? { trialCard: await this.cardHash(s.default_payment_method ?? null) } : {}),
        ...(s.default_tax_rates === undefined ? { subscriptionTaxState: "unknown" as const } : {}) });
      if (s.latest_invoice) invoiceIds.add(s.latest_invoice);
    }
    const observedPayments = new Map<string, Payment>();
    let ledger: ReturnType<StripeMonthlyProvider["balanceLedger"]> | undefined;
    const balanceLedger = () => ledger ??= this.balanceLedger(target.customerId);
    for (const invoiceId of invoiceIds) {
      const i = await this.invoice(invoiceId), subId = i.parent.subscription_details.subscription;
      if (i.customer !== target.customerId || !subscriptionIds.has(subId)) throw new BillingError("invoice_owner_mismatch", 503);
      // The zero-yen invoice that opens a trial is not a payment and grants nothing; trial access comes from the contract.
      if (this.c.trialDays > 0 && i.billing_reason === "subscription_create" && i.total === 0 && i.starting_balance === 0 && i.amount_due === 0 && i.amount_paid === 0) continue;
      const lines = (await this.list(`invoices/${encodeURIComponent(i.id)}/lines`, {})).map(l => lineSchema.parse(l));
      if (lines.length !== 1 || lines[0].parent.subscription_item_details.subscription !== subId || lines[0].amount !== i.total
        || i.total < 1) throw new BillingError("unsupported_invoice", 503);
      const line = lines[0];
      const invoice: Invoice = { id: i.id, customerId: i.customer, subscriptionId: subId, priceId: line.pricing.price_details.price,
        periodStart: line.period.start, periodEnd: line.period.end, amount: i.total, paid: i.status === "paid", payments: [] };
      if (i.billing_reason === "subscription_cycle" && line.period.end === examEnds.get(subId)) invoice.examFinalCycle = true;
      if (line.parent.subscription_item_details.proration && !invoice.examFinalCycle)
        throw new BillingError("unsupported_invoice", 503);
      const due = Math.max(0, i.total + i.starting_balance);
      if (invoice.examFinalCycle && i.total < stripeMinimumYenCharge && i.starting_balance <= 0 && !i.amount_paid) {
        if (invoice.paid) {
          if (i.amount_remaining !== 0 || (i.amount_due !== 0 && i.amount_due !== due) || i.ending_balance !== i.starting_balance + i.total)
            throw new BillingError("unverified_invoice_balance", 503);
          invoice.examWriteOff = true;
        } else if (i.status === "void") invoice.examWaived = true;
        result.invoices.push(invoice);
        continue;
      }
      if (i.starting_balance > 0) {
        const history = await balanceLedger();
        const applied = history.findIndex(entry => entry.invoice === i.id && entry.type === "applied_to_invoice");
        const balanceApplication = history[applied];
        const finalizedAt = i.status_transitions?.finalized_at;
        // Some invoices account for a debit through their starting balance. Use
        // the balance at finalization only when there is no invoice-linked application.
        const lastAtFinalization = applied === -1 && invoice.paid && i.ending_balance === 0 && finalizedAt
          ? history.find(entry => entry.created <= finalizedAt) : undefined;
        const prior = balanceApplication?.amount === -i.starting_balance && balanceApplication.ending_balance === 0 ? history[applied + 1]
          : lastAtFinalization && finalizedAt && lastAtFinalization.created < finalizedAt ? lastAtFinalization : undefined;
        if (i.starting_balance >= stripeMinimumYenCharge || !prior?.invoice || prior.invoice === i.id
          || prior.type !== "invoice_too_small" || prior.amount !== i.starting_balance || prior.ending_balance !== i.starting_balance)
          throw new BillingError("unsupported_invoice_balance", 503);
        invoice.carryover = { transactionId: prior.id, amount: prior.amount };
        // Reconcile both invoices even when the renewal webhook arrives first.
        invoiceIds.add(prior.invoice);
      }
      if (invoice.paid && i.starting_balance < 0 && due > 0 && due < stripeMinimumYenCharge && i.amount_paid === 0) {
        if ((i.amount_due !== 0 && i.amount_due !== due) || i.amount_remaining !== 0 || i.ending_balance !== due)
          throw new BillingError("unverified_invoice_balance", 503);
        const credit = i.total - due;
        const entries = (await balanceLedger()).filter(entry => entry.invoice === i.id);
        const applied = entries.filter(entry => entry.type === "applied_to_invoice");
        const deferred = entries.filter(entry => entry.type === "invoice_too_small");
        if (applied.length !== 1 || applied[0].amount !== credit || applied[0].ending_balance !== 0
          || deferred.length !== 1 || deferred[0].amount !== due || deferred[0].ending_balance !== due
          || entries.some(entry => entry.type === "unapplied_from_invoice"))
          throw new BillingError("unverified_invoice_balance", 503);
        invoice.customerCredit = credit;
        invoice.deferredDebit = { transactionId: deferred[0].id, amount: due };
        result.invoices.push(invoice);
        continue;
      }
      if (i.amount_due !== due) throw new BillingError("unsupported_invoice", 503);
      if (invoice.paid) {
        if (i.amount_paid !== due || i.amount_remaining !== 0
          || i.starting_balance !== 0 && i.ending_balance !== Math.min(0, i.starting_balance + i.total))
          throw new BillingError("unsupported_invoice_payment", 503);
        if (due < i.total) invoice.customerCredit = i.total - due;
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
        if (invoice.payments.reduce((n, p) => n + p.amount, 0) !== due) throw new BillingError("unverified_invoice_payment", 503);
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
  private async balanceLedger(customerId: string) {
    const entries = await this.list(`customers/${encodeURIComponent(customerId)}/balance_transactions`, {});
    return entries.map(raw => {
      const entry = balanceTransactionSchema.parse(raw);
      this.mode(entry);
      if (entry.customer !== customerId) throw new BillingError("customer_mismatch", 503);
      return entry;
    });
  }
  private async customerBalance(customerId: string) {
    const customer = customerBalanceSchema.parse(await this.api(`customers/${encodeURIComponent(customerId)}`));
    this.mode(customer);
    if (customer.id !== customerId || customer.currency !== "jpy" && customer.balance !== 0)
      throw new BillingError("customer_mismatch", 503);
    return customer.balance;
  }
  async clearSmallExamBalance(customerId: string, invoice: Invoice) {
    const path = `invoices/${encodeURIComponent(invoice.id)}`;
    const key = `${this.c.sourceInstance}:exam-writeoff:${invoice.id}`;
    const validate = (value: z.infer<typeof invoiceSchema>) => {
      this.mode(value);
      if (!invoice.examFinalCycle || value.id !== invoice.id || value.customer !== customerId
        || value.parent.subscription_details.subscription !== invoice.subscriptionId || value.billing_reason !== "subscription_cycle"
        || value.total !== invoice.amount || value.total < 1 || value.total >= stripeMinimumYenCharge || value.amount_paid > 0)
        throw new BillingError("exam_writeoff_conflict", 503);
      return value;
    };
    let current = validate(await this.invoice(invoice.id));
    if (current.status === "draft") {
      try {
        current = validate(invoiceSchema.parse(await this.api(`${path}/finalize`, { auto_advance: "false" }, `${key}:finalize`)));
      } catch (error) {
        current = validate(await this.invoice(invoice.id));
        if (current.status === "draft") throw error;
      }
    }
    if (current.status === "open" || current.status === "uncollectible") {
      try {
        current = validate(invoiceSchema.parse(await this.api(`${path}/void`, {}, `${key}:void`)));
      } catch (error) {
        current = validate(await this.invoice(invoice.id));
        if (current.status === "open" || current.status === "uncollectible") throw error;
      }
    }
    if (current.status === "void") return;
    if (current.status !== "paid" || current.starting_balance > 0 || current.amount_remaining !== 0
      || current.ending_balance !== current.starting_balance + current.total)
      throw new BillingError("exam_writeoff_conflict", 503);
    const ledgerPath = `customers/${encodeURIComponent(customerId)}/balance_transactions`;
    const matches = (entry: z.infer<typeof balanceTransactionSchema>) => {
      this.mode(entry);
      return entry.customer === customerId && entry.type === "adjustment" && entry.amount === -invoice.amount
        && entry.metadata?.exam_invoice === invoice.id && entry.metadata?.source_instance === this.c.sourceInstance;
    };
    const ledger = await this.balanceLedger(customerId);
    if (ledger.some(matches)) return;
    const credit = Math.min(-current.starting_balance, current.total);
    const debit = current.total - credit;
    const verified = (type: string, amount: number) => !amount || ledger.some(entry => {
      this.mode(entry);
      return entry.customer === customerId && entry.invoice === invoice.id && entry.type === type && entry.amount === amount;
    });
    if (!verified("invoice_too_small", debit) || !verified("applied_to_invoice", credit))
      throw new BillingError("unverified_invoice_balance", 503);
    const adjustment = balanceTransactionSchema.parse(await this.api(ledgerPath, {
      amount: String(-invoice.amount), currency: "jpy", "metadata[exam_invoice]": invoice.id, "metadata[source_instance]": this.c.sourceInstance,
    }, `${key}:adjustment`));
    if (!matches(adjustment)) throw new BillingError("exam_writeoff_conflict", 503);
  }
  /** Irreversible per-card key for the one-trial-per-card rule; the raw fingerprint is never stored. */
  private async cardHash(paymentMethodId: string | null) {
    if (!paymentMethodId) return null;
    const pm = z.object({ id, livemode: z.boolean(), card: z.object({ fingerprint: z.string().min(1) }).nullable().optional() })
      .parse(await this.api(`payment_methods/${encodeURIComponent(paymentMethodId)}`)); this.mode(pm);
    if (pm.id !== paymentMethodId) throw new BillingError("payment_method_mismatch", 503);
    return pm.card ? createHash("sha256").update(`kakomon-trial-card:v1:${pm.card.fingerprint}`).digest("hex") : null;
  }
  async endTrial(subscriptionId: string, eventId: string) {
    const s = z.object({ id, livemode: z.boolean(), status: z.string() }).parse(await this.api(`subscriptions/${encodeURIComponent(subscriptionId)}`,
      { trial_end: "now", proration_behavior: "none" }, `${this.c.sourceInstance}:trial-end:${eventId}:${subscriptionId}`)); this.mode(s);
    if (s.id !== subscriptionId) throw new BillingError("subscription_mismatch", 503);
  }
  async stopRenewal(subscriptionId: string, eventId: string) {
    const s = z.object({ id, livemode: z.boolean(), cancel_at_period_end: z.literal(true) }).parse(await this.api(`subscriptions/${encodeURIComponent(subscriptionId)}`,
      { cancel_at_period_end: "true", proration_behavior: "none" }, `${this.c.sourceInstance}:risk:${eventId}:${subscriptionId}`)); this.mode(s);
    if (s.id !== subscriptionId) throw new BillingError("subscription_mismatch", 503);
  }
  async stopAppStoreOverlapRenewal(subscriptionId: string, customerId: string, signup: Signup) {
    const current = await this.ownedSubscription(subscriptionId, customerId, signup);
    const periodEnd = current.items.data[0].current_period_end;
    if (terminal(current.status)) return null;
    const ending = memberEnding(current);
    if (ending?.kind === "cancel" && ending.at === periodEnd) return periodEnd;
    if (current.cancel_at_period_end || (current.cancel_at != null && current.cancel_at <= periodEnd)) return null;
    const path = `subscriptions/${encodeURIComponent(subscriptionId)}`;
    const marker = `cancel:${periodEnd}`;
    const updated = subscriptionSchema.parse(await this.api(path,
      { cancel_at: String(periodEnd), "metadata[member_ending]": marker,
        proration_behavior: "none", "billing_cycle_anchor[type]": "unchanged" },
      `${this.c.sourceInstance}:app-store-overlap:${subscriptionId}`));
    this.mode(updated);
    if (updated.id !== subscriptionId || updated.cancel_at !== periodEnd || updated.metadata.member_ending !== marker)
      throw new BillingError("subscription_ending_unconfirmed", 503);
    return periodEnd;
  }
  async scheduleExamEnd(subscriptionId: string, customerId: string, signup: Signup, now: number) {
    const current = await this.ownedSubscription(subscriptionId, customerId, signup);
    const examEnd = signup.examEndAt;
    if (examEnd === undefined) throw new BillingError("subscription_owner_mismatch", 503);
    if (current.metadata.member_ending) return "superseded";
    if (terminal(current.status)) return "ended";
    const path = `subscriptions/${encodeURIComponent(subscriptionId)}`;
    if (examEnd <= now) {
      await this.endWithoutInvoice(subscriptionId, customerId, signup);
      return "ended";
    }
    if (current.cancel_at === examEnd) return "scheduled";
    if (current.cancel_at != null || current.cancel_at_period_end || !["active", "trialing", "past_due"].includes(current.status)) return "conflict";
    const updated = z.object({ id, livemode: z.boolean(), cancel_at: z.literal(examEnd) }).parse(await this.api(
      path, { cancel_at: String(examEnd), proration_behavior: "none" },
      `${this.c.sourceInstance}:exam-end:${signup.id}`,
    ));
    this.mode(updated);
    if (updated.id !== subscriptionId) throw new BillingError("subscription_mismatch", 503);
    return "scheduled";
  }

  private async ownedSubscription(subscriptionId: string, customerId: string, signup: Signup) {
    const current = await this.subscription(subscriptionId);
    const { price } = current.items.data[0];
    const originalExamEnd = signup.examEndAt === undefined ? undefined : String(signup.examEndAt);
    if (current.customer !== customerId || current.metadata.signup_id !== signup.id
      || current.metadata.terms_hash !== signup.terms || current.metadata.exam_end_at !== originalExamEnd
      || price.id !== signup.priceId || price.unit_amount !== signup.amount)
      throw new BillingError("subscription_owner_mismatch", 503);
    return current;
  }

  async changeEnding(subscriptionId: string, customerId: string, signup: Signup, change: EndingChange, now: number) {
    const current = await this.ownedSubscription(subscriptionId, customerId, signup);
    const { current_period_end: periodEnd } = current.items.data[0];
    if (!["active", "trialing", "past_due"].includes(current.status) || periodEnd <= now)
      throw new BillingError("subscription_ending_conflict", 409);
    const ending = memberEnding(current);
    const legacyExamEnd = current.metadata.member_ending ? undefined : confirmedExamEnd(current);
    const periodEndCancel = current.cancel_at_period_end || (current.cancel_at === periodEnd && !legacyExamEnd && ending?.kind !== "exam");
    if (periodEndCancel) {
      if (change.kind === "cancel") return;
      throw new BillingError("subscription_ending_conflict", 409);
    }
    if (current.cancel_at != null && !legacyExamEnd && ending?.kind !== "exam")
      throw new BillingError("subscription_ending_conflict", 409);
    const oldExamEnd = ending?.kind === "exam" ? ending.at : legacyExamEnd;
    if (oldExamEnd !== undefined && oldExamEnd <= now) throw new BillingError("subscription_ending_conflict", 409);
    if (change.kind === "exam" && change.at <= now) throw new BillingError("invalid_exam_date", 400);
    if (change.kind === "exam" && change.at === oldExamEnd || change.kind === "renew" && oldExamEnd === undefined && signup.examEndAt === undefined) return;

    // Arm Stripe at a full renewal boundary. The exam-end job stops access on
    // the requested day, with this boundary as a backstop against another charge.
    const stopAt = change.kind === "exam" ? examRenewalBoundary(current, change.at, legacyExamEnd) :
      change.kind === "cancel" ? periodEnd : null;
    const marker = change.kind === "exam" ? `exam:${change.at}:${stopAt}` :
      change.kind === "cancel" ? `cancel:${stopAt}` : "renew";
    if (current.metadata.member_ending === marker && (current.cancel_at ?? null) === stopAt) return;
    const body: Record<string, string> = { "metadata[member_ending]": marker, proration_behavior: "none", "billing_cycle_anchor[type]": "unchanged" };
    if ((current.cancel_at ?? null) !== stopAt) body.cancel_at = stopAt === null ? "" : String(stopAt);
    const updated = subscriptionSchema.parse(await this.api(`subscriptions/${encodeURIComponent(subscriptionId)}`, body));
    this.mode(updated);
    if (updated.id !== subscriptionId || updated.metadata.member_ending !== marker || (updated.cancel_at ?? null) !== stopAt)
      throw new BillingError("subscription_ending_unconfirmed", 503);
  }

  async endMemberExam(subscriptionId: string, customerId: string, signup: Signup, now: number) {
    const current = await this.ownedSubscription(subscriptionId, customerId, signup);
    const ending = memberEnding(current);
    if (!terminal(current.status) && ending?.kind === "exam" && ending.at <= now && !current.cancel_at_period_end)
      await this.endWithoutInvoice(subscriptionId, customerId, signup);
  }

  private async endWithoutInvoice(subscriptionId: string, customerId: string, signup: Signup) {
    try {
      const path = `subscriptions/${encodeURIComponent(subscriptionId)}?invoice_now=false&prorate=false`;
      const closed = z.object({ id, livemode: z.boolean(), status: z.literal("canceled") }).parse(await this.api(path, undefined, undefined, "DELETE"));
      this.mode(closed);
      if (closed.id !== subscriptionId) throw new BillingError("subscription_mismatch", 503);
    } catch (error) {
      // Stripe can reach the backstop at the same time as this job.
      if ((await this.ownedSubscription(subscriptionId, customerId, signup)).status !== "canceled") throw error;
    }
  }
}

type StripeSubscription = z.infer<typeof subscriptionSchema>;

function memberEnding(subscription: StripeSubscription): MemberEnding | undefined {
  if (!subscription.metadata.member_ending) return;
  const [kind, rawDate, rawRenewal] = subscription.metadata.member_ending.split(":");
  const at = Number(rawDate), renewalEnd = Number(rawRenewal);
  if (kind === "exam" && (subscription.cancel_at === renewalEnd || terminal(subscription.status))) return { kind, at, renewalEnd };
  if (kind === "cancel" && (subscription.cancel_at === at || terminal(subscription.status))) return { kind, at };
  // A Stripe Portal change can withdraw or override a stored reservation.
  return { kind: "renew" };
}

function examRenewalBoundary(subscription: StripeSubscription, endAt: number, legacyExamEnd?: number) {
  const item = subscription.items.data[0];
  const periodEnd = item.current_period_end;
  if (subscription.status === "trialing" && subscription.trial_end && endAt <= subscription.trial_end) return subscription.trial_end;
  const anchor = subscription.billing_cycle_anchor;
  if (!anchor) throw new BillingError("subscription_ending_unconfirmed", 503);
  if (endAt <= periodEnd && periodEnd !== legacyExamEnd && subscription.status !== "trialing") return periodEnd;

  const from = new Date(anchor * 1000);
  const target = new Date(Math.max(endAt, periodEnd) * 1000);
  const boundary = (nextMonth: number) => {
    const date = new Date(from);
    const month = target.getUTCMonth() + nextMonth;
    const lastDay = new Date(Date.UTC(target.getUTCFullYear(), month + 1, 0)).getUTCDate();
    date.setUTCFullYear(target.getUTCFullYear(), month, Math.min(from.getUTCDate(), lastDay));
    return date.getTime() / 1000;
  };
  return boundary(0) >= target.getTime() / 1000 ? boundary(0) : boundary(1);
}

function confirmedExamEnd(subscription: z.infer<typeof subscriptionSchema>): number | undefined {
  const scheduled = Number(subscription.metadata.exam_end_at);
  if (scheduled && (subscription.cancel_at === scheduled || subscription.status === "canceled" && subscription.ended_at != null
    && (subscription.ended_at === scheduled || subscription.ended_at > scheduled && subscription.items.data[0].current_period_end === scheduled))) return scheduled;
}
