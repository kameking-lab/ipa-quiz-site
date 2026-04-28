import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { PAID_MODE } from "@/lib/paid-mode";

export const metadata = {
  title: "特定商取引法に基づく表記",
  description:
    "過去問AI に関する特定商取引法に基づく表記。有料プラン提供時に有効化されます。",
  robots: { index: false, follow: false },
};

export default function CommercePage() {
  // 教育貢献プロジェクトとして全機能無料運営中。
  // 有料プラン復活時 (NEXT_PUBLIC_PAID_MODE=true) のみ表示する。
  if (!PAID_MODE) {
    notFound();
  }

  return (
    <main className="mx-auto w-full max-w-2xl flex-1 px-4 pb-12 pt-6 sm:px-6">
      <Button asChild variant="ghost" size="sm" className="mb-3">
        <Link href="/">
          <ArrowLeft className="h-4 w-4" />
          戻る
        </Link>
      </Button>
      <h1 className="mb-1 text-2xl font-bold">特定商取引法に基づく表記</h1>
      <p className="mb-8 text-sm text-zinc-500 dark:text-zinc-400">
        最終更新: 2026年4月23日
      </p>

      <section className="mb-6 rounded-lg border border-sky-300 bg-sky-50 p-4 text-sm leading-relaxed text-sky-900 dark:border-sky-800 dark:bg-sky-950 dark:text-sky-100">
        <p>
          有料プラン再開時に販売事業者の情報を本ページで開示します。
          詳細は
          <Link href="/terms" className="underline">
            利用規約
          </Link>
          および
          <Link href="/privacy" className="underline">
            プライバシーポリシー
          </Link>
          をご確認ください。
        </p>
      </section>
    </main>
  );
}
