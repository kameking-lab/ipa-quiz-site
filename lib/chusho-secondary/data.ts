import { z } from "zod";
import a25 from "@/data/chusho-secondary/2025-case1.json";
import b25 from "@/data/chusho-secondary/2025-case2.json";
import c25 from "@/data/chusho-secondary/2025-case3.json";
import d25 from "@/data/chusho-secondary/2025-case4.json";
import a24 from "@/data/chusho-secondary/2024-case1.json";
import b24 from "@/data/chusho-secondary/2024-case2.json";
import c24 from "@/data/chusho-secondary/2024-case3.json";
import d24 from "@/data/chusho-secondary/2024-case4.json";

const text = z.string().trim().min(1);
const hash = z.string().regex(/^[a-f0-9]{64}$/);
const solution = z.object({
  label: text,
  maxChars: z.number().int().positive().optional(),
  example: text,
  reasoning: z.string().min(40),
  checkpoints: z.array(text).min(2),
  calculationChecks: z.array(z.object({ name: text, expression: text, expected: z.number(), tolerance: z.number().nonnegative() }).strict()).optional(),
}).strict().superRefine((s, ctx) => {
  if (s.maxChars && Array.from(s.example).length > s.maxChars) ctx.addIssue({ code: "custom", message: "Example exceeds the official character limit" });
});
const question = z.object({
  id: z.string().regex(/^chusho-secondary-202[45]-case[1-4]-q[1-5]$/),
  number: z.number().int().min(1).max(5),
  points: z.number().int().positive(),
  topic: text,
  questionText: text,
  intentSummary: text,
  solutionProvenance: z.literal("independent-editorial-example"),
  solutions: z.array(solution).min(1),
}).strict();
const part = z.object({
  year: z.union([z.literal(2025), z.literal(2024)]),
  case: z.enum(["case1", "case2", "case3", "case4"]),
  caseTitle: text,
  domain: text,
  context: text,
  sourcePdfUrl: z.string().url().startsWith("https://www.jf-cmca.jp/attach/test/shikenmondai/"),
  sourcePdfSha256: hash,
  sourceIntentUrl: z.string().url().startsWith("https://www.jf-cmca.jp/attach/test/"),
  sourceIntentSha256: hash,
  sourcePages: z.array(z.object({ page: z.number().int().min(2), url: z.string().startsWith("/images/chusho-secondary/"), sha256: hash }).strict()).min(1),
  questions: z.array(question).min(4).max(5),
  lastUpdated: z.literal("2026-10-11"),
}).strict();

export type ChushoCase = z.infer<typeof part>;
export type ChushoQuestion = z.infer<typeof question>;
export type ChushoSolution = z.infer<typeof solution>;
export const CHUSHO_SECONDARY_CASES: ChushoCase[] = [a25, b25, c25, d25, a24, b24, c24, d24].map(raw => part.parse(raw));
for (const paper of CHUSHO_SECONDARY_CASES) {
  const number = Number(paper.case.slice(-1));
  const expected = paper.year === 2024 && number === 3 ? 5 : 4;
  if (paper.questions.length !== expected || paper.questions.reduce((sum, q) => sum + q.points, 0) !== 100) throw new Error("Incomplete secondary case");
  paper.questions.forEach((q, i) => {
    if (q.number !== i + 1 || q.id !== `chusho-secondary-${paper.year}-${paper.case}-q${q.number}`
      || new Set(q.solutions.map(s => s.label)).size !== q.solutions.length) throw new Error("Duplicate or missing secondary question/answer field");
  });
}
export const CHUSHO_SECONDARY_QUESTIONS = CHUSHO_SECONDARY_CASES.flatMap(p => p.questions);
export const CHUSHO_SECONDARY_ORIGINAL_COUNT = CHUSHO_SECONDARY_QUESTIONS.length;
export const CHUSHO_SECONDARY_SOLUTION_COUNT = CHUSHO_SECONDARY_QUESTIONS.reduce((sum, q) => sum + q.solutions.length, 0);
if (CHUSHO_SECONDARY_ORIGINAL_COUNT !== 33 || new Set(CHUSHO_SECONDARY_QUESTIONS.map(q => q.id)).size !== 33
  || CHUSHO_SECONDARY_SOLUTION_COUNT !== 54) throw new Error("Secondary latest-two coverage changed");
export const chushoCasePath = (year: number, key: string) => `/chusho-secondary/${year}/${key}`;
export const chushoQuestionPath = (year: number, key: string, number: number) => `${chushoCasePath(year, key)}/q${number}`;
export const getChushoCase = (year: number, key: string) => CHUSHO_SECONDARY_CASES.find(p => p.year === year && p.case === key);
export const getChushoQuestion = (year: number, key: string, number: number) => getChushoCase(year, key)?.questions.find(q => q.number === number);
export const chushoSitemapPaths = () => ["/chusho-secondary", ...CHUSHO_SECONDARY_CASES.flatMap(p => [chushoCasePath(p.year, p.case), ...p.questions.map(q => chushoQuestionPath(p.year, p.case, q.number))])];

export const INDEPENDENT_EXAMPLE_NOTICE = "解答例・解説・自己確認項目は、公式問題と出題趣旨を参考に当サイトが独自に作成しました。公式の模範解答や採点基準ではなく、得点を保証するものではありません。別の妥当な解答も考えられます。";
