import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpenCheck } from "lucide-react";
import { DENKEN1_QUESTIONS } from "@/data/questions/denken1";
import { ExamYearArchiveLinks } from "@/components/seo/ExamYearArchiveLinks";
import type { Session } from "@/lib/questions/types";
import { DENKEN1_NATIVE_PARTS, DENKEN1_PUBLISHED_ORIGINAL_COUNT, denken1NativeSubjectPath } from "@/lib/denken1/native";

export const metadata: Metadata = {
  title: "電験一種 一次試験 過去問｜2025・2026年度の収録範囲",
  description: "第一種電気主任技術者一次試験の2025・2026年度から確認済みの理論・電力・機械37原問を原問単位で収録。従来の2026年度5原問・25空欄も保持しています。",
  alternates: { canonical: "/denken1" },
};

const SUBJECTS: { session: Session; name: string; original: string; description: string }[] = [
  { session: "riron", name: "理論", original: "A問題 問2・問3", description: "半導体の輸送・発振回路" },
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
        令和8年度（2026/08/30実施）の一次試験から、理論2原問と電力・機械・法規の各1原問を収録しています。
        原問の空欄(1)〜(5)を1問ずつ、公式の解答群(イ)〜(ヨ)の15肢から選ぶ形式で、全{total}空欄に全肢の解説があります。
      </p>
      <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
        2025・2026年度の理論・電力・機械37原問・209回答欄を原問単位でも確認できます。従来の5原問と重なる2原問を重複計上せず、掲載する固有の原問は計{DENKEN1_PUBLISHED_ORIGINAL_COUNT}件です。両年度の全問と二次試験は未収録です。
      </p>
      <section aria-labelledby="denken1-subjects" className="mt-8">
        <h2 id="denken1-subjects" className="text-xl font-bold">令和8年度 一次試験の科目を選ぶ</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {SUBJECTS.map(({ session, name, original, description }) => {
            const rows = DENKEN1_QUESTIONS.filter((q) => q.session === session);
            const count = rows.length;
            const originalCount = new Set(rows.map((q) => q.qNumber)).size;
            const href = `/quiz?${new URLSearchParams({ mode: "year", exam: "denken1", year: "2026", season: "primary", session, order: "1", returnTo: "/denken1" }).toString()}`;
            return (
              <Link key={session} href={href} className="group flex min-h-36 items-center justify-between gap-4 rounded-2xl border border-border bg-card p-5 shadow-sm transition hover:border-primary hover:shadow-md focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/40">
                <div>
                  <span className="inline-flex items-center gap-2 text-xl font-bold"><BookOpenCheck className="h-5 w-5 text-primary" aria-hidden="true" />{name}</span>
                  <p className="mt-2 text-sm text-muted-foreground">{original}・{description}</p>
                  <p className="mt-2 text-sm font-semibold text-primary">令和8年度・{count}空欄（{originalCount}原問）</p>
                  <span className="mt-2 inline-block text-sm font-bold text-primary">{name}を解く</span>
                </div>
                <ArrowRight className="h-6 w-6 shrink-0 text-primary transition group-hover:translate-x-1" aria-hidden="true" />
              </Link>
            );
          })}
        </div>
      </section>
      <section aria-labelledby="denken1-native-subjects" className="mt-9">
        <h2 id="denken1-native-subjects" className="text-xl font-bold">2025・2026年度の原問を年・科目から選ぶ</h2>
        <p className="mt-2 text-sm leading-7 text-muted-foreground">確認済みの原問だけを掲載します。2026年度理論の問4は個別の確認事項が残るため、この一覧には含めていません。</p>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {DENKEN1_NATIVE_PARTS.map(part => {
            const name = { theory: "理論", power: "電力", machine: "機械", law: "法規" }[part.subject];
            const fields = part.questions.reduce((sum, q) => sum + q.slots.length, 0);
            return <Link key={`${part.year}-${part.subject}`} href={denken1NativeSubjectPath(part.year, part.subject)}
              className="flex min-h-32 items-center justify-between rounded-2xl border border-border bg-card p-5 shadow-sm hover:border-primary focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/40">
              <span><span className="block text-xl font-bold">{part.year}年度 {name}</span><span className="mt-2 block text-sm text-muted-foreground">{part.questions.length}原問・{fields}回答欄</span></span>
              <ArrowRight className="h-6 w-6 shrink-0 text-primary" aria-hidden="true" />
            </Link>;
          })}
        </div>
      </section>
      <ExamYearArchiveLinks exam="denken1" />
      <p className="mt-7 text-sm leading-relaxed text-muted-foreground">
        問題・正答の出典：一般財団法人 電気技術者試験センター「2025・2026年度第一種電気主任技術者一次試験」。従来の2026年度5原問は空欄ごとの演習に分けて整形し、追加した原問は公式ページ画像とともに原問単位で掲載しています。解説は当サイトが作成しました。
      </p>
    </main>
  );
}
