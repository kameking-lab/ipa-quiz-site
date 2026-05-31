"use client";

import * as React from "react";
import { Copy, Check, Share2 } from "lucide-react";

interface Props {
  url: string;
  text: string;
  hashtags?: string[];
  /**
   * Compact mode renders an icon-only cluster (X / LINE / copy) suitable for a
   * page header. Tap targets are 36px — above the WCAG 2.5.8 (AA) 24px floor.
   */
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

/**
 * Single canonical share-buttons component (previously duplicated as
 * components/ShareButtons + components/seo/ShareButtons with divergent props and
 * platform coverage). Full mode: X / LINE / Facebook / copy / native share.
 * Compact mode: icon-only X / LINE / copy cluster for headers.
 */
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

  if (compact) {
    const iconBtn =
      "inline-flex h-9 w-9 items-center justify-center rounded-full border border-zinc-300 bg-white text-zinc-700 transition-colors hover:bg-zinc-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2 focus-visible:ring-offset-background dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:bg-zinc-800";

    return (
      <div role="group" aria-label="この問題を共有" className="relative flex items-center gap-1">
        <a
          href={buildXUrl(url, text, hashtags)}
          target="_blank"
          rel="noopener noreferrer"
          className={iconBtn}
          aria-label="X (Twitter) で共有"
        >
          <span aria-hidden="true" className="text-sm font-bold leading-none">
            𝕏
          </span>
        </a>
        <a
          href={buildLineUrl(url, text)}
          target="_blank"
          rel="noopener noreferrer"
          className={iconBtn}
          aria-label="LINE で共有"
        >
          <span aria-hidden="true" className="text-[10px] font-bold leading-none tracking-tighter">
            LINE
          </span>
        </a>
        <button
          type="button"
          onClick={copy}
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

  const items: Array<{ key: string; href: string; label: string; bg: string }> = [
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
    <div className="flex flex-wrap gap-2">
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
      {/* コピー成功はボタン文言が変わるだけでは SR に告知されない(WCAG 4.1.3)。
          compact モードと同様に polite live region で告知する。 */}
      <span role="status" aria-live="polite" className="sr-only">
        {copied ? "URL をコピーしました" : ""}
      </span>
    </div>
  );
}
