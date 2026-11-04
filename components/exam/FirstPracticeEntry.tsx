import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export const FIRST_PRACTICE_EXAMS = ["sc", "nw", "st", "sa", "ap"] as const;

/** A server-rendered start link: no account, configuration step or client gate. */
export function FirstPracticeEntry({ exam }: { exam: string }) {
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
      <nav aria-label="出題範囲を選ぶ" className="flex flex-wrap gap-x-4 text-sm">
        {advanced && <Link href={`/quiz?mode=random&exam=${exam}&session=am1`} className="inline-flex min-h-11 items-center underline underline-offset-4">午前I（共通）を解く</Link>}
        <a href="#years" className="inline-flex min-h-11 items-center underline underline-offset-4">年度・分野から選ぶ</a>
      </nav>
    </section>
  );
}
