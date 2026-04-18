import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export const metadata = {
  title: "このサイトについて・著作権",
};

export default function AboutPage() {
  return (
    <main className="mx-auto w-full max-w-2xl flex-1 px-4 pb-12 pt-6 sm:px-6">
      <Button asChild variant="ghost" size="sm" className="mb-3">
        <Link href="/">
          <ArrowLeft className="h-4 w-4" />
          戻る
        </Link>
      </Button>
      <h1 className="mb-4 text-2xl font-bold">このサイトについて</h1>

      <section className="mb-8 space-y-3 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
        <p>
          IPA Quiz は、独立行政法人 情報処理推進機構(IPA)が実施する情報処理技術者試験の公開過去問を、
          AI コパイロット付きの高速な学習体験で提供するオープンな学習支援サイトです。
        </p>
        <p>
          ランダム出題・年度別・分野別・復習モードなど複数の切り口に加え、各問題に
          AI コパイロットが常駐し、用語解説・選択肢分析・類題生成・誤答分析などを対話で提供します。
        </p>
      </section>

      <h2 className="mb-2 text-lg font-semibold">出典・著作権</h2>
      <section className="mb-8 space-y-3 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
        <p>
          当サイトに掲載している問題文・選択肢・模範解答等の一次情報は、IPA が公式サイトで
          公開している過去問題 PDF を原典としています。各問の解説末尾から原典 PDF へリンクしています。
        </p>
        <p>
          IPA は、試験問題の使用に関し、利用の許諾は不要・使用料も不要である旨を公式に明示しています
          （詳細は
          <a
            className="underline"
            href="https://www.ipa.go.jp/shiken/kakomondai/copyright.html"
            target="_blank"
            rel="noopener noreferrer"
          >
            IPA 過去問題の使用について
          </a>
          を参照）。
          一方で、引用・二次利用の際には「出典: IPA 情報処理技術者試験」の明記が求められます。
          本サイトはフッターおよび各問の解説内に出典を明示しています。
        </p>
        <p>
          解説本文・AI による応答・本サイト独自の UI・タグ付けデータなどは、IPA の著作権とは独立した
          本サイト運営者の著作物です。無断転載を禁じます。
        </p>
      </section>

      <h2 className="mb-2 text-lg font-semibold">AI コパイロットについて</h2>
      <section className="mb-8 space-y-3 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
        <p>
          AI コパイロットは Google Gemini を用いて応答を生成しています。生成 AI の性質上、
          内容に誤りが含まれる可能性があります。重要な判断の根拠とする場合は、IPA の公式資料や
          信頼できる書籍で確認してください。
        </p>
        <p>
          β公開期間中は全機能を無料でご利用いただけます。公平利用のため、AI コパイロットは
          1日あたりの利用上限を設けています（JST 0:00 リセット）。
        </p>
      </section>

      <h2 className="mb-2 text-lg font-semibold">プライバシー</h2>
      <section className="mb-8 space-y-3 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
        <p>
          学習履歴・回答履歴は、お使いのブラウザの localStorage にのみ保存され、
          サーバーには送信されません。端末・ブラウザを変更すると履歴は引き継がれません。
        </p>
        <p>
          AI コパイロット機能では、質問文と該当問題のコンテキストが Gemini API に送信されます。
          個人を特定する情報は送信しません。
        </p>
      </section>

      <h2 className="mb-2 text-lg font-semibold">β版について</h2>
      <section className="mb-8 space-y-3 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
        <p>
          本サイトは現在ベータ版です。問題データ・機能は順次拡充予定です。
          データは予告なく変更・削除される場合があります。
        </p>
      </section>

      <h2 className="mb-2 text-lg font-semibold">お問い合わせ</h2>
      <section className="space-y-3 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
        <p>
          問題内容の誤りや運用に関するご指摘は、
          <a
            className="underline"
            href="https://github.com/kameking-lab/ipa-quiz-site/issues"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub Issues
          </a>
          からご連絡ください。
        </p>
      </section>
    </main>
  );
}
