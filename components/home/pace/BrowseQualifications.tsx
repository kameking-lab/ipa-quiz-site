"use client";
import { useState } from "react";
import Link from "next/link";
import type { HomeDirectoryDomain } from "@/lib/home/home-directory";
import { HOME_EXAM_CALENDAR, upcomingExamPicks } from "@/lib/home/featured-exams";
export function BrowseQualifications({ domains }: { domains: readonly HomeDirectoryDomain[] }) {
  const [query, setQuery] = useState("");
  const items = domains.flatMap(d => [...d.featured, ...d.compact]);
  const matching = query ? items.filter(i => `${i.name}${i.abbr ?? ""}`.normalize("NFKC").toLowerCase().includes(query.normalize("NFKC").toLowerCase())) : [];
  const picks = upcomingExamPicks(items.map(i => i.key), [], new Date());
  const ranking = [...new Map(HOME_EXAM_CALENDAR.filter(r => r.candidates && r.candidatesSourceUrl && items.some(i => i.key === r.key)).map(r => [r.key, r])).values()].sort((a, b) => b.candidates! - a.candidates!).slice(0, 5);
  return <>
    <label className="block text-sm font-medium">資格名・略称で検索<input type="search" value={query} onChange={e => setQuery(e.target.value)} placeholder="宅建、FP3級、電験三種" className="mt-2 min-h-14 w-full rounded-2xl border border-border bg-background px-4 text-base" /></label>
    {query ? <ul className="mt-4 divide-y divide-border" aria-label="資格の検索結果">{matching.map(i => <li key={i.key}><Link className="flex min-h-12 items-center justify-between gap-3 py-3 text-sm" href={i.href}>{i.name}<span className="shrink-0 text-xs text-muted-foreground">{i.questionCount}問 ›</span></Link></li>)}{!matching.length && <li role="status" className="py-4 text-sm">該当する資格が見つかりませんでした。</li>}</ul> : <>
      <section className="mt-7"><h2 className="text-sm font-semibold">試験が近い資格</h2><ul className="mt-2 divide-y divide-border">{picks.map(p => { const i = items.find(i => i.key === p.key)!; return <li key={i.key}><Link href={i.href} className="flex min-h-12 items-center justify-between gap-3 py-3 text-sm">{i.name}<span className="text-xs text-muted-foreground">{p.next?.date ?? ""} ›</span></Link></li>; })}</ul></section>
      <section id="home-directory-title" className="mt-7 scroll-mt-20"><h2 className="mb-3 text-sm font-semibold">分野から探す</h2><div className="space-y-2">{domains.map(d => <details key={d.id} className="rounded-2xl border border-border px-4"><summary className="cursor-pointer py-4 text-sm font-medium">{d.title}<span className="ml-3 text-xs text-muted-foreground">{d.qualificationCount}資格・区分</span></summary><ul className="divide-y divide-border">{[...d.featured, ...d.compact].map(i => <li key={i.key}><Link className="flex min-h-12 items-center justify-between gap-3 py-3 text-sm" href={i.href}>{i.name}<span className="shrink-0 text-xs text-muted-foreground">{i.questionCount}問 ›</span></Link></li>)}</ul></details>)}</div></section>
      <section className="mt-7"><h2 className="text-sm font-semibold">人気ランキング <span className="font-normal text-muted-foreground">受験者数</span></h2><ol className="mt-2 divide-y divide-border">{ranking.map((r, index) => { const item = items.find(i => i.key === r.key)!; return <li key={r.key} className="flex items-center gap-3 py-3 text-sm"><span className="text-muted-foreground">{index + 1}</span><Link href={item.href} className="flex-1 py-2">{item.name}</Link><a href={r.candidatesSourceUrl} target="_blank" rel="noopener noreferrer" aria-label={`${item.name}の受験者数の公式出典`} className="py-2 text-xs text-muted-foreground underline">{r.candidates!.toLocaleString("ja-JP")}人</a></li>; })}</ol></section>
    </>}
  </>;
}
