import { afterEach, expect, it, vi } from "vitest";
import { createCopilotGeminiProvider } from "@/lib/copilot/gemini-flash38";
import type { StreamCompletion } from "@/lib/ai/provider";

afterEach(() => vi.unstubAllGlobals());

it.each(["SAFETY", "RECITATION", "OTHER"])("rejects partial output ending with %s", async (finishReason) => {
  const event = { candidates: [{ content: { parts: [{ text: "partial answer" }] }, finishReason }] };
  vi.stubGlobal("fetch", vi.fn(async () => new Response(`data: ${JSON.stringify(event)}\n\n`)));
  const chunks: string[] = [];
  const consume = async () => {
    for await (const chunk of createCopilotGeminiProvider("test-key").streamChat({
      system: "test", messages: [{ role: "user", content: "test" }], model: "gemini-3.8-flash",
    })) chunks.push(chunk);
  };
  await expect(consume()).rejects.toMatchObject({ info: { code: "truncated" } });
  expect(chunks).toEqual(["partial answer"]);
});

it.each([
  ["data: invalid-json\n\n", "malformed_stream"],
  ['data: {"candidates":"invalid"}\n\n', "malformed_stream"],
  ['data: {"candidates":[{"finishReason":"STOP"}]}\n\n', "no_text"],
  ['data: {"candidates":[{"content":{"parts":[{"text":"partial"}]}}]}\n\n', "truncated"],
])("classifies invalid or incomplete streams", async (payload, code) => {
  vi.stubGlobal("fetch", vi.fn(async () => new Response(payload)));
  const consume = async () => {
    for await (const chunk of createCopilotGeminiProvider("test-key").streamChat({
      system: "test", messages: [{ role: "user", content: "test" }], model: "gemini-3.8-flash",
    })) void chunk;
  };
  await expect(consume()).rejects.toMatchObject({ info: { code } });
});

it("discards provider error text and does not retry HTTP rejection", async () => {
  const fetchMock = vi.fn(async () => new Response(JSON.stringify({ error: { status: "PERMISSION_DENIED", message: "private-key-and-prompt" } }), { status: 403 }));
  vi.stubGlobal("fetch", fetchMock);
  const consume = async () => {
    for await (const chunk of createCopilotGeminiProvider("test-key").streamChat({
      system: "test", messages: [{ role: "user", content: "test" }], model: "gemini-3.8-flash",
    })) void chunk;
  };
  await expect(consume()).rejects.toMatchObject({ info: { code: "provider_config", httpStatus: 403 } });
  expect(fetchMock).toHaveBeenCalledOnce();
});

it("streams visible text, passes 3.8-safe config and reports billable thinking tokens", async () => {
  const events = [
    { candidates: [{ content: { parts: [{ text: "考慮中", thought: true }, { text: "回答" }] } }] },
    { candidates: [{ finishReason: "STOP" }], usageMetadata: { promptTokenCount: 100, candidatesTokenCount: 4, thoughtsTokenCount: 20, totalTokenCount: 124 } },
  ];
  const payload = events.map((event) => `data: ${JSON.stringify(event)}\r\n\r\n`).join("");
  const bytes = new TextEncoder().encode(payload);
  const fetchMock = vi.fn(async (_url: string, init: RequestInit) => {
    const body = JSON.parse(String(init.body));
    expect(body.generationConfig).toEqual({ maxOutputTokens: 800, thinkingConfig: { thinkingLevel: "low" } });
    expect(body.contents).toEqual([{ role: "user", parts: [{ text: "質問" }] }]);
    expect(init.signal).toBe(signal);
    return new Response(new ReadableStream({
      start(controller) {
        const split = payload.indexOf("\r\n\r\n") + 1;
        controller.enqueue(bytes.slice(0, 17));
        controller.enqueue(bytes.slice(17, split));
        controller.enqueue(bytes.slice(split));
        controller.close();
      },
    }));
  });
  vi.stubGlobal("fetch", fetchMock);
  const signal = new AbortController().signal;
  let completion: StreamCompletion | undefined;
  const chunks: string[] = [];
  for await (const chunk of createCopilotGeminiProvider("test-key").streamChat({
    system: "説明してください", messages: [{ role: "user", content: "質問" }],
    model: "gemini-3.8-flash", maxTokens: 800, signal,
    onComplete: (value) => { completion = value; },
  })) chunks.push(chunk);
  expect(chunks).toEqual(["回答"]);
  expect(completion).toEqual({ finishReason: "STOP", promptTokens: 100, outputTokens: 4, thoughtsTokens: 20, totalTokens: 124, truncated: false });
  expect(fetchMock).toHaveBeenCalledOnce();
  expect(String(fetchMock.mock.calls[0]?.[0])).toContain("gemini-3.8-flash:streamGenerateContent");
});

it("preserves the final visible event without a trailing SSE separator", async () => {
  const event = `data: ${JSON.stringify({ candidates: [{ content: { parts: [{ text: "終端" }] }, finishReason: "STOP" }] })}`;
  vi.stubGlobal("fetch", vi.fn(async () => new Response(new ReadableStream({
    start(controller) {
      controller.enqueue(new TextEncoder().encode(event));
      controller.close();
    },
  }))));
  const chunks: string[] = [];
  for await (const chunk of createCopilotGeminiProvider("test-key").streamChat({
    system: "test", messages: [{ role: "user", content: "test" }], model: "gemini-3.8-flash",
  })) chunks.push(chunk);
  expect(chunks).toEqual(["終端"]);
});

it.each([
  [{ usageMetadata: { promptTokenCount: -1 } }, "malformed_stream"],
  [{ usageMetadata: { totalTokenCount: "NaN" } }, "malformed_stream"],
  [{ error: { code: 403, status: "PERMISSION_DENIED", message: "private-content" } }, "provider_config"],
  [{ error: { status: "INTERNAL" } }, "temporary"],
  [{ error: { code: 999, status: "secret" } }, "general"],
])("classifies embedded SSE failures without exposing content", async (event, code) => {
  vi.stubGlobal("fetch", vi.fn(async () => new Response(`data: ${JSON.stringify(event)}\n\n`)));
  const consume = async () => {
    for await (const chunk of createCopilotGeminiProvider("test-key").streamChat({ system: "test", messages: [{ role: "user", content: "test" }], model: "gemini-3.8-flash" })) void chunk;
  };
  await expect(consume()).rejects.toMatchObject({ info: { code } });
});
