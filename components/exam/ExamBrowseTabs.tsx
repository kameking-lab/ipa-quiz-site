"use client";

import * as React from "react";
import Link from "next/link";
import { Calendar, ChevronRight, Tags, Trophy } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import type { ExamCode } from "@/lib/questions/types";

export interface YearItem {
  key: string;
  label: string;
  count: number;
}

export interface CategoryItem {
  category: string;
  count: number;
}

interface Props {
  exam: ExamCode;
  years: YearItem[];
  categories: CategoryItem[];
}

const MOCK_PRESETS = [
  { label: "本番想定 模試", desc: "実試験と同じ問題数・制限時間で受験", href: (e: string) => `/mock-exam?exam=${e}` },
  { label: "ランダム短時間演習", desc: "スキマ時間で 80 問までランダム", href: (e: string) => `/quiz?mode=random&exam=${e}` },
  { label: "復習モード", desc: "間違えた問題と☆付き問題を優先出題", href: (e: string) => `/quiz?mode=review&exam=${e}` },
  { label: "未回答モード", desc: "まだ解いていない問題だけ出題", href: (e: string) => `/quiz?mode=unanswered&exam=${e}` },
] as const;

export function ExamBrowseTabs({ exam, years, categories }: Props) {
  return (
    <Tabs defaultValue="year">
      <TabsList className="mb-4 w-full">
        <TabsTrigger value="year" className="flex-1">
          <Calendar className="mr-1 h-3.5 w-3.5 inline" />
          年度別
        </TabsTrigger>
        <TabsTrigger value="topic" className="flex-1">
          <Tags className="mr-1 h-3.5 w-3.5 inline" />
          分野別
        </TabsTrigger>
        <TabsTrigger value="mock" className="flex-1">
          <Trophy className="mr-1 h-3.5 w-3.5 inline" />
          模試
        </TabsTrigger>
      </TabsList>

      <TabsContent value="year">
        {years.length === 0 ? (
          <p className="rounded-2xl border border-border bg-card p-5 text-sm text-muted-foreground">
            年度データがまだ登録されていません。
          </p>
        ) : (
          <ul className="grid gap-2 sm:grid-cols-2">
            {years.map((g) => (
              <li key={g.key}>
                <Link
                  href={`/${exam}/${g.key}`}
                  className="group flex items-center justify-between rounded-xl border border-border bg-card p-3.5 text-sm transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md"
                >
                  <span className="font-medium text-foreground">{g.label}</span>
                  <span className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span className="rounded-full bg-muted px-2 py-0.5 font-semibold">
                      {g.count}問
                    </span>
                    <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:text-primary" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </TabsContent>

      <TabsContent value="topic">
        {categories.length === 0 ? (
          <p className="rounded-2xl border border-border bg-card p-5 text-sm text-muted-foreground">
            分野データがまだ登録されていません。
          </p>
        ) : (
          <ul className="grid gap-2 sm:grid-cols-2">
            {categories.map((c) => (
              <li key={c.category}>
                <Link
                  href={`/${exam}/topic/${encodeURIComponent(c.category)}`}
                  className="group flex items-center justify-between rounded-xl border border-border bg-card p-3.5 text-sm transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md"
                >
                  <span className="font-medium text-foreground">{c.category}</span>
                  <span className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span className="rounded-full bg-muted px-2 py-0.5 font-semibold">
                      {c.count}問
                    </span>
                    <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:text-primary" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </TabsContent>

      <TabsContent value="mock">
        <ul className="grid gap-2 sm:grid-cols-2">
          {MOCK_PRESETS.map((m) => (
            <li key={m.label}>
              <Link
                href={m.href(exam)}
                className="group flex items-center justify-between rounded-xl border border-border bg-card p-3.5 text-sm transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md"
              >
                <span>
                  <span className="block font-medium text-foreground">{m.label}</span>
                  <span className="block text-xs text-muted-foreground">{m.desc}</span>
                </span>
                <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:text-primary" />
              </Link>
            </li>
          ))}
        </ul>
      </TabsContent>
    </Tabs>
  );
}
