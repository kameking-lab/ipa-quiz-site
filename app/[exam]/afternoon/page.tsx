import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight, FileEdit } from "lucide-react";

import type { ExamCode } from "@/lib/questions/types";
import { examLabel, formatYearSeason } from "@/lib/utils";
import { getAfternoonYearSeasons, getAfternoonByYearSeason } from "@/lib/afternoon/load";
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
}

export const dynamicParams = false;

export async function generateStaticParams(): Promise<RouteParams[]> {
  return SUPPORTED_AFTERNOON_EXAMS.map((exam) => ({ exam }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<RouteParams>;
}): Promise<Metadata> {
  const { exam } = await params;
  if (!SUPPORTED_AFTERNOON_EXAMS.includes(exam as ExamCode)) {
    return { title: "午後問題は未対応です", robots: { index: false } };
  }
  const label = examLabel(exam as ExamCode);
  const hasPublishedQuestions = getAfternoonYearSeasons(exam as ExamCode).length > 0;
  const title = `${label} 午後の過去問・公式資料`;
  const description = hasPublishedQuestions
    ? `${label}の出典を確認した午後過去問を年度別に掲載しています。IPAの公式問題・解答例も確認できます。`
    : `${label}の午後過去問はIPA公式の問題冊子・解答例で確認できます。現在、当サイト内に出典を確認した午後問題は掲載していません。`;
  return {
    title,
    description,
    alternates: { canonical: `/${exam}/afternoon` },
  };
}

export default async function AfternoonIndexPage({
  params,
}: {
  params: Promise<RouteParams>;
}) {
  const { exam } = await params;
  if (!SUPPORTED_AFTERNOON_EXAMS.includes(exam as ExamCode)) notFound();

  const code = exam as ExamCode;
  const yearSeasons = getAfternoonYearSeasons(code);

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
            <li aria-current="page" className="text-foreground">
              午後問題
            </li>
          </ol>
        </nav>

        <header className="mb-6 animate-fade-in">
          <div className="mb-3 flex flex-wrap items-center gap-2">
            <Badge variant="soft">
              <FileEdit className="h-3 w-3" />
              IPA 公式資料へ
            </Badge>
          </div>
          <h1 className="text-balance text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            <span className="bg-gradient-to-r from-primary via-violet-500 to-fuchsia-500 bg-clip-text text-transparent">
              {examLabel(code)} 午後の過去問・公式資料
            </span>
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
            IPA が公開する問題冊子・解答例・採点講評を確認できます。
            当サイト内には出典を確認した問題のみ掲載します。
          </p>
        </header>

        {yearSeasons.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border bg-muted/40 p-8 text-center">
            <p className="mb-3 text-sm text-muted-foreground">
              現在、当サイト内に出典を確認した午後問題は掲載していません。
            </p>
            <a href="https://www.ipa.go.jp/shiken/mondai-kaiotu/index.html" target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-primary underline">
              IPA 公式の過去問題を見る
            </a>
          </div>
        ) : (
          <ul className="grid gap-2 sm:grid-cols-2">
            {yearSeasons.map((ys) => {
              const list = getAfternoonByYearSeason(code, ys.year, ys.season);
              return (
                <li key={`${ys.year}-${ys.season}`}>
                  <Link
                    href={`/${exam}/afternoon/${ys.year}/${ys.season}`}
                    className="group flex items-center justify-between rounded-2xl border border-border bg-card p-4 text-sm transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md"
                  >
                    <span className="font-semibold text-foreground">
                      {formatYearSeason(ys.year, ys.season)}
                    </span>
                    <span className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span className="rounded-full bg-muted px-2 py-0.5 font-semibold">
                        {list.length} 大問
                      </span>
                      <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:text-primary" />
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </main>
  );
}
