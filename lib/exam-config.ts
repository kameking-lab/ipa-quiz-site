import type { ExamCode, IpaExamCode, Session, Season } from "@/lib/questions/types";

import officialSources from "@/data/questions/corrections/official-sources.json";

import { isExamPublished } from "@/lib/qualifications/catalog";

import { isCanonicalExamCode } from "@/lib/questions/exam-aliases";


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

const BUSINESS_CALC_CATEGORIES = [
  "乗算", "除算", "見取算", "減価償却", "年金・積立・返済", "手形割引", "利息・元金",
  "有価証券・手数料", "売価・原価・利益", "通貨換算", "割合・増減", "単位換算", "金額・数量",
];

export const EXAM_CONFIGS: Record<ExamCode, ExamConfig> = {
  "concrete-assou2": {"code": "concrete-assou2", "nameFull": "技能検定 2級コンクリート圧送施工（コンクリート圧送工事作業）学科試験", "urlSlug": "concrete-assou2", "level": "basic", "sessions": [{"session": "gakka", "urlSlug": "gakka", "expectedQuestions": 50, "label": "学科（A群 真偽法・B群 多肢択一法）", "categories": ["コンクリート材料・試験", "ポンプの構造・整備", "安全衛生", "建築構造", "打込み施工", "製図", "配合計算", "配管計画・圧送性", "鉄筋・型枠", "関係法令"]}], "seasons": ["late"], "yearRange": {"start": 2024, "end": 2025}},
  "kawarabuki1": {"code": "kawarabuki1", "nameFull": "技能検定 1級かわらぶき（かわらぶき作業）学科試験", "urlSlug": "kawarabuki1", "level": "advanced", "sessions": [{"session": "gakka", "urlSlug": "gakka", "expectedQuestions": 50, "label": "学科（A群 真偽法・B群 多肢択一法）", "categories": ["下地・下葺き", "勾配・計算", "安全衛生", "屋根材料", "屋根構造", "工具・定規", "建築構造・法規", "施工・納まり", "施工管理", "製図・縮尺"]}], "seasons": ["late"], "yearRange": {"start": 2024, "end": 2025}},
  "zensho-marketing": {"code": "zensho-marketing", "nameFull": "商業経済検定試験・マーケティング", "urlSlug": "zensho-marketing", "level": "basic", "sessions": [{"session": "gakka", "urlSlug": "gakka", "expectedQuestions": 50, "label": "マーケティング", "categories": ["マーケティングの基礎", "市場の細分化と標的市場", "市場と消費", "マーケティング戦略", "市場調査", "消費者行動", "製品政策", "購買行動", "製品戦略", "販売計画", "仕入計画", "価格政策", "チャネル政策", "プロモーション政策", "チャネルの系列化", "広告", "デジタル広告", "販売員と接客"]}], "seasons": ["annual"], "yearRange": {"start": 2021, "end": 2025}},
  "kogai-11": {"code": "kogai-11", "nameFull": "公害防止管理者等国家試験・騒音・振動概論", "urlSlug": "kogai-11", "level": "specialist", "sessions": [{"session": "gakka", "urlSlug": "gakka", "expectedQuestions": 25, "label": "騒音・振動概論", "categories": ["法令・制度", "騒音・振動の状況", "騒音の基礎", "振動の基礎"]}], "seasons": ["annual"], "yearRange": {"start": 2022, "end": 2026}},
  "kogai-14": {"code": "kogai-14", "nameFull": "公害防止管理者等国家試験・ダイオキシン類概論", "urlSlug": "kogai-14", "level": "specialist", "sessions": [{"session": "gakka", "urlSlug": "gakka", "expectedQuestions": 15, "label": "ダイオキシン類概論", "categories": ["法令・制度", "ダイオキシン類の性質・影響"]}], "seasons": ["annual"], "yearRange": {"start": 2022, "end": 2026}},
  "restaurant-1": {"code": "restaurant-1", "nameFull": "レストランサービス技能検定1級（学科）", "urlSlug": "restaurant-1", "level": "specialist", "sessions": [{"session": "gakka", "urlSlug": "gakka", "expectedQuestions": 100, "label": "学科（真偽法）", "categories": ["国際儀礼・接遇", "宴会・経営管理", "接客・料飲サービス", "設備・安全管理", "関係法規", "食品・飲料・調理", "食品衛生"]}], "seasons": ["annual"], "yearRange": {"start": 2025, "end": 2026}},
  "cfp-souzoku": {"code": "cfp-souzoku", "nameFull": "CFP®・相続・事業承継設計", "urlSlug": "cfp-souzoku", "level": "specialist", "sessions": [{"session": "gakka", "urlSlug": "gakka", "expectedQuestions": 50, "label": "相続・事業承継設計", "categories": ["不動産の相続税評価", "信託・配偶者居住権", "取引相場のない株式・事業承継", "国外財産・納税義務", "小規模宅地等の特例", "成年後見", "生前贈与加算・相続時精算課税", "相続人・法定相続分", "相続登記・土地国庫帰属", "相続税の債務控除", "相続税の申告・納付", "相続税の総額・税額控除", "相続税の課税財産", "贈与税", "遺留分", "遺言・遺産分割", "金融資産・その他の財産評価"]}], "seasons": ["round1", "round2"], "yearRange": {"start": 2022, "end": 2026}},
  "kogai-taiki-tokuron": {"code": "kogai-taiki-tokuron", "nameFull": "公害防止管理者（大気特論）", "urlSlug": "kogai-taiki-tokuron", "level": "specialist", "sessions": [{"session": "gakka", "urlSlug": "gakka", "expectedQuestions": 15, "label": "大気特論", "categories": ["燃料・燃焼", "排煙処理", "測定・分析"]}], "seasons": ["annual"], "yearRange": {"start": 2022, "end": 2026}},
  "telecom-chief-denso": {"code": "telecom-chief-denso", "nameFull": "電気通信主任技術者（伝送交換設備及び設備管理）", "urlSlug": "telecom-chief-denso", "level": "specialist", "sessions": [{"session": "gakka", "urlSlug": "gakka", "expectedQuestions": 60, "label": "伝送交換設備及び設備管理", "categories": ["光伝送"]}], "seasons": ["round1", "round2"], "yearRange": {"start": 2025, "end": 2026}},
  "kanken-j1": {
    code: "kanken-j1",
    nameFull: "日本漢字能力検定 準1級",
    urlSlug: "kanken-j1",
    level: "specialist",
    seasons: ["round1"],
    yearRange: {"start": 2026, "end": 2026},
    sessions: [
      {"session": "gakka", "urlSlug": "gakka", "label": "準1級", "expectedQuestions": 130, "categories": ["読み", "表外の読み", "熟語の読み・訓読み", "共通の漢字", "書き取り", "誤字訂正", "四字熟語", "対義語・類義語", "故事・諺", "文章題"]},
    ],
  },
  "zensho-bc": {
    code: "zensho-bc", nameFull: "全商ビジネスコミュニケーション検定", urlSlug: "zensho-bc", level: "specialist",
    sessions: [
      { session: "gakka", urlSlug: "gakka", expectedQuestions: 50, label: "筆記", categories: ["ビジネスマナー", "コミュニケーション", "接客の事例", "ビジネス全般"] },
    ],
    seasons: ["annual",
  "first",
  "second",], yearRange: { start: 2022, end: 2024 },
  },
  "kanken-4": {"code": "kanken-4", "nameFull": "日本漢字能力検定4級", "urlSlug": "kanken-4", "level": "basic", "sessions": [{"session": "gakka", "urlSlug": "gakka", "expectedQuestions": 120, "label": "4級", "categories": ["読み", "同音・同訓異字", "漢字識別", "熟語の構成", "部首", "対義語・類義語", "漢字と送りがな", "四字熟語", "誤字訂正", "書き取り"]}], "seasons": ["round1",
  "february",
  "june",], "yearRange": {"start": 2022, "end": 2026}},
  "kounin": {
    code: "kounin", nameFull: "高等学校卒業程度認定試験", urlSlug: "kounin", level: "basic",
    sessions: [
      {"session": "gakka", "urlSlug": "gakka", "expectedQuestions": 20, "label": "化学基礎", "categories": ["物質の構成", "化学結合", "物質量・化学反応式", "酸・塩基と酸化還元", "混合物の分離・中和"]},
      { session: "mondai-a", urlSlug: "mondai-a", expectedQuestions: 25, label: "国語", categories: ["話合い・実用文", "論説文", "古文と小説", "漢文"] },
      { session: "mondai-b", urlSlug: "mondai-b", expectedQuestions: 26, label: "歴史", categories: ["近現代の日本と学校給食", "国民国家と近代化", "世界大戦と国際秩序", "冷戦とグローバル化"] },
      { session: "gakka-IV", urlSlug: "gakka-IV", expectedQuestions: 40, label: "歴史", categories: ["光の性質", "熱とエネルギー", "金属", "食品", "ヒトの生命現象", "微生物", "地表の変化と災害", "日本の気象"] },
      {"session": "tiri", "urlSlug": "tiri", "label": "地理", "expectedQuestions": 20, "categories": ["地図・地理情報システム", "生活文化の多様性と国際理解", "地球的課題", "自然災害と防災", "生活圏の調査と地域の展望"]},
      { session: "gakka-I", urlSlug: "gakka-I", expectedQuestions: 20, label: "化学基礎", categories: ["物質の分離", "原子の構造", "物質の三態", "電子配置", "イオン結合", "電子式", "分子の極性", "結晶", "化学反応式", "分子量", "物質量", "モル濃度", "酸と塩基", "pH", "酸化数", "イオン化傾向", "水溶液の液性", "色素とpH", "イオン式", "土壌の酸性"] },
      { session: "gakka-II", urlSlug: "gakka-II", expectedQuestions: 6, label: "数学", categories: ["式の計算と集合", "不等式", "二次関数", "二次方程式と二次不等式", "図形と計量", "データの分析"] },
      {"session": "gakka-III", "urlSlug": "gakka-III", "label": "英語", "expectedQuestions": 24, "categories": ["会話文", "語句補充", "メッセージの目的", "英文整序", "案内文", "長文読解"]},
      {"session": "kokyo", "urlSlug": "kokyo", "expectedQuestions": 24, "label": "公共", "categories": ["公共と人権", "ルールと司法", "政治と行政", "金融と経済", "持続可能な社会"]},
      {"session": "kiso", "urlSlug": "kiso", "expectedQuestions": 20, "label": "生物基礎", "categories": ["生物の特徴", "遺伝子とその働き", "神経系と内分泌系", "免疫", "植生と遷移", "生態系と保全"]},
      {"session": "chigaku-kiso", "urlSlug": "chigaku-kiso", "expectedQuestions": 20, "label": "地学基礎", "categories": ["プレートと地球内部", "海流", "太陽系", "地層と地質構造", "防災"]},
    ],
    seasons: ["round1", "round2"], yearRange: { start: 2022, end: 2026 },
  },
  "kanken-10": {
    code: "kanken-10", nameFull: "漢検10級", urlSlug: "kanken-10", level: "specialist",
    sessions: [
      {"session": "gakka", "urlSlug": "gakka", "expectedQuestions": 81, "label": "漢検10級 第1回 A", "categories": ["文の中の漢字の読み", "筆順", "同じ漢字の異なる読み", "正しい読みの選択", "読みの穴埋め", "関連する漢字", "文の中の書き取り"]},
    ],
    seasons: ["round1",
  "february",], yearRange: { start: 2023, end: 2026 },
  },
  "kanken-9": {
    code: "kanken-9", nameFull: "漢検9級", urlSlug: "kanken-9", level: "specialist",
    sessions: [
      {"session": "gakka", "urlSlug": "gakka", "expectedQuestions": 105, "label": "漢検9級 第1回 A", "categories": ["文の中の漢字の読み", "筆順", "読みの穴埋め", "同じ漢字の異なる読み", "同音の漢字の選択", "同じ部品の漢字", "関連する漢字", "文の中の書き取り"]},
    ],
    seasons: ["round1"], yearRange: { start: 2026, end: 2026 },
  },
  "eju": {
    code: "eju",
    nameFull: "日本留学試験",
    urlSlug: "eju",
    level: "specialist",
    sessions: [
      { session: "eju-math-common", urlSlug: "eju-math-common", expectedQuestions: 1, label: "数学 コース1・2 共通Ⅰ", categories: ["二次関数と最大値・カード勝負の確率"] },
      { session: "eju-math-1", urlSlug: "eju-math-1", expectedQuestions: 3, label: "数学 コース1（Ⅱ〜Ⅳ）", categories: ["根号の比較と整数の範囲・二次関数の最小値", "n進法", "正弦定理と外接円"] },
      { session: "eju-math-2", urlSlug: "eju-math-2", expectedQuestions: 3, label: "数学 コース2（Ⅱ〜Ⅳ）", categories: ["空間ベクトル・複素数平面", "指数関数と微分", "三角関数の定積分"] },
      { session: "eju-physics", urlSlug: "eju-physics", expectedQuestions: 19, label: "理科 物理", categories: ["接触力", "力積", "斜面と滑車", "反発係数", "ばねの力学的エネルギー", "円運動の張力", "熱量保存", "定圧変化の仕事", "熱力学第一法則", "進行波", "弦の基本振動", "屈折の法則", "クーロン力", "静電エネルギー", "合成抵抗と電力", "直線電流の磁場", "電流が磁場から受ける力", "電磁誘導", "質量数の保存"] },
      { session: "eju-chemistry", urlSlug: "eju-chemistry", expectedQuestions: 20, label: "理科 化学", categories: ["原子とイオン", "共有電子対", "分子の形", "結晶の分類", "反応量の上限", "飽和水蒸気圧", "塩の水溶液", "酸化還元の量的関係", "電気分解", "化学平衡", "気体の発生", "金属のイオン化傾向", "水の酸塩基反応", "二酸化硫黄", "金属イオンの識別", "構造異性体", "エチレン", "有機反応の生成物", "不飽和炭化水素", "熱硬化性樹脂"] },
      { session: "eju-biology", urlSlug: "eju-biology", expectedQuestions: 17, label: "理科 生物", categories: ["ATPの構造", "細胞小器官", "光合成", "窒素固定", "エキソンとイントロン", "DNAの増幅", "減数分裂と連鎖", "原腸胚の胚葉", "被子植物の配偶子形成", "ヒトの循環", "自律神経系", "うずまき管", "筋収縮", "種子発芽", "生存曲線", "生態系のエネルギー収支", "植物の系統"] },
    ],
    seasons: ["round1"],
    yearRange: { start: 2021, end: 2021 },
  },
  "zensho-english": {
    code: "zensho-english", nameFull: "全商英語検定", urlSlug: "zensho-english", level: "advanced",
    sessions: [
      {"session": "gakka-I", "urlSlug": "gakka-I", "expectedQuestions": 12, "label": "1級 一次試験", "categories": ["発音", "リスニング", "読解", "会話", "語彙・文法"]},
      {"session": "practical", "urlSlug": "practical", "expectedQuestions": 12, "label": "1級", "categories": ["語の強勢", "リスニング・場面に応じた応答", "リスニング・問いへの応答", "リスニング・短い会話", "リスニング・説明文", "リスニング・長い会話", "長文の要約", "会話文の空所補充", "語彙の空所補充", "長文の空所補充", "同意文", "語句整序"]},
      { session: "gakka", urlSlug: "gakka", expectedQuestions: 12, label: "2級", categories: ["発音", "会話での応答", "リスニング：図表", "リスニング：短文", "リスニング：英文の内容", "リスニング：会話", "長文読解", "会話文補充", "語彙", "長文の語句補充", "文法", "語順整序"] },
      {"session": "gakka-II", "urlSlug": "gakka-II", "expectedQuestions": 12, "label": "2級 一次", "categories": ["第1音節の強勢", "場面に合う応答", "リスニング・絵や図表", "リスニング・短い英文", "リスニング・内容一致", "リスニング・会話", "母の日に関する読解", "鍵を探す場面の会話", "文脈に合う語彙", "企業の環境活動の読解", "動詞と代名詞の文法", "英文の語順整序"]},
      { session: "zensho-english-grade-3", urlSlug: "zensho-english-grade-3", expectedQuestions: 12, label: "3級 一次", categories: ["語のアクセント", "意味のまとまり", "対話で強く読む語句", "リスニング：絵", "リスニング：応答", "リスニング：長文", "長文読解", "会話文の補充", "絵と会話の対応", "語彙", "文法", "語順整序"] },
      { session: "gakka-III", urlSlug: "gakka-III", expectedQuestions: 12, label: "3級", categories: ["3級 一次", "会話", "会話・文脈", "会話・発音", "文法", "発音・アクセント", "聞き方", "語彙・表現", "語順", "読解"] },
    ],
    seasons: ["round2", "round1", "annual",
  "first",
  "second",], yearRange: { start: 2022, end: 2026 },
  },
  "kanken-j2": {
    code: "kanken-j2", nameFull: "日本漢字能力検定 準2級", urlSlug: "kanken-j2", level: "basic",
    sessions: [
      {"session": "gakka", "urlSlug": "gakka", "expectedQuestions": 120, "label": "準2級", "categories": ["読み", "音訓読み", "熟語の構成", "四字熟語", "対義語・類義語", "同音・同訓異字", "誤字訂正", "漢字と送りがな", "書き取り"]},
    ],
    seasons: ["round1"], yearRange: { start: 2026, end: 2026 },
  },
  "zensho-bido": {"code": "zensho-bido", "nameFull": "全商ビジネス文書実務検定", "urlSlug": "zensho-bido", "level": "basic", "sessions": [{"session": "gakka-II", "urlSlug": "gakka-II", "expectedQuestions": 8, "label": "2級 筆記", "categories": ["2級 筆記"]}, {"session": "gakka-I", "urlSlug": "gakka-I", "expectedQuestions": 8, "label": "1級 筆記", "categories": ["1級 筆記"]}, {"session": "gakka-III", "urlSlug": "gakka-III", "expectedQuestions": 8, "label": "3級 筆記", "categories": ["3級 筆記"]},
      {"session":"zensho-bido-jitsugi-3","urlSlug":"zensho-bido-jitsugi-3","expectedQuestions":1,"label":"3級 ビジネス文書部門 実技","categories":["ビジネス文書部門 実技", "3級・ビジネス文書部門 実技", "3級 ビジネス文書部門 実技"]},
      {"session":"zensho-bido-sokudo-2","urlSlug":"zensho-bido-sokudo-2","expectedQuestions":1,"label":"2級 速度部門","categories":["速度部門", "2級・速度部門"]},
      {"session":"zensho-bido-jitsugi-1","urlSlug":"zensho-bido-jitsugi-1","expectedQuestions":1,"label":"1級 ビジネス文書部門 実技","categories":["1級・ビジネス文書部門 実技", "第76回 1級 ビジネス文書部門 実技"]},
      {"session":"zensho-bido-sokudo-1","urlSlug":"zensho-bido-sokudo-1","expectedQuestions":1,"label":"1級 速度部門","categories":["1級・速度部門", "第76回 1級 速度部門", "1級 速度部門"]},
      {"session":"zensho-bido-jitsugi-2","urlSlug":"zensho-bido-jitsugi-2","expectedQuestions":1,"label":"2級 ビジネス文書部門 実技","categories":["第75回 2級 ビジネス文書部門 実技", "第76回 2級 ビジネス文書部門 実技", "2級 ビジネス文書部門 実技"]},
      {"session":"zensho-bido-sokudo-3","urlSlug":"zensho-bido-sokudo-3","expectedQuestions":1,"label":"3級 速度部門","categories":["第76回 3級 速度部門"]},
    ], "seasons": ["annual",
  "first",
  "second",], "yearRange": {"start": 2022, "end": 2026}},
  "kanken-6": {"code": "kanken-6", "nameFull": "日本漢字能力検定6級", "urlSlug": "kanken-6", "level": "basic", "sessions": [{"session": "gakka", "urlSlug": "gakka", "expectedQuestions": 120, "label": "6級", "categories": ["読み", "漢字と送りがな", "部首名と部首", "画数", "熟語の構成", "三字の熟語", "対義語・類義語", "熟語作り", "音と訓", "同じ読みの漢字", "漢字"]}], "seasons": ["annual"], "yearRange": {"start": 2026, "end": 2026}},
  "kanken-7": {
    code: "kanken-7", nameFull: "日本漢字能力検定7級", urlSlug: "kanken-7", level: "basic",
    sessions: [
      {"session": "gakka", "urlSlug": "gakka", "expectedQuestions": 120, "label": "7級", "categories": ["読み", "同じ字の読み", "漢字えらび", "画数", "音読み・訓読み", "対義語", "漢字と送りがな", "同じ部首の漢字", "同じ読みの漢字", "熟語作り", "漢字"]},
    ],
    seasons: ["round1",
  "published",], yearRange: { start: 2024, end: 2026 },
  },
  "kanken-8": {
    code: "kanken-8",
    nameFull: "日本漢字能力検定8級",
    urlSlug: "kanken-8",
    level: "specialist",
    sessions: [
      { session: "gakka", urlSlug: "gakka", expectedQuestions: 100, label: "8級", categories: ["漢字の読み", "筆順", "反対の意味のことば", "部首と漢字", "漢字の書き取り", "漢字と送りがな"] },
    ],
    seasons: ["annual"],
    yearRange: { start: 2026, end: 2026 },
  },
  "zensho-info": {
    code: "zensho-info", nameFull: "全商情報処理検定", urlSlug: "zensho-info", level: "specialist",
    sessions: [{ session: "gakka", urlSlug: "gakka", expectedQuestions: 7, label: "1級 ビジネス情報", categories: ["1級ビジネス情報", "1級プログラミング", "2級ビジネス情報", "2級プログラミング", "3級", "コンピュータ用語", "ネットワークの用語", "リレーショナルデータベース", "図表・ネットワーク", "情報処理の用語", "情報技術と割合", "情報技術の用語", "月額料金計算書", "業務と情報の活用", "表計算と分析", "表計算による業務処理", "表計算による見積もり", "通信とデータの計算"] }, {"session": "jken-programming", "urlSlug": "jken-programming", "expectedQuestions": 7, "label": "1級 プログラミング", "categories": ["用語", "基礎理論", "プログラム", "流れ図"]}, {"session": "programming-1", "urlSlug": "programming-1", "expectedQuestions": 7, "label": "第74回 1級 プログラミング", "categories": ["情報処理の用語", "ソフトウェアと機器の説明", "数値表現とシステムの指標", "配列の順位付けと並べ替え", "鉄道路線の年間乗客数", "販売データの処理", "移動図書館の巡回と図書の集計"]}, { session: "zensho-info-pro2", urlSlug: "zensho-info-pro2", expectedQuestions: 7, label: "2級 プログラミング", categories: ["情報機器・言語", "情報処理用語", "数の表現と基礎知識", "プログラムの追跡", "流れ図の空欄", "留学プランの集計", "サイズ別出荷の集計"] }, { session: "jken-business", urlSlug: "jken-business", expectedQuestions: 7, label: "1級 ビジネス情報", categories: ["ネットワークと信頼性", "企業連携・データ復旧・分析", "情報処理の用語", "料金計算書の表計算", "表計算の参照・計算・分析", "通信・記憶容量・作業日数", "関係データベースとSQL"] },
      {"session":"gakka-III","urlSlug":"gakka-III","expectedQuestions":7,"label":"3級 筆記","categories":["情報機器と用語", "情報処理用語の対応", "数値表現と情報処理", "表計算の操作と関数", "計算式とグラフ", "流れ図", "資料を用いた表計算"]},
      {"session":"zensho-info-grade-3-practical","urlSlug":"zensho-info-grade-3-practical","expectedQuestions":1,"label":"3級 実技","categories":["表計算の実技", "表計算"]},
      {"session":"zensho-info-business-2-practical","urlSlug":"zensho-info-business-2-practical","expectedQuestions":1,"label":"2級 ビジネス情報 実技","categories":["表計算の実技", "2級 ビジネス情報 実技"]},
      {"session":"zensho-info-business-2","urlSlug":"zensho-info-business-2","expectedQuestions":6,"label":"2級 ビジネス情報 筆記","categories":["情報機器とネットワーク用語", "ファイル管理と情報セキュリティ", "数の表現・画像・集合演算", "リレーショナルデータベースとSQL", "表計算の関数と集計", "売上数量表の表計算", "2級 ビジネス情報 筆記"]},
      { session: "practical", urlSlug: "practical", expectedQuestions: 1, label: "情報処理 実技", categories: ["情報処理 実技"] },
    ],
    seasons: ["annual", "round1",
  "round2",], yearRange: { start: 2022, end: 2026 },
},
  "kanken-2": {
    code: "kanken-2", nameFull: "日本漢字能力検定 2級", urlSlug: "kanken-2", level: "basic",
    sessions: [
      {"session": "gakka", "urlSlug": "gakka", "expectedQuestions": 120, "label": "2級", "categories": ["読み", "音訓読み", "熟語の構成", "四字熟語の書き取り", "四字熟語の意味", "対義語・類義語", "同音・同訓異字", "誤字訂正", "漢字と送りがな", "書き取り"]},
    ],
    seasons: ["round1",
  "round3",], yearRange: { start: 2022, end: 2026 },
  },
  "kanken-5": {"code": "kanken-5", "nameFull": "日本漢字能力検定 5級", "urlSlug": "kanken-5", "level": "basic", "sessions": [{"session": "gakka", "urlSlug": "gakka", "expectedQuestions": 120, "label": "5級", "categories": ["同じ読みの漢字", "四字熟語", "対義語と類義語", "漢字の書き取り", "熟語の構成", "熟語作り", "画数", "読み", "送りがな", "部首と部首名", "音読みと訓読み"]}], "seasons": ["round1"], "yearRange": {"start": 2026, "end": 2026}},
  "zensho-boki": {
    code: "zensho-boki", nameFull: "全商簿記実務検定", urlSlug: "zensho-boki", level: "basic",
    sessions: [
      {"session": "gakka", "urlSlug": "gakka", "expectedQuestions": 5, "label": "3級 商業簿記", "categories": ["3級 商業簿記"]},
      {"session": "practical", "urlSlug": "practical", "expectedQuestions": 4, "label": "1級 原価計算", "categories": ["1級 原価計算"]},
      {"session": "zensho-boki-2-commercial", "urlSlug": "zensho-boki-2-commercial", "expectedQuestions": 6, "label": "2級 商業簿記", "categories": ["仕訳", "資本金と支店会計", "3伝票制", "総勘定元帳と補助簿", "決算整理と損益計算書", "株式会社の取引"]},
  { session: "gakka-I", urlSlug: "grade-1-accounting", expectedQuestions: 9, label: "1級 会計", categories: ["会計"] },
  { session: "gakka-II", urlSlug: "grade-1-cost", expectedQuestions: 2, label: "1級 原価計算", categories: ["原価計算"] },
  { session: "gakka-III", urlSlug: "grade-2", expectedQuestions: 2, label: "2級", categories: ["商業簿記"] },
  { session: "gakka-IV", urlSlug: "grade-3", expectedQuestions: 5, label: "3級", categories: ["商業簿記"] },
    ],
    seasons: ["annual", "round2",
  "first",
  "second",], yearRange: { start: 2022, end: 2026 },
  },
  "kounin-geography": {
  "code": "kounin-geography",
  "nameFull": "高等学校卒業程度認定試験 地理",
  "urlSlug": "kounin-geography",
  "level": "specialist",
  "sessions": [
    {
      "session": "gakka",
      "urlSlug": "gakka",
      "expectedQuestions": 20,
      "label": "地理",
      "categories": [
        "地図と地理情報",
        "生活文化と多文化共生",
        "人口・食料と国際協力",
        "自然災害と防災",
        "地域調査と地域振興"
      ]
    },
  { session: "tiri", urlSlug: "tiri", expectedQuestions: 20, label: "地理", categories: ["地図と地理情報システム", "生活文化と国際理解", "地球的課題と国際協力", "自然環境と防災", "生活圏の調査"] },
  { session: "kamoku-a", urlSlug: "tiri-a", expectedQuestions: 20, label: "地理A", categories: ["地図からとらえる現代世界", "世界の生活文化の多様性", "地球的課題の地理的考察", "自然環境と防災", "生活圏の地域調査"] },
  { session: "kamoku-b", urlSlug: "tiri-b", expectedQuestions: 20, label: "地理B", categories: ["地図と地域調査", "自然環境と資源・産業", "人口・都市・生活文化", "世界の諸地域", "地球的課題"] },
  ],
  "seasons": [
    "second",
  "round2",
  "round1",
  ],
  "yearRange": {
    "start": 2022,
    "end": 2025
  }
},
  "kanken-1": {
  "code": "kanken-1",
  "nameFull": "日本漢字能力検定 1級",
  "urlSlug": "kanken-1",
  "level": "specialist",
  "sessions": [
    {
      "session": "gakka",
      "urlSlug": "gakka",
      "expectedQuestions": 130,
      "label": "1級",
      "categories": [
        "読み",
        "書き取り",
        "語選択・書き取り",
        "四字熟語の書き取り",
        "四字熟語の意味と読み",
        "熟字訓・当て字",
        "熟語の読み・一字訓",
        "対義語・類義語",
        "故事・諺",
        "文章題・書き取り",
        "文章題・読み"
      ]
    }
  ],
  "seasons": [
    "first",
  "february",
  ],
  "yearRange": {
    "start": 2022,
    "end": 2026
  }
},
  "kounin-civics": {
  "code": "kounin-civics",
  "nameFull": "高等学校卒業程度認定試験 公共",
  "urlSlug": "kounin-civics",
  "level": "specialist",
  "sessions": [
    {
      "session": "gakka",
      "urlSlug": "gakka",
      "expectedQuestions": 24,
      "label": "公共",
      "categories": [
        "公共的な空間",
        "法ときまり",
        "現代の政治",
        "将来と社会",
        "持続可能な社会"
      ]
    }
  ],
  "seasons": [
    "second",
  "round1",
  "round2",
  ],
  "yearRange": {
    "start": 2024,
    "end": 2025
  }
},
  "kounin-science": {
  "code": "kounin-science",
  "nameFull": "高等学校卒業程度認定試験 科学と人間生活",
  "urlSlug": "kounin-science",
  "level": "specialist",
  "sessions": [
    {
      "session": "gakka",
      "urlSlug": "gakka",
      "expectedQuestions": 40,
      "label": "科学と人間生活（選択問題は両方収録）",
      "categories": [
        "光の性質",
        "熱とエネルギー",
        "プラスチック",
        "衣料と繊維",
        "タンパク質とDNA",
        "微生物とその利用",
        "地球や太陽系",
        "自然災害と自然景観"
      ]
    }
  ],
  "seasons": [
    "first",
  "second",
  ],
  "yearRange": {
    "start": 2022,
    "end": 2025
  }
},
  "kounin-physics": {
  "code": "kounin-physics",
  "nameFull": "高等学校卒業程度認定試験 物理基礎",
  "urlSlug": "kounin-physics",
  "level": "specialist",
  "sessions": [
    {
      "session": "gakka",
      "urlSlug": "gakka",
      "expectedQuestions": 20,
      "label": "物理基礎",
      "categories": [
        "運動と力",
        "波",
        "熱と電気",
        "落下の探究"
      ]
    }
  ],
  "seasons": [
    "first",
  "second",
  ],
  "yearRange": {
    "start": 2022,
    "end": 2025
  }
},
  "zensho-boki-2": {
    code: "zensho-boki-2",
    nameFull: "全商簿記実務検定2級",
    urlSlug: "zensho-boki-2",
    level: "specialist",
    seasons: ["annual",
  "january",
  "june",],
    yearRange: {"start": 2022, "end": 2026},
    sessions: [
      {"session": "gakka", "urlSlug": "gakka", "label": "商業簿記", "expectedQuestions": 6, "categories": ["仕訳", "帳簿・有価証券", "仕訳集計表", "総勘定元帳・補助簿", "貸借対照表", "株式会社の会計"]},
    ],
  },
  "zensho-calc": {
    code: "zensho-calc", nameFull: "全商ビジネス計算実務検定", urlSlug: "zensho-calc", level: "basic",
    sessions: [
      {"session": "gakka", "urlSlug": "gakka", "expectedQuestions": 30, "label": "3級 普通計算", "categories": ["乗算", "除算", "見取算"]},
      {"session": "zensho-calc-1-ordinary", "urlSlug": "zensho-calc-1-ordinary", "expectedQuestions": 30, "label": "1級 普通計算", "categories": ["乗算", "除算", "見取算"]},
      {"session": "zensho-calc-3-business", "urlSlug": "zensho-calc-3-business", "expectedQuestions": 20, "label": "3級 ビジネス計算", "categories": ["ビジネス計算", "百分率", "単位換算", "損失率", "単利", "外貨換算", "数量と単価", "元利合計", "歩合", "割引", "諸掛込原価", "原価と利幅"]},
      {"session": "practical", "urlSlug": "practical", "expectedQuestions": 30, "label": "2級 普通計算", "categories": ["乗算", "除算", "見取算"]},
      { session: "gakka-I", urlSlug: "gakka-I", expectedQuestions: 20, label: "1級 ビジネス計算", categories: ["ビジネス計算"] },
      { session: "gakka-II", urlSlug: "gakka-II", expectedQuestions: 30, label: "2級 普通計算", categories: ["乗算", "除算", "見取算"] },
      {"session": "zensho-calc-grade-1-business", "urlSlug": "zensho-calc-grade-1-business", "expectedQuestions": 20, "label": "第153回 1級 ビジネス計算", "categories": ["単利の借入日数", "ヤードからメートル・円への換算", "電子記録債権の割引料", "期首払い年金の終価", "株式購入の支払総額", "値引き販売と利益率", "定額法の帳簿価額", "配当と希望利回りから指値", "複利年金の現価", "仲介手数料と売主の手取金", "定率法の帳簿価額", "期末払い積立金の逆算", "単利最終利回り", "半年複利での負債の現価", "予定売価と実売価から原価", "積数法の利息", "電子記録債権の割引手取額", "年複利の元利合計", "諸掛と売価", "年賦償還表"]},
      {"session": "zensho-calc-grade-3-ordinary", "urlSlug": "zensho-calc-grade-3-ordinary", "expectedQuestions": 30, "label": "3級 普通計算", "categories": ["乗算", "除算", "見取算"]},
      { session: "zensho-calc-2-business", urlSlug: "zensho-calc-2-business", expectedQuestions: 20, label: "2級 ビジネス計算", categories: ["ビジネス計算"] },
      { session: "gakka-IV", urlSlug: "gakka-IV", expectedQuestions: 20, label: "3級 ビジネス計算", categories: ["ビジネス計算"] },
  { session: "gakka-III", urlSlug: "gakka-III", expectedQuestions: 80, label: "3級", categories: BUSINESS_CALC_CATEGORIES },

      {"session":"zensho-calc-2-ordinary","urlSlug":"zensho-calc-2-ordinary","expectedQuestions":90,"label":"2級 普通計算","categories":["乗算", "除算", "見取算"]},
    ],
    seasons: ["annual", "round1", "round2",
  "first",
  "second",], yearRange: { start: 2022, end: 2026 },
  },
  "suken": {
    code: "suken", nameFull: "実用数学技能検定", urlSlug: "suken", level: "basic",
    sessions: [
      {"session": "am1", "urlSlug": "am1", "label": "準1級 1次 計算技能検定", "expectedQuestions": 7, "categories": ["部分分数分解", "円の接線", "数列と和", "複素数", "双曲線", "定積分", "極限"]},
      {"session": "gakka", "urlSlug": "gakka", "expectedQuestions": 30, "label": "3級 1次", "categories": ["計算", "数の位", "時計", "お金", "図形", "規則性"]},
      {"session": "practical", "urlSlug": "practical", "expectedQuestions": 20, "label": "4級 2次", "categories": ["2級 2次"]},
      {"session": "senmon", "urlSlug": "senmon", "expectedQuestions": 7, "label": "1級 2次", "categories": ["1級 2次"]},
      { session: "gakka-I", urlSlug: "gakka-I", expectedQuestions: 15, label: "準2級1次", categories: ["三平方の定理", "三角比", "二次方程式", "円に内接する四角形", "分母の有理化", "因数分解", "変化の割合", "平行線と相似", "放物線の頂点", "整式の展開", "根号の計算", "絶対値の方程式", "集合"] },
      { session: "gakka-II", urlSlug: "gakka-II", expectedQuestions: 20, label: "3級2次", categories: ["ねじれの位置", "三角形の合同条件", "三角形の面積", "二次関数の変域", "二次関数の比例定数", "二次関数上の座標", "加重平均", "双曲線", "平均と整数の最大値", "平方の差", "平方根と素因数分解", "平行四辺形の証明", "点を通るグラフ", "直角三角形の作図", "確率", "立体の体積", "長方形の周長", "面積と不等式"] },
      { session: "gakka-III", urlSlug: "gakka-III", expectedQuestions: 30, label: "4級1次", categories: ["データの範囲", "一次式の展開", "一次式の整理", "一次方程式", "一次関数", "分数の乗法", "分数の加減", "分数の四則計算", "分数の文字式", "分数の比", "分数の除法", "分数を含む方程式", "単項式の四則計算", "単項式の除法", "反比例", "場合の数", "多角形の外角", "小数と分数", "平行線と角", "式への代入", "文字について解く", "正負の数", "比", "累乗", "線対称", "連立方程式"] },
      {"session": "suken-9", "urlSlug": "suken-9", "expectedQuestions": 20, "label": "9級", "categories": ["9級"]},
      { session: "pm", urlSlug: "pm", expectedQuestions: 10, label: "準2級 2次", categories: ["測定技能", "平方根", "二次関数", "三角比", "組合せ", "整理技能"] },
      { session: "am", urlSlug: "am", expectedQuestions: 7, label: "1級 1次", categories: ["方程式", "複素数", "解析幾何", "微分", "確率分布", "線形代数", "積分"] },
      {"session": "suken-grade7", "urlSlug": "suken-grade7", "expectedQuestions": 30, "label": "7級", "categories": ["7級"]},
      { session: "suken-grade-6", urlSlug: "suken-grade-6", expectedQuestions: 30, label: "算数検定6級", categories: ["小数のかけ算", "小数と計算順序", "分数のたし算", "帯分数のひき算", "分数のかけ算", "分数のわり算", "帯分数のかけ算", "帯分数のわり算", "最大公約数", "最小公倍数", "整数の比", "小数を含む比", "小数の位", "分数と小数", "等しい比", "公倍数", "公約数", "点数の平均", "平均から点数を求める", "正九角形の中心角", "正九角形の内角", "分数で表した長さと重さ", "帯分数で表した長さと重さ", "重さから長さを求める", "二つの組合せ", "三つの組合せ", "円の面積", "円と半円の面積", "玉入れの点数", "表を使った点数の比較"] },
    ],
    seasons: ["published", "second", "primary"], yearRange: { start: 2020, end: 2023 },
  },
  "gijutsushi1-kiso": {"code": "gijutsushi1-kiso", "nameFull": "技術士第一次試験・基礎科目", "urlSlug": "gijutsushi1-kiso", "level": "specialist", "sessions": [{"session": "kiso", "urlSlug": "kiso", "expectedQuestions": 30, "label": "基礎科目", "categories": ["設計・計画", "情報・論理", "解析", "材料・化学・バイオ", "環境・エネルギー・技術"]}], "seasons": ["annual"], "yearRange": {"start": 2023, "end": 2025}},
  "jlpt": {
    code: "jlpt", nameFull: "日本語能力試験（JLPT）", urlSlug: "jlpt", level: "basic",
    sessions: [
      {"session": "mondai-a", "urlSlug": "mondai-a", "expectedQuestions": 13, "label": "N1 言語知識・読解", "categories": ["文字・語彙", "文法", "読解"]},
      {"session": "mondai-d", "urlSlug": "mondai-d", "expectedQuestions": 11, "label": "N4 言語知識・読解", "categories": ["文字・語彙", "文法", "読解"]},
      {"session": "mondai-c", "urlSlug": "mondai-c", "label": "N3 言語知識・読解", "expectedQuestions": 12, "categories": ["言語知識（文字・語彙）", "文法", "読解"]},
      {"session": "mondai-b", "urlSlug": "mondai-b", "expectedQuestions": 14, "label": "N2 言語知識・読解", "categories": ["文字・語彙", "文法", "読解"]},
      {"session": "mondai-e", "urlSlug": "mondai-e", "expectedQuestions": 10, "label": "N5 言語知識・読解", "categories": ["文字・語彙", "文法", "読解"]},
    ],
    seasons: ["published"], yearRange: { start: 2012, end: 2018 },
  },
  "career-gino-2": {
    code: "career-gino-2", nameFull: "キャリアコンサルティング技能検定2級", urlSlug: "career-gino-2", level: "specialist",
    sessions: [{ session: "gakka", urlSlug: "gakka", expectedQuestions: 50, label: "2級 学科試験", categories: ["キャリア理論と能力開発", "相談実践と心理検査", "職業情報・職業倫理", "雇用・労働法令"] }],
    seasons: ["early", "late"], yearRange: { start: 2025, end: 2026 },
},
  "gijutsushi1-kensetsu": {"code": "gijutsushi1-kensetsu", "nameFull": "技術士第一次試験・建設部門", "urlSlug": "gijutsushi1-kensetsu", "level": "specialist", "sessions": [{"session": "senmon", "urlSlug": "senmon", "expectedQuestions": 35, "label": "専門科目（建設部門）", "categories": ["土質及び基礎", "鋼構造", "コンクリート", "河川・水理"]}], "seasons": ["annual"], "yearRange": { start: 2025, end: 2025 }},
  eikenp2: {"code": "eikenp2", "nameFull": "実用英語技能検定 準2級", "urlSlug": "eikenp2", "level": "basic", "sessions": [{"session": "gakka", "urlSlug": "gakka", "expectedQuestions": 61, "label": "一次試験（リーディング・ライティング・リスニング）", "categories": ["語句空所補充", "会話文空所補充", "長文空所補充", "長文内容一致", "Eメール", "英作文", "リスニング第1部", "リスニング第2部", "リスニング第3部"]}], "seasons": ["round1", "round2", "round3"], "yearRange": {"start": 2025, "end": 2026}},
  "zensho-calc-1": {
  "code": "zensho-calc-1",
  "nameFull": "全商ビジネス計算実務検定 1級",
  "urlSlug": "zensho-calc-1",
  "level": "specialist",
  "sessions": [
    {
      "session": "gakka",
      "urlSlug": "gakka",
      "expectedQuestions": 30,
      "label": "1級 普通計算部門",
      "categories": [
        "乗算",
        "除算",
        "見取算"
      ]
    }
  ],
  "seasons": [
    "annual",
  "first",
  "second",
  ],
  "yearRange": {
    "start": 2022,
    "end": 2026
  }
},
  "suken-11": {
  "code": "suken-11",
  "nameFull": "実用数学技能検定 算数検定11級",
  "urlSlug": "suken-11",
  "level": "specialist",
  "sessions": [
    {
      "session": "gakka",
      "urlSlug": "gakka",
      "expectedQuestions": 20,
      "label": "算数検定",
      "categories": [
        "計算技能",
        "算数技能"
      ]
    }
  ],
  "seasons": [
    "published"
  ],
  "yearRange": {
    "start": 2020,
    "end": 2020
  }
},
  "suken-jun1": {
  "code": "suken-jun1",
  "nameFull": "実用数学技能検定 数学検定準1級",
  "urlSlug": "suken-jun1",
  "level": "specialist",
  "sessions": [
    {
      "session": "gakka",
      "urlSlug": "gakka",
      "expectedQuestions": 7,
      "label": "2次 数理技能検定",
      "categories": [
        "選択",
        "必須"
      ]
    }
  ],
  "seasons": [
    "published"
  ],
  "yearRange": {
    "start": 2024,
    "end": 2024
  }
},
  "jlpt-n3": {
  "code": "jlpt-n3",
  "nameFull": "日本語能力試験（JLPT）N3",
  "urlSlug": "jlpt-n3",
  "level": "specialist",
  "sessions": [
    {
      "session": "gakka",
      "urlSlug": "gakka",
      "expectedQuestions": 12,
      "label": "文字・語彙、文法、読解",
      "categories": [
        "文字・語彙",
        "文法",
        "読解"
      ]
    }
  ],
  "seasons": [
    "published"
  ],
  "yearRange": {
    "start": 2012,
    "end": 2012
  }
},
  "jlpt-n5": {
  "code": "jlpt-n5",
  "nameFull": "日本語能力試験（JLPT）N5",
  "urlSlug": "jlpt-n5",
  "level": "specialist",
  "sessions": [
    {
      "session": "gakka",
      "urlSlug": "gakka",
      "expectedQuestions": 10,
      "label": "文字・語彙、文法、読解",
      "categories": [
        "文字・語彙",
        "文法",
        "読解"
      ]
    }
  ],
  "seasons": [
    "published"
  ],
  "yearRange": {
    "start": 2018,
    "end": 2018
  }
},
  "kanken-3": {
    code: "kanken-3", nameFull: "日本漢字能力検定 3級", urlSlug: "kanken-3", level: "specialist",
    sessions: [
      { session: "gakka", urlSlug: "gakka", expectedQuestions: 120, label: "3級", categories: ["読み", "同音・同訓異字", "漢字識別", "熟語の構成", "部首", "対義語・類義語", "漢字と送りがな", "四字熟語", "誤字訂正", "書き取り"] },
    ],
    seasons: ["round1",
  "late",], yearRange: { start: 2023, end: 2026 },
  },
  "zensho-eco-77": {"code": "zensho-eco-77", "nameFull": "商業経済検定・ビジネス基礎", "urlSlug": "zensho-eco-77", "level": "basic", "sessions": [{"session": "gakka", "urlSlug": "gakka", "expectedQuestions": 50, "label": "ビジネス基礎", "categories": ["商品と流通", "企業と労働", "産業と流通", "経済と商品", "ビジネス計算と用語", "ビジネス・コミュニケーション", "経済と流通", "流通の役割", "小売業と商業集積", "物流と金融", "代金決済", "ビジネスの展開", "資金調達と税", "売買取引と書類", "経済と生産", "取引と決済", "ビジネスマナー", "環境と企業", "小売業", "情報通信技術", "物流", "企業活動"]}], "seasons": ["annual"], "yearRange": {"start": 2021, "end": 2025}},
  "kogai-18": {"code": "kogai-18", "nameFull": "公害防止管理者・水質関係技術特論", "urlSlug": "kogai-18", "level": "advanced", "sessions": [{"session": "gakka", "urlSlug": "gakka", "expectedQuestions": 20, "label": "水質関係技術特論", "categories": ["工場内の排水対策", "沈降分離", "凝集処理", "清澄ろ過", "中和・金属処理", "塩素処理", "汚泥脱水", "生物処理工程", "活性汚泥の負荷計算", "好気・嫌気処理の比較", "メタン発酵の管理", "硝化脱窒素", "貯留槽の腐食", "硝化脱窒素の維持管理", "水質試料の保存", "BOD", "浮遊物質", "生態系モデル", "循環冷却水の収支", "製油所排水"]}], "seasons": ["annual"], "yearRange": {"start": 2022, "end": 2026}},
  "kogai-13": {"code": "kogai-13", "nameFull": "公害防止管理者・ばいじん・一般粉じん特論", "urlSlug": "kogai-13", "level": "advanced", "sessions": [{"session": "gakka", "urlSlug": "gakka", "expectedQuestions": 10, "label": "ばいじん・一般粉じん特論", "categories": ["集じん装置の原理", "フード", "集じん性能", "サイクロン", "慣性力集じん", "バグフィルター", "粉じんの発生抑制", "ダスト測定位置", "ダスト濃度測定", "平均ダスト濃度"]}], "seasons": ["annual"], "yearRange": {"start": 2022, "end": 2026}},
  "concrete-assou1": {"code": "concrete-assou1", "nameFull": "技能検定 1級コンクリート圧送施工（コンクリート圧送工事作業）学科試験", "urlSlug": "concrete-assou1", "level": "specialist", "sessions": [{"session": "gakka", "urlSlug": "gakka", "expectedQuestions": 50, "label": "学科（A群 真偽法・B群 多肢択一法）", "categories": ["建築構造", "コンクリート材料", "型枠・施工", "圧送機械", "環境保全", "圧送計画", "配管・圧送作業", "点検・整備", "製図", "安全衛生", "関係法規"]}], "seasons": ["late"], "yearRange": {"start": 2024, "end": 2025}},
  "zensho-eco-80": {"code": "zensho-eco-80", "nameFull": "商業経済検定・ビジネス法規", "urlSlug": "zensho-eco-80", "level": "specialist", "sessions": [{"session": "gakka", "urlSlug": "gakka", "expectedQuestions": 50, "label": "ビジネス法規", "categories": ["法の基礎", "権利・取引", "会社・金融", "租税・企業倫理", "労働・消費者・紛争解決"]}], "seasons": ["annual"], "yearRange": {"start": 2022, "end": 2025}},
  "kogai-08": {"code": "kogai-08", "nameFull": "公害防止管理者・汚水処理特論", "urlSlug": "kogai-08", "level": "specialist", "sessions": [{"session": "gakka", "urlSlug": "gakka", "expectedQuestions": 25, "label": "汚水処理特論", "categories": ["物理化学処理", "汚泥処理・生物処理", "運転管理・水質分析"]}], "seasons": ["annual"], "yearRange": {"start": 2022, "end": 2026}},
  "kogai-04": {"code": "kogai-04", "nameFull": "公害防止管理者・ばいじん・粉じん特論", "urlSlug": "kogai-04", "level": "specialist", "sessions": [{"session": "gakka", "urlSlug": "gakka", "expectedQuestions": 15, "label": "ばいじん・粉じん特論", "categories": ["ダストの特性", "集じん装置", "石綿・測定"]}], "seasons": ["annual"], "yearRange": {"start": 2022, "end": 2026}},
  "aigan-kangoshi": {"code": "aigan-kangoshi", "nameFull": "愛玩動物看護師国家試験", "urlSlug": "aigan-kangoshi", "level": "specialist", "sessions": [{"session": "gakka", "urlSlug": "gakka", "expectedQuestions": 50, "label": "必須問題", "categories": ["基礎動物学", "動物福祉・飼養管理", "法規・職業倫理", "疾病・感染予防", "臨床動物看護"]}, {"session": "ippan", "urlSlug": "ippan", "expectedQuestions": 100, "label": "一般問題", "categories": ["基礎動物学", "動物福祉・飼養管理", "法規・職業倫理", "疾病・感染予防", "臨床動物看護"]},
  { session: "required", urlSlug: "required", expectedQuestions: 50, label: "必須問題", categories: ["必須問題"] },], "seasons": ["annual"], "yearRange": {"start": 2023, "end": 2026}},
  "technical-illustration-cad1": {"code": "technical-illustration-cad1", "nameFull": "技能検定 1級テクニカルイラストレーション（テクニカルイラストレーションCAD作業）学科試験", "urlSlug": "technical-illustration-cad1", "level": "specialist", "sessions": [{"session": "gakka", "urlSlug": "gakka", "expectedQuestions": 50, "label": "学科", "categories": ["製図", "投影法", "製図規格", "CAD", "作図法", "幾何作図", "製図用具", "立体図", "平面図形", "機械要素", "材料", "機械材料", "電気", "スケッチ", "器工具", "機械工作"]}], "seasons": ["late"], "yearRange": {"start": 2025, "end": 2025}},
  "kawarabuki2": {"code": "kawarabuki2", "nameFull": "技能検定 2級かわらぶき（かわらぶき作業）学科試験", "urlSlug": "kawarabuki2", "level": "basic", "sessions": [{"session": "gakka", "urlSlug": "gakka", "expectedQuestions": 50, "label": "2級学科試験", "categories": ["屋根形状", "下地・下葺き", "屋根材料", "器工具", "施工計画", "施工法", "足場", "瓦の名称・用途", "木構造", "建築法規", "製図", "安全衛生"]}], "seasons": ["late"], "yearRange": {"start": 2024, "end": 2025}},
  "zensho-eco-79": {"code": "zensho-eco-79", "nameFull": "商業経済検定・商品開発と流通", "urlSlug": "zensho-eco-79", "level": "specialist", "sessions": [{"session": "gakka", "urlSlug": "gakka", "expectedQuestions": 50, "label": "商品開発と流通", "categories": ["商品開発と流通", "商品の概念", "商品開発の手順", "商品コンセプト", "環境分析", "商品ライフサイクル", "市場調査", "アイデア創出", "商品設計", "産業財産権", "事業計画", "デザイン思考", "ブランド・流通政策", "販売促進", "店舗・価格政策", "流通の仕組み", "パッケージ・デザイン", "店舗陳列", "持続可能な流通"]}], "seasons": ["annual"], "yearRange": {"start": 2022, "end": 2026}},
  "career-gino-1": {"code": "career-gino-1", "nameFull": "キャリアコンサルティング技能検定1級", "urlSlug": "career-gino-1", "level": "specialist", "sessions": [{"session": "gakka", "urlSlug": "gakka", "expectedQuestions": 50, "label": "学科", "categories": ["学科", "キャリア形成・支援制度", "キャリア理論", "能力開発・労働市場", "労働法・働き方", "キャリア教育", "メンタルヘルス", "生活・就労支援", "学習・グループ支援", "スーパービジョン", "面接・支援技法", "ジョブ・カード", "アセスメント", "職業情報", "組織・環境への働きかけ", "ネットワーク・倫理"]}], "seasons": ["late"], "yearRange": {"start": 2024, "end": 2025}},
  "kogai-12": {"code": "kogai-12", "nameFull": "公害防止管理者 騒音・振動特論", "urlSlug": "kogai-12", "level": "specialist", "sessions": [{"session": "gakka", "urlSlug": "gakka", "expectedQuestions": 30, "label": "騒音・振動特論", "categories": ["騒音・振動特論"]}], "seasons": ["annual"], "yearRange": {"start": 2022, "end": 2026}},
  "kogai-15": {"code": "kogai-15", "nameFull": "公害防止管理者 ダイオキシン類特論", "urlSlug": "kogai-15", "level": "specialist", "sessions": [{"session": "gakka", "urlSlug": "gakka", "expectedQuestions": 25, "label": "ダイオキシン類特論", "categories": ["ダイオキシン類特論"]},
  { session: "kogai-soron", urlSlug: "kogai-soron", expectedQuestions: 15, label: "公害総論", categories: ["公害総論"] },
  { session: "baijin-funjin", urlSlug: "baijin-funjin", expectedQuestions: 15, label: "ばいじん・粉じん特論", categories: ["ばいじん・粉じん特論"] },
  { session: "osui-shori", urlSlug: "osui-shori", expectedQuestions: 25, label: "汚水処理特論", categories: ["汚水処理特論"] },], "seasons": ["annual"], "yearRange": {"start": 2022, "end": 2026}},
  "dekyo-charge-1": {"code": "dekyo-charge-1", "nameFull": "工事担任者 第一級アナログ通信", "urlSlug": "dekyo-charge-1", "level": "specialist", "sessions": [{"session": "kiso", "urlSlug": "kiso", "expectedQuestions": 22, "label": "電気通信技術の基礎", "categories": ["電気通信技術の基礎"]}, {"session": "kogaku", "urlSlug": "kogaku", "expectedQuestions": 25, "label": "端末設備の接続のための技術及び理論", "categories": ["端末設備の接続のための技術及び理論"]}, {"session": "houki", "urlSlug": "houki", "expectedQuestions": 25, "label": "端末設備の接続に関する法規", "categories": ["端末設備の接続に関する法規"]}], "seasons": ["round1", "round2"], "yearRange": {"start": 2025, "end": 2026}},
  "cfp-3": {"code": "cfp-3", "nameFull": "CFP® ライフプランニング・リタイアメントプランニング", "urlSlug": "cfp-3", "level": "advanced", "sessions": [{"session": "gakka", "urlSlug": "gakka", "expectedQuestions": 50, "label": "学科", "categories": ["関連業法", "行動ファイナンス", "社会保障", "キャッシュフロー", "資金計画の係数", "住宅資金", "教育資金", "消費者金融", "労働法令", "労災保険", "雇用保険", "職業訓練", "育児介護支援", "社会保険料", "介護保険", "健康保険", "公的年金", "企業年金", "退職金・共済", "法人の資金計画", "高齢期の生活設計", "福祉制度", "子育て支援", "家計統計", "消費者保護", "社会保険の適用"]}], "seasons": ["round1", "round2"], "yearRange": {"start": 2026, "end": 2026}},
  "dekyo-charge-2": {"code": "dekyo-charge-2", "nameFull": "工事担任者 第二級アナログ通信", "urlSlug": "dekyo-charge-2", "level": "basic", "sessions": [{"session": "gakka", "urlSlug": "gakka", "expectedQuestions": 62, "label": "学科", "categories": ["電気通信技術の基礎", "端末設備の接続のための技術及び理論", "端末設備の接続に関する法規"]},
  { session: "dekyo-digital", urlSlug: "dekyo-digital", expectedQuestions: 62, label: "第二級デジタル通信", categories: ["基礎", "技術及び理論", "法規"] },
  { session: "dekyo-analog", urlSlug: "dekyo-analog", expectedQuestions: 62, label: "第二級アナログ通信", categories: ["基礎", "技術及び理論", "法規"] },], "seasons": ["first", "second",
  "round2",], "yearRange": {"start": 2024, "end": 2026}},
  "kogai-16": {"code": "kogai-16", "nameFull": "公害防止管理者・大気・水質概論", "urlSlug": "kogai-16", "level": "specialist", "sessions": [{"session": "gakka", "urlSlug": "gakka", "expectedQuestions": 10, "label": "大気・水質概論", "categories": ["環境法令", "公害防止組織", "大気環境", "地球環境", "水質汚濁の歴史", "水質浄化", "有害物質"]}], "seasons": ["annual"], "yearRange": {"start": 2022, "end": 2026}},
  "building-cleaning2": {"code": "building-cleaning2", "nameFull": "ビルクリーニング技能検定2級（学科）", "urlSlug": "building-cleaning2", "level": "basic", "sessions": [{"session": "gakka", "urlSlug": "gakka", "expectedQuestions": 50, "label": "学科（A群 真偽法・B群 多肢択一法）", "categories": ["汚れ・清掃方法", "建築・内外装材", "洗剤・床維持剤", "清掃機械・器具", "作業計画", "廃棄物・環境", "安全・衛生", "関係法令"]}], "seasons": ["annual"], "yearRange": {"start": 2024, "end": 2025}},
  "kogai-taiki-yugai": {"code": "kogai-taiki-yugai", "nameFull": "公害防止管理者 大気有害物質特論", "urlSlug": "kogai-taiki-yugai", "level": "specialist", "sessions": [{"session": "gakka", "urlSlug": "gakka", "expectedQuestions": 10, "label": "大気有害物質特論", "categories": ["鉛の製錬", "ふっ素化合物の製造", "無機塩素化合物", "吸収装置の圧力損失", "固定層吸着", "ふっ素化合物の処理", "特定物質の漏洩対策", "ふっ素化合物の分析", "塩素の分析", "カドミウム・鉛の分析"]}], "seasons": ["annual"], "yearRange": {"start": 2022, "end": 2026}},
  "dekyo-digital2": {"code": "dekyo-digital2", "nameFull": "工事担任者 第二級デジタル通信", "urlSlug": "dekyo-digital2", "level": "specialist", "sessions": [{"session": "kiso", "urlSlug": "kiso", "expectedQuestions": 22, "label": "電気通信技術の基礎", "categories": ["並列抵抗", "交流回路", "静電容量", "直列共振", "半導体のキャリア", "ツェナーダイオード", "トランジスタ増幅", "半導体メモリ", "トランジスタの電流", "ベン図と論理式", "真理値表", "論理回路と波形", "ブール代数", "デシベルの電力計算", "ケーブルの伝送損失", "電圧反射係数", "信号対雑音比", "PWM", "ピンポン伝送", "誤り検出", "通信品質", "光の外部変調", "直並列回路の電源電圧", "LC直列回路の電流", "静電容量の定義", "RL直列回路の位相", "n形半導体", "ダイオードのリミッタ回路", "トランジスタの接地方式", "不揮発性メモリ", "ベース接地の電流増幅率", "ベン図と論理和・論理積", "2進数の論理和", "論理回路とタイムチャート", "否定を含むブール代数", "伝送損失と増幅器利得", "静電誘導", "無限長線路の入力インピーダンス", "dBmと電力", "デジタル変調方式", "PCMの伝送ビットレート", "ビット誤り率", "光受信器の雑音", "光源のスペクトル幅と分散", "直並列回路の電流", "RC並列回路の電圧", "電磁誘導とレンツの法則", "RL直列回路の電圧位相", "不純物半導体の導電率", "ダイオードの温度特性", "エミッタ接地の位相反転", "フラッシュメモリ", "トランジスタの電流関係", "三つのベン図の共通部分", "16進数から2進数への変換", "論理回路と出力波形", "ブール代数の簡単化", "回線の単位長当たり損失", "電磁結合による漏話", "インピーダンス不整合と反射", "信号対雑音比のdB換算", "アナログ位相変調", "TDMAの多元接続", "パリティチェック", "ジッタ", "光スプリッタ"]}, {"session": "riron", "urlSlug": "riron", "expectedQuestions": 20, "label": "端末設備の接続のための技術及び理論", "categories": ["GE-PON", "LPWA", "LANの接続コネクタ", "無線LANのアクセス制御", "PoE", "HDLC", "SS方式", "CATVのデータ通信", "OSI物理層", "MTU", "ポートスキャン", "無線LANのセキュリティ", "ホームゲートウェイ", "スイッチの転送方式", "レイヤ2スイッチ", "光ファイバの損失", "光コネクタ", "T568B", "ping", "屋内配線の保護", "GE-PONのOLT", "Bluetooth Class2", "SIPの標準化", "IEEE802.11acの周波数帯", "PoEの給電", "HDLCのフラグとビット透過性", "VDSLの利用配線", "HFCの伝送媒体", "OSIデータリンク層", "IPv6アドレスの表記", "キーロガー", "NAPTとIPマスカレード", "ICMPv6のメッセージ", "ストアアンドフォワード", "ルータとOSI階層", "プラスチック光ファイバの光源", "光ファイバの接続方法", "T568Bの結線", "LAN配線試験", "二重床の配線", "GE-PONの伝送速度", "LPWAの特徴", "IP電話の電話番号", "無線LANのアドホックモード", "PoEオルタナティブA", "MLT-3符号", "光アクセスのSS方式", "ADSLの伝送速度帯", "TCP/IPの階層", "IPv6マルチキャストアドレス", "ブルートフォース攻撃", "DMZ", "ICMPv6の分類", "MACアドレスの長さ", "リピータ", "光ファイバの散乱と曲げ損失", "融着接続部の補強", "1000BASE-Tの使用対", "ワイヤマップ試験", "セルラフロア"]}, {"session": "houki", "urlSlug": "houki", "expectedQuestions": 20, "label": "端末設備の接続に関する法規", "categories": ["電気通信回線設備", "電気通信事業法の目的", "電気通信の定義", "端末設備の接続検査", "工事担任者の職務", "第二級デジタル通信の工事範囲", "技術基準適合認定番号", "有線電気通信法", "有線電気通信設備令の定義", "不正アクセス禁止法の目的", "端末設備等規則の用語", "通信内容の識別禁止", "鳴音の防止", "端末機器の電気的安全", "配線設備等", "緊急通報", "押しボタンダイヤル信号", "専用通信回線設備等端末", "漏話減衰量", "IP移動電話端末の発信", "電気通信事業法の用語", "通信の秘密", "業務改善命令", "自営電気通信設備", "工事担任者資格者証", "第二級アナログ通信の工事範囲", "有線電気通信設備の届出", "有線電気通信設備令の用語", "アクセス管理者", "デジタルデータ伝送用設備", "責任の分界点", "音響衝撃の防止", "端末設備の絶縁抵抗", "無線設備の筐体", "アナログ電話端末の直流回路", "直流電圧の印加禁止", "回線間の漏話減衰量", "IP移動電話端末の自動再発信", "電気通信事業法の役務の定義", "秘密の保護と検閲の禁止", "重要通信の優先的取扱い", "自営電気通信設備の接続", "工事担任者による工事・監督", "工事担任者の工事範囲", "IP移動電話端末の認定番号", "有線電気通信法の技術基準", "強電流電線の定義", "アクセス制御機能", "分界点の接続方式", "鳴音の定義", "端末設備の絶縁耐力", "無線端末の空き状態判定", "応答未確認時の回路開放", "押しボタンダイヤルの低群周波数", "総合デジタル通信端末の条件", "移動電話端末の基本的機能", "固定電話端末の通信終了"]},
  { session: "senmon", urlSlug: "senmon", expectedQuestions: 20, label: "端末設備の接続のための技術及び理論", categories: ["端末設備の接続のための技術及び理論"] },], "seasons": ["round1", "round2",
  "first",
  "second",], "yearRange": {"start": 2022, "end": 2026}},
  "sakui-rotary1": {"code": "sakui-rotary1", "nameFull": "さく井技能検定1級（ロータリー式さく井工事作業）", "urlSlug": "sakui-rotary1", "level": "specialist", "sessions": [{"session": "gakka", "urlSlug": "gakka", "expectedQuestions": 50, "label": "学科", "categories": ["地下水", "掘さく・機械", "調査・試験", "仕上げ・管材", "泥水", "溶接", "揚水・ポンプ", "安全・法令"]}], "seasons": ["late"], "yearRange": {"start": 2024, "end": 2025}},
  "kouku-kanseikan": {"code": "kouku-kanseikan", "nameFull": "航空管制官採用試験（基礎能力試験）", "urlSlug": "kouku-kanseikan", "level": "specialist", "sessions": [{"session": "kiso", "urlSlug": "kiso", "expectedQuestions": 30, "label": "基礎能力試験", "categories": ["判断推理", "数的推理", "資料解釈", "時事", "情報"]},
  { session: "gaikokugo", urlSlug: "gaikokugo", expectedQuestions: 30, label: "外国語試験（多肢選択式）", categories: ["語彙・熟語", "文法", "和文英訳", "発音・アクセント"] },
  { session: "tekisei", urlSlug: "tekisei", expectedQuestions: 60, label: "適性試験Ⅰ", categories: ["記憶検査", "空間関係検査Ⅰ", "空間関係検査Ⅱ"] },], "seasons": ["annual"], "yearRange": {"start": 2024, "end": 2026}},
  "cfp-realestate": {"code": "cfp-realestate", "nameFull": "CFP®資格審査試験（不動産運用設計）", "urlSlug": "cfp-realestate", "level": "specialist", "sessions": [{"session": "gakka", "urlSlug": "gakka", "expectedQuestions": 50, "label": "不動産運用設計", "categories": ["不動産の価格", "不動産取引", "不動産取得時の税", "不動産投資", "不動産投資・証券化", "不動産統計", "不動産譲渡時の税", "共同ビル・買換え", "取引・住宅性能", "土地利用・建築規制", "定期借地権", "底地・借地権の交換", "建物賃貸借・共有", "建物賃貸借・担保", "建築・開発の規制", "所有者不明土地・統計", "登記・借地・担保", "登記・共有・筆界", "等価交換・立体買換え", "賃貸経営の収支", "高齢者住宅", "高齢者住宅・サブリース"]}], "seasons": ["round1", "round2"], "yearRange": {"start": 2022, "end": 2026}},
  "building-cleaning3": {"code": "building-cleaning3", "nameFull": "ビルクリーニング技能士3級", "urlSlug": "building-cleaning3", "level": "specialist", "sessions": [{"session": "gakka", "urlSlug": "gakka", "expectedQuestions": 25, "label": "学科（真偽法）", "categories": ["安全・衛生", "廃棄物・環境", "建材・洗剤", "清掃作業・接遇", "安全衛生", "建材", "建築設備", "汚れと衛生", "法令", "洗剤と薬剤", "清掃用具", "清掃管理"]}], "seasons": ["annual"], "yearRange": {"start": 2022, "end": 2025}},
  "kogai-taiki-gairon": {"code": "kogai-taiki-gairon", "nameFull": "公害防止管理者・大気概論", "urlSlug": "kogai-taiki-gairon", "level": "specialist", "sessions": [{"session": "gakka", "urlSlug": "gakka", "expectedQuestions": 10, "label": "大気概論", "categories": ["健康影響", "公害防止組織", "地球温暖化", "大気汚染防止法", "届出施設の統計", "有害物質・発生源", "水銀排出規制", "環境基準", "石綿", "粒子状物質"]}], "seasons": ["annual"], "yearRange": {"start": 2022, "end": 2026}},
  eiken2: {"code": "eiken2", "nameFull": "実用英語技能検定2級", "urlSlug": "eiken2", "level": "advanced", "sessions": [{"session": "gakka", "urlSlug": "gakka", "expectedQuestions": 63, "label": "一次試験", "categories": ["短文の語句空所補充", "長文の語句空所補充", "長文の内容一致選択", "英文要約", "英作文", "リスニング第1部", "リスニング第2部"]}], "seasons": ["session1", "session2", "session3"], "yearRange": {"start": 2025, "end": 2026}},
  "restaurant-2": {"code": "restaurant-2", "nameFull": "レストランサービス技能検定2級（学科）", "urlSlug": "restaurant-2", "level": "advanced", "sessions": [{"session": "gakka", "urlSlug": "gakka", "expectedQuestions": 100, "label": "学科（真偽法）", "categories": ["食品衛生", "食品・飲料・調理", "食文化・接遇儀礼", "料飲サービス", "施設・設備・安全", "関係法令", "店舗・宴会運営"]}], "seasons": ["annual"], "yearRange": {"start": 2025, "end": 2026}},
  "kogai-17": {"code": "kogai-17", "nameFull": "公害防止管理者・大気関係技術特論", "urlSlug": "kogai-17", "level": "specialist", "sessions": [{"session": "gakka", "urlSlug": "gakka", "expectedQuestions": 20, "label": "大気関係技術特論", "categories": ["燃焼・排ガス処理", "集じん・大気拡散・工程対策"]}], "seasons": ["annual"], "yearRange": {"start": 2022, "end": 2026}},
  "dekyo-chief-3": {"code": "dekyo-chief-3", "nameFull": "電気通信主任技術者・法規", "urlSlug": "dekyo-chief-3", "level": "specialist", "sessions": [{"session": "houki", "urlSlug": "houki", "expectedQuestions": 29, "label": "法規", "categories": ["電気通信事業法", "関係法令", "事業用電気通信設備規則", "事業用設備・端末設備", "有線電気通信法令"]}], "seasons": ["first", "second"], "yearRange": {"start": 2025, "end": 2026}},
  eiken3: {"code": "eiken3", "nameFull": "実用英語技能検定3級", "urlSlug": "eiken3", "level": "basic", "sessions": [{"session": "reading", "urlSlug": "reading", "expectedQuestions": 30, "label": "リーディング", "categories": ["短文の語句空所補充", "会話文の空所補充", "長文の内容一致"]}, {"session": "writing", "urlSlug": "writing", "expectedQuestions": 2, "label": "ライティング", "categories": ["Ｅメール返信", "英作文"]}, {"session": "listening", "urlSlug": "listening", "expectedQuestions": 30, "label": "リスニング", "categories": ["対話の応答選択", "対話の内容一致", "英文の内容一致"]}], "seasons": ["round2", "round1", "round3"], "yearRange": {"start": 2025, "end": 2026}},
  "restaurant-3": {"code": "restaurant-3", "nameFull": "レストランサービス技能検定3級", "urlSlug": "restaurant-3", "level": "basic", "sessions": [{"session": "gakka", "urlSlug": "gakka", "expectedQuestions": 100, "label": "学科", "categories": ["食品衛生", "食材・栄養", "飲料", "接客サービス", "飲料サービス", "食器・設備", "料理・調理", "法令・安全衛生", "国際儀礼", "宴会"]}], "seasons": ["annual"], "yearRange": {"start": 2025, "end": 2026}},
  eiken4: {"code": "eiken4", "nameFull": "実用英語技能検定4級", "urlSlug": "eiken4", "level": "basic", "sessions": [{"session": "gakka", "urlSlug": "gakka", "expectedQuestions": 35, "label": "リーディング", "categories": ["短文の語句空所補充", "会話文の文空所補充", "語句整序", "長文の内容一致選択"]}, {"session": "listening", "urlSlug": "listening", "expectedQuestions": 30, "label": "リスニング", "categories": ["対話の応答選択", "対話の内容一致選択", "英文の内容一致選択"]}], "seasons": ["round2", "round1", "round3"], "yearRange": {"start": 2025, "end": 2026}},
  "nyukoku-keibikan": {"code": "nyukoku-keibikan", "nameFull": "入国警備官採用試験", "urlSlug": "nyukoku-keibikan", "level": "basic", "sessions": [{"session": "kiso", "urlSlug": "kiso", "expectedQuestions": 40, "label": "基礎能力試験", "categories": ["文章理解", "数的処理", "判断推理", "資料解釈", "国語", "情報", "自然科学", "人文科学", "社会科学", "英語"]}], "seasons": ["annual"], "yearRange": {"start": 2025, "end": 2025}},
  chizai3: {"code": "chizai3", "nameFull": "知的財産管理技能検定3級", "urlSlug": "chizai3", "level": "basic", "sessions": [{"session": "gakka", "urlSlug": "gakka", "expectedQuestions": 30, "label": "学科", "categories": ["不正競争防止法", "商標法", "国際条約", "契約", "実用新案法", "弁理士法", "意匠法", "権利の移転", "特許法", "独占禁止法", "種苗法", "著作権法"]}, {"session": "practical", "urlSlug": "practical", "expectedQuestions": 30, "label": "実技", "categories": ["特許法", "著作権法", "意匠法", "商標法", "実用新案法", "種苗法", "PCT", "パリ条約", "特許法・商標法"]}], "seasons": ["july", "march",
  "spring",
  "autumn",], "yearRange": {"start": 2023, "end": 2026}},
  "dekyo-chief-2": {"code": "dekyo-chief-2", "nameFull": "電気通信主任技術者・線路設備及び設備管理", "urlSlug": "dekyo-chief-2", "level": "specialist", "sessions": [{"session": "senmon", "urlSlug": "senmon", "expectedQuestions": 60, "label": "線路設備及び設備管理", "categories": ["光変復調", "光増幅器", "光中継の雑音", "非線形光学効果", "平衡対ケーブルの雑音", "一様線路の定数", "光ファイバ心線", "光ファイバ融着", "ケーブルのダンシング", "架空構造物の荷重", "分散補償", "誘導対策", "設備の位置情報", "金属腐食", "ケーブル牽引張力", "光海底ケーブル", "海底ケーブル構造", "海底システムの給電", "光増幅器のレベル計算", "土質調査", "埋設物探査", "とう道", "近接施工", "公共工事の施工管理", "工程管理", "災害時通信", "信頼性試験", "設備保全", "修理系の信頼性", "安全衛生管理", "高所作業車", "建設廃棄物", "道路占用手続", "電柱等の共用", "本人認証", "情報セキュリティ管理策", "サイバー攻撃", "波長分割多重", "光ファイバの種類", "平衡対の漏話", "光の伝搬モード", "光ファイバ損失", "一様線路", "光ケーブルの構造", "光コネクタの反射", "光ケーブル布設", "弛度と電柱", "長距離光伝送の設計", "通信線路障害", "CATVのHFC方式", "光ファイバ心線対照", "管路ケーブルの布設張力", "光海底中継器", "海底ケーブルの保守", "海底ケーブルの特性", "海底ケーブルの繰出し", "レディーミクストコンクリート", "管路設備", "情報BOX", "管路とマンホールの補修", "工程短縮の費用", "設計図書と品質計画", "職場の安全活動", "信頼性設計", "電気通信事故の報告", "ネットワーク構築方式", "建設工事の請負契約", "高所作業の安全", "屋外通信設備の対策", "災害管理のフェーズ", "迷惑メール対策", "セキュリティ対策技術", "光アクセスシステム", "光ファイバの伝送帯域", "LDとファイバヒューズ", "光変調方式", "伝送路の反射", "SM光ファイバ", "IP保護等級", "地下ケーブル布設", "架空構造物", "雷サージと誘導対策", "光ファイバ接続部", "ケーブルのクリーピング", "MMSによる点検", "架空ケーブル張力", "海底ケーブルの探線", "海底システムのEDFA", "陸揚局の保守", "不良管路の補修", "土の分類と透水性", "液状化対策", "とう道管理", "ヒューマンエラー対策", "品質マネジメント用語", "アローダイアグラム", "予防保全", "事業継続マネジメント", "システムの信頼性", "リスクマネジメント", "建設工事の施工管理", "作業に必要な資格", "公衆災害防止の交通対策", "道路の占用と使用", "VPN", "サイバー脅威"]},
  { session: "gakka", urlSlug: "gakka", expectedQuestions: 20, label: "電気通信システム", categories: ["電気回路", "伝送技術", "通信網"] },], "seasons": ["round1", "round2",
  "second",
  "first",], "yearRange": {"start": 2022, "end": 2026}},
  "kogai-06": {"code": "kogai-06", "nameFull": "公害防止管理者・大規模大気特論", "urlSlug": "kogai-06", "level": "specialist", "sessions": [{"session": "gakka", "urlSlug": "gakka", "expectedQuestions": 10, "label": "大規模大気特論", "categories": ["排煙拡散", "大気安定度", "風速分布", "大気境界層", "大気環境シミュレーション", "燃料品質", "排煙処理", "セメント産業", "鉄鋼プロセス"]}], "seasons": ["annual"], "yearRange": {"start": 2022, "end": 2026}},
  "kogai-large-water": {"code": "kogai-large-water", "nameFull": "公害防止管理者・大規模水質特論", "urlSlug": "kogai-large-water", "level": "specialist", "sessions": [{"session": "gakka", "urlSlug": "gakka", "expectedQuestions": 10, "label": "大規模水質特論", "categories": ["環境モデル", "用排水管理", "産業排水処理"]}], "seasons": ["annual"], "yearRange": {"start": 2022, "end": 2026}},
  "dekyo-chief-system": {"code": "dekyo-chief-system", "nameFull": "電気通信主任技術者・電気通信システム", "urlSlug": "dekyo-chief-system", "level": "specialist", "sessions": [{"session": "gakka", "urlSlug": "gakka", "expectedQuestions": 20, "label": "電気通信システム", "categories": ["電気・電子回路", "伝送方式", "交換・IPネットワーク", "無線・光通信・電源"]}], "seasons": ["first", "second"], "yearRange": {"start": 2022, "end": 2026}},
  eiken5: {"code": "eiken5", "nameFull": "実用英語技能検定5級（リーディング）", "urlSlug": "eiken5", "level": "basic", "sessions": [{"session": "gakka", "urlSlug": "gakka", "expectedQuestions": 25, "label": "リーディング", "categories": ["短文の語句空所補充", "会話文の文空所補充", "語句整序"]}], "seasons": ["round3", "round1", "round2"], "yearRange": {"start": 2025, "end": 2026}},
  "rodo-kijun-kantokukan": {"code": "rodo-kijun-kantokukan", "nameFull": "労働基準監督官採用試験（基礎能力）", "urlSlug": "rodo-kijun-kantokukan", "level": "advanced", "sessions": [{"session": "kiso", "urlSlug": "kiso", "expectedQuestions": 30, "label": "基礎能力試験", "categories": ["文章理解", "判断推理", "空間把握", "数的推理", "資料解釈", "時事・社会", "情報"]},
  { session: "senmon-b", urlSlug: "senmon-b", expectedQuestions: 46, label: "専門試験（労働基準監督Ｂ）", categories: ["労働統計・労使関係", "労働安全衛生", "数学", "物理", "情報", "化学"] },
  { session: "special-a", urlSlug: "special-a", expectedQuestions: 48, label: "労働基準監督A 専門試験（多肢選択式）", categories: ["労働法", "労働安全衛生", "労災保険", "労働経済", "憲法", "行政法", "民法", "刑法", "経済学", "経済事情", "社会保障", "社会学"] },
      { session: "special-b", urlSlug: "special-b", expectedQuestions: 46, label: "労働基準監督B 専門試験（多肢選択式）", categories: ["労働安全衛生", "基礎数学", "物理", "化学"] },
    ], "seasons": ["annual"], "yearRange": {"start": 2023, "end": 2026}},
  chizai1: {"code": "chizai1", "nameFull": "知的財産管理技能検定1級（特許専門業務・実技）", "urlSlug": "chizai1", "level": "advanced", "sessions": [{"session": "practical", "urlSlug": "practical", "expectedQuestions": 5, "label": "特許専門業務・実技", "categories": ["知財経営", "国内特許出願", "外国特許出願・ＰＣＴ", "特許権の行使"]},
  { session: "gakka", urlSlug: "gakka", expectedQuestions: 45, label: "学科・特許専門業務", categories: ["知的財産管理技能検定1級 学科・特許専門業務"] },], "seasons": ["march",
  "autumn",
  "spring",
  "july",], "yearRange": {"start": 2023, "end": 2026}},
  "kogai-09": {"code": "kogai-09", "nameFull": "公害防止管理者・水質有害物質特論", "urlSlug": "kogai-09", "level": "advanced", "sessions": [{"session": "gakka", "urlSlug": "gakka", "expectedQuestions": 15, "label": "水質有害物質特論", "categories": ["有害物質の処理", "測定技術"]}], "seasons": ["annual"], "yearRange": {"start": 2022, "end": 2026}},
  webdesign2: {"code": "webdesign2", "nameFull": "ウェブデザイン技能検定2級（学科）", "urlSlug": "webdesign2", "level": "advanced", "sessions": [{"session": "gakka", "urlSlug": "gakka", "expectedQuestions": 40, "label": "学科", "categories": ["HTML", "CSS", "JavaScript", "PHP", "データベース", "アクセシビリティ", "法規", "ウェブ技術・運用"]}], "seasons": ["round4", "round1", "round2"], "yearRange": {"start": 2025, "end": 2026}},
  "glass-sekou1": {"code":"glass-sekou1","nameFull":"技能検定 1級ガラス施工（ガラス工事作業）学科試験","urlSlug":"glass-sekou1","level":"advanced","sessions":[{"session":"gakka","urlSlug":"gakka","expectedQuestions":50,"label":"学科（A群 真偽法・B群 多肢択一法）","categories":["ガラス・材料","ガラス施工・加工","建具・関連材料","建築構造・製図","関係法規・安全衛生"]}],"seasons":["late"],"yearRange":{"start":2024,"end":2025}},
  "eikenp1": {"code": "eikenp1", "nameFull": "実用英語技能検定 準1級", "urlSlug": "eikenp1", "level": "advanced", "sessions": [{"session": "reading", "urlSlug": "reading", "expectedQuestions": 31, "label": "リーディング", "categories": ["語彙・熟語", "長文空所補充", "長文内容一致"]}, {"session": "listening", "urlSlug": "listening", "expectedQuestions": 29, "label": "リスニング", "categories": ["リスニングPart1", "リスニングPart2", "リスニングPart3"]}, {"session": "writing", "urlSlug": "writing", "expectedQuestions": 2, "label": "ライティング（自己確認）", "categories": ["英文要約", "英作文"]}], "seasons": ["first", "second", "january"], "yearRange": {"start": 2025, "end": 2026}},
  "zensho-eco-81": {"code":"zensho-eco-81","nameFull":"商業経済検定試験 ビジネス・マネジメント","urlSlug":"zensho-eco-81","level":"basic","sessions":[{"session":"gakka","urlSlug":"gakka","expectedQuestions":50,"label":"学科","categories":["企業と経営","経営環境","経営組織","経営戦略","企業間連携","人材マネジメント","生産マネジメント","財務マネジメント","経営資源","コーポレートガバナンス","リスクマネジメント","企業と社会","起業"]}],"seasons":["annual"],"yearRange":{"start":2022,"end":2025}},
  "kogai-07": {"code":"kogai-07","nameFull":"公害防止管理者等国家試験・水質概論","urlSlug":"kogai-07","level":"basic","sessions":[{"session":"gakka","urlSlug":"gakka","expectedQuestions":10,"label":"学科","categories":["環境基準","水質汚濁防止法","総量規制","公害防止組織","水環境","有害物質","水処理"]}],"seasons":["annual"],"yearRange":{"start":2022,"end":2026}},
  "webdesign-3": {"code":"webdesign-3","nameFull":"ウェブデザイン技能検定3級（学科）","urlSlug":"webdesign-3","level":"basic","sessions":[{"session":"gakka","urlSlug":"gakka","expectedQuestions":25,"label":"学科","categories":["HTML","法務","ネットワーク","作業環境","セキュリティ","設計","アクセシビリティ","JavaScript","CSS","運用"]}],"seasons":["february","round1","round2"],"yearRange":{"start":2025,"end":2026}},
  "kokka-ippan-dai": {"code": "kokka-ippan-dai", "nameFull": "国家公務員採用一般職試験（大卒程度試験）", "urlSlug": "kokka-ippan-dai", "level": "specialist", "sessions": [{"session": "kiso", "urlSlug": "kiso", "expectedQuestions": 30, "label": "基礎能力試験", "categories": ["判断推理", "数的推理", "資料解釈"]},
  { session: "kadai-taiou", urlSlug: "kadai-taiou", expectedQuestions: 120, label: "課題対応能力試験（教養区分）", categories: ["演算記号", "文字の置き換え", "表による分類", "表の計算", "表の照合"] },
      { session: "senmon-butsuri", urlSlug: "senmon-butsuri", expectedQuestions: 50, label: "専門試験（物理区分）", categories: ["数学", "力学", "流体力学", "波動", "熱力学", "電磁気学", "統計力学", "量子力学", "相対論", "原子核物理", "気象学", "海洋学", "地球物理"] },
      { session: "senmon-digital", urlSlug: "senmon-digital", expectedQuestions: 44, label: "専門試験（デジタル・電気・電子区分）", categories: ["数学", "物理", "情報工学", "電気回路", "電子工学"] },
      { session: "senmon-doboku", urlSlug: "senmon-doboku", expectedQuestions: 40, label: "専門試験（土木区分）", categories: ["構造力学", "水理学", "土質力学", "測量", "コンクリート", "都市計画", "道路工学", "河川工学", "環境工学"] },
      { session: "senmon-kagaku", urlSlug: "senmon-kagaku", expectedQuestions: 44, label: "専門試験（化学区分）", categories: ["物理化学", "無機化学", "分析化学", "有機化学", "高分子化学", "生化学", "化学工学"] },
      { session: "senmon-kenchiku", urlSlug: "senmon-kenchiku", expectedQuestions: 33, label: "専門試験（建築区分）", categories: ["建築構造", "建築材料", "建築施工", "建築環境", "建築設備", "建築計画", "建築法規"] },
      { session: "senmon-kikai", urlSlug: "senmon-kikai", expectedQuestions: 40, label: "専門試験（機械区分）", categories: ["材料力学", "機械力学", "流体力学", "熱力学", "機械設計", "機械材料", "機械工作"] },
      { session: "senmon-nogaku", urlSlug: "senmon-nogaku", expectedQuestions: 40, label: "専門試験（農学区分）", categories: ["作物学", "土壌肥料学", "農業政策", "農業機械", "園芸学", "育種学", "植物保護", "植物生理", "畜産学"] },
      { session: "senmon-noson", urlSlug: "senmon-noson", expectedQuestions: 40, label: "専門試験（農業農村工学区分）", categories: ["数学", "構造力学", "材料力学", "水理学", "土壌物理", "土質力学", "測量", "農業水利", "農業排水", "水文学", "農村整備", "農村政策", "農村環境", "農業水利施設", "施工管理"] },
      { session: "senmon", urlSlug: "senmon", expectedQuestions: 80, label: "専門試験（行政区分）", categories: ["政治学", "行政学", "憲法", "行政法", "民法（総則・物権）", "民法（債権・親族・相続）", "ミクロ経済学", "マクロ経済学", "財政学・経済事情", "経営学", "国際関係", "社会学", "心理学", "教育学", "英語（基礎）", "英語（一般）"] },
      { session: "senmon-ringaku", urlSlug: "senmon-ringaku", expectedQuestions: 40, label: "専門試験（林学区分）", categories: ["森林資源", "森林環境", "森林政策", "林業経済", "造林", "森林経理", "森林計測", "森林土壌", "森林保護", "樹木生理", "林木育種", "森林生態", "林業作業", "林道工学", "木材加工", "木材科学", "治山", "森林水文"] },
    ], "seasons": ["annual"], "yearRange": { start: 2024, end: 2026 }},
  "kokka-sogo-in": {"code": "kokka-sogo-in", "nameFull": "国家公務員採用総合職試験（院卒者試験）", "urlSlug": "kokka-sogo-in", "level": "specialist", "sessions": [{"session": "kiso", "urlSlug": "kiso", "expectedQuestions": 30, "label": "基礎能力試験", "categories": ["判断推理", "数的推理", "資料解釈"]}], "seasons": ["annual"], "yearRange": {"start": 2026, "end": 2026}},
  "toukei1": {"code": "toukei1", "nameFull": "統計検定1級", "urlSlug": "toukei1", "level": "specialist", "sessions": [{"session": "gakka", "urlSlug": "gakka", "expectedQuestions": 5, "label": "統計数理（記述式）", "categories": ["推定・モデル選択", "十分統計量・漸近分布", "回帰分析・相関係数", "仮説検定・検出力", "確率分布・最尤推定"]}, {"session": "practical", "urlSlug": "practical", "expectedQuestions": 15, "label": "統計応用（記述式）", "categories": ["標本調査・層化抽出", "多変量正規分布・コレスキー分解", "因子分析・因子回転", "重回帰・残差回帰", "無作為化回答法・最尤推定", "ポアソン分布・ハードルモデル", "打切り回帰・トービットモデル", "ARCHモデル・条件付き分散", "品質管理・工程能力指数", "マルコフ連鎖・尤度比検定", "最小二乗・バイアスと分散", "順位和検定・検出力", "ポアソン・ガンマ共役モデル", "生存時間分析・競合リスク", "多重検定・FWER"]}], "seasons": ["annual"], "yearRange": {"start": 2025, "end": 2025}},
  literas: {"code": "literas", "nameFull": "Literas（リテラス）論理言語力検定", "urlSlug": "literas", "level": "basic", "sessions": [{"session": "gakka", "urlSlug": "gakka", "expectedQuestions": 3, "label": "社会理解力の公式例題", "categories": ["2級・社会理解力", "3級・社会理解力"]}], "seasons": ["published"], "yearRange": { start: 2025, end: 2025 }},
  "kogai-01": {"code": "kogai-01", "nameFull": "公害防止管理者 公害総論", "urlSlug": "kogai-01", "level": "specialist", "sessions": [{"session": "gakka", "urlSlug": "gakka", "expectedQuestions": 15, "label": "公害総論", "categories": ["ダイオキシン類", "リスクマネジメント", "二酸化炭素排出量", "公害の歴史", "公害苦情件数", "公害関係法令", "公害防止管理者制度", "土壌汚染と地盤沈下", "地下水質", "有害大気汚染物質", "浮遊粒子状物質", "環境基本法", "環境基本計画", "環境基準", "産業廃棄物の再生利用"]}], "seasons": ["annual"], "yearRange": {"start": 2022, "end": 2026}},
  cfp: {code: "cfp", nameFull: "CFP®資格審査試験", urlSlug: "cfp", level: "advanced", sessions: [
      { session: "gakka", urlSlug: "gakka", expectedQuestions: 50, label: "金融資産運用設計", categories: ["経済指標", "預貯金", "株式投資", "債券投資", "投資信託"] },
      { session: "cfp-risk", urlSlug: "cfp-risk", expectedQuestions: 50, label: "リスクと保険", categories: ["生命保険の制度・契約", "生命保険の税務", "生命保険の商品・給付", "相続・事業承継", "法人保険・退職金", "損害保険の制度・法律", "損害保険の商品・給付", "企業のリスク管理", "損害保険の税務"] },
    ], seasons: ["round1", "round2"], "yearRange": { start: 2026, end: 2026 }},
  "kokka-sogo-dai": {"code": "kokka-sogo-dai", "nameFull": "国家公務員採用総合職試験（大卒程度・教養区分以外）", "urlSlug": "kokka-sogo-dai", "level": "advanced", "sessions": [{"session": "kiso", "urlSlug": "kiso", "expectedQuestions": 30, "label": "基礎能力試験", "categories": ["判断推理", "数的推理"]}], "seasons": ["annual"], "yearRange": { start: 2024, end: 2026 }},
  "boueki-c": {"code": "boueki-c", "nameFull": "貿易実務検定C級", "urlSlug": "boueki-c", "level": "basic", "sessions": [{"session": "gakka", "urlSlug": "gakka", "expectedQuestions": 7, "label": "公式出題例（択一）", "categories": ["貿易実務英語"]}], "seasons": ["published"], "yearRange": { start: 2018, end: 2018 }},
  "service2": {"code": "service2", "nameFull": "サービス接遇検定2級", "urlSlug": "service2", "level": "basic", "sessions": [{"session": "gakka", "urlSlug": "gakka", "expectedQuestions": 3, "label": "公式出題例（択一）", "categories": ["サービススタッフの資質", "専門知識", "一般知識"]}], "seasons": ["published"], "yearRange": { start: 2026, end: 2026 }},
  apef3: {

    code: "apef3", nameFull: "実用フランス語技能検定試験3級", urlSlug: "apef3", level: "basic",

    sessions: [{ session: "gakka", urlSlug: "gakka", expectedQuestions: 41, label: "筆記（問題3・4・6の12設問）", categories: ["文法", "会話"] }],

    seasons: ["autumn"], yearRange: { start: 2015, end: 2015 },

  },
  "koku-hoan-daigakko": {
    code: "koku-hoan-daigakko",
    nameFull: "航空保安大学校学生採用試験（基礎能力）",
    urlSlug: "koku-hoan-daigakko",
    level: "specialist",
    seasons: ["annual"],
    yearRange: {"start": 2025, "end": 2025},
    sessions: [
      {"session": "kiso", "urlSlug": "kiso", "label": "基礎能力", "expectedQuestions": 40, "categories": ["文章理解", "判断推理・数的推理", "資料解釈", "一般知識"]},
    ],
  },
  "cfp-5": {
    code: "cfp-5",
    nameFull: "CFP®資格審査試験 タックスプランニング",
    urlSlug: "cfp-5",
    level: "specialist",
    seasons: ["round2", "round1"],
    yearRange: {"start": 2026, "end": 2026},
    sessions: [
      {"session": "gakka", "urlSlug": "gakka", "label": "タックスプランニング", "expectedQuestions": 50, "categories": ["所得税と住民税", "不動産所得", "個人事業", "事業所得", "給与所得", "家計", "リタイア後の所得", "ストック・オプション", "株式等の譲渡", "譲渡所得", "居住用財産の譲渡", "一時所得と事業所得", "退職所得", "配当・株式譲渡", "不動産の譲渡", "外貨預金", "損益通算", "所得控除", "所得税の計算", "住宅ローン控除", "還付申告", "非居住者の所得", "消費税", "国際課税", "法人成り", "役員と法人", "個人事業税", "法人税", "法人契約の生命保険", "役員給与・会社設立", "財務諸表"]},
    ],
  },
  "eiken1": {
    code: "eiken1", nameFull: "実用英語技能検定 1級", urlSlug: "eiken1", level: "specialist",
    sessions: [
      { session: "gakka", urlSlug: "gakka", expectedQuestions: 37, label: "一次（リーディング・ライティング）", categories: ["短文の語句空所補充", "長文の語句空所補充", "長文の内容一致", "英文要約", "英作文"] },
    ],
    seasons: ["round2", "round1"], yearRange: { start: 2026, end: 2026 },
  },
  ishi: {

    code: "ishi", nameFull: "医師国家試験", urlSlug: "ishi", level: "specialist",

    sessions: [{ session: "mondai-a", urlSlug: "mondai-a", expectedQuestions: 75, label: "問題A（問1〜15を収録）", categories: ["消化器・外科", "腎・泌尿器", "循環器", "呼吸器", "整形外科", "薬理・治療", "神経", "産婦人科", "耳鼻咽喉科", "内分泌・代謝"] }, { session: "mondai-c", urlSlug: "mondai-c", expectedQuestions: 75, label: "問題C", categories: ["一般問題", "臨床問題", "問題C"] }, { session: "mondai-d", urlSlug: "mondai-d", expectedQuestions: 75, label: "問題D", categories: ["整形外科", "産婦人科", "耳鼻咽喉科", "循環器", "内分泌・代謝", "神経", "小児科", "皮膚科", "公衆衛生", "免疫・膠原病", "血液", "眼科", "消化器・外科", "呼吸器", "精神科", "腎・泌尿器"] }, { session: "mondai-f", urlSlug: "mondai-f", expectedQuestions: 75, label: "問題F", categories: ["問題F"] },
  { session: "mondai-b", urlSlug: "mondai-b", expectedQuestions: 50, label: "問題B", categories: ["乳腺", "予防医学", "医療倫理", "医療制度", "医療安全", "医療面接", "呼吸器", "問題B", "婦人科", "小児・周産期", "小児・神経", "循環器", "感染対策", "救急医学", "産科", "皮膚科", "研究倫理", "社会保障", "神経診察", "精神医学", "老年医学", "腎臓", "臨床検査", "臨床薬理", "診療手技", "診療記録", "身体診察"] },
  { session: "mondai-e", urlSlug: "mondai-e", expectedQuestions: 50, label: "問題E", categories: ["スポーツ医学", "予防医学", "医療倫理", "医療制度", "医療面接", "周術期管理", "呼吸器", "問題E", "婦人科", "循環器", "救急医学", "泌尿器", "災害医療", "産科", "疫学", "眼科・神経", "研究倫理", "神経診察", "腎臓", "膠原病", "臨床検査", "血液", "行動科学", "解剖・手技", "診療手技", "身体診察"] },],

    seasons: ["annual"], yearRange: { start: 2022, end: 2026 },

  },
  "building-cleaning-1": {
    code: "building-cleaning-1", nameFull: "ビルクリーニング技能検定1級", urlSlug: "building-cleaning-1", level: "basic",
    sessions: [
      {"session": "gakka", "urlSlug": "gakka", "expectedQuestions": 50, "label": "学科", "categories": ["ビルクリーニング"]},
    ],
    seasons: ["annual"], yearRange: { start: 2024, end: 2025 },
  },
  "gijutsushi1-tekisei": {
    code: "gijutsushi1-tekisei", nameFull: "技術士第一次試験（適性科目）", urlSlug: "gijutsushi1-tekisei", level: "basic",
    sessions: [
      {"session": "gakka", "urlSlug": "gakka", "expectedQuestions": 15, "label": "適性科目", "categories": ["技術者倫理", "法令・制度", "安全・環境"]},
      { session: "ippan", urlSlug: "ippan", expectedQuestions: 15, label: "適性科目", categories: ["aptitude"] },
    ],
    seasons: ["annual"], yearRange: { start: 2021, end: 2025 },
  },
  "juishi": {
    code: "juishi", nameFull: "獣医師国家試験", urlSlug: "juishi", level: "basic",
    sessions: [
      {"session": "required", "urlSlug": "required", "expectedQuestions": 50, "label": "必須問題", "categories": ["人獣共通感染症", "免疫学", "公衆衛生学・食品衛生", "内科学", "動物福祉・倫理", "動物行動学", "外科学・麻酔", "実験動物学", "寄生虫学", "微生物学", "毒性学", "獣医事・法規", "生化学", "生理学", "産業動物臨床", "画像診断", "疫学", "病理学", "組織学", "繁殖学・産科", "臨床病理学", "薬理学", "解剖学", "遺伝学", "魚病学"]},
      {"session": "mondai-a", "urlSlug": "mondai-a", "expectedQuestions": 80, "label": "学説試験 問題A", "categories": ["免疫学", "公衆衛生学・食品衛生", "内科学", "動物衛生学", "外科学・麻酔", "家禽疾病学", "寄生虫学", "微生物学", "毒性学", "獣医事・法規", "生化学", "生理学", "産業動物臨床", "画像診断", "病理学", "発生学", "繁殖学・産科", "薬理学", "解剖学", "馬臨床"]},
      {"session": "mondai-b", "urlSlug": "mondai-b", "expectedQuestions": 80, "label": "学説試験 問題B", "categories": ["人獣共通感染症", "公衆衛生学・食品衛生", "内科学", "動物行動学", "動物衛生学", "外科学・麻酔", "実験動物学", "家禽疾病学", "寄生虫学", "毒性学", "獣医事・法規", "環境衛生", "産業動物臨床", "画像診断", "疫学", "病理学", "繁殖学・産科", "薬理学", "馬臨床", "魚病学"]},
    ],
    seasons: ["annual"], yearRange: { start: 2025, end: 2025 },
  },
  "dekyo-charge-3": {
    code: "dekyo-charge-3",
    nameFull: "電気通信設備工事担任者試験 第一級デジタル通信",
    urlSlug: "dekyo-charge-3",
    level: "specialist",
    seasons: ["round1", "round2"],
    yearRange: {"start": 2026, "end": 2026},
    sessions: [
      {"session": "kiso", "urlSlug": "kiso", "expectedQuestions": 22, "label": "電気通信技術の基礎", "categories": ["電気通信技術の基礎"]},
      {"session": "theory", "urlSlug": "theory", "expectedQuestions": 25, "label": "端末設備の接続のための技術及び理論", "categories": ["端末設備の接続のための技術及び理論"]},
      {"session": "houki", "urlSlug": "houki", "expectedQuestions": 25, "label": "端末設備の接続に関する法規", "categories": ["端末設備の接続に関する法規"]},
    ],
  },
  "zensho-eco-78": {
    code: "zensho-eco-78",
    nameFull: "全商商業経済検定 マーケティング",
    urlSlug: "zensho-eco-78",
    level: "specialist",
    sessions: [
      { session: "gakka", urlSlug: "gakka", expectedQuestions: 50, label: "マーケティング", categories: ["マーケティングの考え方", "環境分析", "STPと施策", "市場調査の方法", "市場調査の計画", "製品ライフサイクル", "サービスと価値", "販売予測と管理", "価格政策", "価格設定と決済", "流通チャネル", "小売業の戦略", "広告", "広報と口コミ"] },
    ],
    seasons: ["annual"],
    yearRange: { start: 2022, end: 2025 },
  },
  "dekyo-charge-5": {
    code: "dekyo-charge-5",
    nameFull: "工事担任者 総合通信",
    urlSlug: "dekyo-charge-5",
    level: "specialist",
    sessions: [
      { session: "kiso", urlSlug: "kiso", expectedQuestions: 22, label: "電気通信技術の基礎", categories: ["電気通信技術の基礎"] },
      { session: "riron", urlSlug: "riron", expectedQuestions: 50, label: "端末設備の接続のための技術及び理論", categories: ["端末設備の接続のための技術及び理論"] },
      { session: "theory", urlSlug: "theory", expectedQuestions: 50, label: "端末設備の接続のための技術及び理論", categories: ["端末設備の接続のための技術及び理論"] },
      { session: "houki", urlSlug: "houki", expectedQuestions: 25, label: "端末設備の接続に関する法規", categories: ["端末設備の接続に関する法規"] },
  {
            session: "dekyo-digital2", urlSlug: "digital2", expectedQuestions: 62, label: "第二級デジタル通信",
            categories: ["電気通信技術の基礎", "端末設備の接続のための技術及び理論", "端末設備の接続に関する法規"],
        },
  {
            session: "dekyo-analog2", urlSlug: "analog2", expectedQuestions: 62, label: "第二級アナログ通信",
            categories: ["電気通信技術の基礎", "端末設備の接続のための技術及び理論", "端末設備の接続に関する法規"],
        },
  {
            session: "dekyo-analog1", urlSlug: "analog1", expectedQuestions: 72, label: "第一級アナログ通信",
            categories: ["電気通信技術の基礎", "端末設備の接続のための技術及び理論", "端末設備の接続に関する法規"],
        },
  {
            session: "dekyo-digital1", urlSlug: "digital1", expectedQuestions: 72, label: "第一級デジタル通信",
            categories: ["電気通信技術の基礎", "端末設備の接続のための技術及び理論", "端末設備の接続に関する法規"],
        },
  {
            session: "dekyo-general", urlSlug: "general", expectedQuestions: 96, label: "総合通信",
            categories: ["電気通信技術の基礎", "端末設備の接続のための技術及び理論", "端末設備の接続に関する法規"],
        },
    ],
    seasons: ["round2", "round1"],
    yearRange: { start: 2022, end: 2026 },
  },
  "eikenp2plus": {"code": "eikenp2plus", "nameFull": "実用英語技能検定 準2級プラス", "urlSlug": "eikenp2plus", "level": "basic", "sessions": [{"session": "gakka", "urlSlug": "gakka", "expectedQuestions": 33, "label": "一次 リーディング・ライティング", "categories": ["短文の語句空所補充", "長文の語句空所補充", "長文の内容一致選択", "英文要約", "意見英作文"]}], "seasons": ["round1", "round2"], "yearRange": {"start": 2026, "end": 2026}},
  "kokuzei-senmonkan": {
    code: "kokuzei-senmonkan",
    nameFull: "国税専門官採用試験",
    urlSlug: "kokuzei-senmonkan",
    level: "specialist",
    sessions: [
               { session: "special-a", urlSlug: "special-a", expectedQuestions: 58, label: "専門A（多肢選択式）",
      categories: ["必須問題", "民法・商法", "会計学", "憲法・行政法", "経済学", "財政学", "経営学", "政治学・社会学・社会事情", "商業英語"] },
               { session: "special-b", urlSlug: "special-b", expectedQuestions: 58, label: "専門B（多肢選択式）", categories: ["専門B（多肢選択式）", "基礎数学", "民法", "会社法", "会計学", "数学", "情報技術", "統計学", "物理", "化学", "経済学", "経済事情", "英語"] },
               { session: "senmon", urlSlug: "senmon", expectedQuestions: 58, label: "専門A（多肢選択式）", categories: ["民法・商法", "会計学", "憲法・行政法", "経済学", "財政学", "経営学", "政治学・社会学・社会事情", "英語", "商業英語"] },
],
    seasons: ["annual"],
    yearRange: { start: 2024, end: 2026 },
  },
  "sasshi1": {"code":"sasshi1","nameFull":"技能検定 1級サッシ施工（ビル用サッシ施工作業）学科試験","urlSlug":"sasshi1","level":"specialist","sessions":[{"session":"gakka","urlSlug":"gakka","expectedQuestions":50,"label":"学科（A群 真偽法・B群 多肢択一法）","categories":["施工・墨出し","工具・加工","材料・シーリング","安全衛生・法令","ガラス・建具","性能・規格","建築構造","製図","図面・製図","安全衛生","工具・溶接","建具・金物","建築構造・関連工事","施工計画","材料・製品","設備・揚重","運搬・養生"]}],"seasons":["early"],"yearRange":{ start: 2023, end: 2025 }},
  "sasshi2": {"code":"sasshi2","nameFull":"技能検定 2級サッシ施工（ビル用サッシ施工作業）学科試験","urlSlug":"sasshi2","level":"basic","sessions":[{"session":"gakka","urlSlug":"gakka","expectedQuestions":50,"label":"学科（A群 真偽法・B群 多肢択一法）","categories":["施工・墨出し","工具・加工","材料・シーリング","安全衛生・法令","ガラス・建具","性能・規格","建築構造","製図"]}],"seasons":["early"],"yearRange":{ start: 2023, end: 2025 }},
  "engei-soshoku3": {"code":"engei-soshoku3","nameFull":"技能検定 3級園芸装飾（室内園芸装飾作業）学科試験","urlSlug":"engei-soshoku3","level":"basic","sessions":[{"session":"gakka","urlSlug":"gakka","expectedQuestions":30,"label":"学科（真偽法）","categories":["園芸装飾・デザイン","工具・資材","植物の種類・形態","植物生理・繁殖","栽培管理","用土・肥料","病害虫","施設・安全衛生"]}],"seasons":["early"],"yearRange":{ start: 2023, end: 2025 }},
  "kyoka-plastic2": {"code":"kyoka-plastic2","nameFull":"技能検定 2級強化プラスチック成形（手積み積層成形作業）学科試験","urlSlug":"kyoka-plastic2","level":"basic","sessions":[{"session":"gakka","urlSlug":"gakka","expectedQuestions":50,"label":"学科（A群 真偽法・B群 多肢択一法）","categories":["加工・接合","図面・品質管理","安全衛生・環境","性能・検査","成形・積層","成形型・補修","材料・強化材","樹脂・硬化","成形法","樹脂・副資材","積層・型・品質","規格・製図","品質管理・測定"]}],"seasons":["early"],"yearRange":{ start: 2023, end: 2025 }},
  "chikuro2": {"code":"chikuro2","nameFull":"技能検定 2級築炉（築炉作業）学科試験","urlSlug":"chikuro2","level":"basic","sessions":[{"session":"gakka","urlSlug":"gakka","expectedQuestions":50,"label":"学科（A群 真偽法・B群 多肢択一法）","categories":["れんが積み","不定形耐火物","仮設・基礎","器工具・施工","安全衛生","施工管理","炉の構造・操業","燃焼・熱","耐火物","製図","施工・工程","工具・施工機械","耐火材料","炉・燃料・伝熱","規格・製図","安全衛生・法令"]}],"seasons":["early"],"yearRange":{ start: 2023, end: 2025 }},
  "chikuro1": {"code":"chikuro1","nameFull":"技能検定 1級築炉（築炉作業）学科試験","urlSlug":"chikuro1","level":"specialist","sessions":[{"session":"gakka","urlSlug":"gakka","expectedQuestions":50,"label":"学科（A群 真偽法・B群 多肢択一法）","categories":["れんが積み","不定形耐火物","仮設・基礎","器工具・施工","安全衛生","施工管理","炉の構造・操業","燃焼・熱","耐火物","製図","安全衛生・法令","工具・施工機械","施工・れんが積み","施工計画・管理","炉・燃焼・伝熱","耐火材料","製図・図面","足場・基礎工事"]}],"seasons":["early"],"yearRange":{ start: 2023, end: 2025 }},
  "kagaku-bunseki1": {"code":"kagaku-bunseki1","nameFull":"技能検定 1級化学分析（化学分析作業）学科試験","urlSlug":"kagaku-bunseki1","level":"specialist","sessions":[{"session":"gakka","urlSlug":"gakka","expectedQuestions":50,"label":"学科（A群 真偽法・B群 多肢択一法）","categories":["品質管理・計量","器具・試料調製","安全衛生・環境","定性・重量分析","容量分析","機器分析","濃度・化学計算","無機・有機化学","分析器具","分離操作","品質管理・統計","基礎化学","安全衛生・法令","定性分析","有機化学","環境分析","試料前処理","試料採取","試薬調製","重量分析"]}],"seasons":["early"],"yearRange":{ start: 2023, end: 2025 }},
  "kagaku-bunseki3": {"code":"kagaku-bunseki3","nameFull":"技能検定 3級化学分析（化学分析作業）学科試験","urlSlug":"kagaku-bunseki3","level":"basic","sessions":[{"session":"gakka","urlSlug":"gakka","expectedQuestions":30,"label":"学科（真偽法）","categories":["品質管理・計量","器具・試料調製","安全衛生・環境","定性・重量分析","容量分析","機器分析","濃度・化学計算","無機・有機化学","分析器具","分離操作","基礎化学","安全衛生","定性分析","有機化学","測定と計算","重量分析"]}],"seasons":["early"],"yearRange":{ start: 2023, end: 2025 }},
  "futsu-senban3": {"code": "futsu-senban3", "nameFull": "技能検定 3級機械加工（普通旋盤作業）学科試験", "urlSlug": "futsu-senban3", "level": "basic", "sessions": [{"session": "gakka", "urlSlug": "gakka", "expectedQuestions": 30, "label": "学科（真偽法）", "categories": ["切削・工具", "図面・電気", "安全衛生", "工作機械", "手仕上げ・加工", "旋盤作業", "材料・熱処理", "機械要素・潤滑", "測定・品質管理"]}], "seasons": ["early", "late"], "yearRange": { start: 2025, end: 2025 }},
  "shashutsu3": {"code": "shashutsu3", "nameFull": "技能検定 3級プラスチック成形（射出成形作業）学科試験", "urlSlug": "shashutsu3", "level": "basic", "sessions": [{"session": "gakka", "urlSlug": "gakka", "expectedQuestions": 30, "label": "学科（真偽法）", "categories": ["安全衛生", "射出成形・条件", "成形不良", "成形法・設備", "材料・乾燥", "測定・品質管理", "金型・ゲート"]}], "seasons": ["late"], "yearRange": { start: 2025, end: 2025 }},
  "kikai-kensa3": {"code":"kikai-kensa3","nameFull":"技能検定 3級機械検査（機械検査作業）学科試験","urlSlug":"kikai-kensa3","level":"basic","sessions":[{"session":"gakka","urlSlug":"gakka","expectedQuestions":30,"label":"学科（真偽法）","categories":["測定の基礎","測定器","材料・熱処理","検査・品質管理","工作機械","機械要素","製図・電気","安全衛生","品質管理・検査","図面・製図","工作機械・加工","測定器・取扱い","精度検査","電気の基礎"]}],"seasons":["early","late"],"yearRange":{ start: 2023, end: 2025 }},
  "kikai-kensa1": {"code":"kikai-kensa1","nameFull":"技能検定 1級機械検査（機械検査作業）学科試験","urlSlug":"kikai-kensa1","level":"specialist","sessions":[{"session":"gakka","urlSlug":"gakka","expectedQuestions":50,"label":"学科（A群 真偽法・B群 多肢択一法）","categories":["測定の基礎","測定器","工作機械","検査・品質管理","機械要素・加工","材料・熱処理","製図・電気","安全衛生","品質管理・検査","図面・製図","工作機械・加工","機械要素","測定器・取扱い","精度検査","電気の基礎","非破壊検査"]}],"seasons":["late"],"yearRange":{ start: 2023, end: 2025 }},
  "tekkin-zumen1": {"code":"tekkin-zumen1","nameFull":"技能検定 1級鉄筋施工（鉄筋施工図作成作業）学科試験","urlSlug":"tekkin-zumen1","level":"specialist","sessions":[{"session":"gakka","urlSlug":"gakka","expectedQuestions":50,"label":"学科（A群 真偽法・B群 多肢択一法）","categories":["建築構造","配筋","構造力学","工具・加工","鉄筋・継手","施工管理","安全衛生","揚重","コンクリート","測量・墨出し","建築材料","図面・製図","鉄筋・定着","関係法令","型枠","揚重機械"]}],"seasons":["late"],"yearRange":{ start: 2023, end: 2024 }},
  "katawaku1": {"code":"katawaku1","nameFull":"技能検定 1級型枠施工（型枠工事作業）学科試験","urlSlug":"katawaku1","level":"specialist","sessions":[{"session":"gakka","urlSlug":"gakka","expectedQuestions":50,"label":"学科（A群 真偽法・B群 多肢択一法）","categories":["加工・墨出し","器工具・仮設材","型枠施工","施工・荷重","コンクリート","材料・構造","製図","安全衛生","図面・製図","型枠・加工","型枠・存置","型枠・支保工","型枠・材料","型枠・転用","型枠・金物","建築材料","建築構造","施工管理","構造力学","測量","足場","鉄筋・構造","関係法令"]}],"seasons":["late"],"yearRange":{ start: 2023, end: 2024 }},
  "tekkin-zumen2": {"code":"tekkin-zumen2","nameFull":"技能検定 2級鉄筋施工（鉄筋施工図作成作業）学科試験","urlSlug":"tekkin-zumen2","level":"basic","sessions":[{"session":"gakka","urlSlug":"gakka","expectedQuestions":50,"label":"学科（A群 真偽法・B群 多肢択一法）","categories":["コンクリート","建築構造","構造力学","工具・加工","建築材料","鉄筋・継手","鉄筋・定着","配筋","施工管理","安全衛生","揚重","測量・墨出し","型枠","図面・製図","関係法令","図面・墨出し"]}],"seasons":["late"],"yearRange":{ start: 2023, end: 2024 }},
  "katawaku2": {"code":"katawaku2","nameFull":"技能検定 2級型枠施工（型枠工事作業）学科試験","urlSlug":"katawaku2","level":"basic","sessions":[{"session":"gakka","urlSlug":"gakka","expectedQuestions":50,"label":"学科（A群 真偽法・B群 多肢択一法）","categories":["施工・荷重","コンクリート","器工具・仮設材","加工・墨出し","型枠施工","安全衛生","材料・構造","製図","図面・製図","土工事","型枠・加工","型枠・墨出し","型枠・存置","型枠・揚重","型枠・支保工","型枠・材料","型枠・点検","型枠・設計","型枠・転用","型枠・金物","建築材料","建築構造","揚重機械","構造力学","測量","足場","鉄筋・構造","関係法令"]}],"seasons":["late"],"yearRange":{ start: 2023, end: 2025 }},
  "kogyo-hoso1": {"code": "kogyo-hoso1", "nameFull": "技能検定 1級工業包装（工業包装作業）学科試験", "urlSlug": "kogyo-hoso1", "level": "specialist", "sessions": [{"session": "gakka", "urlSlug": "gakka", "expectedQuestions": 50, "label": "学科（A群 真偽法・B群 多肢択一法）", "categories": ["包装の基礎", "包装材料", "木箱・枠組箱", "防水・防湿・防せい", "包装機械", "品質管理", "物流・荷役", "包装試験・製図", "安全衛生"]}], "seasons": ["late"], "yearRange": { start: 2023, end: 2025 }},
  "kikai-kensa2": {"code":"kikai-kensa2","nameFull":"技能検定 2級機械検査（機械検査作業）学科試験","urlSlug":"kikai-kensa2","level":"basic","sessions":[{"session":"gakka","urlSlug":"gakka","expectedQuestions":50,"label":"学科（A群 真偽法・B群 多肢択一法）","categories":["測定の基礎","測定器","工作機械","検査・品質管理","機械要素・加工","材料・熱処理","製図・電気","安全衛生","品質管理・検査","図面・製図","工作機械・加工","機械要素","測定器・取扱い","精度検査","電気の基礎","非破壊検査"]}],"seasons":["late"],"yearRange":{ start: 2023, end: 2024 }},
  "kogyo-hoso2": {"code":"kogyo-hoso2","nameFull":"技能検定 2級工業包装（工業包装作業）学科試験","urlSlug":"kogyo-hoso2","level":"basic","sessions":[{"session":"gakka","urlSlug":"gakka","expectedQuestions":50,"label":"学科（A群 真偽法・B群 多肢択一法）","categories":["包装の基礎","包装材料","木箱・枠組箱","防水・防湿・防せい","包装機械","品質管理","物流・荷役","包装試験・製図","安全衛生","パレット","木箱・材料","木箱・組立て","木箱・設計","木箱・金物","段ボール","表示・貿易","製図","輸送・保管","防せい包装"]}],"seasons":["late"],"yearRange":{ start: 2023, end: 2025 }},
  "haiden-seigyo1": {"code": "haiden-seigyo1", "nameFull": "技能検定 1級電気機器組立て（配電盤・制御盤組立て作業）学科試験", "urlSlug": "haiden-seigyo1", "level": "advanced", "sessions": [{"session": "gakka", "urlSlug": "gakka", "expectedQuestions": 50, "label": "学科（A群 真偽法・B群 多肢択一法）", "categories": ["機器・電気基礎", "配線・施工・試験", "盤構造・規格", "製図・加工・材料", "法規・安全"]}], "seasons": ["early"], "yearRange": { start: 2025, end: 2025 }},
  "sequence1": {"code":"sequence1","nameFull":"技能検定 1級シーケンス制御（シーケンス制御作業）学科試験","urlSlug":"sequence1","level":"advanced","sessions":[{"session":"gakka","urlSlug":"gakka","expectedQuestions":50,"label":"学科（A群 真偽法・B群 多肢択一法）","categories":["制御・PLC","法規・安全衛生","製図・加工・材料","論理・プログラミング","通信・入出力","電気・電子基礎","PLC入出力","PLC動作","PLC言語","SFC","タイマ","データ型","ノイズ対策","リレー","交流","保全","保護機器","信頼性","切削加工","制御図面","制御方式","品質管理","図記号","変圧器","安全衛生","安全設計","工具","接地","測定","直流電源","製図","論理回路","軸受","通信","配線","電動機","電気回路","電線"]}],"seasons":["late"],"yearRange":{ start: 2023, end: 2025 }},
  "chuzo2": {"code":"chuzo2","nameFull":"技能検定 2級鋳造（鋳鉄鋳物鋳造作業）学科試験","urlSlug":"chuzo2","level":"basic","sessions":[{"session":"gakka","urlSlug":"gakka","expectedQuestions":50,"label":"学科（A群 真偽法・B群 多肢択一法）","categories":["仕上げ・検査","品質・測定・基礎","法規・安全","溶解・材料","造型・砂処理","鋳造方案・鋳込","中子","品質管理","図面・製図","型ばらし","塗型","安全衛生","工作機械","材料試験","検査","模型","溶接","溶湯試験","溶解・注湯","溶解炉","熱処理","造型","金属材料","鋳型","鋳物砂","鋳込み","鋳造方案","鋳造欠陥","鋳造法","鋳鉄材料","電気","非破壊検査"]}],"seasons":["early"],"yearRange":{ start: 2023, end: 2024 }},
  "chuzo1": {"code":"chuzo1","nameFull":"技能検定 1級鋳造（鋳鉄鋳物鋳造作業）学科試験","urlSlug":"chuzo1","level":"advanced","sessions":[{"session":"gakka","urlSlug":"gakka","expectedQuestions":50,"label":"学科（A群 真偽法・B群 多肢択一法）","categories":["仕上げ・検査","品質・測定・基礎","法規・安全","溶解・材料","造型・砂処理","鋳造方案・鋳込","中子","仕上げ","品質管理","図面・製図","型ばらし","塗型","安全衛生","工作機械","材料規格","材料試験","検査","模型","混練","測定","溶接","溶湯試験","溶解・注湯","溶解炉","熱処理","造型","金属材料","鋳型","鋳物砂","鋳込み","鋳造方案","鋳造欠陥","鋳造法","鋳鉄材料","電気","非破壊検査"]}],"seasons":["early"],"yearRange":{ start: 2023, end: 2025 }},
  "kaiten-denki2": {"code": "kaiten-denki2", "nameFull": "技能検定 2級電気機器組立て（回転電機巻線製作作業）学科試験", "urlSlug": "kaiten-denki2", "level": "basic", "sessions": [{"session": "gakka", "urlSlug": "gakka", "expectedQuestions": 50, "label": "学科（A群 真偽法・B群 多肢択一法）", "categories": ["機器・巻線", "法規・安全", "製図・加工・材料", "電気・磁気基礎"]}], "seasons": ["early"], "yearRange": { start: 2023, end: 2023 }},
  "kaiten-denki1": {"code": "kaiten-denki1", "nameFull": "技能検定 1級電気機器組立て（回転電機巻線製作作業）学科試験", "urlSlug": "kaiten-denki1", "level": "advanced", "sessions": [{"session": "gakka", "urlSlug": "gakka", "expectedQuestions": 50, "label": "学科（A群 真偽法・B群 多肢択一法）", "categories": ["機器・巻線", "法規・安全", "製図・加工・材料", "電気・磁気基礎"]}], "seasons": ["early"], "yearRange": { start: 2023, end: 2023 }},
  "sequence3": {"code":"sequence3","nameFull":"技能検定 3級シーケンス制御（シーケンス制御作業）学科試験","urlSlug":"sequence3","level":"basic","sessions":[{"session":"gakka","urlSlug":"gakka","expectedQuestions":30,"label":"学科（真偽法）","categories":["制御・PLC","法規・安全衛生","製図・加工・材料","論理・プログラミング","通信・入出力","電気・電子基礎","PLC入出力","PLC動作","PLC基礎","PLC言語","SFC","ねじ","スイッチ","タイマ","データ型","データ表現","ノイズ対策","ラダー回路","リレー","交流","保全","保護機器","制御方式","図記号","変圧器","安全衛生","測定","環境管理","論理回路","通信","配線","電動機","電気回路","電磁気","電線"]}],"seasons":["early"],"yearRange":{ start: 2023, end: 2025 }},
  "chuzo3": {"code":"chuzo3","nameFull":"技能検定 3級鋳造（鋳鉄鋳物鋳造作業）学科試験","urlSlug":"chuzo3","level":"basic","sessions":[{"session":"gakka","urlSlug":"gakka","expectedQuestions":30,"label":"学科（真偽法）","categories":["仕上げ・検査","品質・測定・基礎","法規・安全","溶解・材料","造型・砂処理","鋳造方案・鋳込","中子","仕上げ","型ばらし","塗型","安全衛生","模型","測定","溶湯試験","溶解・注湯","溶解炉","造型","鋳型","鋳物砂","鋳込み","鋳造方案","鋳造欠陥","鋳鉄材料","電気"]}],"seasons":["early"],"yearRange":{ start: 2023, end: 2025 }},
  "sequence2": {"code":"sequence2","nameFull":"技能検定 2級シーケンス制御（シーケンス制御作業）学科試験","urlSlug":"sequence2","level":"basic","sessions":[{"session":"gakka","urlSlug":"gakka","expectedQuestions":50,"label":"学科（A群 真偽法・B群 多肢択一法）","categories":["制御・PLC","法規・安全衛生","製図・加工・材料","論理・プログラミング","通信・入出力","電気・電子基礎","PLC入出力","PLC動作","PLC基礎","PLC言語","SFC","ねじ","シーケンス制御","センサ","タイマ","データ型","データ表現","ノイズ対策","ラダー回路","リレー","交流","保全","保護機器","信頼性","制御方式","制御表現","品質管理","図記号","安全衛生","安全設計","工作機械","工具","接地","故障診断","機械要素","歯車","測定","環境規制","直流電源","製図","論理回路","軸受","通信","配線","電動機","電気回路","電磁気","電線"]}],"seasons":["late"],"yearRange":{ start: 2023, end: 2025 }},
  "haiden-seigyo3": {"code":"haiden-seigyo3","nameFull":"技能検定 3級電気機器組立て（配電盤・制御盤組立て作業）学科試験","urlSlug":"haiden-seigyo3","level":"basic","sessions":[{"session":"gakka","urlSlug":"gakka","expectedQuestions":30,"label":"学科（真偽法）","categories":["機器・電気基礎","製図・加工・材料","法規・安全","盤構造・規格","配線・施工・試験","保護機器","切削加工","制御図面","制御電源","図記号","図面記号","圧着","変圧器","安全衛生","工具","測定","環境管理","発電","盤塗装","盤寸法","盤構造","絶縁材料","締付け","製図","配線","金属材料","電動機","電気抵抗","電磁接触器","電磁気","電磁開閉器","電線"]}],"seasons":["late"],"yearRange":{ start: 2023, end: 2025 }},
  "kenchiku-bankin2": {"code": "kenchiku-bankin2", "nameFull": "技能検定 2級建築板金（内外装板金作業）学科試験", "urlSlug": "kenchiku-bankin2", "level": "advanced", "sessions": [{"session": "gakka", "urlSlug": "gakka", "expectedQuestions": 50, "label": "学科（A群 真偽法・B群 多肢択一法）", "categories": ["板金加工・機械", "法規・安全", "材料・基礎", "建築・製図", "電気基礎", "施工管理・屋根外壁"]}], "seasons": ["early"], "yearRange": { start: 2025, end: 2025 }},
  "kensetsu-kikai-seibi1": {"code": "kensetsu-kikai-seibi1", "nameFull": "技能検定 1級建設機械整備（建設機械整備作業）学科試験", "urlSlug": "kensetsu-kikai-seibi1", "level": "advanced", "sessions": [{"session": "gakka", "urlSlug": "gakka", "expectedQuestions": 50, "label": "学科（A群 真偽法・B群 多肢択一法）", "categories": ["建設機械・油圧", "電気・点検", "エンジン・整備", "工作・溶接・材料", "土質・力学・製図", "法規・安全衛生"]}], "seasons": ["early"], "yearRange": { start: 2025, end: 2025 }},
  "sakan3": {"code":"sakan3","nameFull":"技能検定 3級左官（左官作業）学科試験","urlSlug":"sakan3","level":"basic","sessions":[{"session":"gakka","urlSlug":"gakka","expectedQuestions":30,"label":"学科（真偽法）","categories":["器工具・下地","塗付け・施工管理","墨出し","材料・調合","法規・安全衛生","製図・構造","タイル施工","モルタル施工","下地","伝統工法","器工具","安全衛生","工程管理","建築構造","施工管理","材料","材料管理","製図"]}],"seasons":["early"],"yearRange":{ start: 2023, end: 2025 }},
  "zoen-gino3": {"code":"zoen-gino3","nameFull":"技能検定 3級造園（造園工事作業）学科試験","urlSlug":"zoen-gino3","level":"basic","sessions":[{"session":"gakka","urlSlug":"gakka","expectedQuestions":30,"label":"学科（真偽法）","categories":["施工管理","材料・土壌","植栽・管理","法規・安全衛生","測量・製図","石工・施設施工","造園計画・意匠","コンクリート工事","剪定・整姿","図面・製図","土壌改良","土工事","型枠工事","安全衛生","屋上緑化","工具","庭園史","庭園施設","庭園様式","支柱","施肥","材料","植栽","植栽工事","植栽管理","植栽規格","植物","病害虫","石工事","石灯籠","竹垣","肥料","芝生","花壇","関係法規"]}],"seasons":["early","late"],"yearRange":{ start: 2023, end: 2025 }},
  "sakan2": {"code":"sakan2","nameFull":"技能検定 2級左官（左官作業）学科試験","urlSlug":"sakan2","level":"advanced","sessions":[{"session":"gakka","urlSlug":"gakka","expectedQuestions":50,"label":"学科（A群 真偽法・B群 多肢択一法）","categories":["下地","器工具","器工具・下地","型抜き","塗付け・仕上げ","墨出し","安全衛生","意匠","施工管理","材料・調合","構造","法規","法規・安全衛生","製図・構造","タイル施工","プラスター施工","モルタル施工","乾式工法","仕上げ施工","伝統工法","建築構造","施工不良","材料","機械","組積施工","色彩","装飾施工","製図","関係法令"]}],"seasons":["early"],"yearRange":{ start: 2023, end: 2025 }},
  "sakan1": {"code":"sakan1","nameFull":"技能検定 1級左官（左官作業）学科試験","urlSlug":"sakan1","level":"advanced","sessions":[{"session":"gakka","urlSlug":"gakka","expectedQuestions":50,"label":"学科（A群 真偽法・B群 多肢択一法）","categories":["下地","器工具","型抜き","塗付け・仕上げ","墨出し","安全衛生","意匠","施工管理","材料・調合","構造","法規","製図・構造","タイル施工","プラスター施工","モルタル施工","人造石施工","仕上げ施工","伝統工法","床施工","建築構造","材料","材料管理","機械","組積施工","色彩","装飾施工","製図","関係法令"]}],"seasons":["early"],"yearRange":{ start: 2023, end: 2024 }},
  "zoen-gino1": {"code":"zoen-gino1","nameFull":"技能検定 1級造園（造園工事作業）学科試験","urlSlug":"zoen-gino1","level":"advanced","sessions":[{"session":"gakka","urlSlug":"gakka","expectedQuestions":50,"label":"学科（A群 真偽法・B群 多肢択一法）","categories":["施工管理","材料・土壌","植栽・管理","法規・安全衛生","測量・製図","石工・施設施工","造園計画・意匠","れんが工事","コンクリート工事","剪定・整姿","図面・製図","土壌改良","安全衛生","工具","庭園史","庭園施設","支柱","施工機械","材料","植栽工事","植栽規格","植物","植物繁殖","測量","環境・緑地","病害虫","石工事","竹垣","肥料","芝生","護岸工事","関係法規"]}],"seasons":["early"],"yearRange":{ start: 2023, end: 2024 }},
  "zoen-gino2": {"code":"zoen-gino2","nameFull":"技能検定 2級造園（造園工事作業）学科試験","urlSlug":"zoen-gino2","level":"basic","sessions":[{"session":"gakka","urlSlug":"gakka","expectedQuestions":50,"label":"学科（A群 真偽法・B群 多肢択一法）","categories":["施工管理","材料・土壌","植栽・管理","法規・安全衛生","測量・製図","石工・施設施工","造園計画・意匠","れんが工事","コンクリート工事","ブロック工事","剪定・整姿","図面・製図","土壌改良","土工事","安全衛生","工具","庭園史","庭園施設","庭園様式","排水工事","支柱","材料","植栽","植栽工事","植物","測量","病害虫","石工事","竹垣","舗装","芝生","花壇","関係法規"]}],"seasons":["early"],"yearRange":{ start: 2023, end: 2025 }},
  "bousui-urethane2": {"code": "bousui-urethane2", "nameFull": "技能検定 2級防水施工（ウレタンゴム系塗膜防水工事作業）学科試験", "urlSlug": "bousui-urethane2", "level": "advanced", "sessions": [{"session": "gakka", "urlSlug": "gakka", "expectedQuestions": 50, "label": "学科（A群 真偽法・B群 多肢択一法）", "categories": ["建築構造・材料", "製図・法規", "安全衛生", "材料調合・塗布", "下地・納まり", "工法・補修", "養生・維持管理", "その他の防水"]}], "seasons": ["early"], "yearRange": { start: 2025, end: 2025 }},
  "bousui-frp2": {"code":"bousui-frp2","nameFull":"技能検定 2級防水施工（FRP防水工事作業）学科試験","urlSlug":"bousui-frp2","level":"basic","sessions":[{"session":"gakka","urlSlug":"gakka","expectedQuestions":50,"label":"学科（A群 真偽法・B群 多肢択一法）","categories":["FRP施工","下地","他工法","工具","建築構造","施工管理","材料","材料調合","法令・安全","補修・維持管理","製図","施工不良"]}],"seasons":["early"],"yearRange":{ start: 2023, end: 2024 }},
  "pan-seizo1": {"code":"pan-seizo1","nameFull":"技能検定 1級パン製造（パン製造作業）学科試験","urlSlug":"pan-seizo1","level":"advanced","sessions":[{"session":"gakka","urlSlug":"gakka","expectedQuestions":50,"label":"学科（A群 真偽法・B群 多肢択一法）","categories":["パンの種類","包装・品質管理","原材料","栄養・衛生","機械・設備","法令・安全","生産管理","発酵","菓子製造","製パン工程","製パン理論","パン・菓子の種類","ホイロ","ミキシング","冷凍生地","冷却・包装","包装","品質管理","安全衛生","小麦粉試験","栄養","焼成","生地・発酵","製パン","製パン・規格","製パン原料","製パン機械","製造原価","製造計算","関係法令","食品衛生"]}],"seasons":["late"],"yearRange":{ start: 2023, end: 2025 }},
  "pan-seizo2": {"code":"pan-seizo2","nameFull":"技能検定 2級パン製造（パン製造作業）学科試験","urlSlug":"pan-seizo2","level":"basic","sessions":[{"session":"gakka","urlSlug":"gakka","expectedQuestions":50,"label":"学科（A群 真偽法・B群 多肢択一法）","categories":["パンの種類","包装・品質管理","原材料","栄養・衛生","機械・設備","法令・安全","生産管理","発酵","菓子製造","製パン工程","製パン理論","冷却・包装","品質管理","安全衛生","栄養","製パン","製パン機械","製造計算","食品衛生"]}],"seasons":["late"],"yearRange":{ start: 2023, end: 2024 }},
  "kikai-shiage1": {"code":"kikai-shiage1","nameFull":"技能検定 1級仕上げ（機械組立仕上げ作業）学科試験","urlSlug":"kikai-shiage1","level":"advanced","sessions":[{"session":"gakka","urlSlug":"gakka","expectedQuestions":50,"label":"学科（A群 真偽法・B群 多肢択一法）","categories":["はめあい","シール","ジグ","切削工具","切削油剤","品質管理","安全衛生","工作機械","工具","手仕上げ","接合","材料","材料力学","材料試験","検査","機械要素","油圧","測定","潤滑","熱処理","研削","組立て","締結","表面処理","製図","軸受","電気","けがき","プレス加工","切削油・潤滑","力学","図面・製図","工具・規格","放電加工","歯車","溶接","穴加工","騒音"]}],"seasons":["early"],"yearRange":{ start: 2023, end: 2025 }},
  "plant-haikan-seizu1": {"code": "plant-haikan-seizu1", "nameFull": "技能検定 1級機械・プラント製図（プラント配管製図作業）学科試験", "urlSlug": "plant-haikan-seizu1", "level": "advanced", "sessions": [{"session": "gakka", "urlSlug": "gakka", "expectedQuestions": 50, "label": "学科（A群 真偽法・B群 多肢択一法）", "categories": ["ノズル配置", "フランジ", "ポンプ", "保温保冷", "力学", "圧縮機", "安全衛生", "工具", "弁", "投影図", "材料", "材料力学", "法令", "洗浄", "流体", "消防設備", "溶接", "溶接欠陥", "溶接記号", "熱", "熱交換器", "熱処理", "管材料", "蒸気トラップ", "製図", "製図用具", "計測", "設備計画", "設計圧力", "試験検査", "配管図記号", "配管支持", "配管清掃", "配管設計", "防食", "電気", "非破壊検査"]}], "seasons": ["late"], "yearRange": { start: 2024, end: 2024 }},
  "kikai-seizu3": {"code": "kikai-seizu3", "nameFull": "技能検定 3級機械・プラント製図（機械製図手書き作業）学科試験", "urlSlug": "kikai-seizu3", "level": "basic", "sessions": [{"session": "gakka", "urlSlug": "gakka", "expectedQuestions": 30, "label": "学科（真偽法）", "categories": ["CAD", "ねじ", "はめあい", "力学", "原動機", "寸法", "工作機械", "材料", "材料力学", "材料試験", "機械要素", "歯車", "流体", "測定", "溶接", "熱", "表面処理", "製図", "製図用具", "鋳造", "電気"]}], "seasons": ["late"], "yearRange": { start: 2025, end: 2025 }},
  "kikai-seizu-cad3": {"code":"kikai-seizu-cad3","nameFull":"技能検定 3級機械・プラント製図（機械製図CAD作業）学科試験","urlSlug":"kikai-seizu-cad3","level":"basic","sessions":[{"session":"gakka","urlSlug":"gakka","expectedQuestions":30,"label":"学科（真偽法）","categories":["CAD","ねじ","力学","加工","原動機","工作機械","投影図","材料","材料力学","材料試験","機械要素","歯車","流体","測定","溶接","熱","熱処理","表面処理","製図","製図用具","電気","CAD・CAE","CAD・CAM","はめあい","検査"]}],"seasons":["late"],"yearRange":{ start: 2023, end: 2024 }},
  "kikai-seizu2": {"code": "kikai-seizu2", "nameFull": "技能検定 2級機械・プラント製図（機械製図手書き作業）学科試験", "urlSlug": "kikai-seizu2", "level": "basic", "sessions": [{"session": "gakka", "urlSlug": "gakka", "expectedQuestions": 50, "label": "学科（A群 真偽法・B群 多肢択一法）", "categories": ["CAD", "ねじ", "はめあい", "ばね", "力学", "原動機", "図心", "安全衛生", "寸法", "寸法公差", "展開図", "工作機械", "幾何公差", "断面図", "材料", "材料力学", "材料試験", "機械要素", "歯車", "流体", "溶接", "熱", "熱処理", "表面処理", "製図", "製図用具", "軸受", "鋳造", "電気"]}], "seasons": ["late"], "yearRange": { start: 2025, end: 2025 }},
  "kikai-seizu-cad2": {"code": "kikai-seizu-cad2", "nameFull": "技能検定 2級機械・プラント製図（機械製図CAD作業）学科試験", "urlSlug": "kikai-seizu-cad2", "level": "basic", "sessions": [{"session": "gakka", "urlSlug": "gakka", "expectedQuestions": 50, "label": "学科（A群 真偽法・B群 多肢択一法）", "categories": ["CAD", "ねじ", "はめあい", "力学", "加工", "原動機", "安全衛生", "工具", "幾何公差", "投影図", "断面図", "材料", "材料力学", "機械要素", "歯車", "流体", "測定", "溶接", "熱", "熱処理", "表面処理", "製図", "製図用具", "軸受", "電気"]}], "seasons": ["late"], "yearRange": { start: 2023, end: 2023 }},
  "kikai-shiage3": {"code":"kikai-shiage3","nameFull":"技能検定 3級仕上げ（機械組立仕上げ作業）学科試験","urlSlug":"kikai-shiage3","level":"basic","sessions":[{"session":"gakka","urlSlug":"gakka","expectedQuestions":30,"label":"学科（真偽法）","categories":["けがき","はめあい","シール","切削工具","切削油剤","品質管理","安全衛生","工作機械","手仕上げ","据付け","材料","検査","機械要素","歯車","測定","潤滑","熱処理","研削","穴加工","組立て","表面処理","製図","鍛造","騒音","図面・製図","工具・規格","油圧","溶接","締結","電気"]}],"seasons":["early"],"yearRange":{ start: 2023, end: 2025 }},
  "kikai-shiage2": {"code":"kikai-shiage2","nameFull":"技能検定 2級仕上げ（機械組立仕上げ作業）学科試験","urlSlug":"kikai-shiage2","level":"basic","sessions":[{"session":"gakka","urlSlug":"gakka","expectedQuestions":50,"label":"学科（A群 真偽法・B群 多肢択一法）","categories":["けがき","シール","ジグ","切削工具","切削油剤","品質管理","安全衛生","工作機械","工具","据付け","材料","材料力学","材料試験","検査","機械要素","油圧","測定","溶接","潤滑","熱処理","穴加工","組立て","締結","表面処理","製図","電気","力学","手仕上げ","軸受","鋳造"]}],"seasons":["early"],"yearRange":{ start: 2023, end: 2024 }},
  "naiso-carpet2": {"code": "naiso-carpet2", "nameFull": "技能検定 2級内装仕上げ施工（カーペット系床仕上げ工事作業）学科試験", "urlSlug": "naiso-carpet2", "level": "advanced", "sessions": [{"session": "gakka", "urlSlug": "gakka", "expectedQuestions": 50, "label": "学科（A群 真偽法・B群 多肢択一法）", "categories": ["カーペット施工", "カーペット材料", "下地", "工具", "建築構造", "材料", "法令・安全", "維持管理", "色彩", "製図"]}], "seasons": ["early"], "yearRange": { start: 2024, end: 2024 }},
  "naiso-plastic1": {"code": "naiso-plastic1", "nameFull": "技能検定 1級内装仕上げ施工（プラスチック系床仕上げ工事作業）学科試験", "urlSlug": "naiso-plastic1", "level": "specialist", "sessions": [{"session": "gakka", "urlSlug": "gakka", "expectedQuestions": 50, "label": "学科（A群 真偽法・B群 多肢択一法）", "categories": ["下地", "工具", "床材施工", "床材材料", "建築構造", "接着剤", "施工計算", "材料", "法令・安全", "維持管理", "色彩", "製図"]}], "seasons": ["early"], "yearRange": { start: 2023, end: 2023 }},
  "naiso-plastic2": {"code": "naiso-plastic2", "nameFull": "技能検定 2級内装仕上げ施工（プラスチック系床仕上げ工事作業）学科試験", "urlSlug": "naiso-plastic2", "level": "advanced", "sessions": [{"session": "gakka", "urlSlug": "gakka", "expectedQuestions": 50, "label": "学科（A群 真偽法・B群 多肢択一法）", "categories": ["下地", "工具", "床材施工", "床材材料", "建築構造", "接着剤", "材料", "法令・安全", "維持管理", "色彩", "製図"]}], "seasons": ["early"], "yearRange": { start: 2023, end: 2023 }},
  "naiso-kosei2": {"code": "naiso-kosei2", "nameFull": "技能検定 2級内装仕上げ施工（鋼製下地工事作業）学科試験", "urlSlug": "naiso-kosei2", "level": "advanced", "sessions": [{"session": "gakka", "urlSlug": "gakka", "expectedQuestions": 50, "label": "学科（A群 真偽法・B群 多肢択一法）", "categories": ["建築構造・仕上げ", "製図", "法規・安全衛生", "材料・性能", "天井・壁下地", "器工具・施工"]}], "seasons": ["early"], "yearRange": { start: 2025, end: 2025 }},
  "kinzoku-press1": {"code":"kinzoku-press1","nameFull":"技能検定 1級金属プレス加工（金属プレス作業）学科試験","urlSlug":"kinzoku-press1","level":"specialist","sessions":[{"session":"gakka","urlSlug":"gakka","expectedQuestions":50,"label":"学科（A群 真偽法・B群 多肢択一法）","categories":["プレス機械・金型","加工・品質管理","材料・力学","材料・熱処理","器工具・測定","製図・油空圧・電気","安全衛生","せん断加工","プレス機械","仕上げ","加工","品質管理","工具","成形加工","曲げ加工","材料","材料試験","油圧","測定","潤滑","熱処理","研削","絞り加工","表面処理","製図","金型","電気"]}],"seasons":["early"],"yearRange":{ start: 2023, end: 2024 }},
  "plant-haikan2": {"code":"plant-haikan2","nameFull":"技能検定 2級配管（プラント配管作業）学科試験","urlSlug":"plant-haikan2","level":"advanced","sessions":[{"session":"gakka","urlSlug":"gakka","expectedQuestions":50,"label":"学科（A群 真偽法・B群 多肢択一法）","categories":["保温・保冷","図面・製図","安全衛生","工具・機械","施工管理","材料","流体・熱","溶接","管・継手・弁","試験・検査","基礎理論","工具・加工","施工","検査","法令・安全","流体・機器","熱処理","製図","計測","設備","配管支持","配管施工","配管機器","配管部品","関係法令","防食・保温"]}],"seasons":["late"],"yearRange":{ start: 2023, end: 2025 }},
  "haikan-kenchiku3": {"code":"haikan-kenchiku3","nameFull":"技能検定 3級配管（建築配管作業）学科試験","urlSlug":"haikan-kenchiku3","level":"basic","sessions":[{"session":"gakka","urlSlug":"gakka","expectedQuestions":30,"label":"学科（真偽法）","categories":["保温・保冷","図面・製図","安全衛生","工具・機械","排水設備","接合","材料","管・継手・弁","管加工","給水設備","給湯設備","衛生器具","試験・検査","ポンプ","工具・加工","施工","検査","法令・安全","流体・機器","消火設備","溶接","管の接合","製図","配管施工","防食・保温"]}],"seasons":["late"],"yearRange":{ start: 2023, end: 2025 }},
  "plant-haikan1": {"code":"plant-haikan1","nameFull":"技能検定 1級配管（プラント配管作業）学科試験","urlSlug":"plant-haikan1","level":"specialist","sessions":[{"session":"gakka","urlSlug":"gakka","expectedQuestions":50,"label":"学科（A群 真偽法・B群 多肢択一法）","categories":["工具・機械","管・継手・弁","試験・検査","保温・保冷","溶接","流体・熱","材料","図面・製図","安全衛生","施工管理","ポンプ","基礎理論","工具・加工","検査","熱処理","表面処理","計測","設備","配管支持","配管施工","配管部品","関係法令","防食・保温"]}],"seasons":["late"],"yearRange":{ start: 2023, end: 2025 }},
  "kinzoku-press2": {"code":"kinzoku-press2","nameFull":"技能検定 2級金属プレス加工（金属プレス作業）学科試験","urlSlug":"kinzoku-press2","level":"advanced","sessions":[{"session":"gakka","urlSlug":"gakka","expectedQuestions":50,"label":"学科（A群 真偽法・B群 多肢択一法）","categories":["プレス機械・金型","加工・品質管理","材料・熱処理","材料・力学","器工具・測定","製図・油空圧・電気","安全衛生","せん断加工","プレス機械","仕上げ","品質管理","工具","曲げ加工","材料","材料試験","機械要素","油圧","潤滑","熱処理","研削","絞り加工","製図","金型","電気"]}],"seasons":["early"],"yearRange":{ start: 2023, end: 2025 }},
  "tekkin-zumen3": {"code":"tekkin-zumen3","nameFull":"技能検定 3級鉄筋施工（鉄筋施工図作成作業）学科試験","urlSlug":"tekkin-zumen3","level":"basic","sessions":[{"session":"gakka","urlSlug":"gakka","expectedQuestions":30,"label":"学科（真偽法）","categories":["建築構造","構造力学","工具・加工","図面・製図","鉄筋・定着","配筋","鉄筋・継手","コンクリート","建築材料","型枠","揚重","安全衛生","型枠・材料","測量","鉄筋・かぶり"]}],"seasons":["late"],"yearRange":{ start: 2023, end: 2024 }},
  "katawaku3": {"code":"katawaku3","nameFull":"技能検定 3級型枠施工（型枠工事作業）学科試験","urlSlug":"katawaku3","level":"basic","sessions":[{"session":"gakka","urlSlug":"gakka","expectedQuestions":30,"label":"学科（真偽法）","categories":["器工具・仮設材","施工・荷重","型枠施工","加工・墨出し","コンクリート","材料・構造","製図","安全衛生","図面・製図","型枠・加工","型枠・存置","型枠・支保工","型枠・金物","工具・加工","建築材料","建築構造","施工管理","測量","鉄筋・かぶり","鉄筋・定着","関係法令"]}],"seasons":["late"],"yearRange":{ start: 2023, end: 2025 }},
  "kyoka-plastic1": {"code":"kyoka-plastic1","nameFull":"技能検定 1級強化プラスチック成形（手積み積層成形作業）学科試験","urlSlug":"kyoka-plastic1","level":"specialist","sessions":[{"session":"gakka","urlSlug":"gakka","expectedQuestions":50,"label":"学科（A群 真偽法・B群 多肢択一法）","categories":["加工・接合","図面・品質管理","安全衛生・環境","性能・検査","成形・積層","成形型・補修","材料・強化材","樹脂・硬化"]}],"seasons":["early"],"yearRange":{ start: 2023, end: 2025 }},
  "engei-soshoku1": {"code":"engei-soshoku1","nameFull":"技能検定 1級園芸装飾（室内園芸装飾作業）学科試験","urlSlug":"engei-soshoku1","level":"specialist","sessions":[{"session":"gakka","urlSlug":"gakka","expectedQuestions":50,"label":"学科（A群 真偽法・B群 多肢択一法）","categories":["園芸装飾・デザイン","工具・資材","植物の種類・形態","植物生理・繁殖","栽培管理","用土・肥料","病害虫","施設・安全衛生"]}],"seasons":["early"],"yearRange":{ start: 2023, end: 2025 }},
  "insatsu1": {"code":"insatsu1","nameFull":"技能検定 1級印刷（オフセット印刷作業）学科試験","urlSlug":"insatsu1","level":"advanced","sessions":[{"session":"gakka","urlSlug":"gakka","expectedQuestions":50,"label":"学科（A群 真偽法・B群 多肢択一法）","categories":["印刷方式・製版","印刷機・給排紙","色彩・網点","用紙・製本","安全衛生・環境","インキ・乾燥","電気・計測","湿し水・ローラ","品質・トラブル"]}],"seasons":["early"],"yearRange":{ start: 2023, end: 2025 }},
  "insatsu2": {"code":"insatsu2","nameFull":"技能検定 2級印刷（オフセット印刷作業）学科試験","urlSlug":"insatsu2","level":"basic","sessions":[{"session":"gakka","urlSlug":"gakka","expectedQuestions":50,"label":"学科（A群 真偽法・B群 多肢択一法）","categories":["印刷方式・製版","印刷機・給排紙","色彩・網点","用紙・製本","安全衛生・環境","インキ・乾燥","電気・計測","品質・トラブル","湿し水・ローラ"]}],"seasons":["early"],"yearRange":{ start: 2023, end: 2025 }},
  "engei-soshoku2": {"code":"engei-soshoku2","nameFull":"技能検定 2級園芸装飾（室内園芸装飾作業）学科試験","urlSlug":"engei-soshoku2","level":"basic","sessions":[{"session":"gakka","urlSlug":"gakka","expectedQuestions":50,"label":"学科（A群 真偽法・B群 多肢択一法）","categories":["園芸装飾・デザイン","工具・資材","植物の種類・形態","植物生理・繁殖","栽培管理","用土・肥料","病害虫","施設・安全衛生"]}],"seasons":["early"],"yearRange":{ start: 2023, end: 2025 }},
  "futsu-senban1": {"code": "futsu-senban1", "nameFull": "技能検定 1級機械加工（普通旋盤作業）学科試験", "urlSlug": "futsu-senban1", "level": "specialist", "sessions": [{"session": "gakka", "urlSlug": "gakka", "expectedQuestions": 50, "label": "学科（A群 真偽法・B群 多肢択一法）", "categories": ["けがき・手仕上げ", "切削工具・加工", "加工計算", "品質管理", "安全衛生・法令", "工具材料・潤滑", "数値制御", "旋盤・取付け", "材料・熱処理", "機械要素・油空圧", "精度・測定", "製図・図面", "電気・計算"]}], "seasons": ["early"], "yearRange": { start: 2025, end: 2025 }},
  "shashutsu1": {"code": "shashutsu1", "nameFull": "技能検定 1級プラスチック成形（射出成形作業）学科試験", "urlSlug": "shashutsu1", "level": "specialist", "sessions": [{"session": "gakka", "urlSlug": "gakka", "expectedQuestions": 50, "label": "学科（A群 真偽法・B群 多肢択一法）", "categories": ["二次加工", "品質管理", "安全衛生・表示", "成形・不良", "成形・条件", "成形機・金型", "材料・乾燥", "材料・性質", "材料・着色", "測定・検査", "測定・計算", "電気・設備"]}], "seasons": ["early"], "yearRange": { start: 2025, end: 2025 }},
  "tekkin3": {"code": "tekkin3", "nameFull": "技能検定 3級鉄筋施工（鉄筋組立て作業）学科試験", "urlSlug": "tekkin3", "level": "basic", "sessions": [{"session": "gakka", "urlSlug": "gakka", "expectedQuestions": 30, "label": "学科（真偽法）", "categories": ["コンクリート", "図面・製図", "型枠", "安全衛生", "工具・加工", "建築材料", "建築構造", "材料管理", "構造力学", "配筋", "鉄筋・定着", "鉄筋・継手"]}], "seasons": ["late"], "yearRange": { start: 2025, end: 2025 }},
  "tekkin2": {"code": "tekkin2", "nameFull": "技能検定 2級鉄筋施工（鉄筋組立て作業）学科試験", "urlSlug": "tekkin2", "level": "basic", "sessions": [{"session": "gakka", "urlSlug": "gakka", "expectedQuestions": 50, "label": "学科（A群 真偽法・B群 多肢択一法）", "categories": ["コンクリート", "図面・製図", "型枠", "安全衛生", "工具・加工", "建築材料", "建築構造", "揚重", "施工管理", "構造力学", "測量・墨出し", "足場", "配筋", "鉄筋・定着", "鉄筋・継手", "関係法令"]}], "seasons": ["late"], "yearRange": { start: 2025, end: 2025 }},
  "kikai-seizu-tegaki1": {"code": "kikai-seizu-tegaki1", "nameFull": "技能検定 1級機械・プラント製図（機械製図手書き作業）学科試験", "urlSlug": "kikai-seizu-tegaki1", "level": "advanced", "sessions": [{"session": "gakka", "urlSlug": "gakka", "expectedQuestions": 50, "label": "学科（A群 真偽法・B群 多肢択一法）", "categories": ["CAD", "ねじ", "ねじ加工", "はめあい", "ばね", "シール", "力学", "動力伝達", "安全衛生", "工作機械", "幾何公差", "投影図", "材料", "材料力学", "材料試験", "機械要素", "歯車", "歯車製図", "流体", "流体機械", "溶接", "熱", "熱処理", "締結", "表面処理", "製図", "製図用具", "鋳造", "電気"]}], "seasons": ["late"], "yearRange": { start: 2025, end: 2025 }},
  "reito-seko2": {"code": "reito-seko2", "nameFull": "技能検定 2級冷凍空気調和機器施工（冷凍空気調和機器施工作業）学科試験", "urlSlug": "reito-seko2", "level": "basic", "sessions": [{"session": "gakka", "urlSlug": "gakka", "expectedQuestions": 50, "label": "学科（A群 真偽法・B群 多肢択一法）", "categories": ["ダクト", "ポンプ", "冷凍機油", "冷凍理論", "冷媒", "冷媒回収", "冷媒配管", "凝縮器", "制御", "器工具", "四方弁", "図記号", "圧縮機", "安全衛生", "建築", "弁類", "据付け", "排水", "断熱", "材料", "水処理", "水配管", "法令", "真空乾燥", "空気線図", "空調能力", "膨張装置", "試験", "防音防振", "電気", "電気制御", "電気測定", "電気計算", "電磁弁", "冷却塔", "膨張弁", "冷凍装置", "ろう付け", "容量制御", "冷媒充塡", "整備", "測定", "基礎理論", "保護装置", "故障診断"]}], "seasons": ["late"], "yearRange": { start: 2023, end: 2025 }},
  "reito-seko1": {"code": "reito-seko1", "nameFull": "技能検定 1級冷凍空気調和機器施工（冷凍空気調和機器施工作業）学科試験", "urlSlug": "reito-seko1", "level": "advanced", "sessions": [{"session": "gakka", "urlSlug": "gakka", "expectedQuestions": 50, "label": "学科（A群 真偽法・B群 多肢択一法）", "categories": ["ダクト", "ドレン配管", "ブライン", "伝熱", "保護装置", "冷凍理論", "冷凍装置", "冷却塔", "冷媒", "冷媒回収", "冷媒配管", "図記号", "安全衛生", "建築", "据付け", "故障診断", "整備", "断熱", "施工管理", "材料", "水処理", "法令", "測定", "真空乾燥", "空気線図", "給水", "膨張弁", "試験", "運転調整", "配管", "防音", "電気", "電気制御", "電気測定", "電気計算", "凝縮器", "圧縮機", "蒸発器", "送風機", "水配管", "排水", "器工具", "制御", "ポンプ", "冷凍機油", "弁類", "防振"]}], "seasons": ["late"], "yearRange": { start: 2023, end: 2025 }},
  "kuukiatsu-kumitate2": {"code": "kuukiatsu-kumitate2", "nameFull": "技能検定 2級空気圧装置組立て（空気圧装置組立て作業）学科試験", "urlSlug": "kuukiatsu-kumitate2", "level": "basic", "sessions": [{"session": "gakka", "urlSlug": "gakka", "expectedQuestions": 50, "label": "学科（A群 真偽法・B群 多肢択一法）", "categories": ["アクチュエータ", "シリンダ", "シール", "保全", "制御回路", "図記号", "基礎理論", "安全衛生", "方向制御", "材料", "流量制御", "測定", "潤滑", "真空", "空気清浄化", "配管", "電気", "空気圧装置"]}], "seasons": ["late"], "yearRange": { start: 2023, end: 2025 }},
  "kuukiatsu-kumitate1": {"code": "kuukiatsu-kumitate1", "nameFull": "技能検定 1級空気圧装置組立て（空気圧装置組立て作業）学科試験", "urlSlug": "kuukiatsu-kumitate1", "level": "advanced", "sessions": [{"session": "gakka", "urlSlug": "gakka", "expectedQuestions": 50, "label": "学科（A群 真偽法・B群 多肢択一法）", "categories": ["はめあい", "シリンダ", "シール", "保全", "制御回路", "図記号", "圧力制御", "圧縮機", "基礎理論", "安全衛生", "工具", "方向制御", "材料", "材料試験", "油圧", "流量制御", "測定", "真空", "空気圧モータ", "空気清浄化", "空油変換", "配管", "電気", "空気圧装置", "加工・材料"]}], "seasons": ["late"], "yearRange": { start: 2023, end: 2025 }},
  "henatsuki-kumitate2": {"code": "henatsuki-kumitate2", "nameFull": "技能検定 2級電気機器組立て（変圧器組立て作業）学科試験", "urlSlug": "henatsuki-kumitate2", "level": "basic", "sessions": [{"session": "gakka", "urlSlug": "gakka", "expectedQuestions": 50, "label": "学科（A群 真偽法・B群 多肢択一法）", "categories": ["ろう付け", "ガス絶縁", "コンサベータ", "タップ切換器", "ブッシング", "乾燥", "保護継電器", "冷却方式", "切削加工", "品質管理", "図記号", "圧着", "圧着端子", "変圧器計算", "変流器", "安全衛生", "巻線", "巻線構造", "接地", "放圧装置", "曲げ加工", "材料力学", "歯車", "油処理", "油分析", "油面調整", "測定", "現地組立て", "真空計", "絶縁処理", "絶縁材料", "絶縁油", "絶縁油試験", "締付け", "製品安全", "輸送", "金属材料", "鉄心", "電動機", "電気回路", "電気計測"]}], "seasons": ["early"], "yearRange": { start: 2024, end: 2024 }},
  "henatsuki-kumitate1": {"code": "henatsuki-kumitate1", "nameFull": "技能検定 1級電気機器組立て（変圧器組立て作業）学科試験", "urlSlug": "henatsuki-kumitate1", "level": "advanced", "sessions": [{"session": "gakka", "urlSlug": "gakka", "expectedQuestions": 50, "label": "学科（A群 真偽法・B群 多肢択一法）", "categories": ["ろう付け", "ガスケット", "ガス絶縁", "タップ切換器", "ブッシング", "並列運転", "乾燥管理", "保全", "保護継電器", "冷却方式", "切削加工", "品質管理", "図記号", "圧着", "変圧器構造", "変圧器試験", "安全衛生", "工具", "巻線", "据付", "接地", "材料力学", "油処理", "温度測定", "測定", "漏れ磁束", "環境管理", "窒素封入", "絶縁処理", "絶縁材料", "絶縁油試験", "軸受", "金属材料", "鉄心", "鉄心組立て", "鉄損", "銘板", "電気回路", "電気計測", "電磁気", "騒音"]}], "seasons": ["early"], "yearRange": { start: 2024, end: 2024 }},
  "haidenban-kumitate3": {"code":"haidenban-kumitate3","nameFull":"技能検定 3級電気機器組立て（配電盤・制御盤組立て作業）学科試験","urlSlug":"haidenban-kumitate3","level":"basic","sessions":[{"session":"gakka","urlSlug":"gakka","expectedQuestions":30,"label":"学科（真偽法）","categories":["機器・電気基礎","製図・加工・材料","法規・安全","盤構造・規格","配線・施工・試験","保護機器","切削加工","制御図面","制御電源","図記号","図面記号","圧着","変圧器","安全衛生","工具","測定","環境管理","発電","盤塗装","盤寸法","盤構造","絶縁材料","締付け","製図","配線","金属材料","電動機","電気抵抗","電磁接触器","電磁気","電磁開閉器","電線"]}],"seasons":["late"],"yearRange":{ start: 2023, end: 2025 }},
  "kikai-seizu-cad1": {"code": "kikai-seizu-cad1", "nameFull": "技能検定 1級機械・プラント製図（機械製図CAD作業）学科試験", "urlSlug": "kikai-seizu-cad1", "level": "advanced", "sessions": [{"session": "gakka", "urlSlug": "gakka", "expectedQuestions": 50, "label": "学科（A群 真偽法・B群 多肢択一法）", "categories": ["CAD", "CAD・CAM", "はめあい", "力学", "加工", "原動機", "安全衛生", "寸法公差", "寸法記入", "工具", "幾何公差", "投影図", "材料", "材料力学", "材料試験", "機器図記号", "機械要素", "流体", "溶接", "潤滑", "熱", "熱処理", "表面処理", "表面性状", "製図", "製図用具", "電気"]}], "seasons": ["late"], "yearRange": { start: 2023, end: 2023 }},
  "plant-haikan-seizu2": {"code": "plant-haikan-seizu2", "nameFull": "技能検定 2級機械・プラント製図（プラント配管製図作業）学科試験", "urlSlug": "plant-haikan-seizu2", "level": "basic", "sessions": [{"session": "gakka", "urlSlug": "gakka", "expectedQuestions": 50, "label": "学科（A群 真偽法・B群 多肢択一法）", "categories": ["ポンプ", "保温", "力学", "安全衛生", "投影図", "材料", "材料力学", "材料試験", "検査", "流体", "溶接", "熱", "熱交換器", "熱処理", "熱膨張", "表面処理", "製図", "製図用具", "計測", "設備", "配管支持", "配管施工", "配管機器", "配管製図", "配管部品", "配管配置", "関係法令", "電気"]}], "seasons": ["late"], "yearRange": { start: 2024, end: 2024 }},
  "reito-seko3": {"code": "reito-seko3", "nameFull": "技能検定 3級冷凍空気調和機器施工（冷凍空気調和機器施工作業）学科試験", "urlSlug": "reito-seko3", "level": "basic", "sessions": [{"session": "gakka", "urlSlug": "gakka", "expectedQuestions": 30, "label": "学科（真偽法）", "categories": ["ろう付け", "ダクト", "ポンプ", "保護装置", "冷凍機油", "冷媒", "冷媒回収", "凝縮器", "器工具", "図記号", "圧力", "圧縮機", "基礎理論", "安全衛生", "弁類", "据付け", "施工順序", "材料", "気密試験", "測定", "膨張装置", "電気", "電気制御", "電気計算", "冷凍理論", "送風機", "冷凍装置", "冷媒配管", "水配管", "断熱", "排水", "防振", "漏れ検査", "真空乾燥", "電気測定", "配管計算", "空気線図", "熱交換", "整備"]}], "seasons": ["late"], "yearRange": { start: 2023, end: 2025 }},
  "netsuzetsuen2": {"code": "netsuzetsuen2", "nameFull": "技能検定 2級熱絶縁施工（保温保冷工事作業）学科試験", "urlSlug": "netsuzetsuen2", "level": "basic", "sessions": [{"session": "gakka", "urlSlug": "gakka", "expectedQuestions": 50, "label": "学科（A群 真偽法・B群 多肢択一法）", "categories": ["シーリング", "ダクト保温", "伝熱", "保温保冷", "保温施工", "保温材料", "冷凍設備", "図面・記号", "外装施工", "安全衛生", "工具", "工程管理", "建築法規", "接着剤", "施工手順", "施工検査", "材料規格", "板金加工", "熱・湿り空気", "相変化", "空調設備", "給湯設備", "足場", "配管材料"]}], "seasons": ["early"], "yearRange": { start: 2025, end: 2025 }},
  "hiseshoku-jokyo1": {"code": "hiseshoku-jokyo1", "nameFull": "技能検定 1級非接触除去加工（数値制御形彫り放電加工作業）学科試験", "urlSlug": "hiseshoku-jokyo1", "level": "advanced", "sessions": [{"session": "gakka", "urlSlug": "gakka", "expectedQuestions": 50, "label": "学科（A群 真偽法・B群 多肢択一法）", "categories": ["NCプログラム", "位置決め", "切削加工", "切削油剤", "加工条件", "加工液", "加工特性", "加工面粗さ", "危険物", "取付け・位置決め", "品質管理", "図面・製図", "塑性加工", "安全率", "工作機械", "手仕上げ", "揺動加工", "放電加工原理", "放電回路", "材料試験", "機械要素", "油圧", "測定", "溶接", "潤滑", "熱処理", "精度検査", "金属材料", "電動機", "電極材料", "電極消耗", "電極製作", "電気", "電気回路", "電気測定", "電気絶縁", "非破壊検査"]}], "seasons": ["early"], "yearRange": { start: 2025, end: 2025 }},
  "tategu1": {"code": "tategu1", "nameFull": "技能検定 1級建具製作（木製建具手加工作業）学科試験", "urlSlug": "tategu1", "level": "advanced", "sessions": [{"session": "gakka", "urlSlug": "gakka", "expectedQuestions": 50, "label": "学科（A群 真偽法・B群 多肢択一法）", "categories": ["仕口加工", "化粧単板", "図面・製図", "塗装", "墨付け", "安全衛生", "寸法取り", "工具", "建具の種類", "建具金物", "建築下地", "建築様式", "建築法規", "接合", "接着剤", "木取り", "木工機械", "木材", "木材乾燥", "木構造", "板はぎ", "空気圧", "組立て", "造作材", "障子", "電動機", "電気", "電気回路", "電線"]}], "seasons": ["early"], "yearRange": { start: 2025, end: 2025 }},
  "shohin-soshoku1": {"code": "shohin-soshoku1", "nameFull": "技能検定 1級商品装飾展示（商品装飾展示作業）学科試験", "urlSlug": "shohin-soshoku1", "level": "advanced", "sessions": [{"session": "gakka", "urlSlug": "gakka", "expectedQuestions": 50, "label": "学科（A群 真偽法・B群 多肢択一法）", "categories": ["VMD", "ショーウインドウ", "ディスプレイ", "デザイン原理", "パディング", "ピンワーク", "ファッション", "マーケティング", "什器", "動線計画", "包装", "図面・製図", "売場計画", "季節行事", "安全衛生", "布素材", "広告", "店舗業態", "店舗設備", "建築法規", "服飾品", "流通", "消防法規", "照明", "知的財産", "空間表現", "紙", "色彩", "著作権", "衣料品陳列", "衣服", "製造物責任", "観葉植物", "販売促進", "陳列用具", "陳列計画", "食器"]}], "seasons": ["early"], "yearRange": { start: 2025, end: 2025 }},
  "kogaku-glass1": {"code": "kogaku-glass1", "nameFull": "技能検定 1級光学機器製造（光学ガラス研磨作業）学科試験", "urlSlug": "kogaku-glass1", "level": "advanced", "sessions": [{"session": "gakka", "urlSlug": "gakka", "expectedQuestions": 50, "label": "学科（A群 真偽法・B群 多肢択一法）", "categories": ["保全", "光学", "光学ガラス", "光学材料", "品質管理", "安全衛生", "心取り", "接着", "機械加工", "機械要素", "測定", "潤滑", "環境", "研削", "研磨", "薄膜", "製図", "電気"]}], "seasons": ["early"], "yearRange": { start: 2025, end: 2025 }},
  "sangyo-sharyo1": {"code": "sangyo-sharyo1", "nameFull": "技能検定 1級産業車両整備（産業車両整備作業）学科試験", "urlSlug": "sangyo-sharyo1", "level": "advanced", "sessions": [{"session": "gakka", "urlSlug": "gakka", "expectedQuestions": 50, "label": "学科（A群 真偽法・B群 多肢択一法）", "categories": ["エンジン", "充電装置", "制動装置", "力学", "動力伝達", "安全法規", "安全装置", "接合", "材料", "材料力学", "機械要素", "油圧", "測定", "潤滑", "点検整備", "熱処理", "環境法規", "蓄電池", "製図", "車両構造", "電動機", "電気"]}], "seasons": ["early"], "yearRange": { start: 2025, end: 2025 }},
  "yogashi1": {"code": "yogashi1", "nameFull": "技能検定 1級菓子製造（洋菓子製造作業）学科試験", "urlSlug": "yogashi1", "level": "advanced", "sessions": [{"session": "gakka", "urlSlug": "gakka", "expectedQuestions": 50, "label": "学科（A群 真偽法・B群 多肢択一法）", "categories": ["クリーム", "シュー生地", "チョコレート", "デザイン", "パイ生地", "仕上げ", "包装", "品質管理", "安全衛生", "成形", "栄養", "焼成", "生地", "発酵", "糖類", "膨張剤", "色彩", "製菓材料", "製菓機械", "製菓知識", "食品保存", "食品添加物", "食品衛生", "食品衛生法規", "食品表示", "飴細工", "鶏卵"]}], "seasons": ["late"], "yearRange": { start: 2025, end: 2025 }},
  "block-kenchiku3": {"code": "block-kenchiku3", "nameFull": "技能検定 3級ブロック建築（コンクリートブロック工事作業）学科試験", "urlSlug": "block-kenchiku3", "level": "basic", "sessions": [{"session": "gakka", "urlSlug": "gakka", "expectedQuestions": 30, "label": "学科（真偽法）", "categories": ["コンクリート", "タイル", "ブロック材料", "仮設", "安全衛生", "工具", "施工", "施工計画", "材料保管", "構造", "法規", "測量", "環境", "製図", "鉄筋", "養生"]}], "seasons": ["early"], "yearRange": { start: 2025, end: 2025 }},
  "block-kenchiku1": {"code": "block-kenchiku1", "nameFull": "技能検定 1級ブロック建築（コンクリートブロック工事作業）学科試験", "urlSlug": "block-kenchiku1", "level": "advanced", "sessions": [{"session": "gakka", "urlSlug": "gakka", "expectedQuestions": 50, "label": "学科（A群 真偽法・B群 多肢択一法）", "categories": ["かぶり厚さ", "れんが", "コンクリート", "コンクリート施工", "セメント", "タイル", "ブロック材料", "型枠", "基礎", "塀", "墨出し", "安全衛生", "屋根", "工程管理", "帳壁", "施工", "施工図", "木造", "構造", "法規", "測量", "目地", "石工事", "製図", "設計図書", "調合", "配筋", "鉄筋", "鉄筋加工", "電気"]}], "seasons": ["early"], "yearRange": { start: 2025, end: 2025 }},
  "shuzo1": {"code": "shuzo1", "nameFull": "技能検定 1級酒造（清酒製造作業）学科試験", "urlSlug": "shuzo1", "level": "advanced", "sessions": [{"session": "gakka", "urlSlug": "gakka", "expectedQuestions": 50, "label": "学科（A群 真偽法・B群 多肢択一法）", "categories": ["もろみ管理", "ろ過", "仕込み", "仕込配合", "分析", "原料", "原料処理", "原料米", "品質管理", "安全衛生", "排水処理", "火落菌", "熟成", "特定名称酒", "用水", "精米", "表示", "製成", "製麹", "製麹設備", "設備", "設備計算", "調合", "調合計算", "貯蔵成分", "貯蔵管理", "酒母", "酒税法", "酒造年度", "酵母", "酵母分析", "酵素", "酵素四段", "電気", "電気計算", "麹"]}], "seasons": ["early"], "yearRange": { start: 2025, end: 2025 }},
  "fraise1": {"code":"fraise1","nameFull":"技能検定 1級機械加工（フライス盤作業）学科試験","urlSlug":"fraise1","level":"advanced","sessions":[{"session":"gakka","urlSlug":"gakka","expectedQuestions":50,"label":"学科（A群 真偽法・B群 多肢択一法）","categories":["けがき","ねじ加工","保持具","切りくず処理","切削工具","切削油剤","切削理論","切削計算","制御","割出し","加工精度","品質管理","安全衛生","工作機械","工具保持","工具寿命","工具損傷","工具規格","材料","材料試験","機械要素","油空圧","測定","溶接","潤滑","熱処理","研削","精度検査","製図","軸受","電動機","電気","非破壊検査","切削条件","切削油・潤滑","切削現象","取付け・ジグ","工具・機械","手仕上げ","数値制御","材料・熱処理","材料力学","油圧"]}],"seasons":["early"],"yearRange":{ start: 2023, end: 2024 }},
  "fraise2": {"code":"fraise2","nameFull":"技能検定 2級機械加工（フライス盤作業）学科試験","urlSlug":"fraise2","level":"basic","sessions":[{"session":"gakka","urlSlug":"gakka","expectedQuestions":50,"label":"学科（A群 真偽法・B群 多肢択一法）","categories":["きさげ","けがき","ねじ","ねじ加工","リーマ","保持具","切りくず処理","切削工具","切削油剤","切削理論","切削計算","割出し","加工精度","品質管理","安全衛生","工作機械","工具保持","工具摩耗","工具材料","工具角度","数値制御","材料","材料試験","機械要素","油空圧","測定","潤滑","熱処理","精度検査","荷重","製図","鋳造","電動機","電気","電気計算","切削条件","切削油・潤滑","切削現象","取付け・ジグ","工具・機械","手仕上げ","材料・熱処理","材料力学","油圧","溶接","研削"]}],"seasons":["early"],"yearRange":{ start: 2023, end: 2024 }},
  "fraise3": {"code":"fraise3","nameFull":"技能検定 3級機械加工（フライス盤作業）学科試験","urlSlug":"fraise3","level":"basic","sessions":[{"session":"gakka","urlSlug":"gakka","expectedQuestions":30,"label":"学科（真偽法）","categories":["けがき","やすり","切削工具","切削油剤","切削計算","品質管理","安全衛生","工作機械","工具","工具損傷","工具材料","材料","材料強度","材料試験","歯車","油空圧","治具","測定","潤滑","熱処理","穴加工","鋳造","電動機","電気図記号","切削条件","切削油・潤滑","切削現象","取付け・ジグ","工具・機械","手仕上げ","材料・熱処理","材料力学","機械要素","油圧","製図","電気"]}],"seasons":["early"],"yearRange":{ start: 2023, end: 2024 }},
  "haikan-plant2": {"code":"haikan-plant2","nameFull":"技能検定 2級配管（プラント配管作業）学科試験","urlSlug":"haikan-plant2","level":"advanced","sessions":[{"session":"gakka","urlSlug":"gakka","expectedQuestions":50,"label":"学科（A群 真偽法・B群 多肢択一法）","categories":["保温・保冷","図面・製図","安全衛生","工具・機械","施工管理","材料","流体・熱","溶接","管・継手・弁","試験・検査","基礎理論","工具・加工","施工","検査","法令・安全","流体・機器","熱処理","製図","計測","設備","配管支持","配管施工","配管機器","配管部品","関係法令","防食・保温"]}],"seasons":["late"],"yearRange":{ start: 2023, end: 2025 }},
  "bousui-frp1": {"code": "bousui-frp1", "nameFull": "技能検定 1級防水施工（FRP防水工事作業）学科試験", "urlSlug": "bousui-frp1", "level": "advanced", "sessions": [{"session": "gakka", "urlSlug": "gakka", "expectedQuestions": 50, "label": "学科（A群 真偽法・B群 多肢択一法）", "categories": ["FRP施工", "下地", "他工法", "工具", "建築構造", "施工不良", "施工管理", "材料", "法令・安全", "製図"]}], "seasons": ["early"], "yearRange": { start: 2023, end: 2024 }},
  "naiso-carpet1": {"code": "naiso-carpet1", "nameFull": "技能検定 1級内装仕上げ施工（カーペット系床仕上げ工事作業）学科試験", "urlSlug": "naiso-carpet1", "level": "advanced", "sessions": [{"session": "gakka", "urlSlug": "gakka", "expectedQuestions": 50, "label": "学科（A群 真偽法・B群 多肢択一法）", "categories": ["カーペット施工", "カーペット材料", "下地", "工具", "建築構造", "材料", "法令・安全", "維持管理", "色彩", "製図"]}], "seasons": ["early"], "yearRange": { start: 2024, end: 2024 }},
  "haikan-plant1": {"code":"haikan-plant1","nameFull":"技能検定 1級配管（プラント配管作業）学科試験","urlSlug":"haikan-plant1","level":"specialist","sessions":[{"session":"gakka","urlSlug":"gakka","expectedQuestions":50,"label":"学科（A群 真偽法・B群 多肢択一法）","categories":["工具・機械","管・継手・弁","試験・検査","保温・保冷","溶接","流体・熱","材料","図面・製図","安全衛生","施工管理","ポンプ","基礎理論","工具・加工","検査","熱処理","表面処理","計測","設備","配管支持","配管施工","配管部品","関係法令","防食・保温"]}],"seasons":["late"],"yearRange":{ start: 2023, end: 2025 }},
  "shashutsu2": {"code": "shashutsu2", "nameFull": "技能検定 2級プラスチック成形（射出成形作業）学科試験", "urlSlug": "shashutsu2", "level": "basic", "sessions": [{"session": "gakka", "urlSlug": "gakka", "expectedQuestions": 50, "label": "学科（A群 真偽法・B群 多肢択一法）", "categories": ["二次加工", "品質管理", "図面・製図", "安全衛生・環境", "成形・不良", "成形・基礎", "成形・条件", "成形機・金型", "材料・乾燥", "材料・性質", "材料・着色", "測定・検査", "測定・計算", "電気・設備"]}], "seasons": ["early"], "yearRange": { start: 2025, end: 2025 }},
  "kagaku-bunseki2": {"code":"kagaku-bunseki2","nameFull":"技能検定 2級化学分析（化学分析作業）学科試験","urlSlug":"kagaku-bunseki2","level":"basic","sessions":[{"session":"gakka","urlSlug":"gakka","expectedQuestions":50,"label":"学科（A群 真偽法・B群 多肢択一法）","categories":["前処理・試料採取","品質管理・統計","器具・基本操作","基礎化学","安全衛生・法令","容量分析","機器分析","重量分析・定性分析"]}],"seasons":["early"],"yearRange":{ start: 2023, end: 2025 }},
  "tetsudo-sharyo1": {"code": "tetsudo-sharyo1", "nameFull": "技能検定 1級鉄道車両製造・整備（機器ぎ装作業）学科試験", "urlSlug": "tetsudo-sharyo1", "level": "advanced", "sessions": [{"session": "gakka", "urlSlug": "gakka", "expectedQuestions": 50, "label": "学科（A群 真偽法・B群 多肢択一法）", "categories": ["車両装置・ブレーキ", "材料・熱処理", "機械要素・力学", "電気・制御", "測定・製図", "品質管理", "安全衛生", "台車・走行装置", "潤滑・保全"]}], "seasons": ["early"], "yearRange": { start: 2025, end: 2025 }},
  "diecast1": {"code": "diecast1", "nameFull": "技能検定 1級ダイカスト（ホットチャンバダイカスト作業）学科試験", "urlSlug": "diecast1", "level": "advanced", "sessions": [{"session": "gakka", "urlSlug": "gakka", "expectedQuestions": 50, "label": "学科（A群 真偽法・B群 多肢択一法）", "categories": ["鋳造機・油圧", "材料・熱処理", "溶解・溶湯管理", "鋳造条件・方案", "金型・保全", "生産管理", "鋳造欠陥・検査", "鋳造法", "電気・安全衛生", "仕上げ加工", "製図"]}], "seasons": ["early"], "yearRange": { start: 2025, end: 2025 }},
  "flower3": {"code":"flower3","nameFull":"技能検定 3級フラワー装飾（フラワー装飾作業）学科試験","urlSlug":"flower3","level":"basic","sessions":[{"session":"gakka","urlSlug":"gakka","expectedQuestions":30,"label":"学科（真偽法）","categories":["意匠・色彩","装飾・デザイン","製作技法","花材管理","資材・工具","花材・形態","植物・生理","植物・分類","安全衛生","装飾の歴史・行事","デザイン・色彩","水揚げ・品質管理","植物の分類・性質","安全・法規"]}],"seasons":["early"],"yearRange":{ start: 2023, end: 2025 }},
  "flower1": {"code":"flower1","nameFull":"技能検定 1級フラワー装飾（フラワー装飾作業）学科試験","urlSlug":"flower1","level":"advanced","sessions":[{"session":"gakka","urlSlug":"gakka","expectedQuestions":50,"label":"学科（A群 真偽法・B群 多肢択一法）","categories":["意匠・色彩","装飾・デザイン","製作技法","資材・工具","花材管理","植物・分類","植物・生理","安全衛生","花材・形態","植物・形態","装飾の歴史・行事","デザイン・色彩","植物の分類・性質","水揚げ・品質管理"]}],"seasons":["early"],"yearRange":{ start: 2023, end: 2025 }},
  "unko-kanrisha-ryokaku": {"code": "unko-kanrisha-ryokaku", "nameFull": "運行管理者（旅客）", "urlSlug": "unko-kanrisha-ryokaku", "level": "basic", "sessions": [{"session": "gakka", "urlSlug": "gakka", "expectedQuestions": 30, "label": "CBT出題例", "categories": ["道路運送法", "道路運送車両法", "道路交通法", "労働基準法", "実務上の知識・能力"]}], "seasons": ["cbt"], "yearRange": { start: 2022, end: 2024 }},
  "shobo-setsubishi-kou1": {"code": "shobo-setsubishi-kou1", "nameFull": "消防設備士 甲種第1類", "urlSlug": "shobo-setsubishi-kou1", "level": "basic", "sessions": [{"session": "gakka", "urlSlug": "gakka", "expectedQuestions": 19, "label": "筆記公表問題", "categories": ["消防関係法令", "機械の基礎知識", "電気の基礎知識", "構造・機能・工事・整備"]}, {"session": "practical", "urlSlug": "practical", "expectedQuestions": 7, "label": "実技公表問題", "categories": ["実技・鑑別", "実技・製図"]}], "seasons": ["published"], "yearRange": { start: 2026, end: 2026 }},
  "kikenbutsu-kou": {"code": "kikenbutsu-kou", "nameFull": "危険物取扱者 甲種", "urlSlug": "kikenbutsu-kou", "level": "basic", "sessions": [{"session": "gakka", "urlSlug": "gakka", "expectedQuestions": 45, "label": "筆記公表問題", "categories": ["危険物に関する法令", "物理学及び化学", "危険物の性質・火災予防・消火"]}], "seasons": ["published"], "yearRange": { start: 2026, end: 2026 }},
  "kikenbutsu-hei": {"code": "kikenbutsu-hei", "nameFull": "危険物取扱者 丙種", "urlSlug": "kikenbutsu-hei", "level": "basic", "sessions": [{"session": "gakka", "urlSlug": "gakka", "expectedQuestions": 25, "label": "公表問題", "categories": ["危険物に関する法令", "燃焼及び消火に関する基礎知識", "危険物の性質・火災予防・消火"]}], "seasons": ["published"], "yearRange": { start: 2026, end: 2026 }},
  "shobo-setsubishi-kou4": {"code": "shobo-setsubishi-kou4", "nameFull": "消防設備士 甲種第4類", "urlSlug": "shobo-setsubishi-kou4", "level": "basic", "sessions": [{"session": "gakka", "urlSlug": "gakka", "expectedQuestions": 13, "label": "筆記公表問題", "categories": ["構造・機能・整備", "消防関係法令", "電気の基礎知識"]}, {"session": "practical", "urlSlug": "practical", "expectedQuestions": 2, "label": "実技公表問題", "categories": ["実技"]}], "seasons": ["published"], "yearRange": { start: 2026, end: 2026 }},
  "shobo-setsubishi-otsu6": {"code": "shobo-setsubishi-otsu6", "nameFull": "消防設備士 乙種第6類", "urlSlug": "shobo-setsubishi-otsu6", "level": "basic", "sessions": [{"session": "gakka", "urlSlug": "gakka", "expectedQuestions": 14, "label": "筆記公表問題", "categories": ["構造・機能・整備", "機械の基礎知識", "消防関係法令"]}, {"session": "practical", "urlSlug": "practical", "expectedQuestions": 2, "label": "実技公表問題", "categories": ["実技"]}], "seasons": ["published"], "yearRange": { start: 2026, end: 2026 }},
  "unko-kanrisha-kamotsu": {"code": "unko-kanrisha-kamotsu", "nameFull": "運行管理者（貨物）", "urlSlug": "unko-kanrisha-kamotsu", "level": "basic", "sessions": [{"session": "gakka", "urlSlug": "gakka", "expectedQuestions": 30, "label": "CBT出題例", "categories": ["労働基準法", "実務上の知識・能力", "貨物自動車運送事業法", "道路交通法", "道路運送車両法"]}], "seasons": ["cbt"], "yearRange": { start: 2022, end: 2024 }},
  "kikenbutsu-otsu4": {"code": "kikenbutsu-otsu4", "nameFull": "危険物取扱者 乙種第4類", "urlSlug": "kikenbutsu-otsu4", "level": "basic", "sessions": [{"session": "gakka", "urlSlug": "gakka", "expectedQuestions": 35, "label": "筆記公表問題", "categories": ["危険物に関する法令", "危険物の性質・火災予防・消火", "基礎的な物理学・化学"]}], "seasons": ["published"], "yearRange": { start: 2025, end: 2026 }},
  "benrishi": {"code": "benrishi", "nameFull": "弁理士（短答式）", "urlSlug": "benrishi", "level": "specialist", "sessions": [{"session": "patent", "urlSlug": "patent", "expectedQuestions": 20, "label": "特許・実用新案", "categories": ["特許・実用新案"]}, {"session": "design", "urlSlug": "design", "expectedQuestions": 10, "label": "意匠", "categories": ["意匠"]}, {"session": "trademark", "urlSlug": "trademark", "expectedQuestions": 10, "label": "商標", "categories": ["商標"]}, {"session": "treaty", "urlSlug": "treaty", "expectedQuestions": 10, "label": "条約", "categories": ["条約"]}, {"session": "copyright", "urlSlug": "copyright", "expectedQuestions": 10, "label": "著作権法・不正競争防止法", "categories": ["著作権法・不正競争防止法"]}], "seasons": ["annual"], "yearRange": { start: 2025, end: 2026 }},
  "sokuryoshi": {"code": "sokuryoshi", "nameFull": "測量士", "urlSlug": "sokuryoshi", "level": "specialist", "sessions": [{"session": "am", "urlSlug": "am", "expectedQuestions": 28, "label": "午前", "categories": ["測量法の定義", "ITRFの座標軸", "公共測量の計画と製品仕様", "事故対応と作業安全", "正規分布", "測量の基準", "TSの気象補正と観測点検", "Y座標の誤差伝播", "準天頂衛星と観測衛星数", "GNSS基線解析", "ジオイド傾斜と標高比較", "水準観測と器械誤差", "水準環の閉合差", "現地測量と地形描画", "GNSSによる現地測量", "地上レーザ測量", "UAV写真の重複度", "衛星リモートセンシング", "UAV写真・レーザ測量", "三次元点群の作成", "地形図判読", "地図投影のひずみ", "防災GIS", "基盤地図情報", "クロソイドの交角", "用地測量と仮杭", "境界点の座標と面積", "河川・海浜測量の用語", "ITRFと測地系", "精度管理と成果検定", "現場安全と法令遵守", "二次元回転", "斜距離の基準面への補正", "TS基準点測量の規定", "GNSS観測と誤差", "楕円体高と標高", "水準測量", "GNSS標高測量", "標尺補正と重量平均", "現地測量のGNSS・TS", "高低差の誤差伝播", "地上レーザ計測", "航空写真のコース重複度", "写真地図とDTM", "航空レーザの走査間隔", "UAVレーザ測量", "地図投影法", "DTMの利用", "地図編集の作業工程", "基本型クロソイドの路線長", "用地測量", "等積による境界整正", "河川測量"]}, {"session": "pm", "urlSlug": "pm", "expectedQuestions": 5, "label": "午後（記述・作図の自己確認）", "categories": ["測量法と技術者の責務", "TS・電子基準点・水準点管理", "航空写真・UAV・車載レーザ", "地図編集・図郭・GIS機能", "路線設計と用地測量", "測量法・公共測量の制度と管理", "基準点・GNSS・水準測量", "現地・写真・点群測量", "地図編集・投影・GIS", "路線・用地・河川測量"]}], "seasons": ["annual"], "yearRange": { start: 2022, end: 2026 }},
  "dokugeki-chiba": {"code": "dokugeki-chiba", "nameFull": "毒物劇物取扱者", "urlSlug": "dokugeki-chiba", "level": "specialist", "sessions": [{"session": "dokugeki-ippan", "urlSlug": "dokugeki-ippan", "expectedQuestions": 80, "label": "一般", "categories": ["毒物及び劇物に関する法規", "基礎化学", "毒物及び劇物の性質及び貯蔵その他取扱方法", "毒物及び劇物の識別及び取扱方法"]}, {"session": "dokugeki-nougyou", "urlSlug": "dokugeki-nougyou", "expectedQuestions": 80, "label": "農業用品目", "categories": ["毒物及び劇物に関する法規", "基礎化学", "毒物及び劇物の性質及び貯蔵その他取扱方法", "毒物及び劇物の識別及び取扱方法"]}, {"session": "dokugeki-tokutei", "urlSlug": "dokugeki-tokutei", "expectedQuestions": 80, "label": "特定品目", "categories": ["毒物及び劇物に関する法規", "基礎化学", "毒物及び劇物の性質及び貯蔵その他取扱方法", "毒物及び劇物の識別及び取扱方法"]}], "seasons": ["annual"], "yearRange": { start: 2022, end: 2026 }},
  "jokaso-setsubishi": {"code": "jokaso-setsubishi", "nameFull": "浄化槽設備士（学科）", "urlSlug": "jokaso-setsubishi", "level": "specialist", "sessions": [{"session": "gakka", "urlSlug": "gakka", "expectedQuestions": 50, "label": "学科", "categories": ["浄化槽設備士学科"]}], "seasons": ["annual"], "yearRange": { start: 2025, end: 2026 }},
  "chiiki-ryoko": {"code": "chiiki-ryoko", "nameFull": "地域限定旅行業務取扱管理者", "urlSlug": "chiiki-ryoko", "level": "specialist", "sessions": [{"session": "hoki", "urlSlug": "hoki", "expectedQuestions": 25, "label": "旅行業法令", "categories": ["旅行業法令"]}, {"session": "yakkan", "urlSlug": "yakkan", "expectedQuestions": 24, "label": "旅行業約款", "categories": ["旅行業約款"]}, {"session": "jitsumu", "urlSlug": "jitsumu", "expectedQuestions": 10, "label": "国内旅行実務", "categories": ["国内旅行実務"]}], "seasons": ["annual"], "yearRange": { start: 2022, end: 2026 }},
  "junkango-kansai": {"code": "junkango-kansai", "nameFull": "准看護師", "urlSlug": "junkango-kansai", "level": "specialist", "sessions": [{"session": "gakka", "urlSlug": "gakka", "expectedQuestions": 150, "label": "学科", "categories": ["人体の構造と機能", "栄養", "薬理", "疾病と感染", "保健医療と法規", "看護概論と心理", "基礎看護技術", "成人看護総論", "成人看護", "老年看護", "母子看護", "精神看護"]}], "seasons": ["annual"], "yearRange": { start: 2022, end: 2026 }},
  "kukaku-seiri": {"code": "kukaku-seiri", "nameFull": "土地区画整理士（学科）", "urlSlug": "kukaku-seiri", "level": "specialist", "sessions": [{"session": "gakka", "urlSlug": "gakka", "expectedQuestions": 40, "label": "学科", "categories": ["土地区画整理事業総論", "換地計画", "土地評価", "法規"]}], "seasons": ["annual"], "yearRange": { start: 2026, end: 2026 }},
  "dojo-osen": {"code": "dojo-osen", "nameFull": "土壌汚染調査技術管理者", "urlSlug": "dojo-osen", "level": "specialist", "sessions": [{"session": "am", "urlSlug": "am", "expectedQuestions": 35, "label": "午前", "categories": ["調査"]}, {"session": "pm", "urlSlug": "pm", "expectedQuestions": 45, "label": "午後（選択式）", "categories": ["対策", "法令等"]}], "seasons": ["annual"], "yearRange": { start: 2022, end: 2026 }},
  "kenchikushi2": {"code": "kenchikushi2", "nameFull": "二級建築士", "urlSlug": "kenchikushi2", "level": "specialist", "sessions": [{"session": "gakka-I", "urlSlug": "gakka-I", "expectedQuestions": 25, "label": "学科I（計画）", "categories": ["建築計画", "日本建築史", "西洋建築史", "環境工学の単位", "換気", "伝熱・断熱", "湿り空気", "日照・日射", "色彩", "吸音・遮音", "屋外気候", "住宅計画", "集合住宅", "事務所・商業計画", "教育・図書館", "美術館", "各部寸法・面積", "バリアフリー", "建築生産", "設備の用語", "空気調和", "給排水衛生", "雨水利用・排水", "電気設備", "防災・消防設備", "環境・省エネルギー", "建築史", "建築作品", "環境工学の基礎", "伝熱", "日照・照明", "音環境", "環境評価", "集合住宅計画", "オフィス計画", "教育・図書館計画", "公共建築計画", "建築寸法", "住宅のバリアフリー", "防犯計画", "建築設備の基礎", "空気調和設備", "給排水衛生設備", "消防設備", "省エネルギー", "まちづくり", "住宅作品", "文化施設", "日照・日射・採光", "熱伝導率", "環境工学の用語", "結露", "給湯設備"]}, {"session": "gakka-II", "urlSlug": "gakka-II", "expectedQuestions": 25, "label": "学科II（法規）", "categories": ["建築法規", "法令用語", "確認・維持保全", "確認対象", "住宅の一般構造", "平均天井高さ", "構造計算対象", "構造荷重・地盤", "構造の仕様規定", "防火区画・外壁", "避難施設", "内装制限", "道路・接道", "用途制限", "用途地域をまたぐ敷地", "建蔽率の緩和", "容積率の計算", "高さ制限・日影", "高さ制限の計算", "防火地域", "用途変更", "二級建築士の業務範囲", "建築士事務所", "建設関連法令", "バリアフリー法", "建築物省エネ法", "用語の定義", "確認・検査", "確認が必要な行為", "採光面積", "構造計算の対象", "構造強度・荷重", "防火区画・界壁", "用途地域の制限", "建蔽率", "容積率の不算入", "維持保全・既存不適格・罰則", "建築士の業務範囲", "建築士の義務", "消防法", "耐震改修促進法"]}, {"session": "gakka-III", "urlSlug": "gakka-III", "expectedQuestions": 25, "label": "学科III（構造）", "categories": ["断面一次モーメント", "断面二次モーメント", "梁の曲げ応力度", "単純梁の応力", "静定ラーメン", "静定トラス", "弾性座屈", "荷重・地震力", "風圧力", "地盤・基礎", "木造用語", "木質構造設計", "木質接合", "壁式RC造", "RC構造", "RC配筋", "鉄骨構造", "鉄骨接合", "構造計画", "耐震設計", "木材", "コンクリート", "セメント", "鋼材応力ひずみ", "建築材料", "仕上げ・断熱材料", "曲げ応力度", "張出し梁", "荷重・外力", "木造の部材", "木造軸組", "枠組壁工法", "RC造の構造特性", "RC造の配筋", "木材・木質材料", "コンクリート材料", "鋼材", "ガラス", "設計用地震力", "補強ブロック造", "柱のせん断補強", "耐震計画", "耐震診断・改修", "コンクリートの性質", "石材・左官材料"]}, {"session": "gakka-IV", "urlSlug": "gakka-IV", "expectedQuestions": 25, "label": "学科IV（施工）", "categories": ["工程表", "材料保管", "安全管理", "建設廃棄物", "仮設足場", "木造基礎", "土工・地業", "鉄筋加工・継手", "鉄筋施工・検査", "型枠工事", "コンクリート施工", "鉄骨建方", "鉄骨溶接", "押出成形セメント板", "木工事", "木造接合金物", "屋根防水", "左官・タイル・石", "塗装", "建具・ガラス・内装", "住宅設備", "改修", "施工機械・工法", "建築積算", "請負契約", "施工計画", "申請・届出", "作業主任者", "仮設工事", "木造住宅の基礎", "土工事", "鉄筋工事", "コンクリートの検査", "コンクリートの締固め", "高力ボルト工事", "鉄骨工事", "ALCパネル", "木工事の下地・精度", "木工事の接合", "防水工事", "塗装工事", "設備工事", "改修工事", "測量器具", "標準請負契約約款", "工事監理", "鉄筋加工・圧接", "高力ボルト・鉄骨建方", "スタッド・溶接", "補強ブロック造工事", "木工事・床組", "木工事・継手", "左官・タイル・石工事", "請負契約約款"]}, {"session": "practical", "urlSlug": "practical", "expectedQuestions": 1, "label": "設計製図", "categories": ["設計製図"]}], "seasons": ["annual"], "yearRange": {"start": 2017, end: 2026}, "legacySeasons": ["annual"], "legacyYearRange": {"start": 2020, "end": 2020}},
  "mokuzo-kenchikushi": {"code": "mokuzo-kenchikushi", "nameFull": "木造建築士（学科）", "urlSlug": "mokuzo-kenchikushi", "level": "specialist", "sessions": [{"session": "gakka-I", "urlSlug": "gakka-I", "expectedQuestions": 25, "label": "学科I（計画）", "categories": ["神社建築", "住宅史", "環境用語", "空気環境", "伝熱・結露", "光・色彩", "音環境", "気候・地球環境", "住宅外構", "集合住宅形式", "併用住宅", "木造用語", "事務所・商業施設", "住宅平面寸法", "住宅各部寸法", "住宅の窓", "屋根形式", "階段安全", "高齢者・車椅子", "住宅リフォーム", "設備用語", "空調・換気", "給排水・ガス", "排水設備", "電気設備", "配管", "設備省エネ", "建築作品", "環境工学単位", "気候・環境", "戸建住宅計画", "集合住宅", "敷地調査", "伝統建築", "建築用途と用語", "住宅寸法", "階段計画", "内部仕上げ", "車椅子住宅", "環境配慮手法", "空調設備", "換気設備", "給排水衛生", "電気・防災", "設備配管", "建具・内装"]}, {"session": "gakka-II", "urlSlug": "gakka-II", "expectedQuestions": 25, "label": "学科II（法規）", "categories": ["法令用語", "建築面積", "確認変更", "確認対象", "共同住宅一般構造", "住宅換気", "採光計算", "平均天井高さ", "木造仕様", "構造耐久・欠込み", "防火性能", "内装制限", "2項道路後退", "低層用途制限", "用途地域", "建蔽率", "容積率", "高さ制限", "防火地域", "建築基準法制度", "木造建築士業務", "建築士事務所", "都市計画施設", "法の目的", "関連法令", "面積・高さ・階数", "確認・検査", "全国の確認対象", "居室採光", "住宅階段", "木造構造仕様", "木造軸組・柱", "共同住宅避難施設", "道路・接道", "第一種中高層住居専用地域", "用途制限", "防火・準防火地域", "建築士の業務", "建築物省エネ法", "バリアフリー法"]}, {"session": "gakka-III", "urlSlug": "gakka-III", "expectedQuestions": 25, "label": "学科III（構造）", "categories": ["荷重・外力", "地震力と風荷重", "木造部材名称", "基礎・地盤", "アンカーボルト", "柱・横架材", "梁の曲げ強さ", "梁の孔・切欠き", "存在壁量", "耐力壁仕様", "軸組の軸力", "柱脚引抜き", "小屋組", "洋小屋トラス", "床組", "枠組壁工法", "構造計画", "耐震改修", "鉛直荷重の伝達", "木材の乾燥収縮", "木材の基準強度", "木材の防腐・防蟻", "木質材料", "鉄筋コンクリート材料", "建築材料", "地震・風", "地盤・基礎", "土台・アンカーボルト", "柱の座屈", "梁端の欠込み", "風圧用見付面積", "耐力壁", "洋小屋組", "2階床組", "鉛直荷重の流れ", "木材の性質", "木材強度", "防腐・防蟻", "鉄筋コンクリート", "木造建築物への荷重", "水平力の検討方向", "木造の部材名称", "布基礎と地盤", "土台へのめり込み", "床梁の振動と剛性", "長方形断面の断面係数", "梁の切欠きと角孔", "耐力壁配置の四分割法", "軸組の耐力壁の仕様", "耐力壁端部の引抜き", "節点法とゼロ部材", "束立て小屋組の力", "洋小屋組の軸力", "床組と根太のスパン", "枠組壁工法と丸太組構法", "地震力と風圧力の壁量", "耐震改修の効果", "木造建築物の荷重伝達", "含水率と木材強度", "木質材料の構成", "コンクリートの圧縮強度", "仕上げ材料の性質"]}, {"session": "gakka-IV", "urlSlug": "gakka-IV", "expectedQuestions": 25, "label": "学科IV（施工）", "categories": ["申請・届出", "仮設工事", "地盤調査・地業", "基礎施工", "木材の加工・使い方", "木取り・使用部位", "施工順序", "樹種と部位", "合板等の留付け", "継手", "仕口", "接合金物", "規矩術・さしがね", "小屋束の寸法", "床梁断面", "断面図の部材名称", "墨付けの合印", "屋根工事", "タイル・左官", "木部塗装", "内装・断熱施工", "設備施工", "木工具", "積算・工事費構成", "設計図書の優先順位", "安全管理", "土工・地業", "木材乾燥変形", "木材の使い方", "部材と樹種", "合板耐力壁施工", "仕口名称", "継手の図", "規矩術", "さしがね", "床伏図の断面", "床下部材", "墨付け合印", "屋根・防水", "左官・タイル", "塗装", "建具・内装", "設備配管", "機械・器具", "建築積算", "設計図書", "仕上げ材料の現場保管", "単管足場の建地間隔", "地盤調査・地業の用語", "土に接する布基礎のかぶり", "木取りと乾燥変形", "木表・木裏と部材の向き", "木造工事の施工順序", "木造の部材と樹種", "構造用合板の継目", "木材を長さ方向につなぐ継手", "交差する部材の仕口", "木造の接合金物", "垂木欠きの寸法", "規矩基準勾配図の名称", "床伏図の梁断面", "通気層をもつ外壁の断面", "木材加工の合印", "板金屋根の瓦棒と下葺", "壁タイルの接着と目地直し", "木部のクリヤラッカー仕上げ", "壁下地の合板の留付け", "給湯用銅管の曲げ加工", "墨出しと木工事の用語", "建築積算の数量と単位", "工事請負契約の記載事項"]},
      { session: "practical", urlSlug: "practical", expectedQuestions: 1, label: "設計製図", categories: ["設計製図"] },
    ], "seasons": ["annual"], "yearRange": {"start": 2021, end: 2026}},
  "sekou-1kenchiku": {
    code: "sekou-1kenchiku", nameFull: "1級建築施工管理技術検定（第一次検定）", urlSlug: "sekou-1kenchiku", level: "advanced",
    sessions: [

      { session: "am", urlSlug: "am", expectedQuestions: 44, label: "第一次検定 午前の部", categories: ["建築学", "共通", "建築施工", "施工管理法"] },

      { session: "pm", urlSlug: "pm", expectedQuestions: 28, label: "第一次検定 午後の部", categories: ["施工管理法", "法規"] },

    ],
    seasons: ["june", "july"], yearRange: { start: 2021, end: 2026 },
  },
  "khk-kagaku": {

    code: "khk-kagaku", nameFull: "高圧ガス製造保安責任者（化学）", urlSlug: "khk-kagaku", level: "advanced",

    sessions: [

      { session: "khk-ax", urlSlug: "khk-ax", expectedQuestions: 20, label: "甲種化学 法令", categories: ["甲種化学 法令"] },

      { session: "khk-ay", urlSlug: "khk-ay", expectedQuestions: 15, label: "甲種化学 保安管理技術", categories: ["甲種化学 保安管理技術"] },

      { session: "khk-az", urlSlug: "khk-az", expectedQuestions: 6, label: "甲種化学 学識", categories: ["甲種化学 学識"] },

      { session: "khk-bx", urlSlug: "khk-bx", expectedQuestions: 20, label: "乙種化学 法令", categories: ["乙種化学 法令"] },

      { session: "khk-by", urlSlug: "khk-by", expectedQuestions: 15, label: "乙種化学 保安管理技術", categories: ["乙種化学 保安管理技術"] },

      { session: "khk-bz", urlSlug: "khk-bz", expectedQuestions: 15, label: "乙種化学 学識", categories: ["乙種化学 学識"] },

      { session: "khk-cx", urlSlug: "khk-cx", expectedQuestions: 20, label: "丙種化学（液石） 法令", categories: ["丙種化学（液石） 法令"] },

      { session: "khk-cy", urlSlug: "khk-cy", expectedQuestions: 20, label: "丙種化学（液石） 保安管理技術", categories: ["丙種化学（液石） 保安管理技術"] },

      { session: "khk-cz", urlSlug: "khk-cz", expectedQuestions: 20, label: "丙種化学（液石） 学識", categories: ["丙種化学（液石） 学識"] },

      { session: "khk-dx", urlSlug: "khk-dx", expectedQuestions: 20, label: "丙種化学（特別） 法令", categories: ["丙種化学（特別） 法令"] },

      { session: "khk-dy", urlSlug: "khk-dy", expectedQuestions: 20, label: "丙種化学（特別） 保安管理技術", categories: ["丙種化学（特別） 保安管理技術"] },

      { session: "khk-dz", urlSlug: "khk-dz", expectedQuestions: 20, label: "丙種化学（特別） 学識", categories: ["丙種化学（特別） 学識"] },

    ],

    seasons: ["annual"], yearRange: { start: 2024, end: 2026 },

  },
  kenchikushi1: {
    code: "kenchikushi1",
    nameFull: "一級建築士",
    urlSlug: "kenchikushi1",
    level: "specialist",
    sessions: [
      { session: "keikaku", urlSlug: "keikaku", expectedQuestions: 20, label: "学科Ⅰ（計画）", categories: ["計画"] },
      { session: "kankyo-setsubi", urlSlug: "kankyo-setsubi", expectedQuestions: 20, label: "学科Ⅱ（環境・設備）", categories: ["環境・設備"] },
      { session: "houki", urlSlug: "houki", expectedQuestions: 30, label: "学科Ⅲ（法規）", categories: ["法規"] },
      { session: "kozo", urlSlug: "kozo", expectedQuestions: 30, label: "学科Ⅳ（構造）", categories: ["構造"] },
      { session: "sekou", urlSlug: "sekou", expectedQuestions: 25, label: "学科Ⅴ（施工）", categories: ["施工"] },
      { session: "practical", urlSlug: "practical", expectedQuestions: 1, label: "設計製図", categories: ["設計製図"] },
    ],
    seasons: ["annual"],
    yearRange: { start: 2017, end: 2026 },
    legacySeasons: ["annual"],
    legacyYearRange: { start: 2019, end: 2019 },
  },
  "chintai": {"code":"chintai","nameFull":"賃貸不動産経営管理士","urlSlug":"chintai","level":"specialist","sessions":[{"session":"gakka","urlSlug":"gakka","expectedQuestions":49,"label":"学科","categories":["管理受託重要事項","重要事項説明書","管理受託契約の変更","契約の有効性","委任契約","防犯設計","予防保全","管理業務報告","原状回復の施工単位","原状回復の範囲","少額訴訟","被災建物の調査","採光規定","外壁定期調査","結露","火災感知器","賃料減額請求","滞納回収の手続","分別管理","サブリース","普通借家の期間・更新","定期借家の終了","破産と賃貸借","個人根保証","賃借権の譲渡・転貸","管理業の登録","従業者証明書","帳簿","標識","管理業の範囲","業務管理者","不当勧誘","監督・罰則","特定賃貸借標準契約","サブリース説明の方法","サブリース説明事項","サブリース説明担当","サブリース締結時書面","消費者契約法","家電リサイクル","住宅管理政策","管理士の職務","媒介報酬","相続税・贈与税","不動産証券化","建築構造","防水工法","ガス設備","管理士の経営支援","損害保険","成年後見","修繕義務","定期建物賃貸借","普通借家の終了","滞納解除","相続と賃貸借","管理業登録","管理業者の義務","委任の報告・費用","重要事項説明の方法","IT重要事項説明","標準管理受託契約","サブリース説明書","サブリースIT説明","勧誘者","誇大広告","サブリース監督処分","合理的配慮","住宅セーフティネット","個人情報","定期報告","設備の法定点検","相隣関係","滞納賃料の回収","賃料増減額","法人の連帯保証","企業会計","原状回復の費用負担","原状回復と少額訴訟","工作物責任","耐震診断","漏水調査","共同住宅の防火","給水設備","不動産登記","土地価格","不動産税務","火災保険","空家対策","管理士の役割","入居者募集","建築基準法の定義","駐車場・昇降機","給湯設備","住宅統計","賃貸借契約の解除","換気方式","屋根・外壁の点検","排水・通気設備","敷金","賃貸借契約の成立","共有物の管理","賃借権の移転","サブリースの勧誘","特定賃貸借契約の費用負担","人の死の告知","賃貸不動産経営管理士"]}],"seasons":["annual"],"yearRange":{"start":2021,end: 2025}},
  "kyusui": {"code":"kyusui","nameFull":"給水装置工事主任技術者","urlSlug":"kyusui","level":"specialist","sessions":[{"session":"gakka","urlSlug":"gakka","expectedQuestions":60,"label":"学科","categories":["公衆衛生概論","水道行政","給水装置工事法","給水装置の構造及び性能","給水装置計画論","給水装置工事事務論","給水装置の概要","給水装置施工管理法"]}],"seasons":["annual"],"yearRange":{"start":2021,end: 2026}},
  "biru-kan": {"code":"biru-kan","nameFull":"建築物環境衛生管理技術者","urlSlug":"biru-kan","level":"specialist","sessions":[{"session":"gakka","urlSlug":"gakka","expectedQuestions":180,"label":"学科","categories":["am","pm"]}],"seasons":["annual"],"yearRange":{ start: 2022, end: 2026 }},
  "gijutsushi1-kikai": {"code":"gijutsushi1-kikai","nameFull":"技術士第一次試験・機械部門","urlSlug":"gijutsushi1-kikai","level":"specialist","sessions":[{"session":"ippan","urlSlug":"ippan","expectedQuestions":15,"label":"適性科目","categories":["aptitude"]},{"session":"kiso","urlSlug":"kiso","expectedQuestions":30,"label":"基礎科目","categories":["basis"]},{"session":"kikai","urlSlug":"kikai","expectedQuestions":35,"label":"専門科目","categories":["mechanical"]}],"seasons":["annual"],"yearRange":{ start: 2024, end: 2025 }},
  "hoshasen-1": {"code":"hoshasen-1","nameFull":"第一種放射線取扱主任者","urlSlug":"hoshasen-1","level":"specialist","sessions":[{"session":"gakka","urlSlug":"gakka","expectedQuestions":269,"label":"学科","categories":["生物学","物理学","化学","実務","法令"]}],"seasons":["annual"],"yearRange":{ start: 2022, end: 2026 }},
  "hoshasen-2": {"code":"hoshasen-2","nameFull":"第二種放射線取扱主任者","urlSlug":"hoshasen-2","level":"specialist","sessions":[{"session":"gakka","urlSlug":"gakka","expectedQuestions":139,"label":"学科","categories":["生物学","化学","物理学","実務","法令"]}],"seasons":["annual"],"yearRange":{ start: 2022, end: 2026 }},
  "khk-kikai-kou": {"code":"khk-kikai-kou","nameFull":"高圧ガス製造保安責任者 甲種機械","urlSlug":"khk-kikai-kou","level":"specialist","sessions":[{"session":"hoki","urlSlug":"hoki","expectedQuestions":20,"label":"法令","categories":["法令"]},{"session":"hoan","urlSlug":"hoan","expectedQuestions":15,"label":"保安管理技術","categories":["保安管理技術"]},{"session":"gakushiki","urlSlug":"gakushiki","expectedQuestions":5,"label":"学識","categories":["学識"]}],"seasons":["annual"],"yearRange":{ start: 2024, end: 2026 }},
  "khk-kikai-otsu": {"code":"khk-kikai-otsu","nameFull":"高圧ガス製造保安責任者 乙種機械","urlSlug":"khk-kikai-otsu","level":"specialist","sessions":[{"session":"hoki","urlSlug":"hoki","expectedQuestions":20,"label":"法令","categories":["法令"]},{"session":"hoan","urlSlug":"hoan","expectedQuestions":15,"label":"保安管理技術","categories":["保安管理技術"]},{"session":"gakushiki","urlSlug":"gakushiki","expectedQuestions":15,"label":"学識","categories":["学識"]}],"seasons":["annual"],"yearRange":{ start: 2022, end: 2026 }},
  "energy-kanri": {"code":"energy-kanri","nameFull":"エネルギー管理士","urlSlug":"energy-kanri","level":"specialist","sessions":[{"session":"kyotsu","urlSlug":"kyotsu","expectedQuestions":42,"label":"学科","categories":["エネルギー管理法規","エネルギー情勢・政策、エネルギー概論","エネルギー管理技術の基礎"]},{"session":"senmon","urlSlug":"senmon","expectedQuestions":371,"label":"学科","categories":["電気及び電子理論","自動制御及び情報処理","電気計測","工場配電","電気機器・変圧器","電気機器","電動力応用","電気加熱","電気化学","照明","空気調和","熱力学の基礎","流体工学の基礎","伝熱工学の基礎","燃料及び燃焼管理","燃焼計算","計測及び制御","ボイラ・蒸気輸送配管","蒸気原動機・内燃機関・ガスタービン","熱交換器・熱回収装置","冷凍・空気調和設備","工業炉・熱設備材料","蒸留・蒸発・濃縮装置、乾燥装置、乾留・ガス化装置"]}],"seasons":["annual"],"yearRange":{ start: 2025, end: 2026 }},
  kanteishi: {

    code: "kanteishi", nameFull: "不動産鑑定士試験（短答式）", urlSlug: "kanteishi", level: "specialist",

    sessions: [

        { session: "gyosei", urlSlug: "gyosei", expectedQuestions: 40, label: "不動産に関する行政法規", categories: ["行政法規"] },

        { session: "riron", urlSlug: "riron", expectedQuestions: 40, label: "不動産の鑑定評価に関する理論", categories: ["鑑定評価理論"] },

    ],

    seasons: ["annual"], yearRange: { start: 2022, end: 2026 },

},
  kaikeishi: {

    code: "kaikeishi", nameFull: "公認会計士試験（短答式）", urlSlug: "kaikeishi", level: "specialist",

    sessions: [

        { session: "kigyo", urlSlug: "kigyo", expectedQuestions: 20, label: "企業法", categories: ["企業法"] },

        { session: "kanri", urlSlug: "kanri", expectedQuestions: 18, label: "管理会計論", categories: ["管理会計論"] },

        { session: "kansa", urlSlug: "kansa", expectedQuestions: 20, label: "監査論", categories: ["監査論"] },

        { session: "zaimu", urlSlug: "zaimu", expectedQuestions: 35, label: "財務会計論", categories: ["財務会計論"] },

    ],

    seasons: ["round1", "round2"], yearRange: { start: 2022, end: 2026 },

},
  chosashi: {

    code: "chosashi",

    nameFull: "土地家屋調査士試験",

    urlSlug: "chosashi",

    level: "specialist",

    sessions: [

        { session: "am", urlSlug: "am", expectedQuestions: 11, label: "午前（択一10・記述1）", categories: ["測量", "測量記述"] },

        { session: "pm", urlSlug: "pm", expectedQuestions: 22, label: "午後（択一20・記述2）", categories: ["民法", "不動産登記法", "土地家屋調査士法", "土地記述", "建物記述"] },

    ],

    seasons: ["autumn"],

    yearRange: { start: 2022, end: 2025 },

},
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
        { session: "pm", urlSlug: "pm", expectedQuestions: 3, label: "午後", categories: ["午後記述", "情報セキュリティ対策"] },
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
    sessions: [am80(BASIC_CATEGORIES), { session: "pm", urlSlug: "pm", expectedQuestions: 13, label: "午後", categories: ["旧午後", "午後記述"] }],
    seasons: ["spring", "autumn"],
    yearRange: { start: 2009, end: 2019 },
    cbtYearRange: { start: 2023, end: 2026 },
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
    sessions: [am80(ADVANCED_CATEGORIES), { session: "pm", urlSlug: "pm", expectedQuestions: 11, label: "午後", categories: ADVANCED_CATEGORIES }],
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
        { session: "pm2", urlSlug: "pm2", expectedQuestions: 3, label: "午後II", categories: ["午後論述"] },
        { session: "pm1", urlSlug: "pm1", expectedQuestions: 4, label: "午後I", categories: ["午後記述"] },
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
        { session: "pm2", urlSlug: "pm2", expectedQuestions: 3, label: "午後II", categories: ["システムアーキテクチャ", "要件定義", "午後論述"] },
        { session: "pm1", urlSlug: "pm1", expectedQuestions: 4, label: "午後I", categories: ["午後記述"] },
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
        { session: "pm1", urlSlug: "pm1", expectedQuestions: 3, label: "午後I", categories: ["プロジェクトマネジメント", "午後記述"] },
        { session: "pm2", urlSlug: "pm2", expectedQuestions: 2, label: "午後II", categories: ["午後論述", "プロジェクトマネジメント"] },
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
        { session: "pm2", urlSlug: "pm2", expectedQuestions: 2, label: "午後II", categories: ["ネットワーク設計", "午後記述", "無線LAN"] },
        { session: "pm1", urlSlug: "pm1", expectedQuestions: 3, label: "午後I", categories: ["午後記述"] },
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
        { session: "pm2", urlSlug: "pm2", expectedQuestions: 2, label: "午後II", categories: ["午後記述"] },
        { session: "pm1", urlSlug: "pm1", expectedQuestions: 3, label: "午後I", categories: ["午後記述"] },
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
        { session: "pm1", urlSlug: "pm1", expectedQuestions: 3, label: "午後I", categories: ["組込みシステム", "午後記述"] },
        { session: "pm2", urlSlug: "pm2", expectedQuestions: 2, label: "午後II", categories: ["午後記述"] },
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
        { session: "pm", urlSlug: "pm", expectedQuestions: 4, label: "午後", categories: ["情報セキュリティ", "インシデント対応"] },
        { session: "pm2", urlSlug: "pm2", expectedQuestions: 2, label: "午後II", categories: ["午後記述", "インシデント対応", "認証技術"] },
        { session: "pm1", urlSlug: "pm1", expectedQuestions: 3, label: "午後I", categories: ["午後記述", "認証技術"] },
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
        { session: "pm1", urlSlug: "pm1", expectedQuestions: 3, label: "午後I", categories: ["午後記述", "ITサービスマネジメント"] },
        { session: "pm2", urlSlug: "pm2", expectedQuestions: 2, label: "午後II", categories: ["ITサービスマネジメント", "午後論述"] },
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
        { session: "pm2", urlSlug: "pm2", expectedQuestions: 2, label: "午後II", categories: ["システム監査", "午後論述"] },
        { session: "pm1", urlSlug: "pm1", expectedQuestions: 3, label: "午後I", categories: ["午後記述"] },
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

        },
      {"session":"kinzai-sonpo","urlSlug":"kinzai-sonpo","expectedQuestions":15,"label":"金財 損保顧客資産相談業務","categories":["損保顧客資産相談業務"]},
      {"session":"kinzai-kojin","urlSlug":"kinzai-kojin","expectedQuestions":15,"label":"金財 個人資産相談業務","categories":["個人資産相談業務"]},
      {"session":"kinzai-chusho","urlSlug":"kinzai-chusho","expectedQuestions":15,"label":"金財 中小事業主資産相談業務","categories":["中小事業主資産相談業務"]},
      {"session":"kinzai-seiho","urlSlug":"kinzai-seiho","expectedQuestions":15,"label":"金財 生保顧客資産相談業務","categories":["生保顧客資産相談業務"]},
    ],

    seasons: ["may", "september", "january", "published"],

    yearRange: { start: 2022, end: 2026 },

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

        },
      {
            session: "gakka-II",
            urlSlug: "gakka-ii",
            expectedQuestions: 15,
            label: "学科・応用編",
            categories: ["ライフプランニングと資金計画", "金融資産運用", "タックスプランニング", "不動産", "相続・事業承継"],
        },
      {
            session: "practical",
            urlSlug: "practical",
            expectedQuestions: 20,
            label: "実技・資産設計提案業務",
            categories: ["ライフプランニングと資金計画", "リスク管理", "金融資産運用", "タックスプランニング", "不動産", "相続・事業承継", "職業倫理"],
        },
    ],
    seasons: ["january", "may", "september"],
    yearRange: { start: 2022, end: 2026 },
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

        },
      {"session":"kinzai-hoken","urlSlug":"kinzai-hoken","expectedQuestions":15,"label":"金財 保険顧客資産相談業務","categories":["保険顧客資産相談業務"]},
      {"session":"kinzai-kojin","urlSlug":"kinzai-kojin","expectedQuestions":15,"label":"金財 個人資産相談業務","categories":["個人資産相談業務"]},
    ],

    seasons: ["published",
      "may",
    ],

    yearRange: { start: 2024, end: 2026 },

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
    seasons: ["first", "second", "primary", "annual"],
    yearRange: { start: 2016, end: 2025 },
    legacySeasons: ["annual"],
    legacyYearRange: { start: 2016, end: 2020 },
},
  denken1: {

    code: "denken1",

    nameFull: "第一種電気主任技術者試験",

    urlSlug: "denken1",

    level: "advanced",

    sessions: [
        { session: "riron", urlSlug: "riron", expectedQuestions: 5, label: "理論", categories: ["理論"] },
        { session: "denryoku", urlSlug: "denryoku", expectedQuestions: 5, label: "電力", categories: ["電力"] },
        { session: "kikai", urlSlug: "kikai", expectedQuestions: 5, label: "機械", categories: ["機械", "機械・制御"] },
        { session: "houki", urlSlug: "houki", expectedQuestions: 5, label: "法規", categories: ["法規"] },
        { session: "senmon", urlSlug: "senmon", expectedQuestions: 6, label: "二次・電力・管理", categories: ["電力・管理"] },
    ],

    seasons: ["primary", "second", "annual"],

    yearRange: { start: 2021, end: 2026 },

},
  denken2: {

    code: "denken2",

    nameFull: "第二種電気主任技術者試験",

    urlSlug: "denken2",

    level: "advanced",

    sessions: [
        { session: "denryoku", urlSlug: "denryoku", expectedQuestions: 35, label: "電力", categories: ["電力"] },
        { session: "houki", urlSlug: "houki", expectedQuestions: 35, label: "法規", categories: ["法規"] },
        { session: "kikai", urlSlug: "kikai", expectedQuestions: 40, label: "機械・制御", categories: ["機械・制御", "機械"] },
        { session: "riron", urlSlug: "riron", expectedQuestions: 40, label: "理論", categories: ["理論"] },
    ],

    seasons: ["primary", "second"],

    yearRange: { start: 2016, end: 2026 },

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

        }, { session: "pm", urlSlug: "pm", expectedQuestions: 50, label: "学科（午後）", categories: ["電気理論・配電", "電気機器・材料・工具", "施工・法規・検査", "配線図"] },],

    seasons: ["first", "second"],

    yearRange: { start: 2016, end: 2026 },

},
  denko1: {
    code: "denko1",
    nameFull: "第一種電気工事士学科試験",
    urlSlug: "denko1",
    level: "basic",
    sessions: [
               {
            session: "gakka",
            urlSlug: "gakka",
            expectedQuestions: 50,
            label: "学科",
            categories: ["電気理論・配電", "電気機器・発変電", "高圧設備・材料・施工", "設備図・検査・法令", "配線図(単線結線図)"],
    },
               {
            session: "pm",
            urlSlug: "pm",
            expectedQuestions: 50,
            label: "学科（午後）",
            categories: ["電気理論・配電", "電気機器・発変電", "高圧設備・材料・施工", "設備図・検査・法令", "配線図(制御回路)", "配線図(単線結線図)"],
        },
               {
            session: "am",
            urlSlug: "am",
            expectedQuestions: 50,
            label: "筆記・午前",
            categories: ["電気理論・配電", "電気機器・発変電", "高圧設備・材料・施工", "設備図・検査・法令", "配線図(単線結線図)"],
        },

      { session: "practical", urlSlug: "practical", expectedQuestions: 10, label: "技能試験", categories: ["技能試験"] },
    ],
    seasons: ["first", "second", "annual",],
    yearRange: { start: 2016, end: 2026 },
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
    seasons: ["october", "december", "late"],
    yearRange: { start: 2016, end: 2025 },
    legacySeasons: ["october"],
    legacyYearRange: { start: 2017, end: 2017 },
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

            label: "第一次検定（土木）",

            categories: ["土木一般（必須）", "土木一般（選択）", "専門土木（選択）", "法規（選択）", "施工管理（必須）"],

        }],

    seasons: ["late", "early", "october"],

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
    seasons: [
              "september",
],
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

            label: "第一次検定",

            categories: ["電気通信技術", "関連分野", "施工管理法", "法規"],

        }],

    seasons: ["early", "late"],

    yearRange: { start: 2025, end: 2026 },

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

    yearRange: { start: 2025, end: 2026 },

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

    yearRange: { start: 2023, end: 2025 },

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
    yearRange: { start: 2023, end: 2025 },
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

    yearRange: { start: 2023, end: 2025 },

},
  tohan: {

    code: "tohan",

    nameFull: "登録販売者試験",

    urlSlug: "tohan",

    level: "basic",

    sessions: [
               {

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

        },
               {
            session: "am",
            urlSlug: "am",
            expectedQuestions: 60,
            label: "東京都（午前）",
            categories: ["医薬品に共通する特性と基本的な知識", "人体の働きと医薬品", "薬事に関する法規と制度"],
        },
        ],

    seasons: ["kansai", "annual", "tokyo"],

    yearRange: { start: 2022, end: 2026 },

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
    yearRange: { start: 2021, end: 2025 },
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

    seasons: ["published", "october"],

    yearRange: { start: 2023, end: 2026 },

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

    seasons: ["published", "october"],

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

    yearRange: { start: 2022, end: 2026 },

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
    yearRange: { start: 2021, end: 2025 },
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

    yearRange: { start: 2016, end: 2026 },

},
  "chusho-kigyo-shindanshi": {
    code: "chusho-kigyo-shindanshi",
    nameFull: "中小企業診断士 第1次試験",
    urlSlug: "chusho-kigyo-shindanshi",
    level: "advanced",
    sessions: [

        { session: "keizai", urlSlug: "keizai", expectedQuestions: 25, label: "経済学・経済政策", categories: ["経済学・経済政策"] },

        { session: "zaimu", urlSlug: "zaimu", expectedQuestions: 25, label: "財務・会計", categories: ["財務・会計"] },

        { session: "kigyo", urlSlug: "kigyo", expectedQuestions: 41, label: "企業経営理論", categories: ["企業経営理論"] },

        { session: "unei", urlSlug: "unei", expectedQuestions: 44, label: "運営管理（オペレーション・マネジメント）", categories: ["運営管理（オペレーション・マネジメント）"] },

        { session: "keiei-houmu", urlSlug: "keiei-houmu", expectedQuestions: 25, label: "経営法務", categories: ["経営法務"] },

        { session: "keiei-joho", urlSlug: "keiei-joho", expectedQuestions: 25, label: "経営情報システム", categories: ["経営情報システム"] },

        { session: "chusho-seisaku", urlSlug: "chusho-seisaku", expectedQuestions: 42, label: "中小企業経営・中小企業政策", categories: ["中小企業経営・中小企業政策"] },

    ],
    seasons: ["annual",
  "late",],
    yearRange: { start: 2022, end: 2026 },
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

    yearRange: { start: 2023, end: 2026 },

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
    yearRange: { start: 2022, end: 2026 },
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

    yearRange: { start: 2016, end: 2025 },

},
  josanshi: {

    code: "josanshi",

    nameFull: "助産師国家試験",

    urlSlug: "josanshi",

    level: "advanced",

    sessions: [{ session: "am", urlSlug: "am", expectedQuestions: 55, label: "午前", categories: ["午前"] }],

    seasons: ["annual"],

    yearRange: { start: 2021, end: 2025 },

},
  "sagyo-ryohoshi": {
    code: "sagyo-ryohoshi",
    nameFull: "作業療法士国家試験",
    urlSlug: "sagyo-ryohoshi",
    level: "advanced",
    sessions: [{ session: "am", urlSlug: "am", expectedQuestions: 100, label: "午前", categories: ["午前"] }, { session: "pm", urlSlug: "pm", expectedQuestions: 100, label: "午後", categories: ["午後"] }],
    seasons: ["annual", "february"],
    yearRange: { start: 2022, end: 2025 },
},
  "gengo-chokakushi": {

    code: "gengo-chokakushi",

    nameFull: "言語聴覚士国家試験",

    urlSlug: "gengo-chokakushi",

    level: "advanced",

    sessions: [

      { session: "am", urlSlug: "am", expectedQuestions: 100, label: "午前", categories: ["午前"] },

      { session: "pm", urlSlug: "pm", expectedQuestions: 100, label: "午後", categories: ["午後"] },

    ],

    seasons: ["annual"],

    yearRange: { start: 2023, end: 2026 },

  },
  "shino-kunrenshi": {
    code: "shino-kunrenshi",
    nameFull: "視能訓練士国家試験",
    urlSlug: "shino-kunrenshi",
    level: "advanced",
    sessions: [{ session: "am", urlSlug: "am", expectedQuestions: 75, label: "午前", categories: ["午前"] }, { session: "pm", urlSlug: "pm", expectedQuestions: 75, label: "午後", categories: ["午後"] }],
    seasons: ["annual", "february"],
    yearRange: { start: 2022, end: 2025 },
},
  "judo-seifukushi": {
    code: "judo-seifukushi",
    nameFull: "柔道整復師国家試験",
    urlSlug: "judo-seifukushi",
    level: "advanced",
    sessions: [

        { session: "am", urlSlug: "am", expectedQuestions: 128, label: "午前", categories: ["必修問題", "一般問題（午前）", "解剖学", "生理学", "運動学", "衛生学・公衆衛生学", "関係法規"] },

        { session: "pm", urlSlug: "pm", expectedQuestions: 122, label: "午後", categories: ["一般問題（午後）", "病理学概論", "一般臨床医学", "外科学概論", "整形外科学", "リハビリテーション医学", "柔道整復理論"] },

    ],
    seasons: ["annual"],
    yearRange: { start: 2021, end: 2025 },
},
  "rinsho-kogishi": {
    code: "rinsho-kogishi",
    nameFull: "臨床工学技士国家試験",
    urlSlug: "rinsho-kogishi",
    level: "advanced",
    sessions: [

        { session: "am", urlSlug: "am", expectedQuestions: 90, label: "午前", categories: ["午前"] },

        { session: "pm", urlSlug: "pm", expectedQuestions: 90, label: "午後", categories: ["午後"] },

    ],
    seasons: ["annual"],
    yearRange: { start: 2021, end: 2025 },
},
  kangoshi: {

    code: "kangoshi",

    nameFull: "看護師国家試験",

    urlSlug: "kangoshi",

    level: "basic",

    // 直近2回の確認済み原問、第113回午前120問・午後119問、第112・111回の午前各10問を収録。expectedQuestionsは既存の表示設定。

    sessions: [
               {

            session: "am", urlSlug: "am", expectedQuestions: 120, label: "午前",

            categories: ["必修問題", "一般問題", "状況設定問題"],

        },
               {
            session: "pm", urlSlug: "pm", expectedQuestions: 120, label: "午後",
            categories: ["必修問題", "一般問題", "状況設定問題"],
        },
        ],

    seasons: ["annual"],

    yearRange: { start: 2016, end: 2025 },

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
    yearRange: { start: 2022, end: 2026 },
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
    yearRange: { start: 2022, end: 2026 },
},
  "rigaku-ryohoshi": {

    code: "rigaku-ryohoshi",

    nameFull: "理学療法士国家試験",

    urlSlug: "rigaku-ryohoshi",

    level: "advanced",

    sessions: [

        { session: "am", urlSlug: "am", expectedQuestions: 100, label: "午前", categories: ["午前"] },

        { session: "pm", urlSlug: "pm", expectedQuestions: 100, label: "午後", categories: ["午後"] },

    ],

    seasons: ["annual"],

    yearRange: { start: 2025, end: 2026 },

},
  "gas-kou": {

    code: "gas-kou", nameFull: "ガス主任技術者試験（甲種）", urlSlug: "gas-kou", level: "advanced",

    sessions: [

        { session: "gas-law", urlSlug: "gas-law", expectedQuestions: 16, label: "法令", categories: ["法令"] },

        { session: "gas-basic", urlSlug: "gas-basic", expectedQuestions: 15, label: "基礎", categories: ["基礎"] },

        { session: "gas-technology", urlSlug: "gas-technology", expectedQuestions: 27, label: "ガス技術", categories: ["製造", "供給", "消費"] },

    ],

    seasons: ["annual"], yearRange: { start: 2025, end: 2026 },

},
  "gas-otsu": {

    code: "gas-otsu", nameFull: "ガス主任技術者試験（乙種）", urlSlug: "gas-otsu", level: "advanced",

    sessions: [

        { session: "gas-law", urlSlug: "gas-law", expectedQuestions: 16, label: "法令", categories: ["法令"] },

        { session: "gas-basic", urlSlug: "gas-basic", expectedQuestions: 15, label: "基礎", categories: ["基礎"] },

        { session: "gas-technology", urlSlug: "gas-technology", expectedQuestions: 27, label: "ガス技術", categories: ["製造", "供給", "消費"] },

    ],

    seasons: ["annual"], yearRange: { start: 2025, end: 2026 },

},
  "gas-hei": {

    code: "gas-hei", nameFull: "ガス主任技術者試験（丙種）", urlSlug: "gas-hei", level: "advanced",

    sessions: [

        { session: "gas-law", urlSlug: "gas-law", expectedQuestions: 16, label: "法令", categories: ["法令"] },

        { session: "gas-basic", urlSlug: "gas-basic", expectedQuestions: 15, label: "基礎", categories: ["基礎"] },

        { session: "gas-technology", urlSlug: "gas-technology", expectedQuestions: 27, label: "ガス技術", categories: ["製造", "供給", "消費"] },

    ],

    seasons: ["annual"], yearRange: { start: 2025, end: 2026 },

},
  "rinsho-kensagishi": {
    code: "rinsho-kensagishi",
    nameFull: "臨床検査技師国家試験",
    urlSlug: "rinsho-kensagishi",
    level: "advanced",
    sessions: [{ session: "am", urlSlug: "am", expectedQuestions: 100, label: "午前", categories: ["午前"] }, { session: "pm", urlSlug: "pm", expectedQuestions: 100, label: "午後", categories: ["午後"] }],
    seasons: ["annual"],
    yearRange: { start: 2022, end: 2026 },
},
  "shika-ishi": {

    code: "shika-ishi",

    nameFull: "歯科医師国家試験",

    urlSlug: "shika-ishi",

    level: "advanced",

    sessions: [

        { session: "mondai-a", urlSlug: "mondai-a", expectedQuestions: 90, label: "問題A", categories: ["基礎歯学", "口腔衛生", "歯科保存学", "歯科補綴学", "口腔外科学", "小児歯科", "歯科矯正学", "歯科放射線", "歯科麻酔", "歯科医療管理"] },

        { session: "mondai-b", urlSlug: "mondai-b", expectedQuestions: 90, label: "問題B", categories: ["基礎歯学", "口腔衛生", "歯科保存学", "歯科補綴学", "口腔外科学", "小児歯科", "歯科矯正学", "歯科放射線", "歯科麻酔", "歯科医療管理"] },

        { session: "mondai-c", urlSlug: "mondai-c", expectedQuestions: 90, label: "問題C", categories: ["基礎歯学", "口腔衛生", "歯科保存学", "歯科補綴学", "口腔外科学", "小児歯科", "歯科矯正学", "歯科放射線", "歯科麻酔", "歯科医療管理"] },

        { session: "mondai-d", urlSlug: "mondai-d", expectedQuestions: 90, label: "問題D", categories: ["基礎歯学", "口腔衛生", "歯科保存学", "歯科補綴学", "口腔外科学", "小児歯科", "歯科矯正学", "歯科放射線", "歯科麻酔", "歯科医療管理"] },

    ],

    seasons: ["annual"],

    yearRange: { start: 2025, end: 2026 },

},
  "shinryo-hoshasengishi": {

    code: "shinryo-hoshasengishi",

    nameFull: "診療放射線技師国家試験",

    urlSlug: "shinryo-hoshasengishi",

    level: "advanced",

    sessions: [

        { session: "am", urlSlug: "am", expectedQuestions: 100, label: "午前", categories: ["午前"] },

        { session: "pm", urlSlug: "pm", expectedQuestions: 100, label: "午後", categories: ["午後"] },

    ],

    seasons: ["annual"],

    yearRange: { start: 2025, end: 2026 },

},
  "riku-toku-kokunai": {

    code: "riku-toku-kokunai", nameFull: "国内電信級陸上特殊無線技士試験", urlSlug: "riku-toku-kokunai", level: "specialist",

    sessions: [{ session: "houki", urlSlug: "houki", expectedQuestions: 12, label: "法規", categories: ["無線通信の法規"] }],

    seasons: ["february", "june",
  "october",], yearRange: { start: 2025, end: 2026 },

},
  "maritime2": {

    code: "maritime2", nameFull: "第二級海上無線通信士試験", urlSlug: "maritime2", level: "specialist",

    sessions: [

        { session: "kiso", urlSlug: "kiso", expectedQuestions: 25, label: "無線工学の基礎", categories: ["無線工学の基礎"] },

        { session: "kogaku-a", urlSlug: "kogaku-a", expectedQuestions: 25, label: "無線工学A", categories: ["無線工学A"] },

        { session: "kogaku-b", urlSlug: "kogaku-b", expectedQuestions: 25, label: "無線工学B", categories: ["無線工学B"] },

        { session: "houki", urlSlug: "houki", expectedQuestions: 20, label: "法規", categories: ["法規"] },

    ],

    seasons: ["march", "september"], yearRange: { start: 2022, end: 2026 },

},
  "maritime1": {

    code: "maritime1", nameFull: "第一級海上無線通信士試験", urlSlug: "maritime1", level: "specialist",

    sessions: [

        { session: "kiso", urlSlug: "kiso", expectedQuestions: 25, label: "無線工学の基礎", categories: ["無線工学の基礎"] },

        { session: "kogaku-a", urlSlug: "kogaku-a", expectedQuestions: 25, label: "無線工学A", categories: ["無線工学A"] },

        { session: "kogaku-b", urlSlug: "kogaku-b", expectedQuestions: 25, label: "無線工学B", categories: ["無線工学B"] },

        { session: "hoki", urlSlug: "hoki", expectedQuestions: 20, label: "法規", categories: ["法規"] },

    ],

    seasons: ["march", "september"], yearRange: { start: 2022, end: 2026 },

},
  "general1": {

    code: "general1", nameFull: "第一級総合無線通信士試験", urlSlug: "general1", level: "specialist",

    sessions: [

        { session: "kiso", urlSlug: "kiso", expectedQuestions: 25, label: "無線工学の基礎", categories: ["無線工学の基礎"] },

        { session: "kogaku-a", urlSlug: "kogaku-a", expectedQuestions: 25, label: "無線工学A", categories: ["無線工学A"] },

        { session: "kogaku-b", urlSlug: "kogaku-b", expectedQuestions: 25, label: "無線工学B", categories: ["無線工学B"] },

        { session: "hoki", urlSlug: "hoki", expectedQuestions: 25, label: "法規", categories: ["法規"] },

        { session: "tiri", urlSlug: "tiri", expectedQuestions: 35, label: "地理", categories: ["地理"] },


      { session: "eigo", urlSlug: "eigo", expectedQuestions: 19, label: "英語", categories: ["英語"] },
    ],

    seasons: ["march", "september"], yearRange: { start: 2022, end: 2026 },

},
  "general2": {

    code: "general2", nameFull: "第二級総合無線通信士試験", urlSlug: "general2", level: "specialist",

    sessions: [

        { session: "kiso", urlSlug: "kiso", expectedQuestions: 25, label: "無線工学の基礎", categories: ["無線工学の基礎"] },

        { session: "kogaku-a", urlSlug: "kogaku-a", expectedQuestions: 25, label: "無線工学A", categories: ["無線工学A"] },

        { session: "kogaku-b", urlSlug: "kogaku-b", expectedQuestions: 25, label: "無線工学B", categories: ["無線工学B"] },

        { session: "hoki", urlSlug: "hoki", expectedQuestions: 25, label: "法規", categories: ["法規"] },

        { session: "tiri", urlSlug: "tiri", expectedQuestions: 40, label: "地理", categories: ["地理"] },


      { session: "eigo-hikki", urlSlug: "eigo-hikki", expectedQuestions: 24, label: "英語（筆記）", categories: ["英語"] },
      { session: "eigo-kaiwa", urlSlug: "eigo-kaiwa", expectedQuestions: 7, label: "英会話（公式設問文）", categories: ["英語"] },
    ],

    seasons: ["march", "september"], yearRange: { start: 2022, end: 2026 },

},
  "general3": {

    code: "general3", nameFull: "第三級総合無線通信士試験", urlSlug: "general3", level: "specialist",

    sessions: [

        { session: "kiso", urlSlug: "kiso", expectedQuestions: 25, label: "無線工学の基礎", categories: ["無線工学の基礎"] },

        { session: "kogaku", urlSlug: "kogaku", expectedQuestions: 25, label: "無線工学", categories: ["無線工学"] },

        { session: "houki", urlSlug: "houki", expectedQuestions: 20, label: "法規", categories: ["法規"] },

    ],

    seasons: ["march", "september"], yearRange: { start: 2026, end: 2026 },

},
  "maritime3": {

    code: "maritime3", nameFull: "第三級海上無線通信士試験", urlSlug: "maritime3", level: "specialist",

    sessions: [

        { session: "kogaku", urlSlug: "kogaku", expectedQuestions: 15, label: "無線工学", categories: ["無線工学"] },

        { session: "houki", urlSlug: "houki", expectedQuestions: 20, label: "法規", categories: ["法規"] },
  { session: "eigo", urlSlug: "eigo", expectedQuestions: 12, label: "英語（筆記）", categories: ["英語（筆記）"] },
  { session: "eikaiwa", urlSlug: "eikaiwa", expectedQuestions: 7, label: "英語（会話・原稿）", categories: ["英語（会話）"] },

    ],

    seasons: ["march", "september"], yearRange: { start: 2025, end: 2026 },

},
  "land-special2": {

    code: "land-special2", nameFull: "第二級陸上特殊無線技士試験", urlSlug: "land-special2", level: "specialist",

    sessions: [

        { session: "houki", urlSlug: "houki", expectedQuestions: 12, label: "法規", categories: ["法規"] },

        { session: "kogaku", urlSlug: "kogaku", expectedQuestions: 12, label: "無線工学", categories: ["無線工学"] },

    ],

    seasons: ["october", "february"], yearRange: { start: 2021, end: 2022 },

},
  "land-special3": {

    code: "land-special3", nameFull: "第三級陸上特殊無線技士試験", urlSlug: "land-special3", level: "specialist",

    sessions: [

        { session: "houki", urlSlug: "houki", expectedQuestions: 12, label: "法規", categories: ["法規"] },

        { session: "kogaku", urlSlug: "kogaku", expectedQuestions: 12, label: "無線工学", categories: ["無線工学"] },

    ],

    seasons: ["october", "february"], yearRange: { start: 2021, end: 2022 },

},
  "riku-tech1": {

    code: "riku-tech1", nameFull: "第一級陸上無線技術士試験", urlSlug: "riku-tech1", level: "specialist",

    sessions: [

        { session: "kiso", urlSlug: "kiso", expectedQuestions: 25, label: "無線工学の基礎", categories: ["無線工学の基礎"] },

        { session: "kogaku-a", urlSlug: "kogaku-a", expectedQuestions: 25, label: "無線工学A", categories: ["無線工学A"] },

        { session: "kogaku-b", urlSlug: "kogaku-b", expectedQuestions: 25, label: "無線工学B", categories: ["無線工学B"] },

        { session: "houki", urlSlug: "houki", expectedQuestions: 20, label: "法規", categories: ["法規"] },

    ],

    seasons: ["january", "july"], yearRange: { start: 2022, end: 2026 },

},
  "riku-tech2": {

    code: "riku-tech2", nameFull: "第二級陸上無線技術士試験", urlSlug: "riku-tech2", level: "specialist",

    sessions: [

        { session: "houki", urlSlug: "houki", expectedQuestions: 20, label: "法規", categories: ["法規"] },

        { session: "kiso", urlSlug: "kiso", expectedQuestions: 25, label: "無線工学の基礎", categories: ["無線工学の基礎"] },

        { session: "kogaku-a", urlSlug: "kogaku-a", expectedQuestions: 25, label: "無線工学A", categories: ["無線工学A"] },

        { session: "kogaku-b", urlSlug: "kogaku-b", expectedQuestions: 25, label: "無線工学B", categories: ["無線工学B"] },

    ],

    seasons: ["january", "july"], yearRange: { start: 2022, end: 2026 },

},
  "amateur2": {

    code: "amateur2", nameFull: "第二級アマチュア無線技士試験", urlSlug: "amateur2", level: "specialist",

    sessions: [

        { session: "kogaku", urlSlug: "kogaku", expectedQuestions: 25, label: "無線工学", categories: ["無線工学"] },

        { session: "houki", urlSlug: "houki", expectedQuestions: 30, label: "法規", categories: ["法規"] },

    ],

    seasons: ["may", "august", "november",
      "spring",
      "late",
    ], yearRange: { start: 2022, end: 2026 },

},
  "maritime-radar": {

    code: "maritime-radar", nameFull: "レーダー級海上特殊無線技士試験", urlSlug: "maritime-radar", level: "specialist",

    sessions: [

        { session: "houki", urlSlug: "houki", expectedQuestions: 12, label: "法規", categories: ["法規"] },

        { session: "kogaku", urlSlug: "kogaku", expectedQuestions: 12, label: "無線工学", categories: ["無線工学"] },

    ],

    seasons: ["february", "june"], yearRange: { start: 2026, end: 2026 },

},
  "amateur1": {
    code: "amateur1", nameFull: "第一級アマチュア無線技士試験", urlSlug: "amateur1", level: "specialist",
    sessions: [

        { session: "kogaku", urlSlug: "kogaku", expectedQuestions: 30, label: "無線工学", categories: ["無線工学"] },

        { session: "houki", urlSlug: "houki", expectedQuestions: 30, label: "法規", categories: ["法規"] },

    ],
    seasons: ["may", "august", "november",
  "late",
      "early",
    ], yearRange: { start: 2022, end: 2026 },
},
  "maritime-special1": {

    code: "maritime-special1", nameFull: "第一級海上特殊無線技士試験", urlSlug: "maritime-special1", level: "specialist",

    sessions: [

        { session: "kogaku", urlSlug: "kogaku", expectedQuestions: 12, label: "無線工学", categories: ["無線工学"] },

        { session: "houki", urlSlug: "houki", expectedQuestions: 12, label: "法規", categories: ["法規"] },

    ],

    seasons: ["february", "june"], yearRange: { start: 2026, end: 2026 },

},
  "aviation-comm": {

    code: "aviation-comm", nameFull: "航空無線通信士試験", urlSlug: "aviation-comm", level: "specialist",

    sessions: [

        { session: "kogaku", urlSlug: "kogaku", expectedQuestions: 14, label: "無線工学", categories: ["無線工学"] },

        { session: "houki", urlSlug: "houki", expectedQuestions: 20, label: "法規", categories: ["法規"] },
  { session: "eigo-hikki", urlSlug: "eigo-hikki", expectedQuestions: 5, label: "英語・筆記", categories: ["英語・筆記"] },
  { session: "eigo-kaiwa", urlSlug: "eigo-kaiwa", expectedQuestions: 7, label: "英会話", categories: ["英会話"] },

    ],

    seasons: ["february", "august"], yearRange: { start: 2025, end: 2026 },

},
  "maritime4": {

    code: "maritime4", nameFull: "第四級海上無線通信士試験", urlSlug: "maritime4", level: "specialist",

    sessions: [

        { session: "kogaku", urlSlug: "kogaku", expectedQuestions: 18, label: "無線工学", categories: ["無線工学"] },

        { session: "houki", urlSlug: "houki", expectedQuestions: 20, label: "法規", categories: ["法規"] },

    ],

    seasons: ["february", "august"], yearRange: { start: 2025, end: 2026 },

},
  "land-special1": {

    code: "land-special1", nameFull: "第一級陸上特殊無線技士試験", urlSlug: "land-special1", level: "specialist",

    sessions: [

        { session: "houki", urlSlug: "houki", expectedQuestions: 12, label: "法規（09:30 A版）", categories: ["無線通信の法規"] },

        { session: "kogaku", urlSlug: "kogaku", expectedQuestions: 24, label: "無線工学（09:30 A版）", categories: ["無線工学"] },

    ],

    seasons: ["february", "june"], yearRange: { start: 2026, end: 2026 },

},
  "koku-toku": {

    code: "koku-toku", nameFull: "航空特殊無線技士試験", urlSlug: "koku-toku", level: "specialist",

    sessions: [

        { session: "houki", urlSlug: "houki", expectedQuestions: 12, label: "法規", categories: ["無線通信の法規"] },

        { session: "kogaku", urlSlug: "kogaku", expectedQuestions: 12, label: "無線工学", categories: ["無線工学"] },

    ],

    seasons: ["february", "june",
  "october",], yearRange: { start: 2022, end: 2026 },

},
  "kai-toku2": {

    code: "kai-toku2", nameFull: "第二級海上特殊無線技士試験", urlSlug: "kai-toku2", level: "specialist",

    sessions: [

        { session: "houki", urlSlug: "houki", expectedQuestions: 12, label: "法規", categories: ["法規"] },

        { session: "kogaku", urlSlug: "kogaku", expectedQuestions: 12, label: "無線工学", categories: ["無線工学"] },

    ],

    seasons: ["february", "october"], yearRange: { start: 2022, end: 2023 },

},
  "kai-toku3": {

    code: "kai-toku3", nameFull: "第三級海上特殊無線技士試験", urlSlug: "kai-toku3", level: "specialist",

    sessions: [

        { session: "houki", urlSlug: "houki", expectedQuestions: 20, label: "法規", categories: ["無線通信の法規"] },

        { session: "kogaku", urlSlug: "kogaku", expectedQuestions: 10, label: "無線工学", categories: ["無線工学"] },

    ],

    seasons: ["february", "october"], yearRange: { start: 2022, end: 2023 },

},
  riyoshi: {

    code: "riyoshi", nameFull: "理容師国家試験", urlSlug: "riyoshi", level: "basic",

    sessions: [{ session: "gakka", urlSlug: "gakka", expectedQuestions: 55, label: "筆記", categories: ["関係法規・制度", "運営管理", "公衆衛生・環境衛生", "感染症", "衛生管理技術", "人体の構造及び機能", "皮膚科学", "香粧品化学", "文化論及び理容技術理論"] }],

    seasons: ["first", "second"], yearRange: { start: 2022, end: 2026 },

},
  "kenchiku-setsubishi": {

    code: "kenchiku-setsubishi", nameFull: "建築設備士試験（第一次試験）", urlSlug: "kenchiku-setsubishi", level: "specialist",

    sessions: [

        { session: "am1", urlSlug: "am1", expectedQuestions: 27, label: "建築一般知識", categories: ["建築一般知識"] },

        { session: "am2", urlSlug: "am2", expectedQuestions: 18, label: "建築法規", categories: ["建築法規"] },

        { session: "pm", urlSlug: "pm", expectedQuestions: 60, label: "建築設備", categories: ["建築設備"] },

    ],

    seasons: ["annual"], yearRange: { start: 2022, end: 2026 },

},
  chizai2: {

    code: "chizai2", nameFull: "知的財産管理技能検定2級", urlSlug: "chizai2", level: "advanced",

    sessions: [

        { session: "gakka", urlSlug: "gakka", expectedQuestions: 40, label: "学科", categories: ["知的財産管理技能検定2級"] },

        { session: "practical", urlSlug: "practical", expectedQuestions: 40, label: "実技", categories: ["知的財産管理技能検定2級"] },

    ],

    seasons: ["spring", "july"], yearRange: { start: 2026, end: 2026 },

},
  kisho: { code: "kisho", nameFull: "気象予報士試験", urlSlug: "kisho", level: "specialist",

    sessions: [{ session: "ippan", urlSlug: "ippan", expectedQuestions: 15, label: "学科一般", categories: ["学科一般"] },

        { session: "senmon", urlSlug: "senmon", expectedQuestions: 15, label: "学科専門", categories: ["学科専門"] },
  { session: "pm1", urlSlug: "pm1", expectedQuestions: 4, label: "実技1", categories: ["実技1"] },
  { session: "pm2", urlSlug: "pm2", expectedQuestions: 4, label: "実技2", categories: ["実技2"] },],

    seasons: ["first", "second"], yearRange: { start: 2022, end: 2026 } },
  "jidosha-1-small-written": {

    code: "jidosha-1-small-written", nameFull: "一級小型自動車整備士（筆記）", urlSlug: "jidosha-1-small-written", level: "specialist",

    sessions: [{ session: "gakka", urlSlug: "gakka", expectedQuestions: 50, label: "学科", categories: ["一級小型自動車（筆記）"] }],

    seasons: ["first", "second"], yearRange: { start: 2022, end: 2026 },

},
  "jidosha-2-gasoline": {

    code: "jidosha-2-gasoline", nameFull: "二級ガソリン自動車整備士", urlSlug: "jidosha-2-gasoline", level: "specialist",

    sessions: [{ session: "gakka", urlSlug: "gakka", expectedQuestions: 40, label: "学科", categories: ["二級ガソリン自動車"] }],

    seasons: ["first", "second"], yearRange: { start: 2022, end: 2026 },

},
  "jidosha-2-diesel": {

    code: "jidosha-2-diesel", nameFull: "二級ジーゼル自動車整備士", urlSlug: "jidosha-2-diesel", level: "specialist",

    sessions: [{ session: "gakka", urlSlug: "gakka", expectedQuestions: 40, label: "学科", categories: ["二級ジーゼル自動車"] }],

    seasons: ["first", "second"], yearRange: { start: 2022, end: 2026 },

},
  "jidosha-2-chassis": {

    code: "jidosha-2-chassis", nameFull: "二級自動車シャシ整備士", urlSlug: "jidosha-2-chassis", level: "specialist",

    sessions: [{ session: "gakka", urlSlug: "gakka", expectedQuestions: 30, label: "学科", categories: ["二級自動車シャシ"] }],

    seasons: ["first", "second"], yearRange: { start: 2022, end: 2026 },

},
  "jidosha-2-motorcycle": {

    code: "jidosha-2-motorcycle", nameFull: "二級二輪自動車整備士", urlSlug: "jidosha-2-motorcycle", level: "specialist",

    sessions: [{ session: "gakka", urlSlug: "gakka", expectedQuestions: 40, label: "学科", categories: ["二級２輪自動車"] }],

    seasons: ["first", "second"], yearRange: { start: 2022, end: 2026 },

},
  "jidosha-3-chassis": {

    code: "jidosha-3-chassis", nameFull: "三級自動車シャシ整備士", urlSlug: "jidosha-3-chassis", level: "specialist",

    sessions: [{ session: "gakka", urlSlug: "gakka", expectedQuestions: 30, label: "学科", categories: ["三級自動車シャシ"] }],

    seasons: ["first", "second"], yearRange: { start: 2022, end: 2026 },

},
  "jidosha-3-gasoline": {

    code: "jidosha-3-gasoline", nameFull: "三級自動車ガソリン・エンジン整備士", urlSlug: "jidosha-3-gasoline", level: "specialist",

    sessions: [{ session: "gakka", urlSlug: "gakka", expectedQuestions: 30, label: "学科", categories: ["三級自動車ガソリン・エンジン"] }],

    seasons: ["first", "second"], yearRange: { start: 2022, end: 2026 },

},
  "jidosha-3-diesel": {

    code: "jidosha-3-diesel", nameFull: "三級自動車ジーゼル・エンジン整備士", urlSlug: "jidosha-3-diesel", level: "specialist",

    sessions: [{ session: "gakka", urlSlug: "gakka", expectedQuestions: 30, label: "学科", categories: ["三級自動車ジーゼル・エンジン"] }],

    seasons: ["first", "second"], yearRange: { start: 2022, end: 2026 },

},
  "jidosha-3-motorcycle": {

    code: "jidosha-3-motorcycle", nameFull: "三級二輪自動車整備士", urlSlug: "jidosha-3-motorcycle", level: "specialist",

    sessions: [{ session: "gakka", urlSlug: "gakka", expectedQuestions: 30, label: "学科", categories: ["三級２輪自動車"] }],

    seasons: ["first", "second"], yearRange: { start: 2022, end: 2026 },

},
  "jidosha-body": {

    code: "jidosha-body", nameFull: "自動車車体整備士", urlSlug: "jidosha-body", level: "specialist",

    sessions: [{ session: "gakka", urlSlug: "gakka", expectedQuestions: 40, label: "学科", categories: ["自動車車体"] }],

    seasons: ["first", "second"], yearRange: { start: 2022, end: 2026 },

},
  "jidosha-electrical": {

    code: "jidosha-electrical", nameFull: "自動車電気装置整備士", urlSlug: "jidosha-electrical", level: "specialist",

    sessions: [{ session: "gakka", urlSlug: "gakka", expectedQuestions: 40, label: "学科", categories: ["自動車電気装置"] }],

    seasons: ["first", "second"], yearRange: { start: 2022, end: 2026 },

},
  "biyoshi": { code: "biyoshi", nameFull: "美容師", urlSlug: "biyoshi", level: "basic", sessions: [{ session: "gakka", urlSlug: "gakka", expectedQuestions: 55, label: "筆記", categories: ["美容師筆記"] }], seasons: ["first", "second"], yearRange: { start: 2022, end: 2026 } },
  "kikenbutsu-otsu1": { code: "kikenbutsu-otsu1", nameFull: "危険物取扱者 乙種第1類", urlSlug: "kikenbutsu-otsu1", level: "basic", sessions: [{ session: "gakka", urlSlug: "gakka", expectedQuestions: 10, label: "筆記", categories: ["危険物の性質・火災予防・消火"] }], seasons: ["published"], yearRange: { start: 2025, end: 2026 } },
  "kikenbutsu-otsu2": { code: "kikenbutsu-otsu2", nameFull: "危険物取扱者 乙種第2類", urlSlug: "kikenbutsu-otsu2", level: "basic", sessions: [{ session: "gakka", urlSlug: "gakka", expectedQuestions: 10, label: "筆記", categories: ["危険物の性質並びにその火災予防及び消火の方法"] }], seasons: ["published"], yearRange: { start: 2026, end: 2026 } },
  "kikenbutsu-otsu6": { code: "kikenbutsu-otsu6", nameFull: "危険物取扱者 乙種第6類", urlSlug: "kikenbutsu-otsu6", level: "basic", sessions: [{ session: "gakka", urlSlug: "gakka", expectedQuestions: 10, label: "筆記", categories: ["危険物の性質・火災予防・消火"] }], seasons: ["published"], yearRange: { start: 2026, end: 2026 } },
  jokaso: {

    code: "jokaso", nameFull: "浄化槽管理士試験", urlSlug: "jokaso", level: "basic",

    sessions: [

        { session: "am", urlSlug: "am", expectedQuestions: 40, label: "午前", categories: ["浄化槽概論", "浄化槽行政", "浄化槽の構造及び機能", "浄化槽工事概論"] },

        { session: "pm", urlSlug: "pm", expectedQuestions: 40, label: "午後", categories: ["浄化槽の点検、調整及び修理", "水質管理", "浄化槽の清掃概論"] },

    ], seasons: ["annual"], yearRange: { start: 2025, end: 2026 },

},
  "iji-shuzen": {

    code: "iji-shuzen", nameFull: "マンション維持修繕技術者", urlSlug: "iji-shuzen", level: "advanced",

    sessions: [{ session: "gakka", urlSlug: "gakka", expectedQuestions: 47, label: "択一式・記述式", categories: ["維持修繕技術", "関連法令", "記述式"] }],

    seasons: ["annual"], yearRange: { start: 2022, end: 2026 },

},
  denki1: {
    code: "denki1", nameFull: "1級電気工事施工管理技術検定（第一次検定）", urlSlug: "sekou-1denki", level: "advanced",
    sessions: [{ session: "gakka", urlSlug: "gakka", expectedQuestions: 89, label: "第一次検定",
            categories: ["電気工学等（必須）", "電気工学等（選択）", "電気設備（選択）", "関連分野（選択）", "第一次検定（午前必須）", "施工管理法（必須）", "施工管理法・応用能力（必須）", "施工管理法（選択）", "法規（選択）"],
        }],
    seasons: ["annual"], yearRange: { start: 2021, end: 2026 },
},
  shuwa: {

    code: "shuwa", nameFull: "手話通訳士（学科試験）", urlSlug: "shuwa", level: "specialist",

    sessions: [

        { session: "mondai-a", urlSlug: "mondai-a", expectedQuestions: 20, label: "障害者福祉の基礎知識", categories: ["障害者福祉の基礎知識"] },

        { session: "mondai-b", urlSlug: "mondai-b", expectedQuestions: 20, label: "聴覚障害者に関する基礎知識", categories: ["聴覚障害者に関する基礎知識"] },

        { session: "mondai-c", urlSlug: "mondai-c", expectedQuestions: 20, label: "手話通訳のあり方", categories: ["手話通訳のあり方"] },

        { session: "mondai-d", urlSlug: "mondai-d", expectedQuestions: 20, label: "国語", categories: ["国語"] },

    ],

    seasons: ["annual"], yearRange: { start: 2022, end: 2026 },

},
  "reform-mgr": { code: "reform-mgr", nameFull: "マンションリフォームマネジャー学科試験", urlSlug: "reform-mgr", level: "specialist", sessions: [{ session: "gakka", urlSlug: "gakka", expectedQuestions: 50, label: "学科（未公開）", categories: ["??"] }], seasons: ["annual"], yearRange: { start: 2022, end: 2026 } },
  "shohi-sodan": { code: "shohi-sodan", nameFull: "消費生活相談員資格試験（マークシート部分）", urlSlug: "shohi-sodan", level: "specialist", sessions: [{ session: "gakka", urlSlug: "gakka", expectedQuestions: 160, label: "マークシート式試験", categories: ["消費生活相談"] }], seasons: ["annual"], yearRange: { start: 2022, end: 2025 } },
  jobpass3: {
    code: "jobpass3", nameFull: "ビジネス能力検定 ジョブパス 3級", urlSlug: "jobpass3", level: "basic",
    sessions: [{ session: "gakka", urlSlug: "gakka", expectedQuestions: 35, label: "3級（ペーパー方式）", categories: ["ビジネス常識", "時事・社会", "組織・業務基本", "コミュニケーション手法"] }],
    seasons: ["early",
  "late",], yearRange: { start: 2022, end: 2025 },
},
  "jken-katsuyo1": {

    code: "jken-katsuyo1", nameFull: "情報検定（J検）情報活用1級", urlSlug: "jken-katsuyo1", level: "basic",

    sessions: [{ session: "gakka", urlSlug: "gakka", expectedQuestions: 43, label: "情報活用1級", categories: ["情報と情報の利用", "パソコンを利用したシステム", "ネットワークの利用", "情報ネットワーク社会への対応", "情報セキュリティ", "表計算ソフト等を利用した問題解決"] }],

    seasons: ["first", "second"], yearRange: { start: 2022, end: 2026 },

},
  "jken-katsuyo2": {

    code: "jken-katsuyo2", nameFull: "情報検定（J検）情報活用2級", urlSlug: "jken-katsuyo2", level: "basic",

    sessions: [{ session: "gakka", urlSlug: "gakka", expectedQuestions: 50, label: "情報活用2級", categories: ["経営戦略とシステム戦略", "プロジェクトマネジメント", "データ構造と情報表現", "問題解決処理手順", "パソコンの基礎", "インターネットの基礎", "アプリケーションソフトの利用"] }],

    seasons: ["first", "second"], yearRange: { start: 2022, end: 2026 },

},
  "jken-katsuyo3": {

    code: "jken-katsuyo3", nameFull: "情報検定（J検）情報活用3級", urlSlug: "jken-katsuyo3", level: "basic",

    sessions: [{ session: "gakka", urlSlug: "gakka", expectedQuestions: 46, label: "情報活用3級", categories: ["情報表現と処理手順", "パソコンの基礎", "インターネットの基礎", "インターネットの利用", "情報機器の基本操作", "情報社会とコンピュータ", "情報モラル"] }],

    seasons: ["first", "second"], yearRange: { start: 2022, end: 2026 },

},
  jobpass: {
    code: "jobpass", nameFull: "ビジネス能力検定 ジョブパス2級", urlSlug: "jobpass", level: "basic",
    sessions: [{ session: "gakka", urlSlug: "gakka", expectedQuestions: 35, label: "2級・ペーパー方式", categories: ["ビジネス常識", "時事・社会", "組織・業務基本", "コミュニケーション手法"] },
  {
        session: "gakka-II", urlSlug: "gakka-II", expectedQuestions: 35, label: "2級",
        categories: ["ビジネス常識", "時事・社会", "組織・業務基本", "コミュニケーション手法"],
    },],
    seasons: ["early",
  "second", "first",], yearRange: { start: 2022, end: 2026 },
},
  "zensho-financial-statement-analysis": {
    code: "zensho-financial-statement-analysis", nameFull: "全商財務諸表分析検定", urlSlug: "zensho-financial-statement-analysis", level: "basic",
    sessions: [{ session: "gakka", urlSlug: "gakka", expectedQuestions: 5, label: "学科",
      categories: ["財務諸表分析"] }],
    seasons: ["annual"], yearRange: { start: 2022, end: 2025 },
},
  "jken-system": {

    code: "jken-system", nameFull: "情報検定（J検）情報システム試験", urlSlug: "jken-system", level: "basic",

    sessions: [

        { session: "jken-basic", urlSlug: "basic", expectedQuestions: 41, label: "基本スキル", categories: ["基本スキル"] },

        { session: "jken-programming", urlSlug: "programming", expectedQuestions: 32, label: "プログラミングスキル", categories: ["プログラミングスキル"] },

        { session: "jken-design", urlSlug: "design", expectedQuestions: 40, label: "システムデザインスキル", categories: ["システムデザインスキル"] },

    ],

    seasons: ["late", "early"], yearRange: { start: 2022, end: 2026 },

},
  shinrishi: {
    code: "shinrishi", nameFull: "公認心理師試験", urlSlug: "shinrishi", level: "basic",
    sessions: [

        { session: "am", urlSlug: "am", expectedQuestions: 77, label: "午前", categories: ["公認心理師"] },

        { session: "pm", urlSlug: "pm", expectedQuestions: 77, label: "午後", categories: ["公認心理師"] },

    ],
    seasons: ["annual"], yearRange: { start: 2022, end: 2026 },
},
  "khk-reito-3": {

    code: "khk-reito-3", nameFull: "高圧ガス製造保安責任者試験（第三種冷凍機械）", urlSlug: "khk-reito-3", level: "advanced",

    sessions: [

        { session: "houki", urlSlug: "houki", expectedQuestions: 20, label: "法令", categories: ["法令"] },

        { session: "hoan", urlSlug: "hoan", expectedQuestions: 15, label: "保安管理技術", categories: ["保安管理技術"] },

    ],

    seasons: ["annual"], yearRange: { start: 2023, end: 2026 },

},
  "khk-reito-2": {

    code: "khk-reito-2", nameFull: "高圧ガス製造保安責任者試験（第二種冷凍機械）", urlSlug: "khk-reito-2", level: "advanced",

    sessions: [

        { session: "houki", urlSlug: "houki", expectedQuestions: 20, label: "法令", categories: ["法令"] },

        { session: "hoan", urlSlug: "hoan", expectedQuestions: 10, label: "保安管理技術", categories: ["保安管理技術"] },

        { session: "kogaku", urlSlug: "kogaku", expectedQuestions: 10, label: "学識", categories: ["学識"] },

    ],

    seasons: ["annual"], yearRange: { start: 2024, end: 2026 },

},
  "khk-reito-1": {

    code: "khk-reito-1", nameFull: "高圧ガス製造保安責任者試験（第一種冷凍機械）", urlSlug: "khk-reito-1", level: "advanced",

    sessions: [

        { session: "houki", urlSlug: "houki", expectedQuestions: 20, label: "法令", categories: ["法令"] },

        { session: "hoan", urlSlug: "hoan", expectedQuestions: 15, label: "保安管理技術", categories: ["保安管理技術"] },

        { session: "kogaku", urlSlug: "kogaku", expectedQuestions: 5, label: "学識", categories: ["学識"] },

    ],

    seasons: ["annual"], yearRange: { start: 2024, end: 2026 },

},
  "sekou-kenchiku2": {
    code: "sekou-kenchiku2",
    nameFull: "2級建築施工管理技術検定（第一次検定）",
    urlSlug: "sekou-kenchiku2",
    level: "basic",
    sessions: [{ session: "gakka", urlSlug: "gakka", expectedQuestions: 50,

            label: "第一次検定",

            categories: ["建築学等（必須）", "建築学等（選択）", "共通（必須）", "施工（選択）", "施工管理法（必須）", "施工管理法・能力問題（必須）", "法規（選択）"],

        }],
    seasons: ["early", "late"],
    yearRange: { start: 2021, end: 2026 },
},
  denki2: {
    code: "denki2", nameFull: "2級電気工事施工管理技術検定（第一次検定）", urlSlug: "sekou-2denki", level: "basic",
    sessions: [{ session: "gakka", urlSlug: "gakka", expectedQuestions: 62, label: "第一次検定",

            categories: ["電気工学等（必須）", "電気工学等（選択）", "電気設備（選択）", "関連分野（選択）", "施工管理法（必須）", "施工管理法・能力（必須）", "施工管理法（選択）", "法規（選択）"],

        },
  { session: "jitsumu", urlSlug: "jitsumu", expectedQuestions: 8, label: "第二次検定（公式正答付き）", categories: ["電気工事", "法規"] },],
    seasons: ["early", "late"], yearRange: { start: 2021, end: 2026 },
},
  kankoji1: {

    code: "kankoji1", nameFull: "1級管工事施工管理技術検定（第一次検定）", urlSlug: "kankoji1", level: "advanced",

    sessions: [

        { session: "mondai-a", urlSlug: "mondai-a", expectedQuestions: 44, label: "第一次検定 問題A", categories: ["一般基礎（必須）", "空調・衛生設備（選択）", "設備機器・材料（必須）"] },

        { session: "mondai-b", urlSlug: "mondai-b", expectedQuestions: 29, label: "第一次検定 問題B", categories: ["施工管理法（必須）", "法規（選択）", "施工管理法・応用能力（必須）"] },

    ],

    seasons: ["september"], yearRange: { start: 2026, end: 2026 },

},
  "yamaguchi-chori": {

    code: "yamaguchi-chori", nameFull: "調理師", urlSlug: "yamaguchi-chori", level: "basic",

    sessions: [{ session: "gakka", urlSlug: "gakka", expectedQuestions: 60, label: "学科", categories: ["公衆衛生学", "食品学", "栄養学", "食品衛生学", "調理理論", "食文化概論"] }],

    seasons: ["annual"], yearRange: { start: 2022, end: 2026 },

},
  "yamaguchi-seika": {

    code: "yamaguchi-seika", nameFull: "製菓衛生師", urlSlug: "yamaguchi-seika", level: "basic",

    sessions: [

        { session: "gakka", urlSlug: "gakka", expectedQuestions: 57, label: "学科共通", categories: ["衛生法規", "公衆衛生学", "食品学", "食品衛生学", "栄養学", "製菓理論"] },

        { session: "wagashi", urlSlug: "wagashi", expectedQuestions: 3, label: "製菓実技・和菓子（選択）", categories: ["製菓実技・和菓子"] },

        { session: "yogashi", urlSlug: "yogashi", expectedQuestions: 3, label: "製菓実技・洋菓子（選択）", categories: ["製菓実技・洋菓子"] },

        { session: "seipan", urlSlug: "seipan", expectedQuestions: 3, label: "製菓実技・製パン（選択）", categories: ["製菓実技・製パン"] },

    ],

    seasons: ["annual"], yearRange: { start: 2025, end: 2026 },

},
  "yamaguchi-fugu": {

    code: "yamaguchi-fugu", nameFull: "ふぐ処理師（学科）", urlSlug: "yamaguchi-fugu", level: "basic",

    sessions: [{ session: "gakka", urlSlug: "gakka", expectedQuestions: 100, label: "学科", categories: ["衛生法規", "食品衛生学", "ふぐに関する知識"] }],

    seasons: ["annual"], yearRange: { start: 2022, end: 2026 },

},
  "keiryoshi": {
    "code": "keiryoshi",
    "nameFull": "一般計量士国家試験",
    "urlSlug": "keiryoshi",
    "level": "specialist",
    "sessions": [

        {

            "session": "measurement-basic",

            "urlSlug": "measurement-basic",

            "expectedQuestions": 25,

            "label": "計量に関する基礎知識",

            "categories": [

                "一基"

            ]

        },

        {

            "session": "measurement-mass",

            "urlSlug": "measurement-mass",

            "expectedQuestions": 25,

            "label": "計量器概論及び質量の計量",

            "categories": [

                "計質"

            ]

        },

        {

            "session": "houki",

            "urlSlug": "houki",

            "expectedQuestions": 25,

            "label": "計量関係法規",

            "categories": [

                "法規"

            ]

        },

        {

            "session": "measurement-management",

            "urlSlug": "measurement-management",

            "expectedQuestions": 25,

            "label": "計量管理概論",

            "categories": [

                "管理"

            ]

        }

    ],
    "seasons": [

        "annual"

    ],
    "yearRange": { start: 2024, end: 2025 }
},
  "keiryoshi-nodo": {
    "code": "keiryoshi-nodo",
    "nameFull": "環境計量士（濃度関係）国家試験",
    "urlSlug": "keiryoshi-nodo",
    "level": "specialist",
    "sessions": [

        {

            "session": "measurement-chemistry",

            "urlSlug": "measurement-chemistry",

            "expectedQuestions": 25,

            "label": "環境計量に関する基礎知識（化学）",

            "categories": [

                "環化"

            ]

        },

        {

            "session": "measurement-concentration",

            "urlSlug": "measurement-concentration",

            "expectedQuestions": 25,

            "label": "化学分析概論及び濃度の計量",

            "categories": [

                "環濃"

            ]

        },

        {

            "session": "houki",

            "urlSlug": "houki",

            "expectedQuestions": 25,

            "label": "計量関係法規",

            "categories": [

                "法規"

            ]

        },

        {

            "session": "measurement-management",

            "urlSlug": "measurement-management",

            "expectedQuestions": 25,

            "label": "計量管理概論",

            "categories": [

                "管理"

            ]

        }

    ],
    "seasons": [

        "annual"

    ],
    "yearRange": { start: 2024, end: 2025 }
},
  "keiryoshi-soon": {
    "code": "keiryoshi-soon",
    "nameFull": "環境計量士（騒音・振動関係）国家試験",
    "urlSlug": "keiryoshi-soon",
    "level": "specialist",
    "sessions": [

        {

            "session": "measurement-physics",

            "urlSlug": "measurement-physics",

            "expectedQuestions": 25,

            "label": "環境計量に関する基礎知識（物理）",

            "categories": [

                "環物"

            ]

        },

        {

            "session": "measurement-sound",

            "urlSlug": "measurement-sound",

            "expectedQuestions": 25,

            "label": "音響・振動概論並びに音圧レベル及び振動加速度レベルの計量",

            "categories": [

                "環音"

            ]

        },

        {

            "session": "houki",

            "urlSlug": "houki",

            "expectedQuestions": 25,

            "label": "計量関係法規",

            "categories": [

                "法規"

            ]

        },

        {

            "session": "measurement-management",

            "urlSlug": "measurement-management",

            "expectedQuestions": 25,

            "label": "計量管理概論",

            "categories": [

                "管理"

            ]

        }

    ],
    "seasons": [

        "annual"

    ],
    "yearRange": { start: 2024, end: 2025 }
},
  kenki2: {

    code: "kenki2", nameFull: "2級建設機械施工管理技術検定（第一次検定）", urlSlug: "kenki2", level: "specialist",

    sessions: [

        { session: "kyotsu", urlSlug: "kyotsu", expectedQuestions: 32, label: "共通科目", categories: ["土木一般", "施工管理", "建設機械一般", "法規"] },

        { session: "kenki-type1", urlSlug: "kenki-type1", expectedQuestions: 20, label: "第1種（ブルドーザ等）", categories: ["第1種（ブルドーザ等）"] },

        { session: "kenki-type2", urlSlug: "kenki-type2", expectedQuestions: 20, label: "第2種（油圧ショベル等）", categories: ["第2種（油圧ショベル等）"] },

        { session: "kenki-type3", urlSlug: "kenki-type3", expectedQuestions: 20, label: "第3種（モータグレーダ）", categories: ["第3種（モータグレーダ）"] },

        { session: "kenki-type4", urlSlug: "kenki-type4", expectedQuestions: 20, label: "第4種（締固め機械）", categories: ["第4種（締固め機械）"] },

        { session: "kenki-type5", urlSlug: "kenki-type5", expectedQuestions: 20, label: "第5種（舗装機械）", categories: ["第5種（舗装機械）"] },

        { session: "kenki-type6", urlSlug: "kenki-type6", expectedQuestions: 20, label: "第6種（基礎工事機械）", categories: ["第6種（基礎工事機械）"] },

    ],

    seasons: ["annual"], yearRange: { start: 2024, end: 2026 },

},
  kenki1: {

    code: "kenki1", nameFull: "1級建設機械施工管理技術検定（第一次検定）", urlSlug: "kenki1", level: "specialist",

    sessions: [{ session: "gakka", urlSlug: "gakka", expectedQuestions: 56, label: "第一次検定", categories: ["土木一般", "施工管理", "建設機械", "法規"] }],

    seasons: ["annual"], yearRange: { start: 2024, end: 2026 },

},
  gyosei: {
    code: "gyosei", nameFull: "行政書士試験", urlSlug: "gyosei", level: "advanced",
    sessions: [{ session: "gakka", urlSlug: "gakka", expectedQuestions: 56, label: "択一式・多肢選択式・記述式（公式公開分）", categories: ["基礎法学", "憲法", "行政法", "民法", "商法・会社法", "基礎知識"] }],
    seasons: ["annual"], yearRange: { start: 2020, end: 2025 },
},
  shihoshoshi: {

    code: "shihoshoshi", nameFull: "司法書士試験（午前・午後の多肢択一式）", urlSlug: "shihoshoshi", level: "specialist",

    sessions: [

        { session: "am", urlSlug: "am", expectedQuestions: 35, label: "午前（多肢択一式）", categories: ["憲法", "民法", "刑法", "会社法・商法"] },

        { session: "pm", urlSlug: "pm", expectedQuestions: 35, label: "午後（多肢択一式）", categories: ["民事訴訟法・民事執行法・民事保全法", "司法書士法", "供託法", "不動産登記法", "商業登記法"] },

    ], seasons: ["annual"], yearRange: { start: 2022, end: 2026 },

},
  "career-consultant": {

    code: "career-consultant", nameFull: "国家資格キャリアコンサルタント試験（学科）", urlSlug: "career-consultant", level: "specialist",

    sessions: [{ session: "gakka", urlSlug: "gakka", expectedQuestions: 50, label: "学科試験", categories: ["キャリアコンサルティングの社会的意義", "キャリアコンサルティングを行うために必要な知識", "キャリアコンサルティングを行うために必要な技能", "キャリアコンサルタントの倫理と行動"] }],

    seasons: ["autumn", "july",
  "march",], yearRange: { start: 2022, end: 2026 },

},
  "kanri-eiyoshi": {

    code: "kanri-eiyoshi", nameFull: "管理栄養士国家試験", urlSlug: "kanri-eiyoshi", level: "specialist",

    sessions: [

        { session: "am", urlSlug: "am", expectedQuestions: 97, label: "午前", categories: ["社会・環境と健康", "人体の構造と機能及び疾病の成り立ち", "食べ物と健康", "基礎栄養学", "応用栄養学"] },

        { session: "pm", urlSlug: "pm", expectedQuestions: 103, label: "午後", categories: ["栄養教育論", "臨床栄養学", "公衆栄養学", "給食経営管理論", "応用力試験"] },

    ], seasons: ["annual"], yearRange: { start: 2026, end: 2026 },

},
  "sogo-ryoko": {

    code: "sogo-ryoko", nameFull: "総合旅行業務取扱管理者", urlSlug: "sogo-ryoko", level: "specialist",

    sessions: [

        { session: "hoki", urlSlug: "hoki", expectedQuestions: 25, label: "旅行業法令", categories: ["旅行業法令"] },

        { session: "yakkan", urlSlug: "yakkan", expectedQuestions: 30, label: "約款", categories: ["約款"] },
  { session: "kokunai", urlSlug: "kokunai", expectedQuestions: 32, label: "国内旅行実務", categories: ["国内旅行実務"] },
  { session: "kaigai", urlSlug: "kaigai", expectedQuestions: 52, label: "海外旅行実務", categories: ["海外旅行実務"] },
  { session: "jitsumu", urlSlug: "jitsumu", expectedQuestions: 32, label: "国内旅行実務", categories: ["国内観光資源", "宿泊", "貸切バス", "フェリー", "国内航空", "旅客鉄道"] },
  { session: "kaigai-jitsumu", urlSlug: "kaigai-jitsumu", expectedQuestions: 52, label: "海外旅行実務", categories: ["国際航空運賃", "旅券・出入国手続", "旅行英語", "海外観光資源", "海外旅行その他の実務"] },

    ], seasons: ["annual"], yearRange: { start: 2022, end: 2026 },

},
  "shiho-tanto": {

    code: "shiho-tanto", nameFull: "司法試験（短答式）", urlSlug: "shiho-tanto", level: "specialist",

    sessions: [

        { session: "constitution", urlSlug: "constitution", expectedQuestions: 20, label: "憲法", categories: ["憲法"] },

        { session: "civil-law", urlSlug: "civil-law", expectedQuestions: 37, label: "民法", categories: ["民法"] },

        { session: "criminal-law", urlSlug: "criminal-law", expectedQuestions: 20, label: "刑法", categories: ["刑法"] },

    ], seasons: ["annual"], yearRange: { start: 2025, end: 2026 },

},
  "yobi-tanto": {

    code: "yobi-tanto", nameFull: "司法試験予備試験（短答式・法律基本科目）", urlSlug: "yobi-tanto", level: "specialist",

    sessions: [

        { session: "constitution", urlSlug: "constitution", expectedQuestions: 12, label: "憲法", categories: ["憲法"] },

        { session: "admin-law", urlSlug: "admin-law", expectedQuestions: 12, label: "行政法", categories: ["行政法"] },

        { session: "civil-law", urlSlug: "civil-law", expectedQuestions: 15, label: "民法", categories: ["民法"] },

        { session: "commercial-law", urlSlug: "commercial-law", expectedQuestions: 15, label: "商法", categories: ["商法"] },

        { session: "civil-procedure", urlSlug: "civil-procedure", expectedQuestions: 15, label: "民事訴訟法", categories: ["民事訴訟法"] },

        { session: "criminal-law", urlSlug: "criminal-law", expectedQuestions: 13, label: "刑法", categories: ["刑法"] },

        { session: "criminal-procedure", urlSlug: "criminal-procedure", expectedQuestions: 13, label: "刑事訴訟法", categories: ["刑事訴訟法"] },
  { session: "ippan", urlSlug: "ippan", expectedQuestions: 43, label: "一般教養科目", categories: ["一般教養科目"] },

    ], seasons: ["annual"], yearRange: { start: 2022, end: 2026 },

},
  sokuryoshiho: {

    code: "sokuryoshiho", nameFull: "測量士補試験", urlSlug: "sokuryoshiho", level: "basic",

    sessions: [{ session: "gakka", urlSlug: "gakka", expectedQuestions: 28, label: "試験問題", categories: ["測量法規", "多角測量", "GNSS測量", "水準測量", "地形測量", "写真測量", "地図編集", "応用測量", "測量法・実務", "測量の基礎", "基準点測量", "地図編集・GIS"] }],

    seasons: ["annual"], yearRange: { start: 2022, end: 2026 },

},
  caremanager: {

    code: "caremanager", nameFull: "介護支援専門員実務研修受講試験", urlSlug: "caremanager", level: "basic",

    sessions: [{ session: "gakka", urlSlug: "gakka", expectedQuestions: 60, label: "試験問題", categories: ["介護支援分野", "保健医療サービスの知識等", "福祉サービスの知識等"] }],

    seasons: ["annual"], yearRange: { start: 2022, end: 2025 },

},
  "kensetsu-kikai-seibi2": {

    code: "kensetsu-kikai-seibi2", nameFull: "技能検定 2級建設機械整備（建設機械整備作業）学科試験", urlSlug: "kensetsu-kikai-seibi2", level: "basic",

    sessions: [{ session: "gakka", urlSlug: "gakka", expectedQuestions: 50, label: "学科（A群 真偽法・B群 多肢択一法）", categories: ["建設機械", "油圧装置", "エンジン", "検査", "加工", "動力伝達", "溶接", "整備", "走行装置", "材料", "電気", "機械要素", "燃料", "材料力学", "製図", "関係法規", "安全衛生", "測定", "表面処理", "潤滑"] }],

    seasons: ["early"], yearRange: { start: 2025, end: 2025 },

},
  "hyoso1": {

    code: "hyoso1", nameFull: "技能検定 1級表装（表具作業）学科試験", urlSlug: "hyoso1", level: "advanced",

    sessions: [{ session: "gakka", urlSlug: "gakka", expectedQuestions: 50, label: "学科（A群 真偽法・B群 多肢択一法）", categories: ["保存・取扱い", "壁装", "安全衛生", "屏風", "工具", "巻物", "建具", "建築", "掛軸", "材料", "色彩", "裏打ち", "製図", "襖", "関係法規"] }],

    seasons: ["early"], yearRange: { start: 2025, end: 2025 },

},
  "tairu2": {

    code: "tairu2", nameFull: "技能検定 2級タイル張り（タイル張り作業）学科試験", urlSlug: "tairu2", level: "basic",

    sessions: [{ session: "gakka", urlSlug: "gakka", expectedQuestions: 50, label: "学科（A群 真偽法・B群 多肢択一法）", categories: ["下地", "仮設工事", "加工", "基礎工事", "墨出し", "安全衛生", "工具", "建築構造", "施工法", "材料", "測量", "白華", "目地", "積算", "色彩", "製図", "試験", "運搬", "関係法規", "養生"] }],

    seasons: ["early"], yearRange: { start: 2025, end: 2025 },

},
  "sekizai1": {

    code: "sekizai1", nameFull: "技能検定 1級石材施工（石張り作業）学科試験", urlSlug: "sekizai1", level: "advanced",

    sessions: [{ session: "gakka", urlSlug: "gakka", expectedQuestions: 50, label: "学科（A群 真偽法・B群 多肢択一法）", categories: ["コンクリート", "下地", "加工", "取付金物", "品質管理", "墨出し", "安全衛生", "工具", "採石", "接着剤", "施工法", "材料", "清掃", "目地", "製図", "関係法規"] }],

    seasons: ["early"], yearRange: { start: 2025, end: 2025 },

},
  "hyoso2": {

    code: "hyoso2", nameFull: "技能検定 2級表装（表具作業）学科試験", urlSlug: "hyoso2", level: "basic",

    sessions: [{ session: "gakka", urlSlug: "gakka", expectedQuestions: 50, label: "学科（A群 真偽法・B群 多肢択一法）", categories: ["壁装", "建具", "工具", "建築", "材料", "色彩", "製図", "関係法規", "安全衛生", "屏風", "裏打ち", "襖", "掛軸", "保存・取扱い"] }],

    seasons: ["early"], yearRange: { start: 2025, end: 2025 },

},
  "shohin-soshoku3": {

    code: "shohin-soshoku3", nameFull: "技能検定 3級商品装飾展示（商品装飾展示作業）学科試験", urlSlug: "shohin-soshoku3", level: "basic",

    sessions: [{ session: "gakka", urlSlug: "gakka", expectedQuestions: 30, label: "学科（真偽法）", categories: ["動線計画", "包装", "商品知識", "安全衛生", "小売業態", "展示器具", "展示材料", "展示計画", "意匠", "照明", "環境配慮", "色彩", "製図", "販売促進", "販売計画", "関係法規", "陳列技法"] }],

    seasons: ["early"], yearRange: { start: 2025, end: 2025 },

},
  "shashin1": {

    code: "shashin1", nameFull: "技能検定 1級写真（肖像写真デジタル作業）学科試験", urlSlug: "shashin1", level: "advanced",

    sessions: [{ session: "gakka", urlSlug: "gakka", expectedQuestions: 50, label: "学科（A群 真偽法・B群 多肢択一法）", categories: ["デジタル基礎", "光・色彩", "写真史", "撮影機器", "照明・露出", "画像処理・出力", "肖像撮影", "関係法規・環境"] }],

    seasons: ["early"], yearRange: { start: 2025, end: 2025 },

},
  "sessaku-kensaku1": {

    code: "sessaku-kensaku1", nameFull: "技能検定 1級切削工具研削（工作機械用切削工具研削作業）学科試験", urlSlug: "sessaku-kensaku1", level: "advanced",

    sessions: [{ session: "gakka", urlSlug: "gakka", expectedQuestions: 50, label: "学科（A群 真偽法・B群 多肢択一法）", categories: ["ジグ", "仕上げ加工", "切削加工", "切削工具", "品質管理", "塑性加工", "安全衛生", "材料", "材料力学", "検査", "機械要素", "測定", "潤滑", "熱処理", "研削加工", "研削工具", "研削油剤", "表面処理", "製図", "試験", "電気"] }],

    seasons: ["early"], yearRange: { start: 2025, end: 2025 },

},
  "tatami1": {

    code: "tatami1", nameFull: "技能検定 1級畳製作（畳製作作業）学科試験", urlSlug: "tatami1", level: "advanced",

    sessions: [{ session: "gakka", urlSlug: "gakka", expectedQuestions: 50, label: "学科（A群 真偽法・B群 多肢択一法）", categories: ["安全衛生", "工具・機械", "建築", "意匠", "採寸", "敷込み", "材料・規格", "管理", "縫製", "製作・補修", "関係法規"] }],

    seasons: ["early"], yearRange: { start: 2025, end: 2025 },

},
  "funmatsu-yakin1": {

    code: "funmatsu-yakin1", nameFull: "技能検定 1級粉末冶金（成形・再圧縮作業）学科試験", urlSlug: "funmatsu-yakin1", level: "advanced",

    sessions: [{ session: "gakka", urlSlug: "gakka", expectedQuestions: 50, label: "学科（A群 真偽法・B群 多肢択一法）", categories: ["サイジング", "原料粉末", "品質管理", "安全衛生", "後処理", "成形", "材料", "潤滑", "焼結", "焼結含油軸受", "熱処理", "粉末冶金基礎", "製図", "製造工程", "試験・測定", "金型"] }],

    seasons: ["early"], yearRange: { start: 2025, end: 2025 },

},
  "nunohaku1": {

    code: "nunohaku1", nameFull: "技能検定 1級布はく縫製（ワイシャツ製造作業）学科試験", urlSlug: "nunohaku1", level: "advanced",

    sessions: [{ session: "gakka", urlSlug: "gakka", expectedQuestions: 50, label: "学科（A群 真偽法・B群 多肢択一法）", categories: ["仕上げ", "型紙・裁断", "安全衛生", "生産管理", "糸・繊維", "縫製", "縫製機器", "織物", "製品・規格", "関係法規", "電気"] }],

    seasons: ["early"], yearRange: { start: 2025, end: 2025 },

},
  "kikinzoku-soshin1": {

    code: "kikinzoku-soshin1", nameFull: "技能検定 1級貴金属装身具製作（貴金属装身具製作作業）学科試験", urlSlug: "kikinzoku-soshin1", level: "advanced",

    sessions: [{ session: "gakka", urlSlug: "gakka", expectedQuestions: 50, label: "学科（A群 真偽法・B群 多肢択一法）", categories: ["ろう付", "塑性加工", "安全衛生", "宝石", "工具", "意匠", "洗浄", "研磨", "表面処理", "装身具", "装飾技法", "製図", "金属材料", "鋳造", "電気"] }],

    seasons: ["early"], yearRange: { start: 2025, end: 2025 },

},
  "shashin3": {

    code: "shashin3", nameFull: "技能検定 3級写真（肖像写真デジタル作業）学科試験", urlSlug: "shashin3", level: "basic",

    sessions: [{ session: "gakka", urlSlug: "gakka", expectedQuestions: 30, label: "学科（真偽法）", categories: ["デジタル基礎", "光・色彩", "写真史", "撮影機器", "照明・露出", "画像処理・出力", "肖像撮影", "関係法規"] }],

    seasons: ["late"], yearRange: { start: 2025, end: 2025 },

},
  "kikinzoku-soshin3": {

    code: "kikinzoku-soshin3", nameFull: "技能検定 3級貴金属装身具製作（貴金属装身具製作作業）学科試験", urlSlug: "kikinzoku-soshin3", level: "basic",

    sessions: [{ session: "gakka", urlSlug: "gakka", expectedQuestions: 30, label: "学科（真偽法）", categories: ["ろう付", "化学", "塑性加工", "安全衛生", "宝石", "工具", "意匠", "洗浄", "研磨", "装身具", "装飾技法", "製図", "金属材料", "鋳造", "電気"] }],

    seasons: ["late"], yearRange: { start: 2025, end: 2025 },

},
  "kikinzoku-soshin2": {

    code: "kikinzoku-soshin2", nameFull: "技能検定 2級貴金属装身具製作（貴金属装身具製作作業）学科試験", urlSlug: "kikinzoku-soshin2", level: "basic",

    sessions: [{ session: "gakka", urlSlug: "gakka", expectedQuestions: 50, label: "学科（A群 真偽法・B群 多肢択一法）", categories: ["装飾技法", "装身具", "工具", "研磨", "塑性加工", "ろう付", "鋳造", "表面処理", "金属材料", "宝石", "意匠", "製図", "電気", "安全衛生"] }],

    seasons: ["early"], yearRange: { start: 2025, end: 2025 },

},
  "tobi1": {"code":"tobi1","nameFull":"技能検定 1級とび（とび作業）学科試験","urlSlug":"tobi1","level":"advanced","sessions":[{"session":"gakka","urlSlug":"gakka","expectedQuestions":50,"label":"学科（A群 真偽法・B群 多肢択一法）","categories":["仮設工事","安全衛生","基礎工事","鉄骨工事","コンクリート工事","解体工事","玉掛け","揚重機","製図","力学","材料","関係法規","工具","建築構造","建設機械","土工事","重量物運搬","曳き家工事","木造工事"]}],"seasons":["early"],"yearRange":{ start: 2023, end: 2025 }},
  "tobi3": {"code":"tobi3","nameFull":"技能検定 3級とび（とび作業）学科試験","urlSlug":"tobi3","level":"basic","sessions":[{"session":"gakka","urlSlug":"gakka","expectedQuestions":30,"label":"学科（真偽法）","categories":["安全衛生","仮設工事","土工事","木造工事","コンクリート工事","解体工事","工具","建設機械","玉掛け","材料","建築構造","関係法規","鉄骨工事","重量物運搬","基礎工事","曳き家工事","揚重機","製図","力学"]}],"seasons":["early"],"yearRange":{ start: 2023, end: 2025 }},
  "kenchiku-daiku1": {"code":"kenchiku-daiku1","nameFull":"技能検定 1級建築大工（大工工事作業）学科試験","urlSlug":"kenchiku-daiku1","level":"advanced","sessions":[{"session":"gakka","urlSlug":"gakka","expectedQuestions":50,"label":"学科（A群 真偽法・B群 多肢択一法）","categories":["建築構造","力学","規矩術","工具","施工計画","仮設工事","測量","接合金物","木造施工","設備","養生","材料","関係法規","安全衛生","基礎工事","仕上げ","建具金物","製図","墨付け"]}],"seasons":["late"],"yearRange":{ start: 2023, end: 2025 }},
  "kenchiku-daiku3": {"code":"kenchiku-daiku3","nameFull":"技能検定 3級建築大工（大工工事作業）学科試験","urlSlug":"kenchiku-daiku3","level":"basic","sessions":[{"session":"gakka","urlSlug":"gakka","expectedQuestions":30,"label":"学科（真偽法）","categories":["建築構造","力学","規矩術","工具","施工計画","仮設工事","測量","接合金物","木造施工","設備","養生","材料","関係法規","安全衛生","基礎工事","仕上げ","建具金物","製図","墨付け"]}],"seasons":["early","late"],"yearRange":{ start: 2023, end: 2025 }},
  "kenchiku-daiku2": {"code":"kenchiku-daiku2","nameFull":"技能検定 2級建築大工（大工工事作業）学科試験","urlSlug":"kenchiku-daiku2","level":"basic","sessions":[{"session":"gakka","urlSlug":"gakka","expectedQuestions":50,"label":"学科（A群 真偽法・B群 多肢択一法）","categories":["建築構造","木造施工","規矩術","工具","施工計画","仮設工事","測量","基礎工事","接合金物","設備","材料","製図","安全衛生","関係法規","力学","仕上げ","墨付け"]}],"seasons":["late"],"yearRange":{ start: 2023, end: 2025 }},
  "shashin2": {

    code: "shashin2", nameFull: "技能検定 2級写真（肖像写真デジタル作業）学科試験", urlSlug: "shashin2", level: "basic",

    sessions: [{ session: "gakka", urlSlug: "gakka", expectedQuestions: 50, label: "学科（A群 真偽法・B群 多肢択一法）", categories: ["写真史", "光・色彩", "レンズ・撮影機材", "照明・露出", "肖像・画像処理", "デジタル基礎", "関係法規・環境"] }],

    seasons: ["early"], yearRange: { start: 2025, end: 2025 },

},
  "kinzoku-netsushori1": {"code":"kinzoku-netsushori1","nameFull":"技能検定 1級金属熱処理（一般熱処理作業）学科試験","urlSlug":"kinzoku-netsushori1","level":"advanced","sessions":[{"session":"gakka","urlSlug":"gakka","expectedQuestions":50,"label":"学科（A群 真偽法・B群 多肢択一法）","categories":["品質管理","安全衛生","材料・加工","材料試験","洗浄・表面硬化","炉・雰囲気","焼入れ・焼戻し","製図・電気","金属組織"]}],"seasons":["early"],"yearRange":{ start: 2023, end: 2025 }},
  "kojo-bankin1": {"code":"kojo-bankin1","nameFull":"技能検定 1級工場板金（曲げ板金作業）学科試験","urlSlug":"kojo-bankin1","level":"advanced","sessions":[{"session":"gakka","urlSlug":"gakka","expectedQuestions":50,"label":"学科（A群 真偽法・B群 多肢択一法）","categories":["せん断","ひずみ取り","切断","品質管理","安全衛生","展開図","工作機械","工具","成形","接合","曲げ加工","材料","材料試験","板取り","測定","絞り加工","表面処理","製図","金型","電気","せん断・穴あけ","展開・板取り","工具・機械","材料・表面処理","溶接・接合","電気・安全衛生"]}],"seasons":["early"],"yearRange":{ start: 2023, end: 2025 }},
  "kenchiku-bankin1": {"code":"kenchiku-bankin1","nameFull":"技能検定 1級建築板金（ダクト板金作業）学科試験","urlSlug":"kenchiku-bankin1","level":"advanced","sessions":[{"session":"gakka","urlSlug":"gakka","expectedQuestions":50,"label":"学科（A群 真偽法・B群 多肢択一法）","categories":["せん断加工","ダクト仕様","ダクト基礎","ダクト支持","ダクト材料","ダクト補強","ダクト附属品","プレス加工","安全衛生","展開・板取り","工具・機械","建築構造","施工管理","曲げ加工","材料力学","測定","溶接・接合","製図","電気","ダクト加工","施工・安全","板金加工","機械的接合"]}],"seasons":["early"],"yearRange":{ start: 2023, end: 2024 }},
  "kenchiku-bankin-duct2": {"code": "kenchiku-bankin-duct2", "nameFull": "技能検定 2級建築板金（ダクト板金作業）学科試験", "urlSlug": "kenchiku-bankin-duct2", "level": "advanced", "sessions": [{"session": "gakka", "urlSlug": "gakka", "expectedQuestions": 50, "label": "学科（A群 真偽法・B群 多肢択一法）", "categories": ["せん断加工", "ダクト仕様", "ダクト加工", "ダクト基礎", "ダクト支持", "ダクト材料", "ダクト測定", "ダクト補強", "ダクト附属品", "プレス加工", "安全衛生", "展開・板取り", "工具・機械", "建築構造", "施工管理", "曲げ加工", "材料力学", "測定", "溶接・接合", "絞り加工", "製図", "電気"]}], "seasons": ["early"], "yearRange": { start: 2023, end: 2024 }},
  "kinzoku-netsushori2": {"code":"kinzoku-netsushori2","nameFull":"技能検定 2級金属熱処理（一般熱処理作業）学科試験","urlSlug":"kinzoku-netsushori2","level":"basic","sessions":[{"session":"gakka","urlSlug":"gakka","expectedQuestions":50,"label":"学科（A群 真偽法・B群 多肢択一法）","categories":["金属組織","材料試験","焼入れ","焼なまし・焼ならし","表面処理","熱処理設備・温度制御","機械工作","鋼材・製図","安全衛生","雰囲気・冷却剤","熱処理欠陥","品質管理"]}],"seasons":["early"],"yearRange":{ start: 2023, end: 2025 }},
  "mekki3": {"code":"mekki3","nameFull":"技能検定 3級めっき（電気めっき作業）学科試験","urlSlug":"mekki3","level":"basic","sessions":[{"session":"gakka","urlSlug":"gakka","expectedQuestions":30,"label":"学科（真偽法）","categories":["電気化学・薬品","前処理・研磨","めっき浴・皮膜","設備・治具","排水・環境","安全衛生","後処理・防食","品質管理・規格","分析・試験","材料・加工"]}],"seasons":["early"],"yearRange":{ start: 2023, end: 2025 }},
  "kagu2": {"code":"kagu2","nameFull":"技能検定 2級家具製作（家具手加工作業）学科試験","urlSlug":"kagu2","level":"basic","sessions":[{"session":"gakka","urlSlug":"gakka","expectedQuestions":50,"label":"学科（A群 真偽法・B群 多肢択一法）","categories":["家具の種類・構造","製図・測定","電気・安全衛生","法令・環境","木材・木質材料","手工具","木工機械・加工","接合・組立て","研磨・塗装"]}],"seasons":["early"],"yearRange":{ start: 2023, end: 2025 }},
  "kagu1": {"code":"kagu1","nameFull":"技能検定 1級家具製作（家具手加工作業）学科試験","urlSlug":"kagu1","level":"advanced","sessions":[{"session":"gakka","urlSlug":"gakka","expectedQuestions":50,"label":"学科（A群 真偽法・B群 多肢択一法）","categories":["家具の種類・構造","製図・測定","電気・安全衛生","木工機械・加工","木材・木質材料","研磨・塗装","手工具","接合・組立て","法令・環境"]}],"seasons":["early"],"yearRange":{ start: 2023, end: 2025 }},
  "flower2": {"code":"flower2","nameFull":"技能検定 2級フラワー装飾（フラワー装飾作業）学科試験","urlSlug":"flower2","level":"basic","sessions":[{"session":"gakka","urlSlug":"gakka","expectedQuestions":50,"label":"学科（A群 真偽法・B群 多肢択一法）","categories":["装飾の歴史・行事","デザイン・色彩","製作技法","植物の分類・性質","資材・工具","水揚げ・品質管理","安全・法規"]}],"seasons":["early"],"yearRange":{ start: 2023, end: 2025 }},
  "kagu3": {"code":"kagu3","nameFull":"技能検定 3級家具製作（家具手加工作業）学科試験","urlSlug":"kagu3","level":"basic","sessions":[{"session":"gakka","urlSlug":"gakka","expectedQuestions":30,"label":"学科（真偽法）","categories":["家具の種類・構造","製図・測定","電気・安全衛生","木材・木質材料","接合・組立て","手工具","木工機械・加工","研磨・塗装"]}],"seasons":["late"],"yearRange":{ start: 2023, end: 2025 }},
  "mekki1": {"code":"mekki1","nameFull":"技能検定 1級めっき（電気めっき作業）学科試験","urlSlug":"mekki1","level":"advanced","sessions":[{"session":"gakka","urlSlug":"gakka","expectedQuestions":50,"label":"学科（A群 真偽法・B群 多肢択一法）","categories":["前処理・研磨","電気化学・薬品","排水・環境","品質管理・規格","安全衛生","めっき浴・皮膜","設備・治具","分析・試験","材料・加工","後処理・防食"]}],"seasons":["early"],"yearRange":{ start: 2023, end: 2025 }},
  "kinzoku-netsushori3": {"code":"kinzoku-netsushori3","nameFull":"技能検定 3級金属熱処理（一般熱処理作業）学科試験","urlSlug":"kinzoku-netsushori3","level":"basic","sessions":[{"session":"gakka","urlSlug":"gakka","expectedQuestions":30,"label":"学科（真偽法）","categories":["品質管理","安全衛生","材料・加工","材料試験","洗浄・表面硬化","炉・雰囲気","焼入れ・焼戻し","製図・電気","金属組織"]}],"seasons":["early"],"yearRange":{ start: 2023, end: 2025 }},
  "kojo-bankin3": {"code":"kojo-bankin3","nameFull":"技能検定 3級工場板金（曲げ板金作業）学科試験","urlSlug":"kojo-bankin3","level":"basic","sessions":[{"session":"gakka","urlSlug":"gakka","expectedQuestions":30,"label":"学科（真偽法）","categories":["せん断","ひずみ取り","品質管理","安全衛生","展開図","工作機械","工具","成形","接合","曲げ加工","材料","板取り","測定","絞り加工","表面処理","製図","金型","電気","せん断・穴あけ","展開・板取り","工具・機械","材料・表面処理","溶接・接合","電気・安全衛生"]}],"seasons":["early"],"yearRange":{ start: 2023, end: 2025 }},
  "kojo-bankin2": {"code":"kojo-bankin2","nameFull":"技能検定 2級工場板金（曲げ板金作業）学科試験","urlSlug":"kojo-bankin2","level":"basic","sessions":[{"session":"gakka","urlSlug":"gakka","expectedQuestions":50,"label":"学科（A群 真偽法・B群 多肢択一法）","categories":["せん断","ひずみ取り","ひずみ矯正","プレス加工","レーザ加工","切断","品質管理","安全衛生","展開図","工作機械","工具","成形","接合","曲げ加工","材料","材料試験","板取り","測定","研削","絞り加工","表面処理","製図","製図・展開","金型","電気","せん断・穴あけ","展開・板取り","工具・機械","材料・表面処理","溶接・接合","電気・安全衛生"]}],"seasons":["early"],"yearRange":{ start: 2023, end: 2025 }},
  "denshi-kiki-kumitate1": {"code": "denshi-kiki-kumitate1", "nameFull": "技能検定 1級電子機器組立て（電子機器組立て作業）学科試験", "urlSlug": "denshi-kiki-kumitate1", "level": "advanced", "sessions": [{"session": "gakka", "urlSlug": "gakka", "expectedQuestions": 50, "label": "学科（A群 真偽法・B群 多肢択一法）", "categories": ["電子部品・回路", "電気理論", "情報処理", "実装・接続", "工作・測定", "品質管理", "材料・製図", "安全衛生", "電子材料", "通信", "計測", "論理回路", "組立て・はんだ付け", "配線・保全", "検査", "工具・加工", "図記号", "シーケンス制御"]}], "seasons": ["early"], "yearRange": { start: 2023, end: 2025 }},
  "denshi-kiki-kumitate3": {"code": "denshi-kiki-kumitate3", "nameFull": "技能検定 3級電子機器組立て（電子機器組立て作業）学科試験", "urlSlug": "denshi-kiki-kumitate3", "level": "basic", "sessions": [{"session": "gakka", "urlSlug": "gakka", "expectedQuestions": 30, "label": "学科（真偽法）", "categories": ["電子部品・回路", "電気理論", "情報処理", "実装・接続", "工作・測定", "品質管理", "材料・製図", "安全衛生", "計測", "電子材料", "論理回路", "配線・保全", "組立て・はんだ付け", "工具・加工", "製図", "通信", "図記号"]}], "seasons": ["early", "late"], "yearRange": { start: 2023, end: 2025 }},
  "tekko2": {"code":"tekko2","nameFull":"技能検定 2級鉄工（製缶作業）学科試験","urlSlug":"tekko2","level":"basic","sessions":[{"session":"gakka","urlSlug":"gakka","expectedQuestions":50,"label":"学科（A群 真偽法・B群 多肢択一法）","categories":["測定・けがき","曲げ・ひずみ矯正","穴あけ・切断","溶接","材料・熱処理","材料試験・品質管理","工作機械・工具","製図・展開","安全衛生・法令","製缶・ボイラー","非破壊検査","電気基礎"]}],"seasons":["early"],"yearRange":{ start: 2023, end: 2025 }},
  "tekko1": {"code":"tekko1","nameFull":"技能検定 1級鉄工（製缶作業）学科試験","urlSlug":"tekko1","level":"advanced","sessions":[{"session":"gakka","urlSlug":"gakka","expectedQuestions":50,"label":"学科（A群 真偽法・B群 多肢択一法）","categories":["測定・けがき","曲げ・ひずみ矯正","穴あけ・切断","溶接","材料・熱処理","材料試験・品質管理","工作機械・工具","製図・展開","安全衛生・法令","製缶・ボイラー","非破壊検査","電気基礎","ガス切断・溶接","ボイラー・圧力容器","品質管理","安全衛生","展開・板取り","穴あけ・機械加工","表面処理・検査","製図","電気"]}],"seasons":["early"],"yearRange":{ start: 2023, end: 2025 }},
  "denshi-kiki-kumitate2": {

    code: "denshi-kiki-kumitate2", nameFull: "技能検定 2級電子機器組立て（電子機器組立て作業）学科試験", urlSlug: "denshi-kiki-kumitate2", level: "basic",

    sessions: [{ session: "gakka", urlSlug: "gakka", expectedQuestions: 50, label: "学科（A群 真偽法・B群 多肢択一法）", categories: ["電子部品", "通信", "電子機器", "電気理論", "組立て作業", "はんだ付け", "工具", "測定", "材料", "製図", "安全衛生", "電子回路", "関係法規", "品質管理"] }],

    seasons: ["early"], yearRange: { start: 2023, end: 2025 },

},
  "kikai-hozen3": {"code":"kikai-hozen3","nameFull":"機械保全技能検定 3級（機械系保全作業 学科）","urlSlug":"kikai-hozen3","level":"basic","sessions":[{"session":"gakka","urlSlug":"gakka","expectedQuestions":30,"label":"学科（真偽法）","categories":["機械一般","電気一般","機械保全法一般","材料一般","安全衛生","機械系保全法"]}],"seasons":["round2","round1"],"yearRange":{ start: 2023, end: 2025 }},
  "kikai-hozen-denki3": {"code":"kikai-hozen-denki3","nameFull":"機械保全技能検定 3級（電気系保全作業 学科）","urlSlug":"kikai-hozen-denki3","level":"basic","sessions":[{"session":"gakka","urlSlug":"gakka","expectedQuestions":30,"label":"学科","categories":["機械一般","電気一般","機械保全法一般","材料一般","安全衛生","電気系保全法"]}],"seasons":["round1","round2"],"yearRange":{ start: 2023, end: 2026 }},
  "toso1": {"code":"toso1","nameFull":"技能検定 1級塗装（建築塗装作業）学科試験","urlSlug":"toso1","level":"advanced","sessions":[{"session":"gakka","urlSlug":"gakka","expectedQuestions":50,"label":"学科（A群 真偽法・B群 多肢択一法）","categories":["塗装の目的","養生・施工","色彩・測色","塗料・乾燥","塗膜試験・欠陥","塗装方法・工具","溶剤・安全衛生","建築材料・構造","素地調整・仕様","研磨・材料"]}],"seasons":["early"],"yearRange":{ start: 2023, end: 2025 }},
  "fujin-kodomofuku2": {"code":"fujin-kodomofuku2","nameFull":"技能検定 2級婦人子供服製造（婦人子供注文服製作作業）学科試験","urlSlug":"fujin-kodomofuku2","level":"basic","sessions":[{"session":"gakka","urlSlug":"gakka","expectedQuestions":50,"label":"学科（A群 真偽法・B群 多肢択一法）","categories":["服装の歴史・様式","繊維・生地","デザイン・色彩","縫製・仕上げ","糸・副資材","安全衛生","製図・採寸","裁断・仮縫い"]}],"seasons":["early"],"yearRange":{ start: 2023, end: 2025 }},
  "fujin-kodomofuku1": {"code":"fujin-kodomofuku1","nameFull":"技能検定 1級婦人子供服製造（婦人子供注文服製作作業）学科試験","urlSlug":"fujin-kodomofuku1","level":"advanced","sessions":[{"session":"gakka","urlSlug":"gakka","expectedQuestions":50,"label":"学科（A群 真偽法・B群 多肢択一法）","categories":["服装の歴史・様式","縫製・仕上げ","繊維・生地","糸・副資材","デザイン・色彩","製図・採寸","安全衛生","裁断・仮縫い"]}],"seasons":["early"],"yearRange":{ start: 2023, end: 2025 }},
  "kikai-hozen-denki1": {"code":"kikai-hozen-denki1","nameFull":"機械保全技能検定 1級（電気系保全作業 学科）","urlSlug":"kikai-hozen-denki1","level":"advanced","sessions":[{"session":"gakka","urlSlug":"gakka","expectedQuestions":50,"label":"学科","categories":["機械一般","電気一般","機械保全法一般","材料一般","安全衛生","電気系保全法","電動機・変圧器","半導体・電子回路","論理回路","測定・診断","開閉器・接点保護","接地・配線","PLC","絶縁・配線","機械要素","油圧・空気圧"]}],"seasons":["round2"],"yearRange":{ start: 2023, end: 2025 }},
  "kikai-hozen-setsubi1": {"code":"kikai-hozen-setsubi1","nameFull":"機械保全技能検定 1級（設備診断作業 学科）","urlSlug":"kikai-hozen-setsubi1","level":"advanced","sessions":[{"session":"gakka","urlSlug":"gakka","expectedQuestions":50,"label":"学科","categories":["機械一般","電気一般","機械保全法一般","材料一般","安全衛生","機械診断","振動診断","非破壊検査","絶縁診断","ひずみ測定","設備保全"]}],"seasons":["round2"],"yearRange":{ start: 2023, end: 2025 }},
  "kikai-hozen1": { code: "kikai-hozen1", nameFull: "機械保全技能検定 1級（機械系保全作業 学科）", urlSlug: "kikai-hozen1", level: "advanced", sessions: [{ session: "gakka", urlSlug: "gakka", expectedQuestions: 50, label: "学科", categories: ["機械一般", "電気一般", "機械保全法一般", "材料一般", "安全衛生", "機械要素", "測定・診断", "潤滑管理", "工作・接合", "油圧・空気圧", "材料・表面処理", "材料力学", "製図"] }], seasons: ["round2"], yearRange: { start: 2023, end: 2024 } },
  "toso2": {"code":"toso2","nameFull":"技能検定 2級塗装（建築塗装作業）学科試験","urlSlug":"toso2","level":"basic","sessions":[{"session":"gakka","urlSlug":"gakka","expectedQuestions":50,"label":"学科（A群 真偽法・B群 多肢択一法）","categories":["塗料・乾燥","塗装方法・工具","色彩・測色","塗膜試験・欠陥","養生・施工","研磨・材料","溶剤・安全衛生","建築材料・構造","素地調整・仕様","塗装の目的"]}],"seasons":["early"],"yearRange":{ start: 2023, end: 2025 }},
  "diecast2": {

    code: "diecast2", nameFull: "技能検定 2級ダイカスト（ホットチャンバダイカスト作業）学科試験", urlSlug: "diecast2", level: "basic",

    sessions: [{ session: "gakka", urlSlug: "gakka", expectedQuestions: 50, label: "学科（A群 真偽法・B群 多肢択一法）", categories: ["鋳造機・油圧", "溶解・溶湯管理", "鋳造方案・充填", "金型・欠陥対策", "検査・品質管理", "材料・熱処理", "機械加工・製図", "電気・安全衛生", "温度測定"] }],

    seasons: ["early"], yearRange: { start: 2025, end: 2025 },

},
  "tetsudo-sharyo2": {

    code: "tetsudo-sharyo2", nameFull: "技能検定 2級鉄道車両製造・整備（機器ぎ装作業）学科試験", urlSlug: "tetsudo-sharyo2", level: "basic",

    sessions: [{ session: "gakka", urlSlug: "gakka", expectedQuestions: 50, label: "学科（A群 真偽法・B群 多肢択一法）", categories: ["鉄道車両・ぎ装", "材料・熱処理", "機械要素・材料力学", "電気基礎", "加工・測定・製図", "品質管理", "安全衛生・法令", "潤滑"] }],

    seasons: ["early"], yearRange: { start: 2025, end: 2025 },

},
  "mekki2": {"code":"mekki2","nameFull":"技能検定 2級めっき（電気めっき作業）学科試験","urlSlug":"mekki2","level":"basic","sessions":[{"session":"gakka","urlSlug":"gakka","expectedQuestions":50,"label":"学科（A群 真偽法・B群 多肢択一法）","categories":["基礎化学","電気化学","安全・環境","排水処理","品質・生産管理","めっき試験","めっき浴・めっき操作","前処理","研磨・機械加工","浴管理・分析","後処理","材料","腐食・防食","設備・電気","前処理・研磨","電気化学・薬品","排水・環境","品質管理・規格","安全衛生","めっき浴・皮膜","設備・治具","分析・試験","材料・加工","後処理・防食"]}],"seasons":["early"],"yearRange":{ start: 2023, end: 2025 }},
  "kikai-hozen": {

    code: "kikai-hozen", nameFull: "機械保全技能検定 2級（機械系保全作業 学科）", urlSlug: "kikai-hozen", level: "basic",

    sessions: [{ session: "gakka", urlSlug: "gakka", expectedQuestions: 50, label: "学科（真偽法25・四肢択一25）", categories: ["機械一般", "電気一般", "機械保全法一般", "材料一般", "安全衛生", "機械系保全法"] }],

    seasons: ["annual"], yearRange: { start: 2023, end: 2025 },

},
  "tobi2": {
  "code": "tobi2",
  "nameFull": "技能検定 2級とび（とび作業）学科試験",
  "urlSlug": "tobi2",
  "level": "basic",
  "sessions": [

    {

      "session": "gakka",

      "urlSlug": "gakka",

      "expectedQuestions": 50,

      "label": "学科（A群 真偽法・B群 多肢択一法）",

      "categories": [

        "安全衛生",

        "仮設工事",

        "土工事",

        "基礎工事",

        "鉄骨工事",

        "コンクリート工事",

        "重量物運搬",

        "曳き家工事",

        "玉掛け",

        "揚重機",

        "製図",

        "力学",

        "工具",

        "建築構造",

        "関係法規",

        "木造工事",

        "材料",

        "解体工事",

        "建設機械"

      ]

    }

  ],
  "seasons": [

    "early"

  ],
  "yearRange": { start: 2023, end: 2024 }
},
  tsukanshi: {

    code: "tsukanshi", nameFull: "通関士試験", urlSlug: "tsukanshi", level: "advanced",

    sessions: [

        { session: "tsukan-law", urlSlug: "tsukan-law", expectedQuestions: 20, label: "通関業法", categories: ["通関業法"] },

        { session: "customs-law", urlSlug: "customs-law", expectedQuestions: 30, label: "関税法等", categories: ["関税法等"] },

        { session: "tsukan-practical", urlSlug: "tsukan-practical", expectedQuestions: 15, label: "通関実務", categories: ["通関実務"] },

    ], seasons: ["annual"], yearRange: { start: 2022, end: 2026 },

},
  "katei-shokumotsu": {
    code: "katei-shokumotsu", nameFull: "全国高等学校家庭科食物調理技術検定", urlSlug: "katei-shokumotsu", level: "basic",
    sessions: [
    { session: "katei-old3", urlSlug: "katei-old3", expectedQuestions: 17, label: "旧3級・筆記", categories: ["旧3級・筆記"] },
    { session: "katei-old2", urlSlug: "katei-old2", expectedQuestions: 20, label: "旧2級・筆記", categories: ["旧2級・筆記"] },
    { session: "shokumotsu-2", urlSlug: "shokumotsu-2", expectedQuestions: 11, label: "2級・筆記", categories: ["食品と栄養", "調理", "食品衛生", "食事計画"] },
    { session: "shokumotsu-pre1", urlSlug: "shokumotsu-pre1", expectedQuestions: 12, label: "準1級・筆記", categories: ["食品と栄養", "調理", "食品衛生", "食事計画"] },
    { session: "shokumotsu-old3", urlSlug: "shokumotsu-old3", expectedQuestions: 12, label: "旧3級・筆記", categories: ["食品と栄養", "調理", "食品衛生", "食事計画"] },
    { session: "shokumotsu-old2", urlSlug: "shokumotsu-old2", expectedQuestions: 11, label: "旧2級・筆記", categories: ["食品と栄養", "調理", "食品衛生", "食事計画"] },
    ],
    seasons: ["early", "late", "annual",],
    yearRange: { start: 2024, end: 2025 },
  },
  "zenkou-pc": {
    code: "zenkou-pc",
    nameFull: "パソコン利用技術検定試験",
    urlSlug: "zenkou-pc",
    level: "basic",
    sessions: [
        { session: "gakka-I", urlSlug: "1-kyu", expectedQuestions: 20, label: "1級・筆記（データベース）", categories: ["データベース", "ハードウェア", "ネットワーク", "情報の表現", "情報と社会"] },
        { session: "gakka-II", urlSlug: "2-kyu", expectedQuestions: 18, label: "2級・筆記（表計算）", categories: ["表計算", "ハードウェア", "情報の表現", "基本操作"] },
        { session: "gakka-III", urlSlug: "3-kyu", expectedQuestions: 20, label: "3級・筆記（ワープロ）", categories: ["ワープロ", "基本操作", "日本語入力"] },
        { session: "pc-practical-1", urlSlug: "1-kyu-jitsugi", expectedQuestions: 5, label: "1級・実技（データベース）", categories: ["データベース"] },
        { session: "pc-practical-2", urlSlug: "2-kyu-jitsugi", expectedQuestions: 1, label: "2級・実技（表計算）", categories: ["表計算"] },
        { session: "pc-practical-3", urlSlug: "3-kyu-jitsugi", expectedQuestions: 1, label: "3級・実技（ワープロ）", categories: ["ワープロ"] },
    ],
    seasons: ["first", "second"],
    yearRange: { start: 2023, end: 2026 },
},
  "zenkou-keisan-gijutsu": {
    code: "zenkou-keisan-gijutsu", nameFull: "計算技術検定試験", urlSlug: "zenkou-keisan-gijutsu", level: "basic",
    sessions: [
    { session: "keisan-1", urlSlug: "keisan-1", expectedQuestions: 13, label: "1級", categories: ["方程式とその応用", "ベクトルと面積・体積", "統計処理"] },
    { session: "keisan-2", urlSlug: "keisan-2", expectedQuestions: 17, label: "2級", categories: ["関数計算", "方程式と不等式", "応用計算"] },
    { session: "keisan-3", urlSlug: "keisan-3", expectedQuestions: 28, label: "3級", categories: ["四則計算", "関数計算", "実務計算"] },
    { session: "keisan-4", urlSlug: "keisan-4", expectedQuestions: 21, label: "4級", categories: ["四則計算", "集計計算", "実務計算"] },
    ],
    seasons: ["early", "late"],
    yearRange: { start: 2023, end: 2026 },
  },
  "katei-hifuku": {
    code: "katei-hifuku", nameFull: "家庭科技術検定・被服製作", urlSlug: "katei-hifuku", level: "basic",
    sessions: [
        { session: "gakka", urlSlug: "gakka", expectedQuestions: 19, label: "被服製作技術検定 2級・筆記", categories: ["被服製作技術検定 2級・筆記"] },
    ],
    seasons: ["annual"], yearRange: { start: 2025, end: 2025 },
},
  "zenkou-joho": {
    code: "zenkou-joho", nameFull: "情報技術検定", urlSlug: "zenkou-joho", level: "basic",
    sessions: [
        { session: "joho-hardware", urlSlug: "joho-hardware", expectedQuestions: 35, label: "1級・ハードウェアの基礎知識", categories: ["1級・ハードウェアの基礎知識"] },
        { session: "joho-programming", urlSlug: "joho-programming", expectedQuestions: 5, label: "1級・プログラミングの基礎知識", categories: ["1級・プログラミングの基礎知識"] },
        { session: "joho-level2", urlSlug: "joho-level2", expectedQuestions: 26, label: "2級・共通＋BASIC/Cの選択", categories: ["2級・共通＋BASIC/Cの選択"] },
        { session: "joho-level3", urlSlug: "joho-level3", expectedQuestions: 32, label: "3級・共通＋BASIC/Cの選択", categories: ["3級・共通＋BASIC/Cの選択"] },
    ],
    seasons: ["early", "late"], yearRange: { start: 2023, end: 2026 },
},
  "saibansho-ippan-dai": {
    code: "saibansho-ippan-dai", nameFull: "裁判所職員採用一般職（裁判所事務官・大卒程度）", urlSlug: "saibansho-ippan-dai", level: "specialist",
    sessions: [
        { session: "kiso", urlSlug: "kiso", expectedQuestions: 30, label: "一次・基礎能力", categories: ["判断推理", "数的推理", "資料解釈", "時事"] },
        { session: "senmon", urlSlug: "senmon", expectedQuestions: 50, label: "一次・専門択一", categories: ["憲法", "民法", "行政法", "刑法", "経済理論"] },
    ], seasons: ["annual"], yearRange: { start: 2023, end: 2026 },
},
  "katei-hoiku": {
    code: "katei-hoiku", nameFull: "全国高等学校家庭科保育技術検定", urlSlug: "katei-hoiku", level: "basic",
    sessions: [{ session: "gakka", urlSlug: "gakka", expectedQuestions: 78, label: "筆記", categories: ["音楽・リズム表現技術", "造形表現技術", "言語表現技術", "家庭看護技術"] }],
    seasons: ["first", "second"], yearRange: { start: 2021, end: 2025 },
},
  "katei-shoku-chori": {
    code: "katei-shoku-chori", nameFull: "全国高等学校家庭科食物調理技術検定", urlSlug: "katei-shoku-chori", level: "basic",
    sessions: [{ session: "gakka", urlSlug: "gakka", expectedQuestions: 59, label: "筆記", categories: ["2級", "準1級", "1級"] }],
    seasons: ["first", "second"], yearRange: { start: 2021, end: 2025 },
},
  "mental-health-management": {
    code: "mental-health-management", nameFull: "メンタルヘルス・マネジメント検定試験", urlSlug: "mental-health-management", level: "basic",
    sessions: [{ session: "gakka", urlSlug: "gakka", expectedQuestions: 3, label: "筆記", categories: ["I種（マスターコース）", "II種（ラインケアコース）", "III種（セルフケアコース）"] }],
    seasons: ["autumn"], yearRange: { start: 2019, end: 2023 },
},
  "building-cleaning-ssw1": {
    code: "building-cleaning-ssw1", nameFull: "ビルクリーニング分野特定技能1号評価試験", urlSlug: "building-cleaning-ssw1", level: "basic",
    sessions: [{ session: "gakka", urlSlug: "gakka", expectedQuestions: 17, label: "筆記", categories: ["清掃用具", "洗剤", "清掃手順", "接客"] }],
    seasons: ["published"], yearRange: { start: 2019, end: 2019 },
},
  "kyoin-osaka": {
    code: "kyoin-osaka", nameFull: "大阪府公立学校教員採用選考テスト", urlSlug: "kyoin-osaka", level: "advanced",
    sessions: [
        { session: "kyotsu", urlSlug: "kyotsu", expectedQuestions: 30, label: "第1次選考 筆答", categories: ["教育課程", "教育法規", "教育施策", "特別支援教育", "生徒指導", "教育心理", "学校安全", "教育史", "教育方法", "数的推理", "英語", "資料解釈", "判断推理"] },
        { session: "senmon", urlSlug: "senmon", expectedQuestions: 30, label: "教科専門（小学校等）", categories: ["国語", "社会", "算数・数学", "理科", "英語", "学習指導要領"] },
    ], seasons: ["annual"], yearRange: { start: 2022, end: 2026 },
},
  "kyoin-tokyo": {
    code: "kyoin-tokyo", nameFull: "東京都公立学校教員採用候補者選考", urlSlug: "kyoin-tokyo", level: "advanced",
    sessions: [
        { session: "kyotsu", urlSlug: "kyotsu", expectedQuestions: 25, label: "教職教養", categories: ["教育法規", "教育史", "教育方法", "生徒指導", "特別支援教育", "教育施策", "教育心理", "教育課程"] },
        { session: "senmon", urlSlug: "senmon", expectedQuestions: 20, label: "専門教養 小学校全科", categories: ["国語", "社会", "算数・数学", "理科", "英語", "図画工作", "家庭科", "体育", "学習指導要領"] },
    ], seasons: ["annual"], yearRange: { start: 2024, end: 2026 },
},
  "cg-creator-basic": {
    code: "cg-creator-basic", nameFull: "CGクリエイター検定 ベーシック", urlSlug: "cg-creator-basic", level: "basic",
    sessions: [{ session: "gakka", urlSlug: "gakka", expectedQuestions: 40, label: "ベーシック",
        categories: ["知的財産権", "モデリング", "マテリアルとレンダリング", "アニメーション", "映像表現", "ライティング", "写真とレタッチ", "デザインと表現", "色彩", "ディジタル画像"] }],
    seasons: ["early", "late"], yearRange: { start: 2025, end: 2026 },
},
  "cg-creator-expert": {
    code: "cg-creator-expert", nameFull: "CGクリエイター検定 エキスパート", urlSlug: "cg-creator-expert", level: "advanced",
    sessions: [{ session: "gakka", urlSlug: "gakka", expectedQuestions: 40, label: "エキスパート",
        categories: ["知的財産権", "モデリング", "マテリアルとレンダリング", "アニメーション", "ライティングとカメラ", "合成", "写真撮影", "映像制作", "映像編集", "リアルタイムCG"] }],
    seasons: ["early", "late"], yearRange: { start: 2025, end: 2026 },
},
  "cg-engineer-basic": {
    code: "cg-engineer-basic", nameFull: "CGエンジニア検定 ベーシック", urlSlug: "cg-engineer-basic", level: "basic",
    sessions: [{ session: "gakka", urlSlug: "gakka", expectedQuestions: 40, label: "ベーシック",
        categories: ["知的財産権", "形状表現", "モデリング", "陰影と影", "反射と照明", "アニメーション", "座標変換", "CGの機器", "ディジタル画像", "画像処理"] }],
    seasons: ["early", "late"], yearRange: { start: 2025, end: 2026 },
},
  "cg-engineer-expert": {
    code: "cg-engineer-expert", nameFull: "CGエンジニア検定 エキスパート", urlSlug: "cg-engineer-expert", level: "advanced",
    sessions: [{ session: "gakka", urlSlug: "gakka", expectedQuestions: 40, label: "エキスパート",
        categories: ["知的財産権", "座標変換", "形状表現", "モデリング", "陰影とレンダリング", "アニメーション", "画像処理", "可視化", "CGの機器とシステム"] }],
    seasons: ["early", "late"], yearRange: { start: 2025, end: 2026 },
},
  "multimedia-kentei-basic": {
    code: "multimedia-kentei-basic", nameFull: "マルチメディア検定 ベーシック", urlSlug: "multimedia-kentei-basic", level: "basic",
    sessions: [{ session: "gakka", urlSlug: "gakka", expectedQuestions: 40, label: "ベーシック",
        categories: ["知的財産権", "ディジタル画像", "マルチメディアの特徴", "マルチメディアの表現", "マルチメディア端末", "インターネットと通信", "インターネットサービス", "インターネットビジネス", "情報セキュリティ", "マルチメディアの活用"] }],
    seasons: ["early", "late"], yearRange: { start: 2025, end: 2026 },
},
  "multimedia-kentei-expert": {
    code: "multimedia-kentei-expert", nameFull: "マルチメディア検定 エキスパート", urlSlug: "multimedia-kentei-expert", level: "advanced",
    sessions: [{ session: "gakka", urlSlug: "gakka", expectedQuestions: 41, label: "エキスパート",
        categories: ["知的財産権", "画像と色", "知覚とヒューマンコンピュータインタラクション", "メディア処理", "コンピュータのしくみ", "インターネット", "情報セキュリティ", "マルチメディアアプリケーション", "インターネットの応用", "マルチメディアの社会活用"] }],
    seasons: ["early", "late"], yearRange: { start: 2025, end: 2026 },
},
  "g-kentei": {
    code: "g-kentei", nameFull: "G検定（ジェネラリスト検定）", urlSlug: "g-kentei", level: "basic",
    sessions: [{ session: "gakka", urlSlug: "gakka", expectedQuestions: 145, label: "公式公開問題",
        categories: ["人工知能とは", "人工知能をめぐる動向", "機械学習の概要", "ディープラーニングの概要", "ディープラーニングの要素技術", "ディープラーニングの応用例", "AIの社会実装に向けて", "AIに必要な数理・統計知識", "AIに関する法律と契約", "AI倫理・AIガバナンス"] }],
    seasons: ["cbt"], yearRange: { start: 2022, end: 2024 },
},
  "kyoto-kentei3": {
    code: "kyoto-kentei3", nameFull: "京都・観光文化検定試験 3級", urlSlug: "kyoto-kentei3", level: "basic",
    sessions: [{
        session: "gakka", urlSlug: "gakka", expectedQuestions: 100, label: "試験問題",
        categories: ["寺社・市街地", "歴史・産業", "行事・習俗", "食文化"],
    }],
    seasons: ["annual", "early", "late"], yearRange: { start: 2018, end: 2022 },
},
  "topik1": {
    code: "topik1", nameFull: "韓国語能力試験 TOPIK I", urlSlug: "topik1", level: "basic",
    sessions: [{
        session: "gakka", urlSlug: "gakka", expectedQuestions: 40, label: "読解",
        categories: ["話題の把握", "語彙・文法", "資料読解", "短文読解", "文章読解", "語順整序"],
    }],
    seasons: ["annual"], yearRange: { start: 2022, end: 2025 },
},
  "apef4": {
    code: "apef4", nameFull: "実用フランス語技能検定試験 4級", urlSlug: "apef4", level: "basic",
    sessions: [{
        session: "gakka", urlSlug: "gakka", expectedQuestions: 56, label: "試験問題",
        categories: ["冠詞", "代名詞", "対話", "動詞の活用", "語順", "前置詞", "描写", "読解", "聞き取り（原稿）"],
    }],
    seasons: ["autumn"], yearRange: { start: 2011, end: 2015 },
},
  "chuken3": {
    code: "chuken3", nameFull: "中国語検定試験 3級", urlSlug: "chuken3", level: "basic",
    sessions: [{
        session: "gakka", urlSlug: "gakka", expectedQuestions: 61, label: "試験問題",
        categories: ["リスニング（原稿）", "発音・声調", "文法・語彙", "語順・翻訳", "長文読解"],
    }],
    seasons: ["march", "round2", "autumn"], yearRange: { start: 2023, end: 2026 },
},
  "biz-career-logistics3": {
    code: "biz-career-logistics3", nameFull: "ビジネス・キャリア検定 3級ロジスティクス管理", urlSlug: "biz-career-logistics3", level: "basic",
    sessions: [{
        session: "gakka", urlSlug: "gakka", expectedQuestions: 40, label: "試験問題",
        categories: ["ロジスティクスの基礎", "物流政策・法令", "物流サービス・品質", "物流システム・輸配送", "在庫管理", "輸送・包装", "物流コスト", "物流情報システム"],
    }],
    seasons: ["early", "late"], yearRange: { start: 2023, end: 2026 },
},
  "khk-hanbai2": {
    code: "khk-hanbai2", nameFull: "高圧ガス販売主任者 第二種", urlSlug: "khk-hanbai2", level: "basic",
    sessions: [
      { session: "houki", urlSlug: "houki", expectedQuestions: 20, label: "法令", categories: ["法令"] },
      { session: "gas-technology", urlSlug: "gas-technology", expectedQuestions: 20, label: "保安管理技術", categories: ["保安管理技術"] },
    ],
    seasons: ["annual"], yearRange: { start: 2022, end: 2026 },
  },
  "kikenbutsu-otsu5": {
    code: "kikenbutsu-otsu5", nameFull: "危険物取扱者 乙種第5類", urlSlug: "kikenbutsu-otsu5", level: "basic",
    sessions: [
      { session: "gakka", urlSlug: "gakka", expectedQuestions: 35, label: "筆記公表問題", categories: ["危険物に関する法令", "基礎的な物理学・化学", "危険物の性質並びにその火災予防及び消火の方法"] },
    ],
    seasons: ["published"], yearRange: { start: 2026, end: 2026 },
  },
  "kikenbutsu-otsu3": {
    code: "kikenbutsu-otsu3", nameFull: "危険物取扱者 乙種第3類", urlSlug: "kikenbutsu-otsu3", level: "basic",
    sessions: [
      { session: "gakka", urlSlug: "gakka", expectedQuestions: 35, label: "筆記公表問題", categories: ["危険物に関する法令", "基礎的な物理学・化学", "危険物の性質並びにその火災予防及び消火の方法"] },
    ],
    seasons: ["published"], yearRange: { start: 2026, end: 2026 },
  },
  "khk-hanbai": {
    code: "khk-hanbai", nameFull: "高圧ガス販売主任者 第一種", urlSlug: "khk-hanbai", level: "basic",
    sessions: [
      { session: "houki", urlSlug: "houki", expectedQuestions: 20, label: "法令", categories: ["法令"] },
      { session: "gas-technology", urlSlug: "gas-technology", expectedQuestions: 20, label: "保安管理技術", categories: ["保安管理技術"] },
    ],
    seasons: ["annual"], yearRange: { start: 2022, end: 2026 },
  },
  "shobo-setsubishi-otsu4": {
    code: "shobo-setsubishi-otsu4", nameFull: "消防設備士 乙種第4類", urlSlug: "shobo-setsubishi-otsu4", level: "basic",
    sessions: [
      { session: "gakka", urlSlug: "gakka", expectedQuestions: 18, label: "筆記公表問題", categories: ["消防関係法令", "電気に関する基礎的知識", "規格・基準"] },
      { session: "practical", urlSlug: "practical", expectedQuestions: 2, label: "実技公表問題", categories: ["実技・鑑別等"] },
    ],
    seasons: ["published"], yearRange: { start: 2026, end: 2026 },
  },
  "shobo-setsubishi-otsu7": {
    code: "shobo-setsubishi-otsu7", nameFull: "消防設備士 乙種第7類", urlSlug: "shobo-setsubishi-otsu7", level: "basic",
    sessions: [
      { session: "gakka", urlSlug: "gakka", expectedQuestions: 16, label: "筆記公表問題", categories: ["消防関係法令", "電気に関する基礎的知識", "規格・基準"] },
      { session: "practical", urlSlug: "practical", expectedQuestions: 1, label: "実技公表問題", categories: ["実技・鑑別等"] },
    ],
    seasons: ["published"], yearRange: { start: 2026, end: 2026 },
  },
  "shobo-setsubishi-kou3": {
    code: "shobo-setsubishi-kou3", nameFull: "消防設備士 甲種第3類", urlSlug: "shobo-setsubishi-kou3", level: "basic",
    sessions: [
      { session: "gakka", urlSlug: "gakka", expectedQuestions: 18, label: "筆記公表問題", categories: ["消防関係法令", "機械の基礎知識", "電気の基礎知識", "構造・機能・整備", "電気に関する基礎的知識", "規格・基準"] },
      { session: "practical", urlSlug: "practical", expectedQuestions: 4, label: "実技公表問題", categories: ["実技・鑑別等", "実技・製図"] },
    ],
    seasons: ["published"], yearRange: { start: 2026, end: 2026 },
  },
  "shobo-setsubishi-kou2": {
    code: "shobo-setsubishi-kou2", nameFull: "消防設備士 甲種第2類", urlSlug: "shobo-setsubishi-kou2", level: "basic",
    sessions: [
      { session: "gakka", urlSlug: "gakka", expectedQuestions: 20, label: "筆記公表問題", categories: ["消防関係法令", "機械の基礎知識", "電気の基礎知識", "構造・機能・整備", "構造・機能・工事・整備", "電気に関する基礎的知識"] },
      { session: "practical", urlSlug: "practical", expectedQuestions: 4, label: "実技公表問題", categories: ["実技・鑑別等", "実技・製図"] },
    ],
    seasons: ["published"], yearRange: { start: 2026, end: 2026 },
  },
  "shobo-setsubishi-kou5": {
    code: "shobo-setsubishi-kou5", nameFull: "消防設備士 甲種第5類", urlSlug: "shobo-setsubishi-kou5", level: "basic",
    sessions: [
      { session: "gakka", urlSlug: "gakka", expectedQuestions: 12, label: "筆記公表問題", categories: ["消防関係法令", "機械の基礎知識", "構造・機能・整備", "規格・基準"] },
      { session: "practical", urlSlug: "practical", expectedQuestions: 6, label: "実技公表問題", categories: ["実技・鑑別等", "実技・製図"] },
    ],
    seasons: ["published"], yearRange: { start: 2026, end: 2026 },
  },
  "gesuido-3shu": {
    code: "gesuido-3shu", nameFull: "下水道技術検定 第3種", urlSlug: "gesuido-3shu", level: "basic",
    sessions: [
      { session: "gakka", urlSlug: "gakka", expectedQuestions: 60, label: "筆記", categories: ["法令", "下水処理", "工場排水", "運転・維持管理", "安全管理"] },
    ],
    seasons: ["annual"], yearRange: { start: 2023, end: 2026 },
  },
  "chori-center": {
    code: "chori-center", nameFull: "調理師試験（共通問題）", urlSlug: "chori-center", level: "basic",
    sessions: [{ session: "gakka", urlSlug: "gakka", expectedQuestions: 60, label: "学科", categories: ["公衆衛生学", "食品学", "栄養学", "食品衛生学", "調理理論", "食文化概論"] }],
    seasons: ["annual"], yearRange: { start: 2022, end: 2025 },
},
  "chori-gunma": {
    code: "chori-gunma", nameFull: "調理師試験（群馬県）", urlSlug: "chori-gunma", level: "basic",
    sessions: [{ session: "gakka", urlSlug: "gakka", expectedQuestions: 60, label: "学科", categories: ["公衆衛生学", "食品学", "栄養学", "食品衛生学", "調理理論", "食文化概論"] }],
    seasons: ["annual"], yearRange: { start: 2022, end: 2026 },
},
  "chori-hokkaido": {
    code: "chori-hokkaido", nameFull: "調理師試験（北海道）", urlSlug: "chori-hokkaido", level: "basic",
    sessions: [{ session: "gakka", urlSlug: "gakka", expectedQuestions: 60, label: "学科", categories: ["公衆衛生学", "食品学", "栄養学", "食品衛生学", "調理理論", "食文化概論"] }],
    seasons: ["annual"], yearRange: { start: 2022, end: 2026 },
},
  "chori-kanagawa": {
    code: "chori-kanagawa", nameFull: "調理師試験（神奈川県）", urlSlug: "chori-kanagawa", level: "basic",
    sessions: [{ session: "gakka", urlSlug: "gakka", expectedQuestions: 60, label: "学科", categories: ["公衆衛生学", "食品学", "栄養学", "食品衛生学", "調理理論", "食文化概論"] }],
    seasons: ["annual", "round2", "round1"], yearRange: { start: 2023, end: 2026 },
},
  "chori-kansai": {
    code: "chori-kansai", nameFull: "調理師試験（関西広域連合）", urlSlug: "chori-kansai", level: "basic",
    sessions: [{ session: "gakka", urlSlug: "gakka", expectedQuestions: 60, label: "学科", categories: ["公衆衛生学", "食品学", "栄養学", "食品衛生学", "調理理論", "食文化概論"] }],
    seasons: ["annual"], yearRange: { start: 2022, end: 2026 },
},
  "chori-nagano": {
    code: "chori-nagano", nameFull: "調理師試験（長野県）", urlSlug: "chori-nagano", level: "basic",
    sessions: [{ session: "gakka", urlSlug: "gakka", expectedQuestions: 60, label: "学科", categories: ["公衆衛生学", "食品学", "栄養学", "食品衛生学", "調理理論", "食文化概論"] }],
    seasons: ["annual"], yearRange: { start: 2024, end: 2026 },
},
  "chori-okinawa": {
    code: "chori-okinawa", nameFull: "調理師試験（沖縄県）", urlSlug: "chori-okinawa", level: "basic",
    sessions: [{ session: "gakka", urlSlug: "gakka", expectedQuestions: 60, label: "学科", categories: ["公衆衛生学", "食品学", "栄養学", "食品衛生学", "調理理論", "食文化概論"] }],
    seasons: ["annual"], yearRange: { start: 2024, end: 2026 },
},
  "chori-shizuoka": {
    code: "chori-shizuoka", nameFull: "調理師試験（静岡県）", urlSlug: "chori-shizuoka", level: "basic",
    sessions: [{ session: "gakka", urlSlug: "gakka", expectedQuestions: 60, label: "学科", categories: ["公衆衛生学", "食品学", "栄養学", "食品衛生学", "調理理論", "食文化概論"] }],
    seasons: ["annual"], yearRange: { start: 2022, end: 2025 },
},
  "chori-tochigi": {
    code: "chori-tochigi", nameFull: "調理師試験（栃木県）", urlSlug: "chori-tochigi", level: "basic",
    sessions: [{ session: "gakka", urlSlug: "gakka", expectedQuestions: 60, label: "学科", categories: ["公衆衛生学", "食品学", "栄養学", "食品衛生学", "調理理論", "食文化概論"] }],
    seasons: ["annual"], yearRange: { start: 2022, end: 2026 },
},
  "dokugeki-kansai": {
  code: "dokugeki-kansai", nameFull: "毒物劇物取扱者試験（関西広域連合）", urlSlug: "dokugeki-kansai", level: "specialist",
  sessions: [
    { session: "dokugeki-ippan", urlSlug: "dokugeki-ippan", expectedQuestions: 50, label: "一般", categories: ["毒物及び劇物に関する法規", "基礎化学", "毒物及び劇物の性質、貯蔵、識別及びその他取扱方法"] },
    { session: "dokugeki-nougyou", urlSlug: "dokugeki-nougyou", expectedQuestions: 50, label: "農業用品目", categories: ["毒物及び劇物に関する法規", "基礎化学", "毒物及び劇物の性質、貯蔵、識別及びその他取扱方法"] },
    { session: "dokugeki-tokutei", urlSlug: "dokugeki-tokutei", expectedQuestions: 50, label: "特定品目", categories: ["毒物及び劇物に関する法規", "基礎化学", "毒物及び劇物の性質、貯蔵、識別及びその他取扱方法"] },
  ],
  seasons: ["annual"], yearRange: { start: 2022, end: 2025 },
},
  "dokugeki-tokyo": {
  code: "dokugeki-tokyo", nameFull: "毒物劇物取扱者試験（東京都）", urlSlug: "dokugeki-tokyo", level: "specialist",
  sessions: [
    { session: "dokugeki-ippan", urlSlug: "dokugeki-ippan", expectedQuestions: 75, label: "一般", categories: ["毒物及び劇物に関する法規", "基礎化学", "毒物及び劇物の性質及び貯蔵その他取扱方法", "毒物及び劇物の識別及び取扱方法"] },
    { session: "dokugeki-nougyou", urlSlug: "dokugeki-nougyou", expectedQuestions: 60, label: "農業用品目", categories: ["毒物及び劇物に関する法規", "基礎化学", "毒物及び劇物の性質及び貯蔵その他取扱方法", "毒物及び劇物の識別及び取扱方法"] },
    { session: "dokugeki-tokutei", urlSlug: "dokugeki-tokutei", expectedQuestions: 60, label: "特定品目", categories: ["毒物及び劇物に関する法規", "基礎化学", "毒物及び劇物の性質及び貯蔵その他取扱方法", "毒物及び劇物の識別及び取扱方法"] },
  ],
  seasons: ["annual"], yearRange: { start: 2026, end: 2026 },
},
  "homusho-senmonshokuin": {
    code: "homusho-senmonshokuin", nameFull: "法務省専門職員（人間科学）採用試験", urlSlug: "homusho-senmonshokuin", level: "advanced",
    sessions: [
        { session: "psychology", urlSlug: "psychology", expectedQuestions: 20, label: "専門試験（矯正心理専門職の必須問題）", categories: ["認知心理学", "学習心理学", "感情心理学", "人格心理学", "心理検査", "発達心理学", "社会心理学", "臨床心理学", "心理統計"] },

      { session: "senmon", urlSlug: "senmon", expectedQuestions: 40, label: "専門試験（法務教官・保護観察官・矯正心理専門職の共通問題）", categories: ["心理学", "教育学", "社会福祉", "社会学"] },
    ], seasons: ["annual"], yearRange: { start: 2025, end: 2026 },
},
  "junkango-b": {
    code: "junkango-b", nameFull: "准看護師試験（B日程）", urlSlug: "junkango-b", level: "specialist",
    sessions: [{
      session: "gakka", urlSlug: "gakka", expectedQuestions: 150, label: "学科",
      categories: ["人体の構造と機能", "栄養", "薬理", "疾病と感染", "保健医療と法規", "看護概論と心理", "基礎看護技術", "成人看護総論", "成人看護", "老年看護", "母子看護", "精神看護"],
    }],
    seasons: ["annual"], yearRange: { start: 2025, end: 2026 },
  },
  "junkango-saitama": {
    code: "junkango-saitama", nameFull: "埼玉県准看護師試験（A日程）", urlSlug: "junkango-saitama", level: "specialist",
    sessions: [{
      session: "gakka", urlSlug: "gakka", expectedQuestions: 150, label: "学科",
      categories: ["人体の構造と機能", "栄養", "薬理", "疾病と感染", "保健医療と法規", "看護概論と心理", "基礎看護技術", "成人看護総論", "成人看護", "老年看護", "母子看護", "精神看護"],
    }],
    seasons: ["annual"], yearRange: { start: 2024, end: 2024 },
  },
  "kokka-ippan-kou": {
    code: "kokka-ippan-kou", nameFull: "国家公務員採用一般職試験（高卒者試験）", urlSlug: "kokka-ippan-kou", level: "basic",
    sessions: [
        { session: "kiso", urlSlug: "kiso", expectedQuestions: 40, label: "基礎能力試験", categories: ["文章理解", "判断推理", "数的推理", "資料解釈", "数学", "物理", "化学", "生物", "地学", "世界史", "日本史", "地理", "国語", "英語", "政治", "経済", "倫理", "情報"] },
        { session: "tekisei", urlSlug: "tekisei", expectedQuestions: 120, label: "適性試験（事務区分）", categories: ["演算記号", "分類表", "正本と副本の照合", "表の計算", "記号・英字の変換", "二つの表の照合", "集計表の計算", "文字の置き換え", "表の照合"] },

      { session: "senmon-gijutsu", urlSlug: "senmon-gijutsu", expectedQuestions: 100, label: "専門試験（技術区分）", categories: ["数学", "物理", "情報", "電気回路", "電子工学", "電気機器", "電力", "電気通信", "機械材料", "機械工作", "生産管理", "機械力学", "材料力学", "機械設計", "流体力学", "熱力学", "電磁気", "構造力学", "水理学", "土質力学", "測量", "コンクリート", "耐震工学", "基礎工学", "施工管理", "道路工学", "河川工学", "都市計画", "建築構造", "建築材料", "建築施工", "建築環境", "建築設備", "建築計画", "建築法規"] },
      { session: "senmon-noson", urlSlug: "senmon-noson", expectedQuestions: 40, label: "専門試験（農業土木区分）", categories: ["構造力学", "材料力学", "水理学", "土質力学", "農地保全", "農地整備", "農村整備", "農村環境", "基礎工学", "コンクリート", "施工管理", "農業水利", "農業排水", "測量", "情報", "土壌肥料", "作物学", "農業気象", "農業政策"] },
      { session: "senmon-ringaku", urlSlug: "senmon-ringaku", expectedQuestions: 40, label: "専門試験（林業区分）", categories: ["森林政策", "森林計測", "林業経営", "森林生態", "治山", "森林土木", "林業機械", "素材生産", "造林", "森林土壌", "森林保護", "測量", "木材利用", "特用林産"] },
    ], seasons: ["annual"], yearRange: { start: 2023, end: 2025 },
},
  "kyoin-gifu": {
    code: "kyoin-gifu", nameFull: "岐阜県公立学校教員採用選考試験", urlSlug: "kyoin-gifu", level: "advanced",
    sessions: [
        { session: "kyotsu", urlSlug: "kyotsu", expectedQuestions: 10, label: "第1次選考 教職教養", categories: ["教育法規", "教育心理", "特別支援教育", "生徒指導"] },
        { session: "senmon", urlSlug: "senmon", expectedQuestions: 20, label: "第1次選考 教科専門（小学校）", categories: ["国語", "社会", "算数・数学", "理科", "技術", "保健体育", "家庭科", "英語", "教育課程"] },
    ], seasons: ["annual"], yearRange: { start: 2025, end: 2025 },
},
  "kyoin-gunma": {
    code: "kyoin-gunma",
    nameFull: "群馬県公立学校教員採用選考試験",
    urlSlug: "kyoin-gunma",
    level: "advanced",
    sessions: [
        {
            session: "kyotsu",
            urlSlug: "kyotsu",
            expectedQuestions: 37,
            label: "一般教養・教職",
            categories: ["国語", "社会", "数学", "理科", "英語", "芸術", "教育法規", "教育心理", "生徒指導", "特別支援教育", "学校保健", "教育施策"],
        },
        {
            session: "senmon",
            urlSlug: "senmon",
            expectedQuestions: 5,
            label: "教科専門（中学校・英語）",
            categories: ["中学校・英語"],
        },
        {
            session: "senmon-ko-eigo",
            urlSlug: "senmon-ko-eigo",
            expectedQuestions: 5,
            label: "教科専門（高等学校・英語）",
            categories: ["高等学校・英語"],
        },
        {
            session: "senmon-chu-shakai",
            urlSlug: "senmon-chu-shakai",
            expectedQuestions: 1,
            label: "教科専門（中学校・社会）",
            categories: ["中学校・社会"],
        },
        {
            session: "senmon-ko-seikei",
            urlSlug: "senmon-ko-seikei",
            expectedQuestions: 5,
            label: "教科専門（高等学校・政治・経済）",
            categories: ["高等学校・政治・経済"],
        },
        {
            session: "senmon-ko-ongaku",
            urlSlug: "senmon-ko-ongaku",
            expectedQuestions: 7,
            label: "教科専門（高等学校・音楽）",
            categories: ["高等学校・音楽"],
        },
    ],
    seasons: ["annual"],
    yearRange: { start: 2022, end: 2025 },
},
  "kyoin-hiroshima": {
    code: "kyoin-hiroshima", nameFull: "広島県・広島市公立学校教員採用候補者選考試験", urlSlug: "kyoin-hiroshima", level: "advanced",
    sessions: [
      { session: "kyotsu", urlSlug: "kyotsu", expectedQuestions: 22, label: "第1次選考 教職教養", categories: ["教育法規", "教育課程", "教育心理", "学習評価", "特別支援教育", "学校保健", "生徒指導"] },
      { session: "senmon", urlSlug: "senmon", expectedQuestions: 59, label: "教科専門（小学校・小学部）", categories: ["小学校専門・国語", "小学校専門・社会", "小学校専門・算数", "小学校専門・理科", "小学校専門・生活", "小学校専門・音楽", "小学校専門・図画工作", "小学校専門・家庭", "小学校専門・体育", "小学校専門・外国語"] },
      { session: "kyoshoku-sho", urlSlug: "kyoshoku-sho", expectedQuestions: 19, label: "教職教養（小学校・養護・栄養）", categories: ["教育法規", "教育課程", "教育心理", "教育原理", "特別支援教育", "学校保健", "生徒指導"] },
      { session: "kyoshoku-chuko", urlSlug: "kyoshoku-chuko", expectedQuestions: 19, label: "教職教養（中学校・高等学校）", categories: ["教育法規", "教育課程", "教育心理", "教育原理", "特別支援教育", "学校保健", "生徒指導"] },
    ],
    seasons: ["annual"], yearRange: { start: 2024, end: 2026 },
  },
  "kyoin-kobe": {
    code: "kyoin-kobe", nameFull: "神戸市立学校園教員採用選考試験", urlSlug: "kyoin-kobe", level: "advanced",
    sessions: [
        { session: "kyotsu", urlSlug: "kyotsu", expectedQuestions: 50, label: "教職・一般教養", categories: ["教育法規", "教育施策", "生徒指導", "教育史", "教育心理", "特別支援教育", "国語", "算数・数学", "社会", "美術", "音楽", "保健体育", "理科", "英語", "技術", "家庭科", "資料解釈", "判断推理", "数的推理"] },
        { session: "senmon", urlSlug: "senmon", expectedQuestions: 76, label: "専門（小学校）", categories: ["教育課程", "国語", "算数・数学", "社会", "理科", "音楽", "美術", "保健体育", "家庭科", "英語"] },
        { session: "senmon-shogakko-eigo", urlSlug: "senmon-shogakko-eigo", expectedQuestions: 73, label: "専門（小学校・英語コースの独自問題）", categories: ["英語"] },
    ], seasons: ["annual"], yearRange: { start: 2022, end: 2026 },
},
  "kyoin-kochi": {
    code: "kyoin-kochi", nameFull: "高知県公立学校教員採用候補者選考審査", urlSlug: "kyoin-kochi", level: "advanced",
    sessions: [
      { session: "kyotsu", urlSlug: "kyotsu", expectedQuestions: 40, label: "第1次 教職・一般教養", categories: ["学習評価", "教育法規", "教育施策", "教育史", "教育心理", "特別支援教育", "教育課程", "生徒指導", "学校保健", "理科", "公民", "地理歴史", "高知の統計", "高知の教育施策"] },
    ],
    seasons: ["annual"], yearRange: { start: 2025, end: 2025 },
  },
  "kyoin-nagano": {
    code: "kyoin-nagano", nameFull: "長野県公立学校教員採用選考", urlSlug: "kyoin-nagano", level: "advanced",
    sessions: [
        { session: "kyotsu", urlSlug: "kyotsu", expectedQuestions: 15, label: "教職教養（小・中・義務・特支）", categories: ["教育法規", "教育課程", "生徒指導", "教育史", "教育施策", "特別支援教育", "教育心理"] },
        { session: "kyotsu-koko", urlSlug: "kyotsu-koko", expectedQuestions: 10, label: "教職教養（高校）", categories: ["教育法規", "教育課程", "学校安全", "生徒指導", "教育施策"] },
        { session: "senmon", urlSlug: "senmon", expectedQuestions: 26, label: "専門教科（小学校）", categories: ["社会", "算数・数学", "理科", "音楽", "図画工作", "家庭科", "英語", "教育課程"] },
        { session: "senmon-shakai", urlSlug: "senmon-shakai", expectedQuestions: 19, label: "専門教科（中学校・社会）", categories: ["地理", "歴史", "公民"] },
        { session: "senmon-sugaku", urlSlug: "senmon-sugaku", expectedQuestions: 14, label: "専門教科（中学校・数学）", categories: ["算数・数学", "教育課程"] },
        { session: "ippan", urlSlug: "ippan", expectedQuestions: 30, label: "一般教養（高校）", categories: ["教育法規", "教育施策", "国語", "社会", "算数・数学", "理科", "英語"] },
    ], seasons: ["annual"], yearRange: { start: 2024, end: 2026 },
},
  "kyoin-nagasaki": {
    code: "kyoin-nagasaki", nameFull: "長崎県公立学校教員採用選考試験", urlSlug: "kyoin-nagasaki", level: "advanced",
    sessions: [
      { session: "kyotsu", urlSlug: "kyotsu", expectedQuestions: 35, label: "第1次 教職教養", categories: ["教育法規", "教育課程", "生徒指導", "教育施策", "人権教育", "教育史", "教育心理"] },
    ],
    seasons: ["annual"], yearRange: { start: 2025, end: 2026 },
  },
  "kyoin-okinawa": {
    code: "kyoin-okinawa", nameFull: "沖縄県公立学校教員候補者選考試験", urlSlug: "kyoin-okinawa", level: "advanced",
    sessions: [
      { session: "am", urlSlug: "am", expectedQuestions: 44, label: "一般教養・教職教養（午前の部）", categories: ["国語", "英語", "地理歴史", "公民", "沖縄の歴史・文化", "理科", "算数・数学", "教育法規", "教育課程", "特別支援教育", "沖縄の教育施策", "教育史", "教育心理", "生徒指導"] },
      { session: "pm", urlSlug: "pm", expectedQuestions: 45, label: "一般教養・教職教養（午後の部）", categories: ["国語", "英語", "地理歴史", "公民", "沖縄の歴史・文化", "理科", "算数・数学", "教育法規", "教育課程", "特別支援教育", "沖縄の教育施策", "教育史", "教育心理", "生徒指導"] },
    ],
    seasons: ["annual"], yearRange: { start: 2025, end: 2026 },
  },
  "kyoin-shimane": {
    code: "kyoin-shimane", nameFull: "島根県公立学校教員採用候補者選考試験", urlSlug: "kyoin-shimane", level: "advanced",
    sessions: [
      { session: "kyotsu", urlSlug: "kyotsu", expectedQuestions: 15, label: "一般選考 教職教養", categories: ["教育史", "生徒指導", "教育施策", "教育課程", "学習評価", "特別支援教育", "教育心理", "教育法規"] },
    ],
    seasons: ["annual"], yearRange: { start: 2025, end: 2026 },
  },
  "kyotsu-joho1": {
    code: "kyotsu-joho1", nameFull: "大学入学共通テスト 情報Ⅰ", urlSlug: "kyotsu-joho1", level: "basic",
    sessions: [{
      session: "kyotsu", urlSlug: "kyotsu", expectedQuestions: 50, label: "情報Ⅰ",
      categories: ["情報社会の問題解決", "コミュニケーションと情報デザイン", "コンピュータとプログラミング", "情報通信ネットワークとデータの活用"],
    }],
    seasons: ["first", "second"], yearRange: { start: 2025, end: 2026 },
  },
  "shokuhin-eisei-kanshiin": {
    code: "shokuhin-eisei-kanshiin", nameFull: "食品衛生監視員採用試験", urlSlug: "shokuhin-eisei-kanshiin", level: "advanced",
    sessions: [
        { session: "kiso", urlSlug: "kiso", expectedQuestions: 30, label: "基礎能力試験（専門職共通）", categories: ["文章理解", "判断推理", "数的推理", "資料解釈", "時事"] },
    ], seasons: ["annual"], yearRange: { start: 2024, end: 2024 },
},
  "tohan-chugoku-shikoku": {
    code: "tohan-chugoku-shikoku",
    nameFull: "登録販売者試験（中国・四国）",
    urlSlug: "tohan-chugoku-shikoku",
    level: "basic",
    sessions: [{
        session: "gakka",
        urlSlug: "gakka",
        expectedQuestions: 120,
        label: "試験問題（午前・午後）",
        categories: [
            "医薬品に共通する特性と基本的な知識",
            "人体の働きと医薬品",
            "主な医薬品とその作用",
            "薬事に関する法規と制度",
            "医薬品の適正使用と安全対策",
        ],
    }],
    seasons: ["annual"],
    yearRange: { start: 2022, end: 2026 },
},
  "tohan-hokkaido-tohoku": {
    code: "tohan-hokkaido-tohoku",
    nameFull: "登録販売者試験（北海道・東北）",
    urlSlug: "tohan-hokkaido-tohoku",
    level: "basic",
    sessions: [{
        session: "gakka",
        urlSlug: "gakka",
        expectedQuestions: 120,
        label: "試験問題（午前・午後）",
        categories: [
            "医薬品に共通する特性と基本的な知識",
            "人体の働きと医薬品",
            "主な医薬品とその作用",
            "薬事に関する法規と制度",
            "医薬品の適正使用と安全対策",
        ],
    }],
    seasons: ["annual"],
    yearRange: { start: 2022, end: 2026 },
},
  "tohan-kitakanto-koshinetsu": {
    code: "tohan-kitakanto-koshinetsu",
    nameFull: "登録販売者試験（北関東・甲信越）",
    urlSlug: "tohan-kitakanto-koshinetsu",
    level: "basic",
    sessions: [{
        session: "gakka",
        urlSlug: "gakka",
        expectedQuestions: 120,
        label: "試験問題（第一部・第二部）",
        categories: [
            "医薬品に共通する特性と基本的な知識",
            "人体の働きと医薬品",
            "主な医薬品とその作用",
            "薬事に関する法規と制度",
            "医薬品の適正使用と安全対策",
        ],
    }],
    seasons: ["annual"],
    yearRange: { start: 2022, end: 2026 },
},
  "tohan-kyushu-okinawa": {
    code: "tohan-kyushu-okinawa",
    nameFull: "登録販売者試験（九州・沖縄）",
    urlSlug: "tohan-kyushu-okinawa",
    level: "basic",
    sessions: [{
        session: "gakka",
        urlSlug: "gakka",
        expectedQuestions: 120,
        label: "試験問題（午前・午後）",
        categories: [
            "医薬品に共通する特性と基本的な知識",
            "人体の働きと医薬品",
            "主な医薬品とその作用",
            "薬事に関する法規と制度",
            "医薬品の適正使用と安全対策",
        ],
    }],
    seasons: ["annual"],
    yearRange: { start: 2022, end: 2025 },
},
  "tohan-tokai-hokuriku": {
    code: "tohan-tokai-hokuriku",
    nameFull: "登録販売者試験（東海・北陸）",
    urlSlug: "tohan-tokai-hokuriku",
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
    seasons: ["annual"],
    yearRange: { start: 2022, end: 2026 },
},

  "kaijo-hoan-gakko": {
    code: "kaijo-hoan-gakko", nameFull: "海上保安学校学生採用試験", urlSlug: "kaijo-hoan-gakko", level: "specialist",
    sessions: [
        { session: "kiso-special", urlSlug: "kiso-special", expectedQuestions: 40, label: "基礎能力試験（特別）", categories: ["文章理解", "判断推理", "数的推理", "資料解釈", "数学", "物理", "化学", "生物", "地学", "世界史", "日本史", "地理", "国語", "英語", "政治", "経済", "倫理", "情報"] },
        { session: "kiso", urlSlug: "kiso", expectedQuestions: 40, label: "基礎能力試験（通常）", categories: ["文章理解", "判断推理", "数的推理", "資料解釈", "数学", "物理", "化学", "生物", "地学", "世界史", "日本史", "地理", "国語", "英語", "政治", "経済", "倫理", "社会", "情報"] },
        { session: "gakka-sugaku", urlSlug: "gakka-sugaku", expectedQuestions: 13, label: "管制課程 学科試験（数学）", categories: ["数学"] },
        { session: "gakka-eigo", urlSlug: "gakka-eigo", expectedQuestions: 13, label: "管制課程 学科試験（英語）", categories: ["発音・アクセント", "語彙・熟語", "文法", "長文読解", "会話文"] },
        { session: "gakka-butsuri", urlSlug: "gakka-butsuri", expectedQuestions: 13, label: "海洋科学課程 学科試験（物理）", categories: ["物理"] },
    ], seasons: ["annual"], yearRange: { start: 2023, end: 2026 },
},
  "keimukan": {
    code: "keimukan", nameFull: "刑務官採用試験", urlSlug: "keimukan", level: "basic",
    sessions: [
        { session: "kiso", urlSlug: "kiso", expectedQuestions: 40, label: "基礎能力試験", categories: ["文章理解", "判断推理", "数的推理", "資料解釈", "自然科学", "人文科学", "国語", "英語", "社会科学", "情報"] },
    ], seasons: ["annual"], yearRange: { start: 2023, end: 2025 },
},
  "kokka-sogo-kyoyo": {
    code: "kokka-sogo-kyoyo", nameFull: "国家公務員採用総合職試験（大卒程度試験・教養区分）", urlSlug: "kokka-sogo-kyoyo", level: "specialist",
    sessions: [
        { session: "kiso-ii", urlSlug: "kiso-ii", expectedQuestions: 30, label: "基礎能力試験Ⅱ部", categories: ["時事", "数学", "物理", "化学", "生物", "地学", "倫理", "文学", "日本史", "世界史", "地理", "政治", "経済", "情報"] },
        { session: "kiso-i", urlSlug: "kiso-i", expectedQuestions: 24, label: "基礎能力試験Ⅰ部", categories: ["文章理解", "判断推理", "数的推理", "資料解釈"] },
    ], seasons: ["spring", "autumn"], yearRange: { start: 2023, end: 2026 },
},
  "zaimu-senmonkan": {
    code: "zaimu-senmonkan", nameFull: "財務専門官採用試験", urlSlug: "zaimu-senmonkan", level: "advanced",
    sessions: [
        { session: "senmon", urlSlug: "senmon", expectedQuestions: 76, label: "専門試験（多肢選択式）", categories: ["憲法", "行政法", "経済学", "社会学"] },
    ], seasons: ["annual"], yearRange: { start: 2024, end: 2026 },
},
  "chori-ehime": {
    code: "chori-ehime", nameFull: "調理師試験（愛媛県）", urlSlug: "chori-ehime", level: "basic",
    sessions: [{ session: "gakka", urlSlug: "gakka", expectedQuestions: 60, label: "学科", categories: ["公衆衛生学", "食品学", "栄養学", "食品衛生学", "調理理論", "食文化概論"] }],
    seasons: ["annual"], yearRange: { start: 2022, end: 2025 },
},

  "chori-nara": {
    code: "chori-nara", nameFull: "調理師試験（奈良県）", urlSlug: "chori-nara", level: "basic",
    sessions: [{ session: "gakka", urlSlug: "gakka", expectedQuestions: 60, label: "学科", categories: ["公衆衛生学", "食品学", "栄養学", "食品衛生学", "調理理論", "食文化概論"] }],
    seasons: ["annual"], yearRange: { start: 2024, end: 2024 },
},
};


/** IPA-only list retained for fetch/import tooling and legacy IPA invariants. */
export const ALL_EXAM_CODES: IpaExamCode[] = ["ip", "sg", "fe", "ap", "st", "sa", "pm", "nw", "db", "es", "sc", "sm", "au"];


/** Every exam playable in the application, including external qualifications. */
export const ALL_QUIZ_EXAM_CODES = (Object.keys(EXAM_CONFIGS) as ExamCode[]).filter(code => isCanonicalExamCode(code) && isExamPublished(code));


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

  if (url?.startsWith("https://www.jmbsc.or.jp/jp/examination/z/")) return "気象業務支援センター公式問題・解答例（ZIP）";

  if (!isPdfDocumentUrl(url)) {

    if (url?.startsWith("https://www.kinzai.or.jp/")) return kind === "question" ? "主催団体の公式問題" : "主催団体の模範解答";

    if (url) {

      try {

        const host = new URL(url).hostname.toLowerCase();

        if (host === "ahaki.or.jp" || host === "www.ahaki.or.jp") {

          return kind === "question" ? "試験実施機関の公式問題" : "試験実施機関の公式正答";

        }

      } catch {

        return "IPA公式の過去問一覧";

      }

    }

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
  if (cfg.code === "shinrishi" && year === 2023 && season === "annual" && sessionCfg.session === "pm") {
    return `https://www.jccpp.or.jp/files/items/128/File/${type === "ans" ? "03" : "05"}_gokaku_happyo_07.pdf`;
  }
  if (cfg.code === "denki1") {
    if (season !== "annual" || sessionCfg.session !== "gakka" || ![2021, 2025, 2026].includes(year)) return "";
    const url = `https://www.fcip-shiken.jp/pdf/r0${year - 2018}_1dg_mondai.pdf`;
    return year === 2021 && type === "ans" ? `${url}#page=44` : url;
  }
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
