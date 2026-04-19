import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export const metadata = {
  title: "利用規約",
};

export default function TermsPage() {
  return (
    <main className="mx-auto w-full max-w-2xl flex-1 px-4 pb-12 pt-6 sm:px-6">
      <Button asChild variant="ghost" size="sm" className="mb-3">
        <Link href="/">
          <ArrowLeft className="h-4 w-4" />
          戻る
        </Link>
      </Button>
      <h1 className="mb-1 text-2xl font-bold">利用規約</h1>
      <p className="mb-8 text-sm text-zinc-500 dark:text-zinc-400">最終更新: 2026年4月19日</p>

      <section className="mb-8 space-y-3 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
        <p>
          過去問AI（以下「本サービス」）をご利用いただく前に、本利用規約をよくお読みください。
          本サービスを利用することにより、本規約に同意したものとみなします。
        </p>
      </section>

      <h2 className="mb-2 text-lg font-semibold">1. サービスの概要とベータ版について</h2>
      <section className="mb-8 space-y-3 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
        <p>
          本サービスは、情報処理技術者試験の過去問学習を支援するAIネイティブな学習支援サービスです。
          現在ベータ版として提供しており、機能・データ・仕様は予告なく変更・中断・終了する場合があります。
          ベータ版の性質上、不具合や予期しない動作が発生する可能性があります。
        </p>
      </section>

      <h2 className="mb-2 text-lg font-semibold">2. AI生成コンテンツについて</h2>
      <section className="mb-8 space-y-3 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
        <p>
          本サービスのAIコパイロットはGoogle Geminiを利用して応答を生成しています。
          生成AIの性質上、解説・応答には誤りが含まれる可能性があります。
          本サービスのAI応答は参考情報としてのみご活用ください。
          重要な判断の根拠とする場合は、IPA公式資料や信頼できる書籍で必ずご確認ください。
        </p>
      </section>

      <h2 className="mb-2 text-lg font-semibold">3. 免責事項</h2>
      <section className="mb-8 space-y-3 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
        <p>
          本サービスは情報処理技術者試験の合否を保証するものではありません。
          学習効果・試験結果について、運営は一切の責任を負いません。
        </p>
        <p>
          本サービスの利用により生じた損害（データ消失・試験不合格等を含む）について、
          運営は故意または重大な過失がある場合を除き、責任を負いません。
        </p>
      </section>

      <h2 className="mb-2 text-lg font-semibold">4. 禁止事項</h2>
      <section className="mb-8 space-y-3 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
        <ul className="list-inside list-disc space-y-1">
          <li>本サービスへの不正アクセスや過度な負荷をかける行為</li>
          <li>本サービスのコンテンツの無断転載・商業利用</li>
          <li>AIコパイロットを悪用した違法・有害コンテンツの生成</li>
          <li>その他、法令・公序良俗に反する行為</li>
        </ul>
      </section>

      <h2 className="mb-2 text-lg font-semibold">5. 出典・著作権</h2>
      <section className="mb-8 space-y-3 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
        <p>
          問題文・選択肢・模範解答はIPA（独立行政法人情報処理推進機構）が公開する公式過去問を使用しています。
          詳細は
          <Link href="/about" className="underline">
            著作権・利用条件
          </Link>
          をご確認ください。
        </p>
      </section>

      <h2 className="mb-2 text-lg font-semibold">6. 準拠法・管轄</h2>
      <section className="mb-8 space-y-3 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
        <p>
          本規約は日本法に準拠します。本サービスに関する紛争は、
          日本の裁判所を専属的合意管轄とします。
        </p>
      </section>

      <h2 className="mb-2 text-lg font-semibold">7. 規約の変更</h2>
      <section className="space-y-3 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
        <p>
          運営は必要に応じて本規約を変更できるものとします。
          重要な変更は本サービス上でお知らせします。
        </p>
      </section>
    </main>
  );
}
