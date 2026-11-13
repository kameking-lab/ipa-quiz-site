"use client";

import { useId, useLayoutEffect, useMemo, useState } from "react";
import { ArrowRight } from "lucide-react";
import type { HomeDirectoryItem, HomeDomainId } from "@/lib/home/home-directory";
import { frequentExamKeys, upcomingExamPicks, type FeaturedExamDate } from "@/lib/home/featured-exams";
import { createHistoryStore } from "@/lib/storage/history";
import { LS_KEYS } from "@/lib/storage/keys";
import { qualificationStudyArt } from "@/lib/home/study-room";
import { REFERENCE_ONLY_QUESTION_IDS } from "@/lib/questions/assessment";

export type QualificationCardItem = HomeDirectoryItem & { domainId: HomeDomainId };
const shortDate = (date: string) => `${Number(date.slice(5, 7))}/${Number(date.slice(8))}`;
export function QualificationCard({ item, onChoose, date }: { item: QualificationCardItem; onChoose: () => void; date?: FeaturedExamDate }) {
  return <a href={item.href} className={`study-qualification study-card-${item.domainId}`} onClick={onChoose}>
    <span className="min-w-0"><span className={`study-qualification-name${/[\s・]/u.test(item.name) ? " study-qualification-name-separated" : ""}`}>{item.name}</span><span className="study-qualification-meta">{item.questionCount.toLocaleString("ja-JP")}問{date ? <time className="study-qualification-date" dateTime={date.date} aria-label={`${date.date}${date.endDate ? `から${date.endDate}` : ""}${date.note ? `（${date.note}）` : " 試験"}`}> · {shortDate(date.date)}{date.endDate ? `〜${shortDate(date.endDate)}` : date.note ? `（${date.note}）` : " 試験"}</time> : <span className="study-qualification-period"> · {item.periodLabel}</span>}</span>
    </span>
    {/* eslint-disable-next-line @next/next/no-img-element */}
    <img aria-hidden="true" alt="" className="study-mascot study-card-mascot" src={qualificationStudyArt(item.key)} width={256} height={256} loading="lazy" decoding="async" />
    <ArrowRight aria-hidden="true" className="h-5 w-5 shrink-0" />
  </a>;
}

export function HomeFeaturedExams({ items, onChoose }: { items: readonly QualificationCardItem[]; onChoose: () => void }) {
  const id = useId();
  const keys = useMemo(() => items.filter(item => item.questionCount > 0).map(item => item.key), [items]);
  const aliases = useMemo(() => Object.fromEntries(items.flatMap(item =>
    (item.historyPrefixes ?? []).map(prefix => [prefix, item.key]))), [items]);
  const [snapshot, setSnapshot] = useState<{ personal: string[]; now: Date } | null>(null);
  useLayoutEffect(() => {
    const refresh = () => setSnapshot({ personal: frequentExamKeys(createHistoryStore().getAllEntries(), keys, aliases), now: new Date() });
    refresh();
    // Re-evaluate on history/BFCache return, tab activation and Japan midnight.
    const storage = (event: StorageEvent) => { if (event.key === null || event.key === LS_KEYS.history) refresh(); };
    const visible = () => { if (document.visibilityState === "visible") refresh(); };
    window.addEventListener("pageshow", refresh);
    window.addEventListener("popstate", refresh);
    window.addEventListener("focus", refresh);
    document.addEventListener("visibilitychange", visible);
    window.addEventListener("storage", storage);
    const timer = window.setInterval(refresh, 60_000);
    return () => {
      window.removeEventListener("pageshow", refresh);
      window.removeEventListener("popstate", refresh);
      window.removeEventListener("focus", refresh);
      document.removeEventListener("visibilitychange", visible);
      window.removeEventListener("storage", storage);
      window.clearInterval(timer);
    };
  }, [keys, aliases]);
  const personal = snapshot?.personal ?? [];
  const picks = upcomingExamPicks(keys, personal, snapshot?.now ?? new Date(0));
  const byKey = new Map(items.map(item => [item.key, item]));
  // The browser reserves exactly one or two rows while parsing, before paint.
  // No personal data enters HTML, URL, API, analytics or a new storage key.
  const reservation = `try{const e=document.getElementById(${JSON.stringify(id)});const h=JSON.parse(localStorage.getItem(${JSON.stringify(LS_KEYS.history)})||"null");e.dataset.personal=String((${frequentExamKeys.toString()})(h?.entries,${JSON.stringify(keys)},${JSON.stringify(aliases)},${JSON.stringify([...REFERENCE_ONLY_QUESTION_IDS])}).length>0)}catch{}`.replaceAll("<", "\\u003c");
  return <>
    <div id={id} className="study-pickups" data-ready={snapshot !== null} data-personal={personal.length > 0} suppressHydrationWarning>
      {personal.length > 0 && <section aria-labelledby={`${id}-personal`}><h3 id={`${id}-personal`} className="study-results-label">あなたの資格</h3>
        <ul className="study-results study-featured-results">{personal.map(key => <li key={key}><QualificationCard item={byKey.get(key)!} onChoose={onChoose} /></li>)}</ul>
      </section>}
      <section aria-labelledby={`${id}-upcoming`}><h3 id={`${id}-upcoming`} className="study-results-label">試験が近い資格</h3>
        <ul className="study-results study-featured-results">{picks.map(pick => <li key={pick.key}><QualificationCard item={byKey.get(pick.key)!} date={pick.next} onChoose={onChoose} /></li>)}</ul>
      </section>
    </div>
    <script suppressHydrationWarning type={typeof window === "undefined" ? "text/javascript" : "text/plain"} dangerouslySetInnerHTML={{ __html: reservation }} />
  </>;
}
