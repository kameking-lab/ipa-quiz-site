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
  | "au"
  | "fp2"
  | "fp3"
  | "denken3";

/** IPA の情報処理技術者試験区分。外部資格を扱う設定から分離する。 */
export type IpaExamCode = Exclude<ExamCode, "fp2" | "fp3" | "denken3">;

export type Session =
  | "am"
  | "am1"
  | "am2"
  | "pm"
  | "pm1"
  | "pm2"
  | "kamoku-a"
  | "kamoku-b"
  | "gakka"
  | "riron";

export type Season = "spring" | "autumn" | "cbt" | "published" | "first" | "second" | "may" | "september" | "january";

export type Difficulty = 1 | 2 | 3 | 4 | 5;

export type QuestionType = "multiple-choice" | "descriptive" | "essay";

export type ChoiceKey = "ア" | "イ" | "ウ" | "エ" | "オ" | "カ" | "キ" | "ク" | "ケ" | "コ";

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
  /** 正解・不正解を各選択肢ごとに説明する。公開パイロットでは必須。 */
  choiceExplanations?: Partial<Record<ChoiceKey, string>>;
  modelAnswer?: string;
  scoringCriteria?: string;
  hasImage: boolean;
  imageUrls?: string[];
  sourcePdfUrl: string;
  /** 公式の正答表。問題PDFと同一の場合も明示して保持する。 */
  sourceAnswerUrl?: string;
  /** 公式が指定する出典表記。 */
  sourceAttribution?: string;
  /** 問題・正答以外の公式根拠（法令・制度概要等）。 */
  officialReferenceUrls?: string[];
  license: "IPA-public" | "JAFP-reuse-with-attribution" | "ECEE-educational-reuse";
  isCalculation?: boolean;
  /** 解説品質が低い・要確認の問題。出題プールから除外される。 */
  needsReview?: boolean;
  /** 解説の最終更新日 (ISO 8601: YYYY-MM-DD)。未設定時はビルド日へフォールバック。 */
  lastUpdated?: string;
  /** 出題が前提とする法令・制度の基準日。解説更新日とは区別する。 */
  lawReferenceDate?: string;
}

export type QuizMode = "random" | "year" | "topic" | "review" | "unanswered" | "weakness";

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
