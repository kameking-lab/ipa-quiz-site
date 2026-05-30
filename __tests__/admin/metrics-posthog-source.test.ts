import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { fetchMetrics } from "@/lib/admin/metrics/posthog";
import { resolveRange } from "@/lib/admin/metrics/range";

/**
 * Characterization tests for fetchMetrics (lib/admin/metrics/posthog.ts) — the
 * source gate that decides whether the admin metrics dashboard shows REAL
 * PostHog data or the deterministic mock. Untested before; the load-bearing
 * contract is the `source` label, since the dashboard surfaces "posthog" vs
 * "mock" to the operator:
 *   1. env-gate: no POSTHOG_API_KEY/PROJECT_ID → mock, and fetch is NOT called;
 *   2. fail-soft: env present but the probe fails (network / !ok / non-array
 *      results) → fall back to source "mock" (never throw, never claim live);
 *   3. only a successful probe with an array `results` is labelled "posthog";
 *   4. the query URL targets the configured project and strips a trailing
 *      slash from POSTHOG_HOST.
 */

const meta = resolveRange("7d");

function setEnv(present: boolean) {
  if (present) {
    vi.stubEnv("POSTHOG_API_KEY", "phk_test");
    vi.stubEnv("POSTHOG_PROJECT_ID", "4242");
  } else {
    vi.stubEnv("POSTHOG_API_KEY", "");
    vi.stubEnv("POSTHOG_PROJECT_ID", "");
  }
}

beforeEach(() => {
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
});

afterEach(() => {
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
});

it("returns mock without calling fetch when credentials are absent", async () => {
  setEnv(false);
  const fetchMock = vi.fn();
  vi.stubGlobal("fetch", fetchMock);

  const res = await fetchMetrics(meta);

  expect(res.source).toBe("mock");
  expect(res.meta).toEqual(meta);
  expect(fetchMock).not.toHaveBeenCalled();
});

it('labels the response "posthog" when the probe returns an array of results', async () => {
  setEnv(true);
  vi.stubGlobal(
    "fetch",
    vi.fn().mockResolvedValue({ ok: true, json: async () => ({ results: [[5]] }) }),
  );

  const res = await fetchMetrics(meta);

  expect(res.source).toBe("posthog");
});

it('falls back to "mock" when the probe responds non-ok', async () => {
  setEnv(true);
  vi.stubGlobal(
    "fetch",
    vi.fn().mockResolvedValue({ ok: false, json: async () => ({}) }),
  );

  expect((await fetchMetrics(meta)).source).toBe("mock");
});

it('falls back to "mock" when fetch throws (network error)', async () => {
  setEnv(true);
  vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error("ECONNREFUSED")));

  expect((await fetchMetrics(meta)).source).toBe("mock");
});

it('falls back to "mock" when results is present but not an array', async () => {
  setEnv(true);
  vi.stubGlobal(
    "fetch",
    vi.fn().mockResolvedValue({ ok: true, json: async () => ({ results: "oops" }) }),
  );

  expect((await fetchMetrics(meta)).source).toBe("mock");
});

it("targets the configured project and strips a trailing slash from POSTHOG_HOST", async () => {
  setEnv(true);
  vi.stubEnv("POSTHOG_HOST", "https://eu.posthog.com/");
  const fetchMock = vi
    .fn()
    .mockResolvedValue({ ok: true, json: async () => ({ results: [] }) });
  vi.stubGlobal("fetch", fetchMock);

  await fetchMetrics(meta);

  expect(fetchMock.mock.calls[0]?.[0]).toBe(
    "https://eu.posthog.com/api/projects/4242/query/",
  );
});
