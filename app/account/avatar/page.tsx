import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { AvatarPicker } from "./AvatarPicker";

export const metadata: Metadata = {
  title: "アバター設定",
  description: "DiceBear アバタージェネレータでプロフィール画像をカスタマイズ。",
  robots: { index: false, follow: false },
};

export default function AvatarPage() {
  return (
    <main className="mx-auto w-full max-w-2xl px-4 py-8">
      <Link
        href="/account"
        className="mb-4 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        アカウントへ戻る
      </Link>
      <h1 className="mb-2 text-2xl font-bold tracking-tight">アバター設定</h1>
      <p className="mb-6 text-sm text-muted-foreground">
        10 種類のスタイルから選んで、ランキングや学習履歴に表示されるアバターをカスタマイズできます。
      </p>
      <AvatarPicker />
    </main>
  );
}
