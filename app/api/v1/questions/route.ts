import { NextResponse } from "next/server";
import { z } from "zod";

import { getQuestionsForExam } from "@/lib/questions/get-questions";
import { buildRateLimitHeaders, checkApiRateLimit } from "@/lib/api/rate-limit";
import type { ExamCode, Question, Season } from "@/lib/questions/types";

export const runtime = "nodejs";

const ExamCodeSchema = z.enum([
  "ip",
  "sg",
  "fe",
  "ap",
  "st",
  "sa",
  "pm",
  "nw",
  "db",
  "es",
  "sc",
  "sm",
  "au",
]);

const QuerySchema = z.object({
  exam: ExamCodeSchema,
  year: z.coerce.number().int().min(1990).max(2100).optional(),
  season: z.enum(["spring", "autumn", "cbt"]).optional(),
  session: z.string().min(1).max(20).optional(),
  category: z.string().min(1).max(60).optional(),
  limit: z.coerce.number().int().min(1).max(100).default(20),
  offset: z.coerce.number().int().min(0).default(0),
});

export async function GET(req: Request) {
  const rl = checkApiRateLimit(req);
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

  const url = new URL(req.url);
  const parsed = QuerySchema.safeParse({
    exam: url.searchParams.get("exam"),
    year: url.searchParams.get("year") ?? undefined,
    season: url.searchParams.get("season") ?? undefined,
    session: url.searchParams.get("session") ?? undefined,
    category: url.searchParams.get("category") ?? undefined,
    limit: url.searchParams.get("limit") ?? undefined,
    offset: url.searchParams.get("offset") ?? undefined,
  });

  if (!parsed.success) {
    return NextResponse.json(
      {
        error: "invalid_request",
        message: "クエリパラメータが正しくありません。`exam` は必須です。",
      },
      { status: 400, headers: buildRateLimitHeaders(rl) },
    );
  }

  const { exam, year, season, session, category, limit, offset } = parsed.data;

  let pool: Question[] = await getQuestionsForExam(exam as ExamCode);
  if (typeof year === "number") pool = pool.filter((q) => q.year === year);
  if (season) pool = pool.filter((q) => q.season === (season as Season));
  if (session) pool = pool.filter((q) => q.session === session);
  if (category) pool = pool.filter((q) => q.category === category);

  const total = pool.length;
  const slice = pool.slice(offset, offset + limit).map(toPublic);

  return NextResponse.json(
    { questions: slice, total, limit, offset },
    {
      headers: {
        ...buildRateLimitHeaders(rl),
        "Cache-Control": "public, max-age=120, stale-while-revalidate=600",
      },
    },
  );
}

function toPublic(q: Question) {
  return {
    id: q.id,
    exam: q.exam,
    session: q.session,
    year: q.year,
    season: q.season,
    qNumber: q.qNumber,
    type: q.type,
    category: q.category,
    topicTags: q.topicTags,
    difficulty: q.difficulty,
    question: q.question,
    choices: q.choices,
    answer: q.answer,
    explanation: q.explanation,
    hasImage: q.hasImage,
    imageUrls: q.imageUrls,
    sourcePdfUrl: q.sourcePdfUrl,
    license: q.license,
  };
}
