import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { ExamNoteLinks } from "@/components/exam-library/exam-note-links";
import { ExamStructuredData } from "@/components/exam-library/exam-structured-data";
import { ExamQuestionPlayer } from "@/components/exam-library/exam-question-player";
import { ExamSourceNotes } from "@/components/exam-library/exam-source-notes";
import { EXAM_LIBRARY_PATH, findExamEntry } from "@/lib/exam-library-catalog";
import {
  describeExamDate,
  examPath,
  findExamGroup,
  formatExamDate,
  isScorableQuestion,
  isHealthConsultantSubject,
  type ExamCatalogEntry,
} from "@/lib/exam-library-model";
import { listAvailableExamIds, loadExamPaper } from "@/lib/exam-library-papers";
import { SITE_BASE_URL as SITE_URL } from "@/lib/seo/config";

interface ExamPageProps {
  params: Promise<{ id: string }>;
  searchParams?: Promise<{ question?: string | string[]; view?: string | string[] }>;
}

// 問題データを表示できるカタログ内の回だけを受け付ける（その他は404）
export const dynamicParams = false;

export function generateStaticParams() {
  return listAvailableExamIds().map((id) => ({ id }));
}

function resolveExam(id: string) {
  const entry = findExamEntry(id);
  if (!entry) return null;
  const questions = loadExamPaper(entry.id);
  if (!questions) return null;
  return { entry, questions };
}

function examTitle(entry: ExamCatalogEntry): string {
  return `${entry.subject} ${entry.label}`;
}

function examDescription(entry: ExamCatalogEntry, questionCount: number, scoredCount: number): string {
  const dateText =
    entry.dateKind === "publication"
      ? `${formatExamDate(entry.date)}公表分（試験実施日ではありません）`
      : `${formatExamDate(entry.date)}実施分`;
  const scoring =
    scoredCount > 0
      ? `公式正答で${scoredCount}問を採点し、間違えた問題を解き直せます。`
      : "自動採点はせず、解答メモで自己確認できます。";
  return `${entry.subject}の公表試験問題（${dateText}）${questionCount}問を1問ずつ解けます。${scoring}`;
}

export async function generateMetadata({ params }: ExamPageProps): Promise<Metadata> {
  const { id } = await params;
  const resolved = resolveExam(id);
  if (!resolved) return {};
  const { entry, questions } = resolved;
  const scoredCount = questions.filter(isScorableQuestion).length;
  return {
    title: `${examTitle(entry)}（${describeExamDate(entry)}）過去問演習`,
    description: examDescription(entry, questions.length, scoredCount),
    alternates: { canonical: examPath(entry.id) },
    robots: { index: true, follow: true },
  };
}

export default async function ExamPage({ params, searchParams }: ExamPageProps) {
  const { id } = await params;
  const resolved = resolveExam(id);
  if (!resolved) notFound();
  const { entry, questions } = resolved;
  const query = await searchParams;
  const requestedQuestion = query?.question;
  const initialQuestionId = typeof requestedQuestion === "string" && questions.some((question) => question.id === requestedQuestion) ? requestedQuestion : undefined;
  const group = findExamGroup(entry.group);
  const scoredCount = questions.filter(isScorableQuestion).length;
  const title = examTitle(entry);
  const url = `${SITE_URL}${examPath(entry.id)}`;
  const backHref = `${EXAM_LIBRARY_PATH}?${new URLSearchParams({ group: entry.group, subject: entry.subject }).toString()}`;

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-3 sm:px-6">
      <ExamStructuredData title={title} description={examDescription(entry, questions.length, scoredCount)} url={url} />

      <nav aria-label="パンくず補助" className="mb-3">
        <Link
          href={backHref}
          prefetch={false}
          className="inline-flex min-h-11 items-center gap-2 font-semibold text-sky-900 underline underline-offset-4 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-sky-300 dark:text-sky-200 forced-colors:text-[LinkText]"
        >
          <ArrowLeft className="h-5 w-5" aria-hidden="true" />
          試験の過去問一覧へ
        </Link>
      </nav>

      <header className="mb-4">
        <p className="text-sm font-semibold text-muted-foreground forced-colors:text-[CanvasText]">
          {entry.group === "cskohyo" ? `${isHealthConsultantSubject(entry.subject) ? "労働衛生" : "労働安全"}コンサルタント試験の公表問題` : group?.title ?? "公表試験問題"}
        </p>
        <h1 className="mt-1 text-lg font-semibold tracking-tight text-slate-950 dark:text-white sm:text-xl">
          {entry.subject}
          <span className="ml-2 inline-block text-base sm:text-lg">{entry.label}</span>
        </h1>
        <details className="mt-2 text-sm"><summary className="cursor-pointer py-2 text-muted-foreground">出典・試験情報</summary>
        <dl className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-sm text-slate-800 dark:text-slate-100">
          <div className="flex gap-1">
            <dt className="font-semibold">{entry.dateKind === "publication" ? "公表時期" : "実施日"}:</dt>
            <dd>
              <time dateTime={entry.date}>{formatExamDate(entry.date)}</time>
              {entry.dateKind === "publication" ? "（試験実施日ではありません）" : null}
            </dd>
          </div>
          <div className="flex gap-1">
            <dt className="font-semibold">問題数:</dt>
            <dd>{questions.length}問</dd>
          </div>
          <div className="flex gap-1">
            <dt className="font-semibold">公式正答で採点:</dt>
            <dd>{scoredCount}問</dd>
          </div>
          <div className="flex gap-1">
            <dt className="font-semibold">公表ページ確認日:</dt>
            <dd>
              <time dateTime={entry.checkedAt}>{formatExamDate(entry.checkedAt)}</time>
            </dd>
          </div>
        </dl>
        </details>
        <p className="mt-2 text-xs leading-5 text-muted-foreground">
          出題当時の法令に基づく問題です。その後の法改正で、現行の規定と異なる場合があります。
        </p>
      </header>

      <ExamQuestionPlayer
        key={`${entry.id}:${initialQuestionId ?? "resume"}`}
        initialQuestionId={initialQuestionId}
        initialView={query?.view === "results" ? "summary" : "question"}
        examId={entry.id}
        examTitle={title}
        pdfUrl={entry.pdfUrl}
        indexUrl={entry.indexUrl}
        questions={questions}
        noteLinks={entry.noteLinks}
      />

      <ExamNoteLinks
        links={entry.noteLinks ?? []}
        headingId="exam-note-links-title"
        className="mt-8"
      />

      <ExamSourceNotes entry={entry} className="mt-10" />
    </div>
  );
}
