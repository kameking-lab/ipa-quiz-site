import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";

const cspDirectives = [
  "default-src 'self'",
  // unsafe-inline required for theme bootstrap script in layout.tsx
  // cdn.jsdelivr.net required for Swagger UI on /api-docs
  // va.vercel-scripts.com: Vercel Analytics; vitals.vercel-insights.com: Speed Insights
  // challenges.cloudflare.com: Cloudflare Turnstile (contact-form spam protection)
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""} https://vercel.live https://cdn.jsdelivr.net https://us-assets.i.posthog.com https://va.vercel-scripts.com https://vitals.vercel-insights.com https://challenges.cloudflare.com`,
  "style-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net",
  "img-src 'self' data: blob: https://*.ipa.go.jp",
  "font-src 'self' https://cdn.jsdelivr.net",
  // worker-src: service worker at /sw.js (PWA)
  "worker-src 'self'",
  // manifest-src: PWA web app manifest
  "manifest-src 'self'",
  // object-src: block plugins/Flash XSS vectors entirely
  "object-src 'none'",
  // connect-src: Gemini API + Vercel Live + PostHog + Sentry + Vercel Analytics + Speed Insights
  "connect-src 'self' https://generativelanguage.googleapis.com https://vercel.live wss://ws-us3.pusher.com wss://ws-eu.pusher.com https://us.i.posthog.com https://us-assets.i.posthog.com https://o4511300167860224.ingest.us.sentry.io https://va.vercel-scripts.com https://vitals.vercel-insights.com",
  "frame-src https://vercel.live https://challenges.cloudflare.com",
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
  async redirects() {
    return [
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
      // /testimonials (旧「合格体験記・口コミ / ユーザーの声」) was folded into the
      // richer /success-stories (「IPA試験 合格体験記｜13区分の合格者ストーリー集」).
      // 301 protects inbound links / crawl equity for the 合格体験記 intent.
      { source: "/testimonials", destination: "/success-stories", permanent: true },
    ];
  },
  compress: true,
  poweredByHeader: false,
  reactStrictMode: true,
  productionBrowserSourceMaps: false,
  experimental: {
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
