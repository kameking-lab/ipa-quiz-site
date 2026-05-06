import type { Metadata } from "next";
import fs from "node:fs/promises";
import path from "node:path";
import Link from "next/link";
import { ArrowLeft, AlertTriangle } from "lucide-react";
import { Markdown } from "@/components/ui/markdown";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "SEO+UX 最終評価レポート (scoring-test)",
  description:
    "過去問AI の SEO + UX 最終評価レポート。10 ページの定量計測、構造化データ検証、10 名ペルソナレビュー、改善優先度マトリクスを掲載。",
  robots: { index: false, follow: false },
};

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

async function loadReport(): Promise<string> {
  const filePath = path.join(process.cwd(), "logs", "scoring-test.md");
  try {
    return await fs.readFile(filePath, "utf-8");
  } catch {
    return "# レポート文書が見つかりません\n\n`logs/scoring-test.md` が読み込めませんでした。";
  }
}

export default async function ScoringTestPage() {
  const content = await loadReport();
  return (
    <main className="mx-auto w-full max-w-3xl flex-1 px-4 pb-16 pt-6 sm:px-6">
      <Button asChild variant="ghost" size="sm" className="mb-3">
        <Link href="/">
          <ArrowLeft className="h-4 w-4" />
          戻る
        </Link>
      </Button>

      <div className="mb-4 flex flex-wrap items-center gap-2">
        <Badge variant="outline">内部評価レポート</Badge>
        <Badge variant="warn">noindex</Badge>
        <Badge variant="outline">2026-05-06 計測</Badge>
      </div>

      <div className="mb-6 flex gap-2 rounded-xl border border-amber-200 bg-amber-50/60 p-3 text-xs leading-relaxed text-amber-900 dark:border-amber-900/60 dark:bg-amber-950/30 dark:text-amber-200">
        <AlertTriangle className="mt-0.5 h-4 w-4 flex-shrink-0" />
        <p>
          このページは 過去問AI の SEO + UX 最終評価レポートを共有するための一時公開ページです。
          検索エンジンには登録されません（noindex/nofollow）。
          仮想ペルソナによる評価セクションは実在の人物・企業ではありません。
        </p>
      </div>

      <article>
        <Markdown>{content}</Markdown>
      </article>
    </main>
  );
}
