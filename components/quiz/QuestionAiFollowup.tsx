"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import type { Question } from "@/lib/questions/types";

const CopilotInline = dynamic(
  () => import("@/components/copilot/CopilotPanel").then((module) => module.CopilotInline),
  { ssr: false },
);

export function QuestionAiFollowup({ question, selectedChoice, isCorrect }: {
  question: Question;
  selectedChoice?: string;
  isCorrect?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [opening, setOpening] = useState(0);
  const wrongAnswerPrompt = isCorrect === false
    ? "私が選んだ答えがなぜ違うのか、正解との違いをこの問題に沿って説明してください。"
    : undefined;

  return (
    <details className="mt-4" onToggle={(event) => {
      setOpen(event.currentTarget.open);
      if (event.currentTarget.open) setOpening((value) => value + 1);
    }}>
      <summary className="min-h-11 cursor-pointer py-3 text-sm font-medium">AIに質問</summary>
      {opening > 0 && <CopilotInline question={question} selectedChoice={selectedChoice} isCorrect={isCorrect} active={open}
        focusRequest={{ sequence: open ? opening : 0, prompt: wrongAnswerPrompt }} />}
    </details>
  );
}
