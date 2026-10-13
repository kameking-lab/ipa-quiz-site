
"use client";

import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import type { HomeDirectoryDomain } from "@/lib/home/home-directory";
import { buildPersonalPriority, type PersonalPriority } from "@/lib/home/home-personal-priority";
import { createHistoryStore } from "@/lib/storage/history";
import { getDueCards } from "@/lib/learning/spaced-repetition";
import { listExamLearningSummaries } from "@/lib/exam-library-session";
import { readSettings } from "@/lib/storage/settings";

export function HomeDirectory({ domains }: { domains: readonly HomeDirectoryDomain[] }) {
  const [personal, setPersonal] = useState<PersonalPriority[]>([]);
  useEffect(() => {
    try {
      if (!readSettings().recordHistory) {
        setPersonal([]);
        return;
      }
      const now = Date.now();
      setPersonal(buildPersonalPriority(domains, {
        history: createHistoryStore().getAllEntries(),
        due: getDueCards(now),
        papers: listExamLearningSummaries(),
      }, now));
    } catch {
      // Malformed or unavailable local storage must not hide the full directory.
      setPersonal([]);
    }
  }, [domains]);
  const priorityByKey = new Map(personal.map((priority, index) => [priority.item.key, index]));
  const personalTop = personal.slice(0, 4);
  return <section aria-labelledby="home-directory-title" className="study-directory">
    <div className="study-section-head"><h2 id="home-directory-title">収録資格</h2><p>収録済みの問題・公開回を確認する</p></div>
    <p className="study-directory-intro">ジャンルごとの収録資格を、操作せずこのページで全件確認できます。名前を選ぶと問題一覧へ進みます。</p>
    {personalTop.length > 0 && <section aria-labelledby="home-personal-title" className="study-domain">
      <div className="study-domain-heading"><h3 id="home-personal-title">あなたの学習</h3></div>
      <ul className="study-directory-list">{personalTop.map(({ item, dueCount }) => <li key={item.key}><a href={item.href}><span className="min-w-0"><span className="block font-medium">{item.name}</span><span className="mt-1 block text-xs opacity-70">{dueCount > 0 ? `今日の復習 ${dueCount}問` : "最近学習した資格"}</span></span><ArrowRight aria-hidden="true" className="h-4 w-4 shrink-0" /></a></li>)}</ul>
    </section>}
    <div>{domains.map((domain) => <section key={domain.id} id={`domain-${domain.id}`} aria-labelledby={`domain-${domain.id}-title`} className="study-domain scroll-mt-24">
      <div className="study-domain-heading"><h3 id={`domain-${domain.id}-title`}>{domain.title}</h3><span>{domain.qualificationCount}資格・区分</span></div>
      <ul className="study-directory-list">{[...domain.featured, ...domain.compact].sort((a, b) => (priorityByKey.get(a.key) ?? Infinity) - (priorityByKey.get(b.key) ?? Infinity)).map((item) => <li key={item.key}><a href={item.href}><span className="min-w-0"><span className="block font-medium">{item.name}</span>{item.extra && <span className="mt-1 block text-xs opacity-70">{item.extra}</span>}</span><span className="study-directory-count">{item.questionCount.toLocaleString("ja-JP")}問<span className="block text-xs">{item.periodLabel}</span></span><ArrowRight aria-hidden="true" className="h-4 w-4 shrink-0" /></a></li>)}</ul>
      <a href={domain.allHref} className="study-text-link">{domain.allLabel}<ArrowRight aria-hidden="true" className="h-4 w-4" /></a>
    </section>)}</div>
    <p className="study-footnote">問題数は現在開いて解ける収録分です。公式問題・解答の出典は、各問題で確認できます。</p>
  </section>;
}
