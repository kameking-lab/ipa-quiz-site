"use client";

import * as React from "react";
import { Download, Film, Loader2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  buildSlidesForQuestion,
  downloadBlob,
  generateVideoBlob,
} from "@/lib/motivation/video";

interface Props {
  examLabel: string;
  yearSeason: string;
  questionText: string;
  answerText: string;
  explanationSummary: string;
  filename?: string;
}

export function QuestionVideoButton({
  examLabel,
  yearSeason,
  questionText,
  answerText,
  explanationSummary,
  filename = "ipa-quiz-short.webm",
}: Props) {
  const [supported, setSupported] = React.useState<boolean | null>(null);
  const [generating, setGenerating] = React.useState(false);
  const [progress, setProgress] = React.useState(0);
  const [error, setError] = React.useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (typeof window === "undefined") return;
    const ok =
      typeof MediaRecorder !== "undefined" &&
      typeof HTMLCanvasElement !== "undefined" &&
      typeof (HTMLCanvasElement.prototype as { captureStream?: () => unknown })
        .captureStream === "function";
     
    setSupported(!!ok);
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleGenerate = async () => {
    setGenerating(true);
    setProgress(0);
    setError(null);
    setPreviewUrl(null);
    try {
      const slides = buildSlidesForQuestion({
        examLabel,
        yearSeason,
        questionText: questionText.slice(0, 380),
        answerText,
        explanationSummary: explanationSummary.slice(0, 320),
      });
      const blob = await generateVideoBlob({
        slides,
        onProgress: (p) => setProgress(p),
      });
      const url = URL.createObjectURL(blob);
      setPreviewUrl(url);
      downloadBlob(blob, filename);
    } catch (e) {
      setError(e instanceof Error ? e.message : "動画生成に失敗しました");
    } finally {
      setGenerating(false);
    }
  };

  if (supported === null) return null;
  if (!supported) {
    return (
      <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-3 text-xs text-zinc-600 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400">
        このブラウザは動画生成 (MediaRecorder + Canvas captureStream) に対応していません。
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <Button
        variant="outline"
        size="sm"
        className="w-full gap-2"
        onClick={handleGenerate}
        disabled={generating}
      >
        {generating ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            生成中… {progress}%
          </>
        ) : (
          <>
            <Film className="h-4 w-4" />
            15秒ショート動画を生成（TikTok / Reels 用）
          </>
        )}
      </Button>

      {error && (
        <div className="flex items-start gap-2 rounded-lg border border-rose-200 bg-rose-50 p-2 text-xs text-rose-800 dark:border-rose-900 dark:bg-rose-950/40 dark:text-rose-200">
          <X className="h-3.5 w-3.5 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {previewUrl && (
        <div className="space-y-2">
          <video
            src={previewUrl}
            controls
            playsInline
            className="aspect-[9/16] w-full max-w-xs rounded-xl border border-zinc-200 dark:border-zinc-800"
          />
          <Button
            variant="outline"
            size="sm"
            className="gap-2"
            onClick={() => {
              const a = document.createElement("a");
              a.href = previewUrl;
              a.download = filename;
              a.click();
            }}
          >
            <Download className="h-3.5 w-3.5" />
            もう一度ダウンロード
          </Button>
          <p className="text-[11px] text-zinc-500 dark:text-zinc-400">
            ヒント: TikTok / Instagram Reels の縦長 (9:16) フォーマットです。
          </p>
        </div>
      )}
    </div>
  );
}
