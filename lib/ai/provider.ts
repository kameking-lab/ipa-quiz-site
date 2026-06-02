export type ChatRole = "system" | "user" | "assistant";

export interface ChatMessage {
  role: ChatRole;
  content: string;
}

export interface StreamChatParams {
  system: string;
  messages: ChatMessage[];
  model?: string;
  maxTokens?: number;
  temperature?: number;
  signal?: AbortSignal;
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
  // GEMINI_MODEL_GRADING で運用側が設定する（未設定時は上位モデルへフォールバック）。
  if (tier === "grading") {
    return process.env.GEMINI_MODEL_GRADING ?? "gemini-2.5-pro";
  }
  if (tier === "free") {
    return process.env.GEMINI_MODEL_FREE ?? "gemini-2.5-flash-lite";
  }
  return process.env.GEMINI_MODEL_PREMIUM ?? "gemini-2.5-flash";
}
