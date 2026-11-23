import Image from "next/image";
import { idleArt, qualificationStudyArt, type IdleVariant } from "@/lib/home/study-room";
import { cn } from "@/lib/utils";

export function P3Mascot({ exam, pose, className }: { exam: string; pose?: IdleVariant; className?: string }) {
  const src = (pose && idleArt(exam, pose)) || qualificationStudyArt(exam);
  return <Image src={src} alt="" width={134} height={134} unoptimized className={cn("p3-mascot", className)} />;
}
