import { NextResponse } from "next/server";
import { z } from "zod";
import fs from "node:fs/promises";
import path from "node:path";
import { getClientIp } from "@/lib/rate-limit/server";

export const runtime = "nodejs";

const EMAIL_RATE_WINDOW_MS = 60_000;
const EMAIL_RATE_LIMIT = 5;
const emailRateBuckets = new Map<string, { count: number; resetAt: number }>();

function checkEmailRateLimit(ip: string): { ok: boolean } {
  const now = Date.now();
  const existing = emailRateBuckets.get(ip);
  if (!existing || existing.resetAt <= now) {
    emailRateBuckets.set(ip, { count: 1, resetAt: now + EMAIL_RATE_WINDOW_MS });
    return { ok: true };
  }
  if (existing.count >= EMAIL_RATE_LIMIT) return { ok: false };
  existing.count += 1;
  return { ok: true };
}

const BodySchema = z.object({
  email: z.string().email().max(254),
  source: z.enum(["pricing", "upsell-dialog", "other"]).default("other"),
  plan: z.enum(["premium", "team"]).optional(),
});

interface EmailEntry {
  email: string;
  source: string;
  plan?: string;
  createdAt: string;
  ip: string;
}

function getStorePath(): string {
  const dataDir = process.env.EMAIL_LIST_DIR ?? path.join(process.cwd(), ".data");
  return path.join(dataDir, "email-list.jsonl");
}

async function appendEntry(entry: EmailEntry): Promise<void> {
  const file = getStorePath();
  await fs.mkdir(path.dirname(file), { recursive: true });
  await fs.appendFile(file, JSON.stringify(entry) + "\n", "utf8");
}

async function entryExists(email: string): Promise<boolean> {
  const file = getStorePath();
  try {
    const content = await fs.readFile(file, "utf8");
    return content.split("\n").some((line) => {
      if (!line.trim()) return false;
      try {
        const parsed = JSON.parse(line) as EmailEntry;
        return parsed.email.toLowerCase() === email.toLowerCase();
      } catch {
        return false;
      }
    });
  } catch (err) {
    if ((err as NodeJS.ErrnoException).code === "ENOENT") return false;
    throw err;
  }
}

export async function POST(req: Request) {
  const ip = getClientIp(req);
  const limit = checkEmailRateLimit(ip);
  if (!limit.ok) {
    return NextResponse.json(
      { error: "リクエストが多すぎます。少し時間を置いてお試しください。" },
      { status: 429 },
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "不正なリクエスト形式です" }, { status: 400 });
  }

  const parsed = BodySchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "メールアドレスが正しくありません" },
      { status: 400 },
    );
  }

  const { email, source, plan } = parsed.data;

  try {
    if (await entryExists(email)) {
      return NextResponse.json({ ok: true, duplicate: true });
    }

    await appendEntry({
      email,
      source,
      plan,
      createdAt: new Date().toISOString(),
      ip,
    });

    return NextResponse.json({ ok: true, duplicate: false });
  } catch (err) {
    console.error("[email-list] write failed", err);
    return NextResponse.json(
      { error: "登録に失敗しました。時間を置いて再度お試しください。" },
      { status: 500 },
    );
  }
}

export async function GET() {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}
