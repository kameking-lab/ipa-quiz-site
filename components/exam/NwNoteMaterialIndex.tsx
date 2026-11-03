import { ArrowUpRight, BookOpenText } from "lucide-react";
import type { ExamCode } from "@/lib/questions/types";
import { ExamNotePaidMaterial } from "@/components/exam/ExamNotePaidMaterial";
import { TrackedNoteLink } from "@/components/analytics/TrackedNoteLink";

// Anonymous reader completion verified on 2026-10-03:
// note-automation reports/.../discovery/NW-ROOT-COMPLETION-RECEIPT-20261003.json.
const NW_MATERIAL_INDEX_URL = "https://note.com/ipa_quiz_ai/m/mf8652f414646";

export function NwNoteMaterialIndex({ exam }: { exam: ExamCode }) {
  if (exam !== "nw") return null;

  return (
    <aside aria-label="NWの補助教材" className="mb-8 rounded-2xl border border-border bg-muted/20 p-4 sm:p-5">
      <h2 className="flex items-center gap-2 text-sm font-semibold">
        <BookOpenText aria-hidden="true" className="h-4 w-4 shrink-0 text-muted-foreground" />
        NWの科目B-1・B-2対策を補う教材
      </h2>
      <ExamNotePaidMaterial exam={exam} />
      <p className="mt-4 border-t border-border pt-3 text-xs leading-relaxed text-muted-foreground">
        ほかの年度・科目は無料索引から選べます。索引は無料で閲覧できます。
        収録記事は個別購入です。各記事の価格・収録範囲はリンク先で確認してください。
      </p>
      <TrackedNoteLink
        href={NW_MATERIAL_INDEX_URL}
        source="exam_nw"
        account="ipa_quiz_ai"
        target="_blank"
        rel="noopener noreferrer"
        className="mt-2 inline-flex min-h-11 items-center gap-1.5 text-xs font-semibold text-primary hover:underline"
      >
        NW教材の無料索引を見る
        <ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5" />
        <span className="sr-only">（新しいタブで開きます）</span>
      </TrackedNoteLink>
    </aside>
  );
}
