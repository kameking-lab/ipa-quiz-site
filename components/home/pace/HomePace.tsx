"use client";
import { Suspense, useCallback, useEffect, useMemo, useState, type ReactNode } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowRight, ChevronDown, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { StudySearchField } from "@/components/ui/StudySearchField";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import type { HomeDirectoryDomain } from "@/lib/home/home-directory";
import { groupHomeDirectoryItems } from "@/lib/home/grouped-directory";
import { calculatePace, weakQuestions, type AnswerAttempt, type PacePlan } from "@/lib/study-plan/pace";
import { listPacePlans, savePacePlan, deletePacePlan } from "@/lib/study-plan/pace-storage";
import { answersToday, deadlineWarning } from "@/lib/study-plan/home";
import { paceAttempts } from "@/lib/study-plan/client";
import { historyExamLookup, japanDate, upcomingExamPicks } from "@/lib/home/featured-exams";
import { readHomeStudy, relativeStudyDate } from "@/lib/home/recent-study";
import { createHistoryStore } from "@/lib/storage/history";
import { usePlanCatalog } from "@/lib/study-plan/use-plan-catalog";
import { qualificationRunArt } from "@/lib/home/study-room";
import { qualificationIdsForExam } from "@/lib/study-plan/schedule";
import { searchQualifications } from "@/lib/qualifications/search";
import { groupQualifications, qualificationDisplayKey, qualificationGroupLabel } from "@/lib/qualifications/groups";
import { planReferral } from "@/lib/study-plan/next-qualification";
import type { ExamScheduleSession } from "@/lib/study-plan/schedule";
import { MobileInstallNudge } from "@/components/pwa/MobileInstallNudge";
import { PlanCalendarButton } from "./PlanCalendarButton";
import { PostExamQualifications } from "./PostExamQualifications";
import { PlanCreateSheet, weekdayLabels } from "./PlanCreateSheet";
import { PaceTrack, StartTrack } from "./PaceTrack";
import styles from "./HomePace.module.css";

interface Resume { exam: string; name: string; href: string; caption: string }
type PlanPrefill = { exam: string; examDate?: string; sessionId?: string };

function HomePlanReferral({ keys, onOpen }: { keys: readonly string[]; onOpen(prefill: PlanPrefill): void }) {
  const search = useSearchParams();
  useEffect(() => {
    const prefill = planReferral(search, keys, japanDate(new Date()));
    if (!prefill) return;
    onOpen(prefill);
    const url = new URL(location.href);
    url.searchParams.delete("plan");
    url.searchParams.delete("examDate");
    window.history.replaceState(window.history.state, "", url);
  }, [search, keys, onOpen]);
  return null;
}
const shortDate = (date: string) => `${Number(date.slice(5, 7))}/${Number(date.slice(8))}`;
export function HomePace({ domains, planExamKeys, createOnLoad = false, children }: {
  domains: readonly HomeDirectoryDomain[]; planExamKeys: readonly string[]; createOnLoad?: boolean; children?: ReactNode;
}) {
  const router = useRouter();
  useEffect(() => {
    if (["#choose-qualification", "#home-directory-title"].includes(location.hash)) router.replace("/search");
  }, [router]);
  const items = useMemo(() => domains.flatMap(d => [...d.featured, ...d.compact]), [domains]);
  const directoryItems = useMemo(() => groupHomeDirectoryItems(items), [items]);
  const planItems = useMemo(() => items.filter(item => planExamKeys.includes(item.key)), [items, planExamKeys]);
  const examFor = useMemo(() => historyExamLookup(items.map(item => item.key),
    Object.fromEntries(items.flatMap(item => (item.historyPrefixes ?? []).map(prefix => [prefix, item.key])))), [items]);
  const [plans, setPlans] = useState<PacePlan[]>([]);
  const [active, setActive] = useState("");
  const [attempts, setAttempts] = useState<AnswerAttempt[]>([]);
  const [today, setToday] = useState(japanDate(new Date()));
  const [ready, setReady] = useState(false);
  const [study, setStudy] = useState<ReturnType<typeof readHomeStudy> | null>(null);
  const [resolvedResume, setResolvedResume] = useState<{ query: string; entry: Resume } | null>(null);
  const [sheet, setSheet] = useState<"create" | "edit" | "switch" | "detail" | null>(null);
  const [prefill, setPrefill] = useState<PlanPrefill>();
  const [created, setCreated] = useState<PacePlan>();
  const referralKeys = useMemo(() => planItems.map(item => item.key), [planItems]);
  const openPrefilled = useCallback((value: PlanPrefill) => { setPrefill(value); setSheet("create"); }, []);
  const [query, setQuery] = useState("");
  const [stars, setStars] = useState<string[]>([]);
  const [error, setError] = useState("");
  const refresh = useCallback(() => {
    const history = paceAttempts();
    const savedPlans = listPacePlans();
    setPlans(current => JSON.stringify(current) === JSON.stringify(savedPlans) ? current : savedPlans);
    setAttempts(history); setToday(japanDate(new Date())); setReady(true);
    setStudy(readHomeStudy(history, examFor));
    setStars(createHistoryStore().getStarredIds());
  }, [examFor]);
  useEffect(() => {
    refresh();
    const visible = () => { if (document.visibilityState === "visible") refresh(); };
    window.addEventListener("study-plan:changed", refresh); window.addEventListener("storage", refresh);
    window.addEventListener("study-activity:synced", refresh);
    window.addEventListener("study-plan:synced", refresh);
    window.addEventListener("pageshow", refresh); window.addEventListener("focus", refresh);
    document.addEventListener("visibilitychange", visible);
    const timer = window.setInterval(refresh, 60_000);
    return () => { window.removeEventListener("study-plan:changed", refresh); window.removeEventListener("storage", refresh);
      window.removeEventListener("study-activity:synced", refresh);
      window.removeEventListener("study-plan:synced", refresh);
      window.removeEventListener("pageshow", refresh); window.removeEventListener("focus", refresh);
      document.removeEventListener("visibilitychange", visible); window.clearInterval(timer); };
  }, [refresh]);
  const resumeQuery = study?.query;
  useEffect(() => {
    if (!resumeQuery) return;
    const controller = new AbortController();
    void fetch(`/api/home/resume?${resumeQuery}`, { signal: controller.signal }).then(async r => {
      if (!r.ok) return;
      const entry = await r.json() as Resume;
      if (!controller.signal.aborted) setResolvedResume({ query: resumeQuery, entry });
    }).catch(() => {});
    return () => controller.abort();
  }, [resumeQuery]);
  const plan = plans.find(p => p.id === active) ?? plans[0];
  const { questions: catalog, reload } = usePlanCatalog(plan?.exam ?? "");
  const pace = plan && catalog ? calculatePace(plan, catalog, attempts, today) : null;
  const weakCount = plan && catalog ? weakQuestions(catalog, plan.exam, attempts, stars).length : null;
  const postExam = !!plan?.examDate && plan.examDate < today;
  const examToday = plan?.examDate === today;
  const warning = plan && !plan.result && !postExam ? deadlineWarning(plan, today) : null;
  const item = items.find(i => i.key === plan?.exam);
  const resume = resolvedResume?.query === resumeQuery ? resolvedResume?.entry : undefined;
  const previousExam = resume ? study?.exam ?? resume.exam : study?.recent[0]?.[0];
  const previousItem = items.find(i => i.key === previousExam);
  const returning = Boolean(resume || previousItem);
  const firstVisit = !plan && !returning;
  const recentItems = new Map<string, { item: (typeof directoryItems)[number]; at: number }>();
  if (!plan && returning) {
    for (const [key, at] of study?.recent ?? []) {
      if (key === previousExam) continue;
      const displayKey = qualificationDisplayKey(key);
      const item = directoryItems.find(i => i.key === displayKey);
      if (item && !recentItems.has(displayKey)) recentItems.set(displayKey, { item, at });
      if (recentItems.size === 3) break;
    }
  }
  const initialExam = plan?.exam ?? planItems.find(i => i.key === previousExam)?.key ?? planItems[0]?.key ?? "";
  const completedToday = answersToday(attempts, today);
  const term = query.normalize("NFKC").trim();
  const picks = !term && firstVisit ? upcomingExamPicks(items.map(i => i.key), [], new Date(`${today}T00:00:00+09:00`)) : [];
  const matched = term ? searchQualifications(directoryItems, query, "home")
    : picks.map(pick => directoryItems.find(i => i.key === pick.key)!).filter(Boolean);
  function updatePlan(patch: Partial<PacePlan>) {
    if (!plan) return;
    if (!savePacePlan({ ...plan, ...patch, updatedAt: new Date().toISOString() })) setError("保存できませんでした。");
    else { setError(""); setSheet(null); }
  }
  const planDomain = domains.find(d => [...d.featured, ...d.compact].some(i => i.key === plan?.exam));
  const previousDomain = previousItem && domains.find(d => d.featured.includes(previousItem) || d.compact.includes(previousItem));
  function retryPlan(session?: ExamScheduleSession) {
    if (!plan) return;
    const fixedDate = session?.examDate && session.examDate >= today && session.datePrecision !== "month" &&
      (!session.examDateEnd || session.examDateEnd === session.examDate) ? session.examDate : undefined;
    openPrefilled({ exam: plan.exam, examDate: fixedDate, sessionId: session?.id });
  }
  const calendarConfirmation = created && <div className="mt-3 space-y-1 rounded-xl border border-border bg-card p-3">
    <p className="text-sm font-semibold" role="status">学習計画を作りました</p>
    <PlanCalendarButton plan={created} name={items.find(entry => entry.key === created.exam)?.name ?? created.exam} today={today} />
    <MobileInstallNudge placement="plan-created" />
  </div>;
  if (createOnLoad) return created ? <>
    {calendarConfirmation}
    <Link className="study-link mt-3" href="/">ホームで計画を見る</Link>
  </> : <PlanCreateSheet embedded open items={planItems} initialExam={initialExam}
    onOpenChange={() => {}} onCreated={setCreated} />;
  const search = <StudySearchField compact={!firstVisit} id="qualification-search" aria-label="資格名・略称で検索" aria-controls={term || firstVisit ? "home-qualification-results" : undefined} disabled={!ready} value={query} onChange={e => setQuery(e.target.value)} placeholder={firstVisit ? "受ける資格は？" : "ほかの資格をさがす"} />;
  return <>
    <Suspense><HomePlanReferral keys={referralKeys} onOpen={openPrefilled} /></Suspense>
    <section className={styles.stack} id="today" aria-label="今日の学習" aria-busy={!ready} data-home-state={!ready ? "loading" : postExam ? "post-exam" : plan ? "planned" : returning ? "returning" : "new"}>
      {plan ? (
        <div className={`${styles.hero} p3-landscape`}>
          <div className="flex items-start justify-between gap-2">
            <button className={`${styles.qualification} study-focus`} onClick={() => setSheet("switch")} aria-label="資格を切り替える" aria-describedby="home-qualification" aria-haspopup="dialog" aria-expanded={sheet === "switch"}><span id="home-qualification">{item?.name ?? plan.exam}</span><ChevronDown aria-hidden="true" className="size-4 shrink-0 text-muted-foreground" /></button>
            {plan.examDate && <span className="shrink-0 pt-3 text-[13px] text-muted-foreground tabular-nums"><time dateTime={plan.examDate}>{shortDate(plan.examDate)}</time> 受験</span>}
          </div>
          {plan.registration && <p className="text-[13px] text-muted-foreground">{plan.registration.label}</p>}
          {created?.id === plan.id && calendarConfirmation}
          {postExam && <h1 className="mt-2 text-2xl leading-tight font-bold">試験、おつかれさまでした</h1>}
          {examToday && <h1 className="mt-2 text-xl font-bold">試験は今日です</h1>}
          {pace?.total ? <>
            <p className="mt-2 text-sm text-muted-foreground">{pace.oldestYear}年度以降</p>
            <p className="mt-1 text-xl font-bold tabular-nums">正解済み {pace.mastered} / {pace.total}問</p>
            <PaceTrack runArt={qualificationRunArt(plan.exam, planDomain?.id)} mastered={pace.mastered} total={pace.total} stopped={postExam} />
            {!postExam && !examToday && !pace.complete && <>
              <p className="mt-2 text-sm text-muted-foreground">残り{pace.remaining}問{plan.examDate ? "・勉強日あと" + pace.studyDays + "日" : ""}</p>
              {pace.target !== null && <p className="mt-1 font-semibold">1回の目安　{pace.target}問正解</p>}
              {pace.nextWeekday !== null && !pace.scheduledToday && <p className="mt-1 text-sm">次の勉強日は{weekdayLabels[pace.nextWeekday]}曜日です</p>}
            </>}
            {pace.complete && <p className="mt-2 font-semibold">全{pace.total}問に正解しました</p>}
          </> : catalog === undefined ? <p role="status" className="py-4 text-sm">問題を読み込み中…</p> : catalog === null ? <>
            <p role="alert" className="py-2 text-sm">問題を読み込めませんでした</p>
            <button type="button" onClick={reload} className="study-link">再読み込み</button>
          </> : <>
            <p className="py-2 text-sm">{pace?.oldestYear === null && catalog.length ? "解く範囲を設定してください" : "計画に使える問題がありません"}</p>
            {catalog.length === 0 && <Link href="/search" className="study-link">資格を選ぶ</Link>}
          </>}
          {!postExam && !examToday && pace && !pace.complete && pace.total > 0 && (plan.examDate === null ?
            <><p className="mt-2 text-sm">受験日を設定してください</p><button type="button" onClick={() => setSheet("edit")} className="study-link">受験日を設定</button></> : pace.studyDays === 0 ?
            <><p className="mt-2 text-sm">試験前に勉強日がありません</p><button type="button" onClick={() => setSheet("edit")} className="study-link">勉強する日を変更</button></> : null)}
          {pace?.target != null && <Link className="study-primary mt-2" href={`/quiz/today?plan=${encodeURIComponent(plan.id)}`}>計画の問題を解く <ArrowRight aria-hidden="true" className="size-5 shrink-0" /></Link>}
          {postExam && <>
            {!plan.result && <div aria-label="結果を記録" role="group" className="mt-2 grid grid-cols-3 gap-2">
              {([["passed", "合格"], ["failed", "不合格"], ["absent", "受けなかった"]] as const).map(([result, label]) => (
                <Button key={result} variant="outline" className="min-h-12 border-input bg-card px-1" onClick={() => updatePlan({ result })}>{label}</Button>
              ))}
            </div>}
            <PostExamQualifications key={plan.exam} plan={plan} items={items} today={today} onRetry={retryPlan} />
          </>}
          <div className="mt-2 flex flex-wrap gap-x-4">
            <Link className="study-link" href={`/review?mode=weak&exam=${encodeURIComponent(plan.exam)}`}>苦手リスト{weakCount !== null && `（${weakCount}問）`}</Link>
            <Link className="study-link" href={item?.href ?? "/search"}>年度を選んで解く</Link>
            <button type="button" className="study-link" onClick={() => setSheet("edit")}>計画を変更</button>
          </div>
          <button type="button" onClick={() => setSheet("detail")} className="study-link">
            学習計画の詳細{warning ? '（申込締切 ' + (plan.registration?.deadline ? shortDate(plan.registration.deadline) : '') + '）' : ''}
          </button>
        </div>
      ) : returning ? <div className={`${styles.hero} p3-landscape`}>
        <p className="text-[13px] text-muted-foreground">おかえりなさい</p>
        <h1 className="mt-1 text-[26px] leading-tight font-bold wrap-anywhere">{resume?.name ?? previousItem?.name}</h1>
        <div className="mt-2 flex flex-wrap items-baseline gap-x-3 text-[13px] text-muted-foreground tabular-nums">
          {resume?.caption && <p>前回 {resume.caption}</p>}
          <p>今日 {completedToday}問</p>
        </div>
        <StartTrack runArt={qualificationRunArt(previousExam ?? "", previousDomain?.id)} />
        <Link className="study-primary mt-2" href={resume?.href ?? previousItem?.href ?? "/search"}>続きを解く <ArrowRight aria-hidden="true" className="size-5 shrink-0" /></Link>
        <button type="button" className="study-link" aria-haspopup="dialog" onClick={() => setSheet("create")}>学習計画を作る</button>
      </div> : (
        <div className={`${styles.hero} ${styles.first} p3-landscape`}>
          <h1 aria-label="今日も、ひと問ずつ。" className="text-[34px] leading-[1.18] font-bold">今日も、<br />ひと問ずつ。</h1>
          <div className="mt-3">{search}</div>
          <button type="button" disabled={!ready} aria-haspopup="dialog" aria-labelledby="home-start-track-description" className="study-focus mt-2 block w-full rounded-xl px-1 disabled:opacity-70" onClick={() => setSheet("create")}>
            <StartTrack runArt={qualificationRunArt(initialExam)} />
            <span id="home-start-track-description" className="block text-[13px] font-semibold underline underline-offset-4">学習計画を作る</span>
          </button>
          <p className="mt-2 text-center text-xs leading-relaxed tabular-nums">{domains.reduce((n, d) => n + d.qualificationCount, 0)}資格・{domains.reduce((n, d) => n + d.totalQuestions, 0).toLocaleString("ja-JP")}問・ログインなしで1日10問まで無料</p>
        </div>
      )}
      {!firstVisit && <div className="mt-3">{search}</div>}
      {!term && recentItems.size > 0 && <section className={styles.recent} aria-labelledby="home-recent-title">
        <h2 id="home-recent-title" className="mb-1.5 text-base font-bold">最近解いた資格</h2>
        <ul aria-labelledby="home-recent-title" className="p3-listed divide-y divide-hairline">
          {[...recentItems.values()].map(({ item, at }) => <li key={item.key}>
            <Link href={item.href} className="study-row study-focus px-3 hover:text-primary">
              <span className={styles.rowName}><span className="min-w-0 wrap-anywhere">{item.name}</span></span><span className="flex shrink-0 items-center gap-1 text-[13px] text-muted-foreground tabular-nums">{relativeStudyDate(at, today)}<ChevronRight aria-hidden="true" className="size-4" /></span>
            </Link>
          </li>)}
        </ul>
      </section>}
      {(term || firstVisit) && <section className={styles.upcoming} aria-labelledby="home-results-title">
        <h2 id="home-results-title" className="mb-1.5 text-base font-bold">{term ? "検索結果" : "試験が近い資格"}</h2>
        <ul id="home-qualification-results" aria-labelledby="home-results-title" className={matched.length ? "p3-listed divide-y divide-hairline" : undefined}>
          {matched.map(i => {
            const date = picks.find(pick => pick.key === i.key)?.next;
            return <li key={i.key}>
              <Link href={i.href} className="study-row study-focus px-3 hover:text-primary">
                <span className={styles.rowName}><span className="min-w-0 wrap-anywhere">{i.name}</span></span>
                <span className="flex max-w-[45%] items-center gap-1 text-right text-[13px] font-semibold text-muted-foreground tabular-nums">
                  {date && <time dateTime={date.date}>{i.children ? "直近 " : ""}{shortDate(date.date)}{date.endDate ? `〜${shortDate(date.endDate)}` : ""}{date.note ? `（${date.note}）` : ""}</time>}
                  <ChevronRight aria-hidden="true" className="size-4 shrink-0" />
                </span>
              </Link>
            </li>;
          })}
        </ul>
        {term && matched.length > 0 && <p role="status" className="sr-only">検索結果 {matched.length}件</p>}
        {term && !matched.length && <p role="status" className="py-4 text-sm text-muted-foreground">該当する資格が見つかりませんでした。</p>}
      </section>}
      {children && <div className={styles.room}>{children}</div>}
    </section>
    {error && <p role="alert" className="mt-3 text-sm text-destructive">{error}</p>}
    <PlanCreateSheet open={sheet === "create" || sheet === "edit"} editing={sheet === "edit" ? plan : undefined} onOpenChange={open => { if (!open) { setSheet(null); setPrefill(undefined); } }} items={planItems}
      initialExam={prefill?.exam ?? initialExam} initialDate={prefill?.examDate} initialSessionId={prefill?.sessionId}
      onCreated={saved => { if (sheet !== "edit") setCreated(saved); else setCreated(undefined); setActive(saved.id); refresh(); }} />
    <Sheet open={sheet === "switch"} onOpenChange={open => setSheet(open ? "switch" : null)}><SheetContent side="bottom" aria-describedby={undefined} className={`${styles.sheet} mx-auto max-h-[min(85dvh,calc(100dvh-var(--safe-top)-1rem))] max-w-[640px] overflow-y-auto pb-[max(1.5rem,var(--safe-bottom))]`}><SheetHeader><SheetTitle>受ける資格</SheetTitle></SheetHeader><div className="mt-5 space-y-2">
      {groupQualifications(plans, p => p.exam).map(row => {
        const planButton = (p: PacePlan, label: string) => <button key={p.id} type="button" onClick={() => { setActive(p.id); setSheet(null); }} className="flex min-h-12 w-full items-center justify-between rounded-xl bg-muted px-4 text-left text-sm"><span>{label}<span className="ml-2 text-xs text-muted-foreground">{p.examDate}</span></span>{plan?.id === p.id ? "✓" : ""}</button>;
        if ("item" in row) return planButton(row.item, items.find(i => i.key === row.item.exam)?.name ?? row.item.exam);
        return <details key={row.group.slug} className="rounded-xl border border-border px-3">
          <summary className="min-h-12 cursor-pointer py-3 text-sm font-medium">{qualificationGroupLabel(row.group, new Set(row.children.map(child => child.item.exam)).size)}</summary>
          <div className="space-y-2 pb-3">{row.children.map(({ item, label }) => planButton(item, label))}</div>
        </details>;
      })}
      <Button variant="outline" asChild className="min-h-12 w-full"><Link href="/me#study-progress">学習計画</Link></Button></div></SheetContent></Sheet>
    <Sheet open={sheet === "detail"} onOpenChange={open => { if (!open) setSheet(null); }}><SheetContent side="bottom" aria-describedby={undefined} className={`${styles.sheet} mx-auto max-h-[min(85dvh,calc(100dvh-var(--safe-top)-1rem))] max-w-[640px] overflow-y-auto pb-[max(1.5rem,var(--safe-bottom))]`}><SheetHeader><SheetTitle>学習計画</SheetTitle></SheetHeader>{plan && <div className="mt-5 space-y-4 text-sm"><p className="font-semibold">{item?.name ?? plan.exam}　{plan.registration?.label}</p><dl className="space-y-3">{[["申込開始", plan.registration?.start], ["申込締切", plan.registration?.deadline], ["試験日", plan.examDate], ["合格発表", plan.registration?.resultDate]].map(([label, value]) => <div key={label} className="flex justify-between gap-3"><dt className="text-muted-foreground">{label}</dt><dd>{value ?? "未発表"}{plan.registration?.estimated && label?.startsWith("申込") ? "（予定）" : ""}</dd></div>)}</dl>{plan.registration?.sourceUrl && <a href={plan.registration.sourceUrl} target="_blank" rel="noopener noreferrer" className="block min-h-11 py-3 underline">申込ページを開く（公式） ↗</a>}<details><summary className="min-h-11 cursor-pointer py-3 font-medium">申し込み・計画の変更</summary>{!plan.registered && <Button className="min-h-12 w-full" onClick={() => updatePlan({ registered: true })}>申込済みにする</Button>}<a href={`https://tsugino-shikaku.jp/${qualificationIdsForExam(plan.exam)[0] ? `shikaku/${qualificationIdsForExam(plan.exam)[0]}` : "calendar"}`} target="_blank" rel="noopener noreferrer" className="block py-3 underline">日程を次の資格で見る ↗</a><Link className="block py-3 underline" href="/me">学習の記録</Link><Button variant="outline" className="min-h-12 w-full" onClick={() => setSheet("edit")}>受ける回を変更</Button><button className="min-h-11 w-full text-destructive" onClick={() => { if (deletePacePlan(plan.id)) { setActive(""); setSheet(null); refresh(); } else setError("削除できませんでした。"); }}>計画を削除</button></details></div>}</SheetContent></Sheet>
  </>;
}
