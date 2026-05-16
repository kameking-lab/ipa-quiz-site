"use client";

import { useCallback } from "react";
import { ChevronDown } from "lucide-react";
import { posthogCapture } from "@/lib/posthog";

interface Props {
  index: number;
  category: string;
  question: string;
  answer: string;
}

export function FaqItem({ index, category, question, answer }: Props) {
  const handleToggle = useCallback(
    (e: React.SyntheticEvent<HTMLDetailsElement>) => {
      if (e.currentTarget.open) {
        posthogCapture("faq_expanded", {
          category,
          q_index: index,
        });
      }
    },
    [category, index],
  );

  return (
    <details
      className="group rounded-2xl border border-border bg-card p-5 shadow-sm transition-all open:border-primary/40 open:shadow-md sm:p-6"
      onToggle={handleToggle}
    >
      <summary className="flex cursor-pointer list-none items-start justify-between gap-4 text-left">
        <div className="flex items-start gap-3">
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-primary-soft text-xs font-bold text-primary-soft-foreground">
            Q{String(index).padStart(2, "0")}
          </span>
          <span className="text-sm font-semibold leading-relaxed text-foreground sm:text-base">
            {question}
          </span>
        </div>
        <ChevronDown
          aria-hidden="true"
          className="mt-1 h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-200 group-open:rotate-180 group-open:text-primary"
        />
      </summary>
      <div className="mt-4 border-t border-border pt-4 pl-10 text-sm leading-relaxed text-muted-foreground">
        {answer}
      </div>
    </details>
  );
}
