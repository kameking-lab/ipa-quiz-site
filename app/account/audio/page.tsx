import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AudioSettingsClient } from "./AudioSettingsClient";

export const metadata: Metadata = {
  title: "音声・BGM 設定",
  description: "学習中の BGM や読み上げ速度を設定します。",
  robots: { index: false, follow: false },
};

export default function AudioSettingsPage() {
  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-8 sm:py-12">
      <Button asChild variant="ghost" size="sm" className="mb-4">
        <Link href="/account">
          <ArrowLeft className="h-4 w-4" /> アカウントに戻る
        </Link>
      </Button>

      <h1 className="mb-2 text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
        音声・BGM 設定
      </h1>
      <p className="mb-6 text-sm text-zinc-600 dark:text-zinc-400">
        学習中に流す BGM と、問題の読み上げ速度を調整できます。設定はこの端末に保存されます。
      </p>

      <AudioSettingsClient />
    </main>
  );
}
