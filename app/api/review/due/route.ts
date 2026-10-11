import { NextResponse } from "next/server";
import { z } from "zod";
import { findQuestionById } from "@/lib/questions/pool-server";
import type { Question } from "@/lib/questions/types";
import { isPracticeReadyQuestion } from "@/lib/questions/filter";
import { EXAM_LABELS } from "@/lib/utils";

export const runtime = "nodejs";

const ReviewRecordSchema = z.object({
  nextReviewAt: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
});

const BodySchema = z.object({
  exam: z.string().refine((value) => Object.hasOwn(EXAM_LABELS, value)).optional(),
  historyIds: z.array(z.string().min(1).max(120)).max(5000),
  reviewStore: z.record(z.string(), ReviewRecordSchema),
  today: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
});

function shuffle<T>(arr: T[]): T[] {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j]!, arr[i]!];
  }
  return arr;
}

export async function POST(req: Request) {
  let parsed;
  try {
    parsed = BodySchema.parse(await req.json());
  } catch {
    return NextResponse.json({ error: "invalid body" }, { status: 400 });
  }

  const { today, exam } = parsed;
  let { historyIds, reviewStore } = parsed;
  if (exam) {
    // Resolve actual question metadata: qualification codes and IDs can contain hyphens.
    const scopedIds = new Set<string>();
    for (const id of new Set([...historyIds, ...Object.keys(reviewStore)])) {
      const question = await findQuestionById(id);
      if (question?.exam === exam) scopedIds.add(id);
    }
    historyIds = historyIds.filter((id) => scopedIds.has(id));
    reviewStore = Object.fromEntries(Object.entries(reviewStore).filter(([id]) => scopedIds.has(id)));
  }

  const dueQuestions: Question[] = [];
  const futureDates: string[] = [];

  for (const [, record] of Object.entries(reviewStore)) {
    if (record.nextReviewAt > today) futureDates.push(record.nextReviewAt);
  }
  futureDates.sort();

  for (const id of historyIds) {
    const record = reviewStore[id];
    if (record && record.nextReviewAt > today) continue;

    const q = await findQuestionById(id);
    if (!q) continue;
    if ((q.type !== "multiple-choice" && q.type !== "numeric" && q.type !== "ordering") || !isPracticeReadyQuestion(q)) continue;

    dueQuestions.push(q);
  }

  return NextResponse.json({
    questions: shuffle(dueQuestions),
    seenCount: historyIds.length,
    scheduledCount: Object.keys(reviewStore).length,
    nextReviewDate: futureDates[0] ?? null,
  });
}
