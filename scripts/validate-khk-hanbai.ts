import { z } from "zod";
import { createHash } from "node:crypto";
import { KHK_HANBAI_STAGING } from "../data/qualification-staging/khk-hanbai";
import answers from "../data/qualification-staging/khk-hanbai/official-answers.json";
import contexts from "../data/qualification-staging/khk-hanbai/shared-contexts.json";
import sources from "../data/qualification-staging/khk-hanbai/official-sources.json";
import manifest from "../data/qualification-staging/khk-hanbai/manifest.json";
import audit from "../data/qualification-staging/khk-hanbai/source-audit.json";

const keys = ["ア", "イ", "ウ", "エ", "オ"] as const;
const fiveTexts = z.object({
  ア: z.string().min(1), イ: z.string().min(1), ウ: z.string().min(1),
  エ: z.string().min(1), オ: z.string().min(1),
}).strict();
const schema = z.object({
  id: z.string().min(1), exam: z.enum(["khk-hanbai", "khk-hanbai2", "khk-setsubishi"]),
  year: z.union([z.literal(2025), z.literal(2024)]), season: z.literal("annual"),
  session: z.enum(["houki", "gas-technology"]), qNumber: z.number().int().min(1).max(20),
  type: z.literal("multiple-choice"), question: z.string().min(10), choices: fiveTexts,
  answer: z.enum(keys), officialAnswerNumber: z.enum(["1", "2", "3", "4", "5"]),
  explanation: z.string().min(30), choiceExplanations: fiveTexts,
  sourcePdfUrl: z.url(), sourceAnswerUrl: z.url(), sourceAttribution: z.string().startsWith("出典：高圧ガス保安協会"),
  sourcePages: z.array(z.number().int().positive()).min(1),
  sharedContext: z.string().min(10), lawReferenceDate: z.string().optional(), lawNote: z.string().optional(),
  hasImage: z.literal(false), publicAllowed: z.literal(false), needsReview: z.literal(true),
  explanationCoverage: z.literal("full"), license: z.literal("KHK-owner-approved-staging"),
});

/** Isolated schema: adding a staging slug must never widen the public ExamCode union. */
export function validateKhkHanbaiStaging(input: unknown = KHK_HANBAI_STAGING.flatMap(s => [...s.questions])) {
  const errors: string[] = [];
  const parsed = z.array(schema).safeParse(input);
  if (!parsed.success) return { count: 0, errors: parsed.error.issues.map(i => `${i.path.join(".")}: ${i.message}`) };
  const rows = parsed.data;
  const seen = new Set<string>();
  for (const q of rows) {
    if (seen.has(q.id)) errors.push(`${q.id}: duplicate ID`);
    seen.add(q.id);
    const receipt = audit.rows.find(row => row.id === q.id);
    const orderedText = q.question + keys.map((key, i) => `(${i + 1})${q.choices[key]}`).join("");
    const sha = (value: string) => createHash("sha256").update(value).digest("hex");
    if (!receipt || !(receipt.fitzMatched || receipt.pdfminerMatched) || !receipt.sharedContextMatched || !receipt.requiredCoverInstructionsMatched ||
        sha(orderedText) !== receipt.orderedTextSha256 || sha(q.sharedContext) !== receipt.sharedContextSha256 ||
        receipt.sourcePages.join() !== q.sourcePages.join() || receipt.sourcePdfUrl !== q.sourcePdfUrl) {
      errors.push(`${q.id}: source audit mismatch; recheck original PDF`);
    }
    const code = `${q.exam === "khk-hanbai" ? "J" : q.exam === "khk-hanbai2" ? "K" : "L"}${q.session === "houki" ? "X" : "Y"}`;
    const answerKey = `${q.year}-${code}`;
    const sequence = answers[answerKey as keyof typeof answers];
    if (!sequence || sequence[q.qNumber - 1] !== q.officialAnswerNumber || keys[Number(q.officialAnswerNumber) - 1] !== q.answer) {
      errors.push(`${q.id}: official answer mismatch`);
    }
    if (q.id !== `${q.exam}-${q.year}-${q.session}-q${q.qNumber}`) errors.push(`${q.id}: identity mismatch`);
    const source = sources.find(s => s.acquired && s.url === q.sourcePdfUrl);
    const answerSource = sources.find(s => s.acquired && s.url === q.sourceAnswerUrl && s.name === `R${q.year - 2018}fy_kaitou.pdf`);
    if (!source || !answerSource || !q.sourcePdfUrl.endsWith(`R${q.year - 2018}AC${code}-W.pdf`)) errors.push(`${q.id}: source mismatch`);
    if (source && q.sourcePages.some(p => p > (source.pages ?? 0))) errors.push(`${q.id}: page outside source`);
    const contextKey = `${answerKey}-${q.session === "houki" ? (code === "KX" && q.qNumber > 10 ? "second" : "first") : "pressure"}`;
    if (q.sharedContext !== contexts[contextKey as keyof typeof contexts]) errors.push(`${q.id}: shared context mismatch`);
    if (q.exam === "khk-setsubishi" && q.year === 2025 &&
        (!q.sharedContext.includes("圧力はゲージ圧力で表しています。") || !q.sharedContext.includes("およびその政省令に基づいて答えてください。"))) {
      errors.push(`${q.id}: required equipment cover instructions missing`);
    }
    if (q.session === "houki" && (q.lawReferenceDate !== `${q.year}-04-01` || !q.lawNote)) errors.push(`${q.id}: law date missing`);
    for (const key of keys) {
      const text = q.choiceExplanations[key];
      if (text.length < 30 || !text.startsWith(key === q.answer ? "正しい。" : "誤り。")) errors.push(`${q.id}/${key}: incomplete or inconsistent explanation`);
    }
  }
  for (const qualification of manifest.qualifications) {
    const subset = rows.filter(q => q.exam === qualification.slug);
    if (subset.length !== qualification.total) errors.push(`${qualification.slug}: count mismatch`);
    for (const year of manifest.years) {
      for (const session of qualification.slug === "khk-setsubishi" ? ["houki"] : ["houki", "gas-technology"]) {
        const numbers = subset.filter(q => q.year === year && q.session === session).map(q => q.qNumber).sort((a, b) => a - b);
        const expected = Array.from({ length: qualification.slug === "khk-setsubishi" ? 15 : 20 }, (_, i) => i + 1);
        if (numbers.join() !== expected.join()) errors.push(`${qualification.slug}/${year}/${session}: gap or duplicate`);
      }
    }
  }
  if (manifest.publicAllowed !== false || manifest.total !== rows.length || manifest.targetTotal !== rows.length + manifest.remainingQuestions) errors.push("manifest: publication gate or total mismatch");
  if (audit.mismatches.length > 0 || audit.checkedQuestions !== rows.length) errors.push("source audit: incomplete");
  return { count: rows.length, errors };
}
