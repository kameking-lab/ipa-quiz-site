import { NextResponse } from "next/server";

export const runtime = "nodejs";

const SCIM_PHASE = "phase-1-planned" as const;

const SERVICE_PROVIDER_CONFIG = {
  schemas: ["urn:ietf:params:scim:schemas:core:2.0:ServiceProviderConfig"],
  documentationUri: "/enterprise/sso",
  patch: { supported: false },
  bulk: { supported: false, maxOperations: 0, maxPayloadSize: 0 },
  filter: { supported: false, maxResults: 0 },
  changePassword: { supported: false },
  sort: { supported: false },
  etag: { supported: false },
  authenticationSchemes: [
    {
      name: "OAuth Bearer Token",
      description: "Bearer token に対応予定（Phase 1）",
      specUri: "https://datatracker.ietf.org/doc/html/rfc6750",
      type: "oauthbearertoken",
      primary: true,
    },
  ],
  meta: {
    location: "/api/scim/v2/ServiceProviderConfig",
    resourceType: "ServiceProviderConfig",
  },
  status: SCIM_PHASE,
  message:
    "SCIM 2.0 自動プロビジョニングは Phase 1 (2026 Q3) で実装予定です。本エンドポイントは OpenAPI 仕様の事前公開・連携テスト用スタブです。実際の Users / Groups エンドポイントは未実装です。",
} as const;

export async function GET() {
  return NextResponse.json(SERVICE_PROVIDER_CONFIG, {
    status: 200,
    headers: {
      "content-type": "application/scim+json; charset=utf-8",
      "cache-control": "public, max-age=300",
      "x-scim-status": SCIM_PHASE,
    },
  });
}

export async function POST() {
  return NextResponse.json(
    {
      schemas: ["urn:ietf:params:scim:api:messages:2.0:Error"],
      status: "501",
      detail:
        "SCIM Users/Groups endpoints are not yet active. Provisioning will be enabled in Phase 1 (2026 Q3).",
      documentation: "/enterprise/sso",
    },
    {
      status: 501,
      headers: {
        "content-type": "application/scim+json; charset=utf-8",
        "cache-control": "no-store",
        "x-scim-status": SCIM_PHASE,
      },
    },
  );
}
