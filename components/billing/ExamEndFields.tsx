"use client";

import { useEffect, useState } from "react";
import { datedPlan, defaultPublishedExamDate, examDateLabel, publishedExamSessions } from "@/lib/billing/exam-end";
import { createHistoryStore } from "@/lib/storage/history";
import { readLastQuestion } from "@/lib/storage/last-question";
import { recordExam } from "@/lib/me/records";
import { readExamDatePlans } from "@/lib/billing/exam-end-client";
import { examLabel } from "@/lib/utils";
import type { ExamSchedule } from "@/lib/study-plan/schedule";

const field = "min-h-11 w-full rounded-lg border border-border bg-background px-3 text-sm";
export interface ExamEndSelection { date: string | null; exam: string | null; loading: boolean; automatic: boolean }

export function ExamEndFields({ today, examHint, disabled, onSelection }: { today: string; examHint?: string; disabled?: boolean; onSelection: (value: ExamEndSelection) => void }) {
  const [automatic, setAutomatic] = useState(true);
  const [manualDate, setManualDate] = useState("");
  const [option, setOption] = useState("manual");
  const [exam, setExam] = useState<string | null>(null);
  const [planDate, setPlanDate] = useState<string | null>(null);
  const [sessions, setSessions] = useState<ReturnType<typeof publishedExamSessions>>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();
    const lastAnswer = [...createHistoryStore().getAllEntries()].sort((a, b) => b.at - a.at)
      .map(entry => recordExam(entry.id)).find(Boolean);
    const recent = examHint ?? lastAnswer ?? readLastQuestion()?.exam;
    const plans = readExamDatePlans();
    const plan = datedPlan(examHint ? plans.filter(plan => plan.exam === examHint) : plans, today, recent);
    const current = plan?.exam ?? recent;
    setExam(current ?? null);
    if (plan?.examDate) {
      setPlanDate(plan.examDate);
      setOption("plan");
    }
    if (!current) { setLoading(false); return; }
    if (plan?.examDate) setLoading(false);
    const signal = AbortSignal.any([controller.signal, AbortSignal.timeout(5_000)]);
    void fetch(`/api/exam-schedule/${encodeURIComponent(current)}`, { signal })
      .then(async response => {
        if (!response.ok || signal.aborted) return;
        const schedule = await response.json() as ExamSchedule;
        if (signal.aborted) return;
        const choices = publishedExamSessions(schedule.sessions, today, current);
        setSessions(choices);
        if (!plan?.examDate && choices.length) setOption(defaultPublishedExamDate(choices)?.key ?? "");
      }).catch(() => {}).finally(() => {
        if (controller.signal.aborted) return;
        setLoading(false);
      });
    return () => controller.abort();
  }, [today, examHint]);

  const selected = sessions.find(session => session.key === option);
  const date = option === "plan" ? planDate : option === "manual" ? manualDate : selected?.date;
  useEffect(() => { onSelection({ date: automatic && date ? date : null, exam, loading, automatic }); }, [automatic, date, exam, loading, onSelection]);
  return <fieldset className="space-y-2" disabled={disabled}>
    <legend className="mb-2 text-sm font-bold">月額プランの終了</legend>
    <div className="rounded-xl border border-border bg-card p-3.5 has-checked:border-primary/60">
      <label className="flex min-h-8 items-start gap-2.5 text-sm font-semibold">
        <input type="radio" name="renewal" value="exam" checked={automatic} disabled={loading} onChange={() => setAutomatic(true)} className="mt-1 accent-primary" />
        試験日の翌日に自動で終わる
      </label>
      {automatic && <div className="space-y-2 pl-6 text-sm">
        {exam && <p className="font-medium">{examLabel(exam)}</p>}
        {loading ? <p role="status" className="text-muted-foreground">試験日を確認中…</p> : <>
          {(sessions.length > 0 || planDate) && <select aria-label="試験の回" className={field} value={option} required onChange={event => setOption(event.target.value)}>
            <option value="" disabled>受験日を選ぶ</option>
            {planDate && <option value="plan">学習計画 · {examDateLabel(planDate)}</option>}
            {sessions.map(session => <option key={session.key} value={session.key}>{session.label} · {examDateLabel(session.date)}</option>)}
            <option value="manual">試験日を手入力</option>
          </select>}
          {option === "manual" && <label className="block space-y-1"><span>受験日</span>
            <input type="date" name="manualExamDate" aria-label="受験日" className={field} required min={today} value={manualDate}
              onChange={event => setManualDate(event.target.value)}
              onInvalid={event => {
                const input = event.currentTarget;
                if (!input.validity.valueMissing || typeof input.showPicker !== "function") return;
                input.focus();
                try { input.showPicker(); event.preventDefault(); }
                catch { /* Browsers can fall back to native form validation. */ }
              }} />
          </label>}
          {selected && <a href={selected.sourceUrl} className="text-muted-foreground underline" target="_blank" rel="noreferrer">公式日程</a>}
        </>}
      </div>}
    </div>
    <label className="flex min-h-12 items-center gap-2.5 rounded-xl border border-border px-3.5 text-sm font-semibold has-checked:border-primary/60">
      <input type="radio" name="renewal" value="continue" checked={!automatic} disabled={loading} onChange={() => setAutomatic(false)} className="accent-primary" />自動で終わらせない
    </label>
  </fieldset>;
}
