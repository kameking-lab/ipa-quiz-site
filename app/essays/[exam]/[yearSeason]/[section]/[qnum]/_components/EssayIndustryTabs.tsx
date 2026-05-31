"use client";

import { useMemo, useState } from "react";

import type { EssayIndustryId, SCEssayAnswer } from "@/lib/essays/types";
import { ESSAY_INDUSTRY_LABELS } from "@/lib/essays/types";
import { posthogCapture } from "@/lib/posthog";

const INDUSTRY_ORDER: EssayIndustryId[] = [
  "it",
  "manufacturing",
  "finance",
  "retail",
  "telecom",
  "construction",
  "healthcare",
  "public",
];

interface Props {
  industries: SCEssayAnswer[];
  pdfUrl: string;
}

export default function EssayIndustryTabs({ industries, pdfUrl }: Props) {
  const orderedIndustries = useMemo(
    () =>
      INDUSTRY_ORDER.filter((id) =>
        industries.some((e) => e.industryId === id)
      ),
    [industries]
  );

  const [selectedIndustry, setSelectedIndustry] = useState<EssayIndustryId>(
    orderedIndustries[0] ?? "it"
  );

  return (
    <>
      <div className="mb-4">
        <p className="mb-2 text-xs font-medium text-zinc-500 dark:text-zinc-400">
          業種を選択してください
        </p>
        <div role="group" aria-label="業種選択" className="flex flex-wrap gap-2">
          {orderedIndustries.map((id) => {
            const isActive = selectedIndustry === id;
            return (
              <button
                key={id}
                type="button"
                aria-pressed={isActive}
                onClick={() => {
                  setSelectedIndustry(id);
                  posthogCapture("essay_industry_switched", { industry: id });
                }}
                className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                  isActive
                    ? "bg-sky-600 text-white dark:bg-sky-500"
                    : "border border-zinc-300 bg-white text-zinc-700 hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800"
                }`}
              >
                {ESSAY_INDUSTRY_LABELS[id]}
              </button>
            );
          })}
        </div>
      </div>

      {industries.map((essay) => {
        const isActive = essay.industryId === selectedIndustry;
        const charCount = (essay.intro + essay.body + essay.conclusion).replace(
          /\s/g,
          ""
        ).length;
        return (
          <section
            key={essay.industryId}
            hidden={!isActive}
            className="space-y-4"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-zinc-900 dark:text-zinc-50">
                {essay.industryName}の合格答案例
              </h2>
              <span className="rounded-full bg-zinc-100 px-2.5 py-0.5 text-xs text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400">
                約 {charCount.toLocaleString()} 字
              </span>
            </div>

            <section className="rounded-2xl border border-emerald-200 bg-emerald-50/50 p-5 dark:border-emerald-900/40 dark:bg-emerald-950/20">
              <h3 className="mb-3 text-xs font-semibold uppercase tracking-wide text-emerald-700 dark:text-emerald-400">
                序論（設問ア）
              </h3>
              <p className="whitespace-pre-wrap text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
                {essay.intro}
              </p>
            </section>

            <section className="rounded-2xl border border-sky-200 bg-sky-50/50 p-5 dark:border-sky-900/40 dark:bg-sky-950/20">
              <h3 className="mb-3 text-xs font-semibold uppercase tracking-wide text-sky-700 dark:text-sky-400">
                本論（設問イ）
              </h3>
              <p className="whitespace-pre-wrap text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
                {essay.body}
              </p>
            </section>

            <section className="rounded-2xl border border-violet-200 bg-violet-50/50 p-5 dark:border-violet-900/40 dark:bg-violet-950/20">
              <h3 className="mb-3 text-xs font-semibold uppercase tracking-wide text-violet-700 dark:text-violet-400">
                結論（設問ウ）
              </h3>
              <p className="whitespace-pre-wrap text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
                {essay.conclusion}
              </p>
            </section>

            <p className="text-right text-xs text-zinc-400 dark:text-zinc-500">
              出題参考:{" "}
              <a
                href={pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-zinc-600 dark:hover:text-zinc-300"
              >
                IPA 情報処理技術者試験
              </a>
            </p>
          </section>
        );
      })}
    </>
  );
}
