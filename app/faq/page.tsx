import type { Metadata } from "next";
import Link from "next/link";

import { JsonLd } from "@/components/seo/JsonLd";
import { SITE_BASE_URL, SITE_NAME } from "@/lib/seo/config";

export const metadata: Metadata = {
  title: "よくある質問（FAQ）— IPA Quizの使い方・料金・AI解説の精度",
  description:
    "IPA Quizの対象試験・料金・AIコパイロットの精度・過去問の出典・プレミアムプラン・オフライン利用など、よくある質問にまとめてお答えします。",
  alternates: { canonical: "/faq" },
  openGraph: {
    title: "よくある質問（FAQ） | IPA Quiz",
    description:
      "IPA Quiz の利用方法・料金・AI解説・過去問の出典などのよくある質問と回答。",
    url: "/faq",
    type: "website",
    siteName: SITE_NAME,
    locale: "ja_JP",
  },
  twitter: {
    card: "summary_large_image",
    title: "よくある質問（FAQ） | IPA Quiz",
    description:
      "IPA Quiz の利用方法・料金・AI解説・過去問の出典などのよくある質問と回答。",
  },
};

interface FaqItem {
  question: string;
  answer: string;
}

const FAQS: FaqItem[] = [
  {
    question: "IPA Quiz はどの試験に対応していますか？",
    answer:
      "IPA（情報処理推進機構）が実施する全13区分（ITパスポート / 情報セキュリティマネジメント / 基本情報 / 応用情報 / ITストラテジスト / システムアーキテクト / プロジェクトマネージャ / ネットワーク / データベース / エンベデッド / 情報処理安全確保支援士 / ITサービスマネージャ / システム監査）の過去問を順次収録しています。現在は応用情報技術者（AP）400問を中心に、順次他区分へ展開中です。",
  },
  {
    question: "利用料金は？ 無料ですか？",
    answer:
      "β公開中は全機能を無料でお使いいただけます。無料プランは AI コパイロットが 1 日 50 回まで利用可能（JST 0:00 リセット）。将来的には月額 980 円のプレミアムプランで AI コパイロットを 1 日 500 回まで拡張する予定ですが、現在はまだ提供していません。",
  },
  {
    question: "AI コパイロットの解説は信頼できますか？",
    answer:
      "AI（Google Gemini）が生成した解説は、IPA 公式問題の解答を学習した上で要点をまとめたものです。一般的には有用ですが、稀に誤りが含まれる可能性があります。重要な判断や最終確認は必ず IPA 公式資料をご参照ください。各問題のページ末尾から出典 PDF にリンクしています。",
  },
  {
    question: "過去問の出典とライセンスは？",
    answer:
      "すべての問題は IPA（情報処理推進機構）が公開している過去問題 PDF を出典としています。IPA は過去問の使用について許諾不要・使用料不要と公式に明示しています。当サイトでは引用ルールを厳守し、各問題に公式 PDF へのリンクを掲載しています。詳細は /about ページをご覧ください。",
  },
  {
    question: "会員登録は必要ですか？",
    answer:
      "不要です。ブラウザの localStorage に学習履歴を保存するため、登録なしですぐに学習を始められます。端末間での同期は現在サポートしていませんが、今後対応予定です。",
  },
  {
    question: "学習履歴はどこに保存されますか？",
    answer:
      "ブラウザの localStorage に保存されます。ブラウザのデータを削除すると履歴も消去されます。将来的にはクラウド同期・エクスポート機能を提供予定です。",
  },
  {
    question: "スマホでも使えますか？ PWA 対応は？",
    answer:
      "はい。モバイル最優先で設計しており、片手操作で快適に学習できます。PWA としてホーム画面に追加でき、オフラインでの閲覧も一部サポートしています。ダークモードも標準対応。",
  },
  {
    question: "過去問道場などの既存サイトとの違いは？",
    answer:
      "① 画面遷移ゼロ・ローディングゼロの高速 UX、② 各問題に AI コパイロットが常駐し用語解説・誤答分析・類題生成などを無制限対話で提供、③ モバイル最優先デザイン、④ ダークモードと PWA の標準装備、が主な差別化点です。今後は午後記述・論文の AI 採点にも対応予定です。",
  },
  {
    question: "午後問題や記述式には対応していますか？",
    answer:
      "現在は午前の四択問題を中心に収録しています。午後の記述式・論文の AI 採点はロードマップ上のフェーズ3・4で対応予定です。",
  },
  {
    question: "解説が「準備中」と表示される問題があるのはなぜですか？",
    answer:
      "AI による解説生成が未完了、もしくは検証中の問題です。該当問題でも AI コパイロットに質問することで個別解説を受けられます。順次、公式な解説を整備していきます。",
  },
];

export default function FaqPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "FAQPage",
        "@id": `${SITE_BASE_URL}/faq#faqpage`,
        mainEntity: FAQS.map((f) => ({
          "@type": "Question",
          name: f.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: f.answer,
          },
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "ホーム", item: SITE_BASE_URL },
          {
            "@type": "ListItem",
            position: 2,
            name: "よくある質問",
            item: `${SITE_BASE_URL}/faq`,
          },
        ],
      },
    ],
  };

  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-6 sm:py-10">
      <JsonLd data={jsonLd} />
      <nav aria-label="パンくずリスト" className="mb-4 text-xs text-zinc-500 dark:text-zinc-400">
        <ol className="flex flex-wrap items-center gap-1.5">
          <li>
            <Link href="/" className="hover:underline">
              ホーム
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li aria-current="page" className="text-zinc-700 dark:text-zinc-300">
            よくある質問
          </li>
        </ol>
      </nav>

      <header className="mb-8">
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 sm:text-3xl">
          よくある質問（FAQ）
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
          IPA Quiz の使い方・料金・AI 解説の精度・過去問の出典など、利用開始前によくいただく質問にまとめてお答えします。
        </p>
      </header>

      <section aria-label="質問と回答" className="space-y-3">
        {FAQS.map((f, i) => (
          <details
            key={i}
            className="group rounded-2xl border border-zinc-200 bg-white p-4 transition-colors open:border-sky-300 open:bg-sky-50/40 dark:border-zinc-800 dark:bg-zinc-950 dark:open:border-sky-700 dark:open:bg-sky-950/20"
          >
            <summary className="flex cursor-pointer list-none items-start justify-between gap-3 text-left text-sm font-semibold text-zinc-900 dark:text-zinc-50 sm:text-base">
              <span className="flex-1">Q. {f.question}</span>
              <span
                aria-hidden="true"
                className="mt-0.5 select-none text-xs font-bold text-sky-600 transition-transform group-open:rotate-180 dark:text-sky-400"
              >
                ▼
              </span>
            </summary>
            <div className="mt-3 border-t border-zinc-200 pt-3 text-sm leading-relaxed text-zinc-700 dark:border-zinc-800 dark:text-zinc-300">
              {f.answer}
            </div>
          </details>
        ))}
      </section>

      <section className="mt-10 text-sm text-zinc-600 dark:text-zinc-400">
        <p>
          ここに質問が見つからない場合は、
          <Link
            href="/operator"
            className="text-sky-600 underline underline-offset-2 hover:text-sky-700 dark:text-sky-400 dark:hover:text-sky-300"
          >
            運営者情報
          </Link>
          のお問い合わせフォームからご連絡ください。
        </p>
      </section>
    </main>
  );
}
