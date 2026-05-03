"use client";

import * as React from "react";
import Link from "next/link";
import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { WeaknessHeatmapClient } from "@/app/account/weakness/WeaknessHeatmapClient";

interface Props {
  categoryById: Record<string, string>;
}

export function DashboardWeakness({ categoryById }: Props) {
  return (
    <div className="space-y-6">
      <Card className="border-rose-200 bg-rose-50/40 dark:border-rose-900/60 dark:bg-rose-950/20">
        <CardContent className="flex flex-col items-start gap-3 p-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="mb-1 inline-flex items-center gap-1 rounded-full bg-rose-100 px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wider text-rose-800 dark:bg-rose-900/60 dark:text-rose-100">
              <Sparkles className="h-3 w-3" /> 推奨アクション
            </p>
            <h3 className="text-base font-bold text-rose-900 dark:text-rose-100">
              弱点克服モード
            </h3>
            <p className="mt-1 text-xs text-rose-800/80 dark:text-rose-200/80">
              正答率の低い分野を優先的に出題し、合格ライン到達までの最短ルートを提示します。
            </p>
          </div>
          <Button asChild variant="primary" size="lg">
            <Link href="/quiz?mode=weakness">弱点克服モードを開始</Link>
          </Button>
        </CardContent>
      </Card>

      <WeaknessHeatmapClient categoryById={categoryById} />
    </div>
  );
}
