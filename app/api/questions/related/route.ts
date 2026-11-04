import { NextResponse } from "next/server";
import { findQuestionById } from "@/lib/questions/pool-server";
import { getQuestionsForExam } from "@/lib/questions/get-questions";
import { isPracticeReadyQuestion } from "@/lib/questions/filter";
import { getPracticeRelatedQuestions } from "@/lib/questions/related";
import { z } from "zod";

export const runtime = "nodejs";

const Body = z.object({ id: z.string().min(1).max(120), ids: z.array(z.string().min(1).max(120)).max(5000) });

export async function POST(request: Request) {
  const parsed = Body.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "invalid body" }, { status: 400 });
  const { id, ids } = parsed.data;
  const question = await findQuestionById(id);
  if (!question || !isPracticeReadyQuestion(question)) {
    return NextResponse.json({ error: "not found" }, { status: 404 });
  }
  const eligible = new Set(ids);
  const pool = (await getQuestionsForExam(question.exam)).filter((q) => eligible.has(q.id));
  return NextResponse.json({ questions: getPracticeRelatedQuestions(question, pool) });
}
