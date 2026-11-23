import { billingFailure, billingWebhookRuntime, json } from "@/lib/billing/runtime";
import { BillingError } from "@/lib/billing/domain";
import { eventDigest, verifyStripeEvent } from "@/lib/billing/signature";
import { StripeCheckoutProvider } from "@/lib/billing/stripe";
import { billingWebhookConfig } from "@/lib/billing/config";
import { monthlyConfig, monthlySelected } from "@/lib/billing/subscription/config";
import { recordFunnel, readOrderAttribution } from "@/lib/billing/funnel";
import { readConversionChannel, recordConversion } from "@/lib/billing/conversion";
export const runtime = "nodejs";
export async function POST(request: Request) {
  try {
    if (Number(request.headers.get("content-length") ?? "0") > 262144) throw new BillingError("event_too_large", 413);
    const raw = new Uint8Array(await request.arrayBuffer());
    const monthly = monthlySelected();
    const mode = monthly ? monthlyConfig().mode : billingWebhookConfig().mode;
    if (mode !== "stripe-test" && mode !== "stripe-live") throw new BillingError("stripe_disabled", 503);
    const secret = mode === "stripe-live" ? process.env.BILLING_STRIPE_LIVE_WEBHOOK_SECRET : process.env.BILLING_STRIPE_TEST_WEBHOOK_SECRET;
    const event = verifyStripeEvent(raw, request.headers.get("stripe-signature"), secret ?? "");
    if (monthly) {
      const { service, provider } = (await import("@/lib/billing/subscription/runtime")).monthlyRuntime();
      const result = await service.receive(event as { id: string }, eventDigest(raw), provider);
      const session = completedSubscriptionSession(event);
      // Counted once per Checkout session (Stripe retries are de-duplicated), awaited before the 2xx.
      if (session && result !== "ignored") {
        const object = (event as { data?: { object?: { client_reference_id?: unknown } } }).data?.object;
        const order = typeof object?.client_reference_id === "string" ? object.client_reference_id : "";
        const attribution = order ? await readOrderAttribution(order) : null;
        if (attribution) await recordFunnel("checkout_completed", `session:${session}`, Date.now(), attribution);
        else await recordFunnel("checkout_completed", `session:${session}`);
      }
      const paymentSession = completedSubscriptionSession(event, true);
      const paidObject = (event as { data?: { object?: { payment_status?: unknown; client_reference_id?: unknown } } }).data?.object;
      if (paymentSession && result !== "ignored" && paidObject?.payment_status === "paid") {
        const channel = typeof paidObject.client_reference_id === "string" ? await readConversionChannel(paidObject.client_reference_id) : "unknown";
        const created = (event as { created?: unknown }).created;
        const occurred = typeof created === "number" && Number.isSafeInteger(created) && created > 0 ? created * 1000 : Date.now();
        await recordConversion("payment_completed", channel, paymentSession, occurred);
      }
      return json({ received: true, result });
    }
    const { service, provider } = billingWebhookRuntime();
    if (!(provider instanceof StripeCheckoutProvider)) throw new BillingError("stripe_disabled", 503);
    const snapshot = await provider.snapshot(event, eventDigest(raw));
    if (!snapshot) return json({ received: true, ignored: true });
    await service.receive(snapshot); // 2xx only after transaction commit; DB/provider errors remain retryable.
    return json({ received: true });
  } catch (error) { return billingFailure(error); }
}

/** The verified event's Checkout session ID when it completed a subscription purchase. */
function completedSubscriptionSession(event: unknown, includeAsync = false): string | null {
  if (!event || typeof event !== "object") return null;
  const e = event as { type?: unknown; data?: { object?: { id?: unknown; mode?: unknown; status?: unknown } } };
  const object = e.data?.object;
  return (e.type === "checkout.session.completed" || includeAsync && e.type === "checkout.session.async_payment_succeeded") && object?.mode === "subscription" && object.status === "complete"
    && typeof object.id === "string" ? object.id : null;
}
