import { z } from "zod";
import { billingFailure, billingIdentity, billingRuntime, json, sameOrigin } from "@/lib/billing/runtime";
import { monthlySelected } from "@/lib/billing/subscription/config";
import { revenueCatAccess } from "@/mobile/server/revenuecat";
import { BillingError } from "@/lib/billing/domain";
export const runtime = "nodejs";
export async function POST(request: Request) {
  try {
    sameOrigin(request);
    const userId = await billingIdentity();
    if(await revenueCatAccess(userId,true))throw new BillingError("app_store_subscription_exists",409);
    const { terms } = z.object({ terms: z.string().length(64) }).strict().parse(await request.json());
    if (monthlySelected()) {
      const { service, provider } = (await import("@/lib/billing/subscription/runtime")).monthlyRuntime(true);
      return json(await service.checkout(userId, terms, provider));
    }
    const { service, provider } = billingRuntime();
    return json(await service.checkout(userId, terms, provider));
  } catch (error) { return billingFailure(error); }
}
