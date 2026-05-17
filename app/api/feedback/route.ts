import { NextResponse } from "next/server";
import { z } from "zod";
import path from "path";
import fs from "fs";

import { getClientIp } from "@/lib/rate-limit/server";

export const runtime = "nodejs";

// 5 req/min/IP — independent from the AI copilot rate limiter
const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 5;
interface Bucket { count: number; resetAt: number }
const buckets = new Map<string, Bucket>();

function checkFeedbackRateLimit(ip: string): boolean {
  const now = Date.now();
  const existing = buckets.get(ip);
  if (!existing || existing.resetAt <= now) {
    buckets.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return true;
  }
  if (existing.count >= MAX_PER_WINDOW) return false;
  existing.count += 1;
  return true;
}

// Purge stale buckets every 10 minutes
if (typeof setInterval !== "undefined") {
  setInterval(() => {
    const now = Date.now();
    for (const [k, b] of buckets) {
      if (b.resetAt <= now) buckets.delete(k);
    }
  }, 10 * 60_000);
}

const schema = z.object({
  category: z.enum(["typo", "wrong-answer", "poor-explanation", "other"]),
  comment: z.string().max(800).optional(),
  pageUrl: z.string().url().max(500),
  questionId: z.string().max(120).optional(),
});

export type FeedbackEntry = z.infer<typeof schema> & {
  ts: string;
  ip: string;
};

function appendToJsonl(entry: FeedbackEntry): void {
  try {
    const dateStr = new Date().toISOString().slice(0, 10); // YYYY-MM-DD
    const dir = path.join(process.cwd(), "data", "feedback");
    fs.mkdirSync(dir, { recursive: true });
    const file = path.join(dir, `${dateStr}.jsonl`);
    fs.appendFileSync(file, JSON.stringify(entry) + "\n", "utf-8");
  } catch {
    // Vercel read-only fs: fall through to console.log
  }
}

export async function POST(request: Request) {
  const ip = getClientIp(request);

  if (!checkFeedbackRateLimit(ip)) {
    return NextResponse.json({ ok: false, error: "rate-limited" }, { status: 429 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid-json" }, { status: 400 });
  }

  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: "invalid-body" }, { status: 400 });
  }

  const entry: FeedbackEntry = {
    ts: new Date().toISOString(),
    ip,
    ...parsed.data,
  };

  appendToJsonl(entry);
  console.log("[feedback]", JSON.stringify(entry));

  return NextResponse.json({ ok: true });
}
