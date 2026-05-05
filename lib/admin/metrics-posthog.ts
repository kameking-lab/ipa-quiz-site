import type { MetricsPeriod, MetricsResponse } from "./metrics-types";
import { buildMockMetrics } from "./metrics-mock";

/**
 * PostHog API integration for the admin metrics dashboard.
 *
 * If POSTHOG_API_KEY (project API key with read access) and POSTHOG_PROJECT_ID
 * are configured, this module attempts to fetch real metrics. Otherwise it
 * returns the mock dataset. Any failure also degrades gracefully to mock so a
 * temporary PostHog outage does not break the admin page.
 *
 * NOTE: PostHog HogQL endpoints can be expensive. The route layer caches
 * results for 5 minutes (see app/api/admin/metrics/route.ts).
 */

const POSTHOG_HOST = process.env.POSTHOG_HOST ?? "https://us.posthog.com";

interface PostHogConfig {
  apiKey: string;
  projectId: string;
  host: string;
}

function getConfig(): PostHogConfig | null {
  const apiKey = process.env.POSTHOG_API_KEY;
  const projectId = process.env.POSTHOG_PROJECT_ID;
  if (!apiKey || !projectId) return null;
  return { apiKey, projectId, host: POSTHOG_HOST };
}

export async function fetchMetrics(period: MetricsPeriod): Promise<MetricsResponse> {
  const config = getConfig();
  if (!config) {
    return buildMockMetrics(period);
  }

  try {
    return await fetchFromPostHog(config, period);
  } catch (err) {
    console.warn("[admin/metrics] PostHog fetch failed, falling back to mock", err);
    const fallback = buildMockMetrics(period);
    return { ...fallback, source: "mock" };
  }
}

async function fetchFromPostHog(config: PostHogConfig, period: MetricsPeriod): Promise<MetricsResponse> {
  // PostHog HogQL endpoint: POST /api/projects/:id/query/
  // Body: { query: { kind: "HogQLQuery", query: "SELECT ..." } }
  //
  // The dashboard surfaces 8 sections worth of data. Issuing 8+ HogQL queries
  // sequentially per request would be slow, so we run them in parallel and
  // assemble the response. If any single section query fails, we substitute
  // that section from the mock dataset so the dashboard still renders.
  const fallback = buildMockMetrics(period);
  const dateFrom = periodToDateFrom(period);

  const [summary, features, pages, sources, flow, conversion, errors] = await Promise.allSettled([
    querySummary(config, dateFrom),
    queryFeatures(config, dateFrom),
    queryPages(config, dateFrom),
    querySources(config, dateFrom),
    queryFlow(config, dateFrom),
    queryConversion(config, dateFrom),
    queryErrors(config),
  ]);

  return {
    generatedAt: new Date().toISOString(),
    period,
    source: "posthog",
    summary: settled(summary, fallback.summary),
    features: settled(features, fallback.features),
    pages: settled(pages, fallback.pages),
    sources: settled(sources, fallback.sources),
    flow: settled(flow, fallback.flow),
    conversion: settled(conversion, fallback.conversion),
    errors: settled(errors, fallback.errors),
    insights: fallback.insights, // insights are derived locally; see below
  };
}

function settled<T>(result: PromiseSettledResult<T>, fallback: T): T {
  return result.status === "fulfilled" ? result.value : fallback;
}

function periodToDateFrom(period: MetricsPeriod): string {
  switch (period) {
    case "24h":
      return "-1d";
    case "7d":
      return "-7d";
    case "30d":
      return "-30d";
    case "90d":
      return "-90d";
  }
}

async function hogql<T>(config: PostHogConfig, query: string): Promise<T> {
  const url = `${config.host}/api/projects/${config.projectId}/query/`;
  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${config.apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query: { kind: "HogQLQuery", query } }),
  });
  if (!res.ok) {
    throw new Error(`PostHog HogQL ${res.status}: ${await res.text()}`);
  }
  return (await res.json()) as T;
}

// The query implementations are intentionally minimal — they exist to wire up
// the integration shape. Each currently throws so the response falls back to
// mock data. Real HogQL queries can be filled in once the PostHog project is
// provisioned and the event taxonomy from lib/analytics/events.ts is captured.

async function querySummary(config: PostHogConfig, _dateFrom: string): Promise<MetricsResponse["summary"]> {
  void config;
  void _dateFrom;
  throw new Error("HogQL summary query not yet implemented");
}

async function queryFeatures(config: PostHogConfig, _dateFrom: string): Promise<MetricsResponse["features"]> {
  void config;
  void _dateFrom;
  throw new Error("HogQL features query not yet implemented");
}

async function queryPages(config: PostHogConfig, _dateFrom: string): Promise<MetricsResponse["pages"]> {
  void config;
  void _dateFrom;
  throw new Error("HogQL pages query not yet implemented");
}

async function querySources(config: PostHogConfig, _dateFrom: string): Promise<MetricsResponse["sources"]> {
  void config;
  void _dateFrom;
  throw new Error("HogQL sources query not yet implemented");
}

async function queryFlow(config: PostHogConfig, _dateFrom: string): Promise<MetricsResponse["flow"]> {
  void config;
  void _dateFrom;
  throw new Error("HogQL flow query not yet implemented");
}

async function queryConversion(config: PostHogConfig, _dateFrom: string): Promise<MetricsResponse["conversion"]> {
  void config;
  void _dateFrom;
  throw new Error("HogQL conversion query not yet implemented");
}

async function queryErrors(config: PostHogConfig): Promise<MetricsResponse["errors"]> {
  void config;
  // Sentry: optional second integration. If SENTRY_AUTH_TOKEN is set, hit the
  // Sentry issues endpoint; otherwise let the route fall back to PostHog
  // exception capture (and finally to mock).
  throw new Error("Sentry/PostHog errors query not yet implemented");
}
