import Link from "next/link";
import { ArrowRight, BookOpenCheck, GraduationCap, Layers } from "lucide-react";

import type { ExamCode } from "@/lib/questions/types";
import { EXAM_DEEP_CONTENT } from "@/lib/seo/exam-content";
import { examLabel } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

interface Props {
  exam: ExamCode;
}

export function ExamDeepLead({ exam }: Props) {
  const content = EXAM_DEEP_CONTENT[exam];
  if (!content) return null;
  return (
    <section
      aria-label="試験の特色"
      className="mb-8 rounded-2xl border border-border bg-card p-5 shadow-sm"
    >
      <div className="mb-3 flex items-center gap-2.5">
        <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400">
          <BookOpenCheck className="h-4 w-4" />
        </span>
        <div className="leading-tight">
          <h2 className="text-base font-bold tracking-tight text-foreground sm:text-lg">
            {examLabel(exam)} の特色
          </h2>
        </div>
      </div>
      <p className="text-sm leading-relaxed text-foreground/90">
        {content.leadParagraph}
      </p>
    </section>
  );
}

export function ExamMainTopics({ exam }: Props) {
  const content = EXAM_DEEP_CONTENT[exam];
  if (!content || content.mainTopics.length === 0) return null;
  return (
    <section
      aria-label="主要出題分野"
      className="mb-8 rounded-2xl border border-border bg-card p-5 shadow-sm"
    >
      <div className="mb-3 flex items-center gap-2.5">
        <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
          <Layers className="h-4 w-4" />
        </span>
        <div className="leading-tight">
          <h2 className="text-base font-bold tracking-tight text-foreground sm:text-lg">
            主要出題分野
          </h2>
        </div>
      </div>
      <ul className="grid gap-2 sm:grid-cols-2">
        {content.mainTopics.map((t) => (
          <li
            key={t.name}
            className="rounded-xl border border-border/60 bg-background/50 p-3"
          >
            <h3 className="text-sm font-semibold text-foreground">{t.name}</h3>
            <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">
              {t.description}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function ExamRelatedExams({ exam }: Props) {
  const content = EXAM_DEEP_CONTENT[exam];
  if (!content || content.relatedExams.length === 0) return null;
  return (
    <section
      aria-label="関連する試験区分"
      className="mb-8 rounded-2xl border border-border bg-card p-5 shadow-sm"
    >
      <div className="mb-3 flex items-center gap-2.5">
        <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-sky-500/10 text-sky-600 dark:text-sky-400">
          <GraduationCap className="h-4 w-4" />
        </span>
        <div className="leading-tight">
          <h2 className="text-base font-bold tracking-tight text-foreground sm:text-lg">
            関連する試験区分
          </h2>
        </div>
      </div>
      <ul className="space-y-2">
        {content.relatedExams.map((r) => (
          <li key={r.exam}>
            <Link
              href={`/${r.exam}`}
              className="group flex items-start justify-between gap-3 rounded-xl border border-border/60 bg-background/40 p-3 transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md"
            >
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-[10px] uppercase">
                    {r.exam}
                  </Badge>
                  <span className="text-sm font-semibold text-foreground group-hover:text-primary">
                    {examLabel(r.exam)}
                  </span>
                </div>
              </div>
              <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-primary" />
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
