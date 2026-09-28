import type { LLMProvider, StreamChatParams, StreamCompletion } from "@/lib/ai/provider";

const MODEL = "gemini-3.8-flash";
const ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:streamGenerateContent?alt=sse`;

type GeminiEvent = {
  candidates?: Array<{
    content?: { parts?: Array<{ text?: string; thought?: boolean }> };
    finishReason?: string;
  }>;
  usageMetadata?: {
    promptTokenCount?: number;
    candidatesTokenCount?: number;
    thoughtsTokenCount?: number;
    totalTokenCount?: number;
  };
};

/** Only the question chat uses this provider. The older SDK remains for scoring. */
export function createCopilotGeminiProvider(apiKey: string): LLMProvider {
  return {
    name: "gemini",
    async *streamChat(params: StreamChatParams): AsyncIterable<string> {
      if (params.model !== MODEL) throw new Error("Unsupported copilot model");
      if (params.messages.at(-1)?.role !== "user") throw new Error("Last message must be from user");

      const response = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-goog-api-key": apiKey },
        body: JSON.stringify({
          systemInstruction: { parts: [{ text: params.system }] },
          contents: params.messages.map((message) => ({
            role: message.role === "assistant" ? "model" : "user",
            parts: [{ text: message.content }],
          })),
          generationConfig: {
            maxOutputTokens: params.maxTokens ?? 1200,
            thinkingConfig: { thinkingLevel: "low" },
          },
        }),
        signal: params.signal,
      });
      // Never include a provider error body: it may echo request content.
      if (!response.ok || !response.body) throw new Error(`Gemini stream HTTP ${response.status}`);

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let pending = "";
      let completion: StreamCompletion | undefined;
      let yielded = false;
      const parseEvent = (event: string): GeminiEvent | undefined => {
        const payload = event.split(/\r?\n/).filter((line) => line.startsWith("data:"))
          .map((line) => line.slice(5).trimStart()).join("\n");
        if (!payload || payload === "[DONE]") return undefined;
        return JSON.parse(payload) as GeminiEvent;
      };
      try {
        for (;;) {
          const { value, done } = await reader.read();
          pending = (pending + decoder.decode(value, { stream: !done })).replace(/\r\n/g, "\n");
          let boundary: number;
          while ((boundary = pending.indexOf("\n\n")) >= 0) {
            const event = parseEvent(pending.slice(0, boundary));
            pending = pending.slice(boundary + 2);
            if (!event) continue;
            const candidate = event.candidates?.[0];
            const usage = event.usageMetadata;
            if (candidate?.finishReason || usage) {
              completion = {
                finishReason: candidate?.finishReason ?? completion?.finishReason,
                promptTokens: usage?.promptTokenCount ?? completion?.promptTokens,
                outputTokens: usage?.candidatesTokenCount ?? completion?.outputTokens,
                thoughtsTokens: usage?.thoughtsTokenCount ?? completion?.thoughtsTokens,
                totalTokens: usage?.totalTokenCount ?? completion?.totalTokens,
                truncated: candidate?.finishReason === "MAX_TOKENS" || completion?.truncated === true,
              };
            }
            for (const part of candidate?.content?.parts ?? []) {
              if (part.thought || !part.text) continue;
              yielded = true;
              yield part.text;
            }
          }
          if (done) break;
        }
        if (pending.trim()) {
          const event = parseEvent(pending);
          const candidate = event?.candidates?.[0];
          const usage = event?.usageMetadata;
          if (candidate?.finishReason || usage) completion = {
            finishReason: candidate?.finishReason ?? completion?.finishReason,
            promptTokens: usage?.promptTokenCount ?? completion?.promptTokens,
            outputTokens: usage?.candidatesTokenCount ?? completion?.outputTokens,
            thoughtsTokens: usage?.thoughtsTokenCount ?? completion?.thoughtsTokens,
            totalTokens: usage?.totalTokenCount ?? completion?.totalTokens,
            truncated: candidate?.finishReason === "MAX_TOKENS" || completion?.truncated === true,
          };
          for (const part of candidate?.content?.parts ?? []) {
            if (part.thought || !part.text) continue;
            yielded = true;
            yield part.text;
          }
        }
        params.onComplete?.(completion ?? { truncated: false });
        if (!yielded) throw new Error("Gemini returned no visible text");
      } finally {
        reader.releaseLock();
      }
    },
  };
}
