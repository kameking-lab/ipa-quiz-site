"use client";

import * as React from "react";
import { BookOpen, ExternalLink, Info, ScrollText } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import type { CitationMeta } from "@/lib/copilot/citation-meta";
import { posthogCapture } from "@/lib/posthog";

interface Props {
  citations: CitationMeta[];
  /** AI 応答に対応するメッセージのインデックス（PostHog 追跡用）。 */
  messageIndex?: number;
}

/**
 * AI コパイロット応答のすぐ下に表示される構造化引用カード。
 * markdown footer の「[N] [title](url)」より情報密度が高く、
 * 試験区分・年度・カテゴリのバッジ、別タブオープン、根拠スニペットモーダルを提供する。
 */
export function CitationCards({ citations, messageIndex }: Props) {
  const [openMeta, setOpenMeta] = React.useState<CitationMeta | null>(null);

  if (citations.length === 0) return null;

  return (
    <div className="mt-2 space-y-1.5">
      <p className="text-[10px] font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
        出典 ({citations.length})
      </p>
      <ul className="space-y-1.5">
        {citations.map((c) => (
          <li key={c.docId}>
            <CitationCard
              citation={c}
              onOpenDetail={() => {
                posthogCapture("copilot_citation_detail_opened", {
                  docId: c.docId,
                  kind: c.kind,
                  messageIndex,
                });
                setOpenMeta(c);
              }}
            />
          </li>
        ))}
      </ul>
      <CitationDetailModal
        citation={openMeta}
        onClose={() => setOpenMeta(null)}
      />
    </div>
  );
}

function CitationCard({
  citation,
  onOpenDetail,
}: {
  citation: CitationMeta;
  onOpenDetail: () => void;
}) {
  const isQuestion = citation.kind === "question";
  const Icon = isQuestion ? ScrollText : BookOpen;

  return (
    <div
      className={cn(
        "group/citation flex items-start gap-2 rounded-xl border px-2.5 py-2 transition-colors",
        "border-zinc-200 bg-white hover:border-sky-300 hover:bg-sky-50/40",
        "dark:border-zinc-800 dark:bg-zinc-900/60 dark:hover:border-sky-700 dark:hover:bg-sky-950/30",
      )}
    >
      <span
        className={cn(
          "mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[10px] font-bold",
          isQuestion
            ? "bg-sky-100 text-sky-700 dark:bg-sky-950/60 dark:text-sky-300"
            : "bg-amber-100 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300",
        )}
        aria-label={`引用 ${citation.ordinal}`}
      >
        {citation.ordinal}
      </span>
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-1.5">
          <Icon className="h-3 w-3 shrink-0 text-zinc-500 dark:text-zinc-400" aria-hidden="true" />
          {isQuestion && citation.question ? (
            <>
              <span className="rounded-full bg-sky-100 px-1.5 py-0.5 text-[10px] font-semibold text-sky-700 dark:bg-sky-950/60 dark:text-sky-300">
                {citation.question.examLabel}
              </span>
              <span className="text-[10px] text-zinc-500 dark:text-zinc-400">
                {citation.question.yearSeasonLabel}
              </span>
              <span className="text-[10px] text-zinc-500 dark:text-zinc-400">
                問{citation.question.qNumber}
              </span>
              <span className="rounded bg-zinc-100 px-1.5 py-0.5 text-[10px] text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300">
                {citation.question.category}
              </span>
            </>
          ) : (
            <>
              <span className="rounded-full bg-amber-100 px-1.5 py-0.5 text-[10px] font-semibold text-amber-700 dark:bg-amber-950/60 dark:text-amber-300">
                用語集
              </span>
              {citation.glossary?.english && (
                <span className="text-[10px] italic text-zinc-500 dark:text-zinc-400">
                  {citation.glossary.english}
                </span>
              )}
            </>
          )}
        </div>
        <p className="mt-1 line-clamp-2 text-xs leading-snug text-zinc-800 dark:text-zinc-100">
          {citation.title}
        </p>
        <div className="mt-1.5 flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={onOpenDetail}
            className="inline-flex items-center gap-1 text-[10px] font-medium text-zinc-600 hover:text-sky-700 dark:text-zinc-300 dark:hover:text-sky-300"
            aria-label={`引用 ${citation.ordinal} の根拠を確認`}
          >
            <Info className="h-3 w-3" aria-hidden="true" />
            根拠を確認
          </button>
          <a
            href={citation.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-[10px] font-medium text-sky-700 hover:underline dark:text-sky-300"
            onClick={() => {
              posthogCapture("copilot_citation_clicked", {
                docId: citation.docId,
                kind: citation.kind,
              });
            }}
          >
            <ExternalLink className="h-3 w-3" aria-hidden="true" />
            {isQuestion ? "問題を開く" : "用語集を開く"}
          </a>
        </div>
      </div>
    </div>
  );
}

function CitationDetailModal({
  citation,
  onClose,
}: {
  citation: CitationMeta | null;
  onClose: () => void;
}) {
  return (
    <Dialog open={citation !== null} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-base">
            根拠 {citation ? `[${citation.ordinal}]` : ""}
          </DialogTitle>
          <DialogDescription>
            {citation?.title ?? ""}
          </DialogDescription>
        </DialogHeader>
        {citation && (
          <div className="space-y-3">
            {citation.kind === "question" && citation.question && (
              <div className="flex flex-wrap items-center gap-1.5 text-[11px]">
                <span className="rounded-full bg-sky-100 px-2 py-0.5 font-semibold text-sky-700 dark:bg-sky-950/60 dark:text-sky-300">
                  {citation.question.examLabel}
                </span>
                <span className="text-zinc-500 dark:text-zinc-400">
                  {citation.question.yearSeasonLabel}
                </span>
                <span className="text-zinc-500 dark:text-zinc-400">
                  問{citation.question.qNumber}
                </span>
                <span className="rounded bg-zinc-100 px-2 py-0.5 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300">
                  {citation.question.category}
                </span>
              </div>
            )}
            <div className="max-h-64 overflow-y-auto rounded-xl border border-zinc-200 bg-zinc-50 p-3 text-xs leading-relaxed text-zinc-700 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300">
              {citation.snippet}
            </div>
            <div className="flex flex-wrap gap-2">
              <a
                href={citation.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 rounded-xl bg-sky-600 px-3 py-2 text-xs font-semibold text-white hover:bg-sky-700"
                onClick={() => {
                  posthogCapture("copilot_citation_full_opened", {
                    docId: citation.docId,
                    kind: citation.kind,
                  });
                }}
              >
                <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                {citation.kind === "question" ? "問題ページへ" : "用語集ページへ"}
              </a>
              {citation.kind === "question" && citation.fullSourceUrl && citation.fullSourceUrl !== citation.url && (
                <a
                  href={citation.fullSourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 rounded-xl border border-zinc-300 px-3 py-2 text-xs font-medium text-zinc-700 hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-800"
                >
                  <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                  IPA 原典 PDF
                </a>
              )}
            </div>
            <p className="text-[10px] text-zinc-400 dark:text-zinc-500">
              ※ AI が回答の根拠として参照したコンテンツの抜粋です。完全な情報は出典先をご確認ください。
            </p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
