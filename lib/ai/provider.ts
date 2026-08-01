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
  if (tier === "grading") {
    return process.env.GEMINI_MODEL_GRADING ?? "gemini-2.5-flash";
  }
  if (tier === "free") {
    return process.env.GEMINI_MODEL_FREE ?? "gemini-2.5-flash-lite";
  }
  return process.env.GEMINI_MODEL_PREMIUM ?? "gemini-2.5-flash";
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
