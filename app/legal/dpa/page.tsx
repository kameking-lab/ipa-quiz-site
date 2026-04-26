import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "データ処理委託契約（DPA）",
  description:
    "過去問AI の法人向けデータ処理委託契約 (Data Processing Agreement) のテンプレート。サブプロセッサー一覧、データ取扱条件、削除・返却ポリシー。",
  alternates: { canonical: "/legal/dpa" },
};

const SUBPROCESSORS = [
  {
    name: "Vercel Inc.",
    purpose: "アプリケーション・CDN ホスティング",
    region: "米国 / グローバル CDN",
    safeguards: "SCC (Standard Contractual Clauses) / DPA 締結済み",
    url: "https://vercel.com/legal/dpa",
  },
  {
    name: "Neon Inc.",
    purpose: "Postgres データベース",
    region: "東京 (ap-northeast-1)",
    safeguards: "SOC2 Type2 取得済み / DPA 締結済み",
    url: "https://neon.tech/dpa",
  },
  {
    name: "Google LLC (Gemini API)",
    purpose: "AI コパイロット推論（学習者の質問・選択結果を入力として使用）",
    region: "米国 / グローバル",
    safeguards:
      "Google Cloud DPA 適用 / Gemini API はデフォルトで顧客データを学習に使用しない契約",
    url: "https://cloud.google.com/terms/data-processing-addendum",
  },
  {
    name: "Stripe Inc.",
    purpose: "決済処理（料金プランの請求）",
    region: "米国 / 日本",
    safeguards: "SCC / Stripe DPA 締結済み / PCI DSS Level 1",
    url: "https://stripe.com/legal/dpa",
  },
];

export default function DpaPage() {
  return (
    <main className="mx-auto w-full max-w-3xl flex-1 px-4 pb-16 pt-6 sm:px-6">
      <Button asChild variant="ghost" size="sm" className="mb-3">
        <Link href="/">
          <ArrowLeft className="h-4 w-4" />
          戻る
        </Link>
      </Button>

      <header className="mb-6">
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <Badge variant="outline">法人向け</Badge>
          <Badge variant="default">テンプレート v1.0</Badge>
        </div>
        <h1 className="mb-2 text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl">
          データ処理委託契約 (DPA)
        </h1>
        <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
          本ページは 過去問AI が法人顧客との間で締結する{" "}
          <strong>データ処理委託契約 (Data Processing Agreement)</strong> の標準雛形を
          公開するものです。Team プラン契約時には本テンプレートに基づき個別 DPA を締結します。
          PDF 版は法人パイロット申込後に別途お送りします（現在は HTML 版のみ公開）。
        </p>
      </header>

      <Card className="mb-6 border-amber-300 bg-amber-50/60 dark:border-amber-800 dark:bg-amber-950/30">
        <CardContent className="p-4 text-sm leading-relaxed text-amber-900 dark:text-amber-100">
          <strong>注意:</strong> 本ページの記載は雛形であり、個別契約の最終的な効力は締結された
          書面 DPA に基づきます。貴社雛形を優先される場合も対応可能です。
        </CardContent>
      </Card>

      <article className="prose prose-sm dark:prose-invert max-w-none space-y-6 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
        <section>
          <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-50">第 1 条（定義）</h2>
          <ol className="ml-5 list-decimal space-y-1.5">
            <li>
              <strong>「個人情報」</strong>とは、個人情報の保護に関する法律（個人情報保護法）
              第 2 条第 1 項に定める個人情報をいう。
            </li>
            <li>
              <strong>「データ管理者」</strong>とは本契約に基づき個人情報の取扱い目的・方法を
              決定する委託元法人（以下「貴社」）をいう。
            </li>
            <li>
              <strong>「データ処理者」</strong>とは貴社の指示に従って個人情報を処理する
              過去問AI 運営者（以下「当社」）をいう。
            </li>
            <li>
              <strong>「サブプロセッサー」</strong>とは、当社が個人情報の処理を再委託する
              第三者をいい、本契約末尾の一覧に記載する。
            </li>
          </ol>
        </section>

        <section>
          <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-50">
            第 2 条（処理の対象・期間・性質・目的）
          </h2>
          <table className="my-2 w-full border-collapse text-sm">
            <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
              <tr>
                <th className="w-32 py-2 pr-3 text-left align-top font-semibold text-zinc-600 dark:text-zinc-400">
                  処理対象データ
                </th>
                <td className="py-2">
                  メンバーの氏名・メールアドレス・部署・学習履歴（解答結果、学習時間、AI コパイロットへの質問内容）
                </td>
              </tr>
              <tr>
                <th className="py-2 pr-3 text-left align-top font-semibold text-zinc-600 dark:text-zinc-400">
                  処理目的
                </th>
                <td className="py-2">
                  IPA 情報処理技術者試験の学習サービス提供、進捗の可視化、AI コパイロットの応答生成
                </td>
              </tr>
              <tr>
                <th className="py-2 pr-3 text-left align-top font-semibold text-zinc-600 dark:text-zinc-400">
                  処理期間
                </th>
                <td className="py-2">
                  Team プラン契約期間中、および契約終了後 30 日以内の返却・削除完了までの期間
                </td>
              </tr>
              <tr>
                <th className="py-2 pr-3 text-left align-top font-semibold text-zinc-600 dark:text-zinc-400">
                  データ主体
                </th>
                <td className="py-2">貴社の役員、従業員、業務委託先（貴社が招待したユーザー）</td>
              </tr>
            </tbody>
          </table>
        </section>

        <section>
          <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-50">
            第 3 条（処理者の義務）
          </h2>
          <p>当社は、個人情報の処理にあたり以下を遵守する。</p>
          <ol className="ml-5 list-decimal space-y-1.5">
            <li>貴社の文書による指示に基づいてのみ個人情報を処理する。</li>
            <li>
              個人情報の安全管理のために必要かつ適切な組織的・物理的・技術的な措置を講じる
              （詳細は <Link href="/security" className="underline">セキュリティページ</Link>{" "}
              に記載）。
            </li>
            <li>
              個人情報を処理する従業員に対し守秘義務を課し、職務遂行上必要な範囲に限り
              アクセス権を付与する。
            </li>
            <li>
              個人情報の漏洩・滅失・毀損その他のセキュリティ事故が発生した場合、認識後
              72 時間以内に貴社へ通知する。
            </li>
          </ol>
        </section>

        <section>
          <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-50">
            第 4 条（サブプロセッサーの利用）
          </h2>
          <ol className="ml-5 list-decimal space-y-1.5">
            <li>
              貴社は、当社が本契約末尾の一覧に記載するサブプロセッサーを利用することに
              同意する。
            </li>
            <li>
              当社は、サブプロセッサーを追加・変更する場合、変更日 30 日前までに貴社に
              通知する。貴社は通知から 14 日以内に合理的な理由に基づき異議を申し立てることが
              できる。
            </li>
            <li>
              当社は、各サブプロセッサーとの間で本契約と同等のデータ保護義務を含む契約を
              締結する。
            </li>
          </ol>
        </section>

        <section>
          <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-50">
            第 5 条（データ主体の権利行使への協力）
          </h2>
          <p>
            データ主体（貴社のメンバー）が個人情報の開示・訂正・利用停止・削除を求めた場合、
            当社は貴社の指示に従い合理的な範囲で協力する。
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-50">
            第 6 条（監査）
          </h2>
          <ol className="ml-5 list-decimal space-y-1.5">
            <li>
              貴社は、年 1 回まで、当社の本契約遵守状況について監査を要求できる。
              費用は貴社負担とし、30 日前までに書面で通知する。
            </li>
            <li>
              SOC2 Type1 / Type2 報告書の取得後は、原則として報告書の開示をもって
              監査要件を充足するものとする。
            </li>
          </ol>
        </section>

        <section>
          <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-50">
            第 7 条（契約終了時のデータ返却・削除）
          </h2>
          <ol className="ml-5 list-decimal space-y-1.5">
            <li>
              本契約の終了後、貴社の選択に従い、保有する個人情報を{" "}
              <strong>返却（CSV エクスポート）</strong>または<strong>削除</strong>する。
            </li>
            <li>
              いずれの場合も、契約終了から 30 日以内に処理を完了し、完了後は当社のシステム
              および全サブプロセッサーから当該個人情報を消去する。
            </li>
            <li>法令により保存が義務付けられる場合を除く。</li>
          </ol>
        </section>

        <section>
          <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-50">
            第 8 条（越境移転）
          </h2>
          <p>
            一部のサブプロセッサーは日本国外でデータを処理する。当社は越境移転に関し、
            個人情報保護法第 28 条および GDPR 第 46 条に準拠する措置（標準契約条項 SCC 等）を
            講じる。
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-50">
            第 9 条（責任の制限）
          </h2>
          <p>
            本契約違反に起因する当社の責任は、直近 12 ヶ月間に貴社が当社に支払った
            利用料金の総額を上限とする。但し、当社の故意または重大な過失による場合は
            この限りではない。
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-50">付録 A: サブプロセッサー一覧</h2>
          <p className="mb-2">
            最終更新日: <span className="font-mono">2026-04-26</span>
          </p>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] border-collapse text-sm">
              <thead>
                <tr className="border-b border-zinc-200 text-left text-xs font-semibold text-zinc-500 dark:border-zinc-800 dark:text-zinc-400">
                  <th className="py-2 pr-3">事業者名</th>
                  <th className="py-2 pr-3">処理目的</th>
                  <th className="py-2 pr-3">処理地域</th>
                  <th className="py-2 pr-3">保護措置</th>
                </tr>
              </thead>
              <tbody>
                {SUBPROCESSORS.map((s) => (
                  <tr
                    key={s.name}
                    className="border-b border-zinc-100 last:border-b-0 dark:border-zinc-900"
                  >
                    <td className="py-2 pr-3 align-top font-medium text-zinc-900 dark:text-zinc-100">
                      <a
                        href={s.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline decoration-zinc-300 hover:text-sky-600 dark:decoration-zinc-700 dark:hover:text-sky-400"
                      >
                        {s.name}
                      </a>
                    </td>
                    <td className="py-2 pr-3 align-top text-zinc-700 dark:text-zinc-300">
                      {s.purpose}
                    </td>
                    <td className="py-2 pr-3 align-top text-zinc-600 dark:text-zinc-400">
                      {s.region}
                    </td>
                    <td className="py-2 pr-3 align-top text-zinc-600 dark:text-zinc-400">
                      {s.safeguards}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="rounded-xl border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-900/50">
          <h3 className="mb-2 text-sm font-bold text-zinc-900 dark:text-zinc-100">
            お問い合わせ
          </h3>
          <p className="text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">
            DPA に関するご質問・カスタマイズ要望は{" "}
            <Link href="/enterprise/pilot" className="underline">
              法人パイロット申込フォーム
            </Link>{" "}
            の自由記述欄か、
            <Link href="/operator" className="underline">
              運営者情報
            </Link>{" "}
            記載の窓口へお問い合わせください。
          </p>
        </section>
      </article>
    </main>
  );
}
