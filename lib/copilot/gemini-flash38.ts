import { CopilotProviderError, classifyCopilotHttpFailure } from "./errors";
import type { LLMProvider, StreamChatParams, StreamCompletion } from "@/lib/ai/provider";

import { COPILOT_MODEL as MODEL } from "./model";
const ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:streamGenerateContent?alt=sse`;
const MAX_ERROR_BODY_BYTES = 16_384;
const ERROR_METADATA_TIMEOUT_MS = 1_000;

/** Parse at most 16 KiB / 1 second, retaining only allowlisted diagnostics. */
async function readErrorMetadata(response: Response): Promise<unknown> {
  const reader = response.body?.getReader();
  if (!reader) return undefined;
  const decoder = new TextDecoder();
  let bytes = 0;
  let text = "";
  const timeout = setTimeout(() => { void reader.cancel().catch(() => {}); }, ERROR_METADATA_TIMEOUT_MS);
  try {
    for (;;) {
      const { done, value } = await reader.read();
      if (done) break;
      bytes += value.byteLength;
      if (bytes > MAX_ERROR_BODY_BYTES) {
        // A broken source must not delay the HTTP-status fallback on cancellation.
        void reader.cancel().catch(() => {});
        return undefined;
      }
      text += decoder.decode(value, { stream: true });
    }
    return JSON.parse(text + decoder.decode()) as unknown;
  } catch { return undefined; }
  finally { clearTimeout(timeout); reader.releaseLock(); }
}

type GeminiEvent = {
  error?: { code?: unknown; status?: unknown; details?: unknown };
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
      if (!response.ok) {
        const body = await readErrorMetadata(response);
        throw new CopilotProviderError(classifyCopilotHttpFailure(response.status, body, response.headers.get("retry-after")));
      }
      if (!response.body) throw new CopilotProviderError({ code: "no_text" });

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let pending = "";
      let completion: StreamCompletion | undefined;
      let yielded = false;
      const parseEvent = (event: string): GeminiEvent | undefined => {
        const payload = event.split(/\r?\n/).filter((line) => line.startsWith("data:"))
          .map((line) => line.slice(5).trimStart()).join("\n");
        if (!payload || payload === "[DONE]") return undefined;
        try {
          const parsed: unknown = JSON.parse(payload);
          if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) throw new Error();
          const event = parsed as GeminiEvent;
          if (event.error !== undefined) {
            const error = event.error;
            const statusMap: Record<string, number> = { UNAUTHENTICATED: 401, PERMISSION_DENIED: 403, INVALID_ARGUMENT: 400, NOT_FOUND: 404, RESOURCE_EXHAUSTED: 429, QUOTA_EXCEEDED: 429, RATE_LIMIT_EXCEEDED: 429, UNAVAILABLE: 503, DEADLINE_EXCEEDED: 504, INTERNAL: 500 };
            const httpCode = typeof error?.code === "number" && [400, 401, 402, 403, 404, 429, 500, 503, 504].includes(error.code) ? error.code : typeof error?.status === "string" && Object.hasOwn(statusMap, error.status) ? statusMap[error.status] : 0;
            const info = classifyCopilotHttpFailure(httpCode, { error });
            // An embedded event is not an HTTP rejection: preserve conservative accounting.
            delete info.httpStatus;
            throw new CopilotProviderError(info);
          }
          if (event.usageMetadata !== undefined) {
            if (!event.usageMetadata || typeof event.usageMetadata !== "object" || Array.isArray(event.usageMetadata)) throw new Error();
            for (const key of ["promptTokenCount", "candidatesTokenCount", "thoughtsTokenCount", "totalTokenCount"] as const) {
              const count = event.usageMetadata[key];
              if (count !== undefined && (typeof count !== "number" || !Number.isSafeInteger(count) || count < 0)) throw new Error();
            }
          }
          if (event.candidates !== undefined && !Array.isArray(event.candidates)) throw new Error();
          for (const candidate of event.candidates ?? []) {
            if (!candidate || typeof candidate !== "object") throw new Error();
            if (candidate.content?.parts !== undefined && !Array.isArray(candidate.content.parts)) throw new Error();
            for (const part of candidate.content?.parts ?? []) {
              if (!part || typeof part !== "object" || (part.text !== undefined && typeof part.text !== "string")) throw new Error();
            }
          }
          return parsed as GeminiEvent;
        } catch (error) {
          if (error instanceof CopilotProviderError) throw error;
          throw new CopilotProviderError({ code: "malformed_stream" });
        }
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
        if (!yielded) throw new CopilotProviderError({ code: "no_text" });
        if (completion?.finishReason !== "STOP" && completion?.finishReason !== "MAX_TOKENS") {
          throw new CopilotProviderError({ code: "truncated" });
        }
      } finally {
        reader.releaseLock();
      }
    },
  };
}
