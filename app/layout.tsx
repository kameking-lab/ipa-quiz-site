import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";
import { ThemeProvider, THEME_BOOTSTRAP_SCRIPT } from "@/components/theme-provider";
import { ThemeToggle } from "@/components/ThemeToggle";
import { ServiceWorkerRegistration } from "@/components/ServiceWorkerRegistration";
import { KeyboardShortcutsHelp } from "@/components/KeyboardShortcutsHelp";
import { StreakBadge } from "@/lib/streak/StreakBadge";
import { StreakTracker } from "@/lib/streak/StreakTracker";
import { Analytics } from "@vercel/analytics/next";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "https://ipa-quiz-site.vercel.app");

export const metadata: Metadata = {
  title: {
    default: "IPA Quiz — AIネイティブ過去問学習",
    template: "%s | IPA Quiz",
  },
  description:
    "応用情報技術者試験の過去問400問をゼロ遷移UIとAIコパイロットで高速学習。ランダム・年度別・分野別・復習モード対応。β公開中・全機能無料。",
  applicationName: "IPA Quiz",
  metadataBase: new URL(BASE_URL),
  manifest: "/manifest.webmanifest",
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/icon-192.svg", type: "image/svg+xml", sizes: "192x192" },
    ],
    apple: "/icon-192.svg",
  },
  openGraph: {
    title: "IPA Quiz — AIネイティブ過去問学習",
    description:
      "応用情報技術者試験の過去問400問をゼロ遷移UIとAIコパイロットで高速学習。β公開中・全機能無料。",
    type: "website",
    locale: "ja_JP",
    siteName: "IPA Quiz",
    url: BASE_URL,
  },
  twitter: {
    card: "summary_large_image",
    title: "IPA Quiz — AIネイティブ過去問学習",
    description: "応用情報技術者試験の過去問400問をAIコパイロット付きで学習。β公開中・全機能無料。",
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
          <ServiceWorkerRegistration />
          <KeyboardShortcutsHelp />
          <StreakTracker />
          <Analytics />
          <div className="pointer-events-none fixed right-3 top-3 z-40">
            <div className="pointer-events-auto">
              <StreakBadge />
            </div>
          </div>
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-xl focus:bg-sky-600 focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white focus:shadow-lg"
          >
            メインコンテンツへスキップ
          </a>
          <div className="flex min-h-[100dvh] flex-col">
            <span id="main-content" aria-hidden="true" />
            {children}
            {/* Global CTA banner */}
            <div className="border-t border-sky-100 bg-sky-50 px-4 py-4 dark:border-sky-900/30 dark:bg-sky-950/20">
              <div className="mx-auto flex max-w-3xl flex-col items-center gap-3 sm:flex-row sm:justify-between">
                <p className="text-center text-sm font-medium text-sky-900 dark:text-sky-100 sm:text-left">
                  AIコパイロット付き過去問演習 — 今すぐ無料で始められます
                </p>
                <a
                  href="/quiz?mode=random&exam=ap"
                  className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-sky-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-sky-700 active:scale-95 dark:bg-sky-500 dark:hover:bg-sky-600"
                  data-track="footer-cta-banner"
                >
                  無料で過去問を解く
                </a>
              </div>
            </div>
            <footer className="pb-safe mt-auto border-t border-zinc-200 bg-white/60 px-4 py-6 text-xs text-zinc-600 dark:border-zinc-800 dark:bg-zinc-950/60 dark:text-zinc-400">
              <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-3 sm:flex-row">
                <div className="text-center sm:text-left">
                  <div className="mb-1.5">
                    <span className="mr-2 inline-block rounded bg-sky-100 px-1.5 py-0.5 text-[10px] font-semibold text-sky-700 dark:bg-sky-950 dark:text-sky-300">
                      β公開中
                    </span>
                    出典: IPA 情報処理技術者試験（
                    <a
                      href="https://www.ipa.go.jp/shiken/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline decoration-zinc-300 hover:text-zinc-900 dark:decoration-zinc-700 dark:hover:text-zinc-100"
                    >
                      ipa.go.jp
                    </a>
                    ） /{" "}
                    <Link
                      href="/about"
                      className="underline decoration-zinc-300 hover:text-zinc-900 dark:decoration-zinc-700 dark:hover:text-zinc-100"
                    >
                      著作権・利用条件
                    </Link>
                  </div>
                  <div className="flex flex-wrap justify-center gap-x-3 gap-y-1 sm:justify-start">
                    {(
                      [
                        ["/terms", "利用規約"],
                        ["/privacy", "プライバシーポリシー"],
                        ["/operator", "運営者情報"],
                        ["/settings", "設定"],
                      ] as const
                    ).map(([href, label]) => (
                      <Link
                        key={href}
                        href={href}
                        className="underline decoration-zinc-300 hover:text-zinc-900 dark:decoration-zinc-700 dark:hover:text-zinc-100"
                      >
                        {label}
                      </Link>
                    ))}
                    <a
                      href="https://x.com/kakomon_ai_jp"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline decoration-zinc-300 hover:text-zinc-900 dark:decoration-zinc-700 dark:hover:text-zinc-100"
                    >
                      X (@kakomon_ai_jp)
                    </a>
                    <a
                      href="https://note.com/kakomon_ai"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline decoration-zinc-300 hover:text-zinc-900 dark:decoration-zinc-700 dark:hover:text-zinc-100"
                    >
                      note
                    </a>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="hidden sm:inline">テーマ:</span>
                  <ThemeToggle />
                </div>
              </div>
            </footer>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
