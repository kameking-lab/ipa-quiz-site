import Link from "next/link";
import type { ExamEntryCode } from "@/lib/seo/exam-entry";
import type { CategoryItem, YearItem } from "@/components/exam/ExamBrowseTabs";
import { isMockExamCode } from "@/lib/mock-exam/config";

const linkClass = "flex min-h-14 items-center justify-between gap-3 rounded-xl border border-border bg-card p-3 text-sm hover:border-primary/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";

/** Native links and details: both browse views work before JavaScript loads. */
export function ExamTopBrowse({ exam, years, categories }: {
  exam: ExamEntryCode;
  years: YearItem[];
  categories: CategoryItem[];
}) {
  const yearLink = (item: YearItem) => (
    <li key={item.key}>
      <Link href={`/${exam}/${item.key}`} className={linkClass}>
        <span className="min-w-0 font-medium">{item.label}<span className="mt-1 block text-xs font-normal text-muted-foreground">{item.coverage}{item.missingSpecialist ? "（午前IIは未収録）" : ""}</span></span>
        <span className="shrink-0 text-xs text-muted-foreground">{item.count}問 →</span>
      </Link>
    </li>
  );
  const categoryLink = (item: CategoryItem) => (
    <li key={item.category}>
      <Link href={`/${exam}/topic/${encodeURIComponent(item.category)}`} className={linkClass}>
        <span className="min-w-0 font-medium">{item.category}</span>
        <span className="shrink-0 text-xs text-muted-foreground">{item.count}問 →</span>
      </Link>
    </li>
  );
  return (
    <div className="mb-8 space-y-6">
      <section id="years" aria-labelledby="years-heading" className="scroll-mt-20">
        <h2 id="years-heading" className="mb-3 text-base font-bold">年度別の過去問</h2>
        <ul className="grid gap-2 sm:grid-cols-2">{years.slice(0, 4).map(yearLink)}</ul>
        {years.length > 4 && <details className="mt-3 rounded-xl border border-border">
          <summary className="min-h-11 cursor-pointer px-3 py-3 text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">以前の年度も見る（残り{years.length - 4}期）</summary>
          <ul className="grid gap-2 p-3 pt-0 sm:grid-cols-2">{years.slice(4).map(yearLink)}</ul>
        </details>}
      </section>
      <section id="topics" aria-labelledby="topics-heading" className="scroll-mt-20">
        <h2 id="topics-heading" className="mb-3 text-base font-bold">分野別の過去問</h2>
        <ul className="grid gap-2 sm:grid-cols-2">{categories.slice(0, 4).map(categoryLink)}</ul>
        {categories.length > 4 && <details className="mt-3 rounded-xl border border-border">
          <summary className="min-h-11 cursor-pointer px-3 py-3 text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">すべての分野を見る（全{categories.length}分野）</summary>
          <ul className="grid gap-2 p-3 pt-0 sm:grid-cols-2">{categories.slice(4).map(categoryLink)}</ul>
        </details>}
      </section>
      <section aria-labelledby="practice-heading">
        <h2 id="practice-heading" className="mb-3 text-base font-bold">模試・復習で続ける</h2>
        <ul className="grid gap-2 sm:grid-cols-2">
          {isMockExamCode(exam) && <li><Link href={`/mock-exam?exam=${exam}`} className={linkClass}>{exam === "ap" ? "科目A（旧午前）" : "科目A-2（旧午前II）"}の模試で力試し →</Link></li>}
          <li><Link href={`/quiz?mode=unanswered&exam=${exam}&session=${exam === "ap" ? "am" : "am2"}`} className={linkClass}>まだ解いていない{exam === "ap" ? "科目A（旧午前）" : "科目A-2（旧午前II）"}問題 →</Link></li>
          <li><Link href={`/quiz?mode=review&exam=${exam}&scope=exam`} className={linkClass}>間違えた問題・ブックマークを復習 →</Link></li>
        </ul>
      </section>
    </div>
  );
}
