"use client";

import { Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { ROOM_ART_EXTENT } from "@/lib/home/study-room-scatter";
import type { FurnitureMascot } from "@/lib/home/study-room-furniture";

export interface StudyRoomSeatDetail {
  index: number;
  exam: string;
  /** Must come from the existing server entitlement check, never a browser premium flag. */
  premium?: boolean;
  todayAnswers?: number;
}

/** Presentation only: the anonymous presence aggregate currently has no per-learner metadata. */
export function StudyRoomSeat({ name, index, mascot, detail, inspected, onInspect }: {
  name: string; index: number; mascot: FurnitureMascot; detail?: StudyRoomSeatDetail;
  inspected: boolean; onInspect: () => void;
}) {
  const { art } = mascot;
  return <button type="button" title={name} aria-label={`${index + 1} ${name}のチワワを見る`} aria-pressed={inspected} onClick={onInspect}
    data-premium={detail?.premium === true} data-mascot-state={mascot.state}
    className={cn("relative flex h-full w-full min-w-0 flex-col items-center justify-center rounded-full border-0 text-foreground outline-offset-[-3px] hover:bg-muted/50 focus-visible:outline-2 focus-visible:outline-primary",
      detail?.premium && "ring-1 ring-inset ring-amber-400/80")}>
    {detail?.premium && <Star aria-label="特等席" className="absolute right-1 top-1 z-10 size-3.5 fill-amber-300 text-amber-800 dark:text-amber-300" />}
    <span className="study-mascot pointer-events-none absolute inset-0 block motion-reduce:animate-none" data-furniture-art={art.id} data-direction={art.direction}>
      {mascot.qualification ? <span className={cn("absolute inset-0 block", mascot.mirrored && "-scale-x-100")} style={{ rotate: `${mascot.turn}deg` }} data-qualification-art>
        {/* Complementary cutouts retain the qualification's original chair, clothes,
            tools and paws. Their matching coordinates avoid a second desk or dog. */}
        {([
          ["furniture-back", "polygon(0% 0%,25% 0%,25% 55%,0% 65%)"],
          ["character", "polygon(25% 0%,100% 0%,100% 55%,25% 55%)"],
          ["furniture-front", "polygon(0% 65%,25% 55%,100% 55%,100% 100%,0% 100%)"],
        ] as const).map(([layer, clipPath]) => <span key={layer} data-layer={layer} className="absolute inset-0 block" style={{ clipPath }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={mascot.src} alt={layer === "character" ? `${name}のチワワ（${mascot.stateLabel}）` : ""} width={256} height={256} loading="lazy" decoding="async" className="size-full object-contain" />
        </span>)}
      </span> : <>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={mascot.src} alt={`${name}のチワワ（${mascot.stateLabel}）`} width={art.size[0]} height={art.size[1]} loading="lazy" decoding="async"
        className="absolute left-1/2 max-w-none -translate-x-1/2"
        style={{ width: `${art.size[0] / art.headWidth / ROOM_ART_EXTENT * 100}%`,
          bottom: `${-(art.size[1] - art.ground[1]) / art.headWidth / ROOM_ART_EXTENT * 100}%` }} /></>}
    </span>
  </button>;
}
