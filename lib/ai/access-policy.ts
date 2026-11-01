export const AI_FEATURES = ["copilot", "exam-library", "generate-question", "scoring", "essay-grade"] as const;
export type AiFeature = typeof AI_FEATURES[number];

/** Approved 2026-10-31 business values. Runtime activation remains independently gated. */
export interface AiAccessPolicy {
  rolloutEnabled: boolean;
  version: string | null;
  effectiveAt: number | null;
  freeFeatures: readonly AiFeature[] | null;
  paidFeatures: readonly AiFeature[] | null;
  anonymousEnabled: boolean | null;
  dailyNewGenerationLimit: number | null;
  dailyResetUtcOffsetMinutes: number | null;
  countingRule: "provider-attempt" | null;
  paidNormalUseEnabled: boolean | null;
}

export const DRAFT_AI_ACCESS_POLICY: Readonly<AiAccessPolicy> = {
  rolloutEnabled: false,
  version: "ai-20261031-free3-paid-normal",
  effectiveAt: Date.parse("2026-10-31T23:22:02Z"),
  freeFeatures: AI_FEATURES,
  paidFeatures: AI_FEATURES,
  anonymousEnabled: false,
  dailyNewGenerationLimit: 3,
  dailyResetUtcOffsetMinutes: 540,
  countingRule: "provider-attempt",
  paidNormalUseEnabled: true,
};

function validFeatures(features: readonly AiFeature[] | null): boolean {
  return Array.isArray(features) && features.every(feature => AI_FEATURES.includes(feature))
    && new Set(features).size === features.length;
}

export function aiPolicyReady(policy: AiAccessPolicy, now: number): boolean {
  return policy.rolloutEnabled === true && typeof policy.version === "string"
    && /^[a-zA-Z0-9][a-zA-Z0-9._-]{0,63}$/.test(policy.version)
    && Number.isFinite(now) && policy.effectiveAt !== null && Number.isFinite(policy.effectiveAt)
    && now >= policy.effectiveAt && validFeatures(policy.freeFeatures) && validFeatures(policy.paidFeatures)
    // Anonymous identity/transfer is deliberately unsupported by this local candidate.
    && policy.anonymousEnabled === false && typeof policy.paidNormalUseEnabled === "boolean"
    && policy.countingRule === "provider-attempt"
    && policy.dailyResetUtcOffsetMinutes !== null && Number.isInteger(policy.dailyResetUtcOffsetMinutes)
    && policy.dailyResetUtcOffsetMinutes >= -720 && policy.dailyResetUtcOffsetMinutes <= 840
    && policy.dailyNewGenerationLimit !== null && Number.isSafeInteger(policy.dailyNewGenerationLimit)
    && policy.dailyNewGenerationLimit >= 0;
}
