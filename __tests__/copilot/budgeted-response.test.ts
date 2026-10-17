import { beforeEach, describe, expect, it, vi } from "vitest";
import type { LLMProvider, StreamCompletion } from "@/lib/ai/provider";
import { COPILOT_MODEL } from "@/lib/copilot/model";

const mocks = vi.hoisted(() => ({
  begin: vi.fn(),
  complete: vi.fn(),
  release: vi.fn(),
  reserve: vi.fn(),
  record: vi.fn(),
  estimate: vi.fn(),
}));

vi.mock("@/lib/copilot/request-cache", () => ({
  beginCopilotRequest: mocks.begin,
  completeCopilotRequest: mocks.complete,
  releaseCopilotRequest: mocks.release,
}));
vi.mock("@/lib/ai/cost-guard", () => ({
  estimatePromptTokenBudget: mocks.estimate,
  reserveAiCost: mocks.reserve,
  recordAiCost: mocks.record,
}));

import { createBudgetedCopilotResponse } from "@/lib/copilot/budgeted-response";

const ticket = { key: "test-key", token: "token", value: "pending" };
const reservation = { key: "reservation" };

function makeProvider(usage: StreamCompletion | null = {
  promptTokens: 100,
  totalTokens: 115,
  finishReason: "STOP",
  truncated: false,
}): { provider: LLMProvider; calls: ReturnType<typeof vi.fn> } {
  const calls = vi.fn();
  const provider: LLMProvider = {
    name: "gemini",
    async *streamChat(params) {
      calls(params);
      yield "回答本文";
      if (usage) params.onComplete?.(usage);
    },
  };
  return { provider, calls };
}

function input(provider: LLMProvider, request = new Request("http://localhost/api/copilot", {
  headers: { "x-forwarded-for": "10.1.1.1" },
})) {
  return {
    request, provider, system: "IPA 原題と出典", userMessages: [{ role: "user" as const, content: "理由は？" }],
    model: COPILOT_MODEL, maxTokens: 1200, citationFooter: "", hasGrounding: false,
    timeoutMs: 35_000, headers: { "X-Provider": provider.name, "X-Model": COPILOT_MODEL },
  };
}

beforeEach(() => {
  vi.clearAllMocks();
  mocks.begin.mockResolvedValue({ kind: "claimed", ticket });
  mocks.reserve.mockResolvedValue({ allowed: true, reservation, totalJpy: 1, capJpy: 50_000 });
  mocks.complete.mockResolvedValue(true);
  mocks.release.mockResolvedValue(true);
  mocks.estimate.mockReturnValue(200);
});

describe("budgeted copilot response", () => {
  it("reserves before one provider call and settles confirmed usage once before close", async () => {
    const { provider, calls } = makeProvider();
    const response = await createBudgetedCopilotResponse(input(provider));
    expect(mocks.begin).toHaveBeenCalledOnce();
    expect(mocks.begin.mock.calls[0]?.[0].system).toBe("IPA 原題と出典");
    expect(mocks.reserve).toHaveBeenCalledWith({ tier: expect.any(String), inputTokens: 200, outputTokens: 1200, label: "copilot" });
    expect(await response.text()).toContain("回答本文");
    expect(calls).toHaveBeenCalledOnce();
    expect(mocks.reserve).toHaveBeenCalledOnce();
    expect(mocks.record).toHaveBeenCalledOnce();
    expect(mocks.record).toHaveBeenCalledWith({ tier: expect.any(String), inputTokens: 100, outputTokens: 15, label: "copilot", reservation });
    expect(mocks.complete).toHaveBeenCalledOnce();
    expect(mocks.complete.mock.calls[0]?.[1]).toContain("回答本文");
  });

  it("reuses cached exact response without reservation or provider call", async () => {
    const { provider, calls } = makeProvider();
    mocks.begin.mockResolvedValue({ kind: "cached", text: "先の回答と出典" });
    const response = await createBudgetedCopilotResponse(input(provider));
    expect(await response.text()).toBe("先の回答と出典");
    expect(calls).not.toHaveBeenCalled();
    expect(mocks.reserve).not.toHaveBeenCalled();
    expect(mocks.record).not.toHaveBeenCalled();
  });

  it("rejects pending and unavailable claims before cost and provider", async () => {
    const { provider, calls } = makeProvider();
    mocks.begin.mockResolvedValueOnce({ kind: "pending" }).mockResolvedValueOnce({ kind: "unavailable" });
    expect((await createBudgetedCopilotResponse(input(provider))).status).toBe(409);
    expect((await createBudgetedCopilotResponse(input(provider))).status).toBe(503);
    expect(mocks.reserve).not.toHaveBeenCalled();
    expect(calls).not.toHaveBeenCalled();
  });

  it.each(["cap", "unavailable"] as const)("releases pre-provider claim on %s reservation denial", async (reason) => {
    const { provider, calls } = makeProvider();
    mocks.reserve.mockResolvedValue({ allowed: false, reason, totalJpy: 50_000, capJpy: 50_000 });
    const response = await createBudgetedCopilotResponse(input(provider));
    expect(response.status).toBe(503);
    expect((await response.json()).error).toBe(reason === "cap" ? "cost_capped" : "cost_guard_unavailable");
    expect(mocks.release).toHaveBeenCalledOnce();
    expect(mocks.release).toHaveBeenCalledWith(ticket);
    expect(calls).not.toHaveBeenCalled();
  });

  it("keeps reservation and skips cache when completion metadata is missing", async () => {
    const { provider } = makeProvider(null);
    const response = await createBudgetedCopilotResponse(input(provider));
    await response.text();
    expect(mocks.record).not.toHaveBeenCalled();
    expect(mocks.complete).not.toHaveBeenCalled();
  });

  it("keeps reservation with invalid token counts but caches a confirmed complete answer", async () => {
    const { provider } = makeProvider({ promptTokens: -1, totalTokens: 110, finishReason: "STOP", truncated: false });
    const response = await createBudgetedCopilotResponse(input(provider));
    await response.text();
    expect(mocks.record).not.toHaveBeenCalled();
    expect(mocks.complete).toHaveBeenCalledOnce();
  });

  it.each([
    { promptTokens: 100, totalTokens: 100, finishReason: "STOP", truncated: false },
    { promptTokens: 100, outputTokens: 0, thoughtsTokens: 0, finishReason: "STOP", truncated: false },
    { promptTokens: 100, totalTokens: 90, outputTokens: 10, thoughtsTokens: 1, finishReason: "STOP", truncated: false },
  ])("keeps the full reservation when nonempty output contradicts reported usage: %j", async (usage) => {
    const { provider } = makeProvider(usage);
    const response = await createBudgetedCopilotResponse(input(provider));
    expect(await response.text()).toContain("回答本文");
    expect(mocks.record).not.toHaveBeenCalled();
    expect(mocks.complete).toHaveBeenCalledOnce();
  });

  it("keeps reservation and skips cache on interrupted or truncated generation", async () => {
    const { provider } = makeProvider({ promptTokens: 100, totalTokens: 110, finishReason: "MAX_TOKENS", truncated: true });
    const response = await createBudgetedCopilotResponse(input(provider));
    await response.text();
    expect(mocks.record).not.toHaveBeenCalled();
    expect(mocks.complete).not.toHaveBeenCalled();
    expect(mocks.release).not.toHaveBeenCalled();
  });

  it("keeps the reservation after a client abort, even if upstream later reports STOP", async () => {
    const controller = new AbortController();
    const provider: LLMProvider = {
      name: "gemini",
      async *streamChat(params) {
        yield "途中まで";
        await new Promise<void>((resolve) => params.signal?.addEventListener("abort", () => resolve(), { once: true }));
        params.onComplete?.({ promptTokens: 100, totalTokens: 105, finishReason: "STOP", truncated: false });
      },
    };
    const request = new Request("http://localhost/api/copilot");
    Object.defineProperty(request, "signal", { value: controller.signal });
    const response = await createBudgetedCopilotResponse(input(provider, request));
    const reader = response.body!.getReader();
    expect((await reader.read()).done).toBe(false);
    controller.abort();
    while (!(await reader.read()).done) { /* drain after abort */ }
    expect(mocks.record).not.toHaveBeenCalled();
    expect(mocks.complete).not.toHaveBeenCalled();
    expect(mocks.release).not.toHaveBeenCalled();
  });

  it("changes cache identity when generation budget or source footer changes", async () => {
    const { provider } = makeProvider();
    mocks.begin.mockResolvedValue({ kind: "pending" });
    const base = input(provider);
    await createBudgetedCopilotResponse(base);
    await createBudgetedCopilotResponse({ ...base, maxTokens: 1800 });
    await createBudgetedCopilotResponse({ ...base, citationFooter: "IPA 原本への出典" });
    const cacheModels = mocks.begin.mock.calls.map((call) => call[0].model as string);
    expect(new Set(cacheModels).size).toBe(3);
  });

  it("does not touch cache or budget for mock responses", async () => {
    const { provider, calls } = makeProvider();
    provider.name = "mock";
    const response = await createBudgetedCopilotResponse(input(provider));
    expect(await response.text()).toContain("回答本文");
    expect(calls).toHaveBeenCalledOnce();
    expect(mocks.begin).not.toHaveBeenCalled();
    expect(mocks.reserve).not.toHaveBeenCalled();
  });
});
