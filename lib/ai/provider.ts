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

export function resolveModel(tier: "free" | "premium"): string {
  if (tier === "free") {
    return process.env.GEMINI_MODEL_FREE ?? "gemini-2.5-flash-lite";
  }
  return process.env.GEMINI_MODEL_PREMIUM ?? "gemini-2.5-flash";
}
