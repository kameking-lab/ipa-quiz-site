import { NextResponse } from "next/server";
import { z } from "zod";
import { getProvider, resolveModel } from "@/lib/ai/provider";
import type { LLMProvider } from "@/lib/ai/provider";
import { checkRateLimit, getClientIp } from "@/lib/rate-limit/server";
import { checkIpRateLimit } from "@/lib/rate-limit";
import { captureException } from "@/lib/monitoring/sentry";

export const runtime = "nodejs";

const BodySchema = z.object({
  baseQuestion: z.object({
    id: z.string().min(1).max(120),
    exam: z.string().min(1).max(8),
    category: z.string().min(1).max(80),
    topicTags: z.array(z.string().max(40)).max(8).default([]),
    question: z.string().min(1).max(4000),
    choices: z.record(z.string(), z.string().max(800)),
    answer: z.string().min(1).max(40),
    explanation: z.string().max(4000).optional(),
  }),
  difficultyShift: z.enum(["easier", "same", "harder"]).default("same"),
});

const SYSTEM_PROMPT = `あなたはIPA情報処理技術者試験の作問専門家です。提示された既存問題と同じ分野・近い難易度で、しかし問題文・選択肢・正解は重複しない「類題」を1問だけ生成してください。

出力は必ず以下のJSONのみ（前後に文章を一切付けない）:

{
  "question": "問題文（日本語）",
  "choices": { "ア": "選択肢ア", "イ": "選択肢イ", "ウ": "選択肢ウ", "エ": "選択肢エ" },
  "answer": "ア|イ|ウ|エ",
  "explanation": "なぜその選択肢が正解で他が誤りか、消去法を含めて4〜8行で説明"
}

ルール:
- 4択（ア/イ/ウ/エ）固定。
- 元問題と同一の知識領域・観点を扱うが、設問の角度を変える。
- 選択肢は紛らわしい誤答を3つ含める。
- 解説は技術用語を正確に使い、各選択肢に1行ずつ言及する。
- 元問題の文や選択肢をコピーしない。`;

export async function POST(req: Request) {
  let payload: z.infer<typeof BodySchema>;
  try {
    payload = BodySchema.parse(await req.json());
  } catch {
    return NextResponse.json(
      { error: "invalid_request", message: "リクエスト形式が正しくありません。" },
      { status: 400 },
    );
  }

  const ip = getClientIp(req);
  const rl = await checkRateLimit({ ip });
  if (!rl.ok) {
    return NextResponse.json(
      {
        error: "rate_limited",
        message:
          rl.reason === "daily"
            ? "本日の利用上限に達しました。JST 0:00 にリセットされます。"
            : "少し速いようです。1分ほど待ってから再度お試しください。",
        reason: rl.reason,
        resetAt: rl.resetAt,
      },
      { status: 429 },
    );
  }

  const ipRl = await checkIpRateLimit(req, "generate-question");
  if (!ipRl.ok) {
    return NextResponse.json(
      { error: "rate_limited", message: "リクエストが集中しています。しばらく待ってから再試行してください。", reason: ipRl.reason, resetAt: ipRl.resetAt },
      { status: 429 },
    );
  }

  const { baseQuestion, difficultyShift } = payload;
  const choicesText = Object.entries(baseQuestion.choices)
    .map(([k, v]) => `${k}: ${v}`)
    .join("\n");

  const difficultyHint =
    difficultyShift === "easier"
      ? "\n難易度: もとの問題より少し易しめにしてください。"
      : difficultyShift === "harder"
        ? "\n難易度: もとの問題より少し難しめにしてください。"
        : "";

  const userPrompt = `【元問題】
分野: ${baseQuestion.category}
タグ: ${baseQuestion.topicTags.join(", ") || "（なし）"}

問題文:
${baseQuestion.question}

選択肢:
${choicesText}

正解: ${baseQuestion.answer}${difficultyHint}

上記と同じ分野・観点の類題を1問、JSONで生成してください。`;

  let provider: LLMProvider;
  try {
    provider = await getProvider();
  } catch {
    return NextResponse.json(
      { error: "provider_unavailable", message: "AIサービスが一時的に利用できません。" },
      { status: 503 },
    );
  }

  const model = resolveModel("free");

  let raw = "";
  try {
    for await (const chunk of provider.streamChat({
      system: SYSTEM_PROMPT,
      messages: [{ role: "user", content: userPrompt }],
      model,
      maxTokens: 1000,
      temperature: 0.85,
    })) {
      raw += chunk;
    }
  } catch (err) {
    await captureException(err, {
      route: "/api/generate-question",
      extra: { provider: provider.name, model },
    });
    return NextResponse.json(
      { error: "generation_failed", message: "類題生成に失敗しました。少し待ってお試しください。" },
      { status: 502 },
    );
  }

  const generated = parseGenerated(raw);
  if (!generated) {
    if (provider.name === "mock") {
      return NextResponse.json({ question: mockSimilar(baseQuestion), provider: "mock" });
    }
    return NextResponse.json(
      { error: "parse_failed", message: "AIの出力形式が不正でした。再度お試しください。" },
      { status: 502 },
    );
  }

  return NextResponse.json(
    { question: generated, provider: provider.name },
    {
      headers: {
        "X-RateLimit-Limit": String(rl.limit),
        "X-RateLimit-Remaining": String(rl.remaining),
        "X-RateLimit-Reset": String(rl.resetAt),
      },
    },
  );
}

interface GeneratedQuestion {
  question: string;
  choices: Record<string, string>;
  answer: string;
  explanation: string;
}

function parseGenerated(raw: string): GeneratedQuestion | null {
  const cleaned = raw
    .replace(/```json\s*/gi, "")
    .replace(/```\s*$/g, "")
    .replace(/```/g, "")
    .trim();
  const start = cleaned.indexOf("{");
  const end = cleaned.lastIndexOf("}");
  if (start < 0 || end <= start) return null;
  const slice = cleaned.slice(start, end + 1);
  try {
    const obj = JSON.parse(slice) as Partial<GeneratedQuestion>;
    if (
      typeof obj.question !== "string" ||
      typeof obj.choices !== "object" ||
      obj.choices === null ||
      typeof obj.answer !== "string" ||
      typeof obj.explanation !== "string"
    ) {
      return null;
    }
    const choices = obj.choices as Record<string, unknown>;
    const validKeys = ["ア", "イ", "ウ", "エ"];
    const out: Record<string, string> = {};
    for (const k of validKeys) {
      if (typeof choices[k] !== "string") return null;
      out[k] = choices[k] as string;
    }
    if (!validKeys.includes(obj.answer)) return null;
    return {
      question: obj.question,
      choices: out,
      answer: obj.answer,
      explanation: obj.explanation,
    };
  } catch {
    return null;
  }
}

function mockSimilar(base: z.infer<typeof BodySchema>["baseQuestion"]): GeneratedQuestion {
  return {
    question: `（モック類題）${base.category}に関する類題です。実際のAI生成には GEMINI_API_KEY が必要です。元問題: ${base.question.slice(0, 80)}…`,
    choices: {
      ア: "（モック選択肢ア）",
      イ: "（モック選択肢イ）",
      ウ: "（モック選択肢ウ）",
      エ: "（モック選択肢エ）",
    },
    answer: "ア",
    explanation:
      "これはモックプロバイダによる仮のレスポンスです。GEMINI_API_KEYが設定されると実際のAIが類題を生成します。",
  };
}
