import "server-only";
import { checkIpRateLimit, IP_LIMITS, COPILOT_MINUTE_LIMIT, COPILOT_GLOBAL_LIMITS, type IpRateLimitResult } from "@/lib/rate-limit";
import { aiPolicyReady } from "./access-policy";
import type { AiUsageContext } from "./usage-server";
import { normalUsePolicyReady, type AiNormalUsePolicy } from "./normal-use-policy";
import { aiNormalUsePolicy } from "./access-config";
import { normalUseSubjectHash } from "./normal-use-subject";
import { sharedNormalUseStore, type NormalUseStore, type NormalUseWindow } from "./normal-use-kv";

export type AiNormalUseResult = IpRateLimitResult & { scope?: "subject-burst" | "subject-window" | "service-global" | "unavailable" };

function limitWindow(key: string, ms: number, limit: number, reason: NormalUseWindow["reason"], now: number): NormalUseWindow {
  return { key: `${key}:${Math.floor(now / ms)}`, limit, resetAt: (Math.floor(now / ms) + 1) * ms, reason };
}

function serviceWindows(now: number) {
  return [
    limitWindow("rl:global:copilot:h", 3_600_000, COPILOT_GLOBAL_LIMITS.hour, "hour", now),
    limitWindow("rl:global:copilot:d", 86_400_000, COPILOT_GLOBAL_LIMITS.day, "daily", now),
  ];
}

/** Existing numbers only. All features share one authenticated subject namespace. */
export function normalUseWindows(subject: string, endpoint: string, policy: AiNormalUsePolicy, now: number): NormalUseWindow[] {
  const hash = normalUseSubjectHash(subject);
  const window = (key: string, ms: number, limit: number, reason: NormalUseWindow["reason"]) =>
    limitWindow(key, ms, limit, reason, now);
  const windows = [window(`ai:normal-use:v1:${hash}:m`, 60_000,
    endpoint === "copilot" ? COPILOT_MINUTE_LIMIT : IP_LIMITS.minute, "minute")];
  if (policy.subjectWindowMode === "bounded-windows") windows.push(
    window(`ai:normal-use:v1:${hash}:h`, 3_600_000, IP_LIMITS.hour, "hour"),
    window(`ai:normal-use:v1:${hash}:d`, 86_400_000, IP_LIMITS.day, "daily"),
  );
  // Reuse the legacy global keys, independent of policy version or subject.
  windows.push(...serviceWindows(now));
  // Aggregate admitted requests remain visible in the existing dashboard. No raw
  // subject/IP is added to top-IP rankings. Denied attempts are not admissions.
  windows.push(window(`rl:stats:${endpoint}:h`, 3_600_000, Number.MAX_SAFE_INTEGER, "accounting"));
  windows[windows.length - 1].resetAt = now + 90_000_000;
  return windows;
}

export async function checkAiNormalUse(
  req: Request, endpoint: string, context: AiUsageContext, options: { requireKv?: boolean } = { requireKv: Boolean(process.env.GEMINI_API_KEY) },
  policy: AiNormalUsePolicy = aiNormalUsePolicy(),
  store: NormalUseStore = sharedNormalUseStore, now = Date.now(),
): Promise<AiNormalUseResult> {
  if (context.legacy) return checkIpRateLimit(req, endpoint, options);
  if (!policy.rolloutEnabled || !aiPolicyReady(context.policy, now) || !normalUsePolicyReady(policy, context.policy.version, now)
    || (context.access.kind !== "free" && context.access.kind !== "paid")) return unavailable(context, now);
  // Count send attempts per IP even when a browser has exhausted its free quota.
  if (context.access.kind === "free") return checkIpRateLimit(req, endpoint, { requireKv: true, ipOnly: true });
  return admitWindows(context, normalUseWindows(context.access.subject, endpoint, policy, now), store, now);
}

/** Call after the free quota and cost checks have reserved a generation. */
export function checkFreeAiServiceUse(context: AiUsageContext, store: NormalUseStore = sharedNormalUseStore, now = Date.now()) {
  return admitWindows(context, serviceWindows(now), store, now);
}

function unavailable(context: AiUsageContext, now: number): AiNormalUseResult {
  context.headers["X-AI-RateLimit-Scope"] = "unavailable";
  return { ok: false, reason: "unavailable", scope: "unavailable", resetAt: now + 60_000 };
}

async function admitWindows(context: AiUsageContext, windows: NormalUseWindow[], store: NormalUseStore, now: number): Promise<AiNormalUseResult> {
  try {
    const admission = await store.admit(windows);
    if (admission.allowed) return { ok: true };
    const denied = admission.deniedWindow === undefined ? undefined : windows[admission.deniedWindow];
    if (!denied || denied.reason === "accounting") return unavailable(context, now);
    const scope = denied.key.startsWith("rl:global:") ? "service-global"
      : denied.reason === "minute" ? "subject-burst" : "subject-window";
    context.headers["X-AI-RateLimit-Scope"] = scope;
    return { ok: false, reason: denied.reason, scope, resetAt: denied.resetAt };
  } catch {
    // No memory fallback, retry or refund: a lost response may have admitted atomically.
    return unavailable(context, now);
  }
}
