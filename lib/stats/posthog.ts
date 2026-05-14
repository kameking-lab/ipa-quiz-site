// Server-side PostHog stats fetchers for the public /stats dashboard.
//
// Uses the HogQL HTTP endpoint with a Personal API Key. Same pattern as
// lib/admin/metrics/posthog.ts — no new npm dependency. All functions return
// null on missing env or query failure so callers can degrade gracefully.

const DEFAULT_HOST = "https://us.posthog.com";

interface PosthogEnv {
  apiKey: string;
  projectId: string;
  host: string;
}

function readEnv(): PosthogEnv | null {
  const apiKey = process.env.POSTHOG_API_KEY;
  const projectId = process.env.POSTHOG_PROJECT_ID;
  const host = process.env.POSTHOG_HOST || DEFAULT_HOST;
  if (!apiKey || !projectId) return null;
  return { apiKey, projectId, host: host.replace(/\/+$/, "") };
}

export function isPosthogStatsConfigured(): boolean {
  return readEnv() !== null;
}

interface HogQlResult {
  results?: unknown[][];
  columns?: string[];
}

async function hogql(env: PosthogEnv, query: string): Promise<HogQlResult | null> {
  try {
    const res = await fetch(`${env.host}/api/projects/${env.projectId}/query/`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${env.apiKey}`,
      },
      body: JSON.stringify({ query: { kind: "HogQLQuery", query } }),
      cache: "no-store",
    });
    if (!res.ok) return null;
    return (await res.json()) as HogQlResult;
  } catch {
    return null;
  }
}

export interface FeatureBreakdownRow {
  feature: string;
  pageviews: number;
  pct: number;
}

const FEATURE_BUCKETS: Array<{ feature: string; match: (path: string) => boolean }> = [
  { feature: "クイズ", match: (p) => p.startsWith("/quiz") || p.startsWith("/q/") },
  { feature: "午後問題", match: (p) => p.includes("/afternoon") },
  { feature: "論文添削", match: (p) => p.startsWith("/essay") || p.startsWith("/essays") },
  { feature: "模試", match: (p) => p.startsWith("/mock-exam") },
  { feature: "ブログ", match: (p) => p.startsWith("/blog") },
  { feature: "ランキング", match: (p) => p.startsWith("/ranking") },
  { feature: "用語集", match: (p) => p.startsWith("/glossary") || p.startsWith("/keywords") },
];

function bucketFeature(rawPath: string): string {
  let path = rawPath || "/";
  try {
    path = new URL(rawPath, "https://x.invalid").pathname;
  } catch {
    // already a path
  }
  for (const b of FEATURE_BUCKETS) {
    if (b.match(path)) return b.feature;
  }
  return "その他";
}

export async function fetchFeatureBreakdown(): Promise<FeatureBreakdownRow[] | null> {
  const env = readEnv();
  if (!env) return null;
  // Pull last 30 days of $pageview events grouped by URL path. We sum on the
  // server here rather than via SQL because PostHog cloud doesn't always expose
  // path() as a built-in — string-prefix matching after-the-fact is robust.
  const q = `
    SELECT properties.$pathname AS path, count() AS pv
    FROM events
    WHERE event = '$pageview'
      AND timestamp >= now() - INTERVAL 30 DAY
    GROUP BY path
    ORDER BY pv DESC
    LIMIT 200
  `;
  const data = await hogql(env, q);
  if (!data?.results) return null;
  const totals = new Map<string, number>();
  let grand = 0;
  for (const row of data.results) {
    const path = String(row[0] ?? "");
    const pv = Number(row[1] ?? 0);
    if (!path) continue;
    const bucket = bucketFeature(path);
    totals.set(bucket, (totals.get(bucket) ?? 0) + pv);
    grand += pv;
  }
  if (grand === 0) return [];
  return Array.from(totals.entries())
    .map(([feature, pageviews]) => ({
      feature,
      pageviews,
      pct: Number(((pageviews / grand) * 100).toFixed(1)),
    }))
    .sort((a, b) => b.pageviews - a.pageviews);
}

export interface ReferrerRow {
  source: string;
  pageviews: number;
  pct: number;
}

const SEARCH_DOMAINS = ["google.", "bing.", "yahoo.", "duckduckgo.", "baidu.", "ecosia."];
const SOCIAL_DOMAINS = ["t.co", "twitter.", "x.com", "facebook.", "instagram.", "linkedin.", "reddit.", "youtube.", "tiktok."];

function bucketReferrer(raw: string): string {
  const r = (raw || "").toLowerCase();
  if (!r || r === "$direct" || r === "(direct)") return "Direct";
  if (SEARCH_DOMAINS.some((d) => r.includes(d))) return "Search";
  if (SOCIAL_DOMAINS.some((d) => r.includes(d))) return "Social";
  return "Referrer";
}

export async function fetchReferrerBreakdown(): Promise<ReferrerRow[] | null> {
  const env = readEnv();
  if (!env) return null;
  const q = `
    SELECT properties.$referring_domain AS ref, count() AS pv
    FROM events
    WHERE event = '$pageview'
      AND timestamp >= now() - INTERVAL 30 DAY
    GROUP BY ref
    ORDER BY pv DESC
    LIMIT 500
  `;
  const data = await hogql(env, q);
  if (!data?.results) return null;
  const totals = new Map<string, number>();
  let grand = 0;
  for (const row of data.results) {
    const ref = String(row[0] ?? "");
    const pv = Number(row[1] ?? 0);
    const bucket = bucketReferrer(ref);
    totals.set(bucket, (totals.get(bucket) ?? 0) + pv);
    grand += pv;
  }
  if (grand === 0) return [];
  return Array.from(totals.entries())
    .map(([source, pageviews]) => ({
      source,
      pageviews,
      pct: Number(((pageviews / grand) * 100).toFixed(1)),
    }))
    .sort((a, b) => b.pageviews - a.pageviews);
}
