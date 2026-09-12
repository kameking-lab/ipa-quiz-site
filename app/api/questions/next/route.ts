import { hasUnrenderableContent } from "@/lib/questions/content-quality";
import { NextResponse } from "next/server";
import { findQuestionById } from "@/lib/questions/pool-server";
import { shuffleChoices } from "@/lib/questions/filter";

export const runtime = "nodejs";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const id = url.searchParams.get("id");
  if (!id) {
    return NextResponse.json({ error: "missing id" }, { status: 400 });
  }
  const question = await findQuestionById(id);
  if (!question) {
    return NextResponse.json({ error: "not found" }, { status: 404 });
  }
  if (question.needsReview || hasUnrenderableContent(question)) {
    return NextResponse.json({ error: "content_under_review", message: "原典との照合中のため、この問題の演習・採点は停止しています。" }, { status: 409, headers: { "Cache-Control": "no-store" } });
  }
  const shuffle = url.searchParams.get("shuffle") === "1";
  const payload = shuffle ? shuffleChoices(question) : question;
  return NextResponse.json(payload, {
    headers: {
      // Questions are immutable content; let the edge cache hold them.
      "Cache-Control": shuffle
        ? "private, no-store"
        : "public, s-maxage=86400, stale-while-revalidate=604800",
    },
  });
}
