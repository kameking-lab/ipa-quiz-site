import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";

const cspDirectives = [
  "default-src 'self'",
  // unsafe-inline required for theme bootstrap script in layout.tsx
  // cdn.jsdelivr.net required for Swagger UI on /api-docs
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""} https://vercel.live https://cdn.jsdelivr.net https://us-assets.i.posthog.com`,
  "style-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net",
  "img-src 'self' data: blob: https://*.ipa.go.jp",
  "font-src 'self' https://cdn.jsdelivr.net",
  // connect-src: Gemini API (server-side) + Vercel Live + PostHog + Sentry
  "connect-src 'self' https://generativelanguage.googleapis.com https://vercel.live wss://ws-us3.pusher.com wss://ws-eu.pusher.com https://us.i.posthog.com https://us-assets.i.posthog.com https://o4511300167860224.ingest.us.sentry.io",
  "frame-src https://vercel.live",
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
      { source: "/account/heatmap", destination: "/account/dashboard", permanent: true },
      { source: "/account/badges", destination: "/account/dashboard", permanent: true },
      { source: "/account/tutor", destination: "/account/dashboard", permanent: true },
      { source: "/account/weakness", destination: "/account/dashboard", permanent: true },
      // Account settings sub-pages → settings
      { source: "/account/notifications", destination: "/settings", permanent: true },
      { source: "/account/api-keys", destination: "/settings/api-keys", permanent: true },
      // Merged pages (content absorbed into about / transparency)
      { source: "/support", destination: "/about#support", permanent: true },
      { source: "/stats", destination: "/transparency#metrics", permanent: true },
      // Practice renamed
      { source: "/practice/weakness", destination: "/quiz?mode=weakness", permanent: true },
    ];
  },
  compress: true,
  poweredByHeader: false,
  reactStrictMode: true,
  productionBrowserSourceMaps: false,
  experimental: {
    optimizePackageImports: ["lucide-react", "@radix-ui/react-dialog", "@radix-ui/react-switch", "@radix-ui/react-slot"],
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

// eslint-disable-next-line @typescript-eslint/no-require-imports
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
