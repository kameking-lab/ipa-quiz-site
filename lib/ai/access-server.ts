import "server-only";
import { aiPolicyReady, DRAFT_AI_ACCESS_POLICY, type AiAccessPolicy, type AiFeature } from "./access-policy";
import { validAiSubject } from "./normal-use-subject";

export interface AccessDependencies {
  identity(): Promise<string | null>;
  entitled(userId: string): Promise<boolean>;
}

export type AiAccessResolution =
  | { kind: "legacy" | "not_configured" | "unavailable" | "login_required" | "not_included" }
  | { kind: "paid" | "free"; subject: string };

async function billingDependencies(): Promise<AccessDependencies> {
  const { optionalBillingIdentity, billingRuntime } = await import("@/lib/billing/runtime");
  const { monthlySelected } = await import("@/lib/billing/subscription/config");
  return {
    identity: optionalBillingIdentity,
    entitled: async userId => {
      const service = monthlySelected()
        ? (await import("@/lib/billing/subscription/runtime")).monthlyRuntime().service
        : billingRuntime().service;
      return (await service.status(userId)).entitled;
    },
  };
}

/** Caller cannot supply a client tier or buyer identity. Disabled rollout loads no Auth/DB. */
export async function resolveAiAccess(
  feature: AiFeature,
  policy: AiAccessPolicy = DRAFT_AI_ACCESS_POLICY,
  dependencies: () => Promise<AccessDependencies> = billingDependencies,
  now = Date.now(),
): Promise<AiAccessResolution> {
  if (!policy.rolloutEnabled) return { kind: "legacy" };
  if (!aiPolicyReady(policy, now)) return { kind: "not_configured" };
  try {
    const source = await dependencies();
    const userId = await source.identity();
    if (userId === null) return { kind: "login_required" };
    if (!validAiSubject(userId)) return { kind: "unavailable" };
    if (await source.entitled(userId)) {
      return policy.paidNormalUseEnabled && policy.paidFeatures?.includes(feature)
        ? { kind: "paid", subject: userId } : { kind: "not_included" };
    }
    return policy.freeFeatures?.includes(feature)
      ? { kind: "free", subject: userId } : { kind: "not_included" };
  } catch {
    return { kind: "unavailable" };
  }
}
