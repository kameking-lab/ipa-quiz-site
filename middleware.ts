import { NextRequest, NextResponse } from "next/server";

const REALM = "Kakomon AI Admin";

// 恒久的に削除され「後継ページが存在しない」ルート群。301 で寄せる先が無いので
// 410 Gone を返し、クローラに「もう辿らなくてよい」と明示してクロール資産を回復する。
// （後継があるものは next.config.ts の redirects() 側で 301 する。）
// 全て git 履歴上 削除済みの page.tsx で、現在は実体が無く 404 になっている。
// マッチャは config.matcher 側に同じパスを列挙する必要がある（gone-paths-in-matcher
// の回帰テストで両者の同期をガードしている）。
export const GONE_PATHS: readonly string[] = [
  "/commerce", // 旧 特定商取引法表記（全機能無料化で不要）
  "/pricing", // 旧 料金表
  "/premium", // 旧 プレミアム LP
  "/premium/essay",
  "/premium/heatmap",
  "/premium/simulator",
  "/enterprise/pilot", // 旧 法人向け
  "/enterprise/pricing",
  "/enterprise/sso",
  "/contact/enterprise",
  "/contact/enterprise/thanks",
  "/security", // 旧 B2B セキュリティ(SOC2/SAML) LP
  "/case-studies", // 旧 法人導入事例
  "/podcast",
  "/launch", // 旧 ローンチ告知
  "/diagnosis", // 旧 試験区分診断（後継なし）
  "/account/pass-simulator", // 旧 合格シミュレータ
  "/feedback/public",
  "/community/questions",
  "/community/stories",
  "/legal/dpa",
  "/legal/msa",
  "/legal/sla",
  // 旧 開発・社内レビュー用スキャフォールド（非公開・後継なし）。git 履歴上 削除済みで
  // 現在は 404。後継が無いので 301 先も無く、二度と復活しない開発痕跡なので 410 を返し
  // クローラに「もう辿らなくてよい」と明示する（404 はリトライされうるが 410 は恒久削除）。
  "/exec-review",
  "/feature-review",
  "/final-review",
  "/final-review-v3",
  "/scoring-test",
  "/strategy-discussion",
  "/strategy-discussion-v2",
  "/test/posthog",
  "/test/sentry",
  "/tmp/round7-review",
];

const GONE_SET = new Set<string>(GONE_PATHS);

function gone(): NextResponse {
  return new NextResponse(
    "410 Gone — このページは恒久的に削除されました。",
    {
      status: 410,
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    },
  );
}

function unauthorized(): NextResponse {
  return new NextResponse("Unauthorized", {
    status: 401,
    headers: { "WWW-Authenticate": `Basic realm="${REALM}"` },
  });
}

function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let result = 0;
  for (let i = 0; i < a.length; i += 1) {
    result |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return result === 0;
}

// Vercel 環境変数に貼り付けた際の末尾改行/空白を吸収する。
// atob は「バイナリ文字列」を返すため、UTF-8 を含むパスワードは TextDecoder で正しく復号する。
function decodeBasicCredentials(header: string): { user: string; pass: string } | null {
  const b64 = header.slice(6).trim();
  let bytes: Uint8Array;
  try {
    const bin = atob(b64);
    bytes = Uint8Array.from(bin, (c) => c.charCodeAt(0));
  } catch {
    return null;
  }
  const decoded = new TextDecoder("utf-8").decode(bytes);
  const sepIdx = decoded.indexOf(":");
  if (sepIdx < 0) return null;
  return { user: decoded.slice(0, sepIdx), pass: decoded.slice(sepIdx + 1) };
}

export function middleware(req: NextRequest) {
  // 削除済みルートは admin 認証より前に 410 を返す（admin パスとは重複しない）。
  if (GONE_SET.has(req.nextUrl.pathname)) return gone();

  const user = process.env.ADMIN_BASIC_USER?.trim();
  const pass = process.env.ADMIN_BASIC_PASS?.trim();

  if (!user || !pass) {
    return new NextResponse(
      "Admin auth is not configured. Set ADMIN_BASIC_USER and ADMIN_BASIC_PASS env vars in Vercel (Project → Settings → Environment Variables).",
      { status: 503 },
    );
  }

  const auth = req.headers.get("authorization");
  if (!auth || !auth.toLowerCase().startsWith("basic ")) return unauthorized();

  const creds = decodeBasicCredentials(auth);
  if (!creds) return unauthorized();

  if (timingSafeEqual(creds.user, user) && timingSafeEqual(creds.pass, pass)) {
    return NextResponse.next();
  }
  return unauthorized();
}

// Match the bare paths explicitly in addition to the wildcards so a request to
// exactly `/admin` (or `/api/admin`) is always gated — a bare `/admin` that
// slipped past the matcher would render the admin index unauthenticated.
// The handler is fully synchronous (env read + constant-time compare): it
// returns 401/503 immediately and never redirects, so /admin cannot "hang"
// server-side. The browser's native Basic-auth credential dialog (triggered by
// the 401 WWW-Authenticate header) is the intended human login UX; an automated
// /headless navigation that cannot answer that dialog will appear to stall —
// that is the dialog, not a server hang (empirical review A-4 / F-1).
// matcher は静的解析されるため literal で列挙する。admin パスに加えて GONE_PATHS の
// 各パスを正確に同じ文字列で並べる（gone-paths-in-matcher テストが両者の同期をガード）。
export const config = {
  matcher: [
    "/admin",
    "/admin/:path*",
    "/api/admin",
    "/api/admin/:path*",
    // --- GONE_PATHS（410 Gone・後継なし削除ページ）---
    "/commerce",
    "/pricing",
    "/premium",
    "/premium/essay",
    "/premium/heatmap",
    "/premium/simulator",
    "/enterprise/pilot",
    "/enterprise/pricing",
    "/enterprise/sso",
    "/contact/enterprise",
    "/contact/enterprise/thanks",
    "/security",
    "/case-studies",
    "/podcast",
    "/launch",
    "/diagnosis",
    "/account/pass-simulator",
    "/feedback/public",
    "/community/questions",
    "/community/stories",
    "/legal/dpa",
    "/legal/msa",
    "/legal/sla",
    // 旧 開発・社内レビュー用スキャフォールド（削除済み・410）
    "/exec-review",
    "/feature-review",
    "/final-review",
    "/final-review-v3",
    "/scoring-test",
    "/strategy-discussion",
    "/strategy-discussion-v2",
    "/test/posthog",
    "/test/sentry",
    "/tmp/round7-review",
  ],
};
