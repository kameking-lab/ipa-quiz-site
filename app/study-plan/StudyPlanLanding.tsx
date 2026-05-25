"use client";

import * as React from "react";
import Link from "next/link";
import { CalendarDays, Sparkles, Trash2 } from "lucide-react";
import { SchedulePlanner } from "@/components/SchedulePlanner";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { examLabel } from "@/lib/utils";
import { deletePlan, listPlans } from "@/lib/study-plan/storage";
import { LEVEL_LABELS } from "@/lib/study-plan/constants";
import type { StudyPlan } from "@/lib/study-plan/types";

export function StudyPlanLanding() {
  const [plans, setPlans] = React.useState<StudyPlan[]>([]);
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
    setPlans(listPlans());
  }, []);

  const handleDelete = (id: string) => {
    if (!confirm("このプランを削除しますか？進捗データも消えます。")) return;
    deletePlan(id);
    setPlans(listPlans());
  };

  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-6 sm:py-10">
      <Breadcrumbs
        items={[
          { name: "ホーム", href: "/" },
          { name: "学習プラン", href: "/study-plan" },
        ]}
      />
      <header className="mb-8">
        <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-primary-soft px-3 py-1 text-xs font-medium text-primary-soft-foreground">
          <Sparkles className="h-3.5 w-3.5" aria-hidden />
          NEW
        </div>
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
          自動学習スケジュール作成
        </h1>
        <p className="mt-2 text-sm text-muted-foreground sm:text-base">
          試験日まで残り何日？1日に何分とれる？それだけ答えれば、
          IPA 全 13 区分に対応した「序盤→中盤→終盤」の個別最適スケジュールを自動生成します。
          進捗はブラウザに保存され、複数試験の並行受験にも対応します。
        </p>
      </header>

      {mounted && plans.length > 0 && (
        <section className="mb-10" aria-labelledby="existing-plans">
          <h2
            id="existing-plans"
            className="mb-3 text-sm font-semibold text-muted-foreground"
          >
            進行中のプラン
          </h2>
          <ul className="space-y-2">
            {plans.map((p) => (
              <li key={p.id}>
                <Card>
                  <CardContent className="flex items-center justify-between gap-3 p-3">
                    <Link
                      href={`/study-plan/result/${p.id}`}
                      className="flex flex-1 items-center gap-3 rounded-lg p-2 -m-2 hover:bg-muted"
                    >
                      <CalendarDays className="h-5 w-5 text-muted-foreground" aria-hidden />
                      <div className="min-w-0 flex-1">
                        <div className="font-medium truncate">
                          {examLabel(p.input.exam)}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          試験日 {p.input.examDate} ・{" "}
                          {LEVEL_LABELS[p.input.level]} ・残り{" "}
                          {p.summary.daysRemaining} 日
                        </div>
                      </div>
                    </Link>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon-sm"
                      aria-label="削除"
                      onClick={() => handleDelete(p.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section aria-labelledby="new-plan">
        <h2 id="new-plan" className="mb-4 text-lg font-semibold">
          新しいプランを作成
        </h2>
        <SchedulePlanner />
      </section>

      <p className="mt-8 text-xs text-muted-foreground">
        生成したスケジュールはお使いの端末のブラウザにのみ保存されます。
        端末を変更すると引き継がれません。
      </p>
    </main>
  );
}
