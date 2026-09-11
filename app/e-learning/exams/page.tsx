import type { Metadata } from "next";
import { ExternalLink } from "lucide-react";
import { ExamStructuredData } from "@/components/exam-library/exam-structured-data";
import {
  ExamCatalogBrowser,
  type ExamCatalogItem,
} from "@/components/exam-library/exam-catalog-browser";
import { ExamSourceNotes } from "@/components/exam-library/exam-source-notes";
import {
  EXAM_CATALOG,
  EXAM_LIBRARY_PATH,
  latestCheckedAt,
  sortExamEntries,
} from "@/lib/exam-library-catalog";
import {
  EXAM_GROUPS,
  describeExamDate,
  examPath,
  findExamGroup,
  formatExamDate,
  type ExamGroupId,
} from "@/lib/exam-library-model";
import { getExamPaperStats } from "@/lib/exam-library-papers";
import { SITE_BASE_URL as SITE_URL } from "@/lib/seo/config";

const TITLE = "安全衛生の公表試験問題 過去問演習｜試験・科目・回を選んで1問ずつ";
const DESCRIPTION =
  "ボイラー技士・クレーン・衛生管理者などの免許試験、作業環境測定士試験、労働安全・労働衛生コンサルタント試験の公表問題を、試験・科目・回を選んで1問ずつ解けます。公式正答がある問題だけ採点し、間違えた問題を解き直せます。";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: EXAM_LIBRARY_PATH },
  robots: { index: true, follow: true },
};

interface ExamLibraryPageProps {
  searchParams: Promise<{ group?: string | string[]; subject?: string | string[] }>;
}

function firstValue(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

function buildItems(): ExamCatalogItem[] {
  return sortExamEntries(EXAM_CATALOG).map((entry) => {
    const stats = getExamPaperStats(entry.id);
    return {
      id: entry.id,
      group: entry.group,
      subject: entry.subject,
      label: entry.label,
      date: entry.date,
      dateText: describeExamDate(entry),
      dateKind: entry.dateKind,
      answerMode: entry.answerMode,
      href: examPath(entry.id),
      pdfUrl: entry.pdfUrl,
      questionCount: stats?.questionCount ?? null,
      scoredCount: stats?.scoredCount ?? null,
    };
  });
}

export default async function ExamLibraryPage({ searchParams }: ExamLibraryPageProps) {
  const params = await searchParams;
  const items = buildItems();
  const groups = EXAM_GROUPS.filter((group) => items.some((item) => item.group === group.id));
  const requestedGroup = findExamGroup(firstValue(params.group) ?? "");
  const initialGroup: ExamGroupId =
    requestedGroup && groups.some((group) => group.id === requestedGroup.id)
      ? requestedGroup.id
      : (groups[0]?.id ?? "lckohyo");
  const requestedSubject = firstValue(params.subject);
  const initialSubject =
    requestedSubject &&
    items.some((item) => item.group === initialGroup && item.subject === requestedSubject)
      ? requestedSubject
      : null;
  const playable = items.filter((item) => item.questionCount !== null);
  const questionTotal = playable.reduce((total, item) => total + (item.questionCount ?? 0), 0);
  const scoredTotal = playable.reduce((total, item) => total + (item.scoredCount ?? 0), 0);
  const checkedAt = latestCheckedAt();
  const url = `${SITE_URL}${EXAM_LIBRARY_PATH}`;

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6">
      <ExamStructuredData title={TITLE} description={DESCRIPTION} url={url} />

      <header className="rounded-[2rem] border-2 border-slate-800 bg-slate-950 p-5 text-white shadow-xl forced-colors:border-[CanvasText] forced-colors:bg-[Canvas] forced-colors:text-[CanvasText] sm:p-8">
        <p className="text-sm font-black tracking-[.12em] text-cyan-300 forced-colors:text-[CanvasText]">
          PAST EXAM PRACTICE
        </p>
        <h1 className="mt-2 text-3xl font-black tracking-tight sm:text-4xl">
          公表試験問題の過去問演習
        </h1>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-200 forced-colors:text-[CanvasText] sm:text-base">
          公益財団法人安全衛生技術試験協会が公表している試験問題を、試験・科目・回の順に選んで1問ずつ解けます。公式正答が確認できる問題だけ採点し、間違えた問題はまとめて解き直せます。
        </p>
        <ul className="mt-5 flex flex-wrap gap-2 text-sm font-bold">
          <li className="rounded-full border border-white/40 px-3 py-2">{playable.length}科目・回分を演習可能</li>
          <li className="rounded-full border border-white/40 px-3 py-2">{questionTotal}問</li>
          <li className="rounded-full border border-white/40 px-3 py-2">公式正答で採点 {scoredTotal}問</li>
          <li className="rounded-full border border-white/40 px-3 py-2">初期設定は保存なし</li>
        </ul>
        {checkedAt ? (
          <p className="mt-4 text-xs leading-5 text-slate-300 forced-colors:text-[CanvasText]">
            公表ページの確認日: <time dateTime={checkedAt}>{formatExamDate(checkedAt)}</time>
          </p>
        ) : null}
      </header>

      <div className="mt-8">
        <ExamCatalogBrowser
          groups={groups}
          items={items}
          initialGroup={initialGroup}
          initialSubject={initialSubject}
        />
      </div>

      <ExamSourceNotes className="mt-10" />

      <p className="mt-6 text-sm leading-7">
        <a href="https://www.exam.or.jp/" target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-2 font-bold text-sky-800 underline dark:text-sky-200">試験の申込・日程（試験協会）<ExternalLink className="h-4 w-4" aria-hidden="true" /><span className="sr-only">（新しいタブで開きます）</span></a>
      </p>
    </div>
  );
}
