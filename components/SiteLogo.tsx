import { ChihuahuaMascot } from "@/components/ChihuahuaMascot";
import { cn } from "@/lib/utils";

interface Props {
  className?: string;
  iconOnly?: boolean;
}

export function SiteLogo({ className, iconOnly = false }: Props) {
  return (
    <span className={cn("inline-flex items-center gap-2", className)}>
      <ChihuahuaMascot pose="guide" size={36} />
      {!iconOnly && (
        <span className="text-base font-bold tracking-tight text-foreground">
          過去問AI
        </span>
      )}
    </span>
  );
}
