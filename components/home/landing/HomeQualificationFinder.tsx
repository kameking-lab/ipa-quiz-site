"use client";

import { useMemo, useState, type ReactNode } from "react";

import { ArrowRight, Search, X } from "lucide-react";
import type { HomeDirectoryDomain, HomeDomainId } from "@/lib/home/home-directory";

function normalize(value: string): string {
  return value.normalize("NFKC").toLowerCase().replace(/\s/g, "");
}

export function HomeQualificationFinder({ domains, directoryHref = "#home-directory-title", preview, showHeading = false }: { domains: readonly HomeDirectoryDomain[]; directoryHref?: string; preview?: ReactNode; showHeading?: boolean }) {
  const [query, setQuery] = useState("");
  const [selectedKey, setSelectedKey] = useState<string | null>(null);
  const [domainId, setDomainId] = useState<HomeDomainId | null>(null);
  const items = useMemo(() => domains.flatMap((domain) =>
    [...domain.featured, ...domain.compact].map((item) => ({ ...item, domainId: domain.id, domainTitle: domain.title }))), [domains]);
  const term = normalize(query);
  const matching = items.filter((item) => (!domainId || item.domainId === domainId) &&
    (!term || normalize([item.name, item.abbr, item.sub, item.domainTitle].join(" ")).includes(term)));
  const browsing = !term && !domainId;
  const visible = browsing ? items.filter((item) => ["ip", "fe", "denko2", "fp3"].includes(item.key)) : matching;

  const selected = items.find((item) => item.key === selectedKey);
  function panel(item: typeof items[number], inline = false) {
    return <div className={inline ? "study-panel study-panel-inline" : "study-panel"} id={inline ? `selected-${item.key}` : undefined}><p className="study-kicker">選んだ資格</p><h3>{item.name}</h3><p className="study-caption">{item.periodLabel} · 収録 {item.questionCount.toLocaleString("ja-JP")}問</p><a href={item.href} className="study-primary">年度・科目を選んで解く<ArrowRight aria-hidden="true" className="h-4 w-4" /></a></div>;
  }
  return (
    <section id="choose-qualification" aria-labelledby="qualification-search-title" className="study-finder scroll-mt-24">
      <div className="study-finder-main">
      {showHeading && <header className="study-heading"><h1>解く過去問は、<br />受ける資格から。</h1></header>}
      <h2 id="qualification-search-title" className={showHeading ? "sr-only" : "study-section-label"}>受験する資格を選ぶ</h2>
      <label htmlFor="qualification-search" className="sr-only">資格名・略称で検索</label>
      <div className="study-search">
        <Search aria-hidden="true" className="h-5 w-5 shrink-0" />
        <input id="qualification-search" type="search" value={query} onChange={(event) => { setQuery(event.target.value); setSelectedKey(null); }} placeholder="資格名・略称（例：宅建、FP3級、電験三種）" />
        {query && <button type="button" aria-label="検索をクリア" onClick={() => setQuery("")}><X aria-hidden="true" className="h-4 w-4" /></button>}
      </div>
      <div aria-label="資格の分野で絞り込む" className="study-filters">
        <button type="button" aria-pressed={!domainId} onClick={() => setDomainId(null)}>すべて</button>
        {domains.map((domain) => <button key={domain.id} type="button" aria-pressed={domainId === domain.id} onClick={() => setDomainId(domain.id)}>{domain.title}</button>)}
      </div>
      <p role="status" aria-live="polite" className="study-results-label">{browsing ? "よく選ばれる資格" : `${matching.length}資格・区分`}</p>
      {visible.length > 0 ? <ul className="study-results">
        {visible.map((item) => <li key={item.key}><button type="button" className="study-qualification" aria-expanded={selectedKey === item.key} onClick={() => setSelectedKey(selectedKey === item.key ? null : item.key)}>
          <span className="min-w-0"><span className="study-qualification-name">{item.name}</span><span className="study-qualification-meta">{item.questionCount.toLocaleString("ja-JP")}問 · {item.periodLabel}</span></span>
          <ArrowRight aria-hidden="true" className="h-5 w-5 shrink-0" />
        </button>{selectedKey === item.key && panel(item, true)}</li>)}
      </ul> : <div className="study-empty"><p>該当する資格が見つかりませんでした。</p><button type="button" onClick={() => { setQuery(""); setDomainId(null); }} className="min-h-11 underline underline-offset-4">検索をクリアして選び直す</button></div>}
      <a href={directoryHref} className="study-text-link">収録している全資格・区分を見る<ArrowRight aria-hidden="true" className="h-4 w-4" /></a>
      </div>
      <aside className="study-aside">{selected ? panel(selected) : preview}</aside>
    </section>
  );
}