import * as React from "react";
import Link from "next/link";
import { Sparkles } from "lucide-react";
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
          <Button asChild variant="primary" size="lg" className="h-auto min-h-12 w-full whitespace-normal px-3 py-3 text-center sm:w-auto">
            <Link href={exam ? `/quiz?mode=weakness&exam=${encodeURIComponent(exam)}` : "/#choose-qualification"}>{exam ? `${examLabel(exam)}の弱点問題を解く` : "資格を選んで学習する"}</Link>
          </Button>
        </CardContent>
      </Card>

      <WeaknessHeatmapClient categoryById={categoryById} />
    </div>
  );
}
