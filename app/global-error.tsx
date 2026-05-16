"use client";

import * as React from "react";
import { AlertTriangle, HomeIcon, RefreshCw } from "lucide-react";
import { captureException } from "@/lib/monitoring/sentry";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  React.useEffect(() => {
    console.error(error);
    void captureException(error, {
      route: "app/global-error.tsx",
      extra: { digest: error.digest },
    });
  }, [error]);

  return (
    <html lang="ja">
      <body className="flex min-h-dvh flex-col items-center justify-center bg-white p-8 text-center font-sans dark:bg-zinc-950">
        <span className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400">
          <AlertTriangle className="h-7 w-7" />
        </span>
        <h1 className="mb-2 text-xl font-bold text-zinc-900 dark:text-zinc-50">
          アプリ起動エラー
        </h1>
        <p className="mb-6 max-w-sm text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
          アプリの読み込みに失敗しました。
          再読み込みしても解決しない場合はトップページへ移動してください。
        </p>
        {error.digest && (
          <p className="mb-4 rounded-full bg-zinc-100 px-3 py-1 font-mono text-xs text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400">
            エラーID: {error.digest}
          </p>
        )}
        <div className="flex flex-col gap-2 sm:flex-row">
          <button
            onClick={reset}
            className="flex items-center gap-2 rounded-xl bg-sky-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-sky-700"
          >
            <RefreshCw className="h-4 w-4" />
            再読み込み
          </button>
          <a
            href="/"
            className="flex items-center gap-2 rounded-xl border border-zinc-200 bg-white px-5 py-2.5 text-sm font-semibold text-zinc-700 hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200"
          >
            <HomeIcon className="h-4 w-4" />
            トップへ移動
          </a>
        </div>
      </body>
    </html>
  );
}
