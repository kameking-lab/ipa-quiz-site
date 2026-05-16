import type { Metadata } from "next";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ContactForm } from "./ContactForm";
import { SITE_BASE_URL, SITE_NAME } from "@/lib/seo/config";

const CONTACT_OG_URL = `${SITE_BASE_URL}/api/og?${new URLSearchParams({
  type: "default",
  title: "お問い合わせ",
  subtitle: "教育貢献プロジェクト",
  body: "改善要望・バグ報告・教育機関活用ご相談・メディア対応。すべての投稿に目を通します。",
}).toString()}`;

export const metadata: Metadata = {
  title: "お問い合わせ",
  description:
    "改善要望・バグ報告・教育機関での活用ご相談・企業活用・メディア対応など、過去問 AI へのお問い合わせはこちらから。すべての投稿に目を通し、原則 3 営業日以内に返信します。",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "お問い合わせ | 過去問AI",
    description:
      "改善要望・バグ報告・教育機関活用ご相談・メディア対応。すべての投稿に目を通し、原則 3 営業日以内に返信します。",
    url: `${SITE_BASE_URL}/contact`,
    type: "website",
    siteName: SITE_NAME,
    locale: "ja_JP",
    images: [{ url: CONTACT_OG_URL, width: 1200, height: 630, alt: "お問い合わせ" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "お問い合わせ | 過去問AI",
    description:
      "改善要望・バグ報告・教育機関活用ご相談・メディア対応。すべての投稿に目を通し、原則 3 営業日以内に返信します。",
    images: [CONTACT_OG_URL],
  },
};

export default function ContactPage() {
  return (
    <main className="mx-auto w-full max-w-2xl flex-1 px-4 pb-16 pt-8 sm:px-6">
      <header className="mb-6">
        <Badge variant="success">教育貢献プロジェクト</Badge>
        <h1 className="mt-2 text-2xl font-bold sm:text-3xl">お問い合わせ</h1>
        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
          改善要望・質問・教育機関での活用ご相談・取材ご依頼など、お気軽にお寄せください。
          すべての投稿に目を通します。
        </p>
      </header>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-base">先にご確認いただきたいページ</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-1 text-sm">
            <li>
              ・利用方法・解説の精度等：
              <Link href="/faq" className="ml-1 underline hover:text-zinc-900 dark:hover:text-zinc-50">
                よくある質問
              </Link>
            </li>
            <li>
              ・プロジェクトの考え方：
              <Link href="/about" className="ml-1 underline hover:text-zinc-900 dark:hover:text-zinc-50">
                /about
              </Link>
            </li>
          </ul>
        </CardContent>
      </Card>

      <ContactForm />

      <p className="mt-8 text-xs text-zinc-500 dark:text-zinc-400">
        ※ いただいた個人情報は、お問い合わせ対応のためにのみ利用します。詳細は{" "}
        <Link href="/privacy" className="underline hover:text-zinc-700 dark:hover:text-zinc-300">
          プライバシーポリシー
        </Link>{" "}
        をご覧ください。
      </p>
    </main>
  );
}
