"use client";

import { useEffect, useState } from "react";
import { CalendarDays } from "lucide-react";
import { japanDate } from "@/lib/home/featured-exams";
import { dayNumber } from "@/lib/study-plan/pace";
import { nextDatedSession, tsuginoQualificationHref } from "@/lib/study-plan/next-qualification";
import { qualificationIdsForExam, type ExamSchedule } from "@/lib/study-plan/schedule";

export function NextExamSchedule({ exam }: { exam: string }) {
  const [schedule, setSchedule] = useState<ExamSchedule>();
  useEffect(() => {
    if (!qualificationIdsForExam(exam).length) return;
    const controller = new AbortController();
    void fetch("/api/exam-schedule/" + encodeURIComponent(exam), { signal: controller.signal })
      .then(async response => { if (response.ok) setSchedule(await response.json()); })
      .catch(() => {});
    return () => controller.abort();
  }, [exam]);
  if (schedule?.exam !== exam || schedule.source !== "tsugino") return null;
  const today = japanDate(new Date());
  const session = nextDatedSession(schedule.sessions, today);
  if (!session?.examDate || !session.qualificationId) return null;
  const remaining = session.applicationDeadline ? dayNumber(session.applicationDeadline)! - dayNumber(today)! : null;
  const examDate = session.datePrecision === "month" ? session.examDate.slice(0, 7) : session.examDate;
  const windows = session.examPhaseWindows?.length ? session.examPhaseWindows : [
    { label: "", start: examDate, end: session.examDateEnd },
  ];
  return <section className="my-4 rounded-xl border border-border bg-card px-4 py-3" aria-label="次回の試験日程">
    <div className="flex items-center gap-2 font-semibold"><CalendarDays className="size-4" aria-hidden="true" />次回の試験日</div>
    {windows.map(({ label, start, end }) => <p className="mt-1 text-sm" key={label + start}>
      {label && <span className="mr-1">{label}</span>}<time dateTime={start}>{start}</time>
      {end && end !== start && <>〜<time dateTime={end}>{end}</time></>}
    </p>)}
    {session.applicationDeadline && !session.applicationEstimated && <p className="mt-1 text-sm">申込締切 <time dateTime={session.applicationDeadline}>{session.applicationDeadline}</time>
      {remaining === 0 ? "（今日まで）" : remaining! > 0 ? "（あと" + remaining + "日）" : "（受付終了）"}</p>}
    <a className="study-link" href={tsuginoQualificationHref(session.qualificationId, "exam_schedule")}>申込方法は次の資格で確認</a>
  </section>;
}
