import * as React from "react";
import type { Metadata } from "next";
import { ChatShareView } from "./ChatShareView";

export const metadata: Metadata = {
  title: "AIと一緒に解いたIPA過去問 | 過去問AI",
  description: "過去問AIとの会話を共有しています。",
  robots: { index: false, follow: false },
};

export default function ChatSharePage() {
  return (
    <React.Suspense fallback={<div className="flex min-h-screen items-center justify-center text-sm text-zinc-400">読み込み中...</div>}>
      <ChatShareView />
    </React.Suspense>
  );
}
