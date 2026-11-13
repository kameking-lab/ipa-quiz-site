import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import type { Question } from "@/lib/questions/types";
import data from "@/data/qualification-staging/biru-kan/2026/am-questions.json";
import keys from "@/data/qualification-staging/biru-kan/2026/official-answer-keys.json";
import manifest from "@/data/qualification-staging/biru-kan/2026/manifest.json";
import review from "@/data/qualification-staging/biru-kan/2026/am-review.json";
import afternoon from "@/data/qualification-staging/biru-kan/2026/pm-questions.json";
import afternoonReview from "@/data/qualification-staging/biru-kan/2026/pm-review.json";

export const BIRU_KAN_2026_AM_STAGING = data as Question[];
export const BIRU_KAN_2026_PM_STAGING = afternoon as Question[];
const choiceKeys = ["ア", "イ", "ウ", "エ", "オ"];
const root = resolve("data/qualification-staging/biru-kan/2026");

export function validateBiruKan2026Am(): string[] {
  const errors: string[] = [];
  const check = (ok: boolean, message: string) => { if (!ok) errors.push(message); };
  check(manifest.publicAllowed === false, "2026 corpus must remain unpublished pending integration");
  check(data.length === 90 && manifest.amQuestionCount === 90 && review.questions.length === 90, "expected 90 morning originals and review records");
  check(new Set(data.map(q => q.id)).size === 90, "duplicate question ID");
  check(keys.am.length === 90 && manifest.pmRange.join() === "91,180", "answer scope or afternoon numbering differs");
  check(data.flatMap(q => Object.values(q.choiceExplanations)).length === 450, "expected 450 choice explanations");
  for (const [i, q] of BIRU_KAN_2026_AM_STAGING.entries()) {
    const n = i + 1;
    check(q.qNumber === n && q.id === `biru-kan-2026-am-${String(n).padStart(3, "0")}`, `${q.id}: incorrect source number or ID`);
    check(q.exam === "biru-kan" && q.year === 2026 && q.season === "annual" && q.session === "gakka" && q.category === "am", `${q.id}: incorrect exam scope`);
    check(q.publicAllowed === false, `${q.id}: must remain unpublished`);
    check(q.officialAnswerNumber === keys.am[i] && q.answer === choiceKeys[keys.am[i] - 1], `${q.id}: official answer changed`);
    check(Object.keys(q.choices!).join() === choiceKeys.join() && Object.keys(q.choiceExplanations!).join() === choiceKeys.join(), `${q.id}: incomplete five-choice content`);
    check(q.originalContent?.body === q.question && JSON.stringify(q.originalContent.choices) === JSON.stringify(q.choices), `${q.id}: source transcription differs`);
    check(q.sourcePdfUrl.endsWith("/2026/2026shiken_am.pdf") && q.sourceAnswerUrl === keys.sourceUrl, `${q.id}: incorrect official source`);
    check(q.explanationCoverage === "full" && Object.values(q.choiceExplanations!).every(x => typeof x === "string" && x.length >= 15), `${q.id}: incomplete rationale`);
    const record = review.questions.find(r => r.id === q.id);
    const digest = createHash("sha256").update(JSON.stringify([q.originalContent, q.choices])).digest("hex");
    check(record?.sourceContentSha256 === digest, `${q.id}: reviewed source content changed`);
    check(record?.transcriptionVerified === true && record.officialAnswerVerified === true && record.explanationReviewed === true, `${q.id}: incomplete source review`);
    check(record !== undefined && record.sourcePage >= 4 && record.sourcePage <= 31, `${q.id}: invalid PDF page`);
    check(q.hasImage === [46, 73].includes(n) && q.imageUrls!.length === Number(q.hasImage) && q.imageAltTexts!.length === q.imageUrls!.length, `${q.id}: missing source figure`);
  }
  check(data.filter(q => q.originalContent.tables).length === manifest.amTableCount, "morning source table count differs");
  check(data.filter(q => q.isCalculation).map(q => q.qNumber).join() === "45,46,50,61,84,85,90", "calculation coverage differs");
  check(review.assets.length === 2 && manifest.figureCount === 2, "expected two original figures");
  for (const asset of review.assets) {
    const bytes = readFileSync(resolve(root, asset.file));
    check(bytes.subarray(0, 8).toString("hex") === "89504e470d0a1a0a", `${asset.file}: invalid PNG`);
    check(createHash("sha256").update(bytes).digest("hex") === asset.sha256, `${asset.file}: reviewed crop changed`);
    const q = data.find(q => q.qNumber === asset.qNumber)!;
    check(q.imageUrls[0] === `data/qualification-staging/biru-kan/2026/${asset.file}`, `${q.id}: incorrect private image path`);
  }
  return errors;
}

export function validateBiruKan2026Pm(): string[] {
  const errors: string[] = [];
  const check = (ok: boolean, message: string) => { if (!ok) errors.push(message); };
  check(manifest.publicAllowed === false, "2026 corpus must remain unpublished pending integration");
  check(afternoon.length === 90 && manifest.pmQuestionCount === 90 && afternoonReview.questions.length === 90, "expected 90 afternoon originals and review records");
  check(keys.pm.length === 90 && manifest.pmRange.join() === "91,180", "afternoon answer scope differs");
  check(new Set([...data, ...afternoon].map(q => q.id)).size === 180, "full exam contains duplicate IDs");
  check(new Set([...data, ...afternoon].map(q => q.qNumber)).size === 180, "full exam contains duplicate source numbers");
  check(manifest.storedQuestionCount === data.length + afternoon.length && manifest.storedQuestionCount === 180, "full-exam count differs");
  check(manifest.choiceExplanationCount === [...data, ...afternoon].flatMap(q => Object.values(q.choiceExplanations)).length, "full-exam explanation count differs");
  check(manifest.tableCount === manifest.amTableCount + manifest.pmTableCount, "full-exam table count differs");
  check(manifest.calculationCount === manifest.amCalculationCount + manifest.pmCalculationCount, "full-exam calculation count differs");
  for (const [i, q] of BIRU_KAN_2026_PM_STAGING.entries()) {
    const n = i + 91;
    check(q.qNumber === n && q.id === `biru-kan-2026-pm-${String(n).padStart(3, "0")}`, `${q.id}: incorrect source number or ID`);
    check(q.exam === "biru-kan" && q.year === 2026 && q.season === "annual" && q.session === "gakka" && q.category === "pm", `${q.id}: incorrect exam scope`);
    check(q.publicAllowed === false, `${q.id}: must remain unpublished`);
    check(q.officialAnswerNumber === keys.pm[i] && q.answer === choiceKeys[keys.pm[i] - 1], `${q.id}: official answer changed`);
    check(Object.keys(q.choices!).join() === choiceKeys.join() && Object.keys(q.choiceExplanations!).join() === choiceKeys.join(), `${q.id}: incomplete five-choice content`);
    check(q.originalContent?.body === q.question && JSON.stringify(q.originalContent.choices) === JSON.stringify(q.choices), `${q.id}: source transcription differs`);
    check(q.sourcePdfUrl.endsWith("/2026/2026shiken_pm.pdf") && q.sourceAnswerUrl === keys.sourceUrl, `${q.id}: incorrect official source`);
    check(q.explanationCoverage === "full" && Object.values(q.choiceExplanations!).every(x => typeof x === "string" && x.length >= 15), `${q.id}: incomplete rationale`);
    const record = afternoonReview.questions.find(r => r.id === q.id);
    const digest = createHash("sha256").update(JSON.stringify([q.originalContent, q.choices])).digest("hex");
    check(record?.sourceContentSha256 === digest, `${q.id}: reviewed source content changed`);
    check(record?.transcriptionVerified === true && record.officialAnswerVerified === true && record.explanationReviewed === true, `${q.id}: incomplete source review`);
    check(record !== undefined && record.sourcePage >= 4 && record.sourcePage <= 30, `${q.id}: invalid PDF page`);
    check(!q.hasImage && q.imageUrls!.length === 0 && q.imageAltTexts!.length === 0, `${q.id}: unexpected source figure`);
  }
  check(afternoon.filter(q => q.originalContent.tables).length === manifest.pmTableCount && manifest.pmTableCount === 17, "afternoon source table count differs");
  check(afternoon.filter(q => q.isCalculation).map(q => q.qNumber).join() === "118,157", "afternoon calculation coverage differs");
  check(afternoonReview.assets.length === 0, "afternoon contains no source figures");
  return errors;
}
