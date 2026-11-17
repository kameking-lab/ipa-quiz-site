"use client";

import { PawPrint, Star } from "lucide-react";
import type { SeatMascot } from "@/lib/home/study-room";
import { cn } from "@/lib/utils";

export interface StudyRoomSeatDetail {
  index: number;
  exam: string;
  /** Must come from the existing server entitlement check, never a browser premium flag. */
  premium?: boolean;
  todayAnswers?: number;
}

/** Presentation only: the anonymous presence aggregate currently has no per-learner metadata. */
export function StudyRoomSeat({ name, index, mascot, detail, cheering, onCheer }: {
  name: string; index: number; mascot: SeatMascot | null; detail?: StudyRoomSeatDetail;
  cheering: boolean; onCheer: () => void;
}) {
  return <button type="button" aria-label={`${index + 1} ${name}のチワワを応援`} onClick={onCheer}
    data-premium={detail?.premium === true} data-mascot-state={mascot?.state} data-cheering={cheering}
    className={cn("relative flex h-full w-full min-w-0 flex-col items-center justify-center rounded-xl border bg-background/85 text-foreground shadow-sm outline-offset-2 focus-visible:outline-2 focus-visible:outline-primary",
      detail?.premium ? "border-amber-500 ring-2 ring-amber-300" : "border-border/60")}>
    {detail?.premium && <Star aria-label="特等席" className="absolute right-1 top-1 z-10 size-3 fill-amber-400 text-amber-600" />}
    <span className="relative block aspect-square w-full" data-mirrored={mascot?.mirrored}>
      {mascot && <>
        {mascot.state === "away" && <>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={mascot.vacantSrc} alt="" className="absolute inset-0 size-full object-contain" width={256} height={256} loading="lazy" decoding="async" />
        </>}
        {/* Native lazy loading reuses identical local WebP URLs without image optimizer requests. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={mascot.src} alt={`${name}のチワワ（${mascot.stateLabel}）`} width={256} height={256} loading="lazy" decoding="async"
          className={cn("study-mascot size-full object-contain motion-reduce:animate-none", mascot.mirrored && "-scale-x-100", mascot.state === "away" && "absolute bottom-0 right-0 !size-3/4")} />
      </>}
    </span>
    {detail?.todayAnswers !== undefined && <span className="max-w-full truncate px-1 pb-1 text-[9px] tabular-nums">今日{detail.todayAnswers}問</span>}
    {cheering && <PawPrint aria-label="応援" className="pointer-events-none absolute left-1/2 top-1/4 size-6 -translate-x-1/2 fill-rose-200 text-rose-500 motion-safe:animate-pulse" />}
  </button>;
}
