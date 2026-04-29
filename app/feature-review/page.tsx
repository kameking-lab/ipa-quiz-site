import type { Metadata } from "next";
import fs from "node:fs/promises";
import path from "node:path";
import Link from "next/link";
import { ArrowLeft, AlertTriangle } from "lucide-react";
import { Markdown } from "@/components/ui/markdown";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "機能改善レビュー（10名・辛口）",
  description: "辛口ユーザー5名 + 実装可能性判断のプロ5名による現状機能の評価レビュー（noindex）",
  robots: { index: false, follow: false },
};

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

async function loadReview(): Promise<string> {
  const filePath = path.join(process.cwd(), "logs", "feature-review.md");
  try {
    return await fs.readFile(filePath, "utf-8");
  } catch {
    return "# レビュー文書が見つかりません\n\n`logs/feature-review.md` が読み込めませんでした。";
  }
}

export default async function FeatureReviewPage() {
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
        <Badge variant="outline">機能レビュー</Badge>
        <Badge variant="warn">noindex</Badge>
        <Badge variant="outline">10名による辛口評価</Badge>
      </div>

      <div className="mb-6 flex gap-2 rounded-xl border border-amber-200 bg-amber-50/60 p-3 text-xs leading-relaxed text-amber-900 dark:border-amber-900/60 dark:bg-amber-950/30 dark:text-amber-200">
        <AlertTriangle className="mt-0.5 h-4 w-4 flex-shrink-0" />
        <p>
          このページは現状機能に対する 10 名（辛口ユーザー 5 名 + 実装可能性判断のプロ 5 名）による評価レビューです。
          検索エンジンには登録されません（noindex/nofollow）。
          記載内容は仮想ペルソナによる評価であり、実在の人物・企業ではありません。
        </p>
      </div>

      <article>
        <Markdown>{content}</Markdown>
      </article>
    </main>
  );
}
