import { ChihuahuaMascot } from "@/components/ChihuahuaMascot";
import type { HomeDirectoryDomain } from "@/lib/home/home-directory";
import { DOMAIN_THEME } from "./domain-theme";

function HeroBackdrop() {
  // 画像を読まずに奥行きを出す装飾。LCP/CLS に影響しないよう absolute + aria-hidden。
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      className="pointer-events-none absolute inset-0 h-full w-full"
      preserveAspectRatio="xMidYMid slice"
      viewBox="0 0 800 400"
    >
      <defs>
        <pattern id="home-hero-dots" width="22" height="22" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="1.3" className="fill-indigo-300/40 dark:fill-indigo-400/15" />
        </pattern>
      </defs>
      <rect width="800" height="400" fill="url(#home-hero-dots)" />
      <circle cx="720" cy="40" r="150" className="fill-sky-200/50 dark:fill-sky-500/10" />
      <circle cx="610" cy="380" r="120" className="fill-emerald-200/50 dark:fill-emerald-500/10" />
      <circle cx="40" cy="390" r="110" className="fill-amber-200/40 dark:fill-amber-500/10" />
    </svg>
  );
}

export function HomeHero({ domains }: { domains: readonly HomeDirectoryDomain[] }) {
  const qualificationCount = domains.reduce((sum, d) => sum + d.qualificationCount, 0);
  const questionCount = domains.reduce((sum, d) => sum + d.totalQuestions, 0);

  return (
    <section
      aria-labelledby="home-hero-title"
      className="relative overflow-hidden rounded-3xl border border-indigo-100 bg-gradient-to-br from-indigo-50 via-white to-emerald-50 px-5 py-6 shadow-sm dark:border-indigo-950 dark:from-indigo-950/60 dark:via-zinc-950 dark:to-emerald-950/40 sm:px-9 sm:py-9"
    >
      <HeroBackdrop />
      <div className="relative">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="text-xs font-semibold text-indigo-700 dark:text-indigo-300 sm:text-sm">
              公式公開過去問 × 学習用解説
            </p>
            <h1 id="home-hero-title" className="mt-2 text-balance text-[1.7rem] font-bold leading-tight tracking-tight sm:text-4xl">
              資格の過去問を、
              <br />
              無料で1問ずつ。
            </h1>
          </div>
          <ChihuahuaMascot size={84} alt="一緒に学ぶチワワ" className="h-16 w-16 sm:h-24 sm:w-24" />
        </div>
        <p className="mt-3 max-w-2xl text-sm leading-7 text-zinc-700 dark:text-zinc-300">
          試験実施機関が公開した過去問を、公式正答と学習用解説で解けます。登録不要。まずは分野を選んでください。
        </p>
        <dl className="mt-4 flex flex-wrap gap-2 text-xs">
          <div className="inline-flex items-baseline gap-1 rounded-full border border-indigo-200 bg-white/80 px-3 py-1 dark:border-indigo-900 dark:bg-zinc-900/70">
            <dt className="text-muted-foreground">資格・区分</dt>
            <dd className="font-bold tabular-nums">{qualificationCount}</dd>
          </div>
          <div className="inline-flex items-baseline gap-1 rounded-full border border-indigo-200 bg-white/80 px-3 py-1 dark:border-indigo-900 dark:bg-zinc-900/70">
            <dt className="text-muted-foreground">収録</dt>
            <dd className="font-bold tabular-nums">{questionCount.toLocaleString("ja-JP")}問</dd>
          </div>
        </dl>

        <nav aria-label="分野から選ぶ" className="mt-5">
          <ul className="grid grid-cols-2 gap-2 sm:grid-cols-5">
            {domains.map((d) => {
              const theme = DOMAIN_THEME[d.id];
              const Icon = theme.icon;
              return (
                <li key={d.id} className={d.id === "it" ? "col-span-2 sm:col-span-1" : undefined}>
                  <a
                    href={`#domain-${d.id}`}
                    className={`flex min-h-14 items-center gap-2.5 rounded-2xl border px-3 py-2 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary ${theme.heroChip}`}
                  >
                    <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl ${theme.tile}`}>
                      <Icon className="h-4 w-4" aria-hidden="true" />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-sm font-bold leading-tight">{d.title}</span>
                      <span className="block text-[11px] text-muted-foreground">{d.qualificationCount}資格・区分</span>
                    </span>
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </section>
  );
}
