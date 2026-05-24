"use client";

import * as React from "react";
import { ChevronDown } from "lucide-react";

interface Props {
  summary: string;
  helper?: string;
  children: React.ReactNode;
  /**
   * Visual emphasis of the toggle button. 'primary' renders as a filled pill,
   * matching the plan's recommendation for the "全13区分を表示" entry; default
   * renders as a quieter outlined pill so optional sections (e.g. style-based
   * recommendation) don't compete with the headline 4-card grid.
   */
  emphasis?: "default" | "primary";
}

export function QuickstartDisclosure({
  summary,
  helper,
  children,
  emphasis = "default",
}: Props) {
  const [open, setOpen] = React.useState(false);
  const id = React.useId();
  const panelId = `quickstart-disclosure-${id}`;

  const buttonClass =
    emphasis === "primary"
      ? "inline-flex min-h-[44px] items-center gap-2 rounded-full bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground shadow-sm transition hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      : "inline-flex min-h-[44px] items-center gap-2 rounded-full border border-border bg-background px-4 py-2 text-sm font-medium text-foreground transition hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background";

  return (
    <section className="mt-8 rounded-2xl border border-border bg-card p-5 sm:p-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-base font-semibold text-foreground">{summary}</h2>
          {helper && (
            <p className="mt-1 text-xs text-muted-foreground">{helper}</p>
          )}
        </div>
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls={panelId}
          className={buttonClass}
        >
          {open ? "閉じる" : summary}
          <ChevronDown
            className={open ? "h-4 w-4 rotate-180 transition" : "h-4 w-4 transition"}
            aria-hidden="true"
          />
        </button>
      </div>
      {open && (
        <div id={panelId} className="mt-4">
          {children}
        </div>
      )}
    </section>
  );
}
