// Server-side PostHog funnel data fetcher for /admin/funnel dashboard.
// Uses HogQL HTTP API — same pattern as lib/stats/posthog.ts.

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

export function isFunnelConfigured(): boolean {
  return readEnv() !== null;
}

interface HogQlResult {
  results?: unknown[][];
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

export type RangeDays = 1 | 7 | 30;

export interface FunnelStep {
  event: string;
  label: string;
  count: number;
  drop_pct: number | null;
}

export interface FunnelData {
  name: string;
  steps: FunnelStep[];
}

export interface FunnelResponse {
  configured: boolean;
  range_days: RangeDays;
  funnels: FunnelData[];
  event_counts: Record<string, number>;
  cachedAt: string;
}

async function fetchEventCounts(
  env: PosthogEnv,
  events: string[],
  rangeDays: RangeDays,
): Promise<Record<string, number>> {
  const eventList = events.map((e) => `'${e}'`).join(", ");
  const q = `
    SELECT event, count() AS cnt
    FROM events
    WHERE event IN (${eventList})
      AND timestamp >= now() - INTERVAL ${rangeDays} DAY
    GROUP BY event
    ORDER BY cnt DESC
  `;
  const data = await hogql(env, q);
  const counts: Record<string, number> = {};
  if (!data?.results) return counts;
  for (const row of data.results) {
    const name = String(row[0] ?? "");
    const cnt = Number(row[1] ?? 0);
    if (name) counts[name] = cnt;
  }
  return counts;
}

export function buildFunnelSteps(
  stepDefs: Array<{ event: string; label: string }>,
  counts: Record<string, number>,
): FunnelStep[] {
  return stepDefs.map((def, i) => {
    const count = counts[def.event] ?? 0;
    const prevCount = i === 0 ? null : (counts[stepDefs[i - 1].event] ?? 0);
    const drop_pct =
      prevCount !== null && prevCount > 0
        ? Number((((prevCount - count) / prevCount) * 100).toFixed(1))
        : null;
    return { event: def.event, label: def.label, count, drop_pct };
  });
}

const QUIZ_FUNNEL: Array<{ event: string; label: string }> = [
  { event: "$pageview", label: "ページビュー" },
  { event: "quiz_started", label: "クイズ開始" },
  { event: "question_answered", label: "問題に解答" },
  { event: "quiz_completed", label: "クイズ完了" },
];

const ESSAY_FUNNEL: Array<{ event: string; label: string }> = [
  { event: "essay_viewed", label: "論文問題閲覧" },
  { event: "essay_industry_switched", label: "業種切替" },
  { event: "ai_query_sent", label: "AIコパイロット利用" },
];

const BLOG_FUNNEL: Array<{ event: string; label: string }> = [
  { event: "blog_viewed", label: "ブログ記事開封" },
  { event: "blog_article_scrolled", label: "スクロール達成" },
];

const ALL_EVENTS = Array.from(
  new Set([
    ...QUIZ_FUNNEL.map((s) => s.event),
    ...ESSAY_FUNNEL.map((s) => s.event),
    ...BLOG_FUNNEL.map((s) => s.event),
    "contact_form_submitted",
    "copilot_response_received",
    "faq_expanded",
    "feedback_submitted",
  ]),
);

export async function fetchFunnelData(rangeDays: RangeDays): Promise<FunnelResponse> {
  const env = readEnv();
  if (!env) {
    return {
      configured: false,
      range_days: rangeDays,
      funnels: [],
      event_counts: {},
      cachedAt: new Date().toISOString(),
    };
  }

  const counts = await fetchEventCounts(env, ALL_EVENTS, rangeDays);

  const funnels: FunnelData[] = [
    {
      name: "クイズ演習ファネル",
      steps: buildFunnelSteps(QUIZ_FUNNEL, counts),
    },
    {
      name: "論文問題ファネル",
      steps: buildFunnelSteps(ESSAY_FUNNEL, counts),
    },
    {
      name: "ブログ読了ファネル",
      steps: buildFunnelSteps(BLOG_FUNNEL, counts),
    },
  ];

  return {
    configured: true,
    range_days: rangeDays,
    funnels,
    event_counts: counts,
    cachedAt: new Date().toISOString(),
  };
}
