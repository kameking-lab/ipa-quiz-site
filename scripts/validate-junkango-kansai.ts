import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";
import {
  JUNKANGO_KANSAI_STAGED_QUESTIONS,
  JunkangoStagedQuestionSchema,
  PRINTED_CHOICES,
  type JunkangoStagedQuestion,
} from "../data/qualification-staging/junkango-kansai";
import manifest from "../data/qualification-staging/junkango-kansai/manifest.json";
import officialAnswers from "../data/qualification-staging/junkango-kansai/official-answers.json";
import assets from "../data/qualification-staging/junkango-kansai/source-assets.json";
import receipts from "../data/qualification-staging/junkango-kansai/source-receipts.json";

const sha = (value: string | Buffer) => createHash("sha256").update(value).digest("hex");

/** Match the extractor's UTF-8 JSON serialization, including its insignificant spaces. */
export function junkangoSourceTextHash(row: Pick<JunkangoStagedQuestion, "question" | "choices">): string {
  const choices = PRINTED_CHOICES.map(key => `${JSON.stringify(key)}: ${JSON.stringify(row.choices[key])}`).join(", ");
  return sha(`[${JSON.stringify(row.question)}, {${choices}}]`);
}

export function validateJunkangoKansai(rows: readonly JunkangoStagedQuestion[] = JUNKANGO_KANSAI_STAGED_QUESTIONS) {
  const check = (condition: unknown, message: string): void => { if (!condition) throw new Error(message); };
  check(manifest.publicAllowed === false && manifest.publicationStatus === "staging", "公開ゲート不一致");
  check(rows.length === 300 && new Set(rows.map(q => q.id)).size === 300, "300原問またはID一意性が不正");
  check(assets.length === 300 && new Set(assets.map(a => a.path)).size === 300, "300原本領域が必要");
  check(receipts.length === 4 && receipts.every(r => r.method === "GET" && r.httpStatus === 200 && r.bytes > 80000 && /^[a-f0-9]{64}$/.test(r.sha256)), "公式GET受領記録不正");
  let choices = 0;
  for (const year of [2026, 2025] as const) {
    const round = rows.filter(q => q.year === year);
    check(round.length === 150, `${year}: 150原問が必要`);
    for (const [index, q] of round.entries()) {
      JunkangoStagedQuestionSchema.parse(q);
      check(q.qNumber === index + 1 && q.id === `junkango-kansai-${year}-q${q.qNumber}`, `${q.id}: 問番号不正`);
      check(q.fiscalYear === year - 1 && q.examDate === `${year}-02-0${year === 2026 ? 1 : 2}`, `${q.id}: 年度・実施日不正`);
      check(q.officialAnswerNumber === officialAnswers[year][index], `${q.id}: 公式正答不一致`);
      const allCorrect = year === 2026 && q.qNumber === 6;
      const alternatives = year === 2026 && q.qNumber === 139;
      const expected = allCorrect ? [] : alternatives ? [2, 4] : [Number(q.officialAnswerNumber)];
      check(q.scoring === (allCorrect ? "all-correct" : alternatives ? "accepted-alternatives" : "single-choice"), `${q.id}: 採点種別不正`);
      check(JSON.stringify(q.acceptedAnswerNumbers) === JSON.stringify(expected), `${q.id}: 許容正答不正`);
      if (allCorrect || alternatives) check(q.scoringNotice && q.scoringNoticeUrl?.endsWith("/9022.html"), `${q.id}: 特例の公式根拠が必要`);
      check(q.sourceTextSha256 === junkangoSourceTextHash(q), `${q.id}: 原文ハッシュ不一致`);
      const questionReceipt = receipts.find(r => r.year === year && r.role === "questions")!;
      const answerReceipt = receipts.find(r => r.year === year && r.role === "answers")!;
      check(q.sourcePdfUrl === questionReceipt.url && q.sourceAnswerUrl === answerReceipt.url, `${q.id}: 出典URL不一致`);
      check(q.sourceAttribution?.includes(`問${q.qNumber}`), `${q.id}: 問別出典なし`);
      const asset = assets.find(a => a.year === year && a.qNumber === q.qNumber)!;
      check(asset && q.sourceImages[0] === asset.path && q.sourcePage === asset.sourcePage, `${q.id}: 原本画像の対応不正`);
      check(asset.width >= 1000 && asset.height >= 100 && asset.crop[3] > asset.crop[1], `${q.id}: 画像寸法不正`);
      const bytes = readFileSync(resolve(asset.path));
      check(sha(bytes) === asset.sha256 && bytes.toString("ascii", 8, 12) === "WEBP", `${q.id}: 原本画像のハッシュまたは形式不正`);
      for (const key of PRINTED_CHOICES) {
        choices++;
        check(q.explanation.includes(q.choiceExplanations[key]), `${q.id}: 総解説と肢解説の不一致`);
      }
    }
  }
  return { questions: rows.length, choices, images: assets.length, publicAllowed: false };
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  console.log(JSON.stringify(validateJunkangoKansai()));
}
