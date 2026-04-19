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

export function middleware(req: NextRequest) {
  const user = process.env.ADMIN_BASIC_USER;
  const pass = process.env.ADMIN_BASIC_PASS;

  if (!user || !pass) {
    return new NextResponse(
      "Admin auth is not configured. Set ADMIN_BASIC_USER and ADMIN_BASIC_PASS env vars.",
      { status: 503 },
    );
  }

  const auth = req.headers.get("authorization");
  if (!auth || !auth.toLowerCase().startsWith("basic ")) return unauthorized();

  try {
    const decoded = atob(auth.slice(6).trim());
    const sepIdx = decoded.indexOf(":");
    if (sepIdx < 0) return unauthorized();
    const reqUser = decoded.slice(0, sepIdx);
    const reqPass = decoded.slice(sepIdx + 1);
    if (timingSafeEqual(reqUser, user) && timingSafeEqual(reqPass, pass)) {
      return NextResponse.next();
    }
  } catch {
    return unauthorized();
  }

  return unauthorized();
}

export const config = {
  matcher: ["/admin/stats/:path*"],
};
