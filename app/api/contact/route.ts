import { NextResponse, after } from "next/server";
import { z } from "zod";
import { checkRateLimit, getClientIp, readFeedbackFlag } from "@/lib/rate-limit/server";
import {
  FEEDBACK_COOKIE_NAME,
  feedbackCookieOptions,
  issueFeedbackToken,
} from "@/lib/rate-limit/feedback-token";
import { maskPII, totalHits } from "@/lib/feedback/pii-masker";
import { verifyTurnstileToken } from "@/lib/turnstile";
import { sendSlackMessage } from "@/lib/notify/slack";

export const runtime = "nodejs";

const FeedbackSchema = z.object({
  kind: z.literal("feedback"),
  source: z.string().max(80).optional(),
  choice: z.string().max(40),
  comment: z.string().max(1500).optional().default(""),
});

const QuestionCommentSchema = z.object({
  kind: z.literal("question-comment"),
  questionId: z.string().min(1).max(120),
  comment: z.string().min(1).max(1500),
});

// Per-question 役立った/分かりにくい/誤り報告 rating from QuestionFeedback.
// Folded in here (was the separate /api/question-feedback endpoint) so there is
// a single inbound ingress for all user signals.
const QuestionRatingSchema = z.object({
  kind: z.literal("question-rating"),
  questionId: z.string().min(1).max(120),
  rating: z.enum(["helpful", "unclear", "report"]),
  comment: z.string().max(800).optional().default(""),
});

const ContactSchema = z.object({
  kind: z.literal("contact"),
  category: z.enum([
    "improvement",
    "question",
    "education",
    "enterprise",
    "media",
    "other",
  ]),
  name: z.string().max(80).optional().default(""),
  email: z.string().max(120).optional().default(""),
  body: z.string().min(1).max(4000),
  turnstileToken: z.string().max(4096).optional(),
});

const BodySchema = z.union([
  FeedbackSchema,
  QuestionCommentSchema,
  QuestionRatingSchema,
  ContactSchema,
]);

/**
 * POST /api/contact
 *
 * Educational-contribution project's catch-all inbound endpoint:
 * - feedback: sent by FeedbackGateModal after the user picks a choice
 * - question-comment: sent by QuestionCommentBox under each problem
 * - contact: sent by /contact form
 *
 * Currently logs to stdout (Vercel logs) and optionally forwards to Resend
 * if RESEND_API_KEY is set. Personal info masking happens at the boundary.
 */
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

  // Cloudflare Turnstile on the public contact form (phase 11 / A-2). Verify
  // fails open when TURNSTILE_SECRET_KEY is unset (dev / CI / pre-activation),
  // so behavior is unchanged until the keys are configured in production.
  if (payload.kind === "contact") {
    const verify = await verifyTurnstileToken(payload.turnstileToken, ip);
    if (!verify.ok) {
      return NextResponse.json(
        { error: "turnstile_failed", message: "スパム判定により送信できませんでした。ページを再読み込みしてお試しください。" },
        { status: 403 },
      );
    }
  }

  // Reuse the same rate-limit bucket so abuse mitigations apply uniformly,
  // but never block feedback submissions outright (educational mission).
  const rl = await checkRateLimit({ ip, feedbackSubmitted: readFeedbackFlag(req) });
  if (!rl.ok && rl.reason === "minute") {
    return NextResponse.json(
      { error: "rate_limited", message: "短時間に投稿が集中しています。1 分ほど待ってから再送信してください。" },
      { status: 429 },
    );
  }

  // フィードバック / 問題コメントは公開ログに残るため PII を機械マスキングする。
  // contact フォームは本人連絡が必要なので元のメールは保持する。
  let maskedPayload: typeof payload = payload;
  let maskHits: Record<string, number> = {};
  if (payload.kind === "feedback") {
    const result = maskPII(payload.comment ?? "");
    maskedPayload = { ...payload, comment: result.masked };
    maskHits = result.hits;
  } else if (payload.kind === "question-comment") {
    const result = maskPII(payload.comment);
    maskedPayload = { ...payload, comment: result.masked };
    maskHits = result.hits;
  } else if (payload.kind === "question-rating") {
    const result = maskPII(payload.comment ?? "");
    maskedPayload = { ...payload, comment: result.masked };
    maskHits = result.hits;
  }
  const safeBody = JSON.stringify(maskedPayload);

  // Centralized log line; downstream tooling (Datadog, etc.) can consume.
  console.log(
    JSON.stringify({
      tag: "kakomon-ai:inbound",
      kind: payload.kind,
      receivedAt: new Date().toISOString(),
      ipHash: hashIp(ip),
      payload: safeBody,
      maskHits: totalHits(maskHits) > 0 ? maskHits : undefined,
    }),
  );

  // Optional: forward to Resend if configured
  if (process.env.RESEND_API_KEY && process.env.CONTACT_NOTIFY_EMAIL) {
    try {
      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          authorization: `Bearer ${process.env.RESEND_API_KEY}`,
          "content-type": "application/json",
        },
        body: JSON.stringify({
          from: process.env.CONTACT_FROM_EMAIL ?? "noreply@kakomon-ai.dev",
          to: process.env.CONTACT_NOTIFY_EMAIL,
          subject: `[過去問 AI] ${payload.kind} 受信`,
          text: safeBody,
        }),
      });
    } catch (err) {
      console.error("contact forward failed", err);
    }
  }

  // Forward to Slack so inbound signals reach the team (the old admin/feedback
  // dashboard read a file nothing wrote to and was always empty).
  //
  // after() を使う理由:
  // - 素の void は「投げっぱなし」。サーバレスはレスポンス完了で関数が凍結
  //   されるため、Slack への fetch が飛ばずに消えることがある。
  // - await にすると、利用者のフォーム送信に Slack 往復（最大 3 秒）の
  //   レイテンシがそのまま乗る。通知は利用者の応答をブロックする理由がない。
  // after() はレスポンス送出後に実行され、かつ実行がプラットフォーム側で
  // 保証される。recordAiCost で await を選んだのは、あれが §0 のコスト上限
  // という自前の安全装置で、保証を自分の制御フローに閉じる必要があったため。
  // ここは要件が違う（チーム向けのベストエフォート通知）。
  //
  // sendSlackMessage は決して throw しないので、通知が失敗しても
  // 問い合わせ自体は受理済み（fail-open）。
  //
  // after() 自体はリクエストスコープ外で呼ぶと throw する。ルートハンドラは
  // 常にスコープ内なので本番では起きないが、ここで throw すると
  // 「通知の都合で利用者の問い合わせが 500 になって失われる」という、最も
  // 避けたい失敗になる。素の void へ落として通知は試みる。
  const notify = () => sendSlackMessage(buildSlackText(maskedPayload, hashIp(ip)));
  try {
    after(notify);
  } catch {
    void notify();
  }

  const res = NextResponse.json({ ok: true });

  // フィードバックを実際に受理したときだけ、無料枠解除の署名済み証跡を発行する。
  // これがサーバ側で検証可能な唯一の解除根拠（クライアントの自己申告は不可）。
  if (payload.kind === "feedback") {
    const token = issueFeedbackToken();
    if (token) {
      res.cookies.set({
        name: FEEDBACK_COOKIE_NAME,
        value: token,
        ...feedbackCookieOptions(),
      });
    }
  }

  return res;
}

function buildSlackText(payload: z.infer<typeof BodySchema>, ipHash: string): string {
  const head = `[過去問AI] ${payload.kind} 受信 (${ipHash})`;
  switch (payload.kind) {
    case "feedback":
      return `${head}\n選択: ${payload.choice}${payload.source ? ` / ${payload.source}` : ""}\n${payload.comment || "(コメントなし)"}`;
    case "question-comment":
      return `${head}\n問題: ${payload.questionId}\n${payload.comment}`;
    case "question-rating":
      return `${head}\n問題: ${payload.questionId} / 評価: ${payload.rating}\n${payload.comment || "(コメントなし)"}`;
    case "contact":
      return `${head}\n種別: ${payload.category}\nお名前: ${payload.name || "(未記入)"} / メール: ${payload.email || "(未記入)"}\n${payload.body}`;
  }
}

function hashIp(ip: string): string {
  // Cheap non-crypto hash to keep raw IP out of logs
  let h = 0;
  for (let i = 0; i < ip.length; i++) {
    h = (h * 31 + ip.charCodeAt(i)) | 0;
  }
  return `ip-${(h >>> 0).toString(36)}`;
}
