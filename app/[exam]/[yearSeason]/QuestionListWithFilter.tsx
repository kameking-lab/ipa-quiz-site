"use client";

import * as React from "react";
import { practiceCategoryLabel } from "@/lib/questions/practice-session";
import { displayQuestionGroupLabel } from "./question-list-label";
import type { ExamCode } from "@/lib/questions/types";
import { Check, ChevronRight, X } from "lucide-react";
import { LS_KEYS } from "@/lib/storage/keys";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export interface QuestionListItem {
  id: string;
  qNumber: number;
  officialQuestionLabel?: string;
  category: string;
  isCalculation: boolean;
  isPlaceholder: boolean;
  questionPreview: string;
  href: string;
  explanationHref?: string;
}

export interface SessionGroup {
  session: string;
  id?: string;
  items: QuestionListItem[];
}

interface SolvedMap {
  [id: string]: { correct: boolean };
}

function readSolvedMap(): SolvedMap {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(LS_KEYS.history);
    if (!raw) return {};
    const parsed = JSON.parse(raw) as {
      entries?: { id?: unknown; correct?: unknown }[];
    };
    if (!parsed?.entries || !Array.isArray(parsed.entries)) return {};
    const map: SolvedMap = {};
    for (const e of parsed.entries) {
      if (typeof e?.id !== "string" || typeof e?.correct !== "boolean") continue;
      map[e.id] = { correct: e.correct };
    }
    return map;
  } catch {
    return {};
  }
}

export function QuestionListWithFilter({ groups, exam, showSectionNavigation = false }: { groups: SessionGroup[]; exam?: ExamCode; showSectionNavigation?: boolean }) {
  const [solved, setSolved] = React.useState<SolvedMap>({});
  const [hydrated, setHydrated] = React.useState(false);

  React.useEffect(() => {
     
    setSolved(readSolvedMap());
    setHydrated(true);
    const onStorage = (e: StorageEvent) => {
      if (e.key === LS_KEYS.history) setSolved(readSolvedMap());
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const total = groups.reduce((acc, g) => acc + g.items.length, 0);
  let answered = 0;
  let wrong = 0;
  for (const g of groups) {
    for (const it of g.items) {
      const s = solved[it.id];
      if (s) {
        answered += 1;
        if (!s.correct) wrong += 1;
      }
    }
  }

  const visibleSectionGroups = showSectionNavigation ? groups.filter((group) => group.id && group.items.length > 0) : [];

  return (
    <div>
      {hydrated && answered > 0 && (
        <div className="mb-5 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
          <span>{answered} / {total} 解答済み</span>
          {wrong > 0 && exam && <a href={'/quiz?' + new URLSearchParams({ exam, mode: "review", reviewKind: "wrong" })} className="inline-flex min-h-11 items-center underline">間違えた問題を復習</a>}
        </div>
      )}

      {visibleSectionGroups.length > 0 && (
        <nav aria-label="出題区分へ移動" className="mb-6 rounded-2xl border border-border bg-card p-4">
          <p className="mb-3 text-sm font-semibold">見たい区分へ移動</p>
          <div className="grid gap-2 sm:grid-cols-2">
            {visibleSectionGroups.map((group) => (
              <a key={group.id} href={`#${group.id}`} className="rounded-xl border border-border px-3 py-2.5 text-sm font-medium text-foreground hover:border-primary/40 hover:bg-primary-soft focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">
                {displayQuestionGroupLabel(group.session, exam)}
              </a>
            ))}
          </div>
        </nav>
      )}

      {groups.map(({ session, id, items }) => {
        if (items.length === 0) return null;
        return (
          <section key={session} id={id} aria-label={displayQuestionGroupLabel(session, exam)} className="p3-listed mb-4 scroll-mt-16">
            <h2 className="flex items-center gap-2 border-b border-hairline bg-primary-soft px-3 py-2.5 text-sm font-bold text-primary-soft-foreground">
              <span className="h-1 w-1 rounded-full bg-primary" />
              {displayQuestionGroupLabel(session, exam)}
            </h2>
            <ul className="divide-y divide-hairline">
              {items.map((q) => {
                const status = solved[q.id];
                return (
                  <li key={q.id}>
                    <a
                      href={q.href}
                      aria-label={`${q.officialQuestionLabel ?? `問${q.qNumber}`}を解く`}
                      className={cn(
                        "study-focus group flex min-h-12 items-center gap-2 border-s-2 px-2.5 py-1.5",
                        status
                          ? status.correct
                            ? "border-emerald-300/70 bg-emerald-50/50 hover:border-emerald-400 dark:border-emerald-900/60 dark:bg-emerald-950/20"
                            : "border-rose-300/70 bg-rose-50/50 hover:border-rose-400 dark:border-rose-900/60 dark:bg-rose-950/20"
                          : "border-transparent hover:border-primary hover:bg-primary-soft",
                      )}
                    >
                      <span
                        className={cn(
                          "flex min-h-8 w-11 shrink-0 items-center justify-center rounded-lg text-sm font-semibold tabular-nums",
                          status
                            ? status.correct
                              ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-200"
                              : "bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-200"
                            : "bg-primary-soft text-primary-soft-foreground",
                        )}
                      >
                        {q.officialQuestionLabel ?? `問${q.qNumber}`}
                      </span>
                      <span className="flex min-w-0 flex-1 flex-col-reverse gap-0.5">
                        <span className="flex flex-wrap items-center gap-1.5 text-xs">
                          <span className="text-xs font-medium text-primary">{practiceCategoryLabel(q.category, exam)}</span>
                          {q.isCalculation && <Badge variant="warn">計算</Badge>}
                          {q.isPlaceholder && (
                            <Badge variant="warn">解説準備中</Badge>
                          )}
                          {status && (
                            <Badge variant={status.correct ? "success" : "danger"}>
                              {status.correct ? (
                                <>
                                  <Check className="h-3 w-3" aria-hidden="true" />
                                  正解
                                </>
                              ) : (
                                <>
                                  <X className="h-3 w-3" aria-hidden="true" />
                                  不正解
                                </>
                              )}
                            </Badge>
                          )}
                        </span>
                        <span
                          className={cn(
                            "line-clamp-2 text-[13px] leading-snug",
                            status ? "text-foreground/80" : "text-foreground",
                          )}
                        >
                          {q.questionPreview}
                        </span>
                      </span>
                      <span className="flex shrink-0 items-center gap-1 text-xs font-medium text-primary">解く<ChevronRight className="size-4" aria-hidden="true" /></span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </section>
        );
      })}

    </div>
  );
}
