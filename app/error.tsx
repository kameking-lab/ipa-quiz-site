"use client";

import * as React from "react";
import Link from "next/link";
import { AlertTriangle, HomeIcon, RefreshCw } from "lucide-react";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  React.useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="mx-auto flex w-full max-w-xl flex-1 flex-col items-center justify-center px-4 py-20 text-center">
      <span className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-100 text-amber-600 dark:bg-amber-950/40 dark:text-amber-400">
        <AlertTriangle className="h-7 w-7" />
      </span>
      <h1 className="mb-2 text-xl font-bold text-zinc-900 dark:text-zinc-50">
        エラーが発生しました
      </h1>
      <p className="mb-1 text-sm text-zinc-500 dark:text-zinc-400">
        予期しない問題が起きました。もう一度お試しください。
      </p>
      {error.digest && (
        <p className="mb-6 text-[11px] text-zinc-400 dark:text-zinc-600">
          エラーID: {error.digest}
        </p>
      )}
      {!error.digest && <div className="mb-6" />}
      <div className="flex flex-col gap-3 sm:flex-row">
        <button
          onClick={reset}
          className="flex items-center gap-2 rounded-xl bg-sky-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-sky-700"
        >
          <RefreshCw className="h-4 w-4" />
          もう一度試す
        </button>
        <Link
          href="/"
          className="flex items-center gap-2 rounded-xl border border-zinc-300 bg-white px-5 py-2.5 text-sm font-semibold text-zinc-700 transition hover:border-zinc-400 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300"
        >
          <HomeIcon className="h-4 w-4" />
          トップへ戻る
        </Link>
      </div>
      <p className="mt-8 text-xs text-zinc-400 dark:text-zinc-600">
        問題が続く場合は{" "}
        <a
          href="https://github.com/kameking-lab/ipa-quiz-site/issues"
          target="_blank"
          rel="noopener noreferrer"
          className="underline underline-offset-2 hover:text-zinc-600 dark:hover:text-zinc-400"
        >
          GitHub Issues
        </a>{" "}
        でご報告ください。
      </p>
    </main>
  );
}
