import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { SOKURYOSHI_QUESTIONS } from "@/data/questions/sokuryoshi";
import raw from "@/data/questions/sokuryoshi/source-branches.json";
import ledger from "@/data/questions/sokuryoshi/acceptance-ledger.json";
import manifest from "@/data/questions/sokuryoshi/source-manifest.json";
import answers from "@/data/questions/sokuryoshi/official-am-answers.json";
import { ALL_QUESTIONS } from "@/data/questions";
import { ALL_EXAM_CODES, ALL_QUIZ_EXAM_CODES } from "@/lib/exam-config";
import { getQuestionsForExam, getRegisteredExamCodes } from "@/lib/questions/get-questions";
import { isExamPublished } from "@/lib/qualifications/catalog";
import { QuestionModelAnswer } from "@/components/quiz/QuestionModelAnswer";

const keys = ["ア", "イ", "ウ", "エ", "オ"] as const;

describe("surveyor latest two complete source candidates", () => {
  it("preserves exactly 28 AM and five PM originals per session, without partial duplicates", () => {
    expect(SOKURYOSHI_QUESTIONS).toHaveLength(66);
    expect(new Set(SOKURYOSHI_QUESTIONS.map(q => q.id)).size).toBe(66);
    for (const year of [2025, 2026]) {
      for (const session of ["am", "pm"] as const) {
        const count = session === "am" ? 28 : 5;
        expect(SOKURYOSHI_QUESTIONS.filter(q => q.year === year && q.session === session).map(q => q.qNumber))
          .toEqual(Array.from({ length: count }, (_, i) => i + 1));
      }
    }
  });

  it("matches every official answer and retains all 280 individual choice explanations", () => {
    const am = SOKURYOSHI_QUESTIONS.filter(q => q.session === "am");
    expect(am).toHaveLength(56);
    for (const q of am) {
      const official = (q.year === 2025 ? answers.answers2025 : answers.answers2026)[q.qNumber - 1]!;
      expect(q.officialAnswerNumber, q.id).toBe(String(official));
      expect(q.answer, q.id).toBe(keys[official - 1]);
      expect(Object.keys(q.choices!), q.id).toEqual([...keys]);
      expect(Object.keys(q.choiceExplanations!), q.id).toEqual([...keys]);
      expect(Object.values(q.choiceExplanations!).every(x => x.trim().length > 10), q.id).toBe(true);
    }
  });

  it("retains every PM branch and answer field, including all four electives", () => {
    expect(raw.pm.map(q => q.branches.length)).toEqual([12, 11, 11, 10, 13, 10, 9, 10, 9, 9]);
    expect(ledger.pmBranches).toBe(104);
    expect(ledger.pmAnswerFields).toBe(313);
    for (const q of raw.pm) {
      expect(new Set(q.branches.map(b => b.id)).size).toBe(q.branches.length);
      expect(q.modelAnswerImageUrls).toHaveLength(2);
      expect(q.questionRepresentation).toBe("original-page-images-with-edited-branch-text");
    }
  });

  it("pins source PDFs and all question/answer images to their unambiguous original pages", () => {
    expect(manifest.files).toHaveLength(13);
    expect(Object.keys(manifest.assets)).toHaveLength(156);
    for (const [url, asset] of Object.entries(manifest.assets)) {
      const bytes = readFileSync(resolve(process.cwd(), asset.stagedPath));
      expect(createHash("sha256").update(bytes).digest("hex"), url).toBe(asset.sha256);
      expect(asset.sourcePdfUrl).toMatch(/^https:\/\/www\.gsi\.go\.jp\/common\/\d+\.pdf$/);
    }
    for (const q of SOKURYOSHI_QUESTIONS) {
      expect(q.imageUrls!.length, q.id).toBeGreaterThan(0);
      expect(q.imageAltTexts!.length, q.id).toBe(q.imageUrls!.length);
      expect(q.sourceAnswerUrl).toMatch(/^https:\/\/www\.gsi\.go\.jp\/common\/\d+\.pdf$/);
      expect(q.sourceAttribution).toContain("国土地理院");
      expect(JSON.stringify(q)).not.toContain("\ufffd");
      for (const url of [...q.imageUrls!, ...(q.modelAnswerImageUrls ?? [])]) expect(url in manifest.assets, q.id).toBe(true);
    }
  });

  it("keeps all candidates out of publication and does not invent a rights receipt", async () => {
    expect(isExamPublished("sokuryoshi")).toBe(false);
    expect(ALL_QUESTIONS.some(q => q.exam === "sokuryoshi")).toBe(false);
    expect(ALL_QUIZ_EXAM_CODES).not.toContain("sokuryoshi");
    expect(ALL_EXAM_CODES).not.toContain("sokuryoshi");
    expect(getRegisteredExamCodes()).not.toContain("sokuryoshi");
    expect(await getQuestionsForExam("sokuryoshi")).toEqual([]);
    expect(manifest.rightsReceipt).toBeNull();
    expect(ledger.publicGo).toBe(0);
    expect(ledger.independentAcceptance).toBe("PENDING");
  });

  it("renders exact drawing answer images separately from problem images", () => {
    const q = SOKURYOSHI_QUESTIONS.find(q => q.year === 2026 && q.session === "pm" && q.qNumber === 2)!;
    render(<QuestionModelAnswer question={q} />);
    expect(screen.getByRole("region", { name: "解答例" })).toBeInTheDocument();
    const imgs = screen.getAllByRole("img");
    expect(imgs.map(img => img.getAttribute("src"))).toEqual(q.modelAnswerImageUrls);
    expect(imgs.every(img => !q.imageUrls!.includes(img.getAttribute("src")!))).toBe(true);
    expect(screen.queryByText(/!\[国土地理院/)).toBeNull();
  });
});
