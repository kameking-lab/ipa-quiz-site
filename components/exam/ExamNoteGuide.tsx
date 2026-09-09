import { ArrowUpRight, BookOpenText } from "lucide-react";
import type { ExamCode } from "@/lib/questions/types";
import {
  TrackedNoteLink,
  type NoteLinkSource,
} from "@/components/analytics/TrackedNoteLink";

const NOTE_GUIDES: Partial<
  Record<ExamCode, { href: string; label: string; source: NoteLinkSource }>
> = {
  sa: {
    href: "https://note.com/sikaku_rakutoru/n/n9e207dfe4421",
    label: "性能見積もりの根拠を4段階で書く",
    source: "exam_sa",
  },
  st: {
    href: "https://note.com/sikaku_rakutoru/n/n6ebb89810300",
    label: "投資対効果を3手順と2指標で書く",
    source: "exam_st",
  },
  nw: {
    href: "https://note.com/sikaku_rakutoru/n/n3a7c95159e7a",
    label: "冗長切替を3段階の答案型で整理する",
    source: "exam_nw",
  },
};

export function ExamNoteGuide({ exam }: { exam: ExamCode }) {
  const guide = NOTE_GUIDES[exam];
  if (!guide) return null;

  return (
    <aside
      aria-label="無料の答案ガイド"
      className="mb-8 rounded-2xl border border-sky-200/70 bg-sky-50/60 p-5 dark:border-sky-900/50 dark:bg-sky-950/20"
    >
      <div className="flex items-start gap-3">
        <span className="mt-0.5 rounded-lg bg-sky-100 p-2 text-sky-700 dark:bg-sky-950 dark:text-sky-300">
          <BookOpenText className="h-4 w-4" aria-hidden="true" />
        </span>
        <div className="min-w-0">
          <p className="text-xs font-semibold text-sky-700 dark:text-sky-300">
            noteの無料ガイド
          </p>
          <h2 className="mt-1 text-sm font-semibold text-foreground">{guide.label}</h2>
          <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
            過去問演習とあわせて、記述答案の組み立て方を具体例で確認できます。
          </p>
          <TrackedNoteLink
            href={guide.href}
            source={guide.source}
            account="sikaku_rakutoru"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex min-h-11 items-center gap-1.5 rounded-lg bg-sky-600 px-3 py-2 text-xs font-semibold text-white hover:bg-sky-700"
          >
            無料ガイドを読む
            <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
          </TrackedNoteLink>
        </div>
      </div>
    </aside>
  );
}
