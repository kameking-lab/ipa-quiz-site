import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export const metadata = {
  title: "プライバシーポリシー",
};

export default function PrivacyPage() {
  return (
    <main className="mx-auto w-full max-w-2xl flex-1 px-4 pb-12 pt-6 sm:px-6">
      <Button asChild variant="ghost" size="sm" className="mb-3">
        <Link href="/">
          <ArrowLeft className="h-4 w-4" />
          戻る
        </Link>
      </Button>
      <h1 className="mb-1 text-2xl font-bold">プライバシーポリシー</h1>
      <p className="mb-8 text-sm text-zinc-500 dark:text-zinc-400">最終更新: 2026年4月19日</p>

      <section className="mb-8 space-y-3 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
        <p>
          過去問AI（以下「本サービス」）は、ユーザーのプライバシーを尊重し、
          個人情報の適切な取り扱いに努めます。
        </p>
      </section>

      <h2 className="mb-2 text-lg font-semibold">1. 収集する情報</h2>
      <section className="mb-8 space-y-3 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
        <p>
          本サービスはユーザーアカウントや個人情報の登録を必要としません。
          学習履歴・回答履歴・設定はお使いのブラウザのlocalStorageにのみ保存されます。
          これらのデータはサーバーに送信されることはありません。
          端末・ブラウザを変更すると履歴は引き継がれません。
        </p>
      </section>

      <h2 className="mb-2 text-lg font-semibold">2. AIコパイロットとデータ送信</h2>
      <section className="mb-8 space-y-3 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
        <p>
          AIコパイロット機能を利用する際、以下の情報がGoogle Gemini APIに送信されます：
        </p>
        <ul className="list-inside list-disc space-y-1">
          <li>質問文・選択肢・解説などの問題コンテキスト</li>
          <li>AIへの質問内容・会話履歴</li>
        </ul>
        <p>
          氏名・メールアドレスなど個人を特定できる情報は送信しません。
          送信データは
          <a
            href="https://policies.google.com/privacy"
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
          >
            Googleのプライバシーポリシー
          </a>
          に基づき処理されます。
        </p>
        <p>
          レート制限の管理のため、AIリクエスト時にIPアドレスをサーバー内メモリで一時的に保持します。
          IPアドレスはログへの記録・永続化は行いません。
        </p>
      </section>

      <h2 className="mb-2 text-lg font-semibold">3. Cookie・トラッキング</h2>
      <section className="mb-8 space-y-3 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
        <p>
          本サービスは現在、行動トラッキング目的のCookieや外部アナリティクスを使用していません。
          テーマ設定などの機能のみlocalStorageを使用します。
        </p>
      </section>

      <h2 className="mb-2 text-lg font-semibold">4. データの削除</h2>
      <section className="mb-8 space-y-3 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
        <p>
          ブラウザのlocalStorageに保存されたデータは、
          <Link href="/settings" className="underline">
            設定ページ
          </Link>
          からいつでも削除できます。
          ブラウザのキャッシュ・サイトデータをクリアすることでも削除されます。
        </p>
      </section>

      <h2 className="mb-2 text-lg font-semibold">5. お問い合わせ</h2>
      <section className="space-y-3 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
        <p>
          プライバシーに関するご質問・ご要望は、
          <a
            href="https://github.com/kameking-lab/ipa-quiz-site/issues"
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
          >
            GitHub Issues
          </a>
          からご連絡ください。
        </p>
      </section>
    </main>
  );
}
