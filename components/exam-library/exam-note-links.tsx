import { ExternalLink } from "lucide-react";
import { TrackedNoteLink } from "@/components/analytics/TrackedNoteLink";
import { deriveNoteAccountFromUrl } from "@/lib/note-accounts";
import type { ExamNoteLink } from "@/lib/exam-library-model";

/**
 * 公表問題に紐づく解説記事リンクの一覧。
 *
 * 2026-09-13: それまでこの描画は個別の回ページ (/e-learning/exams/<id>) にしか無く、
 * 一覧ページ (/e-learning/exams?group=..&subject=..) には出ていなかった。
 * 次の資格・資格カレンダー側の導線はこの **一覧ページ** を指しているので、
 * 科目専用の解説記事があっても読者には1クリック奥まで見えていなかった。
 * 両方で同じ描画を使えるよう、個別ページの実装をそのまま切り出したもの。
 */
export function ExamNoteLinks({
  links,
  headingId,
  heading = "関連する解説記事",
  headingLevel = "h2",
  className,
}: {
  links: readonly ExamNoteLink[];
  headingId: string;
  heading?: string;
  headingLevel?: "h2" | "h4";
  className?: string;
}) {
  if (links.length === 0) return null;
  const Heading = headingLevel;
  const anchorClassName =
    "inline-flex min-h-11 items-center gap-1 font-semibold text-sky-900 underline decoration-2 underline-offset-4 [overflow-wrap:anywhere] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-sky-300 dark:text-sky-200 forced-colors:text-[LinkText]";
  return (
    <section aria-labelledby={headingId} className={className}>
      <Heading id={headingId} className="text-xl font-semibold text-slate-950 dark:text-white">
        {heading}
      </Heading>
      <ul className="mt-2 grid gap-1">
        {links.map((link) => {
          const account = deriveNoteAccountFromUrl(link.url);
          const linkBody = (
            <>
              {link.title}
              <span className="sr-only">（新しいタブで開きます）</span>
              <ExternalLink className="h-4 w-4 shrink-0" aria-hidden="true" />
            </>
          );
          return (
            <li key={link.url}>
              {link.kind ? (
                <span
                  className="mr-1.5 inline-block rounded px-1.5 py-0.5 text-xs font-bold text-white forced-colors:border forced-colors:border-[CanvasText] forced-colors:bg-[Canvas] forced-colors:text-[CanvasText]"
                  style={{ backgroundColor: link.kind === "free" ? "#0369a1" : "#a16207" }}
                >
                  {link.kind === "free" ? "無料" : "有料"}
                </span>
              ) : null}
              {account ? (
                <TrackedNoteLink
                  href={link.url}
                  source="exam_library"
                  account={account}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={anchorClassName}
                >
                  {linkBody}
                </TrackedNoteLink>
              ) : (
                <a href={link.url} target="_blank" rel="noopener noreferrer" className={anchorClassName}>
                  {linkBody}
                </a>
              )}
            </li>
          );
        })}
      </ul>
    </section>
  );
}

/**
 * 指定した group / subject の全回分から解説記事リンクを集め、URL で重複を除く。
 * subject が未指定 (= 一覧が科目で絞られていない) ときは空配列。
 * 科目を絞っていないのに全科目の記事を並べても読者の助けにならないため。
 */
export function collectSubjectNoteLinks(
  entries: readonly { group: string; subject: string; noteLinks?: readonly ExamNoteLink[] }[],
  group: string,
  subject: string | null,
): ExamNoteLink[] {
  if (!subject) return [];
  const seen = new Map<string, ExamNoteLink>();
  for (const entry of entries) {
    if (entry.group !== group || entry.subject !== subject) continue;
    for (const link of entry.noteLinks ?? []) {
      if (!seen.has(link.url)) seen.set(link.url, link);
    }
  }
  // 無料を先に出す。有料だけを先頭に置くと、無料で読める導線が下に隠れる。
  return [...seen.values()].sort((a, b) => {
    const rank = (k: ExamNoteLink["kind"]) => (k === "free" ? 0 : k === "paid" ? 1 : 2);
    return rank(a.kind) - rank(b.kind);
  });
}
