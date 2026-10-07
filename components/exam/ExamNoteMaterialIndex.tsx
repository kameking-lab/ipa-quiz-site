import { ArrowUpRight, BookOpenText } from "lucide-react";
import type { ExamCode } from "@/lib/questions/types";
import { ExamNotePaidMaterial } from "@/components/exam/ExamNotePaidMaterial";
import { TrackedNoteLink, type NoteLinkSource } from "@/components/analytics/TrackedNoteLink";
import { NwNoteMaterialIndex } from "@/components/exam/NwNoteMaterialIndex";

interface MaterialIndex {
  label: string;
  href: string;
  title: string;
  description: string;
  source: NoteLinkSource;
}

// Qualification indexes published by ipa_quiz_ai; each card also offers one matched article.
// Each free index leads to article previews and optional individual purchases.
const MATERIAL_INDEXES: Partial<Record<ExamCode, MaterialIndex>> = {
  st: {
    label: "ST",
    href: "https://note.com/ipa_quiz_ai/m/m7dab1384f6bb",
    title: "STの論文答案設計を補う教材",
    description: "ほかの年度・問題は無料索引から選べます。索引は無料で閲覧できます。収録記事は個別購入です。",
    source: "exam_st",
  },
  sa: {
    label: "SA",
    href: "https://note.com/ipa_quiz_ai/m/mfd0e3cddd722",
    title: "SAの論文答案設計を補う教材",
    description: "ほかの年度・問題は無料索引から選べます。索引は無料で閲覧できます。収録記事は個別購入です。",
    source: "exam_sa",
  },
};

export function ExamNoteMaterialIndex({ exam }: { exam: ExamCode }) {
  if (exam === "sc") {
    return (
      <aside aria-label="SCの補助教材" className="mb-8 rounded-2xl border border-border bg-muted/20 p-4 sm:p-5">
        <h2 className="flex items-center gap-2 text-sm font-semibold">
          <BookOpenText aria-hidden="true" className="h-4 w-4 shrink-0 text-muted-foreground" />
          SCの記述答案を補う教材
        </h2>
        <ExamNotePaidMaterial exam={exam} />
      </aside>
    );
  }
  if (exam === "nw") return <NwNoteMaterialIndex exam={exam} />;
  const index = MATERIAL_INDEXES[exam];
  if (!index) return null;

  return (
    <aside aria-label={`${index.label}の補助教材`} className="mb-8 rounded-2xl border border-border bg-muted/20 p-4 sm:p-5">
      <h2 className="flex items-center gap-2 text-sm font-semibold">
        <BookOpenText aria-hidden="true" className="h-4 w-4 shrink-0 text-muted-foreground" />
        {index.title}
      </h2>
      <ExamNotePaidMaterial exam={exam} />
      <p className="mt-4 border-t border-border pt-3 text-xs leading-relaxed text-muted-foreground">{index.description}</p>
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
