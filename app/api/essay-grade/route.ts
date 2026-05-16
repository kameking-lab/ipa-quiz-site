import { NextResponse } from "next/server";
import { z } from "zod";

import { getProvider, resolveModel } from "@/lib/ai/provider";
import type { LLMProvider } from "@/lib/ai/provider";
import { checkRateLimit, getClientIp } from "@/lib/rate-limit/server";
import { checkIpRateLimit } from "@/lib/rate-limit";
import { findEssayQuestion } from "@/lib/essay/load";
import { INDUSTRY_LABELS } from "@/lib/essay/types";
import type {
  EssayGradingResult,
  EssayQuestion,
  EssayRank,
  EssaySubResult,
  Industry,
} from "@/lib/essay/types";
import { examLabel } from "@/lib/utils";

export const runtime = "nodejs";

const INDUSTRIES: Industry[] = [
  "manufacturing",
  "finance",
  "retail",
  "it",
  "public",
  "healthcare",
  "logistics",
  "construction",
  "education",
  "other",
];

const BodySchema = z.object({
  questionId: z.string().min(1).max(120),
  industry: z.enum(INDUSTRIES as [Industry, ...Industry[]]),
  answers: z.object({
    ア: z.string().max(4000),
    イ: z.string().max(4000),
    ウ: z.string().max(4000),
  }),
});

const ESSAY_SYSTEM_PROMPT = `あなたは IPA 高度試験（ST/SA/PM/SM/AU）の元採点委員です。
以下の論述（午後II）を厳密に採点してください。

採点指針:
- 設問ア・イ・ウそれぞれを「適合度」「論理性」「具体性」「業種事例の適切さ」の4軸で評価する（各 0-100）
- 字数の目安と大きく乖離している場合は減点する（過少は致命的、過多は冗長と判断）
- IPA 公表の採点講評・出題趣旨を最優先の判断基準とする
- 業種固有の事例が論述内容と整合しているかを評価する
- 抽象論・一般論のみで自社固有性が見えない論述は減点する
- 論理飛躍、冗長表現、用語の誤用を必ず指摘する

合否ランクの判定基準:
- A: 合格率 70% 以上。設問の趣旨を全て満たし、固有性・論理性・具体性が揃う
- B: 合格率 40-70%。設問は理解しているが、論理または具体性に弱点がある
- C: 合格率 40% 未満。設問理解はあるが、論述として不合格濃厚
- fail: 設問の理解そのものに重大な欠落がある

出力は必ず以下の JSON Schema に従い、JSON のみを返してください。前後の説明・コードフェンスは禁止です。

{
  "rank": "A" | "B" | "C" | "fail",
  "passProbability": <number 0-100>,
  "subResults": [
    {
      "key": "ア" | "イ" | "ウ",
      "score": <number 0-100>,
      "axes": {
        "relevance": <number 0-100>,
        "logic": <number 0-100>,
        "concreteness": <number 0-100>,
        "industryFit": <number 0-100>
      },
      "goodPoints": [<string>, ...],
      "improvements": [<string>, ...],
      "missingElements": [<string>, ...]
    }
  ],
  "overallAdvice": "<全体的な改善アドバイスを 300 字以内で>",
  "unnecessaryElements": [<string>, ...],
  "improvedExample": "<設問アの改善版冒頭を 200 字程度で>"
}`;

function buildUserPrompt(
  question: EssayQuestion,
  industry: Industry,
  answers: { ア: string; イ: string; ウ: string },
): string {
  const lines: string[] = [];
  lines.push(`【試験区分】${examLabel(question.exam)}（午後II）`);
  lines.push(`【出題年度】${question.year}年 ${question.season === "spring" ? "春期" : "秋期"}`);
  lines.push(`【問題タイトル】${question.title}`);
  lines.push("");
  lines.push("【問題本文（背景）】");
  lines.push(question.context);
  lines.push("");
  lines.push("【IPA 公式採点講評・出題趣旨】");
  lines.push(question.officialReview);
  lines.push("");
  lines.push(`【受験生の業種】${INDUSTRY_LABELS[industry]}`);
  lines.push("");
  lines.push("【受験生の論述】");
  for (const sub of question.subPrompts) {
    const text = answers[sub.key] ?? "";
    lines.push("---");
    lines.push(`■ 設問${sub.key}（目安 ${sub.targetChars}字、${sub.minChars}-${sub.maxChars}字）`);
    lines.push(`設問: ${sub.prompt}`);
    lines.push(`想定する論述要素: ${sub.modelOutline}`);
    lines.push(`受験生の論述（${text.length}字）:`);
    lines.push(text || "（無回答）");
  }
  lines.push("---");
  lines.push("以上を上記の採点指針に従い、指定 JSON 形式のみで返してください。");
  return lines.join("\n");
}

function clamp(n: number, lo = 0, hi = 100): number {
  if (!Number.isFinite(n)) return lo;
  return Math.max(lo, Math.min(hi, Math.round(n)));
}

function safeParseGrading(
  raw: string,
  question: EssayQuestion,
  industry: Industry,
  answers: { ア: string; イ: string; ウ: string },
): EssayGradingResult | null {
  const fenced = raw.match(/```(?:json)?\s*([\s\S]+?)```/);
  const candidate = fenced ? fenced[1] : raw;
  const objMatch = candidate.match(/(\{[\s\S]*\})/);
  const json = objMatch?.[1] ?? candidate.trim();
  try {
    const obj = JSON.parse(json) as {
      rank?: EssayRank;
      passProbability?: number;
      subResults?: Array<Partial<EssaySubResult>>;
      overallAdvice?: string;
      unnecessaryElements?: string[];
      improvedExample?: string;
    };
    if (!obj.subResults || !Array.isArray(obj.subResults)) return null;

    const subResults: EssaySubResult[] = (["ア", "イ", "ウ"] as const).map((key) => {
      const found = obj.subResults!.find((s) => s.key === key);
      const text = answers[key] ?? "";
      return {
        key,
        score: clamp(Number(found?.score ?? 0)),
        axes: {
          relevance: clamp(Number(found?.axes?.relevance ?? found?.score ?? 0)),
          logic: clamp(Number(found?.axes?.logic ?? found?.score ?? 0)),
          concreteness: clamp(Number(found?.axes?.concreteness ?? found?.score ?? 0)),
          industryFit: clamp(Number(found?.axes?.industryFit ?? found?.score ?? 0)),
        },
        goodPoints: Array.isArray(found?.goodPoints) ? found!.goodPoints!.map(String) : [],
        improvements: Array.isArray(found?.improvements) ? found!.improvements!.map(String) : [],
        missingElements: Array.isArray(found?.missingElements)
          ? found!.missingElements!.map(String)
          : [],
        charCount: text.length,
      };
    });

    const rank: EssayRank =
      obj.rank === "A" || obj.rank === "B" || obj.rank === "C" || obj.rank === "fail"
        ? obj.rank
        : "C";

    return {
      questionId: question.id,
      industry,
      rank,
      passProbability: clamp(Number(obj.passProbability ?? 0)),
      subResults,
      overallAdvice: typeof obj.overallAdvice === "string" ? obj.overallAdvice : "",
      unnecessaryElements: Array.isArray(obj.unnecessaryElements)
        ? obj.unnecessaryElements.map(String)
        : [],
      improvedExample: typeof obj.improvedExample === "string" ? obj.improvedExample : undefined,
      gradedAt: new Date().toISOString(),
    };
  } catch {
    return null;
  }
}

function buildMockGrading(
  question: EssayQuestion,
  industry: Industry,
  answers: { ア: string; イ: string; ウ: string },
): EssayGradingResult {
  const subResults: EssaySubResult[] = (["ア", "イ", "ウ"] as const).map((key) => {
    const sub = question.subPrompts.find((p) => p.key === key)!;
    const text = answers[key] ?? "";
    const len = text.trim().length;
    let score = 0;
    if (len === 0) score = 0;
    else if (len < sub.minChars * 0.5) score = 25;
    else if (len < sub.minChars) score = 50;
    else if (len > sub.maxChars * 1.3) score = 55;
    else score = 70;
    return {
      key,
      score,
      axes: {
        relevance: score,
        logic: Math.max(0, score - 5),
        concreteness: Math.max(0, score - 10),
        industryFit: Math.max(0, score - 15),
      },
      goodPoints:
        len > 0
          ? ["設問の構造を理解した記述になっています", `${INDUSTRY_LABELS[industry]}の文脈で論述を試みています`]
          : [],
      improvements:
        len === 0
          ? ["まず論述を記入してください"]
          : [
              `想定論述要素「${sub.modelOutline}」のキーワードを盛り込みましょう`,
              "結論→理由→具体例の順で論理を整理してください",
            ],
      missingElements: ["（モック採点）固有性のある具体的な施策・数値"],
      charCount: text.length,
    };
  });
  const avg = Math.round(subResults.reduce((acc, r) => acc + r.score, 0) / subResults.length);
  const rank: EssayRank = avg >= 70 ? "A" : avg >= 50 ? "B" : avg >= 30 ? "C" : "fail";
  return {
    questionId: question.id,
    industry,
    rank,
    passProbability: avg,
    subResults,
    overallAdvice:
      "（モック採点）GEMINI_API_KEY を設定すると、IPA 元採点者プロンプトに基づいた本番品質の AI 採点が利用できます。",
    unnecessaryElements: [],
    improvedExample: undefined,
    gradedAt: new Date().toISOString(),
  };
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

  const question = findEssayQuestion(payload.questionId);
  if (!question) {
    return NextResponse.json(
      { error: "not_found", message: "対象の論述問題が見つかりません。" },
      { status: 404 },
    );
  }

  const totalLen =
    payload.answers.ア.trim().length +
    payload.answers.イ.trim().length +
    payload.answers.ウ.trim().length;
  if (totalLen < 100) {
    return NextResponse.json(
      {
        error: "too_short",
        message: "論述が短すぎます。少なくとも合計100字以上で記入してください。",
      },
      { status: 400 },
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

  const ipRl = await checkIpRateLimit(req, "essay-grade");
  if (!ipRl.ok) {
    return NextResponse.json(
      { error: "rate_limited", message: "リクエストが集中しています。しばらく待ってから再試行してください。", reason: ipRl.reason, resetAt: ipRl.resetAt },
      { status: 429, headers: { "X-Error-Type": "rate_limited" } },
    );
  }

  let provider: LLMProvider;
  try {
    provider = await getProvider();
  } catch {
    return NextResponse.json(
      { error: "provider_unavailable", message: "AI 採点サービスが一時的に利用できません。" },
      { status: 503, headers: { "X-Error-Type": "server_error" } },
    );
  }

  if (provider.name === "mock") {
    const mock = buildMockGrading(question, payload.industry, payload.answers);
    return NextResponse.json(mock, {
      headers: {
        "X-RateLimit-Limit": String(rl.limit),
        "X-RateLimit-Remaining": String(rl.remaining),
        "X-RateLimit-Reset": String(rl.resetAt),
        "X-Provider": provider.name,
      },
    });
  }

  const userPrompt = buildUserPrompt(question, payload.industry, payload.answers);
  const model = resolveModel("free");

  let buf = "";
  try {
    for await (const chunk of provider.streamChat({
      system: ESSAY_SYSTEM_PROMPT,
      messages: [{ role: "user", content: userPrompt }],
      model,
      maxTokens: 4000,
      temperature: 0.2,
    })) {
      buf += chunk;
    }
  } catch (err) {
    const fallback = buildMockGrading(question, payload.industry, payload.answers);
    fallback.overallAdvice = `AI 採点中にエラーが発生したため、簡易採点を表示しています: ${
      err instanceof Error ? err.message : String(err)
    }`;
    return NextResponse.json(fallback, {
      headers: { "X-Provider": provider.name, "X-Error-Type": "provider_error" },
    });
  }

  const parsed =
    safeParseGrading(buf, question, payload.industry, payload.answers) ??
    buildMockGrading(question, payload.industry, payload.answers);
  parsed.model = model;

  return NextResponse.json(parsed, {
    headers: {
      "X-RateLimit-Limit": String(rl.limit),
      "X-RateLimit-Remaining": String(rl.remaining),
      "X-RateLimit-Reset": String(rl.resetAt),
      "X-Provider": provider.name,
    },
  });
}
