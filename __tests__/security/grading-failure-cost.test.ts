// @vitest-environment node
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
vi.mock("@/lib/afternoon/load", async () => import("@/__tests__/fixtures/archived-afternoon-load"));
const { recordAiCost, streamChat, checkMonthlyCostCap } = vi.hoisted(() => ({ recordAiCost: vi.fn(), streamChat: vi.fn(), checkMonthlyCostCap: vi.fn() }));
vi.mock("@/lib/ai/cost-guard", async importOriginal => ({
  ...await importOriginal<typeof import("@/lib/ai/cost-guard")>(),
  checkMonthlyCostCap,
  recordAiCost,
}));
vi.mock("@/lib/ai/provider", async importOriginal => ({
  ...await importOriginal<typeof import("@/lib/ai/provider")>(),
  getProvider: async () => ({ name: "gemini", streamChat }),
}));
vi.mock("@/lib/ai/normal-use-server", () => ({ checkAiNormalUse: async () => ({ ok: true }) }));
vi.mock("@/lib/monitoring/sentry", () => ({ captureException: vi.fn() }));
beforeEach(() => {
  vi.stubEnv("KV_REST_API_URL", ""); vi.stubEnv("KV_REST_API_TOKEN", "");
  checkMonthlyCostCap.mockResolvedValue({ allowed: true, totalJpy: 0, capJpy: 50_000 });
  streamChat.mockReset();
  recordAiCost.mockReset().mockImplementation(() => new Promise<void>(resolve => setTimeout(resolve, 5)));
  streamChat.mockImplementation(async function* () { yield "partial billable response"; throw new Error("synthetic upstream interruption"); });
  vi.spyOn(console, "error").mockImplementation(() => {});
});
afterEach(() => { vi.unstubAllEnvs(); vi.restoreAllMocks(); vi.resetModules(); });
describe("failed grading still persists the whole unknown generation budget", () => {
  it.each(["scoring", "essay-grade"] as const)("%s records cost exactly once before returning an error", async route => {
    const { POST } = route === "scoring" ? await import("@/app/api/scoring/route") : await import("@/app/api/essay-grade/route");
    const body = route === "scoring"
      ? { questionId: "ap-2024h-pm-q1", answers: [{ label: "設問1", text: "テスト解答" }] }
      : { questionId: "au-2024a-pm2-q1", industry: "it", answers: { ア: "あ".repeat(800), イ: "い".repeat(800), ウ: "う".repeat(800) } };
    const response = await POST(new Request(`https://kakomon-ai.jp/api/${route}`, { method: "POST", headers: { "content-type": "application/json", "x-forwarded-for": route }, body: JSON.stringify(body) }));
    expect(response.status).toBe(503);
    expect(streamChat).toHaveBeenCalledTimes(1);
    expect(recordAiCost).toHaveBeenCalledTimes(1);
    expect(recordAiCost.mock.calls[0][0].outputTokens).toBe(route === "scoring" ? 3000 : 8000);
    expect(recordAiCost.mock.settledResults[0].type).toBe("fulfilled");
    streamChat.mockClear();
  });
});
