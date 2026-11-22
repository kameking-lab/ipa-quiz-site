import { afterEach, expect, it, vi } from "vitest";
import { POST } from "@/app/api/scoring/route";

const calls = vi.hoisted(() => ({
  getProvider: vi.fn(), resolveModel: vi.fn(), streamChat: vi.fn(), checkMonthlyCostCap: vi.fn(),
  recordAiCost: vi.fn(), prepareAiUsage: vi.fn(), consumeAiUsage: vi.fn(),
  checkAiNormalUse: vi.fn(), notifyOpsInBackground: vi.fn(),
}));
vi.mock("@/lib/ai/provider", () => ({
  resolveModel: calls.resolveModel,
  getProvider: calls.getProvider.mockResolvedValue({ name: "gemini", streamChat: calls.streamChat }),
}));
vi.mock("@/lib/ai/cost-guard", () => ({
  checkMonthlyCostCap: calls.checkMonthlyCostCap, recordAiCost: calls.recordAiCost,
}));
vi.mock("@/lib/ai/usage-server", () => ({
  prepareAiUsage: calls.prepareAiUsage, consumeAiUsage: calls.consumeAiUsage,
}));
vi.mock("@/lib/ai/normal-use-server", () => ({ checkAiNormalUse: calls.checkAiNormalUse }));
vi.mock("@/lib/notify/ops-alert", () => ({ notifyOpsInBackground: calls.notifyOpsInBackground }));

afterEach(() => vi.unstubAllEnvs());

it.each(["false", "true"])("returns 410 without model selection, AI, quota, costs or alerts (rollout=%s)", async rollout => {
  vi.stubEnv("AI_QUOTA_ROLLOUT", rollout);
  const response = await POST();
  expect(response.status).toBe(410);
  expect(await response.json()).toEqual({ error: "scoring_retired" });
  expect(response.headers.has("X-Provider")).toBe(false);
  for (const call of Object.values(calls)) expect(call).not.toHaveBeenCalled();
});
