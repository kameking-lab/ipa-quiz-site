"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { ChevronRight } from "lucide-react";
import { z } from "zod";
import { buildWeaknessPlan, buildWeaknessTopics, weaknessMinimumQuestions, weaknessPracticeLimit, type WeaknessPracticeQuestion, type WeaknessQuestionMeta } from "@/lib/me/weakness";
import { datedPlan, defaultPublishedExamDate, publishedExamSessions, type ExamDatePlan } from "@/lib/billing/exam-end";
import { jstDateString } from "@/lib/streak/core";
import { dayNumber } from "@/lib/study-plan/pace";
import type { ExamSchedule } from "@/lib/study-plan/schedule";
import type { HistoryEntry } from "@/lib/storage/history";
import { LS_KEYS } from "@/lib/storage/keys";
import { examLabel } from "@/lib/utils";
import { nativeClient } from "@/mobile/shared/contracts";
import { billingHref, planStartHref } from "@/lib/billing/quiz-return";
import { encodeExplicitPoolIds } from "@/lib/questions/explicit-pool";
import { readSyncAccount } from "@/lib/sync/ownership";
import { continueWeaknessWeek, readWeek, weaknessForecast, weaknessWeekKey, type SavedWeek } from "@/lib/me/weakness-week";

const shortDate = (date: string) => `${Number(date.slice(5, 7))}/${Number(date.slice(8, 10))}`;

function renewalReminder(exam: string, date: string) {
  // Show one reminder per planned exam date on this device.
  const key = `${exam}:${date}`;
  try {
    const raw: unknown = JSON.parse(localStorage.getItem(LS_KEYS.appStoreExamReminder) ?? "[]");
    const seen = Array.isArray(raw) ? raw.filter((item): item is string => typeof item === "string") : [];
    if (seen.includes(key)) return false;
    localStorage.setItem(LS_KEYS.appStoreExamReminder, JSON.stringify([...seen.slice(-29), key]));
  } catch { /* A reminder can still be shown when browser storage is disabled. */ }
  return true;
}

function weekHref(exam: string, ids: string[]) {
  return `/quiz?${new URLSearchParams({ mode: "year", source: "weakness", exam, ids: encodeExplicitPoolIds(ids), question: ids[0] })}`;
}

interface CheckoutPlan { exam: string; examDate: string; selectedAt?: string }
interface Membership { paid: boolean; owner?: string; appStore: boolean; examPlan: CheckoutPlan | null }

export function WeaknessReport({ history, meta, exam: recentExam, requestedExam, plans, now }: {
  history: HistoryEntry[]; meta: Record<string, WeaknessQuestionMeta>; exam: string; requestedExam?: string; plans: ExamDatePlan[]; now: Date;
}) {
  const [membership, setMembership] = useState<Membership>();
  const [schedule, setSchedule] = useState<{ exam: string; date?: string }>();
  const [practice, setPractice] = useState<{ key: string; date: string; questions: WeaknessPracticeQuestion[] }>();
  const [assignment, setAssignment] = useState<{ key: string; week: SavedWeek }>();
  const [reminder, setReminder] = useState<string>();
  const reminderCheck = useRef(new Set<string>());
  const report = useRef<HTMLElement>(null);
  const today = jstDateString(now);
  const savedPlan = membership?.examPlan;
  const appPlan = membership?.appStore ? datedPlan(plans, today, recentExam) : undefined;
  const subscribedExam = savedPlan?.examDate && savedPlan.examDate >= today && history.some(entry => meta[entry.id]?.exam === savedPlan.exam)
    ? savedPlan.exam : undefined;
  const exam = requestedExam ?? subscribedExam ?? recentExam;
  const topics = useMemo(() => buildWeaknessTopics(history, meta, exam, now), [history, meta, exam, now]);
  const hasTopics = topics.length > 0;
  const orderedTopics = useMemo(() => [
    ...topics.filter(topic => topic.distinctQuestions >= weaknessMinimumQuestions),
    ...topics.filter(topic => topic.distinctQuestions < weaknessMinimumQuestions),
  ], [topics]);
  const hasHistory = history.length > 0;
  const plan = datedPlan(plans.filter(plan => plan.exam === exam), today);
  const checkoutDate = savedPlan?.exam === exam && savedPlan.examDate && savedPlan.examDate >= today ? savedPlan.examDate : null;
  const editedAfterCheckout = plan?.updatedAt && savedPlan?.selectedAt &&
    Date.parse(plan.updatedAt) > Date.parse(savedPlan.selectedAt);
  const plannedDate = editedAfterCheckout ? plan.examDate : checkoutDate ?? plan?.examDate;
  const examDate = plannedDate ?? (schedule?.exam === exam ? schedule.date : undefined);
  const days = examDate ? dayNumber(examDate)! - dayNumber(today)! : null;
  const paid = membership?.paid === true;
  const weekKey = paid && membership.owner ? weaknessWeekKey(membership.owner, exam) : null;
  const weakNames = JSON.stringify(orderedTopics.filter(topic => topic.missed.length).slice(0, 3).map(topic => topic.name));
  const practiceLimit = days !== null && days >= 0 ? Math.min(weaknessPracticeLimit, (days + 1) * 2) : 0;
  const assigned = assignment?.key === weekKey && assignment.week.from <= today && assignment.week.to >= today
    && assignment.week.examDate === examDate ? assignment.week : undefined;
  const assignedComplete = assigned?.complete === true;

  useEffect(() => {
    if (requestedExam && hasTopics) report.current?.scrollIntoView({ block: "start" });
  }, [requestedExam, hasTopics]);

  useEffect(() => {
    if (!weekKey) return;
    const refresh = (event: Event) => {
      if (event instanceof CustomEvent && event.detail !== weekKey) return;
      if (event instanceof StorageEvent && event.key !== weekKey) return;
      const week = readWeek(weekKey);
      if (week) setAssignment({ key: weekKey, week });
    };
    window.addEventListener("weakness-week:synced", refresh);
    window.addEventListener("storage", refresh);
    return () => {
      window.removeEventListener("weakness-week:synced", refresh);
      window.removeEventListener("storage", refresh);
    };
  }, [weekKey]);

  useEffect(() => {
    if (!hasHistory && !nativeClient()) return;
    let controller: AbortController | undefined, timer: ReturnType<typeof setTimeout> | undefined;
    let owner: string | undefined;
    function refresh(attempt = 0) {
      controller?.abort();
      clearTimeout(timer);
      const current = new AbortController();
      controller = current;
      const signal = AbortSignal.any([current.signal, AbortSignal.timeout(8_000)]);
      void (async () => {
        const account = await readSyncAccount(signal).catch(() => {
          if (!current.signal.aborted) { owner = undefined; setMembership(undefined); }
          throw new Error("session_unavailable");
        });
        if (current.signal.aborted) return;
        if (owner !== account?.id) setMembership(undefined);
        owner = account?.id;
        if (!account) { setMembership({ paid: false, appStore: false, examPlan: null }); return; }
        const response = await fetch("/api/billing/status", { cache: "no-store", signal });
        if (!response.ok) throw new Error("membership_unavailable");
        const status: { entitled?: boolean; appStore?: boolean; examPlan?: CheckoutPlan | null } = await response.json();
        if (typeof status.entitled !== "boolean") throw new Error("membership_unavailable");
        if (!current.signal.aborted) setMembership({ paid: status.entitled, owner: account.id,
          appStore: status.appStore === true && nativeClient(), examPlan: status.examPlan ?? null });
      })().catch(() => {
        if (!current.signal.aborted) timer = setTimeout(() => refresh(attempt + 1), Math.min(30_000, 1000 * 2 ** attempt));
      });
    }
    const visible = () => { if (!document.hidden) refresh(); };
    const ownerChanged = () => { owner = undefined; setMembership(undefined); refresh(); };
    const storageChanged = (event: StorageEvent) => {
      if (!event.key || event.key === LS_KEYS.syncLocalOwner) ownerChanged();
    };
    refresh();
    document.addEventListener("visibilitychange", visible);
    window.addEventListener("focus", visible);
    window.addEventListener("mobile:entitlement-changed", visible);
    window.addEventListener("pet-v1:owner-changed", ownerChanged);
    window.addEventListener("storage", storageChanged);
    return () => {
      controller?.abort();
      clearTimeout(timer);
      document.removeEventListener("visibilitychange", visible);
      window.removeEventListener("focus", visible);
      window.removeEventListener("mobile:entitlement-changed", visible);
      window.removeEventListener("pet-v1:owner-changed", ownerChanged);
      window.removeEventListener("storage", storageChanged);
    };
  }, [hasHistory]);

  useEffect(() => {
    if (plannedDate || !paid || !hasHistory) return;
    const controller = new AbortController();
    void fetch(`/api/exam-schedule/${encodeURIComponent(exam)}`, { signal: controller.signal }).then(async response => {
      if (!response.ok) throw new Error("schedule_unavailable");
      const data = await response.json() as ExamSchedule;
      if (!controller.signal.aborted) setSchedule({ exam, date: defaultPublishedExamDate(publishedExamSessions(data.sessions, today, exam))?.date });
    }).catch(() => { if (!controller.signal.aborted) setSchedule({ exam }); });
    return () => controller.abort();
  }, [exam, today, plannedDate, hasHistory, paid]);

  useEffect(() => {
    const topics = JSON.parse(weakNames) as string[];
    if (!weekKey || !examDate || !practiceLimit || !topics.length || assignedComplete) return;
    const controller = new AbortController();
    let timer: ReturnType<typeof setTimeout> | undefined;
    const answered = [...new Set([...history].sort((a, b) => b.at - a.at).map(entry => entry.id))].filter(id => id && id.length <= 120).slice(0, 3000);
    const body = JSON.stringify({ exam, topics, answered, limit: practiceLimit });
    function load(attempt: number) {
      const signal = AbortSignal.any([controller.signal, AbortSignal.timeout(8_000)]);
      void fetch("/api/me/weakness-practice", { method: "POST", headers: { "Content-Type": "application/json" }, body, signal }).then(async response => {
        if (!response.ok) throw new Error("practice_unavailable");
        const result = z.object({ questions: z.array(z.object({ id: z.string(), topic: z.string() })) }).parse(await response.json());
        if (!controller.signal.aborted && weekKey && examDate) setPractice({ key: weekKey, date: examDate, questions: result.questions });
      }).catch(() => {
        if (!controller.signal.aborted) timer = setTimeout(() => load(attempt + 1), Math.min(30_000, 1000 * 2 ** attempt));
      });
    }
    load(0);
    return () => { controller.abort(); clearTimeout(timer); };
  }, [exam, examDate, practiceLimit, history, weekKey, weakNames, assignedComplete]);

  useEffect(() => {
    if (!membership?.appStore || !appPlan?.examDate) return;
    const daysLeft = dayNumber(appPlan.examDate)! - dayNumber(today)!;
    if (daysLeft < 1 || daysLeft > 3) return;
    const key = `${appPlan.exam}:${appPlan.examDate}`;
    if (!reminderCheck.current.has(key)) {
      reminderCheck.current.add(key);
      if (renewalReminder(appPlan.exam, appPlan.examDate)) setReminder(appPlan.examDate);
    }
  }, [appPlan, membership, today]);

  const renewalDays = reminder && reminder === appPlan?.examDate ? dayNumber(reminder)! - dayNumber(today)! : null;
  const renewal = membership?.appStore && renewalDays !== null && renewalDays >= 1 && renewalDays <= 3
    ? <p className="rounded-xl border border-border bg-card px-4 py-3 text-sm">試験まであと{renewalDays}日。<a href="https://apps.apple.com/account/subscriptions" className="font-semibold text-primary underline">更新を止めますか</a></p> : null;
  const shown = paid ? orderedTopics : orderedTopics.slice(0, 1);
  const extras = practice && practice.key === weekKey && practice.date === examDate ? practice.questions : undefined;
  const complete = !examDate || weakNames === "[]" || extras !== undefined;
  useEffect(() => {
    if (!weekKey || !(plannedDate || schedule?.exam === exam)) return;
    const saved = assigned ?? readWeek(weekKey);
    const existing = saved && saved.from <= today && saved.to >= today && saved.examDate === examDate ? saved : undefined;
    if (existing && (existing.complete || !complete)) {
      if (!assigned) setAssignment({ key: weekKey, week: existing });
      return;
    }
    let week = continueWeaknessWeek(saved, today, examDate, history);
    if (!week) {
      const missed = orderedTopics.flatMap(topic => topic.missed.map(id => ({ id, topic: topic.name })));
      const pool = [...(existing?.groups.flat() ?? []), ...missed, ...(extras ?? [])];
      const [first, ...weeks] = buildWeaknessPlan([], existing?.from ?? today, examDate, pool);
      if (!first) return;
      const groups = [first, ...weeks.filter(row => row.from === first.from)].map(row => row.questions);
      const forecast = complete ? weaknessForecast(weeks.filter(row => row.from > first.from)
        .map(row => ({ from: row.from, to: row.to, groups: [row.questions] }))) : undefined;
      week = { from: first.from, to: first.to, startedAt: existing?.startedAt ?? now.getTime(), examDate, complete, groups, forecast };
    }
    try { localStorage.setItem(weekKey, JSON.stringify(week)); } catch { /* Keep the week in memory when storage is unavailable. */ }
    setAssignment({ key: weekKey, week });
    if (week.complete) window.dispatchEvent(new Event("study-plan:changed"));
  }, [weekKey, assigned, plannedDate, schedule?.exam, exam, today, examDate, complete, orderedTopics, extras, now, history]);

  if (!shown.length && !assigned) return renewal;
  const inWeek = (at: number) => assigned && at >= assigned.startedAt && at <= now.getTime();
  const done = new Set(history.filter(entry => inWeek(entry.at)).map(entry => entry.id));
  const remaining = assigned?.groups.map(group => group.filter(question => !done.has(question.id))).filter(group => group.length) ?? [];
  const remainingDays = assigned ? dayNumber(assigned.to)! - dayNumber(today)! + 1 : 1;
  const returnTo = `/me?${new URLSearchParams({ exam })}`;
  const buyHref = nativeClient() ? billingHref(returnTo) : planStartHref(returnTo);
  const hasMisses = orderedTopics.some(topic => topic.missed.length);

  return <>
    {renewal}
    <section ref={report} aria-labelledby="weakness-title" className="scroll-mt-16 space-y-3 rounded-xl border border-border bg-card p-4">
      <header className="flex flex-wrap items-baseline justify-between gap-1">
        <h2 id="weakness-title" className="font-bold">弱点レポート</h2>
        <p className="text-xs text-muted-foreground">{examLabel(exam)}</p>
      </header>
      {!!shown.length && <table className="w-full table-fixed text-sm">
        <thead className="border-b border-border text-xs text-muted-foreground">
          <tr><th scope="col" className="w-[40%] py-2 text-left font-medium">分野</th><th scope="col" className="text-right font-medium">正答率</th>
            <th scope="col" className="text-right font-medium">解答回数</th><th scope="col" className="text-right font-medium" title="直近7日とその前の7日の比較">前週比</th></tr>
        </thead>
        <tbody className="divide-y divide-border">
          {shown.map(topic => {
            const growth = topic.growth === null ? null : Math.round(topic.growth * 100);
            return <tr key={topic.name} className="tabular-nums">
              <th scope="row" className="break-words py-2 pr-1 text-left font-medium">{topic.name}</th>
              <td className="text-right font-semibold">{Math.round(topic.accuracy * 100)}%</td><td className="text-right">{topic.total}回</td>
              <td className="whitespace-nowrap text-right">{growth === null ? "—" : `${growth > 0 ? "+" : ""}${growth}pt`}</td>
            </tr>;
          })}
        </tbody>
      </table>}
      {membership?.paid === false && (hasMisses || topics.length > 1) && <Link href={buyHref} className="inline-flex min-h-11 items-center text-sm font-semibold text-primary underline underline-offset-4">
        月額で{topics.length > 1 ? `全${topics.length}分野` : ""}{hasMisses ? `${topics.length > 1 ? "と" : ""}復習計画` : ""}を見る
      </Link>}
      {assigned && <div className="space-y-2 border-t border-border pt-3">
        {examDate && <h3 className="text-sm font-bold">{shortDate(examDate)}の試験までの復習計画</h3>}
        <ul className="space-y-1.5 text-sm">{remaining.map(group => {
          const counts = new Map<string, number>();
          for (const question of group) counts.set(question.topic, (counts.get(question.topic) ?? 0) + 1);
          const low = Math.floor(group.length / remainingDays), high = Math.ceil(group.length / remainingDays);
          return <li key={group[0].id}>
          <Link href={weekHref(exam, group.map(question => question.id))} prefetch={false} className="flex min-h-11 items-center gap-2 rounded-lg bg-muted/60 px-2.5 py-2 hover:bg-muted">
            <span className="min-w-0 flex-1">
              <span className="block font-semibold tabular-nums">今週の復習 {group.length}問</span>
              <span className="text-xs text-muted-foreground">{Array.from(counts, ([topic, count]) => `${topic} ${count}問`).join(" · ")}</span>
            </span>
            {low > 0 && <span className="shrink-0 text-xs text-muted-foreground">1日{low < high ? `${low}〜` : ""}{high}問</span>}
            <ChevronRight aria-hidden="true" className="size-4 shrink-0 text-muted-foreground" />
          </Link>
        </li>; })}
          {!remaining.length && <li className="font-semibold">今週の復習は完了</li>}
          {assigned.forecast && <li className="px-2.5 py-2 text-muted-foreground">
            {shortDate(assigned.forecast.from)}–{shortDate(assigned.forecast.to)}の見込み {assigned.forecast.count}問
          </li>}
        </ul>
      </div>}
    </section>
  </>;
}
