import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";
import { ThemeProvider, THEME_BOOTSTRAP_SCRIPT } from "@/components/theme-provider";
import { I18nProvider } from "@/lib/i18n/I18nProvider";
import { ThemeToggle } from "@/components/ThemeToggle";
import { SiteHeader } from "@/components/SiteHeader";
import { ServiceWorkerRegistration } from "@/components/ServiceWorkerRegistration";
import { KeyboardShortcutsHelp } from "@/components/KeyboardShortcutsHelp";
import { StreakTracker } from "@/lib/streak/StreakTracker";
import { BadgeTracker } from "@/components/motivation/BadgeTracker";
import { CouponTracker } from "@/components/motivation/CouponTracker";
import { TrustBadge } from "@/components/TrustBadge";
import { XFollowButton } from "@/components/XFollowButton";
import { Analytics } from "@vercel/analytics/next";
import { Suspense } from "react";
import { EmailLeadCapture } from "@/components/EmailLeadCapture";
import { WelcomeModal } from "@/components/WelcomeModal";
import { PostHogProvider } from "@/components/PostHogProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
  preload: false,
});

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "https://ipa-quiz-site.vercel.app");

export const metadata: Metadata = {
  title: {
    default: "過去問AI — AIネイティブ過去問学習",
    template: "%s | 過去問AI",
  },
  description:
    "IPA 13試験 12,000問超。AIコパイロットが選択肢ごとに解説。教育貢献プロジェクトとして全機能無料公開中。",
  applicationName: "過去問AI",
  metadataBase: new URL(BASE_URL),
  manifest: "/manifest.webmanifest",
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/icon-192.svg", type: "image/svg+xml", sizes: "192x192" },
      { url: "/icon-512.svg", type: "image/svg+xml", sizes: "512x512" },
    ],
  },
  openGraph: {
    title: "過去問AI — AIネイティブ過去問学習",
    description:
      "IPA 13試験 12,000問超。AIコパイロットが選択肢ごとに解説。教育貢献プロジェクトとして全機能無料公開中。",
    type: "website",
    locale: "ja_JP",
    siteName: "過去問AI",
    url: BASE_URL,
    images: [
      {
        url: `${BASE_URL}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "過去問AI — AIネイティブ過去問学習",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@kakomon_ai_jp",
    creator: "@kakomon_ai_jp",
    title: "過去問AI — AIネイティブ過去問学習",
    description:
      "IPA 13試験 12,000問超。AIコパイロットが選択肢ごとに解説。教育貢献プロジェクトとして全機能無料公開中。",
    images: [`${BASE_URL}/opengraph-image`],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fafafa" },
    { media: "(prefers-color-scheme: dark)", color: "#09090b" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ja"
      className={`${geistSans.variable} ${geistMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_BOOTSTRAP_SCRIPT }} />
      </head>
      <body className="min-h-[100dvh] antialiased">
        <ThemeProvider>
          <I18nProvider>
          <Suspense fallback={null}>
            <PostHogProvider />
          </Suspense>
          <ServiceWorkerRegistration />
          <KeyboardShortcutsHelp />
          <StreakTracker />
          <BadgeTracker />
          <CouponTracker />
          <WelcomeModal />
          <Analytics />
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-xl focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-primary-foreground focus:shadow-lg"
          >
            メインコンテンツへスキップ
          </a>
          <div className="flex min-h-[100dvh] flex-col">
            <SiteHeader />
            <div id="main-content" tabIndex={-1} className="flex flex-1 flex-col outline-none">
              {children}
            </div>
            <footer className="pb-safe mt-auto border-t border-border bg-background/60 px-4 py-6 text-xs text-muted-foreground">
              <div className="mx-auto flex max-w-5xl flex-col gap-4">
                <div className="flex items-center gap-3">
                  <span className="shrink-0 text-[11px] font-medium">📬 週1レポート</span>
                  <EmailLeadCapture variant="footer" className="flex-1" />
                </div>
                <div className="flex flex-wrap items-center justify-center gap-1.5 sm:justify-start">
                  <TrustBadge tone="sky" label="IPA公式準拠" />
                  <TrustBadge tone="emerald" label="日本国内運営" />
                  <TrustBadge tone="amber" label="教育貢献プロジェクト（無料）" />
                  <TrustBadge tone="rose" label="ボランティア有志運営" />
                </div>
                <div className="flex flex-col items-center justify-between gap-3 sm:flex-row sm:items-start">
                  <div className="text-center sm:text-left">
                    <div className="mb-1.5">
                      出典: IPA 情報処理技術者試験（
                      <a
                        href="https://www.ipa.go.jp/shiken/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline decoration-border hover:text-foreground"
                      >
                        ipa.go.jp
                      </a>
                      ） /{" "}
                      <Link
                        href="/about"
                        className="underline decoration-border hover:text-foreground"
                      >
                        著作権・利用条件
                      </Link>
                    </div>
                    <div className="mb-1.5 text-[11px] text-zinc-500 dark:text-zinc-500">
                      本サービスはIPA公式ではない非公式のサービスです。試験名称はIPAの商標です。
                    </div>
                    <div className="flex flex-wrap justify-center gap-x-3 gap-y-1 sm:justify-start">
                      {(
                        [
                          ["/about", "プロジェクトについて"],
                          ["/support", "応援する"],
                          ["/contact", "お問い合わせ"],
                          ["/stats", "公開メトリクス"],
                          ["/transparency", "運営の透明性"],
                          ["/blog", "ブログ"],
                          ["/terms", "利用規約"],
                          ["/privacy", "プライバシー"],
                          ["/operator", "運営者情報"],
                          ["/faq", "FAQ"],
                          ["/settings", "設定"],
                        ] as const
                      ).map(([href, label]) => (
                        <Link
                          key={href}
                          href={href}
                          className="underline decoration-border hover:text-foreground"
                        >
                          {label}
                        </Link>
                      ))}
                      <a
                        href="https://note.com/kakomon_ai"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline decoration-border hover:text-foreground"
                      >
                        note
                      </a>
                    </div>
                  </div>
                  <div className="flex flex-col items-center gap-3 sm:items-end">
                    <XFollowButton />
                    <div className="flex items-center gap-3">
                      <span className="hidden sm:inline">テーマ:</span>
                      <ThemeToggle />
                    </div>
                  </div>
                </div>
              </div>
            </footer>
          </div>
          </I18nProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
