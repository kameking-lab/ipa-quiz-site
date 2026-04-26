import { NextResponse } from "next/server";

export const runtime = "nodejs";

function notImplemented() {
  return NextResponse.json(
    {
      schemas: ["urn:ietf:params:scim:api:messages:2.0:Error"],
      status: "501",
      detail:
        "SCIM /Users endpoint is planned for Phase 1 (2026 Q3). This stub returns the OpenAPI shape only.",
      documentation: "/enterprise/sso",
    },
    {
      status: 501,
      headers: {
        "content-type": "application/scim+json; charset=utf-8",
        "cache-control": "no-store",
      },
    },
  );
}

export async function GET() {
  return notImplemented();
}

export async function POST() {
  return notImplemented();
}

export async function PUT() {
  return notImplemented();
}

export async function PATCH() {
  return notImplemented();
}

export async function DELETE() {
  return notImplemented();
}
