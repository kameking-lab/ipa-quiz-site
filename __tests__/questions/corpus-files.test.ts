// @vitest-environment node
import { createHash } from "node:crypto";
import { mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";
import { gzipSync } from "node:zlib";
import { serialize } from "node:v8";
import { afterEach, describe, expect, it, vi } from "vitest";
import { openQuestionCorpus, QUESTION_CORPUS_DIR, type QuestionCorpusManifest } from "@/lib/questions/corpus-files";
import type { Question } from "@/lib/questions/types";

const roots: string[] = [];
afterEach(() => {
  vi.doUnmock("@/lib/questions/corpus-files");
  vi.resetModules();
  for (const root of roots.splice(0)) rmSync(root, { recursive: true, force: true });
});
function fixture() {
  mkdirSync(resolve(".cache"), { recursive: true });
  const root = mkdtempSync(resolve(".cache/question-corpus-test-"));
  roots.push(root);
  const dir = join(root, QUESTION_CORPUS_DIR);
  mkdirSync(dir, { recursive: true });
  const question = JSON.parse(readFileSync(resolve("data/questions/denken3/launch.json"), "utf8"))[0] as Question;
  function entry(rows: Question[], encoding = "json") {
    const bytes = encoding === "v8" ? serialize(rows) : Buffer.from(JSON.stringify(rows));
    const file = `${createHash("sha256").update(bytes).digest("hex")}.${encoding}.gz`;
    writeFileSync(join(dir, file), gzipSync(bytes));
    return { file, count: rows.length };
  }
  const first = entry([question]);
  const second = entry([{ ...question, id: "second" }, question]);
  const manifest: QuestionCorpusManifest = {
    version: 1,
    staticExams: { "haiden-seigyo3": first, denken3: second },
    lazyExams: { denken3: first, "haiden-seigyo3": second },
  };
  const save = () => writeFileSync(join(dir, "manifest.json"), JSON.stringify(manifest));
  save();
  return { root, dir, first, question, manifest, save, entry };
}

describe("prebuilt question corpus", () => {
  it("restores the binary format without losing optional undefined properties", () => {
    const f = fixture();
    const rows = [{ ...f.question, explanationSections: undefined }];
    f.manifest.lazyExams.denken3 = f.entry(rows, "v8");
    f.save();
    expect(openQuestionCorpus(f.root).lazyExam("denken3")).toStrictEqual(rows);
  });
  it("retains separate static/lazy pools and loads only requested files once", () => {
    const f = fixture();
    const corpus = openQuestionCorpus(f.root);
    const rows = corpus.staticExam("haiden-seigyo3");
    expect(rows).toEqual([f.question]);
    rmSync(join(f.dir, f.first.file));
    expect(corpus.lazyExam("denken3")).toBe(rows);
    expect(corpus.lazyCount("denken3")).toBe(1);
    expect(corpus.staticExam("denken3").map(q => q.id)).toEqual(["second", f.question.id]);
    expect(corpus.lazyExam("ip")).toEqual([]);
  });

  it("preserves registry aliases, lazy ordering, counts and defensive list copies", async () => {
    const f = fixture();
    vi.doMock("@/lib/questions/corpus-files", () => ({ getQuestionCorpus: () => openQuestionCorpus(f.root) }));
    const registry = await import("@/lib/questions/runtime-registry");
    const loaders = await import("@/lib/questions/runtime-loaders");
    expect(Object.keys(registry.QUESTIONS_BY_EXAM)).toEqual(["haiden-seigyo3", "denken3"]);
    expect(registry.QUESTIONS_BY_EXAM["haidenban-kumitate3"]).toEqual(registry.QUESTIONS_BY_EXAM["haiden-seigyo3"]);
    expect(registry.ALL_QUESTIONS.map(q => q.id)).toEqual([f.question.id, "second", f.question.id]);
    expect(loaders.getRegisteredExamCodes()).toEqual(["denken3", "haiden-seigyo3"]);
    expect((await loaders.getQuestionsForExam("haidenban-kumitate3")).map(q => q.id)).toEqual(["second", f.question.id]);
    expect(await loaders.getQuestionCountsByExam()).toEqual({ denken3: 1, "haiden-seigyo3": 2 });
    const all = await loaders.getAllQuestionsLazy();
    all.reverse();
    expect((await loaders.getAllQuestionsLazy()).map(q => q.id)).toEqual([f.question.id, "second", f.question.id]);
  });

  it("opens the static corpus once and shares objects with lazy exam pools", () => {
    const f = fixture();
    f.manifest.staticCorpus = f.entry([f.question, { ...f.question, id: "second" }, f.question]);
    f.save();
    const corpus = openQuestionCorpus(f.root);
    const lazy = corpus.lazyExam("denken3");
    rmSync(join(f.dir, f.first.file));
    expect(corpus.staticExam("haiden-seigyo3")).toBe(lazy);
    expect(corpus.staticExam("denken3").map(q => q.id)).toEqual(["second", f.question.id]);
    expect(corpus.lazyExam("haiden-seigyo3")).toBe(corpus.staticExam("denken3"));
  });

  it("rejects invalid versions, paths, and question counts", () => {
    const f = fixture();
    f.manifest.staticExams.denken3!.file = "../outside.json.gz";
    f.save();
    expect(() => openQuestionCorpus(f.root).staticExam("denken3")).toThrow("filename");
    f.manifest.staticExams.denken3 = { ...f.first, count: 20 };
    f.save();
    expect(() => openQuestionCorpus(f.root).staticExam("denken3")).toThrow("count mismatch");
    writeFileSync(join(f.dir, "manifest.json"), '{"version":0}');
    expect(() => openQuestionCorpus(f.root)).toThrow("Invalid question corpus");
  });
});
