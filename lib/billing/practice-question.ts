import "server-only";
import { z } from "zod";
import { findQuestionById } from "@/lib/questions/pool-server";
import { isPracticeReadyQuestion, shuffleChoices } from "@/lib/questions/filter";
import { billingConfig, gateReady } from "@/lib/billing/config";
import { BILLING_SAMPLE_ID } from "@/lib/billing/sample";
import { json, optionalBillingIdentity, optionalBillingSession, sameOrigin } from "@/lib/billing/runtime";
import { BillingError, DailyLimitError, jstDay } from "@/lib/billing/domain";
import { monthlyConfig, monthlySelected } from "@/lib/billing/subscription/config";
import { cookieHeader, guestClaim, guestCookie, guestGrant, guestRealm, readGuestCookie, resetAt } from "@/lib/billing/guest-practice";
import type { PracticeAccess } from "@/lib/billing/practice-contract";
import { studyMembership } from "@/lib/billing/study-membership";
import { aiQuotaEnabled } from "@/lib/ai/access-config";
import { loadExamPaper } from "@/lib/exam-library-papers";
import { createHash } from "node:crypto";
import { feedbackStore, unlockIdentity, readFeedbackBrowser, feedbackBrowserHeader } from "@/lib/feedback/unlock-runtime";
import { strictContentGateEnabled } from "@/lib/billing/content-policy";
import { paperReviewProof } from "@/mobile/server/paper-review";
import { conversionChannel, recordConversion } from "@/lib/billing/conversion";
export async function practiceQuestion(request: Request, retryIds?: Set<string>) {
  const now = Date.now();
  let access: PracticeAccess = { kind: "unavailable", remaining: null, freeDaily: 10, resetAt: resetAt(now), retryAfter: null };
  try {
    const { id, shuffle } = z.object({ id: z.string().min(1).max(160), shuffle: z.boolean().default(false) }).strict().parse(await request.json());
    const paper = request.headers.get("X-Kakomon-Paper");
    const libraryQuestion = paper ? loadExamPaper(paper)?.find(q=>q.id === id) : undefined;
    const ordinaryQuestion = paper || request.headers.get("X-Kakomon-Material") === "1" ? undefined : await findQuestionById(id);
    const material = !paper && !ordinaryQuestion ? (await import("@/mobile/shared/material-source")).findMaterial(id) : undefined;
    const question = libraryQuestion ?? ordinaryQuestion ?? material;
    if (!question) throw new BillingError("not_found", 404);
    if (!libraryQuestion && !material && !isPracticeReadyQuestion(question as import("@/lib/questions/types").Question)) throw new BillingError("content_under_review", 409);
    const monthly = monthlySelected();
    const config = monthly ? monthlyConfig() : billingConfig();
    const native = request.headers.get("X-Kakomon-Native") === "ios";
    const strict = strictContentGateEnabled();
    const enabled = strict || native || (monthly ? monthlyConfig().enabled : gateReady(billingConfig()));
    if ((strict || native) && config.freeDaily !== 10) throw new BillingError("mobile_quota_configuration", 503);
    access.freeDaily = config.freeDaily;
    if (!enabled) access.kind = "free";
    else {
      sameOrigin(request);
      if (!strict && !native && id === BILLING_SAMPLE_ID) access.kind = "sample";
      else {
        const session = await optionalBillingSession();
        const userId = session?.user?.id;
        // A reinstall or cookie deletion cannot issue a new free identity.
        if (strict && !userId) throw new BillingError("sign_in_required", 401);
        let bonusClaimAvailable = true;
        if (userId && process.env.FEEDBACK_UNLOCK_ENABLED === "true") {
          try {
            if (readFeedbackBrowser(request)) await feedbackStore().claim(unlockIdentity(request, userId));
          } catch { bonusClaimAvailable = false; /* Existing paid and ordinary free rights stay independent. */ }
        }
        const quotaEnabled = aiQuotaEnabled();
        const membership = userId ? await studyMembership(userId, quotaEnabled, native && session?.mobileSession ? "app" : "web") : null;
        // Existing paid/grace rights do not depend on anonymous cookie or KV.
        if (!quotaEnabled && userId && membership?.source === "web") {
          const grant = await membership.service.grant(userId, question.id, [], false, jstDay(new Date(now)));
          access = { ...access, ...grant };
        } else if (membership && membership.source !== "free") {
          access = { ...access, kind: "pass", remaining: null };
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
            const result = await guestGrant(realm, guest, question.id, config.freeDaily, now, request);
            access.kind = "guest";
            if (result.status === "claimed") throw new BillingError("sign_in_required", 401);
            if (result.status === "rate") { access.retryAfter = result.retry ?? 60; throw new BillingError("guest_rate_limited", 429); }
            if (result.status === "limit") {
              access.remaining = 0;
              await recordConversion("guest_limited", conversionChannel(request), `guest:${guest}`, now);
              throw new DailyLimitError(result.ids ?? []);
            }
            if (result.status !== "ok" || result.used === undefined) throw new BillingError("billing_unavailable", 503);
            access.remaining = Math.max(0, config.freeDaily - result.used);
          } else if (userId && membership?.source === "free") {
            let snapshots: Awaited<ReturnType<typeof guestClaim>> = [];
            let allowNew = guestVerificationAvailable;
            if (guest) {
              try { snapshots = await guestClaim(realm, guest, userId, config.freeDaily, now); }
              catch { allowNew = false; }
            }
            try {
              const grant = await membership.service.grant(userId, question.id, snapshots, allowNew, jstDay(new Date(now)));
              access = { ...access, ...grant };
            } catch (error) {
              if (strict || !(error instanceof BillingError) || error.code !== "daily_limit" || !allowNew || !bonusClaimAvailable || process.env.FEEDBACK_UNLOCK_ENABLED !== "true") throw error;
              const bonus = await feedbackStore().grant(unlockIdentity(request, userId, realm), jstDay(new Date(now)), question.id, retryIds);
              if (!bonus) throw error;
              access = { ...access, kind: "trial", remaining: bonus.remaining, feedbackBonus: bonus };
              if (bonus.newlyUsed) await recordConversion("feedback_used", conversionChannel(request), `user:${userId}`, now);
            }
          }
        }
      }
    }
    const cached = native && !libraryQuestion && !material && request.headers.get("X-Kakomon-Question-Hash") === createHash("sha256").update(JSON.stringify(question)).digest("hex");
    const reviewOwner = libraryQuestion ? await optionalBillingIdentity() : null;
    const response = json({ question: cached ? {id:question.id} : libraryQuestion ? {...libraryQuestion, reviewProof: reviewOwner ? paperReviewProof(reviewOwner, paper!, id) : undefined} : material ?? (shuffle ? shuffleChoices(question as import("@/lib/questions/types").Question) : question), access,...(cached?{cached:true}:{}) });
    if (process.env.FEEDBACK_UNLOCK_ENABLED === "true") {
      try {
        const browser = readFeedbackBrowser(request);
        if (browser) response.headers.append("Set-Cookie", feedbackBrowserHeader(browser, new URL(request.url).protocol === "https:"));
      } catch { /* Cookie renewal never revokes ordinary practice rights. */ }
    }
    return response;
  } catch (error) {
    if (retryIds && error instanceof DailyLimitError) {
      for (const id of error.grantedIds) retryIds.add(id);
    }
    const code = error instanceof BillingError ? error.code : "billing_unavailable";
    const status = error instanceof BillingError ? error.status : 503;
    if (code === "daily_limit") { access.remaining = 0; if (access.kind === "unavailable") access.kind = "trial"; }
    if (status === 503) { access.kind = "unavailable"; access.remaining = null; }
    const response = json({ error: code, access }, status);
    if (access.retryAfter !== null) response.headers.set("Retry-After", String(access.retryAfter));
    return response;
  }
}
