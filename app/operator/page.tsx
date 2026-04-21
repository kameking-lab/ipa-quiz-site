import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export const metadata = {
  title: "運営者情報",
};

export default function OperatorPage() {
  return (
    <main className="mx-auto w-full max-w-2xl flex-1 px-4 pb-12 pt-6 sm:px-6">
      <Button asChild variant="ghost" size="sm" className="mb-3">
        <Link href="/">
          <ArrowLeft className="h-4 w-4" />
          戻る
        </Link>
      </Button>
      <h1 className="mb-8 text-2xl font-bold">運営者情報</h1>

      <section className="mb-8">
        <table className="w-full text-sm">
          <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
            <tr>
              <th className="py-3 pr-4 text-left font-medium text-zinc-600 dark:text-zinc-400 w-32">
                サービス名
              </th>
              <td className="py-3 text-zinc-800 dark:text-zinc-200">過去問AI</td>
            </tr>
            <tr>
              <th className="py-3 pr-4 text-left font-medium text-zinc-600 dark:text-zinc-400">
                運営
              </th>
              <td className="py-3 text-zinc-800 dark:text-zinc-200">過去問AI運営</td>
            </tr>
            <tr>
              <th className="py-3 pr-4 text-left font-medium text-zinc-600 dark:text-zinc-400">
                公式X
              </th>
              <td className="py-3">
                <a
                  href="https://x.com/kakomon_ai_jp"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sky-600 underline decoration-sky-300 underline-offset-2 hover:text-sky-700 dark:text-sky-400 dark:decoration-sky-700 dark:hover:text-sky-300"
                >
                  @kakomon_ai_jp
                </a>
              </td>
            </tr>
            <tr>
              <th className="py-3 pr-4 text-left font-medium text-zinc-600 dark:text-zinc-400">
                note
              </th>
              <td className="py-3">
                <a
                  href="https://note.com/kakomon_ai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sky-600 underline decoration-sky-300 underline-offset-2 hover:text-sky-700 dark:text-sky-400 dark:decoration-sky-700 dark:hover:text-sky-300"
                >
                  note.com/kakomon_ai
                </a>
              </td>
            </tr>
            <tr>
              <th className="py-3 pr-4 text-left font-medium text-zinc-600 dark:text-zinc-400">
                ステータス
              </th>
              <td className="py-3 text-zinc-800 dark:text-zinc-200">非営利ベータ版</td>
            </tr>
            <tr>
              <th className="py-3 pr-4 text-left font-medium text-zinc-600 dark:text-zinc-400">
                お問い合わせ
              </th>
              <td className="py-3">
                <a
                  href="https://github.com/kameking-lab/ipa-quiz-site/issues"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sky-600 underline decoration-sky-300 underline-offset-2 hover:text-sky-700 dark:text-sky-400 dark:decoration-sky-700 dark:hover:text-sky-300"
                >
                  GitHub Issues
                </a>
              </td>
            </tr>
          </tbody>
        </table>
      </section>

      <section className="space-y-3 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
        <p>
          本サービスは非営利のベータ版として運営しています。
          収益化（有料プラン等）を行う場合は事前にお知らせします。
        </p>
        <p>
          問題データはIPA（独立行政法人情報処理推進機構）が公開する公式過去問を使用しています。
          詳細は
          <Link href="/about" className="underline">
            著作権・利用条件
          </Link>
          をご確認ください。
        </p>
      </section>

      <section className="mt-8 rounded-lg border border-amber-300 bg-amber-50 p-4 text-sm leading-relaxed text-amber-900 dark:border-amber-800 dark:bg-amber-950 dark:text-amber-100">
        <h2 className="mb-2 text-base font-semibold">免責事項</h2>
        <p className="mb-2">
          本サービス「過去問AI（IPA Quiz）」は、独立行政法人情報処理推進機構（IPA）とは一切関係のない非公式のサービスです。
          IPAが運営・監修するものではなく、IPAの公式見解を示すものでもありません。
        </p>
        <p className="mb-2">
          「情報処理技術者試験」「応用情報技術者」「基本情報技術者」等の試験名称は、IPAの商標または登録商標です。
          本サービスではこれらを試験区分の識別のためにのみ使用しています。
        </p>
        <p>
          試験要項・申込・正式な情報は必ず
          <a
            href="https://www.ipa.go.jp/shiken/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
          >
            IPA公式サイト（ipa.go.jp/shiken）
          </a>
          をご確認ください。
        </p>
      </section>
    </main>
  );
}
