import type { Metadata } from "next";
import Link from "next/link";
import {
  AlertOctagon,
  ArrowLeft,
  Ban,
  Bot,
  FileText,
  Gavel,
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
          <p className="mt-3 text-xs text-muted-foreground">最終更新: 2026年4月19日</p>
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
              本規約における「運営」とは、本サービスを提供する個人運営チームを指します。
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
