// @vitest-environment node
import { afterEach, expect, it, vi } from "vitest";
import { GoogleGenerativeAIFetchError } from "@google/generative-ai";
import { createGeminiProvider } from "@/lib/ai/providers/gemini";
import { providerErrorDiagnostic } from "@/lib/ai/provider-error";

afterEach(() => { vi.unstubAllGlobals(); vi.unstubAllEnvs(); vi.restoreAllMocks(); });

const image = { mimeType: "image/png", data: "iVBORw0KGgoAAAANSUhEUgAAAAEAAAAB" };
function sdkFetch(payload: unknown) {
  vi.stubEnv("GEMINI_API_KEY", "synthetic-test-key");
  const fetcher = vi.fn().mockResolvedValue(new Response(`data: ${JSON.stringify(payload)}\n\n`, {
    headers: { "Content-Type": "text/event-stream" },
  }));
  vi.stubGlobal("fetch", fetcher);
  return fetcher;
}

it("serializes image, JSON config, thinking and token limits through the actual Google SDK", async () => {
  const fetcher = sdkFetch({ candidates: [{ content: { role: "model", parts: [{ text: '{"ok":true}' }] }, finishReason: "STOP" }],
    usageMetadata: { promptTokenCount: 258, candidatesTokenCount: 8, totalTokenCount: 266 } });
  const controller = new AbortController(), complete = vi.fn();
  let output = "";
  for await (const chunk of createGeminiProvider().streamChat({
    model: "gemini-2.5-flash-lite", system: "synthetic system", maxTokens: 32768,
    responseMimeType: "application/json", thinkingBudget: 0,
    messages: [{ role: "user", content: "synthetic notice", images: [image] }],
    signal: controller.signal, onComplete: complete,
  })) output += chunk;
  expect(fetcher).toHaveBeenCalledOnce();
  const [url, options] = fetcher.mock.calls[0];
  expect(url).toBe("https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-lite:streamGenerateContent?alt=sse");
  expect(JSON.parse(options.body)).toEqual({
    safetySettings: [],
    systemInstruction: { role: "system", parts: [{ text: "synthetic system" }] },
    contents: [{ role: "user", parts: [{ text: "synthetic notice" }, { inlineData: image }] }],
    generationConfig: { maxOutputTokens: 32768, temperature: 0.7, responseMimeType: "application/json", thinkingConfig: { thinkingBudget: 0 } },
  });
  expect(output).toBe('{"ok":true}');
  expect(complete).toHaveBeenCalledWith(expect.objectContaining({ finishReason: "STOP", truncated: false, promptTokens: 258, outputTokens: 8 }));
  controller.abort();
  expect(options.signal.aborted).toBe(true);
});

it("keeps safety completion metadata when text extraction throws", async () => {
  vi.spyOn(console, "warn").mockImplementation(() => {});
  sdkFetch({ candidates: [{ finishReason: "SAFETY" }], usageMetadata: { promptTokenCount: 258, totalTokenCount: 258 } });
  const complete = vi.fn();
  const run = async () => {
    for await (const chunk of createGeminiProvider().streamChat({ system: "sys", messages: [{ role: "user", content: "text" }], onComplete: complete })) void chunk;
  };
  await expect(run()).rejects.toThrow();
  expect(complete).toHaveBeenCalledWith(expect.objectContaining({ finishReason: "SAFETY", promptTokens: 258 }));
});

it("reports empty candidates without inventing STOP or measured output usage", async () => {
  vi.spyOn(console, "warn").mockImplementation(() => {});
  sdkFetch({ promptFeedback: { blockReason: "SAFETY" }, candidates: [], usageMetadata: { promptTokenCount: 258 } });
  const complete = vi.fn();
  await expect((async () => {
    for await (const chunk of createGeminiProvider().streamChat({ system: "sys", messages: [{ role: "user", content: "text" }], onComplete: complete })) void chunk;
  })()).rejects.toThrow();
  expect(complete).toHaveBeenCalledWith(expect.objectContaining({ finishReason: undefined, outputTokens: undefined }));
});

it("logs Google HTTP diagnostics without input, credentials, details, URLs or stack", () => {
  const error = new GoogleGenerativeAIFetchError(
    'Error fetching from https://example.invalid/?key=synthetic-key: [400 Bad Request] Invalid image: ' + image.data
      + ' pasted private words API_KEY=synthetic-key "quoted private text" [{"metadata":{"key":"hidden-detail"}}]',
    400, "Bad Request", [{ metadata: { key: "hidden-detail" } }],
  );
  const diagnostic = providerErrorDiagnostic(error, [image.data, "pasted private words"]);
  expect(diagnostic).toMatchObject({ kind: "google_http", status: 400, googleMessage: expect.stringContaining("Invalid image:") });
  const logged = JSON.stringify(diagnostic);
  for (const value of [image.data, "private words", "synthetic-key", "hidden-detail", "quoted private text", "https://", "stack"]) expect(logged).not.toContain(value);
});

it("never logs arbitrary internal error messages", () => {
  expect(providerErrorDiagnostic(new Error("private input"))).toEqual({ kind: "internal" });
  expect(providerErrorDiagnostic(new DOMException("private input", "TimeoutError"))).toEqual({ kind: "TimeoutError" });
});
