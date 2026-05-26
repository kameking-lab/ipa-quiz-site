import * as React from "react";
import { cn } from "@/lib/utils";
import type { BadgeDef } from "@/lib/motivation/badges";

interface Props {
  badge: BadgeDef;
  earned: boolean;
  size?: "sm" | "md" | "lg";
}

const SIZES: Record<NonNullable<Props["size"]>, { box: string; emoji: string; ring: string }> = {
  sm: { box: "h-14 w-14", emoji: "text-xl", ring: "ring-2" },
  md: { box: "h-20 w-20", emoji: "text-3xl", ring: "ring-4" },
  lg: { box: "h-28 w-28", emoji: "text-5xl", ring: "ring-4" },
};

export function BadgeMedallion({ badge, earned, size = "md" }: Props) {
  const s = SIZES[size];
  return (
    <div
      className={cn(
        "relative flex shrink-0 items-center justify-center rounded-full bg-gradient-to-br shadow-lg transition-transform",
        s.box,
        earned ? badge.gradient : "from-zinc-300 to-zinc-400 dark:from-zinc-700 dark:to-zinc-800",
        earned ? "hover:scale-105" : "opacity-50 grayscale",
        s.ring,
        earned ? "ring-white/40 dark:ring-zinc-900" : "ring-zinc-300 dark:ring-zinc-800",
      )}
      aria-label={`${badge.name}バッジ${earned ? "獲得済み" : "未獲得"}`}
    >
      <span className={cn("drop-shadow-md", s.emoji)} aria-hidden="true">
        {badge.emoji}
      </span>
      <span className="absolute -bottom-1 right-0 rounded-full bg-white px-1.5 py-0.5 text-[10px] font-bold text-zinc-700 shadow dark:bg-zinc-900 dark:text-zinc-200">
        {badge.threshold}日
      </span>
    </div>
  );
}
