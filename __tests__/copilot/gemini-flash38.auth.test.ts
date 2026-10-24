import { afterEach, expect, it, vi } from "vitest";
import { createCopilotGeminiProvider } from "@/lib/copilot/gemini-flash38";

// Synthetic values only. No environment lookup, real credential or network call.
const fixtureKey = "synthetic-auth-contract-fixture";
const params = {
  model: "gemini-3.8-flash", system: "synthetic system",
  messages: [{ role: "user" as const, content: "synthetic question" }],
};
async function consume(key: string) {
  const chunks: string[] = [];
  for await (const chunk of createCopilotGeminiProvider(key).streamChat(params)) chunks.push(chunk);
  return chunks;
}
function success() {
  return new Response('data: {"candidates":[{"content":{"parts":[{"text":"fixture answer"}]},"finishReason":"STOP"}]}\n\n');
}
afterEach(() => vi.unstubAllGlobals());

it("uses the official REST endpoint and API-key header without putting credentials in URL or JSON", async () => {
  const fetchMock = vi.fn(async (input: string | URL | Request, init?: RequestInit) => {
    const request = new Request(input, init);
    const url = new URL(request.url);
    expect(url.origin).toBe("https://generativelanguage.googleapis.com");
    expect(url.pathname).toBe("/v1beta/models/gemini-3.8-flash:streamGenerateContent");
    expect([...url.searchParams.entries()]).toEqual([["alt", "sse"]]);
    expect(request.method).toBe("POST");
    expect(request.headers.get("x-goog-api-key")).toBe(fixtureKey);
    expect(request.headers.get("content-type")).toBe("application/json");
    expect(request.headers.has("authorization")).toBe(false);
    const body = await request.text();
    expect(body).not.toContain(fixtureKey);
    expect(JSON.parse(body)).toEqual({
      systemInstruction: { parts: [{ text: "synthetic system" }] },
      contents: [{ role: "user", parts: [{ text: "synthetic question" }] }],
      generationConfig: { maxOutputTokens: 1200, thinkingConfig: { thinkingLevel: "low" } },
    });
    return success();
  });
  vi.stubGlobal("fetch", fetchMock);
  await expect(consume(fixtureKey)).resolves.toEqual(["fixture answer"]);
  expect(fetchMock).toHaveBeenCalledOnce();
});

it.each([" ", "\t", "\r\n", " \t\r\n"])("native Fetch normalizes outer HTTP whitespace (%j)", async (space) => {
  vi.stubGlobal("fetch", vi.fn(async (input: string | URL | Request, init?: RequestInit) => {
    const request = new Request(input, init);
    expect(request.headers.get("x-goog-api-key")).toBe(fixtureKey);
    return success();
  }));
  await expect(consume(space + fixtureKey + space)).resolves.toEqual(["fixture answer"]);
});

it("shows that a truthy whitespace-only setting can produce an empty header", async () => {
  const syntheticSetting = " \t\r\n ";
  expect(Boolean(syntheticSetting)).toBe(true);
  vi.stubGlobal("fetch", vi.fn(async (input: string | URL | Request, init?: RequestInit) => {
    expect(new Request(input, init).headers.get("x-goog-api-key")).toBe("");
    return new Response("{}", { status: 401 });
  }));
  await expect(consume(syntheticSetting)).rejects.toMatchObject({ info: { code: "provider_config", httpStatus: 401, retryable: false } });
});

it.each([`"${fixtureKey}"`, `${fixtureKey}\\n`])("does not silently remove quotes or escaped characters from a setting", async (value) => {
  vi.stubGlobal("fetch", vi.fn(async (input: string | URL | Request, init?: RequestInit) => {
    expect(new Request(input, init).headers.get("x-goog-api-key")).toBe(value);
    return new Response("{}", { status: 401 });
  }));
  await expect(consume(value)).rejects.toMatchObject({ info: { code: "provider_config", httpStatus: 401 } });
});

it("rejects an embedded newline in native Fetch before an upstream HTTP response", async () => {
  vi.stubGlobal("fetch", vi.fn(async (input: string | URL | Request, init?: RequestInit) => {
    new Request(input, init);
    throw new Error("unreachable");
  }));
  await expect(consume("synthetic\nfixture")).rejects.toBeInstanceOf(TypeError);
});

it("classifies upstream 401 without retrying or retaining the upstream message", async () => {
  const fetchMock = vi.fn(async () => new Response(JSON.stringify({
    error: { code: 401, status: "UNAUTHENTICATED", message: "synthetic-sensitive-detail" },
  }), { status: 401 }));
  vi.stubGlobal("fetch", fetchMock);
  let caught: unknown;
  try { await consume(fixtureKey); } catch (error) { caught = error; }
  expect(caught).toMatchObject({ info: { code: "provider_config", httpStatus: 401, providerCode: "UNAUTHENTICATED", retryable: false } });
  expect(String(caught)).not.toContain("synthetic-sensitive-detail");
  expect(JSON.stringify(caught)).not.toContain("synthetic-sensitive-detail");
  expect(fetchMock).toHaveBeenCalledOnce();
});

it("reads a bounded structured auth reason but discards arbitrary provider fields", async () => {
  vi.stubGlobal("fetch", vi.fn(async () => new Response(JSON.stringify({ error: {
    status: "UNAUTHENTICATED", message: "synthetic-private-message",
    details: [{ "@type": "type.googleapis.com/google.rpc.ErrorInfo", domain: "googleapis.com", reason: "API_KEY_INVALID", metadata: { key: "synthetic-private-value" } }],
  } }), { status: 401 })));
  await expect(consume(fixtureKey)).rejects.toMatchObject({ info: { providerCode: "UNAUTHENTICATED", providerReason: "API_KEY_INVALID", httpStatus: 401 } });
});

it("cancels oversized non-2xx bodies and retains only the HTTP status", async () => {
  const cancel = vi.fn();
  const payload = JSON.stringify({ error: { status: "UNAUTHENTICATED", message: "x".repeat(16_384) } });
  vi.stubGlobal("fetch", vi.fn(async () => new Response(new ReadableStream<Uint8Array>({
    start(controller) { controller.enqueue(new TextEncoder().encode(payload)); },
    cancel,
  }), { status: 401 })));
  await expect(consume(fixtureKey)).rejects.toMatchObject({ info: { code: "provider_config", httpStatus: 401, retryable: false } });
  expect(cancel).toHaveBeenCalledOnce();
});

it.each(["<html>synthetic private error</html>", ""])('preserves the HTTP status for a non-JSON error body', async (payload) => {
  vi.stubGlobal("fetch", vi.fn(async () => new Response(payload, { status: 401 })));
  await expect(consume(fixtureKey)).rejects.toMatchObject({ info: { code: "provider_config", httpStatus: 401, retryable: false } });
});

it("classifies a known 401 within one second even if the provider error body stalls", async () => {
  vi.useFakeTimers();
  try {
    const cancel = vi.fn();
    vi.stubGlobal("fetch", vi.fn(async () => new Response(new ReadableStream<Uint8Array>({ cancel }), { status: 401 })));
    const rejected = expect(consume(fixtureKey)).rejects.toMatchObject({ info: { code: "provider_config", httpStatus: 401 } });
    await vi.advanceTimersByTimeAsync(1000);
    await rejected;
    expect(cancel).toHaveBeenCalledOnce();
  } finally { vi.useRealTimers(); }
});
