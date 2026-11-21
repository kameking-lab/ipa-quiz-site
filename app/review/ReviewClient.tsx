"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { QualificationSelect } from "@/components/qualifications/QualificationSelect";
import { WeakMark } from "@/components/quiz/WeakMark";
import { createHistoryStore } from "@/lib/storage/history";
import { paceAttempts, type CatalogQuestion } from "@/lib/study-plan/client";
import { weakQuestions } from "@/lib/study-plan/pace";
import { listPacePlans } from "@/lib/study-plan/pace-storage";
import { usePlanCatalog } from "@/lib/study-plan/use-plan-catalog";
import { readLastQuestion } from "@/lib/storage/last-question";
import { examLabel, formatYearSeason } from "@/lib/utils";
import { quizBackHref, practiceSessionLabel } from "@/lib/questions/practice-session";
import type { Session } from "@/lib/questions/types";

function questionLabel(q: CatalogQuestion) {
  if (q.paperTitle) return [q.year + "年度", q.paperTitle, "問" + q.qNumber].join(" ");
  return [formatYearSeason(q.year, q.season), practiceSessionLabel(q.session as Session), "問" + q.qNumber + (q.part ?? "")].join(" ");
}

export function ReviewClient({ examFromQuery, returnTo, items = [] }: {
  examFromQuery?: string; returnTo?: string; items?: readonly { key: string; name: string; href: string }[];
}) {
  const [exam, setExam] = useState(examFromQuery ?? "");
  const [records, setRecords] = useState({ attempts: [] as ReturnType<typeof paceAttempts>, stars: [] as string[] });
  const knownExam = !exam || !items.length || items.some(item => item.key === exam);
  const { questions, reload } = usePlanCatalog(knownExam ? exam : "");
  useEffect(() => {
    if (!examFromQuery) setExam(listPacePlans()[0]?.exam ?? readLastQuestion()?.exam ?? "");
  }, [examFromQuery]);
  useEffect(() => {
    function refresh() { setRecords({ attempts: paceAttempts(), stars: createHistoryStore().getStarredIds() }); }
    const events = ["study-plan:changed", "study-activity:synced", "storage", "focus", "pageshow"];
    refresh();
    for (const event of events) window.addEventListener(event, refresh);
    return () => { for (const event of events) window.removeEventListener(event, refresh); };
  }, []);
  const item = items.find(item => item.key === exam);
  const rows = questions ? weakQuestions(questions, exam, records.attempts, records.stars) : [];
  const back = returnTo ? quizBackHref({ exam, returnTo }) : null;
  return <div className="space-y-4">
    <QualificationSelect items={items} value={exam} onChange={setExam} label="資格" emptyLabel="資格を選ぶ"
      fieldClass="mt-1 block min-h-11 w-full rounded-xl border border-input bg-card px-3" />
    {!knownExam && <p role="alert">資格を確認できません。資格を選んでください。</p>}
    {exam && knownExam && (questions === undefined ? <p role="status">問題を読み込み中…</p> : questions === null ? <>
      <p role="alert">問題を読み込めませんでした</p>
      <Button variant="outline" onClick={reload}>再読み込み</Button>
    </> : <>
      <p className="font-semibold">{item?.name ?? examLabel(exam)}・全年度　{rows.length}問</p>
      {rows.length ? <>
        <p className="text-sm text-muted-foreground">前回間違えた問題と、自分で印を付けた問題です。</p>
        <Link className="study-primary" href={"/quiz/today?list=weak&exam=" + encodeURIComponent(exam)}>苦手{rows.length}問をまとめて解く</Link>
        <ul className="p3-listed divide-y divide-hairline">
          {rows.map(({ question, incorrect, marked }) => <li key={question.id} className="px-4 py-2">
            <p className="text-sm font-semibold">{questionLabel(question)}</p>
            <div className="mt-0.5 flex flex-wrap gap-x-3 text-xs text-muted-foreground">
              {incorrect && <span>前回不正解</span>}
              {marked && <span>苦手の印</span>}
            </div>
            <WeakMark id={question.id} marked={marked} />
          </li>)}
        </ul>
        <p className="text-xs text-muted-foreground">印はこの端末に保存されます。</p>
      </> : <p>苦手リストは空です</p>}
      <Link className="study-link" href={item?.href ?? quizBackHref({ exam, mode: "year" })}>年度を選んで解く</Link>
    </>)}
    {back && <Link className="study-link" href={back}>戻る</Link>}
  </div>;
}
