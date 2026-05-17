import type { Metadata } from "next";
import path from "path";
import fs from "fs";
import Link from "next/link";
import { Flag, Download, FileText } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { FeedbackEntry } from "@/app/api/feedback/route";

export const metadata: Metadata = {
  title: "フィードバック管理",
  description: "ユーザーから受け付けた誤り報告・フィードバックの一覧。",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

const CATEGORY_LABEL: Record<FeedbackEntry["category"], string> = {
  "typo": "誤字・表記ミス",
  "wrong-answer": "正解が間違っている",
  "poor-explanation": "解説が不十分",
  "other": "その他",
};

const CATEGORY_COLOR: Record<FeedbackEntry["category"], string> = {
  "typo": "bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300",
  "wrong-answer": "bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300",
  "poor-explanation": "bg-sky-100 text-sky-800 dark:bg-sky-900/40 dark:text-sky-300",
  "other": "bg-zinc-100 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-300",
};

function loadEntries(): FeedbackEntry[] {
  const dir = path.join(process.cwd(), "data", "feedback");
  if (!fs.existsSync(dir)) return [];
  const files = fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".jsonl"))
    .sort()
    .reverse();

  const entries: FeedbackEntry[] = [];
  for (const file of files) {
    const lines = fs
      .readFileSync(path.join(dir, file), "utf-8")
      .split("\n")
      .filter(Boolean);
    for (const line of lines) {
      try {
        entries.push(JSON.parse(line) as FeedbackEntry);
      } catch {
        // skip malformed lines
      }
    }
  }
  return entries.sort((a, b) => (a.ts > b.ts ? -1 : 1));
}

export default function AdminFeedbackPage() {
  const entries = loadEntries();

  return (
    <main className="mx-auto w-full max-w-5xl flex-1 px-4 pb-12 pt-8 sm:px-6">
      <header className="mb-6 flex flex-wrap items-start justify-between gap-4">
        <div>
          <Badge variant="outline">管理画面</Badge>
          <h1 className="mt-2 flex items-center gap-2 text-2xl font-bold sm:text-3xl">
            <Flag className="h-6 w-6 text-rose-600 dark:text-rose-400" />
            フィードバック一覧
          </h1>
          <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
            ユーザーから報告された誤り・不具合（計 {entries.length} 件）
          </p>
        </div>
        <Link
          href="/api/admin/feedback"
          className="inline-flex items-center gap-2 rounded-xl border border-border bg-background px-3 py-2 text-sm font-medium hover:bg-muted"
        >
          <Download className="h-4 w-4" />
          CSV エクスポート
        </Link>
      </header>

      {entries.length === 0 ? (
        <Card>
          <CardContent className="py-10 text-center">
            <FileText className="mx-auto mb-3 h-8 w-8 text-zinc-400" />
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              まだフィードバックはありません。
            </p>
            <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-500">
              data/feedback/*.jsonl にデータが蓄積されると、ここに表示されます。
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {entries.map((e, i) => (
            <Card key={`${e.ts}-${i}`}>
              <CardHeader className="pb-2 pt-4">
                <div className="flex flex-wrap items-center gap-2">
                  <span
                    className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ${CATEGORY_COLOR[e.category]}`}
                  >
                    {CATEGORY_LABEL[e.category]}
                  </span>
                  {e.questionId && (
                    <code className="rounded bg-zinc-100 px-1.5 py-0.5 text-[11px] text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
                      {e.questionId}
                    </code>
                  )}
                  <span className="text-[11px] text-zinc-500 dark:text-zinc-400">
                    {new Date(e.ts).toLocaleString("ja-JP", { timeZone: "Asia/Tokyo" })}
                  </span>
                </div>
                <CardTitle className="mt-1 text-sm font-normal text-zinc-700 dark:text-zinc-300 break-all">
                  {e.pageUrl}
                </CardTitle>
              </CardHeader>
              {e.comment && (
                <CardContent className="pb-4 pt-0">
                  <p className="whitespace-pre-wrap text-sm text-zinc-800 dark:text-zinc-200">
                    {e.comment}
                  </p>
                </CardContent>
              )}
            </Card>
          ))}
        </div>
      )}
    </main>
  );
}
