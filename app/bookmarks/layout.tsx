import type { Metadata } from "next";
import { SITE_BASE_URL, SITE_NAME } from "@/lib/seo/config";

const OG_IMAGE = (() => {
  const params = new URLSearchParams({
    type: "topic",
    title: "ブックマーク",
    subtitle: "保存した問題をタグで整理",
    body: "復習したい問題をいつでも呼び出せるパーソナル学習ハブ。",
  });
  return `${SITE_BASE_URL}/api/og?${params.toString()}`;
})();

const DESCRIPTION =
  "IPA 情報処理技術者試験の過去問をブラウザ内に保存し、タグで分類して効率よく復習できるパーソナル ブックマーク機能。データは端末ローカルにのみ保存され、エクスポート・インポートも可能です。";

export const metadata: Metadata = {
  title: "ブックマーク",
  description: DESCRIPTION,
  alternates: { canonical: "/bookmarks" },
  robots: { index: false, follow: false },
  openGraph: {
    title: `ブックマーク | ${SITE_NAME}`,
    description:
      "IPA 情報処理技術者試験の過去問をタグで整理して保存できるパーソナル ブックマーク。",
    url: `${SITE_BASE_URL}/bookmarks`,
    type: "website",
    siteName: SITE_NAME,
    locale: "ja_JP",
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "ブックマーク" }],
  },
};

export default function BookmarksLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
