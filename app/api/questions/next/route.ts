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
