"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, Search, X } from "lucide-react";
import type { HomeDirectoryDomain, HomeDomainId } from "@/lib/home/home-directory";
import { DOMAIN_THEME } from "./domain-theme";
import { cn } from "@/lib/utils";

function normalize(value: string): string {
  return value.normalize("NFKC").toLowerCase().replace(/\s/g, "");
}

/** Only directory metadata is sent to the client; question content stays on its existing routes. */
export function HomeQualificationFinder({ domains, directoryHref = "#home-directory-title" }: { domains: readonly HomeDirectoryDomain[]; directoryHref?: string }) {
  const [query, setQuery] = useState("");
  const [domainId, setDomainId] = useState<HomeDomainId | null>(null);
  const items = useMemo(() => domains.flatMap((domain) =>
    [...domain.featured, ...domain.compact].map((item) => ({ ...item, domainId: domain.id, domainTitle: domain.title }))), [domains]);
  const term = normalize(query);
  const matching = items.filter((item) => (!domainId || item.domainId === domainId) &&
    (!term || normalize([item.name, item.abbr, item.sub, item.domainTitle].join(" ")).includes(term)));
  const browsing = !term && !domainId;
  const visible = browsing ? items.filter((item) => ["ip", "fe", "eisei1", "denko2", "civil2", "fp3"].includes(item.key)) : matching;

  return (
    <section id="choose-qualification" aria-labelledby="qualification-search-title" className="relative scroll-mt-20 rounded-3xl border border-border bg-card p-4 shadow-sm sm:p-6">
      <div className="mb-4 flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-bold tracking-wide text-primary">YOUR NEXT QUESTION</p>
          <h2 id="qualification-search-title" className="mt-1 text-xl font-bold tracking-tight">学びたい資格は？</h2>
          <p className="mt-1 text-xs text-muted-foreground">資格を選んで、まずは1問。登録せずに始められます。</p>
        </div>
        <span className="shrink-0 whitespace-nowrap rounded-full bg-primary-soft px-3 py-1 text-xs font-semibold text-primary-soft-foreground">無料</span>
      </div>
      <label htmlFor="qualification-search" className="sr-only">資格名・略称で検索</label>
      <div className="relative">
        <Search aria-hidden="true" className="pointer-events-none absolute left-3.5 top-3.5 h-5 w-5 text-muted-foreground" />
        <input id="qualification-search" type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="資格名・略称（例：FP、衛生）" className="h-12 w-full rounded-xl border border-border bg-background text-foreground dark:bg-zinc-950 dark:text-zinc-100 pl-11 pr-11 text-sm outline-none transition placeholder:text-zinc-600 dark:placeholder:text-zinc-300 focus:border-primary focus:ring-4 focus:ring-primary/15" />
        {query && <button type="button" aria-label="検索をクリア" onClick={() => setQuery("")} className="absolute right-0 top-0 flex h-12 w-11 items-center justify-center text-muted-foreground hover:text-foreground"><X aria-hidden="true" className="h-4 w-4" /></button>}
      </div>
      <div aria-label="資格の分野で絞り込む" className="mt-3 flex flex-wrap gap-1.5">
        <button type="button" aria-pressed={!domainId} onClick={() => setDomainId(null)} className={cn("min-h-11 rounded-full border px-3 text-xs font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary", !domainId ? "border-primary bg-primary text-primary-foreground" : "border-border bg-background text-foreground hover:bg-muted dark:bg-zinc-950 dark:text-zinc-100")}>すべて</button>
        {domains.map((domain) => <button key={domain.id} type="button" aria-pressed={domainId === domain.id} onClick={() => setDomainId(domain.id)} className={cn("min-h-11 rounded-full border px-3 text-xs font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary", domainId === domain.id ? "border-primary bg-primary text-primary-foreground" : "border-border hover:bg-muted")}>{domain.title}</button>)}
      </div>
      <p role="status" aria-live="polite" className="mb-2 mt-4 text-xs text-muted-foreground">{browsing ? "資格から始める" : matching.length + "資格・区分が見つかりました"}</p>
      {visible.length > 0 ? <ul className="grid gap-2 sm:grid-cols-2">
        {visible.map((item) => {
          const Icon = DOMAIN_THEME[item.domainId].icon;
          return <li key={item.key}><Link href={item.href} className="group flex min-h-20 items-center gap-3 rounded-xl border border-border bg-background text-foreground dark:bg-zinc-950 dark:text-zinc-100 p-3 transition hover:border-primary/50 hover:bg-primary-soft/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
            <span className={cn("flex h-10 w-10 shrink-0 items-center justify-center rounded-xl", DOMAIN_THEME[item.domainId].tile)}><Icon aria-hidden="true" className="h-5 w-5" /></span>
            <span className="min-w-0 flex-1"><span className="block text-sm font-bold leading-snug">{item.name}</span><span className="mt-1 block text-xs text-muted-foreground">{item.abbr ? item.abbr + " · " : ""}{item.questionCount.toLocaleString("ja-JP")}問 · {item.periodLabel}</span>{item.sub && <span className="mt-0.5 block text-[11px] text-muted-foreground">{item.sub}</span>}{item.extra && <span className="mt-0.5 block text-[11px] text-muted-foreground">{item.extra}</span>}</span>
            <ArrowRight aria-hidden="true" className="h-4 w-4 shrink-0 text-muted-foreground transition group-hover:translate-x-0.5 group-hover:text-primary" />
          </Link></li>;
        })}
      </ul> : <div className="rounded-xl border border-dashed border-border p-5 text-sm"><p>該当する資格が見つかりませんでした。</p><button type="button" onClick={() => { setQuery(""); setDomainId(null); }} className="mt-2 min-h-11 font-semibold text-primary underline underline-offset-4">条件をクリアして選び直す</button></div>}
      <a href={directoryHref} className="mt-3 inline-flex min-h-11 items-center gap-1 text-xs font-semibold text-primary hover:underline">収録している全資格・区分を見る<ArrowRight aria-hidden="true" className="h-3.5 w-3.5" /></a>
    </section>
  );
}
