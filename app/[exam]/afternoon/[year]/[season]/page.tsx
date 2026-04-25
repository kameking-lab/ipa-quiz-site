import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AlertTriangle, FileEdit } from "lucide-react";

import type { ExamCode, Season } from "@/lib/questions/types";
import { examLabelAt } from "@/lib/exam-naming/history";
import { examLabel, formatYearSeason } from "@/lib/utils";
import {
  getAfternoonByYearSeason,
  getAfternoonYearSeasons,
} from "@/lib/afternoon/load";
import { AfternoonPlayer } from "@/components/afternoon/AfternoonPlayer";
import { Badge } from "@/components/ui/badge";

const SUPPORTED_AFTERNOON_EXAMS: ExamCode[] = ["ap", "st", "fe", "db", "nw"];

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
  const title = `【練習用】${label} ${histLabel} 午後問題（AI採点ベータ）`;
  const description = `【練習用オリジナル問題】${label}実施の${histLabel}午後試験を模した記述式問題をAIが採点します。実際の出題ではありません。`;
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
              <Link href="/" className="hover:text-foreground hover:underline">
                ホーム
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link
                href={`/${exam}`}
                className="hover:text-foreground hover:underline"
              >
                {examLabel(code)}
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link
                href={`/${exam}/afternoon`}
                className="hover:text-foreground hover:underline"
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
              練習用オリジナル問題
            </Badge>
            <Badge variant="warn">AI 採点ベータ</Badge>
          </div>
          <h1 className="text-balance text-xl font-bold tracking-tight text-foreground sm:text-2xl">
            <span className="bg-gradient-to-r from-primary via-violet-500 to-fuchsia-500 bg-clip-text text-transparent">
              {label}
            </span>{" "}
            {histLabel} 午後問題
          </h1>
        </header>

        <div
          role="note"
          className="mb-6 flex gap-3 rounded-2xl border border-warning/40 bg-warning/5 p-4 text-sm leading-relaxed text-foreground/90 dark:border-warning/30 dark:bg-warning/10"
        >
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-warning/20 text-warning dark:bg-warning/15">
            <AlertTriangle className="h-4 w-4" />
          </span>
          <div className="space-y-1">
            <p className="font-semibold text-foreground">練習用オリジナル問題です</p>
            <p>
              本ページの設問・題材・模範解答は、IPA 試験本番の出題傾向を模して作成した
              <strong className="font-semibold">練習用オリジナル問題</strong>であり、
              実際の試験で出題された問題ではありません。AI 採点機能の動作確認用としてご活用ください。
              本番形式の学習には、実際の IPA 過去問（午前問題）をご利用ください。
            </p>
          </div>
        </div>

        <AfternoonPlayer questions={questions} />
      </div>
    </main>
  );
}
