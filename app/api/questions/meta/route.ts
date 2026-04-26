import { NextResponse } from "next/server";
import { z } from "zod";
import { findQuestionById } from "@/lib/questions/pool-server";

export const runtime = "nodejs";

const BodySchema = z.object({
  ids: z.array(z.string().min(1).max(120)).min(1).max(2000),
});

export async function POST(req: Request) {
  let parsed;
  try {
    parsed = BodySchema.parse(await req.json());
  } catch {
    return NextResponse.json({ error: "invalid body" }, { status: 400 });
  }

  const meta: Array<{ id: string; exam: string; category: string }> = [];
  for (const id of parsed.ids) {
    const q = await findQuestionById(id);
    if (q) meta.push({ id: q.id, exam: q.exam, category: q.category });
  }

  return NextResponse.json({ meta });
}
