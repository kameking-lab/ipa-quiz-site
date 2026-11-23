"use client";

import { useEffect } from "react";
import Link from "next/link";
import { SafetyLearningProgress } from "@/components/exam-library/SafetyLearningProgress";
import { DashboardOverview } from "./tabs/DashboardOverview";
import { DashboardProgress } from "./tabs/DashboardProgress";
import { DashboardWeakness } from "./tabs/DashboardWeakness";
import { DashboardBadges } from "./tabs/DashboardBadges";
import { MockScoreHistory } from "./tabs/MockScoreHistory";
import { DashboardStudyPlan } from "./tabs/DashboardStudyPlan";

const sections = new Set(["overview", "progress", "weakness", "study-plan", "mock-scores", "badges"]);
const summaryClass = "min-h-11 cursor-pointer py-3 text-sm font-semibold";
const detailsClass = "scroll-mt-16 rounded-xl border border-border px-4 pb-2";

export function DashboardTabs({ categoryById }: { categoryById: Record<string, string> }) {
  useEffect(() => {
    function showLinkedSection() {
      const hash = window.location.hash.slice(1);
      const query = new URLSearchParams(window.location.search).get("tab") ?? "";
      const id = sections.has(hash) ? hash : query;
      if (!sections.has(id)) return;
      const section = document.getElementById(id);
      if (section instanceof HTMLDetailsElement) section.open = true;
      section?.scrollIntoView?.({ block: "start" });
    }
    showLinkedSection();
    window.addEventListener("hashchange", showLinkedSection);
    window.addEventListener("popstate", showLinkedSection);
    return () => {
      window.removeEventListener("hashchange", showLinkedSection);
      window.removeEventListener("popstate", showLinkedSection);
    };
  }, []);

  return (
    <main className="mx-auto w-full max-w-3xl space-y-6 px-4 pb-20 pt-8 sm:px-6 sm:pt-10">
      <header>
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">わたしの記録</h1>
        <Link href="/me#study-progress" className="inline-flex min-h-11 items-center text-sm underline">進捗と間違えた問題の復習</Link>
      </header>
      <section id="overview" className="scroll-mt-16"><DashboardOverview /></section>
      <section id="progress" className="scroll-mt-16"><DashboardProgress /></section>
      <details id="study-plan" className={detailsClass}>
        <summary className={summaryClass}>今日の計画</summary>
        <DashboardStudyPlan />
      </details>
      <details id="mock-scores" className={detailsClass}>
        <summary className={summaryClass}>模試記録</summary>
        <MockScoreHistory />
      </details>
      <details id="weakness" className={detailsClass}>
        <summary className={summaryClass}>弱点の記録</summary>
        <DashboardWeakness categoryById={categoryById} />
      </details>
      <details id="badges" className={detailsClass}>
        <summary className={summaryClass}>獲得済みのバッジ</summary>
        <DashboardBadges />
      </details>
      <SafetyLearningProgress compact />
    </main>
  );
}
