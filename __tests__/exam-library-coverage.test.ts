import { describe, expect, it } from "vitest";
import { EXAM_CATALOG } from "@/lib/exam-library-catalog";
import {
  auditConsultantCoverage,
  CONSULTANT_REQUIRED_SUBJECTS,
  CONSULTANT_REQUIRED_YEARS,
  requiredStructuredChoiceQuestionIds,
  STRUCTURED_CHOICE_REQUIRED_PAPER_IDS,
} from "@/lib/exam-library-coverage";
import { loadExamPaper } from "@/lib/exam-library-papers";

describe("consultant five-year coverage contract", () => {
  it("defines the 2021-2025 contract for all safety and occupational-health subjects", () => {
    expect(CONSULTANT_REQUIRED_YEARS).toEqual([2021, 2022, 2023, 2024, 2025]);
    expect(CONSULTANT_REQUIRED_SUBJECTS).toHaveLength(11);
    expect(CONSULTANT_REQUIRED_SUBJECTS).toEqual(expect.arrayContaining([
      "産業安全一般",
      "産業安全関係法令",
      "機械安全",
      "電気安全",
      "化学安全",
      "土木安全",
      "建築安全",
      "労働衛生一般",
      "労働衛生関係法令",
      "健康管理",
      "労働衛生工学",
    ]));
  });

  it("reports a three-year import gap without pretending two years are complete coverage", () => {
    const twoYearCatalog = EXAM_CATALOG.filter((entry) =>
      entry.group !== "cskohyo" || [2024, 2025].includes(Number(entry.date.slice(0, 4))));
    const audit = auditConsultantCoverage(twoYearCatalog);
    expect(audit.complete).toBe(false);
    expect(audit.presentYears).toEqual([2024, 2025]);
    expect(audit.missingYears).toEqual([2021, 2022, 2023]);
    expect(audit.missingPapers).toHaveLength(33);
  });

  it("passes when every contracted year and subject is present", () => {
    const template = EXAM_CATALOG.find((entry) => entry.group === "cskohyo")!;
    const complete = CONSULTANT_REQUIRED_YEARS.flatMap((year) =>
      CONSULTANT_REQUIRED_SUBJECTS.map((subject, index) => ({
        ...template,
        id: `cskohyo-CONTRACT-${year}-${index}`,
        date: `${year}-10-01`,
        subject,
      })),
    );
    expect(auditConsultantCoverage(complete)).toEqual({
      complete: true,
      presentYears: [2021, 2022, 2023, 2024, 2025],
      missingYears: [],
      missingPapers: [],
    });
  });

  it("expands structured-choice requirements one completed paper at a time", () => {
    expect(Array.isArray(STRUCTURED_CHOICE_REQUIRED_PAPER_IDS)).toBe(true);
    expect(new Set(STRUCTURED_CHOICE_REQUIRED_PAPER_IDS).size)
      .toBe(STRUCTURED_CHOICE_REQUIRED_PAPER_IDS.length);
    expect(STRUCTURED_CHOICE_REQUIRED_PAPER_IDS.every((id) =>
      /^cskohyo-CS20(?:21|22|23|24|25)19(?:0[1-9]|1[01])$/u.test(id)))
      .toBe(true);
    const paperId = "cskohyo-CS20251901";
    const questions = loadExamPaper(paperId)!;
    expect(requiredStructuredChoiceQuestionIds(questions, [paperId])).toEqual(
      questions.filter((question) => question.answerAuthority === "official")
        .map((question) => question.id)
        .sort(),
    );
  });
});
