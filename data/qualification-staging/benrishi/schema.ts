import { z } from "zod";

export const BENRISHI_CATEGORIES = ["特許・実用新案", "意匠", "商標", "条約", "著作権法・不正競争防止法"] as const;
export const BENRISHI_SUBJECTS = ["patent", "design", "trademark", "treaties", "copyright-unfair-competition"] as const;
const text = z.string().trim().min(1).refine(v => !/[\uFFFD]|\?{3}/u.test(v), "Broken source text");
const choice = z.object({ number: z.number().int().min(1).max(5), text }).strict();
const reason = z.object({ number: z.number().int().min(1).max(5), explanation: text.refine(v => v.length >= 20) }).strict();
export const benrishiQuestionSchema = z.object({
  id: text, category: z.enum(BENRISHI_CATEGORIES), number: z.number().int().positive(),
  sourcePages: z.array(z.number().int().min(2).max(65)).min(1),
  text, choices: z.array(choice).length(5), correctChoice: z.number().int().min(1).max(5),
  sourceQuestionUrl: z.string().url(), sourcePdfUrl: z.string().url(), sourceAnswerUrl: z.string().url(), sourcePageUrl: z.string().url(),
  attribution: text.refine(v => v.includes("特許庁") && v.includes("独自作成") && v.includes("テキスト化・整形")),
  explanation: text.refine(v => v.startsWith("出題時点の法令に基づく独自解説。")),
  publicAllowed: z.literal(false), needsReview: z.literal(true), officialAnswerNumber: z.string().regex(/^[1-5]$/),
  originalText: text, sourceImages: z.array(text).min(1), lastUpdated: z.literal("2026-11-04"),
  officialReferenceUrls: z.array(z.string().url()).min(1), lawReferenceDate: z.literal("2026-05-17").optional(),
  statementExplanations: z.array(z.object({ label: z.enum(["イ", "ロ", "ハ", "ニ", "ホ"]), correct: z.boolean(), explanation: text.refine(v => v.length >= 20) }).strict()),
  choiceExplanations: z.array(reason).length(5), explanationCoverage: z.literal("all-choices"),
}).strict();
export const benrishiPaperSchema = z.object({
  year: z.union([z.literal(2025), z.literal(2026)]), publicAllowed: z.literal(false), publication: z.literal("HOLD"),
  lawBasis: z.literal("出題時点の法令に基づく"), sourceQuestionSha256: z.string().regex(/^[a-f0-9]{64}$/),
  sourceAnswerSha256: z.string().regex(/^[a-f0-9]{64}$/), questionCount: z.literal(60), questions: z.array(benrishiQuestionSchema).length(60),
}).strict();
export type BenrishiStagedQuestion = z.infer<typeof benrishiQuestionSchema>;
