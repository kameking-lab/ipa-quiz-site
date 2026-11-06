
import { ArrowRight } from "lucide-react";
import type { HomeDirectoryDomain } from "@/lib/home/home-directory";

export function HomeDirectory({ domains }: { domains: readonly HomeDirectoryDomain[] }) {
  return <section aria-labelledby="home-directory-title" className="study-directory">
    <div className="study-section-head"><h2 id="home-directory-title" tabIndex={-1} className="scroll-mt-24">収録資格</h2></div>
    <div>{domains.map((domain) => <section key={domain.id} id={`domain-${domain.id}`} aria-labelledby={`domain-${domain.id}-title`} className="study-domain scroll-mt-24">
      <div className="study-domain-heading"><h3 id={`domain-${domain.id}-title`}>{domain.title}</h3><span>{domain.qualificationCount}資格・区分</span></div>
      <ul className="study-directory-list">{[...domain.featured, ...domain.compact].map((item) => <li key={item.key}><a href={item.href}><span className="min-w-0"><span className="block font-medium">{item.name}</span>{item.extra && <span className="mt-1 block text-xs opacity-70">{item.extra}</span>}</span><span className="study-directory-count">{item.questionCount.toLocaleString("ja-JP")}問<span className="block text-xs">{item.periodLabel}</span></span><ArrowRight aria-hidden="true" className="h-4 w-4 shrink-0" /></a></li>)}</ul>
      <a href={domain.allHref} className="study-text-link">{domain.allLabel}<ArrowRight aria-hidden="true" className="h-4 w-4" /></a>
    </section>)}</div>
  </section>;
}
