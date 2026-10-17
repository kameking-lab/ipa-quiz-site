import type { LLMProvider, StreamCompletion } from "@/lib/ai/provider";
import { estimatePromptTokenBudget, recordAiCost, reserveAiCost } from "@/lib/ai/cost-guard";
import { tierForModel } from "@/lib/ai/cost-tracker";
import {
  beginCopilotRequest,
  completeCopilotRequest,
  releaseCopilotRequest,
} from "@/lib/copilot/request-cache";
import { createCopilotResponseStream } from "@/lib/copilot/streaming";

type Message = { role: "user" | "assistant"; content: string };

export interface BudgetedCopilotInput {
  request: Request;
  provider: LLMProvider;
  system: string;
  userMessages: Message[];
  model: string;
  maxTokens: number;
  citationFooter: string;
  hasGrounding: boolean;
  timeoutMs: number;
  headers: HeadersInit;
}

function validTokens(value: number | undefined): value is number {
  return value !== undefined && Number.isSafeInteger(value) && value >= 0;
}

function measuredTokens(usage: StreamCompletion | undefined, outputChars: number): { inputTokens: number; outputTokens: number } | null {
  if (!usage || !validTokens(usage.promptTokens) || usage.promptTokens === 0) return null;
  if (usage.totalTokens !== undefined) {
    if (!validTokens(usage.totalTokens) || usage.totalTokens < usage.promptTokens) return null;
    const outputTokens = usage.totalTokens - usage.promptTokens;
    // A nonempty provider response cannot have zero billable output tokens.
    // Treat contradictory metadata as unknown rather than refunding the hold.
    if (outputChars > 0 && outputTokens === 0) return null;
    return { inputTokens: usage.promptTokens, outputTokens };
  }
  if (validTokens(usage.outputTokens) && validTokens(usage.thoughtsTokens)) {
    const outputTokens = usage.outputTokens + usage.thoughtsTokens;
    if (!validTokens(outputTokens) || (outputChars > 0 && outputTokens === 0)) return null;
    return { inputTokens: usage.promptTokens, outputTokens };
  }
  return null;
}

function failure(error: string, message: string, status: number, retryAfter?: string): Response {
  return Response.json(
    { error, message },
    { status, headers: { "X-Error-Type": error, ...(retryAfter ? { "Retry-After": retryAfter } : {}) } },
  );
}

/** Share the real-provider cache, reservation, and settlement lifecycle across copilot routes. */
export async function createBudgetedCopilotResponse(input: BudgetedCopilotInput): Promise<Response> {
  const {
    request, provider, system, userMessages, model, maxTokens,
    citationFooter, hasGrounding, timeoutMs, headers,
  } = input;
  const responseHeaders = new Headers(headers);
  responseHeaders.set("Content-Type", "text/plain; charset=utf-8");
  responseHeaders.set("Cache-Control", "no-store, no-cache, must-revalidate");

  if (provider.name === "mock") {
    return new Response(createCopilotResponseStream({
      provider, system, userMessages, model, maxTokens, clientSignal: request.signal,
      citationFooter, hasGrounding, timeoutMs,
    }), { headers: responseHeaders });
  }

  // Cache identity covers the full prompt plus generation and footer settings.
  // The actual provider still receives the unmodified model and prompt.
  const cache = await beginCopilotRequest({
    request,
    model: JSON.stringify([model, maxTokens, citationFooter, hasGrounding, timeoutMs]),
    system,
    userMessages,
  });
  if (cache.kind === "cached") return new Response(cache.text, { headers: responseHeaders });
  if (cache.kind === "pending") {
    return failure("copilot_pending", "同じ質問への回答を生成中です。少し待ってから再試行してください。", 409, "2");
  }
  if (cache.kind === "unavailable") {
    return failure("copilot_cache_unavailable", "AI応答を一時停止しています。しばらく待ってからお試しください。", 503, "60");
  }

  const tier = tierForModel(model);
  let reserved;
  try {
    reserved = await reserveAiCost({
      tier,
      inputTokens: estimatePromptTokenBudget(system, userMessages),
      outputTokens: maxTokens,
      label: "copilot",
    });
  } catch {
    await releaseCopilotRequest(cache.ticket);
    return failure("cost_guard_unavailable", "AI応答を一時停止しています。しばらく待ってからお試しください。", 503);
  }
  if (!reserved.allowed) {
    await releaseCopilotRequest(cache.ticket);
    return reserved.reason === "cap"
      ? failure("cost_capped", "AI機能は今月の利用上限に達したため一時停止中です。来月初めに再開します。", 503)
      : failure("cost_guard_unavailable", "AI応答を一時停止しています。しばらく待ってからお試しください。", 503);
  }

  const stream = createCopilotResponseStream({
    provider, system, userMessages, model, maxTokens, clientSignal: request.signal,
    citationFooter, hasGrounding, timeoutMs,
    onComplete: async (outputChars, usage, result) => {
      // A partial response, missing usage or a malformed usage record keeps the
      // full reservation; it must never be replaced by a character estimate.
      if (!result?.complete) return;
      const measured = measuredTokens(usage, outputChars);
      if (measured) {
        await recordAiCost({ tier, ...measured, label: "copilot", reservation: reserved.reservation });
      }
      await completeCopilotRequest(cache.ticket, result.text);
    },
  });
  return new Response(stream, { headers: responseHeaders });
}
