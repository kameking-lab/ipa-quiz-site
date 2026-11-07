import { permittedBatch } from "@/lib/billing/content-grant";
import { NextResponse } from "next/server";

import { ALL_QUESTIONS } from "@/data/questions";
import { filterQuestions, shuffleChoices } from "@/lib/questions/filter";
import { getMockConfig, isMockExamCode } from "@/lib/mock-exam/config";
import {
  selectMockExamQuestions,
  type SelectionMode,
} from "@/lib/mock-exam/selection";
import type { Question } from "@/lib/questions/types";
import type { SlimMockQuestion } from "@/lib/mock-exam/types";

export const runtime = "nodejs";

const VALID_MODES: ReadonlySet<SelectionMode> = new Set(["random", "balanced"]);

function toSlim(q: Question): SlimMockQuestion {
  return {
    id: q.id,
    question: q.question,
    choices: q.choices ?? {},
    answer: q.answer,
    category: q.category,
    petContext: { qualificationId: q.exam, eligible: q.type === "multiple-choice" && (q.requiredSelections ?? 1) === 1 && !q.acceptedAnswerCombinations,
      contentVersion: q.publicationVersion ?? q.lastUpdated ?? "local-question-v1" },
  };
}

export async function GET(
  req: Request,
  ctx: { params: Promise<{ exam: string }> },
) {
  const { exam: examParam } = await ctx.params;
  if (!isMockExamCode(examParam)) {
    return NextResponse.json({ error: "invalid_exam" }, { status: 400 });
  }
  const exam = examParam;
  const config = getMockConfig(exam);

  const url = new URL(req.url);
  const countParam = url.searchParams.get("count");
  const count = countParam === "10" || countParam === "20" || countParam === String(Math.ceil(config.questions / 2))
    ? Math.min(config.questions, Number(countParam)) : config.questions;
  const modeParam = url.searchParams.get("mode");
  const mode: SelectionMode =
    modeParam && VALID_MODES.has(modeParam as SelectionMode)
      ? (modeParam as SelectionMode)
      : "balanced";

  const pool = filterQuestions(ALL_QUESTIONS, { mode: "random", exam, session: config.session });
  if (pool.length === 0) {
    return NextResponse.json(
      { error: "no_questions", message: "問題が不足しています。" },
      { status: 404 },
    );
  }

  const picked = selectMockExamQuestions({
    pool,
    target: count,
    mode,
  });
  const permitted=await permittedBatch(req,picked);
  if(permitted.response)return permitted.response;
  const selected = permitted.rows.map(shuffleChoices).map(toSlim);

  return NextResponse.json(
    { exam, mode, total: selected.length, questions: selected },
    {
      headers: {
        // Per-request randomization — cache is fine for repeat-tab reloads
        // but should not be shared across users for too long.
        "Cache-Control": "private, no-store",
      },
    },
  );
}
