import { ArrowUpRight, BookOpenText } from "lucide-react";
import type { ExamCode } from "@/lib/questions/types";
import { TrackedNoteLink } from "@/components/analytics/TrackedNoteLink";
import { getNoteGuide, type NoteGuideKind } from "@/lib/note-guides";

// kind ごとに文言セットを完全に分離する。paid が free の文言(「無料」表記)を
// 継承すること、またはその逆が起きないようにするための唯一の分岐点。
const KIND_COPY: Record<
  NoteGuideKind,
  { eyebrow: string; body: string; cta: string; ariaLabel: string }
> = {
  free: {
    eyebrow: "noteの無料ガイド",
    body: "過去問演習とあわせて、記述答案の組み立て方を具体例で確認できます。",
    cta: "無料ガイドを読む",
    ariaLabel: "無料の答案ガイド",
  },
  paid: {
    eyebrow: "noteの有料記事",
    body: "過去問演習とあわせて、より詳しい解説を有料記事で確認できます。",
    cta: "有料記事を読む",
    ariaLabel: "有料の答案ガイド",
  },
};

export function ExamNoteGuide({ exam }: { exam: ExamCode }) {
  const guide = getNoteGuide(exam);
  if (!guide) return null;
  const copy = KIND_COPY[guide.kind];

  return (
    <aside
      aria-label={copy.ariaLabel}
      className="mb-8 rounded-2xl border border-sky-200/70 bg-sky-50/60 p-5 dark:border-sky-900/50 dark:bg-sky-950/20"
    >
      <div className="flex items-start gap-3">
        <span className="mt-0.5 rounded-lg bg-sky-100 p-2 text-sky-700 dark:bg-sky-950 dark:text-sky-300">
          <BookOpenText className="h-4 w-4" aria-hidden="true" />
        </span>
        <div className="min-w-0">
          <p className="text-xs font-semibold text-sky-700 dark:text-sky-300">
            {copy.eyebrow}
          </p>
          <h2 className="mt-1 text-sm font-semibold text-foreground">{guide.label}</h2>
          <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
            {copy.body}
          </p>
          <TrackedNoteLink
            href={guide.href}
            source={guide.source}
            account={guide.account}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex min-h-11 items-center gap-1.5 rounded-lg bg-sky-600 px-3 py-2 text-xs font-semibold text-white hover:bg-sky-700"
          >
            {copy.cta}
            <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
          </TrackedNoteLink>
        </div>
      </div>
    </aside>
  );
}
