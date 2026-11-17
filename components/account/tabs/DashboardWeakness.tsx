import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { WeaknessHeatmapClient } from "@/app/account/weakness/WeaknessHeatmapClient";
import { MockExamInsight } from "../MockExamInsight";
import { getMockExamHistory } from "@/lib/mock-exam/storage";
import { readLastQuestion } from "@/lib/storage/last-question";
import { EXAM_LABELS, examLabel } from "@/lib/utils";

interface Props {
  categoryById: Record<string, string>;
}

export function DashboardWeakness({ categoryById }: Props) {
  const [exam, setExam] = React.useState<string | null>(null);
  React.useEffect(() => {
    const mock = getMockExamHistory().at(-1);
    const last = readLastQuestion();
    const current = last && (!mock || last.answeredAt > mock.finishedAt) ? last.exam : mock?.exam;
    setExam(current && Object.hasOwn(EXAM_LABELS, current) ? current : null);
  }, []);
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
            <Link href={exam ? `/quiz?mode=weakness&exam=${encodeURIComponent(exam)}` : "/#choose-qualification"}>{exam ? `${examLabel(exam)}の弱点問題を解く` : "資格を選んで学習する"}</Link>
          </Button>
        </CardContent>
      </Card>

      <WeaknessHeatmapClient categoryById={categoryById} />
    </div>
  );
}
