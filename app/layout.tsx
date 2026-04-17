import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";
import { ThemeProvider, THEME_BOOTSTRAP_SCRIPT } from "@/components/theme-provider";
import { ThemeToggle } from "@/components/ThemeToggle";
import { ServiceWorkerRegistration } from "@/components/ServiceWorkerRegistration";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "IPA Quiz - AIネイティブ過去問学習",
    template: "%s | IPA Quiz",
  },
  description:
    "情報処理技術者試験(IPA)全区分の過去問を、AIコパイロット付きの最速UIで学習。応用情報・基本情報・高度試験まで対応予定。",
  applicationName: "IPA Quiz",
  manifest: "/manifest.webmanifest",
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/icon-192.svg", type: "image/svg+xml", sizes: "192x192" },
    ],
    apple: "/icon-192.svg",
  },
  openGraph: {
    title: "IPA Quiz - AIネイティブ過去問学習",
    description:
      "ゼロ遷移の四択クイズ + AIコパイロットで、IPA過去問を最速で解く学習プラットフォーム",
    type: "website",
    locale: "ja_JP",
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
          <div className="flex min-h-[100dvh] flex-col">
            {children}
            <footer className="mt-auto border-t border-zinc-200 bg-white/60 px-4 py-6 text-xs text-zinc-600 dark:border-zinc-800 dark:bg-zinc-950/60 dark:text-zinc-400">
              <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-3 sm:flex-row">
                <div className="text-center sm:text-left">
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
