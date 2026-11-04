import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { afterEach, describe, expect, it, vi } from "vitest";
vi.mock("server-only", () => ({}));
import { KHK_KAGAKU_QUESTIONS } from "@/data/questions/khk-kagaku";
import { PUBLIC_KHK_KAGAKU_QUESTIONS } from "@/data/questions/khk-kagaku/public";
import drafts from "@/data/questions/khk-kagaku/staging-drafts.json";
import assetFiles from "@/data/questions/khk-kagaku/image-assets.json";
import { QUESTIONS_BY_EXAM } from "@/data/questions";
import * as catalog from "@/lib/qualifications/catalog";
import { getQuestionsForExam, getRegisteredExamCodes } from "@/lib/questions/get-questions";
import { ALL_QUIZ_EXAM_CODES, EXAM_CONFIGS } from "@/lib/exam-config";
import { getAvailableExams } from "@/lib/seo/exam-meta";
import { isPracticeReadyQuestion, shuffleChoices } from "@/lib/questions/filter";
import { choiceDisplayLabel } from "@/lib/questions/display";
import { defaultPracticeSession, parsePracticeSession } from "@/lib/questions/practice-session";
import { GET as assetGET } from "@/app/api/qualification-assets/khk-kagaku/[file]/route";

afterEach(() => vi.restoreAllMocks());

describe("KHK complete but unpublished practice registration", () => {
  it("maps every original, subject, official choice and independent rationale without renumbering", () => {
    expect(KHK_KAGAKU_QUESTIONS).toHaveLength(422);
    expect(new Set(KHK_KAGAKU_QUESTIONS.map((q) => q.id)).size).toBe(422);
    let choiceCount = 0;
    for (const paper of drafts.papers) {
      const session = `khk-${paper.code.toLowerCase()}`;
      const registered = KHK_KAGAKU_QUESTIONS.filter((q) => q.year === paper.year && q.session === session);
      expect(registered).toHaveLength(paper.expectedQuestions);
      expect(EXAM_CONFIGS["khk-kagaku"].sessions.find((s) => s.session === session)?.expectedQuestions).toBe(paper.expectedQuestions);
      expect(parsePracticeSession(session)).toBe(session);
      for (const source of paper.questions) {
        const q = registered.find((item) => item.qNumber === source.number)!;
        expect(q.originalContent?.body).toBe(source.questionDraft);
        expect(q.question).toContain(source.questionDraft);
        expect(q.explanation).toBe(source.explanationDraft);
        expect(q.sourcePdfUrl).toBe(source.sourcePdfUrl);
        expect(q.sourceAnswerUrl).toBe(source.sourceAnswerUrl);
        expect(q.imageUrls).toHaveLength(q.imageAltTexts!.length);
        expect(isPracticeReadyQuestion(q)).toBe(true);
        if (q.type === "multiple-choice") {
          const sourceChoice = source as unknown as { choicesDraft: string[]; officialAnswerNumber: number };
          expect(Object.values(q.choices!)).toEqual(sourceChoice.choicesDraft);
          expect(choiceDisplayLabel(q.exam, q.answer as "ア")).toBe(String(sourceChoice.officialAnswerNumber));
          expect(Object.keys(q.choiceExplanations!)).toHaveLength(5);
          expect(shuffleChoices(q)).toEqual(q);
          choiceCount += 5;
        } else {
          expect(q.type).toBe("descriptive");
          expect(q.modelAnswer!.length).toBeGreaterThan(150);
          expect(q.scoringCriteria).toContain("公式の小問別配点・合否判定ではない");
          expect(q.selfAssessment!.reduce((sum, item) => sum + item.points, 0)).toBe([4, 6].includes(q.qNumber) ? 20 : 15);
        }
      }
    }
    expect(choiceCount).toBe(2050);
    expect(defaultPracticeSession("khk-kagaku")).toBe("khk-ax");
    for (const year of [2024, 2025]) {
      expect(KHK_KAGAKU_QUESTIONS.filter((q) => q.year === year && q.type === "descriptive").flatMap((q) => q.selfAssessment!).reduce((sum, item) => sum + item.points, 0)).toBe(100);
    }
  });

  it("keeps the whole corpus absent from public registries, discovery, and lazy loaders", async () => {
    expect(catalog.isExamPublished("khk-kagaku")).toBe(false);
    expect(QUESTIONS_BY_EXAM["khk-kagaku"]).toBeUndefined();
    expect(PUBLIC_KHK_KAGAKU_QUESTIONS).toEqual([]);
    const registry = readFileSync(resolve("data/questions/index.ts"), "utf8");
    expect(registry).toContain('from "./khk-kagaku/public"');
    expect(registry).not.toMatch(/from ["']\.\/khk-kagaku["']/);
    expect(readFileSync(resolve("data/questions/khk-kagaku/index.ts"), "utf8")).toContain('import "server-only"');
    expect(ALL_QUIZ_EXAM_CODES).not.toContain("khk-kagaku");
    expect(getRegisteredExamCodes()).not.toContain("khk-kagaku");
    expect(getAvailableExams()).not.toContain("khk-kagaku");
    expect(await getQuestionsForExam("khk-kagaku")).toEqual([]);
    const entry = catalog.QUALIFICATION_CATALOG.find((q) => q.examCode === "khk-kagaku")!;
    const previous = entry.status;
    // publicAllowed=false must win even over an accidental catalog-live change.
    try {
      entry.status = "live";
      expect(catalog.isExamPublished("khk-kagaku")).toBe(false);
      expect(await getQuestionsForExam("khk-kagaku")).toEqual([]);
    } finally { entry.status = previous; }
  });

  it("references all 49 original images and blocks every image while unpublished", async () => {
    const urls = KHK_KAGAKU_QUESTIONS.flatMap((q) => [...(q.imageUrls ?? []), ...(q.modelAnswer?.match(/\/api\/qualification-assets\/khk-kagaku\/[^)]+\.png/g) ?? [])]);
    expect(new Set(urls.map((url) => `images/${url.split("/").at(-1)}`))).toEqual(new Set(assetFiles));
    for (const asset of assetFiles) {
      const file = asset.split("/").at(-1)!;
      const response = await assetGET(new Request(`http://localhost/assets/${file}`), { params: Promise.resolve({ file }) });
      expect(response.status).toBe(404);
      expect((await response.arrayBuffer()).byteLength).toBe(0);
    }
  });

  it("serves exact PNG bytes only for allowlisted filenames when the gate is explicitly mocked open", async () => {
    vi.spyOn(catalog, "isExamPublished").mockReturnValue(true);
    for (const asset of assetFiles) {
      const file = asset.split("/").at(-1)!;
      const response = await assetGET(new Request(`http://localhost/assets/${file}`), { params: Promise.resolve({ file }) });
      expect(response.status).toBe(200);
      expect(response.headers.get("Content-Type")).toBe("image/png");
      const received = Buffer.from(await response.arrayBuffer());
      const original = readFileSync(resolve("data/exam-library/source-packs/khk-kagaku", asset));
      expect(createHash("sha256").update(received).digest("hex")).toBe(createHash("sha256").update(original).digest("hex"));
    }
    for (const file of ["../manifest.json", "R6ACAZ-W.pdf", "not-found.png", "2024-AZ-2.png/../manifest.json"]) {
      expect((await assetGET(new Request("http://localhost/assets/file"), { params: Promise.resolve({ file }) })).status).toBe(404);
    }
  });

  it("retains material caveats and verifies representative independent calculations", () => {
    const disputed = KHK_KAGAKU_QUESTIONS.find((q) => q.year === 2024 && q.session === "khk-cz" && q.qNumber === 20)!;
    expect(disputed.officialAnswerNumber).toBe("5");
    expect(disputed.question).toContain("耐寒性");
    expect(disputed.question).toContain("ポリビニルアルコール");
    expect(disputed.questionNotice).toContain("技術的留保");
    expect(disputed.explanation).toContain("裏付けられない");
    expect(1.20 * 8.31 * 273 / 101000).toBeCloseTo(0.0270, 4);
    expect((101.3 - 53.32) / (137.3 - 53.32)).toBeCloseTo(0.571, 3);
    expect(200000 / 26 * 1257 / 4190).toBeCloseTo(2308, 0);
    expect(3.2 / 5500 * 100).toBeCloseTo(0.058, 3);
    expect(0.5 * 3.5 / 0.21).toBeCloseTo(8.33, 2);
  });
});
