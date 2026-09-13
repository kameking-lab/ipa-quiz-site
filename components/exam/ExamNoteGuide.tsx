import { ArrowUpRight, BookOpenText } from "lucide-react";
import type { ExamCode } from "@/lib/questions/types";
import { TrackedNoteLink } from "@/components/analytics/TrackedNoteLink";
import { getNoteGuide, getNoteGuideSupplement, type NoteGuideKind, type NoteGuideLink } from "@/lib/note-guides";

// kind ごとに文言セットを完全に分離する。paid が free の文言(「無料」表記)を
// 継承すること、またはその逆が起きないようにするための唯一の分岐点。
const KIND_COPY: Record<
  NoteGuideKind,
  { eyebrow: string; body: string; cta: string; ariaLabel: string }
> = {
  free: {
    eyebrow: "noteの無料ガイド",
    // 記述式・択一式のどちらのガイドにも当てはまる表現にする。
    // 特定の出題形式や得点・合格を確約する表現は入れない。
    body: "過去問演習とあわせて、設問の考え方を具体例で確認できます。",
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

// 有料カードは無料カードより視覚的に目立たせない(オーナー承認 2026-09-13の前提:
// 無料記事だけで学習が完結する。有料は購入が任意の補助教材)。CTAボタンは無料側の
// 塗りつぶしボタンに対して、地色なしの控えめなアウトラインリンクにする。
const CTA_CLASS_BY_KIND: Record<NoteGuideKind, string> = {
  free: "mt-3 inline-flex min-h-11 items-center gap-1.5 rounded-lg bg-sky-600 px-3 py-2 text-xs font-semibold text-white hover:bg-sky-700",
  paid: "mt-3 inline-flex min-h-11 items-center gap-1.5 rounded-lg border border-amber-300 px-3 py-2 text-xs font-medium text-amber-800 hover:bg-amber-50 dark:border-amber-800 dark:text-amber-300 dark:hover:bg-amber-950/40",
};

function GuideBody({ guide }: { guide: NoteGuideLink }) {
  const copy = KIND_COPY[guide.kind];
  return (
    <div className="min-w-0">
      <p className="text-xs font-semibold text-sky-700 dark:text-sky-300">{copy.eyebrow}</p>
      <h2 className="mt-1 text-sm font-semibold text-foreground">{guide.label}</h2>
      <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
        {guide.description ?? copy.body}
      </p>
      {guide.kind === "paid" ? (
        <p className="mt-1 text-[11px] text-muted-foreground">購入は任意です。</p>
      ) : null}
      <TrackedNoteLink
        href={guide.href}
        source={guide.source}
        account={guide.account}
        target="_blank"
        rel="noopener noreferrer"
        className={CTA_CLASS_BY_KIND[guide.kind]}
      >
        {copy.cta}
        <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
      </TrackedNoteLink>
    </div>
  );
}

export function ExamNoteGuide({ exam }: { exam: ExamCode }) {
  const guide = getNoteGuide(exam);
  if (!guide) return null;
  const copy = KIND_COPY[guide.kind];
  // 主リンク(無料記事)を隠さず、有料教材があれば同じカード内に「補助リンク」として
  // 追記する。無料側が先・有料側が後で、どちらも kind ごとの文言(KIND_COPY)しか使わない
  // ため「無料」「有料」の取り違えは起きない。
  const supplement = getNoteGuideSupplement(exam);

  return (
    <aside
      aria-label={copy.ariaLabel}
      className="mb-8 rounded-2xl border border-sky-200/70 bg-sky-50/60 p-5 dark:border-sky-900/50 dark:bg-sky-950/20"
    >
      <div className="flex items-start gap-3">
        <span className="mt-0.5 rounded-lg bg-sky-100 p-2 text-sky-700 dark:bg-sky-950 dark:text-sky-300">
          <BookOpenText className="h-4 w-4" aria-hidden="true" />
        </span>
        <GuideBody guide={guide} />
      </div>
      {supplement ? (
        <div className="mt-4 flex items-start gap-3 border-t border-sky-200/70 pt-4 dark:border-sky-900/50">
          <span className="mt-0.5 rounded-lg bg-amber-100 p-2 text-amber-700 dark:bg-amber-950 dark:text-amber-300">
            <BookOpenText className="h-4 w-4" aria-hidden="true" />
          </span>
          <GuideBody guide={supplement} />
        </div>
      ) : null}
    </aside>
  );
}
