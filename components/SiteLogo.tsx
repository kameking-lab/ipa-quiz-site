import Image from "next/image";
import { BookOpen } from "lucide-react";
import chihuahuaIcon from "@/public/brand/chihuahua-icon-192.png";
import { cn } from "@/lib/utils";

interface Props {
  className?: string;
  iconOnly?: boolean;
}

export function SiteLogo({ className, iconOnly = false }: Props) {
  return (
    <span className={cn("inline-flex items-center gap-2", className)}>
      <Image src={chihuahuaIcon} alt="" width={36} height={36} className="site-logo-mascot rounded-full" />
      <span className="p3-logo-mark" aria-hidden="true"><BookOpen className="size-[18px]" /></span>
      {!iconOnly && (
        <span className="text-base font-bold tracking-tight text-foreground">
          過去問AI
        </span>
      )}
    </span>
  );
}
