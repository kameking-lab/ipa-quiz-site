import type { Metadata } from "next";
import Link from "next/link";
import { BookOpen, Calendar, Clock, GraduationCap, Sparkles, Trophy } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { COMMUNITY_STORIES_SEED } from "@/data/community";
import type { CommunityStorySeed, StoryDifficulty } from "@/data/community";
import { examLabel } from "@/lib/utils";

export const metadata: Metadata = {
  title: "合格体験記｜過去問AI コミュニティ",
  description:
    "IPA 情報処理技術者試験 13 区分の合格者が、勉強期間・1 日の学習時間・使用教材・つまずいた論点をシェアします。",
  alternates: { canonical: "/community/stories" },
};

const DIFFICULTY_LABEL: Record<StoryDifficulty, string> = {
  easy: "すんなり",
  moderate: "標準的",
  hard: "苦戦",
};

const DIFFICULTY_VARIANT: Record<
  StoryDifficulty,
  "default" | "primary" | "success"
> = {
  easy: "success",
  moderate: "default",
  hard: "primary",
};

export default function CommunityStoriesPage() {
  const stories = [...COMMUNITY_STORIES_SEED].sort(
    (a, b) => new Date(b.passedAt).getTime() - new Date(a.passedAt).getTime(),
  );

  const examGroups = Array.from(new Set(stories.map((s) => s.exam)));

  return (
    <main className="mx-auto w-full max-w-5xl flex-1 px-4 pb-16 pt-8 sm:px-6 sm:pt-10">
      <header className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div className="min-w-0">
          <div className="mb-3 flex items-center gap-1.5">
            <Badge variant="primary">
              <Trophy className="mr-1 h-3 w-3" />
              合格体験記
            </Badge>
          </div>
          <h1 className="text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            合格者の歩き方
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            13 区分の合格者が、勉強期間・1 日の学習時間・使用教材・つまずいたポイントを公開しています。
            自分に近いプロフィールを見つけて、最短ルートを設計してください。
          </p>
        </div>
        <Button asChild variant="ghost" size="sm">
          <Link href="/community/questions">質問掲示板へ</Link>
        </Button>
      </header>

      <section className="mb-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <KpiCard
          icon={<Trophy className="h-4 w-4" />}
          label="掲載体験記"
          value={`${stories.length}本`}
        />
        <KpiCard
          icon={<BookOpen className="h-4 w-4" />}
          label="カバー試験"
          value={`${examGroups.length}区分`}
        />
        <KpiCard
          icon={<Clock className="h-4 w-4" />}
          label="平均勉強月数"
          value={`${avg(stories.map((s) => s.studyMonths)).toFixed(1)}ヶ月`}
        />
        <KpiCard
          icon={<Sparkles className="h-4 w-4" />}
          label="平均学習/日"
          value={`${avg(stories.map((s) => s.studyHoursPerDay)).toFixed(1)}h`}
        />
      </section>

      <ul className="grid gap-4 md:grid-cols-2">
        {stories.map((s) => (
          <li key={s.id}>
            <StoryCard story={s} />
          </li>
        ))}
      </ul>

      <p className="mt-10 text-xs text-muted-foreground">
        ※ 体験記は本人の自己申告に基づくもので、合格を保証するものではありません。学習時間・期間は参考値としてご活用ください。
      </p>
    </main>
  );
}

function StoryCard({ story }: { story: CommunityStorySeed }) {
  return (
    <Card className="h-full overflow-hidden">
      <CardContent className="flex h-full flex-col p-5">
        <div className="mb-2 flex flex-wrap items-center gap-2 text-xs">
          <span className="rounded-md bg-primary-soft px-2 py-0.5 font-mono font-semibold uppercase text-primary-soft-foreground">
            {story.exam}
          </span>
          <span className="font-medium text-foreground">{examLabel(story.exam)}</span>
          <Badge variant={DIFFICULTY_VARIANT[story.difficulty]}>
            {DIFFICULTY_LABEL[story.difficulty]}
          </Badge>
          <span className="ml-auto inline-flex items-center gap-1 text-muted-foreground">
            <Calendar className="h-3 w-3" />
            {formatPassedAt(story.passedAt)}
          </span>
        </div>

        <h2 className="text-base font-semibold leading-snug text-foreground">
          {story.title}
        </h2>

        <p className="mt-1 text-xs text-muted-foreground">
          by {story.authorName} ／ {story.authorRole}
        </p>

        <div className="mt-3 grid grid-cols-3 gap-2 text-xs">
          <Stat label="期間" value={`${story.studyMonths}ヶ月`} />
          <Stat label="1日" value={`${story.studyHoursPerDay}h`} />
          {typeof story.morningScore === "number" ? (
            <Stat label="午前" value={`${story.morningScore}点`} />
          ) : typeof story.afternoonScore === "number" ? (
            <Stat label="午後" value={`${story.afternoonScore}点`} />
          ) : (
            <Stat label="区分" value={story.exam.toUpperCase()} />
          )}
        </div>

        <p className="mt-4 whitespace-pre-wrap text-sm leading-relaxed text-foreground">
          {story.body}
        </p>

        {story.tools.length > 0 && (
          <div className="mt-4 border-t border-border pt-3">
            <div className="mb-1.5 inline-flex items-center gap-1 text-[11px] font-semibold text-muted-foreground">
              <GraduationCap className="h-3 w-3" />
              使用教材
            </div>
            <div className="flex flex-wrap gap-1.5">
              {story.tools.map((t) => (
                <span
                  key={t}
                  className="inline-flex items-center rounded-md bg-muted/40 px-2 py-0.5 text-[11px] text-foreground"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function KpiCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-border bg-card p-4 shadow-sm">
      <div className="mb-2 inline-flex h-7 w-7 items-center justify-center rounded-lg bg-primary-soft text-primary-soft-foreground">
        {icon}
      </div>
      <div className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
        {label}
      </div>
      <div className="mt-1 text-xl font-bold tracking-tight text-foreground">{value}</div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-border bg-muted/30 px-2 py-1.5 text-center">
      <div className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
        {label}
      </div>
      <div className="text-sm font-semibold text-foreground">{value}</div>
    </div>
  );
}

function avg(arr: number[]): number {
  if (arr.length === 0) return 0;
  return arr.reduce((acc, n) => acc + n, 0) / arr.length;
}

function formatPassedAt(iso: string): string {
  const d = new Date(iso);
  return `${d.getFullYear()}/${String(d.getMonth() + 1).padStart(2, "0")} 合格`;
}
