// NextAuth.js v5 Route Handler
//
// AUTH_SECRET 未設定だと NextAuth は内部的に 500 を返す。
// /api/auth/session は未ログイン時の空セッション probe として広く呼ばれるため、
// 設定不備でも 200 で空セッション JSON を返してフロントの初期化を破綻させない。
//
// それ以外の auth エンドポイント（/api/auth/signin など）は本来の挙動を保つ。

import type { NextRequest } from "next/server";
import { handlers } from "@/lib/auth";

export const runtime = "nodejs";

const { GET: rawGet, POST: rawPost } = handlers;

function isSessionProbe(url: string): boolean {
  try {
    return new URL(url).pathname.endsWith("/api/auth/session");
  } catch {
    return false;
  }
}

export async function GET(req: NextRequest): Promise<Response> {
  if (!process.env.AUTH_SECRET && isSessionProbe(req.url)) {
    return Response.json({}, { status: 200 });
  }
  return rawGet(req);
}

export const POST = rawPost;
