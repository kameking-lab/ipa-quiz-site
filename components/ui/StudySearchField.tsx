import type { ComponentPropsWithoutRef } from "react";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = Omit<ComponentPropsWithoutRef<"input">, "type"> & { compact?: boolean };

export function StudySearchField({ compact, className, ...input }: Props) {
  return (
    <label className="flex min-w-0 items-center gap-2 rounded-full border border-input bg-card px-4 focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-ring">
      <Search aria-hidden="true" className="size-5 shrink-0 text-muted-foreground" />
      <input
        {...input}
        type="search"
        className={cn(
          "w-full min-w-0 bg-transparent text-base text-foreground outline-none placeholder:text-muted-foreground",
          compact ? "min-h-[46px]" : "min-h-[50px]",
          className,
        )}
      />
    </label>
  );
}
