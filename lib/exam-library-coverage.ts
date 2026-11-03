import coverageContractJson from "@/data/exam-library/coverage-contract.json";
import type { ExamCatalogEntry, ExamQuestion } from "@/lib/exam-library-model";

export const CONSULTANT_REQUIRED_YEARS = coverageContractJson.consultant.years as readonly number[];
export const CONSULTANT_REQUIRED_SUBJECTS = coverageContractJson.consultant.subjects as readonly string[];
export const STRUCTURED_CHOICE_REQUIRED_PAPER_IDS =
  coverageContractJson.structuredChoiceExplanations.requiredPaperIds as readonly string[];

export interface MissingConsultantPaper {
  year: number;
  subject: string;
}

export interface ConsultantCoverageAudit {
  complete: boolean;
  presentYears: number[];
  missingYears: number[];
  missingPapers: MissingConsultantPaper[];
}

/** 労働安全・労働衛生コンサルタントの5年×全11科目収録契約を監査する。 */
export function auditConsultantCoverage(
  entries: readonly ExamCatalogEntry[],
  availableIds?: readonly string[],
): ConsultantCoverageAudit {
  const available = availableIds ? new Set(availableIds) : undefined;
  const consultantEntries = entries.filter((entry) =>
    entry.group === "cskohyo" && (!available || available.has(entry.id)));
  const present = new Set(
    consultantEntries.map((entry) => `${Number(entry.date.slice(0, 4))}|${entry.subject}`),
  );
  const presentYears = [...new Set(consultantEntries.map((entry) => Number(entry.date.slice(0, 4))))]
    .filter(Number.isInteger)
    .sort((left, right) => left - right);
  const missingPapers = CONSULTANT_REQUIRED_YEARS.flatMap((year) =>
    CONSULTANT_REQUIRED_SUBJECTS.flatMap((subject) =>
      present.has(`${year}|${subject}`) ? [] : [{ year, subject }]),
  );
  const missingYears = CONSULTANT_REQUIRED_YEARS.filter((year) =>
    !CONSULTANT_REQUIRED_SUBJECTS.some((subject) => present.has(`${year}|${subject}`)),
  );
  return {
    complete: missingPapers.length === 0,
    presentYears,
    missingYears,
    missingPapers,
  };
}

/**
 * 構造化移行を完了扱いにした回の、公式択一問題IDを返す。
 * requiredPaperIds を増やすと、その回の全5択解説がCI必須になる。
 */
export function requiredStructuredChoiceQuestionIds(
  questions: readonly ExamQuestion[],
  requiredPaperIds: readonly string[] = STRUCTURED_CHOICE_REQUIRED_PAPER_IDS,
): string[] {
  const required = new Set(requiredPaperIds);
  return questions
    .filter((question) => {
      const paperId = question.id.replace(/-q\d+$/u, "");
      return required.has(paperId) && question.answerAuthority === "official" && question.choiceCount === 5;
    })
    .map((question) => question.id)
    .sort();
}
