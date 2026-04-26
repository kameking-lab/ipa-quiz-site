import { cn } from "@/lib/utils";

interface Props {
  className?: string;
  size?: "sm" | "md";
  handle?: string;
}

export function XFollowButton({ className, size = "md", handle = "kakomon_ai_jp" }: Props) {
  const isSmall = size === "sm";
  return (
    <a
      href={`https://x.com/intent/follow?screen_name=${handle}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`公式X (@${handle}) をフォロー`}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full bg-black font-semibold text-white shadow-sm transition hover:bg-zinc-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500 dark:bg-zinc-100 dark:text-black dark:hover:bg-white",
        isSmall ? "px-2.5 py-1 text-[11px]" : "px-3 py-1.5 text-xs",
        className,
      )}
    >
      <XLogo className={isSmall ? "h-3 w-3" : "h-3.5 w-3.5"} />
      <span>フォロー</span>
      <span className="opacity-70">@{handle}</span>
    </a>
  );
}

function XLogo({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
    >
      <path d="M18.244 2H21.5l-7.5 8.566L23 22h-6.844l-5.355-6.998L4.7 22H1.443l8.02-9.156L1 2h7.02l4.842 6.402L18.244 2zm-1.2 18h1.86L7.06 4H5.1l11.944 16z" />
    </svg>
  );
}
