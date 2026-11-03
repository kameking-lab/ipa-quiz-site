import "server-only";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import manifest from "@/reports/LQ3-20261104/adoption-manifest.json";
import { PE_FIRST_CATALOG } from "./pe-first-catalog";
import type { ExamQuestion } from "@/lib/exam-library-model";

const cache = new Map<string, readonly ExamQuestion[] | null>();

/** Only hash-bound, already reviewed manuscripts in the finite catalog may load. */
export function loadPeFirstPaper(id: string): readonly ExamQuestion[] | null {
  if (!PE_FIRST_CATALOG.some(entry => entry.id === id)) return null;
  if (cache.has(id)) return cache.get(id) ?? null;
  let questions: readonly ExamQuestion[] | null = null;
  try {
    const raw = readFileSync(join(process.cwd(), "data/exam-library/pe-first", `${id}.json`));
    const pin = manifest.find(item => item.paperId === id);
    if (pin && createHash("sha256").update(raw).digest("hex") === pin.normalizedSha256) {
      questions = JSON.parse(raw.toString("utf8")) as ExamQuestion[];
    }
  } catch { /* An absent or changed packet must not become a different exam. */ }
  cache.set(id, questions);
  return questions;
}
