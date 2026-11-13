"use client";

import { useEffect, useMemo, useRef, useState, type MouseEvent, type ReactNode } from "react";

import { ArrowRight, Search, X } from "lucide-react";
import type { HomeDirectoryDomain, HomeDomainId } from "@/lib/home/home-directory";
import { qualificationStudyArt } from "@/lib/home/study-room";
import { HOME_FEATURED_EXAM_CODES } from "@/lib/home/featured-exams";

function normalize(value: string): string {
  return value.normalize("NFKC").toLowerCase().replace(/\s/g, "");
}

export function HomeQualificationFinder({ domains, directoryHref = "#home-directory-title", preview, auxiliaryLink, showHeading = false, homeDirectory }: { domains: readonly HomeDirectoryDomain[]; directoryHref?: string; preview?: ReactNode; auxiliaryLink?: ReactNode; showHeading?: boolean; homeDirectory?: ReactNode }) {
  const [query, setQuery] = useState("");
  const [domainId, setDomainId] = useState<HomeDomainId | null>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  function clearSearch(resetDomain = false) {
    setQuery("");
    if (resetDomain) setDomainId(null);
    rememberFilters("", resetDomain ? null : domainId);
    searchRef.current?.focus();
  }
  useEffect(() => {
    const restore = () => {
      const url = new URL(window.location.href);
      const fromUrl = url.pathname === "/" && (url.searchParams.has("q") || url.searchParams.has("domain"));
      const saved: { query?: unknown; domainId?: unknown } | undefined = fromUrl
        ? { query: url.searchParams.get("q") ?? "", domainId: url.searchParams.get("domain") }
        : window.history.state?.homeQualificationFinder;
      if (typeof saved?.query !== "string") return;
      setQuery(saved.query);
      setDomainId(domains.find((domain) => domain.id === saved.domainId)?.id ?? null);
    };
    restore();
    window.addEventListener("popstate", restore);
    window.addEventListener("pageshow", restore);
    return () => {
      window.removeEventListener("popstate", restore);
      window.removeEventListener("pageshow", restore);
    };
  }, [domains]);
  function rememberFilters(nextQuery: string, nextDomain: HomeDomainId | null) {
    const url = new URL(window.location.href);
    // Only the home page owns these URL parameters. The URL survives history
    // restoration even when the browser restores custom state after hydration.
    if (url.pathname === "/") {
      if (nextQuery) url.searchParams.set("q", nextQuery); else url.searchParams.delete("q");
      if (nextDomain) url.searchParams.set("domain", nextDomain); else url.searchParams.delete("domain");
    }
    window.history.replaceState({ ...window.history.state, homeQualificationFinder: { query: nextQuery, domainId: nextDomain } }, "", url);
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
  const visible = browsing ? homeDirectory
    ? HOME_FEATURED_EXAM_CODES.flatMap(code => items.filter(item => item.key === code))
    : items.filter((item) => ["ip", "fe", "denko2", "fp3"].includes(item.key)) : matching;

  return (
    <section id="choose-qualification" tabIndex={-1} aria-labelledby="qualification-search-title" className={`study-finder scroll-mt-24${homeDirectory ? " study-finder-home" : ""}`}>
      <div className="study-finder-main">
      {showHeading && <header className="study-heading"><h1>解く過去問は、<br />受ける資格から。</h1></header>}
      <div className="study-finder-heading">
      <h2 id="qualification-search-title" className={showHeading ? "sr-only" : "study-section-label"}>受験する資格を選ぶ</h2>
      {auxiliaryLink ? <div className="study-finder-auxiliary">{auxiliaryLink}</div> : null}
      </div>
      <label htmlFor="qualification-search" className="sr-only">資格名・略称で検索</label>
      <div className="study-search-row"><div className="study-search">
        <Search aria-hidden="true" className="h-5 w-5 shrink-0" />
        <input ref={searchRef} id="qualification-search" type="search" value={query} aria-describedby="qualification-result-count" aria-controls="qualification-results" onChange={(event) => setQuery(event.target.value)} placeholder={homeDirectory ? "資格名・略称で検索" : "資格名・略称（例：宅建、FP3級、電験三種）"} />
        {query && <button type="button" aria-label="検索をクリア" onClick={() => clearSearch()}><X aria-hidden="true" className="h-4 w-4" /></button>}
      </div>
      {homeDirectory && <select aria-label="資格の分野で絞り込む" value={domainId ?? ""} onChange={event => setDomainId(domains.find(domain => domain.id === event.target.value)?.id ?? null)}>
        <option value="">全分野</option>
        {domains.map(domain => <option key={domain.id} value={domain.id}>{domain.title}</option>)}
      </select>}</div>
      {!homeDirectory && <div aria-label="資格の分野で絞り込む" className="study-filters">
        <button type="button" aria-pressed={!domainId} onClick={() => setDomainId(null)}>すべて</button>
        {domains.map((domain) => <button key={domain.id} type="button" aria-pressed={domainId === domain.id} onClick={() => setDomainId(domain.id)}>{domain.title}</button>)}
      </div>}
      <p id="qualification-result-count" role="status" aria-live="polite" className="study-results-label">{browsing ? homeDirectory ? "ピックアップ" : "まずは、ここから" : `${matching.length}資格・区分`}</p>
      {visible.length > 0 ? <ul id="qualification-results" className={`study-results${homeDirectory && browsing ? " study-featured-results" : ""}`}>
        {visible.map((item) => <li key={item.key}><a href={item.href} className={`study-qualification study-card-${item.domainId}`} onClick={() => rememberFilters(query, domainId)}>
          <span className="min-w-0"><span className="study-qualification-name">{item.name}</span><span className="study-qualification-meta">{item.questionCount.toLocaleString("ja-JP")}問<span className="study-qualification-period"> · {item.periodLabel}</span></span></span>
          {/* The qualification's own study-room chihuahua (never the old headband atlas poses). */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img aria-hidden="true" alt="" className="study-mascot study-card-mascot" src={qualificationStudyArt(item.key)} width={256} height={256} loading="lazy" decoding="async" />
          <ArrowRight aria-hidden="true" className="h-5 w-5 shrink-0" />
        </a></li>)}
      </ul> : <div id="qualification-results" className="study-empty"><p>該当する資格が見つかりませんでした。</p><button type="button" onClick={() => clearSearch(true)} className="min-h-11 underline underline-offset-4">検索をクリアして選び直す</button></div>}
      {homeDirectory ? <div hidden={!browsing}>{homeDirectory}</div> : <a href={directoryHref} onClick={openDirectory} className="study-text-link">収録している全資格・区分を見る<ArrowRight aria-hidden="true" className="h-4 w-4" /></a>}
      </div>
      {preview && <aside className="study-aside">{preview}</aside>}
    </section>
  );
}
