import type { Metadata } from "next";
import Link from "next/link";
import {
  AlertTriangle,
  ArrowLeft,
  ExternalLink,
  MessageCircle,
  Globe,
  Info,
  ScrollText,
  TrendingUp,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "運営者情報",
  description:
    "過去問AI（過去問AI）の運営者情報・お問い合わせ先・免責事項。本サービスは IPA とは無関係の非公式サービスです。",
  alternates: { canonical: "/operator" },
};

interface InfoRow {
  label: string;
  value: React.ReactNode;
}

const INFO_ROWS: InfoRow[] = [
  { label: "サービス名", value: "過去問AI" },
  { label: "運営", value: "過去問AI運営" },
  {
    label: "公式X",
    value: (
      <a
        href="https://x.com/kakomon_ai_jp"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-0.5 font-medium text-primary underline-offset-4 hover:underline"
      >
        @kakomon_ai_jp
        <ExternalLink className="h-3 w-3" />
      </a>
    ),
  },
  {
    label: "note",
    value: (
      <a
        href="https://note.com/kakomon_ai"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-0.5 font-medium text-primary underline-offset-4 hover:underline"
      >
        note.com/kakomon_ai
        <ExternalLink className="h-3 w-3" />
      </a>
    ),
  },
  { label: "ステータス", value: "非営利ベータ版" },
  {
    label: "お問い合わせ",
    value: (
      <a
        href="https://github.com/kameking-lab/ipa-quiz-site/issues"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-0.5 font-medium text-primary underline-offset-4 hover:underline"
      >
        <MessageCircle className="h-3.5 w-3.5" />
        GitHub Issues
        <ExternalLink className="h-3 w-3" />
      </a>
    ),
  },
];

export default function OperatorPage() {
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
            <Info className="h-3 w-3" />
            運営情報
          </Badge>
          <h1 className="text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            運営者情報
          </h1>
          <p className="mt-4 max-w-2xl text-pretty text-sm leading-relaxed text-muted-foreground sm:text-base">
            本サービスは非営利のベータ版として運営しています。お問い合わせ先や免責事項についてはこちらをご確認ください。
          </p>
        </header>

        <section className="mb-6 overflow-hidden rounded-2xl border border-border bg-card shadow-sm sm:mb-8">
          <div className="flex items-center gap-3 border-b border-border bg-muted/40 px-6 py-4">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary-soft text-primary-soft-foreground">
              <Globe className="h-4.5 w-4.5" />
            </span>
            <h2 className="text-base font-semibold text-foreground">基本情報</h2>
          </div>
          <dl className="divide-y divide-border">
            {INFO_ROWS.map((row) => (
              <div
                key={row.label}
                className="flex flex-col gap-1 px-6 py-4 sm:flex-row sm:items-center sm:gap-6"
              >
                <dt className="text-xs font-semibold uppercase tracking-wider text-muted-foreground sm:w-32 sm:shrink-0">
                  {row.label}
                </dt>
                <dd className="text-sm text-foreground">{row.value}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="mb-6 rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-7">
          <div className="mb-4 flex items-center gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary-soft text-primary-soft-foreground">
              <TrendingUp className="h-5 w-5" />
            </span>
            <h2 className="text-lg font-semibold text-foreground">運営方針</h2>
          </div>
          <div className="space-y-3 text-sm leading-relaxed text-muted-foreground">
            <p>
              本サービスは非営利のベータ版として運営しています。
              収益化（有料プラン等）を行う場合は事前にお知らせします。
            </p>
            <p>
              問題データは IPA（独立行政法人情報処理推進機構）が公開する公式過去問を使用しています。
              詳細は{" "}
              <Link
                href="/about"
                className="font-medium text-primary underline-offset-4 hover:underline"
              >
                著作権・利用条件
              </Link>
              {" "}をご確認ください。
            </p>
          </div>
        </section>

        <section className="rounded-2xl border border-warning/40 bg-warning/5 p-6 shadow-sm sm:p-7 dark:border-warning/30 dark:bg-warning/10">
          <div className="mb-4 flex items-center gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-warning/20 text-warning dark:bg-warning/15">
              <AlertTriangle className="h-5 w-5" />
            </span>
            <h2 className="text-lg font-semibold text-foreground">免責事項</h2>
          </div>
          <div className="space-y-3 text-sm leading-relaxed text-foreground/90">
            <p>
              本サービス「過去問AI（過去問AI）」は、独立行政法人情報処理推進機構（IPA）とは一切関係のない非公式のサービスです。
              IPA が運営・監修するものではなく、IPA の公式見解を示すものでもありません。
            </p>
            <p>
              「情報処理技術者試験」「応用情報技術者」「基本情報技術者」等の試験名称は、IPA の商標または登録商標です。
              本サービスではこれらを試験区分の識別のためにのみ使用しています。
            </p>
            <p className="flex flex-wrap items-center gap-1">
              試験要項・申込・正式な情報は必ず
              <a
                href="https://www.ipa.go.jp/shiken/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-0.5 font-medium text-primary underline-offset-4 hover:underline"
              >
                <ScrollText className="h-3.5 w-3.5" />
                IPA 公式サイト（ipa.go.jp/shiken）
                <ExternalLink className="h-3 w-3" />
              </a>
              をご確認ください。
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
