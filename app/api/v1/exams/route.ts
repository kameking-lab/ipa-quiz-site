import { NextResponse } from "next/server";

import { getQuestionCountsByExam, getQuestionsForExam, getRegisteredExamCodes } from "@/lib/questions/get-questions";
import { buildRateLimitHeaders, checkApiRateLimit } from "@/lib/api/rate-limit";
import { isPracticeReadyQuestion } from "@/lib/questions/filter";
import { examLabel } from "@/lib/utils";

export const runtime = "nodejs";

export async function GET(req: Request) {
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

  const [counts, zenshoEnglish] = await Promise.all([getQuestionCountsByExam(), getQuestionsForExam("zensho-english")]);
  counts["zensho-english"] = zenshoEnglish.filter(isPracticeReadyQuestion).length;
  const exams = getRegisteredExamCodes()
    .map((code) => ({
      code,
      label: examLabel(code),
      questionCount: counts[code] ?? 0,
    }))
    .sort((a, b) => b.questionCount - a.questionCount);

  return NextResponse.json(
    { exams },
    {
      headers: {
        ...buildRateLimitHeaders(rl),
        "Cache-Control": "public, max-age=300, stale-while-revalidate=900",
      },
    },
  );
}
