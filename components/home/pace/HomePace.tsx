"use client";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronDown, ChevronRight, Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import type { HomeDirectoryDomain } from "@/lib/home/home-directory";
import { groupHomeDirectoryItems } from "@/lib/home/grouped-directory";
import { calculatePace, refreshThinRange, type AnswerAttempt, type PacePlan } from "@/lib/study-plan/pace";
import { listPacePlans, savePacePlan, deletePacePlan } from "@/lib/study-plan/pace-storage";
import { answersToday, deadlineWarning, shouldShowPaceOffer, type PaceOffer } from "@/lib/study-plan/home";
import { paceAttempts, loadPlanCatalog } from "@/lib/study-plan/client";
import { historyExamLookup, japanDate, upcomingExamPicks } from "@/lib/home/featured-exams";
import { readHomeStudy, relativeStudyDate } from "@/lib/home/recent-study";
import { LS_KEYS } from "@/lib/storage/keys";
import { qualificationRunArt, qualificationStudyArt } from "@/lib/home/study-room";
import { passingLineForExam } from "@/lib/study-plan/policy";
import { qualificationIdsForExam } from "@/lib/study-plan/schedule";
import { searchQualifications } from "@/lib/qualifications/search";
import { groupQualifications, qualificationGroupLabel } from "@/lib/qualifications/groups";
import { PRICE_PAGE_LINK } from "@/lib/billing/price-page-link";
import { PlanCreateSheet } from "./PlanCreateSheet";
import { PaceTrack, StartTrack } from "./PaceTrack";
import styles from "./HomePace.module.css";

interface Resume { exam: string; name: string; href: string; caption: string }
const nextExamKeys: Record<string, string> = { ip: "fe", fe: "ap", fp3: "fp2", fp2: "fp1", denko2: "denko1", denken3: "denken2", denken2: "denken1" };
const shortDate = (date: string) => `${Number(date.slice(5, 7))}/${Number(date.slice(8))}`;
function readOffer(): PaceOffer {
  try { const value = JSON.parse(localStorage.getItem(LS_KEYS.paceOffer) ?? "{}"); return {
    shownOn: typeof value?.shownOn === "string" ? value.shownOn : undefined,
    dismissedOn: typeof value?.dismissedOn === "string" ? value.dismissedOn : undefined,
  }; } catch { return {}; }
}
function storeOffer(value: PaceOffer) { try { localStorage.setItem(LS_KEYS.paceOffer, JSON.stringify(value)); return true; } catch { return false; } }

export function HomePace({ domains, planExamKeys, createOnLoad = false }: {
  domains: readonly HomeDirectoryDomain[]; planExamKeys: readonly string[]; createOnLoad?: boolean;
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
  const [sheet, setSheet] = useState<"create" | "switch" | "detail" | null>(null);
  const [query, setQuery] = useState("");
  const [paid, setPaid] = useState<boolean | null>(null);
  const [offerVisibleOn, setOfferVisibleOn] = useState("");
  const [error, setError] = useState("");
  const offerClaimed = useRef("");
  const refresh = useCallback(() => {
    const history = paceAttempts();
    setPlans(listPacePlans()); setAttempts(history); setToday(japanDate(new Date())); setReady(true);
    setStudy(readHomeStudy(history, examFor));
  }, [examFor]);
  useEffect(() => {
    refresh();
    const visible = () => { if (document.visibilityState === "visible") refresh(); };
    window.addEventListener("study-plan:changed", refresh); window.addEventListener("storage", refresh);
    window.addEventListener("pageshow", refresh); window.addEventListener("focus", refresh);
    document.addEventListener("visibilitychange", visible);
    const timer = window.setInterval(refresh, 60_000);
    return () => { window.removeEventListener("study-plan:changed", refresh); window.removeEventListener("storage", refresh);
      window.removeEventListener("pageshow", refresh); window.removeEventListener("focus", refresh);
      document.removeEventListener("visibilitychange", visible); window.clearInterval(timer); };
  }, [refresh]);
  useEffect(() => {
    const controller = new AbortController();
    void fetch("/api/billing/status", { signal: controller.signal, cache: "no-store" })
      .then(async r => { if (r.status === 401) return { entitled: false }; if (!r.ok) throw new Error(); return await r.json() as { entitled?: boolean }; })
      .then(data => { if (!controller.signal.aborted) setPaid(data.entitled === true); }).catch(() => {});
    return () => controller.abort();
  }, []);
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
  useEffect(() => {
    if (!plan) return;
    const controller = new AbortController();
    void loadPlanCatalog(plan.exam, controller.signal).then(catalog => {
      const updated = refreshThinRange(plan, catalog, today);
      if (updated !== plan) savePacePlan(updated);
    }).catch(() => {});
    return () => controller.abort();
  }, [plan, today]);
  useEffect(() => {
    if (!plan || paid === null || offerClaimed.current === today) return;
    const offer = readOffer();
    if (shouldShowPaceOffer(plan, attempts, today, paid, offer) && storeOffer({ ...offer, shownOn: today })) {
      offerClaimed.current = today; setOfferVisibleOn(today);
    }
  }, [plan, attempts, today, paid]);
  const pace = plan ? calculatePace(plan, attempts, today) : null;
  const postExam = (pace?.daysRemaining ?? 0) < 0;
  const warning = plan && !plan.result && (pace?.daysRemaining === null || (pace?.daysRemaining ?? -1) >= 0) ? deadlineWarning(plan, today) : null;
  const item = items.find(i => i.key === plan?.exam);
  const resume = resolvedResume?.query === resumeQuery ? resolvedResume?.entry : undefined;
  const previousExam = resume ? study?.exam ?? resume.exam : study?.recent[0]?.[0];
  const previousItem = items.find(i => i.key === previousExam);
  const returning = Boolean(resume || previousItem);
  const firstVisit = !plan && !returning;
  const recentItems = !plan && returning ? (study?.recent ?? []).flatMap(([key, at]) => {
    const item = key === previousExam ? undefined : items.find(i => i.key === key);
    return item ? [{ item, at }] : [];
  }).slice(0, 3) : [];
  const initialExam = plan?.exam ?? planItems.find(i => i.key === previousExam)?.key ?? planItems[0]?.key ?? "";
  const completedToday = answersToday(attempts, today, plan ? new Set(plan.range.questionIds) : undefined);
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
  const nextExam = plan?.result === "passed"
    ? items.find(i => i.key === nextExamKeys[plan.exam])
      ?? [...(planDomain?.featured ?? []), ...(planDomain?.compact ?? [])].find(i => i.key !== plan.exam && i.questionCount > 0)
      ?? items.find(i => i.key !== plan.exam && i.questionCount > 0)
    : undefined;
  if (createOnLoad) return <PlanCreateSheet embedded open items={planItems} initialExam={initialExam}
    onOpenChange={() => {}} onCreated={() => router.push("/")} />;
  return <>
    <section id="today" aria-label="今日の学習" aria-busy={!ready} data-home-state={!ready ? "loading" : postExam ? "post-exam" : plan ? "planned" : returning ? "returning" : "new"}>
      {plan && pace ? (
        <div className={`${styles.content} overflow-hidden rounded-2xl border border-border bg-card`}>
          <div className="flex items-center justify-between gap-2">
            <button className={styles.qualification} onClick={() => setSheet("switch")} aria-label="資格を切り替える" aria-describedby="home-qualification" aria-haspopup="dialog" aria-expanded={sheet === "switch"}><span id="home-qualification">{item?.name ?? plan.exam}</span><ChevronDown aria-hidden="true" className="size-4 shrink-0 text-muted-foreground" /></button>
            {plan.examDate && <span className="shrink-0 text-xs text-muted-foreground"><time dateTime={plan.examDate}>{shortDate(plan.examDate)}</time> 受験</span>}
          </div>
          {plan.registration && <p className="text-xs text-muted-foreground">{plan.registration.label}</p>}
          {postExam ? <div className="py-6 text-center">
            {!plan.result ? <>
              <h1 className="text-xl font-bold">試験、おつかれさまでした</h1>
              <div className="mt-6 grid grid-cols-3 gap-2">
                {([['passed', '合格'], ['failed', '不合格'], ['absent', '受けなかった']] as const).map(([result, label]) => (
                  <Button key={result} variant={result === "passed" ? "default" : "outline"} className="min-h-12 px-1" onClick={() => updatePlan({ result })}>{label}</Button>
                ))}
              </div>
            </> : plan.result === "passed" ? <>
              <span className="text-4xl" aria-hidden="true">🎉</span>
              <h1 className="mt-3 text-2xl font-bold">合格おめでとう！</h1>
              <PaceDog exam={plan.exam} />
              <Link className="mt-4 inline-flex min-h-11 items-center underline" href={nextExam?.href ?? "/search"}>
                {nextExam ? `次は ${nextExam.name}へ` : "次の資格を選ぶ"}
              </Link>
            </> : <Button className="min-h-12 w-full" aria-haspopup="dialog" onClick={() => setSheet("create")}>学習計画を作成</Button>}
          </div> : <>
            <h1 className={`${styles.countdown} font-display`} aria-label={pace.daysRemaining === null ? "受験日未設定" : undefined}>試験まで <span>{pace.daysRemaining ?? "—"}</span> 日</h1>
            <PaceTrack plan={plan} runArt={qualificationRunArt(plan.exam, planDomain?.id)} percent={pace.percent} target={pace.idealPercent} />
            <div className="mt-2 flex items-center justify-between gap-2">
              <p className={`rounded-full px-3 py-1 text-sm font-bold ${pace.judgment === "behind" ? "bg-warning-soft text-warning-soft-foreground" : pace.judgment === "unscheduled" ? "bg-muted text-muted-foreground" : "bg-success-soft text-success-soft-foreground"}`}>{pace.judgment === "ahead" ? "いいペース" : pace.judgment === "behind" ? "少し遅れ" : pace.judgment === "unscheduled" ? "日程未設定" : "予定どおり"}</p>
              <p className="text-xs text-muted-foreground">今日 {completedToday}問</p>
            </div>
            {pace.requiredQuestionsPerDay !== null && <p className="mt-3 text-sm">{pace.requiredQuestionsPerDay === 0 ? "すべての問題を仕上げました" : <>1日 <strong className="font-display text-xl font-bold tabular-nums">{pace.requiredQuestionsPerDay}</strong> 問</>}</p>}
            <Button asChild size="xl" className="mt-3 w-full"><Link href={`/quiz/today?plan=${encodeURIComponent(plan.id)}`}>今日の問題を解く <span aria-hidden="true">→</span></Link></Button>
            {offerVisibleOn === today && paid === false && pace.judgment === "behind" && (pace.requiredQuestionsPerDay ?? 0) > 10 && <div className="mt-3 flex items-center gap-2 border-t border-border pt-1 text-xs"><Link href={PRICE_PAGE_LINK.href} className="flex min-h-11 flex-1 items-center leading-relaxed text-primary underline-offset-4 hover:underline">1日{pace.requiredQuestionsPerDay}問必要です。月額プランなら回数無制限で追いつけます</Link><button aria-label="月額プランの案内を閉じる" className="flex min-h-11 min-w-11 items-center justify-center rounded-lg text-muted-foreground hover:bg-muted" onClick={() => { storeOffer({ ...readOffer(), dismissedOn: today }); setOfferVisibleOn(""); }}><X className="size-4" /></button></div>}
          </>}
          <button type="button" onClick={() => setSheet("detail")} className="min-h-11 text-sm underline underline-offset-4">
            学習計画の詳細{warning ? '（申込締切 ' + (plan.registration?.deadline ? shortDate(plan.registration.deadline) : '') + '）' : ''}
          </button>
        </div>
      ) : returning ? <div className={`${styles.content} rounded-2xl border border-border bg-card`}>
        <p className="text-xs text-muted-foreground">おかえりなさい</p>
        <h1 className="mt-1 text-base font-bold">{resume?.name ?? previousItem?.name}</h1>
        <div className="mt-1 flex flex-wrap items-baseline gap-x-3 text-xs text-muted-foreground">
          {resume?.caption && <p>前回 {resume.caption}</p>}
          <p>今日 {completedToday}問</p>
        </div>
        <StartTrack runArt={qualificationRunArt(previousExam ?? "", previousDomain?.id)} />
        <Button asChild size="xl" className="mt-2 w-full"><Link href={resume?.href ?? previousItem?.href ?? "/search"}>続きを解く <span aria-hidden="true">→</span></Link></Button>
        <button type="button" className="mx-auto flex min-h-11 items-center px-2 text-sm text-primary underline underline-offset-4" aria-haspopup="dialog" onClick={() => setSheet("create")}>試験日を決める</button>
      </div> : (
        <div className="flex items-center justify-between gap-4 pt-3">
          <h1 aria-label="今日も、ひと問ずつ。" className="font-display text-[28px] font-bold leading-snug sm:text-4xl">今日も、<br />ひと問ずつ。</h1>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/mascot/chihuahua-guide.webp" alt="" width={80} height={80} className="size-20 object-contain sm:size-[88px]" />
        </div>
      )}
      {!postExam && <label className={`${styles.search} mt-3 flex min-h-[54px] items-center gap-3 rounded-xl border border-input bg-card px-4`}><Search aria-hidden="true" className="size-5 shrink-0 text-muted-foreground" /><input id="qualification-search" aria-label="資格名・略称で検索" aria-controls={term || firstVisit ? "home-qualification-results" : undefined} disabled={!ready} type="search" value={query} onChange={e => setQuery(e.target.value)} placeholder={firstVisit ? "受ける資格は？" : "ほかの資格をさがす"} className="w-full min-w-0 bg-transparent py-3 text-base outline-none" /></label>}
      {!postExam && (term || firstVisit) && <>
        <h2 id="home-results-title" className="mb-2 mt-3 text-xs text-muted-foreground">{term ? "検索結果" : "試験が近い資格"}</h2>
        <ul id="home-qualification-results" aria-labelledby="home-results-title" className="space-y-1.5">{matched.map(i => {
          const date = picks.find(pick => pick.key === i.key)?.next;
          return <li key={i.key}><Link href={i.href} className={`${styles.result} rounded-lg border border-border bg-card px-3`}><span>{i.name}</span><span className="flex shrink-0 items-center gap-1 text-xs text-muted-foreground">{date && <time dateTime={date.date}>{i.children ? "直近 " : ""}{shortDate(date.date)}{date.endDate ? `〜${shortDate(date.endDate)}` : ""}{date.note ? `（${date.note}）` : ""}</time>}<ChevronRight aria-hidden="true" className="size-4" /></span></Link></li>;
        })}</ul>
        {term && matched.length > 0 && <p role="status" className="sr-only">検索結果 {matched.length}件</p>}
        {term && !matched.length && <p role="status" className="py-4 text-sm text-muted-foreground">該当する資格が見つかりませんでした。</p>}
      </>}
      {firstVisit && <>
        <button type="button" disabled={!ready} aria-haspopup="dialog" aria-labelledby="home-start-track-description" className="mt-2 block w-full rounded-2xl border border-dashed border-input bg-card px-3 py-1.5 hover:bg-muted disabled:opacity-50" onClick={() => setSheet("create")}>
          <StartTrack runArt={qualificationRunArt(initialExam)} />
          <span id="home-start-track-description" className="block text-xs text-primary">試験日を決めると、チワワが走り出す</span>
        </button>
        <p className="mt-3 text-center text-xs leading-relaxed text-muted-foreground">{domains.reduce((n, d) => n + d.qualificationCount, 0)}資格・{domains.reduce((n, d) => n + d.totalQuestions, 0).toLocaleString("ja-JP")}問・ログインなしで1日10問まで無料</p>
      </>}
      {recentItems.length > 0 && <>
        <h2 id="home-recent-title" className="mb-2 mt-3 text-xs text-muted-foreground">最近解いた資格</h2>
        <ul aria-labelledby="home-recent-title" className="space-y-1.5">
          {recentItems.map(({ item, at }) => <li key={item.key}>
            <Link href={item.href} className={`${styles.result} rounded-lg border border-border bg-card px-3`}>
              <span>{item.name}</span><span className="flex shrink-0 items-center gap-1 text-xs text-muted-foreground">{relativeStudyDate(at, today)}<ChevronRight aria-hidden="true" className="size-4" /></span>
            </Link>
          </li>)}
        </ul>
      </>}
    </section>
    {error && <p role="alert" className="mt-3 text-sm text-destructive">{error}</p>}
    <PlanCreateSheet open={sheet === "create"} onOpenChange={open => setSheet(open ? "create" : null)} items={planItems} initialExam={initialExam} onCreated={id => { setActive(id); refresh(); }} />
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
    <Sheet open={sheet === "detail"} onOpenChange={open => { if (!open) setSheet(null); }}><SheetContent side="bottom" aria-describedby={undefined} className={`${styles.sheet} mx-auto max-h-[min(85dvh,calc(100dvh-var(--safe-top)-1rem))] max-w-[640px] overflow-y-auto pb-[max(1.5rem,var(--safe-bottom))]`}><SheetHeader><SheetTitle>学習計画</SheetTitle></SheetHeader>{plan && <div className="mt-5 space-y-4 text-sm"><p className="font-semibold">{item?.name ?? plan.exam}　{plan.registration?.label}</p><dl className="space-y-3">{[["申込開始", plan.registration?.start], ["申込締切", plan.registration?.deadline], ["試験日", plan.examDate], ["合格発表", plan.registration?.resultDate]].map(([label, value]) => <div key={label} className="flex justify-between gap-3"><dt className="text-muted-foreground">{label}</dt><dd>{value ?? "未発表"}{plan.registration?.estimated && label?.startsWith("申込") ? "（予定）" : ""}</dd></div>)}</dl>{plan.registration?.sourceUrl && <a href={plan.registration.sourceUrl} target="_blank" rel="noopener noreferrer" className="block min-h-11 py-3 underline">申込ページを開く（公式） ↗</a>}<details><summary className="min-h-11 cursor-pointer py-3 font-medium">申し込み・計画の変更</summary>{!plan.registered && <Button className="min-h-12 w-full" onClick={() => updatePlan({ registered: true })}>申込済みにする</Button>}<a href={`https://tsugino-shikaku.jp/${qualificationIdsForExam(plan.exam)[0] ? `shikaku/${qualificationIdsForExam(plan.exam)[0]}` : "calendar"}`} target="_blank" rel="noopener noreferrer" className="block py-3 underline">日程を次の資格で見る ↗</a><p>今日 {completedToday}問 · {Math.round(pace?.percent ?? 0)}%</p>{passingLineForExam(plan.exam).sourceUrl && <a className="block underline" href={passingLineForExam(plan.exam).sourceUrl!} target="_blank" rel="noopener noreferrer">合格基準（公式）</a>}{passingLineForExam(plan.exam).conditions && <p className="text-xs text-muted-foreground">{passingLineForExam(plan.exam).conditions}</p>}<Link className="block py-3 underline" href="/me">学習の記録</Link><Button variant="outline" className="min-h-12 w-full" onClick={() => setSheet("create")}>受ける回を変更</Button><button className="min-h-11 w-full text-destructive" onClick={() => { if (deletePacePlan(plan.id)) { setActive(""); setSheet(null); refresh(); } else setError("削除できませんでした。"); }}>計画を削除</button></details></div>}</SheetContent></Sheet>
  </>;
}
function PaceDog({ exam }: { exam: string }) {
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={qualificationStudyArt(exam)} onError={e => { if (!e.currentTarget.src.endsWith("/mascot/chihuahua-study.webp")) e.currentTarget.src = "/mascot/chihuahua-study.webp"; }} alt="チワワ" width={80} height={80} className="mx-auto size-20 object-contain motion-safe:animate-[bounce_2s_infinite]" />;
}
