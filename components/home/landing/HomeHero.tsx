import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { ChihuahuaMascot } from "@/components/ChihuahuaMascot";
import type { HomeDirectoryDomain } from "@/lib/home/home-directory";
import { HomeQuestionPreview } from "./HomeQuestionPreview";
import { HomeQualificationFinder } from "./HomeQualificationFinder";

export function HomeHero({ domains }: { domains: readonly HomeDirectoryDomain[] }) {
  const qualificationCount = domains.reduce((sum, d) => sum + d.qualificationCount, 0);
  const questionCount = domains.reduce((sum, d) => sum + d.totalQuestions, 0);
  return (
    <section aria-labelledby="home-hero-title" className="relative overflow-hidden rounded-[2rem] border border-indigo-100 bg-gradient-to-br from-indigo-50 via-background to-emerald-50 p-4 dark:border-indigo-950 dark:from-indigo-950/50 dark:to-emerald-950/30 sm:p-7 lg:p-8">
      <div aria-hidden="true" className="pointer-events-none absolute -right-20 -top-24 h-80 w-80 rounded-full bg-sky-200/30 blur-3xl dark:bg-sky-700/10" />
      <div className="relative grid gap-5 lg:grid-cols-[0.85fr_1.15fr] lg:gap-8">
        <div className="flex flex-col lg:py-6">
          <div className="flex items-start justify-between gap-3">
            <div><p className="text-xs font-semibold text-indigo-700 dark:text-indigo-300">公式公開過去問 × 学習用解説</p>
              <h1 id="home-hero-title" className="mt-2 text-balance text-[1.65rem] font-bold leading-tight tracking-tight sm:text-4xl lg:text-[2.4rem]">1問わかると、<br />次が楽しくなる。</h1>
            </div>
            <ChihuahuaMascot size={84} alt="一緒に学ぶチワワ" className="h-14 w-14 sm:h-16 sm:w-16" />
          </div>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">資格の過去問を、無料で1問ずつ。答え合わせから解説、復習まで、自分のペースで。</p>
          <dl className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground"><div className="flex gap-1"><dd className="font-bold tabular-nums text-foreground">{qualificationCount}</dd><dt>資格・区分</dt></div><div className="flex gap-1"><dd className="font-bold tabular-nums text-foreground">{questionCount.toLocaleString("ja-JP")}</dd><dt>問を収録</dt></div></dl>
          <div className="hidden lg:block"><HomeQuestionPreview /></div>
          <ol aria-label="学習の流れ" className="mt-4 hidden gap-2 lg:grid">
            {["まず1問、選んで解く", "正答と解説で理由を確認", "学習履歴から復習へ"].map((label, index) => <li key={label} className="flex items-center gap-3 text-sm"><span className="flex h-7 w-7 items-center justify-center rounded-full border border-indigo-200 bg-background text-xs font-bold text-primary dark:border-indigo-800">{index + 1}</span>{label}</li>)}
          </ol>
          <p className="mt-5 hidden items-start gap-2 text-xs leading-relaxed text-muted-foreground lg:flex"><Check aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />公式問題・正答と、学習用に作成した解説を区別して表示。各問題から出典を確認できます。</p>
          <Link href="/transparency" className="mt-2 hidden min-h-11 items-center gap-1 text-xs font-semibold text-primary hover:underline lg:inline-flex">解説と運営について<ArrowRight aria-hidden="true" className="h-3 w-3" /></Link>
        </div>
        <HomeQualificationFinder domains={domains} />
        <div className="-mt-5 lg:hidden"><HomeQuestionPreview idSuffix="mobile" /></div>
      </div>
    </section>
  );
}
