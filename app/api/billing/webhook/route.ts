import { billingFailure, billingWebhookRuntime, json } from "@/lib/billing/runtime";
import { BillingError } from "@/lib/billing/domain";
import { eventDigest, verifyStripeEvent } from "@/lib/billing/signature";
import { StripeCheckoutProvider } from "@/lib/billing/stripe";
import { billingWebhookConfig } from "@/lib/billing/config";
import { monthlyConfig, monthlySelected } from "@/lib/billing/subscription/config";
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
