import type { ExamCode } from "@/lib/questions/types";
import { noteCatalogUrl } from "@/lib/note-catalog";
import { TrackedNoteLink, type NoteLinkSource } from "@/components/analytics/TrackedNoteLink";

export function ExamNoteCatalog({ exam }: { exam: ExamCode }) {
  const href = noteCatalogUrl(exam);
  if (!new URL(href).searchParams.has("qualification")) return null;
  return <aside aria-label="資格の関連記事" className="mb-8 rounded-2xl border border-border bg-muted/20 p-4"><p className="text-xs text-muted-foreground">運営者のnote記事（PR）</p><TrackedNoteLink href={href} source={`exam_${exam}` as NoteLinkSource} account="ipa_quiz_ai" className="mt-2 inline-flex min-h-11 items-center text-sm font-semibold text-primary underline underline-offset-4">この資格の記事を探す →</TrackedNoteLink><p className="mt-1 text-xs text-muted-foreground">サムネイルで選ぶ・無料／有料で絞り込む</p></aside>;
}
