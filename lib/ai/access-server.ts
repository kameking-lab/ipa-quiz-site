import "server-only";
import { aiPolicyReady, type AiAccessPolicy, type AiFeature } from "./access-policy";
import { aiAccessPolicy } from "./access-config";
import { validAiSubject } from "./normal-use-subject";

export interface AccessDependencies {
  identity(): Promise<string | null>;
  entitled(userId: string): Promise<boolean>;
  guest(request: Request, now: number): Promise<{ subject: string } | { cookie: string }>;
}

export type AiAccessResolution =
  | { kind: "legacy" | "not_configured" | "unavailable" | "login_required" | "not_included" }
  | { kind: "guest_cookie_required"; cookie: string }
  | { kind: "free"; subject: string }
  | { kind: "paid"; subject: string };

async function billingDependencies(): Promise<AccessDependencies> {
  const { optionalBillingIdentity, billingRuntime } = await import("@/lib/billing/runtime");
  const { monthlySelected } = await import("@/lib/billing/subscription/config");
  return {
    identity: optionalBillingIdentity,
    entitled: async userId => {
      const service = monthlySelected()
        ? (await import("@/lib/billing/subscription/runtime")).monthlyRuntime().service
        : billingRuntime().service;
      if ((await service.status(userId)).entitled) return true;
      const { revenueCatAccess } = await import("@/mobile/server/revenuecat");
      return Boolean(await revenueCatAccess(userId));
    },
    guest: async (request, now) => {
      const { billingConfig } = await import("@/lib/billing/config");
      const { monthlyConfig } = await import("@/lib/billing/subscription/config");
      const { guestRealm, readGuestCookie, guestCookie, cookieHeader } = await import("@/lib/billing/guest-practice");
      const config = monthlySelected() ? monthlyConfig() : billingConfig();
      const realm = guestRealm(config.mode, config.sourceInstance);
      const id = readGuestCookie(request, realm, now);
      return id ? { subject: `guest:${id}` }
        : { cookie: cookieHeader(guestCookie(realm, now), new URL(request.url).protocol === "https:") };
    },
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
    return policy.freeFeatures?.includes(feature)
      ? { kind: "free", subject: `user:${userId}` } : { kind: "not_included" };
  } catch {
    return { kind: "unavailable" };
  }
}
