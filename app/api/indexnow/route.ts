import { NextResponse } from "next/server";
import { z } from "zod";

import { pingIndexNow, getIndexNowKey } from "@/lib/seo/indexnow";
import { SITE_BASE_URL } from "@/lib/seo/config";

export const runtime = "nodejs";

const schema = z.object({
  urls: z.array(z.string().url()).max(10000),
});

function isAuthorized(request: Request): boolean {
  const expected = process.env.INDEXNOW_ADMIN_TOKEN;
  if (!expected) return false;
  const got = request.headers.get("authorization");
  return got === `Bearer ${expected}`;
}

export async function POST(request: Request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }
  if (!getIndexNowKey()) {
    return NextResponse.json(
      { ok: false, error: "INDEXNOW_KEY not configured" },
      { status: 503 },
    );
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

  const sameOriginUrls = parsed.data.urls.filter((u) => u.startsWith(SITE_BASE_URL));
  if (sameOriginUrls.length === 0) {
    return NextResponse.json(
      { ok: false, error: "no same-origin URLs" },
      { status: 400 },
    );
  }

  const result = await pingIndexNow(sameOriginUrls);
  return NextResponse.json(result, { status: result.ok ? 200 : 502 });
}
