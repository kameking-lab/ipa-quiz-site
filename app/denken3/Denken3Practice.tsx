"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ArrowRight, BookOpenCheck } from "lucide-react";
import { TsuginoWelcome } from "@/components/analytics/TsuginoWelcome";
import type { Session } from "@/lib/questions/types";

export interface PracticePeriod {
  year: 2024 | 2025;
  season: "first" | "second";
  examDate?: string;
  referralPractice: string | null;
  subjects: { session: Session; name: string; description: string; count: number }[];
}

interface Props {
  periods: readonly [PracticePeriod, ...PracticePeriod[]];
  originalCount: number;
}

export function Denken3PracticeSelection(props: Props) {
  const query = useSearchParams();
  const year = query.getAll("year").length === 1 && query.get("year") === "2024" ? 2024 : 2025;
  const season = query.getAll("season").length === 1 && query.get("season") === "first" ? "first" : "second";
  const selected = props.periods.find(item => item.year === year && item.season === season);
  return <Denken3Practice {...props} selected={selected ?? props.periods[0]} />;
}

function landingPath(year: number, season: string) {
  return `/denken3?year=${year}&season=${season}`;
}

export function Denken3Practice({ periods, originalCount, selected }: Props & { selected: PracticePeriod }) {
  const { year, season, examDate, referralPractice, subjects } = selected;
  const period = `${year}年度 ${season === "first" ? "上期" : "下期"}`;
  const returnTo = landingPath(year, season);

  return <>
    <TsuginoWelcome href={referralPractice} qualification="電験三種" />
    <div className="mb-6">
      <Link href="/qualifications" className="text-sm font-medium text-primary hover:underline">← 資格一覧へ戻る</Link>
    </div>
    <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">電験三種の過去問</h1>
    <p className="mt-3 max-w-2xl leading-relaxed text-muted-foreground">
      理論・電力・機械・法規の過去問を{originalCount}原問収録しています。
    </p>

    <section aria-label="年度と期を選ぶ" className="mt-7 rounded-2xl border border-border bg-card p-4 sm:p-5">
      <h2 className="text-base font-bold">年度・期</h2>
      {examDate && <p className="mt-1 text-sm text-muted-foreground">{period}の試験実施日：{examDate.replaceAll("-", "/")}</p>}
      <div className="mt-3 flex flex-wrap gap-2">
        {periods.map(({ year: itemYear, season: itemSeason }) => {
          const selected = itemYear === year && itemSeason === season;
          return (
            <Link
              key={`${itemYear}-${itemSeason}`}
              href={landingPath(itemYear, itemSeason)}
              aria-current={selected ? "page" : undefined}
              className={`inline-flex min-h-11 items-center rounded-xl border px-4 py-2 text-sm font-semibold transition ${selected ? "border-primary bg-primary text-primary-foreground" : "border-border bg-background hover:border-primary hover:text-primary"}`}
            >
              {itemYear}年度 {itemSeason === "first" ? "上期" : "下期"}
            </Link>
          );
        })}
      </div>
    </section>

    <section aria-labelledby="denken3-subjects" className="mt-8">
      <h2 id="denken3-subjects" className="text-xl font-bold">{period}の科目を選ぶ</h2>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {subjects.map(({ session, name, description, count }) => {
          const href = `/quiz?${new URLSearchParams({ mode: "year", exam: "denken3", year: String(year), season, session, order: "1", returnTo }).toString()}`;
          return (
            <Link key={session} href={href} className="group flex min-h-36 items-center justify-between gap-4 rounded-2xl border border-border bg-card p-5 shadow-sm transition hover:border-primary hover:shadow-md focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/40">
              <div>
                <span className="inline-flex items-center gap-2 text-xl font-bold"><BookOpenCheck className="h-5 w-5 text-primary" aria-hidden="true" />{name}</span>
                <p className="mt-2 text-sm text-muted-foreground">{description}</p>
                <p className="mt-2 text-sm font-semibold text-primary">{period}・{count}問</p>
                <span className="mt-2 inline-block text-sm font-bold text-primary">{name}を解く</span>
              </div>
              <ArrowRight className="h-6 w-6 shrink-0 text-primary transition group-hover:translate-x-1" aria-hidden="true" />
            </Link>
          );
        })}
      </div>
    </section>
  </>;
}
