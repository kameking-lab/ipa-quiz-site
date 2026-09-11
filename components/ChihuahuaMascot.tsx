import Image from "next/image";
import { cn } from "@/lib/utils";
export function ChihuahuaMascot({ pose = "study", size = 80, className, alt = "" }: { pose?: "study" | "guide" | "celebrate"; size?: number; className?: string; alt?: string }) {
  return <Image src={`/mascot/chihuahua-${pose}.webp`} alt={alt} width={size} height={size} className={cn("shrink-0 object-contain", className)} />;
}
