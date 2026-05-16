import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "コンテンツ利用方針",
  description:
    "過去問 AI が掲載する IPA 過去問データ・AI 生成解説のコンテンツ利用方針。IPA 著作権の取り扱いと、当サービスのコンテンツの利用条件について説明します。",
  alternates: { canonical: "/license" },
};

export default function LicensePage() {
  return (
    <main className="mx-auto w-full max-w-2xl flex-1 px-4 pb-12 pt-6 sm:px-6">
      <Button asChild variant="ghost" size="sm" className="mb-3">
        <Link href="/">
          <ArrowLeft className="h-4 w-4" />
          戻る
        </Link>
      </Button>

      <Badge variant="success" className="mb-3">教育貢献プロジェクト</Badge>
      <h1 className="mb-2 text-2xl font-bold">コンテンツ利用方針</h1>
      <p className="mb-8 text-sm text-zinc-600 dark:text-zinc-400">
        本ページでは、過去問 AI が掲載するコンテンツの権利・利用条件について説明します。
      </p>

      <section className="mb-8 space-y-6 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
        <div>
          <h2 className="mb-2 text-base font-semibold text-zinc-900 dark:text-zinc-100">IPA 過去問データについて</h2>
          <p className="mb-2">
            本サービスが掲載する情報処理技術者試験の過去問・解答例は、
            独立行政法人情報処理推進機構（IPA）が公開する公式資料を元にしています。
            著作権は IPA に帰属します。
          </p>
          <p>
            IPA は過去問の教育目的での利用について許諾不要・使用料無料と公式に明示しており、
            本サービスはこの方針に従って掲載しています。
            各問題には原典 PDF へのリンクを掲載し、出典を明示しています。
          </p>
          <p className="mt-2">
            IPA 公式サイト：{" "}
            <a
              href="https://www.ipa.go.jp/shiken/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-zinc-900 dark:hover:text-zinc-50"
            >
              ipa.go.jp/shiken
            </a>
          </p>
        </div>

        <div>
          <h2 className="mb-2 text-base font-semibold text-zinc-900 dark:text-zinc-100">AI 生成解説・オリジナルコンテンツ</h2>
          <p className="mb-2">
            AI コパイロットが生成する解説・補足説明・類題は、本サービスが独自に生成するものです。
            教育目的での個人利用（学習・研究・引用）は歓迎します。
          </p>
          <p>
            商用転載・大規模複製・他サービスへの組み込みについては
            <Link href="/contact" className="mx-1 underline hover:text-zinc-900 dark:hover:text-zinc-50">お問い合わせ</Link>
            ください。
          </p>
        </div>

        <div>
          <h2 className="mb-2 text-base font-semibold text-zinc-900 dark:text-zinc-100">教育機関・法人での利用</h2>
          <p>
            学校・予備校・企業研修での利用は、営利を目的としない範囲で自由に利用いただけます。
            大規模利用・連携についてはご一報ください。
          </p>
        </div>

        <div>
          <h2 className="mb-2 text-base font-semibold text-zinc-900 dark:text-zinc-100">リンク・引用</h2>
          <p>
            本サービスへのリンクは自由です。記事・ブログ・SNS 等での紹介を歓迎します。
            問題の引用は出典（過去問 AI および IPA）を明記の上、教育目的の範囲でお願いします。
          </p>
        </div>

        <div>
          <h2 className="mb-2 text-base font-semibold text-zinc-900 dark:text-zinc-100">免責</h2>
          <p>
            AI 生成解説の正確性について最善を尽くしていますが、
            誤りが含まれる可能性があります。
            重要な判断は必ず IPA 公式資料で確認してください。
            詳細は <Link href="/terms" className="underline hover:text-zinc-900 dark:hover:text-zinc-50">利用規約</Link> をご参照ください。
          </p>
        </div>
      </section>

      <div className="space-y-1 border-t border-border pt-4 text-xs text-zinc-500 dark:text-zinc-400">
        <p>出典: IPA 情報処理技術者試験（<a href="https://www.ipa.go.jp/shiken/" target="_blank" rel="noopener noreferrer" className="underline">ipa.go.jp</a>）</p>
        <p>本サービスは IPA 非公式の学習支援サービスです。</p>
      </div>
    </main>
  );
}
