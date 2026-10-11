"use client";

import * as React from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  RefreshCw,
  Sparkles,
  Target,
  Trophy,
  Zap,
} from "lucide-react";
import type { QuizMode } from "@/lib/questions/types";
import { MOCK_EXAM_CONFIGS } from "@/lib/mock-exam/config";

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
  const search = useSearchParams();
  const supportsMockExam = Object.hasOwn(MOCK_EXAM_CONFIGS, exam);
  const tabs = TABS.filter((tab) => tab.key !== "mock" || supportsMockExam);
  function modeHref(base: string, key: string) {
    const url = new URL(base, "https://local.invalid");
    for (const name of ["session", "returnTo"]) {
      const value = search.get(name);
      if (value && (name !== "session" || key !== "mock")) url.searchParams.set(name, value);
    }
    return url.pathname + url.search;
  }
  return (
    <nav
      aria-label="クイズモード切替"
      className="mx-auto w-full max-w-2xl px-4 pt-3 sm:px-6"
    >
      <details className="rounded-xl border border-border bg-muted/30 sm:hidden">
        <summary className="flex min-h-11 cursor-pointer items-center px-3 text-sm font-semibold">学習モード：{tabs.find((t) => t.key === active)?.label ?? "年度別"}</summary>
        <div className="grid grid-cols-2 gap-1 p-2 pt-0">{tabs.map((t) => <Link key={t.key} href={modeHref(t.href(exam), t.key)} aria-current={t.key === active ? "page" : undefined} className={t.key === active ? "flex min-h-11 items-center gap-2 rounded-lg bg-background px-3 text-xs font-semibold text-primary" : "flex min-h-11 items-center gap-2 rounded-lg px-3 text-xs font-medium hover:bg-background"}>{t.icon}{t.label}</Link>)}</div>
      </details>
      <div className="hidden items-center gap-1 rounded-xl border border-border bg-muted/30 p-1 sm:flex">
        {tabs.map((t) => {
          const isActive = t.key === active;
          return (
            <Link
              key={t.key}
              href={modeHref(t.href(exam), t.key)}
              aria-current={isActive ? "page" : undefined}
              className={`inline-flex min-h-11 shrink-0 items-center gap-1 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
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
