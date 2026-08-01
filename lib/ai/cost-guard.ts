// Monthly AI spend cap — the CLAUDE.md §0 hard safety control.
//
// "月間 API コストが 5 万円に達した場合、新規 AI リクエストを自動停止し、Slack 通知を送る。
//  この上限はユーザーの承認なしに変更してはならない。"
//
// This module is the live-path enforcement of that mandate. Every real (non-mock)
// AI request checks the running monthly total in Upstash KV before calling the
// provider and records its estimated cost after. At ¥40,000 it warns Slack, at
// ¥50,000 it stops new requests and sends an emergency Slack notification.
//
// Persistence: Upstash KV via the REST API (same backend as lib/rate-limit/server).
// The monthly bucket key (ai_cost:YYYY-MM, JST) rotates at month start, which is
// the reset mechanism; a 70-day TTL is set on first write for cleanup hygiene.
//
// Degradation: when KV is not configured (local dev / CI), there is no real spend
// to track (no GEMINI_API_KEY → mock provider), so the cap allows requests and
// recording is a no-op. When KV is configured but transiently unreachable, the
// cap allows the request (matching the rate limiter's graceful degradation) — the
// cap is a backstop, not a transactional gate. The Slack path never fails silently:
// if SLACK_WEBHOOK_URL is unset when a threshold is crossed, the breach is logged
// via console.error (no fail-open swallow).

import { costJpy } from "@/lib/ai/cost-tracker";
import type { ModelTier } from "@/lib/ai/cost-tracker";

export const MONTHLY_COST_CAP_JPY = 50_000;
export const MONTHLY_COST_WARN_JPY = 40_000;

const KV_TIMEOUT_MS = 1_500;
// Month bucket + threshold-notification flags live ~70 days, comfortably past
// the month they track, then auto-expire.
const BUCKET_TTL_SEC = 70 * 24 * 60 * 60;

function kvConfig(): { url: string; token: string } | null {
  const url = process.env.KV_REST_API_URL?.replace(/\/$/, "");
  const token = process.env.KV_REST_API_TOKEN;
  if (!url || !token) return null;
  return { url, token };
}

async function kvFetch<T>(path: string, method: "GET" | "POST" = "POST"): Promise<T | null> {
  const cfg = kvConfig();
  if (!cfg) return null;
  try {
    const res = await fetch(`${cfg.url}${path}`, {
      method,
      headers: { Authorization: `Bearer ${cfg.token}` },
      signal: AbortSignal.timeout(KV_TIMEOUT_MS),
    });
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    return null;
  }
}

async function kvGetNumber(key: string): Promise<number | null> {
  const data = await kvFetch<{ result: string | null }>(`/get/${encodeURIComponent(key)}`, "GET");
  if (data?.result == null) return null;
  const n = Number(data.result);
  return Number.isFinite(n) ? n : null;
}

async function kvIncrByFloat(key: string, amount: number): Promise<number | null> {
  const data = await kvFetch<{ result: string | number }>(
    `/incrbyfloat/${encodeURIComponent(key)}/${amount}`,
  );
  if (data == null) return null;
  const n = Number(data.result);
  return Number.isFinite(n) ? n : null;
}

async function kvIncr(key: string): Promise<number | null> {
  const data = await kvFetch<{ result: number }>(`/incr/${encodeURIComponent(key)}`);
  return typeof data?.result === "number" ? data.result : null;
}

async function kvExpire(key: string, ttlSec: number): Promise<void> {
  await kvFetch(`/expire/${encodeURIComponent(key)}/${ttlSec}`);
}

/** JST month bucket key, e.g. "ai_cost:2026-05". */
export function monthlyCostKey(now: Date = new Date()): string {
  const jst = new Date(now.getTime() + 9 * 60 * 60 * 1000);
  const y = jst.getUTCFullYear();
  const m = String(jst.getUTCMonth() + 1).padStart(2, "0");
  return `ai_cost:${y}-${m}`;
}

/**
 * Estimate Gemini token count from a character count. Japanese tokenizes at
 * roughly ~1 token/char and English at ~1 token/4 chars; chars/2 is a deliberate
 * midpoint that errs slightly high, so the safety cap trips a little early rather
 * than late. Precision is not critical for a ¥50k backstop.
 *
 * This is the fallback path, not the primary one. The Gemini provider reports
 * usageMetadata through StreamChatParams.onComplete, and the grading routes
 * (/api/scoring, /api/essay-grade) record those measured counts — including
 * thinking tokens, which are billed as output and which a character-count
 * estimate cannot see at all. estimateTokens is used only when a stream ends
 * without usage metadata (e.g. the call threw part-way through).
 */
export function estimateTokens(charCount: number): number {
  return Math.ceil(Math.max(0, charCount) / 2);
}

export interface CostCapStatus {
  allowed: boolean;
  totalJpy: number;
  capJpy: number;
}

/**
 * Read the running monthly total and decide whether a new AI request may proceed.
 * Allows when KV is absent/unreachable (see module header on degradation).
 */
export async function checkMonthlyCostCap(): Promise<CostCapStatus> {
  if (!kvConfig()) {
    return { allowed: true, totalJpy: 0, capJpy: MONTHLY_COST_CAP_JPY };
  }
  const total = (await kvGetNumber(monthlyCostKey())) ?? 0;
  return {
    allowed: total < MONTHLY_COST_CAP_JPY,
    totalJpy: total,
    capJpy: MONTHLY_COST_CAP_JPY,
  };
}

export interface RecordCostInput {
  tier: ModelTier;
  inputTokens: number;
  outputTokens: number;
  label: string;
}

/**
 * Record the estimated cost of one completed AI call into the monthly bucket and
 * fire Slack notifications when the ¥40k / ¥50k thresholds are first crossed.
 * Safe to call fire-and-forget; never throws.
 */
export async function recordAiCost(input: RecordCostInput): Promise<void> {
  try {
    if (!kvConfig()) return; // dev/CI: no real spend to persist
    const jpy = costJpy(input.tier, input.inputTokens, input.outputTokens);
    if (jpy <= 0) return;

    const key = monthlyCostKey();
    const total = await kvIncrByFloat(key, jpy);
    if (total === null) return;

    // First write into a fresh bucket → set the cleanup TTL.
    if (total - jpy < 0.0001) {
      await kvExpire(key, BUCKET_TTL_SEC);
    }

    await maybeNotifyThresholds(key, total);
  } catch (err) {
    // Accounting must never break the user-facing AI response.
    console.error("[cost-guard] recordAiCost failed", err);
  }
}

/**
 * Increment a notification flag; returns true only on the first crossing so each
 * threshold notifies once per month. Uses incr+expire (both confirmed-supported
 * KV ops) rather than SET NX to avoid REST encoding ambiguity.
 */
async function firstCrossing(flagKey: string): Promise<boolean> {
  const n = await kvIncr(flagKey);
  if (n === null) return false; // KV unreachable → don't notify (avoid flaky spam)
  if (n === 1) {
    await kvExpire(flagKey, BUCKET_TTL_SEC);
    return true;
  }
  return false;
}

async function maybeNotifyThresholds(monthKey: string, total: number): Promise<void> {
  if (total >= MONTHLY_COST_CAP_JPY) {
    if (await firstCrossing(`${monthKey}:notified:50k`)) {
      await notifySlack(
        `🚨 [過去問AI] 月間 AI コストが上限 ¥${MONTHLY_COST_CAP_JPY.toLocaleString()} に到達しました（現在 ¥${Math.ceil(total).toLocaleString()}）。新規 AI リクエストを自動停止しました。`,
      );
    }
    return;
  }
  if (total >= MONTHLY_COST_WARN_JPY) {
    if (await firstCrossing(`${monthKey}:notified:40k`)) {
      await notifySlack(
        `⚠️ [過去問AI] 月間 AI コストが警告ライン ¥${MONTHLY_COST_WARN_JPY.toLocaleString()} を超えました（現在 ¥${Math.ceil(total).toLocaleString()}）。上限 ¥${MONTHLY_COST_CAP_JPY.toLocaleString()} で自動停止します。`,
      );
    }
  }
}

async function notifySlack(message: string): Promise<void> {
  const url = process.env.SLACK_WEBHOOK_URL;
  if (!url) {
    // Never fail-open silently: the breach is recorded in logs even without Slack.
    console.error("[cost-guard] threshold crossed but SLACK_WEBHOOK_URL is unset:", message);
    return;
  }
  try {
    await fetch(url, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ text: message }),
      signal: AbortSignal.timeout(KV_TIMEOUT_MS),
    });
  } catch (err) {
    console.error("[cost-guard] Slack notification failed", err, "message:", message);
  }
}
