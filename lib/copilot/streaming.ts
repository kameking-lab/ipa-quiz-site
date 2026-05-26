import type { LLMProvider } from "@/lib/ai/provider";
import { captureException } from "@/lib/monitoring/sentry";

export interface CopilotStreamInput {
  provider: LLMProvider;
  system: string;
  userMessages: { role: "user" | "assistant"; content: string }[];
  model: string;
  maxTokens: number;
  temperature?: number;
  clientSignal?: AbortSignal;
  /** If hasGrounding is true the citationFooter is appended after a successful stream. */
  citationFooter: string;
  hasGrounding: boolean;
  /** Cap upstream latency (ms). Defaults to 35_000. */
  timeoutMs?: number;
  /**
   * Called once after the stream settles with the number of output characters
   * produced (excludes the citation footer / fallback text). Used for cost
   * accounting; must not throw.
   */
  onComplete?: (outputChars: number) => void;
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

  const onClientAbort = () => upstreamAbort.abort();
  if (clientSignal) {
    if (clientSignal.aborted) upstreamAbort.abort();
    else clientSignal.addEventListener("abort", onClientAbort, { once: true });
  }

  const encoder = new TextEncoder();
  let producedAnyChunk = false;
  let producedChars = 0;

  return new ReadableStream<Uint8Array>({
    async start(controller) {
      try {
        for await (const chunk of provider.streamChat({
          system,
          messages: userMessages,
          model,
          maxTokens,
          temperature,
          signal: upstreamAbort.signal,
        })) {
          producedAnyChunk = true;
          producedChars += chunk.length;
          controller.enqueue(encoder.encode(chunk));
        }
        if (hasGrounding && citationFooter) {
          controller.enqueue(encoder.encode(citationFooter));
        }
        controller.close();
      } catch (err) {
        const aborted =
          (err as { name?: string } | null)?.name === "AbortError" ||
          upstreamAbort.signal.aborted;
        const timedOut = aborted && !clientSignal?.aborted;

        if (aborted && clientSignal?.aborted) {
          try {
            controller.close();
          } catch {
            // already closed
          }
          return;
        }

        if (!timedOut) {
          await captureException(err, {
            route: "/api/copilot",
            extra: { provider: provider.name, model, producedAnyChunk },
          });
        }

        const fallback = timedOut
          ? producedAnyChunk
            ? "\n\n[タイムアウト] AI応答が途中で止まりました。短めの設定で再試行するか、もう一度お試しください。"
            : "\n\n[タイムアウト] AIの応答が間に合いませんでした。混雑時は再試行で改善することがあります。"
          : "\n\n[エラー] AI応答の取得に失敗しました。少し時間を置いて再度お試しください。";

        try {
          controller.enqueue(encoder.encode(fallback));
          controller.close();
        } catch {
          // controller may already be closed if the client disconnected mid-error
        }
      } finally {
        clearTimeout(timeoutHandle);
        clientSignal?.removeEventListener("abort", onClientAbort);
        // Report whatever was produced (incl. partial on timeout) for cost
        // accounting. Wrapped so a faulty callback never breaks the stream.
        try {
          onComplete?.(producedChars);
        } catch {
          // ignore
        }
      }
    },
    cancel() {
      upstreamAbort.abort();
      clearTimeout(timeoutHandle);
    },
  });
}
