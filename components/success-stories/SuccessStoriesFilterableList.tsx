"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { examLabel } from "@/lib/utils";
import type { ExamCode } from "@/lib/questions/types";
import type { SuccessStorySummary } from "@/data/success-stories/types";

type AgeBucket = "10s" | "20s" | "30s" | "40plus";
type OccupationBucket = "student" | "professional" | "freelance" | "other";
type StudyMonthsBucket = "lt3" | "3to6" | "6to12" | "12plus";

const AGE_OPTIONS: { value: AgeBucket; label: string }[] = [
  { value: "10s", label: "10代" },
  { value: "20s", label: "20代" },
  { value: "30s", label: "30代" },
  { value: "40plus", label: "40代以上" },
];

const OCCUPATION_OPTIONS: { value: OccupationBucket; label: string }[] = [
  { value: "student", label: "学生" },
  { value: "professional", label: "社会人" },
  { value: "freelance", label: "フリーランス" },
  { value: "other", label: "その他" },
];

const STUDY_OPTIONS: { value: StudyMonthsBucket; label: string }[] = [
  { value: "lt3", label: "3か月未満" },
  { value: "3to6", label: "3〜6か月" },
  { value: "6to12", label: "6か月〜1年" },
  { value: "12plus", label: "1年以上" },
];

function bucketAge(ageRange: string): AgeBucket {
  if (ageRange.startsWith("10")) return "10s";
  if (ageRange.startsWith("20")) return "20s";
  if (ageRange.startsWith("30")) return "30s";
  return "40plus";
}

function bucketOccupation(occupation: string): OccupationBucket {
  const o = occupation.toLowerCase();
  if (o.includes("学生") || o.includes("大学院") || o.includes("院生") || o.includes("新卒")) {
    return "student";
  }
  if (o.includes("フリーランス") || o.includes("個人事業")) return "freelance";
  if (occupation.trim().length > 0) return "professional";
  return "other";
}

function bucketStudyMonths(m: number): StudyMonthsBucket {
  if (m < 3) return "lt3";
  if (m <= 6) return "3to6";
  if (m <= 12) return "6to12";
  return "12plus";
}

interface Props {
  stories: SuccessStorySummary[];
  examOrder: readonly ExamCode[];
}

export function SuccessStoriesFilterableList({ stories, examOrder }: Props) {
  const [ages, setAges] = useState<Set<AgeBucket>>(new Set());
  const [occs, setOccs] = useState<Set<OccupationBucket>>(new Set());
  const [studies, setStudies] = useState<Set<StudyMonthsBucket>>(new Set());

  const filtered = useMemo(() => {
    return stories.filter((s) => {
      if (ages.size > 0 && !ages.has(bucketAge(s.ageRange))) return false;
      if (occs.size > 0 && !occs.has(bucketOccupation(s.occupation))) return false;
      if (studies.size > 0 && !studies.has(bucketStudyMonths(s.studyMonths))) return false;
      return true;
    });
  }, [stories, ages, occs, studies]);

  const grouped = useMemo(() => {
    const m = new Map<ExamCode, SuccessStorySummary[]>();
    for (const s of filtered) {
      const arr = m.get(s.exam) ?? [];
      arr.push(s);
      m.set(s.exam, arr);
    }
    return m;
  }, [filtered]);

  const totalActive = ages.size + occs.size + studies.size;
  const clearAll = () => {
    setAges(new Set());
    setOccs(new Set());
    setStudies(new Set());
  };

  return (
    <>
      <section
        aria-labelledby="attribute-filter-heading"
        className="mb-8 rounded-2xl border border-zinc-200 bg-zinc-50 p-5 dark:border-zinc-800 dark:bg-zinc-900/40"
      >
        <div className="mb-3 flex flex-wrap items-baseline justify-between gap-2">
          <h2
            id="attribute-filter-heading"
            className="text-sm font-semibold text-zinc-900 dark:text-zinc-50"
          >
            属性で絞り込む
          </h2>
          <p className="text-xs text-zinc-500 dark:text-zinc-400" aria-live="polite">
            該当: <strong className="text-zinc-900 dark:text-zinc-50">{filtered.length}</strong> 件
            {totalActive > 0 && (
              <button
                type="button"
                onClick={clearAll}
                className="ml-3 text-sky-700 underline-offset-2 hover:underline dark:text-sky-300"
              >
                すべて解除
              </button>
            )}
          </p>
        </div>

        <FilterRow
          legend="年代"
          options={AGE_OPTIONS}
          selected={ages}
          onToggle={(v) => toggle(setAges, v)}
        />
        <FilterRow
          legend="職業"
          options={OCCUPATION_OPTIONS}
          selected={occs}
          onToggle={(v) => toggle(setOccs, v)}
        />
        <FilterRow
          legend="学習期間"
          options={STUDY_OPTIONS}
          selected={studies}
          onToggle={(v) => toggle(setStudies, v)}
        />
      </section>

      <div className="space-y-12">
        {examOrder.map((examKey) => {
          const items = grouped.get(examKey);
          if (!items || items.length === 0) return null;
          return (
            <section key={examKey} aria-labelledby={`section-${examKey}`}>
              <div className="mb-4 flex items-baseline justify-between">
                <h2
                  id={`section-${examKey}`}
                  className="border-l-4 border-sky-500 pl-3 text-lg font-bold text-zinc-900 dark:text-zinc-50 sm:text-xl"
                >
                  {examLabel(examKey)}
                  <span className="ml-2 text-xs font-normal text-zinc-500 dark:text-zinc-400">
                    {items.length}本
                  </span>
                </h2>
                <Link
                  href={`/success-stories/${examKey}`}
                  className="text-xs text-sky-700 hover:underline dark:text-sky-300"
                >
                  すべて見る →
                </Link>
              </div>
              <ul className="space-y-3">
                {items.map((s) => (
                  <li key={s.slug}>
                    <Link
                      href={`/success-stories/${s.exam}/${s.slug}`}
                      className="block rounded-2xl border border-zinc-200 bg-white p-4 transition-colors hover:border-sky-300 hover:bg-sky-50/40 dark:border-zinc-800 dark:bg-zinc-950 dark:hover:border-sky-700 dark:hover:bg-sky-950/20"
                    >
                      <div className="mb-1.5 flex flex-wrap items-center gap-2 text-[11px] text-zinc-500 dark:text-zinc-400">
                        <span className="rounded bg-zinc-100 px-1.5 py-0.5 dark:bg-zinc-800">
                          {s.ageRange}
                        </span>
                        <span className="rounded bg-zinc-100 px-1.5 py-0.5 dark:bg-zinc-800">
                          {s.occupation}
                        </span>
                        <span className="rounded bg-emerald-100 px-1.5 py-0.5 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
                          {s.studyMonths}か月 / {s.totalStudyHours}h
                        </span>
                      </div>
                      <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50 sm:text-base">
                        {s.title}
                      </h3>
                      <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-zinc-600 dark:text-zinc-400 sm:text-sm">
                        {s.description}
                      </p>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          );
        })}
        {filtered.length === 0 && (
          <p className="rounded-2xl border border-dashed border-zinc-300 bg-zinc-50 px-4 py-10 text-center text-sm text-zinc-500 dark:border-zinc-700 dark:bg-zinc-900/40 dark:text-zinc-400">
            条件に一致する体験記がありません。フィルターを緩めてください。
          </p>
        )}
      </div>
    </>
  );
}

function toggle<T>(setter: React.Dispatch<React.SetStateAction<Set<T>>>, value: T) {
  setter((prev) => {
    const next = new Set(prev);
    if (next.has(value)) next.delete(value);
    else next.add(value);
    return next;
  });
}

interface FilterRowProps<T extends string> {
  legend: string;
  options: { value: T; label: string }[];
  selected: Set<T>;
  onToggle: (v: T) => void;
}

function FilterRow<T extends string>({ legend, options, selected, onToggle }: FilterRowProps<T>) {
  return (
    <fieldset className="mb-3 last:mb-0">
      <legend className="mb-1.5 text-[11px] font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
        {legend}
      </legend>
      <div className="flex flex-wrap gap-2">
        {options.map((o) => {
          const active = selected.has(o.value);
          return (
            <button
              key={o.value}
              type="button"
              aria-pressed={active}
              onClick={() => onToggle(o.value)}
              className={
                active
                  ? "min-h-[36px] rounded-full border border-sky-500 bg-sky-500 px-3 py-1 text-xs font-medium text-white shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                  : "min-h-[36px] rounded-full border border-zinc-300 bg-white px-3 py-1 text-xs text-zinc-700 hover:border-sky-300 hover:bg-sky-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2 focus-visible:ring-offset-background dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:border-sky-700 dark:hover:bg-sky-950/40"
              }
            >
              {o.label}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}
