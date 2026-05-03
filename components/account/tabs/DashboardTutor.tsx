"use client";

import * as React from "react";
import Link from "next/link";
import { Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { TutorClient } from "@/app/account/tutor/TutorClient";

interface Props {
  categoryById: Record<string, string>;
}

export function DashboardTutor({ categoryById }: Props) {
  return (
    <div className="space-y-6">
      <Card className="border-sky-200 bg-sky-50/40 dark:border-sky-900/60 dark:bg-sky-950/20">
        <CardContent className="flex flex-col items-start gap-3 p-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="mb-1 inline-flex items-center gap-1 rounded-full bg-sky-100 px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wider text-sky-800 dark:bg-sky-900/60 dark:text-sky-100">
              <Target className="h-3 w-3" /> 学習目標
            </p>
            <h3 className="text-base font-bold text-sky-900 dark:text-sky-100">
              学習プランで合格までの道筋を作る
            </h3>
            <p className="mt-1 text-xs text-sky-800/80 dark:text-sky-200/80">
              試験日と現在の到達度から、週次の演習量を逆算して提案します。
            </p>
          </div>
          <Button asChild variant="primary" size="lg">
            <Link href="/account/study-plan">学習プランを開く</Link>
          </Button>
        </CardContent>
      </Card>

      <TutorClient categoryById={categoryById} />
    </div>
  );
}
