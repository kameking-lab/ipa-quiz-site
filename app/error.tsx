"use client";

import * as React from "react";
import Link from "next/link";
import { AlertTriangle, ExternalLink, HomeIcon, MessageSquare, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { captureException } from "@/lib/monitoring/sentry";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  React.useEffect(() => {
    console.error(error);
    void captureException(error, {
      route: "app/error.tsx",
      extra: { digest: error.digest },
    });
  }, [error]);

  return (
    <main className="relative flex flex-1 items-center justify-center px-4 py-16">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-radial-spotlight"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[420px] bg-grid opacity-30 [mask-image:radial-gradient(60%_50%_at_50%_0%,#000_30%,transparent_70%)]"
      />

      <div className="relative w-full max-w-md text-center">
        <div className="overflow-hidden rounded-2xl border border-border bg-card p-7 shadow-lg sm:p-8">
          <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-warning/15 text-warning">
            <AlertTriangle className="h-7 w-7" />
          </div>
          <h1 className="text-balance text-2xl font-bold tracking-tight text-foreground">
            予期しないエラーが発生しました
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            一時的な問題が発生しました。再試行するか、
            トップページから学習を再開してください。
          </p>
          {error.digest && (
            <p className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-muted px-3 py-1 font-mono text-[11px] text-muted-foreground">
              <span className="text-foreground/70">エラーID:</span>
              <span>{error.digest}</span>
            </p>
          )}

          <div className="mt-6 flex flex-col gap-2 sm:flex-row">
            <Button
              variant="primary"
              size="lg"
              className="flex-1"
              onClick={reset}
            >
              <RefreshCw className="h-4 w-4" />
              もう一度試す
            </Button>
            <Button asChild variant="outline" size="lg" className="flex-1">
              <Link href="/">
                <HomeIcon className="h-4 w-4" />
                トップへ戻る
              </Link>
            </Button>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/contact"
            className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground"
          >
            <MessageSquare className="h-3.5 w-3.5" />
            問題を報告する
          </Link>
          <a
            href="https://github.com/kameking-lab/ipa-quiz-site/issues"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground"
          >
            <ExternalLink className="h-3.5 w-3.5" />
            GitHub Issues
          </a>
        </div>
      </div>
    </main>
  );
}
