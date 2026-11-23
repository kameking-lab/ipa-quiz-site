"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { readLastQuestion } from "@/lib/storage/last-question";
import { examLabel } from "@/lib/utils";
import { EXAM_CONFIGS } from "@/lib/exam-config";
import { isExamPublished } from "@/lib/qualifications/catalog";
import type { ExamCode } from "@/lib/questions/types";

/** A small return action for a break; the qualification comes from this device's last answer. */
export function StudyReturnLink() {
  const [exam, setExam] = useState<ExamCode | null>(null);
  useEffect(() => {
    const last = readLastQuestion();
    if (last && EXAM_CONFIGS[last.exam] && isExamPublished(last.exam)) setExam(last.exam);
  }, []);
  return <Link href={exam ? `/quiz?mode=random&exam=${exam}` : "/#choose-qualification"} className={buttonVariants({ variant: "outline", className: "study-return-link mt-3 min-h-11 rounded-xl px-3 py-2 font-semibold" })}>{exam ? `${examLabel(exam)}をもう1問` : "資格を選んで1問始める"}<ArrowRight aria-hidden="true" className="h-4 w-4 shrink-0" /></Link>;
}
