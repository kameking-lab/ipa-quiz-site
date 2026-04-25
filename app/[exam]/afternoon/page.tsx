import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight } from "lucide-react";

import type { ExamCode } from "@/lib/questions/types";
import { examLabel, formatYearSeason } from "@/lib/utils";
import { getAfternoonYearSeasons, getAfternoonByYearSeason } from "@/lib/afternoon/load";
import { Badge } from "@/components/ui/badge";
import { AfternoonDisclaimer } from "@/components/afternoon/AfternoonDisclaimer";

const SUPPORTED_AFTERNOON_EXAMS: ExamCode[] = ["ap", "st"];

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
  const title = `【練習用】${label} 午後問題（AI採点ベータ）`;
  const description = `【練習用オリジナル問題】${label}の午後記述式形式を模した練習問題をAIが採点します。実際の過去問ではありません。AI採点は目安です。`;
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
          <li aria-current="page" className="text-zinc-700 dark:text-zinc-300">
            午後問題
          </li>
        </ol>
      </nav>

      <header className="mb-6 space-y-3">
        <div className="flex flex-wrap items-center gap-2">
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 sm:text-3xl">
            【練習用オリジナル問題】{examLabel(code)} 午後問題
          </h1>
          <Badge variant="warn">AI採点ベータ</Badge>
        </div>
        <p className="text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
          午後記述式問題の解答を入力すると、AIが模範解答と比較して採点します。
          点数・良い点・改善点・IPA解答例を表示します。
        </p>
        <AfternoonDisclaimer />
      </header>

      {yearSeasons.length === 0 ? (
        <p className="rounded-xl border border-zinc-200 p-4 text-sm text-zinc-600 dark:border-zinc-800 dark:text-zinc-300">
          まだ午後問題が登録されていません。順次追加していきます。
        </p>
      ) : (
        <ul className="grid gap-2 sm:grid-cols-2">
          {yearSeasons.map((ys) => {
            const list = getAfternoonByYearSeason(code, ys.year, ys.season);
            return (
              <li key={`${ys.year}-${ys.season}`}>
                <Link
                  href={`/${exam}/afternoon/${ys.year}/${ys.season}`}
                  className="flex items-center justify-between rounded-xl border border-zinc-200 bg-white p-3 text-sm transition-colors hover:border-sky-400 hover:bg-sky-50 dark:border-zinc-800 dark:bg-zinc-950 dark:hover:border-sky-500 dark:hover:bg-zinc-900"
                >
                  <span className="font-medium text-zinc-900 dark:text-zinc-50">
                    {formatYearSeason(ys.year, ys.season)}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-zinc-500 dark:text-zinc-400">
                    {list.length}大問
                    <ChevronRight className="h-4 w-4" />
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </main>
  );
}
