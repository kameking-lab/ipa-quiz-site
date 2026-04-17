/**
 * data/questions/ 配下の問題データを zod で検証。
 * 使い方: pnpm tsx scripts/validate-questions.ts
 */
import { ALL_QUESTIONS } from "@/data/questions";
import { z } from "zod";

const QuestionSchema = z.object({
  id: z.string().min(1),
  exam: z.enum(["ip", "sg", "fe", "ap", "st", "sa", "pm", "nw", "db", "es", "sc", "sm", "au"]),
  session: z.enum(["am", "am1", "am2", "pm", "pm1", "pm2", "kamoku-a", "kamoku-b"]),
  year: z.number().int().min(2000).max(2100),
  season: z.enum(["spring", "autumn", "cbt"]),
  qNumber: z.number().int().min(1),
  type: z.enum(["multiple-choice", "descriptive", "essay"]),
  category: z.string().min(1),
  topicTags: z.array(z.string()),
  difficulty: z.union([z.literal(1), z.literal(2), z.literal(3), z.literal(4), z.literal(5)]),
  question: z.string().min(1),
  choices: z
    .object({
      ア: z.string().min(1),
      イ: z.string().min(1),
      ウ: z.string().min(1),
      エ: z.string().min(1),
    })
    .optional(),
  answer: z.union([z.string().min(1), z.array(z.string().min(1))]),
  explanation: z.string().min(1),
  modelAnswer: z.string().optional(),
  scoringCriteria: z.string().optional(),
  hasImage: z.boolean(),
  imageUrls: z.array(z.string()).optional(),
  sourcePdfUrl: z.string().url(),
  license: z.literal("IPA-public"),
  isCalculation: z.boolean().optional(),
});

function validate(): { ok: number; fail: number } {
  let ok = 0;
  let fail = 0;
  const seenIds = new Set<string>();
  for (const q of ALL_QUESTIONS) {
    const r = QuestionSchema.safeParse(q);
    if (!r.success) {
      fail++;
      console.error(`[FAIL] ${q.id ?? "(no id)"}: ${r.error.issues.map((i) => i.message).join(", ")}`);
      continue;
    }
    if (seenIds.has(q.id)) {
      fail++;
      console.error(`[FAIL] duplicate id: ${q.id}`);
      continue;
    }
    seenIds.add(q.id);

    if (q.type === "multiple-choice") {
      if (!q.choices) {
        fail++;
        console.error(`[FAIL] ${q.id}: multiple-choice requires choices`);
        continue;
      }
      const ans = Array.isArray(q.answer) ? q.answer[0] : q.answer;
      if (!["ア", "イ", "ウ", "エ"].includes(ans)) {
        fail++;
        console.error(`[FAIL] ${q.id}: answer must be ア/イ/ウ/エ, got "${ans}"`);
        continue;
      }
    }
    ok++;
  }
  return { ok, fail };
}

const { ok, fail } = validate();
console.log(`\nValidated ${ok + fail} questions. ok=${ok} fail=${fail}`);
if (fail > 0) process.exit(1);
