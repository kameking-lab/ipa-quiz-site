import { NextRequest, NextResponse } from "next/server";

const REALM = "IPA Quiz Admin";

function unauthorized(): NextResponse {
  return new NextResponse("Unauthorized", {
    status: 401,
    headers: { "WWW-Authenticate": `Basic realm="${REALM}"` },
  });
}

function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let result = 0;
  for (let i = 0; i < a.length; i += 1) {
    result |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return result === 0;
}

// Vercel 環境変数に貼り付けた際の末尾改行/空白を吸収する。
// atob は「バイナリ文字列」を返すため、UTF-8 を含むパスワードは TextDecoder で正しく復号する。
function decodeBasicCredentials(header: string): { user: string; pass: string } | null {
  const b64 = header.slice(6).trim();
  let bytes: Uint8Array;
  try {
    const bin = atob(b64);
    bytes = Uint8Array.from(bin, (c) => c.charCodeAt(0));
  } catch {
    return null;
  }
  const decoded = new TextDecoder("utf-8").decode(bytes);
  const sepIdx = decoded.indexOf(":");
  if (sepIdx < 0) return null;
  return { user: decoded.slice(0, sepIdx), pass: decoded.slice(sepIdx + 1) };
}

export function middleware(req: NextRequest) {
  const user = process.env.ADMIN_BASIC_USER?.trim();
  const pass = process.env.ADMIN_BASIC_PASS?.trim();

  if (!user || !pass) {
    return new NextResponse(
      "Admin auth is not configured. Set ADMIN_BASIC_USER and ADMIN_BASIC_PASS env vars in Vercel (Project → Settings → Environment Variables).",
      { status: 503 },
    );
  }

  const auth = req.headers.get("authorization");
  if (!auth || !auth.toLowerCase().startsWith("basic ")) return unauthorized();

  const creds = decodeBasicCredentials(auth);
  if (!creds) return unauthorized();

  if (timingSafeEqual(creds.user, user) && timingSafeEqual(creds.pass, pass)) {
    return NextResponse.next();
  }
  return unauthorized();
}

export const config = {
  matcher: ["/admin/:path*"],
};
