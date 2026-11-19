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
const approvalRecovery = reservation.extend({ action: z.literal("approval") });
const recovery = z.union([reservation, approvalRecovery, z.object({ attemptId: z.uuid() }).strict(),
  z.object({ expiresAt: z.iso.datetime() }).strict(), z.object({ legacy: z.literal(true) }).strict()]);
const preparation = z.object({ attemptId: z.uuid().optional(), confirmStoreKit: z.literal(true).optional() })
  .refine(({ attemptId, confirmStoreKit }) => !confirmStoreKit || !!attemptId);
const start = reservation.extend({ action: z.literal("start") });
const retryApproval = reservation.extend({ action: z.literal("retry-approval") });
const status = z.object({ action: z.literal("status"), userId: z.string().min(1) }).strict();

export async function POST(request: Request) {
  const requestedAt = Date.now();
  try {
    sameOrigin(request);
    const userId = await billingIdentity();
    if (monthlySelected()) {
      const parsed = preparation.safeParse(request.body ? await request.json().catch(() => null) : {});
      if (!parsed.success) throw new BillingError("invalid_request", 400);
      const { service, provider } = monthlyRuntime();
      const reservation = await service.reserveAppStorePurchase(userId, provider,
        memberId => appStorePurchaseCheck(memberId, memberId === userId ? "subscription_exists" : "duplicate_purchase"),
        () => assertNoDuplicatePurchase(userId), parsed.data, requestedAt);
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
    const parsed = z.union([start, retryApproval, status, recovery]).safeParse(await request.json().catch(() => null));
    if (!parsed.success) throw new BillingError("invalid_request", 400);
    const { data } = parsed;
    const managed = monthlySelected();
    if ("action" in data && data.action === "status") {
      if (data.userId !== userId) throw new BillingError("purchase_check_unavailable");
      return json({ managed, pending: managed ? await monthlyRuntime().service.appStorePurchaseHold(userId) : null });
    }
    if (!managed) return json({ state: await appStorePurchaseStatus(userId) });
    const { service } = monthlyRuntime();
    if ("action" in data && data.action === "start") {
      await service.startAppStorePurchase(userId, data.reservationId);
      return json({ started: true });
    }
    if ("action" in data && data.action === "retry-approval") {
      return json(await service.retryAppStoreApproval(userId, data.reservationId, id => appStorePurchaseStatus(id, true)));
    }
    return json(await service.recoverAppStorePurchase(userId, data, appStorePurchaseStatus));
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
