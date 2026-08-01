import { NextResponse } from "next/server";

import { expectedRouteStatuses } from "@/lib/seo/expected-routes";
import type { ExpectedStatus } from "@/lib/seo/expected-routes";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 60;

// 監視対象と期待ステータスは lib/seo/expected-routes.ts を正とする。
// ここに直接ベタ書きしていた頃、恒久削除ルートが 410 に変わったあとも
// 「404 のはず」と見続けていたため、日次チェックが毎回 2 件の不一致を出し、
// 本物の障害と区別がつかない状態になっていた。

function getBaseUrl(): string {
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL;
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return "https://www.kakomon-ai.jp";
}

interface RouteResult {
  path: string;
  expected: ExpectedStatus;
  actual: number;
  ok: boolean;
}

async function probe(
  baseUrl: string,
  path: string,
  expected: ExpectedStatus,
): Promise<RouteResult> {
  try {
    const res = await fetch(`${baseUrl}${path}`, {
      method: "GET",
      redirect: "manual",
      headers: { "user-agent": "ipa-quiz-cron-health-check/1.0" },
    });
    const actual = res.status;
    return { path, expected, actual, ok: actual === expected };
  } catch {
    return {
      path,
      expected,
      actual: 0,
      ok: false,
    };
  }
}

async function notifySlack(message: string): Promise<void> {
  const url = process.env.SLACK_WEBHOOK_URL;
  if (!url) return; // 未設定時は no-op
  try {
    await fetch(url, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ text: message }),
    });
  } catch {
    // 通知失敗は cron 全体を落とさない
  }
}

export async function GET(req: Request): Promise<NextResponse> {
  // Vercel Cron の認証ヘッダ検証（任意）
  const authHeader = req.headers.get("authorization");
  if (process.env.CRON_SECRET && authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }

  const baseUrl = getBaseUrl();
  const results = await Promise.all(
    expectedRouteStatuses().map(({ path, expected }) => probe(baseUrl, path, expected)),
  );

  const failures = results.filter((r) => !r.ok);
  const ok = failures.length === 0;

  if (!ok) {
    const lines = failures.map((f) => `• ${f.path}: expected ${f.expected}, got ${f.actual}`);
    await notifySlack(
      `[ipa-quiz] 日次 404 検出で ${failures.length} 件の不一致:\n${lines.join("\n")}`,
    );
  }

  return NextResponse.json(
    {
      ok,
      baseUrl,
      total: results.length,
      failures: failures.length,
      details: failures.length > 0 ? failures : undefined,
    },
    { status: ok ? 200 : 503 },
  );
}
