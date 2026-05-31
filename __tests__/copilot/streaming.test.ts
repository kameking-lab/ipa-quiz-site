import { describe, it, expect, vi, beforeEach } from "vitest";

// streaming.ts の createCopilotResponseStream は /api/copilot の本文ストリームを
// 組み立てる純インフラ関数（AI コパイロット B軸の出力経路）。プロバイダの
// チャンクをそのまま流し、成功時のみ RAG 引用フッターを末尾付与し、失敗時は
// 日本語フォールバック文を流す。onComplete はコスト計上用に「フッターを除いた
// 出力文字数」を1回だけ通知する。これらの契約が崩れると、引用が二重化したり
// コスト計上がズレたり、エラー時にユーザーへ無言で切れる。崩れたら落ちる契約
// として現挙動を回帰固定する（source 無変更・監査で実害バグ無し）。

const captureException = vi.fn();
vi.mock("@/lib/monitoring/sentry", () => ({
  captureException: (...args: unknown[]) => {
    captureException(...args);
    return Promise.resolve();
  },
}));

// import 後にモックを効かせるため動的 import
import { createCopilotResponseStream } from "@/lib/copilot/streaming";
import type { LLMProvider } from "@/lib/ai/provider";

function chunkProvider(chunks: string[]): LLMProvider {
  return {
    name: "mock",
    async *streamChat() {
      for (const c of chunks) yield c;
    },
  };
}

function throwingProvider(err: unknown): LLMProvider {
  return {
    name: "mock",
    async *streamChat(): AsyncIterable<string> {
      throw err;
    },
  };
}

async function readAll(stream: ReadableStream<Uint8Array>): Promise<string> {
  const reader = stream.getReader();
  const decoder = new TextDecoder();
  let out = "";
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    if (value) out += decoder.decode(value, { stream: true });
  }
  out += decoder.decode();
  return out;
}

function baseInput(overrides: Record<string, unknown> = {}) {
  return {
    provider: chunkProvider(["A", "B", "C"]),
    system: "sys",
    userMessages: [{ role: "user" as const, content: "hi" }],
    model: "gemini-2.5-flash-lite",
    maxTokens: 100,
    citationFooter: "",
    hasGrounding: false,
    ...overrides,
  };
}

beforeEach(() => {
  captureException.mockClear();
});

describe("createCopilotResponseStream — 正常系", () => {
  it("チャンクをそのまま結合して流す", async () => {
    const out = await readAll(createCopilotResponseStream(baseInput()));
    expect(out).toBe("ABC");
  });

  it("hasGrounding=true かつ footer ありなら末尾に引用フッターを付与", async () => {
    const out = await readAll(
      createCopilotResponseStream(
        baseInput({ hasGrounding: true, citationFooter: "\n\n[出典]" }),
      ),
    );
    expect(out).toBe("ABC\n\n[出典]");
  });

  it("hasGrounding=false なら footer があっても付与しない", async () => {
    const out = await readAll(
      createCopilotResponseStream(
        baseInput({ hasGrounding: false, citationFooter: "\n\n[出典]" }),
      ),
    );
    expect(out).toBe("ABC");
  });

  it("hasGrounding=true でも footer が空なら付与しない", async () => {
    const out = await readAll(
      createCopilotResponseStream(
        baseInput({ hasGrounding: true, citationFooter: "" }),
      ),
    );
    expect(out).toBe("ABC");
  });

  it("onComplete はフッターを除いた出力文字数で1回だけ呼ばれる", async () => {
    const onComplete = vi.fn();
    await readAll(
      createCopilotResponseStream(
        baseInput({
          hasGrounding: true,
          citationFooter: "\n\n[出典]",
          onComplete,
        }),
      ),
    );
    expect(onComplete).toHaveBeenCalledTimes(1);
    expect(onComplete).toHaveBeenCalledWith(3); // "ABC" のみ（フッター除外）
  });
});

describe("createCopilotResponseStream — エラー系", () => {
  it("プロバイダが throw したら [エラー] フォールバック文を流し captureException を呼ぶ", async () => {
    const out = await readAll(
      createCopilotResponseStream(
        baseInput({ provider: throwingProvider(new Error("boom")) }),
      ),
    );
    expect(out).toContain("[エラー]");
    expect(captureException).toHaveBeenCalledTimes(1);
  });

  it("エラー時も onComplete は呼ばれる（途中出力ぶんを計上）", async () => {
    const onComplete = vi.fn();
    await readAll(
      createCopilotResponseStream(
        baseInput({
          provider: throwingProvider(new Error("boom")),
          onComplete,
        }),
      ),
    );
    expect(onComplete).toHaveBeenCalledTimes(1);
    expect(onComplete).toHaveBeenCalledWith(0); // throw 前に何も出ていない
  });
});
