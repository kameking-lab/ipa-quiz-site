"use client";
import { useEffect, useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import type { HomeDirectoryItem } from "@/lib/home/home-directory";
import type { ExamSchedule, ExamScheduleSession } from "@/lib/study-plan/schedule";
import { calculatePace, createPacePlan, dayNumber, EVERY_DAY, planOldestYear, rangeOptions, type PacePlan } from "@/lib/study-plan/pace";
import { savePacePlan } from "@/lib/study-plan/pace-storage";
import { paceAttempts } from "@/lib/study-plan/client";
import { usePlanCatalog } from "@/lib/study-plan/use-plan-catalog";
import { PLAN_OFFER } from "@/lib/billing/plan-offer";
import { japanDate } from "@/lib/home/featured-exams";
import { QualificationSelect } from "@/components/qualifications/QualificationSelect";
import styles from "./HomePace.module.css";

export const weekdayLabels = ["日", "月", "火", "水", "木", "金", "土"];
const weekdayPresets = [
  { label: "毎日", days: [...EVERY_DAY] },
  { label: "平日だけ", days: [1, 2, 3, 4, 5] },
  { label: "週末だけ", days: [0, 6] },
  { label: "曜日を選ぶ", days: null },
];
const fieldClass = "mt-1.5 min-h-11 w-full min-w-0 rounded-lg border border-input bg-card px-3";

export function PlanCreateSheet({ open, onOpenChange, items, initialExam, onCreated, embedded = false, editing }: {
  embedded?: boolean; editing?: PacePlan;
  open: boolean; onOpenChange: (open: boolean) => void; items: readonly HomeDirectoryItem[];
  initialExam: string; onCreated: (id: string) => void;
}) {
  const [exam, setExam] = useState(initialExam);
  const [sessions, setSessions] = useState<ExamScheduleSession[]>([]);
  const [sessionId, setSessionId] = useState("");
  const [date, setDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [scheduleFailed, setScheduleFailed] = useState(false);
  const [yearChoice, setYearChoice] = useState<{ exam: string; year: number }>();
  const [weekdays, setWeekdays] = useState<number[]>([...EVERY_DAY]);
  const [preset, setPreset] = useState(0);
  const [free, setFree] = useState(false);
  const [attempts, setAttempts] = useState<ReturnType<typeof paceAttempts>>([]);
  const [today, setToday] = useState(() => japanDate(new Date()));
  const { questions, reload } = usePlanCatalog(open ? exam : "");
  useEffect(() => {
    if (!open) return;
    setExam(initialExam);
    setYearChoice(undefined);
    const days = editing?.studyWeekdays ?? [...EVERY_DAY];
    setWeekdays(days);
    const exact = weekdayPresets.findIndex(p => p.days?.length === days.length && days.every(day => p.days?.includes(day)));
    setPreset(exact < 0 ? 3 : exact);
    const controller = new AbortController();
    setFree(false);
    void fetch("/api/billing/status", { signal: controller.signal, cache: "no-store" })
      .then(async response => response.status === 401 || (response.ok && (await response.json()).entitled === false))
      .then(value => { if (!controller.signal.aborted) setFree(value); }).catch(() => {});
    return () => controller.abort();
  }, [open, initialExam, editing]);
  useEffect(() => {
    if (!open) return;
    const clock = () => setToday(japanDate(new Date()));
    const refresh = () => { clock(); setAttempts(paceAttempts()); };
    refresh();
    const events = ["study-plan:changed", "study-activity:synced", "storage", "focus", "pageshow"];
    for (const event of events) window.addEventListener(event, refresh);
    const timer = window.setInterval(clock, 60_000);
    return () => {
      for (const event of events) window.removeEventListener(event, refresh);
      window.clearInterval(timer);
    };
  }, [open]);
  useEffect(() => {
    if (!open) return;
    setLoading(!!exam); setError(""); setDate(editing?.exam === exam ? editing.examDate ?? "" : ""); setSessions([]); setSessionId(""); setScheduleFailed(false);
    if (!exam) return;
    const controller = new AbortController();
    void fetch(`/api/exam-schedule/${encodeURIComponent(exam)}`, { signal: controller.signal })
      .then(async response => {
        if (!response.ok) throw new Error("schedule");
        const data = await response.json() as ExamSchedule;
        if (controller.signal.aborted) return;
        const future = data.sessions.filter(s => s.scheduleStatus === "ondemand" || !s.examDate || (s.examDateEnd ?? s.examDate) >= japanDate(new Date()));
        setSessions(future); setSessionId(editing?.exam === exam ? editing.sessionId ?? "" : future[0]?.id ?? "");
      }).catch(() => { if (!controller.signal.aborted) setScheduleFailed(true); })
      .finally(() => { if (!controller.signal.aborted) setLoading(false); });
    return () => controller.abort();
  }, [exam, open, editing]);
  const session = sessions.find(s => s.id === sessionId);
  // A window/month is not an individual's appointment. Always ask for the booked day.
  const manual = !session?.examDate || session.scheduleStatus === "ondemand" ||
    session.datePrecision === "month" || !!session.examDateEnd && session.examDateEnd !== session.examDate;
  const examDate = manual ? date : session?.examDate ?? "";
  const options = rangeOptions(questions ?? [], exam);
  const sameExam = editing?.exam === exam;
  const existingYear = sameExam && questions ? planOldestYear(editing, questions) : null;
  const chosenYear = (yearChoice?.exam === exam ? yearChoice.year : undefined) ??
    (sameExam ? existingYear ?? undefined : options.find(option => option.recommended)?.oldestYear);
  const preview = questions?.length && chosenYear !== undefined ? calculatePace(
    createPacePlan({ id: "preview", exam, examDate: dayNumber(examDate) === null ? null : examDate, sessionId: null, startDate: today, studyWeekdays: weekdays },
      questions, new Date().toISOString(), chosenYear), questions, attempts, today) : null;
  const noDays = Boolean(preview?.remaining && examDate && preview.studyDays === 0);
  const canSave = !loading && !!preview?.total && dayNumber(examDate) !== null && examDate >= today && weekdays.length > 0 && !noDays;
  function create() {
    if (!canSave || !questions || chosenYear === undefined) return;
    const now = new Date().toISOString();
    const updatedAt = editing && Date.parse(now) <= Date.parse(editing.updatedAt)
      ? new Date(Date.parse(editing.updatedAt) + 1).toISOString() : now;
    const savedSessionId = session?.id ?? (sameExam && editing.examDate === examDate ? editing.sessionId : null);
    const plan = createPacePlan({ id: editing?.id ?? crypto.randomUUID(), exam, sessionId: savedSessionId, examDate,
      startDate: editing?.startDate ?? today, studyWeekdays: weekdays }, questions, updatedAt, chosenYear);
    plan.createdAt = editing?.createdAt ?? now;
    if (session) plan.registration = { label: session.label, start: session.applicationStart, deadline: session.applicationDeadline,
      resultDate: session.resultDate, sourceUrl: session.sourceUrl, estimated: session.applicationEstimated || session.scheduleStatus === "tentative" };
    if (sameExam && examDate === editing.examDate && plan.sessionId === editing.sessionId) {
      plan.registration ??= editing.registration;
      plan.registered = editing.registered;
      plan.result = editing.result;
    }
    if (!savePacePlan(plan)) { setError("保存できませんでした。端末の保存設定を確認してください。"); return; }
    onCreated(plan.id);
    onOpenChange(false);
  }
  const fields = (
      <div className="mt-4 space-y-3">
        <QualificationSelect items={items} value={exam} onChange={setExam} label="受ける資格" emptyLabel="資格を選ぶ" className="text-sm font-medium" fieldClass={fieldClass} />
        {exam && <>
        {loading ? <p role="status" className="text-sm text-muted-foreground">日程を確認中…</p> : <>
          {sessions.length > 0 && <fieldset className="space-y-2">
            <legend className="mb-1.5 text-sm font-medium">受ける回</legend>
            {sessions.map(s => <div key={s.id} className="rounded-xl border border-border has-checked:border-primary has-checked:bg-primary-soft">
              <label className="flex min-h-11 cursor-pointer items-center gap-2.5 rounded-xl px-3 py-2 text-sm font-bold">
                <input type="radio" name="pace-plan-session" checked={s.id === sessionId} onChange={() => { setSessionId(s.id); setDate(""); }} className="size-4 shrink-0 accent-primary" />
                <span>{s.label}</span>
                {s.scheduleStatus === "tentative" && <span className="rounded-full border border-border px-2 py-0.5 text-xs font-normal text-muted-foreground">予定</span>}
              </label>
              {s.id === sessionId && <div className="space-y-2 px-3 pb-3">
                <dl className="space-y-1 text-xs">
                  {[["申込開始", s.applicationStart], ["申込締切", s.applicationDeadline], ["試験日", s.examDate], ["合格発表", s.resultDate]].map(([label, value]) => <div key={label} className="flex justify-between gap-3"><dt className="text-muted-foreground">{label}{s.applicationEstimated && label?.startsWith("申込") ? "（予定）" : ""}</dt><dd className="text-right">{value ?? "未発表"}{label === "試験日" && s.examDateEnd && s.examDateEnd !== value ? `〜${s.examDateEnd}` : ""}</dd></div>)}
                </dl>
                {manual && <label className="block text-sm font-medium">{s.scheduleStatus === "ondemand" ? "予約した日・受けたい日" : "受験日"}<input type="date" min={japanDate(new Date())} value={date} onChange={e => setDate(e.target.value)} className={fieldClass} /></label>}
                {!manual && <p className="text-sm font-medium">受験日　<time dateTime={examDate}>{examDate}</time>{s.scheduleStatus === "tentative" ? "（予定）" : ""}</p>}
                {s.sourceUrl && <div className="flex justify-end"><a href={s.sourceUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-8 items-center text-xs text-primary underline underline-offset-4">公式日程</a></div>}
              </div>}
            </div>)}
          </fieldset>}
          {scheduleFailed && <p className="text-sm text-muted-foreground">日程を取得できませんでした。受験日を入力してください。</p>}
          {!session && <label className="block text-sm font-medium">受験日<input type="date" min={japanDate(new Date())} value={date} onChange={e => setDate(e.target.value)} className={fieldClass} /></label>}
        </>}
        <fieldset className="space-y-2">
          <legend className="mb-1.5 text-sm font-medium">解く範囲</legend>
          {questions === undefined && <p role="status" className="text-sm text-muted-foreground">問題を確認中…</p>}
          {questions === null && <p role="alert" className="text-sm">問題を読み込めませんでした <button type="button" className="min-h-11 underline" onClick={reload}>再読み込み</button></p>}
          {questions?.length === 0 && <p role="status" className="text-sm">計画に使える問題がありません</p>}
          {existingYear !== null && !options.some(option => option.oldestYear === existingYear) && <label className="flex min-h-11 items-center gap-2 rounded-xl border px-3 text-sm">
            <input type="radio" name="pace-range" checked={chosenYear === existingYear} onChange={() => setYearChoice({ exam, year: existingYear })} />
            {existingYear}年度以降（{questions?.filter(q => q.year >= existingYear).length}問）
          </label>}
          {options.map(option => <label key={option.oldestYear} className="flex min-h-11 items-center gap-2 rounded-xl border px-3 text-sm has-checked:border-primary has-checked:bg-primary-soft">
            <input type="radio" name="pace-range" checked={chosenYear === option.oldestYear} onChange={() => setYearChoice({ exam, year: option.oldestYear })} />
            {option.all ? "全" : "直近"}{option.count}年分（{option.total}問）
          </label>)}
        </fieldset>
        <fieldset>
          <legend className="mb-2 text-sm font-medium">勉強する日</legend>
          <div className="grid grid-cols-2 gap-2">
            {weekdayPresets.map((option, index) => <label key={option.label} className="flex min-h-11 items-center gap-2 rounded-xl border px-3 text-sm has-checked:border-primary has-checked:bg-primary-soft">
              <input type="radio" name="pace-weekdays" checked={preset === index} onChange={() => { setPreset(index); if (option.days) setWeekdays(option.days); }} />{option.label}
            </label>)}
          </div>
          {preset === 3 && <div className="mt-2 grid grid-cols-7 gap-1">
            {[1, 2, 3, 4, 5, 6, 0].map(day => <label key={day} className="flex min-h-11 flex-col items-center justify-center rounded-lg border text-sm has-checked:border-primary has-checked:bg-primary-soft">
              <input type="checkbox" checked={weekdays.includes(day)} onChange={e => setWeekdays(e.target.checked ? [...weekdays, day] : weekdays.filter(value => value !== day))} />
              {weekdayLabels[day]}
            </label>)}
          </div>}
          <p className="mt-2 text-sm">{preset === 3 && weekdays.length > 0 ? [1, 2, 3, 4, 5, 6, 0].filter(day => weekdays.includes(day)).map(day => weekdayLabels[day]).join("・") + "（週" + weekdays.length + "回）" : "週" + weekdays.length + "回"}</p>
        </fieldset>
        <div aria-live="polite" className="text-sm">
          {preview?.complete ? <p>全{preview.total}問に正解しました</p> : preview?.target != null ? <>
            <p className="font-bold">1回の目安　{preview.target}問正解</p>
            <p>残り{preview.remaining}問 ÷ 勉強日{preview.studyDays}日</p>
            {free && preview.target > PLAN_OFFER.freeDaily && <p>無料で解けるのは1日{PLAN_OFFER.freeDaily}問です。</p>}
          </> : noDays ? <p>試験前に勉強日がありません</p> : !examDate ? <p>受験日を設定してください</p> : null}
        </div>
        {error && <p role="alert" className="text-sm text-destructive">{error}</p>}
        <Button size="xl" className="w-full" disabled={!canSave} onClick={create}>{editing ? "変更を保存" : "この計画で始める"}</Button>
        </>}
      </div>
  );
  if (embedded) return <section aria-labelledby="plan-title">
    <h1 id="plan-title" className="text-xl font-bold">{editing ? "学習計画を変更" : "学習計画を作る"}</h1>
    {fields}
  </section>;
  return <Sheet open={open} onOpenChange={onOpenChange}>
    <SheetContent side="bottom" aria-describedby={undefined} className={`${styles.sheet} mx-auto max-h-[min(90dvh,calc(100dvh-var(--safe-top)-1rem))] max-w-[640px] overflow-y-auto px-[18px] pt-3 pb-[max(1.5rem,var(--safe-bottom))] sm:px-6`}>
      <div aria-hidden="true" className="mx-auto mb-3 h-1 w-11 rounded-full bg-border" />
      <SheetHeader className="pr-11"><SheetTitle>{editing ? "学習計画を変更" : "学習計画を作る"}</SheetTitle></SheetHeader>
      {fields}
    </SheetContent>
  </Sheet>;
}
