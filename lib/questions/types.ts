export type ExamCode =
  | "ip"
  | "sg"
  | "fe"
  | "ap"
  | "st"
  | "sa"
  | "pm"
  | "nw"
  | "db"
  | "es"
  | "sc"
  | "sm"
  | "au";

export type Session =
  | "am"
  | "am1"
  | "am2"
  | "pm"
  | "pm1"
  | "pm2"
  | "kamoku-a"
  | "kamoku-b";

export type Season = "spring" | "autumn" | "cbt";

export type Difficulty = 1 | 2 | 3 | 4 | 5;

export type QuestionType = "multiple-choice" | "descriptive" | "essay";

export type ChoiceKey = "ア" | "イ" | "ウ" | "エ";

export interface Question {
  id: string;
  exam: ExamCode;
  session: Session;
  year: number;
  season: Season;
  qNumber: number;
  type: QuestionType;
  category: string;
  topicTags: string[];
  difficulty: Difficulty;
  question: string;
  choices?: Record<ChoiceKey, string>;
  answer: ChoiceKey | ChoiceKey[] | string;
  explanation: string;
  modelAnswer?: string;
  scoringCriteria?: string;
  hasImage: boolean;
  imageUrls?: string[];
  sourcePdfUrl: string;
  license: "IPA-public";
  isCalculation?: boolean;
}

export type QuizMode = "random" | "year" | "topic" | "review" | "unanswered";

export interface QuizFilter {
  mode: QuizMode;
  exam?: ExamCode;
  year?: number;
  season?: Season;
  topicTag?: string;
  category?: string;
  calculationOnly?: boolean;
  inOrder?: boolean;
  randomizeChoices?: boolean;
  excludeRecent?: boolean;
}
