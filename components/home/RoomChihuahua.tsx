import type { CSSProperties } from "react";
import { cn } from "@/lib/utils";

/** Original transparent ar-3 sheet: six square frames, three columns and two rows. */
export const RELAXED_ROOM_SHEET = "/images/home/room-chihuahuas/home-cream-sheet.png";
export function RoomChihuahua({ src, frame, alt, className }: { src: string; frame?: number; alt: string; className?: string }) {
  return <span className={cn("relative block size-full overflow-hidden", className)}>
    {/* eslint-disable-next-line @next/next/no-img-element */}
    <img src={src} alt={alt} width={256} height={256} loading="lazy" decoding="async"
      style={frame === undefined ? undefined : { "--pose-left": `${frame % 3 * -100}%`, "--pose-top": `${Math.floor(frame / 3) * -100}%` } as CSSProperties}
      className={frame === undefined ? "size-full object-contain" : "absolute left-[var(--pose-left)] top-[var(--pose-top)] h-[200%] w-[300%] max-w-none"} />
  </span>;
}
