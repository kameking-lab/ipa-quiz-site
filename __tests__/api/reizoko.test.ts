// @vitest-environment node
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { POST } from "@/app/api/reizoko/[action]/route";
import type { StreamChatParams } from "@/lib/ai/provider";
import { createGeminiProvider } from "@/lib/ai/providers/gemini";
import { COPILOT_MODEL } from "@/lib/copilot/model";
import { inputSchemas, MAX_BODY_BYTES, MAX_IMAGE_BYTES, type Action } from "@/lib/reizoko/schema";

const f = vi.hoisted(() => ({ provider: vi.fn(), ip: vi.fn(), cap: vi.fn(), cost: vi.fn(), stream: vi.fn() }));
vi.mock("@/lib/ai/provider", () => ({ getProvider: f.provider }));
vi.mock("@/lib/rate-limit", () => ({ checkIpRateLimit: f.ip }));
vi.mock("@/lib/ai/cost-guard", async (original) => ({
  ...await original<typeof import("@/lib/ai/cost-guard")>(), checkMonthlyCostCap: f.cap, recordAiCost: f.cost,
}));

const proposal = { title: "にんじんスープ", desc: "にんじんのスープ", efficiency_note: "薄く切る", calorie_kcal: 100 };
const recipe = { ingredients_basic: ["にんじん 1本"], ingredients_optional: [], prep_steps: [{ step: 1, desc: "薄く切る" }],
  cook_steps: [{ step: 2, desc: "水を加え煮る" }], schedule_advice: "先に切る", calorie_kcal: 100 };
const image = { image_base64: Buffer.from([137, 80, 78, 71, 13, 10, 26, 10, 0]).toString("base64"), prompt: "食材を読む" };
const baseRecipe = { menu_title: "スープ", final_ingredients: ["にんじん"], people: 2, burners: 2, time_limit: "30分", allergies: ["卵", "乳"] };
const cases: { label: string; action: Action; input: Record<string, unknown>; output: unknown; invalid: unknown }[] = [
  { label: "献立", action: "generate_proposals", input: { fridge_pool: [], must_use: ["にんじん"], allergies: ["卵", "乳"] }, output: { メイン: [proposal] }, invalid: { fridge_pool: [] } },
  { label: "カテゴリ再提案", action: "regenerate_category", input: { category: "メイン", fridge_pool: [], must_use: ["にんじん"], people: 2, time_limit: "30分", allergies: ["卵", "乳"] }, output: [proposal], invalid: { category: "メイン" } },
  { label: "レシピ", action: "generate_recipe", input: baseRecipe, output: recipe, invalid: { ...baseRecipe, people: "2" } },
  { label: "詳細レシピ", action: "generate_detailed_recipe", input: { original_recipe_json: recipe, final_ingredients: recipe.ingredients_basic, allergies: ["卵", "乳"] }, output: recipe, invalid: { original_recipe_json: [] } },
  { label: "買い物", action: "generate_shopping_list", input: { menu_name: "スープ", people: 2, burners: 2, time_limit: "30分", allergies: ["卵", "乳"] }, output: { menu_name: "スープ", main_items: ["にんじん 1本"], seasonings: ["塩 少々"], advice: "必要な分だけ買う" }, invalid: { menu_name: "スープ" } },
  { label: "追加食材", action: "generate_arrange_suggestions", input: { menu_title: "スープ", current_ingredients: ["にんじん"], allergies: ["卵", "乳"] }, output: ["じゃがいも 1個"], invalid: { menu_title: "スープ", current_ingredients: [1] } },
  { label: "画像", action: "analyze_ingredients_image", input: image, output: { ingredients: ["にんじん"] }, invalid: { ...image, image_base64: "YWJjZA==" } },
  { label: "仕込みモード", action: "generate_recipe", input: { ...baseRecipe, is_prep_only: true, original_recipe_json: recipe, instruction_override: "仕込みと仕上げを分ける" }, output: recipe, invalid: { ...baseRecipe, is_prep_only: "true" } },
];
function request(action: string, body: unknown, headers: Record<string, string> = {}) {
  return new Request(`http://localhost/api/reizoko/${action}`, { method: "POST",
    headers: { "content-type": "application/json", "x-reizoko-client": "reizoko-chef-v1", ...headers }, body: JSON.stringify(body) });
}
function post(action: string, body: unknown, headers?: Record<string, string>) {
  return POST(request(action, body, headers), { params: Promise.resolve({ action }) });
}
function respond(output: unknown, finishReason: string | undefined = "STOP") {
  f.stream.mockImplementation(async function* (params: StreamChatParams) {
    yield typeof output === "string" ? output : JSON.stringify(output);
    params.onComplete?.({ finishReason, truncated: finishReason === "MAX_TOKENS", promptTokens: 100, outputTokens: 200, thoughtsTokens: 50, totalTokens: 380 });
  });
}
beforeEach(() => {
  vi.resetAllMocks();
  vi.spyOn(console, "info").mockImplementation(() => {});
  vi.spyOn(console, "error").mockImplementation(() => {});
  f.provider.mockResolvedValue({ name: "gemini", streamChat: f.stream });
  f.ip.mockResolvedValue({ ok: true });
  f.cap.mockResolvedValue({ allowed: true, reservation: { key: "ai_cost:2099-01", receipt: "synthetic", amount: 20 } });
  f.cost.mockResolvedValue(undefined);
});
afterEach(() => { vi.unstubAllGlobals(); vi.unstubAllEnvs(); vi.restoreAllMocks(); });

describe.each(cases)("reizoko $label", ({ action, input, output, invalid }) => {
  it("preserves the Flutter JSON contract without an envelope or metadata keys", async () => {
    respond(output);
    const response = await post(action, input);
    expect(response.status).toBe(200);
    expect(await response.json()).toEqual(output);
    expect(response.headers.get("x-reizoko-finish-reason")).toBe("STOP");
    expect(response.headers.get("x-reizoko-mode")).toBe("ai");
    expect(response.headers.get("cache-control")).toBe("no-store");
    expect(f.provider).toHaveBeenCalledWith("gemini");
    expect(f.ip).toHaveBeenCalledWith(expect.any(Request), `reizoko-${action}`, { requireKv: true });
    const params = f.stream.mock.calls[0][0] as StreamChatParams;
    expect(params).toMatchObject({ model: COPILOT_MODEL, maxTokens: 32_768, responseMimeType: "application/json" });
    if (action !== "analyze_ingredients_image") {
      expect(JSON.parse(params.messages[0].content).allergies).toEqual(["卵", "乳"]);
      expect(params.system).toContain("allergies の指定を最優先で必ず守り");
    }
    expect(f.cost).toHaveBeenCalledWith(expect.objectContaining({ label: `reizoko-${action}`, inputTokens: 100, outputTokens: 280, reservation: expect.any(Object) }));
  });
  it("rejects invalid input before generating or reserving spend", async () => {
    expect((await post(action, invalid)).status).toBe(400);
    expect(f.cap).not.toHaveBeenCalled();
    expect(f.stream).not.toHaveBeenCalled();
  });
  it("requires the app identification header", async () => {
    expect((await post(action, input, { "x-reizoko-client": "" })).status).toBe(403);
    expect(f.provider).not.toHaveBeenCalled();
  });
  it.each(["cost_capped", "budget_unavailable"])("blocks %s before generating", async (reason) => {
    f.cap.mockResolvedValue({ allowed: false, reason });
    const response = await post(action, input);
    expect(response.status).toBe(503);
    expect(await response.json()).toMatchObject({ code: reason });
    expect(f.stream).not.toHaveBeenCalled();
  });
});

describe("reizoko shared safety and compatibility", () => {
  it("keeps the documented FastAPI defaults and required fields", () => {
    expect(inputSchemas.generate_proposals.parse({ fridge_pool: [], must_use: [] })).toMatchObject({ people: 2, burners: 2, tools: [], allergies: [], target_categories: ["メイン", "副菜"], time_limit: "指定なし", require_calorie_in_response: false });
    expect(inputSchemas.generate_recipe.safeParse({ ...baseRecipe, burners: undefined }).success).toBe(false);
    expect(inputSchemas.generate_recipe.parse({ ...baseRecipe, model: "untrusted" })).not.toHaveProperty("model");
  });
  it("retries broken JSON once with a fresh reservation, settles both attempts", async () => {
    let attempt = 0;
    f.cap.mockImplementation(async () => ({ allowed: true, reservation: { key: "ai_cost:2099-01", receipt: `attempt-${attempt}`, amount: 20 } }));
    f.stream.mockImplementation(async function* (params: StreamChatParams) {
      yield attempt++ === 0 ? "{broken" : JSON.stringify(recipe);
      params.onComplete?.({ finishReason: "STOP", truncated: false, promptTokens: 100, outputTokens: 200 });
    });
    expect((await post("generate_recipe", baseRecipe)).status).toBe(200);
    expect(f.cap).toHaveBeenCalledTimes(2);
    expect(f.cost.mock.calls.map(([cost]) => cost.reservation.receipt)).toEqual(["attempt-0", "attempt-1"]);
    expect(f.stream.mock.calls[1][0].messages.at(-1).content).toContain("再生成");
  });
  it("retries invalid schema once, then rejects; never returns string calories", async () => {
    respond({ ...recipe, calorie_kcal: "100" });
    expect((await post("generate_recipe", baseRecipe)).status).toBe(502);
    expect(f.stream).toHaveBeenCalledTimes(2);
    expect(f.cost).toHaveBeenCalledTimes(2);
  });
  it("honors a budget denial on the JSON retry", async () => {
    respond("broken");
    f.cap.mockResolvedValueOnce({ allowed: true }).mockResolvedValueOnce({ allowed: false, reason: "cost_capped" });
    expect((await post("generate_recipe", baseRecipe)).status).toBe(503);
    expect(f.stream).toHaveBeenCalledOnce();
  });
  it.each(["MAX_TOKENS", "SAFETY", undefined])("rejects unfinished output %s without retry, accounting for usage", async (reason) => {
    respond(recipe, reason);
    // Explicitly preserve undefined rather than respond's default argument.
    if (reason === undefined) f.stream.mockImplementation(async function* (p: StreamChatParams) {
      yield JSON.stringify(recipe); p.onComplete?.({ truncated: false, promptTokens: 100, outputTokens: 200 });
    });
    expect((await post("generate_recipe", baseRecipe)).status).toBe(502);
    expect(f.stream).toHaveBeenCalledOnce();
    expect(f.cost).toHaveBeenCalledOnce();
  });
  it.each(["minute", "hour", "daily", "unavailable"])("blocks IP guard %s", async (reason) => {
    f.ip.mockResolvedValue({ ok: false, reason, resetAt: Date.now() + 60_000 });
    const response = await post("generate_recipe", baseRecipe);
    expect(response.status).toBe(reason === "unavailable" ? 503 : 429);
    expect(response.headers.get("retry-after")).toBeTruthy();
    expect(f.cap).not.toHaveBeenCalled();
  });
  it("rejects unknown actions, MIME types, malformed JSON and declared/streamed overflow", async () => {
    expect((await post("toString", {})).status).toBe(404);
    expect((await post("generate_recipe", baseRecipe, { "content-type": "text/plain" })).status).toBe(415);
    expect((await post("generate_recipe", baseRecipe, { "content-length": String(MAX_BODY_BYTES + 1) })).status).toBe(413);
    expect((await post("generate_recipe", { other_request: "x".repeat(MAX_BODY_BYTES) })).status).toBe(413);
    expect((await POST(new Request("http://localhost", { method: "POST", headers: { "content-type": "application/json", "x-reizoko-client": "reizoko-chef-v1" }, body: "{" }), { params: Promise.resolve({ action: "generate_recipe" }) })).status).toBe(400);
    expect(f.stream).not.toHaveBeenCalled();
  });
  it("rejects image overflow, invalid base64 and spoofed image signatures", async () => {
    for (const [data, status] of [[Buffer.alloc(MAX_IMAGE_BYTES + 1).toString("base64"), 413], ["!!!!", 400], ["YWJjZA==", 400]] as const) {
      expect((await post("analyze_ingredients_image", { ...image, image_base64: data })).status).toBe(status);
    }
    expect(f.stream).not.toHaveBeenCalled();
  });
  it("retains reservation if streaming fails or usage is missing, never exposing raw errors", async () => {
    f.stream.mockImplementation(async function* () { yield "partial"; throw new Error("private synthetic provider text"); });
    const response = await post("generate_recipe", baseRecipe);
    expect(response.status).toBe(502);
    expect(await response.text()).not.toContain("private synthetic");
    expect(f.cost).not.toHaveBeenCalled();
    f.stream.mockImplementation(async function* (p: StreamChatParams) { yield JSON.stringify(recipe); p.onComplete?.({ finishReason: "STOP", truncated: false }); });
    expect((await post("generate_recipe", baseRecipe)).status).toBe(200);
    expect(f.cost).not.toHaveBeenCalled();
  });
  it("awaits cost settlement before responding", async () => {
    respond(recipe);
    let release!: () => void;
    f.cost.mockImplementation(() => new Promise<void>((resolve) => { release = resolve; }));
    let returned = false;
    const pending = post("generate_recipe", baseRecipe).then((r) => { returned = true; return r; });
    await vi.waitFor(() => expect(f.cost).toHaveBeenCalledOnce());
    expect(returned).toBe(false);
    release();
    expect((await pending).status).toBe(200);
  });
  it("does not present a keyless mock as a real recipe", async () => {
    f.provider.mockResolvedValue({ name: "mock", streamChat: f.stream });
    expect((await post("generate_recipe", baseRecipe)).status).toBe(503);
    expect(f.stream).not.toHaveBeenCalled();
  });
  it("sends an image through the actual Gemini adapter with printapp's model/settings", async () => {
    vi.stubEnv("GEMINI_API_KEY", "synthetic-test-key");
    const event = { candidates: [{ content: { role: "model", parts: [{ text: '{"ingredients":["にんじん"]}' }] }, finishReason: "STOP" }], usageMetadata: { promptTokenCount: 1000, candidatesTokenCount: 200, thoughtsTokenCount: 50, totalTokenCount: 1250 } };
    const fetcher = vi.fn().mockResolvedValue(new Response(`data: ${JSON.stringify(event)}\n\n`, { headers: { "content-type": "text/event-stream" } }));
    vi.stubGlobal("fetch", fetcher);
    f.provider.mockResolvedValue(createGeminiProvider());
    const response = await post("analyze_ingredients_image", image);
    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({ ingredients: ["にんじん"] });
    const [url, options] = fetcher.mock.calls[0];
    expect(url).toContain(`/models/${COPILOT_MODEL}:streamGenerateContent`);
    expect(JSON.parse(options.body)).toMatchObject({
      contents: [{ parts: [{ text: expect.any(String) }, { inlineData: { data: image.image_base64, mimeType: "image/png" } }] }],
      generationConfig: { maxOutputTokens: 32_768, responseMimeType: "application/json", thinkingConfig: { thinkingLevel: "low" } },
    });
    expect(f.cap).toHaveBeenCalledWith("gemini", expect.objectContaining({ inputTokens: 1_048_576, outputTokens: 32_768 }));
    expect(f.cost).toHaveBeenCalledWith(expect.objectContaining({ inputTokens: 1000, outputTokens: 250 }));
  });
});
