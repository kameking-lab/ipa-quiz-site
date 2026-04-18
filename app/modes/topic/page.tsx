import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { ALL_QUESTIONS } from "@/data/questions";

export const metadata: Metadata = {
  title: "分野別出題 — 応用情報技術者試験",
  description: "セキュリティ・ネットワーク・データベース・経営戦略など、分野を絞って応用情報の過去問を学習できます。",
};
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function TopicModePage() {
  const byCategory = new Map<string, { count: number; tags: Set<string> }>();
  for (const q of ALL_QUESTIONS) {
    if (q.exam !== "ap") continue;
    const entry = byCategory.get(q.category) ?? { count: 0, tags: new Set() };
    entry.count += 1;
    for (const t of q.topicTags) entry.tags.add(t);
    byCategory.set(q.category, entry);
  }
  const items = [...byCategory.entries()].sort((a, b) => b[1].count - a[1].count);

  return (
    <main className="mx-auto w-full max-w-3xl flex-1 px-4 pb-10 pt-6 sm:px-6">
      <Button asChild variant="ghost" size="sm" className="mb-3">
        <Link href="/">
          <ArrowLeft className="h-4 w-4" />
          戻る
        </Link>
      </Button>
      <h1 className="mb-4 text-2xl font-bold">分野別出題</h1>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {items.map(([category, v]) => (
          <Link
            key={category}
            href={`/quiz?mode=topic&exam=ap&category=${encodeURIComponent(category)}`}
            className="block"
          >
            <Card className="transition hover:-translate-y-0.5 hover:border-sky-300 dark:hover:border-sky-700">
              <CardContent className="pt-5">
                <div className="text-base font-semibold">{category}</div>
                <div className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
                  {v.count}問
                </div>
                <div className="mt-2 flex flex-wrap gap-1">
                  {[...v.tags].slice(0, 4).map((t) => (
                    <Badge key={t} variant="outline">
                      #{t}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </main>
  );
}
