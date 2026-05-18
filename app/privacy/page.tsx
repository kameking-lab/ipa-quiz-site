import type { Metadata } from "next";
import Link from "next/link";
import {
  AlertCircle,
  ArrowLeft,
  Cookie,
  Database,
  ExternalLink,
  Globe,
  MessageCircle,
  HardDrive,
  ShieldCheck,
  ShoppingBag,
  Trash2,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { JsonLd } from "@/components/seo/JsonLd";
import { SITE_BASE_URL, SITE_NAME } from "@/lib/seo/config";
import { buildWebPageNode } from "@/lib/seo/structured-data";

const PRIVACY_OG_URL = `${SITE_BASE_URL}/api/og?${new URLSearchParams({
  type: "default",
  title: "プライバシーポリシー",
  subtitle: "データ保護方針",
  body: "匿名利用はブラウザ localStorage のみ。クラウド同期・AI 利用時のデータ管理・Cookie・削除方法について。",
}).toString()}`;

const PRIVACY_DESC =
  "過去問AI のプライバシーポリシー。匿名利用時はブラウザ localStorage のみ。ログイン時のクラウド同期・AI コパイロット利用時のデータ送信・Cookie・データ削除方法について。";

export const metadata: Metadata = {
  title: "プライバシーポリシー",
  description: PRIVACY_DESC,
  alternates: { canonical: "/privacy" },
  openGraph: {
    title: "プライバシーポリシー | 過去問AI",
    description:
      "匿名利用はブラウザ localStorage のみ。クラウド同期・AI 利用時のデータ管理・Cookie・削除方法について。",
    url: `${SITE_BASE_URL}/privacy`,
    type: "website",
    siteName: SITE_NAME,
    locale: "ja_JP",
    images: [{ url: PRIVACY_OG_URL, width: 1200, height: 630, alt: "プライバシーポリシー" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "プライバシーポリシー | 過去問AI",
    description:
      "匿名利用はブラウザ localStorage のみ。クラウド同期・AI 利用時のデータ管理・Cookie・削除方法について。",
    images: [PRIVACY_OG_URL],
  },
};

export default function PrivacyPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      buildWebPageNode(`${SITE_BASE_URL}/privacy`, "プライバシーポリシー — 過去問AI", PRIVACY_DESC),
    ],
  };
  return (
    <main className="relative flex-1">
      <JsonLd data={jsonLd} />
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
          <p className="mt-3 text-xs text-muted-foreground">最終更新: 2026年5月17日</p>
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
              本サービスは登録不要でご利用いただけます。匿名利用時は、学習履歴・回答履歴・
              設定はお使いのブラウザの localStorage にのみ保存され、サーバーには送信されません。
              端末・ブラウザを変更すると履歴は引き継がれません。
            </p>
            <p>
              任意でログイン（Google / GitHub / メールリンク）された場合は、認証プロバイダから
              提供されるメールアドレス・表示名・プロフィール画像 URL を当社サーバーに保存します。
              ログイン後は学習履歴・回答履歴を当社サーバーに同期し、複数端末間で共有できます
              （詳細は{" "}
              <Link
                href="/account"
                className="font-medium text-primary underline-offset-4 hover:underline"
              >
                アカウント設定
              </Link>
              {" "}より管理可能）。
            </p>
            <p>
              本サービスは教育貢献プロジェクトとして全機能を無料で提供しており、決済情報を取得・処理する機能はありません。
              公開通知メールリストへの登録時は、入力されたメールアドレスを当社サーバーに保存します。
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
              本サービスは、UX 改善のため <strong>Vercel Web Analytics</strong>・<strong>Vercel Speed Insights</strong>・<strong>PostHog</strong> を利用してページビュー・Core Web Vitals・匿名イベントを計測しています。
              いずれも個人を特定する情報（氏名・メールアドレス・IPアドレス等）は収集・送信しません。
            </p>
            <p>
              <strong>PostHog で計測するイベント種別</strong>（プロパティはメタ情報のみ）:
              ページビュー・クイズ開始・問題回答・クイズ完了・AI コパイロット送受信・
              ブログ閲覧・スクロール深度（50/75/100%）・論文問題閲覧・業種切替・
              統計ページ閲覧・お問い合わせ送信・FAQ 展開・フィードバック送信・流入元 UTM 情報。
              送信しない情報: 氏名・メールアドレス・IPアドレス・問題の解答内容・チャットのテキスト本文。
            </p>
            <p>
              Vercel Analytics・Speed Insights はいずれも <strong>Cookie を使用しない</strong> プライバシー重視設計です（IP ハッシュ化・国レベル集計のみ。Speed Insights は LCP・FID・CLS 等の Core Web Vitals を集計）。
              PostHog は <code className="rounded bg-zinc-100 px-1 text-xs dark:bg-zinc-800">localStorage</code> に匿名 ID を保存してセッションを識別します。
              第三者 Cookie の発行はありません。
            </p>
            <p>
              テーマ設定・学習履歴（匿名利用時）は localStorage を使用します。
            </p>
            <p>
              アナリティクスを無効化する場合は、uBlock Origin 等の拡張機能で{" "}
              <code className="rounded bg-zinc-100 px-1 text-xs dark:bg-zinc-800">va.vercel-scripts.com</code>・<code className="rounded bg-zinc-100 px-1 text-xs dark:bg-zinc-800">vitals.vercel-insights.com</code>・<code className="rounded bg-zinc-100 px-1 text-xs dark:bg-zinc-800">us.i.posthog.com</code>{" "}
              をブロックしてください。PostHog の詳細は{" "}
              <a
                href="https://posthog.com/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-primary underline-offset-4 hover:underline"
              >
                PostHog プライバシーポリシー
              </a>
              をご参照ください。
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
            <p>
              サーバーに同期されたアカウント情報・学習履歴は、{" "}
              <Link
                href="/account"
                className="font-medium text-primary underline-offset-4 hover:underline"
              >
                アカウント設定
              </Link>
              {" "}よりサインアウト・履歴削除が可能です。アカウント自体の削除をご希望の場合は、
              GitHub Issues よりご連絡ください。
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

          <Section
            number="6"
            icon={<AlertCircle className="h-5 w-5" />}
            title="データ侵害発生時の対応方針"
          >
            <p>
              個人情報の漏洩・滅失・毀損が発生し、個人の権利利益を害するおそれがある場合、当サイト運営者は速やかに本サイト上で告知するとともに、個人情報保護委員会への報告および本人への通知を、法令で定める範囲で行います。
            </p>
          </Section>

          <Section
            number="7"
            icon={<Globe className="h-5 w-5" />}
            title="International Users (GDPR / CCPA)"
          >
            <p>
              This service is primarily intended for users in Japan and operates in accordance with the Japanese Act on the Protection of Personal Information (個人情報保護法).
            </p>
            <p>
              <strong>EU / EEA residents (GDPR):</strong> If you are located in the European Economic Area, you may have rights under the General Data Protection Regulation, including the right to access, correct, or request deletion of your personal data. Because this service does not collect personal data without login and does not serve targeted advertising, most anonymous interactions fall outside the scope of GDPR data-subject rights. For any request, please contact us via{" "}
              <a
                href="https://github.com/kameking-lab/ipa-quiz-site/issues"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-0.5 font-medium text-primary underline-offset-4 hover:underline"
              >
                GitHub Issues
                <ExternalLink className="h-3 w-3" />
              </a>.
            </p>
            <p>
              <strong>California residents (CCPA):</strong> California residents may have the right to know, delete, and opt out of the sale of personal information. This service does not sell personal data to third parties. For any inquiry, please use GitHub Issues above.
            </p>
          </Section>

          <Section
            number="8"
            icon={<ShoppingBag className="h-5 w-5" />}
            title="アフィリエイトリンクの使用について"
          >
            <p>
              本サービスでは、参考書紹介ページ（
              <Link
                href="/recommended-books"
                className="font-medium text-primary underline-offset-4 hover:underline"
              >
                /recommended-books
              </Link>
              ）および試験区分別ページ・クイズ解説ページの一部に、Amazon アソシエイト・楽天アフィリエイトのリンクを掲載しています。
              これらのリンクを経由して商品をご購入いただいた場合、当サービスの運営費の一部として収益が発生することがあります。
              アフィリエイトリンクには <code className="rounded bg-zinc-100 px-1 text-xs dark:bg-zinc-800">rel=&quot;sponsored&quot;</code> 属性を付与しており、リンク近くに「PR」と明示しています。
              アフィリエイト収入は教育コンテンツの維持・改善に充てており、紹介する書籍の選定はアフィリエイト報酬の有無に左右されません。
              詳細は{" "}
              <Link
                href="/transparency#affiliate"
                className="font-medium text-primary underline-offset-4 hover:underline"
              >
                透明性レポート
              </Link>
              {" "}をご覧ください。
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
