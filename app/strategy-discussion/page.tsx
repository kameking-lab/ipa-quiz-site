import { promises as fs } from "node:fs";
import path from "node:path";
import type { Metadata } from "next";

import { Markdown } from "@/components/ui/markdown";

export const metadata: Metadata = {
  title: "戦略討議（一時公開・社内検討用）",
  description: "10名の専門家による戦略討議の議事録。社内検討用の一時公開ページです。",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
    },
  },
};

export const dynamic = "force-static";
export const revalidate = false;

async function loadDiscussion(): Promise<string> {
  const filePath = path.join(process.cwd(), "logs", "strategy-discussion.md");
  return fs.readFile(filePath, "utf-8");
}

export default async function StrategyDiscussionPage() {
  const content = await loadDiscussion();

  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-6 sm:py-10">
      <div
        role="alert"
        className="mb-6 rounded-2xl border border-amber-300 bg-amber-50 p-4 text-sm leading-relaxed text-amber-900 dark:border-amber-700 dark:bg-amber-950/40 dark:text-amber-200"
      >
        <p className="font-semibold">⚠️ 一時公開ページ — 24時間後に削除予定</p>
        <p className="mt-1.5 text-xs sm:text-sm">
          このページは社内検討用に一時公開されています。検索エンジンには非掲載
          (noindex, nofollow) です。第三者への共有はお控えください。
        </p>
      </div>

      <header className="mb-8 border-b border-zinc-200 pb-6 dark:border-zinc-800">
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 sm:text-3xl">
          戦略討議：10名の専門家による徹底議論
        </h1>
        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
          目標: 半年以内に過去問AIで月商100万円達成
        </p>
        <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-500">
          開催日: 2026-04-27 / 議事録ドラフト
        </p>
      </header>

      <article className="prose prose-sm sm:prose-base max-w-none">
        <Markdown className="text-base leading-relaxed text-zinc-800 dark:text-zinc-100">
          {content}
        </Markdown>
      </article>

      <footer className="mt-12 border-t border-zinc-200 pt-6 text-xs text-zinc-500 dark:border-zinc-800 dark:text-zinc-400">
        <p>
          本ドキュメントは社内検討用のドラフトです。掲載されている人物・発言は
          議論を構造化するための想定であり、実在の人物の発言ではありません。
        </p>
      </footer>
    </main>
  );
}
