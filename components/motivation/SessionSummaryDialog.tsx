"use client";

import * as React from "react";
import { CheckCircle2, Clock, Share2, Sparkles, Target, X } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import type { SessionSummary } from "@/lib/motivation/session";
import { SocialShare } from "@/components/motivation/SocialShare";
import { buildOgImageUrl, buildSessionText } from "@/lib/motivation/share";

interface Props {
  open: boolean;
  summary: SessionSummary | null;
  onClose: () => void;
}

function formatDuration(sec: number): string {
  if (sec < 60) return `${sec}秒`;
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return s === 0 ? `${m}分` : `${m}分${s}秒`;
}

function buildShareText(s: SessionSummary): string {
  const lines = [
    "📚 過去問AI セッション完了",
    `${s.total}問 / 正答率 ${s.accuracyPct}% / ${formatDuration(s.durationSec)}`,
  ];
  if (s.byCategory.length > 0) {
    lines.push(`分野: ${s.byCategory[0].category} ${s.byCategory[0].accuracyPct}%`);
  }
  lines.push("#IPA過去問 #IPA_Quiz");
  return lines.join("\n");
}

export function SessionSummaryDialog({ open, summary, onClose }: Props) {
  const [copied, setCopied] = React.useState(false);
  const [showShare, setShowShare] = React.useState(false);

  const handleShare = React.useCallback(async () => {
    if (!summary) return;
    const text = buildShareText(summary);
    const url = typeof window !== "undefined" ? window.location.origin : "https://www.kakomon-ai.jp";
    try {
      const nav = (typeof navigator !== "undefined" ? navigator : null) as
        | (Navigator & {
            share?: (data: ShareData) => Promise<void>;
            clipboard?: { writeText: (s: string) => Promise<void> };
          })
        | null;
      if (nav?.share) {
        await nav.share({ title: "過去問AI", text, url });
        return;
      }
      if (nav?.clipboard) {
        await nav.clipboard.writeText(`${text}\n${url}`);
        setCopied(true);
        window.setTimeout(() => setCopied(false), 2500);
      }
    } catch {
      // user cancelled or unsupported
    }
  }, [summary]);

  if (!summary) return null;

  const passLine =
    summary.accuracyPct >= 80
      ? "合格圏内！この調子で本番も突破。"
      : summary.accuracyPct >= 60
        ? "合格ライン目前。あと少しで突破。"
        : "復習で着実に上げていきましょう。";

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="max-w-md p-0">
        <div className="relative overflow-hidden rounded-2xl">
          <button
            type="button"
            onClick={onClose}
            className="absolute right-2 top-2 z-10 rounded-lg p-1 text-zinc-500 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800"
            aria-label="閉じる"
          >
            <X className="h-4 w-4" />
          </button>
          <div className="bg-gradient-to-br from-sky-500 via-sky-600 to-indigo-600 px-6 py-5 text-white">
            <div className="mb-1 flex items-center gap-1 text-xs opacity-90">
              <Sparkles className="h-3 w-3" />
              セッション完了
            </div>
            <DialogTitle className="text-2xl font-bold leading-8 tracking-tight">
              お疲れさまでした
            </DialogTitle>
            <p className="mt-1 text-sm opacity-90">{passLine}</p>
          </div>

          <div className="space-y-4 px-6 py-5">
            <div className="grid grid-cols-3 gap-2 text-center">
              <Stat icon={<Target className="h-4 w-4" />} label="正答率" value={`${summary.accuracyPct}%`} highlight />
              <Stat icon={<CheckCircle2 className="h-4 w-4" />} label="正解数" value={`${summary.correct}/${summary.total}`} />
              <Stat icon={<Clock className="h-4 w-4" />} label="時間" value={formatDuration(summary.durationSec)} />
            </div>

            {summary.byCategory.length > 0 && (
              <div>
                <h3 className="mb-2 text-xs font-semibold text-zinc-600 dark:text-zinc-400">
                  分野別正答率
                </h3>
                <ul className="space-y-1.5">
                  {summary.byCategory.slice(0, 4).map((c) => (
                    <li key={c.category} className="flex items-center justify-between gap-3 text-sm">
                      <span className="truncate text-zinc-700 dark:text-zinc-300">
                        {c.category}
                      </span>
                      <span className="flex items-center gap-2 text-xs">
                        <span className="text-zinc-500 dark:text-zinc-400">
                          {c.correct}/{c.total}
                        </span>
                        <span
                          className={
                            c.accuracyPct >= 80
                              ? "font-semibold text-emerald-600 dark:text-emerald-400"
                              : c.accuracyPct >= 60
                                ? "font-semibold text-amber-600 dark:text-amber-400"
                                : "font-semibold text-rose-600 dark:text-rose-400"
                          }
                        >
                          {c.accuracyPct}%
                        </span>
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="rounded-xl border border-sky-200 bg-sky-50 p-3 text-sm dark:border-sky-900 dark:bg-sky-950/40">
              <div className="flex items-start gap-2">
                <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-sky-600 dark:text-sky-400" />
                <div>
                  <p className="font-semibold text-sky-900 dark:text-sky-100">
                    明日のおすすめ
                  </p>
                  <p className="text-xs text-sky-800 dark:text-sky-200">
                    {summary.recommendedTomorrow}問を目安に、ストリークを伸ばしましょう。
                  </p>
                </div>
              </div>
            </div>

            <div>
              <button
                type="button"
                onClick={() => setShowShare((v) => !v)}
                aria-expanded={showShare}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-sky-600 px-4 py-2.5 text-sm font-semibold text-white shadow hover:bg-sky-700"
              >
                <Share2 className="h-4 w-4" />
                {showShare ? "シェアパネルを閉じる" : "SNSにシェアする"}
              </button>
              {showShare && (
                <div className="mt-3">
                  <SocialShare
                    text={buildSessionText({
                      count: summary.total,
                      accuracy: summary.accuracyPct,
                    })}
                    url={typeof window !== "undefined" ? window.location.origin : "https://www.kakomon-ai.jp"}
                    imageUrl={buildOgImageUrl({
                      type: "session",
                      title: `${summary.total}問完了 / 正答率${summary.accuracyPct}%`,
                      count: summary.total,
                      accuracy: summary.accuracyPct,
                    })}
                  />
                </div>
              )}
            </div>

            <div className="flex flex-col gap-2 sm:flex-row">
              <Button
                variant="outline"
                className="flex-1 gap-2"
                onClick={handleShare}
              >
                <Share2 className="h-4 w-4" />
                {copied ? "コピーしました" : "簡易共有"}
              </Button>
              <Button variant="outline" className="flex-1" onClick={onClose}>
                ホームへ戻る
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function Stat({
  icon,
  label,
  value,
  highlight,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div
      className={`rounded-xl border p-2 ${
        highlight
          ? "border-sky-200 bg-sky-50 dark:border-sky-900 dark:bg-sky-950/40"
          : "border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900"
      }`}
    >
      <div className="mb-0.5 flex items-center justify-center text-zinc-500 dark:text-zinc-400">
        {icon}
      </div>
      <div className="text-[10px] text-zinc-500 dark:text-zinc-400">{label}</div>
      <div className="text-base font-bold text-zinc-900 dark:text-zinc-50">{value}</div>
    </div>
  );
}
