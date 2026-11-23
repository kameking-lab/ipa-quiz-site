import { ZodError } from "zod";
import { optionalBillingIdentity, sameOrigin, json } from "@/lib/billing/runtime";
import { BillingError } from "@/lib/billing/domain";
import { practiceGateEnabled } from "@/lib/billing/practice-access";
import { getClientIp } from "@/lib/rate-limit/server";
import { verifyTurnstileToken } from "@/lib/turnstile";
import { maskPII } from "@/lib/feedback/pii-masker";
import { UnlockFeedbackSchema } from "@/lib/feedback/unlock-contract";
import { feedbackHash, feedbackStore, unlockIdentity } from "@/lib/feedback/unlock-runtime";
import { notifyFeedbackUnlock } from "@/lib/feedback/unlock-notify";
export const runtime = "nodejs";

export async function GET(request: Request) {
  try {
    if (process.env.FEEDBACK_UNLOCK_ENABLED !== "true") return json({ eligible: false, submitted: false, remaining: 0 });
    if (!practiceGateEnabled() || !process.env.TURNSTILE_SECRET_KEY || !process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY) return json({ eligible: false, submitted: false, remaining: 0 });
    const userId = await optionalBillingIdentity();
    if (!userId) return json({ eligible: false, submitted: false, remaining: 0, requiresLogin: true });
    // Existing anonymous wallets remain readable for migration; issue no new browser ID.
    return json(await feedbackStore().status(unlockIdentity(request, userId)));
  } catch { return json({ error: "feedback_unavailable" }, 503); }
}

export async function POST(request: Request) {
  const receivedAt = new Date().toISOString();
  try {
    sameOrigin(request);
    if (process.env.FEEDBACK_UNLOCK_ENABLED !== "true") throw new BillingError("feedback_unavailable", 503);
    if (!practiceGateEnabled()) throw new BillingError("feedback_unavailable", 503);
    if (!process.env.TURNSTILE_SECRET_KEY || !process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY) throw new BillingError("feedback_unavailable", 503);
    const userId = await optionalBillingIdentity();
    if (!userId) throw new BillingError("sign_in_required", 401);
    // Bound the actual stream too: Content-Length is not trusted.
    const reader = request.body?.getReader();
    if (!reader) throw new BillingError("invalid_request", 400);
    const chunks: Uint8Array[] = [];
    let size = 0;
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > 16384) { await reader.cancel(); throw new BillingError("request_too_large", 413); }
      chunks.push(value);
    }
    let body: unknown;
    try { body = JSON.parse(Buffer.concat(chunks).toString("utf8")); } catch { throw new BillingError("invalid_request", 400); }
    const data = UnlockFeedbackSchema.parse(body);
    const identity = unlockIdentity(request, userId);
    const ip = getClientIp(request);
    const store = feedbackStore();
    if (!await store.consumeRate(feedbackHash("network-minute", `${identity.realm}:${Math.floor(Date.now() / 60000)}:${ip}`))) throw new BillingError("rate_limited", 429);
    const bot = await verifyTurnstileToken(data.turnstileToken, ip);
    if (!bot.ok || bot.skipped) throw new BillingError("turnstile_failed", 403);
    if (identity.account) await store.claim(identity);
    const maskedFeedback = {
      choices: data.choices,
      requestedQualifications: data.requestedQualifications.map(q => maskPII(q).masked.slice(0, 80)),
      commentMasked: maskPII(data.comment).masked.slice(0, 1000),
    };
    const result = await store.submit({ ...identity, browser: null }, null, maskedFeedback);
    // Await delivery before serverless freezes the request. Notification failure
    // must not undo the committed feedback or its ten-question benefit.
    await notifyFeedbackUnlock({ receivedAt, ...maskedFeedback });
    return json({ ok: true, ...result });
  } catch (error) {
    const status = error instanceof ZodError ? 400 : error instanceof BillingError ? error.status : 503;
    const response = json({ error: error instanceof ZodError ? "invalid_request" : error instanceof BillingError ? error.code : "feedback_unavailable" }, status);
    if (error instanceof BillingError && error.code === "rate_limited") response.headers.set("Retry-After", "60");
    return response;
  }
}
