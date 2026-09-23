import { createHash } from "node:crypto";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { basename, dirname, join, relative } from "node:path";

import { ALL_QUESTIONS } from "@/data/questions";
import officialSources from "@/data/questions/corrections/official-sources.json";
import type { Question } from "@/lib/questions/types";

const ROOT = process.cwd();
const CACHE_ROOT = join(ROOT, "logs", "ipa-choice-explanations-core", "official-pdfs");
const MANIFEST_PATH = join(ROOT, "docs", "evidence", "ipa-choice-explanations", "source-pdf-manifest.json");
const REQUIRED_YEARS: Record<string, readonly number[]> = {
  ap: [2024, 2025],
  ip: [2023, 2024],
  sg: [2024, 2025],
  fe: [2024, 2025],
};
const sourceByPaper = officialSources as Record<string, { question: string; answer: string }>;

interface PaperSource {
  paper: string;
  officialUrl: string;
  questions: string[];
}

function paperKey(question: Question): string {
  return `${question.exam}/${question.year}/${question.season}/${question.session}`;
}

function cachePath(paper: string): string {
  return join(CACHE_ROOT, `${paper.replaceAll("/", "-")}.pdf`);
}

function isPdf(buffer: Buffer): boolean {
  return buffer.subarray(0, 5).toString("ascii") === "%PDF-";
}

async function download(source: PaperSource): Promise<Buffer> {
  let lastError: unknown;
  for (let attempt = 1; attempt <= 3; attempt += 1) {
    try {
      const response = await fetch(source.officialUrl, { redirect: "follow" });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const buffer = Buffer.from(await response.arrayBuffer());
      if (!isPdf(buffer)) throw new Error("response is not a PDF");
      return buffer;
    } catch (error) {
      lastError = error;
    }
  }
  const legacyPath = join(
    dirname(ROOT),
    "ipa-quiz-site-safety-exams-20260911",
    "tmp",
    "full-audit-20260912",
    "ipa-content",
    "official-pdfs",
    basename(new URL(source.officialUrl).pathname),
  );
  if (existsSync(legacyPath)) {
    const buffer = readFileSync(legacyPath);
    if (isPdf(buffer)) return buffer;
  }
  throw lastError;
}

async function main(): Promise<void> {
  const visualQuestions = ALL_QUESTIONS.filter((question) =>
    REQUIRED_YEARS[question.exam]?.includes(question.year) &&
    question.type === "multiple-choice" &&
    Boolean(question.choices) &&
    question.hasImage,
  );
  const sources = new Map<string, PaperSource>();
  for (const question of visualQuestions) {
    const paper = paperKey(question);
    const officialUrl = sourceByPaper[paper]?.question ?? question.sourcePdfUrl;
    if (!officialUrl) throw new Error(`${question.id}: official question PDF URL is unavailable`);
    const source = sources.get(paper) ?? { paper, officialUrl, questions: [] };
    if (source.officialUrl !== officialUrl) throw new Error(`${paper}: conflicting official PDF URLs`);
    source.questions.push(question.id);
    sources.set(paper, source);
  }

  mkdirSync(CACHE_ROOT, { recursive: true });
  const entries: Record<string, unknown> = {};
  const papers = [...sources.values()];
  let cursor = 0;
  const worker = async () => {
    while (cursor < papers.length) {
      const source = papers[cursor++]!;
      const path = cachePath(source.paper);
      const existing = existsSync(path) ? readFileSync(path) : undefined;
      const buffer = existing && isPdf(existing) ? existing : await download(source);
      if (!existing || !isPdf(existing)) {
        writeFileSync(path, buffer);
      }
      entries[source.paper] = {
        officialUrl: source.officialUrl,
        cacheRelativePath: relative(ROOT, path).replaceAll("\\", "/"),
        sha256: createHash("sha256").update(buffer).digest("hex"),
        byteLength: buffer.length,
        visualQuestions: source.questions.sort(),
      };
      console.log(`[source] ${source.paper} questions=${source.questions.length} bytes=${buffer.length}`);
    }
  };
  await Promise.all(Array.from({ length: Math.min(3, papers.length) }, worker));
  mkdirSync(dirname(MANIFEST_PATH), { recursive: true });
  writeFileSync(MANIFEST_PATH, `${JSON.stringify({
    schemaVersion: 1,
    generatedAt: new Date().toISOString(),
    papers: Object.fromEntries(Object.entries(entries).sort(([left], [right]) => left.localeCompare(right))),
  }, null, 2)}\n`, "utf8");
  console.log(`[manifest] papers=${Object.keys(entries).length} path=${MANIFEST_PATH}`);
}

main().catch((error: unknown) => {
  console.error(error instanceof Error ? error.stack : error);
  process.exitCode = 1;
});
