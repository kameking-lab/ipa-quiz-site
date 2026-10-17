// Monthly AI spend cap — the CLAUDE.md §0 hard safety control.
//
// "月間 API コストが 5 万円に達した場合、新規 AI リクエストを自動停止し、Slack 通知を送る。
//  この上限はユーザーの承認なしに変更してはならない。"
//
// This module is the live-path enforcement of that mandate. Every real (non-mock)
// Published Copilot calls atomically precharge a conservative token budget before
// dispatch. Confirmed usage refunds only the unused part. Failed or uncertain KV
// writes retain the reservation rather than allowing unaccounted provider calls.
// ¥40,000 / ¥50,000 are existing estimated-ledger thresholds, not invoice limits.
//
// Persistence: Upstash KV via the REST API (same backend as lib/rate-limit/server).
// The monthly bucket key (ai_cost:YYYY-MM, JST) rotates at month start, which is
// the reset mechanism; a 70-day TTL is set on first write for cleanup hygiene.
//
// Real providers stop when KV is unconfigured or unreachable. Mock providers
// skip this check at their routes, so local development remains usable. The
// Slack path never fails silently:
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
  if (typeof data !== "object" || data === null || Array.isArray(data) || !("result" in data)) return null;
  if (data.result === null) return 0;
  if (typeof data.result !== "string" || data.result.trim() === "") return null;
  const n = Number(data.result);
  return Number.isFinite(n) && n >= 0 ? n : null;
}

async function kvIncrByFloat(key: string, amount: number): Promise<number | null> {
  const data = await kvFetch<{ result: string | number }>(
    `/incrbyfloat/${encodeURIComponent(key)}/${amount}`,
  );
  if (typeof data !== "object" || data === null || Array.isArray(data) || !("result" in data)) return null;
  if ((typeof data.result !== "string" && typeof data.result !== "number") || String(data.result).trim() === "") return null;
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
  reason?: "cap" | "unavailable";
}

/**
 * Read the running monthly total and decide whether a new AI request may proceed.
 * A missing monthly bucket is zero; missing KV or a failed read blocks real AI.
 */
export async function checkMonthlyCostCap(): Promise<CostCapStatus> {
  return readCostCap(monthlyCostKey());
}

async function readCostCap(key: string): Promise<CostCapStatus> {
  if (!kvConfig()) {
    return { allowed: false, totalJpy: 0, capJpy: MONTHLY_COST_CAP_JPY, reason: "unavailable" };
  }
  const total = await kvGetNumber(key);
  if (total === null) {
    return { allowed: false, totalJpy: 0, capJpy: MONTHLY_COST_CAP_JPY, reason: "unavailable" };
  }
  return {
    allowed: total < MONTHLY_COST_CAP_JPY,
    totalJpy: total,
    capJpy: MONTHLY_COST_CAP_JPY,
    reason: total >= MONTHLY_COST_CAP_JPY ? "cap" : undefined,
  };
}

export interface RecordCostInput {
  tier: ModelTier;
  inputTokens: number;
  outputTokens: number;
  label: string;
  /** A published request has already charged this ceiling before dispatch. */
  reservation?: AiCostReservation;
}

export interface AiCostReservation {
  readonly key: string;
  readonly reservedJpy: number;
  readonly tier: ModelTier;
}

export type CostReservationStatus =
  | { allowed: true; totalJpy: number; capJpy: number; reservation: AiCostReservation }
  | { allowed: false; totalJpy: number; capJpy: number; reason: "cap" | "unavailable" };

const admittedReservations = new WeakSet<AiCostReservation>();
const settledReservations = new WeakSet<AiCostReservation>();

/** Text-only prompt allowance; bytes plus framing deliberately over-reserve. */
export function estimatePromptTokenBudget(
  system: string,
  messages: readonly { content: string }[],
): number {
  const encoder = new TextEncoder();
  return encoder.encode(system).length + messages.reduce(
    (total, message) => total + encoder.encode(message.content).length + 64,
    1024,
  );
}

function validTokenCount(value: number): boolean {
  return Number.isSafeInteger(value) && value >= 0;
}

/**
 * INCRBYFLOAT is the admission point. A preceding read validates ledger health,
 * but only the returned atomic increment decides whether this call can start.
 * Denied calls roll back their own increment; unknown writes never start AI.
 */
export async function reserveAiCost(input: Omit<RecordCostInput, "reservation">): Promise<CostReservationStatus> {
  const key = monthlyCostKey();
  const unavailable: CostReservationStatus = {
    allowed: false, totalJpy: 0, capJpy: MONTHLY_COST_CAP_JPY, reason: "unavailable",
  };
  if (!validTokenCount(input.inputTokens) || !validTokenCount(input.outputTokens)) return unavailable;
  const estimate = costJpy(input.tier, input.inputTokens, input.outputTokens);
  // Round upward to a micro-yen so floating-point rounding never under-reserves.
  const reservedJpy = Math.ceil(estimate * 1_000_000) / 1_000_000;
  if (!Number.isFinite(reservedJpy) || reservedJpy <= 0) return unavailable;
  const health = await readCostCap(key);
  if (!health.allowed) return { ...health, allowed: false, reason: health.reason ?? "unavailable" };
  const total = await kvIncrByFloat(key, reservedJpy);
  if (total === null || total < reservedJpy) {
    console.error("[cost-guard] reservation write unconfirmed; provider dispatch blocked");
    return unavailable;
  }
  if (total > MONTHLY_COST_CAP_JPY) {
    // One compensating write only. A lost response must not cause a second refund.
    const rolledBack = await kvIncrByFloat(key, -reservedJpy);
    if (rolledBack === null) console.error("[cost-guard] denied reservation rollback unconfirmed; funds remain held");
    return {
      allowed: false, totalJpy: rolledBack ?? total, capJpy: MONTHLY_COST_CAP_JPY, reason: "cap",
    };
  }
  const reservation: AiCostReservation = Object.freeze({ key, reservedJpy, tier: input.tier });
  admittedReservations.add(reservation);
  if (total - reservedJpy < 0.0001) await kvExpire(key, BUCKET_TTL_SEC);
  await maybeNotifyThresholds(key, total);
  return { allowed: true, totalJpy: total, capJpy: MONTHLY_COST_CAP_JPY, reservation };
}

async function settleReservation(input: RecordCostInput, reservation: AiCostReservation): Promise<void> {
  if (!admittedReservations.has(reservation) || settledReservations.has(reservation)) return;
  // Claim synchronously before awaiting KV: duplicate callbacks cannot refund twice.
  settledReservations.add(reservation);
  if (!validTokenCount(input.inputTokens) || !validTokenCount(input.outputTokens)) {
    console.error("[cost-guard] usage invalid; reservation retained");
    return;
  }
  const actualJpy = costJpy(reservation.tier, input.inputTokens, input.outputTokens);
  if (!Number.isFinite(actualJpy) || actualJpy < 0) return;
  const adjustment = actualJpy - reservation.reservedJpy;
  if (adjustment === 0) return;
  if (adjustment > 0) console.error("[cost-guard] confirmed usage exceeded reservation; ledger must stop subsequent calls");
  const total = await kvIncrByFloat(reservation.key, adjustment);
  if (total === null) {
    console.error("[cost-guard] settlement unconfirmed; no retry or additional refund");
    return;
  }
  await maybeNotifyThresholds(reservation.key, total);
}

/**
 * Record the estimated cost of one completed AI call into the monthly bucket and
 * fire Slack notifications when the ¥40k / ¥50k thresholds are first crossed.
 * Routes must await this write before returning; serverless instances may freeze
 * after the response. Write failures are reported without throwing to callers.
 */
export async function recordAiCost(input: RecordCostInput): Promise<void> {
  try {
    if (input.reservation) {
      await settleReservation(input, input.reservation);
      return;
    }
    if (!kvConfig()) return; // dev/CI: no real spend to persist
    const jpy = costJpy(input.tier, input.inputTokens, input.outputTokens);
    if (jpy <= 0) return;

    const key = monthlyCostKey();
    const total = await kvIncrByFloat(key, jpy);
    if (total === null) {
      console.error("[cost-guard] legacy accounting write unconfirmed");
      return;
    }

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
