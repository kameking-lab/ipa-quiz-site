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
    return captureException(...args) ?? Promise.resolve();
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
    expect(onComplete).toHaveBeenCalledWith(3, undefined, "success"); // "ABC" のみ（フッター除外）
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
    expect(onComplete).toHaveBeenCalledWith(0, undefined, "failed"); // throw 前に何も出ていない
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
  expect(onComplete).toHaveBeenCalledExactlyOnceWith(2, usage, "truncated");
});

it.each([401, 403])("marks HTTP %i rejection and skips the accounting completion callback", async (httpStatus) => {
  const { CopilotProviderError, parseCopilotFailure } = await import("@/lib/copilot/errors");
  const onComplete = vi.fn();
  const out = await readAll(createCopilotResponseStream(baseInput({ provider: throwingProvider(new CopilotProviderError({ code: "provider_config", httpStatus, providerCode: "UNAUTHENTICATED" })), onComplete })));
  expect(parseCopilotFailure(out).error?.code).toBe("provider_config");
  expect(onComplete).not.toHaveBeenCalled();
  expect(captureException.mock.calls[0]?.[0]).toMatchObject({ info: { code: "provider_config", httpStatus } });
});
it("sanitizes unknown exception contents before monitoring and preserves accounting", async () => {
  const onComplete = vi.fn();
  const out = await readAll(createCopilotResponseStream(baseInput({ provider: throwingProvider(new Error("private-prompt-key")), onComplete })));
  expect(out).not.toContain("private-prompt-key");
  expect(String(captureException.mock.calls[0]?.[0])).not.toContain("private-prompt-key");
  expect(onComplete).toHaveBeenCalledOnce();
});

it("keeps conservative accounting when provider 5xx may follow generation work", async () => {
  const { CopilotProviderError } = await import("@/lib/copilot/errors");
  const onComplete = vi.fn();
  await readAll(createCopilotResponseStream(baseInput({
    provider: throwingProvider(new CopilotProviderError({ code: "temporary", httpStatus: 503 })),
    onComplete,
  })));
  expect(onComplete).toHaveBeenCalledExactlyOnceWith(0, undefined, "failed");
});

it("sends the failure marker immediately and closes after bounded monitoring wait", async () => {
  const { parseCopilotFailure } = await import("@/lib/copilot/errors");
  vi.useFakeTimers();
  try {
    captureException.mockImplementationOnce(() => new Promise<void>(() => {}));
    const onComplete = vi.fn();
    const reader = createCopilotResponseStream(baseInput({ provider: throwingProvider(new Error("private-provider-error")), onComplete })).getReader();
    const first = await reader.read();
    const text = new TextDecoder().decode(first.value);
    expect(parseCopilotFailure(text).error?.code).toBe("general");
    expect(text).not.toContain("private-provider-error");
    expect(first.done).toBe(false);
    let closed = false;
    const end = reader.read().then((value) => { closed = value.done; return value; });
    await vi.advanceTimersByTimeAsync(1999);
    expect(closed).toBe(false);
    expect(onComplete).not.toHaveBeenCalled();
    await vi.advanceTimersByTimeAsync(1);
    expect((await end).done).toBe(true);
    expect(onComplete).toHaveBeenCalledExactlyOnceWith(0, undefined, "failed");
    expect(String(captureException.mock.calls[0]?.[0])).not.toContain("private-provider-error");
    reader.releaseLock();
  } finally { vi.useRealTimers(); }
});

it("does not treat received usage or STOP as success if the stream later fails", async () => {
  const usage = { finishReason: "STOP", promptTokens: 10, outputTokens: 3, truncated: false };
  const provider: LLMProvider = {
    name: "gemini",
    async *streamChat(params) {
      yield "partial";
      params.onComplete?.(usage);
      throw new Error("synthetic failure after metadata");
    },
  };
  const onComplete = vi.fn();
  await readAll(createCopilotResponseStream(baseInput({ provider, onComplete })));
  expect(onComplete).toHaveBeenCalledExactlyOnceWith(7, usage, "failed");
});

it.each(["timeout", "cancelled"] as const)("reports %s independently from cost accounting", async (outcome) => {
  vi.useFakeTimers();
  try {
    const client = new AbortController();
    const provider: LLMProvider = {
      name: "gemini",
      async *streamChat(params) {
        yield "partial";
        await new Promise<void>((_resolve, reject) => {
          params.signal?.addEventListener("abort", () => reject(new DOMException("fixture", "AbortError")), { once: true });
        });
      },
    };
    const onComplete = vi.fn();
    const response = readAll(createCopilotResponseStream(baseInput({ provider, onComplete, clientSignal: client.signal, timeoutMs: 100 })));
    await vi.advanceTimersByTimeAsync(1);
    if (outcome === "cancelled") client.abort();
    else await vi.advanceTimersByTimeAsync(100);
    const text = await response;
    expect(onComplete).toHaveBeenCalledExactlyOnceWith(7, undefined, outcome);
    expect(text.includes('"code":"timeout"')).toBe(outcome === "timeout");
  } finally { vi.useRealTimers(); }
});

it("keeps a known auth rejection when metadata reading encounters the upstream deadline", async () => {
  const { CopilotProviderError, parseCopilotFailure } = await import("@/lib/copilot/errors");
  vi.useFakeTimers();
  try {
    const provider: LLMProvider = {
      name: "gemini",
      async *streamChat(params): AsyncIterable<string> {
        await new Promise<void>((resolve) => params.signal?.addEventListener("abort", () => resolve(), { once: true }));
        throw new CopilotProviderError({ code: "provider_config", httpStatus: 401 });
      },
    };
    const onComplete = vi.fn();
    const result = readAll(createCopilotResponseStream(baseInput({ provider, onComplete, timeoutMs: 100 })));
    await vi.advanceTimersByTimeAsync(100);
    expect(parseCopilotFailure(await result).error?.code).toBe("provider_config");
    expect(onComplete).not.toHaveBeenCalled();
  } finally { vi.useRealTimers(); }
});

it("reports a typed incomplete stream as truncated, matching the user-facing diagnostic", async () => {
  const { CopilotProviderError } = await import("@/lib/copilot/errors");
  const onComplete = vi.fn();
  await readAll(createCopilotResponseStream(baseInput({ provider: throwingProvider(new CopilotProviderError({ code: "truncated" })), onComplete })));
  expect(onComplete).toHaveBeenCalledExactlyOnceWith(0, undefined, "truncated");
});
