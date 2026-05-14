// Google Search Console (Search Analytics) client.
//
// Uses a service-account JSON-Web-Token + OAuth2 token exchange against Google,
// then hits the searchanalytics:query endpoint. No new npm dependency — JWT is
// signed via the Node 20+ `crypto` module that ships with the runtime.
//
// Required env vars (set on Vercel / locally in .env.local):
//   GSC_SITE_URL                — property URL (e.g. https://www.kakomon-ai.jp/) or sc-domain:kakomon-ai.jp
//   GSC_SERVICE_ACCOUNT_EMAIL   — client_email from service-account JSON
//   GSC_SERVICE_ACCOUNT_KEY     — private_key (PEM, with literal \n or real newlines)
//
// If any of the three is missing, every exported function returns null and the
// /stats page falls back to a "連携準備中" state.

import crypto from "node:crypto";

const TOKEN_URL = "https://oauth2.googleapis.com/token";
const SCOPE = "https://www.googleapis.com/auth/webmasters.readonly";

export interface GscConfig {
  siteUrl: string;
  clientEmail: string;
  privateKey: string;
}

export function readGscConfig(): GscConfig | null {
  const siteUrl = process.env.GSC_SITE_URL;
  const clientEmail = process.env.GSC_SERVICE_ACCOUNT_EMAIL;
  const rawKey = process.env.GSC_SERVICE_ACCOUNT_KEY;
  if (!siteUrl || !clientEmail || !rawKey) return null;
  const privateKey = rawKey.includes("\\n") ? rawKey.replace(/\\n/g, "\n") : rawKey;
  return { siteUrl, clientEmail, privateKey };
}

export function isGscConfigured(): boolean {
  return readGscConfig() !== null;
}

function base64UrlEncode(buf: Buffer | string): string {
  const b = typeof buf === "string" ? Buffer.from(buf) : buf;
  return b.toString("base64").replace(/=+$/, "").replace(/\+/g, "-").replace(/\//g, "_");
}

function signJwt(cfg: GscConfig): string {
  const header = { alg: "RS256", typ: "JWT" };
  const now = Math.floor(Date.now() / 1000);
  const payload = {
    iss: cfg.clientEmail,
    scope: SCOPE,
    aud: TOKEN_URL,
    iat: now,
    exp: now + 3600,
  };
  const headerEnc = base64UrlEncode(JSON.stringify(header));
  const payloadEnc = base64UrlEncode(JSON.stringify(payload));
  const signingInput = `${headerEnc}.${payloadEnc}`;
  const signer = crypto.createSign("RSA-SHA256");
  signer.update(signingInput);
  signer.end();
  const sig = signer.sign(cfg.privateKey);
  return `${signingInput}.${base64UrlEncode(sig)}`;
}

interface CachedToken {
  token: string;
  expiresAt: number;
}
let cachedToken: CachedToken | null = null;

async function getAccessToken(cfg: GscConfig): Promise<string | null> {
  const now = Date.now();
  if (cachedToken && cachedToken.expiresAt > now + 30_000) return cachedToken.token;

  try {
    const assertion = signJwt(cfg);
    const body = new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion,
    });
    const res = await fetch(TOKEN_URL, {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      body,
      cache: "no-store",
    });
    if (!res.ok) return null;
    const data = (await res.json()) as { access_token?: string; expires_in?: number };
    if (!data.access_token) return null;
    cachedToken = {
      token: data.access_token,
      expiresAt: now + (data.expires_in ?? 3600) * 1000,
    };
    return data.access_token;
  } catch {
    return null;
  }
}

interface SearchAnalyticsRow {
  keys?: string[];
  clicks?: number;
  impressions?: number;
  ctr?: number;
  position?: number;
}

async function queryAnalytics(
  cfg: GscConfig,
  body: Record<string, unknown>,
): Promise<SearchAnalyticsRow[] | null> {
  const token = await getAccessToken(cfg);
  if (!token) return null;
  const url = `https://searchconsole.googleapis.com/webmasters/v3/sites/${encodeURIComponent(
    cfg.siteUrl,
  )}/searchAnalytics/query`;
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        authorization: `Bearer ${token}`,
        "content-type": "application/json",
      },
      body: JSON.stringify(body),
      cache: "no-store",
    });
    if (!res.ok) return null;
    const json = (await res.json()) as { rows?: SearchAnalyticsRow[] };
    return json.rows ?? [];
  } catch {
    return null;
  }
}

function isoDaysAgo(days: number): string {
  const d = new Date();
  d.setUTCDate(d.getUTCDate() - days);
  return d.toISOString().slice(0, 10);
}

export interface GscTotals {
  impressions: number;
  clicks: number;
  rangeFrom: string;
  rangeTo: string;
}

export async function fetchGsc30dTotals(): Promise<GscTotals | null> {
  const cfg = readGscConfig();
  if (!cfg) return null;
  const rangeTo = isoDaysAgo(2); // GSC has ~2 day data lag
  const rangeFrom = isoDaysAgo(31);
  const rows = await queryAnalytics(cfg, {
    startDate: rangeFrom,
    endDate: rangeTo,
    dimensions: [],
    rowLimit: 1,
  });
  if (!rows) return null;
  const first = rows[0] ?? { impressions: 0, clicks: 0 };
  return {
    impressions: Math.round(first.impressions ?? 0),
    clicks: Math.round(first.clicks ?? 0),
    rangeFrom,
    rangeTo,
  };
}

export interface GscDailyPoint {
  date: string;
  impressions: number;
  clicks: number;
}

export async function fetchGscDailyTrend(days = 90): Promise<GscDailyPoint[] | null> {
  const cfg = readGscConfig();
  if (!cfg) return null;
  const rangeTo = isoDaysAgo(2);
  const rangeFrom = isoDaysAgo(days + 2);
  const rows = await queryAnalytics(cfg, {
    startDate: rangeFrom,
    endDate: rangeTo,
    dimensions: ["date"],
    rowLimit: days + 10,
  });
  if (!rows) return null;
  return rows
    .map((r) => ({
      date: r.keys?.[0] ?? "",
      impressions: Math.round(r.impressions ?? 0),
      clicks: Math.round(r.clicks ?? 0),
    }))
    .filter((p) => p.date)
    .sort((a, b) => a.date.localeCompare(b.date));
}

export interface GscTopQuery {
  query: string;
  impressionsBucket: string; // privacy-bucketed display value
  clicksBucket: string;
}

function roundBucket(n: number): string {
  if (n <= 0) return "1 桁";
  if (n < 100) return "数十回";
  if (n < 1000) return "数百回";
  if (n < 10_000) return "数千回";
  if (n < 100_000) return "数万回";
  return "10 万回以上";
}

export async function fetchGscTopQueries(limit = 10): Promise<GscTopQuery[] | null> {
  const cfg = readGscConfig();
  if (!cfg) return null;
  const rangeTo = isoDaysAgo(2);
  const rangeFrom = isoDaysAgo(31);
  const rows = await queryAnalytics(cfg, {
    startDate: rangeFrom,
    endDate: rangeTo,
    dimensions: ["query"],
    rowLimit: limit,
    orderBy: [{ field: "impressions", desc: true }],
  });
  if (!rows) return null;
  return rows
    .map((r) => ({
      query: r.keys?.[0] ?? "",
      impressionsBucket: roundBucket(Math.round(r.impressions ?? 0)),
      clicksBucket: roundBucket(Math.round(r.clicks ?? 0)),
    }))
    .filter((q) => q.query);
}
