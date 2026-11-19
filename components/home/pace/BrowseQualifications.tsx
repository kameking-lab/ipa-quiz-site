"use client";
import { useState } from "react";
import Link from "next/link";
import type { HomeDirectoryDomain } from "@/lib/home/home-directory";
import { upcomingExamPicks } from "@/lib/home/featured-exams";
export function BrowseQualifications({ domains, challengeExamCodes }: {
  domains: readonly HomeDirectoryDomain[];
  challengeExamCodes?: readonly string[];
}) {
  const [query, setQuery] = useState("");
  const items = domains.flatMap(d => [...d.featured, ...d.compact]);
  const matching = query ? items.filter(i => `${i.name}${i.abbr ?? ""}`.normalize("NFKC").toLowerCase().includes(query.normalize("NFKC").toLowerCase())) : [];
  function qualificationHref(item: (typeof items)[number]) {
    return challengeExamCodes?.includes(item.key)
      ? "/challenge?" + new URLSearchParams({ exam: item.key })
      : item.href;
  }
  const picks = upcomingExamPicks(items.map(i => i.key), [], new Date());
  return <>
    <label className="block text-sm font-medium">資格名・略称で検索<input type="search" value={query} onChange={e => setQuery(e.target.value)} placeholder="宅建、FP3級、電験三種" className="mt-2 min-h-14 w-full rounded-2xl border border-border bg-background px-4 text-base" /></label>
    {query ? <ul className="mt-4 divide-y divide-border" aria-label="資格の検索結果">{matching.map(i => <li key={i.key}><Link className="flex min-h-12 items-center justify-between gap-3 py-3 text-sm" href={qualificationHref(i)}>{i.name}<span className="shrink-0 text-xs text-muted-foreground">{i.questionCount}問 ›</span></Link></li>)}{!matching.length && <li role="status" className="py-4 text-sm">該当する資格が見つかりませんでした。</li>}</ul> : <>
      <section className="mt-7"><h2 className="text-sm font-semibold">試験が近い資格</h2><ul className="mt-2 divide-y divide-border">{picks.map(p => { const i = items.find(i => i.key === p.key)!; return <li key={i.key}><Link href={qualificationHref(i)} className="flex min-h-12 items-center justify-between gap-3 py-3 text-sm">{i.name}<span className="text-xs text-muted-foreground">{p.next?.date ?? ""} ›</span></Link></li>; })}</ul></section>
      <section id="home-directory-title" className="mt-7 scroll-mt-20"><h2 className="mb-3 text-sm font-semibold">分野から探す</h2><div className="space-y-2">{domains.map(d => <details key={d.id} id={`domain-${d.id}`} className="rounded-2xl border border-border px-4"><summary className="cursor-pointer py-4 text-sm font-medium">{d.title}<span className="ml-3 text-xs text-muted-foreground">{d.qualificationCount}資格・区分</span></summary><ul className="divide-y divide-border">{[...d.featured, ...d.compact].map(i => <li key={i.key}><Link className="flex min-h-12 items-center justify-between gap-3 py-3 text-sm" href={qualificationHref(i)}>{i.name}<span className="shrink-0 text-xs text-muted-foreground">{i.questionCount}問 ›</span></Link></li>)}</ul><Link href={d.allHref} className="block py-4 text-sm underline">{d.allLabel} ›</Link></details>)}</div></section>
    </>}
  </>;
}
