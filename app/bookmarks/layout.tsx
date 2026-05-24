import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ブックマーク｜過去問AI",
  description:
    "気になる過去問をワンタップで保存し、自由なタグで整理して後から復習できるブックマーク機能。試験区分・年度・分野をまたいで自分専用の問題集を作成可能。データはお使いのブラウザのみに保存され、ログイン不要で利用できます。",
  alternates: { canonical: "/bookmarks" },
  robots: { index: false, follow: false },
};

export default function BookmarksLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
