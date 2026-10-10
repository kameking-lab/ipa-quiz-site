import type { ExamCode, IpaExamCode, Session, Season } from "@/lib/questions/types";
import officialSources from "@/data/questions/corrections/official-sources.json";
import { isExamPublished } from "@/lib/qualifications/catalog";

const officialAnswerUrls = new Map(Object.values(officialSources).map(source => [source.question, source.answer]));

export interface SessionConfig {
  session: Session;
  urlSlug: string;
  expectedQuestions: number;
  label: string;
  categories: string[];
  /** IP exam: files are qs.pdf/ans.pdf without session prefix */
  noSessionPrefix?: boolean;
}

export interface ExamConfig {
  code: ExamCode;
  nameFull: string;
  urlSlug: string;
  level: "basic" | "advanced" | "specialist";
  sessions: SessionConfig[];
  seasons: Array<Season>;
  yearRange: { start: number; end: number };
  /** Before the 2020/2021 schedule changes, most specialist exams used the opposite season */
  legacyYearRange?: { start: number; end: number };
  legacySeasons?: Array<Season>;
  /** CBT-format years (IP 2021+, FE/SG 2023+) */
  cbtYearRange?: { start: number; end: number };
  /** CBT sessions differ from regular (e.g. FE: kamoku-a/b instead of am) */
  cbtSessions?: SessionConfig[];
}

// ------- Shared category lists -------

/** 社会福祉士・精神保健福祉士の共通科目（第38回／第28回、第37回／第27回はそれぞれ同一の問題冊子）。 */
const SSSC_COMMON_SUBJECTS = [
  "医学概論", "心理学と心理的支援", "社会学と社会システム", "社会福祉の原理と政策", "社会保障",
  "権利擁護を支える法制度", "地域福祉と包括的支援体制", "障害者福祉", "刑事司法と福祉",
  "ソーシャルワークの基盤と専門職", "ソーシャルワークの理論と方法", "社会福祉調査の基礎",
];

const BASIC_CATEGORIES = [
  "基礎理論",
  "アルゴリズムとプログラミング",
  "コンピュータシステム",
  "ネットワーク",
  "データベース",
  "セキュリティ",
  "開発技術",
  "マネジメント",
  "ストラテジ",
];

const ADVANCED_CATEGORIES = [
  "基礎理論",
  "アルゴリズムとプログラミング",
  "コンピュータシステム",
  "ネットワーク",
  "データベース",
  "セキュリティ",
  "開発技術",
  "プロジェクトマネジメント",
  "サービスマネジメント",
  "システム戦略",
  "経営戦略",
  "企業と法務",
];

const HIGH_LEVEL_AM1_CATEGORIES = [
  "基礎理論",
  "コンピュータシステム",
  "ネットワーク",
  "データベース",
  "セキュリティ",
  "開発技術",
  "プロジェクトマネジメント",
  "サービスマネジメント",
  "システム戦略",
  "経営戦略",
  "企業と法務",
];

// ------- Session presets -------

function am80(categories = ADVANCED_CATEGORIES): SessionConfig {
  return { session: "am", urlSlug: "am", expectedQuestions: 80, label: "午前", categories };
}

function am50(categories: string[]): SessionConfig {
  return { session: "am", urlSlug: "am", expectedQuestions: 50, label: "午前", categories };
}

function am1(): SessionConfig {
  return {
    session: "am1",
    urlSlug: "am1",
    expectedQuestions: 30,
    label: "午前I",
    categories: HIGH_LEVEL_AM1_CATEGORIES,
  };
}

function am2(categories: string[]): SessionConfig {
  return { session: "am2", urlSlug: "am2", expectedQuestions: 25, label: "午前II", categories };
}

// ------- Exam configs -------

export const EXAM_CONFIGS: Record<ExamCode, ExamConfig> = {
  ip: {
    code: "ip",
    nameFull: "ITパスポート試験",
    urlSlug: "ip",
    level: "basic",
    // IP files are always qs.pdf / ans.pdf — no session prefix in filename
    sessions: [{ session: "am", urlSlug: "am", expectedQuestions: 100, label: "試験",
                 categories: BASIC_CATEGORIES, noSessionPrefix: true }],
    seasons: ["spring", "autumn"],
    yearRange: { start: 2009, end: 2020 },
    cbtYearRange: { start: 2021, end: 2025 },
  },
  sg: {
    code: "sg",
    nameFull: "情報セキュリティマネジメント試験",
    urlSlug: "sg",
    level: "basic",
    sessions: [
      am50(["情報セキュリティ", "リスクマネジメント", "情報セキュリティ管理", "情報セキュリティ対策", "セキュリティ技術", "法務・規程"]),
    ],
    seasons: ["spring", "autumn"],
    yearRange: { start: 2016, end: 2019 },
    cbtYearRange: { start: 2023, end: 2025 },
    cbtSessions: [
      { session: "kamoku-a", urlSlug: "kamoku-a", expectedQuestions: 48, label: "科目A",
        categories: ["情報セキュリティ", "リスクマネジメント", "情報セキュリティ管理", "情報セキュリティ対策", "セキュリティ技術", "法務・規程"] },
    ],
  },
  fe: {
    code: "fe",
    nameFull: "基本情報技術者試験",
    urlSlug: "fe",
    level: "basic",
    sessions: [am80(BASIC_CATEGORIES)],
    seasons: ["spring", "autumn"],
    yearRange: { start: 2009, end: 2019 },
    cbtYearRange: { start: 2023, end: 2025 },
    cbtSessions: [
      { session: "kamoku-a", urlSlug: "kamoku-a", expectedQuestions: 60, label: "科目A", categories: BASIC_CATEGORIES },
      { session: "kamoku-b", urlSlug: "kamoku-b", expectedQuestions: 20, label: "科目B",
        categories: ["アルゴリズムとプログラミング"] },
    ],
  },
  ap: {
    code: "ap",
    nameFull: "応用情報技術者試験",
    urlSlug: "ap",
    level: "advanced",
    sessions: [am80(ADVANCED_CATEGORIES)],
    seasons: ["spring", "autumn"],
    yearRange: { start: 2009, end: 2025 },
  },
  st: {
    code: "st",
    nameFull: "ITストラテジスト試験",
    urlSlug: "st",
    level: "specialist",
    sessions: [
      am1(),
      am2(["ITストラテジスト専門", "情報戦略", "業務改革", "システム化計画", "プロジェクト推進"]),
    ],
    seasons: ["spring"],
    yearRange: { start: 2021, end: 2025 },
    legacySeasons: ["autumn"],
    legacyYearRange: { start: 2009, end: 2019 },
  },
  sa: {
    code: "sa",
    nameFull: "システムアーキテクト試験",
    urlSlug: "sa",
    level: "specialist",
    sessions: [
      am1(),
      am2(["システムアーキテクチャ", "要件定義", "システム設計", "ソフトウェア設計", "品質管理"]),
    ],
    seasons: ["spring"],
    yearRange: { start: 2021, end: 2025 },
    legacySeasons: ["autumn"],
    legacyYearRange: { start: 2009, end: 2019 },
  },
  pm: {
    code: "pm",
    nameFull: "プロジェクトマネージャ試験",
    urlSlug: "pm",
    level: "specialist",
    sessions: [
      am1(),
      am2(["プロジェクトマネジメント", "スコープ管理", "コスト管理", "スケジュール管理", "リスク管理", "品質管理", "EVM"]),
    ],
    seasons: ["autumn"],
    yearRange: { start: 2020, end: 2025 },
    legacySeasons: ["spring"],
    legacyYearRange: { start: 2009, end: 2019 },
  },
  nw: {
    code: "nw",
    nameFull: "ネットワークスペシャリスト試験",
    urlSlug: "nw",
    level: "specialist",
    sessions: [
      am1(),
      am2(["ネットワーク設計", "TCP/IP", "プロトコル", "ネットワークセキュリティ", "ルーティング", "無線LAN"]),
    ],
    seasons: ["spring"],
    yearRange: { start: 2021, end: 2025 },
    legacySeasons: ["autumn"],
    legacyYearRange: { start: 2009, end: 2019 },
  },
  db: {
    code: "db",
    nameFull: "データベーススペシャリスト試験",
    urlSlug: "db",
    level: "specialist",
    sessions: [
      am1(),
      am2(["データベース設計", "SQL", "正規化", "トランザクション", "障害回復", "データウェアハウス"]),
    ],
    seasons: ["autumn"],
    yearRange: { start: 2020, end: 2025 },
    legacySeasons: ["spring"],
    legacyYearRange: { start: 2009, end: 2019 },
  },
  es: {
    code: "es",
    nameFull: "エンベデッドシステムスペシャリスト試験",
    urlSlug: "es",
    level: "specialist",
    sessions: [
      am1(),
      am2(["組込みシステム", "リアルタイムOS", "ハードウェア設計", "IoT", "信頼性設計", "安全性設計"]),
    ],
    seasons: ["autumn"],
    yearRange: { start: 2020, end: 2025 },
    legacySeasons: ["spring"],
    legacyYearRange: { start: 2009, end: 2019 },
  },
  sc: {
    code: "sc",
    nameFull: "情報処理安全確保支援士試験",
    urlSlug: "sc",
    level: "specialist",
    sessions: [
      am1(),
      am2(["情報セキュリティ", "暗号技術", "認証技術", "ネットワークセキュリティ", "セキュリティ管理", "インシデント対応", "法規"]),
    ],
    seasons: ["spring", "autumn"],
    yearRange: { start: 2009, end: 2025 },
  },
  sm: {
    code: "sm",
    nameFull: "ITサービスマネージャ試験",
    urlSlug: "sm",
    level: "specialist",
    sessions: [
      am1(),
      am2(["ITサービスマネジメント", "ITIL", "SLA", "インシデント管理", "問題管理", "変更管理", "キャパシティ管理"]),
    ],
    seasons: ["spring"],
    yearRange: { start: 2021, end: 2025 },
    legacySeasons: ["autumn"],
    legacyYearRange: { start: 2009, end: 2019 },
  },
  au: {
    code: "au",
    nameFull: "システム監査技術者試験",
    urlSlug: "au",
    level: "specialist",
    sessions: [
      am1(),
      am2(["システム監査", "内部統制", "監査手続", "ITガバナンス", "リスク評価", "コンプライアンス"]),
    ],
    seasons: ["autumn"],
    yearRange: { start: 2020, end: 2025 },
    legacySeasons: ["spring"],
    legacyYearRange: { start: 2009, end: 2019 },
  },
  fp2: {
    code: "fp2",
    nameFull: "2級ファイナンシャル・プランニング技能検定",
    urlSlug: "fp2",
    level: "basic",
    sessions: [{
      session: "gakka",
      urlSlug: "gakka",
      expectedQuestions: 60,
      label: "学科",
      categories: ["ライフプランニングと資金計画", "リスク管理", "金融資産運用", "タックスプランニング", "不動産", "相続・事業承継"],
    }],
    seasons: ["may", "september", "january", "published"],
    yearRange: { start: 2024, end: 2026 },
  },
  fp1: {
    code: "fp1",
    nameFull: "1級ファイナンシャル・プランニング技能検定",
    urlSlug: "fp1",
    level: "advanced",
    sessions: [{
      session: "gakka",
      urlSlug: "gakka",
      expectedQuestions: 50,
      label: "学科・基礎編",
      categories: ["ライフプランニングと資金計画", "リスク管理", "金融資産運用", "タックスプランニング", "不動産", "相続・事業承継"],
    }],
    seasons: ["may", "september"],
    yearRange: { start: 2026, end: 2026 },
  },
  fp3: {
    code: "fp3",
    nameFull: "3級ファイナンシャル・プランニング技能検定",
    urlSlug: "fp3",
    level: "basic",
    sessions: [{
      session: "gakka",
      urlSlug: "gakka",
      expectedQuestions: 60,
      label: "学科",
      categories: ["ライフプランニングと資金計画", "リスク管理", "金融資産運用", "タックスプランニング", "不動産", "相続・事業承継"],
    }],
    seasons: ["published"],
    yearRange: { start: 2024, end: 2025 },
  },
  denken3: {
    code: "denken3",
    nameFull: "第三種電気主任技術者試験",
    urlSlug: "denken3",
    level: "advanced",
    sessions: [
      { session: "riron", urlSlug: "riron", expectedQuestions: 20, label: "理論", categories: ["電気理論", "電子理論", "電気計測", "電子計測"] },
      { session: "denryoku", urlSlug: "denryoku", expectedQuestions: 20, label: "電力", categories: ["発電", "変電", "送配電", "電気材料"] },
      { session: "kikai", urlSlug: "kikai", expectedQuestions: 20, label: "機械", categories: ["電気機器", "パワーエレクトロニクス", "照明", "情報"] },
      { session: "houki", urlSlug: "houki", expectedQuestions: 20, label: "法規", categories: ["電気事業法", "電気設備技術基準", "電気施設管理"] },
    ],
    seasons: ["first", "second"],
    yearRange: { start: 2024, end: 2025 },
  },
  denken1: {
    code: "denken1",
    nameFull: "第一種電気主任技術者試験 一次試験",
    urlSlug: "denken1",
    level: "advanced",
    sessions: [
      { session: "riron", urlSlug: "riron", expectedQuestions: 5, label: "理論", categories: ["理論"] },
      { session: "denryoku", urlSlug: "denryoku", expectedQuestions: 5, label: "電力", categories: ["電力"] },
      { session: "kikai", urlSlug: "kikai", expectedQuestions: 5, label: "機械", categories: ["機械"] },
      { session: "houki", urlSlug: "houki", expectedQuestions: 5, label: "法規", categories: ["法規"] },
    ],
    seasons: ["primary"],
    yearRange: { start: 2026, end: 2026 },
  },
  denken2: {
    code: "denken2",
    nameFull: "第二種電気主任技術者試験 一次試験",
    urlSlug: "denken2",
    level: "advanced",
    sessions: [
      { session: "denryoku", urlSlug: "denryoku", expectedQuestions: 35, label: "電力", categories: ["電力"] },
      { session: "houki", urlSlug: "houki", expectedQuestions: 35, label: "法規", categories: ["法規"] },
    ],
    seasons: ["primary"],
    yearRange: { start: 2026, end: 2026 },
  },
  denko2: {
    code: "denko2",
    nameFull: "第二種電気工事士学科試験",
    urlSlug: "denko2",
    level: "basic",
    sessions: [{
      session: "gakka",
      urlSlug: "gakka",
      expectedQuestions: 50,
      label: "学科",
      categories: ["電気理論・配電", "電気機器・材料・工具", "施工・法規・検査", "配線図"],
    }],
    seasons: ["first", "second"],
    yearRange: { start: 2024, end: 2025 },
  },
  denko1: {
    code: "denko1",
    nameFull: "第一種電気工事士学科試験",
    urlSlug: "denko1",
    level: "basic",
    sessions: [{
      session: "gakka",
      urlSlug: "gakka",
      expectedQuestions: 50,
      label: "学科",
      categories: ["電気理論・配電", "電気機器・発変電", "高圧設備・材料・施工", "設備図・検査・法令", "配線図(単線結線図)"],
    }],
    seasons: ["first", "second"],
    yearRange: { start: 2025, end: 2026 },
  },
  takken: {
    code: "takken",
    nameFull: "宅地建物取引士資格試験",
    urlSlug: "takken",
    level: "advanced",
    sessions: [{
      session: "gakka",
      urlSlug: "gakka",
      expectedQuestions: 50,
      label: "本試験",
      categories: ["権利関係", "法令上の制限", "税・価格評定", "宅建業法", "免除科目"],
    }],
    seasons: ["october"],
    yearRange: { start: 2024, end: 2025 },
  },
  civil2: {
    code: "civil2",
    nameFull: "2級土木施工管理技術検定",
    urlSlug: "civil2",
    level: "basic",
    sessions: [{
      session: "gakka",
      urlSlug: "gakka",
      expectedQuestions: 66,
      label: "第一次検定（前期・土木）",
      categories: ["土木一般（必須）", "土木一般（選択）", "専門土木（選択）", "法規（選択）", "施工管理（必須）"],
    }],
    seasons: ["early", "october"],
    yearRange: { start: 2025, end: 2026 },
  },
  kankoji2: {
    code: "kankoji2",
    nameFull: "2級管工事施工管理技術検定",
    urlSlug: "kankoji2",
    level: "basic",
    sessions: [{
      session: "gakka",
      urlSlug: "gakka",
      expectedQuestions: 52,
      label: "第一次検定",
      categories: ["一般基礎（必須）", "空調・衛生設備（選択）", "設備機器・材料（必須）", "施工管理法（選択）", "法規（選択）", "施工管理法・基礎的な能力（必須）"],
    }],
    seasons: ["early", "late"],
    yearRange: { start: 2025, end: 2026 },
  },
  zoen2: {
    code: "zoen2",
    nameFull: "2級造園施工管理技術検定",
    urlSlug: "zoen2",
    level: "basic",
    sessions: [{
      session: "gakka",
      urlSlug: "gakka",
      expectedQuestions: 40,
      label: "第一次検定（前期・後期）",
      categories: ["造園技術"],
    }],
    seasons: ["early", "late"],
    yearRange: { start: 2025, end: 2026 },
  },
  zoen1: {
    code: "zoen1",
    nameFull: "1級造園施工管理技術検定",
    urlSlug: "zoen1",
    level: "advanced",
    sessions: [
      { session: "mondai-a", urlSlug: "mondai-a", expectedQuestions: 36, label: "第一次検定 問題A", categories: ["造園技術"] },
      { session: "mondai-b", urlSlug: "mondai-b", expectedQuestions: 29, label: "第一次検定 問題B", categories: ["施工管理法"] },
    ],
    seasons: ["september"],
    yearRange: { start: 2026, end: 2026 },
  },
  tsushin2: {
    code: "tsushin2",
    nameFull: "2級電気通信工事施工管理技術検定",
    urlSlug: "tsushin2",
    level: "basic",
    sessions: [{
      session: "gakka",
      urlSlug: "gakka",
      expectedQuestions: 65,
      label: "第一次検定（前期）",
      categories: ["電気通信技術"],
    }],
    seasons: ["early"],
    yearRange: { start: 2026, end: 2026 },
  },
  tsushin1: {
    code: "tsushin1",
    nameFull: "1級電気通信工事施工管理技術検定",
    urlSlug: "tsushin1",
    level: "advanced",
    sessions: [
      { session: "mondai-a", urlSlug: "mondai-a", expectedQuestions: 55, label: "第一次検定 問題A", categories: ["電気通信技術"] },
      { session: "mondai-b", urlSlug: "mondai-b", expectedQuestions: 35, label: "第一次検定 問題B", categories: ["施工管理法"] },
    ],
    seasons: ["september"],
    yearRange: { start: 2026, end: 2026 },
  },
  kaigo: {
    code: "kaigo",
    nameFull: "介護福祉士国家試験",
    urlSlug: "kaigo",
    level: "basic",
    sessions: [{
      session: "gakka",
      urlSlug: "gakka",
      expectedQuestions: 125,
      label: "筆記試験",
      categories: [
        "人間の尊厳と自立", "介護の基本", "社会の理解", "人間関係とコミュニケーション", "コミュニケーション技術",
        "生活支援技術", "こころとからだのしくみ", "発達と老化の理解", "認知症の理解", "障害の理解",
        "医療的ケア", "介護過程", "総合問題",
      ],
    }],
    seasons: ["annual"],
    yearRange: { start: 2024, end: 2025 },
  },
  civil1: {
    code: "civil1",
    nameFull: "1級土木施工管理技術検定",
    urlSlug: "civil1",
    level: "advanced",
    sessions: [
      {
        session: "mondai-a",
        urlSlug: "mondai-a",
        expectedQuestions: 66,
        label: "第一次検定 問題A",
        categories: ["土木一般（必須）", "土木一般（選択）", "専門土木（選択）", "法規（選択）"],
      },
      {
        session: "mondai-b",
        urlSlug: "mondai-b",
        expectedQuestions: 35,
        label: "第一次検定 問題B",
        categories: ["共通工学・施工管理法（必須）", "施工管理法・応用能力（必須）"],
      },
    ],
    seasons: ["july"],
    yearRange: { start: 2026, end: 2026 },
  },
  shakai: {
    code: "shakai",
    nameFull: "社会福祉士国家試験",
    urlSlug: "shakai",
    level: "basic",
    sessions: [
      {
        session: "kyotsu",
        urlSlug: "kyotsu",
        expectedQuestions: 84,
        label: "共通科目",
        categories: SSSC_COMMON_SUBJECTS,
      },
      {
        session: "senmon",
        urlSlug: "senmon",
        expectedQuestions: 45,
        label: "専門科目",
        categories: [
          "高齢者福祉", "児童・家庭福祉", "貧困に対する支援", "保健医療と福祉",
          "ソーシャルワークの基盤と専門職（専門）", "ソーシャルワークの理論と方法（専門）", "福祉サービスの組織と経営",
        ],
      },
    ],
    seasons: ["annual"],
    yearRange: { start: 2025, end: 2025 },
  },
  seishin: {
    code: "seishin",
    nameFull: "精神保健福祉士国家試験",
    urlSlug: "seishin",
    level: "basic",
    sessions: [
      {
        session: "senmon",
        urlSlug: "senmon",
        expectedQuestions: 48,
        label: "専門科目",
        categories: [
          "精神医学と精神医療", "現代の精神保健の課題と支援", "精神保健福祉の原理",
          "ソーシャルワークの理論と方法（専門）", "精神障害リハビリテーション論", "精神保健福祉制度論",
        ],
      },
      {
        session: "kyotsu",
        urlSlug: "kyotsu",
        expectedQuestions: 84,
        label: "共通科目",
        categories: SSSC_COMMON_SUBJECTS,
      },
    ],
    seasons: ["annual"],
    yearRange: { start: 2024, end: 2025 },
  },
  tohan: {
    code: "tohan",
    nameFull: "登録販売者試験（関西広域連合）",
    urlSlug: "tohan",
    level: "basic",
    sessions: [{
      session: "gakka",
      urlSlug: "gakka",
      expectedQuestions: 120,
      label: "試験問題（前半・後半）",
      categories: [
        "医薬品に共通する特性と基本的な知識",
        "人体の働きと医薬品",
        "主な医薬品とその作用",
        "薬事に関する法規と制度",
        "医薬品の適正使用と安全対策",
      ],
    }],
    seasons: ["kansai"],
    yearRange: { start: 2025, end: 2025 },
  },
  kanri: {
    code: "kanri",
    nameFull: "管理業務主任者試験",
    urlSlug: "kanri",
    level: "advanced",
    sessions: [{
      session: "gakka", urlSlug: "gakka", expectedQuestions: 50, label: "試験問題",
      categories: ["民法", "標準管理委託契約書"],
    }],
    seasons: ["annual"],
    yearRange: { start: 2025, end: 2025 },
  },
  eisei1: {
    code: "eisei1",
    nameFull: "第一種衛生管理者免許試験",
    urlSlug: "eisei1",
    level: "basic",
    sessions: [{
      session: "gakka", urlSlug: "gakka", expectedQuestions: 44, label: "試験問題",
      categories: ["関係法令", "労働衛生", "労働生理"],
    }],
    seasons: ["published"],
    yearRange: { start: 2025, end: 2026 },
  },
  eisei2: {
    code: "eisei2",
    nameFull: "第二種衛生管理者免許試験",
    urlSlug: "eisei2",
    level: "basic",
    sessions: [{
      session: "gakka", urlSlug: "gakka", expectedQuestions: 30, label: "試験問題",
      categories: ["関係法令", "労働衛生", "労働生理"],
    }],
    seasons: ["published"],
    yearRange: { start: 2025, end: 2026 },
  },
  soukan: {
    code: "soukan",
    nameFull: "技術士第二次試験 総合技術監理部門",
    urlSlug: "soukan",
    level: "advanced",
    sessions: [{
      session: "gakka", urlSlug: "gakka", expectedQuestions: 40, label: "必須科目Ⅰ－1（択一式）",
      categories: ["経済性管理", "人的資源管理", "情報管理", "安全管理", "社会環境管理"],
    }],
    seasons: ["annual"],
    yearRange: { start: 2025, end: 2026 },
  },
  hoikushi: {
    code: "hoikushi",
    nameFull: "保育士試験",
    urlSlug: "hoikushi",
    level: "basic",
    sessions: [
      { session: "hoiku-genri", urlSlug: "hoiku-genri", expectedQuestions: 20, label: "保育原理", categories: ["保育原理"] },
      { session: "kyoiku-genri", urlSlug: "kyoiku-genri", expectedQuestions: 10, label: "教育原理", categories: ["教育原理"] },
      { session: "shakaiteki-yougo", urlSlug: "shakaiteki-yougo", expectedQuestions: 10, label: "社会的養護", categories: ["社会的養護"] },
      { session: "kodomo-katei-fukushi", urlSlug: "kodomo-katei-fukushi", expectedQuestions: 20, label: "子ども家庭福祉", categories: ["子ども家庭福祉"] },
      { session: "shakai-fukushi", urlSlug: "shakai-fukushi", expectedQuestions: 20, label: "社会福祉", categories: ["社会福祉"] },
      { session: "hoiku-shinrigaku", urlSlug: "hoiku-shinrigaku", expectedQuestions: 20, label: "保育の心理学", categories: ["保育の心理学"] },
      { session: "kodomo-hoken", urlSlug: "kodomo-hoken", expectedQuestions: 20, label: "子どもの保健", categories: ["子どもの保健"] },
      { session: "kodomo-shokueiyou", urlSlug: "kodomo-shokueiyou", expectedQuestions: 20, label: "子どもの食と栄養", categories: ["子どもの食と栄養"] },
      { session: "hoiku-jisshu-riron", urlSlug: "hoiku-jisshu-riron", expectedQuestions: 20, label: "保育実習理論", categories: ["保育実習理論"] },
    ],
    seasons: ["early", "late"],
    yearRange: { start: 2025, end: 2026 },
  },
  mankan: {
    code: "mankan",
    nameFull: "マンション管理士試験",
    urlSlug: "mankan",
    level: "advanced",
    sessions: [{
      session: "gakka", urlSlug: "gakka", expectedQuestions: 50, label: "試験問題",
      categories: ["区分所有法", "民法", "被災区分所有法", "マンション建替え円滑化法", "都市計画法・建築基準法", "標準管理規約", "維持保全・建物設備", "マンション管理適正化法", "会計・税務"],
    }],
    seasons: ["annual"],
    yearRange: { start: 2024, end: 2025 },
  },
  kashikin: {
    code: "kashikin",
    nameFull: "貸金業務取扱主任者資格試験",
    urlSlug: "kashikin",
    level: "basic",
    sessions: [{
      session: "gakka", urlSlug: "gakka", expectedQuestions: 50, label: "試験問題",
      categories: ["法及び関係法令に関すること", "貸付け及び貸付けに付随する取引に関する法令及び実務に関すること", "資金需要者等の保護に関すること", "財務及び会計に関すること"],
    }],
    seasons: ["annual"],
    yearRange: { start: 2024, end: 2025 },
  },
  sharoushi: {
    code: "sharoushi",
    nameFull: "社会保険労務士試験",
    urlSlug: "sharoushi",
    level: "advanced",
    sessions: [{
      session: "gakka", urlSlug: "gakka", expectedQuestions: 10, label: "択一式・労働基準法及び労働安全衛生法（収録中の一部10問）",
      categories: ["労働基準法", "労働安全衛生法"],
    }, {
      session: "rousai", urlSlug: "rousai", expectedQuestions: 10, label: "択一式・労災保険法及び徴収法（収録中の一部10問）",
      categories: ["労働者災害補償保険法", "労働保険徴収法"],
    }, {
      session: "koyou", urlSlug: "koyou", expectedQuestions: 10, label: "択一式・雇用保険法及び徴収法（収録中の一部10問）",
      categories: ["雇用保険法", "労働保険徴収法"],
    }, {
      session: "kenpo", urlSlug: "kenpo", expectedQuestions: 10, label: "択一式・健康保険法（収録中の一部10問）",
      categories: ["健康保険法"],
    }, {
      session: "ippan", urlSlug: "ippan", expectedQuestions: 10, label: "択一式・一般常識（収録中の一部10問）",
      categories: ["労務管理その他の労働及び社会保険に関する一般常識"],
    }],
    seasons: ["annual"],
    yearRange: { start: 2025, end: 2026 },
  },
  yakuzaishi: {
    code: "yakuzaishi",
    nameFull: "薬剤師国家試験",
    urlSlug: "yakuzaishi",
    level: "advanced",
    sessions: [
      { session: "required", urlSlug: "required", expectedQuestions: 90, label: "必須問題", categories: ["必須問題"] },
      { session: "theory", urlSlug: "theory", expectedQuestions: 105, label: "薬学理論問題", categories: ["一般問題（薬学理論問題）"] },
      { session: "practical", urlSlug: "practical", expectedQuestions: 150, label: "薬学実践問題", categories: ["一般問題（薬学実践問題）"] },
    ],
    seasons: ["annual"],
    yearRange: { start: 2025, end: 2026 },
  },
  hokenshi: {
    code: "hokenshi",
    nameFull: "保健師国家試験",
    urlSlug: "hokenshi",
    level: "advanced",
    sessions: [
      { session: "am", urlSlug: "am", expectedQuestions: 55, label: "午前", categories: ["午前"] },
      { session: "pm", urlSlug: "pm", expectedQuestions: 55, label: "午後", categories: ["午後"] },
    ],
    seasons: ["annual"],
    yearRange: { start: 2024, end: 2025 },
  },
  josanshi: {
    code: "josanshi",
    nameFull: "助産師国家試験",
    urlSlug: "josanshi",
    level: "advanced",
    sessions: [{ session: "am", urlSlug: "am", expectedQuestions: 55, label: "午前", categories: ["午前"] }],
    seasons: ["annual"],
    yearRange: { start: 2024, end: 2025 },
  },
  "sagyo-ryohoshi": {
    code: "sagyo-ryohoshi",
    nameFull: "作業療法士国家試験",
    urlSlug: "sagyo-ryohoshi",
    level: "advanced",
    sessions: [{ session: "pm", urlSlug: "pm", expectedQuestions: 100, label: "午後", categories: ["午後"] }],
    seasons: ["annual"],
    yearRange: { start: 2024, end: 2025 },
  },
  "shino-kunrenshi": {
    code: "shino-kunrenshi",
    nameFull: "視能訓練士国家試験",
    urlSlug: "shino-kunrenshi",
    level: "advanced",
    sessions: [{ session: "pm", urlSlug: "pm", expectedQuestions: 75, label: "午後", categories: ["午後"] }],
    seasons: ["annual"],
    yearRange: { start: 2024, end: 2025 },
  },
  kangoshi: {
    code: "kangoshi",
    nameFull: "看護師国家試験",
    urlSlug: "kangoshi",
    level: "basic",
    // 収録は第115回・第114回の午前 問1〜50（第115回問32は採点除外のため未収録）。午前全体の問題数ではない。
    sessions: [{
      session: "am", urlSlug: "am", expectedQuestions: 50, label: "午前",
      categories: ["必修問題", "一般問題"],
    }],
    seasons: ["annual"],
    yearRange: { start: 2024, end: 2025 },
  },
  "ahaki-anma": {
    code: "ahaki-anma",
    nameFull: "あん摩マッサージ指圧師国家試験",
    urlSlug: "ahaki-anma",
    level: "basic",
    sessions: [
      { session: "am", urlSlug: "am", expectedQuestions: 80, label: "午前", categories: ["あん摩マッサージ指圧師"] },
      { session: "pm", urlSlug: "pm", expectedQuestions: 80, label: "午後", categories: ["あん摩マッサージ指圧師"] },
    ],
    seasons: ["annual"],
    yearRange: { start: 2025, end: 2026 },
  },
  "ahaki-hari-kyu": {
    code: "ahaki-hari-kyu",
    nameFull: "はり師・きゅう師国家試験",
    urlSlug: "ahaki-hari-kyu",
    level: "basic",
    sessions: [
      { session: "am", urlSlug: "am", expectedQuestions: 90, label: "午前", categories: ["はり師・きゅう師 共通"] },
      { session: "pm", urlSlug: "pm", expectedQuestions: 90, label: "午後", categories: ["はり師・きゅう師 共通", "はり師 専用", "きゅう師 専用"] },
    ],
    seasons: ["annual"],
    yearRange: { start: 2025, end: 2026 },
  },
};

/** IPA-only list retained for fetch/import tooling and legacy IPA invariants. */
export const ALL_EXAM_CODES = Object.keys(EXAM_CONFIGS).filter(
  (code): code is IpaExamCode => !(["fp1", "fp2", "fp3", "denken3", "denken2", "denken1", "denko2", "denko1", "takken", "civil2", "civil1", "kankoji2", "zoen2", "zoen1", "tsushin2", "tsushin1", "kaigo", "shakai", "seishin", "tohan", "kanri", "eisei1", "eisei2", "soukan", "hoikushi", "mankan", "kashikin", "sharoushi", "kangoshi", "yakuzaishi", "ahaki-anma", "ahaki-hari-kyu", "hokenshi", "josanshi", "sagyo-ryohoshi", "shino-kunrenshi"] as string[]).includes(code),
);

/** Every exam playable in the application, including external qualifications. */
export const ALL_QUIZ_EXAM_CODES = (Object.keys(EXAM_CONFIGS) as ExamCode[]).filter(isExamPublished);

/** Fallback URL shown when a question has no specific PDF URL. */
export const IPA_EXAM_INFO_URL = "https://www.ipa.go.jp/shiken/mondai-kaiotu/";

// www.jitec.ipa.go.jp was IPA's old exam-materials subdomain. IPA decommissioned
// it — the host no longer resolves (NXDOMAIN as of 2026-06) — so every stored
// sourcePdfUrl pointing there is a dead 出典 link. The replacement PDFs live under
// www.ipa.go.jp/shiken/mondai-kaiotu/ but in opaque CMS-hashed directories
// (…/gmcbt80000009sgk-att/…), so the old path cannot be remapped deterministically
// and IPA keeps only a limited window of years online. Rather than serve a dead
// link (or guess a new one that 404s), route these to the live IPA exam-materials
// index, which is always 200 and lists the current PDFs — keeping the 出典 link
// honest per CLAUDE.md §8. Already-migrated www.ipa.go.jp URLs pass through.
const DEAD_PDF_HOST = "jitec.ipa.go.jp";

function isLivePdfUrl(url: string | undefined): url is string {
  return (
    !!url && url.startsWith("https://") && !url.includes(DEAD_PDF_HOST)
  );
}

/** True when a link points directly to a PDF document, rather than an index page. */
export function isPdfDocumentUrl(url: string | undefined): boolean {
  if (!url) return false;
  try {
    return new URL(url).pathname.toLowerCase().endsWith(".pdf");
  } catch {
    return false;
  }
}

/** Honest user-facing label for an IPA source link after fallback handling. */
export function ipaSourceLabel(url: string | undefined, kind: "question" | "answer"): string {
  if (!isPdfDocumentUrl(url)) {
    if (url?.startsWith("https://www.kinzai.or.jp/")) return kind === "question" ? "主催団体の公式問題" : "主催団体の模範解答";
    return "IPA公式の過去問一覧";
  }
  return kind === "question" ? "問題PDF" : "公式解答PDF";
}

/**
 * Returns a valid, live IPA source URL for the given raw value.
 * Falls back to the IPA exam materials index when the URL is absent, a
 * placeholder, or points to the decommissioned jitec.ipa.go.jp host.
 */
export function getSafePdfUrl(sourcePdfUrl: string | undefined): string {
  return isLivePdfUrl(sourcePdfUrl) ? sourcePdfUrl : IPA_EXAM_INFO_URL;
}

/**
 * Returns the IPA official answer PDF URL for a question.
 * Derived from sourcePdfUrl by swapping "_qs.pdf" → "_ans.pdf" (the IPA naming convention).
 * Falls back to the safe info page when the URL is missing, a placeholder, or
 * on the decommissioned jitec.ipa.go.jp host (deriving from a dead URL stays dead).
 */
export function getOfficialAnswerPdfUrl(
  sourcePdfUrl: string | undefined,
  sourceAnswerUrl?: string,
): string {
  if (sourceAnswerUrl?.startsWith("https://")) return sourceAnswerUrl;
  if (sourcePdfUrl && officialAnswerUrls.has(sourcePdfUrl)) return officialAnswerUrls.get(sourcePdfUrl)!;
  if (!isLivePdfUrl(sourcePdfUrl)) {
    return IPA_EXAM_INFO_URL;
  }
  if (sourcePdfUrl.endsWith("_qs.pdf")) {
    return sourcePdfUrl.replace(/_qs\.pdf$/, "_ans.pdf");
  }
  // CBT or non-standard URLs: fall back to source link itself
  return sourcePdfUrl;
}

// ------- URL builders -------

export function buildPdfUrl(
  cfg: ExamConfig,
  year: number,
  season: Season,
  sessionCfg: SessionConfig,
  type: "qs" | "ans",
): string {
  // CBT exams have a different URL structure — return empty string as a safe fallback
  if (season === "cbt") return "";
  const rr = String(year - 2018).padStart(2, "0");
  const sn = season === "spring" ? "1" : "2";
  const sc = season === "spring" ? "h" : "a";
  return (
    `https://www.jitec.ipa.go.jp/1_04hanni_sukiru/mondai_kaitou_${year}h${rr}_${sn}/` +
    `${year}h${rr}${sc}_${cfg.urlSlug}_${sessionCfg.urlSlug}_${type}.pdf`
  );
}

/**
 * Returns the 出典 (source) URL to STORE in question data for a given exam slot.
 *
 * buildPdfUrl() still emits the legacy www.jitec.ipa.go.jp deep path (the fetch
 * crawler uses it to locate the raw file), but that host is decommissioned
 * (NXDOMAIN), so persisting its output as-is re-injects a dead 出典 link on every
 * parse run. getSafePdfUrl() degrades the dead host to the live IPA index —
 * matching exactly what the serve layer already shows — so parsed data stays
 * honest at rest, not just behind the runtime gate. See CLAUDE.md §8.
 */
export function buildSourcePdfUrl(
  cfg: ExamConfig,
  year: number,
  season: Season,
  sessionCfg: SessionConfig,
): string {
  return getSafePdfUrl(buildPdfUrl(cfg, year, season, sessionCfg, "qs"));
}

export function buildRawPdfPath(
  exam: ExamCode,
  year: number,
  season: Season,
  session: Session,
  type: "qs" | "ans",
  noSessionPrefix = false,
): string {
  if (noSessionPrefix) return `${exam}/${year}-${season}/${type}.pdf`;
  return `${exam}/${year}-${season}/${session}_${type}.pdf`;
}

// ------- Prompt builder -------

export function buildExtractionPrompt(
  cfg: ExamConfig,
  year: number,
  season: Season,
  sessionCfg: SessionConfig,
): string {
  const seasonLabel = season === "spring" ? "春期" : season === "autumn" ? "秋期" : season === "cbt" ? "CBT" : season;
  const categoryList = sessionCfg.categories
    .map((c, i) => `${i + 1}. ${c}`)
    .join("\n");

  return `This is the IPA (情報処理技術者試験) ${cfg.nameFull} ${sessionCfg.label} exam question PDF for ${year}年度 ${seasonLabel}.

Extract ALL ${sessionCfg.expectedQuestions} multiple-choice questions. Each question has:
- 問番号 (question number)
- 問題文 (question text)
- 選択肢 labeled ア, イ, ウ, エ

Return ONLY a valid JSON array (no markdown, no explanation text):
[
  {
    "qNumber": 1,
    "question": "問題文の全文",
    "choices": { "ア": "...", "イ": "...", "ウ": "...", "エ": "..." },
    "category": "カテゴリ名",
    "hasImage": false
  }
]

For category, use one of these values:
${categoryList}

Set hasImage to true if the question references a figure or table that cannot be expressed in text.
Extract questions exactly as written. Do not paraphrase.`;
}

export function buildAnswerExtractionPrompt(sessionCfg: SessionConfig): string {
  return `This is the answer sheet for the IPA exam (${sessionCfg.label}, ${sessionCfg.expectedQuestions} questions).

Extract all ${sessionCfg.expectedQuestions} answers. Return ONLY a valid JSON object:
{
  "1": "ア",
  "2": "イ",
  ...
}

Answers are one of: ア, イ, ウ, エ`;
}

export function buildExplanationPrompt(
  cfg: ExamConfig,
  sessionCfg: SessionConfig,
  qList: string,
): string {
  return `以下はIPA ${cfg.nameFull} ${sessionCfg.label}問題です。各問について、正解の根拠を日本語で2〜3文で説明してください。

回答形式: 問題番号をキー、説明文を値とするJSONオブジェクト（マークダウン不要、JSONのみ）:
{
  "1": "問1の解説文",
  "2": "問2の解説文",
  ...
}

問題リスト:
${qList}`;
}
