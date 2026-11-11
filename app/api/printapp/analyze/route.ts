import { getProvider, type ChatMessage, type StreamCompletion } from "@/lib/ai/provider";
import { checkMonthlyCostCap, recordAiCost, textBudget } from "@/lib/ai/cost-guard";
import { tierForModel } from "@/lib/ai/cost-tracker";
import { checkIpRateLimit } from "@/lib/rate-limit";
import { checkRateLimit, getClientIp } from "@/lib/rate-limit/server";
import { SYSTEM_PROMPT, TEXT_INPUT_SYSTEM } from "@/lib/printapp/prompts";
import { analysisInput, analysisResult, isImageData, MAX_BODY_BYTES, MAX_IMAGE_BYTES } from "@/lib/printapp/schema";

export const runtime = "nodejs";
export const maxDuration = 120;
// A dedicated image-capable, priced model; existing default models stay unchanged.
const MODEL = "gemini-2.5-flash-lite";
const MAX_OUTPUT_TOKENS = 32_768;
// Reserve the model's entire input context for images, whose tokens cannot be
// bounded by base64 character counts. Settle using measured image+text usage.
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
  } finally {
    reader.releaseLock();
  }
  return JSON.parse(Buffer.concat(chunks).toString("utf8"));
}

export async function POST(req: Request): Promise<Response> {
  // Public client identification, not a secret or an authentication credential.
  // Shared rate limits and atomic budget admission remain mandatory for real AI.
  if (req.headers.get("x-printapp-client") !== "printapp-mobile-v1") {
    return reply({ error: "アプリからお試しください。" }, 403);
  }
  if (req.headers.get("content-type")?.split(";")[0].trim().toLowerCase() !== "application/json") {
    return reply({ error: "送信形式を確認してください。" }, 415);
  }
  const contentLength = req.headers.get("content-length");
  if (contentLength && Number(contentLength) > MAX_BODY_BYTES) {
    return reply({ error: "画像が大きすぎます。" }, 413);
  }

  try {
    const provider = await getProvider("gemini");
    const mock = provider.name === "mock";
    const ipLimit = await checkIpRateLimit(req, "printapp-analyze", { requireKv: !mock });
    if (!ipLimit.ok) {
      return reply({ error: ipLimit.reason === "unavailable" ? "現在解析を利用できません。" : "時間をおいてお試しください。" },
        ipLimit.reason === "unavailable" ? 503 : 429,
        { "Retry-After": String(Math.max(1, Math.ceil((ipLimit.resetAt - Date.now()) / 1000))) });
    }
    if (mock) {
      const localLimit = await checkRateLimit({ ip: `printapp:${getClientIp(req)}` });
      if (!localLimit.ok) return reply({ error: "時間をおいてお試しください。" }, 429);
    }

    let raw: unknown;
    try { raw = await readBody(req); }
    catch (error) {
      return reply({ error: error instanceof BodyTooLarge ? "画像が大きすぎます。" : "送信内容を確認してください。" }, error instanceof BodyTooLarge ? 413 : 400);
    }
    // Reject oversized images with 413 even when the JSON body fits the limit.
    if (raw && typeof raw === "object" && "imageBase64" in raw && typeof raw.imageBase64 === "string"
      && (raw.imageBase64.length > 4 * Math.ceil(MAX_IMAGE_BYTES / 3)
        || Buffer.byteLength(raw.imageBase64, "base64") > MAX_IMAGE_BYTES)) {
      return reply({ error: "画像が大きすぎます。" }, 413);
    }
    const parsed = analysisInput.safeParse(raw);
    if (!parsed.success) return reply({ error: "送信内容を確認してください。" }, 400);
    const input = parsed.data;
    const hasImage = "imageBase64" in input;
    if (hasImage && !isImageData(Buffer.from(input.imageBase64, "base64"), input.mimeType)) {
      return reply({ error: "画像を確認してください。" }, 400);
    }
    const system = hasImage ? SYSTEM_PROMPT : TEXT_INPUT_SYSTEM;
    const messages: ChatMessage[] = [{
      role: "user",
      content: hasImage
        ? (input.userPrompt?.trim() ? "【ユーザーからの追加指示（この指示に従って画像を再解析し、同じJSON形式で出力してください）】\n" + input.userPrompt.trim() : "このプリントを解析してください。")
        : `【ユーザーが貼り付けたテキスト】\n\n${input.text}`,
      ...(hasImage ? { images: [{ mimeType: input.mimeType, data: input.imageBase64 }] } : {}),
    }];
    const tier = tierForModel(MODEL);
    const budget = textBudget(tier, system, messages, MAX_OUTPUT_TOKENS);
    if (hasImage) budget.inputTokens = IMAGE_INPUT_TOKEN_BOUND;
    const cap = await checkMonthlyCostCap(provider.name, budget);
    if (!cap.allowed) return reply({ error: "現在解析を利用できません。", code: cap.reason }, 503);

    let completion: StreamCompletion | undefined;
    let output = "";
    try {
      for await (const chunk of provider.streamChat({
        system, messages, model: MODEL, maxTokens: MAX_OUTPUT_TOKENS,
        thinkingBudget: 0, responseMimeType: "application/json",
        signal: AbortSignal.any([req.signal, AbortSignal.timeout(110_000)]),
        onComplete: (value) => { completion = value; },
      })) {
        output += chunk;
        if (output.length > 512_000) throw new Error("output too large");
      }
    } finally {
      // Always await KV settlement before responding. If usage is missing (for
      // example, a failed stream), retain the conservative reserved charge.
      const valid = (n: unknown): n is number => typeof n === "number" && Number.isFinite(n) && n >= 0;
      if (!mock && valid(completion?.promptTokens) && valid(completion?.outputTokens)) {
        const billedOutput = Math.max(completion.outputTokens + (completion.thoughtsTokens ?? 0),
          (completion.totalTokens ?? 0) - completion.promptTokens);
        await recordAiCost({ tier, label: "printapp-analyze", inputTokens: completion.promptTokens,
          outputTokens: billedOutput, reservation: cap.reservation });
      }
      console.info("[printapp-analyze] completion", { provider: provider.name, model: MODEL,
        finishReason: completion?.finishReason, truncated: completion?.truncated,
        promptTokens: completion?.promptTokens, outputTokens: completion?.outputTokens });
    }
    if (completion?.truncated || completion?.finishReason !== "STOP") {
      return reply({ error: "解析が完了しませんでした。もう一度お試しください。" }, 502);
    }
    try {
      const json = output.trim().replace(/^```(?:json)?\s*([\s\S]*?)\s*```$/, "$1");
      const result = analysisResult.parse(JSON.parse(json));
      return reply({ ...result, analysisMode: mock ? "mock" : "ai", finishReason: completion.finishReason });
    } catch {
      return reply({ error: "解析結果を読み取れませんでした。" }, 502);
    }
  } catch {
    // Never log the request body, image, model output, SDK error or credentials.
    return reply({ error: "解析できませんでした。時間をおいてお試しください。" }, 502);
  }
}
