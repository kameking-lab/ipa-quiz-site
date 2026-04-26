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

export type ChoiceKey = "ア" | "イ" | "ウ" | "エ" | "オ" | "カ" | "キ" | "ク" | "コ";

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
  choices?: Partial<Record<ChoiceKey, string>>;
  answer: ChoiceKey | ChoiceKey[] | string;
  explanation: string;
  modelAnswer?: string;
  scoringCriteria?: string;
  hasImage: boolean;
  imageUrls?: string[];
  sourcePdfUrl: string;
  license: "IPA-public";
  isCalculation?: boolean;
  /** 解説品質が低い・要確認の問題。出題プールから除外される。 */
  needsReview?: boolean;
}

export type QuizMode = "random" | "year" | "topic" | "review" | "unanswered";

export interface QuizFilter {
  mode: QuizMode;
  exam?: ExamCode;
  /** 複数試験区分を横断して出題する場合に指定。examより優先される。 */
  examGroup?: ExamCode[];
  year?: number;
  season?: Season;
  session?: Session;
  topicTag?: string;
  category?: string;
  /** 複数カテゴリのいずれかにマッチさせる場合に指定。categoryより優先される。 */
  categoryGroup?: string[];
  calculationOnly?: boolean;
  inOrder?: boolean;
  randomizeChoices?: boolean;
  excludeRecent?: boolean;
}
