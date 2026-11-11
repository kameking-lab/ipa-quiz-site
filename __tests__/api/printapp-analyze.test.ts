// @vitest-environment node
import { beforeEach, describe, expect, it, vi } from "vitest";
import type { StreamChatParams } from "@/lib/ai/provider";
import { createMockProvider } from "@/lib/ai/providers/mock";
import { POST } from "@/app/api/printapp/analyze/route";
import { MAX_BODY_BYTES, MAX_IMAGE_BYTES } from "@/lib/printapp/schema";

const f = vi.hoisted(() => ({
  provider: vi.fn(), ip: vi.fn(), local: vi.fn(), cap: vi.fn(), cost: vi.fn(), stream: vi.fn(),
}));
vi.mock("@/lib/ai/provider", () => ({ getProvider: f.provider }));
vi.mock("@/lib/rate-limit", () => ({ checkIpRateLimit: f.ip }));
vi.mock("@/lib/rate-limit/server", () => ({ checkRateLimit: f.local, getClientIp: () => "192.0.2.5" }));
vi.mock("@/lib/ai/cost-guard", async (original) => ({
  ...await original<typeof import("@/lib/ai/cost-guard")>(), checkMonthlyCostCap: f.cap, recordAiCost: f.cost,
}));

const notice = { type: "お知らせ", fullText: "合成テスト文書", events: [{ eventName: "合成予定", eventDate: "" }] };
const image = { imageBase64: Buffer.from([137, 80, 78, 71, 13, 10, 26, 10, 0]).toString("base64"), mimeType: "image/png" };
function request(body: unknown = image, headers: Record<string, string> = {}) {
  return new Request("http://localhost/api/printapp/analyze", {
    method: "POST", headers: { "content-type": "application/json", "x-printapp-client": "printapp-mobile-v1", ...headers },
    body: JSON.stringify(body),
  });
}
beforeEach(() => {
  vi.resetAllMocks();
  f.provider.mockResolvedValue({ name: "gemini", streamChat: f.stream });
  f.ip.mockResolvedValue({ ok: true });
  f.local.mockResolvedValue({ ok: true });
  f.cap.mockResolvedValue({ allowed: true, reservation: { key: "ai_cost:2099-01", receipt: "synthetic", amount: 20 } });
  f.cost.mockResolvedValue(undefined);
  f.stream.mockImplementation(async function* (params: StreamChatParams) {
    yield JSON.stringify(notice);
    params.onComplete?.({ finishReason: "STOP", truncated: false, promptTokens: 1000, outputTokens: 200, thoughtsTokens: 50, totalTokens: 1250 });
  });
});

describe("printapp analysis API", () => {
  it("returns the existing notice JSON and awaits measured image cost settlement", async () => {
    let release!: () => void;
    f.cost.mockImplementation(() => new Promise<void>((resolve) => { release = resolve; }));
    let returned = false;
    const pending = POST(request()).then((response) => { returned = true; return response; });
    await vi.waitFor(() => expect(f.cost).toHaveBeenCalledOnce());
    expect(returned).toBe(false);
    expect(f.cost).toHaveBeenCalledWith(expect.objectContaining({ inputTokens: 1000, outputTokens: 250, label: "printapp-analyze", reservation: expect.any(Object) }));
    release();
    const response = await pending;
    expect(response.status).toBe(200);
    expect(response.headers.get("cache-control")).toBe("no-store");
    expect(await response.json()).toEqual({ ...notice, analysisMode: "ai", finishReason: "STOP" });
    expect(f.stream.mock.calls[0][0]).toMatchObject({ model: "gemini-2.5-flash-lite", messages: [{ images: [{ data: image.imageBase64, mimeType: image.mimeType }] }] });
    expect(f.ip).toHaveBeenCalledWith(expect.any(Request), "printapp-analyze", { requireKv: true });
    expect(f.cap).toHaveBeenCalledWith("gemini", expect.objectContaining({ inputTokens: 1_048_576, outputTokens: 32_768 }));
  });

  it("preserves problems, choices, image regions and redaction boxes", async () => {
    const result = { type: "テスト", summaryTitle: "合成", subject: "", date: "", problems: [{ text: "合成問題", correctAnswer: "A", choices: ["A", "B"], explanation: "合成説明", imageRegion: { ymin: 0, xmin: 0, ymax: 1, xmax: 1 } }], redaction_boxes: [{ x_percent: 1, y_percent: 2, width_percent: 3, height_percent: 4 }] };
    f.stream.mockImplementation(async function* (params: StreamChatParams) {
      yield JSON.stringify(result); params.onComplete?.({ finishReason: "STOP", truncated: false });
    });
    expect(await (await POST(request())).json()).toEqual({ ...result, analysisMode: "ai", finishReason: "STOP" });
    expect(f.cost).not.toHaveBeenCalled(); // Retain reservation on missing usage.
  });

  it("uses the real keyless mock provider for image, text and reanalysis", async () => {
    f.provider.mockResolvedValue(createMockProvider());
    for (const input of [image, { text: "合成のお知らせ" }, { ...image, userPrompt: "予定名を短く" }]) {
      const response = await POST(request(input));
      expect(response.status).toBe(200);
      expect(await response.json()).toMatchObject({ type: "お知らせ", analysisMode: "mock", finishReason: "STOP" });
    }
    expect(f.cost).not.toHaveBeenCalled();
    expect(f.local).toHaveBeenCalledTimes(3);
  });

  it("selects the text prompt and carries additional image instructions", async () => {
    await POST(request({ text: "  合成テキスト  " }));
    expect(f.stream.mock.calls[0][0]).toMatchObject({ system: expect.stringContaining("テキストを分析"), messages: [{ content: expect.stringContaining("合成テキスト") }] });
    expect(f.stream.mock.calls[0][0].messages[0].images).toBeUndefined();
    await POST(request({ ...image, userPrompt: "予定をすべて抽出" }));
    expect(f.stream.mock.calls[1][0].messages[0].content).toContain("予定をすべて抽出");
  });

  it.each(["cost_capped", "budget_unavailable"])("blocks %s before provider work", async (reason) => {
    f.cap.mockResolvedValue({ allowed: false, reason });
    const response = await POST(request());
    expect(response.status).toBe(503);
    expect(await response.json()).toMatchObject({ code: reason });
    expect(f.stream).not.toHaveBeenCalled();
  });

  it.each(["minute", "hour", "daily", "unavailable"])("blocks the %s IP guard", async (reason) => {
    f.ip.mockResolvedValue({ ok: false, reason, resetAt: Date.now() + 60_000 });
    const response = await POST(request());
    expect(response.status).toBe(reason === "unavailable" ? 503 : 429);
    expect(response.headers.get("retry-after")).toBeTruthy();
    expect(f.stream).not.toHaveBeenCalled();
  });

  it("rejects missing app identification and non-JSON bodies", async () => {
    expect((await POST(request(image, { "x-printapp-client": "" }))).status).toBe(403);
    expect((await POST(request(image, { "content-type": "text/plain" }))).status).toBe(415);
    expect(f.provider).not.toHaveBeenCalled();
  });

  it("rejects image and declared or streamed body overflow before AI work", async () => {
    expect((await POST(request({ ...image, imageBase64: Buffer.alloc(MAX_IMAGE_BYTES + 1).toString("base64") }))).status).toBe(413);
    expect((await POST(request(image, { "content-length": String(MAX_BODY_BYTES + 1) }))).status).toBe(413);
    expect((await POST(request({ text: "x".repeat(MAX_BODY_BYTES) }))).status).toBe(413);
    expect(f.stream).not.toHaveBeenCalled();
  });

  it.each([{ text: "" }, { text: "x".repeat(20_001) }, { ...image, userPrompt: "x".repeat(2001) }, { ...image, mimeType: "text/html" }, { ...image, imageBase64: "!!!!" }, { ...image, imageBase64: "YWJjZA==" }, { ...image, text: "mixed" }, { text: "valid", model: "untrusted" }])("rejects invalid input %#", async (input) => {
    expect((await POST(request(input))).status).toBe(400);
    expect(f.stream).not.toHaveBeenCalled();
  });

  it.each(["MAX_TOKENS", "SAFETY", undefined])("rejects incomplete output (%s) while accounting for spent tokens", async (finishReason) => {
    f.stream.mockImplementation(async function* (params: StreamChatParams) {
      yield JSON.stringify(notice);
      params.onComplete?.({ finishReason, truncated: finishReason === "MAX_TOKENS", promptTokens: 100, outputTokens: 200 });
    });
    expect((await POST(request())).status).toBe(502);
    expect(f.cost).toHaveBeenCalledOnce();
  });

  it("rejects malformed result and retains reservation on a failed stream", async () => {
    f.stream.mockImplementation(async function* () { yield "partial"; throw new Error("synthetic SDK error"); });
    const response = await POST(request());
    expect(response.status).toBe(502);
    expect(await response.text()).not.toContain("synthetic SDK error");
    expect(f.cap).toHaveBeenCalledOnce();
    expect(f.cost).not.toHaveBeenCalled();
    f.stream.mockImplementation(async function* (params: StreamChatParams) { yield '{"type":"unknown"}'; params.onComplete?.({ finishReason: "STOP", truncated: false }); });
    expect((await POST(request())).status).toBe(502);
  });
});
