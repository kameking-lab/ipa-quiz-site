import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { ALL_QUESTIONS } from "@/data/questions";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { formatYearSeason } from "@/lib/utils";
import type { Season } from "@/lib/questions/types";

export default function YearModePage() {
  const groups = new Map<string, { year: number; season: Season; count: number }>();
  for (const q of ALL_QUESTIONS) {
    if (q.exam !== "ap" || q.session !== "am") continue;
    const key = `${q.year}-${q.season}`;
    const existing = groups.get(key);
    if (existing) existing.count++;
    else groups.set(key, { year: q.year, season: q.season, count: 1 });
  }
  const items = [...groups.values()].sort(
    (a, b) => b.year - a.year || a.season.localeCompare(b.season),
  );

  return (
    <main className="mx-auto w-full max-w-3xl flex-1 px-4 pb-10 pt-6 sm:px-6">
      <Button asChild variant="ghost" size="sm" className="mb-3">
        <Link href="/">
          <ArrowLeft className="h-4 w-4" />
          戻る
        </Link>
      </Button>
      <h1 className="mb-4 text-2xl font-bold">年度別出題</h1>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {items.map((item) => (
          <Link
            key={`${item.year}-${item.season}`}
            href={`/quiz?mode=year&exam=ap&year=${item.year}&season=${item.season}&order=1`}
            className="block"
          >
            <Card className="transition hover:-translate-y-0.5 hover:border-sky-300 dark:hover:border-sky-700">
              <CardContent className="pt-5">
                <div className="text-base font-semibold">
                  応用情報 午前 - {formatYearSeason(item.year, item.season)}
                </div>
                <div className="text-xs text-zinc-500 dark:text-zinc-400">
                  収録 {item.count}問
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </main>
  );
}
