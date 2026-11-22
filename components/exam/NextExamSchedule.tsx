"use client";

import { Suspense, useEffect, useState, useSyncExternalStore } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { PlanCreateSheet } from "@/components/home/pace/PlanCreateSheet";
import { japanDate } from "@/lib/home/featured-exams";
import { examTopPlanDate, planCreatedHref, tsuginoQualificationHref } from "@/lib/study-plan/next-qualification";
import { listPacePlans } from "@/lib/study-plan/pace-storage";
import { qualificationIdsForExam, type ExamSchedule } from "@/lib/study-plan/schedule";
import { examLabel } from "@/lib/utils";

function subscribeToPlans(refresh: () => void) {
  const events = ["study-plan:changed", "study-plan:synced", "storage", "pageshow"];
  for (const event of events) window.addEventListener(event, refresh);
  return () => {
    for (const event of events) window.removeEventListener(event, refresh);
  };
}

const serverPlanStatus = () => null;

export function NextExamSchedule({ exam }: { exam: string }) {
  return <Suspense><ExamScheduleRow key={exam} exam={exam} /></Suspense>;
}

function ExamScheduleRow({ exam }: { exam: string }) {
  const search = useSearchParams();
  const hasPlan = useSyncExternalStore(subscribeToPlans,
    () => listPacePlans().some(plan => plan.exam === exam), serverPlanStatus);
  const [schedule, setSchedule] = useState<ExamSchedule>();
  useEffect(() => {
    if (hasPlan !== false || !qualificationIdsForExam(exam).length) return;
    const controller = new AbortController();
    void fetch("/api/exam-schedule/" + encodeURIComponent(exam), { signal: controller.signal })
      .then(async response => {
        if (!response.ok) return;
        const data = await response.json() as ExamSchedule;
        if (!controller.signal.aborted) setSchedule(data);
      })
      .catch(() => {});
    return () => controller.abort();
  }, [exam, hasPlan]);

  if (hasPlan !== false) return null;
  const sessions = schedule?.exam === exam && schedule.source === "tsugino" ? schedule.sessions : [];
  const date = examTopPlanDate(exam, search, sessions, japanDate(new Date()));
  if (!date) return null;
  const { examDate, daysUntil, qualificationId } = date;
  const [, month, day] = examDate.split("-").map(Number);

  return <section className="my-4 border-t border-border text-muted-foreground" aria-label="試験日程">
    <div className="flex flex-wrap items-center gap-x-3">
      <p className="whitespace-nowrap text-sm tabular-nums">試験日 <time dateTime={examDate}>{month}月{day}日</time>（あと{daysUntil}日）</p>
      <ExamPlanButton exam={exam} examDate={examDate} />
    </div>
    <a className="study-focus inline-flex min-h-8 items-center rounded text-xs underline underline-offset-4"
      href={tsuginoQualificationHref(qualificationId, "exam_schedule")}>申込方法は次の資格で確認</a>
  </section>;
}

function ExamPlanButton({ exam, examDate }: { exam: string; examDate: string }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  return <PlanCreateSheet open={open} onOpenChange={setOpen} items={[{ key: exam, name: examLabel(exam) }]}
    initialExam={exam} initialDate={examDate} onCreated={plan => router.push(planCreatedHref(plan.id))}
    trigger={<button type="button" className="study-focus min-h-11 rounded px-1 text-xs font-medium text-primary underline underline-offset-4">
      この日で学習計画を作る
    </button>} />;
}
