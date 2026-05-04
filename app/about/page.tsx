import Link from "next/link";
import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Heart, BookOpen, MessageSquare, Share2, Users } from "lucide-react";
import { ShareButtons } from "@/components/ShareButtons";

export const metadata: Metadata = {
  title: "過去問 AI プロジェクトについて",
  description:
    "過去問 AI プロジェクトは、IPA 情報処理技術者試験の対策を、誰もが平等に学べる場として運営する教育貢献プロジェクトです。全機能を無料で公開しています。",
  alternates: { canonical: "/about" },
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
      <h1 className="mb-4 text-2xl font-bold">過去問 AI プロジェクトについて</h1>

      <section className="mb-8 space-y-3 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
        <p>
          過去問 AI プロジェクトは、IPA（情報処理推進機構）が実施する情報処理技術者試験の対策を、
          <strong>誰もが平等に学べる場</strong>として公開している教育貢献プロジェクトです。
        </p>
        <p>
          全 13 試験区分の過去問・全モード・AI コパイロット・午後 AI 採点を含む、
          すべての学習機能を<strong>無料</strong>で公開しています。受験生の経済状況や所属に
          関わらず、最善の対策ツールを使えるようにすることがプロジェクトの目的です。
        </p>
      </section>

      <h2 className="mb-2 text-lg font-semibold">運営について</h2>
      <section className="mb-8 space-y-3 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
        <p>
          本プロジェクトは特定の法人・営利組織には属さず、
          <strong>ボランティア有志により運営</strong>されています。
          サーバー費用や AI 利用料を含む運営コストは、有志による持ち出しと、
          一部の任意応援（<Link href="/about#support" className="underline">応援する</Link>）で賄っています。
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
            title: "全機能を無料公開",
            text: "全 13 試験区分・全モードに料金は一切かかりません。学習に必要なものはすべて開放しています。",
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
            text: "AI 利用は初回 10 回まで自由、フィードバック投稿後はほぼ無制限です。運営費を抑えつつ持続可能に。",
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
          AI コパイロットは生成 AI を用いて応答を生成しています。生成 AI の性質上、
          内容に誤りが含まれる可能性があります。重要な判断の根拠とする場合は、IPA の公式資料や
          信頼できる書籍で確認してください。
        </p>
        <p>
          AI コパイロットは初回 10 回まではどなたでもご利用いただけます。1 度フィードバックを
          投稿いただくと、これ以降ほぼ無制限でご利用いただけます。
        </p>
      </section>

      <h2 className="mb-2 text-lg font-semibold">料金について</h2>
      <section className="mb-8 space-y-3 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
        <p>
          IPA Quiz は IPA 情報処理技術者試験の学習機会を広げることを目的とした
          <strong>教育貢献プロジェクト</strong>として運営されています。
          現在、料金プランは設定しておらず、すべての機能を完全無料でご利用いただけます。
        </p>
        <p>
          AI コパイロットの利用回数には公平利用のための日次上限を設けていますが、
          試験区分・問題数・モード・履歴・出題機能など、学習に必要な機能はすべて無料で開放しています。
          α 期間からのご利用者の方は、今後も継続して無料でお使いいただけます。
        </p>
        <p className="text-xs text-zinc-500 dark:text-zinc-400">
          将来的に運営コストを賄うための仕組みを検討する可能性はありますが、
          既存ユーザーの学習体験を損なう変更は行いません。
        </p>
      </section>

      <h2 className="mb-2 text-lg font-semibold">プライバシー</h2>
      <section className="mb-8 space-y-3 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
        <p>
          学習履歴・回答履歴は、お使いのブラウザの localStorage にのみ保存され、
          サーバーには送信されません。端末・ブラウザを変更すると履歴は引き継がれません。
        </p>
        <p>
          AI コパイロット機能では、質問文と該当問題のコンテキストが AI API に送信されます。
          個人を特定する情報は送信しません。
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
        全機能を無料で公開しているため、金銭的なご支援はお願いしていません。
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
              url="https://ipa-quiz-site.vercel.app/"
              text="IPA 試験対策が全機能無料で使える教育貢献プロジェクト「過去問 AI」を応援しています。"
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
              <li>学校・専門学校・社内研修の補助教材として活用する（無料・許諾不要）</li>
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
              学校・専門学校・社内研修などでご活用いただく場合も、料金は一切かかりません。
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
