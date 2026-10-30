import Link from "next/link";
import type { Metadata } from "next";
import { HISTORY_PRIVACY_COPY, AI_RATE_LIMIT_PRIVACY_COPY } from "@/lib/privacy/disclosure";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Heart, BookOpen, MessageSquare, Share2, Users } from "lucide-react";
import { ShareButtons } from "@/components/ShareButtons";
import { JsonLd } from "@/components/seo/JsonLd";
import { SITE_BASE_URL, SITE_NAME } from "@/lib/seo/config";
import { buildOrgNode, buildWebPageNode } from "@/lib/seo/structured-data";

const PAGE_URL = `${SITE_BASE_URL}/about`;
const PAGE_DESCRIPTION =
  "過去問AIは、IPA・FP・電気・医療・福祉・不動産等の公開過去問を資格ごとに学べるサービスです。収録範囲・公式出典・独自解説の確認範囲を表示し、無料の学習機能と月額プランを提供しています。";

const ABOUT_OG_URL = `${SITE_BASE_URL}/api/og?${new URLSearchParams({
  type: "home",
  title: "過去問AIについて",
  subtitle: "教育貢献プロジェクト",
  body: "資格別の過去問・復習と、無料枠・月額プランを提供。",
}).toString()}`;

export const metadata: Metadata = {
  title: "過去問 AI プロジェクトについて",
  description: PAGE_DESCRIPTION,
  alternates: { canonical: "/about" },
  openGraph: {
    title: "過去問 AI プロジェクトについて",
    description:
      "資格別の公開過去問・独自解説・学習履歴、無料枠と月額プランを提供。出典・確認範囲と運営方針を公開しています。",
    url: `${SITE_BASE_URL}/about`,
    type: "website",
    siteName: "過去問AI",
    locale: "ja_JP",
    images: [{ url: ABOUT_OG_URL, width: 1200, height: 630, alt: "過去問 AI プロジェクトについて" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "過去問 AI プロジェクトについて",
    description:
      "資格別の公開過去問・独自解説・学習履歴、無料枠と月額プランを提供。出典・確認範囲と運営方針を公開しています。",
    images: [ABOUT_OG_URL],
  },
};

export default function AboutPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      buildWebPageNode(PAGE_URL, `${SITE_NAME} について`, PAGE_DESCRIPTION),
      buildOrgNode(),
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "ホーム", item: SITE_BASE_URL },
          { "@type": "ListItem", position: 2, name: `${SITE_NAME} について`, item: PAGE_URL },
        ],
      },
    ],
  };
  return (
    <main className="mx-auto w-full max-w-2xl flex-1 px-4 pb-12 pt-6 sm:px-6">
      <JsonLd data={jsonLd} />
      <nav aria-label="パンくずリスト" className="mb-4 text-xs text-muted-foreground">
        <ol className="flex flex-wrap items-center gap-1.5">
          <li>
            <Link href="/" className="inline-block py-1.5 hover:text-foreground hover:underline">
              ホーム
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li aria-current="page" className="text-foreground">
            {SITE_NAME} について
          </li>
        </ol>
      </nav>
      <Button asChild variant="ghost" size="sm" className="mb-3">
        <Link href="/">
          <ArrowLeft className="h-4 w-4" />
          戻る
        </Link>
      </Button>
      <h1 className="mb-4 text-2xl font-bold">過去問 AI プロジェクトについて</h1>

      <section className="mb-8 space-y-3 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
        <p>
          過去問AIは、IPAの情報処理技術者試験に加え、FP・電気・医療・福祉・不動産等の公開過去問を、
          <strong>誰もが平等に学べる場</strong>として公開している教育貢献プロジェクトです。
        </p>
        <p>
          個別問題・原紙・保存済み履歴の閲覧と復習は<strong>無料</strong>です。
          連続演習には無料枠と月額プランがあり、学習機会を広げながら運営を継続することを目指しています。
        </p>
      </section>

      <h2 className="mb-2 text-lg font-semibold">運営について</h2>
      <section className="mb-8 space-y-3 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
        <p>
          本プロジェクトの公開運営ハンドルは<strong>kameking-lab</strong>です。
          サーバー費用・AI利用料について確認できた情報と未確認事項は、
          <Link href="/transparency" className="underline">透明性レポート</Link>で区別して表示します。
        </p>
        <p>
          運営の透明性レポート・直近の活動状況は{" "}
          <Link className="underline" href="/transparency">/transparency</Link>{" "}
          / <Link className="underline" href="/transparency#metrics">公開メトリクス</Link>{" "}
          で公開しています。
        </p>
      </section>

      <h2 className="mb-2 text-lg font-semibold">私たちが大切にしていること</h2>
      <section className="mb-8 grid gap-3 sm:grid-cols-2">
        {[
          {
            icon: <BookOpen className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />,
            title: "無料の学習機能と月額プラン",
            text: "個別問題・原紙・保存済み履歴の閲覧と復習は無料です。連続演習の無料枠と月額プラン、AI機能の対応範囲は各案内で確認できます。",
          },
          {
            icon: <MessageSquare className="h-4 w-4 text-sky-600 dark:text-sky-400" />,
            title: "声を反映する",
            text: "改善要望・不具合報告にすべて目を通し、継続的に改善します。フィードバックは公開ページにも掲載されます。",
          },
          {
            icon: <Share2 className="h-4 w-4 text-amber-600 dark:text-amber-400" />,
            title: "応援はシェアで",
            text: "金銭的負担はお願いしません。SNS や所属コミュニティでのご紹介が、もっとも嬉しい応援です。",
          },
          {
            icon: <Heart className="h-4 w-4 text-rose-600 dark:text-rose-400" />,
            title: "持続可能性を保つ",
            text: "AI コパイロットは無料で続けて質問できます。連続利用・大量送信を制限し、運営費を管理します。",
          },
        ].map((c) => (
          <div
            key={c.title}
            className="rounded-2xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950"
          >
            <div className="mb-2 flex items-center gap-2">
              {c.icon}
              <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">{c.title}</h3>
            </div>
            <p className="text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">{c.text}</p>
          </div>
        ))}
      </section>

      <h2 id="attribution" className="mb-2 scroll-mt-20 text-lg font-semibold">出典・著作権</h2>
      <section className="mb-8 space-y-3 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
        <p>
          当サイトに掲載している問題文・選択肢・模範解答等の一次情報は、IPA が公式サイトで
          公開している過去問題 PDF を原典としています。各問の解説末尾から原典 PDF へリンクしています。
        </p>
        <p>
          本サイトはフッターおよび各問の解説内に「出典: IPA 情報処理技術者試験」を明示しています。
          試験制度については
          <a
            className="underline"
            href="https://www.ipa.go.jp/shiken/faq.html"
            target="_blank"
            rel="noopener noreferrer"
          >
            IPA 公式サイトのよくある質問
          </a>
          もご確認ください。
        </p>
        <p>
          解説本文・AI による応答・本サイト独自の UI・タグ付けデータなどは、IPA の著作権とは独立した
          本サイト運営者の著作物です。無断転載を禁じます。
        </p>
        <p>
          FP技能検定・電気主任技術者試験・電気工事士試験・施工管理技術検定などの問題は、各試験実施団体が公表した問題を出典を明記して掲載しています。
          各問には問題PDFと公式正答へのリンクがあります。
        </p>
        <p>
          施工管理技術検定など、掲載条件の確認が必要な資格の問題本文は、確認が完了するまで掲載しません。
        </p>
      </section>

      <h2 className="mb-2 text-lg font-semibold">AI コパイロットについて</h2>
      <section className="mb-8 space-y-3 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
        <p>
          AI コパイロットは生成 AI を用いて応答を生成しています。生成 AI の性質上、
          内容に誤りが含まれる可能性があります。重要な判断の根拠とする場合は、当該試験実施団体の公式資料や
          信頼できる書籍で確認してください。
        </p>
        <p>
          AI コパイロットに初回10回の質問上限はありません。連続利用や大量送信には
          適正利用制限があります。
        </p>
      </section>

      <h2 className="mb-2 text-lg font-semibold">AI コンテンツ取扱方針・査読体制</h2>
      <section className="mb-8 space-y-3 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
        <p>
          本サービスでは、コンテンツの種類ごとにAIの利用と確認範囲を区別しています。
        </p>
        <ul className="list-disc space-y-1 pl-5">
          <li>
            <strong>AI コパイロット（問題解説・質問応答）</strong>：
            ユーザーの質問に応じてリアルタイムで AI が応答を生成します。
            各応答を公開前に人が査読する方式ではありません。誤りが含まれる可能性があります。
          </li>
          <li>
            <strong>収録問題の静的解説</strong>：AIの支援を用いた独自解説です。原文・図版・公式正答の照合と、解説内容の編集は別の工程です。
            全件の人による確認・専門家監修を保証していません。保存された確認範囲と訂正手順は<Link href="/transparency#static-explanations" className="underline">透明性ページ</Link>で公開します。
          </li>
          <li>
            <strong>業種別合格答案サンプル（essays）</strong>：
            AI が生成した論述例を掲載しています。人による全件確認・専門家監修の証跡は提示していません。
            IPA 公式の合格答案ではなく、論述構成の参考用です。各ページにその旨を明示しています。
          </li>
          <li>
            <strong>ブログ記事</strong>：
            教育貢献プロジェクトとして運営者が作成・編集した記事です。
            一部 AI 支援を利用した記事は記事内に明示します。
          </li>
        </ul>
        <p>
          <strong>誤情報の報告窓口：</strong>
          解説・答案例に誤りを発見された場合は、
          <Link href="/contact" className="underline hover:text-zinc-900 dark:hover:text-zinc-50">
            お問い合わせフォーム
          </Link>
          よりご報告ください。運営者が確認次第、訂正または削除します。
        </p>
      </section>

      <h2 className="mb-2 text-lg font-semibold">料金について</h2>
      <section className="mb-8 space-y-3 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
        <p>
          IPA Quiz は IPA 情報処理技術者試験の学習機会を広げることを目的とした
          <strong>教育貢献プロジェクト</strong>として運営されています。
          個別問題・原紙・保存済み履歴の閲覧と復習は無料です。連続演習はログインなしでも1日10問まで無料で、日本時間0時に更新されます。履歴の同期などは無料ログインで利用できます。
        </p>
        <p>
          AI コパイロットの利用回数には公平利用のための日次上限を設けていますが、
          対象の連続演習を回数制限なく使う月額プランは税込980円で毎月自動更新され、期間末解約を予約できます。
          AI応答や音声の利用権は月額プランに含みません。既存の保存済み履歴を課金のために削除することはありません。
        </p>
        <p className="text-xs text-zinc-500 dark:text-zinc-400">
          販売状況、対象範囲、日割返金なし・重複誤請求や当社障害時の個別返金、事業者情報の開示請求は
          <Link href="/billing" className="underline">月額プランの案内</Link>をご確認ください。法令上の権利は制限しません。
        </p>
      </section>

      <h2 className="mb-2 text-lg font-semibold">プライバシー</h2>
      <section className="mb-8 space-y-3 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
        <p>
          {HISTORY_PRIVACY_COPY}
        </p>
        <p>
          {AI_RATE_LIMIT_PRIVACY_COPY}
        </p>
        <p>
          AI コパイロット機能では、質問文・直近の会話履歴・該当問題のコンテキストなどが AI API に送信されます。
        </p>
        <p>
          アカウントの氏名・メールアドレスを問題コンテキストに自動付加しません。
          ただし、質問や会話履歴に含めた個人情報は送信されるため、氏名・メールアドレスなどは質問に入力しないでください。
        </p>
      </section>

      <h2 className="mb-2 text-lg font-semibold">関連ページ</h2>
      <section className="mb-6 grid gap-2 sm:grid-cols-2">
        {[
          ["/about#support", "応援する"],
          ["/contact", "お問い合わせ"],
          ["/transparency#metrics", "公開メトリクス"],
          ["/transparency", "運営の透明性レポート"],
          ["/operator", "運営者情報"],
        ].map(([href, label]) => (
          <Link
            key={href}
            href={href}
            className="rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-700 hover:border-sky-300 hover:text-zinc-900 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-300 dark:hover:border-sky-700 dark:hover:text-zinc-50"
          >
            {label}
          </Link>
        ))}
      </section>

      <h2 id="support" className="mb-4 mt-10 scroll-mt-20 text-lg font-semibold">
        <Heart className="mr-2 inline-block h-5 w-5 text-rose-500" />
        過去問 AI を応援する
      </h2>
      <p className="mb-4 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
        月額プランとは別の寄付や金銭的なご支援はお願いしていません。
        かわりに、もっと届けたい人へつないでくださると、運営の励みになります。
      </p>
      <section className="mb-8 space-y-3">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Share2 className="h-4 w-4 text-sky-600 dark:text-sky-400" />
              ① シェアする（一番うれしい応援）
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm text-zinc-700 dark:text-zinc-300">
              SNS や勉強仲間にこのサイトの URL をシェアしてください。
              学習中のスクリーンショットを X や Instagram に投稿いただけると、教育貢献プロジェクトの存在が広がります。
            </p>
            <ShareButtons
              url={`${SITE_BASE_URL}/`}
              text="無料の学習機能と月額プランを提供する教育貢献プロジェクト「過去問 AI」を応援しています。"
              hashtags={["過去問AI", "IPA試験", "応用情報"]}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <MessageSquare className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
              ② フィードバックを送る
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm text-zinc-700 dark:text-zinc-300">
              使い心地・解説の誤り・改善要望をお寄せください。すべての投稿に目を通し、
              プロジェクトに反映していきます。
            </p>
            <Button asChild variant="primary">
              <Link href="/contact">お問い合わせフォーム</Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <BookOpen className="h-4 w-4 text-amber-600 dark:text-amber-400" />
              ③ 学習仲間を巻き込む
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-zinc-700 dark:text-zinc-300">
              <li>所属する勉強会・社内チャットで紹介する</li>
              <li>note・ブログ・YouTube などで取り上げる</li>
              <li>学校・専門学校・社内研修の補助教材として活用する（無料範囲・月額条件は各案内を確認）</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Users className="h-4 w-4 text-violet-600 dark:text-violet-400" />
              ④ 教育機関・企業での活用
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-zinc-700 dark:text-zinc-300">
              学校・専門学校・社内研修でのご利用にも、各機能の無料範囲と月額プランの条件が適用されます。
              活用事例の共有や、運用上のご相談がありましたら{" "}
              <Link href="/contact" className="underline hover:text-zinc-900 dark:hover:text-zinc-50">
                お問い合わせフォーム
              </Link>
              よりご連絡ください。
            </p>
          </CardContent>
        </Card>
      </section>

      <h2 className="mb-2 text-lg font-semibold">お問い合わせ</h2>
      <section className="space-y-3 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
        <p>
          改善要望・不具合報告・教育機関での活用に関するご相談は、
          <Link className="underline" href="/contact">
            お問い合わせフォーム
          </Link>
          からお寄せください。すべての投稿に目を通します。
        </p>
      </section>
    </main>
  );
}
