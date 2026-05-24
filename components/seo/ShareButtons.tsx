"use client";

import * as React from "react";
import { Check, Copy, Share2 } from "lucide-react";

interface ShareButtonsProps {
  url: string;
  title: string;
  /**
   * When true, render a compact icon-only cluster suitable for placing in a
   * page header. Tap targets stay at 44px to preserve the a11y baseline.
   */
  compact?: boolean;
}

export function ShareButtons({ url, title, compact = false }: ShareButtonsProps) {
  const [copied, setCopied] = React.useState(false);

  const xIntent = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`;
  const lineIntent = `https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(url)}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // ignore
    }
  };

  const handleNative = async () => {
    if (typeof navigator !== "undefined" && "share" in navigator) {
      try {
        await navigator.share({ title, url });
      } catch {
        // user cancelled
      }
    } else {
      handleCopy();
    }
  };

  if (compact) {
    const iconBtn =
      "inline-flex h-11 w-11 items-center justify-center rounded-full border border-zinc-300 bg-white text-zinc-700 transition-colors hover:bg-zinc-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2 focus-visible:ring-offset-background dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:bg-zinc-800";

    return (
      <div
        role="group"
        aria-label="この問題を共有"
        className="relative flex items-center gap-1.5"
      >
        <a
          href={xIntent}
          target="_blank"
          rel="noopener noreferrer"
          className={iconBtn}
          aria-label="X (Twitter) で共有"
        >
          <span aria-hidden="true" className="text-sm font-bold leading-none">𝕏</span>
        </a>
        <a
          href={lineIntent}
          target="_blank"
          rel="noopener noreferrer"
          className={iconBtn}
          aria-label="LINE で共有"
        >
          <span
            aria-hidden="true"
            className="text-[10px] font-bold leading-none tracking-tighter"
          >
            LINE
          </span>
        </a>
        <button
          type="button"
          onClick={handleCopy}
          className={iconBtn}
          aria-label={copied ? "リンクをコピーしました" : "リンクをコピー"}
        >
          {copied ? (
            <Check className="h-4 w-4" aria-hidden="true" />
          ) : (
            <Copy className="h-4 w-4" aria-hidden="true" />
          )}
        </button>
        <span
          role="status"
          aria-live="polite"
          className={
            copied
              ? "pointer-events-none absolute -bottom-7 right-0 rounded-md bg-zinc-900 px-2 py-0.5 text-[11px] font-medium text-white shadow-md dark:bg-zinc-100 dark:text-zinc-900"
              : "sr-only"
          }
        >
          {copied ? "リンクをコピーしました" : ""}
        </span>
      </div>
    );
  }

  const baseBtn =
    "inline-flex items-center gap-1.5 rounded-full border border-zinc-300 bg-white px-3 py-1.5 text-xs font-medium text-zinc-700 transition-colors hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:bg-zinc-800";

  return (
    <div className="flex flex-wrap gap-2">
      <a href={xIntent} target="_blank" rel="noopener noreferrer" className={baseBtn}>
        X でシェア
      </a>
      <a href={lineIntent} target="_blank" rel="noopener noreferrer" className={baseBtn}>
        LINE
      </a>
      <button type="button" onClick={handleCopy} className={baseBtn}>
        {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
        {copied ? "コピーしました" : "URLコピー"}
      </button>
      <button type="button" onClick={handleNative} className={baseBtn}>
        <Share2 className="h-3.5 w-3.5" />
        共有
      </button>
    </div>
  );
}
