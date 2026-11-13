// @vitest-environment node
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import type { StreamChatParams, StreamCompletion } from "@/lib/ai/provider";
import { COPILOT_MODEL } from "@/lib/copilot/model";

const { streamChat } = vi.hoisted(() => ({ streamChat: vi.fn() }));
vi.mock("@/lib/copilot/gemini-flash38", () => ({
  createCopilotGeminiProvider: () => ({ name: "gemini", streamChat }),
}));
vi.mock("@/lib/ai/provider", async importOriginal => ({
  ...await importOriginal<typeof import("@/lib/ai/provider")>(),
  getProvider: async () => ({ name: "mock", streamChat }),
}));
vi.mock("@/lib/ai/normal-use-server", () => ({ checkAiNormalUse: async () => ({ ok: true }) }));
vi.mock("@/lib/monitoring/sentry", () => ({ captureException: vi.fn() }));
vi.mock("@/lib/questions/load", () => ({
  getQuestionById: () => ({
    id: "ap-2023h-am-q1", exam: "ap", session: "am", year: 2023, season: "spring",
    qNumber: 1, type: "multiple-choice", category: "テクノロジ", topicTags: [],
    difficulty: 1, question: "問題文", choices: { ア: "選択肢" }, answer: "ア",
    explanation: "解説", hasImage: false, sourcePdfUrl: "https://example.com/paper.pdf", license: "IPA-public",
  }),
}));
vi.mock("@/lib/copilot/rag-pipeline", () => ({
  runCopilotRAGPipeline: async () => ({
    ragResult: { passages: [], topScore: 0, rerankerUsed: "none" },
    ragDirective: null, ragContextBlock: "", citationFooter: "",
    citationsHeader: "", relatedHeader: "", hasGrounding: false,
  }),
}));
vi.mock("@/lib/exam-library-catalog", () => ({
  findExamEntry: () => ({ label: "衛生管理者", subject: "労働衛生", pdfUrl: "https://example.com/paper.pdf" }),
}));
vi.mock("@/lib/exam-library-papers", () => ({
  loadExamPaper: () => [{
    id: "lckohyo-TEST01-q1", number: 1, text: "問題文", images: [],
    correctChoice: 2, choiceCount: 5, answerAuthority: "official",
  }],
}));

const completion: StreamCompletion = {
  finishReason: "STOP", promptTokens: 100, outputTokens: 20,
  thoughtsTokens: 5, totalTokens: 125, truncated: false,
};
const routes = [
  { path: "/api/copilot", questionId: "ap-2023h-am-q1", prefix: "[copilot]" },
  { path: "/api/copilot/exam-library", questionId: "lckohyo-TEST01-q1", prefix: "[copilot/exam-library]" },
] as const;

beforeEach(() => {
  vi.stubEnv("GEMINI_API_KEY", "private-provider-key");
  vi.stubEnv("KV_REST_API_URL", "https://kv.example.invalid");
  vi.stubEnv("KV_REST_API_TOKEN", "private-kv-token");
  vi.stubEnv("COPILOT_RAG_ENABLED", "false");
  vi.stubEnv("MOBILE_IAP_ENABLED", "false");
  streamChat.mockReset().mockImplementation(async function* (input: StreamChatParams) {
    yield "private-response-text";
    input.onComplete?.(completion);
  });
  vi.spyOn(console, "info").mockImplementation(() => {});
});

afterEach(() => {
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

async function request(route: typeof routes[number]) {
  const { POST } = route.path === "/api/copilot"
    ? await import("@/app/api/copilot/route")
    : await import("@/app/api/copilot/exam-library/route");
  return POST(new Request(`https://example.com${route.path}`, {
    method: "POST",
    headers: { "content-type": "application/json", "x-forwarded-for": "10.91.0.1" },
    body: JSON.stringify({
      question: { id: route.questionId },
      examId: "lckohyo-TEST01", questionId: route.questionId,
      messages: [{ role: "user", content: "private-user-message" }],
    }),
  }));
}

function installKv(settle: () => Promise<Response>) {
  vi.stubGlobal("fetch", vi.fn(async (_url: string, init?: RequestInit) => {
    const command = JSON.parse(String(init?.body));
    if (String(command[1]).includes("SEC1_RESERVE")) return Response.json({ result: [1, String(Number(command[5]) + 1)] });
    expect(String(command[1])).toContain("SEC1_SETTLE");
    return settle();
  }));
}

/** The copilot route adds a timing breakdown (durations only, no content); other routes omit it. */
function serverTimingOf(call: unknown[] | undefined): { serverTiming?: string } {
  const meta = call?.[1] as { serverTiming?: unknown } | undefined;
  if (meta?.serverTiming === undefined) return {};
  expect(meta.serverTiming).toMatch(/^pre;dur=\d+, rag;dur=\d+$/);
  return { serverTiming: meta.serverTiming as string };
}

describe.each(routes)("$path completion evidence", route => {
  it.each(["recorded", "failed"] as const)("awaits settlement and logs %s without exposing content or cost values", async status => {
    let release!: () => void;
    let started!: () => void;
    const pending = new Promise<void>(resolve => { release = resolve; });
    const settlementStarted = new Promise<void>(resolve => { started = resolve; });
    installKv(async () => {
      started();
      await pending;
      return status === "recorded" ? Response.json({ result: "0.123" }) : Response.json({ error: "private-kv-error" });
    });
    const response = await request(route);
    expect(response.status).toBe(200);
    let closed = false;
    const body = response.text().then(text => { closed = true; return text; });
    await settlementStarted;
    // Give response completion a full event-loop turn to expose fire-and-forget.
    await new Promise(resolve => setTimeout(resolve, 0));
    expect(closed).toBe(false);
    expect(console.info).not.toHaveBeenCalledWith(`${route.prefix} cost`, expect.anything());
    release();
    expect(await body).toContain("private-response-text");
    // Only this route's evidence lines; the shared cost-guard logs its own amount-only line.
    const routeCalls = vi.mocked(console.info).mock.calls.filter(([label]) => String(label).startsWith(`${route.prefix} `));
    expect(routeCalls).toEqual([
      [`${route.prefix} completed`, {
        questionId: route.questionId, model: COPILOT_MODEL,
        finishReason: "STOP", promptTokens: 100, outputTokens: 20, thoughtsTokens: 5, totalTokens: 125,
        ...serverTimingOf(routeCalls[0]),
      }],
      [`${route.prefix} cost`, { questionId: route.questionId, model: COPILOT_MODEL, status }],
    ]);
  });

  it("does not invent completion metadata after an interrupted stream", async () => {
    installKv(async () => Response.json({ result: "0.123" }));
    streamChat.mockImplementation(async function* () {
      yield "private-partial-response";
      throw new Error("private-upstream-error");
    });
    const response = await request(route);
    expect(await response.text()).toContain("private-partial-response");
    const completedCall = vi.mocked(console.info).mock.calls.find(([label]) => label === `${route.prefix} completed`);
    expect(console.info).toHaveBeenCalledWith(`${route.prefix} completed`, {
      ...serverTimingOf(completedCall),
      questionId: route.questionId, model: COPILOT_MODEL,
      finishReason: undefined, promptTokens: undefined, outputTokens: undefined,
      thoughtsTokens: undefined, totalTokens: undefined,
    });
    expect(console.info).toHaveBeenCalledWith(`${route.prefix} cost`, {
      questionId: route.questionId, model: COPILOT_MODEL, status: "recorded",
    });
  });

  it("does not claim accounting for the free mock provider", async () => {
    vi.stubEnv("GEMINI_API_KEY", "");
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);
    const response = await request(route);
    expect(response.status).toBe(200);
    await response.text();
    expect(console.info).not.toHaveBeenCalled();
    expect(fetchMock).not.toHaveBeenCalled();
  });
});
