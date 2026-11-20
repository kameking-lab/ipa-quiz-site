import { z } from "zod";
import { ALL_QUIZ_EXAM_CODES } from "@/lib/exam-config";
import { billingRuntime, optionalBillingIdentity } from "@/lib/billing/runtime";
import { monthlySelected } from "@/lib/billing/subscription/config";
import { weaknessPracticeLimit, weaknessTopicNames, type WeaknessPracticeQuestion } from "@/lib/me/weakness";
import { getQuestionsForExam } from "@/lib/questions/get-questions";
import { isPracticeReadyQuestion } from "@/lib/questions/filter";
import { revenueCatAccess } from "@/mobile/server/revenuecat";

export const runtime = "nodejs";

const body = z.object({ exam: z.enum(ALL_QUIZ_EXAM_CODES), topics: z.array(z.string().min(1).max(100)).min(1).max(3),
  answered: z.array(z.string().min(1).max(120)).max(3000), limit: z.number().int().min(1).max(weaknessPracticeLimit) }).strict();

async function hasWeaknessPracticeAccess() {
  const userId = await optionalBillingIdentity();
  if (!userId) return false;
  const service = monthlySelected()
    ? (await import("@/lib/billing/subscription/runtime")).monthlyRuntime().service
    : billingRuntime().service;
  return (await service.status(userId)).entitled || !!await revenueCatAccess(userId);
}

export async function POST(request: Request) {
  if (request.headers.get("origin") !== new URL(request.url).origin) return new Response(null, { status: 403 });
  const input = body.safeParse(await request.json().catch(() => null));
  if (!input.success) return new Response(null, { status: 400 });
  try {
    if (!await hasWeaknessPracticeAccess()) return new Response(null, { status: 403 });
    const { exam, topics, answered, limit } = input.data;
    const used = new Set(answered);
    const matching = new Map(topics.map(topic => [topic, [] as WeaknessPracticeQuestion[]]));
    for (const q of await getQuestionsForExam(exam)) {
      if (used.has(q.id) || !isPracticeReadyQuestion(q)) continue;
      const names = weaknessTopicNames(q);
      const topic = topics.find(name => names.has(name));
      const group = topic && matching.get(topic);
      if (!topic || !group || group.length >= limit) continue;
      used.add(q.id);
      group.push({ id: q.id, topic });
    }
    const questions: WeaknessPracticeQuestion[] = [];
    for (let i = 0; i < limit && questions.length < limit; i++) {
      for (const group of matching.values()) {
        if (group[i]) questions.push(group[i]);
        if (questions.length === limit) break;
      }
    }
    return Response.json({ questions }, { headers: { "Cache-Control": "private, no-store" } });
  } catch { return new Response(null, { status: 503 }); }
}
