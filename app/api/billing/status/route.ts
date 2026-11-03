import { billingFailure, billingIdentity, billingRuntime, json } from "@/lib/billing/runtime";
import { monthlySelected } from "@/lib/billing/subscription/config";
import { feedbackStore, unlockIdentity } from "@/lib/feedback/unlock-runtime";
export const runtime = "nodejs";
export async function GET(request: Request) {
  try {
    const userId = await billingIdentity();
    const service = monthlySelected() ? (await import("@/lib/billing/subscription/runtime")).monthlyRuntime().service : billingRuntime().service;
    const status = await service.status(userId, new URL(request.url).searchParams.get("order") ?? undefined);
    let feedbackSubmitted = false;
    if (status.entitled && process.env.FEEDBACK_UNLOCK_ENABLED === "true") {
      try { feedbackSubmitted = (await feedbackStore().status(unlockIdentity(request, userId))).submitted; }
      catch { /* Analytics must never prevent purchase confirmation. */ }
    }
    return json({ ...status, feedbackSubmitted });
  } catch (error) { return billingFailure(error); }
}
