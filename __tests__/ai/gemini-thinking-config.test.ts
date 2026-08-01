import { describe, it, expect, beforeEach, vi } from "vitest";

import { gradingThinkingBudget, PRO_MIN_THINKING_BUDGET } from "@/lib/ai/provider";
import type { StreamCompletion } from "@/lib/ai/provider";

/**
 * Gemini 2.5 系は「思考トークン」が maxOutputTokens を消費し、かつ出力として
 * 課金される。Preview 実測（2026-07-28, gemini-2.5-flash, maxOutputTokens 1500）:
 *   thoughtsTokenCount 1091 / candidatesTokenCount 400 / finishReason MAX_TOKENS
 * 採点 JSON が improvements の途中で切れ、課金だけ発生して簡易判定に落ちていた。
 *
 * ここでは「thinkingConfig を渡していること」と「finishReason / usageMetadata を
 * 呼び出し側に返していること」を固定する。どちらかが欠けると再発する。
 */

const state = vi.hoisted(() => ({
  generationConfig: undefined as Record<string, unknown> | undefined,
  finishReason: "STOP" as string,
  thoughtsTokenCount: undefined as number | undefined,
}));

vi.mock("@google/generative-ai", () => ({
  GoogleGenerativeAI: class {
    getGenerativeModel(opts: { generationConfig?: Record<string, unknown> }) {
      state.generationConfig = opts.generationConfig;
      return {
        startChat: () => ({
          sendMessageStream: async () => ({
            stream: (async function* () {
              yield { text: () => '{"ok":true}' };
            })(),
            response: Promise.resolve({
              candidates: [{ finishReason: state.finishReason }],
              usageMetadata: {
                promptTokenCount: 1975,
                candidatesTokenCount: 400,
                totalTokenCount: 2375,
                thoughtsTokenCount: state.thoughtsTokenCount,
              },
            }),
          }),
        }),
      };
    }
  },
}));

async function run(
  params: Partial<{ thinkingBudget: number; responseMimeType: string }>,
): Promise<{ text: string; completion?: StreamCompletion }> {
  const { createGeminiProvider } = await import("@/lib/ai/providers/gemini");
  const provider = createGeminiProvider();
  const box: { value?: StreamCompletion } = {};
  let text = "";
  for await (const chunk of provider.streamChat({
    system: "sys",
    messages: [{ role: "user", content: "hi" }],
    model: "gemini-2.5-flash",
    maxTokens: 3000,
    onComplete: (c) => {
      box.value = c;
    },
    ...params,
  })) {
    text += chunk;
  }
  return { text, completion: box.value };
}

beforeEach(() => {
  process.env.GEMINI_API_KEY = "test-key";
  state.generationConfig = undefined;
  state.finishReason = "STOP";
  state.thoughtsTokenCount = undefined;
});

describe("gemini provider — thinking / structured output", () => {
  it("forwards thinkingBudget 0 as generationConfig.thinkingConfig (思考オフ)", async () => {
    await run({ thinkingBudget: 0 });
    expect(state.generationConfig?.thinkingConfig).toEqual({ thinkingBudget: 0 });
  });

  it("forwards a non-zero thinkingBudget verbatim", async () => {
    await run({ thinkingBudget: 128 });
    expect(state.generationConfig?.thinkingConfig).toEqual({ thinkingBudget: 128 });
  });

  it("omits thinkingConfig entirely when no budget is given", async () => {
    await run({});
    expect(state.generationConfig).not.toHaveProperty("thinkingConfig");
  });

  it("forwards responseMimeType so the model returns bare JSON", async () => {
    await run({ responseMimeType: "application/json" });
    expect(state.generationConfig?.responseMimeType).toBe("application/json");
  });

  it("reports finishReason and token usage on completion", async () => {
    const { completion } = await run({ thinkingBudget: 0 });
    expect(completion).toMatchObject({
      finishReason: "STOP",
      promptTokens: 1975,
      outputTokens: 400,
      truncated: false,
    });
  });

  it("flags truncated=true and surfaces thoughtsTokens when MAX_TOKENS is hit", async () => {
    state.finishReason = "MAX_TOKENS";
    state.thoughtsTokenCount = 1091;
    const { completion } = await run({});
    expect(completion?.truncated).toBe(true);
    expect(completion?.finishReason).toBe("MAX_TOKENS");
    // 思考が上限を食い潰した、という直接の証拠。呼び出し側の開示・ログの根拠。
    expect(completion?.thoughtsTokens).toBe(1091);
  });
});

describe("gradingThinkingBudget", () => {
  it("disables thinking for flash-tier grading models", () => {
    expect(gradingThinkingBudget("gemini-2.5-flash")).toBe(0);
    expect(gradingThinkingBudget("gemini-2.5-flash-lite")).toBe(0);
  });

  it("uses the minimum budget for pro, which cannot disable thinking", () => {
    // 2.5 Pro に thinkingBudget: 0 を渡すと API エラーになる（最小 128）。
    expect(gradingThinkingBudget("gemini-2.5-pro")).toBe(PRO_MIN_THINKING_BUDGET);
    expect(PRO_MIN_THINKING_BUDGET).toBe(128);
  });
});
