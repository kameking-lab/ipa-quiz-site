"use client";

import * as React from "react";
import { Check, Copy, Share2 } from "lucide-react";

export function ShareButtons({ url, title }: { url: string; title: string }) {
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
