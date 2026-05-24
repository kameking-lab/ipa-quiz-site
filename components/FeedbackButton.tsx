"use client";

import * as React from "react";
import { usePathname } from "next/navigation";
import { Flag } from "lucide-react";
import { FeedbackModal } from "@/components/FeedbackModal";

function extractQuestionId(pathname: string): string | undefined {
  // /q/[exam]/[yearSeason]/[section]/[qnum]
  const m = pathname.match(/^\/q\/[^/]+\/[^/]+\/[^/]+\/(q\d+)/);
  if (m) {
    const parts = pathname.split("/");
    // id is built from exam + yearSeason + section + qnum: ap-2024-spring-am-q1
    const [, , exam, yearSeason, section, qnum] = parts;
    return `${exam}-${yearSeason}-${section}-${qnum}`;
  }
  return undefined;
}

// Limit the floating 'report' button to individual question pages so the
// affordance only appears where the report form's context (questionId,
// extracted below) makes sense. /essays/ and /blog/ were previously
// included but produced context-mismatched reports per the post-overhaul
// review (D-10).
const VISIBLE_PREFIXES = ["/q/"];

export function FeedbackButton() {
  const pathname = usePathname();
  const [open, setOpen] = React.useState(false);

  const visible = VISIBLE_PREFIXES.some((p) => pathname.startsWith(p));
  if (!visible) return null;

  const questionId = extractQuestionId(pathname);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="誤りを報告"
        className="fixed bottom-20 right-4 z-40 flex items-center gap-1.5 rounded-full border border-zinc-200 bg-white px-3 py-2 text-xs font-medium text-zinc-600 shadow-md transition hover:bg-rose-50 hover:text-rose-600 hover:border-rose-200 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:bg-rose-950/40 dark:hover:text-rose-400 dark:hover:border-rose-800 sm:bottom-8 sm:right-6 print:hidden"
      >
        <Flag className="h-3.5 w-3.5" />
        <span>報告</span>
      </button>

      <FeedbackModal
        open={open}
        onClose={() => setOpen(false)}
        questionId={questionId}
      />
    </>
  );
}
