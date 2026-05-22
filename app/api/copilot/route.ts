import { NextResponse } from "next/server";
import { z } from "zod";
import { getProvider, resolveModel } from "@/lib/ai/provider";
import type { LLMProvider } from "@/lib/ai/provider";
import {
  COPILOT_SYSTEM_PROMPT,
  buildQuestionContext,
  buildLearnerProfileContext,
  buildResponseLengthDirective,
  buildRAGDirective,
  QUICK_ACTIONS,
} from "@/lib/ai/prompts";
import type { QuickActionId, LearnerProfile, ResponseLength } from "@/lib/ai/prompts";
import { CHARACTERS, isCharacterId } from "@/lib/ai/characters";
import { checkRateLimit, getClientIp, readFeedbackFlag } from "@/lib/rate-limit/server";
import { checkIpRateLimit } from "@/lib/rate-limit";
import type { Question } from "@/lib/questions/types";
import { captureException } from "@/lib/monitoring/sentry";
import { ragEnabled, ragMinScore, runRAG } from "@/lib/copilot/rag";
import {
  buildCitationFooter,
  buildRAGContextBlock,
} from "@/lib/copilot/citations";
import type { RAGResult } from "@/lib/copilot/types";
import {
  buildCitationMetas,
  encodeCitationsHeader,
} from "@/lib/copilot/citation-meta";
import {
  encodeRelatedHeader,
  findRelatedQuestions,
} from "@/lib/copilot/related";

export const runtime = "nodejs";

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
  const quickPrompt =
    quickAction && QUICK_ACTIONS[quickAction]
      ? QUICK_ACTIONS[quickAction].prompt(payload.question)
      : null;

  const questionContext = buildQuestionContext(
    payload.question,
    payload.selectedChoice,
    payload.isCorrect,
  );

  const profileContext = payload.learnerProfile
    ? buildLearnerProfileContext(payload.learnerProfile satisfies LearnerProfile)
    : null;

  const characterPrompt =
    payload.characterEnabled && payload.character && isCharacterId(payload.character)
      ? CHARACTERS[payload.character].systemPrompt
      : null;

  const responseLengthDirective = payload.responseLength
    ? buildResponseLengthDirective(payload.responseLength satisfies ResponseLength)
    : null;

  // RAG 取得（COPILOT_RAG_ENABLED=false で完全 bypass）。
  const lastUserMsg =
    [...payload.messages].reverse().find((m) => m.role === "user")?.content ?? "";
  let ragResult: RAGResult = { passages: [], topScore: 0, rerankerUsed: "none" };
  let ragDirective: string | null = null;
  let ragContextBlock = "";
  let citationFooter = "";
  let hasGrounding = false;

  let citationsHeader = "";
  let relatedHeader = "";

  if (ragEnabled() && lastUserMsg) {
    try {
      ragResult = await runRAG({
        userMessage: lastUserMsg,
        question: payload.question,
        quickAction,
      });
      const passesThreshold = ragResult.topScore >= ragMinScore();
      if (ragResult.passages.length > 0 && passesThreshold) {
        hasGrounding = true;
        ragDirective = buildRAGDirective(ragResult.passages.length);
        ragContextBlock = buildRAGContextBlock(ragResult.passages);
        citationFooter = buildCitationFooter(ragResult.passages);

        // 構造化 citation メタを HTTP ヘッダで返す。
        // クライアントは X-RAG-Citations を読んでリッチカード UI を描画する。
        const citationMetas = buildCitationMetas(ragResult.passages);
        citationsHeader = encodeCitationsHeader(citationMetas);

        // 関連問題サジェスト（citation に採用済みの doc は除外）。
        try {
          const excluded = new Set(ragResult.passages.map((p) => p.doc.id));
          const related = findRelatedQuestions({
            userMessage: lastUserMsg,
            currentQuestionId: payload.question.id,
            currentExam: payload.question.exam,
            currentCategory: payload.question.category,
            currentTopicTags: payload.question.topicTags,
            excludeDocIds: excluded,
            limit: 4,
          });
          relatedHeader = encodeRelatedHeader(related);
        } catch (relErr) {
          // related が失敗しても citation 自体は出す（fail-open）。
          await captureException(relErr, {
            route: "/api/copilot",
            extra: { phase: "related" },
          });
        }
      }
    } catch (err) {
      // RAG が落ちても既存挙動は維持する（fail-open）。
      await captureException(err, {
        route: "/api/copilot",
        extra: { phase: "rag" },
      });
    }
  }

  const system = [
    COPILOT_SYSTEM_PROMPT,
    ...(characterPrompt ? [characterPrompt] : []),
    ...(responseLengthDirective ? [responseLengthDirective] : []),
    ...(ragDirective ? [ragDirective] : []),
    "---",
    questionContext,
    ...(profileContext ? ["---", profileContext] : []),
    ...(ragContextBlock ? ["---", ragContextBlock] : []),
  ].join("\n\n");

  const userMessages = [...payload.messages];
  if (quickPrompt) {
    const last = userMessages[userMessages.length - 1];
    if (last.role === "user") {
      userMessages[userMessages.length - 1] = {
        role: "user",
        content: `${quickPrompt}\n\n${last.content}`.trim(),
      };
    }
  }

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

  const model = resolveModel("free");

  // Aligned with the 200-400字 / 400-600字 character targets in prompts.ts.
  // 1 Japanese char ≒ 1.5–2 Gemini tokens, so the budgets below give the model
  // headroom without encouraging it to overshoot the structural target.
  const maxTokens =
    payload.responseLength === "short"
      ? 180
      : payload.responseLength === "medium"
        ? 520
        : 900;

  // Cap upstream latency. If Gemini stalls we abort the underlying stream
  // rather than holding the HTTP connection open forever.
  const TIMEOUT_MS = 35_000;
  const upstreamAbort = new AbortController();
  const timeoutHandle = setTimeout(() => upstreamAbort.abort(), TIMEOUT_MS);

  // Forward client disconnects to the provider so cancelled tabs don't keep
  // burning tokens on the server side.
  const clientSignal = req.signal;
  const onClientAbort = () => upstreamAbort.abort();
  if (clientSignal) {
    if (clientSignal.aborted) upstreamAbort.abort();
    else clientSignal.addEventListener("abort", onClientAbort, { once: true });
  }

  const encoder = new TextEncoder();
  let producedAnyChunk = false;
  const stream = new ReadableStream({
    async start(controller) {
      try {
        for await (const chunk of provider.streamChat({
          system,
          messages: userMessages,
          model,
          maxTokens,
          temperature: 0.7,
          signal: upstreamAbort.signal,
        })) {
          producedAnyChunk = true;
          controller.enqueue(encoder.encode(chunk));
        }
        // RAG 出典が確定している場合、末尾に出典フッターを付与する。
        // モデル本文に [N] inline 引用が無い場合でも、検索された出典 URL を
        // 返すことで「もっともらしい嘘の出典」を握り潰す。
        if (hasGrounding && citationFooter) {
          controller.enqueue(encoder.encode(citationFooter));
        }
        controller.close();
      } catch (err) {
        const aborted =
          (err as { name?: string } | null)?.name === "AbortError" ||
          upstreamAbort.signal.aborted;
        const timedOut = aborted && !clientSignal?.aborted;

        // Client disconnect: nothing to write back, just close.
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
      }
    },
    cancel() {
      // Reader (i.e. the HTTP client) cancelled. Stop the upstream too.
      upstreamAbort.abort();
      clearTimeout(timeoutHandle);
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-store, no-cache, must-revalidate",
      "X-RateLimit-Limit": String(rl.limit),
      "X-RateLimit-Remaining": String(rl.remaining),
      "X-RateLimit-Reset": String(rl.resetAt),
      "X-Provider": provider.name,
      "X-Timeout-Ms": String(TIMEOUT_MS),
      "X-RAG-Enabled": ragEnabled() ? "1" : "0",
      "X-RAG-Passages": String(ragResult.passages.length),
      "X-RAG-Top-Score": ragResult.topScore.toFixed(3),
      "X-RAG-Grounded": hasGrounding ? "1" : "0",
      "X-RAG-Reranker": ragResult.rerankerUsed,
      ...(citationsHeader ? { "X-RAG-Citations": citationsHeader } : {}),
      ...(relatedHeader ? { "X-Related-Questions": relatedHeader } : {}),
    },
  });
}
