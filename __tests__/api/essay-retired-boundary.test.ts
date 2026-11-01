import { expect, it, vi } from "vitest";
const guard = vi.hoisted(() => ({ usage: vi.fn(), consume: vi.fn(), provider: vi.fn(), rate: vi.fn(), cost: vi.fn(), record: vi.fn(), normal: vi.fn() }));
vi.mock("@/lib/ai/usage-server", () => ({ prepareAiUsage: guard.usage, consumeAiUsage: guard.consume, withAiUsageResponse: (fn: (track: () => void) => Promise<Response>) => fn(() => {}) }));
vi.mock("@/lib/ai/provider", () => ({ getProvider: guard.provider, resolveModel: vi.fn(), gradingThinkingBudget: vi.fn() }));
vi.mock("@/lib/rate-limit/server", () => ({ checkRateLimit: guard.rate, getClientIp: vi.fn() }));
vi.mock("@/lib/ai/normal-use-server", () => ({ checkAiNormalUse: guard.normal }));
vi.mock("@/lib/ai/cost-guard", () => ({ checkMonthlyCostCap: guard.cost, recordAiCost: guard.record, estimateTokens: vi.fn() }));
import { POST } from "@/app/api/essay-grade/route";
// No mock of the public question lookup. The retired ID must fail before usage/provider access.
it.each(["st-2024a-pm2-q1", "st-2024a-pm2-q2", "st-2023a-pm2-q1", "sa-2024a-pm2-q1", "sa-2024a-pm2-q2", "pm-2024a-pm2-q1", "pm-2024a-pm2-q2", "pm-2023a-pm2-q1", "sm-2024a-pm2-q1", "sm-2024a-pm2-q2", "au-2024a-pm2-q1", "au-2024a-pm2-q2", "sc-2023h-pm2-q1", "sc-2024h-pm2-q1", "sc-2025h-pm2-q1"])("retired %s is 404 and non-consuming", async questionId => {
  const res = await POST(new Request("http://localhost/api/essay-grade", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ questionId, industry: "it", answers: { ア: "fixture".repeat(30), イ: "", ウ: "" } }) }));
  expect(res.status).toBe(404);
  expect((await res.json()).error).toBe("not_found");
  for (const fn of Object.values(guard)) expect(fn).not.toHaveBeenCalled();
});
