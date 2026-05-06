import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";
import { ThemeProvider, THEME_BOOTSTRAP_SCRIPT } from "@/components/theme-provider";
import { I18nProvider } from "@/lib/i18n/I18nProvider";
import { ThemeToggle } from "@/components/ThemeToggle";
import { SiteHeader } from "@/components/SiteHeader";
import { ServiceWorkerRegistration } from "@/components/ServiceWorkerRegistration";
import { DeferredLayoutWidgets } from "@/components/DeferredLayoutWidgets";
import { Analytics } from "@vercel/analytics/next";
import { Suspense } from "react";
import { EmailLeadCapture } from "@/components/EmailLeadCapture";
import { PostHogProvider } from "@/components/PostHogProvider";
import { SITE_BASE_URL } from "@/lib/seo/config";

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

const BASE_URL = SITE_BASE_URL;

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
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
    other: {
      "msvalidate.01": process.env.BING_SITE_VERIFICATION ?? "",
    },
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
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link rel="dns-prefetch" href="https://us.i.posthog.com" />
      </head>
      <body className="min-h-[100dvh] antialiased">
        <ThemeProvider>
          <I18nProvider>
          <Suspense fallback={null}>
            <PostHogProvider />
          </Suspense>
          <ServiceWorkerRegistration />
          <DeferredLayoutWidgets />
          <Analytics />
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-xl focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-primary-foreground focus:shadow-lg"
          >
            メインコンテンツへスキップ
          </a>
          <div className="flex min-h-[100dvh] flex-col overflow-x-clip">
            <SiteHeader />
            <div id="main-content" tabIndex={-1} className="flex flex-1 flex-col overflow-x-clip outline-none">
              {children}
            </div>
            <footer className="pb-safe mt-auto border-t border-border bg-background/60 px-4 py-8 text-xs text-muted-foreground">
              <div className="mx-auto max-w-5xl">
                {/* 4-group nav grid */}
                <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
                  <div>
                    <p className="mb-2.5 text-[11px] font-semibold uppercase tracking-wide text-foreground">
                      サービス
                    </p>
                    <ul className="space-y-0">
                      <li><Link href="/faq" className="block py-2 hover:text-foreground">FAQ</Link></li>
                      <li><Link href="/features" className="block py-2 hover:text-foreground">機能特集</Link></li>
                      <li><Link href="/glossary" className="block py-2 hover:text-foreground">用語集</Link></li>
                      <li><Link href="/keywords" className="block py-2 hover:text-foreground">学習トピック</Link></li>
                      <li><Link href="/contact" className="block py-2 hover:text-foreground">お問い合わせ</Link></li>
                      <li><Link href="/blog" className="block py-2 hover:text-foreground">ブログ</Link></li>
                      <li><Link href="/sitemap" className="block py-2 hover:text-foreground">サイトマップ</Link></li>
                    </ul>
                  </div>
                  <div>
                    <p className="mb-2.5 text-[11px] font-semibold uppercase tracking-wide text-foreground">
                      プロジェクト
                    </p>
                    <ul className="space-y-0">
                      <li><Link href="/about" className="block py-2 hover:text-foreground">プロジェクトについて</Link></li>
                      <li><Link href="/transparency" className="block py-2 hover:text-foreground">透明性レポート</Link></li>
                      <li><Link href="/operator" className="block py-2 hover:text-foreground">運営者情報</Link></li>
                    </ul>
                  </div>
                  <div>
                    <p className="mb-2.5 text-[11px] font-semibold uppercase tracking-wide text-foreground">
                      法的
                    </p>
                    <ul className="space-y-0">
                      <li><Link href="/terms" className="block py-2 hover:text-foreground">利用規約</Link></li>
                      <li><Link href="/privacy" className="block py-2 hover:text-foreground">プライバシー</Link></li>
                    </ul>
                  </div>
                  <div>
                    <p className="mb-2.5 text-[11px] font-semibold uppercase tracking-wide text-foreground">
                      その他
                    </p>
                    <ul className="space-y-0">
                      <li>
                        <a
                          href="https://x.com/kakomon_ai_jp"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block py-2 hover:text-foreground"
                        >
                          X フォロー
                        </a>
                      </li>
                      <li>
                        <a
                          href="https://note.com/kakomon_ai"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block py-2 hover:text-foreground"
                        >
                          note
                        </a>
                      </li>
                      <li className="flex items-center gap-2">
                        <span>テーマ</span>
                        <ThemeToggle />
                      </li>
                    </ul>
                    <div className="mt-3 space-y-1.5">
                      <p className="text-[11px] font-semibold uppercase tracking-wide text-foreground">
                        週1レポート
                      </p>
                      <EmailLeadCapture variant="footer" />
                    </div>
                  </div>
                </div>

                {/* IPA attribution (required) */}
                <div className="mt-6 border-t border-border pt-4 text-center text-[11px] text-muted-foreground sm:text-left">
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
                  <span className="ml-3 text-zinc-500 dark:text-zinc-500">
                    本サービスは IPA 非公式の学習支援サービスです。
                  </span>
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
