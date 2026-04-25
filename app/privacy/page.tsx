import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowLeft,
  Cookie,
  Database,
  ExternalLink,
  MessageCircle,
  HardDrive,
  ShieldCheck,
  Trash2,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "プライバシーポリシー",
  description:
    "IPA Quiz のプライバシーポリシー。学習履歴は localStorage のみ保存。AI コパイロット利用時のデータ送信・Cookie・データ削除方法について。",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
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
            <ShieldCheck className="h-3 w-3" />
            プライバシー
          </Badge>
          <h1 className="text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            プライバシーポリシー
          </h1>
          <p className="mt-3 text-xs text-muted-foreground">最終更新: 2026年4月19日</p>
          <p className="mt-4 max-w-2xl text-pretty text-sm leading-relaxed text-muted-foreground sm:text-base">
            過去問AI（以下「本サービス」）は、ユーザーのプライバシーを尊重し、
            個人情報の適切な取り扱いに努めます。
          </p>
        </header>

        <div className="space-y-5">
          <Section
            number="1"
            icon={<HardDrive className="h-5 w-5" />}
            title="収集する情報"
          >
            <p>
              本サービスはユーザーアカウントや個人情報の登録を必要としません。
              学習履歴・回答履歴・設定はお使いのブラウザの localStorage にのみ保存されます。
              これらのデータはサーバーに送信されることはありません。
              端末・ブラウザを変更すると履歴は引き継がれません。
            </p>
          </Section>

          <Section
            number="2"
            icon={<Database className="h-5 w-5" />}
            title="AI コパイロットとデータ送信"
          >
            <p>
              AI コパイロット機能を利用する際、以下の情報が Google Gemini API に送信されます：
            </p>
            <ul className="ml-1 space-y-1.5">
              <li className="flex items-start gap-2">
                <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-primary" />
                <span>質問文・選択肢・解説などの問題コンテキスト</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-primary" />
                <span>AI への質問内容・会話履歴</span>
              </li>
            </ul>
            <p>
              氏名・メールアドレスなど個人を特定できる情報は送信しません。
              送信データは{" "}
              <a
                href="https://policies.google.com/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-0.5 font-medium text-primary underline-offset-4 hover:underline"
              >
                Google のプライバシーポリシー
                <ExternalLink className="h-3 w-3" />
              </a>
              {" "}に基づき処理されます。
            </p>
            <p>
              レート制限の管理のため、AI リクエスト時に IP アドレスをサーバー内メモリで一時的に保持します。
              IP アドレスはログへの記録・永続化は行いません。
            </p>
          </Section>

          <Section
            number="3"
            icon={<Cookie className="h-5 w-5" />}
            title="Cookie・トラッキング"
          >
            <p>
              本サービスは現在、行動トラッキング目的の Cookie や外部アナリティクスを使用していません。
              テーマ設定などの機能のみ localStorage を使用します。
            </p>
          </Section>

          <Section
            number="4"
            icon={<Trash2 className="h-5 w-5" />}
            title="データの削除"
          >
            <p>
              ブラウザの localStorage に保存されたデータは、{" "}
              <Link
                href="/settings"
                className="font-medium text-primary underline-offset-4 hover:underline"
              >
                設定ページ
              </Link>
              {" "}からいつでも削除できます。
              ブラウザのキャッシュ・サイトデータをクリアすることでも削除されます。
            </p>
          </Section>

          <Section
            number="5"
            icon={<MessageCircle className="h-5 w-5" />}
            title="お問い合わせ"
          >
            <p>
              プライバシーに関するご質問・ご要望は、{" "}
              <a
                href="https://github.com/kameking-lab/ipa-quiz-site/issues"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-0.5 font-medium text-primary underline-offset-4 hover:underline"
              >
                GitHub Issues
                <ExternalLink className="h-3 w-3" />
              </a>
              {" "}からご連絡ください。
            </p>
          </Section>
        </div>

        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Button asChild variant="gradient" size="lg">
            <Link href="/">ホームに戻る</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/terms">利用規約</Link>
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
            Section {number}
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
