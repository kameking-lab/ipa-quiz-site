import { NextResponse } from "next/server";
import { z } from "zod";

import { findQuestionById } from "@/lib/questions/pool-server";
import { getSafePdfUrl } from "@/lib/exam-config";
import { buildRateLimitHeaders, checkApiRateLimit } from "@/lib/api/rate-limit";

export const runtime = "nodejs";

const BodySchema = z.object({
  questionId: z.string().min(1).max(120),
  answer: z.union([z.string().min(1).max(120), z.array(z.string().min(1).max(20)).min(1).max(10)]),
});

export async function POST(req: Request) {
  const rl = await checkApiRateLimit(req);
  if (!rl.ok) {
    return NextResponse.json(
      {
        error: "rate_limited",
        message:
          rl.reason === "minute"
            ? "1 分あたりのリクエスト上限に達しました。"
            : "1 日あたりのリクエスト上限に達しました。",
        resetAt: rl.resetAt,
      },
      { status: 429, headers: buildRateLimitHeaders(rl) },
    );
  }

  let parsed: z.infer<typeof BodySchema>;
  try {
    parsed = BodySchema.parse(await req.json());
  } catch {
    return NextResponse.json(
      {
        error: "invalid_request",
        message: "リクエストボディは {questionId, answer} の JSON で送信してください。",
      },
      { status: 400, headers: buildRateLimitHeaders(rl) },
    );
  }

  const q = await findQuestionById(parsed.questionId);
  if (!q) {
    return NextResponse.json(
      { error: "not_found", message: "対象の問題が見つかりません。" },
      { status: 404, headers: buildRateLimitHeaders(rl) },
    );
  }

  if (q.type !== "multiple-choice") {
    return NextResponse.json(
      {
        error: "unsupported",
        message:
          "現在 Public API では多肢選択問題（multiple-choice）のみ採点可能です。記述・論述問題は将来対応予定です。",
      },
      { status: 400, headers: buildRateLimitHeaders(rl) },
    );
  }

  const correctAnswer = q.answer;
  const correct = compareAnswer(parsed.answer, correctAnswer);

  return NextResponse.json(
    {
      correct,
      correctAnswer,
      explanation: q.explanation,
      sourcePdfUrl: getSafePdfUrl(q.sourcePdfUrl),
    },
    { headers: buildRateLimitHeaders(rl) },
  );
}

function compareAnswer(submitted: string | string[], correct: string | string[]): boolean {
  const sub = Array.isArray(submitted)
    ? [...submitted].map((s) => s.trim()).sort()
    : [submitted.trim()];
  const cor = Array.isArray(correct) ? [...correct].map((s) => s.trim()).sort() : [correct.trim()];
  if (sub.length !== cor.length) return false;
  return sub.every((s, i) => s === cor[i]);
}
