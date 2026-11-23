import { NextExamSchedule } from "@/components/exam/NextExamSchedule";
import { formatExamSearchMetadata } from "@/lib/seo/exam-search-metadata";
import { withCanonicalSocialMetadata } from "@/lib/seo/page-metadata";
import { referralPracticeHref } from "@/lib/questions/referral-practice";
import { Suspense } from "react";
import { Denken3Practice, Denken3PracticeSelection, type PracticePeriod } from "./Denken3Practice";
import type { Metadata } from "next";
import Link from "next/link";
import { DENKEN3_QUESTIONS } from "@/data/questions/denken3";
import { ExamYearArchiveLinks } from "@/components/seo/ExamYearArchiveLinks";
import type { Session } from "@/lib/questions/types";
import { DENKEN3_NATIVE_QUESTIONS, DENKEN3_NATIVE_SUBJECTS, DENKEN3_PUBLISHED_ORIGINAL_COUNT, denken3NativeSittingLabel, denken3NativeSubjectPath } from "@/lib/denken3/native";

const searchMetadata = formatExamSearchMetadata("電験三種", DENKEN3_PUBLISHED_ORIGINAL_COUNT, DENKEN3_QUESTIONS.map(q => q.year));
export const metadata: Metadata = withCanonicalSocialMetadata({
  ...searchMetadata,
  alternates: { canonical: "/denken3" },
});

const SUBJECTS: { session: Session; name: string; description: string }[] = [
  { session: "riron", name: "理論", description: "電気・電子の基礎と計測" },
  { session: "denryoku", name: "電力", description: "発電・変電・送配電" },
  { session: "kikai", name: "機械", description: "電気機器と応用" },
  { session: "houki", name: "法規", description: "法令と電気施設管理" },
];

function practicePeriod(year: PracticePeriod["year"], season: PracticePeriod["season"]): PracticePeriod {
  const questions = DENKEN3_QUESTIONS.filter(q => q.year === year && q.season === season);
  return {
    year, season, examDate: questions[0]?.examDate,
    referralPractice: referralPracticeHref(questions, "/denken3"),
    subjects: SUBJECTS.map(subject => ({ ...subject, count: questions.filter(q => q.session === subject.session).length })),
  };
}

const periods = [
  practicePeriod(2025, "second"), practicePeriod(2025, "first"),
  practicePeriod(2024, "second"), practicePeriod(2024, "first"),
] as const;

export default function Denken3Page() {
  const originalCount = DENKEN3_PUBLISHED_ORIGINAL_COUNT;
  return (
    <main className="mx-auto max-w-5xl px-4 pb-20 pt-8 sm:pt-12">
      <NextExamSchedule exam="denken3" />
      <Suspense fallback={<Denken3Practice periods={periods} originalCount={originalCount} selected={periods[0]} />}>
        <Denken3PracticeSelection periods={periods} originalCount={originalCount} />
      </Suspense>
      <section aria-labelledby="denken3-native" className="mt-9">
        <h2 id="denken3-native" className="text-xl font-bold">原本画像付きの原問演習</h2>
        <p className="mt-2 text-sm leading-7 text-muted-foreground">{DENKEN3_NATIVE_QUESTIONS.length}原問・{DENKEN3_NATIVE_QUESTIONS.reduce((sum, q) => sum + q.slots.length, 0)}回答欄を原本画像とともに収録しています。</p>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">{DENKEN3_NATIVE_SUBJECTS.map(part => {
          const label = denken3NativeSittingLabel(part.sitting);
          const name = part.subject === "theory" ? "理論" : part.subject === "power" ? "電力" : part.subject === "machine" ? "機械" : "法規";
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
