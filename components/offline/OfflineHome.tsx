"use client";

import * as React from "react";
import Link from "next/link";
import { WifiOff, BookmarkCheck, History, Sparkles } from "lucide-react";
import { ALL_QUESTIONS } from "@/data/questions";
import { createHistoryStore } from "@/lib/storage/history";
import { readLastQuestion } from "@/lib/storage/last-question";
import { questionPagePath } from "@/lib/seo/question-url";
import { examLabel, formatYearSeason } from "@/lib/utils";
import type { Question } from "@/lib/questions/types";

interface OfflineQuestionLink {
  id: string;
  href: string;
  label: string;
}

function toLink(q: Question): OfflineQuestionLink {
  return {
    id: q.id,
    href: questionPagePath(q),
    label: `${examLabel(q.exam)} ${formatYearSeason(q.year, q.season)} 問${q.qNumber}`,
  };
}

export function OfflineHome() {
  const [online, setOnline] = React.useState<boolean>(true);
  const [bookmarked, setBookmarked] = React.useState<OfflineQuestionLink[]>([]);
  const [recent, setRecent] = React.useState<OfflineQuestionLink[]>([]);
  const [lastHref, setLastHref] = React.useState<string | null>(null);

  React.useEffect(() => {
    setOnline(typeof navigator !== "undefined" ? navigator.onLine : true);
    const on = () => setOnline(true);
    const off = () => setOnline(false);
    window.addEventListener("online", on);
    window.addEventListener("offline", off);

    const store = createHistoryStore();
    const byId = new Map(ALL_QUESTIONS.map((q) => [q.id, q]));

    const starredIds = store.getStarredIds();
    setBookmarked(
      starredIds
        .map((id) => byId.get(id))
        .filter((q): q is Question => Boolean(q))
        .slice(0, 30)
        .map(toLink),
    );

    const recentIds = store.getRecentIds(20);
    const seen = new Set<string>();
    const recentLinks: OfflineQuestionLink[] = [];
    for (const id of recentIds) {
      if (seen.has(id)) continue;
      seen.add(id);
      const q = byId.get(id);
      if (q) recentLinks.push(toLink(q));
      if (recentLinks.length >= 20) break;
    }
    setRecent(recentLinks);

    const last = readLastQuestion();
    if (last) {
      setLastHref(
        `/q/${last.exam}/${last.year}-${last.season}/${last.session}/q${last.qNumber}`,
      );
    }

    return () => {
      window.removeEventListener("online", on);
      window.removeEventListener("offline", off);
    };
  }, []);

  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <div
          className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium ${
            online
              ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300"
              : "bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300"
          }`}
        >
          <WifiOff className="h-3.5 w-3.5" aria-hidden="true" />
          {online ? "オンラインに復帰しました" : "オフラインモード"}
        </div>
        <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-3xl">
          オフライン演習
        </h1>
        <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
          ネットワーク接続がなくても、ブックマーク済みの問題と最近開いた問題は引き続き演習できます。
          AI コパイロットはオンライン復帰後に利用可能になります。
        </p>
      </header>

      {lastHref ? (
        <section
          aria-labelledby="offline-resume-heading"
          className="rounded-2xl border border-border bg-card p-4"
        >
          <h2
            id="offline-resume-heading"
            className="mb-2 inline-flex items-center gap-2 text-sm font-semibold text-zinc-900 dark:text-zinc-50"
          >
            <Sparkles className="h-4 w-4" aria-hidden="true" />
            続きから
          </h2>
          <Link
            href={lastHref}
            className="block rounded-lg bg-primary px-4 py-2.5 text-center text-sm font-medium text-primary-foreground hover:opacity-90"
          >
            最後の問題に戻る
          </Link>
        </section>
      ) : null}

      <section aria-labelledby="offline-bookmarks-heading">
        <h2
          id="offline-bookmarks-heading"
          className="mb-3 inline-flex items-center gap-2 text-sm font-semibold text-zinc-900 dark:text-zinc-50"
        >
          <BookmarkCheck className="h-4 w-4" aria-hidden="true" />
          ブックマーク（{bookmarked.length}件）
        </h2>
        {bookmarked.length === 0 ? (
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            ブックマークした問題はまだありません。オンライン中に各問題の「★」を押すとここに表示されます。
          </p>
        ) : (
          <ul className="divide-y divide-border rounded-2xl border border-border">
            {bookmarked.map((item) => (
              <li key={item.id}>
                <Link
                  href={item.href}
                  className="block px-4 py-3 text-sm hover:bg-muted/50"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section aria-labelledby="offline-recent-heading">
        <h2
          id="offline-recent-heading"
          className="mb-3 inline-flex items-center gap-2 text-sm font-semibold text-zinc-900 dark:text-zinc-50"
        >
          <History className="h-4 w-4" aria-hidden="true" />
          最近開いた問題
        </h2>
        {recent.length === 0 ? (
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            まだ閲覧履歴がありません。
          </p>
        ) : (
          <ul className="divide-y divide-border rounded-2xl border border-border">
            {recent.map((item) => (
              <li key={item.id}>
                <Link
                  href={item.href}
                  className="block px-4 py-3 text-sm hover:bg-muted/50"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section
        aria-labelledby="offline-tip-heading"
        className="rounded-2xl border border-dashed border-border bg-muted/30 p-4"
      >
        <h2
          id="offline-tip-heading"
          className="mb-1 text-sm font-semibold text-zinc-900 dark:text-zinc-50"
        >
          オフライン演習のヒント
        </h2>
        <ul className="ml-4 list-disc space-y-1 text-xs text-zinc-600 dark:text-zinc-400">
          <li>
            一度開いた問題はキャッシュされ、再アクセス時にネットワークなしでも表示できます。
          </li>
          <li>
            AI 解説の生成にはネットワーク接続が必要です。オフライン時は既存の静的解説のみ閲覧できます。
          </li>
          <li>
            学習履歴・ブックマークはローカルに保存されているため、オフラインでも更新されます。
          </li>
        </ul>
      </section>
    </div>
  );
}
