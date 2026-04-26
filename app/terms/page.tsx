import type { Metadata } from "next";
import Link from "next/link";
import {
  AlertOctagon,
  ArrowLeft,
  Ban,
  Bot,
  CreditCard,
  FileText,
  Gavel,
  Quote,
  RefreshCw,
  Shield,
  Sparkles,
  UserCheck,
  UserMinus,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "利用規約",
  description:
    "過去問AI（過去問AI）の利用規約。サービス概要・AI 生成・免責・禁止事項・出典・準拠法・利用料金・解約・会員資格・年齢制限について。",
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
            title="サービスの概要とベータ版について"
          >
            <p>
              本サービスは、情報処理技術者試験の過去問学習を支援する AI ネイティブな学習支援サービスです。
              現在ベータ版として提供しており、機能・データ・仕様は予告なく変更・中断・終了する場合があります。
              ベータ版の性質上、不具合や予期しない動作が発生する可能性があります。
            </p>
            <p>
              本規約における「運営」とは、本サービスを提供する個人事業主 金田 義太（Kaneta Yoshita）を指します。
              事業者の所在地・連絡先など特定商取引法に基づく表記の詳細は{" "}
              <Link href="/commerce" className="underline underline-offset-2">特定商取引法に基づく表記</Link>
              {" "}をご参照ください。
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
            icon={<CreditCard className="h-5 w-5" />}
            title="利用料金"
          >
            <p>
              本サービスには無料プランと有料のプレミアムプランがあります。
              プレミアムプランの料金は<strong>月額 980 円（税込）</strong>で、
              クレジットカードによる Stripe 決済（自動継続課金）に対応します。
              申込日を基準日として、毎月同日に自動的に決済が行われます。
            </p>
            <p>
              運営は将来、料金の改定（値上げ・値下げ）を行うことがあります。
              <strong>値上げを行う場合は、効力発生日の 30 日前までに本サービス上で告知</strong>
              します。告知後も本サービスを継続利用された場合、新料金に同意したものとみなします。
              告知期間中に解約された場合、新料金は適用されません。
            </p>
            <p>
              本規約のうち利用料金に関する条項について、消費者契約法第 10 条に違反し、
              消費者の利益を一方的に害すると認められる部分は、その限りにおいて無効とします。
            </p>
            <p>
              返金については
              <Link
                href="/commerce"
                className="font-medium text-primary underline-offset-4 hover:underline"
              >
                特定商取引法に基づく表記
              </Link>
              {" "}を併せてご確認ください。
            </p>
          </Section>

          <Section
            number="9"
            icon={<UserMinus className="h-5 w-5" />}
            title="アカウント解約・データ削除"
          >
            <p>
              プレミアムプランは、設定画面または運営宛のメール
              （
              <a
                href="mailto:kakomon.ai.jp@gmail.com"
                className="font-medium text-primary underline-offset-4 hover:underline"
              >
                kakomon.ai.jp@gmail.com
              </a>
              ）からいつでも解約できます。解約手続きが完了すると、
              <strong>次回更新日以降の課金を停止</strong>
              し、既にお支払い済みの期間（次回更新日まで）はプレミアム機能を継続してご利用いただけます。
              既に課金済みの期間分について、日割り返金は行いません。
            </p>
            <p>
              アカウント解約後、運営は学習履歴・対話ログ等のユーザーデータを
              <strong>30 日間保持</strong>
              した後に削除します。30 日以内であれば、運営に依頼することでアカウント・有料契約を再開できる場合があります。
            </p>
            <p>
              30 日の保持期間を待たずに、データの<strong>即時削除</strong>を希望される場合は、
              上記メールアドレスまでご連絡ください。本人確認のうえ、合理的な期間内に削除を実施します。
              削除後は学習履歴・購入履歴等を復元できないため、ご注意ください。
            </p>
          </Section>

          <Section
            number="10"
            icon={<UserCheck className="h-5 w-5" />}
            title="会員資格"
          >
            <p>
              本サービスは、無料プランとプレミアムプランの 2 種類のアカウントを提供します。
              無料プランは登録なしでもご利用いただけます。プレミアムプランはユーザー登録および有効な決済手段の提供が必要です。
            </p>
            <p>
              本サービスは<strong>個人での学習用途に限り</strong>ご利用いただけます。
              アカウントを第三者に譲渡・貸与・共有する行為、企業内での共有アカウント運用、
              および本サービスのコンテンツを商業目的・営利目的で再配布する行為は禁止します。
            </p>
            <p>
              次のいずれかに該当する場合、運営は事前通知なく当該アカウントの利用停止・削除・プレミアム契約の解除を行うことができます。
              この場合の返金は行いません。
            </p>
            <ul className="space-y-1.5">
              {[
                "本規約・関連規定（プライバシーポリシー等）に違反した場合",
                "登録情報に虚偽・不正があると判明した場合",
                "決済手段の有効性が確認できない、または支払いが滞った場合",
                "第 4 条「禁止事項」に該当する行為が確認された場合",
                "反社会的勢力に該当する、または関与していると判明した場合",
                "その他、運営が会員として不適切と合理的に判断した場合",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-primary" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </Section>

          <Section
            number="11"
            icon={<Shield className="h-5 w-5" />}
            title="年齢制限"
          >
            <p>
              本サービスは年齢制限のあるサービスではありませんが、
              <strong>18 歳未満の方が利用される場合は、必ず保護者の同意を得たうえでご利用ください。</strong>
              特にプレミアムプランへの申込（決済を伴う行為）は、未成年者の場合、
              民法第 5 条第 1 項に基づき法定代理人（保護者）の同意が必要です。
            </p>
            <p>
              法定代理人の同意なく未成年者が締結したプレミアムプランの契約については、
              民法第 5 条第 2 項に基づき<strong>取り消す</strong>ことができます。
              取り消しのご連絡は{" "}
              <a
                href="mailto:kakomon.ai.jp@gmail.com"
                className="font-medium text-primary underline-offset-4 hover:underline"
              >
                kakomon.ai.jp@gmail.com
              </a>
              {" "}までお願いします。本人確認・法定代理人確認のうえ、決済代金を返金します。
            </p>
            <p>
              なお、保護者の同意があった旨を表示・申告して登録された場合、または小遣いとしてあらかじめ処分が許された財産の範囲で支払われた場合、
              民法上の取消権が制限されることがあります。
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
