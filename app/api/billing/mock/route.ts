import { createHash } from "node:crypto";
import { z } from "zod";
import { billingFailure, billingIdentity, billingRuntime, json, sameOrigin } from "@/lib/billing/runtime";
import { BillingError } from "@/lib/billing/domain";
export const runtime = "nodejs";
export async function POST(request: Request) {
  try {
    sameOrigin(request);
    const userId = await billingIdentity();
    const { order, outcome } = z.object({ order: z.string().uuid(), outcome: z.enum(["paid", "failed", "refunded"]) }).strict().parse(await request.json());
    const { store, service, config } = billingRuntime();
    if (config.mode !== "mock") throw new BillingError("mock_disabled", 404);
    const p = await store.findOrder(order, "mock");
    if (!p || p.userId !== userId) throw new BillingError("purchase_not_found", 404);
    const eventId = `mock:${p.id}:${outcome}`;
    await service.receive({ eventId, digest: createHash("sha256").update(eventId).digest("hex"),
      orderId: p.id, userId, mode: "mock", sessionId: `mock_${p.id}`, paymentId: `mock_payment_${p.id}`,
      amount: p.amount, currency: "jpy", termsHash: p.termsHash, state: outcome });
    return json({ received: true });
  } catch (error) { return billingFailure(error); }
}
