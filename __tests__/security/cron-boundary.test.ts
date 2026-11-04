// @vitest-environment node
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
vi.mock("@/lib/seo/expected-routes", () => ({ expectedRouteStatuses: () => [{ path: "/", expected: 200 }] }));
import { GET } from "@/app/api/cron/health-check/route";
beforeEach(() => { vi.stubGlobal("fetch", vi.fn().mockResolvedValue(new Response("ok"))); vi.stubEnv("CRON_SECRET", ""); });
afterEach(() => { vi.unstubAllGlobals(); vi.unstubAllEnvs(); });
describe("cron authentication", () => {
  it("fails closed when the secret is absent", async () => {
    const response = await GET(new Request("https://kakomon-ai.jp/api/cron/health-check"));
    expect(response.status).toBe(503);
    expect(fetch).not.toHaveBeenCalled();
  });
  it("rejects an invalid bearer", async () => {
    vi.stubEnv("CRON_SECRET", "synthetic-cron-secret");
    expect((await GET(new Request("https://kakomon-ai.jp/api/cron/health-check", { headers: { authorization: "Bearer invalid" } }))).status).toBe(401);
    expect(fetch).not.toHaveBeenCalled();
  });
  it("allows the configured scheduler", async () => {
    vi.stubEnv("CRON_SECRET", "synthetic-cron-secret");
    expect((await GET(new Request("https://kakomon-ai.jp/api/cron/health-check", { headers: { authorization: "Bearer synthetic-cron-secret" } }))).status).toBe(200);
    expect(fetch).toHaveBeenCalledTimes(1);
  });
});
