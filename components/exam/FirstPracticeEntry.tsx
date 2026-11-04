import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { EXAM_ENTRIES, type ExamEntryCode } from "@/lib/seo/exam-entry";

export const FIRST_PRACTICE_EXAMS = ["sc", "nw", "st", "sa", "ap"] as const;

/** A server-rendered start link: no account, configuration step or client gate. */
export function FirstPracticeEntry({ exam }: { exam: ExamEntryCode }) {
  const advanced = exam !== "ap";
  return (
    <section aria-label="今すぐ解く" className="mt-4 space-y-2">
      <Button asChild variant="gradient" size="lg" className="w-full font-semibold">
        <Link href={`/quiz?mode=random&exam=${exam}${advanced ? "&session=am2" : ""}`}>
          まず10問、解いてみる{advanced ? "（午前II）" : ""}
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </Button>
      <p className="text-xs text-muted-foreground">ログイン不要。選択肢をタップすると、その場で正答と解説が出ます。</p>
      <nav aria-label="学習メニュー" className="grid grid-cols-2 gap-2 text-sm">
        {[["#years", "年度別の過去問"], ["#topics", "分野別の過去問"], ["#afternoon", "午後対策・対応範囲"], ["#study-guide", "学習の進め方"]].map(([href, label]) => (
          <a key={href} href={href} className="inline-flex min-h-11 items-center justify-center rounded-lg border border-border px-2 py-2 text-center font-medium hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">{label}</a>
        ))}
      </nav>
      <p className="text-xs leading-relaxed text-muted-foreground">{EXAM_ENTRIES[exam].aiEssay ? "午後IのAI採点は未対応／午後IIはオリジナル論述教材のAI添削に対応。" : "午後記述のAI採点は未対応。対策ガイドと公式資料を案内します。"}</p>
      {advanced && <Link href={`/quiz?mode=random&exam=${exam}&session=am1`} className="inline-flex min-h-11 items-center text-sm underline underline-offset-4">午前I（共通）を解く →</Link>}
    </section>
  );
}
