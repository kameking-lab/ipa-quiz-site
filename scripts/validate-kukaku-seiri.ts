import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { KUKAKU_SEIRI_STAGING } from "../data/qualification-staging/kukaku-seiri";
import manifest from "../data/qualification-staging/kukaku-seiri/source-manifest.json";
import answerKeys from "../data/qualification-staging/kukaku-seiri/official-answers.json";
import assets from "../data/qualification-staging/kukaku-seiri/assets.json";
import reviewAssets from "../data/qualification-staging/kukaku-seiri/source-review-assets.json";
import drafts from "../data/qualification-staging/kukaku-seiri/explanations.json";
import referenceSources from "../data/qualification-staging/kukaku-seiri/reference-sources.json";
import { QUALIFICATION_CATALOG } from "../lib/qualifications/catalog";

const KEYS = ["ア", "イ", "ウ", "エ"];
const ROOT = resolve(process.cwd(), "data/qualification-staging/kukaku-seiri");
const fail = (message: string): never => { throw new Error(`[kukaku-seiri] ${message}`); };
const compact = (value: string) => value.replace(/\s+/g, "");
const hash = (path: string) => createHash("sha256").update(readFileSync(path)).digest("hex");

/** Validates the acquired edition; explicitly does NOT certify two-round completion. */
export function validateKukakuSeiri(exams: readonly string[] = []): number {
  if (exams.length && !exams.includes("kukaku-seiri")) return 0;
  const staging = KUKAKU_SEIRI_STAGING;
  const rows = staging.questions;
  const entry = QUALIFICATION_CATALOG.find(q => q.slug === staging.slug);
  if (staging.publicAllowed !== false || entry?.status !== "terms-review-required" || entry.examCode !== undefined) fail("公開ゲート不正");
  if (manifest.publicAllowed !== false || manifest.twoRoundComplete !== false || manifest.expectedQuestionCount !== 80 || manifest.ingestedQuestionCount !== 40) fail("部分収録状態不正");
  if (manifest.latestExamRounds.map(r => `${r.year}:${r.ingestedQuestions}`).join() !== "2026:40,2025:0") fail("年度別件数不正");
  if (!manifest.requests.some(r => r.status === 404 && r.url.endsWith("20250908t_mondaia.pdf"))) fail("2025年取得不能記録欠落");
  if (rows.length !== 40 || new Set(rows.map(q => q.id)).size !== 40) fail("40原問・一意IDが必要");
  if (referenceSources.some(r => r.status !== 200 || !/^[a-f0-9]{64}$/.test(r.sha256))) fail("解説参照先の取得記録不正");
  for (const year of ["2026", "2025"] as const) {
    const official = answerKeys[year];
    const request = manifest.requests.find(r => r.url === official.sourceUrl);
    if (official.answers.length !== 40 || official.answers.some(a => !Number.isInteger(a) || a < 1 || a > 4) || request?.status !== 200) fail(`${year}: 公式正答不正`);
  }
  for (const [index, q] of rows.entries()) {
    const id = q.id;
    if (q.exam !== "kukaku-seiri" || q.year !== 2026 || q.qNumber !== index + 1 || q.id !== `kukaku-seiri-2026-annual-gakka-q${index + 1}` || q.session !== "gakka" || q.season !== "annual" || q.type !== "multiple-choice") fail(`${id}: 識別子・順序不正`);
    if (q.publicAllowed !== false || q.needsReview !== true || q.lawReferenceDate !== null || q.lawReferenceDateStatus !== "not-specified-in-official-materials") fail(`${id}: 公開状態・基準日不正`);
    if (q.question.trim().length < 15 || q.originalText.trim().length < 30 || /[\uFFFD\uE000-\uF8FF]|\?{3,}|\(cid:/u.test(JSON.stringify(q))) fail(`${id}: 本文欠落・文字化け`);
    if (Object.keys(q.choices).join() !== KEYS.join() || Object.keys(q.choiceExplanations).join() !== KEYS.join()) fail(`${id}: 4肢及び全肢解説が必要`);
    for (const key of KEYS as (keyof typeof q.choices)[]) {
      if (!q.choices[key].trim() || q.choiceExplanations[key].trim().length < 30) fail(`${id}/${key}: 選択肢・理由不足`);
    }
    const officialNumber = answerKeys["2026"].answers[index];
    if (q.officialAnswerNumber !== officialNumber || q.answer !== KEYS[officialNumber - 1] || q.sourceAnswerUrl !== answerKeys["2026"].sourceUrl) fail(`${id}: 公式正答不一致`);
    if (q.category !== ["土地区画整理事業総論", "換地計画", "土地評価", "法規"][Math.floor(index / 10)]) fail(`${id}: 科目不一致`);
    if (!q.sharedContext.includes("第136条の3") || !q.sharedContext.includes("第32条") || !q.lawNote.includes("出題時点")) fail(`${id}: 共通指示欠落`);
    if (!q.sourceAttribution.includes(`No.${q.qNumber}`) || !manifest.requests.some(r => r.url === q.sourcePdfUrl && r.status === 200)) fail(`${id}: 原本出典不明`);
    const image = assets.find(a => a.questionNumber === q.qNumber);
    if (!image || image.pdfUrl !== q.sourcePdfUrl || image.pdfPage !== q.sourcePages[0] || q.sourceImages.join() !== `assets/common-instructions-2026.png,${image.path}`) fail(`${id}: 原本領域欠落`);
    if (q.qNumber !== 24 && compact(q.question + Object.values(q.choices).join("")) !== compact(q.originalText.replace(/\(\)[1-4]/g, ""))) fail(`${id}: 原文の欠落・改変`);
    const draft = drafts[String(q.qNumber) as keyof typeof drafts];
    if (JSON.stringify(q.choiceExplanations) !== JSON.stringify(draft.choices) || q.explanation !== draft.summary || q.explanation.length < 50 || q.explanationCoverage !== "all-choices") fail(`${id}: 解説草稿と不一致`);
    if (!q.explanationReferences.length || q.explanationReferences.some(r => !r.locator || new URL(r.url).protocol !== "https:" || !referenceSources.some(s => s.url === r.url))) fail(`${id}: 解説参照先欠落`);
  }
  if (assets.length !== 40 || reviewAssets.length !== 4) fail("原本画像件数不正");
  for (const asset of [...assets, ...reviewAssets]) {
    if (!/^assets\/[a-z0-9-]+\.png$/.test(asset.path) || hash(resolve(ROOT, asset.path)) !== asset.sha256) fail(`${asset.path}: ハッシュ不一致`);
    if (readFileSync(resolve(ROOT, asset.path)).subarray(0, 8).toString("hex") !== "89504e470d0a1a0a") fail(`${asset.path}: PNGでない`);
    if (asset.pdfPage < 1 || asset.clipRectPoints[0] < 0 || asset.clipRectPoints[2] <= asset.clipRectPoints[0] || asset.clipRectPoints[3] <= asset.clipRectPoints[1]) fail(`${asset.path}: 切出し範囲不正`);
  }
  console.log("[kukaku-seiri] acquired edition PASS: 2026=40原問・160肢解説・44原本画像。2025=正答のみ、40原問未取得。twoRoundComplete=false/publicAllowed=false");
  return rows.length;
}
