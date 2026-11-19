import { PLAN_OFFER } from "@/lib/billing/plan-offer";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ReferralPracticeLink } from "@/components/analytics/ReferralPracticeLink";
import type { ExamEntryCode } from "@/lib/seo/exam-entry";

export const FIRST_PRACTICE_EXAMS = ["sc", "nw", "st", "sa", "ap"] as const;

/** A server-rendered start link: no account, configuration step or client gate. */
export function FirstPracticeEntry({ exam, referralHref = null, qualification = exam }: { exam: ExamEntryCode; referralHref?: string | null; qualification?: string }) {
  const advanced = exam !== "ap";
  return (
    <section aria-label="今すぐ解く" className="mt-4 space-y-2">
      <Button asChild variant="gradient" size="lg" className="w-full font-semibold">
        <ReferralPracticeLink referralHref={referralHref} qualification={qualification} href={`/quiz?mode=random&exam=${exam}${advanced ? "&session=am2" : ""}`}>
          まず{PLAN_OFFER.freeDaily}問、解いてみる{advanced ? "（科目A-2・旧午前II）" : "（科目A・旧午前）"}
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </ReferralPracticeLink>
      </Button>
      {advanced && <Link prefetch={false} href={`/quiz?mode=random&exam=${exam}&session=am1`} className="inline-flex min-h-11 items-center text-sm underline underline-offset-4">科目A-1（旧午前I・共通）を解く →</Link>}
    </section>
  );
}
