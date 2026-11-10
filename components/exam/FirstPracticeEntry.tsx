import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { ExamEntryCode } from "@/lib/seo/exam-entry";

export const FIRST_PRACTICE_EXAMS = ["sc", "nw", "st", "sa", "ap"] as const;

/** A server-rendered start link: no account, configuration step or client gate. */
export function FirstPracticeEntry({ exam }: { exam: ExamEntryCode }) {
  const advanced = exam !== "ap";
  return (
    <section aria-label="今すぐ解く" className="mt-4 space-y-2">
      <Button asChild variant="gradient" size="lg" className="w-full font-semibold">
        <Link href={`/quiz?mode=random&exam=${exam}${advanced ? "&session=am2" : ""}`}>
          まず10問、解いてみる{advanced ? "（科目A-2・旧午前II）" : "（科目A・旧午前）"}
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </Button>
      <nav aria-label="学習メニュー" className="grid grid-cols-3 gap-2 text-sm">
        {[["#years", "年度別"], ["#topics", "分野別"], ["#afternoon", exam === "ap" || exam === "sc" ? "科目B対策" : "科目B-1・B-2対策"]].map(([href, label]) => (
          <a key={href} href={href} className="inline-flex min-h-11 items-center justify-center rounded-lg border border-border px-2 py-2 text-center font-medium hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">{label}</a>
        ))}
      </nav>
      {advanced && <Link href={`/quiz?mode=random&exam=${exam}&session=am1`} className="inline-flex min-h-11 items-center text-sm underline underline-offset-4">科目A-1（旧午前I・共通）を解く →</Link>}
    </section>
  );
}
