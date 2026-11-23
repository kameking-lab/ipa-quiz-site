import { AI_DAILY_RESET_OFFSET_MINUTES, AI_FREE_QUESTIONS_PER_DAY } from "@/lib/constants/ai-quota";

export const AI_FEATURES = ["copilot", "exam-library", "essay-grade"] as const;
export type AiFeature = typeof AI_FEATURES[number];
export const AI_POLICY_VERSION = "ai-20261122-free3-anon-paid-normal";

/** Approved quota. Activation requires the matching normal-use policy. */
export interface AiAccessPolicy {
  rolloutEnabled: boolean;
  version: string | null;
  effectiveAt: number | null;
  freeFeatures: readonly AiFeature[] | null;
  paidFeatures: readonly AiFeature[] | null;
  anonymousEnabled: boolean | null;
  dailyNewGenerationLimit: number | null;
  dailyResetUtcOffsetMinutes: number | null;
  countingRule: "completed-answer" | null;
  paidNormalUseEnabled: boolean | null;
}

export const AI_ACCESS_POLICY: Readonly<AiAccessPolicy> = {
  rolloutEnabled: false,
  version: AI_POLICY_VERSION,
  effectiveAt: Date.parse("2026-11-22T00:00:00+09:00"),
  freeFeatures: AI_FEATURES,
  paidFeatures: AI_FEATURES,
  anonymousEnabled: true,
  dailyNewGenerationLimit: AI_FREE_QUESTIONS_PER_DAY,
  dailyResetUtcOffsetMinutes: AI_DAILY_RESET_OFFSET_MINUTES,
  countingRule: "completed-answer",
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
    && typeof policy.anonymousEnabled === "boolean" && typeof policy.paidNormalUseEnabled === "boolean"
    && policy.countingRule === "completed-answer"
    && policy.dailyResetUtcOffsetMinutes !== null && Number.isInteger(policy.dailyResetUtcOffsetMinutes)
    && policy.dailyResetUtcOffsetMinutes >= -720 && policy.dailyResetUtcOffsetMinutes <= 840
    && policy.dailyNewGenerationLimit !== null && Number.isSafeInteger(policy.dailyNewGenerationLimit)
    && policy.dailyNewGenerationLimit >= 0;
}
