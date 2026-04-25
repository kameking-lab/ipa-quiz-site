import { NextResponse } from "next/server";
import { z } from "zod";

import { getProvider, resolveModel } from "@/lib/ai/provider";
import type { LLMProvider } from "@/lib/ai/provider";
import { checkRateLimit, getClientIp } from "@/lib/rate-limit/server";
import { findAfternoonQuestion } from "@/lib/afternoon/load";
import type {
  AfternoonAnswer,
  AfternoonQuestion,
  AfternoonScoringResult,
  SubScoringResult,
} from "@/lib/afternoon/types";

export const runtime = "nodejs";

const BodySchema = z.object({
  questionId: z.string().min(1).max(120),
  answers: z
    .array(
      z.object({
        label: z.string().min(1).max(40),
        text: z.string().max(4000),
      }),
    )
    .min(1)
    .max(20),
});

const SCORING_SYSTEM_PROMPT = `あなたはIPA情報処理技術者試験の午後問題（記述式・論述式）の採点者です。
ユーザーの解答を、与えられたモデル解答と採点ルーブリックに基づき採点してください。

【記述式（short-text / long-text）の採点基準】
- キーワードの一致だけでなく、論理的な文脈・因果関係も評価する
- 字数制限を大幅超過した解答は減点する
- 空欄・無関係な内容は0点とする
- 部分点を細かく与える（0/30/60/80/100など）

【論述式（essay-text）の採点基準】
- 設問への適合性、論述の具体性、構成の一貫性、自身の関与の明示の4軸で評価する
- 字数下限に達していない場合は明確に減点する
- 抽象的な標語の繰り返し（「DX推進」「AI活用」など）が多い解答は減点する
- 数値・固有名詞・具体的判断が織り込まれているかを重視する
- scoringCriteria が与えられている場合は、各観点を踏まえて評価する

必ず以下のJSON Schemaに従って、有効なJSONのみを返してください。前後の説明・コードフェンスは禁止です。

{
  "totalScore": <number 0-100>,
  "subResults": [
    {
      "label": "<SubQuestion.labelと一致>",
      "score": <number 0-100>,
      "goodPoints": [<string>, ...],
      "improvements": [<string>, ...],
      "modelAnswer": "<IPA解答例>"
    }
  ],
  "overallComment": "<全体講評を150字以内>"
}`;

function buildUserPrompt(question: AfternoonQuestion, answers: AfternoonAnswer[]): string {
  const lines: string[] = [];
  lines.push(`【大問】問${question.qNumber}: ${question.title}`);
  lines.push(`【分野】${question.category}`);
  lines.push(`【背景】\n${question.context}`);
  lines.push("");
  lines.push("【設問とユーザー解答】");
  for (const sub of question.subQuestions) {
    const userAnswer = answers.find((a) => a.label === sub.label)?.text ?? "";
    lines.push(`---`);
    lines.push(`■ ${sub.label}`);
    lines.push(`設問: ${sub.prompt}`);
    lines.push(`形式: ${sub.type}`);
    if (sub.minLength && sub.maxLength) {
      lines.push(`字数: ${sub.minLength}〜${sub.maxLength}字`);
    } else if (sub.maxLength) {
      lines.push(`字数制限: ${sub.maxLength}字`);
    }
    lines.push(`配点: ${sub.points ?? 100}`);
    lines.push(`モデル解答: ${sub.modelAnswer}`);
    lines.push(`採点ルーブリック: ${sub.scoringRubric}`);
    if (sub.compositionPoints && sub.compositionPoints.length > 0) {
      lines.push(`構成のポイント: ${sub.compositionPoints.join(" / ")}`);
    }
    if (sub.scoringCriteria && sub.scoringCriteria.length > 0) {
      lines.push(
        `採点基準: ${sub.scoringCriteria.map((c) => `${c.name}（${c.description}）`).join(" / ")}`,
      );
    }
    lines.push(`ユーザー解答: ${userAnswer || "（無回答）"}`);
  }
  lines.push("---");
  lines.push("以上を採点し、指定したJSON形式のみを返してください。");
  return lines.join("\n");
}

function buildMockScoring(
  question: AfternoonQuestion,
  answers: AfternoonAnswer[],
): AfternoonScoringResult {
  const subResults: SubScoringResult[] = question.subQuestions.map((sub) => {
    const text = answers.find((a) => a.label === sub.label)?.text ?? "";
    const len = text.trim().length;
    let score = 0;
    if (len === 0) score = 0;
    else if (len < 5) score = 20;
    else if (sub.maxLength && len > sub.maxLength * 1.5) score = 40;
    else score = 70;
    return {
      label: sub.label,
      score,
      goodPoints: len > 0 ? ["解答が記入されています", "設問の構造を理解しています"] : [],
      improvements:
        len === 0
          ? ["まず解答を記入しましょう"]
          : [
              "ルーブリックのキーワードを盛り込みましょう",
              "結論と理由を明確に分けて書きましょう",
            ],
      modelAnswer: sub.modelAnswer,
    };
  });
  const totalScore = Math.round(
    subResults.reduce((acc, r) => acc + r.score, 0) / Math.max(subResults.length, 1),
  );
  return {
    questionId: question.id,
    totalScore,
    subResults,
    overallComment:
      "（モック採点）AI採点は目安です。GEMINI_API_KEY を設定すると、より精度の高い採点が利用できます。",
  };
}

function safeParseScoring(
  raw: string,
  question: AfternoonQuestion,
): AfternoonScoringResult | null {
  const fenced = raw.match(/```(?:json)?\s*([\s\S]+?)```/);
  const candidate = fenced ? fenced[1] : raw;
  const objMatch = candidate.match(/(\{[\s\S]*\})/);
  const json = objMatch?.[1] ?? candidate.trim();
  try {
    const obj = JSON.parse(json) as Partial<AfternoonScoringResult> & {
      subResults?: Array<Partial<SubScoringResult>>;
    };
    if (typeof obj.totalScore !== "number" || !Array.isArray(obj.subResults)) return null;
    const subResults: SubScoringResult[] = obj.subResults.map((s) => ({
      label: String(s.label ?? ""),
      score: Math.max(0, Math.min(100, Number(s.score ?? 0))),
      goodPoints: Array.isArray(s.goodPoints) ? s.goodPoints.map(String) : [],
      improvements: Array.isArray(s.improvements) ? s.improvements.map(String) : [],
      modelAnswer: String(
        s.modelAnswer ??
          question.subQuestions.find((q) => q.label === s.label)?.modelAnswer ??
          "",
      ),
    }));
    return {
      questionId: question.id,
      totalScore: Math.max(0, Math.min(100, Math.round(obj.totalScore))),
      subResults,
      overallComment: typeof obj.overallComment === "string" ? obj.overallComment : "",
    };
  } catch {
    return null;
  }
}

function streamObject(obj: AfternoonScoringResult): ReadableStream {
  const text = JSON.stringify(obj);
  const encoder = new TextEncoder();
  return new ReadableStream({
    async start(controller) {
      const chunks = text.match(/.{1,256}/gs) ?? [text];
      for (const c of chunks) {
        controller.enqueue(encoder.encode(c));
      }
      controller.close();
    },
  });
}

export async function POST(req: Request) {
  let payload: z.infer<typeof BodySchema>;
  try {
    payload = BodySchema.parse(await req.json());
  } catch {
    return NextResponse.json(
      { error: "invalid_request", message: "リクエストの形式が正しくありません。" },
      { status: 400 },
    );
  }

  const question = findAfternoonQuestion(payload.questionId);
  if (!question) {
    return NextResponse.json(
      { error: "not_found", message: "対象の午後問題が見つかりません。" },
      { status: 404 },
    );
  }

  const ip = getClientIp(req);
  const rl = checkRateLimit({ ip });
  if (!rl.ok) {
    const message =
      rl.reason === "daily"
        ? "本日の採点上限に達しました。JST 0:00 にリセットされます。"
        : "少し速いようです。1分ほど待ってから再度お試しください。";
    return NextResponse.json(
      { error: "rate_limited", message, reason: rl.reason, resetAt: rl.resetAt },
      { status: 429, headers: { "X-Error-Type": "rate_limited" } },
    );
  }

  let provider: LLMProvider;
  try {
    provider = await getProvider();
  } catch {
    return NextResponse.json(
      {
        error: "provider_unavailable",
        message: "AI採点サービスが一時的に利用できません。",
      },
      { status: 503, headers: { "X-Error-Type": "server_error" } },
    );
  }

  // Mock provider returns prose, not JSON — short-circuit to deterministic mock scoring
  // so the UI stays usable without GEMINI_API_KEY.
  if (provider.name === "mock") {
    const mock = buildMockScoring(question, payload.answers);
    return new Response(streamObject(mock), {
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "X-RateLimit-Limit": String(rl.limit),
        "X-RateLimit-Remaining": String(rl.remaining),
        "X-RateLimit-Reset": String(rl.resetAt),
        "X-Provider": provider.name,
      },
    });
  }

  const userPrompt = buildUserPrompt(question, payload.answers);
  const model = resolveModel("free");

  // Collect the full response, parse JSON, then stream the validated object back.
  // (Streaming raw LLM output would risk leaking partial/invalid JSON to the client.)
  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    async start(controller) {
      let buf = "";
      try {
        for await (const chunk of provider.streamChat({
          system: SCORING_SYSTEM_PROMPT,
          messages: [{ role: "user", content: userPrompt }],
          model,
          maxTokens: question.type === "essay" ? 4000 : 1500,
          temperature: 0.2,
        })) {
          buf += chunk;
        }
      } catch (err) {
        const fallback = buildMockScoring(question, payload.answers);
        fallback.overallComment = `AI採点中にエラーが発生したため、簡易採点を表示しています: ${err instanceof Error ? err.message : String(err)}`;
        controller.enqueue(encoder.encode(JSON.stringify(fallback)));
        controller.close();
        return;
      }

      const parsed = safeParseScoring(buf, question) ?? buildMockScoring(question, payload.answers);
      controller.enqueue(encoder.encode(JSON.stringify(parsed)));
      controller.close();
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "X-RateLimit-Limit": String(rl.limit),
      "X-RateLimit-Remaining": String(rl.remaining),
      "X-RateLimit-Reset": String(rl.resetAt),
      "X-Provider": provider.name,
    },
  });
}
