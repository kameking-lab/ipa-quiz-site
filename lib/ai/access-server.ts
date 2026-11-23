import "server-only";
import { aiPolicyReady, type AiAccessPolicy, type AiFeature } from "./access-policy";
import { aiAccessPolicy } from "./access-config";
import { validAiSubject } from "./normal-use-subject";
import { BillingError, MEMBERSHIP_CHECK_PENDING } from "@/lib/billing/domain";

export interface AccessDependencies {
  identity(): Promise<string | null>;
  entitled(userId: string): Promise<boolean>;
  guest(request: Request, now: number): Promise<{ subject: string } | { cookie: string }>;
  signedGuest?(request: Request, now: number): Promise<string | undefined>;
}

export type AiAccessResolution =
  | { kind: "legacy" | "not_configured" | "unavailable" | "membership_check_pending" | "login_required" | "not_included" }
  | { kind: "guest_cookie_required"; cookie: string }
  | { kind: "free"; subject: string; guestSubject?: string }
  | { kind: "paid"; subject: string };

async function billingDependencies(): Promise<AccessDependencies> {
  const { optionalBillingIdentity } = await import("@/lib/billing/runtime");
  const { studyMembership } = await import("@/lib/billing/study-membership");
  const { monthlySelected } = await import("@/lib/billing/subscription/config");
  async function guestContext(request: Request, now: number) {
    const { billingConfig } = await import("@/lib/billing/config");
    const { monthlyConfig } = await import("@/lib/billing/subscription/config");
    const { guestRealm, readGuestCookie, guestCookie, cookieHeader } = await import("@/lib/billing/guest-practice");
    const config = monthlySelected() ? monthlyConfig() : billingConfig();
    const realm = guestRealm(config.mode, config.sourceInstance);
    const id = readGuestCookie(request, realm, now);
    return {
      subject: id ? `guest:${id}` : undefined,
      issueCookie: () => cookieHeader(guestCookie(realm, now), new URL(request.url).protocol === "https:"),
    };
  }
  return {
    identity: optionalBillingIdentity,
    entitled: async userId => (await studyMembership(userId, true)).source !== "free",
    guest: async (request, now) => {
      const { subject, issueCookie } = await guestContext(request, now);
      return subject ? { subject } : { cookie: issueCookie() };
    },
    signedGuest: async (request, now) => (await guestContext(request, now)).subject,
  };
}

/** Caller cannot supply a client tier or buyer identity. Disabled rollout loads no Auth/DB. */
export async function resolveAiAccess(
  request: Request,
  feature: AiFeature,
  policy: AiAccessPolicy = aiAccessPolicy(),
  dependencies: () => Promise<AccessDependencies> = billingDependencies,
  now = Date.now(),
): Promise<AiAccessResolution> {
  if (!policy.rolloutEnabled) return { kind: "legacy" };
  if (!aiPolicyReady(policy, now)) return { kind: "not_configured" };
  try {
    const source = await dependencies();
    const userId = await source.identity();
    if (userId === null) {
      if (!policy.anonymousEnabled) return { kind: "login_required" };
      if (!policy.freeFeatures?.includes(feature)) return { kind: "not_included" };
      const guest = await source.guest(request, now);
      return "subject" in guest ? { kind: "free", subject: guest.subject } : { kind: "guest_cookie_required", cookie: guest.cookie };
    }
    if (!validAiSubject(userId)) return { kind: "unavailable" };
    if (await source.entitled(userId)) {
      return policy.paidNormalUseEnabled && policy.paidFeatures?.includes(feature)
        ? { kind: "paid", subject: userId } : { kind: "not_included" };
    }
    if (!policy.freeFeatures?.includes(feature)) return { kind: "not_included" };
    const guestSubject = request.headers.has("cookie") ? await source.signedGuest?.(request, now) : undefined;
    return { kind: "free", subject: `user:${userId}`, ...(guestSubject ? { guestSubject } : {}) };
  } catch (error) {
    if (error instanceof BillingError && error.code === MEMBERSHIP_CHECK_PENDING) return { kind: "membership_check_pending" };
    return { kind: "unavailable" };
  }
}
