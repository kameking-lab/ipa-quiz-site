import { ZodError } from "zod";
import { optionalBillingIdentity, sameOrigin, json } from "@/lib/billing/runtime";
import { BillingError, jstDay } from "@/lib/billing/domain";
import { practiceGateEnabled } from "@/lib/billing/practice-access";
import { getClientIp } from "@/lib/rate-limit/server";
import { verifyTurnstileToken } from "@/lib/turnstile";
import { maskPII } from "@/lib/feedback/pii-masker";
import { UnlockFeedbackSchema } from "@/lib/feedback/unlock-contract";
import { feedbackHash, feedbackStore, unlockIdentity, readFeedbackBrowser, newFeedbackBrowser, feedbackBrowserHeader } from "@/lib/feedback/unlock-runtime";
export const runtime = "nodejs";

export async function GET(request: Request) {
  try {
    if (process.env.FEEDBACK_UNLOCK_ENABLED !== "true") return json({ eligible: false, submitted: false, remaining: 0 });
    const browser = readFeedbackBrowser(request) ?? newFeedbackBrowser();
    const identity = unlockIdentity(request, await optionalBillingIdentity(), undefined, browser);
    const response = json(await feedbackStore().status(identity));
    response.headers.append("Set-Cookie", feedbackBrowserHeader(browser, new URL(request.url).protocol === "https:"));
    return response;
  } catch { return json({ error: "feedback_unavailable" }, 503); }
}

export async function POST(request: Request) {
  try {
    sameOrigin(request);
    if (process.env.FEEDBACK_UNLOCK_ENABLED !== "true") throw new BillingError("feedback_unavailable", 503);
    if (!practiceGateEnabled()) throw new BillingError("feedback_unavailable", 503);
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
    const identity = unlockIdentity(request, await optionalBillingIdentity());
    if (!identity.account && !identity.browser) throw new BillingError("guest_cookie_required", 428);
    const ip = getClientIp(request);
    const store = feedbackStore();
    if (!await store.consumeRate(feedbackHash("network-minute", `${identity.realm}:${Math.floor(Date.now() / 60000)}:${ip}`))) throw new BillingError("rate_limited", 429);
    if (!(await verifyTurnstileToken(data.turnstileToken, ip)).ok) throw new BillingError("turnstile_failed", 403);
    if (identity.account) await store.claim(identity);
    const result = await store.submit(identity,
      identity.account ? null : feedbackHash("network-day", `${identity.realm}:${jstDay(new Date())}:${ip}`), {
        choices: data.choices,
        requestedQualifications: data.requestedQualifications.map(q => maskPII(q).masked.slice(0, 80)),
        commentMasked: maskPII(data.comment).masked.slice(0, 1000),
      });
    // No copilot token, local grant or notification is issued by this separate benefit.
    return json({ ok: true, ...result });
  } catch (error) {
    const status = error instanceof ZodError ? 400 : error instanceof BillingError ? error.status : 503;
    const response = json({ error: error instanceof ZodError ? "invalid_request" : error instanceof BillingError ? error.code : "feedback_unavailable" }, status);
    if (status === 429) response.headers.set("Retry-After", "60");
    return response;
  }
}
