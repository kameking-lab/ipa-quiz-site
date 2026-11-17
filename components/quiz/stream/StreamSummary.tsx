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
    try {
      await navigator.clipboard.writeText(`${shareText}\n${shareUrl}`);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    } catch {
      setCopyError(true);
    }
  };

  return (
    <div className="flex min-h-[calc(100dvh-3.5rem)] flex-col items-center justify-center bg-gradient-to-b from-zinc-950 via-zinc-900 to-black px-6 py-10 text-zinc-50">
      <div className="w-full max-w-md">
        <div className="mb-2 text-center text-xs uppercase tracking-widest text-zinc-400">
          今回の結果
        </div>
        <h1 ref={headingRef} tabIndex={-1} className="mb-1 text-center text-3xl font-bold outline-none">
          {correctCount}<span className="text-zinc-400">/{total}</span> 正解
        </h1>
        <p className="mb-6 text-center text-sm text-zinc-400">
          正答率 {accuracy}% ・ 累計 {totalAnswered} 問
        </p>

        <div role="img" aria-label={recentAnswers.map(a => a.selected == null ? "未回答" : a.correct ? "正解" : "不正解").join("、")} className="mb-6 rounded-2xl bg-white/5 p-6 text-center text-2xl tracking-[0.4em] ring-1 ring-white/10">
          {pattern}
        </div>

        <div className="mb-3">
          <a
            href={lineUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex min-h-11 items-center justify-center gap-2 rounded-2xl bg-emerald-500 py-3 text-sm font-semibold text-white transition hover:bg-emerald-600"
          >
            <Share2 className="h-4 w-4" /> LINEでシェア
          </a>
        </div>
        <button
          onClick={onCopy}
          className="mb-6 min-h-11 w-full rounded-2xl bg-white/10 py-2.5 text-xs text-zinc-200 transition hover:bg-white/15"
        >
          {copied ? "コピーしました ✓" : "テキストをコピー"}
        </button>
        {/* コピー成功はボタン文言変更だけでは SR に告知されない(WCAG 4.1.3)。
            polite live region で告知する。 */}
        <span role="status" aria-live="polite" className={copyError ? "mb-4 block text-sm text-red-300" : "sr-only"}>
          {copyError ? "コピーできませんでした。もう一度お試しください。" : copied ? "テキストをコピーしました" : ""}
        </span>

        <div className="grid grid-cols-2 gap-3">
          <Link
            href={backHref}
            className="flex min-h-11 items-center justify-center gap-2 rounded-2xl bg-white/5 py-3 text-sm text-zinc-200 ring-1 ring-white/10 transition hover:bg-white/10"
          >
            <Home className="h-4 w-4" /> 戻る
          </Link>
          {canContinue ? (
            <button
              onClick={onContinue}
              className="flex min-h-11 items-center justify-center gap-2 rounded-2xl bg-sky-500 py-3 text-sm font-semibold text-white transition hover:bg-sky-600"
            >
              <RotateCw className="h-4 w-4" /> もう10問
            </button>
          ) : (
            <Link
              href={typeof window !== "undefined" ? window.location.pathname + window.location.search : "/quiz/stream"}
              className="flex min-h-11 items-center justify-center gap-2 rounded-2xl bg-sky-500 py-3 text-sm font-semibold text-white transition hover:bg-sky-600"
            >
              <RotateCw className="h-4 w-4" /> もう一度
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
