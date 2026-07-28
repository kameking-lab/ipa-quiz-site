import { NextResponse } from "next/server";
import { z } from "zod";
import { getProvider, resolveModel } from "@/lib/ai/provider";
import type { LLMProvider } from "@/lib/ai/provider";
import type { QuickActionId, LearnerProfile, ResponseLength } from "@/lib/ai/prompts";
import { checkRateLimit, getClientIp, readFeedbackFlag } from "@/lib/rate-limit/server";
import { checkIpRateLimit } from "@/lib/rate-limit";
import type { Question } from "@/lib/questions/types";
import { ragEnabled } from "@/lib/copilot/rag";
import { runCopilotRAGPipeline } from "@/lib/copilot/rag-pipeline";
import { assembleCopilotPrompt } from "@/lib/copilot/prompt-assembly";
import { createCopilotResponseStream } from "@/lib/copilot/streaming";
import { checkMonthlyCostCap, recordAiCost, estimateTokens } from "@/lib/ai/cost-guard";
import { tierForModel } from "@/lib/ai/cost-tracker";

export const runtime = "nodejs";

const STREAM_TIMEOUT_MS = 35_000;

const BodySchema = z.object({
  question: z.custom<Question>((v) => {
    if (typeof v !== "object" || v === null) return false;
    const q = v as Record<string, unknown>;
    const choices = q.choices as Record<string, unknown> | null;
    return (
      typeof q.id === "string" && q.id.length > 0 &&
      typeof q.question === "string" && q.question.length > 0 &&
      typeof choices === "object" && choices !== null &&
      typeof choices.ア === "string" &&
      typeof q.answer === "string" && q.answer.length > 0
    );
  }),
  messages: z
    .array(
      z.object({
        role: z.enum(["user", "assistant"]),
        content: z.string().min(1).max(4000),
      }),
    )
    .min(1),
  selectedChoice: z.string().optional(),
  isCorrect: z.boolean().optional(),
  quickAction: z.string().optional(),
  learnerProfile: z
    .object({
      totalAnswered: z.number().int().min(0).max(100000),
      uniqueAnswered: z.number().int().min(0).max(100000),
      accuracy: z.number().min(0).max(1),
      weakCategories: z.array(z.string().max(60)).max(10),
    })
    .optional(),
  character: z.enum(["momo", "haru", "zan"]).optional(),
  characterEnabled: z.boolean().optional(),
  responseLength: z.enum(["short", "medium", "long"]).optional(),
  // tier is accepted from client but ignored server-side during beta —
  // all users receive the same limits regardless of what they send.
  tier: z.enum(["free", "premium"]).default("free"),
});

export async function POST(req: Request) {
  let payload: z.infer<typeof BodySchema>;
  try {
    payload = BodySchema.parse(await req.json());
  } catch {
    return NextResponse.json(
      { error: "invalid_request", message: "リクエストの形式が正しくありません。" },
      { status: 400 },
    );
  }

  const ip = getClientIp(req);
  const feedbackSubmitted = readFeedbackFlag(req);
  const rl = await checkRateLimit({ ip, feedbackSubmitted });
  if (!rl.ok) {
    const message =
      rl.reason === "daily"
        ? feedbackSubmitted
          ? "本日の利用上限に達しました。JST 0:00 にリセットされます。"
          : "AI コパイロットの初回無料枠（10 回）を使い切りました。フィードバックをご投稿いただくと、これ以降ほぼ無制限でご利用いただけます。"
        : "少し速いようです。1分ほど待ってから再度お試しください。";
    return NextResponse.json(
      { error: "rate_limited", message, reason: rl.reason, resetAt: rl.resetAt },
      { status: 429, headers: { "X-Error-Type": "rate_limited" } },
    );
  }

  const ipRl = await checkIpRateLimit(req, "copilot");
  if (!ipRl.ok) {
    return NextResponse.json(
      { error: "rate_limited", message: "リクエストが集中しています。しばらく待ってから再試行してください。", reason: ipRl.reason, resetAt: ipRl.resetAt },
      { status: 429, headers: { "X-Error-Type": "rate_limited" } },
    );
  }

  const quickAction = payload.quickAction as QuickActionId | undefined;

  const rag = await runCopilotRAGPipeline({
    question: payload.question,
    messages: payload.messages,
    quickAction,
  });

  const { system, userMessages } = assembleCopilotPrompt({
    question: payload.question,
    messages: payload.messages,
    selectedChoice: payload.selectedChoice,
    isCorrect: payload.isCorrect,
    quickAction,
    learnerProfile: payload.learnerProfile as LearnerProfile | undefined,
    character: payload.character,
    characterEnabled: payload.characterEnabled,
    responseLength: payload.responseLength as ResponseLength | undefined,
    ragDirective: rag.ragDirective,
    ragContextBlock: rag.ragContextBlock,
  });

  let provider: LLMProvider;
  try {
    provider = await getProvider();
  } catch {
    return NextResponse.json(
      {
        error: "provider_unavailable",
        message: "AIサービスが一時的に利用できません。しばらく待ってから再試行してください。",
      },
      { status: 503, headers: { "X-Error-Type": "server_error" } },
    );
  }

  // CLAUDE.md §0 hard cap: stop new real AI requests once the monthly spend
  // reaches ¥50,000 (mock/dev path is free and never blocked).
  if (provider.name !== "mock") {
    const cap = await checkMonthlyCostCap();
    if (!cap.allowed) {
      return NextResponse.json(
        {
          error: "cost_capped",
          message:
            "AI 機能は今月の利用上限に達したため一時的にメンテナンス中です。翌月初に再開します。",
        },
        { status: 503, headers: { "X-Error-Type": "cost_capped" } },
      );
    }
  }

  const model = resolveModel("free");

  // Hard ceiling per length, aligned with the 300字 / 600字 caps in prompts.ts
  // (1 Japanese char ≒ 1.5–2 Gemini tokens). The budget is a backstop: it must
  // be tight enough that a "5行" answer can't physically sprawl to 10+ lines
  // (即修正⑤), but with enough headroom not to truncate a legitimate answer.
  const maxTokens =
    payload.responseLength === "short"
      ? 180
      : payload.responseLength === "medium"
        ? 440
        : 900;

  const isRealProvider = provider.name !== "mock";
  const inputChars = system.length + userMessages.reduce((n, m) => n + m.content.length, 0);

  const stream = createCopilotResponseStream({
    provider,
    system,
    userMessages,
    model,
    maxTokens,
    clientSignal: req.signal,
    citationFooter: rag.citationFooter,
    hasGrounding: rag.hasGrounding,
    timeoutMs: STREAM_TIMEOUT_MS,
    onComplete: isRealProvider
      ? // await して返す。ストリームは計上完了まで close されない（fire-and-forget
        // だとレスポンス完了で関数が凍結され、KV 書き込みが失われうる）。
        (outputChars) =>
          recordAiCost({
            tier: tierForModel(model),
            inputTokens: estimateTokens(inputChars),
            outputTokens: estimateTokens(outputChars),
            label: "copilot",
          })
      : undefined,
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-store, no-cache, must-revalidate",
      "X-RateLimit-Limit": String(rl.limit),
      "X-RateLimit-Remaining": String(rl.remaining),
      "X-RateLimit-Reset": String(rl.resetAt),
      "X-Provider": provider.name,
      "X-Timeout-Ms": String(STREAM_TIMEOUT_MS),
      "X-RAG-Enabled": ragEnabled() ? "1" : "0",
      "X-RAG-Passages": String(rag.ragResult.passages.length),
      "X-RAG-Top-Score": rag.ragResult.topScore.toFixed(3),
      "X-RAG-Grounded": rag.hasGrounding ? "1" : "0",
      "X-RAG-Reranker": rag.ragResult.rerankerUsed,
      ...(rag.citationsHeader ? { "X-RAG-Citations": rag.citationsHeader } : {}),
      ...(rag.relatedHeader ? { "X-Related-Questions": rag.relatedHeader } : {}),
    },
  });
}
