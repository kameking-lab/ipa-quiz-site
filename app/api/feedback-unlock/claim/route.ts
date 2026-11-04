import { optionalBillingIdentity, sameOrigin, json } from "@/lib/billing/runtime";
import { feedbackStore, unlockIdentity } from "@/lib/feedback/unlock-runtime";
export const runtime = "nodejs";
/** Explicit account handover without consuming questions; safe to retry. */
export async function POST(request: Request) {
  try {
    sameOrigin(request);
    if (process.env.FEEDBACK_UNLOCK_ENABLED !== "true") return json({ error: "feedback_unavailable" }, 503);
    const userId = await optionalBillingIdentity();
    if (!userId) return json({ error: "sign_in_required" }, 401);
    const identity = unlockIdentity(request, userId);
    const store = feedbackStore();
    await store.claim(identity);
    return json(await store.status(identity));
  } catch { return json({ error: "feedback_unavailable" }, 503); }
}
