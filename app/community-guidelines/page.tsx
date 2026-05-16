import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "コミュニティガイドライン",
  description:
    "過去問 AI コミュニティの健全な利用のために守っていただきたいガイドラインです。教育貢献プロジェクトとして、学習者同士が気持ちよく使えるサービスを目指しています。",
  alternates: { canonical: "/community-guidelines" },
};

export default function CommunityGuidelinesPage() {
  return (
    <main className="mx-auto w-full max-w-2xl flex-1 px-4 pb-12 pt-6 sm:px-6">
      <Button asChild variant="ghost" size="sm" className="mb-3">
        <Link href="/">
          <ArrowLeft className="h-4 w-4" />
          戻る
        </Link>
      </Button>

      <Badge variant="success" className="mb-3">教育貢献プロジェクト</Badge>
      <h1 className="mb-2 text-2xl font-bold">コミュニティガイドライン</h1>
      <p className="mb-8 text-sm text-zinc-600 dark:text-zinc-400">
        過去問 AI は IPA 情報処理技術者試験の学習を誰もが平等に行える場として運営しています。
        学習者全員が気持ちよく使えるよう、以下のガイドラインをご一読ください。
      </p>

      <section className="mb-8 space-y-6 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
        <div>
          <h2 className="mb-2 text-base font-semibold text-zinc-900 dark:text-zinc-100">教育目的の利用について</h2>
          <p>
            本サービスは IPA 情報処理技術者試験の学習支援を目的として運営しています。
            個人の受験対策・学習・研究目的での利用を歓迎します。
            教育機関での活用については <Link href="/contact" className="underline hover:text-zinc-900 dark:hover:text-zinc-50">お問い合わせ</Link> ください。
          </p>
        </div>

        <div>
          <h2 className="mb-2 text-base font-semibold text-zinc-900 dark:text-zinc-100">AI コパイロットの利用</h2>
          <ul className="list-inside list-disc space-y-1">
            <li>AI の回答はあくまで学習補助です。IPA 公式の採点基準・正答とは異なる場合があります。</li>
            <li>重要な判断は必ず IPA 公式資料で確認してください。</li>
            <li>AI を使って不正行為（試験中のカンニング等）を行うことは禁止します。</li>
          </ul>
        </div>

        <div>
          <h2 className="mb-2 text-base font-semibold text-zinc-900 dark:text-zinc-100">誤情報の報告</h2>
          <p>
            解説の誤り・問題データの不備を発見した場合は、ぜひ
            <Link href="/contact" className="mx-1 underline hover:text-zinc-900 dark:hover:text-zinc-50">お問い合わせフォーム</Link>
            からご報告ください。すべての報告に目を通し、可能な限り迅速に修正します。
            IPA 試験の出題意図・正答に関する根拠がある場合は、その情報もあわせてお知らせいただけると助かります。
          </p>
        </div>

        <div>
          <h2 className="mb-2 text-base font-semibold text-zinc-900 dark:text-zinc-100">禁止事項</h2>
          <ul className="list-inside list-disc space-y-1">
            <li>システムへの不正アクセス・スクレイピング・大量自動リクエスト</li>
            <li>問題データや AI 生成解説の無断転載・商用利用</li>
            <li>虚偽の誤情報報告・運営への嫌がらせ</li>
            <li>試験中の不正目的での利用</li>
          </ul>
        </div>

        <div>
          <h2 className="mb-2 text-base font-semibold text-zinc-900 dark:text-zinc-100">コンテンツの権利について</h2>
          <p>
            IPA 過去問データは IPA が公開する公式資料を元にしており、
            著作権は IPA に帰属します。
            詳細は <Link href="/license" className="underline hover:text-zinc-900 dark:hover:text-zinc-50">コンテンツ利用方針</Link> をご参照ください。
          </p>
        </div>

        <div>
          <h2 className="mb-2 text-base font-semibold text-zinc-900 dark:text-zinc-100">ガイドラインの変更</h2>
          <p>
            本ガイドラインは予告なく変更される場合があります。
            重大な変更は <Link href="/updates" className="underline hover:text-zinc-900 dark:hover:text-zinc-50">更新履歴</Link> でお知らせします。
          </p>
        </div>
      </section>

      <div className="rounded-lg border border-border bg-muted/40 px-4 py-3 text-sm text-zinc-600 dark:text-zinc-400">
        ガイドラインへの疑問・ご意見は{" "}
        <Link href="/contact" className="underline hover:text-zinc-900 dark:hover:text-zinc-50">
          お問い合わせ
        </Link>{" "}
        または X{" "}
        <a
          href="https://x.com/kakomon_ai_jp"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-zinc-900 dark:hover:text-zinc-50"
        >
          @kakomon_ai_jp
        </a>{" "}
        までどうぞ。
      </div>
    </main>
  );
}
