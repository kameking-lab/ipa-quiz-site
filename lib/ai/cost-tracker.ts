import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { join } from "node:path";

export type ModelTier = "pro" | "flash" | "flash-lite";

// USD per 1M tokens (Gemini 2.5 Pro / Flash / Flash-Lite)
// Record<ModelTier, ...> なので、ModelTier に層を足すと単価行の追加が
// コンパイルエラーで強制される（＝単価未定義の層が生まれない）。
const PRICING: Record<ModelTier, { input: number; output: number }> = {
  pro: { input: 1.25, output: 10.00 },
  flash: { input: 0.30, output: 2.50 },
  "flash-lite": { input: 0.10, output: 0.40 },
};

/**
 * モデル ID から課金層を引く。層を確定できない名前には null を返す。
 *
 * tierForModel（未知を pro に倒す）と、resolveModel の env 検証
 * （未知なら env を採用しない）の両方がこの 1 つの判定を共有する。
 * 片方だけが「知らない名前」を別の基準で判断すると、
 * 「計上は pro なのに実行は素通り」というズレが生まれるため。
 */
function lookupTier(model: string | undefined): ModelTier | null {
  const id = (model ?? "").toLowerCase();
  // "flash-lite" は "flash" を部分文字列に含むので、必ず先に判定する。
  if (id.includes("flash-lite")) return "flash-lite";
  if (id.includes("flash")) return "flash";
  if (id.includes("pro")) return "pro";
  return null;
}

/**
 * 単価表のどの層に載るか確定できるモデル名か。
 *
 * 「単価が分かる」＝「課金の見積もりが立つ」なので、env 由来のモデル名を
 * 採用してよいかの判定にそのまま使える（lib/ai/provider の resolveModel）。
 */
export function isPricedModel(model: string | undefined): boolean {
  return lookupTier(model) !== null;
}

/**
 * 解決済みモデル ID（resolveModel の戻り値）から課金層を導出する。
 *
 * 呼び出し側が層を手書きすると、モデルだけ上位に変えたときに単価が
 * 取り残されて計上が数倍過小になる（午後採点が pro なのに flash-lite 単価で
 * 記録されていた実例）。層はモデル ID から必ず導出し、手書きしない。
 *
 * 未知のモデル名は最上位単価（pro）で計上する。§0 の上限は安全装置なので、
 * 「過小計上で素通り」より「過大計上で早めに止まる」側に倒す。
 * （cost-guard の estimateTokens が chars/2 で高めに見積もるのと同じ方針）
 */
export function tierForModel(model: string | undefined): ModelTier {
  const tier = lookupTier(model);
  if (tier) return tier;
  console.warn(`[cost-tracker] unknown model "${model}" — pro 単価で計上します`);
  return "pro";
}

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
