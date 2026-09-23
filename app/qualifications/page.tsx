import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ExternalLink } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { QUESTIONS_BY_EXAM } from "@/data/questions";
import { QUALIFICATION_CATALOG } from "@/lib/qualifications/catalog";

export const metadata: Metadata = {
  title: "FPなどの公式公開過去問",
  description: "FP2級・FP3級の公式公開過去問を、全選択肢の学習用解説と公式問題・正答リンク付きで学べます。",
  alternates: { canonical: "/qualifications" },
};

const published = QUALIFICATION_CATALOG.filter((item) => item.status === "live");
const questionCounts: Record<string, number> = Object.fromEntries(
  published.map((item) => [item.slug, item.examCode ? (QUESTIONS_BY_EXAM[item.examCode]?.length ?? 0) : 0]),
);
const publishedQuestionCount = published.reduce((sum, item) => sum + (questionCounts[item.slug] ?? 0), 0);

export default function QualificationsPage() {
  return (
    <main className="mx-auto w-full max-w-3xl flex-1 px-4 pb-16 pt-6 sm:px-6 sm:pt-10">
      <Button asChild variant="ghost" size="sm" className="mb-4">
        <Link href="/"><ArrowLeft className="h-4 w-4" />分野選択へ戻る</Link>
      </Button>
      <header className="mb-8">
        <Badge variant="soft" className="mb-3">公式公開資料から収録</Badge>
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">その他資格の過去問</h1>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          公式問題と正答を確認でき、再利用条件と公開前手続きを満たした問題だけを掲載しています。現在は試験版として合計{publishedQuestionCount}問を収録しています。
        </p>
      </header>

      <div className="grid gap-4 sm:grid-cols-2">
        {published.map((item) => (
          <article key={item.slug} className="rounded-2xl border border-border bg-card p-5 shadow-sm">
            <div className="mb-3 flex items-center justify-between gap-3">
              <h2 className="text-lg font-bold">{item.shortName}</h2>
              <Badge variant="outline">収録 {questionCounts[item.slug]} 問</Badge>
            </div>
            <p className="mb-4 text-sm leading-relaxed text-muted-foreground">{item.fullName}。{item.reuseSummary}</p>
            {item.slug === "fp2" && <p className="mb-4 text-sm text-muted-foreground">2024・2025年の公式公開4回：学科240問と実技160問を年度別に収録。2026年5月公表の学科は60問中、問1〜10を先行収録しています。</p>}
            <Button asChild variant="primary" className="w-full">
              <Link href={`/${item.examCode}`}>年度・科目を選ぶ<ArrowRight className="h-4 w-4" /></Link>
            </Button>
            <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-xs">
              <a href={item.officialQuestionsUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 underline">
                公式問題・正答<ExternalLink className="h-3 w-3" />
              </a>
              <a href={item.officialReuseTermsUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 underline">
                利用条件<ExternalLink className="h-3 w-3" />
              </a>
            </div>
          </article>
        ))}
      </div>

      <p className="mt-8 rounded-xl border border-border bg-muted/30 p-4 text-xs leading-relaxed text-muted-foreground">
        解説は学習支援用に作成したもので、試験実施機関による公式解説ではありません。各問題画面から公式問題PDFと公式正答を確認できます。
      </p>
    </main>
  );
}
