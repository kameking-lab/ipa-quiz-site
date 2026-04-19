import { BookOpen, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface Props {
  className?: string;
  iconOnly?: boolean;
}

export function SiteLogo({ className, iconOnly = false }: Props) {
  return (
    <span className={cn("inline-flex items-center gap-2", className)}>
      <span className="relative flex h-8 w-8 items-center justify-center rounded-xl bg-sky-600 text-white shadow-sm">
        <BookOpen className="h-4 w-4" />
        <Sparkles className="absolute -right-1 -top-1 h-3.5 w-3.5 rounded-full bg-amber-400 p-0.5 text-white shadow-sm" />
      </span>
      {!iconOnly && (
        <span className="text-base font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
          IPA Quiz
        </span>
      )}
    </span>
  );
}
