import rawEssays from "./essays.json";

export const GAS_EXAMS = ["gas-kou", "gas-otsu", "gas-hei"] as const;
export type GasExam = (typeof GAS_EXAMS)[number];
export type GasGrade = "kou" | "otsu" | "hei";
export type GasEssaySubject = "law" | "manufacturing" | "supply" | "consumption";

export interface GasEssay {
  id: string;
  grades: GasGrade[];
  year: number;
  subject: GasEssaySubject;
  qNumber: number;
  question: string;
  modelAnswer: string;
  checkpoints: string[];
  references: string[];
  sourcePdfUrl: string;
  sourcePage: number;
  sourcePdfSha256: string;
  officialAnswerPublished: false;
  answerKind: "independent-model";
  lawRevision?: string;
  lastUpdated: string;
}

export const GAS_ESSAY_SUBJECT_LABELS: Record<GasEssaySubject, string> = {
  law: "法令",
  manufacturing: "ガス技術・製造",
  supply: "ガス技術・供給",
  consumption: "ガス技術・消費",
};

const essays = rawEssays as GasEssay[];

export function isGasExam(exam: string): exam is GasExam {
  return GAS_EXAMS.some((code) => code === exam);
}

export function getGasEssays(exam: GasExam): GasEssay[] {
  const grade = exam.slice(4) as GasGrade;
  return essays.filter((q) => q.grades.includes(grade));
}
