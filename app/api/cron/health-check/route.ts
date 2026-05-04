import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 60;

// 必須 200 ルート（15）：lib/seo/expected-404.ts と smoke-routes.spec.ts を正とする。
const REQUIRED_200_ROUTES = [
  "/",
  "/about",
  "/faq",
  "/privacy",
  "/terms",
  "/operator",
  "/settings",
  "/modes/year",
  "/modes/topic",
  "/referral",
  "/transparency",
  "/review",
  "/recommended-books",
  "/robots.txt",
  "/sitemap.xml",
];

const EXAM_CODES = [
  "ip", "sg", "fe", "ap", "sc", "nw", "db",
  "es", "st", "sa", "pm", "sm", "au",
];

const EXPECTED_404_ROUTES = ["/pricing", "/commerce", "/tokutei", "/checkout"];

const ALL_REQUIRED_200 = [
  ...REQUIRED_200_ROUTES,
  ...EXAM_CODES.map((c) => `/${c}`),
  ...EXAM_CODES.map((c) => `/recommended-books/${c}`),
];

function getBaseUrl(): string {
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL;
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return "https://ipa-quiz-site.vercel.app";
}

interface RouteResult {
  path: string;
  expected: 200 | 404;
  actual: number;
  ok: boolean;
}

async function probe(baseUrl: string, path: string, expected: 200 | 404): Promise<RouteResult> {
  try {
    const res = await fetch(`${baseUrl}${path}`, {
      method: "GET",
      redirect: "manual",
      headers: { "user-agent": "ipa-quiz-cron-health-check/1.0" },
    });
    const actual = res.status;
    return { path, expected, actual, ok: actual === expected };
  } catch (e) {
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
  const probes = [
    ...ALL_REQUIRED_200.map((p) => probe(baseUrl, p, 200 as const)),
    ...EXPECTED_404_ROUTES.map((p) => probe(baseUrl, p, 404 as const)),
  ];
  const results = await Promise.all(probes);

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
