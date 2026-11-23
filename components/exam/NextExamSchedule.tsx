"use client";

import { Suspense, useEffect, useState, useSyncExternalStore } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { PlanCreateSheet } from "@/components/home/pace/PlanCreateSheet";
import { japanDate } from "@/lib/home/featured-exams";
import { examDateFromSearch, examTopPlanDate, nextDatedSession, planCreatedHref, tsuginoQualificationHref } from "@/lib/study-plan/next-qualification";
import { dayNumber } from "@/lib/study-plan/pace";
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
const emptySearch = new URLSearchParams();

export function NextExamSchedule({ exam }: { exam: string }) {
  return <Suspense><ExamScheduleRow key={exam} exam={exam} /></Suspense>;
}

function ExamScheduleRow({ exam }: { exam: string }) {
  const search = useSearchParams() ?? emptySearch;
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
  const today = japanDate(new Date());
  const date = examTopPlanDate(exam, search, sessions, today);
  const upcoming = nextDatedSession(sessions, today);
  const isPeriod = upcoming && (upcoming.datePrecision === "month" || upcoming.examPhaseWindows?.length ||
    (upcoming.examDateEnd && upcoming.examDateEnd !== upcoming.examDate));

  if (isPeriod && upcoming.examDate && upcoming.qualificationId && !examDateFromSearch(search, today) &&
      (!date || upcoming.examDate <= date.examDate)) {
    const start = upcoming.datePrecision === "month" ? upcoming.examDate.slice(0, 7) : upcoming.examDate;
    const windows = upcoming.examPhaseWindows?.length ? upcoming.examPhaseWindows : [
      { label: "", start, end: upcoming.examDateEnd === upcoming.examDate ? null : upcoming.examDateEnd },
    ];
    const deadline = upcoming.applicationEstimated ? null : upcoming.applicationDeadline;
    const remaining = deadline ? dayNumber(deadline)! - dayNumber(today)! : null;

    return <section className="my-4 border-t border-border text-muted-foreground" aria-label="試験日程">
      <p className="text-sm font-medium">次回の試験日</p>
      {windows.map(window => <p className="mt-1 text-sm tabular-nums" key={window.label + window.start}>
        {window.label && <span className="mr-1">{window.label}</span>}
        <time dateTime={window.start}>{window.start}</time>
        {window.end && window.end !== window.start && <>〜<time dateTime={window.end}>{window.end}</time></>}
      </p>)}
      {deadline && remaining !== null && <p className="mt-1 text-sm">申込締切 <time dateTime={deadline}>{deadline}</time>
        {remaining === 0 ? "（今日まで）" : remaining > 0 ? `（あと${remaining}日）` : "（受付終了）"}</p>}
      <ScheduleLink qualificationId={upcoming.qualificationId} />
    </section>;
  }

  if (!date) return null;
  const { examDate, daysUntil, qualificationId } = date;
  const [, month, day] = examDate.split("-").map(Number);

  return <section className="my-4 border-t border-border text-muted-foreground" aria-label="試験日程">
    <div className="flex flex-wrap items-center gap-x-3">
      <p className="whitespace-nowrap text-sm tabular-nums">試験日 <time dateTime={examDate}>{month}月{day}日</time>（あと{daysUntil}日）</p>
      <ExamPlanButton exam={exam} examDate={examDate} />
    </div>
    <ScheduleLink qualificationId={qualificationId} />
  </section>;
}

function ScheduleLink({ qualificationId }: { qualificationId: string | null }) {
  return <a className="study-focus inline-flex min-h-8 items-center rounded text-xs underline underline-offset-4"
    href={tsuginoQualificationHref(qualificationId, "exam_schedule")}>申込方法は次の資格で確認</a>;
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
