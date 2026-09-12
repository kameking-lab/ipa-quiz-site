"use client";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Calendar, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { isHealthConsultantSubject } from "@/lib/exam-library-model";
import type { ExamAnswerMode, ExamDateKind, ExamGroupId, ExamGroupInfo } from "@/lib/exam-library-model";

/** 一覧表示に必要な最小限の情報（問題本文は含めない） */
export interface ExamCatalogItem {
  id: string;
  group: ExamGroupId;
  subject: string;
  label: string;
  /** YYYY-MM または YYYY-MM-DD */
  date: string;
  dateText: string;
  dateKind: ExamDateKind;
  answerMode: ExamAnswerMode;
  href: string;
  pdfUrl: string;
  /** 問題データを表示できる回だけ数値。未取込は null */
  questionCount: number | null;
  scoredCount: number | null;
}

interface ExamCatalogBrowserProps {
  groups: readonly ExamGroupInfo[];
  items: readonly ExamCatalogItem[];
  initialGroup: ExamGroupId;
  initialSubject: string | null;
}

function catalogHref(group: string, subject?: string) {
  return `/e-learning/exams?${new URLSearchParams({ group, ...(subject ? { subject } : {}) })}`;
}

export function ExamCatalogBrowser({ groups, items, initialGroup, initialSubject }: ExamCatalogBrowserProps) {
  const group = initialGroup;
  const subject = initialSubject;
  const activeItems = items.filter((item) => item.group === group);
  const papers = activeItems.filter((item) => item.subject === subject).sort((a,b) => b.date.localeCompare(a.date));
  const latest = papers.find((item) => item.questionCount !== null);
  const sections = [
    { id: "licenses", group: "lckohyo", title: "免許試験", filter: () => true },
    { id: "measurement", group: "emkohyo", title: "作業環境測定士", filter: () => true },
    { id: "safety-consultant", group: "cskohyo", title: "労働安全コンサルタント", filter: (name: string) => !isHealthConsultantSubject(name) },
    { id: "health-consultant", group: "cskohyo", title: "労働衛生コンサルタント", filter: (name: string) => isHealthConsultantSubject(name) },
  ];
  return <div className="space-y-6">
    {!subject ? <section aria-labelledby="safety-exam-select">
      <h2 id="safety-exam-select" className="mb-3 text-lg font-semibold">資格を選ぶ</h2>
      <nav aria-label="安全の資格一覧" className="mb-6 flex flex-wrap gap-2">
        {sections.map((section) => <Link key={section.id} href={`#${section.id}`} className="inline-flex min-h-11 items-center rounded-xl border border-border px-3 text-sm hover:bg-muted">{section.title}</Link>)}
      </nav>
      {sections.map((section) => {
        const sectionItems = items.filter((item) => item.group === section.group && section.filter(item.subject));
        const subjects = [...new Set(sectionItems.map((item) => item.subject))];
        if (!subjects.length) return null;
        return <section key={section.id} id={section.id} aria-labelledby={`${section.id}-heading`} className="mb-8 scroll-mt-24">
          <h3 id={`${section.id}-heading`} className="mb-3 text-lg font-semibold">{section.title}</h3>
          <div className="grid grid-cols-1 gap-3 min-[480px]:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
            {subjects.map((name) => {
              const list = sectionItems.filter((item) => item.subject === name);
              const scored = list.reduce((n, item) => n + (item.scoredCount ?? 0), 0);
              return <Link key={name} href={catalogHref(section.group, name)} className="group flex min-h-32 flex-col justify-between gap-3 rounded-2xl border-2 border-sky-300 bg-sky-50 p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-sky-500 dark:border-sky-700 dark:bg-sky-950/40">
                <span className="text-sm font-semibold text-foreground">{name}</span>
                <span className="text-xs text-muted-foreground">{list.every((item) => item.answerMode === "reference") ? scored > 0 ? "択一式は採点・記述式は模範解答で学習" : "記述式・模範解答で学習" : scored === 0 ? "択一式・自動採点なし" : "択一式・公式正答で採点"}</span>
                <span className="flex items-center justify-between text-xs text-sky-700 dark:text-sky-300">{list.reduce((n,q) => n+(q.questionCount ?? 0),0)}問<ChevronRight className="h-4 w-4" aria-hidden="true" /></span>
              </Link>;
            })}
          </div>
        </section>;
      })}
    </section> : <section aria-labelledby="safety-subject-heading" className="space-y-5">
      <Link href="/e-learning/exams" className="inline-flex min-h-11 items-center gap-2 text-sm text-muted-foreground hover:text-foreground"><ArrowLeft className="h-4 w-4" aria-hidden="true" />資格を選び直す</Link>
      <div className="rounded-2xl border border-border bg-card p-5">
        <h2 id="safety-subject-heading" className="text-2xl font-bold">{subject}の過去問</h2>
        <p className="mt-2 text-sm text-muted-foreground">{latest?.answerMode === "reference" ? (latest.scoredCount ?? 0) > 0 ? "択一式は選択肢を押して採点。記述式は模範解答と見比べて学習できます。" : "自分の解答を模範解答と見比べて学習できます。記述式は自動採点しません。" : "選択肢を押して解答し、解説を確認したら次の問題へ進みます。"}</p>
        {latest ? <Button asChild className="mt-4"><Link href={latest.href} prefetch={false}>今すぐ解く<ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" /></Link></Button> : null}
        {latest ? <p className="mt-2 text-xs text-muted-foreground">最新の{latest.dateText}・{latest.questionCount}問{latest.scoredCount === 0 ? "（自動採点なし）" : ""}</p> : null}
      </div>
      <h3 className="flex items-center gap-2 text-lg font-semibold"><Calendar className="h-4 w-4" aria-hidden="true" />年度別</h3>
      <p className="text-xs text-muted-foreground">{groups.find((item) => item.id === group)?.dateNote}</p>
      <ul className="grid gap-2 sm:grid-cols-2">
        {papers.map((item) => <li key={item.id}>
          <Link href={item.questionCount === null ? item.pdfUrl : item.href} prefetch={false} className="group flex min-h-20 items-center justify-between gap-3 rounded-xl border border-border bg-card p-3.5 text-sm transition hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md">
            <span><span className="block font-medium text-foreground">{item.dateText}</span><span className="mt-1 block text-xs text-muted-foreground">{item.questionCount === null ? "公式PDF" : item.scoredCount === 0 ? "自動採点なし" : `公式正答で採点 ${item.scoredCount}問`}</span></span>
            <span className="flex shrink-0 items-center gap-2"><Badge variant="default">{item.questionCount ?? "—"}問</Badge><ChevronRight className="h-4 w-4 text-muted-foreground" aria-hidden="true" /></span>
          </Link>
        </li>)}
      </ul>
    </section>}
  </div>;
}
