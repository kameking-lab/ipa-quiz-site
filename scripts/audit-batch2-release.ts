import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { createHash } from "node:crypto";
import { QUESTIONS_BY_EXAM } from "../data/questions";
import { getQuestionsForExam, getRegisteredExamCodes } from "../lib/questions/get-questions";
import { isPracticeReadyQuestion } from "../lib/questions/filter";
import { questionPagePath } from "../lib/seo/question-url";
import type { ExamCode, Question } from "../lib/questions/types";
import { execFileSync } from "node:child_process";

async function main() {
  const out = "reports/int5-20261104";
  mkdirSync(out, { recursive: true });
  const rows = [];
  for (const code of getRegisteredExamCodes()) {
    const eager = QUESTIONS_BY_EXAM[code]!.filter(isPracticeReadyQuestion);
    const lazy = (await getQuestionsForExam(code)).filter(isPracticeReadyQuestion);
    if (JSON.stringify(eager) !== JSON.stringify(lazy)) throw new Error(`Eager/lazy mismatch: ${code}`);
    rows.push({ code, practiceCount: eager.length, firstUrl: eager[0] && questionPagePath(eager[0]) });
  }
  const samples: { code: ExamCode; label: string; question: Question; url: string }[] = [];
  function sample(code: ExamCode, label: string, select: (q: Question) => boolean = () => true) {
    const question = QUESTIONS_BY_EXAM[code]!.find(select);
    if (!question) throw new Error(`Missing browser sample: ${code}/${label}`);
    samples.push({ code, label, question, url: questionPagePath(question) });
  }
  sample("kenchikushi1", "figure-2025", q => q.year === 2025 && !!q.imageUrls?.length);
  sample("kenchikushi1", "law-2026", q => q.year === 2026 && q.session === "houki");
  sample("khk-kagaku", "technical-reservation", q => q.year === 2024 && q.session === "khk-cz" && q.qNumber === 20);
  sample("khk-kagaku", "self-assessment", q => q.year === 2025 && q.type === "descriptive" && !!q.imageUrls?.length);
  sample("sekou-1kenchiku", "alternate-answer", q => q.year === 2025 && q.qNumber === 57);
  sample("sekou-1kenchiku", "figure-note", q => q.year === 2026 && q.qNumber === 51);
  sample("sekou-1kenchiku", "insulation-fix", q => q.year === 2025 && q.qNumber === 31);
  sample("khk-kikai-kou", "answer-figure", q => q.type === "descriptive" && !!q.answerImageUrls?.length);
  sample("khk-kikai-otsu", "ordinary");
  sample("khk-reito-1", "self-assessment", q => q.type === "descriptive");
  sample("khk-reito-2", "ordinary");
  sample("khk-reito-3", "ordinary");
  const receipt = JSON.parse(readFileSync(`${out}/projection-receipt.json`, "utf8")) as {
    assets: Record<string, { url: string; sha256: string }>;
  };
  const images = Object.values(receipt.assets).map(asset => ({ url: asset.url, sha256: asset.sha256 }));
  const chemistryAssets = JSON.parse(readFileSync("data/questions/khk-kagaku/image-assets.json", "utf8")) as string[];
  for (const file of chemistryAssets) {
    const bytes = readFileSync(`data/exam-library/source-packs/khk-kagaku/${file}`);
    images.push({ url: `/api/qualification-assets/khk-kagaku/${file.split("/").at(-1)}`, sha256: createHash("sha256").update(bytes).digest("hex") });
  }
  const result = { sourceHead: execFileSync("git", ["rev-parse", "HEAD"], { encoding: "utf8" }).trim(), rows, samples, images };
  writeFileSync(`${out}/count-audit.json`, JSON.stringify(result, null, 2) + "\n");
  console.log(JSON.stringify({ exams: rows.length, questions: rows.reduce((n, row) => n + row.practiceCount, 0), samples: samples.length, images: images.length }));
}
main().catch(error => { console.error(error); process.exitCode = 1; });
