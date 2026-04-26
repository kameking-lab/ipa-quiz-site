"use client";

import * as React from "react";
import { AlertTriangle, RefreshCw } from "lucide-react";
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
        <span className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-100 text-amber-600">
          <AlertTriangle className="h-7 w-7" />
        </span>
        <h1 className="mb-2 text-xl font-bold text-zinc-900 dark:text-zinc-50">
          アプリ起動エラー
        </h1>
        <p className="mb-6 text-sm text-zinc-500">
          アプリの読み込みに失敗しました。ページを再読み込みしてください。
        </p>
        <button
          onClick={reset}
          className="flex items-center gap-2 rounded-xl bg-sky-600 px-5 py-2.5 text-sm font-semibold text-white"
        >
          <RefreshCw className="h-4 w-4" />
          再読み込み
        </button>
      </body>
    </html>
  );
}
