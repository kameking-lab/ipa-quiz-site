import type { NextConfig } from "next";
import { resolve } from "node:path";
import { BLOG_ARTICLE_ALIASES } from "./lib/blog/article-aliases";

const isDev = process.env.NODE_ENV === "development";

const cspDirectives = [
  "default-src 'self'",
  // unsafe-inline required for theme bootstrap script in layout.tsx
  // cdn.jsdelivr.net required for Swagger UI on /api-docs
  // va.vercel-scripts.com: Vercel Analytics; vitals.vercel-insights.com: Speed Insights
  // challenges.cloudflare.com: Cloudflare Turnstile (contact-form spam protection)
  // AdSense bootstrap + SODAR traffic-quality runtime. Keep these host-specific;
  // do not relax the whole directive to https:.
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""} https://vercel.live https://cdn.jsdelivr.net https://us-assets.i.posthog.com https://va.vercel-scripts.com https://vitals.vercel-insights.com https://challenges.cloudflare.com https://pagead2.googlesyndication.com https://ep2.adtrafficquality.google https://fundingchoicesmessages.google.com https://www.gstatic.com`,
  "style-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net",
  "img-src 'self' data: blob: https://*.ipa.go.jp https://pagead2.googlesyndication.com https://googleads.g.doubleclick.net https://ep1.adtrafficquality.google https://ep2.adtrafficquality.google https://fundingchoicesmessages.google.com https://www.gstatic.com",
  "font-src 'self' https://cdn.jsdelivr.net",
  // worker-src: service worker at /sw.js (PWA)
  "worker-src 'self'",
  // manifest-src: PWA web app manifest
  "manifest-src 'self'",
  // object-src: block plugins/Flash XSS vectors entirely
  "object-src 'none'",
  // connect-src: Gemini API + Vercel Live + PostHog + Sentry + Vercel Analytics + Speed Insights + AdSense
  "connect-src 'self' https://generativelanguage.googleapis.com https://vercel.live wss://ws-us3.pusher.com wss://ws-eu.pusher.com https://us.i.posthog.com https://us-assets.i.posthog.com https://o4511300167860224.ingest.us.sentry.io https://va.vercel-scripts.com https://vitals.vercel-insights.com https://pagead2.googlesyndication.com https://googleads.g.doubleclick.net https://ep1.adtrafficquality.google https://ep2.adtrafficquality.google https://fundingchoicesmessages.google.com",
  "frame-src https://vercel.live https://challenges.cloudflare.com https://googleads.g.doubleclick.net https://ep2.adtrafficquality.google https://www.google.com https://fundingchoicesmessages.google.com",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "upgrade-insecure-requests",
].join("; ");

const securityHeaders = [
  { key: "X-DNS-Prefetch-Control", value: "on" },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), payment=(), browsing-topics=()",
  },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
  { key: "Cross-Origin-Resource-Policy", value: "same-site" },
  { key: "Content-Security-Policy", value: cspDirectives },
  // Override the default `Server` header so we don't advertise the platform
  // (empirical review A-8: `Server: Vercel` leaked). NOTE: on Vercel the
  // `Server` header is injected by the platform edge and MAY override this
  // app-level value — this is best-effort and must be re-verified on the live
  // deployment. Low impact (fingerprinting only).
  { key: "Server", value: "kakomon-ai" },
];

const longCacheImmutable = {
  key: "Cache-Control",
  value: "public, max-age=31536000, immutable",
};

const nextConfig: NextConfig = {
  webpack(config, { webpack }) {
    if (process.env.WEB_STRICT_CONTENT_GATE === "true") {
      config.resolve.alias["@/lib/kisho-study$"] = resolve(process.cwd(), "mobile/shared/gated-kisho-study.ts");
      config.plugins.push(new webpack.NormalModuleReplacementPlugin(
        /(?:^|[\\/])kisho-study(?:\.ts)?$/,
        resolve(process.cwd(), "mobile/shared/gated-kisho-study.ts"),
      ));
      config.resolve.alias["@/lib/exam-library/reference-aware-grading-index$"] = resolve(process.cwd(), "mobile/shared/granted-paper-grading.ts");
      config.resolve.alias["@/lib/exam-library/survey-assistant-grading-index$"] = resolve(process.cwd(), "mobile/shared/granted-paper-grading.ts");
      // Next's TS-path resolver can resolve the import before the exact alias.
      // Replace both the original request and its resolved absolute resource.
      config.plugins.push(new webpack.NormalModuleReplacementPlugin(
        /(?:^|[\\/])(?:survey-assistant-grading-index|reference-aware-grading-index)(?:\.ts)?$/,
        resolve(process.cwd(), "mobile/shared/granted-paper-grading.ts"),
      ));
    }
    return config;
  },
  turbopack: {
    resolveAlias: process.env.WEB_STRICT_CONTENT_GATE === "true" ? {
      "@/lib/kisho-study": "./mobile/shared/gated-kisho-study.ts",
      "./kisho-study": "./mobile/shared/gated-kisho-study.ts",
      "@/lib/exam-library/survey-assistant-grading-index": "./mobile/shared/granted-paper-grading.ts",
      "@/lib/exam-library/reference-aware-grading-index": "./mobile/shared/granted-paper-grading.ts",
    } : {},
  },
  // Prisma uses the Node-API library engine here (engineType "library"), which loads
  // runtime/library.js + the native .so engine. The per-database WASM query engines /
  // compilers (~50MB, used only by edge/driver-adapter clients) and source maps are
  // traced anyway and pushed /api/copilot past Vercel's 250MB function limit.
  outputFileTracingExcludes: {
    "/*": [
      "./private-assets/**/*",
      "**/node_modules/@prisma/client/runtime/*.wasm-base64.js",
      "**/node_modules/@prisma/client/runtime/*.wasm-base64.mjs",
      "**/node_modules/@prisma/client/runtime/*.map",
    ],
  },
  outputFileTracingIncludes: {
    "/e-learning/exams": ["./data/exam-library/papers/*.json", "./data/exam-library/presentation/*.json", "./data/exam-library/pe-first/*.json"],
    "/api/home/resume": ["./data/exam-library/pe-first/*.json"],
    // Prebuilt copilot index, search docs and sharded questions (pnpm copilot:index:write,
    // run by pnpm build). /api/copilot reads only these in production, not data/questions.
    "/api/copilot": ["./generated/copilot/**/*"],
    "/api/copilot/exam-library": ["./data/exam-library/pe-first/*.json"],
    "/e-learning/search": ["./data/exam-library/pe-first/*.json"],
    "/e-learning/exams/*": ["./data/exam-library/papers/*.json", "./data/exam-library/presentation/*.json", "./data/exam-library/pe-first/*.json"],
    "/api/mobile/catalog": ["./data/exam-library/papers/*.json", "./data/exam-library/presentation/*.json"],
    "/api/mobile/download": ["./data/exam-library/papers/*.json", "./data/exam-library/presentation/*.json"],
    "/api/billing/question": ["./data/exam-library/papers/*.json", "./data/exam-library/presentation/*.json"],
    "/api/mobile/paper-results": ["./data/exam-library/papers/*.json", "./data/exam-library/presentation/*.json"],
  },
  async redirects() {
    return [
      ...Object.entries(BLOG_ARTICLE_ALIASES).map(([alias, canonical]) => ({
        source: `/blog/${alias}`,
        destination: `/blog/${canonical}`,
        statusCode: 301 as const,
      })),
      // /quiz with no mode query → home (broken entry point)
      {
        source: "/quiz",
        missing: [{ type: "query", key: "mode" }],
        destination: "/",
        permanent: true,
      },
      // Consolidated account sub-pages → dashboard
      // (no query string in destination; tabs default to 'overview' and the dashboard's
      // hashchange listener handles deep linking via #tab=...)
      { source: "/account/heatmap", destination: "/account/dashboard", permanent: true },
      { source: "/account/badges", destination: "/account/dashboard", permanent: true },
      { source: "/account/tutor", destination: "/account/dashboard", permanent: true },
      { source: "/account/weakness", destination: "/account/dashboard", permanent: true },
      // /my-progress was a thinner second dashboard — folded into the full one.
      // The 301 protects any existing bookmark / inbound link.
      { source: "/my-progress", destination: "/account/dashboard", permanent: true },
      // Account settings sub-pages → settings
      { source: "/account/notifications", destination: "/settings", permanent: true },
      { source: "/account/api-keys", destination: "/settings/api-keys", permanent: true },
      // Retired account preference / management sub-pages. 音声・BGM(/audio) と
      // アバター(/avatar) は個人設定なので /settings に集約。請求情報(/billing) は
      // 全機能無料化で支払い管理が無くなったため、アカウント管理の入口である
      // /settings へ寄せる（旧ページは /auth/signin への素通しになっていた）。
      { source: "/account/audio", destination: "/settings", permanent: true },
      { source: "/account/avatar", destination: "/settings", permanent: true },
      { source: "/account/billing", destination: "/settings", permanent: true },
      // Merged pages (content absorbed into about / transparency)
      { source: "/support", destination: "/about#support", permanent: true },
      // /stats is now a first-class public dashboard (see app/stats/page.tsx)
      // Practice renamed
      { source: "/practice/weakness", destination: "/quiz?mode=weakness", permanent: true },
      // /quickstart consolidated into the home page (which already lists all 13
      // exam categories). 301 the old entry points so inbound links/bookmarks
      // land on the home hero's "try 3 questions" flow instead of 404ing.
      { source: "/quickstart", destination: "/", permanent: true },
      { source: "/quickstart/:exam", destination: "/", permanent: true },
      // /feedback never existed as a page and was 404ing (empirical review A-1:
      // a stale "誤りを報告" link GET /feedback). Error reports belong in the
      // unified contact form; redirect so any stale link/bookmark lands there
      // instead of a 404.
      { source: "/feedback", destination: "/contact?type=error", permanent: true },
      // PRK: retire previews and fictional content in one hop (keep search/bookmarks).
      { source: "/demo/afternoon", destination: "/demo/essay-grading", statusCode: 301 },
      { source: "/ranking", destination: "/account/dashboard#mock-scores", statusCode: 301 },
      { source: "/referral", destination: "/contact#legacy-benefits", statusCode: 301 },
      { source: "/student", destination: "/contact#legacy-benefits", statusCode: 301 },
      { source: "/success-stories", destination: "/blog", statusCode: 301 },
      { source: "/success-stories/:exam(ip|sg|fe|ap|st|sa|pm|nw|db|es|sc|sm|au)/:slug*", destination: "/:exam", statusCode: 301 },
      { source: "/success-stories/:path*", destination: "/blog", statusCode: 301 },
      { source: "/admin/moderation", destination: "/admin", statusCode: 301 },
      { source: "/admin/competitors", destination: "/admin", statusCode: 301 },
      { source: "/testimonials", destination: "/blog", statusCode: 301 },
      // /trust (旧「信頼性ポリシー — なぜ過去問AIが選ばれるのか」) は同インテントの
      // /why-kakomon-ai（「過去問AI を選ぶ理由」）に統合済。301 で誘導する。
      { source: "/trust", destination: "/why-kakomon-ai", permanent: true },
    ];
  },
  // The Vercel build skips Next's built-in type check (12-68s per build).
  // Type safety is still enforced before anything reaches main: the required
  // GitHub Actions check (.github/workflows/e2e.yml) runs `pnpm typecheck` AND
  // a full `pnpm build` (VERCEL unset, so the type check runs there) on every
  // PR and every push to main. Local `pnpm build` keeps the check too.
  typescript: {
    ignoreBuildErrors: process.env.VERCEL === "1",
  },
  compress: true,
  poweredByHeader: false,
  reactStrictMode: true,
  productionBrowserSourceMaps: false,
  experimental: {
    // Large static question corpus: bound prerender workers so Windows CI does
    // not exhaust memory while generating thousands of /q pages.
    cpus: 4,
    optimizePackageImports: [
      "lucide-react",
      "@radix-ui/react-dialog",
      "@radix-ui/react-switch",
      "@radix-ui/react-slot",
      "react-markdown",
      "remark-gfm",
    ],
  },
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      { protocol: "https", hostname: "*.ipa.go.jp" },
    ],
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
      {
        source: "/icon-:size.svg",
        headers: [longCacheImmutable],
      },
      {
        source: "/favicon.svg",
        headers: [longCacheImmutable],
      },
      {
        source: "/manifest.webmanifest",
        headers: [
          { key: "Cache-Control", value: "public, max-age=86400" },
        ],
      },
      {
        source: "/sw.js",
        headers: [
          { key: "Cache-Control", value: "public, max-age=0, must-revalidate" },
          { key: "Service-Worker-Allowed", value: "/" },
        ],
      },
    ];
  },
};

// SENTRY_DSN が設定されている場合のみ withSentryConfig を適用してソースマップ
// アップロード等を有効化。未設定時は素の nextConfig を返してビルドコストゼロ。
// dynamic require を使って Sentry の native deps を DSN がない環境でロードしない。
const hasSentryDsn = Boolean(process.env.SENTRY_DSN || process.env.NEXT_PUBLIC_SENTRY_DSN);

const exported: NextConfig = hasSentryDsn
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  ? require("@sentry/nextjs").withSentryConfig(nextConfig, {
      org: process.env.SENTRY_ORG,
      project: process.env.SENTRY_PROJECT,
      silent: !process.env.CI,
      widenClientFileUpload: true,
      tunnelRoute: "/monitoring",
      disableLogger: true,
    })
  : nextConfig;

export default exported;
