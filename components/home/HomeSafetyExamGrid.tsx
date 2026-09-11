import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { EXAM_CATALOG } from "@/lib/exam-library-catalog";

const entries = [
  { name: "第一種衛生管理者", group: "lckohyo", subject: "第一種衛生管理者" },
  { name: "第二種衛生管理者", group: "lckohyo", subject: "第二種衛生管理者" },
  { name: "二級ボイラー技士", group: "lckohyo", subject: "二級ボイラー技士" },
  { name: "クレーン・デリック運転士", group: "lckohyo", subject: "クレーン・デリック運転士（限定なし）" },
  { name: "作業環境測定士", group: "emkohyo", subject: "" },
  { name: "労働安全・労働衛生コンサルタント", group: "cskohyo", subject: "" },
];

export function HomeSafetyExamGrid() {
  return <section aria-labelledby="safety-exams-heading" className="mt-6">
    <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
      <h2 id="safety-exams-heading" className="text-lg font-semibold">安全衛生の資格</h2>
      <Link href="/e-learning/exams" className="inline-flex min-h-11 items-center text-sm text-sky-700 hover:underline dark:text-sky-300">すべての試験を見る<ChevronRight className="h-4 w-4" aria-hidden="true" /></Link>
    </div>
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
      {entries.map((entry) => {
        const papers = EXAM_CATALOG.filter((paper) => paper.group === entry.group && (!entry.subject || paper.subject === entry.subject));
        const query = new URLSearchParams({ group: entry.group, ...(entry.subject ? { subject: entry.subject } : {}) });
        return <Link key={entry.name} href={`/e-learning/exams?${query}`} className="group flex min-h-28 flex-col justify-between gap-3 rounded-2xl border-2 border-sky-300 bg-sky-50 p-3.5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-sky-500 dark:border-sky-700 dark:bg-sky-950/40 sm:p-4">
          <span className="text-sm font-semibold">{entry.name}</span>
          <span className="flex items-center justify-between text-xs text-sky-700 dark:text-sky-300">{papers.reduce((sum, paper) => sum + (paper.questionCount ?? 0), 0)}問<ChevronRight className="h-4 w-4" aria-hidden="true" /></span>
        </Link>;
      })}
    </div>
  </section>;
}
