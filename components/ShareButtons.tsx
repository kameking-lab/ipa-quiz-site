"use client";

import * as React from "react";
import { Copy, Check, Share2 } from "lucide-react";

interface Props {
  url: string;
  text: string;
  hashtags?: string[];
  /** Compact mode hides labels and uses a single row of icon-only buttons. */
  compact?: boolean;
}

function buildXUrl(url: string, text: string, hashtags?: string[]): string {
  const params = new URLSearchParams();
  params.set("text", text);
  params.set("url", url);
  if (hashtags && hashtags.length > 0) params.set("hashtags", hashtags.join(","));
  return `https://x.com/intent/tweet?${params.toString()}`;
}

function buildLineUrl(url: string, text: string): string {
  return `https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`;
}

function buildFacebookUrl(url: string): string {
  return `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
}

export function ShareButtons({ url, text, hashtags, compact }: Props) {
  const [copied, setCopied] = React.useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // ignore
    }
  };

  const nativeShare = async () => {
    if (typeof navigator === "undefined" || !navigator.share) return;
    try {
      await navigator.share({ title: "過去問 AI", text, url });
    } catch {
      // user cancelled
    }
  };

  const items: Array<{ key: string; href?: string; onClick?: () => void; label: string; bg: string }> = [
    {
      key: "x",
      href: buildXUrl(url, text, hashtags),
      label: "X (Twitter)",
      bg: "bg-zinc-900 text-white hover:bg-zinc-700 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-300",
    },
    {
      key: "line",
      href: buildLineUrl(url, text),
      label: "LINE",
      bg: "bg-emerald-500 text-white hover:bg-emerald-600",
    },
    {
      key: "fb",
      href: buildFacebookUrl(url),
      label: "Facebook",
      bg: "bg-sky-700 text-white hover:bg-sky-800",
    },
  ];

  return (
    <div className={compact ? "flex flex-wrap gap-1.5" : "flex flex-wrap gap-2"}>
      {items.map((it) => (
        <a
          key={it.key}
          href={it.href}
          target="_blank"
          rel="noopener noreferrer"
          className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold transition ${it.bg}`}
        >
          {it.label}
        </a>
      ))}
      <button
        type="button"
        onClick={copy}
        className="inline-flex items-center gap-1.5 rounded-full border border-zinc-300 bg-white px-3 py-1.5 text-xs font-semibold text-zinc-700 transition hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:bg-zinc-800"
      >
        {copied ? (
          <>
            <Check className="h-3.5 w-3.5" />
            コピー済み
          </>
        ) : (
          <>
            <Copy className="h-3.5 w-3.5" />
            URL コピー
          </>
        )}
      </button>
      {typeof navigator !== "undefined" && typeof navigator.share === "function" && (
        <button
          type="button"
          onClick={nativeShare}
          className="inline-flex items-center gap-1.5 rounded-full border border-zinc-300 bg-white px-3 py-1.5 text-xs font-semibold text-zinc-700 transition hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:bg-zinc-800"
        >
          <Share2 className="h-3.5 w-3.5" />
          シェア…
        </button>
      )}
    </div>
  );
}
