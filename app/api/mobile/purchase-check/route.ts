import { z } from "zod";
import { billingFailure, billingIdentity, json, sameOrigin } from "@/lib/billing/runtime";
import { BillingError } from "@/lib/billing/domain";
import { assertNoDuplicatePurchase } from "@/lib/billing/duplicate-purchase-runtime";
import { mobileEntitlement } from "@/mobile/server/entitlement";
import { monthlySelected } from "@/lib/billing/subscription/config";
import { monthlyRuntime } from "@/lib/billing/subscription/runtime";
import { appStorePurchaseCheck, appStorePurchaseStatus } from "@/mobile/server/revenuecat";
export const runtime = "nodejs";

const reservation = z.object({ reservationId: z.uuid() }).strict();
const recovery = z.union([reservation, z.object({ attemptId: z.uuid() }).strict(),
  z.object({ expiresAt: z.iso.datetime() }).strict(), z.object({ legacy: z.literal(true) }).strict()]);

export async function POST(request: Request) {
  try {
    sameOrigin(request);
    const userId = await billingIdentity();
    if (monthlySelected()) {
      const parsed = z.object({ attemptId: z.uuid().optional() }).safeParse(request.body ? await request.json().catch(() => null) : {});
      if (!parsed.success) throw new BillingError("invalid_request", 400);
      await assertNoDuplicatePurchase(userId);
      const { service, provider } = monthlyRuntime();
      const reservation = await service.reserveAppStorePurchase(userId, provider,
        memberId => appStorePurchaseCheck(memberId, memberId === userId ? "subscription_exists" : "duplicate_purchase"), parsed.data.attemptId);
      return json({ allowed: true, reservation });
    }
    const access = await mobileEntitlement(userId, true);
    if (access.entitled) throw new BillingError("subscription_exists", 409);
    await assertNoDuplicatePurchase(userId);
    return json({ allowed: true });
  } catch (error) { return billingFailure(error); }
}

export async function PATCH(request: Request) {
  try {
    sameOrigin(request);
    const userId = await billingIdentity();
    const parsed = recovery.safeParse(await request.json().catch(() => null));
    if (!parsed.success) throw new BillingError("invalid_request", 400);
    const check = () => appStorePurchaseStatus(userId);
    const state = monthlySelected() ? await monthlyRuntime().service.recoverAppStorePurchase(userId, parsed.data, check) : await check();
    return json({ state });
  } catch (error) { return billingFailure(error); }
}

export async function DELETE(request: Request) {
  try {
    sameOrigin(request);
    const userId = await billingIdentity();
    const body: unknown = await request.json().catch(() => null);
    const parsed = reservation.safeParse(body);
    if (!parsed.success) throw new BillingError("invalid_request", 400);
    if (monthlySelected()) await monthlyRuntime().service.releaseAppStorePurchase(userId, parsed.data.reservationId);
    return json({ released: true });
  } catch (error) { return billingFailure(error); }
}
