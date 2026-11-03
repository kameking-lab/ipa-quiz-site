import { ArrowUpRight } from "lucide-react";
import type { ExamCode } from "@/lib/questions/types";
import { NOTE_PAID_MATERIALS } from "@/lib/note-paid-materials";
import { TrackedNoteLink } from "@/components/analytics/TrackedNoteLink";

export function ExamNotePaidMaterial({ exam }: { exam: ExamCode }) {
  const material = NOTE_PAID_MATERIALS[exam];
  if (!material) return null;

  return (
    <div className="mt-3 space-y-2">
      <p className="text-xs font-semibold text-muted-foreground">noteの有料教材・買い切り単品 {material.priceYen.toLocaleString("ja-JP")}円</p>
      <h3 className="text-sm font-semibold leading-relaxed">{material.title}</h3>
      <p className="text-sm leading-relaxed text-muted-foreground">{material.audience}</p>
      <p className="text-sm leading-relaxed text-muted-foreground">{material.deliverable}</p>
      <p className="text-xs leading-relaxed text-muted-foreground">{material.difference}</p>
      <TrackedNoteLink
        href={material.href}
        source={material.source}
        account="ipa_quiz_ai"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex min-h-11 items-center gap-1.5 rounded-lg border border-primary/30 px-3 py-2 text-sm font-semibold text-primary hover:bg-primary/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
      >
        {material.cta}
        <ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5 shrink-0" />
        <span className="sr-only">（新しいタブで開きます）</span>
      </TrackedNoteLink>
      <p className="text-xs leading-relaxed text-muted-foreground">リンク先の無料部分で内容を確認できます。続きの購入は任意です。価格は2026年10月7日確認、購入前にnoteの表示をご確認ください。</p>
    </div>
  );
}
