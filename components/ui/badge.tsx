import * as React from "react";
import { cn } from "@/lib/utils";

export function Badge({
  className,
  variant = "default",
  ...props
}: React.HTMLAttributes<HTMLSpanElement> & {
  variant?: "default" | "success" | "danger" | "warn" | "outline";
}) {
  const styles: Record<string, string> = {
    default:
      "bg-zinc-100 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-100 border-transparent",
    success:
      "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-200 border-transparent",
    danger: "bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-200 border-transparent",
    warn: "bg-amber-100 text-amber-900 dark:bg-amber-900/40 dark:text-amber-100 border-transparent",
    outline:
      "border border-zinc-300 text-zinc-700 dark:border-zinc-700 dark:text-zinc-300 bg-transparent",
  };
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-medium",
        styles[variant],
        className,
      )}
      {...props}
    />
  );
}
