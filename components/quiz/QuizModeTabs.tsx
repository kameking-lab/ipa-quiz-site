"use client";

import * as React from "react";
import Link from "next/link";
import {
  RefreshCw,
  Sparkles,
  Target,
  Trophy,
  Zap,
} from "lucide-react";
import type { QuizMode } from "@/lib/questions/types";

interface Props {
  /** Active mode. "stream" / "mock" are derived from URL paths, not QuizMode. */
  active: QuizMode | "stream" | "mock";
  /** Selected exam, used to build mode-switching links. Defaults to "ap". */
  exam?: string;
}

const TABS: {
  key: QuizMode | "stream" | "mock";
  label: string;
  icon: React.ReactNode;
  href: (exam: string) => string;
}[] = [
  {
    key: "random",
    label: "通常クイズ",
    icon: <Sparkles className="h-3.5 w-3.5" />,
    href: (e) => `/quiz?mode=random&exam=${e}`,
  },
  {
    key: "stream",
    label: "ストリーム",
    icon: <Zap className="h-3.5 w-3.5" />,
    href: (e) => `/quiz/stream?exam=${e}`,
  },
  {
    key: "review",
    label: "復習",
    icon: <RefreshCw className="h-3.5 w-3.5" />,
    href: (e) => `/quiz?mode=review&exam=${e}`,
  },
  {
    key: "mock",
    label: "模試",
    icon: <Trophy className="h-3.5 w-3.5" />,
    href: (e) => `/mock-exam?exam=${e}`,
  },
  {
    key: "weakness",
    label: "弱点克服",
    icon: <Target className="h-3.5 w-3.5" />,
    href: (e) => `/quiz?mode=weakness&exam=${e}`,
  },
];

export function QuizModeTabs({ active, exam = "ap" }: Props) {
  return (
    <nav
      aria-label="クイズモード切替"
      className="mx-auto w-full max-w-2xl px-4 pt-3 sm:px-6"
    >
      <div className="flex items-center gap-1 overflow-x-auto rounded-xl border border-border bg-muted/30 p-1">
        {TABS.map((t) => {
          const isActive = t.key === active;
          return (
            <Link
              key={t.key}
              href={t.href(exam)}
              aria-current={isActive ? "page" : undefined}
              className={`inline-flex shrink-0 items-center gap-1 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
                isActive
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {t.icon}
              {t.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
