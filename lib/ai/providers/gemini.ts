import { GoogleGenerativeAI } from "@google/generative-ai";
import type { LLMProvider, StreamChatParams } from "../provider";

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

      const model = client.getGenerativeModel({
        model: modelName,
        systemInstruction: params.system,
        generationConfig: {
          maxOutputTokens: params.maxTokens ?? 800,
          temperature: params.temperature ?? 0.7,
        },
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
    },
  };
}
