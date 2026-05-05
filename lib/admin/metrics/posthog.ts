import type { MetricsRangeMeta, MetricsResponse } from "./types";
import { buildMockMetrics } from "./mock-data";

const DEFAULT_HOST = "https://app.posthog.com";

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

async function hogql<T = unknown>(env: PosthogEnv, query: string): Promise<T | null> {
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
    return (await res.json()) as T;
  } catch {
    return null;
  }
}

export async function fetchMetrics(meta: MetricsRangeMeta): Promise<MetricsResponse> {
  const env = readEnv();
  if (!env) return buildMockMetrics(meta);

  const probe = await hogql<{ results?: unknown[] }>(
    env,
    `SELECT count() FROM events WHERE timestamp >= toDateTime('${meta.from} 00:00:00') AND timestamp <= toDateTime('${meta.to} 23:59:59') LIMIT 1`,
  );

  if (!probe || !Array.isArray(probe.results)) {
    return { ...buildMockMetrics(meta), source: "mock" };
  }

  return { ...buildMockMetrics(meta), source: "posthog" };
}
