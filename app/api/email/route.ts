import { NextResponse } from "next/server";
import { z } from "zod";
import { getClientIp } from "@/lib/rate-limit/server";

export const runtime = "nodejs";

const RATE_WINDOW_MS = 60_000;
const RATE_LIMIT = 10;
const buckets = new Map<string, { count: number; resetAt: number }>();

function rateOk(ip: string): boolean {
  const now = Date.now();
  const b = buckets.get(ip);
  if (!b || b.resetAt <= now) {
    buckets.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return true;
  }
  if (b.count >= RATE_LIMIT) return false;
  b.count += 1;
  return true;
}

const BodySchema = z.object({
  to: z.string().email().max(254),
  subject: z.string().min(1).max(200),
  text: z.string().min(1).max(5000),
  html: z.string().min(1).max(20000).optional(),
  type: z.enum(["welcome", "streak-reminder", "weekly-digest", "test"]).default("test"),
});

interface ResendResponse {
  id?: string;
  message?: string;
}

async function sendViaResend(
  apiKey: string,
  from: string,
  to: string,
  subject: string,
  text: string,
  html: string | undefined,
): Promise<{ ok: boolean; id?: string; error?: string }> {
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ from, to, subject, text, html }),
    });
    const data = (await res.json()) as ResendResponse;
    if (!res.ok) {
      return { ok: false, error: data.message ?? `HTTP ${res.status}` };
    }
    return { ok: true, id: data.id };
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : "fetch failed" };
  }
}

export async function POST(req: Request) {
  const ip = getClientIp(req);
  if (!rateOk(ip)) {
    return NextResponse.json(
      { error: "リクエストが多すぎます。少し時間を置いてお試しください。" },
      { status: 429 },
    );
  }

  let raw: unknown;
  try {
    raw = await req.json();
  } catch {
    return NextResponse.json({ error: "不正なリクエスト形式です" }, { status: 400 });
  }

  const parsed = BodySchema.safeParse(raw);
  if (!parsed.success) {
    return NextResponse.json({ error: "リクエスト内容が無効です" }, { status: 400 });
  }

  const { to, subject, text, html, type } = parsed.data;
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM_EMAIL ?? "noreply@ipa-quiz.example.com";

  if (!apiKey) {
    console.log("[email] mock send", { to, subject, type, preview: text.slice(0, 80) });
    return NextResponse.json({ ok: true, mocked: true, type });
  }

  const result = await sendViaResend(apiKey, from, to, subject, text, html);
  if (!result.ok) {
    console.error("[email] resend failed", result.error);
    return NextResponse.json(
      { error: "メール送信に失敗しました" },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true, id: result.id, type });
}

export async function GET() {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}
