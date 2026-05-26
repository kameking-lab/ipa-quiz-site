import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { AiContentNotice } from "@/components/AiContentNotice";
import {
  getSuccessStoriesByExam,
  getSuccessStoryExams,
} from "@/data/success-stories";
import type { ExamCode } from "@/lib/questions/types";
import { SITE_BASE_URL, SITE_NAME } from "@/lib/seo/config";
import { EXAM_LABELS, examLabel } from "@/lib/utils";

interface PageProps {
  params: Promise<{ exam: string }>;
}

const VALID_EXAMS = new Set(Object.keys(EXAM_LABELS));

export async function generateStaticParams() {
  return getSuccessStoryExams().map((exam) => ({ exam }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { exam } = await params;
  if (!VALID_EXAMS.has(exam)) return { title: "見つかりません" };
  const label = examLabel(exam);
  const stories = getSuccessStoriesByExam(exam as ExamCode);
  if (stories.length === 0) return { title: "体験記がありません" };
  const url = `/success-stories/${exam}`;
  const title = `${label} 合格体験記｜${stories.length}名の合格者ストーリー`;
  const description = `${label}に合格した${stories.length}名のリアル体験記。職種・年齢・学習期間別に勉強法・つまずき・突破方法を生々しく紹介。`;
  const ogImage = `${SITE_BASE_URL}/api/og?${new URLSearchParams({
    type: "blog",
    title,
    subtitle: `${label} 合格者ストーリー`,
    body: description,
  }).toString()}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    // 致命傷③: AI生成の架空ペルソナ集なので検索インデックス対象外。
    robots: { index: false, follow: false },
    openGraph: {
      title,
      description,
      url,
      type: "website",
      siteName: SITE_NAME,
      locale: "ja_JP",
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

export default async function SuccessStoryCategoryPage({ params }: PageProps) {
  const { exam } = await params;
  if (!VALID_EXAMS.has(exam)) notFound();
  const stories = getSuccessStoriesByExam(exam as ExamCode);
  if (stories.length === 0) notFound();

  const label = examLabel(exam);


  return (
    <main className="mx-auto w-full max-w-4xl px-4 py-6 sm:py-10">
      <nav
        aria-label="パンくずリスト"
        className="mb-4 text-xs text-zinc-500 dark:text-zinc-400"
      >
        <ol className="flex flex-wrap items-center gap-1.5">
          <li>
            <Link href="/" className="hover:underline">
              ホーム
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li>
            <Link href="/success-stories" className="hover:underline">
              合格体験記
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li aria-current="page" className="text-zinc-700 dark:text-zinc-300">
            {label}
          </li>
        </ol>
      </nav>

      <header className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-3xl">
          {label} 合格体験記
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300 sm:text-base">
          {label}に合格した <strong>{stories.length} 名</strong> のリアル体験記。
          職種・年齢・学習期間が違う合格者のストーリーから、自分に合った戦略を見つけてください。
        </p>
        <AiContentNotice
          className="mt-4"
          body="実在の合格者・人物への取材ではありません。典型的な合格者像をもとに過去問AIが構成した架空のペルソナです。学習法・スケジュールは実証されたパターンに基づく参考情報としてご活用ください。"
        />
      </header>

      <ul className="space-y-3">
        {stories.map((s) => (
          <li key={s.slug}>
            <Link
              href={`/success-stories/${s.exam}/${s.slug}`}
              className="block rounded-2xl border border-zinc-200 bg-white p-4 transition-colors hover:border-sky-300 hover:bg-sky-50/40 dark:border-zinc-800 dark:bg-zinc-950 dark:hover:border-sky-700 dark:hover:bg-sky-950/20"
            >
              <div className="mb-1.5 flex flex-wrap items-center gap-2 text-[11px] text-zinc-500 dark:text-zinc-400">
                <span className="rounded bg-zinc-100 px-1.5 py-0.5 dark:bg-zinc-800">
                  {s.ageRange}
                </span>
                <span className="rounded bg-zinc-100 px-1.5 py-0.5 dark:bg-zinc-800">
                  {s.occupation}
                </span>
                <span className="rounded bg-emerald-100 px-1.5 py-0.5 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
                  {s.studyMonths}か月 / {s.totalStudyHours}h
                </span>
                <span className="rounded bg-amber-100 px-1.5 py-0.5 text-amber-800 dark:bg-amber-950 dark:text-amber-300">
                  合格: {s.passedAt}
                </span>
              </div>
              <h2 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50 sm:text-base">
                {s.title}
              </h2>
              <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-zinc-600 dark:text-zinc-400 sm:text-sm">
                {s.description}
              </p>
            </Link>
          </li>
        ))}
      </ul>

      <section className="mt-10 rounded-2xl border border-sky-200 bg-sky-50/60 p-5 text-sm text-zinc-700 dark:border-sky-800 dark:bg-sky-950/30 dark:text-zinc-300">
        <h2 className="mb-2 text-base font-semibold text-zinc-900 dark:text-zinc-50">
          {label} の過去問演習で挑戦を始める
        </h2>
        <p className="mb-3 leading-relaxed">
          体験記の合格者と同じスタートラインに立ちましょう。AI コパイロット付きで分からない問題はその場で解決できます。
        </p>
        <div className="flex flex-wrap gap-2">
          <Link
            href={`/${exam}`}
            className="inline-block rounded-full bg-sky-600 px-4 py-2 text-sm font-semibold text-white hover:bg-sky-700"
          >
            {label} 過去問一覧へ →
          </Link>
          <Link
            href={`/quiz?mode=random&exam=${exam}`}
            className="inline-block rounded-full border border-sky-300 bg-white px-4 py-2 text-sm font-semibold text-sky-700 hover:bg-sky-50 dark:border-sky-800 dark:bg-zinc-950 dark:text-sky-300 dark:hover:bg-sky-950/40"
          >
            ランダム出題で開始
          </Link>
          <Link
            href="/success-stories"
            className="inline-block rounded-full border border-zinc-300 bg-white px-4 py-2 text-sm font-semibold text-zinc-700 hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-200 dark:hover:bg-zinc-900"
          >
            他区分の合格体験記
          </Link>
        </div>
      </section>
    </main>
  );
}
