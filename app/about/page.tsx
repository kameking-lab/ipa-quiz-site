import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowLeft,
  BookOpen,
  Bot,
  ExternalLink,
  MessageCircle,
  Quote,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "このサイトについて・著作権",
  description:
    "IPA Quiz は IPA 公開過去問を AI コパイロット付きで学習できるオープンな学習支援サイトです。出典・著作権・AI生成コンテンツ・プライバシー方針を掲載。",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <main className="relative flex-1">
      {/* Decorative background */}
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

        {/* Hero */}
        <header className="mb-10 animate-fade-in">
          <Badge variant="success" className="mb-4">
            β 公開中・全機能無料
          </Badge>
          <h1 className="text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            <span className="bg-gradient-to-r from-primary via-violet-500 to-fuchsia-500 bg-clip-text text-transparent">
              IPA Quiz
            </span>{" "}
            について
          </h1>
          <p className="mt-4 max-w-2xl text-pretty text-sm leading-relaxed text-muted-foreground sm:text-base">
            独立行政法人 情報処理推進機構(IPA) が実施する情報処理技術者試験の公開過去問を、
            AI コパイロット付きの高速な学習体験で提供するオープンな学習支援サイトです。
          </p>
          <p className="mt-3 max-w-2xl text-pretty text-sm leading-relaxed text-muted-foreground">
            ランダム出題・年度別・分野別・復習モードなど複数の切り口に加え、各問題に
            AI コパイロットが常駐し、用語解説・選択肢分析・類題生成・誤答分析などを対話で提供します。
          </p>
        </header>

        {/* Sections grid */}
        <div className="space-y-5">
          <Section
            icon={<Quote className="h-5 w-5" />}
            title="出典・著作権"
            description="一次情報は IPA 公式 PDF を原典としています"
          >
            <p>
              当サイトに掲載している問題文・選択肢・模範解答等の一次情報は、IPA が公式サイトで
              公開している過去問題 PDF を原典としています。各問の解説末尾から原典 PDF へリンクしています。
            </p>
            <p>
              IPA は、試験問題の使用に関し、利用の許諾は不要・使用料も不要である旨を公式に明示しています
              （詳細は{" "}
              <a
                className="inline-flex items-center gap-0.5 font-medium text-primary underline-offset-4 hover:underline"
                href="https://www.ipa.go.jp/shiken/kakomondai/copyright.html"
                target="_blank"
                rel="noopener noreferrer"
              >
                IPA 過去問題の使用について
                <ExternalLink className="h-3 w-3" />
              </a>
              {" "}を参照）。
              一方で、引用・二次利用の際には「出典: IPA 情報処理技術者試験」の明記が求められます。
              本サイトはフッターおよび各問の解説内に出典を明示しています。
            </p>
            <p>
              解説本文・AI による応答・本サイト独自の UI・タグ付けデータなどは、IPA の著作権とは独立した
              本サイト運営者の著作物です。無断転載を禁じます。
            </p>
          </Section>

          <Section
            icon={<Bot className="h-5 w-5" />}
            title="AI コパイロットについて"
            description="Google Gemini を用いて応答を生成します"
          >
            <p>
              AI コパイロットは Google Gemini を用いて応答を生成しています。生成 AI の性質上、
              内容に誤りが含まれる可能性があります。重要な判断の根拠とする場合は、IPA の公式資料や
              信頼できる書籍で確認してください。
            </p>
            <p>
              β 公開期間中は全機能を無料でご利用いただけます。公平利用のため、AI コパイロットは
              1 日あたりの利用上限を設けています（JST 0:00 リセット）。
            </p>
          </Section>

          <Section
            icon={<ShieldCheck className="h-5 w-5" />}
            title="プライバシー"
            description="学習履歴はブラウザにのみ保存"
          >
            <p>
              学習履歴・回答履歴は、お使いのブラウザの localStorage にのみ保存され、
              サーバーには送信されません。端末・ブラウザを変更すると履歴は引き継がれません。
            </p>
            <p>
              AI コパイロット機能では、質問文と該当問題のコンテキストが Gemini API に送信されます。
              個人を特定する情報は送信しません。詳細は{" "}
              <Link
                href="/privacy"
                className="font-medium text-primary underline-offset-4 hover:underline"
              >
                プライバシーポリシー
              </Link>
              {" "}をご覧ください。
            </p>
          </Section>

          <Section
            icon={<Sparkles className="h-5 w-5" />}
            title="β版について"
            description="機能・データは順次拡充中"
          >
            <p>
              本サイトは現在ベータ版です。問題データ・機能は順次拡充予定です。
              データは予告なく変更・削除される場合があります。
            </p>
          </Section>

          <Section
            icon={<BookOpen className="h-5 w-5" />}
            title="お問い合わせ"
            description="GitHub Issues からご連絡ください"
          >
            <p>
              問題内容の誤りや運用に関するご指摘は、{" "}
              <a
                className="inline-flex items-center gap-1 font-medium text-primary underline-offset-4 hover:underline"
                href="https://github.com/kameking-lab/ipa-quiz-site/issues"
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle className="h-3.5 w-3.5" />
                GitHub Issues
                <ExternalLink className="h-3 w-3" />
              </a>
              {" "}からご連絡ください。
            </p>
          </Section>
        </div>

        {/* Footer CTA */}
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Button asChild variant="gradient" size="lg">
            <Link href="/">
              ホームに戻る
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/faq">よくある質問</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}

function Section({
  icon,
  title,
  description,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <section className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-sm transition-shadow hover:shadow-md sm:p-7">
      <div className="mb-4 flex items-start gap-3">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary-soft text-primary-soft-foreground">
          {icon}
        </span>
        <div className="min-w-0">
          <h2 className="text-lg font-semibold text-foreground">{title}</h2>
          <p className="mt-0.5 text-xs text-muted-foreground">{description}</p>
        </div>
      </div>
      <div className="space-y-3 text-sm leading-relaxed text-muted-foreground">
        {children}
      </div>
    </section>
  );
}
