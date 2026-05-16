import { NextResponse } from "next/server";

import { ALL_QUESTIONS } from "@/data/questions";
import { filterQuestions, shuffleChoices } from "@/lib/questions/filter";
import { getMockConfig } from "@/lib/mock-exam/config";
import {
  selectMockExamQuestions,
  type SelectionMode,
} from "@/lib/mock-exam/selection";
import type { ExamCode, Question } from "@/lib/questions/types";
import type { SlimMockQuestion } from "@/lib/mock-exam/types";

export const runtime = "nodejs";

const VALID_EXAMS: ReadonlySet<ExamCode> = new Set([
  "ip", "sg", "fe", "ap", "st", "sa", "pm", "nw", "db", "es", "sc", "sm", "au",
]);

const VALID_MODES: ReadonlySet<SelectionMode> = new Set(["random", "balanced"]);

function toSlim(q: Question): SlimMockQuestion {
  return {
    id: q.id,
    question: q.question,
    choices: q.choices ?? {},
    answer: q.answer,
    category: q.category,
  };
}

export async function GET(
  req: Request,
  ctx: { params: Promise<{ exam: string }> },
) {
  const { exam: examParam } = await ctx.params;
  if (!VALID_EXAMS.has(examParam as ExamCode)) {
    return NextResponse.json({ error: "invalid_exam" }, { status: 400 });
  }
  const exam = examParam as ExamCode;
  const config = getMockConfig(exam);

  const url = new URL(req.url);
  const modeParam = url.searchParams.get("mode");
  const mode: SelectionMode =
    modeParam && VALID_MODES.has(modeParam as SelectionMode)
      ? (modeParam as SelectionMode)
      : "balanced";

  const pool = filterQuestions(ALL_QUESTIONS, { mode: "random", exam });
  if (pool.length === 0) {
    return NextResponse.json(
      { error: "no_questions", message: "問題が不足しています。" },
      { status: 404 },
    );
  }

  const picked = selectMockExamQuestions({
    pool,
    target: config.questions,
    mode,
  });
  const selected = picked.map(shuffleChoices).map(toSlim);

  return NextResponse.json(
    { exam, mode, total: selected.length, questions: selected },
    {
      headers: {
        // Per-request randomization — cache is fine for repeat-tab reloads
        // but should not be shared across users for too long.
        "Cache-Control": "private, max-age=0, must-revalidate",
      },
    },
  );
}
