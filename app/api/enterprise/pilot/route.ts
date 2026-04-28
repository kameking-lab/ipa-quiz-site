import { NextResponse } from "next/server";
import { z } from "zod";
import fs from "node:fs/promises";
import path from "node:path";
import { getClientIp } from "@/lib/rate-limit/server";

export const runtime = "nodejs";

const RATE_WINDOW_MS = 60_000;
const RATE_LIMIT = 5;
const buckets = new Map<string, { count: number; resetAt: number }>();

function checkRateLimit(ip: string): { ok: boolean } {
  const now = Date.now();
  const existing = buckets.get(ip);
  if (!existing || existing.resetAt <= now) {
    buckets.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return { ok: true };
  }
  if (existing.count >= RATE_LIMIT) return { ok: false };
  existing.count += 1;
  return { ok: true };
}

const BodySchema = z.object({
  companyName: z.string().min(1).max(120),
  contactName: z.string().min(1).max(80),
  contactEmail: z.string().email().max(254),
  headcount: z.string().min(1).max(40),
  targetExams: z.array(z.string().max(8)).max(13),
  message: z.string().max(2000).optional(),
});

interface PilotEntry {
  companyName: string;
  contactName: string;
  contactEmail: string;
  headcount: string;
  targetExams: string[];
  message?: string;
  createdAt: string;
  ip: string;
}

function getStorePath(): string {
  const dataDir = process.env.ENTERPRISE_PILOT_DIR ?? path.join(process.cwd(), ".data");
  return path.join(dataDir, "enterprise-pilot.jsonl");
}

async function appendEntry(entry: PilotEntry): Promise<void> {
  const file = getStorePath();
  await fs.mkdir(path.dirname(file), { recursive: true });
  await fs.appendFile(file, JSON.stringify(entry) + "\n", "utf8");
}

export async function POST(req: Request) {
  const ip = getClientIp(req);
  const limit = checkRateLimit(ip);
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
      { error: "入力内容に不備があります" },
      { status: 400 },
    );
  }

  try {
    await appendEntry({
      ...parsed.data,
      createdAt: new Date().toISOString(),
      ip,
    });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[enterprise-pilot] write failed", err);
    return NextResponse.json(
      { error: "申込に失敗しました。時間を置いて再度お試しください。" },
      { status: 500 },
    );
  }
}

export async function GET() {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}
