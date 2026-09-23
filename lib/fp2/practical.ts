import extracted from "@/data/questions/fp2/practical-2024-2025.json";
import figures from "@/data/questions/fp2/practical-figures-2024-2025.json";

export interface PracticalPanel {
  url: string;
  pdfPage: number;
  width: number;
  height: number;
  bytes: number;
}

export interface PracticalQuestion {
  number: number;
  body: string;
  modelAnswer: string;
  sourcePage: number;
  sourcePageContainsRaster: boolean;
  panels: PracticalPanel[];
}

type RawEdition = { lawReferenceDate: string; questions: Omit<PracticalQuestion, "panels">[] };
const DATA = extracted as Record<string, RawEdition>;
const FIGURES = figures as Record<string, Record<string, PracticalPanel[]>>;

export const FP2_PRACTICAL_EDITIONS = ["202405", "202409", "202501", "202505"] as const;

export function practicalEditionLabel(edition: string): string {
  const labels: Record<string, string> = {
    "202405": "2024年5月試験",
    "202409": "2024年9月試験",
    "202501": "2025年1月試験",
    "202505": "2025年5月公表",
  };
  return labels[edition] ?? edition;
}

export function getPracticalEdition(edition: string): { label: string; lawReferenceDate: string; questions: PracticalQuestion[] } | null {
  const data = DATA[edition];
  const panels = FIGURES[edition];
  if (!data || !panels || !FP2_PRACTICAL_EDITIONS.some((value) => value === edition)) return null;
  return {
    label: practicalEditionLabel(edition),
    lawReferenceDate: data.lawReferenceDate,
    questions: data.questions.map((q) => ({ ...q, panels: panels[String(q.number)] ?? [] })),
  };
}

export function practicalSourceUrls(edition: string): { question: string; answer: string } {
  const root = "https://www.jafp.or.jp/exam/mohan/files";
  return { question: `${root}/j2_${edition}_q.pdf`, answer: `${root}/j2_${edition}_a.pdf` };
}
