import type { Metadata } from "next";
import { ALL_QUESTIONS, QUESTIONS_BY_EXAM } from "@/data/questions";
import { getAvailableYears, getAvailableCategories } from "@/lib/questions/load";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { HistoryStats } from "@/components/HistoryStats";
import { StreakProfileCard } from "@/lib/streak/StreakProfileCard";
import { HomeExamPicker } from "@/components/HomeExamPicker";
import { HeroDemoAnimation } from "@/components/HeroDemoAnimation";
import { SiteLogo } from "@/components/SiteLogo";
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
        <div className="mb-3">
          <SiteLogo />
        </div>
        <h1 className="mb-3 text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl">
          IPA 過去問を、AI と一緒に。
        </h1>
        <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400 sm:text-base">
          解答・解説がゼロ遷移で表示。分からないところは AI コパイロットにその場で質問できます。
        </p>
        <div className="mt-3 flex flex-wrap gap-2 text-xs">
          <Badge variant="success">β公開中・全機能無料</Badge>
          <Badge variant="success">全13試験区分 合計{total.toLocaleString("ja-JP")}問収録</Badge>
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

      <div className="mb-3">
        <StreakProfileCard />
      </div>

      <HistoryStats />

      <HomeExamPicker questionCounts={questionCounts} />

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

