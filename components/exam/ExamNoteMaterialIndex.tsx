import { ArrowUpRight, BookOpenText } from "lucide-react";
import type { ExamCode } from "@/lib/questions/types";
import { TrackedNoteLink, type NoteLinkSource } from "@/components/analytics/TrackedNoteLink";
import { NwNoteMaterialIndex } from "@/components/exam/NwNoteMaterialIndex";

interface MaterialIndex {
  label: string;
  href: string;
  title: string;
  description: string;
  source: NoteLinkSource;
}

// Qualification indexes published by ipa_quiz_ai; NW retains its existing card.
// Each free index leads to article previews and optional individual purchases.
const MATERIAL_INDEXES: Partial<Record<ExamCode, MaterialIndex>> = {
  st: {
    label: "ST",
    href: "https://note.com/ipa_quiz_ai/m/m7dab1384f6bb",
    title: "STの論文答案設計を補う教材",
    description: "索引は無料で閲覧できます。対象年度・問題を選び、各記事の無料部分で内容と収録範囲を確認してください。令和6年度春期の午後Ⅱ・問1では、DXの技術検証を経営判断へつなぐ答案設計を扱います。公式問題を使った答案設計の教材です。必要な記事だけを選べる買い切り単品（各1,280円）で、購入は任意です。",
    source: "exam_st",
  },
  sa: {
    label: "SA",
    href: "https://note.com/ipa_quiz_ai/m/mfd0e3cddd722",
    title: "SAの論文答案設計を補う教材",
    description: "索引は無料で閲覧できます。対象年度・問題を選び、各記事の無料部分で内容と収録範囲を確認してください。令和7年度春期の午後Ⅱ・問2では、データ移行の答案設計を扱います。公式問題を使った答案設計の教材です。必要な記事だけを選べる買い切り単品（各1,280円）で、購入は任意です。",
    source: "exam_sa",
  },
};

export function ExamNoteMaterialIndex({ exam }: { exam: ExamCode }) {
  if (exam === "nw") return <NwNoteMaterialIndex exam={exam} />;
  const index = MATERIAL_INDEXES[exam];
  if (!index) return null;

  return (
    <aside aria-label={`${index.label}教材の無料索引`} className="mb-8 rounded-2xl border border-border bg-muted/20 p-4 sm:p-5">
      <h2 className="flex items-center gap-2 text-sm font-semibold">
        <BookOpenText aria-hidden="true" className="h-4 w-4 shrink-0 text-muted-foreground" />
        {index.title}
      </h2>
      <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{index.description}</p>
      <TrackedNoteLink
        href={index.href}
        source={index.source}
        account="ipa_quiz_ai"
        target="_blank"
        rel="noopener noreferrer"
        className="mt-2 inline-flex min-h-11 items-center gap-1.5 text-xs font-semibold text-primary hover:underline"
      >
        {index.label}教材の無料索引を見る
        <ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5" />
        <span className="sr-only">（新しいタブで開きます）</span>
      </TrackedNoteLink>
    </aside>
  );
}
