"use client";

import * as React from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Sparkles, ExternalLink, AlertCircle } from "lucide-react";
import { Markdown } from "@/components/ui/markdown";
import { cn } from "@/lib/utils";
import { examLabel, formatYearSeason } from "@/lib/utils";
import type { SharePayload } from "@/lib/chat/types";

function decodePayload(encoded: string): SharePayload | null {
  try {
    const json = decodeURIComponent(atob(encoded));
    const data = JSON.parse(json) as SharePayload;
    if (data.v !== 1) return null;
    return data;
  } catch {
    return null;
  }
}

export function ChatShareView() {
  const params = useSearchParams();
  const raw = params.get("d");
  const payload = raw ? decodePayload(raw) : null;

  if (!payload) {
    return (
      <main className="mx-auto flex min-h-screen max-w-2xl flex-col items-center justify-center px-4 py-16 text-center">
        <AlertCircle className="mb-4 h-12 w-12 text-zinc-300 dark:text-zinc-600" />
        <h1 className="mb-2 text-xl font-bold">共有リンクが無効です</h1>
        <p className="mb-6 text-sm text-zinc-500 dark:text-zinc-400">
          URLが壊れているか、有効期限が切れています。
        </p>
        <Link
          href="/"
          className="rounded-xl bg-sky-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-sky-700"
        >
          トップへ戻る
        </Link>
      </main>
    );
  }

  const examName = examLabel(payload.exam);
  const yearSeason = formatYearSeason(payload.year, payload.season);

  return (
    <main className="mx-auto max-w-2xl px-4 py-10">
      {/* Header */}
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-sky-100 dark:bg-sky-950">
          <Sparkles className="h-4 w-4 text-sky-600 dark:text-sky-400" />
        </div>
        <div>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">過去問AI との会話</p>
          <h1 className="text-base font-bold">
            {examName} {yearSeason} 問{payload.q}
          </h1>
        </div>
      </div>

      {/* Question */}
      <section className="mb-6 rounded-xl border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-900">
        <p className="mb-1 text-[10px] font-semibold uppercase tracking-wide text-zinc-400">
          {payload.cat}
        </p>
        <p className="text-sm leading-relaxed text-zinc-800 dark:text-zinc-200">{payload.qText}</p>
      </section>

      {/* Conversation */}
      <section className="mb-8 space-y-3">
        <h2 className="text-xs font-semibold uppercase tracking-wide text-zinc-400">AIとの会話</h2>
        {payload.msgs.length === 0 ? (
          <p className="text-sm text-zinc-400">会話はありません。</p>
        ) : (
          payload.msgs.map((m, i) => (
            <div
              key={i}
              className={cn(
                "rounded-xl px-3 py-2",
                m.r === "u"
                  ? "ml-6 bg-sky-50 text-sky-900 dark:bg-sky-950/40 dark:text-sky-100"
                  : "mr-2 bg-white text-zinc-900 shadow-sm ring-1 ring-zinc-200 dark:bg-zinc-900 dark:text-zinc-100 dark:ring-zinc-800",
              )}
            >
              <p className="mb-1 text-[10px] font-semibold text-zinc-400 dark:text-zinc-500">
                {m.r === "u" ? "ユーザー" : "過去問AI"}
              </p>
              {m.r === "a" ? (
                <Markdown>{m.c}</Markdown>
              ) : (
                <p className="text-sm leading-relaxed">{m.c}</p>
              )}
            </div>
          ))
        )}
      </section>

      {/* CTA */}
      <div className="rounded-2xl border border-sky-200 bg-sky-50 p-5 text-center dark:border-sky-900/50 dark:bg-sky-950/30">
        <p className="mb-1 text-sm font-semibold text-sky-900 dark:text-sky-200">
          あなたもこの問題に挑戦しませんか？
        </p>
        <p className="mb-4 text-xs text-sky-700 dark:text-sky-400">
          過去問AI で全 IPA 試験区分の過去問をAIと一緒に解けます。
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 rounded-xl bg-sky-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-sky-700"
        >
          <Sparkles className="h-4 w-4" />
          過去問AI を試す
          <ExternalLink className="h-3 w-3 opacity-70" />
        </Link>
      </div>

      <footer className="mt-8 text-center text-[11px] text-zinc-400 dark:text-zinc-600">
        出典: IPA 情報処理技術者試験 ／ 過去問AI — https://kakomon-ai.jp
      </footer>
    </main>
  );
}
