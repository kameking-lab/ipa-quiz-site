import { afterEach, beforeEach, expect, it, vi } from "vitest";
import type { LLMProvider } from "@/lib/ai/provider";
import { POST } from "@/app/api/copilot/exam-library/route";

const io = vi.hoisted(() => ({
  access: vi.fn(), limit: vi.fn(), cap: vi.fn(), cost: vi.fn(),
  reserve: vi.fn(), settle: vi.fn(), countPaid: vi.fn(),
  generate: vi.fn<LLMProvider["streamChat"]>(),
}));
vi.mock("@/lib/ai/access-server", () => ({ resolveAiAccess: io.access }));
vi.mock("@/lib/ai/normal-use-server", () => ({ checkAiNormalUse: io.limit }));
vi.mock("@/lib/ai/question-quota-kv", () => ({
  questionQuotaStore: { reserve: io.reserve, settle: io.settle }, recordPaidAiQuestion: io.countPaid,
}));
vi.mock("@/lib/ai/cost-guard", async importOriginal => ({
  ...await importOriginal<typeof import("@/lib/ai/cost-guard")>(), checkMonthlyCostCap: io.cap, recordAiCost: io.cost,
}));
vi.mock("@/lib/ai/provider", () => ({ getProvider: () => ({ name: "gemini", streamChat: io.generate }) }));
vi.mock("@/lib/monitoring/sentry", () => ({ captureException: vi.fn() }));
vi.mock("@/lib/billing/content-policy", () => ({ strictContentGateEnabled: () => false }));
vi.mock("@/lib/exam-library-catalog", () => ({ findExamEntry: () => ({
  label: "試験", subject: "科目", pdfUrl: "https://example.test/test.pdf",
}) }));
vi.mock("@/lib/exam-library-papers", () => ({ loadExamPaper: () => [{
  id: "test-q1", number: 1, text: "テスト問題", images: [], choiceCount: 4, sourcePages: [1],
}] }));

function send() {
  return POST(new Request("https://example.test/api/copilot/exam-library", {
    method: "POST", headers: { "content-type": "application/json" },
    body: JSON.stringify({ examId: "lckohyo-TEST01", questionId: "test-q1", messages: [{ role: "user", content: "考え方を教えて" }] }),
  }));
}

beforeEach(() => {
  vi.resetAllMocks();
  vi.stubEnv("AI_QUOTA_ROLLOUT", "true");
  vi.stubEnv("GEMINI_API_KEY", "");
  const resetAt = Date.now() + 60_000;
  io.access.mockResolvedValue({ kind: "free", subject: "test-subject" });
  io.limit.mockResolvedValue({ ok: true });
  io.cap.mockResolvedValue({ allowed: true, reservation: { id: "budget" } });
  io.reserve.mockResolvedValue({ status: "reserved", remaining: 2, resetAt, lease: { expiresAt: resetAt } });
  io.settle.mockResolvedValue({ status: "completed", remaining: 2, resetAt });
  io.generate.mockImplementation(async function* (input) {
    yield "テストの回答";
    input.onComplete?.({ finishReason: "STOP", truncated: false, promptTokens: 18, totalTokens: 25 });
  });
});
afterEach(() => vi.unstubAllEnvs());

it("delivers the completed free answer, settles once and records provider usage", async () => {
  const reply = await send();
  expect(reply.status).toBe(200);
  expect(await reply.text()).toContain("テストの回答");
  expect(io.settle).toHaveBeenCalledExactlyOnceWith(expect.anything(), true);
  expect(io.cost).toHaveBeenCalledExactlyOnceWith(expect.objectContaining({ inputTokens: 18, outputTokens: 7 }));
});

it("withholds a free answer if the slot cannot be confirmed, while recording its cost", async () => {
  io.settle.mockRejectedValue(new Error("unavailable"));
  const text = await (await send()).text();
  expect(text).toContain("[エラー]");
  expect(text).not.toContain("テストの回答");
  expect(io.cost).toHaveBeenCalledTimes(1);
});

it("refunds the unused cost reservation when the common free quota is exhausted", async () => {
  io.reserve.mockResolvedValue({ status: "exhausted", remaining: 0, resetAt: Date.now() + 60_000 });
  const reply = await send();
  expect(reply.status).toBe(429);
  expect(await reply.json()).toMatchObject({ error: "ai_daily_quota_exhausted" });
  expect(io.generate).not.toHaveBeenCalled();
  expect(io.cost).toHaveBeenCalledExactlyOnceWith(expect.objectContaining({ inputTokens: 0, outputTokens: 0 }));
});

it.each(["free", "paid"])("stops the %s request at the monthly cost guard", async (kind) => {
  io.access.mockResolvedValue({ kind, subject: "test-subject" });
  io.cap.mockResolvedValue({ allowed: false, reason: "cost_capped" });
  const reply = await send();
  expect(reply.status).toBe(503);
  expect(reply.headers.get("X-AI-RateLimit-Scope")).toBe("service-cost");
  expect(io.limit).toHaveBeenCalledOnce();
  expect(io.reserve).not.toHaveBeenCalled();
  expect(io.generate).not.toHaveBeenCalled();
});

it("delivers paid answers during a free quota outage, with normal-use and cost guards active", async () => {
  io.access.mockResolvedValue({ kind: "paid", subject: "test-subject" });
  io.reserve.mockRejectedValue(new Error("unavailable"));
  io.countPaid.mockRejectedValue(new Error("statistics unavailable"));
  const reply = await send();
  expect(reply.status).toBe(200);
  expect(await reply.text()).toContain("テストの回答");
  expect(io.limit).toHaveBeenCalledOnce();
  expect(io.cap).toHaveBeenCalledOnce();
  expect(io.cost).toHaveBeenCalledOnce();
  expect(io.reserve).not.toHaveBeenCalled();
});
