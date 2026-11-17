"use client";

import { PawPrint, Star } from "lucide-react";
import type { SeatMascot } from "@/lib/home/study-room";
import { RoomChihuahua } from "./RoomChihuahua";
import { cn } from "@/lib/utils";
import type { RoomSeatPosition, StudyRoomScene } from "@/lib/home/study-room-scenes";
import { StudyDeskArtwork } from "./StudyDeskArtwork";

export interface StudyRoomSeatDetail {
  index: number;
  exam: string;
  /** Must come from the existing server entitlement check, never a browser premium flag. */
  premium?: boolean;
  todayAnswers?: number;
}

/** Presentation only: the anonymous presence aggregate currently has no per-learner metadata. */
export function StudyRoomSeat({ name, index, mascot, detail, inspected = false, cheering, onCheer, desk }: {
  name: string; index: number; mascot: SeatMascot | null; detail?: StudyRoomSeatDetail;
  inspected?: boolean;
  cheering: boolean; onCheer: () => void;
  desk?: { point: RoomSeatPosition; scene: StudyRoomScene; seed: number };
}) {
  return <button type="button" aria-label={`${index + 1} ${name}のチワワを応援`} onClick={onCheer} title={name}
    data-premium={detail?.premium === true} data-mascot-state={mascot?.state} data-cheering={cheering}
    className={cn("relative flex h-full w-full min-w-0 flex-col items-center justify-center rounded-full border-0 text-foreground outline-offset-[-3px] hover:bg-stone-200/40 dark:hover:bg-stone-700/40 focus-visible:outline-2 focus-visible:outline-primary",
      detail?.premium && "ring-1 ring-inset ring-amber-400/80")}>
    {detail?.premium && <Star aria-label="特等席" className="absolute right-1 top-1 z-10 size-3.5 fill-amber-300 text-amber-800 dark:text-amber-300" />}
    <span className="relative block aspect-square w-full" data-mirrored={mascot?.mirrored}>
      {mascot && (desk ? <StudyDeskArtwork mascot={mascot} name={name} {...desk} /> : <RoomChihuahua src={mascot.src} alt={`${name}のチワワ（${mascot.stateLabel}）`}
        className={cn("study-mascot rotate-[var(--dog-turn)] scale-[var(--dog-scale)] motion-reduce:animate-none", mascot.mirrored && "-scale-x-[var(--dog-scale)]")} />)}
    </span>
    {inspected && detail?.todayAnswers !== undefined && <span className="absolute -bottom-1 left-1/2 z-20 -translate-x-1/2 whitespace-nowrap rounded-full bg-background/95 px-1 pb-1 text-[10px] font-medium tabular-nums">今日{detail.todayAnswers}問</span>}
    {cheering && <PawPrint aria-label="応援" className="pointer-events-none absolute left-1/2 top-1/4 size-6 -translate-x-1/2 fill-rose-200 text-rose-500 motion-safe:animate-pulse" />}
  </button>;
}
