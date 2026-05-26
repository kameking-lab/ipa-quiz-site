import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { join } from "node:path";

export type ModelTier = "flash" | "flash-lite";

// USD per 1M tokens (Gemini 2.5 Flash / Flash-Lite)
const PRICING: Record<ModelTier, { input: number; output: number }> = {
  flash: { input: 0.30, output: 2.50 },
  "flash-lite": { input: 0.10, output: 0.40 },
};

const USD_TO_JPY = 150;
const LOGS_DIR = join(process.cwd(), "logs");
const COST_LOG = join(LOGS_DIR, "api-cost.json");

export interface ApiCall {
  timestamp: string;
  tier: ModelTier;
  label: string;
  inputTokens: number;
  outputTokens: number;
  costUsd: number;
  costJpy: number;
}

export interface CostSession {
  id: string;
  startedAt: string;
  calls: ApiCall[];
  totalInputTokens: number;
  totalOutputTokens: number;
  totalCostUsd: number;
  totalCostJpy: number;
}

function calcCost(
  tier: ModelTier,
  input: number,
  output: number,
): { usd: number; jpy: number } {
  const p = PRICING[tier];
  const usd = (input * p.input + output * p.output) / 1_000_000;
  return { usd, jpy: usd * USD_TO_JPY };
}

/**
 * Standalone JPY cost for a single call. Single source of truth for the
 * pricing table so the live cost cap (lib/ai/cost-guard) and the offline
 * batch tracker (scripts/parse-all) never diverge.
 */
export function costJpy(tier: ModelTier, inputTokens: number, outputTokens: number): number {
  return calcCost(tier, inputTokens, outputTokens).jpy;
}

export class CostTracker {
  private session: CostSession;

  constructor(id?: string) {
    this.session = {
      id: id ?? new Date().toISOString().slice(0, 19).replace(/[T:]/g, "-"),
      startedAt: new Date().toISOString(),
      calls: [],
      totalInputTokens: 0,
      totalOutputTokens: 0,
      totalCostUsd: 0,
      totalCostJpy: 0,
    };
  }

  record(
    tier: ModelTier,
    inputTokens: number,
    outputTokens: number,
    label: string,
  ): ApiCall {
    const { usd, jpy } = calcCost(tier, inputTokens, outputTokens);
    const call: ApiCall = {
      timestamp: new Date().toISOString(),
      tier,
      label,
      inputTokens,
      outputTokens,
      costUsd: usd,
      costJpy: jpy,
    };
    this.session.calls.push(call);
    this.session.totalInputTokens += inputTokens;
    this.session.totalOutputTokens += outputTokens;
    this.session.totalCostUsd += usd;
    this.session.totalCostJpy += jpy;
    return call;
  }

  /** Estimate cost in JPY without recording. */
  estimate(tier: ModelTier, inputTokens: number, outputTokens: number): number {
    return calcCost(tier, inputTokens, outputTokens).jpy;
  }

  get totalJpy(): number {
    return this.session.totalCostJpy;
  }

  get totalUsd(): number {
    return this.session.totalCostUsd;
  }

  get callCount(): number {
    return this.session.calls.length;
  }

  save(): void {
    mkdirSync(LOGS_DIR, { recursive: true });
    let history: CostSession[] = [];
    if (existsSync(COST_LOG)) {
      try {
        const raw = JSON.parse(readFileSync(COST_LOG, "utf-8")) as unknown;
        history = Array.isArray(raw) ? (raw as CostSession[]) : [];
      } catch {
        history = [];
      }
    }
    const idx = history.findIndex((s) => s.id === this.session.id);
    if (idx >= 0) history[idx] = this.session;
    else history.push(this.session);
    writeFileSync(COST_LOG, JSON.stringify(history, null, 2), "utf-8");
  }

  printSummary(): void {
    const { calls, totalInputTokens, totalOutputTokens, totalCostUsd, totalCostJpy } =
      this.session;
    console.log("\n=== コスト集計 ===");
    console.log(`API呼び出し数 : ${calls.length}`);
    console.log(`入力トークン  : ${totalInputTokens.toLocaleString()}`);
    console.log(`出力トークン  : ${totalOutputTokens.toLocaleString()}`);
    console.log(`合計コスト    : $${totalCostUsd.toFixed(4)} (¥${Math.ceil(totalCostJpy)})`);
    console.log(`ログ保存先    : logs/api-cost.json`);
  }
}
