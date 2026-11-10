import type { Metadata } from "next";
import { AI_RATE_LIMIT_PRIVACY_COPY } from "@/lib/privacy/disclosure";
import Link from "next/link";
import { AMAZON_ASSOCIATE_DISCLOSURE } from "@/data/recommended-books";
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
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { SITE_BASE_URL, SITE_NAME } from "@/lib/seo/config";
import { buildWebPageNode } from "@/lib/seo/structured-data";

const PRIVACY_OG_URL = `${SITE_BASE_URL}/api/og?${new URLSearchParams({
  type: "default",
  title: "プライバシーポリシー",
  subtitle: "データ保護方針",
  body: "匿名利用の学習履歴はブラウザに保存。クラウド同期・AI 利用時のデータ管理・Cookie・削除方法について。",
}).toString()}`;

const PRIVACY_DESC =
  "過去問AI のプライバシーポリシー。匿名利用の学習履歴はブラウザに保存。ログイン時のクラウド同期・AI コパイロット利用時のデータ送信・Cookie・データ削除方法について。";

export const metadata: Metadata = {
  title: "プライバシーポリシー",
  description: PRIVACY_DESC,
  alternates: { canonical: "/privacy" },
  openGraph: {
    title: "プライバシーポリシー | 過去問AI",
    description:
      "匿名利用の学習履歴はブラウザに保存。クラウド同期・AI 利用時のデータ管理・Cookie・削除方法について。",
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
      "匿名利用の学習履歴はブラウザに保存。クラウド同期・AI 利用時のデータ管理・Cookie・削除方法について。",
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

        <Breadcrumbs
          items={[
            { name: "ホーム", href: "/" },
            { name: "プライバシーポリシー", href: "/privacy" },
          ]}
        />

        <header className="mb-10 animate-fade-in">
          <Badge variant="soft" className="mb-4">
            <ShieldCheck className="h-3 w-3" />
            プライバシー
          </Badge>
          <h1 className="text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            プライバシーポリシー
          </h1>
          <p className="mt-3 text-xs text-muted-foreground">最終更新: 2026年11月6日</p>
          <p className="mt-4 max-w-2xl text-pretty text-sm leading-relaxed text-muted-foreground sm:text-base">
            過去問AI（以下「本サービス」）は、ユーザーのプライバシーを尊重し、
            個人情報の適切な取り扱いに努めます。
          </p>
        </header>

        <div className="space-y-5">
          <section
            id="security"
            aria-labelledby="security-heading"
            className="scroll-mt-20 rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-7"
          >
            <h2 id="security-heading" className="flex items-center gap-2 text-lg font-semibold text-foreground">
              <ShieldCheck className="h-5 w-5 text-primary" aria-hidden="true" />
              情報を守るための取り組み
            </h2>
            <ul className="mt-4 list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-muted-foreground">
              <li>通信は暗号化（HTTPS）して送受信します。</li>
              <li>ログインは Apple・Google・GitHub・メールのログインリンクで行い、パスワードを当サイトに保存しません。</li>
              <li>カード番号は、ウェブでは Stripe、iPhoneアプリでは Apple の購入画面で入力し、当サイトには届きません。</li>
              <li>AIへの質問に、アカウントの氏名・メールアドレスを自動で付け加えません。名前や住所を書かなくても使えます。</li>
              <li>お問い合わせ・ご意見は、その対応とサービス改善のためにだけ使います。個人情報を第三者に販売しません。</li>
              <li>不正利用を防ぐため、送信回数の制限、スパム対策の確認、他サイトへの埋め込み禁止などの対策を行っています。</li>
              <li>万一、情報の漏えいが起きた場合の対応は <a href="#6" className="font-medium text-primary underline-offset-4 hover:underline">第6項</a> のとおりです。</li>
            </ul>
          </section>

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
              外部アカウントの認証識別子と、プロバイダから返却された場合には認証処理に必要な
              アクセストークン・IDトークン・更新トークン・有効期限等も保存します。
              これらは認証、アカウント表示、学習履歴との紐付けのために利用し、
              サービスの運用基盤であるVercelおよびNeonに処理・保管を委託します。
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
              月額プランの決済にはStripeを利用します。アプリからStripeへ顧客・申込の識別子と同意確認情報等を送信し、決済画面で入力されたメールアドレス等はStripeが処理します。当社は申込・契約・請求・返金の識別子、金額、支払状態、利用対象期間、通知処理記録を保存して利用権を管理します。カード番号やセキュリティコードはStripeの決済画面で入力し、当社アプリは受け取りません。
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
              アカウントの氏名・メールアドレスを問題コンテキストに自動付加しません。ただし、ご自身が質問に入力した個人情報は質問内容として送信されるため、入力を避けてください。
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
              {AI_RATE_LIMIT_PRIVACY_COPY}
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
            </p>
            <p>
              現在の利用人数を表示するため、表示中のページから匿名のブラウザ識別子と最終操作からの経過時間を送信します。
              識別子はブラウザに保存し、日ごとに更新します。サーバーはハッシュ化した識別子・最終利用時刻・学習中の資格を保持し、
              直近5分の利用を集計します。期限を過ぎた記録は集計対象から外れます。書き込み時に、前回の清掃開始から15分以上経過していれば削除処理を試みます（書き込みがない間や処理失敗時には削除が遅れます）。
              iPhoneアプリ内ではこの計測を行いません。
              氏名・メールアドレス・回答内容はこの集計に含めません。
              この説明はアクセス解析に関するものです。
            </p>
            <p>
              本文と出典の確認記録がある学習記事の末尾を <strong>Google AdSense</strong> の広告対象とします。確認記録のない資格トップ・記事には広告枠を表示しません。
              広告が配信される場合、Google などの第三者配信事業者は、広告配信・効果測定・不正利用防止のため、Cookie、ウェブビーコン、IPアドレスなどの技術で閲覧情報を取得し、本サイトや他のサイトへの過去のアクセス情報に基づいて広告を配信することがあります。
              Google が広告 Cookie を使用することで、Google とそのパートナーは利用者に適した広告を表示できます。
              利用者は{" "}
              <a
                href="https://adssettings.google.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-primary underline-offset-4 hover:underline"
              >
                Google の広告設定
              </a>
              {" "}でパーソナライズド広告を無効にできます。第三者配信事業者の Cookie は{" "}
              <a
                href="https://optout.aboutads.info/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-primary underline-offset-4 hover:underline"
              >
                AboutAds のオプトアウトページ
              </a>
              {" "}から無効にできる場合があります。
            </p>
            <p>
              iPhoneアプリでは、広告を有効にした配布版でGoogle Mobile Ads SDKを使用します。
              iOSの追跡許可と、地域に応じたGoogleの同意管理画面での選択を確認してから広告を読み込みます。
              広告配信時は広告識別子、広告の表示・操作、IPアドレスから推定したおおよその位置、診断情報が広告配信・測定に利用される場合があります。
              追跡を許可しない場合や同意を確認できない場合はアプリ内広告を表示せず、学習機能はそのまま利用できます。
              同意の変更にはアプリ画面下部の「広告のプライバシー設定」やGoogleの「販売または共有しない」リンク、追跡許可の変更にはiOSの設定を利用できます。
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

          <section className="space-y-3 rounded-xl border p-5" aria-label="iPhoneの保存情報とAI送信">
            <h2 className="font-bold">iPhoneアプリの保存・購入情報・AI送信</h2>
            <p>Google Geminiへ質問、会話履歴、問題と解答状況、入力答案・業種を送る前に、送信先・内容・目的を示して許可を確認します。拒否すると送信しません。氏名・連絡先・勤務先の秘密は入力しないでください。入力内の個人情報も送信対象です。iPhone設定の「AI送信の許可を取り消す」で次回送信前の確認に戻せます。</p>
            <p>購入の検証・復元にはRevenueCatとAppleを利用し、サーバー生成の匿名化した会員識別子、商品・取引・購読の状態と有効期限を処理します。決済カード情報は当サイトで保存しません。審査・TestFlightのSandbox記録は本番ストア記録と分けて保持します。</p>
            <p>端末には学習履歴・下書き・保存教材・必須画像・署名済みオフライン権利を保存します。資格ごとの保存削除、または<Link href="/account/delete" className="underline">アカウントとデータの削除</Link>で消去できます。サーバーの会員情報と同期データは削除処理時に削除します。購入・返金・会計記録はプロフィール・学習履歴から切り離して7年間保持します。Apple認証トークンも失効させます。購読解約は別手続きです。</p>
          </section>
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
              {" "}からアカウントと同期データを削除できます。削除前には再ログインで本人確認します。
            </p>
          </Section>

          <Section
            number="5"
            icon={<MessageCircle className="h-5 w-5" />}
            title="お問い合わせ"
          >
            <p>「次の資格」と「過去問AI」は同じ kameking-lab が運営し、このフォームは両サイトのお問い合わせを受け付けます。送信される情報は、種別、本文、任意のお名前・メールアドレスです。お問い合わせ対応のためにのみ利用し、運営者のSlackへ、設定に応じて通知メールへ転送します。問い合わせ内容をアプリのデータベースやアクセスログへ保存しません。通知先のSlack・メールには対応のための記録が残る場合があります。削除のご相談もフォームから受け付けます。</p>
            <p>スパム対策としてCloudflare Turnstileによる確認を行い、IPアドレスを不正利用防止に使用します。氏名・受験番号・ログイン情報など、対応に不要な個人情報を本文へ記載しないでください。返信が必要な場合は任意のメールアドレス欄をご利用ください。原則3営業日以内を目安に返信しますが、内容により確認に時間がかかる場合があります。</p>
            <p>
              プライバシーに関するご質問・ご要望は、{" "}
              <Link href="/contact" className="font-medium text-primary underline-offset-4 hover:underline">
                お問い合わせフォーム
              </Link>
              {" "}からご連絡ください。GitHub アカウントをお持ちの場合は、{" "}
              <a
                href="https://github.com/kameking-lab/ipa-quiz-site/issues"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-0.5 font-medium text-primary underline-offset-4 hover:underline"
              >
                GitHub Issues
                <ExternalLink className="h-3 w-3" />
              </a>
              {" "}も利用できます。公開の投稿には個人情報を記載しないでください。
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
              <strong>EU / EEA residents (GDPR):</strong> If you are located in the European Economic Area, you may have rights under the General Data Protection Regulation, including the right to access, correct, or request deletion of your personal data. When advertising is enabled, Google and its partners may use cookies and other identifiers for personalized or non-personalized ads, as described in Section 3. For any request, please contact us via{" "}
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
              ）および試験区分別ページ・クイズ解説ページの一部に、楽天アフィリエイトのリンクを掲載しています。{AMAZON_ASSOCIATE_DISCLOSURE}
              アフィリエイトリンクを経由して商品をご購入いただいた場合、当サービスの運営費の一部として収益が発生することがあります。
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
    <section id={number} className="relative scroll-mt-20 overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-sm transition-shadow hover:shadow-md sm:p-7">
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
