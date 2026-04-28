import { cn } from "@/lib/utils";

type Tone = "sky" | "emerald" | "amber" | "rose" | "zinc";

const TONE_CLASSES: Record<Tone, string> = {
  sky: "bg-sky-50 text-sky-700 ring-sky-200 dark:bg-sky-950/60 dark:text-sky-300 dark:ring-sky-900",
  emerald:
    "bg-emerald-50 text-emerald-700 ring-emerald-200 dark:bg-emerald-950/60 dark:text-emerald-300 dark:ring-emerald-900",
  amber:
    "bg-amber-50 text-amber-700 ring-amber-200 dark:bg-amber-950/60 dark:text-amber-300 dark:ring-amber-900",
  rose:
    "bg-rose-50 text-rose-700 ring-rose-200 dark:bg-rose-950/60 dark:text-rose-300 dark:ring-rose-900",
  zinc: "bg-zinc-100 text-zinc-700 ring-zinc-200 dark:bg-zinc-900 dark:text-zinc-300 dark:ring-zinc-800",
};

interface Props {
  label: string;
  tone?: Tone;
  className?: string;
}

export function TrustBadge({ label, tone = "zinc", className }: Props) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold ring-1 ring-inset",
        TONE_CLASSES[tone],
        className,
      )}
    >
      <CheckIcon />
      {label}
    </span>
  );
}

function CheckIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 12 12"
      className="h-2.5 w-2.5"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2.5 6.5l2.5 2.5 4.5-5" />
    </svg>
  );
}
