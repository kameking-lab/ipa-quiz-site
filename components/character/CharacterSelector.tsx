"use client";

import * as React from "react";
import { Check } from "lucide-react";
import { CHARACTERS, CHARACTER_ORDER, type CharacterId } from "@/lib/ai/characters";
import { CharacterAvatar } from "./CharacterAvatar";
import { useRovingRadioGroup } from "@/lib/a11y/use-roving-radio";
import { cn } from "@/lib/utils";

interface Props {
  value: CharacterId;
  onChange: (id: CharacterId) => void;
  disabled?: boolean;
}

export function CharacterSelector({ value, onChange, disabled }: Props) {
  const { getRadioProps } = useRovingRadioGroup(CHARACTER_ORDER, value, onChange);
  return (
    <div
      role="radiogroup"
      aria-label="AI キャラクター選択"
      className={cn("grid grid-cols-1 gap-2 sm:grid-cols-3", disabled && "opacity-50")}
    >
      {CHARACTER_ORDER.map((id, index) => {
        const c = CHARACTERS[id];
        const selected = value === id;
        return (
          <button
            key={id}
            type="button"
            role="radio"
            aria-checked={selected}
            disabled={disabled}
            onClick={() => onChange(id)}
            {...getRadioProps(index)}
            className={cn(
              "relative flex flex-col items-center gap-2 rounded-xl border bg-white p-3 text-center transition-colors disabled:cursor-not-allowed dark:bg-zinc-900",
              selected
                ? "border-sky-500 ring-2 ring-sky-500/30 dark:border-sky-400"
                : "border-zinc-200 hover:border-zinc-300 dark:border-zinc-800 dark:hover:border-zinc-700",
            )}
          >
            {selected && (
              <span className="absolute right-2 top-2 rounded-full bg-sky-600 p-0.5 text-white">
                <Check className="h-3 w-3" />
              </span>
            )}
            <CharacterAvatar id={id} size={56} />
            <div>
              <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
                {c.name}
              </p>
              <p className="mt-0.5 text-[11px] leading-snug text-zinc-500 dark:text-zinc-400">
                {c.tagline}
              </p>
            </div>
            <p
              className={cn(
                "mt-1 w-full rounded-md px-2 py-1 text-[11px] leading-snug",
                c.accentClass,
              )}
            >
              {c.sample}
            </p>
          </button>
        );
      })}
    </div>
  );
}
