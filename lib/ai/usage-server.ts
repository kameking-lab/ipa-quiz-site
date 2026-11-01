import "server-only";
import { DRAFT_AI_ACCESS_POLICY, type AiAccessPolicy, type AiFeature } from "./access-policy";
import { resolveAiAccess, type AiAccessResolution } from "./access-server";
import { sharedUsageStore, type UsageStore } from "./usage-kv";

export interface AiUsageContext {
  legacy: boolean;
  response?: Response;
  headers: Record<string, string>;
  access: AiAccessResolution;
  policy: AiAccessPolicy;
}

function denied(error: string, status: number, message: string, extra: Record<string, unknown> = {}, headers: Record<string, string> = {}): Response {
  return Response.json({ error, message, ...extra }, {
    status, headers: { ...headers, "Cache-Control": "private, no-store", Vary: "Cookie", "X-Error-Type": error },
  });
}

export async function prepareAiUsage(
  feature: AiFeature,
  policy: AiAccessPolicy = DRAFT_AI_ACCESS_POLICY,
  resolve: typeof resolveAiAccess = resolveAiAccess,
): Promise<AiUsageContext> {
  const access = await resolve(feature, policy);
  const context: AiUsageContext = { legacy: access.kind === "legacy", headers: {}, access, policy };
  if (access.kind === "legacy") return context;
  context.headers = initialAiUsageHeaders(policy);
  if (access.kind === "paid" || access.kind === "free") {
    context.headers = { ...context.headers, "X-AI-Quota-Scope": access.kind === "free" ? "subject-day" : "none", "Cache-Control": "private, no-store", Vary: "Cookie",
      "X-AI-Access": access.kind === "paid" ? "paid-normal-use" : "free" };
    return context;
  }
  const errors = {
    not_configured: [503, "AIの提供設定を確認できないため、生成を一時停止しています。"],
    unavailable: [503, "会員情報を確認できないため、生成を一時停止しています。"],
    login_required: [401, "AIの新規生成にはログインが必要です。"],
    not_included: [403, "このAI機能は現在の提供対象に含まれていません。"],
  } as const;
  const [status, message] = errors[access.kind];
  context.response = denied(`ai_${access.kind}`, status, message, {}, context.headers);
  return context;
}

/** Immediately before a real provider attempt. Failures/abort after admission retain the slot.
 * No retries/refunds: a transport failure can have an uncertain Redis execution outcome.
 */
export async function consumeAiUsage(
  context: AiUsageContext,
  providerName: string,
  store: UsageStore = sharedUsageStore,
  now = Date.now(),
): Promise<Response | null> {
  if (context.response) return context.response;
  if (context.legacy) return null;
  if (providerName === "mock") {
    context.headers["X-AI-Attempt"] = "mock";
    return null;
  }
  if (context.access.kind === "paid") {
    context.headers["X-AI-Attempt"] = "admitted";
    return null;
  }
  if (context.access.kind !== "free") return denied("ai_not_configured", 503, "AIの提供設定を確認できません。");
  const { dailyNewGenerationLimit: limit, dailyResetUtcOffsetMinutes: offset } = context.policy;
  if (limit === null || offset === null) return denied("ai_not_configured", 503, "AIの提供設定を確認できません。");
  try {
    const admission = await store.admit(context.access.subject, limit, offset, now);
    context.headers = { ...context.headers,
      "X-RateLimit-Limit": String(admission.limit),
      "X-RateLimit-Remaining": String(admission.remaining),
      "X-RateLimit-Reset": String(admission.resetAt),
    };
    context.headers["X-AI-Attempt"] = admission.allowed ? "admitted" : "not-started";
    context.headers["X-AI-Quota-Consumed"] = admission.allowed ? "1" : "0";
    return admission.allowed ? null : denied("ai_daily_quota_exhausted", 429,
      "本日のAI新規生成回数に達しました。表示のリセット時刻までお待ちください。", { resetAt: admission.resetAt, scope: "subject-day" }, context.headers);
  } catch {
    context.headers["X-AI-Attempt"] = "unknown";
    context.headers["X-AI-Quota-Consumed"] = "unknown";
    return denied("ai_usage_unavailable", 503, "AI利用回数を確認できないため、生成を一時停止しています。", {}, context.headers);
  }
}

/** Admission is not a quality/success marker. A provider failure or user stop never refunds it. */
function initialAiUsageHeaders(policy: AiAccessPolicy): Record<string, string> {
  return { "Cache-Control": "private, no-store", Vary: "Cookie",
    ...(policy.version ? { "X-AI-Policy-Version": policy.version } : {}),
    "X-AI-Attempt": "not-started", "X-AI-Quota-Consumed": "0" };
}

/** Finalize every handled HTTP branch without reading or buffering its body/stream.
 * After streaming headers are sent, later provider errors cannot change admission markers.
 * Disabled rollout returns the original legacy Response, including its exact headers.
 */
export async function withAiUsageResponse(
  handle: (track: (context: AiUsageContext) => void) => Promise<Response>,
  policy: AiAccessPolicy = DRAFT_AI_ACCESS_POLICY,
): Promise<Response> {
  let tracked: AiUsageContext | undefined;
  const response = await handle(context => { tracked = context; });
  if (!policy.rolloutEnabled || tracked?.legacy) return response;
  const headers = new Headers(response.headers);
  for (const [name, value] of Object.entries(tracked?.headers ?? initialAiUsageHeaders(policy))) headers.set(name, value);
  if (headers.get("X-Provider") === "mock" && headers.get("X-AI-Attempt") === "not-started") headers.set("X-AI-Attempt", "mock");
  return new Response(response.body, { status: response.status, statusText: response.statusText, headers });
}
