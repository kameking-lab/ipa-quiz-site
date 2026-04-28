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
                プロジェクト形態
              </th>
              <td className="py-3 text-zinc-800 dark:text-zinc-200">
                教育貢献プロジェクト（全機能無料・非営利）
              </td>
            </tr>
            <tr>
              <th className="py-3 pr-4 text-left font-medium text-zinc-600 dark:text-zinc-400">
                お問い合わせ
              </th>
              <td className="py-3 space-x-3">
                <Link
                  href="/contact"
                  className="text-sky-600 underline decoration-sky-300 underline-offset-2 hover:text-sky-700 dark:text-sky-400 dark:decoration-sky-700 dark:hover:text-sky-300"
                >
                  お問い合わせフォーム
                </Link>
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
          本サービスは教育貢献プロジェクトとして全機能無料で運営しています。
          IPA 試験対策を、誰もが平等に学べる場として公開することが目的です。
        </p>
        <p>
          問題データはIPA（独立行政法人情報処理推進機構）が公開する公式過去問を使用しています。
          詳細は
          <Link href="/about" className="underline">
            プロジェクトについて
          </Link>
          をご確認ください。運営の透明性レポートは
          <Link href="/transparency" className="underline">
            /transparency
          </Link>
          で公開しています。
        </p>
      </section>
    </main>
  );
}
