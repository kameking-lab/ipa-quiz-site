import { NextResponse } from "next/server";

import { ALL_QUESTIONS } from "@/data/questions";
import { filterQuestions, shuffleChoices } from "@/lib/questions/filter";
import { getMockConfig } from "@/lib/mock-exam/config";
import type { ExamCode } from "@/lib/questions/types";
import type { SlimMockQuestion } from "@/lib/mock-exam/types";

export const runtime = "nodejs";

const VALID_EXAMS: ReadonlySet<ExamCode> = new Set([
  "ip", "sg", "fe", "ap", "st", "sa", "pm", "nw", "db", "es", "sc", "sm", "au",
]);

function toSlim(q: ReturnType<typeof shuffleChoices>): SlimMockQuestion {
  return {
    id: q.id,
    question: q.question,
    choices: q.choices ?? {},
    answer: q.answer,
    category: q.category,
  };
}

export async function GET(
  _req: Request,
  ctx: { params: Promise<{ exam: string }> },
) {
  const { exam: examParam } = await ctx.params;
  if (!VALID_EXAMS.has(examParam as ExamCode)) {
    return NextResponse.json(
      { error: "invalid_exam" },
      { status: 400 },
    );
  }
  const exam = examParam as ExamCode;
  const config = getMockConfig(exam);

  const pool = filterQuestions(ALL_QUESTIONS, { mode: "random", exam });
  if (pool.length === 0) {
    return NextResponse.json(
      { error: "no_questions", message: "問題が不足しています。" },
      { status: 404 },
    );
  }

  const target = Math.min(config.questions, pool.length);
  const selected = pool.slice(0, target).map(shuffleChoices).map(toSlim);

  return NextResponse.json(
    { exam, total: selected.length, questions: selected },
    {
      headers: {
        "Cache-Control": "public, s-maxage=3600, max-age=300",
      },
    },
  );
}
