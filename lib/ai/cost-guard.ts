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
// Real providers stop when the cost state cannot be verified. Mock requests do
// not incur provider spend. Every HTTP generation path uses atomic spend
// reservation before provider work, including concurrent calls. The Slack path:
// if SLACK_WEBHOOK_URL is unset when a threshold is crossed, the breach is logged
// via console.error (no fail-open swallow).

import { costJpy } from "@/lib/ai/cost-tracker";
import type { ModelTier } from "@/lib/ai/cost-tracker";
import { randomUUID } from "node:crypto";

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

async function readMonthlyCost(key: string): Promise<number | null> {
  const data = await kvFetch<unknown>(`/get/${encodeURIComponent(key)}`, "GET");
  if (typeof data !== "object" || data === null || !("result" in data) || "error" in data) return null;
  const raw = data.result;
  // A successful Redis GET of a missing bucket is known zero, not an outage.
  if (raw === null) return 0;
  if (typeof raw !== "number" && typeof raw !== "string") return null;
  if (typeof raw === "string" && !/^(?:\d+(?:\.\d*)?|\.\d+)(?:[eE][+-]?\d+)?$/.test(raw)) return null;
  const n = Number(raw);
  return Number.isFinite(n) && n >= 0 ? n : null;
}

async function kvIncrByFloat(key: string, amount: number): Promise<number | null> {
  const data = await kvFetch<unknown>(
    `/incrbyfloat/${encodeURIComponent(key)}/${amount}`,
  );
  if (typeof data !== "object" || data === null || !("result" in data) || "error" in data) return null;
  return budgetNumber(data.result);
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
  totalJpy: number | null;
  capJpy: number;
  reason?: "cost_capped" | "budget_unavailable";
  reservation?: CostReservation;
}

export interface CostReservation { key: string; receipt: string; amount: number }

/** Text-only byte fallback plus framing overhead; never estimate admission as chars/2. */
export function textBudget(tier: ModelTier, system: string, messages: readonly { content: string }[], maxTokens: number): RecordCostInput {
  return { tier, label: "reservation", inputTokens: Buffer.byteLength(system, "utf8")
    + messages.reduce((sum, m) => sum + Buffer.byteLength(m.content, "utf8") + 128, 0) + 1152,
    outputTokens: maxTokens };
}

export const RESERVE_COST_LUA = `-- SEC1_RESERVE
local raw = redis.call('GET', KEYS[1])
local total = raw and tonumber(raw) or 0
local amount, cap, ttl = tonumber(ARGV[1]), tonumber(ARGV[2]), tonumber(ARGV[3])
if (raw and not tonumber(raw)) or not total or total < 0 or total ~= total or total == math.huge
  or not amount or amount <= 0 or amount ~= amount or amount == math.huge
  or not cap or cap <= 0 or not ttl or ttl < 1 then return redis.error_reply('invalid budget') end
if redis.call('EXISTS', KEYS[2]) ~= 0 then return redis.error_reply('duplicate reservation') end
if total + amount > cap then return {0, tostring(total)} end
local updated = redis.call('INCRBYFLOAT', KEYS[1], ARGV[1])
redis.call('EXPIRE', KEYS[1], ttl)
redis.call('SET', KEYS[2], ARGV[1], 'EX', ttl)
return {1, updated}
`;

export const SETTLE_COST_LUA = `-- SEC1_SETTLE
local raw = redis.call('GET', KEYS[1])
local total = raw and tonumber(raw)
local receipt = redis.call('GET', KEYS[2])
local reserved = receipt and tonumber(receipt)
local actual = tonumber(ARGV[1])
if not total or total < 0 or total ~= total or total == math.huge
  or (receipt and (not reserved or reserved <= 0 or reserved ~= reserved or reserved == math.huge))
  or not actual or actual < 0 or actual ~= actual or actual == math.huge then return redis.error_reply('invalid budget') end
if not receipt then return tostring(total) end
if total < reserved then return redis.error_reply('inconsistent budget') end
local updated = redis.call('INCRBYFLOAT', KEYS[1], tostring(actual - reserved))
redis.call('DEL', KEYS[2])
return updated
`;

async function budgetCommand(script: string, reservation: CostReservation, amount: number): Promise<unknown> {
  const cfg = kvConfig();
  if (!cfg) return null;
  try {
    const response = await fetch(cfg.url, { method: "POST", cache: "no-store", redirect: "error",
      headers: { Authorization: `Bearer ${cfg.token}`, "Content-Type": "application/json" },
      signal: AbortSignal.timeout(KV_TIMEOUT_MS),
      body: JSON.stringify(["EVAL", script, 2, reservation.key, reservation.receipt, amount, MONTHLY_COST_CAP_JPY, BUCKET_TTL_SEC]),
    });
    if (!response.ok) return null;
    const data: unknown = await response.json();
    return data && typeof data === "object" && "result" in data && !("error" in data) ? data.result : null;
  } catch { return null; } // No retry: Redis may have committed before the response was lost.
}

function budgetNumber(value: unknown): number | null {
  if (typeof value !== "number" && (typeof value !== "string" || !/^\d+(?:\.\d+)?(?:[eE][+-]?\d+)?$/.test(value))) return null;
  const n = Number(value);
  return Number.isFinite(n) && n >= 0 ? n : null;
}

/**
 * Read the running monthly total and decide whether a new AI request may proceed.
 * The caller supplies its resolved provider name, never API-key presence.
 */
export async function checkMonthlyCostCap(providerName?: string, budget?: RecordCostInput): Promise<CostCapStatus> {
  if (providerName === "mock") {
    return { allowed: true, totalJpy: 0, capJpy: MONTHLY_COST_CAP_JPY };
  }
  if (budget) {
    const key = monthlyCostKey(), amount = costJpy(budget.tier, budget.inputTokens, budget.outputTokens);
    const reservation = { key, amount, receipt: `${key}:reservation:${randomUUID()}` };
    const unavailable: CostCapStatus = { allowed: false, totalJpy: null, capJpy: MONTHLY_COST_CAP_JPY, reason: "budget_unavailable" };
    if (!Number.isFinite(amount) || amount <= 0) return unavailable;
    const result = await budgetCommand(RESERVE_COST_LUA, reservation, amount);
    if (!Array.isArray(result) || result.length !== 2 || ![0, 1].includes(result[0])) return unavailable;
    const total = budgetNumber(result[1]);
    if (total === null || result[0] === 1 && (total < amount || total > MONTHLY_COST_CAP_JPY)) return unavailable;
    if (result[0] === 0 && await firstCrossing(`${key}:notified:reservation-denied`)) {
      await notifySlack(`[過去問AI] 月間AI予算の残額が不足する生成を停止しました（上限 ¥${MONTHLY_COST_CAP_JPY.toLocaleString()}）。費用カウンタと予約を確認してください。`);
    }
    await maybeNotifyThresholds(key, total);
    return result[0] === 1
      ? { allowed: true, totalJpy: total, capJpy: MONTHLY_COST_CAP_JPY, reservation }
      : { allowed: false, totalJpy: total, capJpy: MONTHLY_COST_CAP_JPY, reason: "cost_capped" };
  }
  const total = await readMonthlyCost(monthlyCostKey());
  if (total === null) return {
    allowed: false, totalJpy: null, capJpy: MONTHLY_COST_CAP_JPY, reason: "budget_unavailable",
  };
  return {
    allowed: total < MONTHLY_COST_CAP_JPY,
    totalJpy: total,
    capJpy: MONTHLY_COST_CAP_JPY,
    ...(total >= MONTHLY_COST_CAP_JPY ? { reason: "cost_capped" as const } : {}),
  };
}

export interface RecordCostInput {
  tier: ModelTier;
  inputTokens: number;
  outputTokens: number;
  label: string;
  reservation?: CostReservation;
}

// 1 回の AI 呼び出しが実際に月次の費用に計上されたかを、ログで確かめられるようにする
// （CLAUDE.md §7: Preview で 1 回叩いて「コストが計上されているか」を見る）。金額のみで秘密値は含まない。
function logRecorded(label: string, jpy: number, monthTotalJpy: number | null): void {
  console.info("[cost-guard] recorded", {
    label,
    jpy: Math.round(jpy * 10000) / 10000,
    monthTotalJpy: monthTotalJpy === null ? null : Math.round(monthTotalJpy * 100) / 100,
  });
}

/**
 * Record the estimated cost of one completed AI call into the monthly bucket and
 * fire Slack notifications when the ¥40k / ¥50k thresholds are first crossed.
 * Returns whether the monthly bucket write was confirmed; never throws.
 * Await before completing the response so serverless runtimes cannot drop it.
 */
export async function recordAiCost(input: RecordCostInput): Promise<"recorded" | "failed"> {
  let status: "recorded" | "failed" = "failed";
  try {
    if (!kvConfig()) return status;
    const jpy = costJpy(input.tier, input.inputTokens, input.outputTokens);
    if (input.reservation) {
      // Keep the conservative charge on missing/ambiguous settlement; never retry.
      const total = budgetNumber(await budgetCommand(SETTLE_COST_LUA, input.reservation, jpy));
      logRecorded(input.label, jpy, total);
      if (total !== null) status = "recorded";
      if (total !== null) await maybeNotifyThresholds(input.reservation.key, total);
      return status;
    }
    if (jpy <= 0) return status;

    const key = monthlyCostKey();
    const total = await kvIncrByFloat(key, jpy);
    logRecorded(input.label, jpy, total);
    if (total === null) return status;
    status = "recorded";

    // First write into a fresh bucket → set the cleanup TTL.
    if (total - jpy < 0.0001) {
      await kvExpire(key, BUCKET_TTL_SEC);
    }

    await maybeNotifyThresholds(key, total);
  } catch {
    // Accounting must never break the user-facing AI response.
    console.error("[cost-guard] recordAiCost failed");
  }
  return status;
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
  } catch {
    console.error("[cost-guard] Slack notification failed");
  }
}
