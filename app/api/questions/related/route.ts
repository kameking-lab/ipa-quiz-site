import { NextResponse } from "next/server";
import { findQuestionById } from "@/lib/questions/pool-server";
import { getQuestionsForExam } from "@/lib/questions/get-questions";
import { isPracticeReadyQuestion } from "@/lib/questions/filter";
import { getPracticeRelatedQuestions } from "@/lib/questions/related";

export const runtime = "nodejs";

export async function GET(request: Request) {
  const params = new URL(request.url).searchParams;
  const id = params.get("id");
  if (!id || id.length > 120) return NextResponse.json({ error: "invalid id" }, { status: 400 });
  const question = await findQuestionById(id);
  if (!question || !isPracticeReadyQuestion(question)) {
    return NextResponse.json({ error: "not found" }, { status: 404 });
  }
  let pool = await getQuestionsForExam(question.exam);
  if (params.get("year")) pool = pool.filter((q) => String(q.year) === params.get("year") && q.season === question.season);
  return NextResponse.json({ questions: getPracticeRelatedQuestions(question, pool) });
}
