import { z } from "zod";
import { billingFailure, billingIdentity, json, sameOrigin } from "@/lib/billing/runtime";
import { BillingError } from "@/lib/billing/domain";
import { assertNoDuplicatePurchase } from "@/lib/billing/duplicate-purchase-runtime";
import { mobileEntitlement } from "@/mobile/server/entitlement";
import { monthlySelected } from "@/lib/billing/subscription/config";
import { monthlyRuntime } from "@/lib/billing/subscription/runtime";
import { appStorePurchaseCheck } from "@/mobile/server/revenuecat";
export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    sameOrigin(request);
    const userId = await billingIdentity();
    if (monthlySelected()) {
      await assertNoDuplicatePurchase(userId);
      const { service, provider } = monthlyRuntime();
      const checkAppStore = await appStorePurchaseCheck(userId, "subscription_exists");
      const reservation = await service.reserveAppStorePurchase(userId, provider, checkAppStore);
      return json({ allowed: true, reservation });
    }
    const access = await mobileEntitlement(userId, true);
    if (access.entitled) throw new BillingError("subscription_exists", 409);
    await assertNoDuplicatePurchase(userId);
    return json({ allowed: true });
  } catch (error) { return billingFailure(error); }
}

export async function DELETE(request: Request) {
  try {
    sameOrigin(request);
    const userId = await billingIdentity();
    const body: unknown = await request.json().catch(() => null);
    const parsed = z.object({ reservationId: z.uuid() }).strict().safeParse(body);
    if (!parsed.success) throw new BillingError("invalid_request", 400);
    if (monthlySelected()) await monthlyRuntime().service.releaseAppStorePurchase(userId, parsed.data.reservationId);
    return json({ released: true });
  } catch (error) { return billingFailure(error); }
}
