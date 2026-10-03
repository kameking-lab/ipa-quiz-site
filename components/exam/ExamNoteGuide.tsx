import { ArrowUpRight, BookOpenText } from "lucide-react";
import type { ExamCode } from "@/lib/questions/types";
import { TrackedNoteLink } from "@/components/analytics/TrackedNoteLink";
import { getVerifiedFreeNoteGuides } from "@/lib/note-guides";

export function ExamNoteGuide({ exam }: { exam: ExamCode }) {
  const guides = getVerifiedFreeNoteGuides(exam);
  if (guides.length === 0) return null;
  return (
    <aside aria-label="無料の答案ガイド" className="mb-8 rounded-2xl border border-border bg-muted/20 p-4 sm:p-5">
      <details className="group">
        <summary className="flex min-h-11 cursor-pointer items-center gap-2 text-sm font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"><BookOpenText aria-hidden="true" className="h-4 w-4 text-muted-foreground" />補助の学習ガイド（note・無料）</summary>
        <p className="mt-2 text-xs text-muted-foreground">サイト内の過去問・解説で学習できます。必要なときに、試験形式や復習の手順を補足してください。</p>
        <ul className="mt-3 space-y-3">
          {guides.map((guide) => <li key={guide.href} className="border-t border-border pt-3">
            <p className="text-[11px] font-semibold text-muted-foreground">noteの無料ガイド</p>
            <h3 className="mt-1 text-sm font-semibold">{guide.label}</h3>
            {guide.description && <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{guide.description}</p>}
            <TrackedNoteLink href={guide.href} source={guide.source} account={guide.account} target="_blank" rel="noopener noreferrer" className="mt-1 inline-flex min-h-11 items-center gap-1.5 text-xs font-semibold text-primary hover:underline">無料ガイドを読む<ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5" /><span className="sr-only">（新しいタブで開きます）</span></TrackedNoteLink>
          </li>)}
        </ul>
      </details>
    </aside>
  );
}
