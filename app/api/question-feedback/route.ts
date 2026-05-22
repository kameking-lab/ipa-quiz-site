import { NextResponse } from "next/server";
import { z } from "zod";

import { checkRateLimit, getClientIp } from "@/lib/rate-limit/server";

export const runtime = "nodejs";

const schema = z.object({
  questionId: z.string().min(1).max(80),
  rating: z.enum(["helpful", "unclear", "report"]),
  comment: z.string().max(800).optional(),
});

export async function POST(request: Request) {
  const ip = getClientIp(request);

  const limit = await checkRateLimit({ ip, feedbackSubmitted: true });
  if (!limit.ok) {
    return NextResponse.json({ ok: false, error: "rate-limited" }, { status: 429 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid-json" }, { status: 400 });
  }

  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: "invalid-body" }, { status: 400 });
  }

  const payload = {
    ts: new Date().toISOString(),
    questionId: parsed.data.questionId,
    rating: parsed.data.rating,
    hasComment: Boolean(parsed.data.comment),
    commentLen: parsed.data.comment?.length ?? 0,
  };

  console.log("[question-feedback]", JSON.stringify(payload));

  return NextResponse.json({ ok: true });
}
