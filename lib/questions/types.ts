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
  | "fp1"
  | "fp3"
  | "denken3"
  | "denken2"
  | "denken1"
  | "denko2"
  | "denko1"
  | "takken"
  | "civil2"
  | "kankoji2"
  | "zoen2"
  | "zoen1"
  | "tsushin2"
  | "tsushin1"
  | "kaigo"
  | "civil1"
  | "shakai"
  | "seishin"
  | "tohan"
  | "kanri"
  | "eisei1"
  | "eisei2"
  | "soukan"
  | "hoikushi"
  | "mankan"
  | "kashikin"
  | "sharoushi"
  | "kangoshi"
  | "yakuzaishi"
  | "ahaki-anma"
  | "ahaki-hari-kyu"
  | "hokenshi"
  | "josanshi"
  | "rigaku-ryohoshi"
  | "sagyo-ryohoshi"
  | "shino-kunrenshi"
  | "rinsho-kensagishi"
  | "shinryo-hoshasengishi"
  | "rinsho-kogishi"
  | "gas-kou"
  | "gas-otsu"
  | "gas-hei";

/** IPA の情報処理技術者試験区分。外部資格を扱う設定から分離する。 */
export type IpaExamCode = Exclude<ExamCode, "fp1" | "fp2" | "fp3" | "denken3" | "denken2" | "denken1" | "denko2" | "denko1" | "takken" | "civil2" | "civil1" | "kankoji2" | "zoen2" | "zoen1" | "tsushin2" | "tsushin1" | "kaigo" | "shakai" | "seishin" | "tohan" | "kanri" | "eisei1" | "eisei2" | "soukan" | "hoikushi" | "mankan" | "kashikin" | "sharoushi" | "kangoshi" | "yakuzaishi" | "ahaki-anma" | "ahaki-hari-kyu" | "hokenshi" | "josanshi" | "rigaku-ryohoshi" | "sagyo-ryohoshi" | "shino-kunrenshi" | "rinsho-kensagishi" | "shinryo-hoshasengishi" | "rinsho-kogishi" | "gas-kou" | "gas-otsu" | "gas-hei">;

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
  /** 社労士択一式の科目別冊子。各科目の公式問番号は1〜10で重複する。 */
  | "rousai"
  | "koyou"
  | "kenpo"
  | "kounen"
  | "kokunen"
  | "ippan"
  | "sentaku"
  | "required"
  | "theory"
  | "practical"
  | "riron"
  | "denryoku"
  | "kikai"
  | "houki"
  | "mondai-a"
  | "mondai-b"
  /** 社会福祉士・精神保健福祉士の共通科目（同一の問題冊子）。 */
  | "kyotsu"
  /** 社会福祉士・精神保健福祉士の専門科目。 */
  | "senmon"
  /** 保育士試験（筆記9科目、教育原理・社会的養護は選択科目）。 */
  | "hoiku-genri"
  | "kyoiku-genri"
  | "shakaiteki-yougo"
  | "kodomo-katei-fukushi"
  | "shakai-fukushi"
  | "hoiku-shinrigaku"
  | "kodomo-hoken"
  | "kodomo-shokueiyou"
  | "hoiku-jisshu-riron"
  | "gas-law"
  | "gas-basic"
  | "gas-technology";

export type Season = "spring" | "autumn" | "cbt" | "published" | "first" | "second" | "early" | "may" | "september" | "january" | "october" | "late" | "annual" | "july" | "primary" | "kansai";

export type Difficulty = 1 | 2 | 3 | 4 | 5;

export type QuestionType = "multiple-choice" | "numeric" | "descriptive" | "essay";

/**
 * 内部の選択肢キー。IPA等は先頭4〜5個だけを使う。電験二種一次試験は公式の
 * 解答群(イ)〜(ヨ)の15肢を、順番どおり ア〜ソ に割り当てて保持する。
 */
export type ChoiceKey = "ア" | "イ" | "ウ" | "エ" | "オ" | "カ" | "キ" | "ク" | "ケ" | "コ" | "サ" | "シ" | "ス" | "セ" | "ソ";

/** 枝問(a)/(b)、または電験二種の空欄番号(1)〜(5)。 */
export type QuestionPart = "a" | "b" | "1" | "2" | "3" | "4" | "5";

export interface Question {
  id: string;
  exam: ExamCode;
  session: Session;
  year: number;
  season: Season;
  qNumber: number;
  /** 枝問または空欄番号。問番号と併せて一意のURL・復帰位置を構成する。 */
  part?: QuestionPart;
  /** 電験三種の公式公表単位。画面の年度・期と検証台帳を照合する。 */
  fiscalYear?: number;
  term?: "upper" | "lower";
  examDate?: string;
  subject?: string;
  officialAnswerNumber?: string;
  type: QuestionType;
  /** 数値記入。answer は単位を除いた正規化済み非負数文字列。 */
  numericAnswer?: { format: "integer"; unit: string } | { format: "decimal"; precision: 1; unit: string };
  category: string;
  topicTags: string[];
  difficulty: Difficulty;
  question: string;
  choices?: Partial<Record<ChoiceKey, string>>;
  answer: ChoiceKey | ChoiceKey[] | string;
  /**
   * 1問で選ぶ肢の数。answer の許容肢から、この数を重複なしで選ぶ。
   * 「二つとも」は許容肢2・選択数2、「3肢中いずれか2つ」は許容肢3・選択数2。
   * 省略時は1で、answer の配列は個別に正解と認められた肢の一覧として扱う。
   */
  requiredSelections?: number;
  explanation: string;
  /** 正解・不正解を各選択肢ごとに説明する。公開パイロットでは必須。 */
  choiceExplanations?: Partial<Record<ChoiceKey, string>>;
  /** 全肢解説と公式正答のみの一般解説を区別する。 */
  explanationCoverage?: "full" | "official-summary";
  /** 図を含む選択肢。文字起こしした選択肢と同じキーに結び付ける。 */
  choiceImageUrls?: Partial<Record<ChoiceKey, string>>;
  modelAnswer?: string;
  scoringCriteria?: string;
  hasImage: boolean;
  imageUrls?: string[];
  /** 原本図表の内容を表す代替テキスト。imageUrls と同じ順序。 */
  imageAltTexts?: string[];
  sourcePdfUrl: string;
  /** 公式の正答表。問題PDFと同一の場合も明示して保持する。 */
  sourceAnswerUrl?: string;
  /** 公式が指定する出典表記。 */
  sourceAttribution?: string;
  /** 問題・正答以外の公式根拠（法令・制度概要等）。 */
  officialReferenceUrls?: string[];
  license: "IPA-public" | "JAFP-reuse-with-attribution" | "KINZAI-reuse-with-attribution" | "ECEE-educational-reuse" | "RETIO-reuse" | "JCTC-authorized-reuse" | "SSSC-reuse" | "KANSAI-UNION-reuse" | "KANRIKYO-educational-reuse" | "EXAM-OR-JP-attributed" | "IPEJ-attributed" | "HOYOKYO-attributed" | "MANKAN-attributed" | "JFSA-attributed" | "SHAROSI-attributed" | "MHLW-attributed" | "AHK-attributed" | "JAAME-attributed" | "JIA-attributed";
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
