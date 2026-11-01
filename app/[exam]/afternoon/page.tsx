import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight, FileEdit } from "lucide-react";

import type { ExamCode } from "@/lib/questions/types";
import { examLabel } from "@/lib/utils";
import { AfternoonEssayHint } from "@/components/quiz/AfternoonEssayHint";

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
  const title = `${label} 午後問題`;
  const description = "このページで公開できる午後の過去問は現在ありません。資格ページから利用できる学習内容をご確認ください。";
  return {
    title,
    description,
    robots: { index: false },
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
          <h1 className="text-balance text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            <span className="bg-gradient-to-r from-primary via-violet-500 to-fuchsia-500 bg-clip-text text-transparent">
              {examLabel(code)} 午後問題
            </span>
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
            このページで公開できる午後の過去問は現在ありません。
          </p>
        </header>

        <AfternoonEssayHint exam={code} />

        {code === "fe" && (
          <div className="mb-8">
            <Link
              href="/blog/fe-kamoku-b-taisaku"
              className="group flex items-start gap-3 rounded-2xl border border-indigo-300/70 bg-indigo-50/60 p-4 transition-all hover:-translate-y-0.5 hover:border-indigo-400 hover:shadow-md dark:border-indigo-800/60 dark:bg-indigo-950/30 sm:p-5"
            >
              <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-indigo-100 text-indigo-700 dark:bg-indigo-900/60 dark:text-indigo-300">
                <FileEdit className="h-4 w-4" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-sm font-medium text-foreground group-hover:text-primary">
                  基本情報の午後は科目B（アルゴリズム・擬似言語）が中心
                </span>
                <span className="mt-1 block text-xs leading-relaxed text-muted-foreground">
                  擬似言語の読み方・トレースの型を体系的に整理してから演習に入ると伸びます。「基本情報
                  科目B 完全対策」で読み方を最短整理。
                </span>
              </span>
              <ChevronRight className="mt-1 h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-primary" />
            </Link>
          </div>
        )}

        <section className="rounded-2xl border border-border bg-card p-6" aria-label="午後問題の公開状況">
          <p className="text-sm leading-relaxed text-muted-foreground">
            資格ページから、現在利用できる学習内容をご確認ください。
          </p>
          <Link href={`/${exam}`} className="mt-4 inline-flex min-h-11 items-center rounded-xl border border-border px-4 py-2 text-sm font-semibold hover:underline">
            {examLabel(code)}の資格ページへ
          </Link>
        </section>
      </div>
    </main>
  );
}
