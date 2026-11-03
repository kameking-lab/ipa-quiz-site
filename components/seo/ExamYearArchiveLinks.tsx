import Link from "next/link";
import type { ExamCode } from "@/lib/questions/types";
import { getQuestionsByExamStrict, groupByYearSeason } from "@/lib/seo/exam-meta";

export function ExamYearArchiveLinks({ exam }: { exam: ExamCode }) {
  const years = groupByYearSeason(getQuestionsByExamStrict(exam));
  if (years.length === 0) return null;
  const headingId = `${exam}-year-archives`;

  return (
    <section aria-labelledby={headingId} className="mt-8 rounded-2xl border border-border bg-card p-4 sm:p-5">
      <h2 id={headingId} className="text-base font-bold">年度別の問題一覧</h2>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">収録している問題を年度別の一覧から確認できます。</p>
      <ul className="mt-3 flex flex-wrap gap-2">
        {years.map((year) => (
          <li key={year.key}>
            <Link href={`/${exam}/${year.key}`} className="inline-flex min-h-11 items-center rounded-xl border border-border bg-background px-4 py-2 text-sm font-semibold hover:border-primary hover:text-primary">
              {year.label}の問題一覧
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
