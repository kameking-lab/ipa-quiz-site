"use client";
import Link from "next/link";
import { useState } from "react";
import { ArrowLeft, ArrowRight, Calendar, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
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
  const [group, setGroup] = useState<ExamGroupId>(initialGroup);
  const [subject, setSubject] = useState(initialSubject);
  const activeItems = items.filter((item) => item.group === group);
  const subjects = [...new Set(activeItems.map((item) => item.subject))];
  const papers = activeItems.filter((item) => item.subject === subject).sort((a,b) => b.date.localeCompare(a.date));
  const latest = papers.find((item) => item.questionCount !== null);
  return <div className="space-y-6">
    <Tabs value={group} onValueChange={(value) => {
      if (!groups.some((item) => item.id === value)) return;
      setGroup(value as ExamGroupId); setSubject(null);
      window.history.replaceState(window.history.state, "", catalogHref(value));
    }}>
      <TabsList className="mb-4 h-auto w-full flex-wrap">
        {groups.map((item) => <TabsTrigger key={item.id} value={item.id} className="min-h-11 flex-1 whitespace-normal">{item.shortTitle}</TabsTrigger>)}
      </TabsList>
      {groups.map((item) => <TabsContent key={item.id} value={item.id}>
        <p className="mb-4 text-sm leading-relaxed text-muted-foreground">{item.description}</p>
      </TabsContent>)}
    </Tabs>
    {!subject ? <section aria-labelledby="safety-exam-select">
      <h2 id="safety-exam-select" className="mb-3 text-lg font-semibold">{group === "lckohyo" ? "試験を選ぶ" : "科目を選ぶ"}</h2>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {subjects.map((name) => {
          const list = activeItems.filter((item) => item.subject === name);
          return <Link key={name} href={catalogHref(group, name)} className="group flex min-h-32 flex-col justify-between gap-3 rounded-2xl border-2 border-sky-300 bg-sky-50 p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-sky-500 dark:border-sky-700 dark:bg-sky-950/40">
            <span className="text-sm font-semibold text-foreground">{name}</span>
            <span className="flex items-center justify-between text-xs text-sky-700 dark:text-sky-300">{list.reduce((n,q) => n+(q.questionCount ?? 0),0)}問<ChevronRight className="h-4 w-4" aria-hidden="true" /></span>
          </Link>;
        })}
      </div>
    </section> : <section aria-labelledby="safety-subject-heading" className="space-y-5">
      <Link href={catalogHref(group)} className="inline-flex min-h-11 items-center gap-2 text-sm text-muted-foreground hover:text-foreground"><ArrowLeft className="h-4 w-4" aria-hidden="true" />試験・科目を選び直す</Link>
      <div className="rounded-2xl border border-border bg-card p-5">
        <h2 id="safety-subject-heading" className="text-2xl font-bold">{subject}の過去問</h2>
        <p className="mt-2 text-sm text-muted-foreground">{latest?.answerMode === "reference" ? "解答メモを書いて確認したら、次の問題へ進みます。" : "選択肢を押して解答し、解説を確認したら次の問題へ進みます。"}</p>
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
