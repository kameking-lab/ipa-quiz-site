import "server-only";
import { createHash } from "node:crypto";
import { z } from "zod";
import type { BillingConfig } from "./config";
import { refundState, unknownSuccessTime, type RefundObservation, type SuccessTime } from "./finance";
import { BillingError, type BillingStore, type CheckoutProvider, type PaymentSnapshot, type Purchase, type RefundState } from "./domain";

const metadata = z.object({ order_id: z.string().uuid(), user_id: z.string().min(1), terms_hash: z.string().length(64) });
const intentSchema = z.object({ id: z.string().startsWith("pi_"), livemode: z.boolean(), metadata,
  status: z.string(), amount: z.number().int(), amount_received: z.number().int(), currency: z.string(),
  latest_charge: z.object({ id: z.string(), livemode: z.boolean(), amount_refunded: z.number(), disputed: z.boolean() }).nullable() });
const sessionSchema = z.object({ id: z.string(), livemode: z.boolean(), mode: z.literal("payment"),
  client_reference_id: z.string(), metadata, amount_total: z.number().int(), currency: z.literal("jpy"),
  status: z.string(), payment_status: z.string(), payment_intent: intentSchema.nullable(), url: z.string().url().nullable() });
const eventSchema = z.object({ id: z.string().startsWith("evt_"), type: z.string(), livemode: z.boolean(), created: z.number().int().positive().optional(),
  data: z.object({ object: z.object({ id: z.string(), payment_intent: z.string().nullable().optional(), charge: z.string().optional() }).passthrough() }) });

const refundSchema = z.object({ id: z.string().regex(/^[A-Za-z][A-Za-z0-9_]{0,254}$/), payment_intent: z.string().startsWith("pi_"),
  amount: z.number().int().positive(), currency: z.literal("jpy"),
  status: z.enum(["pending", "requires_action", "succeeded", "failed", "canceled"]) });
const refundListSchema = z.object({ has_more: z.boolean(), data: z.array(refundSchema) });
const normalizeRefund = (status: z.infer<typeof refundSchema>["status"]): RefundState => status === "requires_action" ? "pending" : status;

export class StripeCheckoutProvider implements CheckoutProvider {
  private live: boolean;
  constructor(private config: BillingConfig, private key: string, private store: BillingStore, private fetcher: typeof fetch = fetch) {
    this.live = config.mode === "stripe-live";
    if (!["stripe-test", "stripe-live"].includes(config.mode) || !(this.live ? /^(sk|rk)_live_/ : /^(sk|rk)_test_/).test(key)) throw new BillingError("payment_mode_key_mismatch", 503);
  }
  private checkMode(value: { livemode: boolean; id?: string }, checkout = false) {
    if (value.livemode !== this.live || (checkout && !value.id?.startsWith(this.live ? "cs_live_" : "cs_test_"))) throw new BillingError("payment_mode_mismatch", 400);
  }
  private checkObjects(session: z.infer<typeof sessionSchema> | null, intent: z.infer<typeof intentSchema> | null) {
    if (session) this.checkMode(session, true);
    if (intent) this.checkMode(intent);
    if (intent?.latest_charge) this.checkMode(intent.latest_charge);
  }
  private async api(path: string, body?: URLSearchParams, idempotency?: string): Promise<unknown> {
    const response = await this.fetcher(`https://api.stripe.com/v1/${path}`, {
      method: body ? "POST" : "GET", body, cache: "no-store", signal: AbortSignal.timeout(15000),
      headers: { Authorization: `Bearer ${this.key}`, "Stripe-Version": "2026-09-30.endive",
        ...(body ? { "Content-Type": "application/x-www-form-urlencoded" } : {}),
        ...(idempotency ? { "Idempotency-Key": idempotency } : {}) },
    });
    // Never propagate provider bodies, keys, buyer data or raw errors to logs/clients.
    if (!response.ok) throw new BillingError("payment_provider_unavailable", 503);
    return response.json();
  }
  async create(p: Purchase) {
    if (p.mode !== this.config.mode) throw new BillingError("payment_mode_mismatch", 400);
    // Derived from the persisted random UUID: stable across idempotent retries.
    const suffix = [...createHash("sha256").update(p.id).digest().subarray(0, 8)].map(byte => String.fromCharCode(97 + byte % 26)).join("");
    const body = new URLSearchParams({ mode: "payment", integration_identifier: `kakomon-pass-${suffix}`,
      client_reference_id: p.userId, "line_items[0][quantity]": "1",
      "adaptive_pricing[enabled]": "false",
      success_url: `${this.config.origin}/billing/success?order=${p.id}`,
      cancel_url: `${this.config.origin}/billing/cancel?order=${p.id}`,
      "custom_text[submit][message]": `${p.amount}円（税込）を支払時に1回決済。サーバーで支払確認後${p.days}日間。自動更新なし。${this.config.seller.refund}`,
    });
    if (this.live) {
      // Live uses an operator-provisioned price only. Never create live products/prices inline.
      const priceId = this.config.livePriceId;
      if (!priceId || !/^price_\w+$/.test(priceId)) throw new BillingError("live_price_missing", 503);
      const price = z.object({ id: z.string(), livemode: z.literal(true), active: z.literal(true), currency: z.literal("jpy"), unit_amount: z.number().int(), recurring: z.null(), billing_scheme: z.literal("per_unit"), tax_behavior: z.literal("inclusive") }).parse(await this.api(`prices/${encodeURIComponent(priceId)}`));
      if (price.id !== priceId || price.unit_amount !== p.amount) throw new BillingError("live_price_mismatch", 503);
      body.set("line_items[0][price]", priceId);
    } else {
      body.set("line_items[0][price_data][currency]", "jpy"); body.set("line_items[0][price_data][unit_amount]", String(p.amount));
      body.set("line_items[0][price_data][product_data][name]", `【テスト】連続演習${p.days}日パス（税込・自動更新なし）`);
    }
    for (const prefix of ["metadata", "payment_intent_data[metadata]"]) {
      body.set(`${prefix}[order_id]`, p.id); body.set(`${prefix}[user_id]`, p.userId); body.set(`${prefix}[terms_hash]`, p.termsHash);
    }
    const session = z.object({ id: z.string(), livemode: z.boolean(), url: z.string().url() }).parse(await this.api("checkout/sessions", body, `pass:${p.id}`));
    this.checkMode(session, true);
    if (new URL(session.url).origin !== "https://checkout.stripe.com") throw new BillingError("invalid_checkout_url", 503);
    return { id: session.id, url: session.url };
  }
  private async refunds(paymentId: string) {
    const rows: z.infer<typeof refundSchema>[] = [];
    const seen = new Set<string>();
    let cursor = "";
    for (let page = 0; page < 20; page++) {
      const query = new URLSearchParams({ payment_intent: paymentId, limit: "100" });
      if (cursor) query.set("starting_after", cursor);
      const response = refundListSchema.parse(await this.api(`refunds?${query}`));
      for (const r of response.data) {
        if (r.payment_intent !== paymentId || seen.has(r.id)) throw new BillingError("refund_list_inconsistent", 503);
        seen.add(r.id); rows.push(r);
      }
      if (!response.has_more) return rows;
      if (!response.data.length) throw new BillingError("refund_list_incomplete", 503);
      cursor = response.data[response.data.length - 1].id;
    }
    throw new BillingError("refund_list_incomplete", 503);
  }
  async snapshot(value: unknown, digest: string): Promise<PaymentSnapshot | null> {
    const event = eventSchema.parse(value);
    this.checkMode(event);
    const type = event.type;
    const object = event.data.object;
    const sessionEvent = ["checkout.session.completed", "checkout.session.async_payment_succeeded", "checkout.session.async_payment_failed", "checkout.session.expired"].includes(type);
    const refundEvent = ["charge.refunded", "refund.created", "refund.updated", "refund.failed", "charge.dispute.created"].includes(type);
    const paymentEvent = type === "payment_intent.succeeded";
    if (!sessionEvent && !refundEvent && !paymentEvent) return null;
    let session: z.infer<typeof sessionSchema> | null = null;
    let intent: z.infer<typeof intentSchema> | null = null;
    if (sessionEvent) {
      session = sessionSchema.parse(await this.api(`checkout/sessions/${encodeURIComponent(object.id)}?expand[]=payment_intent.latest_charge`));
      if (session.id !== object.id) throw new BillingError("session_mismatch", 400);
      intent = session.payment_intent;
    } else {
      let paymentId = paymentEvent ? object.id : object.payment_intent;
      if (!paymentId && object.charge) {
        const charge = z.object({ payment_intent: z.string(), livemode: z.boolean() }).parse(await this.api(`charges/${encodeURIComponent(object.charge)}`));
        this.checkMode(charge); paymentId = charge.payment_intent;
      }
      if (!paymentId) throw new BillingError("missing_payment", 503);
      intent = intentSchema.parse(await this.api(`payment_intents/${encodeURIComponent(paymentId)}?expand[]=latest_charge`));
      if (intent.id !== paymentId) throw new BillingError("payment_mismatch", 400);
    }
    this.checkObjects(session, intent);
    const meta = session?.metadata ?? intent?.metadata;
    if (!meta || (session && session.client_reference_id !== meta.user_id)) throw new BillingError("invalid_owner", 400);
    if (intent && JSON.stringify(intent.metadata) !== JSON.stringify(meta)) throw new BillingError("invalid_payment_metadata", 400);
    const p = await this.store.findOrder(meta.order_id, this.live ? "stripe-live" : "stripe-test");
    if (!p) throw new BillingError("purchase_missing", 503);
    if (p.userId !== meta.user_id || p.termsHash !== meta.terms_hash || (p.paymentId && p.paymentId !== intent?.id)) throw new BillingError("payment_owner_mismatch", 400);
    if (!session && p.sessionId) {
      session = sessionSchema.parse(await this.api(`checkout/sessions/${encodeURIComponent(p.sessionId)}?expand[]=payment_intent.latest_charge`));
      if (session.id !== p.sessionId || session.metadata.order_id !== p.id || session.client_reference_id !== p.userId
        || session.metadata.user_id !== p.userId || session.metadata.terms_hash !== p.termsHash
        || session.payment_intent?.id !== intent?.id) throw new BillingError("refund_owner_mismatch", 400);
      intent = session.payment_intent; this.checkObjects(session, intent);
      if (JSON.stringify(intent?.metadata) !== JSON.stringify(meta)) throw new BillingError("invalid_payment_metadata", 400);
    }
    const confirmed = intent?.status === "succeeded" && intent.amount_received === p.amount && intent.amount === p.amount
      && intent.currency === "jpy" && (!session || session.payment_status === "paid");
    if (intent?.status === "succeeded" && !confirmed) throw new BillingError("confirmed_payment_mismatch", 503);
    const amount = confirmed ? intent!.amount_received : intent?.amount ?? session!.amount_total;
    if (amount !== p.amount || (session && session.amount_total !== amount)) throw new BillingError("amount_mismatch", 400);
    const time = (): SuccessTime => event.created ? { at: new Date(event.created * 1000).toISOString(),
      provenance: { kind: "stripe_success_event_created", eventId: event.id, eventType: type, providerCreatedSeconds: event.created } } : unknownSuccessTime();
    let finance: PaymentSnapshot["finance"];
    let refundFact: PaymentSnapshot["refund"];
    if (confirmed && intent) {
      const listed = await this.refunds(intent.id);
      if (type.startsWith("refund.")) {
        // Retrieve the triggering refund after pagination as well; never trust client supplied amounts/state.
        const current = refundSchema.parse(await this.api(`refunds/${encodeURIComponent(object.id)}`));
        if (current.id !== object.id || current.payment_intent !== intent.id) throw new BillingError("refund_payment_mismatch", 400);
        const index = listed.findIndex(r => r.id === current.id);
        if (index >= 0) {
          if (listed[index].amount !== current.amount) throw new BillingError("refund_amount_conflict", 503);
          current.status = refundState(normalizeRefund(listed[index].status), normalizeRefund(current.status));
          listed[index] = current;
        } else listed.push(current);
      }
      const refunds: RefundObservation[] = listed.map(r => {
        const rawMatches = type.startsWith("refund.") && object.id === r.id && object.payment_intent === intent!.id
          && object.amount === r.amount && object.currency === "jpy";
        const rawSuccess = rawMatches && object.status === "succeeded";
        const signedCorrection = rawMatches && (object.status === "failed" || object.status === "canceled") ? object.status : undefined;
        const state = refundState(normalizeRefund(r.status), signedCorrection ?? (rawSuccess ? "succeeded" : normalizeRefund(r.status)));
        return { refundId: r.id, amountJPY: r.amount, state,
          successTime: rawSuccess ? time() : r.status === "succeeded" ? unknownSuccessTime() : null };
      });
      const triggered = refunds.find(r => r.refundId === object.id);
      if (type.startsWith("refund.") && triggered) refundFact = { id: triggered.refundId, state: triggered.state };
      const signedPaid = paymentEvent && object.id === intent.id && object.status === "succeeded"
        && object.amount_received === amount && object.currency === "jpy"
        || ["checkout.session.completed", "checkout.session.async_payment_succeeded"].includes(type)
        && object.payment_intent === intent.id && object.payment_status === "paid" && object.mode === "payment"
        && object.amount_total === amount && object.currency === "jpy";
      finance = { eventType: type, currency: "jpy", grossJPY: amount, paidTime: signedPaid ? time() : unknownSuccessTime(),
        refunds, refundsComplete: true, disputeObserved: type === "charge.dispute.created" || !!intent.latest_charge?.disputed };
    } else if (refundEvent) throw new BillingError("refund_payment_unconfirmed", 503);
    // Monetary state comes from per-ID reconciled refunds, never aggregate charge.amount_refunded or event.created ordering.
    const state = finance?.disputeObserved || finance?.refunds.some(r => r.state === "succeeded") ? "refunded"
      : finance?.refunds.some(r => r.state === "pending") ? "suspended" : confirmed ? "paid"
      : session?.status === "expired" ? "expired" : type === "checkout.session.async_payment_failed" ? "failed" : "pending";
    return { eventId: event.id, digest, orderId: meta.order_id, userId: meta.user_id, mode: this.live ? "stripe-live" : "stripe-test",
      sessionId: session?.id ?? p.sessionId, paymentId: intent?.id ?? null, amount, currency: intent?.currency ?? session!.currency,
      termsHash: meta.terms_hash, state, ...(refundFact ? { refund: refundFact } : {}), ...(finance ? { finance } : {}) };
  }
}
