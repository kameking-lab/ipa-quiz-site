import type { Metadata } from "next";
import { notFound } from "next/navigation";
import fs from "node:fs/promises";
import path from "node:path";
import Link from "next/link";
import { ArrowLeft, AlertTriangle } from "lucide-react";
import { Markdown } from "@/components/ui/markdown";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "Final Review v3 (内部検討用)",
  description: "教育貢献ピボット後の最終辛口レビュー v3（10名・noindex・24時間後削除）",
  robots: { index: false, follow: false },
};

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

async function loadReview(): Promise<string> {
  const filePath = path.join(process.cwd(), "logs", "final-review-v3.md");
  try {
    return await fs.readFile(filePath, "utf-8");
  } catch {
    return "# レビュー文書が見つかりません\n\n`logs/final-review-v3.md` が読み込めませんでした。";
  }
}

export default async function FinalReviewV3Page() {
  if (process.env.NODE_ENV === "production") {
    notFound();
  }

  const content = await loadReview();
  return (
    <main className="mx-auto w-full max-w-3xl flex-1 px-4 pb-16 pt-6 sm:px-6">
      <Button asChild variant="ghost" size="sm" className="mb-3">
        <Link href="/">
          <ArrowLeft className="h-4 w-4" />
          戻る
        </Link>
      </Button>

      <div className="mb-4 flex flex-wrap items-center gap-2">
        <Badge variant="outline">内部検討用</Badge>
        <Badge variant="warn">noindex</Badge>
        <Badge variant="outline">production では非公開</Badge>
      </div>

      <div className="mb-6 flex gap-2 rounded-xl border border-amber-200 bg-amber-50/60 p-3 text-xs leading-relaxed text-amber-900 dark:border-amber-900/60 dark:bg-amber-950/30 dark:text-amber-200">
        <AlertTriangle className="mt-0.5 h-4 w-4 flex-shrink-0" />
        <p>
          このページは教育貢献ピボット後の最終辛口レビュー v3（仮想 10 名）を、検討者間共有のために一時公開しているものです。
          検索エンジンには登録されません（noindex/nofollow）。
          production 環境ではアクセス時に 404 を返します（preview / dev のみ閲覧可）。
          記載内容は仮想ペルソナによる評価であり、実在の人物・企業ではありません。
        </p>
      </div>

      <article>
        <Markdown>{content}</Markdown>
      </article>
    </main>
  );
}
