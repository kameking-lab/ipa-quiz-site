import type { Metadata } from "next";
import Link from "next/link";
import {
  AlertOctagon,
  ArrowLeft,
  Ban,
  Bot,
  FileText,
  Gavel,
  HandHeart,
  Link2,
  MessageSquare,
  Quote,
  RefreshCw,
  Sparkles,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "利用規約",
  description:
    "過去問AI の利用規約。教育貢献プロジェクトとして全機能無料で運営しています。サービス概要・AI 生成・免責・禁止事項・出典・準拠法について。",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
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
        <Button asChild variant="ghost" size="sm" className="mb-4">
          <Link href="/">
            <ArrowLeft className="h-4 w-4" />
            戻る
          </Link>
        </Button>

        <header className="mb-10 animate-fade-in">
          <Badge variant="soft" className="mb-4">
            <FileText className="h-3 w-3" />
            利用規約
          </Badge>
          <h1 className="text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            利用規約
          </h1>
          <p className="mt-3 text-xs text-muted-foreground">最終更新: 2026年5月2日</p>
          <p className="mt-4 max-w-2xl text-pretty text-sm leading-relaxed text-muted-foreground sm:text-base">
            過去問AI（以下「本サービス」）をご利用いただく前に、本利用規約をよくお読みください。
            本サービスを利用することにより、本規約に同意したものとみなします。
          </p>
        </header>

        <div className="space-y-5">
          <Section
            number="1"
            icon={<Sparkles className="h-5 w-5" />}
            title="サービスの概要"
          >
            <p>
              本サービスは、情報処理技術者試験の過去問学習を支援する教育貢献プロジェクトとして
              <strong>全機能を無料で公開</strong>しています。
              機能・データ・仕様は改善のため予告なく変更・中断・終了する場合があります。
              開発中の機能を含むため、不具合や予期しない動作が発生する可能性があります。
            </p>
            <p>
              本規約における「運営」とは、本サービスを提供するボランティア有志による運営を指します。
              運営の透明性レポートは{" "}
              <Link href="/transparency" className="underline underline-offset-2">/transparency</Link>
              {" "}で公開しています。
            </p>
          </Section>

          <Section
            number="2"
            icon={<Bot className="h-5 w-5" />}
            title="AI 生成コンテンツについて"
          >
            <p>
              本サービスの AI コパイロットは Google Gemini を利用して応答を生成しています。
              生成 AI の性質上、解説・応答には誤りが含まれる可能性があります。
              本サービスの AI 応答は参考情報としてのみご活用ください。
              重要な判断の根拠とする場合は、IPA 公式資料や信頼できる書籍で必ずご確認ください。
            </p>
          </Section>

          <Section
            number="3"
            icon={<AlertOctagon className="h-5 w-5" />}
            title="免責事項"
          >
            <p>
              本サービスは情報処理技術者試験の合否を保証するものではありません。
              学習効果・試験結果について、運営は一切の責任を負いません。
            </p>
            <p>
              本サービスの利用により生じた損害（データ消失・試験不合格等を含む）について、
              運営は故意または重大な過失がある場合を除き、責任を負いません。
            </p>
          </Section>

          <Section
            number="4"
            icon={<Ban className="h-5 w-5" />}
            title="禁止事項"
          >
            <ul className="space-y-1.5">
              {[
                "本サービスへの不正アクセスや過度な負荷をかける行為",
                "本サービスのコンテンツの無断転載・商業利用",
                "AI コパイロットを悪用した違法・有害コンテンツの生成",
                "その他、法令・公序良俗に反する行為",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-destructive" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </Section>

          <Section
            number="5"
            icon={<Quote className="h-5 w-5" />}
            title="出典・著作権"
          >
            <p>
              問題文・選択肢・模範解答は IPA（独立行政法人情報処理推進機構）が公開する公式過去問を使用しています。
              詳細は{" "}
              <Link
                href="/about"
                className="font-medium text-primary underline-offset-4 hover:underline"
              >
                著作権・利用条件
              </Link>
              {" "}をご確認ください。
            </p>
          </Section>

          <Section
            number="6"
            icon={<Gavel className="h-5 w-5" />}
            title="準拠法・管轄"
          >
            <p>
              本規約は日本法に準拠します。本サービスに関する紛争は、
              日本の裁判所を専属的合意管轄とします。
            </p>
          </Section>

          <Section
            number="7"
            icon={<RefreshCw className="h-5 w-5" />}
            title="規約の変更"
          >
            <p>
              運営は必要に応じて本規約を変更できるものとします。
              重要な変更は本サービス上でお知らせします。
            </p>
          </Section>

          <Section
            number="8"
            icon={<MessageSquare className="h-5 w-5" />}
            title="フィードバックの位置付け"
          >
            <p>
              利用者が本サービスの改善目的で運営に提供する感想・要望・誤り指摘・コメント等
              （以下「フィードバック」）は、<strong>無償かつ任意の意見表明</strong>として扱われ、
              運営との間に何らの対価関係・委託関係・労務提供関係も生じないものとします。
            </p>
            <p>
              フィードバックの採否・反映時期は運営が単独で判断し、採用された場合でも
              利用者に対する報酬・謝礼・クレジット表示等の義務は生じません。
              フィードバックは個人情報を機械的にマスキングした上で、改善ログ等に転載される場合があります。
            </p>
          </Section>

          <Section
            number="9"
            icon={<Bot className="h-5 w-5" />}
            title="AI 採点・記述添削の責任制限"
          >
            <p>
              本サービスの AI 採点・記述添削・論文添削機能は、
              生成 AI による<strong>参考情報の提示にとどまり、合否判定・点数保証・
              本試験における正答性を一切保証しません</strong>。
              実際の採点基準は IPA 公式の採点講評・公表される模範解答に従ってください。
            </p>
            <p>
              AI 採点結果に基づく学習計画変更・出願判断・受験戦略等の意思決定は
              利用者の自己責任で行うものとし、結果について運営は責任を負いません。
              AI モデルの仕様変更により、同一答案でも採点結果が異なる場合があります。
            </p>
          </Section>

          <Section
            number="10"
            icon={<Link2 className="h-5 w-5" />}
            title="アフィリエイトリンクについて"
          >
            <p>
              本サービスの「
              <Link
                href="/recommended-books"
                className="font-medium text-primary underline-offset-4 hover:underline"
              >
                おすすめ問題集
              </Link>
              」ページなど一部のページには、Amazonアソシエイト・楽天アフィリエイトなどのアフィリエイトリンクが含まれます。
              ユーザーがこれらのリンクから商品を購入された場合、当サービス運営者に紹介料が支払われ、運営費の一部に充当されます。
            </p>
            <p>
              紹介する書籍・商品はあくまで本サービス独自の編集判断に基づくものであり、
              紹介料の有無によって推薦内容を歪めることはありません。
              価格・在庫・最新版情報については、リンク先の販売ページの表示が最新です。
            </p>
            <p>
              当サービスは Amazon.co.jp を宣伝しリンクすることによってサイトが紹介料を獲得できる手段を提供することを目的に設定された
              アフィリエイトプログラムである、Amazonアソシエイト・プログラムの参加者です。
            </p>
          </Section>

          <Section
            number="11"
            icon={<HandHeart className="h-5 w-5" />}
            title="サービスの位置付け"
          >
            <ol className="list-decimal space-y-2 pl-5">
              <li>
                本サービスは、IPA試験受験者への教育貢献を目的として、ボランティア有志により運営されています。
              </li>
              <li>本サービスは現時点で全機能を無償提供しています。</li>
              <li>
                運営継続のため、皆様のフィードバック投稿によるコンテンツ改善へのご協力をお願いいたします。
              </li>
            </ol>
          </Section>

          <Section
            number="12"
            icon={<AlertOctagon className="h-5 w-5" />}
            title="知的財産権侵害の報告・誤情報の訂正"
          >
            <p>
              掲載コンテンツについて、著作権・商標権・その他の権利侵害のご指摘、または事実と異なる記載のご報告は{" "}
              <Link
                href="/contact"
                className="font-medium text-primary underline-offset-4 hover:underline"
              >
                お問い合わせフォーム
              </Link>
              {" "}よりお寄せください。対象コンテンツの URL と問題点を併せてお知らせいただけると、
              運営者が確認次第、訂正または削除等の対応を行います。回答までにお時間を頂戴する場合があります。
            </p>
          </Section>

        </div>

        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Button asChild variant="gradient" size="lg">
            <Link href="/">ホームに戻る</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/privacy">プライバシーポリシー</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}

function Section({
  number,
  icon,
  title,
  children,
}: {
  number: string;
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="relative overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-sm transition-shadow hover:shadow-md sm:p-7">
      <div className="mb-4 flex items-center gap-3">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary-soft text-primary-soft-foreground">
          {icon}
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
            Article {number}
          </p>
          <h2 className="text-lg font-semibold text-foreground">{title}</h2>
        </div>
      </div>
      <div className="space-y-3 text-sm leading-relaxed text-muted-foreground">
        {children}
      </div>
    </section>
  );
}
