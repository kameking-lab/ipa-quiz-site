import type { Metadata } from "next";
import Link from "next/link";
import { ChevronDown, HelpCircle, MessageCircle } from "lucide-react";

import { JsonLd } from "@/components/seo/JsonLd";
import { SITE_BASE_URL, SITE_NAME } from "@/lib/seo/config";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "よくある質問（FAQ）— 過去問AIの使い方・AI解説の精度",
  description:
    "過去問AIの対象試験・AIコパイロットの精度・過去問の出典・オフライン利用など、よくある質問にまとめてお答えします。教育貢献プロジェクトとして全機能無料で公開しています。",
  alternates: { canonical: "/faq" },
  openGraph: {
    title: "よくある質問（FAQ） | 過去問AI",
    description:
      "過去問AI の利用方法・AI解説・過去問の出典などのよくある質問と回答。教育貢献プロジェクトとして全機能無料。",
    url: "/faq",
    type: "website",
    siteName: SITE_NAME,
    locale: "ja_JP",
  },
  twitter: {
    card: "summary_large_image",
    title: "よくある質問（FAQ） | 過去問AI",
    description:
      "過去問AI の利用方法・AI解説・過去問の出典などのよくある質問と回答。教育貢献プロジェクトとして全機能無料。",
  },
};

interface FaqItem {
  question: string;
  answer: string;
}

const FAQS: FaqItem[] = [
  {
    question: "過去問AI はどの試験に対応していますか？",
    answer:
      "IPA（情報処理推進機構）が実施する全13区分（ITパスポート / 情報セキュリティマネジメント / 基本情報 / 応用情報 / ITストラテジスト / システムアーキテクト / プロジェクトマネージャ / ネットワーク / データベース / エンベデッド / 情報処理安全確保支援士 / ITサービスマネージャ / システム監査）の過去問を収録済みです。合計 12,000 問超を AI コパイロット付きで学習できます。",
  },
  {
    question: "利用料金は？ 本当に無料ですか？",
    answer:
      "教育貢献プロジェクトとして、全機能を無料で公開しています。全 13 試験区分・全モード・AI コパイロット・午後 AI 採点に料金は一切かかりません。AI コパイロットは初回 10 回までどなたでも利用でき、フィードバックを 1 度ご投稿いただくと、以降は実質無制限でお使いいただけます。",
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
      "不要です。ブラウザの localStorage に学習履歴を保存するため、登録なしですぐに学習を始められます。Google / GitHub / メールリンクのいずれかでログインすると、複数端末間で学習履歴がクラウド同期されます（/account ページから設定可能）。",
  },
  {
    question: "学習履歴はどこに保存されますか？",
    answer:
      "デフォルトはブラウザの localStorage に保存されます。/account からログインすると、サーバー側にも同期され複数端末で共有できます。ローカルのみで使う場合、ブラウザのデータ削除と共に履歴は消えます。",
  },
  {
    question: "スマホでも使えますか？ PWA 対応は？",
    answer:
      "はい。モバイル最優先で設計しており、片手操作で快適に学習できます。PWA としてホーム画面に追加でき、オフラインでの閲覧も一部サポートしています。ダークモードも標準対応。",
  },
  {
    question: "他の過去問サイトとの違いは？",
    answer:
      "① 画面遷移ゼロ・ローディングゼロの高速 UX、② 各問題に AI コパイロットが常駐し用語解説・誤答分析・類題生成などを無制限対話で提供、③ モバイル最優先デザイン、④ ダークモードと PWA の標準装備、が主な差別化点です。今後は午後記述・論文の AI 採点にも対応予定です。",
  },
  {
    question: "午後問題や記述式には対応していますか？",
    answer:
      "応用情報・基本情報・データベース・ネットワーク・情報処理安全確保支援士・エンベデッド・プロジェクトマネージャ・システムアーキテクト・ITストラテジスト・ITサービスマネージャ・システム監査の各試験で AI 採点機能（β版）を提供しています。掲載している午後問題はすべて IPA 過去問の形式を模した『練習用オリジナル問題』であり、実際の試験で出題された問題ではありません（各ページに明示）。論文式試験（ST/SA/PM/AU/SM）には業種別の模範論述例も収録しています。AI 採点は学習の参考目安としてご利用ください。",
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
    <main className="relative flex-1">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-radial-spotlight"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[420px] bg-grid opacity-30 [mask-image:radial-gradient(60%_50%_at_50%_0%,#000_30%,transparent_70%)]"
      />

      <div className="relative mx-auto w-full max-w-3xl px-4 pb-20 pt-6 sm:px-6 sm:pt-10">
        <JsonLd data={jsonLd} />

        <nav
          aria-label="パンくずリスト"
          className="mb-4 text-xs text-muted-foreground"
        >
          <ol className="flex flex-wrap items-center gap-1.5">
            <li>
              <Link href="/" className="hover:text-foreground hover:underline">
                ホーム
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="text-foreground">
              よくある質問
            </li>
          </ol>
        </nav>

        <header className="mb-10 animate-fade-in">
          <Badge variant="soft" className="mb-4">
            <HelpCircle className="h-3 w-3" />
            FAQ
          </Badge>
          <h1 className="text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            <span className="bg-gradient-to-r from-primary via-violet-500 to-fuchsia-500 bg-clip-text text-transparent">
              よくある質問
            </span>
          </h1>
          <p className="mt-4 max-w-2xl text-pretty text-sm leading-relaxed text-muted-foreground sm:text-base">
            過去問AI の使い方・AI 解説の精度・過去問の出典など、利用開始前によくいただく質問にまとめてお答えします（教育貢献プロジェクト・全機能無料）。
          </p>
        </header>

        <section aria-label="質問と回答" className="space-y-3">
          {FAQS.map((f, i) => (
            <details
              key={i}
              className="group rounded-2xl border border-border bg-card p-5 shadow-sm transition-all open:border-primary/40 open:shadow-md sm:p-6"
            >
              <summary className="flex cursor-pointer list-none items-start justify-between gap-4 text-left">
                <div className="flex items-start gap-3">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-primary-soft text-xs font-bold text-primary-soft-foreground">
                    Q{String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-sm font-semibold leading-relaxed text-foreground sm:text-base">
                    {f.question}
                  </span>
                </div>
                <ChevronDown
                  aria-hidden="true"
                  className="mt-1 h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-200 group-open:rotate-180 group-open:text-primary"
                />
              </summary>
              <div className="mt-4 border-t border-border pt-4 pl-10 text-sm leading-relaxed text-muted-foreground">
                {f.answer}
              </div>
            </details>
          ))}
        </section>

        <section className="mt-10 rounded-2xl border border-border bg-card p-6 text-center shadow-sm sm:p-8">
          <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-primary-soft text-primary-soft-foreground">
            <MessageCircle className="h-5 w-5" />
          </div>
          <h2 className="mb-1 text-base font-semibold text-foreground">
            ここに質問が見つかりませんか？
          </h2>
          <p className="mb-4 text-sm text-muted-foreground">
            運営者情報のお問い合わせ先からお気軽にご連絡ください。
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            <Button asChild variant="primary" size="md">
              <Link href="/operator">運営者情報</Link>
            </Button>
            <Button asChild variant="outline" size="md">
              <Link href="/about">サイトについて</Link>
            </Button>
          </div>
        </section>
      </div>
    </main>
  );
}
