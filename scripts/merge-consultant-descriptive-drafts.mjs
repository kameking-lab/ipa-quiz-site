import { existsSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const data = join(root, "data", "exam-library");
const draftDir = join(data, "explanation-drafts");
const read = (file) => JSON.parse(readFileSync(file, "utf8").replace(/^\uFEFF/u, ""));
const explanationsFile = join(data, "explanations.json");
const questions = new Map(readdirSync(join(data, "papers")).filter((name) => name.endsWith(".json"))
  .flatMap((name) => read(join(data, "papers", name))).map((question) => [question.id, question]));
const files = existsSync(draftDir) ? readdirSync(draftDir).filter((name) => name.endsWith(".json")).sort() : [];
const accepted = new Map();
const errors = [];
const urlPattern = /https:\/\/[^\s)\]}>]+/gu;

function governmentUrl(value) {
  if (typeof value !== "string" || value !== value.trim()) return false;
  try {
    const url = new URL(value.replace(/[。、，．]+$/u, ""));
    return url.protocol === "https:" && url.hostname.endsWith(".go.jp");
  } catch {
    return false;
  }
}

for (const file of files) {
  const batch = read(join(draftDir, file));
  for (const [id, text] of Object.entries(batch)) {
    const question = questions.get(id);
    if (!question || question.answerAuthority !== "descriptive") errors.push(`${file}/${id}: 記述式問題ではありません`);
    if (typeof text !== "string" || text.trim().length < 120) errors.push(`${file}/${id}: 模範解答が短すぎます`);
    const urls = typeof text === "string" ? text.match(urlPattern) ?? [] : [];
    if (urls.length === 0) errors.push(`${file}/${id}: 政府一次資料への根拠リンクがありません`);
    if (urls.some((url) => !governmentUrl(url))) errors.push(`${file}/${id}: 政府一次資料以外のURLを含みます`);
    const previous = accepted.get(id);
    if (previous && previous !== text) errors.push(`${id}: 複数draftが競合`);
    accepted.set(id, text);
  }
}

const explanations = read(explanationsFile);
const merged = { ...explanations, ...Object.fromEntries(accepted) };
const result = { ok: errors.length === 0, draftFiles: files.length, accepted: accepted.size, merged: Object.keys(merged).length, errors };
if (errors.length === 0 && process.argv.includes("--write")) writeFileSync(explanationsFile, `${JSON.stringify(merged, null, 2)}\n`);
console.log(JSON.stringify(result, null, 2));
if (errors.length > 0) process.exitCode = 1;
