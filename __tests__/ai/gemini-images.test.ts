// @vitest-environment node
import { afterEach, expect, it, vi } from "vitest";
import { createGeminiProvider } from "@/lib/ai/providers/gemini";

const calls = vi.hoisted(() => ({ history: vi.fn(), send: vi.fn() }));
vi.mock("@google/generative-ai", () => ({
  GoogleGenerativeAI: class {
    getGenerativeModel() {
      return { startChat: (options: unknown) => {
        calls.history(options);
        return { sendMessageStream: async (...args: unknown[]) => {
          calls.send(...args);
          return {
            stream: (async function* () { yield { text: () => '{"ok":true}' }; })(),
            response: Promise.resolve({ candidates: [{ finishReason: "STOP" }], usageMetadata: { promptTokenCount: 123, candidatesTokenCount: 45 } }),
          };
        } };
      } };
    }
  },
}));
afterEach(() => { vi.unstubAllEnvs(); vi.clearAllMocks(); });

it("forwards current and historical inline images and the abort signal through the Gemini adapter", async () => {
  vi.stubEnv("GEMINI_API_KEY", "synthetic-test-key");
  const image = { mimeType: "image/png", data: "synthetic-base64" };
  const controller = new AbortController();
  const complete = vi.fn();
  let result = "";
  for await (const chunk of createGeminiProvider().streamChat({
    system: "synthetic system", messages: [
      { role: "user", content: "old", images: [image] }, { role: "assistant", content: "reply" },
      { role: "user", content: "current", images: [image] },
    ], signal: controller.signal, onComplete: complete,
  })) result += chunk;
  expect(result).toBe('{"ok":true}');
  expect(calls.history).toHaveBeenCalledWith({ history: [
    { role: "user", parts: [{ text: "old" }, { inlineData: image }] },
    { role: "model", parts: [{ text: "reply" }] },
  ] });
  expect(calls.send).toHaveBeenCalledWith([{ text: "current" }, { inlineData: image }], { signal: controller.signal });
  expect(complete).toHaveBeenCalledWith(expect.objectContaining({ promptTokens: 123, outputTokens: 45, finishReason: "STOP", truncated: false }));
});

it("preserves plain text calls for the existing AI routes", async () => {
  vi.stubEnv("GEMINI_API_KEY", "synthetic-test-key");
  for await (const chunk of createGeminiProvider().streamChat({ system: "sys", messages: [{ role: "user", content: "text" }] })) expect(chunk).toBeTruthy();
  expect(calls.send).toHaveBeenCalledWith("text", { signal: undefined });
});
