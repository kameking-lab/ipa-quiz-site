import { billingFailure, billingIdentity, json, sameOrigin } from "@/lib/billing/runtime";
import { BillingError } from "@/lib/billing/domain";
import { assertNoDuplicatePurchase } from "@/lib/billing/duplicate-purchase-runtime";
import { mobileEntitlement } from "@/mobile/server/entitlement";
export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    sameOrigin(request);
    const userId = await billingIdentity();
    const access = await mobileEntitlement(userId, true);
    if (access.entitled) throw new BillingError("subscription_exists", 409);
    await assertNoDuplicatePurchase(userId);
    return json({ allowed: true });
  } catch (error) { return billingFailure(error); }
}
