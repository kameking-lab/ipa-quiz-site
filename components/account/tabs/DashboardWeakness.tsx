import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { WeaknessHeatmapClient } from "@/app/account/weakness/WeaknessHeatmapClient";
import { MockExamInsight } from "../MockExamInsight";

interface Props {
  categoryById: Record<string, string>;
}

export function DashboardWeakness({ categoryById }: Props) {
  return (
    <div className="space-y-6">
      <MockExamInsight />
      <Card className="border-rose-200 bg-rose-50/40 dark:border-rose-900/60 dark:bg-rose-950/20">
        <CardContent className="flex flex-col items-start gap-3 p-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="text-base font-bold text-rose-900 dark:text-rose-100">
              弱点克服モード
            </h3>
          </div>
          <Button asChild variant="primary" size="lg" className="h-auto min-h-12 w-full whitespace-normal px-3 py-3 text-center sm:w-auto">
            <Link href="/me#study-progress">わたしの記録で復習する</Link>
          </Button>
        </CardContent>
      </Card>

      <WeaknessHeatmapClient categoryById={categoryById} />
    </div>
  );
}
