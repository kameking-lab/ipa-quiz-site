import type { Metadata } from "next";
import { SITE_BASE_URL, SITE_NAME } from "@/lib/seo/config";

const OG_IMAGE = (() => {
  const params = new URLSearchParams({
    type: "topic",
    title: "設定",
    subtitle: "学習スタイルを最適化",
    body: "テーマ・AIキャラ・通知・学習履歴を一画面でカスタマイズ。",
  });
  return `${SITE_BASE_URL}/api/og?${params.toString()}`;
})();

const DESCRIPTION =
  "過去問AI の表示テーマ・AI キャラクター・クイズオプション・通知・試験予定・学習履歴・APIキーなどをまとめて管理する設定ページ。学習スタイルを自分仕様に最適化できます。";

export const metadata: Metadata = {
  title: "設定",
  description: DESCRIPTION,
  alternates: { canonical: "/settings" },
  robots: { index: false, follow: false },
  openGraph: {
    title: `設定 | ${SITE_NAME}`,
    description:
      "テーマ・AIキャラ・通知・学習履歴・APIキーをまとめて管理する設定ページ。",
    url: `${SITE_BASE_URL}/settings`,
    type: "website",
    siteName: SITE_NAME,
    locale: "ja_JP",
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "設定" }],
  },
};

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
