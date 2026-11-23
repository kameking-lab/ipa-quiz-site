import { afterEach, beforeEach, expect, it, vi } from "vitest";
import type { LLMProvider } from "@/lib/ai/provider";
import { POST } from "@/app/api/copilot/exam-library/route";
import { POST as postCopilot } from "@/app/api/copilot/route";

const io = vi.hoisted(() => ({
  access: vi.fn(), limit: vi.fn(), service: vi.fn(), cap: vi.fn(), cost: vi.fn(),
  reserve: vi.fn(), settle: vi.fn(), countPaid: vi.fn(),
  generate: vi.fn<LLMProvider["streamChat"]>(),
}));
vi.mock("@/lib/ai/access-server", () => ({ resolveAiAccess: io.access }));
vi.mock("@/lib/ai/normal-use-server", () => ({ checkAiNormalUse: io.limit, checkFreeAiServiceUse: io.service }));
vi.mock("@/lib/ai/question-quota-kv", () => ({
  questionQuotaStore: { reserve: io.reserve, settle: io.settle }, recordPaidAiQuestion: io.countPaid,
}));
vi.mock("@/lib/ai/cost-guard", async importOriginal => ({
  ...await importOriginal<typeof import("@/lib/ai/cost-guard")>(), checkMonthlyCostCap: io.cap, recordAiCost: io.cost,
}));
vi.mock("@/lib/ai/provider", () => ({ getProvider: () => ({ name: "gemini", streamChat: io.generate }) }));
vi.mock("@/lib/monitoring/sentry", () => ({ captureException: vi.fn() }));
vi.mock("@/lib/copilot/source", () => ({ getCopilotSource: () => ({
  getQuestion: () => ({
    id: "ap-2023h-am-q1", exam: "ap", year: 2023, season: "spring", session: "am",
    qNumber: 1, type: "multiple-choice", question: "テスト問題", category: "テクノロジ系",
    topicTags: [], choices: { ア: "選択肢" }, answer: "ア", explanation: "解説",
  }),
}) }));
vi.mock("@/lib/billing/content-policy", () => ({ strictContentGateEnabled: () => false }));
vi.mock("@/lib/exam-library-catalog", () => ({ findExamEntry: () => ({
  label: "試験", subject: "科目", pdfUrl: "https://example.test/test.pdf",
}) }));
vi.mock("@/lib/exam-library-papers", () => ({ loadExamPaper: () => [{
  id: "test-q1", number: 1, text: "テスト問題", images: [], choiceCount: 4, sourcePages: [1],
}] }));

function send(endpoint = "exam-library") {
  const library = endpoint === "exam-library";
  const question = library ? { examId: "lckohyo-TEST01", questionId: "test-q1" } : { question: { id: "ap-2023h-am-q1" } };
  return (library ? POST : postCopilot)(new Request("https://example.test/api/copilot" + (library ? "/exam-library" : ""), {
    method: "POST", headers: { "content-type": "application/json" },
    body: JSON.stringify({ ...question, messages: [{ role: "user", content: "考え方を教えて" }] }),
  }));
}

beforeEach(() => {
  vi.resetAllMocks();
  vi.stubEnv("AI_QUOTA_ROLLOUT", "true");
  vi.stubEnv("GEMINI_API_KEY", "");
  vi.stubEnv("COPILOT_RAG_ENABLED", "false");
  const resetAt = Date.now() + 60_000;
  io.access.mockResolvedValue({ kind: "free", subject: "test-subject" });
  io.limit.mockResolvedValue({ ok: true });
  io.service.mockResolvedValue({ ok: true });
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
  expect(io.settle.mock.calls.map(([, settlement]) => settlement)).toEqual(["confirm", "delivered"]);
  expect(io.cost).toHaveBeenCalledExactlyOnceWith(expect.objectContaining({ inputTokens: 18, outputTokens: 7 }));
});

it("delivers and settles a free answer that reached the output limit", async () => {
  io.generate.mockImplementation(async function* (input) {
    yield "テストの途中回答";
    input.onComplete?.({ finishReason: "MAX_TOKENS", truncated: true });
  });
  const reply = await send();
  expect(reply.status).toBe(200);
  expect(await reply.text()).toMatch(/^テストの途中回答\n\n\[応答の途中終了\]/);
  expect(io.settle.mock.calls.map(([, settlement]) => settlement)).toEqual(["confirm", "delivered"]);
  expect(io.cost).toHaveBeenCalledOnce();
});

it("releases the free slot when the response body is cancelled before delivery", async () => {
  const buffered = Promise.withResolvers<void>();
  io.generate.mockImplementation(async function* ({ signal }) {
    yield "未配信の途中回答";
    const cancellation = new Promise<never>((_, reject) => {
      signal?.addEventListener("abort", () => reject(signal.reason), { once: true });
    });
    buffered.resolve();
    await cancellation;
  });
  io.settle.mockResolvedValue({ status: "released", remaining: 3, resetAt: Date.now() + 60_000 });
  const reply = await send();
  await buffered.promise;
  await reply.body!.cancel();
  expect(io.settle).toHaveBeenCalledExactlyOnceWith(expect.anything(), false);
  expect(io.cost).toHaveBeenCalledOnce();
});

it("keeps the free slot confirmed when the response body is cancelled after delivery", async () => {
  const finishCost = Promise.withResolvers<void>();
  io.cost.mockReturnValue(finishCost.promise);
  const reply = await send();
  const reader = reply.body!.getReader();
  const { value } = await reader.read();
  expect(new TextDecoder().decode(value)).toBe("テストの回答");
  const cancel = reader.cancel();
  finishCost.resolve();
  await cancel;
  expect(io.settle.mock.calls.map(([, settlement]) => settlement)).toEqual(["confirm", "delivered"]);
  expect(io.cost).toHaveBeenCalledOnce();
});

it("withholds a free answer if the slot cannot be confirmed, while recording its cost", async () => {
  io.settle.mockRejectedValue(new Error("unavailable"));
  const text = await (await send()).text();
  expect(text).toContain("[エラー]");
  expect(text).not.toContain("テストの回答");
  expect(io.cost).toHaveBeenCalledTimes(1);
});

it.each(["free", "paid"])("stops the %s request at the monthly cost guard", async (kind) => {
  io.access.mockResolvedValue({ kind, subject: "test-subject" });
  io.cap.mockResolvedValue({ allowed: false, reason: "cost_capped" });
  const reply = await send();
  expect(reply.status).toBe(503);
  expect(reply.headers.get("X-AI-RateLimit-Scope")).toBe("service-cost");
  expect(io.limit).toHaveBeenCalledOnce();
  if (kind === "free") {
    expect(io.reserve).toHaveBeenCalledBefore(io.cap);
    expect(io.settle).toHaveBeenCalledExactlyOnceWith(expect.anything(), false);
  } else {
    expect(io.reserve).not.toHaveBeenCalled();
  }
  expect(io.service).not.toHaveBeenCalled();
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
it("undoes the same reservation if the body is cancelled during quota confirmation", async () => {
  const confirming = Promise.withResolvers<unknown>();
  const completion = Promise.withResolvers<unknown>();
  io.settle.mockImplementationOnce((lease) => {
    confirming.resolve(lease);
    return completion.promise;
  }).mockResolvedValueOnce({ status: "released", remaining: 3, resetAt: Date.now() + 60_000 });
  const reply = await send();
  const lease = await confirming.promise;
  const cancelled = reply.body!.cancel();
  completion.resolve({ status: "completed", remaining: 2, resetAt: Date.now() + 60_000 });
  await cancelled;
  expect(io.settle).toHaveBeenLastCalledWith(lease, false);
  expect(io.settle).toHaveBeenCalledTimes(2);
  expect(io.cost).toHaveBeenCalledExactlyOnceWith(expect.objectContaining({ inputTokens: 18, outputTokens: 7 }));
});

it.each(["copilot", "exam-library"])("%s checks the IP but skips the shared service counter and cost cap for exhausted quota", async (endpoint) => {
  io.reserve.mockResolvedValue({ status: "exhausted", remaining: 0, resetAt: Date.now() + 60_000 });
  const response = await send(endpoint);
  expect(await response.json()).toMatchObject({ error: "ai_daily_quota_exhausted" });
  expect(io.limit).toHaveBeenCalledTimes(1);
  expect(io.service).not.toHaveBeenCalled();
  expect(io.cap).not.toHaveBeenCalled();
  expect(io.generate).not.toHaveBeenCalled();
});

it.each(["copilot", "exam-library"])("%s releases a free slot when the shared service cap rejects the generation", async (endpoint) => {
  io.service.mockResolvedValue({ ok: false, scope: "service-global", reason: "hour", resetAt: Date.now() + 60_000 });
  io.settle.mockResolvedValue({ status: "released", remaining: 3, resetAt: Date.now() + 60_000 });
  const response = await send(endpoint);
  expect(response.status).toBe(429);
  expect(await response.json()).toMatchObject({ error: "rate_limited", scope: "service-global" });
  expect(io.reserve).toHaveBeenCalledBefore(io.service);
  expect(io.settle).toHaveBeenCalledExactlyOnceWith(expect.anything(), false);
  expect(io.cost).toHaveBeenCalledExactlyOnceWith(expect.objectContaining({ inputTokens: 0, outputTokens: 0 }));
  expect(io.generate).not.toHaveBeenCalled();
});
