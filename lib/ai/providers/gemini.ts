import { GoogleGenerativeAI } from "@google/generative-ai";
import type { GenerationConfig, UsageMetadata } from "@google/generative-ai";
import type { LLMProvider, StreamChatParams } from "../provider";

/**
 * @google/generative-ai 0.24.1 の型定義は Gemini 2.5 の「思考」より前の世代で、
 * generationConfig.thinkingConfig も usageMetadata.thoughtsTokenCount も知らない。
 * SDK は generationConfig をそのまま v1beta REST に載せ、応答 JSON もそのまま
 * 返すので実体は存在する。any を使わずに型だけここで補う。
 */
type GenerationConfigWithThinking = GenerationConfig & {
  thinkingConfig?: { thinkingBudget?: number; includeThoughts?: boolean };
};
type UsageMetadataWithThoughts = UsageMetadata & { thoughtsTokenCount?: number };

export function createGeminiProvider(): LLMProvider {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is not set");
  }
  const client = new GoogleGenerativeAI(apiKey);

  return {
    name: "gemini",
    async *streamChat(params: StreamChatParams): AsyncIterable<string> {
      const modelName =
        params.model ?? process.env.GEMINI_MODEL_FREE ?? "gemini-2.5-flash-lite";

      const generationConfig: GenerationConfigWithThinking = {
        maxOutputTokens: params.maxTokens ?? 800,
        temperature: params.temperature ?? 0.7,
      };
      if (params.responseMimeType) {
        generationConfig.responseMimeType = params.responseMimeType;
      }
      // thinkingBudget は「未指定」と「0」を区別する必要がある（0 = 思考オフ）。
      if (params.thinkingBudget !== undefined) {
        generationConfig.thinkingConfig = { thinkingBudget: params.thinkingBudget };
      }

      const model = client.getGenerativeModel({
        model: modelName,
        systemInstruction: params.system,
        generationConfig,
      });

      const history = params.messages.slice(0, -1).map((m) => ({
        role: m.role === "assistant" ? "model" : "user",
        parts: [{ text: m.content }],
      }));
      const last = params.messages[params.messages.length - 1];
      if (!last || last.role !== "user") {
        throw new Error("Last message must be from user");
      }

      const chat = model.startChat({ history });
      const stream = await chat.sendMessageStream(last.content);
      for await (const chunk of stream.stream) {
        if (params.signal?.aborted) {
          throw new DOMException("Aborted", "AbortError");
        }
        const text = chunk.text();
        if (text) yield text;
      }

      if (params.onComplete) {
        // 集約レスポンスから finishReason と usageMetadata を取り出す。
        // ここを捨てていたため、応答が MAX_TOKENS で切れても呼び出し側から
        // 「JSON の解析に失敗した」としか見えなかった。
        const final = await stream.response;
        const usage = final.usageMetadata as UsageMetadataWithThoughts | undefined;
        const finishReason = final.candidates?.[0]?.finishReason;
        params.onComplete({
          finishReason,
          promptTokens: usage?.promptTokenCount,
          outputTokens: usage?.candidatesTokenCount,
          thoughtsTokens: usage?.thoughtsTokenCount,
          truncated: finishReason === "MAX_TOKENS",
        });
      }
    },
  };
}
