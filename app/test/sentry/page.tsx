import type { Metadata } from "next";
import { SentryTestClient } from "./SentryTestClient";

export const metadata: Metadata = {
  title: "Sentry Test",
  robots: { index: false, follow: false },
};

export default function SentryTestPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 p-8">
      <h1 className="text-2xl font-bold">Sentry テスト</h1>
      <p className="text-sm text-zinc-500">ボタンをクリックしてテストエラーを発生させます。</p>
      <SentryTestClient />
    </main>
  );
}
