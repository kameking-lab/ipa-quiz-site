import { billingFailure, billingIdentity, billingRuntime, json, sameOrigin } from "@/lib/billing/runtime";
import { BillingError } from "@/lib/billing/domain";
import { z } from "zod";
import { monthlySelected } from "@/lib/billing/subscription/config";
import { feedbackStore, unlockIdentity } from "@/lib/feedback/unlock-runtime";
import { revenueCatAccess } from "@/mobile/server/revenuecat";
export const runtime = "nodejs";
async function readStatus(request: Request, confirm: boolean) {
  try {
    if (confirm) sameOrigin(request);
    const userId = await billingIdentity();
    const order = new URL(request.url).searchParams.get("order") ?? undefined;
    const monthly = monthlySelected();
    if (confirm && monthly && !z.uuid().safeParse(order).success) throw new BillingError("invalid_request", 400);
    let status;
    if (monthly) {
      const { service, provider } = (await import("@/lib/billing/subscription/runtime")).monthlyRuntime(false, confirm ? AbortSignal.timeout(20_000) : undefined);
      status = confirm && order ? await service.confirmCheckout(userId, order, provider) : await service.status(userId, order);
    } else {
      status = await billingRuntime().service.status(userId, order);
    }
    let appStore = false;
    if(!status.entitled) {
      const rc=await revenueCatAccess(userId, false, !confirm);
      if(rc?.expiresAt){ appStore = true; status={...status,entitled:true,expiresAt:rc.expiresAt.toISOString()}; }
    }
    let feedbackSubmitted = false;
    if (status.entitled && process.env.FEEDBACK_UNLOCK_ENABLED === "true") {
      try { feedbackSubmitted = (await feedbackStore().status(unlockIdentity(request, userId))).submitted; }
      catch { /* Analytics must never prevent purchase confirmation. */ }
    }
    return json({ ...status, feedbackSubmitted, appStore });
  } catch (error) { return billingFailure(error); }
}

export const GET = (request: Request) => readStatus(request, false);
export const POST = (request: Request) => readStatus(request, true);
