import { performance } from "node:perf_hooks";
import { setImmediate as nextTurn, setTimeout as delay } from "node:timers/promises";
import { afterEach, expect, it, vi } from "vitest";
import { POST } from "@/app/api/copilot/route";
import { checkAiNormalUse } from "@/lib/ai/normal-use-server";
import { buildIndex } from "@/lib/copilot/retriever";

const loadIndex = vi.hoisted(() => vi.fn());
const question = {
  id: "ap-2023h-am-q1",
  exam: "ap",
  year: 2023,
  season: "spring",
  session: "am",
  qNumber: 1,
  type: "multiple-choice",
  question: "SQLの問",
  category: "データベース",
  topicTags: ["SQL"],
  choices: { ア: "SELECT" },
  answer: "ア",
  explanation: "SQLの解説",
};

vi.mock("@/lib/copilot/source-runtime", () => ({
  createRuntimeCopilotSource: () => ({
    kind: "runtime",
    getQuestion: () => question,
    index: loadIndex,
  }),
}));
vi.mock("@/lib/ai/normal-use-server", () => ({ checkAiNormalUse: vi.fn() }));

function request() {
  return new Request("http://localhost/api/copilot", {
    method: "POST",
    body: JSON.stringify({
      question: { id: question.id },
      messages: [{ role: "user", content: "SQLのポイントを説明して" }],
    }),
  });
}

afterEach(() => {
  vi.clearAllMocks();
  vi.unstubAllEnvs();
});

it("allows a cold request to finish KV admission before loading its RAG index", async () => {
  vi.stubEnv("COPILOT_RAG_ENABLED", "true");
  let admitted = false;
  // Model a healthy KV response with a scaled-down deadline and a blocking
  // cold index, so the reproduction does not depend on a remote KV or timers
  // running while JavaScript is blocked.
  vi.mocked(checkAiNormalUse).mockImplementationOnce(async () => {
    const deadline = performance.now() + 250;
    await delay(10);
    if (performance.now() >= deadline) return { ok: false, reason: "unavailable", resetAt: 0 };
    admitted = true;
    return { ok: true };
  });
  loadIndex.mockImplementation(() => {
    if (!admitted) {
      const until = performance.now() + 350;
      while (performance.now() < until) { /* synchronous cold-index work */ }
    }
    return buildIndex([]);
  });

  const response = await POST(request());
  expect(response.status).toBe(200);
  expect(loadIndex).toHaveBeenCalledOnce();
  await response.body?.cancel();
});

it("stays fail-closed and skips RAG when KV is unavailable", async () => {
  vi.stubEnv("COPILOT_RAG_ENABLED", "true");
  vi.mocked(checkAiNormalUse).mockResolvedValueOnce({ ok: false, reason: "unavailable", resetAt: 0 });
  const response = await POST(request());
  expect(response.status).toBe(503);
  expect(await response.json()).toMatchObject({ error: "rate_limit_unavailable" });
  await nextTurn();
  expect(loadIndex).not.toHaveBeenCalled();
});
