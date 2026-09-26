import { NextResponse } from "next/server";
import { z } from "zod";
import { searchQuestions } from "@/lib/search/question-index";
import type { ExamCode, Season, Session, Difficulty } from "@/lib/questions/types";

export const runtime = "nodejs";

const EXAM_CODES = [
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
  "fp2", "fp3", "takken",
] as const;

const SEASONS = ["spring", "autumn", "cbt", "published", "first", "second", "early", "may", "september", "january", "october", "late"] as const;
const SESSIONS = [
  "am",
  "am1",
  "am2",
  "pm",
  "pm1",
  "pm2",
  "kamoku-a",
  "kamoku-b",
  "gakka",
  "riron",
] as const;

const QuerySchema = z.object({
  q: z.string().trim().max(120).optional(),
  exam: z.enum(EXAM_CODES).optional(),
  year: z.coerce.number().int().min(1990).max(2100).optional(),
  season: z.enum(SEASONS).optional(),
  session: z.enum(SESSIONS).optional(),
  category: z.string().max(80).optional(),
  topicTag: z.string().max(80).optional(),
  difficulty: z.coerce.number().int().min(1).max(5).optional(),
  hasImage: z
    .union([z.literal("true"), z.literal("false"), z.boolean()])
    .transform((v) => v === true || v === "true")
    .optional(),
  calculationOnly: z
    .union([z.literal("true"), z.literal("false"), z.boolean()])
    .transform((v) => v === true || v === "true")
    .optional(),
  // Public /search URLs use the compact `calc=1` form. Keep the longer API
  // parameter too for backwards compatibility with direct consumers.
  calc: z.enum(["0", "1"]).transform((value) => value === "1").optional(),
  sort: z.enum(["relevance", "year_desc", "category", "random"]).optional(),
  limit: z.coerce.number().int().min(1).max(60).optional(),
  offset: z.coerce.number().int().min(0).max(5000).optional(),
});

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const raw: Record<string, string> = {};
  for (const [k, v] of searchParams.entries()) raw[k] = v;

  const parsed = QuerySchema.safeParse(raw);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "invalid query", issues: parsed.error.flatten() },
      { status: 400 },
    );
  }

  const data = parsed.data;

  const result = await searchQuestions({
    q: data.q,
    exam: data.exam as ExamCode | undefined,
    year: data.year,
    season: data.season as Season | undefined,
    session: data.session as Session | undefined,
    category: data.category,
    topicTag: data.topicTag,
    difficulty: data.difficulty as Difficulty | undefined,
    hasImage: data.hasImage,
    calculationOnly: data.calculationOnly ?? data.calc,
    sort: data.sort,
    limit: data.limit,
    offset: data.offset,
  });

  const cacheHeader =
    data.sort === "random"
      ? "no-store"
      : "public, max-age=60, s-maxage=300";

  return NextResponse.json(result, {
    headers: { "Cache-Control": cacheHeader },
  });
}
