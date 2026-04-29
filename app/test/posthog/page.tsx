import type { Metadata } from "next";
import { PostHogTestClient } from "./PostHogTestClient";

export const metadata: Metadata = {
  title: "PostHog Test",
  robots: { index: false, follow: false },
};

export default function PostHogTestPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 p-8">
      <h1 className="text-2xl font-bold">PostHog テスト</h1>
      <p className="text-sm text-zinc-500">ボタンをクリックしてテストイベントを発火します。</p>
      <PostHogTestClient />
    </main>
  );
}
