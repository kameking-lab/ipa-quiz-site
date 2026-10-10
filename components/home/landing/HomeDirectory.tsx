
import { ArrowRight } from "lucide-react";
import type { HomeDirectoryDomain } from "@/lib/home/home-directory";

export function HomeDirectory({ domains }: { domains: readonly HomeDirectoryDomain[] }) {
  return <section aria-labelledby="home-directory-title" className="study-directory">
    <div className="study-section-head"><h2 id="home-directory-title">収録資格</h2><p>収録済みの問題・公開回を確認する</p></div>
    <p className="study-directory-intro">ジャンルごとの収録資格を、操作せずこのページで全件確認できます。名前を選ぶと問題一覧へ進みます。</p>
    <div>{domains.map((domain) => <section key={domain.id} id={`domain-${domain.id}`} aria-labelledby={`domain-${domain.id}-title`} className="study-domain scroll-mt-24">
      <div className="study-domain-heading"><h3 id={`domain-${domain.id}-title`}>{domain.title}</h3><span>{domain.qualificationCount}資格・区分</span></div>
      <ul className="study-directory-list">{[...domain.featured, ...domain.compact].map((item) => <li key={item.key}><a href={item.href}><span className="min-w-0"><span className="block font-medium">{item.name}</span>{item.extra && <span className="mt-1 block text-xs opacity-70">{item.extra}</span>}</span><span className="study-directory-count">{item.questionCount.toLocaleString("ja-JP")}問<span className="block text-xs">{item.periodLabel}</span></span><ArrowRight aria-hidden="true" className="h-4 w-4 shrink-0" /></a></li>)}</ul>
      <a href={domain.allHref} className="study-text-link">{domain.allLabel}<ArrowRight aria-hidden="true" className="h-4 w-4" /></a>
    </section>)}</div>
    <p className="study-footnote">問題数は現在開いて解ける収録分です。公式問題・解答の出典は、各問題で確認できます。</p>
  </section>;
}
