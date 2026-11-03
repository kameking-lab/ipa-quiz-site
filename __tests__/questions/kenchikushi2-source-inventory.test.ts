import { describe, expect, it } from "vitest";
import inventory from "@/data/qualification-staging/kenchikushi2/source-inventory.json";
import { ALL_QUESTIONS } from "@/data/questions";
import { QUALIFICATION_CATALOG } from "@/lib/qualifications/catalog";
import { EXAM_CATALOG } from "@/lib/exam-library-catalog";

// Independently checked against all four rows of each official answer PDF.
const officialRows: Record<number, string[]> = {
  2026: [
    "4154542132325452451343132",
    "5534324253332141214241532",
    "3411243231451145245353542",
    "1435243235451115352225412",
  ],
  2025: [
    "3214245134214552233144551",
    "1414414235223513524125332",
    "1322215345312513123425454",
    "4425215353514332521134544",
  ],
};

describe("二級建築士の未公開出典台帳", () => {
  it("preserves all 200 official answer numbers in subject/question order", () => {
    expect(inventory.years.map((year) => year.year)).toEqual([2026, 2025]);
    for (const year of inventory.years) {
      expect(year.subjects.map((subject) => subject.id)).toEqual(["I", "II", "III", "IV"]);
      expect(year.subjects.map((subject) => subject.officialAnswerNumbers.join(""))).toEqual(officialRows[year.year]);
      expect(year.subjects.flatMap((subject) => subject.officialAnswerNumbers)).toHaveLength(100);
    }
  });

  it("accounts for 50+50 questions with official sources and historical law dates", () => {
    for (const year of inventory.years) {
      expect(year.lawReferenceDate).toBe(`${year.year}-01-01`);
      expect(year.answerPdfUrl).toMatch(/^https:\/\/www\.jaeic\.or\.jp\/.+\.pdf$/);
      expect(year.answerPdfSha256).toMatch(/^[a-f0-9]{64}$/);
      for (const booklet of year.booklets) {
        expect(booklet.pdfUrl).toMatch(/^https:\/\/www\.jaeic\.or\.jp\/.+\.pdf$/);
        expect(booklet.sha256).toMatch(/^[a-f0-9]{64}$/);
        expect(booklet.expectedQuestionCount).toBe(50);
        expect(booklet.verifiedQuestionCount).toBe(50);
        expect(booklet.questionNumberSequences).toEqual([1, 2].map(() => Array.from({ length: 25 }, (_, i) => i + 1)));
      }
    }
  });

  it("keeps the inventory out of public questions and library routes", () => {
    const entry = QUALIFICATION_CATALOG.find((entry) => entry.slug === inventory.slug);
    expect(entry?.status).toBe("ready-to-ingest");
    expect(entry?.examCode).toBeUndefined();
    expect(inventory.publicationStatus).toBe("staging");
    expect(inventory.contentStatus).toBe("source-inventory-only");
    expect(inventory.ingestedQuestionCount).toBe(0);
    expect(inventory.pendingQuestionCount).toBe(200);
    expect(ALL_QUESTIONS.filter((question) => question.exam === inventory.slug)).toEqual([]);
    expect(EXAM_CATALOG.filter((entry) => entry.id.startsWith(inventory.slug))).toEqual([]);
  });
});
