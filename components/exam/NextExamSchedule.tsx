"use client";

import { Suspense, useEffect, useState, useSyncExternalStore } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { PlanCreateSheet } from "@/components/home/pace/PlanCreateSheet";
import { japanDate } from "@/lib/home/featured-exams";
import { examTopSchedule, planCreatedHref, tsuginoQualificationHref } from "@/lib/study-plan/next-qualification";
import { listPacePlans } from "@/lib/study-plan/pace-storage";
import type { ExamDateSource } from "@/lib/study-plan/pace";
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
  const [today, setToday] = useState(() => japanDate(new Date()));
  useEffect(() => {
    if (hasPlan !== false) return;
    const refresh = () => setToday(japanDate(new Date()));
    refresh();
    const timer = window.setInterval(refresh, 60_000);
    window.addEventListener("focus", refresh);
    return () => {
      window.clearInterval(timer);
      window.removeEventListener("focus", refresh);
    };
  }, [hasPlan]);
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
  const upcoming = examTopSchedule(exam, search, sessions, today);
  if (!upcoming) return null;
  const { examCountdown, qualificationId } = upcoming;
  const scheduled = "dates" in upcoming ? upcoming : null;
  const dates = scheduled?.dates;
  const registration = scheduled?.registration;
  const countdown = registration?.countdown;
  const registrationStatus = registration?.state === "open" ? "受付中" : registration?.state === "closed" ? "受付終了" : null;
  const applicationEstimate = dates?.applicationBasisYear ? "（見込み）" : "";
  const basisYears = new Set([examCountdown?.basisYear, dates?.applicationBasisYear].filter(Boolean));

  return <section className="my-4 space-y-1 border-t border-border pt-3 text-sm text-muted-foreground" aria-label="試験日程">
    <h2 className="font-semibold text-foreground">次の試験</h2>
    {examCountdown && <div className="flex flex-wrap gap-x-3 tabular-nums">
      <p>{scheduled ? "試験日" : "受験予定日"} <time dateTime={examCountdown.date}>{examCountdown.date}</time></p>
      <p className="font-medium text-foreground">{examCountdown.days === 0 && !examCountdown.basisYear
        ? "試験は今日です" : `試験まであと${examCountdown.days}日${examCountdown.basisYear ? "（見込み）" : ""}`}</p>
    </div>}
    {scheduled?.windows.map(window => <p className="tabular-nums" key={window.label + window.start}>
      {window.label && <span className="mr-1">{window.label}</span>}
      <time dateTime={window.start}>{window.start}</time>
      {window.end && window.end !== window.start && <>〜<time dateTime={window.end}>{window.end}</time></>}
    </p>)}
    {dates && (dates.applicationStart || dates.applicationDeadline) && <div className="flex flex-wrap gap-x-3 tabular-nums">
      <p>{dates.applicationStart && dates.applicationDeadline ? "申込期間" : dates.applicationStart ? "申込開始" : "申込締切"}
        {" "}{dates.applicationStart && <time dateTime={dates.applicationStart}>{dates.applicationStart}</time>}
        {dates.applicationStart && dates.applicationDeadline && "〜"}
        {dates.applicationDeadline && <time dateTime={dates.applicationDeadline}>{dates.applicationDeadline}</time>}
        {!registrationStatus && !countdown && applicationEstimate}</p>
      {registrationStatus && <p className={registration?.state === "open" ? "font-medium text-foreground" : undefined}>
        {registrationStatus}{applicationEstimate}
      </p>}
      {countdown && <p className="font-medium text-foreground">{countdown.kind === "start" ? `あと${countdown.days}日で申込開始`
        : `申込締切まであと${countdown.days}日`}{!registrationStatus && applicationEstimate}</p>}
    </div>}
    {[...basisYears].map(year => <p key={year} className="text-xs">{year}年度の同じ回をもとに推定</p>)}
    <div className="flex flex-wrap items-center gap-x-3">
      {examCountdown && <ExamPlanButton exam={exam} examDate={examCountdown.date} sessionId={scheduled?.sessionId}
        dateSource={scheduled ? examCountdown.basisYear === undefined ? "official" : "estimated" : undefined} />}
      <a className="study-focus inline-flex min-h-8 items-center rounded text-xs underline underline-offset-4"
        href={tsuginoQualificationHref(qualificationId, "exam_schedule")}>申込方法は次の資格で確認</a>
    </div>
  </section>;
}

function ExamPlanButton({ exam, examDate, sessionId, dateSource }: { exam: string; examDate: string; sessionId?: string; dateSource?: ExamDateSource }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  return <PlanCreateSheet open={open} onOpenChange={setOpen} items={[{ key: exam, name: examLabel(exam) }]}
    initialExam={exam} initialDate={examDate} initialDateSource={dateSource} initialSessionId={sessionId} onCreated={plan => router.push(planCreatedHref(plan.id))}
    trigger={<button type="button" className="study-focus min-h-11 rounded px-1 text-xs font-medium text-primary underline underline-offset-4">
      この日で学習計画を作る
    </button>} />;
}
