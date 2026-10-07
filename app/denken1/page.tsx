import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpenCheck } from "lucide-react";
import { DENKEN1_QUESTIONS } from "@/data/questions/denken1";
import type { Session } from "@/lib/questions/types";

export const metadata: Metadata = {
  title: "電験一種 一次試験 過去問｜令和8年度 理論・電力・機械・法規",
  description: "第一種電気主任技術者一次試験の令和8年度公式問題から理論・電力・機械・法規の各1原問、計20空欄を収録。15肢の解答群と全肢の理由を確認できます。",
  alternates: { canonical: "/denken1" },
};

const SUBJECTS: { session: Session; name: string; original: string; description: string }[] = [
  { session: "riron", name: "理論", original: "A問題 問2", description: "半導体の拡散・ドリフト" },
  { session: "denryoku", name: "電力", original: "A問題 問2", description: "交流遮断器の故障遮断" },
  { session: "kikai", name: "機械", original: "A問題 問3", description: "同期モータのトルク" },
  { session: "houki", name: "法規", original: "A問題 問1", description: "電気事業法と保安責務" },
];

export default function Denken1Page() {
  const total = DENKEN1_QUESTIONS.length;
  return (
    <main className="mx-auto max-w-5xl px-4 pb-20 pt-8 sm:pt-12">
      <div className="mb-6"><Link href="/qualifications" className="text-sm font-medium text-primary hover:underline">← 資格一覧へ戻る</Link></div>
      <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">電験一種 一次試験の過去問</h1>
      <p className="mt-3 max-w-2xl leading-relaxed text-muted-foreground">
        令和8年度（2026/08/30実施）の一次試験から、理論・電力・機械・法規の各1原問を収録しています。
        原問の空欄(1)〜(5)を1問ずつ、公式の解答群(イ)〜(ヨ)の15肢から選ぶ形式で、全{total}空欄に全肢の解説があります。
      </p>
      <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
        収録範囲：理論A問2・電力A問2・機械A問3・法規A問1のみ。同年度の他の原問、過年度、二次試験は未収録です。
      </p>
      <section aria-labelledby="denken1-subjects" className="mt-8">
        <h2 id="denken1-subjects" className="text-xl font-bold">令和8年度 一次試験の科目を選ぶ</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {SUBJECTS.map(({ session, name, original, description }) => {
            const count = DENKEN1_QUESTIONS.filter((q) => q.session === session).length;
            const href = `/quiz?${new URLSearchParams({ mode: "year", exam: "denken1", year: "2026", season: "primary", session, order: "1", returnTo: "/denken1" }).toString()}`;
            return (
              <Link key={session} href={href} className="group flex min-h-36 items-center justify-between gap-4 rounded-2xl border border-border bg-card p-5 shadow-sm transition hover:border-primary hover:shadow-md focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/40">
                <div>
                  <span className="inline-flex items-center gap-2 text-xl font-bold"><BookOpenCheck className="h-5 w-5 text-primary" aria-hidden="true" />{name}</span>
                  <p className="mt-2 text-sm text-muted-foreground">{original}・{description}</p>
                  <p className="mt-2 text-sm font-semibold text-primary">令和8年度・{count}空欄（1原問）</p>
                  <span className="mt-2 inline-block text-sm font-bold text-primary">{name}を解く</span>
                </div>
                <ArrowRight className="h-6 w-6 shrink-0 text-primary transition group-hover:translate-x-1" aria-hidden="true" />
              </Link>
            );
          })}
        </div>
      </section>
      <p className="mt-7 text-sm leading-relaxed text-muted-foreground">
        問題・正答の出典：一般財団法人 電気技術者試験センター「令和8年度第一種電気主任技術者一次試験」。問題文は空欄ごとの設問に分けて整形しています（改変あり）。
      </p>
    </main>
  );
}
