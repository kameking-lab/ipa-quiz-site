import { createHash } from "node:crypto";
import { existsSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const data = join(root, "data", "exam-library");
const paperDir = join(data, "papers");
const draftDir = join(data, "choice-explanation-drafts");
const outputFile = join(data, "choice-explanations.json");
const contractFile = join(data, "coverage-contract.json");
const read = (file) => JSON.parse(readFileSync(file, "utf8").replace(/^\uFEFF/u, ""));

const questions = new Map();
const paperQuestions = new Map();
for (const file of readdirSync(paperDir).filter((name) => name.endsWith(".json"))) {
  const paperId = file.slice(0, -5);
  const rows = read(join(paperDir, file));
  paperQuestions.set(paperId, rows);
  for (const row of rows) questions.set(row.id, { ...row, paperId });
}

const errors = [];
const accepted = new Map();
const files = existsSync(draftDir)
  ? readdirSync(draftDir).filter((name) => name.endsWith(".json")).sort()
  : [];

function validGovernmentUrl(value) {
  if (typeof value !== "string" || value !== value.trim()) return false;
  try {
    const url = new URL(value);
    return url.protocol === "https:" && !url.username && !url.password && !url.port &&
      url.hostname.endsWith(".go.jp");
  } catch {
    return false;
  }
}

for (const file of files) {
  const batch = read(join(draftDir, file));
  if (!batch || typeof batch !== "object" || Array.isArray(batch)) {
    errors.push(`${file}: JSON objectではありません`);
    continue;
  }
  for (const [id, value] of Object.entries(batch)) {
    const previousErrorCount = errors.length;
    const question = questions.get(id);
    if (!question || question.answerAuthority !== "official" || question.choiceCount !== 5) {
      errors.push(`${file}/${id}: 公式5択問題ではありません`);
      continue;
    }
    const expectedHash = createHash("sha256").update(question.text).digest("hex");
    if (!value || typeof value !== "object" || Array.isArray(value) || value.sourceHash !== expectedHash || value.correctChoice !== question.correctChoice) {
      errors.push(`${file}/${id}: 原文hashまたは公式正答が不一致`);
      continue;
    }
    if (typeof value.summary !== "string" || value.summary.trim().length < 20) {
      errors.push(`${file}/${id}: summaryが短すぎます`);
    }
    if (typeof value.summary === "string" && /https?:\/\/|\[[^\]]+\]\([^)]+\)|<a\b/iu.test(value.summary)) {
      errors.push(`${file}/${id}: summary内のリンクは禁止です。sourcesへ移してください`);
    }
    if (!Array.isArray(value.choices) || value.choices.length !== 5) {
      errors.push(`${file}/${id}: choicesが5件ではありません`);
    } else {
      const numbers = new Set();
      for (const choice of value.choices) {
        numbers.add(choice?.number);
        const expectedVerdict = choice?.number === question.correctChoice ? "correct" : "incorrect";
        if (choice?.verdict !== expectedVerdict || typeof choice?.reason !== "string" || choice.reason.trim().length < 40) {
          errors.push(`${file}/${id}: 選択肢${choice?.number ?? "?"}の判定または理由が不正`);
        }
        if (typeof choice?.reason === "string" && /https?:\/\/|\[[^\]]+\]\([^)]+\)|<a\b/iu.test(choice.reason)) {
          errors.push(`${file}/${id}: 選択肢${choice?.number ?? "?"}の理由内のリンクは禁止です。sourcesへ移してください`);
        }
      }
      if (numbers.size !== 5 || [...numbers].some((number) => !Number.isInteger(number) || number < 1 || number > 5)) {
        errors.push(`${file}/${id}: 選択肢番号1..5が揃っていません`);
      }
    }
    if (!Array.isArray(value.sources) || value.sources.length === 0 || value.sources.some((source) =>
      typeof source?.title !== "string" || !source.title.trim() || !validGovernmentUrl(source?.url))) {
      errors.push(`${file}/${id}: 政府一次資料sourcesが不正`);
    }
    if (Array.isArray(value.sources) && new Set(value.sources.map((source) => source?.url)).size !== value.sources.length) {
      errors.push(`${file}/${id}: 政府一次資料sourcesのURLが重複`);
    }
    const previous = accepted.get(id);
    if (previous && JSON.stringify(previous) !== JSON.stringify(value)) {
      errors.push(`${id}: 複数draftが競合`);
    }
    if (errors.length === previousErrorCount) accepted.set(id, value);
  }
}

const existing = read(outputFile);
const merged = { ...existing, ...Object.fromEntries(accepted) };
const completedPapers = [];
for (const [paperId, rows] of paperQuestions) {
  const officialChoices = rows.filter((row) => row.answerAuthority === "official" && row.choiceCount === 5);
  // 完了への昇格は今回全問を検証したdraftだけ。既存overlayの存在だけでは昇格しない。
  if (officialChoices.length > 0 && officialChoices.every((row) => accepted.has(row.id))) {
    completedPapers.push(paperId);
  }
}

const result = {
  ok: errors.length === 0,
  draftFiles: files.length,
  accepted: accepted.size,
  merged: Object.keys(merged).length,
  completedPapers: completedPapers.filter((id) => id.startsWith("cskohyo-")).sort(),
  errors,
};

if (errors.length === 0 && process.argv.includes("--write")) {
  writeFileSync(outputFile, `${JSON.stringify(merged, null, 2)}\n`);
  const contract = read(contractFile);
  contract.structuredChoiceExplanations.requiredPaperIds = [...new Set([
    ...contract.structuredChoiceExplanations.requiredPaperIds,
    ...result.completedPapers,
  ])].sort();
  writeFileSync(contractFile, `${JSON.stringify(contract, null, 2)}\n`);
}

console.log(JSON.stringify(result, null, 2));
if (errors.length > 0) process.exitCode = 1;
