import { it, expect, afterEach, vi } from "vitest";
import { fetchMetrics } from "@/lib/admin/metrics/posthog";
import { resolveRange } from "@/lib/admin/metrics/range";
afterEach(() => { vi.unstubAllEnvs(); vi.unstubAllGlobals(); });
it.each([false, true])("never fabricates measurements when configured=%s", async (configured) => {
  vi.stubEnv("POSTHOG_API_KEY", configured ? "test" : "");
  vi.stubEnv("POSTHOG_PROJECT_ID", configured ? "1" : "");
  const fetchMock = vi.fn().mockResolvedValue({ ok: true, json: async () => ({ results: [[987654321]] }) });
  vi.stubGlobal("fetch", fetchMock);
  const result = await fetchMetrics(resolveRange("7d"));
  expect(result.source).toBe("unavailable");
  expect(result).not.toHaveProperty("summary");
  expect(result).not.toHaveProperty("insights");
  expect(fetchMock).not.toHaveBeenCalled();
});
