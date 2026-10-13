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
import { CITATION_UNVERIFIED_NOTICE } from "@/lib/copilot/citations";

const SOURCE_FOOTER = "\n---\n**参照資料（引用番号に対応）**\n- [1] [問題](/q/ip/2024-cbt/am/q1)";

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
    expect(out).toBe("ABC" + CITATION_UNVERIFIED_NOTICE);
  });

  it("hasGrounding=true かつ footer ありなら末尾に引用フッターを付与", async () => {
    const out = await readAll(
      createCopilotResponseStream(
        baseInput({ provider: chunkProvider(["ABC [", "1]"]), hasGrounding: true, citationFooter: SOURCE_FOOTER }),
      ),
    );
    expect(out).toBe("ABC [1]" + SOURCE_FOOTER);
  });

  it("hasGrounding=false なら footer があっても付与しない", async () => {
    const out = await readAll(
      createCopilotResponseStream(
        baseInput({ hasGrounding: false, citationFooter: "\n\n[出典]" }),
      ),
    );
    expect(out).toBe("ABC" + CITATION_UNVERIFIED_NOTICE);
  });

  it("hasGrounding=true でも footer が空なら付与しない", async () => {
    const out = await readAll(
      createCopilotResponseStream(
        baseInput({ hasGrounding: true, citationFooter: "" }),
      ),
    );
    expect(out).toBe("ABC" + CITATION_UNVERIFIED_NOTICE);
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
    expect(onComplete).toHaveBeenCalledWith(3, undefined, { text: "ABC" + CITATION_UNVERIFIED_NOTICE, complete: true }); // "ABC" のみ（フッター除外）
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
    expect(onComplete).toHaveBeenCalledWith(0, undefined, { text: expect.any(String), complete: false }); // throw 前に何も出ていない
  });
});

it("出力上限による切断を表示し、実測使用量を計上側に引き渡す", async () => {
  const usage = { finishReason: "MAX_TOKENS", truncated: true, promptTokens: 120, outputTokens: 4, thoughtsTokens: 8 };
  const provider: LLMProvider = {
    name: "gemini",
    async *streamChat(params) {
      yield "途中";
      params.onComplete?.(usage);
    },
  };
  const onComplete = vi.fn();
  const out = await readAll(createCopilotResponseStream(baseInput({ provider, onComplete })));
  expect(out).toContain("[応答の途中終了]");
  expect(onComplete).toHaveBeenCalledExactlyOnceWith(2, usage, { text: out, complete: false });
});


describe("createCopilotResponseStream cancellation accounting", () => {
  function abortableProvider(streamChat: ReturnType<typeof vi.fn>): LLMProvider {
    return { name: "mock", streamChat };
  }

  it("calls the provider and completion once when the client aborts before any chunk", async () => {
    const clientAbort = new AbortController();
    const streamChat = vi.fn(async function* (params: { signal?: AbortSignal }): AsyncIterable<string> {
      if (!params.signal?.aborted) {
        await new Promise<void>((resolve) => params.signal?.addEventListener("abort", () => resolve(), { once: true }));
      }
      throw new DOMException("Aborted", "AbortError");
    });
    const onComplete = vi.fn();
    const stream = createCopilotResponseStream(baseInput({
      provider: abortableProvider(streamChat), clientSignal: clientAbort.signal, onComplete,
    }));
    clientAbort.abort();
    await readAll(stream);
    expect(streamChat).toHaveBeenCalledTimes(1);
    expect(onComplete).toHaveBeenCalledExactlyOnceWith(0, undefined, { text: "", complete: false });
    expect(captureException).not.toHaveBeenCalled();
  });

  it("calls completion once after timeout with partial output", async () => {
    const streamChat = vi.fn(async function* (params: { signal?: AbortSignal }): AsyncIterable<string> {
      yield "A";
      await new Promise<void>((resolve) => params.signal?.addEventListener("abort", () => resolve(), { once: true }));
      throw new DOMException("Aborted", "AbortError");
    });
    const onComplete = vi.fn();
    const out = await readAll(createCopilotResponseStream(baseInput({
      provider: abortableProvider(streamChat), timeoutMs: 20, onComplete,
    })));
    expect(out).toContain("[タイムアウト]");
    expect(streamChat).toHaveBeenCalledTimes(1);
    expect(onComplete).toHaveBeenCalledExactlyOnceWith(1, undefined, { text: out, complete: false });
    expect(captureException).not.toHaveBeenCalled();
  });

  it("calls completion once when the reader cancels after the first chunk", async () => {
    const streamChat = vi.fn(async function* (params: { signal?: AbortSignal }): AsyncIterable<string> {
      yield "A";
      await new Promise<void>((resolve) => params.signal?.addEventListener("abort", () => resolve(), { once: true }));
      throw new DOMException("Aborted", "AbortError");
    });
    const onComplete = vi.fn();
    const stream = createCopilotResponseStream(baseInput({
      provider: abortableProvider(streamChat), onComplete,
    }));
    const reader = stream.getReader();
    expect(new TextDecoder().decode((await reader.read()).value)).toBe("A");
    await reader.cancel();
    await vi.waitFor(() => expect(onComplete).toHaveBeenCalledTimes(1));
    expect(streamChat).toHaveBeenCalledTimes(1);
    expect(onComplete).toHaveBeenCalledWith(1, undefined, { text: "A", complete: false });
  });
});


it("does not mark a provider safety stop as cacheable", async () => {
  const provider: LLMProvider = {
    name: "gemini",
    async *streamChat(params) {
      yield "partial";
      params.onComplete?.({ finishReason: "SAFETY", truncated: false });
    },
  };
  const onComplete = vi.fn();
  const out = await readAll(createCopilotResponseStream(baseInput({ provider, onComplete })));
  expect(onComplete).toHaveBeenCalledExactlyOnceWith(7,
    { finishReason: "SAFETY", truncated: false }, { text: out, complete: false });
});


it.each(["", "   \n "])
  ("does not cache a STOP response with no substantive model text (%j)", async (body) => {
    const provider: LLMProvider = {
      name: "gemini",
      async *streamChat(params) {
        if (body) yield body;
        params.onComplete?.({ finishReason: "STOP", truncated: false });
      },
    };
    const onComplete = vi.fn();
    const out = await readAll(createCopilotResponseStream(baseInput({ provider, onComplete })));
    expect(onComplete).toHaveBeenCalledExactlyOnceWith(body.length,
      { finishReason: "STOP", truncated: false }, { text: out, complete: false });
  });
