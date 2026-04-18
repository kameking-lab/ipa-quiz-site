import type { Metadata } from "next";
import Link from "next/link";
import { ALL_QUESTIONS, QUESTIONS_BY_EXAM } from "@/data/questions";
import { getAvailableYears, getAvailableCategories } from "@/lib/questions/load";
import { Card, CardContent } from "@/components/ui/card";
import { Shuffle, CalendarDays, Tags, BookmarkCheck, CircleHelp, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { HistoryStats } from "@/components/HistoryStats";
import { ExamCategoryGrid } from "@/components/ExamCategoryGrid";
import type { ExamCode } from "@/lib/questions/types";

export const metadata: Metadata = {
  title: "IPA Quiz — AIネイティブ過去問学習",
  description:
    "応用情報技術者試験の過去問400問をゼロ遷移UIとAIコパイロットで高速学習。ランダム・年度別・分野別・復習モード対応。β公開中・全機能無料。",
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
      <section className="mb-8">
        <div className="mb-2 flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-sky-600 dark:text-sky-400" />
          <span className="text-xs font-semibold uppercase tracking-wide text-sky-700 dark:text-sky-300">
            AI ネイティブ過去問
          </span>
        </div>
        <h1 className="mb-3 text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl">
          IPA 過去問を、一番速く解ける場所。
        </h1>
        <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400 sm:text-base">
          ポチッと押すだけ。画面遷移ゼロ・ローディングゼロで解答と解説が同じ画面に出ます。
          分からないところは AI コパイロットにいつでも質問できます。
        </p>
        <div className="mt-3 flex flex-wrap gap-2 text-xs">
          <Badge variant="success">β公開中・全機能無料</Badge>
          <Badge variant="success">応用情報 {total}問収録</Badge>
          <Badge variant="outline">ゼロ遷移 UI</Badge>
          <Badge variant="outline">AI コパイロット</Badge>
          <Badge variant="outline">モバイル最適化</Badge>
        </div>
      </section>

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
        />
        <ModeCard
          href="/quiz?mode=unanswered&exam=ap"
          icon={<CircleHelp className="h-5 w-5" />}
          title="未回答モード"
          desc="まだ解いていない問題だけを出題。"
        />
        <ModeCard
          href="/quiz?mode=review&exam=ap"
          icon={<BookmarkCheck className="h-5 w-5" />}
          title="復習モード"
          desc="間違えた問題と★付き問題だけ。"
        />
        <ModeCard
          href="/modes/year"
          icon={<CalendarDays className="h-5 w-5" />}
          title="年度別"
          desc="令和X年度春/秋 を選んで出題。"
        />
        <ModeCard
          href="/modes/topic"
          icon={<Tags className="h-5 w-5" />}
          title="分野別"
          desc="セキュリティ/ネットワーク等の分野別。"
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
}: {
  href: string;
  icon: React.ReactNode;
  title: string;
  desc: string;
}) {
  return (
    <Link
      href={href}
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
