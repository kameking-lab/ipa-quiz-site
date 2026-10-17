import { beforeEach, describe, expect, it, vi } from "vitest";

const checks = vi.hoisted(() => ({ cost: vi.fn(), stream: vi.fn() }));
vi.mock("@/lib/afternoon/load", async () => {
  const actual = await vi.importActual<typeof import("@/lib/afternoon/load")>("@/lib/afternoon/load");
  const fixtures = await import("./grade-lookup-fixtures");
  return { ...actual, findAfternoonQuestion: fixtures.findPublishedAfternoonFixture };
});
vi.mock("@/lib/essay/load", async () => {
  const actual = await vi.importActual<typeof import("@/lib/essay/load")>("@/lib/essay/load");
  const fixtures = await import("./grade-lookup-fixtures");
  return { ...actual, findEssayQuestion: fixtures.findPublishedEssayFixture };
});
vi.mock("@/lib/ai/provider", async () => {
  const actual = await vi.importActual<typeof import("@/lib/ai/provider")>("@/lib/ai/provider");
  return { ...actual, getProvider: async () => ({ name: "gemini", streamChat: checks.stream }) };
});
vi.mock("@/lib/ai/cost-guard", async () => {
  const actual = await vi.importActual<typeof import("@/lib/ai/cost-guard")>("@/lib/ai/cost-guard");
  return { ...actual, checkMonthlyCostCap: checks.cost };
});

function request(path: string, body: unknown, ip: string): Request {
  return new Request(`http://localhost${path}`, {
    method: "POST",
    headers: { "content-type": "application/json", "x-forwarded-for": ip },
    body: JSON.stringify(body),
  });
}

beforeEach(() => {
  vi.clearAllMocks();
  checks.cost.mockResolvedValue({ allowed: false, reason: "unavailable", totalJpy: 0, capJpy: 50_000 });
});

describe("paid grading routes stop when the cost balance is unavailable", () => {
  it("afternoon scoring returns a temporary error before calling the provider", async () => {
    const { POST } = await import("@/app/api/scoring/route");
    const res = await POST(request("/api/scoring", {
      questionId: "ap-2024h-pm-q1", answers: [{ label: "設問1", text: "回答例" }],
    }, "10.11.0.1"));
    expect(res.status).toBe(503);
    expect(res.headers.get("X-Error-Type")).toBe("cost_unavailable");
    const body = await res.json();
    expect(body.error).toBe("cost_unavailable");
    expect(body.message).not.toContain("今月の利用上限");
    expect(checks.stream).not.toHaveBeenCalled();
  });

  it("essay grading returns a temporary error before calling the provider", async () => {
    const { POST } = await import("@/app/api/essay-grade/route");
    const res = await POST(request("/api/essay-grade", {
      questionId: "au-2024a-pm2-q1", industry: "it",
      answers: { ア: "論述の内容です。".repeat(30), イ: "計画の内容です。".repeat(30), ウ: "結果の内容です。".repeat(30) },
    }, "10.11.0.2"));
    expect(res.status).toBe(503);
    expect(res.headers.get("X-Error-Type")).toBe("cost_unavailable");
    const body = await res.json();
    expect(body.error).toBe("cost_unavailable");
    expect(body.message).not.toContain("今月の利用上限");
    expect(checks.stream).not.toHaveBeenCalled();
  });
});
