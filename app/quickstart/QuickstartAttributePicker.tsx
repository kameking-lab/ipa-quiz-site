"use client";

import * as React from "react";
import Link from "next/link";
import {
  ATTRIBUTE_OPTIONS,
  getRecommendedPath,
  readOnboardingState,
  setAttribute as persistAttribute,
  setSelectedExam as persistSelectedExam,
  type UserAttribute,
} from "@/lib/onboarding";
import type { ExamCode } from "@/lib/questions/types";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";

interface ExamOption {
  code: ExamCode;
  label: string;
}

interface Props {
  examOptions: ExamOption[];
}

export function QuickstartAttributePicker({ examOptions }: Props) {
  const [attribute, setAttribute] = React.useState<UserAttribute | null>(null);
  const [exam, setExam] = React.useState<ExamCode>("ap");

  React.useEffect(() => {
    const state = readOnboardingState();
    if (state.attribute) setAttribute(state.attribute);
    if (state.selectedExam) setExam(state.selectedExam);
  }, []);

  const handleAttribute = (value: UserAttribute) => {
    setAttribute(value);
    persistAttribute(value);
  };

  const handleExam = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value as ExamCode;
    setExam(value);
    persistSelectedExam(value);
  };

  const path = attribute ? getRecommendedPath(attribute, exam) : null;

  return (
    <div className="mt-4 space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
        <label className="text-xs font-medium text-foreground" htmlFor="qs-exam">
          試験区分
        </label>
        <select
          id="qs-exam"
          value={exam}
          onChange={handleExam}
          className="min-h-[44px] rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          {examOptions.map((opt) => (
            <option key={opt.code} value={opt.code}>
              {opt.code.toUpperCase()} {opt.label}
            </option>
          ))}
        </select>
      </div>

      <div role="radiogroup" aria-label="学習スタイル" className="grid gap-2 sm:grid-cols-3">
        {ATTRIBUTE_OPTIONS.map((opt) => {
          const isSelected = attribute === opt.value;
          return (
            <button
              key={opt.value}
              type="button"
              role="radio"
              aria-checked={isSelected}
              onClick={() => handleAttribute(opt.value)}
              className={`min-h-[88px] rounded-xl border px-3 py-3 text-left transition-colors ${
                isSelected
                  ? "border-primary bg-primary/5 ring-1 ring-primary"
                  : "border-border bg-background hover:bg-muted"
              }`}
            >
              <div className="text-sm font-semibold text-foreground">{opt.label}</div>
              <p className="mt-1 text-xs text-muted-foreground">{opt.blurb}</p>
            </button>
          );
        })}
      </div>

      {path && (
        <div className="mt-4 rounded-xl border border-border bg-background p-4">
          <div className="flex items-center gap-2">
            <Badge variant="primary">推奨ルート</Badge>
            <h3 className="text-base font-semibold text-foreground">{path.title}</h3>
          </div>
          <p className="mt-1 text-xs text-muted-foreground">{path.summary}</p>
          <ol className="mt-3 space-y-2">
            {path.steps.map((s, idx) => (
              <li key={s.href}>
                <Link
                  href={s.href}
                  className="group flex items-start gap-3 rounded-lg border border-border bg-card px-3 py-2.5 hover:bg-muted"
                >
                  <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                    {idx + 1}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-sm font-medium text-foreground group-hover:underline">
                      {s.label}
                    </span>
                    <span className="mt-0.5 block text-xs text-muted-foreground">
                      {s.description}
                    </span>
                  </span>
                  <span className="flex shrink-0 items-center gap-1 text-[11px] text-muted-foreground">
                    約{s.estMin}分
                    <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </span>
                </Link>
              </li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );
}
