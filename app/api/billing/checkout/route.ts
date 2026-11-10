import { z } from "zod";
import { billingFailure, billingIdentity, billingRuntime, json, sameOrigin } from "@/lib/billing/runtime";
import { checkoutEmail } from "@/lib/billing/checkout-email";
import { monthlySelected } from "@/lib/billing/subscription/config";
import { revenueCatAccess } from "@/mobile/server/revenuecat";
import { BillingError } from "@/lib/billing/domain";
import { recordFunnel, saveOrderAttribution } from "@/lib/billing/funnel";
import { requestAttribution } from "@/lib/billing/attribution";
export const runtime = "nodejs";
export async function POST(request: Request) {
  try {
    sameOrigin(request);
    const userId = await billingIdentity();
    if(await revenueCatAccess(userId,true))throw new BillingError("app_store_subscription_exists",409);
    const { terms } = z.object({ terms: z.string().length(64) }).strict().parse(await request.json());
    let result: { orderId: string; url: string };
    if (monthlySelected()) {
      const { service, provider } = (await import("@/lib/billing/subscription/runtime")).monthlyRuntime(true);
      result = await service.checkout(userId, terms, provider, await checkoutEmail());
    } else {
      const { service, provider } = billingRuntime();
      result = await service.checkout(userId, terms, provider);
    }
    // Awaited: the function is frozen once the response is sent.
    const attribution = requestAttribution(request);
    if (attribution) {
      await saveOrderAttribution(result.orderId, attribution);
      await recordFunnel("checkout_started", `user:${userId}`, Date.now(), attribution);
    } else await recordFunnel("checkout_started", `user:${userId}`);
    return json(result);
  } catch (error) { return billingFailure(error); }
}
