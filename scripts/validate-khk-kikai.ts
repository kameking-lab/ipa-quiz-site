import { createHash } from "node:crypto";
import { readFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";
import { KHK_KIKAI_STAGING } from "../data/qualification-staging/khk-kikai";
import sources from "../data/qualification-staging/khk-kikai/official-sources.json";
import answerKeys from "../data/qualification-staging/khk-kikai/official-answers.json";
import figures from "../data/qualification-staging/khk-kikai/figures.json";
import { QUALIFICATION_CATALOG } from "../lib/qualifications/catalog";

const ROOT = resolve(process.cwd(), "data/qualification-staging/khk-kikai");
type Candidate = (typeof KHK_KIKAI_STAGING)[number]["questions"][number];
const KEYS = ["ア", "イ", "ウ", "エ", "オ"];
const fail = (message: string): never => { throw new Error(`[khk-kikai] ${message}`); };
const nonempty = (value: unknown): value is string => typeof value === "string" && value.trim().length > 0;
const asRecord = (value: unknown): Record<string, unknown> => value as Record<string, unknown>;

/** Validate private candidates separately from the live Question/ExamCode registries. */
export function validateKhkKikai(exams: readonly string[] = []): number {
  if (exams.length && !exams.some(exam => exam.startsWith("khk-kikai"))) return 0;
  const sourceUrls = new Map(sources.map(source => [source.url, source]));
  if (sources.length !== 16 || sourceUrls.size !== 16) fail("公式PDFは問題12冊・択一正答2冊・記述解答例2冊が必要");
  for (const source of sources) {
    const bytes = readFileSync(resolve(ROOT, source.file));
    if (bytes.subarray(0, 5).toString() !== "%PDF-") fail(`${source.file}: PDFでない`);
    if (createHash("sha256").update(bytes).digest("hex") !== source.sha256) fail(`${source.file}: SHA256不一致`);
    if (!source.url.startsWith("https://www.khk.or.jp/Portals/0/khk/exam/")) fail(`${source.file}: 非公式URL`);
  }
  let total = 0;
  const ids = new Set<string>();
  for (const qualification of KHK_KIKAI_STAGING) {
    if (exams.length && !exams.includes("khk-kikai") && !exams.includes(qualification.slug)) continue;
    const catalog = QUALIFICATION_CATALOG.find(item => item.slug === qualification.slug);
    if (catalog?.status !== "ready-to-ingest" || catalog.examCode || qualification.publicAllowed !== false) fail(`${qualification.slug}: 未公開設定の破損`);
    const isKou = qualification.slug.endsWith("kou");
    if (qualification.questions.length !== (isKou ? 80 : 100)) fail(`${qualification.slug}: 件数不一致`);
    for (const year of [2024, 2025]) {
      for (const [session, expected] of [["hoki", 20], ["hoan", 15], ["gakushiki", isKou ? 5 : 15]] as const) {
        const rows = (qualification.questions as Candidate[]).filter(q => q.year === year && q.session === session);
        if (rows.map(q => q.qNumber).join() !== Array.from({ length: expected }, (_, i) => i + 1).join()) fail(`${qualification.slug}/${year}/${session}: 欠番・重複・並び順`);
      }
    }
    for (const item of qualification.questions) {
      const q = asRecord(item);
      const id = String(q.id);
      if (ids.has(id)) fail(`${id}: ID重複`);
      ids.add(id);
      if (id !== `${qualification.slug}-${q.year}-annual-${q.session}-q${q.qNumber}` || q.exam !== qualification.slug) fail(`${id}: 識別子不一致`);
      if (q.publicAllowed !== false || q.needsReview !== true) fail(`${id}: 公開不可・独立レビュー待ちを維持すること`);
      for (const field of ["question", "explanation", "sourceAttribution"]) {
        if (!nonempty(q[field])) fail(`${id}: ${field}欠落`);
      }
      if (/[\uE000-\uF8FF\uFFFD]/u.test(String(q.question))) fail(`${id}: 未解決の文字化け`);
      const source = sourceUrls.get(String(q.sourcePdfUrl));
      if (!source || !sourceUrls.has(String(q.sourceAnswerUrl))) fail(`${id}: 出典不明`);
      if (!Array.isArray(q.sourcePages) || !q.sourcePages.length || q.sourcePages.some(page => !Number.isInteger(page) || page < 1 || page > (source?.pages ?? 0))) fail(`${id}: 原本ページ不正`);
      if (q.session === "hoki") {
        if (q.lawReferenceDate !== `${q.year}-04-01` || !String(q.lawNote).includes("出題時点")) fail(`${id}: 法令基準日欠落`);
        if (Number(q.qNumber) >= 8 && (!nonempty(q.sharedContext) || !String(q.question).includes(String(q.sharedContext)))) fail(`${id}: 共通設例欠落`);
      }
      if (q.type === "multiple-choice") {
        const choices = asRecord(q.choices);
        const explanations = asRecord(q.choiceExplanations);
        if (Object.keys(choices).join() !== KEYS.join() || Object.keys(explanations).join() !== KEYS.join()) fail(`${id}: 5肢・全肢解説が必要`);
        for (const key of KEYS) {
          if (!nonempty(choices[key]) || !nonempty(explanations[key]) || String(explanations[key]).length < 20) fail(`${id}/${key}: 本文・理由不足`);
        }
        const code = `${isKou ? "E" : "F"}${q.session === "hoki" ? "X" : q.session === "hoan" ? "Y" : "Z"}`;
        const official = answerKeys[`${q.year}-${code}` as keyof typeof answerKeys];
        const number = official?.answers[Number(q.qNumber) - 1];
        if (q.officialAnswerNumber !== number || q.answer !== KEYS[number - 1] || q.sourceAnswerUrl !== official.sourcePdfUrl) fail(`${id}: 公式正答不一致`);
        if (!q.isCalculation) {
          const labels = [...String(choices[String(q.answer)]).replace(/[、\s]/g, "")];
          const statements = asRecord(q.statementExplanations);
          for (const [label, explanation] of Object.entries(statements)) {
            if (!String(explanation).startsWith(labels.includes(label) ? "正しい。" : "誤り。")) fail(`${id}/${label}: 正答と正誤解説の矛盾`);
          }
        }
      } else if (q.type === "descriptive") {
        if (!isKou || q.session !== "gakushiki" || q.officialAnswerKind !== "example" || !nonempty(q.modelAnswer) || !nonempty(q.scoringCriteria)) fail(`${id}: 記述式解答例欠落`);
        if (q.answer !== q.modelAnswer || "choices" in q) fail(`${id}: 記述式を架空の択一問題に変換しない`);
      } else fail(`${id}: 不正な形式`);
      const imageUrls = q.imageUrls as string[] | undefined;
      if (q.hasImage !== Boolean(imageUrls?.length)) fail(`${id}: hasImage不一致`);
      for (const file of [...(imageUrls ?? []), ...((q.answerImageUrls as string[] | undefined) ?? [])]) {
        if (!file.startsWith("figures/") || !existsSync(resolve(ROOT, file))) fail(`${id}: 図欠落 ${file}`);
        if (!figures.some(figure => figure.file === file && figure.questionId === id)) fail(`${id}: 図の原典・用途記録欠落`);
      }
      total++;
    }
  }
  console.log(`[khk-kikai] 未公開候補 ${total}問・公式正答170問・記述式10問・公式PDF16冊を検証`);
  return total;
}
