import { strictContentGateEnabled } from "@/lib/billing/content-policy";
import { NextResponse } from "next/server";
import { requestsNewQuestion, ORIGINAL_QUESTION_ONLY_MESSAGE } from "@/lib/copilot/original-question-request";
import { z } from "zod";
import { getProvider } from "@/lib/ai/provider";
import type { LLMProvider } from "@/lib/ai/provider";
import type { QuickActionId, LearnerProfile, ResponseLength } from "@/lib/ai/prompts";
import { checkAiNormalUse } from "@/lib/ai/normal-use-server";
import type { Question } from "@/lib/questions/types";
import { isCompleteSelectionCorrect, requiredSelectionCount } from "@/lib/questions/answers";
import { ragEnabled } from "@/lib/copilot/rag";
import { runCopilotRAGPipeline } from "@/lib/copilot/rag-pipeline";
import { getCopilotSource, warmCopilotIndexSoon, type CopilotSource } from "@/lib/copilot/source";
import { captureException } from "@/lib/monitoring/sentry";
import { assembleCopilotPrompt } from "@/lib/copilot/prompt-assembly";
import { createCopilotResponseStream } from "@/lib/copilot/streaming";
import { createCopilotGeminiProvider } from "@/lib/copilot/gemini-flash38";
import { checkMonthlyCostCap, recordAiCost, estimateTokens, textBudget } from "@/lib/ai/cost-guard";
import { tierForModel } from "@/lib/ai/cost-tracker";
import { COPILOT_MODEL } from "@/lib/copilot/model";
import { prepareAiUsage, consumeAiUsage, withAiUsageResponse, type AiUsageContext } from "@/lib/ai/usage-server";

export const runtime = "nodejs";

const STREAM_TIMEOUT_MS = 35_000;

const BodySchema = z.object({
  question: z.object({ id: z.string().min(1).max(120) }),
  messages: z
    .array(
      z.object({
        role: z.enum(["user", "assistant"]),
        content: z.string().min(1).max(4000),
      }),
    )
    .min(1).max(20),
  selectedChoice: z.string().max(40).optional(),
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
  responseLength: z.enum(["short", "medium", "long"]).optional(),
  // tier is accepted from client but ignored server-side during beta —
  // all users receive the same limits regardless of what they send.
  tier: z.enum(["free", "premium"]).default("free"),
});

export async function POST(req: Request) {
  return withAiUsageResponse(track => handlePost(req, track));
}

async function handlePost(req: Request, track: (context: AiUsageContext) => void) {
  const startedAt = Date.now();
  let payload: z.infer<typeof BodySchema>;
  try {
    payload = BodySchema.parse(await req.json());
  } catch {
    return NextResponse.json(
      { error: "invalid_request", message: "リクエストの形式が正しくありません。" },
      { status: 400 },
    );
  }

  // 問題文・選択肢・正答・標準解説はクライアント入力を信頼しない。
  // 本番はビルド時に書き出した問題ファイルから引く（全問題データを読み込まない）。
  let source: CopilotSource;
  let question: Question | undefined;
  try {
    source = await getCopilotSource();
    question = source.getQuestion(payload.question.id);
  } catch (err) {
    await captureException(err, { route: "/api/copilot", extra: { phase: "source" } });
    return NextResponse.json(
      { error: "copilot_data_unavailable", message: "AIサービスが一時的に利用できません。しばらく待ってから再試行してください。" },
      { status: 503, headers: { "X-Error-Type": "server_error" } },
    );
  }
  if (!question) {
    return NextResponse.json(
      { error: "unknown_question", message: "問題が見つかりません。ページを更新してください。" },
      { status: 400 },
    );
  }
  if(strictContentGateEnabled()){ if(req.headers.get("X-Kakomon-AI-Consent")!=="20261103")return NextResponse.json({error:"ai_consent_required"},{status:428});
    // 動的 import: content-grant は全問題データを読み込むため、ゲートが無効（既定）のときは読み込まない。
    const { contentGrant } = await import("@/lib/billing/content-grant");
    const grant=await contentGrant(req,question.id);if(!grant.ok)return grant;}
  const selectedKeys = payload.selectedChoice?.split("・") ?? [];
  const selectedChoice = selectedKeys.length > 0 &&
    selectedKeys.every((key) => question.choices?.[key as keyof typeof question.choices] !== undefined)
    ? payload.selectedChoice
    : undefined;
  const isCorrect = selectedChoice === undefined
    ? undefined
    : isCompleteSelectionCorrect(question.answer, selectedKeys, requiredSelectionCount(question));

  // Reject explicit creation requests before normal-use admission or provider work.
  if (requestsNewQuestion(payload.messages, payload.quickAction)) {
    return NextResponse.json(
      { error: "original_question_explanation_only", message: ORIGINAL_QUESTION_ONLY_MESSAGE },
      { status: 400, headers: { "Cache-Control": "no-store" } },
    );
  }

  // 冷えたサーバでは索引の読み込みを、下の利用枠・レート制限の確認（KV 往復）と重ねる。
  if (ragEnabled()) warmCopilotIndexSoon();

  const usage = await prepareAiUsage("copilot");
  track(usage);
  if (usage.response) return usage.response;

  const ipRl = await checkAiNormalUse(req, "copilot", usage, {
    requireKv: Boolean(process.env.GEMINI_API_KEY),
  });
  if (!ipRl.ok) {
    if (ipRl.reason === "unavailable") {
      return NextResponse.json(
        { error: "rate_limit_unavailable", message: "AIサービスは一時的に利用できません。少し待ってから再試行してください。" },
        { status: 503, headers: { ...usage.headers, "X-Error-Type": "server_error", "Retry-After": "60" } },
      );
    }
    return NextResponse.json(
      { error: "rate_limited", message: "リクエストが集中しています。しばらく待ってから再試行してください。", reason: ipRl.reason, scope: ipRl.scope, resetAt: ipRl.resetAt },
      { status: 429, headers: { ...usage.headers, "X-Error-Type": "rate_limited" } },
    );
  }

  const quickAction = payload.quickAction as QuickActionId | undefined;

  const ragStartedAt = Date.now();
  const rag = await runCopilotRAGPipeline({
    question,
    messages: payload.messages,
    quickAction,
    // The assembler below includes this same question's complete context before RAG.
    questionContextIncluded: true,
    source,
  });
  // 最初の文字までの内訳（利用枠・レート制限の確認 / 検索）。秒単位の遅れを切り分けるため。
  const serverTiming = `pre;dur=${ragStartedAt - startedAt}, rag;dur=${Date.now() - ragStartedAt}`;

  const { system, userMessages } = assembleCopilotPrompt({
    question,
    messages: payload.messages,
    selectedChoice,
    isCorrect,
    quickAction,
    learnerProfile: payload.learnerProfile as LearnerProfile | undefined,
    responseLength: payload.responseLength as ResponseLength | undefined,
    ragDirective: rag.ragDirective,
    ragContextBlock: rag.ragContextBlock,
  });

  let provider: LLMProvider;
  try {
    provider = process.env.GEMINI_API_KEY
      ? createCopilotGeminiProvider(process.env.GEMINI_API_KEY)
      : await getProvider("mock");
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
  const model = COPILOT_MODEL;

  // Gemini 3.8 Flash counts hidden thinking tokens within maxOutputTokens.
  // Keep the visible answer length in prompts.ts, with enough token headroom
  // for the model to finish rather than returning only thought tokens.
  const maxTokens =
    payload.responseLength === "short"
      ? 800
      : payload.responseLength === "medium"
        ? 1200
        : 1800;

  const budget = textBudget(tierForModel(model), system, userMessages, maxTokens);
  let reservation: Awaited<ReturnType<typeof checkMonthlyCostCap>>["reservation"];
  if (provider.name !== "mock") {
    const cap = await checkMonthlyCostCap(provider.name, budget);
    reservation = cap.reservation;
    if (!cap.allowed) {
    if (!usage.legacy) usage.headers["X-AI-RateLimit-Scope"] = "service-cost";
      return NextResponse.json(
        {
          error: cap.reason ?? "cost_capped",
          message: cap.reason === "budget_unavailable"
          ? "AI費用の状態を確認できないため、生成を一時停止しています。少し待ってから再試行してください。"
          : "サービス全体の今月のAI費用上限に達したため、生成を停止しています。翌月初に再開します。",
        },
        { status: 503, headers: { "X-Error-Type": cap.reason ?? "cost_capped" } },
      );
    }
  }

  const isRealProvider = provider.name !== "mock";

  const usageDenial = await consumeAiUsage(usage, provider.name);
  if (usageDenial) {
    if (reservation) await recordAiCost({ ...budget, inputTokens: 0, outputTokens: 0, reservation });
    return usageDenial;
  }

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
        async (outputChars, usage) => {
          console.info("[copilot] completed", {
            questionId: payload.question.id, model, serverTiming,
            finishReason: usage?.finishReason,
            promptTokens: usage?.promptTokens,
            outputTokens: usage?.outputTokens,
            thoughtsTokens: usage?.thoughtsTokens,
            totalTokens: usage?.totalTokens,
          });
          const costStatus = await recordAiCost({
            tier: tierForModel(model),
            inputTokens: usage?.promptTokens ?? budget.inputTokens,
            // Stream interruption may hide usageMetadata, including billable
            // thinking tokens. Reserve the whole generation budget in that case.
            outputTokens: usage?.totalTokens !== undefined && usage.promptTokens !== undefined
              ? Math.max(0, usage.totalTokens - usage.promptTokens)
              : usage?.outputTokens !== undefined && usage.thoughtsTokens !== undefined
                ? usage.outputTokens + usage.thoughtsTokens
                : Math.max(maxTokens, (usage?.outputTokens ?? 0) + (usage?.thoughtsTokens ?? 0), estimateTokens(outputChars)),
            label: "copilot",
            reservation,
          });
          console.info("[copilot] cost", {
            questionId: payload.question.id, model, status: costStatus,
          });
        }
      : undefined,
  });

  return new Response(stream, {
    headers: {
      ...usage.headers,
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-store, no-cache, must-revalidate",
      "X-Provider": provider.name,
      "X-Model": provider.name === "mock" ? "mock" : model,
      "X-Timeout-Ms": String(STREAM_TIMEOUT_MS),
      "Server-Timing": serverTiming,
      "X-RAG-Enabled": ragEnabled() ? "1" : "0",
      "X-RAG-Passages": String(rag.ragResult.passages.length),
      "X-RAG-Top-Score": rag.ragResult.topScore.toFixed(3),
      "X-RAG-Grounded": rag.hasGrounding ? "1" : "0",
      "X-RAG-Reranker": rag.ragResult.rerankerUsed,
      ...(rag.citationsHeader ? { "X-RAG-Citation-Candidates": rag.citationsHeader } : {}),
      ...(rag.relatedHeader ? { "X-Related-Questions": rag.relatedHeader } : {}),
    },
  });
}
