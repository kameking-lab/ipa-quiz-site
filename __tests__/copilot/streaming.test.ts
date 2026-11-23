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

it.each([undefined, "SAFETY"])("keeps a partial free answer out of the response when completion is %s", async finishReason => {
  const provider: LLMProvider = {
    name: "gemini",
    async *streamChat(params) {
      yield "partial";
      params.onComplete?.({ finishReason, truncated: false });
    },
  };
  const onComplete = vi.fn();
  const body = await readAll(createCopilotResponseStream(baseInput({ provider, bufferAnswer: true, onComplete, requireCompleteAnswer: true })));
  expect(body).not.toContain("partial");
  expect(body).toContain("[エラー]");
  expect(onComplete).toHaveBeenCalledExactlyOnceWith(7, { finishReason, truncated: false }, false);
});

it("delivers the completed free answer before quota settlement finishes", async () => {
  const settlement = Promise.withResolvers<void>();
  const onComplete = vi.fn(() => settlement.promise);
  const reader = createCopilotResponseStream(baseInput({ bufferAnswer: true, onComplete })).getReader();
  expect(new TextDecoder().decode((await reader.read()).value)).toBe("ABC");
  settlement.reject(new Error("KV unavailable"));
  expect(new TextDecoder().decode((await reader.read()).value)).toBe(CITATION_UNVERIFIED_NOTICE);
  expect(await reader.read()).toMatchObject({ done: true });
  expect(onComplete).toHaveBeenCalledExactlyOnceWith(3, undefined, true);
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
    expect(onComplete).toHaveBeenCalledWith(3, undefined, true); // "ABC" のみ（フッター除外）
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
    expect(onComplete).toHaveBeenCalledWith(0, undefined, false); // throw 前に何も出ていない
  });
});

it.each([false, true])("出力上限までの本文を表示して計上する（本文のバッファリング: %s）", async bufferAnswer => {
  const usage = { finishReason: "MAX_TOKENS", truncated: true, promptTokens: 120, outputTokens: 4, thoughtsTokens: 8 };
  const provider: LLMProvider = {
    name: "gemini",
    async *streamChat(params) {
      yield "途中";
      params.onComplete?.(usage);
    },
  };
  const onComplete = vi.fn();
  const out = await readAll(createCopilotResponseStream(baseInput({
    provider, onComplete, bufferAnswer, requireCompleteAnswer: true,
  })));
  expect(out).toMatch(/^途中\n\n\[応答の途中終了\].*回答は途中まで/);
  expect(onComplete).toHaveBeenCalledExactlyOnceWith(2, usage, true);
});

it.each([
  { chunk: "答", buffered: false, answered: true },
  { chunk: "", buffered: false, answered: false },
  { chunk: "答", buffered: true, answered: false },
])("中断前に配信した本文で利用を確定する %o", async ({ chunk, buffered, answered }) => {
  const waitingForAbort = Promise.withResolvers<void>();
  const provider: LLMProvider = {
    name: "gemini",
    async *streamChat({ signal }) {
      if (chunk) yield chunk;
      const abort = new Promise<never>((_, reject) => {
        signal?.addEventListener("abort", () => reject(signal.reason), { once: true });
      });
      waitingForAbort.resolve();
      await abort;
    },
  };
  const client = new AbortController();
  const onComplete = vi.fn();
  const reader = createCopilotResponseStream(baseInput({
    provider, clientSignal: client.signal, onComplete, bufferAnswer: buffered,
  })).getReader();
  await waitingForAbort.promise;
  if (answered) expect(new TextDecoder().decode((await reader.read()).value)).toBe(chunk);
  client.abort();
  expect(await reader.read()).toMatchObject({ done: true });
  expect(onComplete).toHaveBeenCalledExactlyOnceWith(chunk.length, undefined, answered);
});

it("本文の配信後もタイムアウトした回は確定しない", async () => {
  const provider: LLMProvider = {
    name: "gemini",
    async *streamChat({ signal }) {
      yield "答";
      await new Promise<never>((_, reject) => {
        signal?.addEventListener("abort", () => reject(signal.reason), { once: true });
      });
    },
  };
  const onComplete = vi.fn();
  const out = await readAll(createCopilotResponseStream(baseInput({ provider, onComplete, timeoutMs: 10 })));
  expect(out).toMatch(/^答\n\n\[タイムアウト\]/);
  expect(onComplete).toHaveBeenCalledExactlyOnceWith(1, undefined, false);
});
