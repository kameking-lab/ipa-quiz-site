import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST() {
  return NextResponse.json(
    {
      error: "original_question_unavailable",
      message: "類題の自動生成は提供していません。出典を確認した過去問を問題検索からご利用ください。",
      href: "/search",
    },
    { status: 410 },
  );
}
