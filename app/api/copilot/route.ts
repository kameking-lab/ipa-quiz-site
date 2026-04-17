import { NextResponse } from "next/server";
import { z } from "zod";
import { getProvider, resolveModel } from "@/lib/ai/provider";
import type { LLMProvider } from "@/lib/ai/provider";
import { COPILOT_SYSTEM_PROMPT, buildQuestionContext, QUICK_ACTIONS } from "@/lib/ai/prompts";
import type { QuickActionId } from "@/lib/ai/prompts";
import { checkRateLimit, getClientIp } from "@/lib/rate-limit/server";
import type { Question } from "@/lib/questions/types";

export const runtime = "nodejs";

const BodySchema = z.object({
  question: z.custom<Question>((v) => typeof v === "object" && v !== null),
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
  tier: z.enum(["free", "premium"]).default("free"),
});

export async function POST(req: Request) {
  let payload: z.infer<typeof BodySchema>;
  try {
    payload = BodySchema.parse(await req.json());
  } catch (err) {
    return NextResponse.json(
      { error: "Invalid request body", detail: String(err) },
      { status: 400 },
    );
  }

  const ip = getClientIp(req);
  const rl = checkRateLimit({ ip, tier: payload.tier });
  if (!rl.ok) {
    const message =
      rl.reason === "daily"
        ? "本日の無料枠（30回）を使い切りました。プレミアムにアップグレードするとたっぷり使えます（1分10回・1日上限なし）。"
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

  const system = `${COPILOT_SYSTEM_PROMPT}\n\n---\n${questionContext}`;

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
  const model = resolveModel(payload.tier);

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
        controller.enqueue(
          encoder.encode(
            `\n\n[エラー] AI応答の取得に失敗しました: ${err instanceof Error ? err.message : String(err)}`,
          ),
        );
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "X-RateLimit-Limit": String(rl.limit),
      "X-RateLimit-Remaining": String(rl.remaining),
      "X-RateLimit-Reset": String(rl.resetAt),
      "X-Provider": provider.name,
    },
  });
}
