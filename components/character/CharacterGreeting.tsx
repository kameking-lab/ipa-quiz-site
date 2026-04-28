"use client";

import * as React from "react";
import Link from "next/link";
import { CHARACTERS, DEFAULT_CHARACTER_ID, type CharacterId } from "@/lib/ai/characters";
import { readCharacterState } from "@/lib/storage/character";
import { CharacterAvatar } from "./CharacterAvatar";
import { cn } from "@/lib/utils";

export function CharacterGreeting() {
  const [mounted, setMounted] = React.useState(false);
  const [id, setId] = React.useState<CharacterId>(DEFAULT_CHARACTER_ID);
  const [enabled, setEnabled] = React.useState(true);

  React.useEffect(() => {
    const cs = readCharacterState();
    setId(cs.id);
    setEnabled(cs.enabled);
    setMounted(true);
  }, []);

  if (!mounted || !enabled) return null;

  const c = CHARACTERS[id];

  return (
    <div className="mb-4 flex items-center gap-3 rounded-2xl border border-zinc-200 bg-white p-3 dark:border-zinc-800 dark:bg-zinc-950">
      <CharacterAvatar id={id} size={48} />
      <div className="min-w-0 flex-1">
        <div className="flex items-baseline gap-2">
          <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">{c.name}</p>
          <Link
            href="/settings"
            className="text-[10px] text-zinc-400 hover:text-sky-600 hover:underline dark:hover:text-sky-400"
          >
            変更
          </Link>
        </div>
        <p
          className={cn(
            "mt-1 inline-block rounded-md px-2 py-1 text-xs leading-snug",
            c.accentClass,
          )}
        >
          {c.greeting}
        </p>
      </div>
    </div>
  );
}
