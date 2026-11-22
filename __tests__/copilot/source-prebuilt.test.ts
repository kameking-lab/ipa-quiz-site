import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { serialize } from "node:v8";
import { gzipSync } from "node:zlib";
import { afterEach, describe, expect, it } from "vitest";
import { buildGlossaryDoc, buildQuestionDoc, isCorpusQuestion } from "@/lib/copilot/corpus-docs";
import { corpusFingerprint } from "@/lib/copilot/index-artifact";
import { buildIndex, retrieve } from "@/lib/copilot/retriever";
import { openPrebuiltCopilotSource, writePrebuiltCopilotFiles } from "@/lib/copilot/source-prebuilt";
import { GLOSSARY } from "@/data/glossary";
import { getAllQuestions } from "@/lib/questions/load";
import { openQuestionCorpus, QUESTION_CORPUS_DIR, STATIC_CORPUS_FILE } from "@/lib/questions/corpus-files";
import type { ExamCode, Question } from "@/lib/questions/types";

const dirs: string[] = [];
afterEach(() => {
  for (const dir of dirs.splice(0)) rmSync(dir, { recursive: true, force: true });
});

describe("prebuilt copilot source (generated/copilot)", () => {
  // A real slice of the corpus: the same builders the runtime path uses.
  const all = getAllQuestions();
  const questions = [...all.slice(0, 300), ...all.slice(-10)];
  const docs = [
    ...questions.filter(isCorpusQuestion).map(buildQuestionDoc),
    ...GLOSSARY.slice(0, 5).map(buildGlossaryDoc),
  ];
  const index = buildIndex(docs);

  function written() {
    const root = mkdtempSync(join(tmpdir(), "copilot-prebuilt-"));
    dirs.push(root);
    const dir = join(root, QUESTION_CORPUS_DIR);
    mkdirSync(dir, { recursive: true });
    const pools = new Map<ExamCode, Question[]>();
    for (const question of questions) {
      const pool = pools.get(question.exam) ?? [];
      pool.push(question);
      pools.set(question.exam, pool);
    }
    const staticExams = Object.fromEntries([...pools].map(([exam, pool], index) => {
      const file = `${index.toString(16).padStart(64, "0")}.v8.gz`;
      writeFileSync(join(dir, file), gzipSync(serialize(pool)));
      return [exam, { file, count: pool.length }];
    }));
    writeFileSync(join(dir, "manifest.json"), JSON.stringify({
      version: 1, staticExams, lazyExams: staticExams,
      staticCorpus: { file: STATIC_CORPUS_FILE, count: questions.length },
    }));
    const corpus = openQuestionCorpus(root);
    for (const [exam, pool] of pools) expect(corpus.staticExam(exam)).toEqual(pool);
    writePrebuiltCopilotFiles(root, Object.fromEntries(pools), index, corpusFingerprint(docs));
    const source = openPrebuiltCopilotSource(root);
    if (!source) throw new Error("prebuilt source not readable");
    return source;
  }

  it("returns every question exactly as stored, including ones outside the search corpus", () => {
    const source = written();
    expect(source.kind).toBe("prebuilt");
    for (const q of questions) expect(source.getQuestion(q.id)).toEqual(q);
    expect(source.getQuestion("no-such-question")).toBeUndefined();
  });

  it("rebuilds the same documents (text lazily from the question) and the same retrieval", () => {
    const source = written();
    const restored = source.index();
    expect(restored.docs.map((d) => [d.id, d.kind, d.title, d.url, d.meta, d.text]))
      .toEqual(docs.map((d) => [d.id, d.kind, d.title, d.url, d.meta, d.text]));
    expect(restored.docs.every((d, i) => d.textLength === docs[i].text.length)).toBe(true);
    const query = `${questions[0].category} ${questions[0].question.slice(0, 30)}`;
    const ids = (r: ReturnType<typeof retrieve>) => r.map((c) => [c.doc.id, c.score]);
    expect(ids(retrieve(restored, query, 10))).toEqual(ids(retrieve(index, query, 10)));
  });

  it("is unavailable (null) when nothing was written, so callers can fall back", () => {
    const root = mkdtempSync(join(tmpdir(), "copilot-prebuilt-empty-"));
    dirs.push(root);
    expect(openPrebuiltCopilotSource(root)).toBeNull();
  });
});
