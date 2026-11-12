import { getProvider, type ChatMessage, type StreamCompletion } from "@/lib/ai/provider";
import { checkMonthlyCostCap, recordAiCost, textBudget } from "@/lib/ai/cost-guard";
import { tierForModel } from "@/lib/ai/cost-tracker";
import { providerErrorDiagnostic } from "@/lib/ai/provider-error";
import { COPILOT_MODEL } from "@/lib/copilot/model";
import { checkIpRateLimit } from "@/lib/rate-limit";
import { imageMime, inputSchemas, isAction, MAX_BODY_BYTES, MAX_IMAGE_BYTES, outputSchemas } from "@/lib/reizoko/schema";
import { systemPrompt } from "@/lib/reizoko/prompts";

export const runtime = "nodejs";
export const maxDuration = 120;
const MAX_OUTPUT_TOKENS = 32_768;
const IMAGE_INPUT_TOKEN_BOUND = 1_048_576;

function reply(body: unknown, status = 200, headers: Record<string, string> = {}) {
  return Response.json(body, { status, headers: { "Cache-Control": "no-store", ...headers } });
}

class BodyTooLarge extends Error {}
async function readBody(req: Request): Promise<unknown> {
  if (!req.body) throw new Error("empty body");
  const reader = req.body.getReader();
  const chunks: Uint8Array[] = [];
  let size = 0;
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > MAX_BODY_BYTES) {
        await reader.cancel();
        throw new BodyTooLarge();
      }
      chunks.push(value);
    }
  } finally { reader.releaseLock(); }
  return JSON.parse(Buffer.concat(chunks).toString("utf8"));
}

export async function POST(req: Request, context: { params: Promise<{ action: string }> }): Promise<Response> {
  const started = Date.now();
  let stage = "provider";
  let privateText: string[] = [];
  // Public app identification only; the shared IP and spend guards enforce admission.
  if (req.headers.get("x-reizoko-client") !== "reizoko-chef-v1") {
    return reply({ error: "アプリからお試しください。" }, 403);
  }
  const { action } = await context.params;
  if (!isAction(action)) return reply({ error: "指定された機能はありません。" }, 404);
  if (req.headers.get("content-type")?.split(";")[0].trim().toLowerCase() !== "application/json") {
    return reply({ error: "送信形式を確認してください。" }, 415);
  }
  if (Number(req.headers.get("content-length")) > MAX_BODY_BYTES) {
    return reply({ error: "送信内容が大きすぎます。" }, 413);
  }
  try {
    const provider = await getProvider("gemini");
    // Never present a fabricated meal as a real AI result when no key is configured.
    if (provider.name === "mock") return reply({ error: "現在シェフを利用できません。" }, 503);
    stage = "rate_limit";
    const limit = await checkIpRateLimit(req, `reizoko-${action}`, { requireKv: true });
    if (!limit.ok) return reply({ error: limit.reason === "unavailable" ? "現在シェフを利用できません。" : "時間をおいてお試しください。" },
      limit.reason === "unavailable" ? 503 : 429,
      { "Retry-After": String(Math.max(1, Math.ceil((limit.resetAt - Date.now()) / 1000))) });

    let raw: unknown;
    try { raw = await readBody(req); }
    catch (error) {
      return reply({ error: error instanceof BodyTooLarge ? "送信内容が大きすぎます。" : "送信内容を確認してください。" }, error instanceof BodyTooLarge ? 413 : 400);
    }
    if (action === "analyze_ingredients_image" && raw && typeof raw === "object" && "image_base64" in raw
      && typeof raw.image_base64 === "string" && (raw.image_base64.length > 4 * Math.ceil(MAX_IMAGE_BYTES / 3)
        || Buffer.byteLength(raw.image_base64, "base64") > MAX_IMAGE_BYTES)) {
      return reply({ error: "画像が大きすぎます。" }, 413);
    }
    const parsed = inputSchemas[action].safeParse(raw);
    if (!parsed.success) return reply({ error: "送信内容を確認してください。" }, 400);
    const input = parsed.data;
    const image = "image_base64" in input ? input.image_base64 : undefined;
    const mime = image ? imageMime(image) : undefined;
    if (image && !mime) return reply({ error: "画像を確認してください。" }, 400);
    const system = systemPrompt(action);
    const messages: ChatMessage[] = [{ role: "user",
      content: JSON.stringify("image_base64" in input ? { prompt: input.prompt } : input),
      ...(image && mime ? { images: [{ data: image, mimeType: mime }] } : {}),
    }];
    privateText = [system, ...messages.map((message) => message.content), ...(image ? [image] : [])];
    const tier = tierForModel(COPILOT_MODEL);
    // One deadline covers both attempts and stays within the Flutter client's 60s timeout.
    const signal = AbortSignal.any([req.signal, AbortSignal.timeout(55_000)]);
    for (let attempt = 0; attempt < 2; attempt++) {
      stage = "budget";
      const budget = textBudget(tier, system, messages, MAX_OUTPUT_TOKENS);
      if (image) budget.inputTokens = IMAGE_INPUT_TOKEN_BOUND;
      // Each retry needs its own atomic reservation. Never reuse a settled receipt.
      const cap = await checkMonthlyCostCap(provider.name, budget);
      if (!cap.allowed) return reply({ error: "現在シェフを利用できません。", code: cap.reason }, 503);
      let completion: StreamCompletion | undefined;
      let output = "";
      stage = "stream";
      try {
        for await (const chunk of provider.streamChat({ system, messages, model: COPILOT_MODEL,
          maxTokens: MAX_OUTPUT_TOKENS, responseMimeType: "application/json", signal,
          onComplete: (value) => { completion = value; },
        })) {
          output += chunk;
          if (output.length > 512_000) throw new Error("output too large");
        }
      } finally {
        const valid = (n: unknown): n is number => typeof n === "number" && Number.isFinite(n) && n >= 0;
        if (valid(completion?.promptTokens) && valid(completion?.outputTokens)) {
          const billedOutput = Math.max(completion.outputTokens + (completion.thoughtsTokens ?? 0),
            (completion.totalTokens ?? 0) - completion.promptTokens);
          await recordAiCost({ tier, label: `reizoko-${action}`, inputTokens: completion.promptTokens,
            outputTokens: billedOutput, reservation: cap.reservation });
        }
        // Missing usage/failed streams retain the full conservative reservation.
        console.info("[reizoko] completion", { action, attempt, provider: provider.name, model: COPILOT_MODEL,
          costKey: cap.reservation?.key, finishReason: completion?.finishReason, truncated: completion?.truncated,
          promptTokens: completion?.promptTokens, outputTokens: completion?.outputTokens, elapsedMs: Date.now() - started });
      }
      if (completion?.truncated || completion?.finishReason !== "STOP") {
        return reply({ error: "料理データを取得できませんでした。もう一度お試しください。" }, 502);
      }
      try {
        const json = JSON.parse(output.trim().replace(/^```(?:json)?\s*([\s\S]*?)\s*```$/, "$1"));
        const result = outputSchemas[action].parse(json);
        // Arrays and category maps must remain unwrapped for existing Flutter readers.
        return reply(result, 200, { "X-Reizoko-Mode": "ai", "X-Reizoko-Finish-Reason": completion.finishReason });
      } catch {
        console.error("[reizoko] invalid_result", { action, attempt, outputChars: output.length });
        if (attempt === 0) messages.push({ role: "user", content: "前の応答はJSON形式または必須項目に誤りがありました。最初の入力に対し、指定形式と全必須項目を守ってJSONだけを再生成してください。" });
      }
    }
    return reply({ error: "料理データを読み取れませんでした。もう一度お試しください。" }, 502);
  } catch (error) {
    console.error("[reizoko] failed", { action, stage, elapsedMs: Date.now() - started,
      ...providerErrorDiagnostic(error, privateText) });
    return reply({ error: "料理データを取得できませんでした。時間をおいてお試しください。" }, 502);
  }
}
