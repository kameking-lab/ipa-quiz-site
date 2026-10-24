"use client";

import { useEffect, useMemo, useState, type MouseEvent, type ReactNode } from "react";

import { ArrowRight, Search, X } from "lucide-react";
import type { HomeDirectoryDomain, HomeDomainId } from "@/lib/home/home-directory";

function normalize(value: string): string {
  return value.normalize("NFKC").toLowerCase().replace(/\s/g, "");
}

export function HomeQualificationFinder({ domains, directoryHref = "#home-directory-title", preview, showHeading = false }: { domains: readonly HomeDirectoryDomain[]; directoryHref?: string; preview?: ReactNode; showHeading?: boolean }) {
  const [query, setQuery] = useState("");
  const [domainId, setDomainId] = useState<HomeDomainId | null>(null);
  useEffect(() => {
    const restore = () => {
      const saved: { query?: unknown; domainId?: unknown } | undefined = window.history.state?.homeQualificationFinder;
      if (typeof saved?.query !== "string") return;
      setQuery(saved.query);
      setDomainId(domains.find((domain) => domain.id === saved.domainId)?.id ?? null);
    };
    restore();
  }, [domains]);
  function rememberFilters() {
    window.history.replaceState({ ...window.history.state, homeQualificationFinder: { query, domainId } }, "");
  }
  function openDirectory(event: MouseEvent<HTMLAnchorElement>) {
    if (event.button !== 0 || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
    if (!directoryHref.startsWith("#")) return;
    const target = document.getElementById(directoryHref.slice(1));
    if (!(target instanceof HTMLDetailsElement)) return;
    event.preventDefault();
    target.open = true;
    const summary = target.querySelector("summary");
    summary?.focus();
    summary?.scrollIntoView?.({ block: "start" });
  }
  const items = useMemo(() => domains.flatMap((domain) =>
    [...domain.featured, ...domain.compact].map((item) => ({ ...item, domainId: domain.id, domainTitle: domain.title }))), [domains]);
  const term = normalize(query);
  const matching = items.filter((item) => (!domainId || item.domainId === domainId) &&
    (!term || normalize([item.name, item.abbr, item.sub, item.domainTitle].join(" ")).includes(term)));
  const browsing = !term && !domainId;
  const visible = browsing ? items.filter((item) => ["ip", "fe", "denko2", "fp3"].includes(item.key)) : matching;

  return (
    <section id="choose-qualification" aria-labelledby="qualification-search-title" className="study-finder scroll-mt-24">
      <div className="study-finder-main">
      {showHeading && <header className="study-heading"><h1>解く過去問は、<br />受ける資格から。</h1></header>}
      <h2 id="qualification-search-title" className={showHeading ? "sr-only" : "study-section-label"}>受験する資格を選ぶ</h2>
      <label htmlFor="qualification-search" className="sr-only">資格名・略称で検索</label>
      <div className="study-search">
        <Search aria-hidden="true" className="h-5 w-5 shrink-0" />
        <input id="qualification-search" type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="資格名・略称（例：宅建、FP3級、電験三種）" />
        {query && <button type="button" aria-label="検索をクリア" onClick={() => setQuery("")}><X aria-hidden="true" className="h-4 w-4" /></button>}
      </div>
      <div aria-label="資格の分野で絞り込む" className="study-filters">
        <button type="button" aria-pressed={!domainId} onClick={() => setDomainId(null)}>すべて</button>
        {domains.map((domain) => <button key={domain.id} type="button" aria-pressed={domainId === domain.id} onClick={() => setDomainId(domain.id)}>{domain.title}</button>)}
      </div>
      <p role="status" aria-live="polite" className="study-results-label">{browsing ? "よく選ばれる資格" : `${matching.length}資格・区分`}</p>
      {visible.length > 0 ? <ul className="study-results">
        {visible.map((item) => <li key={item.key}><a href={item.href} className={`study-qualification study-card-${item.domainId}`} onClick={rememberFilters}>
          <span className="min-w-0"><span className="study-qualification-name">{item.name}</span><span className="study-qualification-meta">{item.questionCount.toLocaleString("ja-JP")}問 · {item.periodLabel}</span></span>
          <span aria-hidden="true" className={`study-mascot study-card-mascot study-pose-${({ it: 0, safety: 1, electrical: 5, construction: 7, money: 11, welfare: 6 } as const)[item.domainId]}`} />
          <ArrowRight aria-hidden="true" className="h-5 w-5 shrink-0" />
        </a></li>)}
      </ul> : <div className="study-empty"><p>該当する資格が見つかりませんでした。</p><button type="button" onClick={() => { setQuery(""); setDomainId(null); }} className="min-h-11 underline underline-offset-4">検索をクリアして選び直す</button></div>}
      <a href={directoryHref} onClick={openDirectory} className="study-text-link">収録している全資格・区分を見る<ArrowRight aria-hidden="true" className="h-4 w-4" /></a>
      </div>
      <aside className="study-aside">{preview}</aside>
    </section>
  );
}
