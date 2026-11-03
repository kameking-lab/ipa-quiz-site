import { describe, expect, it } from "vitest";
import inventory from "@/data/qualification-staging/mokuzo-kenchikushi/source-inventory.json";
import { ALL_QUESTIONS } from "@/data/questions";
import { QUALIFICATION_CATALOG } from "@/lib/qualifications/catalog";
import { EXAM_CATALOG } from "@/lib/exam-library-catalog";

// Checked independently against the page images of the official answer tables.
const officialRows: Record<number, string[]> = {
  2026: [
    "5443332442255514551314322",
    "3533451425235243124521412",
    "5241222554145433433123112",
    "5352253331143424152121314",
  ],
  2025: [
    "1254555213341143413225123",
    "5214442352144232231351154",
    "5341242132355354532214411",
    "1335142334541433522551152",
  ],
};

describe("木造建築士の未公開出典台帳", () => {
  it("preserves 100 official answer numbers per year in subject/question order", () => {
    expect(inventory.years.map((year) => year.year)).toEqual([2026, 2025]);
    for (const year of inventory.years) {
      expect(year.subjects.map((subject) => subject.id)).toEqual(["I", "II", "III", "IV"]);
      expect(year.subjects.map((subject) => subject.officialAnswerNumbers.join(""))).toEqual(officialRows[year.year]);
      expect(year.subjects.flatMap((subject) => subject.officialAnswerNumbers)).toHaveLength(100);
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

  it("accounts for the missing extraction of 2026 construction Q12 and its third-party credit", () => {
    const year = inventory.years.find((year) => year.year === 2026)!;
    const booklet = year.booklets.find((booklet) => booklet.id === "34")!;
    expect(booklet.extractedQuestionCount).toBe(49);
    expect(booklet.alternateVerification).toMatchObject({
      subject: "IV", questionNumber: 12, pdfPage: 18, choiceCount: 5,
      needsFigure: true, thirdPartyFigureChoiceNumbers: [2, 4], questionNotPublished: false,
    });
    expect(booklet.alternateVerification?.figureCredit).toContain("住宅金融支援機構");
    expect(year.subjects.find((subject) => subject.id === "IV")?.officialAnswerNumbers[11]).toBe(4);
  });

  it("keeps answer-only records out of the public practice and library registries", () => {
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
