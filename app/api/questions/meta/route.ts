import { NextResponse } from "next/server";
import { z } from "zod";
import { findQuestionById } from "@/lib/questions/pool-server";
import { questionHeading } from "@/lib/seo/question-meta";

export const runtime = "nodejs";

const BodySchema = z.object({
  ids: z.array(z.string().min(1).max(120)).min(1).max(2000),
  includeTopics: z.boolean().optional(),
});

export async function POST(req: Request) {
  let parsed;
  try {
    parsed = BodySchema.parse(await req.json());
  } catch {
    return NextResponse.json({ error: "invalid body" }, { status: 400 });
  }

  const meta: Array<{ id: string; exam: string; category: string; label: string; topicTags?: string[] }> = [];
  for (const id of parsed.ids) {
    const q = await findQuestionById(id);
    if (q) meta.push({ id: q.id, exam: q.exam, category: q.category, label: questionHeading(q),
      ...(parsed.includeTopics ? { topicTags: q.topicTags } : {}) });
  }

  return NextResponse.json({ meta });
}
