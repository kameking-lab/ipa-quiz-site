import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpenCheck } from "lucide-react";
import { DENKEN3_QUESTIONS } from "@/data/questions/denken3";
import { ExamYearArchiveLinks } from "@/components/seo/ExamYearArchiveLinks";
import type { Session } from "@/lib/questions/types";
import { DENKEN3_NATIVE_PARTS, DENKEN3_NEW_ORIGINAL_COUNT, DENKEN3_PUBLISHED_ORIGINAL_COUNT, denken3NativeSubjectPath } from "@/lib/denken3/native";

export const metadata: Metadata = {
  title: "電験三種 過去問｜理論・電力・機械・法規",
  description: "電験三種の確認済み295原問を収録。2026年度上期の理論・電力・法規と2025年度下期の法規は、原本画像と5肢の解説を原問単位で確認できます。",
  alternates: { canonical: "/denken3" },
};

const SUBJECTS: { session: Session; name: string; description: string }[] = [
  { session: "riron", name: "理論", description: "電気・電子の基礎と計測" },
  { session: "denryoku", name: "電力", description: "発電・変電・送配電" },
  { session: "kikai", name: "機械", description: "電気機器と応用" },
  { session: "houki", name: "法規", description: "法令と電気施設管理" },
];

interface Params { year?: string; season?: string }

function selection(sp: Params): { year: 2024 | 2025; season: "first" | "second" } {
  return {
    year: sp.year === "2024" ? 2024 : 2025,
    season: sp.season === "first" ? "first" : "second",
  };
}

function landingPath(year: number, season: string): string {
  return `/denken3?year=${year}&season=${season}`;
}

export default async function Denken3Page({ searchParams }: { searchParams: Promise<Params> }) {
  const { year, season } = selection(await searchParams);
  const period = `${year}年度 ${season === "first" ? "上期" : "下期"}`;
  const returnTo = landingPath(year, season);
  const examDate = DENKEN3_QUESTIONS.find((q) => q.year === year && q.season === season)?.examDate;

  return (
    <main className="mx-auto max-w-5xl px-4 pb-20 pt-8 sm:pt-12">
      <div className="mb-6">
        <Link href="/qualifications" className="text-sm font-medium text-primary hover:underline">← 資格一覧へ戻る</Link>
      </div>
      <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">電験三種の過去問</h1>
      <p className="mt-3 max-w-2xl leading-relaxed text-muted-foreground">
        2024・2025年度の従来演習320回答単位（264原問）を保持し、確認済みの原問を31題追加しました。現在、固有{DENKEN3_PUBLISHED_ORIGINAL_COUNT}原問を収録しています。従来演習の全肢解説319回答単位と、公式正答・一般解説1回答単位も利用できます。
      </p>

      <section aria-label="年度と期を選ぶ" className="mt-7 rounded-2xl border border-border bg-card p-4 sm:p-5">
        <h2 className="text-base font-bold">年度・期</h2>
        {examDate && <p className="mt-1 text-sm text-muted-foreground">{period}の試験実施日：{examDate.replaceAll("-", "/")}</p>}
        <div className="mt-3 flex flex-wrap gap-2">
          {([2025, 2024] as const).flatMap((itemYear) => (["second", "first"] as const).map((itemSeason) => {
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
          }))}
        </div>
      </section>

      <section aria-labelledby="denken3-subjects" className="mt-8">
        <h2 id="denken3-subjects" className="text-xl font-bold">{period}の科目を選ぶ</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {SUBJECTS.map(({ session, name, description }) => {
            const count = DENKEN3_QUESTIONS.filter((q) => q.year === year && q.season === season && q.session === session).length;
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
      <section aria-labelledby="denken3-native" className="mt-9">
        <h2 id="denken3-native" className="text-xl font-bold">原本画像付きの原問演習</h2>
        <p className="mt-2 text-sm leading-7 text-muted-foreground">確認済み36原問・40回答欄を原問単位で掲載。旧演習と重なる2025年度下期法規5原問を除いた純増は{DENKEN3_NEW_ORIGINAL_COUNT}原問です。2026年度上期の理論Q17・Q18は本試験では一方だけ解答します。未確認の問題と二次試験は掲載していません。</p>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">{DENKEN3_NATIVE_PARTS.map(part => {
          const label = part.sitting === "2026-upper" ? "2026年度上期" : "2025年度下期";
          const name = part.subject === "theory" ? "理論" : part.subject === "power" ? "電力" : "法規";
          return <Link key={`${part.sitting}-${part.subject}`} href={denken3NativeSubjectPath(part.sitting, part.subject)}
            className="rounded-2xl border border-border bg-card p-5 text-primary underline focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/40">
            {label} {name}：{part.questions.length}原問・{part.questions.reduce((sum, q) => sum + q.slots.length, 0)}回答欄
          </Link>;
        })}</div>
      </section>
      <ExamYearArchiveLinks exam="denken3" />
      <p className="mt-7 text-sm leading-relaxed text-muted-foreground">
        問題・正答の出典：一般財団法人 電気技術者試験センター。電力1問は公式正答と一般解説を掲載し、選択肢ごとの解説は図表の根拠を確認後に追加します。
      </p>
    </main>
  );
}
