import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "設定｜過去問AI",
  description:
    "テーマ（ライト／ダーク／システム）、1日の目標問題数、AIコパイロットの応答スタイル、通知、データのエクスポート／インポートなどを管理。設定値はブラウザのみに保存され、外部送信されません。",
  alternates: { canonical: "/settings" },
  robots: { index: false, follow: false },
};

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
