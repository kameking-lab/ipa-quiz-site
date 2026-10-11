import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "コンテンツ利用方針",
  description:
    "過去問AIの公式問題・正答・独自解説の区別と、実施団体別の利用条件の確認状況。第三者の権利は当サービスが許諾するものではありません。",
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

      <section className="mb-8 rounded-xl border border-border p-4 text-sm leading-relaxed">
        <h2 className="mb-2 font-semibold">原典と独自教材の区別</h2>
        <p>公式問題冊子は設問・選択肢・原図、公式正答表は正答記号の出典です。これらを、当サイトの独自解説すべてを裏付ける資料として扱いません。公式答案用紙や出題の趣旨も、独自解答例の唯一解を保証する資料ではありません。解説・比較表・条件を変えた確認例・独自作図は、過去問AIがAIの支援を用いて編集した学習用教材として区別して表示します。</p>
        <p className="mt-2">公開資料へのリンクや教育目的だけで、すべての資料の転載が許されるとは判断しません。各実施団体の条件と、冊子内の第三者著作物・個別注記を確認する必要があります。当サービスの利用案内は、実施団体・第三者の権利を許諾するものではありません。</p>
      </section>

      <section className="mb-8 text-sm leading-relaxed">
        <h2 className="mb-3 text-base font-semibold">実施団体別の確認状況（2026年10月11日）</h2>
        <ul className="space-y-4">
          <li><strong>IPA：</strong><a href="https://www.ipa.go.jp/shiken/faq.html" className="underline">過去問題の使用方法に関するFAQ</a>を確認。教育目的等で制度の意義に反しない公表問題の利用には、法令に特別の定めがある場合を除き許諾・使用料が不要とされています。著作権の放棄ではなく、年度・期・区分・問番号等の出典と、改変した場合の明記が必要です。</li>
          <li><strong>日本FP協会：</strong><a href="https://www.jafp.or.jp/exam/mohan/files/exam_riyou.pdf" className="underline">公表試験問題の利用案内</a>を確認。案内の対象となる試験・利用除外事項・出典と加工の明記を確認して利用する方針です。金融財政事情研究会が権利を持つ資料まで、一律に同じ条件とは扱いません。</li>
          <li><strong>電気技術者試験センター：</strong><a href="https://www.shiken.or.jp/shiken/faq/faq08/000082.html" className="underline">問題の利用に関するFAQ</a>を確認。教育・学習目的の利用と出典・加工表記の条件に加え、利用の連絡が求められています。当サイトからの連絡完了を示す記録は、この確認では未確認です。</li>
          <li><strong>厚生労働省：</strong><a href="https://www.mhlw.go.jp/chosakuken/" className="underline">コンテンツ利用条件</a>を確認。公共データ利用規約に基づく出典・加工の明記と、適用外のコンテンツ・別条件に注意します。問題冊子内の写真等に第三者の権利がある場合の個別確認は、この確認だけで完了したとは扱いません。</li>
          <li><strong>土地家屋調査士・柔道整復師：</strong>問題・答案用紙・正答は各問題の原典へリンクしています。法務省・試験財団の個々の資料に適用される転載条件と、第三者図版の権利確認を完了した証跡は、このページでは示していません。</li>
          <li><strong>その他の実施団体：</strong>安全衛生技術試験協会、金融財政事情研究会等についても、以下の出典リンクと各冊子の条件を優先します。出典の掲載を許諾取得済み・全件の権利確認済みの証明として表示しません。</li>
        </ul>
        <p className="mt-4">この記録は利用条件の確認範囲を公開するものです。未確認事項を解消した際は、対象資料と確認日を更新します。権利・掲載内容に関するご指摘は<Link href="/contact?type=error" className="underline">お問い合わせ</Link>から問題番号・資料URLを添えてお知らせください。</p>
      </section>

      <section className="mb-8 space-y-6 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
        <div>
          <h2 className="mb-2 text-base font-semibold text-zinc-900 dark:text-zinc-100">IPA 過去問データについて</h2>
          <p className="mb-2">
            本サービスが掲載する情報処理技術者試験の過去問・解答例は、
            独立行政法人情報処理推進機構（IPA）が公開する公式資料を元にしています。
            権利の帰属・転載条件は IPA の案内および問題冊子内の個別表記を優先します。
          </p>
          <p>
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
          <h2 className="mb-2 text-base font-semibold text-zinc-900 dark:text-zinc-100">安全衛生の試験問題について</h2>
          <p>安全衛生の過去問演習は、公益財団法人安全衛生技術試験協会が公表する問題を収録しています。各演習ページに出典PDFと対象年月を表示しています。学習用のAI解説は、試験実施機関の公式解説とは別のものです。</p>
          <Link href="/e-learning/exams" className="mt-2 inline-block underline">安全衛生の過去問演習と出典を確認する</Link>
        </div>

        <div>
          <h2 className="mb-2 text-base font-semibold text-zinc-900 dark:text-zinc-100">FP技能検定・電気系資格の過去問データ</h2>
          <p className="mb-2">
            FP技能検定は日本FP協会・金融財政事情研究会が公表した問題を、出典を明記して掲載しています。
            電気主任技術者・電気工事士は、電気技術者試験センターが公表した問題を、出典を明記して掲載しています。
          </p>
          <p>
            各問題の公式問題PDF・正答PDFと出典表記を正本としています。
          </p>
        </div>

        <div>
          <h2 className="mb-2 text-base font-semibold text-zinc-900 dark:text-zinc-100">管理業務主任者試験の出典・利用条件</h2>
          <p className="mb-2">
            管理業務主任者試験の公表問題・正解と、その使用に関する留意点は、
            一般社団法人マンション管理業協会の公式資料で確認できます。
            各問題の出典とあわせて、公式の利用条件をご確認ください。
          </p>
          <ul className="list-inside list-disc space-y-2">
            <li>
              <a href="https://www.kanrikyo.or.jp/kanri/mondaiseikai/index.html" target="_blank" rel="noopener noreferrer" className="underline hover:text-zinc-900 dark:hover:text-zinc-50">
                公式の試験問題・正解
              </a>
            </li>
            <li>
              <a href="https://www.kanrikyo.or.jp/kanri/pdf/kakomonshiyou.pdf" target="_blank" rel="noopener noreferrer" className="underline hover:text-zinc-900 dark:hover:text-zinc-50">
                公式の過去問題使用条件（PDF）
              </a>
            </li>
          </ul>
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
            学校・予備校・企業研修での閲覧・演習にご利用いただけます。問題・図版を外部教材へ転載する場合は、当サービスの案内に加え、原典の権利者の条件を個別に確認してください。大規模利用・連携はお問い合わせください。
          </p>
        </div>

        <div>
          <h2 className="mb-2 text-base font-semibold text-zinc-900 dark:text-zinc-100">リンク・引用</h2>
          <p>
            本サービスへのリンクは自由です。記事・ブログ・SNS 等での紹介を歓迎します。
            問題を引用する際は、各問題に表示した出典を確認してください。
          </p>
        </div>

        <div>
          <h2 className="mb-2 text-base font-semibold text-zinc-900 dark:text-zinc-100">免責</h2>
          <p>
            AI 生成解説の正確性について最善を尽くしていますが、
            誤りが含まれる可能性があります。
            重要な判断は必ず各試験実施機関の公式資料で確認してください。
            詳細は <Link href="/terms" className="underline hover:text-zinc-900 dark:hover:text-zinc-50">利用規約</Link> をご参照ください。
          </p>
        </div>
      </section>

      <div className="space-y-1 border-t border-border pt-4 text-xs text-zinc-500 dark:text-zinc-400">
        <p>出典: IPA 情報処理技術者試験（<a href="https://www.ipa.go.jp/shiken/" target="_blank" rel="noopener noreferrer" className="underline">ipa.go.jp</a>）</p>
        <p>本サービスは各試験実施機関とは無関係の学習支援サービスです。</p>
      </div>
    </main>
  );
}
