"use client";

import { Star } from "lucide-react";
import type { CafeMascot } from "@/lib/home/study-room-cafe-mascots";
import { CafeMascotImage } from "./StudyRoomCafeScene";

export interface StudyRoomSeatDetail {
  index: number;
  exam: string;
  /** Must come from the existing server entitlement check. */
  premium?: boolean;
  todayAnswers?: number;
}

export function StudyRoomSeat({ name, index, mascot, detail, inspected, onFocus, onBlur, onInspect }: {
  name: string; index: number; mascot: CafeMascot; detail?: StudyRoomSeatDetail;
  inspected: boolean; onFocus: () => void; onBlur: () => void; onInspect: () => void;
}) {
  return <button type="button" title={name} aria-label={`${index + 1} ${name}のチワワを見る`}
    aria-pressed={inspected} onClick={onInspect} onFocus={onFocus} onBlur={onBlur}
    data-premium={detail?.premium === true}
    className="relative block size-full rounded-full border-0 text-foreground outline-offset-[-2px] hover:bg-card/50 focus-visible:outline-2 focus-visible:outline-primary aria-pressed:bg-card/60">
    {detail?.premium && <Star aria-label="特等席" className="absolute right-0 top-0 z-10 size-3 fill-amber-300 text-amber-800 dark:text-amber-300" />}
    <CafeMascotImage mascot={mascot} alt={`${name}のチワワ（${mascot.label}）`} />
  </button>;
}
