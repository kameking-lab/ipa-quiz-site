/** Approved normal-use mode; runtime activation remains independently gated. */
export interface AiNormalUsePolicy {
  rolloutEnabled: boolean;
  version: string | null;
  aiPolicyVersion: string | null;
  effectiveAt: number | null;
  /** burst-only has no authenticated hourly/daily count cap. Global/cost guards remain. */
  subjectWindowMode: "burst-only" | "bounded-windows" | null;
}

export const DRAFT_AI_NORMAL_USE_POLICY: Readonly<AiNormalUsePolicy> = {
  rolloutEnabled: false, version: "ai-normal-20261031-burst",
  aiPolicyVersion: "ai-20261031-free3-paid-normal", effectiveAt: Date.parse("2026-10-31T23:22:02Z"),
  subjectWindowMode: "burst-only",
};

export function normalUsePolicyReady(policy: AiNormalUsePolicy, aiPolicyVersion: string | null, now: number): boolean {
  return policy.rolloutEnabled === true && typeof policy.version === "string"
    && /^[a-zA-Z0-9][a-zA-Z0-9._-]{0,63}$/.test(policy.version)
    && typeof aiPolicyVersion === "string" && policy.aiPolicyVersion === aiPolicyVersion
    && Number.isFinite(now) && policy.effectiveAt !== null && Number.isFinite(policy.effectiveAt)
    && now >= policy.effectiveAt
    && (policy.subjectWindowMode === "burst-only" || policy.subjectWindowMode === "bounded-windows");
}
