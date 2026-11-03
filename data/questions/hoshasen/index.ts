import { z } from "zod";
import multi from "./multi-part.json";
import first2026 from "./2026-1.json";
import firstChemistry2026 from "./2026-1-kagaku.json";
import firstBiology2026 from "./2026-1-seibutsu.json";
import firstBiology2025 from "./2025-1-seibutsu.json";
import firstChemistry2025 from "./2025-1-kagaku.json";
import secondLaw2026 from "./2026-2-hourei.json";
import firstLaw2025 from "./2025-1-hourei.json";
import firstLaw2026 from "./2026-1-hourei.json";
import secondLaw2025 from "./2025-2-hourei.json";
import second2026 from "./2026-2.json";
import first2025 from "./2025-1.json";
import second2025 from "./2025-2.json";
import chemistry2026 from "./2026-2-kagaku.json";
import chemistry2025 from "./2025-2-kagaku.json";
import biology2026 from "./2026-2-seibutsu.json";
import biology2025 from "./2025-2-seibutsu.json";
import practical2026 from "./2026-2-jitsumu.json";
import practical2025 from "./2025-2-jitsumu.json";

/** Native source staging. Deliberately absent from public registries and loaders. */
const CommonSchema = z.object({
  id: z.string().regex(/^hoshasen-[12]-202[56]-(?:butsuri|kagaku|seibutsu|jitsumu|hourei)-q\d+$/),
  grade: z.union([z.literal(1), z.literal(2)]),
  year: z.union([z.literal(2025), z.literal(2026)]),
  subject: z.enum(["物理学", "化学", "生物学", "実務", "法令"]),
  number: z.number().int().min(1).max(32),
  pdfPage: z.number().int().positive(),
  question: z.string().min(10),

  explanation: z.string().min(30),

  topic: z.string().min(1),
  sourcePdfUrl: z.string().url().startsWith("https://www.nustec.or.jp/syunin/pdf/"),
  sourceAnswerUrl: z.string().url().startsWith("https://www.nustec.or.jp/syunin/pdf/"),
  answerPdfPage: z.number().int().min(1).max(5),
  sourceAttribution: z.string().startsWith("出典：公益財団法人原子力安全技術センター"),
  hasImage: z.boolean(),
  imagePath: z.string().startsWith("data/questions/hoshasen/figures/").optional(),
  imageAltText: z.string().min(10).optional(),
  referenceUrls: z.array(z.string().url()).optional(),
});

const SingleSchema = CommonSchema.extend({
  format: z.literal("single-choice").optional(),
  choices: z.array(z.string().min(1)).length(5),
  officialAnswerNumber: z.number().int().min(1).max(5),
  choiceExplanations: z.array(z.string().min(10)).length(5),
});
const GroupSchema = z.object({
  id: z.string().min(1),
  choices: z.array(z.string().min(1)).min(2).max(25),
});
const BlankSchema = z.object({
  id: z.string().min(1),
  groupId: z.string().min(1),
  officialAnswerNumber: z.number().int().positive().nullable(),
  allAnswersAccepted: z.boolean().optional(),
  explanation: z.string().min(20),
  choiceExplanations: z.array(z.string().min(10)).min(2),
});
const MultiSchema = CommonSchema.extend({
  format: z.literal("multi-part"),
  answerGroups: z.array(GroupSchema).min(1),
  blanks: z.array(BlankSchema).min(2),
}).superRefine((q, ctx) => {
  const groups = new Map(q.answerGroups.map(g => [g.id, g]));
  if (groups.size !== q.answerGroups.length || new Set(q.blanks.map(b => b.id)).size !== q.blanks.length) {
    ctx.addIssue({ code: "custom", message: "Duplicate group or blank IDs" });
  }
  for (const b of q.blanks) {
    const group = groups.get(b.groupId);
    if (!group || b.choiceExplanations.length !== group.choices.length ||
        (b.allAnswersAccepted ? b.officialAnswerNumber !== null : b.officialAnswerNumber === null || b.officialAnswerNumber > group.choices.length)) {
      ctx.addIssue({ code: "custom", message: `Invalid answer group, key or explanations: ${b.id}` });
    }
  }
});
export const HoshasenStagedQuestionSchema = z.union([SingleSchema, MultiSchema]).refine(q => !q.hasImage || Boolean(q.imagePath && q.imageAltText), {
  message: "Figure questions require a private local asset and an accessible description",
});

export type HoshasenStagedQuestion = z.infer<typeof HoshasenStagedQuestionSchema>;
export const HOSHASEN_STAGED_QUESTIONS: HoshasenStagedQuestion[] = z
  .array(HoshasenStagedQuestionSchema)
  .parse([...first2026, ...second2026, ...first2025, ...second2025, ...chemistry2026, ...chemistry2025, ...biology2026, ...biology2025, ...practical2026, ...practical2025, ...firstChemistry2026, ...firstBiology2026, ...firstBiology2025, ...firstChemistry2025, ...secondLaw2026, ...secondLaw2025, ...firstLaw2026, ...firstLaw2025, ...multi]);
