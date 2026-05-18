"use client";

import * as React from "react";
import { ArrowRight, Layers } from "lucide-react";
import type { RelatedQuestion } from "@/lib/copilot/related";
import { posthogCapture } from "@/lib/posthog";

interface Props {
  items: RelatedQuestion[];
  messageIndex?: number;
}

/**
 * AI コパイロット応答の下に表示される「この質問に関連する問題」セクション。
 * RAG citation に採用されなかった近接問題を BM25 ベースでサジェストする。
 * 「演習開始」ボタンで該当問題のクイズプレイヤーを新規タブで開く。
 */
export function RelatedQuestionsSection({ items, messageIndex }: Props) {
  if (items.length === 0) return null;

  return (
    <div className="mt-3 rounded-xl border border-dashed border-sky-300 bg-sky-50/40 px-3 py-2.5 dark:border-sky-900 dark:bg-sky-950/20">
      <div className="mb-1.5 flex items-center gap-1.5">
        <Layers className="h-3.5 w-3.5 text-sky-600 dark:text-sky-400" aria-hidden="true" />
        <p className="text-[11px] font-semibold text-sky-700 dark:text-sky-300">
          この質問に関連する問題
        </p>
      </div>
      <ul className="space-y-1.5">
        {items.map((q) => (
          <li key={q.questionId}>
            <RelatedQuestionRow item={q} messageIndex={messageIndex} />
          </li>
        ))}
      </ul>
    </div>
  );
}

function RelatedQuestionRow({
  item,
  messageIndex,
}: {
  item: RelatedQuestion;
  messageIndex?: number;
}) {
  return (
    <a
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() =>
        posthogCapture("copilot_related_question_clicked", {
          questionId: item.questionId,
          exam: item.exam,
          messageIndex,
        })
      }
      className="group/related flex items-start gap-2 rounded-lg bg-white px-2.5 py-2 transition-colors hover:bg-sky-100/60 dark:bg-zinc-900/60 dark:hover:bg-sky-900/30"
    >
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="rounded-full bg-sky-100 px-1.5 py-0.5 text-[10px] font-semibold text-sky-700 dark:bg-sky-950/60 dark:text-sky-300">
            {item.examLabel}
          </span>
          <span className="text-[10px] text-zinc-500 dark:text-zinc-400">
            {item.yearSeasonLabel}
          </span>
          <span className="text-[10px] text-zinc-500 dark:text-zinc-400">
            問{item.qNumber}
          </span>
          <span className="rounded bg-zinc-100 px-1.5 py-0.5 text-[10px] text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300">
            {item.category}
          </span>
        </div>
        <p className="mt-1 line-clamp-2 text-xs leading-snug text-zinc-700 dark:text-zinc-200">
          {item.preview}
        </p>
      </div>
      <span className="mt-1 inline-flex shrink-0 items-center gap-1 rounded-full bg-sky-600 px-2 py-1 text-[10px] font-semibold text-white transition-transform group-hover/related:translate-x-0.5">
        演習開始
        <ArrowRight className="h-3 w-3" aria-hidden="true" />
      </span>
    </a>
  );
}
