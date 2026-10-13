"use client";

import * as React from "react";
import dynamic from "next/dynamic";
import { Sparkles } from "lucide-react";
import type { Question } from "@/lib/questions/types";
import { useQuestionAnswerContext } from "./QuestionRevealProvider";

const CopilotDesktopFloating = dynamic(
  () => import("@/components/copilot/CopilotPanel").then((module) => module.CopilotDesktopFloating),
  { ssr: false },
);
const CopilotMobileSheet = dynamic(
  () => import("@/components/copilot/CopilotPanel").then((module) => module.CopilotMobileSheet),
  { ssr: false },
);

/** One optional follow-up, placed after the complete existing explanation and sources. */
export function QuestionCopilotFollowup({ question }: { question: Question }) {
  const { answerContext } = useQuestionAnswerContext();
  const [request, setRequest] = React.useState<{ surface: "desktop" | "mobile"; count: number } | null>(null);
  const counter = React.useRef(0);
  const entryRef = React.useRef<HTMLButtonElement | null>(null);
  const dismiss = React.useCallback(() => {
    setRequest(null);
    entryRef.current?.focus({ preventScroll: true });
  }, []);
  const open = () => {
    const desktop = typeof window.matchMedia === "function"
      ? window.matchMedia("(min-width: 640px)").matches : window.innerWidth >= 640;
    const surface = desktop ? "desktop" : "mobile";
    counter.current += 1;
    setRequest({ surface, count: counter.current });
  };
  const props = {
    question,
    selectedChoice: answerContext.selectedChoice,
    isCorrect: answerContext.isCorrect,
    initialPrompt: request?.count === 1 && answerContext.isCorrect === false
      ? "私が選んだ答えがなぜ違うのか、正解との違いをこの問題に沿って説明してください。"
      : undefined,
    defaultOpen: true,
    onDismiss: dismiss,
  };
  return <div className="mt-4 print:hidden">
    <button ref={entryRef} type="button" onClick={open} className="inline-flex min-h-11 items-center gap-1.5 rounded-full border border-border bg-card px-4 py-2 text-sm font-semibold text-muted-foreground transition hover:bg-muted">
      <Sparkles className="h-4 w-4" aria-hidden="true" />
      まだ分からない点を聞く
    </button>
    {request?.surface === "desktop" && <CopilotDesktopFloating key={request.count} {...props} />}
    {request?.surface === "mobile" && <CopilotMobileSheet key={request.count} {...props} />}
  </div>;
}
