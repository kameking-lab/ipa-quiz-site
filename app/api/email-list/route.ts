import { NextResponse } from "next/server";

export const runtime = "nodejs";

function retired() {
  return NextResponse.json({ error: "週1メールの登録受付は終了しました。お問い合わせは /contact をご利用ください。", contact: "/contact" }, {
    status: 410, headers: { "Cache-Control": "no-store", "X-Robots-Tag": "noindex" },
  });
}

export const GET = retired;
export const POST = retired;
