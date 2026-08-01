import { isPricedModel, tierForModel } from "@/lib/ai/cost-tracker";

export type ChatRole = "system" | "user" | "assistant";

export interface ChatMessage {
  role: ChatRole;
  content: string;
}

/**
 * ストリーム完走時にプロバイダが報告する実測メタデータ。
 *
 * これが無いと「応答が maxOutputTokens で打ち切られた」ことを呼び出し側が
 * 検知できず、切れた JSON の解析に失敗して黙って簡易判定に落ちる（＝課金だけ
 * 発生して中身は字数判定）。truncated を上げて呼び出し側に開示させるための型。
 */
export interface StreamCompletion {
  /** Gemini の finishReason（"STOP" / "MAX_TOKENS" 等）。取得できなければ undefined */
  finishReason?: string;
  promptTokens?: number;
  /** 応答本文のトークン数（思考トークンは含まない） */
  outputTokens?: number;
  /**
   * 思考トークン数（Gemini 2.5 系）。maxOutputTokens を消費し、
   * かつ出力トークンとして課金される。
   */
  thoughtsTokens?: number;
  /** maxOutputTokens に達して応答が途中で打ち切られたか */
  truncated: boolean;
}

export interface StreamChatParams {
  system: string;
  messages: ChatMessage[];
  model?: string;
  maxTokens?: number;
  temperature?: number;
  signal?: AbortSignal;
  /**
   * Gemini 2.5 系の思考トークン上限。0 で思考を無効化する。
   * 未指定だと 2.5 Flash/Pro は「動的思考」となり、思考が maxOutputTokens を
   * 食い尽くして本文が出ないことがある（採点 JSON が途中で切れる原因）。
   */
  thinkingBudget?: number;
  /** "application/json" を渡すと JSON のみを返させる（前後の散文・コードフェンス防止） */
  responseMimeType?: string;
  /** ストリーム完走時に一度だけ呼ばれる。実測メタデータの受け口。 */
  onComplete?: (completion: StreamCompletion) => void;
}

export interface LLMProvider {
  name: string;
  streamChat(params: StreamChatParams): AsyncIterable<string>;
}

export type ProviderId = "gemini" | "claude" | "openai" | "mock";

export async function getProvider(preferred?: ProviderId): Promise<LLMProvider> {
  const envProvider = (process.env.LLM_PROVIDER as ProviderId | undefined) ?? "gemini";
  const id = preferred ?? envProvider;

  if (id === "gemini") {
    const hasKey = Boolean(process.env.GEMINI_API_KEY);
    if (!hasKey) {
      const { createMockProvider } = await import("./providers/mock");
      return createMockProvider();
    }
    const { createGeminiProvider } = await import("./providers/gemini");
    return createGeminiProvider();
  }

  if (id === "claude") {
    const { createClaudeProvider } = await import("./providers/claude");
    return createClaudeProvider();
  }

  if (id === "openai") {
    const { createOpenAIProvider } = await import("./providers/openai");
    return createOpenAIProvider();
  }

  const { createMockProvider } = await import("./providers/mock");
  return createMockProvider();
}

export type ModelTier = "free" | "premium" | "grading";

/** 層ごとの既定モデル。env が無い・使えないときはここへ倒す（すべて安全側）。 */
const DEFAULT_MODELS: Record<ModelTier, string> = {
  grading: "gemini-2.5-flash",
  free: "gemini-2.5-flash-lite",
  premium: "gemini-2.5-flash",
};

/** 解決済みモデルを層ごとに 1 回だけログするための既出記録（インスタンス単位）。 */
const loggedTiers = new Set<ModelTier>();

/**
 * env で指定されたモデル名を検証して採用可否を決める。
 *
 * 既定値を安全側に倒すだけでは、env に値が「入っている」場合の事故を防げない。
 * 想定される事故は 3 つで、いずれも本番でしか起きない:
 *   1. 空文字・空白のみ（Vercel の env は空文字を保存できる）。`??` は空文字を
 *      素通しするため、既定値に落ちずモデル名なしで API を叩いてしまう。
 *   2. タイプミス（"gemini-2.5-flsh"）。API エラーになり採点が全件フォールバック。
 *   3. 単価表にない未知・上位モデル。tierForModel が pro 単価で計上するので
 *      §0 の上限は守られるが、実行そのものは止まらない＝原価だけが跳ねる。
 *
 * そこで「単価が確定できるモデル名（= isPricedModel）」だけを採用し、
 * それ以外は既定へ倒して warn を残す。単価が分かる名前しか通さない、が不変条件。
 */
function modelFromEnv(tier: ModelTier, raw: string | undefined): string {
  const fallback = DEFAULT_MODELS[tier];
  const name = raw?.trim();
  if (!name) return fallback;
  if (isPricedModel(name)) return name;
  console.warn(
    `[provider] ${tier} のモデル指定 "${name}" は単価表に無いため採用しません。既定の ${fallback} を使います。`,
  );
  return fallback;
}

export function resolveModel(tier: ModelTier): string {
  // 午後記述・論述の AI 採点だけ上位モデルを使う（採点品質優先。Flash 系では
  // 配点・キーワード照合の判断がブレるため）。無料の四択解説・一般コパイロット・
  // 類題生成は free 層（flash-lite）のまま＝コスト効率。本番のモデル名は
  // GEMINI_MODEL_GRADING で運用側が設定する。
  //
  // 既定値は flash（安全側）。既定を pro にしていると、env が消えた・新しい環境に
  // 設定し忘れたという運用ミスがそのまま単価 4 倍の暴走になり、さらに scoring の
  // maxTokens 1500 では pro が採点 JSON を返しきれず、課金だけ発生して中身は
  // 簡易採点に落ちる（Preview で実測）。pro を使いたい場合は env で明示する。
  const raw =
    tier === "grading"
      ? process.env.GEMINI_MODEL_GRADING
      : tier === "free"
        ? process.env.GEMINI_MODEL_FREE
        : process.env.GEMINI_MODEL_PREMIUM;
  const model = modelFromEnv(tier, raw);

  // どのモデルで課金されているかを後から追えるようにする。env の設定ミスは
  // 「気づかないまま単価だけ変わる」形で効いてくるため、実際に採用した名前を
  // 層ごとに 1 回だけ残す（毎回出すとログが埋まる）。
  if (!loggedTiers.has(tier)) {
    loggedTiers.add(tier);
    console.info(
      `[provider] model resolved tier=${tier} model=${model} pricing=${tierForModel(model)}`,
    );
  }
  return model;
}

/**
 * 採点系リクエストに渡す thinkingBudget。
 *
 * Gemini 2.5 系は思考トークンが maxOutputTokens を消費する（Preview 実測:
 * maxOutputTokens 1500 に対し thoughtsTokenCount 1091 / candidatesTokenCount 400
 * で finishReason=MAX_TOKENS。採点 JSON が途中で切れ、課金だけ発生して
 * 簡易判定に落ちていた）。採点はルーブリックと模範解答を与えた照合作業で、
 * 長い思考を必要としないため既定は 0（思考オフ）。
 *
 * ただし 2.5 Pro は思考を無効化できず（最小 128）、0 を渡すと API エラーになる。
 * GEMINI_MODEL_GRADING に pro を設定する運用があり得るので、モデルで分岐する。
 */
export function gradingThinkingBudget(model: string): number {
  return model.includes("pro") ? PRO_MIN_THINKING_BUDGET : 0;
}

/** 2.5 Pro が受け付ける thinkingBudget の下限。 */
export const PRO_MIN_THINKING_BUDGET = 128;
