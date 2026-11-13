
import { ArrowRight, ChevronDown, CircuitBoard, Coins, House, Scale, Zap, HardHat, ShieldCheck, HeartPulse, Car } from "lucide-react";
import type { HomeDirectoryDomain, HomeDomainId } from "@/lib/home/home-directory";

const icons = { it: CircuitBoard, money: Coins, "real-estate": House, legal: Scale, electrical: Zap, construction: HardHat, safety: ShieldCheck, welfare: HeartPulse, automotive: Car } satisfies Record<HomeDomainId, typeof Coins>;

export function HomeDirectory({ domains }: { domains: readonly HomeDirectoryDomain[] }) {
  return <section aria-labelledby="home-directory-title" className="study-directory">
    <div className="study-section-head"><h2 id="home-directory-title" tabIndex={-1} className="scroll-mt-24">分野から探す</h2></div>
    <div className="study-domain-grid">{domains.map((domain) => {
      const Icon = icons[domain.id];
      return <details key={domain.id} id={`domain-${domain.id}`} className="study-domain scroll-mt-24">
      <summary className="study-domain-heading"><Icon aria-hidden="true" className="study-domain-icon" /><span className="study-domain-label">{domain.title}<span>{domain.qualificationCount}資格・区分</span></span><ChevronDown aria-hidden="true" className="study-domain-chevron" /></summary>
      <ul className="study-directory-list">{[...domain.featured, ...domain.compact].map((item) => <li key={item.key}><a href={item.href}><span className="min-w-0"><span className="block font-medium">{item.name}</span>{item.extra && <span className="mt-1 block text-xs opacity-70">{item.extra}</span>}</span><span className="study-directory-count">{item.questionCount.toLocaleString("ja-JP")}問<span className="block text-xs">{item.periodLabel}</span></span><ArrowRight aria-hidden="true" className="h-4 w-4 shrink-0" /></a></li>)}</ul>
      <a href={domain.allHref} className="study-text-link">{domain.allLabel}<ArrowRight aria-hidden="true" className="h-4 w-4" /></a>
    </details>;
    })}</div>
  </section>;
}
