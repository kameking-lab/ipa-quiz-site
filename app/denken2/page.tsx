import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpenCheck } from "lucide-react";
import { DENKEN2_QUESTIONS } from "@/data/questions/denken2";
import { ExamYearArchiveLinks } from "@/components/seo/ExamYearArchiveLinks";
import type { Session } from "@/lib/questions/types";
import { NATIVE_EDITIONS, getNativeSubjectQuestions, nativeSubjectPath } from "@/lib/denken2/native";

export const metadata: Metadata = {
  title: "電験二種 一次試験 過去問｜2025・2026年度の収録範囲",
  description: "第二種電気主任技術者一次試験の2026年度理論・電力・機械・法規と、2025年度理論・機械を原問単位で収録。公式問題の図・正答と全欄の解説を確認できます。",
  alternates: { canonical: "/denken2" },
};

const YEAR = 2026;
const SEASON = "primary";
const RETURN_TO = "/denken2";

const SUBJECTS: { session: Session; name: string; description: string }[] = [
  { session: "denryoku", name: "電力", description: "発電・変電・送配電・電力系統" },
  { session: "houki", name: "法規", description: "電気事業法・電気設備技術基準・系統運用" },
];

export default function Denken2Page() {
  const examDate = DENKEN2_QUESTIONS[0]?.examDate;
  const total = DENKEN2_QUESTIONS.length;
  const native2026 = NATIVE_EDITIONS.find(item => item.year === 2026);
  const native2025 = NATIVE_EDITIONS.find(item => item.year === 2025);
  const originalCount2026 = total / 5 + (native2026?.questions.length ?? 0);
  return (
    <main className="mx-auto max-w-5xl px-4 pb-20 pt-8 sm:pt-12">
      <div className="mb-6">
        <Link href="/qualifications" className="text-sm font-medium text-primary hover:underline">← 資格一覧へ戻る</Link>
      </div>
      <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">電験二種 一次試験の過去問</h1>
      <p className="mt-3 max-w-2xl leading-relaxed text-muted-foreground">
        令和8年度（{examDate ? examDate.replaceAll("-", "/") : "2026/08/30"}実施）の一次試験から、電力・法規の14原問・70空欄と、理論・機械の16原問・85回答欄を収録しています。計{originalCount2026}原問です。
        電力・法規は空欄ごとの演習、理論・機械は原問単位の演習で、公式問題の図・数式・正答を確認できます。
      </p>
      <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
        2025年度は理論・機械の{native2025?.questions.length ?? 0}原問・80回答欄を収録しています。2025年度の電力・法規と二次試験は未収録です。問7と問8が選択問題の科目は、両原問を掲載していますが、本試験では一方だけ解答します。
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
      <section aria-labelledby="denken2-native-subjects" className="mt-9">
        <h2 id="denken2-native-subjects" className="text-xl font-bold">令和8年度 理論・機械の原問を解く</h2>
        <p className="mt-2 text-sm leading-7 text-muted-foreground">各科目8原問。5欄ずつ、機械問7は定義5欄と単位5欄を原本の3表とともに掲載しています。</p>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {(["theory", "machine"] as const).map(subject => {
            const questions = getNativeSubjectQuestions(2026, subject);
            const name = subject === "theory" ? "理論" : "機械";
            const fields = subject === "theory" ? 40 : 45;
            return <Link key={subject} href={nativeSubjectPath(2026, subject)}
              className="flex min-h-32 items-center justify-between rounded-2xl border border-border bg-card p-5 shadow-sm hover:border-primary focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/40">
              <span><span className="block text-xl font-bold">{name}</span><span className="mt-2 block text-sm text-muted-foreground">{questions.length}原問・{fields}回答欄</span></span>
              <ArrowRight className="h-6 w-6 shrink-0 text-primary" aria-hidden="true" />
            </Link>;
          })}
        </div>
      </section>
      <section aria-labelledby="denken2-native-2025" className="mt-9">
        <h2 id="denken2-native-2025" className="text-xl font-bold">2025年度 理論・機械の原問を解く</h2>
        <p className="mt-2 text-sm leading-7 text-muted-foreground">各科目8原問・40回答欄。機械問8は空欄ごとに別の5肢解答群を使います。</p>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {(["theory", "machine"] as const).map(subject => {
            const questions = getNativeSubjectQuestions(2025, subject);
            const name = subject === "theory" ? "理論" : "機械";
            return <Link key={subject} href={nativeSubjectPath(2025, subject)}
              className="flex min-h-32 items-center justify-between rounded-2xl border border-border bg-card p-5 shadow-sm hover:border-primary focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/40">
              <span><span className="block text-xl font-bold">{name}</span><span className="mt-2 block text-sm text-muted-foreground">{questions.length}原問・40回答欄</span></span>
              <ArrowRight className="h-6 w-6 shrink-0 text-primary" aria-hidden="true" />
            </Link>;
          })}
        </div>
      </section>
      <ExamYearArchiveLinks exam="denken2" />
      <p className="mt-7 text-sm leading-relaxed text-muted-foreground">
        問題・正答の出典：一般財団法人 電気技術者試験センター「第二種電気主任技術者一次試験（2025・2026年度）」。電力・法規は空欄ごとの演習に分けて整形し、理論・機械は原問単位で原本画像とともに掲載しています。解説は当サイトが独自に作成しました。
      </p>
    </main>
  );
}
