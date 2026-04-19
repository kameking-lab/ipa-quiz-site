import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "メールを確認してください",
  robots: { index: false, follow: false },
};

export default function VerifyRequestPage() {
  return (
    <main className="mx-auto flex min-h-[70vh] max-w-md flex-col items-center justify-center px-4 py-12 text-center">
      <h1 className="mb-4 text-2xl font-bold">メールを送信しました</h1>
      <p className="text-sm text-zinc-600 dark:text-zinc-400">
        届いたメールのリンクからログインを完了してください。
        <br />
        メールが届かない場合は、迷惑メールフォルダをご確認ください。
      </p>
    </main>
  );
}
