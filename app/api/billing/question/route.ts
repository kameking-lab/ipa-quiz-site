import { z } from "zod";
import { findQuestionById } from "@/lib/questions/pool-server";
import { isPracticeReadyQuestion, shuffleChoices } from "@/lib/questions/filter";
import { billingConfig, gateReady } from "@/lib/billing/config";
import { BILLING_SAMPLE_ID } from "@/lib/billing/sample";
import { billingRuntime, json, optionalBillingIdentity, sameOrigin } from "@/lib/billing/runtime";
import { BillingError, jstDay } from "@/lib/billing/domain";
import { monthlyConfig, monthlySelected } from "@/lib/billing/subscription/config";
import { cookieHeader, guestClaim, guestCookie, guestGrant, guestRealm, readGuestCookie, resetAt } from "@/lib/billing/guest-practice";
import type { PracticeAccess } from "@/lib/billing/practice-contract";
export const runtime = "nodejs";
export async function POST(request: Request) {
  const now = Date.now();
  let access: PracticeAccess = { kind: "unavailable", remaining: null, freeDaily: 10, resetAt: resetAt(now), retryAfter: null };
  try {
    const { id, shuffle } = z.object({ id: z.string().min(1).max(160), shuffle: z.boolean().default(false) }).strict().parse(await request.json());
    const question = await findQuestionById(id);
    if (!question) throw new BillingError("not_found", 404);
    if (!isPracticeReadyQuestion(question)) throw new BillingError("content_under_review", 409);
    const monthly = monthlySelected();
    const config = monthly ? monthlyConfig() : billingConfig();
    const enabled = monthly ? monthlyConfig().enabled : gateReady(billingConfig());
    access.freeDaily = config.freeDaily;
    if (!enabled) access.kind = "free";
    else {
      sameOrigin(request);
      if (id === BILLING_SAMPLE_ID) access.kind = "sample";
      else {
        const userId = await optionalBillingIdentity();
        const service = userId ? (monthly ? (await import("@/lib/billing/subscription/runtime")).monthlyRuntime().service : billingRuntime().service) : null;
        // Existing paid/grace rights do not depend on anonymous cookie or KV.
        if (userId && service && (await service.status(userId)).entitled) {
          const grant = await service.grant(userId, question.id, [], false, jstDay(new Date(now)));
          access = { ...access, ...grant };
        } else {
          const realm = guestRealm(config.mode, config.sourceInstance);
          let guest: string | null = null;
          let guestVerificationAvailable = true;
          try { guest = readGuestCookie(request, realm, now); }
          catch (error) {
            if (!userId) throw error;
            guestVerificationAvailable = false;
          }
          if (!userId && !guest) {
            access.kind = "guest";
            access.remaining = config.freeDaily;
            const response = json({ error: "guest_cookie_required", access }, 428);
            response.headers.append("Set-Cookie", cookieHeader(guestCookie(realm, now), new URL(request.url).protocol === "https:"));
            return response;
          }
          if (!userId && guest) {
            const result = await guestGrant(realm, guest, question.id, config.freeDaily, now);
            access.kind = "guest";
            if (result.status === "claimed") throw new BillingError("sign_in_required", 401);
            if (result.status === "rate") { access.retryAfter = result.retry ?? 60; throw new BillingError("guest_rate_limited", 429); }
            if (result.status === "limit") { access.remaining = 0; throw new BillingError("daily_limit", 429); }
            if (result.status !== "ok" || result.used === undefined) throw new BillingError("billing_unavailable", 503);
            access.remaining = Math.max(0, config.freeDaily - result.used);
          } else if (userId && service) {
            let snapshots: Awaited<ReturnType<typeof guestClaim>> = [];
            let allowNew = guestVerificationAvailable;
            if (guest) {
              try { snapshots = await guestClaim(realm, guest, userId, config.freeDaily, now); }
              catch { allowNew = false; }
            }
            const grant = await service.grant(userId, question.id, snapshots, allowNew, jstDay(new Date(now)));
            access = { ...access, ...grant };
          }
        }
      }
    }
    return json({ question: shuffle ? shuffleChoices(question) : question, access });
  } catch (error) {
    const code = error instanceof BillingError ? error.code : "billing_unavailable";
    const status = error instanceof BillingError ? error.status : 503;
    if (code === "daily_limit") { access.remaining = 0; if (access.kind === "unavailable") access.kind = "trial"; }
    if (status === 503) { access.kind = "unavailable"; access.remaining = null; }
    const response = json({ error: code, access }, status);
    if (access.retryAfter !== null) response.headers.set("Retry-After", String(access.retryAfter));
    return response;
  }
}
