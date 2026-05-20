import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ブックマーク",
  description:
    "保存した問題をタグで整理し、後から復習できるブックマーク機能。データはブラウザにのみ保存されます。",
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
