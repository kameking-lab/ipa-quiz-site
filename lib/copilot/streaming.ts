import type { LLMProvider, StreamCompletion } from "@/lib/ai/provider";
import { captureException } from "@/lib/monitoring/sentry";
import { citationFooterForResponse, CITATION_UNVERIFIED_NOTICE } from "./citations";
import { COPILOT_PARTIAL_ANSWER } from "./response-status";

export interface CopilotStreamInput {
  provider: LLMProvider;
  system: string;
  userMessages: { role: "user" | "assistant"; content: string }[];
  model: string;
  maxTokens: number;
  temperature?: number;
  clientSignal?: AbortSignal;
  requireCompleteAnswer?: boolean;
  /** Hold free answers until the provider finishes, so an incomplete answer can release its slot. */
  bufferAnswer?: boolean;
  /** Candidate source-list template; only answer-used references are appended. */
  citationFooter: string;
  hasGrounding: boolean;
  /** Cap upstream latency (ms). Defaults to 35_000. */
  timeoutMs?: number;
  /**
   * Called once after the stream settles with the number of output characters
   * produced (excludes the citation footer / fallback text). Used for cost
   * accounting; must not throw.
   *
   * A returned promise is awaited **before** the stream is closed. Cost
   * accounting persists to KV, and on a serverless platform the function is
   * frozen the moment the response completes — anything still in flight at
   * close() is silently dropped.
   */
  onComplete?: (outputChars: number, usage?: StreamCompletion, answered?: boolean) => void | Promise<void>;
}

const DEFAULT_TIMEOUT_MS = 35_000;
const DEFAULT_TEMPERATURE = 0.7;

/**
 * Build the user-facing streaming Response body for `/api/copilot`.
 * Handles upstream timeout, client-disconnect propagation, error fallback message,
 * and the optional RAG citation footer appended after a successful stream.
 */
export function createCopilotResponseStream(input: CopilotStreamInput): ReadableStream<Uint8Array> {
  const {
    provider,
    system,
    userMessages,
    model,
    maxTokens,
    temperature = DEFAULT_TEMPERATURE,
    clientSignal,
    citationFooter,
    hasGrounding,
    timeoutMs = DEFAULT_TIMEOUT_MS,
    onComplete,
  } = input;

  const upstreamAbort = new AbortController();
  const timeoutHandle = setTimeout(() => upstreamAbort.abort(), timeoutMs);
  const settled = Promise.withResolvers<void>();
  let cancelledByClient = false;

  const onClientAbort = () => {
    if (upstreamAbort.signal.aborted) return;
    cancelledByClient = true;
    upstreamAbort.abort();
  };
  if (clientSignal) {
    if (clientSignal.aborted) onClientAbort();
    else clientSignal.addEventListener("abort", onClientAbort, { once: true });
  }

  const encoder = new TextEncoder();
  let producedAnyChunk = false;
  let producedChars = 0;
  let responseText = "";
  let usage: StreamCompletion | undefined;

  return new ReadableStream<Uint8Array>({
    async start(controller) {
      let answered = false;
      let bodyDelivered = false;
      let phase = "provider";
      const deliverBody = (text: string) => {
        controller.enqueue(encoder.encode(text));
        bodyDelivered ||= text.trim().length > 0;
      };
      try {
        upstreamAbort.signal.throwIfAborted();
        for await (const chunk of provider.streamChat({
          system,
          messages: userMessages,
          model,
          maxTokens,
          temperature,
          signal: upstreamAbort.signal,
          onComplete: (completion) => { usage = completion; },
        })) {
          producedAnyChunk = true;
          producedChars += chunk.length;
          responseText += chunk;
          upstreamAbort.signal.throwIfAborted();
          if (!input.bufferAnswer) deliverBody(chunk);
        }
        upstreamAbort.signal.throwIfAborted();
        clearTimeout(timeoutHandle);
        phase = "completion";
        if (!responseText.trim()) throw new Error("AI response was empty");
        if (input.requireCompleteAnswer && provider.name === "gemini" && !usage?.truncated && usage?.finishReason !== "STOP") {
          throw new Error("AI stream ended without a completed answer");
        }
        phase = "citations";
        const usedFooter = hasGrounding ? citationFooterForResponse(citationFooter, responseText) : "";
        phase = "delivery";
        if (input.bufferAnswer) {
          deliverBody(responseText);
          answered = bodyDelivered;
        }
        if (usage?.truncated) {
          controller.enqueue(encoder.encode(`\n\n${COPILOT_PARTIAL_ANSWER} 出力上限に達したため、回答は途中までです。`));
        }
        controller.enqueue(encoder.encode(usedFooter || CITATION_UNVERIFIED_NOTICE));
        answered = bodyDelivered;
      } catch (err) {
        if (cancelledByClient) {
          // Provider output that was still buffered never reached the response body.
          answered = bodyDelivered;
          return;
        }
        const aborted =
          (err as { name?: string } | null)?.name === "AbortError" ||
          upstreamAbort.signal.aborted;
        const timedOut = aborted;

        if (!timedOut) {
          console.warn("[copilot] stream failed", { phase, producedAnyChunk, kind: err instanceof TypeError ? "TypeError" : "Error" });
          await captureException(err, {
            route: "/api/copilot",
            extra: { provider: provider.name, model, phase, producedAnyChunk },
          });
        }

        const fallback = timedOut
          ? producedAnyChunk
            ? "\n\n[タイムアウト] AI応答が途中で止まりました。短めの設定で再試行するか、もう一度お試しください。"
            : "\n\n[タイムアウト] AIの応答が間に合いませんでした。混雑時は再試行で改善することがあります。"
          : "\n\n[エラー] AI応答の取得に失敗しました。少し時間を置いて再度お試しください。";

        try {
          controller.enqueue(encoder.encode(fallback));
        } catch {
          // controller may already be closed if the client disconnected mid-error
        }
      } finally {
        clearTimeout(timeoutHandle);
        clientSignal?.removeEventListener("abort", onClientAbort);
        // Report whatever was produced (incl. partial on timeout) for cost
        // accounting. Wrapped so a faulty callback never breaks the stream.
        //
        // 必ず close() の **前** に await する。close() 後に投げた非同期処理は、
        // レスポンス完了でサーバレス関数が凍結されるため完了が保証されない。
        try {
          await onComplete?.(producedChars, usage, answered);
        } catch (error) {
          console.warn("[copilot] accounting callback failed", { kind: error instanceof TypeError ? "TypeError" : "Error" });
        }
        try {
          controller.close();
        } catch {
          // The body may already be closed by its consumer.
        } finally {
          settled.resolve();
        }
      }
    },
    cancel() {
      onClientAbort();
      return settled.promise;
    },
  });
}
