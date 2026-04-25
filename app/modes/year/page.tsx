import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Calendar } from "lucide-react";
import { ALL_QUESTIONS } from "@/data/questions";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { examLabel, formatYearSeason } from "@/lib/utils";
import type { ExamCode, Season, Session } from "@/lib/questions/types";

export const metadata: Metadata = {
  title: "年度別出題",
  description:
    "IPA 13試験区分の午前過去問を年度・季節ごとに選んで出題。AI コパイロット付きで解説まで一気通貫。",
  alternates: { canonical: "/modes/year" },
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

function sessionLabel(session: Session): string {
  switch (session) {
    case "am":
      return "午前";
    case "am1":
      return "午前I";
    case "am2":
      return "午前II";
    case "kamoku-a":
      return "科目A";
    case "kamoku-b":
      return "科目B";
    case "pm":
      return "午後";
    case "pm1":
      return "午後I";
    case "pm2":
      return "午後II";
    default:
      return session;
  }
}

interface YearGroup {
  year: number;
  season: Season;
  session: Session;
  count: number;
}

export default async function YearModePage({
  searchParams,
}: {
  searchParams: Promise<{ exam?: string }>;
}) {
  const params = await searchParams;
  const exam: ExamCode = isExamCode(params.exam) ? params.exam : "ap";
  const label = examLabel(exam);

  const groups = new Map<string, YearGroup>();
  for (const q of ALL_QUESTIONS) {
    if (q.exam !== exam) continue;
    if (q.session === "pm" || q.session === "pm1" || q.session === "pm2") continue;
    const key = `${q.year}-${q.season}-${q.session}`;
    const existing = groups.get(key);
    if (existing) existing.count++;
    else
      groups.set(key, {
        year: q.year,
        season: q.season,
        session: q.session,
        count: 1,
      });
  }
  const items = [...groups.values()].sort(
    (a, b) =>
      b.year - a.year ||
      a.season.localeCompare(b.season) ||
      a.session.localeCompare(b.session),
  );
  const total = items.reduce((acc, it) => acc + it.count, 0);

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
            <Calendar className="h-3 w-3" />
            年度別 / {label}
          </Badge>
          <h1 className="text-balance text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            <span className="bg-gradient-to-r from-primary via-violet-500 to-fuchsia-500 bg-clip-text text-transparent">
              {label} 年度別出題
            </span>
          </h1>
          <p className="mt-3 max-w-xl text-pretty text-sm text-muted-foreground sm:text-base">
            {label}の午前過去問を年度・季節ごとに選んで学習できます。
          </p>
          <div className="mt-3 flex flex-wrap gap-2 text-xs">
            <Badge variant="outline">{items.length} 期分</Badge>
            <Badge variant="outline">合計 {total.toLocaleString("ja-JP")} 問</Badge>
          </div>
        </header>

        {items.length === 0 ? (
          <div className="rounded-2xl border border-border bg-card p-6 text-center text-sm text-muted-foreground">
            {label}の年度別データはまだ収録されていません。
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {items.map((item, idx) => (
              <Link
                key={`${item.year}-${item.season}-${item.session}`}
                href={`/quiz?mode=year&exam=${exam}&year=${item.year}&season=${item.season}&session=${item.session}&order=1`}
                className="group relative overflow-hidden rounded-2xl border border-border bg-card p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md"
              >
                <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <div className="mb-1 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                      #{String(idx + 1).padStart(2, "0")}
                    </div>
                    <div className="text-base font-semibold text-foreground">
                      {label} {sessionLabel(item.session)}
                    </div>
                    <div className="mt-1 text-lg font-bold text-primary">
                      {formatYearSeason(item.year, item.season)}
                    </div>
                    <div className="mt-1 text-xs text-muted-foreground">
                      収録 {item.count} 問
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
