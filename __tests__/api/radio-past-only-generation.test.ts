import { beforeEach, describe, expect, it, vi } from "vitest";

const calls = vi.hoisted(() => ({ rate: vi.fn(), ip: vi.fn(), provider: vi.fn() }));
vi.mock("@/lib/ai/provider", () => ({ getProvider: calls.provider, resolveModel: vi.fn() }));
vi.mock("@/lib/rate-limit/server", () => ({ checkRateLimit: calls.rate, getClientIp: () => "127.0.0.1" }));
vi.mock("@/lib/rate-limit", () => ({ checkIpRateLimit: calls.ip }));
vi.mock("@/lib/monitoring/sentry", () => ({ captureException: vi.fn() }));
vi.mock("@/lib/ai/cost-guard", () => ({ checkMonthlyCostCap: vi.fn(), recordAiCost: vi.fn(), estimateTokens: vi.fn() }));
vi.mock("@/lib/ai/cost-tracker", () => ({ tierForModel: vi.fn() }));

import { POST } from "@/app/api/generate-question/route";

const exams = ["riku-tech1", "maritime4", "land-special1", "maritime3", "land-special2", "land-special3", "aviation-comm", "amateur1", "maritime-special1", "riku-tech2", "amateur2", "maritime-radar", "riku-toku-kokunai", "kai-toku3", "koku-toku"];
function request(exam: string, id = "test-only-original") {
  return new Request("http://localhost/api/generate-question", {
    method: "POST", headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ baseQuestion: { id, exam, category: "test", topicTags: [], question: "test-only", choices: { ア: "A", イ: "B", ウ: "C", エ: "D" }, answer: "ア" } }),
  });
}
beforeEach(() => vi.clearAllMocks());

describe("official past-only qualification generation boundary", () => {
  for (const exam of exams) it(`${exam}: rejects before AI, rate-limit storage or generation`, async () => {
    const res = await POST(request(exam));
    expect(res.status).toBe(400);
    expect(res.headers.get("Cache-Control")).toBe("no-store");
    const body = await res.json();
    expect(body.error).toBe("past_questions_only");
    expect(body).not.toHaveProperty("question");
    expect(calls.rate).not.toHaveBeenCalled();
    expect(calls.ip).not.toHaveBeenCalled();
    expect(calls.provider).not.toHaveBeenCalled();
  });

  it("retains the original qualification policy when the request exam is relabeled", async () => {
    const res = await POST(request("ap", "radio21-amateur1-2026-05-kogaku-q01"));
    expect(res.status).toBe(400);
    expect((await res.json()).error).toBe("past_questions_only");
    expect(calls.provider).not.toHaveBeenCalled();
    expect(calls.rate).not.toHaveBeenCalled();
  });

  it("preserves the existing non-radio rate-limit response", async () => {
    calls.rate.mockResolvedValueOnce({ ok: false, reason: "daily", resetAt: 123 });
    const res = await POST(request("ap"));
    expect(res.status).toBe(429);
    expect((await res.json()).error).toBe("rate_limited");
    expect(calls.rate).toHaveBeenCalledTimes(1);
    expect(calls.provider).not.toHaveBeenCalled();
  });

  it("keeps malformed requests invalid without accessing AI", async () => {
    const res = await POST(new Request("http://localhost/api/generate-question", { method: "POST", headers: { "Content-Type": "application/json" }, body: "null" }));
    expect(res.status).toBe(400);
    expect((await res.json()).error).toBe("invalid_request");
    expect(calls.provider).not.toHaveBeenCalled();
  });
});
