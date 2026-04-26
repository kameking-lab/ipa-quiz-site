import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export const metadata = {
  title: "特定商取引法に基づく表記",
  description:
    "過去問AI（過去問AI）に関する特定商取引法に基づく表記。販売事業者・連絡先・価格・支払方法・返品について。",
};

export default function CommercePage() {
  return (
    <main className="mx-auto w-full max-w-2xl flex-1 px-4 pb-12 pt-6 sm:px-6">
      <Button asChild variant="ghost" size="sm" className="mb-3">
        <Link href="/">
          <ArrowLeft className="h-4 w-4" />
          戻る
        </Link>
      </Button>
      <h1 className="mb-1 text-2xl font-bold">特定商取引法に基づく表記</h1>
      <p className="mb-8 text-sm text-zinc-500 dark:text-zinc-400">
        最終更新: 2026年4月23日
      </p>

      <section className="mb-6 rounded-lg border border-sky-300 bg-sky-50 p-4 text-sm leading-relaxed text-sky-900 dark:border-sky-800 dark:bg-sky-950 dark:text-sky-100">
        <p className="mb-1.5 font-semibold">現在、本サービスは無料β版として提供しています。</p>
        <p>
          有料プラン（プレミアムプラン月額980円）の販売を開始する前に、本ページに販売事業者の情報を確定のうえ記載します。
          現時点ではユーザーから料金をお預かりしていません。
        </p>
      </section>

      <section className="mb-8">
        <table className="w-full text-sm">
          <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
            <tr>
              <th className="py-3 pr-4 text-left align-top font-medium text-zinc-600 dark:text-zinc-400 sm:w-40">
                販売事業者
              </th>
              <td className="py-3 text-zinc-800 dark:text-zinc-200">過去問AI</td>
            </tr>
            <tr>
              <th className="py-3 pr-4 text-left align-top font-medium text-zinc-600 dark:text-zinc-400">
                運営責任者
              </th>
              <td className="py-3 text-zinc-800 dark:text-zinc-200">
                金田 義太（Kaneta Yoshita）
              </td>
            </tr>
            <tr>
              <th className="py-3 pr-4 text-left align-top font-medium text-zinc-600 dark:text-zinc-400">
                所在地
              </th>
              <td className="py-3 text-zinc-800 dark:text-zinc-200">
                お問い合わせによりご開示します
                <span className="ml-2 text-xs text-zinc-500 dark:text-zinc-400">（※1）</span>
              </td>
            </tr>
            <tr>
              <th className="py-3 pr-4 text-left align-top font-medium text-zinc-600 dark:text-zinc-400">
                電話番号
              </th>
              <td className="py-3 text-zinc-800 dark:text-zinc-200">
                お問い合わせによりご開示します
                <span className="ml-2 text-xs text-zinc-500 dark:text-zinc-400">（※1）</span>
              </td>
            </tr>
            <tr>
              <th className="py-3 pr-4 text-left align-top font-medium text-zinc-600 dark:text-zinc-400">
                メールアドレス
              </th>
              <td className="py-3">
                <a
                  href="mailto:kakomon.ai.jp@gmail.com"
                  className="text-sky-600 underline decoration-sky-300 underline-offset-2 hover:text-sky-700 dark:text-sky-400 dark:decoration-sky-700 dark:hover:text-sky-300"
                >
                  kakomon.ai.jp@gmail.com
                </a>
              </td>
            </tr>
            <tr>
              <th className="py-3 pr-4 text-left align-top font-medium text-zinc-600 dark:text-zinc-400">
                お問い合わせ
              </th>
              <td className="py-3 space-y-1 text-zinc-800 dark:text-zinc-200">
                <p>
                  メール:{" "}
                  <a
                    href="mailto:kakomon.ai.jp@gmail.com"
                    className="text-sky-600 underline decoration-sky-300 underline-offset-2 hover:text-sky-700 dark:text-sky-400 dark:decoration-sky-700 dark:hover:text-sky-300"
                  >
                    kakomon.ai.jp@gmail.com
                  </a>
                </p>
                <p>
                  GitHub Issues:{" "}
                  <a
                    href="https://github.com/kameking-lab/ipa-quiz-site/issues"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sky-600 underline decoration-sky-300 underline-offset-2 hover:text-sky-700 dark:text-sky-400 dark:decoration-sky-700 dark:hover:text-sky-300"
                  >
                    github.com/kameking-lab/ipa-quiz-site/issues
                  </a>
                </p>
              </td>
            </tr>
            <tr>
              <th className="py-3 pr-4 text-left align-top font-medium text-zinc-600 dark:text-zinc-400">
                販売価格
              </th>
              <td className="py-3 text-zinc-800 dark:text-zinc-200">
                <ul className="list-inside list-disc space-y-1">
                  <li>無料プラン: 0円（全機能・広告あり）</li>
                  <li>
                    プレミアムプラン（予定）: 月額980円（税込）
                  </li>
                </ul>
                <p className="mt-2 text-xs text-zinc-500 dark:text-zinc-400">
                  ※ 現時点では無料プランのみ提供しており、有料プランは未リリースです。
                </p>
              </td>
            </tr>
            <tr>
              <th className="py-3 pr-4 text-left align-top font-medium text-zinc-600 dark:text-zinc-400">
                追加手数料等の追加料金
              </th>
              <td className="py-3 text-zinc-800 dark:text-zinc-200">
                インターネット接続料金・通信料金はお客様のご負担となります。
              </td>
            </tr>
            <tr>
              <th className="py-3 pr-4 text-left align-top font-medium text-zinc-600 dark:text-zinc-400">
                支払方法
              </th>
              <td className="py-3 text-zinc-800 dark:text-zinc-200">
                クレジットカード決済（Stripe経由を予定）
              </td>
            </tr>
            <tr>
              <th className="py-3 pr-4 text-left align-top font-medium text-zinc-600 dark:text-zinc-400">
                支払時期
              </th>
              <td className="py-3 text-zinc-800 dark:text-zinc-200">
                毎月、お申込み日を基準日として自動課金します。
              </td>
            </tr>
            <tr>
              <th className="py-3 pr-4 text-left align-top font-medium text-zinc-600 dark:text-zinc-400">
                サービスの提供時期
              </th>
              <td className="py-3 text-zinc-800 dark:text-zinc-200">
                決済完了後、直ちにプレミアム機能をご利用いただけます。
              </td>
            </tr>
            <tr>
              <th className="py-3 pr-4 text-left align-top font-medium text-zinc-600 dark:text-zinc-400">
                返品・キャンセルについて
              </th>
              <td className="py-3 text-zinc-800 dark:text-zinc-200">
                <p className="mb-1">
                  デジタルサービスの性質上、決済後の返品はお受けできません。
                </p>
                <p className="mb-1">
                  ただし、決済完了から
                  <strong>8日以内</strong>
                  かつ、プレミアム機能のご利用実績がない場合に限り、ご連絡いただければ全額返金いたします。
                </p>
                <p>
                  定期課金はいつでも解約可能で、解約後は次回更新日以降の課金を停止します。既に課金済みの期間分については日割り返金を行いません。
                </p>
              </td>
            </tr>
            <tr>
              <th className="py-3 pr-4 text-left align-top font-medium text-zinc-600 dark:text-zinc-400">
                動作環境
              </th>
              <td className="py-3 text-zinc-800 dark:text-zinc-200">
                モダンなWebブラウザ（Chrome / Safari / Firefox / Edge の最新版）。
                JavaScript・Cookieを有効にしてご利用ください。
              </td>
            </tr>
          </tbody>
        </table>
      </section>

      <section className="mb-6 space-y-2 rounded-xl border border-zinc-200 bg-zinc-50 p-4 text-xs leading-relaxed text-zinc-600 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400">
        <p>
          <span className="font-semibold">※1</span>{" "}
          所在地および電話番号については、特定商取引法第11条の表示省略規定に基づき、お問い合わせにより速やかにご開示いたします。
        </p>
        <p>
          現在は無料β版として運営中です。有料プラン開始時（2026年5月予定）に事業者登記情報を正式に追記します。
        </p>
      </section>

      <section className="space-y-3 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
        <p>
          本表記は、特定商取引法第11条（通信販売についての広告）に基づくものです。
          詳細は
          <Link href="/terms" className="underline">
            利用規約
          </Link>
          および
          <Link href="/privacy" className="underline">
            プライバシーポリシー
          </Link>
          もあわせてご確認ください。
        </p>
      </section>
    </main>
  );
}
