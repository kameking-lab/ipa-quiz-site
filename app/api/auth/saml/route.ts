import { NextResponse } from "next/server";

export const runtime = "nodejs";

const SAML_SSO_PHASE = "phase-1-planned" as const;
const SAML_INFO_URL = "/security#saml-sso";
const PILOT_URL = "/enterprise/pilot";

const STATUS_BODY = {
  status: "not-implemented",
  phase: SAML_SSO_PHASE,
  message:
    "SAML SSO は Phase 1 (2026 Q3) で実装予定です。Okta / Azure AD / Google Workspace への対応を計画しています。法人パイロット導入時は、別途 SAML 設定の事前準備（Metadata XML / IdP Initiated Login URL）について個別にご相談ください。",
  plannedProviders: ["Okta", "Azure AD (Microsoft Entra ID)", "Google Workspace"],
  plannedProtocols: ["SAML 2.0", "SCIM 2.0 (provisioning)"],
  contact: {
    securityPage: SAML_INFO_URL,
    enterprisePilot: PILOT_URL,
  },
} as const;

const NOT_IMPLEMENTED_HEADERS = {
  "content-type": "application/json; charset=utf-8",
  "cache-control": "no-store",
  "x-saml-status": SAML_SSO_PHASE,
} as const;

export async function GET() {
  return NextResponse.json(STATUS_BODY, {
    status: 501,
    headers: NOT_IMPLEMENTED_HEADERS,
  });
}

export async function POST() {
  return NextResponse.json(
    {
      ...STATUS_BODY,
      hint:
        "SAML AuthnResponse の受付エンドポイントは未実装です。Phase 1 リリース時にこのエンドポイントが ACS (Assertion Consumer Service) として有効化されます。",
    },
    {
      status: 501,
      headers: NOT_IMPLEMENTED_HEADERS,
    },
  );
}
