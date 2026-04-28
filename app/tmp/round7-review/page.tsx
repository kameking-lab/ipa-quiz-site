import type { Metadata } from "next";
import { readFileSync } from "fs";
import path from "path";
import ReactMarkdown from "react-markdown";

export const metadata: Metadata = {
  title: "齋藤ナオ Round 7 レビュー | 一時公開",
  robots: { index: false, follow: false },
};

export default function Round7ReviewPage() {
  const filePath = path.join(process.cwd(), "docs/review-round7-saito-nao.md");
  const content = readFileSync(filePath, "utf-8");

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950">
      <div className="sticky top-0 z-10 bg-amber-50 border-b border-amber-200 dark:bg-amber-950/40 dark:border-amber-800">
        <div className="max-w-3xl mx-auto px-4 py-2 text-sm text-amber-800 dark:text-amber-300 text-center">
          ⚠️ 一時公開 — 24時間後に削除予定。外部への共有はご遠慮ください。
        </div>
      </div>

      <main className="max-w-3xl mx-auto px-4 py-10">
        <article className="prose prose-zinc dark:prose-invert prose-sm sm:prose-base max-w-none prose-headings:font-bold prose-table:text-sm prose-pre:bg-zinc-100 dark:prose-pre:bg-zinc-800">
          <ReactMarkdown>{content}</ReactMarkdown>
        </article>
      </main>
    </div>
  );
}
