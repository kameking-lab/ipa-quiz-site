"use client";

import * as React from "react";
import Link from "next/link";
import { Check, ChevronRight, X } from "lucide-react";
import { LS_KEYS } from "@/lib/storage/keys";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export interface QuestionListItem {
  id: string;
  qNumber: number;
  category: string;
  isCalculation: boolean;
  isPlaceholder: boolean;
  questionPreview: string;
  href: string;
}

export interface SessionGroup {
  session: string;
  items: QuestionListItem[];
}

type Filter = "all" | "unanswered" | "wrong";

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

export function QuestionListWithFilter({ groups }: { groups: SessionGroup[] }) {
  const [solved, setSolved] = React.useState<SolvedMap>({});
  const [hydrated, setHydrated] = React.useState(false);
  const [filter, setFilter] = React.useState<Filter>("all");

  React.useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
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

  function shouldShow(item: QuestionListItem): boolean {
    if (!hydrated) return true;
    const s = solved[item.id];
    if (filter === "unanswered") return !s;
    if (filter === "wrong") return !!s && !s.correct;
    return true;
  }

  return (
    <div>
      {hydrated && answered > 0 && (
        <div
          role="tablist"
          aria-label="解答状況フィルター"
          className="mb-5 flex flex-wrap items-center gap-2"
        >
          <FilterButton
            active={filter === "all"}
            onClick={() => setFilter("all")}
            label="全て"
            count={total}
          />
          <FilterButton
            active={filter === "unanswered"}
            onClick={() => setFilter("unanswered")}
            label="未解答のみ"
            count={total - answered}
          />
          <FilterButton
            active={filter === "wrong"}
            onClick={() => setFilter("wrong")}
            label="不正解のみ"
            count={wrong}
          />
          <span className="ml-auto text-[11px] text-muted-foreground">
            {answered} / {total} 解答済み
          </span>
        </div>
      )}

      {groups.map(({ session, items }) => {
        const filtered = items.filter(shouldShow);
        if (filtered.length === 0) return null;
        return (
          <section key={session} aria-label={session} className="mb-8">
            <h2 className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              <span className="h-1 w-1 rounded-full bg-primary" />
              {session.toUpperCase()}
            </h2>
            <ul className="space-y-2">
              {filtered.map((q) => {
                const status = solved[q.id];
                return (
                  <li key={q.id}>
                    <Link
                      href={q.href}
                      className={cn(
                        "group flex items-start gap-3 rounded-2xl border p-4 transition-all hover:-translate-y-0.5 hover:shadow-md",
                        status
                          ? status.correct
                            ? "border-emerald-300/70 bg-emerald-50/50 hover:border-emerald-400 dark:border-emerald-900/60 dark:bg-emerald-950/20"
                            : "border-rose-300/70 bg-rose-50/50 hover:border-rose-400 dark:border-rose-900/60 dark:bg-rose-950/20"
                          : "border-border bg-card hover:border-primary/40",
                      )}
                    >
                      <span
                        className={cn(
                          "flex h-8 w-12 shrink-0 items-center justify-center rounded-lg text-xs font-bold",
                          status
                            ? status.correct
                              ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-200"
                              : "bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-200"
                            : "bg-primary-soft text-primary-soft-foreground",
                        )}
                      >
                        問{q.qNumber}
                      </span>
                      <span className="flex-1 space-y-1.5 min-w-0">
                        <span className="flex flex-wrap items-center gap-1.5 text-xs">
                          <Badge variant="default">{q.category}</Badge>
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
                            "line-clamp-2 block text-sm leading-relaxed",
                            status ? "text-foreground/80" : "text-foreground",
                          )}
                        >
                          {q.questionPreview}
                        </span>
                      </span>
                      <ChevronRight className="mt-2 h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-primary" />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </section>
        );
      })}

      {hydrated &&
        answered > 0 &&
        groups.every((g) => g.items.filter(shouldShow).length === 0) && (
          <p className="rounded-2xl border border-dashed border-border px-4 py-8 text-center text-sm text-muted-foreground">
            該当する問題はありません。
          </p>
        )}
    </div>
  );
}

function FilterButton({
  active,
  onClick,
  label,
  count,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
  count: number;
}) {
  return (
    <button
      role="tab"
      aria-selected={active}
      onClick={onClick}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium transition-colors",
        active
          ? "border-primary/40 bg-primary-soft text-primary-soft-foreground"
          : "border-border bg-card text-muted-foreground hover:border-primary/30 hover:bg-muted",
      )}
    >
      <span>{label}</span>
      <span className="text-[10px] tabular-nums opacity-70">{count}</span>
    </button>
  );
}
