import Link from "next/link";
import { HomeIcon, Search } from "lucide-react";

export default function NotFound() {
  return (
    <main className="mx-auto flex w-full max-w-xl flex-1 flex-col items-center justify-center px-4 py-20 text-center">
      <p className="mb-2 text-6xl font-bold text-zinc-200 dark:text-zinc-700">404</p>
      <h1 className="mb-2 text-xl font-bold text-zinc-900 dark:text-zinc-50">
        ページが見つかりません
      </h1>
      <p className="mb-8 text-sm text-zinc-500 dark:text-zinc-400">
        URLを確認するか、下のリンクからトップページへお戻りください。
      </p>
      <div className="flex flex-col gap-3 sm:flex-row">
        <Link
          href="/"
          className="flex items-center gap-2 rounded-xl bg-sky-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-sky-700"
        >
          <HomeIcon className="h-4 w-4" />
          トップへ戻る
        </Link>
        <Link
          href="/quiz?mode=random&exam=ap"
          className="flex items-center gap-2 rounded-xl border border-zinc-300 bg-white px-5 py-2.5 text-sm font-semibold text-zinc-700 transition hover:border-zinc-400 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300"
        >
          <Search className="h-4 w-4" />
          問題を解く
        </Link>
      </div>
    </main>
  );
}
