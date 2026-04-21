import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import type { ExamCode, Season } from "@/lib/questions/types";
import { examLabelAt } from "@/lib/exam-naming/history";
import { examLabel, formatYearSeason } from "@/lib/utils";
import {
  getAfternoonByYearSeason,
  getAfternoonYearSeasons,
} from "@/lib/afternoon/load";
import { AfternoonPlayer } from "@/components/afternoon/AfternoonPlayer";

const SUPPORTED_AFTERNOON_EXAMS: ExamCode[] = ["ap"];

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
  const label = formatYearSeason(yearNum, season);
  const histLabel = examLabelAt(exam as ExamCode, yearNum, season);
  const title = `${label} ${histLabel} 午後問題（AI採点）`;
  const description = `${label}に実施された${histLabel}午後試験の記述式問題をAIが採点します。`;
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

  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-6 sm:py-10">
      <nav aria-label="パンくずリスト" className="mb-4 text-xs text-zinc-500 dark:text-zinc-400">
        <ol className="flex flex-wrap items-center gap-1.5">
          <li>
            <Link href="/" className="hover:underline">
              ホーム
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li>
            <Link href={`/${exam}`} className="hover:underline">
              {examLabel(code)}
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li>
            <Link href={`/${exam}/afternoon`} className="hover:underline">
              午後問題
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li aria-current="page" className="text-zinc-700 dark:text-zinc-300">
            {label}
          </li>
        </ol>
      </nav>

      <header className="mb-4">
        <h1 className="text-xl font-bold text-zinc-900 dark:text-zinc-50 sm:text-2xl">
          {label} {examLabelAt(code, yearNum, season)} 午後問題
        </h1>
      </header>

      <AfternoonPlayer questions={questions} />
    </main>
  );
}
