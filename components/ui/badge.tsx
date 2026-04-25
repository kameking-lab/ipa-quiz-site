import * as React from "react";
import { cn } from "@/lib/utils";

export type BadgeVariant =
  | "default"
  | "primary"
  | "success"
  | "danger"
  | "warn"
  | "outline"
  | "soft";

export function Badge({
  className,
  variant = "default",
  ...props
}: React.HTMLAttributes<HTMLSpanElement> & {
  variant?: BadgeVariant;
}) {
  const styles: Record<BadgeVariant, string> = {
    default:
      "bg-muted text-foreground border-transparent",
    primary:
      "bg-primary text-primary-foreground border-transparent",
    soft:
      "bg-primary-soft text-primary-soft-foreground border-transparent",
    success:
      "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-200 border-transparent",
    danger:
      "bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-200 border-transparent",
    warn:
      "bg-amber-100 text-amber-900 dark:bg-amber-900/40 dark:text-amber-100 border-transparent",
    outline:
      "border border-border text-muted-foreground bg-transparent",
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
