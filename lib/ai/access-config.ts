import "server-only";
import { AI_ACCESS_POLICY } from "./access-policy";
import { DRAFT_AI_NORMAL_USE_POLICY } from "./normal-use-policy";

export function aiQuotaEnabled() {
  return process.env.AI_QUOTA_ROLLOUT === "true";
}

export function aiAccessPolicy() {
  return { ...AI_ACCESS_POLICY, rolloutEnabled: aiQuotaEnabled() };
}

export function aiNormalUsePolicy() {
  return { ...DRAFT_AI_NORMAL_USE_POLICY, rolloutEnabled: aiQuotaEnabled() };
}
