import { NextResponse } from "next/server";
import { z } from "zod";
import { getProvider, resolveModel } from "@/lib/ai/provider";
import type { LLMProvider } from "@/lib/ai/provider";
import { checkRateLimit, getClientIp } from "@/lib/rate-limit/server";
import { captureException } from "@/lib/monitoring/sentry";

export const runtime = "nodejs";

const ESSAY_EXAMS = ["st", "sa", "pm", "sm", "au"] as const;
type EssayExam = (typeof ESSAY_EXAMS)[number];

const BodySchema = z.object({
  exam: z.enum(ESSAY_EXAMS),
  theme: z.string().max(300).optional(),
  essay: z.string().min(800).max(5000),
});

const EXAM_FOCUS: Record<EssayExam, string> = {
  st: "経営戦略・IT戦略立案者の視点。経営目標との整合、投資対効果、ステークホルダー合意形成。",
  sa: "システムアーキテクチャ設計者の視点。要件と非機能要件、トレードオフ判断、技術選定の根拠。",
  pm: "プロジェクトマネージャの視点。スコープ・スケジュール・コスト・リスク・品質・ステークホルダー管理の具体性。",
  sm: "ITサービスマネージャの視点。ITIL準拠、可用性・キャパシティ・問題管理、運用品質指標。",
  au: "システム監査人の視点。コントロールの十分性、独立性、監査証跡、リスクベースの評価。",
};

const ESSAY_SYSTEM_PROMPT = `あなたはIPAの高度区分の論述試験(午後II)を採点する経験豊富な採点者です。
受験生の論述を、以下の観点で厳格かつ建設的に採点・添削してください。

## 採点観点（IPA公式採点講評を踏まえて）
1. **設問への適合性**: 設問の問いに直接答えているか
2. **論旨の一貫性**: 第1章(背景)→第2章(課題)→第3章(対応策)の構造が明確か
3. **具体性**: 数値・固有名詞・施策の具体性。一般論で終わっていないか
4. **専門観点の充足**: 試験区分が要求する専門観点を網羅しているか
5. **独自性・自発性**: 受験者自身の判断・工夫が見えるか

## 出力フォーマット
必ず以下のMarkdown構成で出力してください:

### 総合評価
A / B / C / D の4段階で評価し、その理由を1段落で。

### 観点別スコア
表形式で5観点それぞれを5段階評価:

| 観点 | スコア | コメント |
|------|--------|---------|
| 設問への適合性 | ★★★☆☆ | … |
| 論旨の一貫性 | ★★★★☆ | … |
| 具体性 | ★★☆☆☆ | … |
| 専門観点の充足 | ★★★☆☆ | … |
| 独自性・自発性 | ★★★★☆ | … |

### 良かった点（3点）
- …
- …
- …

### 改善提案（3〜5点）
- **具体的な書き換え例**を含めて指摘してください。「〜と書くとよい」など。
- …

### 次に強化すべき観点
1段落で、論述スキル全体として次に磨くべき観点を提案。

採点は厳しめに、ただし学習者を伸ばす建設的なトーンで。`;

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

  const ip = getClientIp(req);
  const rl = checkRateLimit({ ip });
  if (!rl.ok) {
    const message =
      rl.reason === "daily"
        ? "本日の利用上限に達しました。JST 0:00 にリセットされます。"
        : "少し速いようです。1分ほど待ってから再度お試しください。";
    return NextResponse.json(
      { error: "rate_limited", message, reason: rl.reason, resetAt: rl.resetAt },
      { status: 429, headers: { "X-Error-Type": "rate_limited" } },
    );
  }

  const examFocus = EXAM_FOCUS[payload.exam];
  const themePart = payload.theme ? `## 設問テーマ\n${payload.theme}\n\n` : "";
  const userMessage = `## 試験区分
${payload.exam.toUpperCase()} (重視する観点: ${examFocus})

${themePart}## 受験生の論述
${payload.essay}

上記の論述を、観点別に厳しく採点・添削してください。`;

  let provider: LLMProvider;
  try {
    provider = await getProvider();
  } catch {
    return NextResponse.json(
      {
        error: "provider_unavailable",
        message: "AIサービスが一時的に利用できません。しばらく待ってから再試行してください。",
      },
      { status: 503, headers: { "X-Error-Type": "server_error" } },
    );
  }

  const model = resolveModel("free");

  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    async start(controller) {
      try {
        for await (const chunk of provider.streamChat({
          system: ESSAY_SYSTEM_PROMPT,
          messages: [{ role: "user", content: userMessage }],
          model,
          maxTokens: 2000,
          temperature: 0.4,
        })) {
          controller.enqueue(encoder.encode(chunk));
        }
        controller.close();
      } catch (err) {
        await captureException(err, {
          route: "/api/essay-grading",
          extra: { provider: provider.name, model, exam: payload.exam },
        });
        controller.enqueue(
          encoder.encode(
            "\n\n[エラー] AI応答の取得に失敗しました。少し時間を置いて再度お試しください。",
          ),
        );
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-store",
    },
  });
}
