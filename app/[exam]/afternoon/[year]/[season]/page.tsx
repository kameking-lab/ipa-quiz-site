import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FileEdit } from "lucide-react";

import type { ExamCode, Season } from "@/lib/questions/types";
import { examLabelAt } from "@/lib/exam-naming/history";
import { examLabel, formatYearSeason } from "@/lib/utils";
import {
  getAfternoonByYearSeason,
  getAfternoonYearSeasons,
} from "@/lib/afternoon/load";
import { AfternoonPlayer } from "@/components/afternoon/AfternoonPlayer";
import { Badge } from "@/components/ui/badge";

const SUPPORTED_AFTERNOON_EXAMS: ExamCode[] = [
  "ap",
  "st",
  "fe",
  "db",
  "nw",
  "sc",
  "es",
  "pm",
  "sa",
  "au",
  "sm",
];

interface RouteParams {
  exam: string;
  year: string;
  season: string;
}

export const dynamicParams = false;

export async function generateStaticParams(): Promise<RouteParams[]> {
  const out: RouteParams[] = [];
  for (const exam of SUPPORTED_AFTERNOON_EXAMS) {
    for (const ys of getAfternoonYearSeasons(exam)) {
      out.push({ exam, year: String(ys.year), season: ys.season });
    }
  }
  return out;
}

function isSeason(s: string): s is Season {
  return s === "spring" || s === "autumn" || s === "cbt";
}

export async function generateMetadata({
  params,
}: {
  params: Promise<RouteParams>;
}): Promise<Metadata> {
  const { exam, year, season } = await params;
  if (!SUPPORTED_AFTERNOON_EXAMS.includes(exam as ExamCode) || !isSeason(season)) {
    return { title: "午後問題が見つかりません", robots: { index: false } };
  }
  const yearNum = Number(year);
  if (getAfternoonByYearSeason(exam as ExamCode, yearNum, season).length === 0) {
    return { title: "午後問題が見つかりません", robots: { index: false } };
  }
  const label = formatYearSeason(yearNum, season);
  const histLabel = examLabelAt(exam as ExamCode, yearNum, season);
  const title = `${label} ${histLabel} 午後過去問`;
  const description = `IPAが公表した${label}実施の${histLabel}午後問題を掲載しています。出典は各問題の公式資料で確認できます。`;
  return {
    title,
    description,
    alternates: { canonical: `/${exam}/afternoon/${year}/${season}` },
  };
}

export default async function AfternoonPlayerPage({
  params,
}: {
  params: Promise<RouteParams>;
}) {
  const { exam, year, season } = await params;
  if (!SUPPORTED_AFTERNOON_EXAMS.includes(exam as ExamCode) || !isSeason(season)) {
    notFound();
  }
  const code = exam as ExamCode;
  const yearNum = Number(year);
  const questions = getAfternoonByYearSeason(code, yearNum, season);
  if (questions.length === 0) notFound();

  const label = formatYearSeason(yearNum, season);
  const histLabel = examLabelAt(code, yearNum, season);

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
        <nav
          aria-label="パンくずリスト"
          className="mb-4 text-xs text-muted-foreground"
        >
          <ol className="flex flex-wrap items-center gap-1.5">
            <li>
              <Link href="/" className="inline-block py-1.5 hover:text-foreground hover:underline">
                ホーム
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link
                href={`/${exam}`}
                className="inline-block py-1.5 hover:text-foreground hover:underline"
              >
                {examLabel(code)}
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link
                href={`/${exam}/afternoon`}
                className="inline-block py-1.5 hover:text-foreground hover:underline"
              >
                午後問題
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="text-foreground">
              {label}
            </li>
          </ol>
        </nav>

        <header className="mb-5 animate-fade-in">
          <div className="mb-3 flex flex-wrap items-center gap-2">
            <Badge variant="soft">
              <FileEdit className="h-3 w-3" />
              出典確認済みの過去問
            </Badge>
          </div>
          <h1 className="text-balance text-xl font-bold tracking-tight text-foreground sm:text-2xl">
            <span className="bg-gradient-to-r from-primary via-violet-500 to-fuchsia-500 bg-clip-text text-transparent">
              {label}
            </span>{" "}
            {histLabel} 午後問題
          </h1>
        </header>

        <p className="mb-6 text-sm text-muted-foreground">
          問題の出典と解答例は、各問題に記載した IPA 公式資料で確認できます。
        </p>

        <AfternoonPlayer questions={questions} />
      </div>
    </main>
  );
}
