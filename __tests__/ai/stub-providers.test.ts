import { describe, it, expect } from "vitest";
import { createClaudeProvider } from "@/lib/ai/providers/claude";
import { createOpenAIProvider } from "@/lib/ai/providers/openai";

/**
 * claude / openai プロバイダは「Gemini からの乗り換え用スタブ」（§5・§10 で
 * プロバイダ変更は承認必須）。実装されるまでは streamChat が**黙って空を返す
 * のではなく、明示的に throw して誤配線に気付かせる**契約を持つ。
 * （throw を外すと後続の `yield ""` に落ちて空応答を素通りさせてしまう。）
 * 崩れると、未設定のプロバイダに切り替わっても AI 応答が空のまま無言で壊れる。
 */

const drain = async (
  factory: () => { streamChat: (p: never) => AsyncIterable<string> },
): Promise<void> => {
  const provider = factory();
  const iterator = provider.streamChat({
    system: "",
    messages: [{ role: "user", content: "用語を説明して" }],
  } as never)[Symbol.asyncIterator]();
  await iterator.next();
};

describe("claude provider スタブ", () => {
  it("name は \"claude\"", () => {
    expect(createClaudeProvider().name).toBe("claude");
  });

  it("streamChat は空を返さず stub である旨を throw する", async () => {
    await expect(drain(createClaudeProvider)).rejects.toThrow(/stub/i);
  });
});

describe("openai provider スタブ", () => {
  it("name は \"openai\"", () => {
    expect(createOpenAIProvider().name).toBe("openai");
  });

  it("streamChat は空を返さず stub である旨を throw する", async () => {
    await expect(drain(createOpenAIProvider)).rejects.toThrow(/stub/i);
  });
});
