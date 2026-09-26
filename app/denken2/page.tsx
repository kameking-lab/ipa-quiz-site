import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpenCheck } from "lucide-react";
import { DENKEN2_QUESTIONS } from "@/data/questions/denken2";
import type { Session } from "@/lib/questions/types";

export const metadata: Metadata = {
  title: "電験二種 一次試験 過去問｜令和8年度 電力・法規",
  description: "第二種電気主任技術者一次試験（令和8年度）の電力・法規を空欄ごとに演習。公式の解答群15肢から選び、全肢の理由と公式問題・正答を確認できます。",
  alternates: { canonical: "/denken2" },
};

const YEAR = 2026;
const SEASON = "primary";
const RETURN_TO = "/denken2";

const SUBJECTS: { session: Session; name: string; description: string }[] = [
  { session: "denryoku", name: "電力", description: "発電・変電・送配電・電力系統" },
  { session: "houki", name: "法規", description: "電気事業法・電気設備技術基準・系統運用" },
];

const NOT_YET = ["理論", "機械"];

export default function Denken2Page() {
  const examDate = DENKEN2_QUESTIONS[0]?.examDate;
  const total = DENKEN2_QUESTIONS.length;
  return (
    <main className="mx-auto max-w-5xl px-4 pb-20 pt-8 sm:pt-12">
      <div className="mb-6">
        <Link href="/qualifications" className="text-sm font-medium text-primary hover:underline">← 資格一覧へ戻る</Link>
      </div>
      <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">電験二種 一次試験の過去問</h1>
      <p className="mt-3 max-w-2xl leading-relaxed text-muted-foreground">
        令和8年度（{examDate ? examDate.replaceAll("-", "/") : "2026/08/30"}実施）の一次試験から、電力・法規の2科目を収録しています。
        各問の空欄(1)〜(5)を1問ずつ、公式の解答群(イ)〜(ヨ)の15肢から選ぶ形式で、全{total}空欄に全肢の解説があります。
      </p>
      <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
        収録範囲：令和8年度一次試験の電力（問1〜問7）・法規（問1〜問7）のみ。{NOT_YET.join("・")}と過年度、二次試験は未収録です。
      </p>

      <section aria-labelledby="denken2-subjects" className="mt-8">
        <h2 id="denken2-subjects" className="text-xl font-bold">令和8年度 一次試験の科目を選ぶ</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {SUBJECTS.map(({ session, name, description }) => {
            const count = DENKEN2_QUESTIONS.filter((q) => q.year === YEAR && q.season === SEASON && q.session === session).length;
            const href = `/quiz?${new URLSearchParams({ mode: "year", exam: "denken2", year: String(YEAR), season: SEASON, session, order: "1", returnTo: RETURN_TO }).toString()}`;
            return (
              <Link key={session} href={href} className="group flex min-h-36 items-center justify-between gap-4 rounded-2xl border border-border bg-card p-5 shadow-sm transition hover:border-primary hover:shadow-md focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/40">
                <div>
                  <span className="inline-flex items-center gap-2 text-xl font-bold"><BookOpenCheck className="h-5 w-5 text-primary" aria-hidden="true" />{name}</span>
                  <p className="mt-2 text-sm text-muted-foreground">{description}</p>
                  <p className="mt-2 text-sm font-semibold text-primary">令和8年度・{count}空欄（7問）</p>
                  <span className="mt-2 inline-block text-sm font-bold text-primary">{name}を解く</span>
                </div>
                <ArrowRight className="h-6 w-6 shrink-0 text-primary transition group-hover:translate-x-1" aria-hidden="true" />
              </Link>
            );
          })}
        </div>
      </section>
      <p className="mt-7 text-sm leading-relaxed text-muted-foreground">
        問題・正答の出典：一般財団法人 電気技術者試験センター「令和8年度第二種電気主任技術者一次試験」。問題文は空欄ごとの設問に分けて整形しています（改変あり）。
      </p>
    </main>
  );
}
