import * as React from "react";
import { cn } from "@/lib/utils";
import type { CharacterId } from "@/lib/ai/characters";

interface Props {
  id: CharacterId;
  size?: number;
  className?: string;
}

export function CharacterAvatar({ id, size = 64, className }: Props) {
  return (
    <div
      className={cn(
        "flex items-center justify-center rounded-full border border-zinc-200 bg-white dark:border-zinc-700 dark:bg-zinc-900",
        className,
      )}
      style={{ width: size, height: size }}
      aria-hidden
    >
      {id === "momo" && <MomoSvg size={size} />}
      {id === "haru" && <HaruSvg size={size} />}
      {id === "zan" && <ZanSvg size={size} />}
    </div>
  );
}

function MomoSvg({ size }: { size: number }) {
  return (
    <svg width={size * 0.85} height={size * 0.85} viewBox="0 0 64 64" fill="none">
      <circle cx="32" cy="32" r="28" fill="#fbcfe8" />
      <circle cx="24" cy="30" r="3" fill="#831843" />
      <circle cx="40" cy="30" r="3" fill="#831843" />
      <path d="M22 40 Q32 48 42 40" stroke="#831843" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <circle cx="20" cy="38" r="3" fill="#f9a8d4" />
      <circle cx="44" cy="38" r="3" fill="#f9a8d4" />
      <path d="M22 18 Q32 8 42 18" stroke="#be185d" strokeWidth="2" fill="#f9a8d4" />
    </svg>
  );
}

function HaruSvg({ size }: { size: number }) {
  return (
    <svg width={size * 0.85} height={size * 0.85} viewBox="0 0 64 64" fill="none">
      <circle cx="32" cy="32" r="28" fill="#bae6fd" />
      <rect x="14" y="20" width="36" height="6" rx="2" fill="#0c4a6e" />
      <circle cx="24" cy="32" r="3" fill="#0c4a6e" />
      <circle cx="40" cy="32" r="3" fill="#0c4a6e" />
      <path d="M24 42 L40 42" stroke="#0c4a6e" strokeWidth="2.5" strokeLinecap="round" />
      <rect x="18" y="28" width="10" height="8" rx="2" stroke="#0c4a6e" strokeWidth="1.5" fill="none" />
      <rect x="36" y="28" width="10" height="8" rx="2" stroke="#0c4a6e" strokeWidth="1.5" fill="none" />
      <path d="M28 32 L36 32" stroke="#0c4a6e" strokeWidth="1.5" />
    </svg>
  );
}

function ZanSvg({ size }: { size: number }) {
  return (
    <svg width={size * 0.85} height={size * 0.85} viewBox="0 0 64 64" fill="none">
      <circle cx="32" cy="32" r="28" fill="#3f3f46" />
      <path d="M14 22 L32 12 L50 22 L46 26 L32 18 L18 26 Z" fill="#18181b" />
      <path d="M18 30 L26 28" stroke="#fafafa" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M38 28 L46 30" stroke="#fafafa" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="24" cy="34" r="2.5" fill="#fafafa" />
      <circle cx="40" cy="34" r="2.5" fill="#fafafa" />
      <path d="M24 46 L40 46" stroke="#fafafa" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}
