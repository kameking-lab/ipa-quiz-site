import { z } from "zod";

/**
 * 原問形式を保つ追加 reader の schema / 公開ゲート。問題データは含まない。
 * 既存 applied.ts と公開 route からは import されない（未査読データを公開面へ接続しないため）。
 */
const text = z.string().min(1);
const url = z.string().url();
const posInt = z.number().int().positive();
const isoDate = z.string().regex(/^\d{4}-\d{2}-\d{2}$/);
export const APPLIED_CIRCLED_LABELS = ["①", "②", "③", "④", "⑤", "⑥", "⑦", "⑧", "⑨", "⑩"] as const;
const circled = z.enum(APPLIED_CIRCLED_LABELS);
const fieldLabel = z.union([circled, z.literal("答")]);
/** 伏字は回答欄ではない。 */
const MASKED_TOKENS = ["□□□", "＊＊＊"] as const;
const NUMERIC_ANSWER = /^[0-9０-９]+(?:[,，][0-9０-９]{3})*(?:[.．][0-9０-９]+)?$/;

const fieldShape = { label: fieldLabel, officialAnswer: text, occurrences: posInt, explanation: text };
const numericField = z.object({ ...fieldShape, kind: z.literal("numeric"), unit: text }).strict();
const textField = z.object({ ...fieldShape, kind: z.literal("text"), unit: text.optional() }).strict();
const calcField = z.object({ ...fieldShape, kind: z.literal("numeric"), unit: text, prompt: text, calculationSteps: z.array(text).min(1) }).strict();
const clozeField = z.discriminatedUnion("kind", [numericField, textField]);

const cell = z.object({ text: z.string(), blank: circled.optional() }).strict();
const tableBlock = z.object({
  type: z.literal("table"), caption: text, unitNote: text.optional(), rowHeaderLabel: text,
  columns: z.array(text).min(1),
  rows: z.array(z.object({ group: text.optional(), label: text, cells: z.array(cell).min(1) }).strict()).min(1),
}).strict();
const figureBlock = z.object({
  type: z.literal("figure"), caption: text, facts: z.array(text).min(1), notes: z.array(text),
  originalPdfPage: posInt, processingNotice: text,
}).strict();
const block = z.discriminatedUnion("type", [
  z.object({ type: z.literal("paragraph"), text }).strict(),
  z.object({ type: z.literal("list"), items: z.array(text).min(1) }).strict(),
  tableBlock, figureBlock,
  z.object({ type: z.literal("formula"), expression: text, caption: text.optional(), notes: z.array(text) }).strict(),
]);
export type AppliedBlock = z.infer<typeof block>;

const rounding = z.discriminatedUnion("rule", [
  z.object({ rule: z.literal("round-half-up"), decimals: z.number().int().nonnegative(), text, intermediateNote: text.optional() }).strict(),
  z.object({ rule: z.literal("floor"), unit: posInt, text }).strict(),
  z.object({ rule: z.literal("none") }).strict(),
]);
const gate = z.enum(["pending", "approved"]);
const commonShape = {
  id: text, number: posInt, caseNumber: posInt, title: text,
  source: z.object({ questionPdfPage: posInt, questionPrintedPage: posInt, answerPdfPage: posInt }).strict(),
  instruction: text,
  conditions: z.array(z.object({ heading: text.optional(), lines: z.array(text).min(1) }).strict()),
  blocks: z.array(block), rounding,
  review: z.object({ transcription: gate, explanation: gate }).strict(),
  law: z.object({
    status: z.enum(["confirmed", "hold"]), referenceDate: isoDate, evidenceUrls: z.array(url),
    temporalOverride: z.object({ effectiveDate: isoDate, text }).strict().optional(),
  }).strict(),
};
const clozeQuestion = z.object({
  ...commonShape, type: z.literal("originalmixedcloze"),
  readerKind: z.enum(["mixed-text-numeric-cloze", "table-numeric-cloze", "numeric-cloze", "sectioned-mixed-text-numeric-cloze"]),
  sections: z.array(z.object({ numeral: text.optional(), heading: text.optional(), paragraphs: z.array(text).min(1) }).strict()),
  fields: z.array(clozeField).min(1),
}).strict();
const calcQuestion = z.object({
  ...commonShape, type: z.literal("originalworkedcalculation"),
  readerKind: z.enum(["calculation-with-working", "single-calculation-with-working"]),
  workingRequired: z.literal(true),
  dependsOn: z.object({ question: posInt, label: circled }).strict().optional(),
  answers: z.array(calcField).min(1),
}).strict();
const sharedCase = z.object({
  number: posInt, title: text, instruction: text.optional(),
  officialQuestionRange: z.tuple([posInt, posInt]), includedQuestionNumbers: z.array(posInt).min(1),
  pdfPages: z.array(posInt).min(1), printedPages: z.array(posInt).min(1),
  transcription: gate, blocks: z.array(block).min(1),
}).strict();
const extensionBase = z.object({
  edition: z.string().regex(/^\d{6}$/), lawReferenceDate: isoDate,
  sourceQuestionUrl: url, sourceAnswerUrl: url, sourceIndexUrl: url, sourceAnswerIndexUrl: url, reuseConditionsUrl: url,
  sourceAttribution: text, processingDisclosure: text,
  sharedCases: z.array(sharedCase).min(1),
  questions: z.array(z.discriminatedUnion("type", [clozeQuestion, calcQuestion])).min(1),
}).strict();

type Extension = z.infer<typeof extensionBase>;
type Question = Extension["questions"][number];
type Issue = (path: (string | number)[], message: string) => void;

function collectBlockText(blocks: readonly AppliedBlock[], texts: string[], blanks: string[]): void {
  for (const item of blocks) {
    if (item.type === "paragraph") texts.push(item.text);
    else if (item.type === "list") texts.push(...item.items);
    else if (item.type === "formula") texts.push(item.expression, ...item.notes);
    else if (item.type === "figure") texts.push(...item.facts, ...item.notes);
    else if (item.type === "table") for (const row of item.rows) for (const c of row.cells) { texts.push(c.text); if (c.blank && !c.text.includes(c.blank)) blanks.push(c.blank); }
  }
}

function checkTables(blocks: readonly AppliedBlock[], path: (string | number)[], bad: Issue): void {
  blocks.forEach((item, i) => {
    if (item.type !== "table") return;
    item.rows.forEach((row, r) => {
      if (row.cells.length !== item.columns.length) bad([...path, i, "rows", r, "cells"], `表のセル数が列数 ${item.columns.length} と一致しません`);
    });
  });
}

function checkQuestion(q: Question, ext: Extension, path: (string | number)[], bad: Issue): void {
  const fields: readonly { label: string; officialAnswer: string; occurrences: number; kind: string }[] = q.type === "originalmixedcloze" ? q.fields : q.answers;
  const fieldKey = q.type === "originalmixedcloze" ? "fields" : "answers";
  const labels = fields.map((f) => f.label);
  if (!(q.type === "originalworkedcalculation" && labels.length === 1 && labels[0] === "答")) {
    labels.forEach((label, i) => { if (label !== APPLIED_CIRCLED_LABELS[i]) bad([...path, fieldKey, i, "label"], "空欄ラベルは①から連番である必要があります"); });
  }
  fields.forEach((f, i) => {
    if (MASKED_TOKENS.some((token) => f.officialAnswer.includes(token))) bad([...path, fieldKey, i, "officialAnswer"], "伏字を回答欄にできません");
    if (f.kind === "numeric" && !NUMERIC_ANSWER.test(f.officialAnswer)) bad([...path, fieldKey, i, "officialAnswer"], "numeric 欄は数値のみ（単位は unit）です");
  });
  checkTables(q.blocks, [...path, "blocks"], bad);
  if (q.law.referenceDate !== ext.lawReferenceDate && !q.law.temporalOverride) bad([...path, "law", "referenceDate"], "版の法令基準日と異なる場合は原問の基準日注記が必要です");
  if (q.type === "originalmixedcloze") {
    if (q.sections.length === 0 && q.blocks.length === 0) bad([...path, "blocks"], "問題文または表などの原問内容が必要です");
    const texts: string[] = q.sections.flatMap((s) => s.paragraphs);
    const blanks: string[] = [];
    collectBlockText(q.blocks, texts, blanks);
    for (const label of APPLIED_CIRCLED_LABELS) {
      const found = texts.reduce((n, t) => n + t.split(label).length - 1, 0) + blanks.filter((b) => b === label).length;
      const field = fields.find((f) => f.label === label);
      if (found !== (field?.occurrences ?? 0)) bad([...path, "sections"], `${label} の出現数 ${found} が occurrences ${field?.occurrences ?? 0} と一致しません`);
    }
  }
  const target = ext.sharedCases.find((c) => c.number === q.caseNumber);
  if (!target || !target.includedQuestionNumbers.includes(q.number)) bad([...path, "caseNumber"], "共通事例の includedQuestionNumbers に含まれる必要があります");
  if (q.law.status === "confirmed" && q.law.evidenceUrls.length === 0) bad([...path, "law"], "confirmed には根拠URLが必要です（不明は hold）");
  if (q.type === "originalworkedcalculation" && q.dependsOn) {
    const dep = q.dependsOn;
    const parent = ext.questions.find((x) => x.number === dep.question);
    const parentFields: readonly { label: string }[] = !parent ? [] : parent.type === "originalmixedcloze" ? parent.fields : parent.answers;
    if (!parent || parent.caseNumber !== q.caseNumber || parent.number >= q.number || !parentFields.some((f) => f.label === dep.label)) bad([...path, "dependsOn"], "依存先の問題・空欄が存在しません");
  }
}

export const fp1AppliedExtensionSchema = extensionBase.superRefine((ext, ctx) => {
  const bad: Issue = (path, message) => ctx.addIssue({ code: "custom", path, message });
  const seen = new Set<number>();
  ext.sharedCases.forEach((c, i) => {
    const [from, to] = c.officialQuestionRange;
    if (seen.has(c.number)) bad(["sharedCases", i, "number"], "共通事例番号が重複しています");
    seen.add(c.number);
    if (from > to || c.includedQuestionNumbers.some((n) => n < from || n > to)) bad(["sharedCases", i, "includedQuestionNumbers"], "収録問題は原問範囲内である必要があります");
    if (new Set(c.includedQuestionNumbers).size !== c.includedQuestionNumbers.length || c.includedQuestionNumbers.some((number) => !ext.questions.some((q) => q.number === number && q.caseNumber === c.number))) bad(["sharedCases", i, "includedQuestionNumbers"], "収録問題番号は重複なく対応する実データを持つ必要があります");
    checkTables(c.blocks, ["sharedCases", i, "blocks"], bad);
  });
  const numbers = new Set<number>();
  const ids = new Set<string>();
  ext.questions.forEach((q, i) => {
    if (numbers.has(q.number)) bad(["questions", i, "number"], "問題番号が重複しています");
    numbers.add(q.number);
    if (ids.has(q.id)) bad(["questions", i, "id"], "問題IDが重複しています");
    ids.add(q.id);
    checkQuestion(q, ext, ["questions", i], bad);
  });
});

export type Fp1AppliedExtension = z.infer<typeof fp1AppliedExtensionSchema>;
export type Fp1AppliedExtensionQuestion = Fp1AppliedExtension["questions"][number];

export function parseFp1AppliedExtension(raw: unknown): Fp1AppliedExtension {
  return fp1AppliedExtensionSchema.parse(raw);
}

/** 全ての査読・法令根拠と依存先が確認できた問題だけ返す。公開routeには未接続。 */
export function publishableExtensionQuestions(ext: Fp1AppliedExtension): Fp1AppliedExtensionQuestion[] {
  const ready = new Map(ext.questions.filter((q) => q.review.transcription === "approved" && q.review.explanation === "approved" && q.law.status === "confirmed" && q.law.evidenceUrls.length > 0 && ext.sharedCases.some((c) => c.number === q.caseNumber && c.transcription === "approved")).map((q) => [q.number, q]));
  const eligible = (q: Fp1AppliedExtensionQuestion, visiting = new Set<number>()): boolean => {
    if (visiting.has(q.number) || !ready.has(q.number)) return false;
    if (q.type !== "originalworkedcalculation" || !q.dependsOn) return true;
    const parent = ready.get(q.dependsOn.question);
    if (!parent) return false;
    const fields = parent.type === "originalmixedcloze" ? parent.fields : parent.answers;
    if (parent.caseNumber !== q.caseNumber || !fields.some((f) => f.label === q.dependsOn?.label)) return false;
    return eligible(parent, new Set([...visiting, q.number]));
  };
  return ext.questions.filter((q) => eligible(q));
}
