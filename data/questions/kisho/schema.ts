import { z } from "zod";

const keys = z.enum(["ア", "イ", "ウ", "エ", "オ"]);
export const KishoCandidateSchema = z.object({
  id: z.string().regex(/^kisho-(65|66)-(ippan|senmon|pm1|pm2)-q\d{2}$/),
  exam: z.literal("kisho"), session: z.enum(["ippan", "senmon", "pm1", "pm2"]),
  year: z.literal(2026), fiscalYear: z.union([z.literal(2025), z.literal(2026)]),
  season: z.enum(["first", "second"]), examDate: z.enum(["2026-01-25", "2026-08-23"]),
  qNumber: z.number().int().positive(), type: z.enum(["multiple-choice", "descriptive"]),
  category: z.string().min(1), topicTags: z.array(z.string()),
  difficulty: z.union([z.literal(1), z.literal(2), z.literal(3), z.literal(4), z.literal(5)]),
  question: z.string().min(1), answer: z.string().min(1), explanation: z.string().min(1),
  choices: z.record(keys, z.string().min(1)).optional(),
  choiceExplanations: z.record(keys, z.string().min(1)).optional(),
  officialAnswerNumber: z.string().regex(/^[1-5]$/).optional(),
  explanationCoverage: z.literal("full").optional(), hasImage: z.boolean(), needsReview: z.literal(false),
  sourcePdfUrl: z.url().startsWith("https://www.jmbsc.or.jp/"),
  sourceAnswerUrl: z.url().startsWith("https://www.jmbsc.or.jp/"),
  sourceAttribution: z.string().min(1), license: z.literal("JMBSC-permission-required"),
}).passthrough().superRefine((q, ctx) => {
  if (q.type !== "multiple-choice") return;
  if (q.explanationCoverage !== "full" || !q.choices || !q.choiceExplanations || !q.officialAnswerNumber
    || Object.keys(q.choices).length !== 5 || Object.keys(q.choiceExplanations).length !== 5
    || ["ア", "イ", "ウ", "エ", "オ"][Number(q.officialAnswerNumber) - 1] !== q.answer) {
    ctx.addIssue({ code: "custom", message: "five choices, individual explanations and official answer must agree" });
  }
});
