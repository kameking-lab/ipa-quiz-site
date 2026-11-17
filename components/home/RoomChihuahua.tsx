import { cn } from "@/lib/utils";

export function RoomChihuahua({ src, alt, className }: { src: string; alt: string; className?: string }) {
  return <span className={cn("relative block size-full", className)}>
    {/* Native lazy images share the ar-3 cutouts across all occupants. */}
    {/* eslint-disable-next-line @next/next/no-img-element */}
    <img src={src} alt={alt} width={256} height={256} loading="lazy" decoding="async" className="size-full object-contain" />
  </span>;
}
