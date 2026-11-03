import { DRAFT_AI_ACCESS_POLICY, type AiAccessPolicy } from "./access-policy";

/** UI defers to POST authority even when enabled policy is not ready. Grants no access. */
export function serverManagedAiAccess(policy: Pick<AiAccessPolicy, "rolloutEnabled"> = DRAFT_AI_ACCESS_POLICY): boolean {
  return policy.rolloutEnabled === true;
}

const POLICY_DENIAL_STATUS: Record<string, number> = {
  ai_login_required: 401, ai_not_included: 403, ai_not_configured: 503,
  ai_unavailable: 503, ai_usage_unavailable: 503, ai_daily_quota_exhausted: 429,
};

export function aiPolicyDenialMessage(status: number, body: unknown): string | null {
  if (!body || typeof body !== "object") return null;
  const value = body as { error?: unknown; message?: unknown };
  return typeof value.error === "string" && Object.hasOwn(POLICY_DENIAL_STATUS, value.error)
    && POLICY_DENIAL_STATUS[value.error] === status && typeof value.message === "string" && value.message.trim()
    ? value.message : null;
}
