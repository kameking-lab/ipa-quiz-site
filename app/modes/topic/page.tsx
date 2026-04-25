import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Tags } from "lucide-react";
import { ALL_QUESTIONS } from "@/data/questions";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { examLabel } from "@/lib/utils";
import type { ExamCode } from "@/lib/questions/types";

export const metadata: Metadata = {
  title: "分野別出題",
  description:
    "セキュリティ・ネットワーク・データベース・経営戦略など、分野を絞って IPA 13試験区分の過去問を学習できます。",
  alternates: { canonical: "/modes/topic" },
};

const VALID_EXAMS: ExamCode[] = [
  "ip",
  "sg",
  "fe",
  "ap",
  "st",
  "sa",
  "pm",
  "nw",
  "db",
  "es",
  "sc",
  "sm",
  "au",
];

function isExamCode(s: unknown): s is ExamCode {
  return typeof s === "string" && (VALID_EXAMS as string[]).includes(s);
}

export default async function TopicModePage({
  searchParams,
}: {
  searchParams: Promise<{ exam?: string }>;
}) {
  const params = await searchParams;
  const exam: ExamCode = isExamCode(params.exam) ? params.exam : "ap";
  const label = examLabel(exam);

  const byCategory = new Map<string, { count: number; tags: Set<string> }>();
  for (const q of ALL_QUESTIONS) {
    if (q.exam !== exam) continue;
    const entry = byCategory.get(q.category) ?? { count: 0, tags: new Set() };
    entry.count += 1;
    for (const t of q.topicTags) entry.tags.add(t);
    byCategory.set(q.category, entry);
  }
  const items = [...byCategory.entries()].sort((a, b) => b[1].count - a[1].count);
  const total = items.reduce((acc, [, v]) => acc + v.count, 0);

  return (
    <main className="relative flex-1">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-radial-spotlight"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[420px] bg-grid opacity-30 [mask-image:radial-gradient(60%_50%_at_50%_0%,#000_30%,transparent_70%)]"
      />

      <div className="relative mx-auto w-full max-w-3xl px-4 pb-20 pt-6 sm:px-6 sm:pt-10">
        <Button asChild variant="ghost" size="sm" className="mb-4">
          <Link href="/">
            <ArrowLeft className="h-4 w-4" />
            戻る
          </Link>
        </Button>

        <header className="mb-8 animate-fade-in">
          <Badge variant="soft" className="mb-3">
            <Tags className="h-3 w-3" />
            分野別 / {label}
          </Badge>
          <h1 className="text-balance text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            <span className="bg-gradient-to-r from-primary via-violet-500 to-fuchsia-500 bg-clip-text text-transparent">
              {label} 分野別出題
            </span>
          </h1>
          <p className="mt-3 max-w-xl text-pretty text-sm text-muted-foreground sm:text-base">
            セキュリティ・ネットワーク・データベース・経営戦略など、分野を絞って{label}の過去問を学習できます。
          </p>
          <div className="mt-3 flex flex-wrap gap-2 text-xs">
            <Badge variant="outline">{items.length} 分野</Badge>
            <Badge variant="outline">合計 {total.toLocaleString("ja-JP")} 問</Badge>
          </div>
        </header>

        {items.length === 0 ? (
          <div className="rounded-2xl border border-border bg-card p-6 text-center text-sm text-muted-foreground">
            {label}の分野別データはまだ収録されていません。
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {items.map(([category, v]) => (
              <Link
                key={category}
                href={`/quiz?mode=topic&exam=${exam}&category=${encodeURIComponent(category)}`}
                className="group relative overflow-hidden rounded-2xl border border-border bg-card p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md"
              >
                <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <div className="mb-1.5 flex items-center gap-2">
                      <span className="text-base font-semibold text-foreground">
                        {category}
                      </span>
                      <span className="rounded-full bg-primary-soft px-2 py-0.5 text-[11px] font-bold text-primary-soft-foreground">
                        {v.count}問
                      </span>
                    </div>
                    <div className="mt-2 flex flex-wrap gap-1">
                      {[...v.tags].slice(0, 4).map((t) => (
                        <span
                          key={t}
                          className="inline-flex items-center rounded-md bg-muted px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground"
                        >
                          #{t}
                        </span>
                      ))}
                    </div>
                  </div>
                  <ArrowRight className="h-5 w-5 shrink-0 text-muted-foreground transition-all group-hover:translate-x-0.5 group-hover:text-primary" />
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
