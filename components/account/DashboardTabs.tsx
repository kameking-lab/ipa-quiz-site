"use client";

import * as React from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { DashboardOverview } from "./tabs/DashboardOverview";
import { DashboardProgress } from "./tabs/DashboardProgress";
import { DashboardWeakness } from "./tabs/DashboardWeakness";
import { DashboardBadges } from "./tabs/DashboardBadges";
import { DashboardTutor } from "./tabs/DashboardTutor";

const TABS = [
  { value: "overview", label: "概要" },
  { value: "progress", label: "進捗" },
  { value: "weakness", label: "弱点" },
  { value: "badges", label: "バッジ・ストリーク" },
  { value: "tutor", label: "AIチューター" },
] as const;

type TabValue = (typeof TABS)[number]["value"];

interface Props {
  categoryById: Record<string, string>;
}

function findTab(raw: string | null): TabValue | null {
  if (!raw) return null;
  const found = TABS.find((t) => t.value === raw);
  return (found?.value as TabValue) ?? null;
}

function readInitialTab(): TabValue | null {
  if (typeof window === "undefined") return null;
  const fromHash = findTab(window.location.hash.replace("#", ""));
  if (fromHash) return fromHash;
  const params = new URLSearchParams(window.location.search);
  return findTab(params.get("tab"));
}

export function DashboardTabs({ categoryById }: Props) {
  const [tab, setTab] = React.useState<TabValue>("overview");

  React.useEffect(() => {
    const initial = readInitialTab();
    if (initial) setTab(initial);
    function onHashChange() {
      const next = findTab(window.location.hash.replace("#", ""));
      if (next) setTab(next);
    }
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  function handleChange(v: string) {
    setTab(v as TabValue);
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      url.hash = v;
      window.history.replaceState(null, "", url.toString());
    }
  }

  return (
    <main className="mx-auto w-full max-w-5xl px-4 py-8">
      <header className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
          学習ダッシュボード
        </h1>
        <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
          学習データを 5 つの観点で一望できます。
        </p>
      </header>

      <Tabs value={tab} onValueChange={handleChange}>
        <TabsList className="mb-6 flex w-full flex-nowrap justify-start">
          {TABS.map((t) => (
            <TabsTrigger
              key={t.value}
              value={t.value}
              className="h-12 min-h-12 shrink-0 whitespace-nowrap px-4 text-xs leading-none sm:text-sm"
            >
              {t.label}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="overview">
          <DashboardOverview />
        </TabsContent>
        <TabsContent value="progress">
          <DashboardProgress />
        </TabsContent>
        <TabsContent value="weakness">
          <DashboardWeakness categoryById={categoryById} />
        </TabsContent>
        <TabsContent value="badges">
          <DashboardBadges />
        </TabsContent>
        <TabsContent value="tutor">
          <DashboardTutor categoryById={categoryById} />
        </TabsContent>
      </Tabs>
    </main>
  );
}
