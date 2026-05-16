"use client";

import { useEffect, useRef } from "react";
import { posthogCapture } from "@/lib/posthog";

interface Props {
  slug: string;
  exam?: string | null;
}

const THRESHOLDS = [50, 75, 100] as const;

/** ブログ記事のスクロール深度を計測する。50/75/100% 到達時に1回ずつ送信。 */
export function BlogScrollTracker({ slug, exam }: Props) {
  const firedRef = useRef<Set<number>>(new Set());

  useEffect(() => {
    const fired = firedRef.current;

    const onScroll = () => {
      const el = document.documentElement;
      const scrolled = el.scrollTop + el.clientHeight;
      const total = el.scrollHeight;
      if (total <= 0) return;
      const pct = Math.round((scrolled / total) * 100);
      for (const threshold of THRESHOLDS) {
        if (pct >= threshold && !fired.has(threshold)) {
          fired.add(threshold);
          posthogCapture("blog_article_scrolled", {
            slug,
            exam: exam ?? null,
            depth_pct: threshold,
          });
        }
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [slug, exam]);

  return null;
}
