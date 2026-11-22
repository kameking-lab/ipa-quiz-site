"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { HomeDirectoryItem } from "@/lib/home/home-directory";
import type { PacePlan } from "@/lib/study-plan/pace";
import { nextDatedSession, nextQualificationKeys, tsuginoQualificationHref } from "@/lib/study-plan/next-qualification";
import { qualificationIdsForExam, type ExamSchedule, type ExamScheduleSession } from "@/lib/study-plan/schedule";
import { examLabel } from "@/lib/utils";

async function fetchSchedule(exam: string, signal: AbortSignal): Promise<ExamSchedule | null> {
  try {
    const response = await fetch("/api/exam-schedule/" + encodeURIComponent(exam), { signal });
    return response.ok ? await response.json() : null;
  } catch { return null; }
}

export function PostExamQualifications({ plan, items, today, onRetry }: {
  plan: PacePlan; items: readonly HomeDirectoryItem[]; today: string; onRetry(session?: ExamScheduleSession): void;
}) {
  const exam = plan.exam;
  const retry = plan.result === "failed" || plan.result === "absent";
  const [schedules, setSchedules] = useState<Record<string, ExamSchedule>>({});
  const [loaded, setLoaded] = useState(false);
  const { priority, nearby } = nextQualificationKeys(exam);
  useEffect(() => {
    const controller = new AbortController();
    const { priority, nearby } = nextQualificationKeys(exam);
    const keys = [
      ...(retry && qualificationIdsForExam(exam).length ? [exam] : []),
      ...priority,
      ...(priority.length < 3 ? nearby : []),
    ];
    void (async () => {
      for (const key of keys) {
        if (controller.signal.aborted) return;
        const schedule = await fetchSchedule(key, controller.signal);
        if (!controller.signal.aborted && schedule) setSchedules(current => ({ ...current, [key]: schedule }));
        if (key !== keys.at(-1)) await new Promise(resolve => window.setTimeout(resolve, 1000));
      }
      if (!controller.signal.aborted) setLoaded(true);
    })();
    return () => controller.abort();
  }, [exam, retry]);

  const upcoming = (key: string) => {
    const schedule = schedules[key];
    return schedule?.source === "tsugino" ? nextDatedSession(schedule.sessions, today) : undefined;
  };
  const dated = nearby.flatMap(key => {
    const session = upcoming(key);
    return session ? [{ key, session }] : [];
  }).sort((a, b) => a.session.examDate!.localeCompare(b.session.examDate!));
  const candidates = [...priority, ...dated.map(({ key }) => key)].slice(0, 3);
  const retrySession = upcoming(exam);
  return <div className="mt-3 border-t border-hairline pt-3">
    {retry && <button type="button" className="study-primary mb-3" aria-haspopup="dialog"
      onClick={() => onRetry(retrySession)}>
      {retrySession ? "次回日程で計画を作り直す" : "同じ資格で計画を作り直す"}
      <ArrowRight aria-hidden="true" className="size-5 shrink-0" />
    </button>}
    {plan.result === "passed" && <h2 className="mb-2 text-xl font-bold">合格おめでとう！</h2>}
    {candidates.length ? <section aria-label="次に取る資格">
      <h2 className="font-bold">次に取る資格</h2>
      <ul className="mt-1 divide-y divide-hairline">
        {candidates.map(key => {
          const item = items.find(row => row.key === key);
          const session = upcoming(key);
          const qualificationId = session?.qualificationId ?? qualificationIdsForExam(key)[0];
          return <li key={key} className="py-2">
            <p className="font-medium">{item?.name ?? examLabel(key)}{session?.examDate && <time
              className="ml-2 text-xs p3-scene-muted"
              dateTime={session.datePrecision === "month" ? session.examDate.slice(0, 7) : session.examDate}>
              {session.datePrecision === "month" ? session.examDate.slice(0, 7) : session.examDate}
            </time>}</p>
            <div className="flex flex-wrap gap-x-4">
              {Boolean(item?.questionCount) && <Link href={item!.href} className="study-link">過去問AIで解く</Link>}
              <a href={tsuginoQualificationHref(qualificationId, "next")} className="study-link">試験日・申込を見る</a>
            </div>
          </li>;
        })}
      </ul>
    </section> : (loaded || nearby.length === 0) &&
      <a href={tsuginoQualificationHref(null, "next")} className="study-link">次の資格をさがす</a>}
  </div>;
}
