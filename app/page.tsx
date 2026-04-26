import type { Metadata } from "next";
import Link from "next/link";
import { ALL_QUESTIONS, QUESTIONS_BY_EXAM } from "@/data/questions";
import { getAvailableYears, getAvailableCategories } from "@/lib/questions/load";
import { Card, CardContent } from "@/components/ui/card";
import { Shuffle, CalendarDays, Tags, BookmarkCheck, CircleHelp, Brain, Zap, Award } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { HistoryStats } from "@/components/HistoryStats";
import { StreakProfileCard } from "@/lib/streak/StreakProfileCard";
import { ExamCategoryGrid } from "@/components/ExamCategoryGrid";
import { HeroDemoAnimation } from "@/components/HeroDemoAnimation";
import { SiteLogo } from "@/components/SiteLogo";
import { TestimonialsCarousel } from "@/components/TestimonialsCarousel";
import type { ExamCode } from "@/lib/questions/types";

export const metadata: Metadata = {
  title: "IPA Quiz — AIネイティブ過去問学習",
  description:
    "IPA情報処理技術者試験の過去問12,000問以上をAIコパイロット付きで学習。全13試験区分対応。ゼロ遷移UI・モバイル最適化。β公開中・全機能無料。",
  alternates: { canonical: "/" },
};

export default function HomePage() {
  const total = ALL_QUESTIONS.length;
  const years = getAvailableYears("ap");
  const categories = getAvailableCategories("ap");

  const questionCounts = Object.fromEntries(
    (Object.entries(QUESTIONS_BY_EXAM) as Array<[ExamCode, typeof ALL_QUESTIONS]>).map(
      ([code, qs]) => [code, qs?.length ?? 0],
    ),
  ) as Partial<Record<ExamCode, number>>;

  return (
    <main className="mx-auto w-full max-w-3xl flex-1 px-4 pb-10 pt-8 sm:px-6">
      {/* Hero */}
      <section className="mb-10">
        <div className="mb-3">
          <SiteLogo />
        </div>
        <h1 className="mb-3 text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl">
          IPA 過去問を、AI と一緒に。
        </h1>
        <p className="mb-4 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400 sm:text-base">
          解答・解説がゼロ遷移で表示。分からないところは AI コパイロットにその場で質問できます。
        </p>

        {/* Value props */}
        <div className="mb-5 grid grid-cols-3 gap-2 sm:gap-3">
          <div className="flex flex-col items-center rounded-2xl border border-sky-100 bg-sky-50/60 p-3 text-center dark:border-sky-900/40 dark:bg-sky-950/20">
            <span className="mb-1 rounded-lg bg-sky-100 p-2 text-sky-700 dark:bg-sky-900/40 dark:text-sky-300">
              <Brain className="h-5 w-5" />
            </span>
            <span className="text-lg font-bold text-zinc-900 dark:text-zinc-50">
              {total.toLocaleString("ja-JP")}問
            </span>
            <span className="text-[10px] leading-snug text-zinc-500 dark:text-zinc-400">過去問を収録</span>
          </div>
          <div className="flex flex-col items-center rounded-2xl border border-emerald-100 bg-emerald-50/60 p-3 text-center dark:border-emerald-900/40 dark:bg-emerald-950/20">
            <span className="mb-1 rounded-lg bg-emerald-100 p-2 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300">
              <Award className="h-5 w-5" />
            </span>
            <span className="text-lg font-bold text-zinc-900 dark:text-zinc-50">全13区分</span>
            <span className="text-[10px] leading-snug text-zinc-500 dark:text-zinc-400">試験区分に対応</span>
          </div>
          <div className="flex flex-col items-center rounded-2xl border border-amber-100 bg-amber-50/60 p-3 text-center dark:border-amber-900/40 dark:bg-amber-950/20">
            <span className="mb-1 rounded-lg bg-amber-100 p-2 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300">
              <Zap className="h-5 w-5" />
            </span>
            <span className="text-lg font-bold text-zinc-900 dark:text-zinc-50">AI解説</span>
            <span className="text-[10px] leading-snug text-zinc-500 dark:text-zinc-400">常駐コパイロット</span>
          </div>
        </div>

        {/* Primary CTA */}
        <div className="mb-4 flex flex-col gap-2 sm:flex-row">
          <Button
            asChild
            variant="primary"
            size="lg"
            className="flex-1 shadow-lg transition-transform active:scale-95 hover:scale-[1.01]"
            data-track="hero-cta-start"
          >
            <Link href="/quiz?mode=random&exam=ap">
              今すぐ無料で始める
            </Link>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="flex-1 transition-transform active:scale-95"
            data-track="hero-cta-pricing"
          >
            <Link href="/pricing">料金プランを見る</Link>
          </Button>
        </div>

        <div className="mt-2 flex flex-wrap gap-2 text-xs">
          <Badge variant="success">β公開中・全機能無料</Badge>
          <Badge variant="outline">ゼロ遷移 UI</Badge>
          <Badge variant="outline">AI コパイロット</Badge>
          <Badge variant="outline">モバイル最適化</Badge>
        </div>

        <HeroDemoAnimation />

        <p className="mt-3 text-xs text-zinc-500 dark:text-zinc-400">
          最新情報・アップデートは{" "}
          <a
            href="https://x.com/kakomon_ai_jp"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sky-600 underline-offset-2 hover:underline dark:text-sky-400"
          >
            公式X (@kakomon_ai_jp)
          </a>
          {" "}と{" "}
          <a
            href="https://note.com/kakomon_ai"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sky-600 underline-offset-2 hover:underline dark:text-sky-400"
          >
            note
          </a>
          {" "}でお届けしています。
        </p>
      </section>

      {/* Testimonials */}
      <section className="mb-8">
        <h2 className="mb-3 text-sm font-semibold text-zinc-700 dark:text-zinc-300">
          合格者の声
        </h2>
        <TestimonialsCarousel />
      </section>

      <div className="mb-3">
        <StreakProfileCard />
      </div>

      <HistoryStats />

      <h2 className="mb-3 mt-8 text-sm font-semibold text-zinc-700 dark:text-zinc-300">
        試験区分を選んでください
      </h2>
      <ExamCategoryGrid questionCounts={questionCounts} />

      <h2 id="exam-modes" className="mb-3 mt-8 text-sm font-semibold text-zinc-700 dark:text-zinc-300">
        出題モード <span className="text-xs font-normal text-zinc-500">（応用情報技術者）</span>
      </h2>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <ModeCard
          href="/quiz?mode=random&exam=ap"
          icon={<Shuffle className="h-5 w-5" />}
          title="ランダム出題"
          desc="全範囲からランダムに出題します。"
          dataCta="mode-random"
        />
        <ModeCard
          href="/quiz?mode=unanswered&exam=ap"
          icon={<CircleHelp className="h-5 w-5" />}
          title="未回答モード"
          desc="まだ解いていない問題だけを出題。"
          dataCta="mode-unanswered"
        />
        <ModeCard
          href="/quiz?mode=review&exam=ap"
          icon={<BookmarkCheck className="h-5 w-5" />}
          title="復習モード"
          desc="間違えた問題と★付き問題だけ。"
          dataCta="mode-review"
        />
        <ModeCard
          href="/modes/year"
          icon={<CalendarDays className="h-5 w-5" />}
          title="年度別"
          desc="令和X年度春/秋 を選んで出題。"
          dataCta="mode-year"
        />
        <ModeCard
          href="/modes/topic"
          icon={<Tags className="h-5 w-5" />}
          title="分野別"
          desc="セキュリティ/ネットワーク等の分野別。"
          dataCta="mode-topic"
        />
      </div>

      <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
        <Card>
          <CardContent className="pt-5">
            <h3 className="mb-2 text-sm font-semibold text-zinc-700 dark:text-zinc-300">
              収録年度（応用情報）
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {years.map((y) => (
                <Badge key={y} variant="outline">
                  {y}年
                </Badge>
              ))}
              {years.length === 0 && (
                <span className="text-xs text-zinc-500">データ投入待ち</span>
              )}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-5">
            <h3 className="mb-2 text-sm font-semibold text-zinc-700 dark:text-zinc-300">
              収録分野
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {categories.slice(0, 8).map((c) => (
                <Badge key={c} variant="outline">
                  {c}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}

function ModeCard({
  href,
  icon,
  title,
  desc,
  dataCta,
}: {
  href: string;
  icon: React.ReactNode;
  title: string;
  desc: string;
  dataCta?: string;
}) {
  return (
    <Link
      href={href}
      data-track={dataCta}
      className="group block rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:border-sky-300 hover:shadow dark:border-zinc-800 dark:bg-zinc-950 dark:hover:border-sky-700"
    >
      <div className="mb-1.5 flex items-center gap-2">
        <span className="rounded-lg bg-sky-100 p-2 text-sky-700 dark:bg-sky-950 dark:text-sky-300">
          {icon}
        </span>
        <span className="text-base font-semibold">{title}</span>
      </div>
      <p className="text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">{desc}</p>
    </Link>
  );
}
