import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ExternalLink } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { QUESTIONS_BY_EXAM } from "@/data/questions";
import { fp2May2026CoverageLabel } from "@/data/questions/fp2";
import { FP2_PRACTICAL_EDITIONS, getPracticalEdition } from "@/lib/fp2/practical";
import { FP3_PRACTICAL_EDITIONS, getPracticalEdition as getFp3PracticalEdition } from "@/lib/fp3/practical";
import { QUALIFICATION_CATALOG } from "@/lib/qualifications/catalog";

export const metadata: Metadata = {
  title: "FP・電気・施工管理・登録販売者の公式公開過去問",
  description: "FP2級・FP3級・電験三種・第二種電気工事士・2級土木施工管理・登録販売者（関西広域連合）の公式公開過去問を、公式問題・正答と学習用解説で学べます。",
  alternates: { canonical: "/qualifications" },
};

const published = QUALIFICATION_CATALOG.filter((item) => item.status === "live");
const questionCounts: Record<string, number> = Object.fromEntries(
  published.map((item) => [item.slug, item.examCode ? (QUESTIONS_BY_EXAM[item.examCode]?.length ?? 0) : 0]),
);
const fp2PracticalCount = FP2_PRACTICAL_EDITIONS.reduce(
  (sum, edition) => sum + (getPracticalEdition(edition)?.questions.length ?? 0), 0,
);
const fp3PracticalCount = FP3_PRACTICAL_EDITIONS.reduce(
  (sum, edition) => sum + (getFp3PracticalEdition(edition)?.questions.length ?? 0), 0,
);

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
          FP2級・FP3級・電験三種・第二種電気工事士・2級土木施工管理・登録販売者（関西広域連合）の公式公開過去問を、年度と科目から選べます。
        </p>
      </header>

      <div className="grid gap-4 sm:grid-cols-2">
        {published.map((item) => (
          <article key={item.slug} className="rounded-2xl border border-border bg-card p-5 shadow-sm">
            <div className="mb-3 flex items-center justify-between gap-3">
              <h2 className="text-lg font-bold">{item.shortName}</h2>
              <Badge variant="outline">{item.slug === "fp2" ? `学科 ${questionCounts.fp2}問・実技 ${fp2PracticalCount}問` : item.slug === "fp3" ? `学科 ${questionCounts.fp3}問・実技 ${fp3PracticalCount}問` : `収録 ${questionCounts[item.slug]}問`}</Badge>
            </div>
            <p className="mb-4 text-sm leading-relaxed text-muted-foreground">{item.fullName}。{item.reuseSummary}</p>
            {item.slug === "fp2" && <><p className="text-sm text-muted-foreground">2024・2025年の学科240問と2026年5月公表の学科{fp2May2026CoverageLabel()}、実技は2024～2026年の{FP2_PRACTICAL_EDITIONS.length}セット{fp2PracticalCount}問を収録。</p></>}
            {item.slug === "fp3" && <p className="mb-4 text-sm text-muted-foreground">2024～2026年の学科180問・実技60問を収録。各年の公式問題と正答を確認できます。</p>}
            <Button asChild variant="primary" className="w-full">
              <Link href={`/${item.examCode}`}>年度・科目を選ぶ<ArrowRight className="h-4 w-4" /></Link>
            </Button>
            <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-xs">
              <a href={item.officialQuestionsUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 underline">
                公式問題・正答<ExternalLink className="h-3 w-3" />
              </a>
              {item.slug !== "sekou-doboku2" && <a href={item.officialReuseTermsUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 underline">
                利用条件<ExternalLink className="h-3 w-3" />
              </a>}
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
