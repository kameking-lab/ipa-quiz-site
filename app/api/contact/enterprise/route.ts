// POST /api/contact/enterprise
//
// 法人問い合わせフォーム受信。
// - Zod でバリデーション
// - RESEND_API_KEY が設定されていれば Resend 経由でメール通知
// - 未設定なら console.log にフォールバック（本番ログから手動回収）
// - DB 不要。メール送信失敗でも 200 を返してユーザー体験を壊さない（ログのみ）

import { NextResponse } from "next/server";
import { z } from "zod";
import { captureException } from "@/lib/monitoring/sentry";

export const runtime = "nodejs";

const PayloadSchema = z.object({
  company: z.string().min(1).max(200),
  name: z.string().min(1).max(100),
  email: z.string().email().max(200),
  phone: z.string().max(50).optional().default(""),
  memberCount: z.string().max(50).optional().default(""),
  targetExam: z.string().max(100).optional().default(""),
  message: z.string().max(4000).optional().default(""),
});

const NOTIFY_TO = process.env.ENTERPRISE_CONTACT_TO ?? "kakomon.ai.jp@gmail.com";
const NOTIFY_FROM = process.env.ENTERPRISE_CONTACT_FROM ?? "no-reply@ipa-quiz-site.vercel.app";

async function notifyByResend(body: z.infer<typeof PayloadSchema>): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.log("[enterprise-contact] RESEND_API_KEY not set — falling back to console log", {
      to: NOTIFY_TO,
      payload: body,
    });
    return;
  }

  const subject = `【法人問い合わせ】${body.company} / ${body.name}`;
  const text = [
    `会社名: ${body.company}`,
    `氏名:   ${body.name}`,
    `Email:  ${body.email}`,
    `電話:   ${body.phone}`,
    `人数:   ${body.memberCount}`,
    `対象試験: ${body.targetExam}`,
    "",
    "ご質問・ご要望:",
    body.message || "（記入なし）",
  ].join("\n");

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: NOTIFY_FROM,
      to: [NOTIFY_TO],
      reply_to: body.email,
      subject,
      text,
    }),
  });
  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    console.error("[enterprise-contact] Resend send failed", res.status, detail);
    await captureException(new Error(`Resend send failed: ${res.status} ${detail}`), {
      route: "/api/contact/enterprise",
      extra: { status: res.status, to: NOTIFY_TO },
    });
  }
}

export async function POST(req: Request) {
  let json: unknown;
  try {
    json = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  const parsed = PayloadSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "validation_failed", issues: parsed.error.issues },
      { status: 400 },
    );
  }

  try {
    await notifyByResend(parsed.data);
  } catch (err) {
    await captureException(err, { route: "/api/contact/enterprise" });
  }

  return NextResponse.json({ ok: true });
}
