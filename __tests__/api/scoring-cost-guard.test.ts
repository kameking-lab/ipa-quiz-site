import { describe, expect, it, vi } from "vitest";

const streamChat = vi.fn();
const checkMonthlyCostCap = vi.fn();
vi.mock("@/lib/ai/provider", async () => {
  const actual = await vi.importActual<typeof import("@/lib/ai/provider")>("@/lib/ai/provider");
  return { ...actual, getProvider: async () => ({ name: "gemini", streamChat }) };
});
vi.mock("@/lib/ai/cost-guard", async () => {
  const actual = await vi.importActual<typeof import("@/lib/ai/cost-guard")>("@/lib/ai/cost-guard");
  return { ...actual, checkMonthlyCostCap };
});

describe("/api/scoring — retired original afternoon questions", () => {
  it("returns 404 before a paid provider or cost lookup for a retired original question", async () => {
    const { POST } = await import("@/app/api/scoring/route");
    const res = await POST(new Request("http://localhost/api/scoring", {
      method: "POST",
      headers: { "content-type": "application/json", "x-forwarded-for": "10.1.0.1" },
      body: JSON.stringify({ questionId: "ap-2024h-pm-q1", answers: [{ label: "設問1", text: "答案" }] }),
    }));
    expect(res.status).toBe(404);
    expect(streamChat).not.toHaveBeenCalled();
    expect(checkMonthlyCostCap).not.toHaveBeenCalled();
  });
});
