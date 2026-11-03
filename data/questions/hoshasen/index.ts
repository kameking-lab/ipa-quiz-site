import { z } from "zod";
import first2026 from "./2026-1.json";
import second2026 from "./2026-2.json";
import first2025 from "./2025-1.json";
import second2025 from "./2025-2.json";

/** Native source staging. Deliberately absent from public registries and loaders. */
export const HoshasenStagedQuestionSchema = z.object({
  id: z.string().regex(/^hoshasen-[12]-202[56]-butsuri-q\d+$/),
  grade: z.union([z.literal(1), z.literal(2)]),
  year: z.union([z.literal(2025), z.literal(2026)]),
  subject: z.literal("物理学"),
  number: z.number().int().min(1).max(30),
  pdfPage: z.number().int().positive(),
  question: z.string().min(10),
  choices: z.array(z.string().min(1)).length(5),
  officialAnswerNumber: z.number().int().min(1).max(5),
  explanation: z.string().min(30),
  choiceExplanations: z.array(z.string().min(10)).length(5),
  topic: z.string().min(1),
  sourcePdfUrl: z.string().url().startsWith("https://www.nustec.or.jp/syunin/pdf/"),
  sourceAnswerUrl: z.string().url().startsWith("https://www.nustec.or.jp/syunin/pdf/"),
  answerPdfPage: z.literal(3),
  sourceAttribution: z.string().startsWith("出典：公益財団法人原子力安全技術センター"),
  hasImage: z.boolean(),
  imagePath: z.string().startsWith("data/questions/hoshasen/figures/").optional(),
  imageAltText: z.string().min(10).optional(),
  referenceUrls: z.array(z.string().url()).optional(),
}).refine(q => !q.hasImage || Boolean(q.imagePath && q.imageAltText), {
  message: "Figure questions require a private local asset and an accessible description",
});

export type HoshasenStagedQuestion = z.infer<typeof HoshasenStagedQuestionSchema>;
export const HOSHASEN_STAGED_QUESTIONS: HoshasenStagedQuestion[] = z
  .array(HoshasenStagedQuestionSchema)
  .parse([...first2026, ...second2026, ...first2025, ...second2025]);
