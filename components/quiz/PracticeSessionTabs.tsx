"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import type { Session } from "@/lib/questions/types";
import { practiceSessionLabel } from "@/lib/questions/practice-session";

export function PracticeSessionTabs({ sessions, selected }: { sessions: Session[]; selected?: Session }) {
  const pathname = usePathname();
  const search = useSearchParams();
  if (sessions.length < 2) return null;
  return <nav aria-label="試験科目を選択" className="mx-auto flex w-full max-w-2xl flex-wrap gap-2 px-4 pt-3 sm:px-6">
    {sessions.map((session) => {
      const query = new URLSearchParams(search.toString());
      query.set("session", session);
      return <Link key={session} href={`${pathname}?${query}`} aria-current={selected === session ? "page" : undefined}
        className={`rounded-lg border px-3 py-2 text-sm ${selected === session ? "border-primary bg-primary/10 font-semibold text-primary" : "border-border text-muted-foreground"}`}>
        {practiceSessionLabel(session)}
      </Link>;
    })}
  </nav>;
}
