import { NextResponse } from "next/server";
import { buildOpenApiSpec } from "@/lib/api/openapi";

export const runtime = "nodejs";

export async function GET(req: Request) {
  const { origin } = new URL(req.url);
  const spec = buildOpenApiSpec(origin);
  return NextResponse.json(spec, {
    headers: {
      "Cache-Control": "public, max-age=300, stale-while-revalidate=600",
    },
  });
}
