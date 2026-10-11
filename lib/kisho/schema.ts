import { z } from "zod";
import type { Question } from "@/lib/questions/types";
import { KISHO_PRACTICAL_FIELD_IDS, KISHO_PRACTICAL_ANSWER_FIELDS, KISHO_REQUIRED_ORIGINALS, KISHO_SITTINGS, type KishoSection } from "./scope";

/** Private preparation only; adding this type does not enable public question registries. */
export type KishoDraftQuestion = Omit<Question, "exam" | "license"> & {
  exam: "kisho"; license: "JMBSC-permission-required"; round?: 65 | 66;
};

const text = z.string().trim().min(1).refine(
  (value) => !/\uFFFD|UNMAPPED-CID|\[要確認\]/u.test(value), "未解決の抽出文字を含む",
);
const fiveTexts = z.object({ ア: text, イ: text, ウ: text, エ: text, オ: text }).strict();
const choiceKeys = ["ア", "イ", "ウ", "エ", "オ"] as const;
const date = z.string().regex(/^\d{4}-\d{2}-\d{2}$/);

export const kishoDraftQuestionSchema = z.object({
  id: z.string().regex(/^kisho-(65|66)-(ippan|senmon|pm1|pm2)-q\d{2}$/),
  exam: z.literal("kisho"), round: z.union([z.literal(65), z.literal(66)]).optional(),
  session: z.enum(["ippan", "senmon", "pm1", "pm2"]), year: z.literal(2026),
  fiscalYear: z.union([z.literal(2025), z.literal(2026)]), season: z.enum(["first", "second"]),
  examDate: date.optional(), qNumber: z.number().int().positive(),
  type: z.enum(["multiple-choice", "descriptive"]), category: text,
  topicTags: z.array(text).min(1), difficulty: z.union([z.literal(1), z.literal(2), z.literal(3), z.literal(4), z.literal(5)]),
  question: text, answer: text, explanation: text,
  choices: fiveTexts.optional(), choiceExplanations: fiveTexts.optional(),
  officialAnswerNumber: z.string().regex(/^[1-5]$/).optional(),
  explanationCoverage: z.enum(["full", "official-summary"]).optional(),
  modelAnswer: text.optional(), scoringCriteria: text.optional(),
  hasImage: z.boolean(), imageUrls: z.array(text).optional(), imageAltTexts: z.array(text).optional(),
  sourcePdfUrl: z.url(), sourceAnswerUrl: z.url(), sourceAttribution: text,
  officialReferenceUrls: z.array(z.url()), license: z.literal("JMBSC-permission-required"),
  lastUpdated: date, lawReferenceDate: date.optional(), needsReview: z.boolean().default(true),
}).passthrough().superRefine((question, context) => {
  const [, roundText, section, numberText] = question.id.split(/[-q]+/);
  const sitting = KISHO_SITTINGS.find((item) => item.round === Number(roundText));
  const issue = (message: string, path: (string | number)[]) => context.addIssue({ code: "custom", message, path });
  if (!sitting) { issue("対象回が不明", ["id"]); return; }
  if (section !== question.session || Number(numberText) !== question.qNumber) issue("IDと科目・問番号が不一致", ["id"]);
  if (question.round !== undefined && question.round !== sitting.round) issue("回番号が不一致", ["round"]);
  if (question.fiscalYear !== sitting.fiscalYear || question.season !== sitting.season) issue("年度・実施回が不一致", ["fiscalYear"]);
  if (question.examDate !== undefined && question.examDate !== sitting.examDate) issue("公式実施日が不一致", ["examDate"]);
  if (question.qNumber > sitting.sections[question.session]) issue("公式問数の範囲外", ["qNumber"]);
  if (question.sourcePdfUrl !== sitting.sourceZipUrl || question.sourceAnswerUrl !== sitting.sourceZipUrl) issue("公式配布ZIPとの対応が不一致", ["sourcePdfUrl"]);
  const academic = question.session === "ippan" || question.session === "senmon";
  if (academic) {
    if (question.type !== "multiple-choice") issue("学科は五肢択一", ["type"]);
    if (!question.choices || !question.choiceExplanations) issue("全5肢と全5肢の説明が必要", ["choices"]);
    if (!question.officialAnswerNumber) issue("公式正答番号が必要", ["officialAnswerNumber"]);
    else if (question.answer !== choiceKeys[Number(question.officialAnswerNumber) - 1]) issue("内部正答と公式番号が不一致", ["answer"]);
    if (question.explanationCoverage !== "full") issue("全肢解説の区分が必要", ["explanationCoverage"]);
  } else {
    if (question.type !== "descriptive" || !question.modelAnswer || !question.scoringCriteria) issue("実技は記述答案と採点観点が必要", ["modelAnswer"]);
    if (question.choices || question.choiceExplanations || question.officialAnswerNumber) issue("実技に架空の選択肢を付けない", ["choices"]);
  }
  const images = question.imageUrls ?? [];
  if (question.hasImage && (images.length === 0 || question.imageAltTexts?.length !== images.length)) issue("図の参照と同数の代替テキストが必要", ["imageUrls"]);
  if (!question.hasImage && (images.length > 0 || (question.imageAltTexts?.length ?? 0) > 0)) issue("図の有無が不一致", ["hasImage"]);
});

export const kishoDraftCollectionSchema = z.array(kishoDraftQuestionSchema).superRefine((questions, context) => {
  const seen = new Set<string>();
  questions.forEach((question, index) => {
    if (seen.has(question.id)) context.addIssue({ code: "custom", message: "原問IDが重複", path: [index, "id"] });
    seen.add(question.id);
  });
});
export type ValidatedKishoDraftQuestion = z.infer<typeof kishoDraftQuestionSchema>;
const academicKeys = z.object({ ippan: z.array(z.number().int().min(1).max(5)).length(15), senmon: z.array(z.number().int().min(1).max(5)).length(15) });
export const kishoOfficialKeysSchema = z.object({ "65": academicKeys, "66": academicKeys });

export function verifyKishoOfficialAnswers(questions: ValidatedKishoDraftQuestion[], inputKeys: unknown) {
  const keys = kishoOfficialKeysSchema.parse(inputKeys);
  return questions.flatMap((question) => {
    if (question.session !== "ippan" && question.session !== "senmon") return [];
    const round = question.id.startsWith("kisho-65-") ? "65" : "66";
    return Number(question.officialAnswerNumber) === keys[round][question.session][question.qNumber - 1]
      ? [] : [{ id: question.id, issue: "公式正答表との不一致" }];
  });
}

export function inspectKishoDraftCoverage(input: unknown) {
  const questions = kishoDraftCollectionSchema.parse(input);
  const stored = new Set(questions.map((question) => question.id));
  const prepared = new Set(questions.filter((question) => question.needsReview === false).map((question) => question.id));
  const expected = KISHO_SITTINGS.flatMap((sitting) =>
    (Object.keys(sitting.sections) as KishoSection[]).flatMap((section) =>
      Array.from({ length: sitting.sections[section] }, (_, index) => `kisho-${sitting.round}-${section}-q${String(index + 1).padStart(2, "0")}`),
    ),
  );
  return {
    expectedOriginals: KISHO_REQUIRED_ORIGINALS, storedOriginals: stored.size, preparedOriginals: prepared.size,
    publishedOriginals: 0, missingStored: expected.filter((id) => !stored.has(id)),
    missingPrepared: expected.filter((id) => !prepared.has(id)), complete: prepared.size === KISHO_REQUIRED_ORIGINALS,
  };
}

export const kishoAnswerFieldSchema = z.object({
  questionId: text, field: text, officialAnswer: text, explanation: text,
}).passthrough();

export function inspectKishoAnswerFields(questions: ValidatedKishoDraftQuestion[], input: unknown) {
  const rows = Array.isArray(input) ? input : [];
  const issues: { field: string; issue: string }[] = [];
  const originals = new Map(questions.filter((question) => question.type === "descriptive").map((question) => [question.id, question]));
  const counts = new Map<string, number>();
  const seen = new Set<string>();
  let explainedAnswerFields = 0;
  rows.forEach((row, index) => {
    const result = kishoAnswerFieldSchema.safeParse(row);
    if (!result.success) {
      issues.push({ field: String(index), issue: result.error.issues.map((item) => item.path.join(".") + ": " + item.message).join("; ") });
      return;
    }
    const item = result.data;
    const key = `${item.questionId}:${item.field}`;
    if (seen.has(key)) { issues.push({ field: key, issue: "回答欄IDが重複" }); return; }
    seen.add(key);
    if (!originals.has(item.questionId)) { issues.push({ field: key, issue: "対応する実技原問がない" }); return; }
    if (!(KISHO_PRACTICAL_FIELD_IDS[item.questionId] ?? []).includes(item.field)) {
      issues.push({ field: key, issue: "公式答案欄IDにない欄番号" });
      return;
    }
    explainedAnswerFields += 1;
    counts.set(item.questionId, (counts.get(item.questionId) ?? 0) + 1);
  });
  let expectedAnswerFields = 0;
  for (const id of originals.keys()) {
    const required = KISHO_PRACTICAL_ANSWER_FIELDS[id] ?? 0;
    expectedAnswerFields += required;
    if ((counts.get(id) ?? 0) !== required) issues.push({ field: id, issue: `全回答欄の正答と説明が必要（${counts.get(id) ?? 0}/${required}）` });
  }
  return { expectedAnswerFields, storedAnswerFields: rows.length, explainedAnswerFields, issues, complete: issues.length === 0 && explainedAnswerFields === expectedAnswerFields };
}
