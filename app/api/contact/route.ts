import { NextResponse } from "next/server";
import { z } from "zod";
import { checkRateLimit, getClientIp, readFeedbackFlag } from "@/lib/rate-limit/server";
import { maskPII, totalHits } from "@/lib/feedback/pii-masker";

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
});

const BodySchema = z.union([FeedbackSchema, QuestionCommentSchema, ContactSchema]);

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
  // Reuse the same rate-limit bucket so abuse mitigations apply uniformly,
  // but never block feedback submissions outright (educational mission).
  const rl = checkRateLimit({ ip, feedbackSubmitted: readFeedbackFlag(req) });
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

  return NextResponse.json({ ok: true });
}

function hashIp(ip: string): string {
  // Cheap non-crypto hash to keep raw IP out of logs
  let h = 0;
  for (let i = 0; i < ip.length; i++) {
    h = (h * 31 + ip.charCodeAt(i)) | 0;
  }
  return `ip-${(h >>> 0).toString(36)}`;
}
