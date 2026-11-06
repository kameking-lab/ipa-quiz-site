/**
 * 機械保全技能検定 2級 機械系保全作業 学科（JIPM）の未公開ステージング。
 * 編集・検証専用。公開レジストリ（data/questions, lib/questions, lib/exam-config 等）から import しないこと。
 */
import round2024 from "./2024.json";
import round2025 from "./2025.json";
import manifest from "./manifest.json";
import officialAnswers from "./official-answers.json";

export type KikaiHozenChoiceKey = "〇" | "×" | "ア" | "イ" | "ウ" | "エ";
export type KikaiHozenChoiceMap = Readonly<Partial<Record<KikaiHozenChoiceKey, string>>>;

export interface KikaiHozenStagedImage {
  path: string;
  sha256: string;
  alt: string;
}

export interface KikaiHozenStagedQuestion {
  id: string;
  slug: string;
  year: number;
  season: string;
  session: string;
  grade: string;
  work: string;
  qNumber: number;
  publicationStatus: string;
  publicAllowed: boolean;
  needsReview: boolean;
  type: string;
  answerFormat: string;
  question: string;
  choices: KikaiHozenChoiceMap;
  officialAnswer: string;
  sourcePdfUrl: string;
  sourceAnswerUrl: string;
  sourcePage: number;
  hasImage: boolean;
  images: readonly KikaiHozenStagedImage[];
  sourceAttribution: string;
  lawReferenceDate: string | null;
  legalContextDate: string | null;
  lastUpdated: string;
  explanationAuthorship: string;
  sourceTextSha256: string;
  choiceExplanations: KikaiHozenChoiceMap;
  explanation: string;
  category: string;
  transcriptionNote: string;
}

export const KIKAI_HOZEN_STAGING_2024: readonly KikaiHozenStagedQuestion[] = round2024;
export const KIKAI_HOZEN_STAGING_2025: readonly KikaiHozenStagedQuestion[] = round2025;
export const KIKAI_HOZEN_STAGED_QUESTIONS: readonly KikaiHozenStagedQuestion[] = [
  ...KIKAI_HOZEN_STAGING_2024,
  ...KIKAI_HOZEN_STAGING_2025,
];
export const KIKAI_HOZEN_STAGING_MANIFEST = manifest;
export const KIKAI_HOZEN_OFFICIAL_ANSWERS = officialAnswers;

export const KIKAI_HOZEN_REGISTRATION = {
  slug: "kikai-hozen",
  fullName: "機械保全技能検定 2級 機械系保全作業 学科",
  publicAllowed: false,
  publication: "HOLD",
  questions: KIKAI_HOZEN_STAGED_QUESTIONS,
} as const;
