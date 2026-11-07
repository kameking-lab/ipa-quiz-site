import type { ChoiceKey, Question } from "@/lib/questions/types";
import y2026 from "@/data/qualification-staging/sokuryoshiho/2026.json";
import y2025 from "@/data/qualification-staging/sokuryoshiho/2025.json";
import { projectStagedQuestions } from "../batch4/project-staged";

const KEYS: readonly ChoiceKey[] = ["ア", "イ", "ウ", "エ", "オ"];
const IMAGE_BASE = "/images/questions/sokuryoshiho";
/** No.21 uses an excerpt of the 電子地形図25000; 測量法上の複製承認の要否が未確認のため公開しない。 */
export const SOKURYOSHIHO_EXCLUDED_QNUMBERS: readonly number[] = [21];

interface StagedImage { path: string; alt?: string }
interface StagedSurveyQuestion {
  id: string; qNumber: number; choices: Record<string, string>; choiceExplanations: Record<string, string>;
  officialAnswerNumber: number | string; images?: StagedImage[] | null; referenceImages?: StagedImage[] | null;
  category: string;
}

function toChoiceRecord(source: Record<string, string>): Partial<Record<ChoiceKey, string>> {
  return Object.fromEntries(Object.entries(source).map(([number, text]) => [KEYS[Number(number) - 1], text]));
}

function project(row: StagedSurveyQuestion): Question {
  const [base] = projectStagedQuestions([row]);
  const figures = [...(row.images ?? []), ...(row.referenceImages ?? [])];
  const answer = KEYS[Number(row.officialAnswerNumber) - 1];
  if (!answer) throw new Error(`Invalid sokuryoshiho answer ${row.id}`);
  return {
    ...base,
    exam: "sokuryoshiho",
    topicTags: ["測量士補", row.category],
    difficulty: 3,
    choices: toChoiceRecord(row.choices),
    choiceExplanations: toChoiceRecord(row.choiceExplanations),
    answer,
    officialAnswerNumber: String(row.officialAnswerNumber),
    explanationCoverage: "full",
    license: "GSI-attributed",
    ...(figures.length ? {
      hasImage: true,
      imageUrls: figures.map((image) => `${IMAGE_BASE}/${image.path.split("/").pop()}`),
      imageAltTexts: figures.map((image) => image.alt ?? ""),
    } : {}),
  };
}

/** 令和8・7年 測量士補試験（各28問）。No.21は除外、令和8年No.12は参考扱い（lib/questions/assessment.ts）。 */
export const SOKURYOSHIHO_QUESTIONS: Question[] = ([...y2026, ...y2025] as unknown as StagedSurveyQuestion[])
  .filter((row) => !SOKURYOSHIHO_EXCLUDED_QNUMBERS.includes(row.qNumber))
  .map(project);
