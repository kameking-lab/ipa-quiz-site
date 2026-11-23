"use client";

import * as React from "react";
import Link from "next/link";
import { Share2, RotateCw, Home } from "lucide-react";

interface AnswerLog {
  questionId: string;
  selected: string | null;
  correct: boolean;
}

const SQ_CORRECT = "🟩";
const SQ_WRONG = "🟥";
const SQ_SKIP = "⬜";

function buildPattern(answers: AnswerLog[]): string {
  return answers
    .map((a) => (a.selected == null ? SQ_SKIP : a.correct ? SQ_CORRECT : SQ_WRONG))
    .join("");
}

export function StreamSummary({
  backHref = "/ipa",
  recentAnswers,
  totalAnswered,
  onContinue,
  canContinue,
}: {
  backHref?: string;
  recentAnswers: AnswerLog[];
  totalAnswered: number;
  onContinue: () => void;
  canContinue: boolean;
}) {
  const correctCount = recentAnswers.filter((a) => a.correct).length;
  const total = recentAnswers.length || 1;
  const accuracy = Math.round((correctCount / total) * 100);
  const pattern = buildPattern(recentAnswers);
  const shareText = `IPA Quiz ストリーム ${correctCount}/${total} 正解 (${accuracy}%)\n${pattern}\n#IPA過去問 #IPAQuiz`;
  const shareUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}/quiz/stream`
      : "https://www.kakomon-ai.jp/quiz/stream";

  const lineUrl = `https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(
    shareUrl,
  )}&text=${encodeURIComponent(shareText)}`;

  const [copied, setCopied] = React.useState(false);
  const [copyError, setCopyError] = React.useState(false);
  const headingRef = React.useRef<HTMLHeadingElement>(null);
  React.useEffect(() => { headingRef.current?.focus({ preventScroll: true }); }, []);
  const onCopy = async () => {
    setCopyError(false);
    setCopied(false);
    try {
      await navigator.clipboard.writeText(`${shareText}\n${shareUrl}`);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    } catch {
      setCopyError(true);
    }
  };

  return (
    <main className="flex min-h-[calc(100dvh-3.5rem)] flex-col items-center justify-center bg-background px-6 py-10 text-foreground">
      <div className="w-full max-w-md">
        <div className="mb-2 text-center text-xs uppercase tracking-widest text-muted-foreground">
          今回の結果
        </div>
        <h1 ref={headingRef} tabIndex={-1} className="mb-1 text-center text-3xl font-bold outline-none">
          {correctCount}<span className="text-muted-foreground">/{total}</span> 正解
        </h1>
        <p className="mb-6 text-center text-sm text-muted-foreground">
          正答率 {accuracy}% ・ 累計 {totalAnswered} 問
        </p>

        <div role="img" aria-label={recentAnswers.map(a => a.selected == null ? "未回答" : a.correct ? "正解" : "不正解").join("、")} className="mb-6 grid grid-cols-10 justify-items-center gap-1 rounded-2xl bg-card px-4 py-6 text-xl ring-1 ring-border">
          {recentAnswers.map((answer, index) => (
            <span key={`${answer.questionId}-${index}`} aria-hidden="true">
              {answer.selected == null ? SQ_SKIP : answer.correct ? SQ_CORRECT : SQ_WRONG}
            </span>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Link
            href={backHref}
            className="flex min-h-11 items-center justify-center gap-2 rounded-2xl bg-card py-3 text-sm text-foreground/85 ring-1 ring-border transition hover:bg-muted"
          >
            <Home className="h-4 w-4" /> 戻る
          </Link>
          {canContinue ? (
            <button
              onClick={onContinue}
              className="flex min-h-11 items-center justify-center gap-2 rounded-2xl bg-sky-700 py-3 text-sm font-semibold text-white transition hover:bg-sky-800 dark:bg-sky-400 dark:text-sky-950 dark:hover:bg-sky-300"
            >
              <RotateCw className="h-4 w-4" /> もう10問
            </button>
          ) : (
            <Link
              href={typeof window !== "undefined" ? window.location.pathname + window.location.search : "/quiz/stream"}
              className="flex min-h-11 items-center justify-center gap-2 rounded-2xl bg-sky-700 py-3 text-sm font-semibold text-white transition hover:bg-sky-800 dark:bg-sky-400 dark:text-sky-950 dark:hover:bg-sky-300"
            >
              <RotateCw className="h-4 w-4" /> もう一度
            </Link>
          )}
        </div>
        <div className="mt-6 border-t border-border pt-5">
        <div className="mb-3">
          <a
            href={lineUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex min-h-11 items-center justify-center gap-2 rounded-2xl bg-emerald-700 py-3 text-sm font-semibold text-white transition hover:bg-emerald-800 dark:bg-emerald-400 dark:text-emerald-950 dark:hover:bg-emerald-300"
          >
            <Share2 className="h-4 w-4" /> LINEでシェア
          </a>
        </div>
        <button
          onClick={onCopy}
          className="mb-6 min-h-11 w-full rounded-2xl bg-muted py-2.5 text-xs text-foreground/85 transition hover:bg-muted/80"
        >
          {copied ? "コピーしました ✓" : "テキストをコピー"}
        </button>
        {/* コピー成功はボタン文言変更だけでは SR に告知されない(WCAG 4.1.3)。
            polite live region で告知する。 */}
        <span role="status" aria-live="polite" className={copyError ? "mb-4 block text-sm text-red-700 dark:text-red-300" : "sr-only"}>
          {copyError ? "コピーできませんでした。もう一度お試しください。" : copied ? "テキストをコピーしました" : ""}
        </span>

        </div>
      </div>
    </main>
  );
}
