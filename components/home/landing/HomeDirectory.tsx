import Link from "next/link";
import { ArrowRight, ChevronRight } from "lucide-react";
import type { HomeDirectoryDomain, HomeDirectoryItem } from "@/lib/home/home-directory";
import { DOMAIN_THEME, type DomainTheme } from "./domain-theme";

function formatCount(n: number): string {
  return n.toLocaleString("ja-JP");
}

function FeaturedCard({ item, theme }: { item: HomeDirectoryItem; theme: DomainTheme }) {
  return (
    <Link
      href={item.href}
      className={`group flex min-h-28 flex-col justify-between gap-2 rounded-2xl border-2 bg-card p-3.5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary sm:p-4 ${theme.card}`}
    >
      <span className="min-w-0">
        {item.abbr ? (
          <span className={`mb-1.5 inline-flex rounded-md px-1.5 py-0.5 font-mono text-[11px] font-bold ${theme.abbr}`}>{item.abbr}</span>
        ) : null}
        <span className="block text-sm font-bold leading-snug sm:text-base">{item.name}</span>
        {item.sub ? <span className="mt-0.5 block text-[11px] leading-snug text-muted-foreground">{item.sub}</span> : null}
      </span>
      <span className="flex items-end justify-between gap-2">
        <span className="text-xs text-muted-foreground">
          <span className="whitespace-nowrap"><span className="text-base font-bold tabular-nums text-foreground">{formatCount(item.questionCount)}</span>問</span>
          <span className="mx-1 text-border" aria-hidden="true">|</span>
          <span className="whitespace-nowrap">{item.periodLabel}</span>
          {item.extra ? <span className="mt-0.5 block text-[11px]">{item.extra}</span> : null}
        </span>
        <ChevronRight className={`h-4 w-4 shrink-0 transition group-hover:translate-x-0.5 ${theme.accent}`} aria-hidden="true" />
      </span>
    </Link>
  );
}

function CompactChip({ item, theme }: { item: HomeDirectoryItem; theme: DomainTheme }) {
  return (
    <li>
      <Link
        href={item.href}
        className={`flex min-h-11 items-center gap-2 rounded-xl border px-3 py-1.5 text-xs transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${theme.chip}`}
      >
        {item.abbr ? <span className={`rounded px-1 font-mono text-[10px] font-bold ${theme.abbr}`}>{item.abbr}</span> : null}
        <span className="min-w-0 flex-1 font-semibold">{item.name}</span>
        <span className="shrink-0 tabular-nums text-muted-foreground">{formatCount(item.questionCount)}問</span>
      </Link>
    </li>
  );
}

function DomainSection({ domain }: { domain: HomeDirectoryDomain }) {
  const theme = DOMAIN_THEME[domain.id];
  const Icon = theme.icon;
  const headingId = `domain-${domain.id}-title`;
  const compactLabel = domain.id === "it" ? "高度試験・支援士" : "ほかの免許試験";
  return (
    <section id={`domain-${domain.id}`} aria-labelledby={headingId} className="scroll-mt-20 rounded-3xl border border-border bg-card/60 p-4 shadow-sm sm:p-6">
      <div className="mb-4 flex items-start gap-3">
        <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl shadow-sm ${theme.tile}`}>
          <Icon className="h-5 w-5" aria-hidden="true" />
        </span>
        <div className="min-w-0 flex-1">
          <h3 id={headingId} className="text-lg font-bold leading-tight">{domain.title}</h3>
          <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{domain.lead}</p>
          <p className={`mt-1 text-xs font-semibold ${theme.accent}`}>
            {domain.qualificationCount}資格・区分 / {formatCount(domain.totalQuestions)}問
          </p>
        </div>
      </div>
      <div className={`grid grid-cols-2 gap-2.5 sm:gap-3 ${domain.id === "it" ? "md:grid-cols-4" : "md:grid-cols-3"}`}>
        {domain.featured.map((item) => <FeaturedCard key={item.key} item={item} theme={theme} />)}
      </div>
      {domain.compact.length > 0 && domain.id === "it" ? (
        <div className="mt-4">
          <h4 className="mb-2 text-xs font-semibold text-muted-foreground">{compactLabel}</h4>
          <ul className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {domain.compact.map((item) => <CompactChip key={item.key} item={item} theme={theme} />)}
          </ul>
        </div>
      ) : null}
      {domain.compact.length > 0 && domain.id !== "it" ? (
        // 件数の多い「ほかの免許試験」は折りたたむ（リンクはDOMに残るのでクロール・検索は可能）。
        <details className="group mt-4 rounded-2xl border border-border bg-background/60">
          <summary className={`flex min-h-11 cursor-pointer select-none items-center justify-between gap-2 px-4 text-sm font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${theme.accent}`}>
            {compactLabel}（{domain.compact.length}資格）を表示
            <ChevronRight className="h-4 w-4 transition group-open:rotate-90" aria-hidden="true" />
          </summary>
          <ul className="grid gap-2 px-3 pb-3 sm:grid-cols-2 lg:grid-cols-3">
            {domain.compact.map((item) => <CompactChip key={item.key} item={item} theme={theme} />)}
          </ul>
        </details>
      ) : null}
      <Link
        href={domain.allHref}
        className={`mt-4 inline-flex min-h-11 items-center gap-1 text-sm font-semibold hover:underline ${theme.accent}`}
      >
        {domain.allLabel}
        <ArrowRight className="h-4 w-4" aria-hidden="true" />
      </Link>
    </section>
  );
}

export function HomeDirectory({ domains }: { domains: readonly HomeDirectoryDomain[] }) {
  return (
    <section aria-labelledby="home-directory-title" className="mt-10">
      <h2 id="home-directory-title" className="mb-1 text-lg font-bold sm:text-xl">資格を選んで、今すぐ解く</h2>
      <p className="mb-4 text-xs text-muted-foreground">問題数と「期分・回分」は、現在このサイトで解ける公式公開問題の数です。</p>
      <div className="space-y-5">
        {domains.map((domain) => <DomainSection key={domain.id} domain={domain} />)}
      </div>
    </section>
  );
}
