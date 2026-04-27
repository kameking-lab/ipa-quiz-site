import { NextResponse } from "next/server";
import { z } from "zod";
import { getProvider, resolveModel } from "@/lib/ai/provider";
import type { LLMProvider } from "@/lib/ai/provider";
import {
  COPILOT_SYSTEM_PROMPT,
  buildQuestionContext,
  buildLearnerProfileContext,
  QUICK_ACTIONS,
} from "@/lib/ai/prompts";
import type { QuickActionId, LearnerProfile } from "@/lib/ai/prompts";
import { CHARACTERS, isCharacterId } from "@/lib/ai/characters";
import { checkRateLimit, getClientIp } from "@/lib/rate-limit/server";
import type { Question } from "@/lib/questions/types";
import { captureException } from "@/lib/monitoring/sentry";

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
  const rl = checkRateLimit({ ip });
  if (!rl.ok) {
    const message =
      rl.reason === "daily"
        ? "本日の利用上限に達しました。JST 0:00 にリセットされます。"
        : "少し速いようです。1分ほど待ってから再度お試しください。";
    return NextResponse.json(
      { error: "rate_limited", message, reason: rl.reason, resetAt: rl.resetAt },
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

  const system = [
    COPILOT_SYSTEM_PROMPT,
    ...(characterPrompt ? [characterPrompt] : []),
    "---",
    questionContext,
    ...(profileContext ? ["---", profileContext] : []),
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
  } catch (_err) {
    return NextResponse.json(
      {
        error: "provider_unavailable",
        message: "AIサービスが一時的に利用できません。しばらく待ってから再試行してください。",
      },
      { status: 503, headers: { "X-Error-Type": "server_error" } },
    );
  }

  // During beta all users get the free model — premium model is only
  // unlocked once Stripe payments are implemented (Phase 4).
  const model = resolveModel("free");

  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    async start(controller) {
      try {
        for await (const chunk of provider.streamChat({
          system,
          messages: userMessages,
          model,
          maxTokens: 800,
          temperature: 0.7,
        })) {
          controller.enqueue(encoder.encode(chunk));
        }
        controller.close();
      } catch (err) {
        await captureException(err, {
          route: "/api/copilot",
          extra: { provider: provider.name, model },
        });
        controller.enqueue(
          encoder.encode(
            "\n\n[エラー] AI応答の取得に失敗しました。少し時間を置いて再度お試しください。",
          ),
        );
        controller.close();
      }
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
    },
  });
}
