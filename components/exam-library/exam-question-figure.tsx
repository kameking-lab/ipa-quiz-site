"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { examNeedsFigure } from "@/lib/exam-library-choices";
import { ExternalLink } from "lucide-react";
import type { ExamQuestion } from "@/lib/exam-library-model";

interface ExamQuestionFigureProps {
  question: ExamQuestion;
  prompt?: string;
}

/**
 * 問題文・選択肢・図を含む画像（表示の正本）と、読み上げ・検索用テキスト。
 * 画像の寸法は回ごとに異なるため、幅に合わせて高さを自動にする。
 */
export function ExamQuestionFigure({ question, prompt }: ExamQuestionFigureProps) {
  return <QuestionReader key={question.id} question={question} prompt={prompt} />;
}

function QuestionReader({ question, prompt }: ExamQuestionFigureProps) {
  const [textMode, setTextMode] = useState(Boolean(prompt) && !examNeedsFigure(question.text));
  const total = question.images.length;
  return (
    <div className="min-w-0">
      <div className="mb-3 flex gap-2" role="group" aria-label="問題の読み方">
        <Button type="button" variant={textMode ? "soft" : "outline"} aria-pressed={textMode} onClick={() => setTextMode(true)}>文字で読む</Button>
        <Button type="button" variant={!textMode ? "soft" : "outline"} aria-pressed={!textMode} onClick={() => setTextMode(false)}>原図で読む</Button>
      </div>
      {textMode && <div className="text-foreground">
        <p className="whitespace-pre-line text-base leading-8 [overflow-wrap:anywhere]">{(prompt ?? question.text).replace(/^問\s*[0-9０-９]+[\s　]*/, "")}</p>
        <p className="mt-3 text-xs leading-5 text-muted-foreground">図・数式・化学記号は「原図で読む」で確認できます。</p>
      </div>}
      <div className={`${textMode ? "hidden" : "grid"} gap-2`}>
        {question.images.map((src, index) => (
          <figure
            key={src}
            className="overflow-hidden rounded-xl border-2 border-slate-300 bg-white dark:border-slate-600 forced-colors:border-[CanvasText]"
          >
            {/* eslint-disable-next-line @next/next/no-img-element -- 回ごとに寸法が異なる問題画像。最適化による文字のにじみを避け、原寸のWebPを幅合わせで表示する。 */}
            <img
              src={src}
              alt={`問${question.number}の問題文・選択肢・図（画像${total > 1 ? ` ${index + 1}/${total}` : ""}）。同じ内容をテキストでも確認できます。`}
              loading={index === 0 ? "eager" : "lazy"}
              decoding="async"
              className="block h-auto w-full max-w-full"
            />
            <figcaption className="flex justify-end border-t border-slate-200 bg-slate-50 px-3 py-1 dark:border-slate-700 dark:bg-slate-900 forced-colors:bg-[Canvas]">
              <a
                href={src}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center gap-1 text-sm font-bold text-sky-900 underline underline-offset-4 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-sky-300 dark:text-sky-200 forced-colors:text-[LinkText]"
              >
                画像を拡大{total > 1 ? `（${index + 1}/${total}）` : ""}
                <span className="sr-only">（新しいタブで開きます）</span>
                <ExternalLink className="h-4 w-4" aria-hidden="true" />
              </a>
            </figcaption>
          </figure>
        ))}
      </div>
      {!textMode && question.text.trim() ? (
        <details className="mt-3 rounded-xl border border-slate-300 bg-slate-50 p-3 text-slate-900 dark:border-slate-600 dark:bg-slate-900 dark:text-slate-100 forced-colors:bg-[Canvas] forced-colors:text-[CanvasText]">
          <summary className="min-h-11 cursor-pointer py-2 text-sm font-black underline underline-offset-4 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-sky-300">
            問題文をテキストで表示（読み上げ用）
          </summary>
          <p className="mt-2 whitespace-pre-line text-sm leading-7 [overflow-wrap:anywhere]">
            {question.text}
          </p>
          <p className="mt-2 text-xs leading-5 text-slate-600 dark:text-slate-300">
            PDFから抽出したテキストのため、図・数式・記号は画像を正としてください。
          </p>
        </details>
      ) : null}
    </div>
  );
}
