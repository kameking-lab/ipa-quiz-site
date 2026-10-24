import { CopilotProviderError, copilotErrorInfo, encodeCopilotStreamError } from "./errors";
import type { LLMProvider, StreamCompletion } from "@/lib/ai/provider";
import { captureException } from "@/lib/monitoring/sentry";
import { citationFooterForResponse, CITATION_UNVERIFIED_NOTICE } from "./citations";

export type CopilotStreamOutcome = "success" | "failed" | "timeout" | "cancelled" | "truncated";

export interface CopilotStreamInput {
  provider: LLMProvider;
  system: string;
  userMessages: { role: "user" | "assistant"; content: string }[];
  model: string;
  maxTokens: number;
  temperature?: number;
  clientSignal?: AbortSignal;
  /** Candidate source-list template; only answer-used references are appended. */
  citationFooter: string;
  hasGrounding: boolean;
  /** Cap upstream latency (ms). Defaults to 35_000. */
  timeoutMs?: number;
  /**
   * Called once after the stream settles with the number of output characters
   * produced (excludes the citation footer / fallback text). Used for cost
   * accounting; must not throw. Invocation does not imply generation succeeded;
   * the outcome distinguishes completion from failure or partial output.
   *
   * A returned promise is awaited **before** the stream is closed. Cost
   * accounting persists to KV, and on a serverless platform the function is
   * frozen the moment the response completes — anything still in flight at
   * close() is silently dropped.
   */
  onComplete?: (outputChars: number, usage: StreamCompletion | undefined, outcome: CopilotStreamOutcome) => void | Promise<void>;
}

const DEFAULT_TIMEOUT_MS = 35_000;
const DEFAULT_TEMPERATURE = 0.7;
const MONITORING_TIMEOUT_MS = 2_000;

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
  let responseText = "";
  let usage: StreamCompletion | undefined;
  let upstreamRejected = false;
  let outcome: CopilotStreamOutcome = "failed";
  let consumerCancelled = false;

  return new ReadableStream<Uint8Array>({
    async start(controller) {
      let closed = false;
      const closeStream = () => {
        if (closed) return;
        closed = true;
        try {
          controller.close();
        } catch {
          // controller may already be closed if the client disconnected mid-flight
        }
      };
      try {
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
          controller.enqueue(encoder.encode(chunk));
        }
        if (!producedAnyChunk) throw new CopilotProviderError({ code: "no_text" });
        if (usage?.truncated) {
          controller.enqueue(encoder.encode("\n\n[応答の途中終了] 出力上限に達しました。続きを質問してください。"));
        }
        const usedFooter = hasGrounding ? citationFooterForResponse(citationFooter, responseText) : "";
        controller.enqueue(encoder.encode(usedFooter || CITATION_UNVERIFIED_NOTICE));
        if (usage?.truncated) controller.enqueue(encoder.encode(encodeCopilotStreamError({ code: "truncated" })));
        outcome = usage?.truncated ? "truncated" : "success";
      } catch (err) {
        clearTimeout(timeoutHandle);
        // Clear request/auth/quota rejections do not start generation. A 5xx
        // can follow provider work, so keep conservative accounting for it.
        upstreamRejected = !producedAnyChunk && err instanceof CopilotProviderError &&
          err.info.httpStatus !== undefined && [400, 401, 402, 403, 404, 429].includes(err.info.httpStatus);
        const aborted = !upstreamRejected && (
          (err as { name?: string } | null)?.name === "AbortError" ||
          upstreamAbort.signal.aborted);
        const cancelled = clientSignal?.aborted || consumerCancelled;
        const timedOut = aborted && !cancelled;
        outcome = cancelled ? "cancelled" : timedOut ? "timeout" : copilotErrorInfo(err).code === "truncated" ? "truncated" : "failed";

        if (cancelled) {
          // finally 側で計上してから閉じる（部分出力ぶんの課金は発生している）。
          return;
        }


        const fallback = timedOut
          ? producedAnyChunk
            ? "\n\n[タイムアウト] AI応答が途中で止まりました。短めの設定で再試行するか、もう一度お試しください。"
            : "\n\n[タイムアウト] AIの応答が間に合いませんでした。混雑時は再試行で改善することがあります。"
          : "\n\n[エラー] AI応答の取得に失敗しました。少し時間を置いて再度お試しください。";

        try {
          controller.enqueue(encoder.encode(fallback + encodeCopilotStreamError(timedOut ? { code: "timeout" } : copilotErrorInfo(err))));
        } catch {
          // controller may already be closed if the client disconnected mid-error
        }
        if (!timedOut) {
          let monitoringTimer: ReturnType<typeof setTimeout> | undefined;
          try {
            // Diagnostics are already queued. An unavailable monitoring service
            // must not prevent response closure and awaited cost accounting.
            await Promise.race([
              captureException(new CopilotProviderError(copilotErrorInfo(err)), {
                route: "/api/copilot",
                extra: { provider: provider.name, model, producedAnyChunk, ...copilotErrorInfo(err) },
              }),
              new Promise<void>((resolve) => { monitoringTimer = setTimeout(resolve, MONITORING_TIMEOUT_MS); }),
            ]);
          } catch { /* Monitoring must not hide the failure marker. */ }
          finally { if (monitoringTimer !== undefined) clearTimeout(monitoringTimer); }
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
          if (!upstreamRejected) await onComplete?.(producedChars, usage, outcome);
        } catch {
          // ignore
        }
        closeStream();
      }
    },
    cancel() {
      consumerCancelled = true;
      upstreamAbort.abort();
      clearTimeout(timeoutHandle);
    },
  });
}
