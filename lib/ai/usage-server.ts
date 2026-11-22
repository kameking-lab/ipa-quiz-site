import "server-only";
import { type AiAccessPolicy, type AiFeature } from "./access-policy";
import { aiAccessPolicy } from "./access-config";
import { resolveAiAccess, type AiAccessResolution } from "./access-server";
import { questionQuotaStore, recordPaidAiQuestion } from "./question-quota-kv";

export interface AiUsageContext {
  legacy: boolean;
  response?: Response;
  headers: Record<string, string>;
  access: AiAccessResolution;
  policy: AiAccessPolicy;
  settle?: (completed: boolean) => Promise<void>;
  streaming?: boolean;
}

function denied(error: string, status: number, message: string, extra: Record<string, unknown> = {}, headers: Record<string, string> = {}): Response {
  return Response.json({ error, message, ...extra }, {
    status, headers: { ...headers, "Cache-Control": "private, no-store", Vary: "Cookie", "X-Error-Type": error },
  });
}

export async function prepareAiUsage(
  request: Request,
  feature: AiFeature,
  policy: AiAccessPolicy = aiAccessPolicy(),
  resolve: typeof resolveAiAccess = resolveAiAccess,
): Promise<AiUsageContext> {
  const access = await resolve(request, feature, policy);
  const context: AiUsageContext = { legacy: access.kind === "legacy", headers: {}, access, policy };
  if (access.kind === "legacy") return context;
  context.headers = initialAiUsageHeaders(policy);
  if (access.kind === "paid" || access.kind === "free") {
    context.headers = { ...context.headers, "X-AI-Quota-Scope": access.kind === "free" ? "subject-day" : "none", "Cache-Control": "private, no-store", Vary: "Cookie",
      "X-AI-Access": access.kind === "paid" ? "paid-normal-use" : "free" };
    return context;
  }
  if (access.kind === "guest_cookie_required") {
    context.response = denied(access.kind, 428, "AIの利用を準備しています。もう一度お試しください。", {},
      { ...context.headers, "Set-Cookie": access.cookie });
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

/** Reserve before the provider starts. Settle only after a complete answer. */
export async function consumeAiUsage(
  context: AiUsageContext,
  providerName: string,
  request: unknown,
  store = questionQuotaStore,
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
    context.settle = async completed => {
      if (completed) await recordPaidAiQuestion(now);
    };
    return null;
  }
  if (context.access.kind !== "free") return denied("ai_not_configured", 503, "AIの提供設定を確認できません。");
  const { dailyNewGenerationLimit: limit, dailyResetUtcOffsetMinutes: offset } = context.policy;
  if (limit === null || offset === null) return denied("ai_not_configured", 503, "AIの提供設定を確認できません。");
  try {
    const admission = await store.reserve({ subject: context.access.subject, limit, offset, now }, request);
    setQuotaHeaders(context, limit, admission);
    if (admission.status === "exhausted") return denied("ai_daily_quota_exhausted", 429,
      `今日の無料のAI質問（${limit}回）はここまで`, { resetAt: admission.resetAt, scope: "subject-day" }, context.headers);
    if (admission.status === "pending") return denied("ai_question_pending", 409,
      "AIが回答中です。少し待ってからもう一度お試しください。", {}, context.headers);
    context.headers["X-AI-Attempt"] = "admitted";
    const lease = admission.lease;
    if (lease) {
      context.headers["X-AI-Quota-Consumed"] = "pending";
      context.settle = async completed => {
        const result = await store.settle(lease, completed).catch(() => store.settle(lease, completed));
        setQuotaHeaders(context, limit, result);
        context.headers["X-AI-Quota-Consumed"] = result.status === "completed" ? "1" : "0";
      };
    }
    return null;
  } catch {
    context.headers["X-AI-Attempt"] = "unknown";
    return denied("ai_usage_unavailable", 503, "AI利用回数を確認できないため、生成を一時停止しています。", {}, context.headers);
  }
}

function setQuotaHeaders(context: AiUsageContext, limit: number, result: { remaining: number; resetAt: number }) {
  Object.assign(context.headers, {
    "X-RateLimit-Limit": String(limit),
    "X-RateLimit-Remaining": String(result.remaining),
    "X-RateLimit-Reset": String(result.resetAt),
  });
}

export async function settleAiUsage(context: AiUsageContext, completed: boolean) {
  const settle = context.settle;
  context.settle = undefined;
  try {
    await settle?.(completed);
  } catch {
    context.headers["X-AI-Quota-Consumed"] = "unknown";
    console.warn("[ai-question-quota] settlement unavailable", { tier: context.access.kind, completed });
  }
}

export async function readAiUsageStatus(request: Request, feature: AiFeature) {
  const context = await prepareAiUsage(request, feature);
  if (context.response) return context.response;
  const reply = (body: object) => Response.json(body, { headers: { ...context.headers, "Cache-Control": "private, no-store", Vary: "Cookie" } });
  if (context.access.kind === "legacy") return reply({ kind: "legacy" });
  if (context.access.kind === "paid") return reply({ kind: "paid" });
  const limit = context.policy.dailyNewGenerationLimit;
  const offset = context.policy.dailyResetUtcOffsetMinutes;
  if (context.access.kind === "free" && limit !== null && offset !== null) {
    try {
      const { remaining, resetAt } = await questionQuotaStore.read({ subject: context.access.subject, limit, offset, now: Date.now() });
      return reply({ kind: "free", remaining, resetAt });
    } catch {
      return denied("ai_usage_unavailable", 503, "AI利用回数を確認できません。", {}, context.headers);
    }
  }
  return denied("ai_not_configured", 503, "AIの提供設定を確認できません。", {}, context.headers);
}

function initialAiUsageHeaders(policy: AiAccessPolicy): Record<string, string> {
  return { "Cache-Control": "private, no-store", Vary: "Cookie",
    ...(policy.version ? { "X-AI-Policy-Version": policy.version } : {}),
    "X-AI-Attempt": "not-started", "X-AI-Quota-Consumed": "0" };
}

/** JSON answers settle here. The streaming handlers settle before closing their body. */
export async function withAiUsageResponse(
  handle: (track: (context: AiUsageContext) => void) => Promise<Response>,
  policy: AiAccessPolicy = aiAccessPolicy(),
): Promise<Response> {
  let tracked: AiUsageContext | undefined;
  let response: Response;
  try {
    response = await handle(context => { tracked = context; });
  } catch (error) {
    if (tracked) await settleAiUsage(tracked, false);
    throw error;
  }
  if (!policy.rolloutEnabled || tracked?.legacy) return response;
  if (tracked && !tracked.streaming) await settleAiUsage(tracked, response.ok);
  const headers = new Headers(response.headers);
  for (const [name, value] of Object.entries(tracked?.headers ?? initialAiUsageHeaders(policy))) headers.set(name, value);
  if (headers.get("X-Provider") === "mock" && headers.get("X-AI-Attempt") === "not-started") headers.set("X-AI-Attempt", "mock");
  return new Response(response.body, { status: response.status, statusText: response.statusText, headers });
}
