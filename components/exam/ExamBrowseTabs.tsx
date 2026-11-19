import Link from "next/link";
import { ChevronRight } from "lucide-react";
import type { ExamCode } from "@/lib/questions/types";
import { isMockExamCode } from "@/lib/mock-exam/config";

export interface YearItem {
  key: string;
  label: string;
  count: number;
  coverage?: string;
  missingSpecialist?: boolean;
}

export interface CategoryItem {
  category: string;
  count: number;
}

interface Props {
  exam: ExamCode;
  years: YearItem[];
  categories: CategoryItem[];
}

function YearLink({ exam, item: g }: { exam: ExamCode; item: YearItem }) {
  return <li><Link prefetch={false} href={`/${exam}/${g.key}`} className="group flex min-h-16 items-center justify-between gap-3 rounded-xl border border-border bg-card p-3.5 text-sm transition hover:border-primary/40 hover:shadow-sm"><span className="min-w-0 font-medium">{g.label}{g.coverage && <span className="mt-1 block text-xs font-normal text-muted-foreground">{g.coverage}</span>}{g.missingSpecialist && <span className="mt-1 block text-xs font-normal text-amber-700 dark:text-amber-300">午前IIは未収録</span>}</span><span className="flex shrink-0 items-center gap-2 text-xs text-muted-foreground"><span className="rounded-full bg-muted px-2 py-0.5 font-semibold">{g.count}問</span><ChevronRight aria-hidden="true" className="h-4 w-4" /></span></Link></li>;
}

export function ExamBrowseTabs({ exam, years, categories }: Props) {
  return (
    <div className="space-y-4">
      <section id="years" aria-label="年度別の過去問" className="scroll-mt-20">
        {years.length === 0 ? (
          <p className="rounded-2xl border border-border bg-card p-5 text-sm text-muted-foreground">
            年度データがまだ登録されていません。
          </p>
        ) : (
          <div>
            <ul className="grid gap-2 sm:grid-cols-2">{years.slice(0, 4).map((item) => <YearLink key={item.key} item={item} exam={exam} />)}</ul>
            {years.length > 4 && <details className="group mt-3 rounded-xl border border-border"><summary className="flex min-h-12 cursor-pointer items-center justify-between px-4 text-sm font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">以前の年度・回も見る（残り{years.length - 4}件）<ChevronRight aria-hidden="true" className="h-4 w-4 transition group-open:rotate-90" /></summary><ul className="grid gap-2 p-3 pt-0 sm:grid-cols-2">{years.slice(4).map((item) => <YearLink key={item.key} item={item} exam={exam} />)}</ul></details>}
          </div>
        )}
      </section>
      <details id="topics" className="scroll-mt-20 rounded-xl border border-border px-3">
        <summary className="min-h-11 cursor-pointer py-3 text-sm font-medium">分野別の過去問</summary>
        {categories.length === 0 ? (
          <p className="rounded-2xl border border-border bg-card p-5 text-sm text-muted-foreground">
            分野データがまだ登録されていません。
          </p>
        ) : (
          <ul className="grid gap-2 sm:grid-cols-2">
            {categories.map((c) => (
              <li key={c.category}>
                <Link
                  href={`/${exam}/topic/${encodeURIComponent(c.category)}`}
                  prefetch={false}
                  className="group flex min-h-16 items-center justify-between gap-3 rounded-xl border border-border bg-card p-3.5 text-sm transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md"
                >
                  <span className="min-w-0 break-words font-medium text-foreground">{c.category}</span>
                  <span className="flex shrink-0 items-center gap-2 text-xs text-muted-foreground">
                    <span className="rounded-full bg-muted px-2 py-0.5 font-semibold">
                      {c.count}問
                    </span>
                    <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:text-primary" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </details>
      {isMockExamCode(exam) && (
        <details id="mock" className="scroll-mt-20 rounded-xl border border-border px-3">
          <summary className="min-h-11 cursor-pointer py-3 text-sm font-medium">模試</summary>
          <Link href={'/mock-exam?exam=' + exam} className="inline-flex min-h-11 items-center underline">{exam === "sg" ? "科目A 演習" : "本番想定 模試"}</Link>
        </details>
      )}
    </div>
  );
}
