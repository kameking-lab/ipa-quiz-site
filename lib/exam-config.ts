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
  "engei-soshoku2": {"code": "engei-soshoku2", "nameFull": "技能検定 2級園芸装飾（室内園芸装飾作業）学科試験", "urlSlug": "engei-soshoku2", "level": "basic", "sessions": [{"session": "gakka", "urlSlug": "gakka", "expectedQuestions": 50, "label": "学科（A群 真偽法・B群 多肢択一法）", "categories": ["園芸装飾・デザイン", "工具・資材", "植物の種類・形態", "植物生理・繁殖", "栽培管理", "用土・肥料", "病害虫", "施設・安全衛生"]}], "seasons": ["early"], "yearRange": {"start": 2023, "end": 2024}},
  "sasshi1": {"code": "sasshi1", "nameFull": "技能検定 1級サッシ施工（ビル用サッシ施工作業）学科試験", "urlSlug": "sasshi1", "level": "specialist", "sessions": [{"session": "gakka", "urlSlug": "gakka", "expectedQuestions": 50, "label": "学科（A群 真偽法・B群 多肢択一法）", "categories": ["図面・製図", "安全衛生", "工具・溶接", "建具・金物", "建築構造・関連工事", "性能・規格", "施工・墨出し", "施工計画", "材料・製品", "設備・揚重", "運搬・養生"]}], "seasons": ["early"], "yearRange": {"start": 2023, "end": 2024}},
  "kyoka-plastic2": {"code": "kyoka-plastic2", "nameFull": "技能検定 2級強化プラスチック成形（手積み積層成形作業）学科試験", "urlSlug": "kyoka-plastic2", "level": "basic", "sessions": [{"session": "gakka", "urlSlug": "gakka", "expectedQuestions": 50, "label": "学科（A群 真偽法・B群 多肢択一法）", "categories": ["加工・接合", "図面・品質管理", "安全衛生・環境", "性能・検査", "成形・積層", "成形型・補修", "材料・強化材", "樹脂・硬化"]}], "seasons": ["early"], "yearRange": {"start": 2024, "end": 2024}},
  "kyoka-plastic1": {"code": "kyoka-plastic1", "nameFull": "技能検定 1級強化プラスチック成形（手積み積層成形作業）学科試験", "urlSlug": "kyoka-plastic1", "level": "specialist", "sessions": [{"session": "gakka", "urlSlug": "gakka", "expectedQuestions": 50, "label": "学科（A群 真偽法・B群 多肢択一法）", "categories": ["加工・接合", "図面・品質管理", "安全衛生・環境", "性能・検査", "成形・積層", "成形型・補修", "材料・強化材", "樹脂・硬化"]}], "seasons": ["early"], "yearRange": {"start": 2023, "end": 2023}},
  "kagaku-bunseki3": {"code": "kagaku-bunseki3", "nameFull": "技能検定 3級化学分析（化学分析作業）学科試験", "urlSlug": "kagaku-bunseki3", "level": "basic", "sessions": [{"session": "gakka", "urlSlug": "gakka", "expectedQuestions": 30, "label": "学科（真偽法）", "categories": ["分析器具", "分離操作", "基礎化学", "安全衛生", "定性分析", "容量分析", "有機化学", "機器分析", "測定と計算", "重量分析"]}], "seasons": ["early"], "yearRange": {"start": 2023, "end": 2024}},
  "kagaku-bunseki1": {"code": "kagaku-bunseki1", "nameFull": "技能検定 1級化学分析（化学分析作業）学科試験", "urlSlug": "kagaku-bunseki1", "level": "specialist", "sessions": [{"session": "gakka", "urlSlug": "gakka", "expectedQuestions": 50, "label": "学科（A群 真偽法・B群 多肢択一法）", "categories": ["分析器具", "分離操作", "品質管理・統計", "基礎化学", "安全衛生・法令", "定性分析", "容量分析", "有機化学", "機器分析", "環境分析", "試料前処理", "試料採取", "試薬調製", "重量分析"]}], "seasons": ["early"], "yearRange": {"start": 2023, "end": 2023}},
  "chikuro1": {"code": "chikuro1", "nameFull": "技能検定 1級築炉（築炉作業）学科試験", "urlSlug": "chikuro1", "level": "specialist", "sessions": [{"session": "gakka", "urlSlug": "gakka", "expectedQuestions": 50, "label": "学科（A群 真偽法・B群 多肢択一法）", "categories": ["安全衛生・法令", "工具・施工機械", "施工・れんが積み", "施工計画・管理", "炉・燃焼・伝熱", "耐火材料", "製図・図面", "足場・基礎工事"]}], "seasons": ["early"], "yearRange": {"start": 2023, "end": 2024}},
  "futsu-senban1": {"code": "futsu-senban1", "nameFull": "技能検定 1級機械加工（普通旋盤作業）学科試験", "urlSlug": "futsu-senban1", "level": "specialist", "sessions": [{"session": "gakka", "urlSlug": "gakka", "expectedQuestions": 50, "label": "学科（A群 真偽法・B群 多肢択一法）", "categories": ["けがき・手仕上げ", "切削工具・加工", "加工計算", "品質管理", "安全衛生・法令", "工具材料・潤滑", "数値制御", "旋盤・取付け", "材料・熱処理", "機械要素・油空圧", "精度・測定", "製図・図面", "電気・計算"]}], "seasons": ["early"], "yearRange": {"start": 2025, "end": 2025}},
  "shashutsu1": {"code": "shashutsu1", "nameFull": "技能検定 1級プラスチック成形（射出成形作業）学科試験", "urlSlug": "shashutsu1", "level": "specialist", "sessions": [{"session": "gakka", "urlSlug": "gakka", "expectedQuestions": 50, "label": "学科（A群 真偽法・B群 多肢択一法）", "categories": ["二次加工", "品質管理", "安全衛生・表示", "成形・不良", "成形・条件", "成形機・金型", "材料・乾燥", "材料・性質", "材料・着色", "測定・検査", "測定・計算", "電気・設備"]}], "seasons": ["early"], "yearRange": {"start": 2025, "end": 2025}},
  "katawaku2": {"code": "katawaku2", "nameFull": "技能検定 2級型枠施工（型枠工事作業）学科試験", "urlSlug": "katawaku2", "level": "basic", "sessions": [{"session": "gakka", "urlSlug": "gakka", "expectedQuestions": 50, "label": "学科（A群 真偽法・B群 多肢択一法）", "categories": ["コンクリート", "図面・製図", "型枠・加工", "型枠・墨出し", "型枠・存置", "型枠・揚重", "型枠・支保工", "型枠・材料", "型枠・点検", "型枠・転用", "型枠・金物", "安全衛生", "建築材料", "建築構造", "構造力学", "足場", "鉄筋・構造", "関係法令"]}], "seasons": ["late"], "yearRange": {"start": 2025, "end": 2025}},
  "tekkin3": {"code": "tekkin3", "nameFull": "技能検定 3級鉄筋施工（鉄筋組立て作業）学科試験", "urlSlug": "tekkin3", "level": "basic", "sessions": [{"session": "gakka", "urlSlug": "gakka", "expectedQuestions": 30, "label": "学科（真偽法）", "categories": ["コンクリート", "図面・製図", "型枠", "安全衛生", "工具・加工", "建築材料", "建築構造", "材料管理", "構造力学", "配筋", "鉄筋・定着", "鉄筋・継手"]}], "seasons": ["late"], "yearRange": {"start": 2025, "end": 2025}},
  "tekkin2": {"code": "tekkin2", "nameFull": "技能検定 2級鉄筋施工（鉄筋組立て作業）学科試験", "urlSlug": "tekkin2", "level": "basic", "sessions": [{"session": "gakka", "urlSlug": "gakka", "expectedQuestions": 50, "label": "学科（A群 真偽法・B群 多肢択一法）", "categories": ["コンクリート", "図面・製図", "型枠", "安全衛生", "工具・加工", "建築材料", "建築構造", "揚重", "施工管理", "構造力学", "測量・墨出し", "足場", "配筋", "鉄筋・定着", "鉄筋・継手", "関係法令"]}], "seasons": ["late"], "yearRange": {"start": 2025, "end": 2025}},
  "pan-seizo1": {"code": "pan-seizo1", "nameFull": "技能検定 1級パン製造（パン製造作業）学科試験", "urlSlug": "pan-seizo1", "level": "advanced", "sessions": [{"session": "gakka", "urlSlug": "gakka", "expectedQuestions": 50, "label": "学科（A群 真偽法・B群 多肢択一法）", "categories": ["パン・菓子の種類", "ホイロ", "ミキシング", "冷凍生地", "冷却・包装", "安全衛生", "小麦粉試験", "栄養", "焼成", "生地・発酵", "製パン・規格", "製パン原料", "製パン機械", "製造原価", "製造計算", "関係法令", "食品衛生"]}], "seasons": ["late"], "yearRange": {"start": 2025, "end": 2025}},
  "kikai-shiage1": {"code": "kikai-shiage1", "nameFull": "技能検定 1級仕上げ（機械組立仕上げ作業）学科試験", "urlSlug": "kikai-shiage1", "level": "advanced", "sessions": [{"session": "gakka", "urlSlug": "gakka", "expectedQuestions": 50, "label": "学科（A群 真偽法・B群 多肢択一法）", "categories": ["けがき", "シール", "ジグ", "プレス加工", "切削油剤", "品質管理", "図面・製図", "安全衛生", "工作機械", "工具・規格", "手仕上げ", "放電加工", "材料", "材料力学", "検査", "歯車", "油圧", "測定", "溶接", "潤滑", "熱処理", "研削", "穴加工", "組立て", "締結", "表面処理", "軸受", "電気", "騒音"]}], "seasons": ["early"], "yearRange": {"start": 2025, "end": 2025}},
  "kikai-shiage3": {"code": "kikai-shiage3", "nameFull": "技能検定 3級仕上げ（機械組立仕上げ作業）学科試験", "urlSlug": "kikai-shiage3", "level": "basic", "sessions": [{"session": "gakka", "urlSlug": "gakka", "expectedQuestions": 30, "label": "学科（真偽法）", "categories": ["けがき", "シール", "品質管理", "図面・製図", "安全衛生", "工作機械", "工具・規格", "手仕上げ", "材料", "検査", "機械要素", "歯車", "油圧", "測定", "溶接", "潤滑", "熱処理", "研削", "穴加工", "組立て", "締結", "表面処理", "騒音"]}], "seasons": ["early"], "yearRange": {"start": 2025, "end": 2025}},
  "zoen-gino2": {"code": "zoen-gino2", "nameFull": "技能検定 2級造園（造園工事作業）学科試験", "urlSlug": "zoen-gino2", "level": "basic", "sessions": [{"session": "gakka", "urlSlug": "gakka", "expectedQuestions": 50, "label": "学科（A群 真偽法・B群 多肢択一法）", "categories": ["れんが工事", "コンクリート工事", "ブロック工事", "剪定・整姿", "図面・製図", "安全衛生", "工具", "庭園様式", "排水工事", "支柱", "施工管理", "植栽工事", "植物", "測量", "病害虫", "石工事", "舗装", "芝生", "花壇", "関係法規"]}], "seasons": ["early"], "yearRange": {"start": 2025, "end": 2025}},
  "zoen-gino3": {"code": "zoen-gino3", "nameFull": "技能検定 3級造園（造園工事作業）学科試験", "urlSlug": "zoen-gino3", "level": "basic", "sessions": [{"session": "gakka", "urlSlug": "gakka", "expectedQuestions": 30, "label": "学科（真偽法）", "categories": ["コンクリート工事", "剪定・整姿", "図面・製図", "土壌改良", "土工事", "型枠工事", "安全衛生", "屋上緑化", "工具", "庭園史", "庭園施設", "庭園様式", "支柱", "施肥", "植栽", "植栽工事", "植栽管理", "植栽規格", "植物", "病害虫", "石工事", "石灯籠", "竹垣", "肥料", "花壇", "関係法規"]}], "seasons": ["early", "late"], "yearRange": {"start": 2025, "end": 2025}},
  "chuzo3": {"code": "chuzo3", "nameFull": "技能検定 3級鋳造（鋳鉄鋳物鋳造作業）学科試験", "urlSlug": "chuzo3", "level": "basic", "sessions": [{"session": "gakka", "urlSlug": "gakka", "expectedQuestions": 30, "label": "学科（真偽法）", "categories": ["中子", "仕上げ", "型ばらし", "塗型", "安全衛生", "模型", "測定", "溶解・注湯", "溶解炉", "造型", "鋳型", "鋳物砂", "鋳造方案", "鋳造欠陥", "鋳鉄材料", "電気"]}], "seasons": ["early"], "yearRange": {"start": 2025, "end": 2025}},
  "chuzo1": {"code": "chuzo1", "nameFull": "技能検定 1級鋳造（鋳鉄鋳物鋳造作業）学科試験", "urlSlug": "chuzo1", "level": "advanced", "sessions": [{"session": "gakka", "urlSlug": "gakka", "expectedQuestions": 50, "label": "学科（A群 真偽法・B群 多肢択一法）", "categories": ["中子", "仕上げ", "品質管理", "図面・製図", "型ばらし", "塗型", "安全衛生", "工作機械", "材料規格", "材料試験", "検査", "模型", "混練", "測定", "溶接", "溶湯試験", "溶解炉", "熱処理", "造型", "金属材料", "鋳型", "鋳物砂", "鋳込み", "鋳造方案", "鋳造欠陥", "鋳造法", "鋳鉄材料", "電気", "非破壊検査"]}], "seasons": ["early"], "yearRange": {"start": 2025, "end": 2025}},
  "netsuzetsuen2": {"code": "netsuzetsuen2", "nameFull": "技能検定 2級熱絶縁施工（保温保冷工事作業）学科試験", "urlSlug": "netsuzetsuen2", "level": "basic", "sessions": [{"session": "gakka", "urlSlug": "gakka", "expectedQuestions": 50, "label": "学科（A群 真偽法・B群 多肢択一法）", "categories": ["シーリング", "ダクト保温", "伝熱", "保温保冷", "保温施工", "保温材料", "冷凍設備", "図面・記号", "外装施工", "安全衛生", "工具", "工程管理", "建築法規", "接着剤", "施工手順", "施工検査", "材料規格", "板金加工", "熱・湿り空気", "相変化", "空調設備", "給湯設備", "足場", "配管材料"]}], "seasons": ["early"], "yearRange": {"start": 2025, "end": 2025}},
  "hiseshoku-jokyo1": {"code": "hiseshoku-jokyo1", "nameFull": "技能検定 1級非接触除去加工（数値制御形彫り放電加工作業）学科試験", "urlSlug": "hiseshoku-jokyo1", "level": "advanced", "sessions": [{"session": "gakka", "urlSlug": "gakka", "expectedQuestions": 50, "label": "学科（A群 真偽法・B群 多肢択一法）", "categories": ["NCプログラム", "位置決め", "切削加工", "切削油剤", "加工条件", "加工液", "加工特性", "加工面粗さ", "危険物", "取付け・位置決め", "品質管理", "図面・製図", "塑性加工", "安全率", "工作機械", "手仕上げ", "揺動加工", "放電加工原理", "放電回路", "材料試験", "機械要素", "油圧", "測定", "溶接", "潤滑", "熱処理", "精度検査", "金属材料", "電動機", "電極材料", "電極消耗", "電極製作", "電気", "電気回路", "電気測定", "電気絶縁", "非破壊検査"]}], "seasons": ["early"], "yearRange": {"start": 2025, "end": 2025}},
  "tategu1": {"code": "tategu1", "nameFull": "技能検定 1級建具製作（木製建具手加工作業）学科試験", "urlSlug": "tategu1", "level": "advanced", "sessions": [{"session": "gakka", "urlSlug": "gakka", "expectedQuestions": 50, "label": "学科（A群 真偽法・B群 多肢択一法）", "categories": ["仕口加工", "化粧単板", "図面・製図", "塗装", "墨付け", "安全衛生", "寸法取り", "工具", "建具の種類", "建具金物", "建築下地", "建築様式", "建築法規", "接合", "接着剤", "木取り", "木工機械", "木材", "木材乾燥", "木構造", "板はぎ", "空気圧", "組立て", "造作材", "障子", "電動機", "電気", "電気回路", "電線"]}], "seasons": ["early"], "yearRange": {"start": 2025, "end": 2025}},
  "shohin-soshoku1": {"code": "shohin-soshoku1", "nameFull": "技能検定 1級商品装飾展示（商品装飾展示作業）学科試験", "urlSlug": "shohin-soshoku1", "level": "advanced", "sessions": [{"session": "gakka", "urlSlug": "gakka", "expectedQuestions": 50, "label": "学科（A群 真偽法・B群 多肢択一法）", "categories": ["VMD", "ショーウインドウ", "ディスプレイ", "デザイン原理", "パディング", "ピンワーク", "ファッション", "マーケティング", "什器", "動線計画", "包装", "図面・製図", "売場計画", "季節行事", "安全衛生", "布素材", "広告", "店舗業態", "店舗設備", "建築法規", "服飾品", "流通", "消防法規", "照明", "知的財産", "空間表現", "紙", "色彩", "著作権", "衣料品陳列", "衣服", "製造物責任", "観葉植物", "販売促進", "陳列用具", "陳列計画", "食器"]}], "seasons": ["early"], "yearRange": {"start": 2025, "end": 2025}},
  "kogaku-glass1": {"code": "kogaku-glass1", "nameFull": "技能検定 1級光学機器製造（光学ガラス研磨作業）学科試験", "urlSlug": "kogaku-glass1", "level": "advanced", "sessions": [{"session": "gakka", "urlSlug": "gakka", "expectedQuestions": 50, "label": "学科（A群 真偽法・B群 多肢択一法）", "categories": ["保全", "光学", "光学ガラス", "光学材料", "品質管理", "安全衛生", "心取り", "接着", "機械加工", "機械要素", "測定", "潤滑", "環境", "研削", "研磨", "薄膜", "製図", "電気"]}], "seasons": ["early"], "yearRange": {"start": 2025, "end": 2025}},
  "sangyo-sharyo1": {"code": "sangyo-sharyo1", "nameFull": "技能検定 1級産業車両整備（産業車両整備作業）学科試験", "urlSlug": "sangyo-sharyo1", "level": "advanced", "sessions": [{"session": "gakka", "urlSlug": "gakka", "expectedQuestions": 50, "label": "学科（A群 真偽法・B群 多肢択一法）", "categories": ["エンジン", "充電装置", "制動装置", "力学", "動力伝達", "安全法規", "安全装置", "接合", "材料", "材料力学", "機械要素", "油圧", "測定", "潤滑", "点検整備", "熱処理", "環境法規", "蓄電池", "製図", "車両構造", "電動機", "電気"]}], "seasons": ["early"], "yearRange": {"start": 2025, "end": 2025}},
  "yogashi1": {"code": "yogashi1", "nameFull": "技能検定 1級菓子製造（洋菓子製造作業）学科試験", "urlSlug": "yogashi1", "level": "advanced", "sessions": [{"session": "gakka", "urlSlug": "gakka", "expectedQuestions": 50, "label": "学科（A群 真偽法・B群 多肢択一法）", "categories": ["クリーム", "シュー生地", "チョコレート", "デザイン", "パイ生地", "仕上げ", "包装", "品質管理", "安全衛生", "成形", "栄養", "焼成", "生地", "発酵", "糖類", "膨張剤", "色彩", "製菓材料", "製菓機械", "製菓知識", "食品保存", "食品添加物", "食品衛生", "食品衛生法規", "食品表示", "飴細工", "鶏卵"]}], "seasons": ["late"], "yearRange": {"start": 2025, "end": 2025}},
  "block-kenchiku3": {"code": "block-kenchiku3", "nameFull": "技能検定 3級ブロック建築（コンクリートブロック工事作業）学科試験", "urlSlug": "block-kenchiku3", "level": "basic", "sessions": [{"session": "gakka", "urlSlug": "gakka", "expectedQuestions": 30, "label": "学科（真偽法）", "categories": ["コンクリート", "タイル", "ブロック材料", "仮設", "安全衛生", "工具", "施工", "施工計画", "材料保管", "構造", "法規", "測量", "環境", "製図", "鉄筋", "養生"]}], "seasons": ["early"], "yearRange": {"start": 2025, "end": 2025}},
  "block-kenchiku1": {"code": "block-kenchiku1", "nameFull": "技能検定 1級ブロック建築（コンクリートブロック工事作業）学科試験", "urlSlug": "block-kenchiku1", "level": "advanced", "sessions": [{"session": "gakka", "urlSlug": "gakka", "expectedQuestions": 50, "label": "学科（A群 真偽法・B群 多肢択一法）", "categories": ["かぶり厚さ", "れんが", "コンクリート", "コンクリート施工", "セメント", "タイル", "ブロック材料", "型枠", "基礎", "塀", "墨出し", "安全衛生", "屋根", "工程管理", "帳壁", "施工", "施工図", "木造", "構造", "法規", "測量", "目地", "石工事", "製図", "設計図書", "調合", "配筋", "鉄筋", "鉄筋加工", "電気"]}], "seasons": ["early"], "yearRange": {"start": 2025, "end": 2025}},
  "shuzo1": {"code": "shuzo1", "nameFull": "技能検定 1級酒造（清酒製造作業）学科試験", "urlSlug": "shuzo1", "level": "advanced", "sessions": [{"session": "gakka", "urlSlug": "gakka", "expectedQuestions": 50, "label": "学科（A群 真偽法・B群 多肢択一法）", "categories": ["もろみ管理", "ろ過", "仕込み", "仕込配合", "分析", "原料", "原料処理", "原料米", "品質管理", "安全衛生", "排水処理", "火落菌", "熟成", "特定名称酒", "用水", "精米", "表示", "製成", "製麹", "製麹設備", "設備", "設備計算", "調合", "調合計算", "貯蔵成分", "貯蔵管理", "酒母", "酒税法", "酒造年度", "酵母", "酵母分析", "酵素", "酵素四段", "電気", "電気計算", "麹"]}], "seasons": ["early"], "yearRange": {"start": 2025, "end": 2025}},
  "fraise1": {"code": "fraise1", "nameFull": "技能検定 1級機械加工（フライス盤作業）学科試験", "urlSlug": "fraise1", "level": "advanced", "sessions": [{"session": "gakka", "urlSlug": "gakka", "expectedQuestions": 50, "label": "学科（A群 真偽法・B群 多肢択一法）", "categories": ["けがき", "ねじ加工", "保持具", "切りくず処理", "切削工具", "切削油剤", "切削理論", "切削計算", "制御", "割出し", "加工精度", "品質管理", "安全衛生", "工作機械", "工具保持", "工具寿命", "工具損傷", "工具規格", "材料", "材料試験", "機械要素", "油空圧", "測定", "溶接", "潤滑", "熱処理", "研削", "精度検査", "製図", "軸受", "電動機", "電気", "非破壊検査"]}], "seasons": ["early"], "yearRange": {"start": 2023, "end": 2023}},
  "shashutsu2": {"code": "shashutsu2", "nameFull": "技能検定 2級プラスチック成形（射出成形作業）学科試験", "urlSlug": "shashutsu2", "level": "basic", "sessions": [{"session": "gakka", "urlSlug": "gakka", "expectedQuestions": 50, "label": "学科（A群 真偽法・B群 多肢択一法）", "categories": ["二次加工", "品質管理", "図面・製図", "安全衛生・環境", "成形・不良", "成形・基礎", "成形・条件", "成形機・金型", "材料・乾燥", "材料・性質", "材料・着色", "測定・検査", "測定・計算", "電気・設備"]}], "seasons": ["early"], "yearRange": {"start": 2025, "end": 2025}},
  "kikai-kensa3": {"code": "kikai-kensa3", "nameFull": "技能検定 3級機械検査（機械検査作業）学科試験", "urlSlug": "kikai-kensa3", "level": "basic", "sessions": [{"session": "gakka", "urlSlug": "gakka", "expectedQuestions": 30, "label": "学科（真偽法）", "categories": ["品質管理・検査", "図面・製図", "安全衛生", "工作機械・加工", "材料・熱処理", "機械要素", "測定の基礎", "測定器・取扱い", "電気の基礎"]}], "seasons": ["early"], "yearRange": {"start": 2025, "end": 2025}},
  "kagaku-bunseki2": {"code": "kagaku-bunseki2", "nameFull": "技能検定 2級化学分析（化学分析作業）学科試験", "urlSlug": "kagaku-bunseki2", "level": "basic", "sessions": [{"session": "gakka", "urlSlug": "gakka", "expectedQuestions": 50, "label": "学科（A群 真偽法・B群 多肢択一法）", "categories": ["前処理・試料採取", "品質管理・統計", "器具・基本操作", "基礎化学", "安全衛生・法令", "容量分析", "機器分析", "重量分析・定性分析"]}], "seasons": ["early"], "yearRange": {"start": 2023, "end": 2024}},
  "engei-soshoku1": {"code": "engei-soshoku1", "nameFull": "技能検定 1級園芸装飾（室内園芸装飾作業）学科試験", "urlSlug": "engei-soshoku1", "level": "specialist", "sessions": [{"session": "gakka", "urlSlug": "gakka", "expectedQuestions": 50, "label": "学科（A群 真偽法・B群 多肢択一法）", "categories": ["園芸装飾・デザイン", "工具・資材", "植物の種類・形態", "植物生理・繁殖", "栽培管理", "用土・肥料", "病害虫", "施設・安全衛生"]}], "seasons": ["early"], "yearRange": {"start": 2023, "end": 2023}},
  "engei-soshoku3": {"code": "engei-soshoku3", "nameFull": "技能検定 3級園芸装飾（室内園芸装飾作業）学科試験", "urlSlug": "engei-soshoku3", "level": "basic", "sessions": [{"session": "gakka", "urlSlug": "gakka", "expectedQuestions": 30, "label": "学科（真偽法）", "categories": ["園芸装飾・デザイン", "工具・資材", "植物の種類・形態", "植物生理・繁殖", "栽培管理", "用土・肥料", "病害虫", "施設・安全衛生"]}], "seasons": ["early"], "yearRange": {"start": 2023, "end": 2024}},
  "insatsu1": {"code": "insatsu1", "nameFull": "技能検定 1級印刷（オフセット印刷作業）学科試験", "urlSlug": "insatsu1", "level": "advanced", "sessions": [{"session": "gakka", "urlSlug": "gakka", "expectedQuestions": 50, "label": "学科（A群 真偽法・B群 多肢択一法）", "categories": ["印刷方式・製版", "用紙・製本", "印刷機・給排紙", "安全衛生・環境", "インキ・乾燥", "電気・計測", "色彩・網点", "品質・トラブル", "湿し水・ローラ"]}], "seasons": ["early"], "yearRange": {"start": 2023, "end": 2023}},
  "insatsu2": {"code": "insatsu2", "nameFull": "技能検定 2級印刷（オフセット印刷作業）学科試験", "urlSlug": "insatsu2", "level": "basic", "sessions": [{"session": "gakka", "urlSlug": "gakka", "expectedQuestions": 50, "label": "学科（A群 真偽法・B群 多肢択一法）", "categories": ["印刷方式・製版", "印刷機・給排紙", "色彩・網点", "用紙・製本", "インキ・乾燥", "安全衛生・環境", "電気・計測", "湿し水・ローラ", "品質・トラブル"]}], "seasons": ["early"], "yearRange": {"start": 2024, "end": 2024}},
  "tetsudo-sharyo1": {"code": "tetsudo-sharyo1", "nameFull": "技能検定 1級鉄道車両製造・整備（機器ぎ装作業）学科試験", "urlSlug": "tetsudo-sharyo1", "level": "advanced", "sessions": [{"session": "gakka", "urlSlug": "gakka", "expectedQuestions": 50, "label": "学科（A群 真偽法・B群 多肢択一法）", "categories": ["車両装置・ブレーキ", "材料・熱処理", "機械要素・力学", "電気・制御", "測定・製図", "品質管理", "安全衛生", "台車・走行装置", "潤滑・保全"]}], "seasons": ["early"], "yearRange": {"start": 2025, "end": 2025}},
  "diecast1": {"code": "diecast1", "nameFull": "技能検定 1級ダイカスト（ホットチャンバダイカスト作業）学科試験", "urlSlug": "diecast1", "level": "advanced", "sessions": [{"session": "gakka", "urlSlug": "gakka", "expectedQuestions": 50, "label": "学科（A群 真偽法・B群 多肢択一法）", "categories": ["鋳造機・油圧", "材料・熱処理", "溶解・溶湯管理", "鋳造条件・方案", "金型・保全", "生産管理", "鋳造欠陥・検査", "鋳造法", "電気・安全衛生", "仕上げ加工", "製図"]}], "seasons": ["early"], "yearRange": {"start": 2025, "end": 2025}},
  "flower3": {"code": "flower3", "nameFull": "技能検定 3級フラワー装飾（フラワー装飾作業）学科試験", "urlSlug": "flower3", "level": "basic", "sessions": [{"session": "gakka", "urlSlug": "gakka", "expectedQuestions": 30, "label": "学科（真偽法）", "categories": ["意匠・色彩", "装飾・デザイン", "製作技法", "花材管理", "資材・工具", "花材・形態", "植物・生理", "植物・分類", "安全衛生"]}], "seasons": ["early"], "yearRange": {"start": 2025, "end": 2025}},
  "flower1": {"code": "flower1", "nameFull": "技能検定 1級フラワー装飾（フラワー装飾作業）学科試験", "urlSlug": "flower1", "level": "advanced", "sessions": [{"session": "gakka", "urlSlug": "gakka", "expectedQuestions": 50, "label": "学科（A群 真偽法・B群 多肢択一法）", "categories": ["意匠・色彩", "装飾・デザイン", "製作技法", "資材・工具", "花材管理", "植物・分類", "植物・生理", "安全衛生", "花材・形態", "植物・形態"]}], "seasons": ["early"], "yearRange": {"start": 2024, "end": 2025}},
"unko-kanrisha-ryokaku": {"code": "unko-kanrisha-ryokaku", "nameFull": "運行管理者（旅客）", "urlSlug": "unko-kanrisha-ryokaku", "level": "basic", "sessions": [{"session": "gakka", "urlSlug": "gakka", "expectedQuestions": 30, "label": "CBT出題例", "categories": ["道路運送法", "道路運送車両法", "道路交通法", "労働基準法", "実務上の知識・能力"]}], "seasons": ["cbt"], "yearRange": {"start": 2023, "end": 2024}},
"shobo-setsubishi-kou1": {"code": "shobo-setsubishi-kou1", "nameFull": "消防設備士 甲種第1類", "urlSlug": "shobo-setsubishi-kou1", "level": "basic", "sessions": [{"session": "gakka", "urlSlug": "gakka", "expectedQuestions": 19, "label": "筆記公表問題", "categories": ["消防関係法令", "機械の基礎知識", "電気の基礎知識", "構造・機能・工事・整備"]}, {"session": "practical", "urlSlug": "practical", "expectedQuestions": 7, "label": "実技公表問題", "categories": ["実技・鑑別", "実技・製図"]}], "seasons": ["published"], "yearRange": {"start": 2026, "end": 2026}},
"kikenbutsu-kou": {"code": "kikenbutsu-kou", "nameFull": "危険物取扱者 甲種", "urlSlug": "kikenbutsu-kou", "level": "basic", "sessions": [{"session": "gakka", "urlSlug": "gakka", "expectedQuestions": 45, "label": "筆記公表問題", "categories": ["危険物に関する法令", "物理学及び化学", "危険物の性質・火災予防・消火"]}], "seasons": ["published"], "yearRange": {"start": 2026, "end": 2026}},
"kikenbutsu-hei": {"code": "kikenbutsu-hei", "nameFull": "危険物取扱者 丙種", "urlSlug": "kikenbutsu-hei", "level": "basic", "sessions": [{"session": "gakka", "urlSlug": "gakka", "expectedQuestions": 25, "label": "公表問題", "categories": ["危険物に関する法令", "燃焼及び消火に関する基礎知識", "危険物の性質・火災予防・消火"]}], "seasons": ["published"], "yearRange": {"start": 2026, "end": 2026}},
"shobo-setsubishi-kou4": {"code": "shobo-setsubishi-kou4", "nameFull": "消防設備士 甲種第4類", "urlSlug": "shobo-setsubishi-kou4", "level": "basic", "sessions": [{"session": "gakka", "urlSlug": "gakka", "expectedQuestions": 13, "label": "筆記公表問題", "categories": ["構造・機能・整備", "消防関係法令", "電気の基礎知識"]}, {"session": "practical", "urlSlug": "practical", "expectedQuestions": 2, "label": "実技公表問題", "categories": ["実技"]}], "seasons": ["published"], "yearRange": {"start": 2026, "end": 2026}},
"shobo-setsubishi-otsu6": {"code": "shobo-setsubishi-otsu6", "nameFull": "消防設備士 乙種第6類", "urlSlug": "shobo-setsubishi-otsu6", "level": "basic", "sessions": [{"session": "gakka", "urlSlug": "gakka", "expectedQuestions": 14, "label": "筆記公表問題", "categories": ["構造・機能・整備", "機械の基礎知識", "消防関係法令"]}, {"session": "practical", "urlSlug": "practical", "expectedQuestions": 2, "label": "実技公表問題", "categories": ["実技"]}], "seasons": ["published"], "yearRange": {"start": 2026, "end": 2026}},
"unko-kanrisha-kamotsu": {"code": "unko-kanrisha-kamotsu", "nameFull": "運行管理者（貨物）", "urlSlug": "unko-kanrisha-kamotsu", "level": "basic", "sessions": [{"session": "gakka", "urlSlug": "gakka", "expectedQuestions": 30, "label": "CBT出題例", "categories": ["労働基準法", "実務上の知識・能力", "貨物自動車運送事業法", "道路交通法", "道路運送車両法"]}], "seasons": ["cbt"], "yearRange": {"start": 2023, "end": 2024}},
"kikenbutsu-otsu4": {"code": "kikenbutsu-otsu4", "nameFull": "危険物取扱者 乙種第4類", "urlSlug": "kikenbutsu-otsu4", "level": "basic", "sessions": [{"session": "gakka", "urlSlug": "gakka", "expectedQuestions": 35, "label": "筆記公表問題", "categories": ["危険物に関する法令", "危険物の性質・火災予防・消火", "基礎的な物理学・化学"]}], "seasons": ["published"], "yearRange": {"start": 2026, "end": 2026}},
"benrishi": {"code": "benrishi", "nameFull": "弁理士（短答式）", "urlSlug": "benrishi", "level": "specialist", "sessions": [{"session": "patent", "urlSlug": "patent", "expectedQuestions": 20, "label": "特許・実用新案", "categories": ["特許・実用新案"]}, {"session": "design", "urlSlug": "design", "expectedQuestions": 10, "label": "意匠", "categories": ["意匠"]}, {"session": "trademark", "urlSlug": "trademark", "expectedQuestions": 10, "label": "商標", "categories": ["商標"]}, {"session": "treaty", "urlSlug": "treaty", "expectedQuestions": 10, "label": "条約", "categories": ["条約"]}, {"session": "copyright", "urlSlug": "copyright", "expectedQuestions": 10, "label": "著作権法・不正競争防止法", "categories": ["著作権法・不正競争防止法"]}], "seasons": ["annual"], "yearRange": {"start": 2025, "end": 2026}},
"sokuryoshi": {"code": "sokuryoshi", "nameFull": "測量士", "urlSlug": "sokuryoshi", "level": "specialist", "sessions": [{"session": "am", "urlSlug": "am", "expectedQuestions": 28, "label": "午前", "categories": ["測量法の定義", "ITRFの座標軸", "公共測量の計画と製品仕様", "事故対応と作業安全", "正規分布", "測量の基準", "TSの気象補正と観測点検", "Y座標の誤差伝播", "準天頂衛星と観測衛星数", "GNSS基線解析", "ジオイド傾斜と標高比較", "水準観測と器械誤差", "水準環の閉合差", "現地測量と地形描画", "GNSSによる現地測量", "地上レーザ測量", "UAV写真の重複度", "衛星リモートセンシング", "UAV写真・レーザ測量", "三次元点群の作成", "地形図判読", "地図投影のひずみ", "防災GIS", "基盤地図情報", "クロソイドの交角", "用地測量と仮杭", "境界点の座標と面積", "河川・海浜測量の用語", "ITRFと測地系", "精度管理と成果検定", "現場安全と法令遵守", "二次元回転", "斜距離の基準面への補正", "TS基準点測量の規定", "GNSS観測と誤差", "楕円体高と標高", "水準測量", "GNSS標高測量", "標尺補正と重量平均", "現地測量のGNSS・TS", "高低差の誤差伝播", "地上レーザ計測", "航空写真のコース重複度", "写真地図とDTM", "航空レーザの走査間隔", "UAVレーザ測量", "地図投影法", "DTMの利用", "地図編集の作業工程", "基本型クロソイドの路線長", "用地測量", "等積による境界整正", "河川測量"]}, {"session": "pm", "urlSlug": "pm", "expectedQuestions": 5, "label": "午後（記述・作図の自己確認）", "categories": ["測量法と技術者の責務", "TS・電子基準点・水準点管理", "航空写真・UAV・車載レーザ", "地図編集・図郭・GIS機能", "路線設計と用地測量", "測量法・公共測量の制度と管理", "基準点・GNSS・水準測量", "現地・写真・点群測量", "地図編集・投影・GIS", "路線・用地・河川測量"]}], "seasons": ["annual"], "yearRange": {"start": 2025, "end": 2026}},
"dokugeki-chiba": {"code": "dokugeki-chiba", "nameFull": "毒物劇物取扱者", "urlSlug": "dokugeki-chiba", "level": "specialist", "sessions": [{"session": "dokugeki-ippan", "urlSlug": "dokugeki-ippan", "expectedQuestions": 80, "label": "一般", "categories": ["毒物及び劇物に関する法規", "基礎化学", "毒物及び劇物の性質及び貯蔵その他取扱方法", "毒物及び劇物の識別及び取扱方法"]}, {"session": "dokugeki-nougyou", "urlSlug": "dokugeki-nougyou", "expectedQuestions": 80, "label": "農業用品目", "categories": ["毒物及び劇物に関する法規", "基礎化学", "毒物及び劇物の性質及び貯蔵その他取扱方法", "毒物及び劇物の識別及び取扱方法"]}, {"session": "dokugeki-tokutei", "urlSlug": "dokugeki-tokutei", "expectedQuestions": 80, "label": "特定品目", "categories": ["毒物及び劇物に関する法規", "基礎化学", "毒物及び劇物の性質及び貯蔵その他取扱方法", "毒物及び劇物の識別及び取扱方法"]}], "seasons": ["annual"], "yearRange": {"start": 2025, "end": 2026}},
"jokaso-setsubishi": {"code": "jokaso-setsubishi", "nameFull": "浄化槽設備士（学科）", "urlSlug": "jokaso-setsubishi", "level": "specialist", "sessions": [{"session": "gakka", "urlSlug": "gakka", "expectedQuestions": 50, "label": "学科", "categories": ["浄化槽設備士学科"]}], "seasons": ["annual"], "yearRange": {"start": 2025, "end": 2026}},
"chiiki-ryoko": {"code": "chiiki-ryoko", "nameFull": "地域限定旅行業務取扱管理者", "urlSlug": "chiiki-ryoko", "level": "specialist", "sessions": [{"session": "hoki", "urlSlug": "hoki", "expectedQuestions": 25, "label": "旅行業法令", "categories": ["旅行業法令"]}, {"session": "yakkan", "urlSlug": "yakkan", "expectedQuestions": 24, "label": "旅行業約款", "categories": ["旅行業約款"]}, {"session": "jitsumu", "urlSlug": "jitsumu", "expectedQuestions": 10, "label": "国内旅行実務", "categories": ["国内旅行実務"]}], "seasons": ["annual"], "yearRange": {"start": 2025, "end": 2026}},
"junkango-kansai": {"code": "junkango-kansai", "nameFull": "准看護師", "urlSlug": "junkango-kansai", "level": "specialist", "sessions": [{"session": "gakka", "urlSlug": "gakka", "expectedQuestions": 150, "label": "学科", "categories": ["人体の構造と機能", "栄養", "薬理", "疾病と感染", "保健医療と法規", "看護概論と心理", "基礎看護技術", "成人看護総論", "成人看護", "老年看護", "母子看護", "精神看護"]}], "seasons": ["annual"], "yearRange": {"start": 2025, "end": 2026}},
"kukaku-seiri": {"code": "kukaku-seiri", "nameFull": "土地区画整理士（学科）", "urlSlug": "kukaku-seiri", "level": "specialist", "sessions": [{"session": "gakka", "urlSlug": "gakka", "expectedQuestions": 40, "label": "学科", "categories": ["土地区画整理事業総論", "換地計画", "土地評価", "法規"]}], "seasons": ["annual"], "yearRange": {"start": 2026, "end": 2026}},
"dojo-osen": {"code": "dojo-osen", "nameFull": "土壌汚染調査技術管理者", "urlSlug": "dojo-osen", "level": "specialist", "sessions": [{"session": "am", "urlSlug": "am", "expectedQuestions": 35, "label": "午前", "categories": ["調査"]}, {"session": "pm", "urlSlug": "pm", "expectedQuestions": 45, "label": "午後（選択式）", "categories": ["対策", "法令等"]}], "seasons": ["annual"], "yearRange": {"start": 2024, "end": 2025}},
"kenchikushi2": {"code": "kenchikushi2", "nameFull": "二級建築士（学科）", "urlSlug": "kenchikushi2", "level": "specialist", "sessions": [{"session": "gakka-I", "urlSlug": "gakka-I", "expectedQuestions": 25, "label": "学科I（計画）", "categories": ["日本建築史", "西洋建築史", "環境工学の単位", "換気", "伝熱・断熱", "湿り空気", "日照・日射", "色彩", "吸音・遮音", "屋外気候", "住宅計画", "集合住宅", "事務所・商業計画", "教育・図書館", "美術館", "各部寸法・面積", "バリアフリー", "建築生産", "設備の用語", "空気調和", "給排水衛生", "雨水利用・排水", "電気設備", "防災・消防設備", "環境・省エネルギー", "建築史", "建築作品", "環境工学の基礎", "伝熱", "日照・照明", "音環境", "環境評価", "集合住宅計画", "オフィス計画", "教育・図書館計画", "公共建築計画", "建築寸法", "住宅のバリアフリー", "防犯計画", "建築設備の基礎", "空気調和設備", "給排水衛生設備", "消防設備", "省エネルギー"]}, {"session": "gakka-II", "urlSlug": "gakka-II", "expectedQuestions": 25, "label": "学科II（法規）", "categories": ["法令用語", "確認・維持保全", "確認対象", "住宅の一般構造", "平均天井高さ", "構造計算対象", "構造荷重・地盤", "構造の仕様規定", "防火区画・外壁", "避難施設", "内装制限", "道路・接道", "用途制限", "用途地域をまたぐ敷地", "建蔽率の緩和", "容積率の計算", "高さ制限・日影", "高さ制限の計算", "防火地域", "用途変更", "二級建築士の業務範囲", "建築士事務所", "建設関連法令", "バリアフリー法", "建築物省エネ法", "用語の定義", "確認・検査", "確認が必要な行為", "採光面積", "構造計算の対象", "構造強度・荷重", "防火区画・界壁", "用途地域の制限", "建蔽率", "容積率の不算入", "維持保全・既存不適格・罰則", "建築士の業務範囲", "建築士の義務", "消防法", "耐震改修促進法"]}, {"session": "gakka-III", "urlSlug": "gakka-III", "expectedQuestions": 25, "label": "学科III（構造）", "categories": ["断面二次モーメント", "梁の曲げ応力度", "単純梁の応力", "静定ラーメン", "静定トラス", "弾性座屈", "荷重・地震力", "風圧力", "地盤・基礎", "木造用語", "木質構造設計", "木質接合", "壁式RC造", "RC構造", "RC配筋", "鉄骨構造", "鉄骨接合", "構造計画", "耐震設計", "木材", "コンクリート", "セメント", "鋼材応力ひずみ", "建築材料", "仕上げ・断熱材料", "曲げ応力度", "張出し梁", "荷重・外力", "木造の部材", "木造軸組", "枠組壁工法", "RC造の構造特性", "RC造の配筋", "木材・木質材料", "コンクリート材料", "鋼材", "ガラス"]}, {"session": "gakka-IV", "urlSlug": "gakka-IV", "expectedQuestions": 25, "label": "学科IV（施工）", "categories": ["工程表", "材料保管", "安全管理", "建設廃棄物", "仮設足場", "木造基礎", "土工・地業", "鉄筋加工・継手", "鉄筋施工・検査", "型枠工事", "コンクリート施工", "鉄骨建方", "鉄骨溶接", "押出成形セメント板", "木工事", "木造接合金物", "屋根防水", "左官・タイル・石", "塗装", "建具・ガラス・内装", "住宅設備", "改修", "施工機械・工法", "建築積算", "請負契約", "施工計画", "申請・届出", "作業主任者", "仮設工事", "木造住宅の基礎", "土工事", "鉄筋工事", "コンクリートの検査", "コンクリートの締固め", "高力ボルト工事", "鉄骨工事", "ALCパネル", "木工事の下地・精度", "木工事の接合", "防水工事", "塗装工事", "設備工事", "改修工事", "測量器具", "標準請負契約約款"]}], "seasons": ["annual"], "yearRange": {"start": 2025, "end": 2026}},
"mokuzo-kenchikushi": {"code": "mokuzo-kenchikushi", "nameFull": "木造建築士（学科）", "urlSlug": "mokuzo-kenchikushi", "level": "specialist", "sessions": [{"session": "gakka-I", "urlSlug": "gakka-I", "expectedQuestions": 25, "label": "学科I（計画）", "categories": ["住宅史", "環境用語", "空気環境", "伝熱・結露", "光・色彩", "音環境", "気候・地球環境", "住宅外構", "集合住宅形式", "併用住宅", "木造用語", "事務所・商業施設", "住宅平面寸法", "住宅各部寸法", "屋根形式", "階段安全", "高齢者・車椅子", "住宅リフォーム", "設備用語", "空調・換気", "給排水・ガス", "排水設備", "電気設備", "配管", "設備省エネ", "建築作品", "環境工学単位", "気候・環境", "戸建住宅計画", "集合住宅", "敷地調査", "伝統建築", "建築用途と用語", "住宅寸法", "階段計画", "内部仕上げ", "車椅子住宅", "環境配慮手法", "空調設備", "換気設備", "給排水衛生", "電気・防災", "設備配管"]}, {"session": "gakka-II", "urlSlug": "gakka-II", "expectedQuestions": 25, "label": "学科II（法規）", "categories": ["法令用語", "建築面積", "確認変更", "確認対象", "共同住宅一般構造", "住宅換気", "採光計算", "平均天井高さ", "木造仕様", "構造耐久・欠込み", "防火性能", "内装制限", "2項道路後退", "低層用途制限", "用途地域", "建蔽率", "容積率", "高さ制限", "防火地域", "建築基準法制度", "木造建築士業務", "建築士事務所", "都市計画施設", "法の目的", "関連法令", "面積・高さ・階数", "確認・検査", "全国の確認対象", "居室採光", "住宅階段", "木造構造仕様", "木造軸組・柱", "共同住宅避難施設", "道路・接道", "第一種中高層住居専用地域", "用途制限", "防火・準防火地域", "建築士の業務", "建築物省エネ法", "バリアフリー法"]}, {"session": "gakka-III", "urlSlug": "gakka-III", "expectedQuestions": 25, "label": "学科III（構造）", "categories": ["荷重・外力", "地震力と風荷重", "木造部材名称", "基礎・地盤", "アンカーボルト", "柱・横架材", "梁の曲げ強さ", "梁の孔・切欠き", "存在壁量", "耐力壁仕様", "軸組の軸力", "柱脚引抜き", "小屋組", "洋小屋トラス", "床組", "枠組壁工法", "構造計画", "耐震改修", "鉛直荷重の伝達", "木材の乾燥収縮", "木材の基準強度", "木材の防腐・防蟻", "木質材料", "鉄筋コンクリート材料", "建築材料", "地震・風", "地盤・基礎", "土台・アンカーボルト", "柱の座屈", "梁端の欠込み", "風圧用見付面積", "耐力壁", "洋小屋組", "2階床組", "鉛直荷重の流れ", "木材の性質", "木材強度", "防腐・防蟻", "鉄筋コンクリート"]}, {"session": "gakka-IV", "urlSlug": "gakka-IV", "expectedQuestions": 25, "label": "学科IV（施工）", "categories": ["申請・届出", "仮設工事", "地盤調査・地業", "基礎施工", "木材の加工・使い方", "木取り・使用部位", "施工順序", "樹種と部位", "合板等の留付け", "継手", "仕口", "接合金物", "規矩術・さしがね", "小屋束の寸法", "床梁断面", "断面図の部材名称", "墨付けの合印", "屋根工事", "タイル・左官", "木部塗装", "内装・断熱施工", "設備施工", "木工具", "積算・工事費構成", "設計図書の優先順位", "安全管理", "土工・地業", "木材乾燥変形", "木材の使い方", "部材と樹種", "合板耐力壁施工", "仕口名称", "継手の図", "規矩術", "さしがね", "床伏図の断面", "床下部材", "墨付け合印", "屋根・防水", "左官・タイル", "塗装", "建具・内装", "設備配管", "機械・器具", "建築積算", "設計図書"]}], "seasons": ["annual"], "yearRange": {"start": 2025, "end": 2026}},
  "sekou-1kenchiku": {
    code: "sekou-1kenchiku", nameFull: "1級建築施工管理技術検定（第一次検定）", urlSlug: "sekou-1kenchiku", level: "advanced",
    sessions: [
      { session: "am", urlSlug: "am", expectedQuestions: 44, label: "第一次検定 午前の部", categories: ["建築学", "共通", "建築施工", "施工管理法"] },
      { session: "pm", urlSlug: "pm", expectedQuestions: 28, label: "第一次検定 午後の部", categories: ["施工管理法", "法規"] },
    ],
    seasons: ["july"], yearRange: { start: 2025, end: 2026 },
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
    seasons: ["annual"], yearRange: { start: 2024, end: 2025 },
  },

  kenchikushi1: {
    code: "kenchikushi1", nameFull: "一級建築士（学科）", urlSlug: "kenchikushi1", level: "specialist",
    sessions: [
      { session: "keikaku", urlSlug: "keikaku", expectedQuestions: 20, label: "学科Ⅰ（計画）", categories: ["計画"] },
      { session: "kankyo-setsubi", urlSlug: "kankyo-setsubi", expectedQuestions: 20, label: "学科Ⅱ（環境・設備）", categories: ["環境・設備"] },
      { session: "houki", urlSlug: "houki", expectedQuestions: 30, label: "学科Ⅲ（法規）", categories: ["法規"] },
      { session: "kozo", urlSlug: "kozo", expectedQuestions: 30, label: "学科Ⅳ（構造）", categories: ["構造"] },
      { session: "sekou", urlSlug: "sekou", expectedQuestions: 25, label: "学科Ⅴ（施工）", categories: ["施工"] },
    ],
    seasons: ["annual"], yearRange: { start: 2025, end: 2026 },
  },

"chintai": {"code":"chintai","nameFull":"賃貸不動産経営管理士","urlSlug":"chintai","level":"specialist","sessions":[{"session":"gakka","urlSlug":"gakka","expectedQuestions":49,"label":"学科","categories":["管理受託重要事項","重要事項説明書","管理受託契約の変更","契約の有効性","委任契約","防犯設計","予防保全","管理業務報告","原状回復の施工単位","原状回復の範囲","少額訴訟","被災建物の調査","採光規定","外壁定期調査","結露","火災感知器","賃料減額請求","滞納回収の手続","分別管理","サブリース","普通借家の期間・更新","定期借家の終了","破産と賃貸借","個人根保証","賃借権の譲渡・転貸","管理業の登録","従業者証明書","帳簿","標識","管理業の範囲","業務管理者","不当勧誘","監督・罰則","特定賃貸借標準契約","サブリース説明の方法","サブリース説明事項","サブリース説明担当","サブリース締結時書面","消費者契約法","家電リサイクル","住宅管理政策","管理士の職務","媒介報酬","相続税・贈与税","不動産証券化","建築構造","防水工法","ガス設備","管理士の経営支援","損害保険","成年後見","修繕義務","定期建物賃貸借","普通借家の終了","滞納解除","相続と賃貸借","管理業登録","管理業者の義務","委任の報告・費用","重要事項説明の方法","IT重要事項説明","標準管理受託契約","サブリース説明書","サブリースIT説明","勧誘者","誇大広告","サブリース監督処分","合理的配慮","住宅セーフティネット","個人情報","定期報告","設備の法定点検","相隣関係","滞納賃料の回収","賃料増減額","法人の連帯保証","企業会計","原状回復の費用負担","原状回復と少額訴訟","工作物責任","耐震診断","漏水調査","共同住宅の防火","給水設備","不動産登記","土地価格","不動産税務","火災保険","空家対策","管理士の役割","入居者募集","建築基準法の定義","駐車場・昇降機","給湯設備","住宅統計"]}],"seasons":["annual"],"yearRange":{"start":2024,"end":2025}},
"kyusui": {"code":"kyusui","nameFull":"給水装置工事主任技術者","urlSlug":"kyusui","level":"specialist","sessions":[{"session":"gakka","urlSlug":"gakka","expectedQuestions":60,"label":"学科","categories":["公衆衛生概論","水道行政","給水装置工事法","給水装置の構造及び性能","給水装置計画論","給水装置工事事務論","給水装置の概要","給水装置施工管理法"]}],"seasons":["annual"],"yearRange":{"start":2025,"end":2026}},
"biru-kan": {"code":"biru-kan","nameFull":"建築物環境衛生管理技術者","urlSlug":"biru-kan","level":"specialist","sessions":[{"session":"gakka","urlSlug":"gakka","expectedQuestions":180,"label":"学科","categories":["am","pm"]}],"seasons":["annual"],"yearRange":{"start":2024,"end":2025}},
"gijutsushi1-kikai": {"code":"gijutsushi1-kikai","nameFull":"技術士第一次試験・機械部門","urlSlug":"gijutsushi1-kikai","level":"specialist","sessions":[{"session":"ippan","urlSlug":"ippan","expectedQuestions":15,"label":"適性科目","categories":["aptitude"]},{"session":"kiso","urlSlug":"kiso","expectedQuestions":30,"label":"基礎科目","categories":["basis"]},{"session":"kikai","urlSlug":"kikai","expectedQuestions":34,"label":"専門科目","categories":["mechanical"]}],"seasons":["annual"],"yearRange":{"start":2024,"end":2025}},
"hoshasen-1": {"code":"hoshasen-1","nameFull":"第一種放射線取扱主任者","urlSlug":"hoshasen-1","level":"specialist","sessions":[{"session":"gakka","urlSlug":"gakka","expectedQuestions":269,"label":"学科","categories":["生物学","物理学","化学","実務","法令"]}],"seasons":["annual"],"yearRange":{"start":2025,"end":2026}},
"hoshasen-2": {"code":"hoshasen-2","nameFull":"第二種放射線取扱主任者","urlSlug":"hoshasen-2","level":"specialist","sessions":[{"session":"gakka","urlSlug":"gakka","expectedQuestions":139,"label":"学科","categories":["生物学","化学","物理学","実務","法令"]}],"seasons":["annual"],"yearRange":{"start":2025,"end":2026}},
"khk-kikai-kou": {"code":"khk-kikai-kou","nameFull":"高圧ガス製造保安責任者 甲種機械","urlSlug":"khk-kikai-kou","level":"specialist","sessions":[{"session":"hoki","urlSlug":"hoki","expectedQuestions":20,"label":"法令","categories":["法令"]},{"session":"hoan","urlSlug":"hoan","expectedQuestions":15,"label":"保安管理技術","categories":["保安管理技術"]},{"session":"gakushiki","urlSlug":"gakushiki","expectedQuestions":5,"label":"学識","categories":["学識"]}],"seasons":["annual"],"yearRange":{"start":2024,"end":2025}},
"khk-kikai-otsu": {"code":"khk-kikai-otsu","nameFull":"高圧ガス製造保安責任者 乙種機械","urlSlug":"khk-kikai-otsu","level":"specialist","sessions":[{"session":"hoki","urlSlug":"hoki","expectedQuestions":20,"label":"法令","categories":["法令"]},{"session":"hoan","urlSlug":"hoan","expectedQuestions":15,"label":"保安管理技術","categories":["保安管理技術"]},{"session":"gakushiki","urlSlug":"gakushiki","expectedQuestions":15,"label":"学識","categories":["学識"]}],"seasons":["annual"],"yearRange":{"start":2024,"end":2025}},
"energy-kanri": {"code":"energy-kanri","nameFull":"エネルギー管理士","urlSlug":"energy-kanri","level":"specialist","sessions":[{"session":"kyotsu","urlSlug":"kyotsu","expectedQuestions":42,"label":"学科","categories":["エネルギー管理法規","エネルギー情勢・政策、エネルギー概論","エネルギー管理技術の基礎"]},{"session":"senmon","urlSlug":"senmon","expectedQuestions":371,"label":"学科","categories":["電気及び電子理論","自動制御及び情報処理","電気計測","工場配電","電気機器・変圧器","電気機器","電動力応用","電気加熱","電気化学","照明","空気調和","熱力学の基礎","流体工学の基礎","伝熱工学の基礎","燃料及び燃焼管理","燃焼計算","計測及び制御","ボイラ・蒸気輸送配管","蒸気原動機・内燃機関・ガスタービン","熱交換器・熱回収装置","冷凍・空気調和設備","工業炉・熱設備材料","蒸留・蒸発・濃縮装置、乾燥装置、乾留・ガス化装置"]}],"seasons":["annual"],"yearRange":{"start":2025,"end":2026}},

kanteishi: {
    code: "kanteishi", nameFull: "不動産鑑定士試験（短答式）", urlSlug: "kanteishi", level: "specialist",
    sessions: [
        { session: "gyosei", urlSlug: "gyosei", expectedQuestions: 40, label: "不動産に関する行政法規", categories: ["行政法規"] },
        { session: "riron", urlSlug: "riron", expectedQuestions: 40, label: "不動産の鑑定評価に関する理論", categories: ["鑑定評価理論"] },
    ],
    seasons: ["annual"], yearRange: { start: 2025, end: 2026 },
},
kaikeishi: {
    code: "kaikeishi", nameFull: "公認会計士試験（短答式）", urlSlug: "kaikeishi", level: "specialist",
    sessions: [
        { session: "kigyo", urlSlug: "kigyo", expectedQuestions: 20, label: "企業法", categories: ["企業法"] },
        { session: "kanri", urlSlug: "kanri", expectedQuestions: 18, label: "管理会計論", categories: ["管理会計論"] },
        { session: "kansa", urlSlug: "kansa", expectedQuestions: 20, label: "監査論", categories: ["監査論"] },
        { session: "zaimu", urlSlug: "zaimu", expectedQuestions: 35, label: "財務会計論", categories: ["財務会計論"] },
    ],
    seasons: ["round1", "round2"], yearRange: { start: 2026, end: 2026 },
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
    yearRange: { start: 2024, end: 2025 },
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
    yearRange: { start: 2024, end: 2026 },
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
    yearRange: { start: 2024, end: 2025 },
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
    nameFull: "登録販売者試験",
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
    yearRange: { start: 2024, end: 2025 },
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
    seasons: ["published", "october"],
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
    yearRange: { start: 2020, end: 2025 },
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
    seasons: ["annual"],
    yearRange: { start: 2025, end: 2026 },
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
    yearRange: { start: 2021, end: 2025 },
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
    seasons: ["annual"],
    yearRange: { start: 2024, end: 2025 },
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
    yearRange: { start: 2025, end: 2026 },
  },
"shino-kunrenshi": {
    code: "shino-kunrenshi",
    nameFull: "視能訓練士国家試験",
    urlSlug: "shino-kunrenshi",
    level: "advanced",
    sessions: [{ session: "am", urlSlug: "am", expectedQuestions: 75, label: "午前", categories: ["午前"] }, { session: "pm", urlSlug: "pm", expectedQuestions: 75, label: "午後", categories: ["午後"] }],
    seasons: ["annual"],
    yearRange: { start: 2024, end: 2025 },
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
    yearRange: { start: 2024, end: 2025 },
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
    yearRange: { start: 2024, end: 2025 },
},
kangoshi: {
    code: "kangoshi",
    nameFull: "看護師国家試験",
    urlSlug: "kangoshi",
    level: "basic",
    // 直近2回の確認済み原問と、第113～111回の午前各10問を部分収録。expectedQuestionsは既存の表示設定。
    sessions: [{
            session: "am", urlSlug: "am", expectedQuestions: 50, label: "午前",
            categories: ["必修問題", "一般問題"],
        }],
    seasons: ["annual"],
    yearRange: { start: 2021, end: 2025 },
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
    yearRange: { start: 2025, end: 2026 },
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
    seasons: ["february", "june"], yearRange: { start: 2026, end: 2026 },
},
"maritime2": {
    code: "maritime2", nameFull: "第二級海上無線通信士試験", urlSlug: "maritime2", level: "specialist",
    sessions: [
        { session: "kiso", urlSlug: "kiso", expectedQuestions: 25, label: "無線工学の基礎", categories: ["無線工学の基礎"] },
        { session: "kogaku-a", urlSlug: "kogaku-a", expectedQuestions: 25, label: "無線工学A", categories: ["無線工学A"] },
        { session: "kogaku-b", urlSlug: "kogaku-b", expectedQuestions: 25, label: "無線工学B", categories: ["無線工学B"] },
        { session: "houki", urlSlug: "houki", expectedQuestions: 20, label: "法規", categories: ["法規"] },
    ],
    seasons: ["march", "september"], yearRange: { start: 2026, end: 2026 },
},
"maritime1": {
    code: "maritime1", nameFull: "第一級海上無線通信士試験", urlSlug: "maritime1", level: "specialist",
    sessions: [
        { session: "kiso", urlSlug: "kiso", expectedQuestions: 25, label: "無線工学の基礎", categories: ["無線工学の基礎"] },
        { session: "kogaku-a", urlSlug: "kogaku-a", expectedQuestions: 25, label: "無線工学A", categories: ["無線工学A"] },
        { session: "kogaku-b", urlSlug: "kogaku-b", expectedQuestions: 25, label: "無線工学B", categories: ["無線工学B"] },
        { session: "hoki", urlSlug: "hoki", expectedQuestions: 20, label: "法規", categories: ["法規"] },
    ],
    seasons: ["march", "september"], yearRange: { start: 2026, end: 2026 },
},
"general1": {
    code: "general1", nameFull: "第一級総合無線通信士試験", urlSlug: "general1", level: "specialist",
    sessions: [
        { session: "kiso", urlSlug: "kiso", expectedQuestions: 25, label: "無線工学の基礎", categories: ["無線工学の基礎"] },
        { session: "kogaku-a", urlSlug: "kogaku-a", expectedQuestions: 25, label: "無線工学A", categories: ["無線工学A"] },
        { session: "kogaku-b", urlSlug: "kogaku-b", expectedQuestions: 25, label: "無線工学B", categories: ["無線工学B"] },
        { session: "hoki", urlSlug: "hoki", expectedQuestions: 25, label: "法規", categories: ["法規"] },
        { session: "tiri", urlSlug: "tiri", expectedQuestions: 35, label: "地理", categories: ["地理"] },
    ],
    seasons: ["march", "september"], yearRange: { start: 2026, end: 2026 },
},
"general2": {
    code: "general2", nameFull: "第二級総合無線通信士試験", urlSlug: "general2", level: "specialist",
    sessions: [
        { session: "kiso", urlSlug: "kiso", expectedQuestions: 25, label: "無線工学の基礎", categories: ["無線工学の基礎"] },
        { session: "kogaku-a", urlSlug: "kogaku-a", expectedQuestions: 25, label: "無線工学A", categories: ["無線工学A"] },
        { session: "kogaku-b", urlSlug: "kogaku-b", expectedQuestions: 25, label: "無線工学B", categories: ["無線工学B"] },
        { session: "hoki", urlSlug: "hoki", expectedQuestions: 25, label: "法規", categories: ["法規"] },
        { session: "tiri", urlSlug: "tiri", expectedQuestions: 40, label: "地理", categories: ["地理"] },
    ],
    seasons: ["march", "september"], yearRange: { start: 2026, end: 2026 },
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
    ],
    seasons: ["march", "september"], yearRange: { start: 2026, end: 2026 },
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
    seasons: ["january", "july"], yearRange: { start: 2026, end: 2026 },
},
"riku-tech2": {
    code: "riku-tech2", nameFull: "第二級陸上無線技術士試験", urlSlug: "riku-tech2", level: "specialist",
    sessions: [
        { session: "houki", urlSlug: "houki", expectedQuestions: 20, label: "法規", categories: ["法規"] },
        { session: "kiso", urlSlug: "kiso", expectedQuestions: 25, label: "無線工学の基礎", categories: ["無線工学の基礎"] },
        { session: "kogaku-a", urlSlug: "kogaku-a", expectedQuestions: 25, label: "無線工学A", categories: ["無線工学A"] },
        { session: "kogaku-b", urlSlug: "kogaku-b", expectedQuestions: 25, label: "無線工学B", categories: ["無線工学B"] },
    ],
    seasons: ["january", "july"], yearRange: { start: 2026, end: 2026 },
},
"amateur2": {
    code: "amateur2", nameFull: "第二級アマチュア無線技士試験", urlSlug: "amateur2", level: "specialist",
    sessions: [
        { session: "kogaku", urlSlug: "kogaku", expectedQuestions: 25, label: "無線工学", categories: ["無線工学"] },
        { session: "houki", urlSlug: "houki", expectedQuestions: 30, label: "法規", categories: ["法規"] },
    ],
    seasons: ["may", "august"], yearRange: { start: 2026, end: 2026 },
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
    seasons: ["may", "august"], yearRange: { start: 2026, end: 2026 },
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
    ],
    seasons: ["february", "august"], yearRange: { start: 2026, end: 2026 },
},
"maritime4": {
    code: "maritime4", nameFull: "第四級海上無線通信士試験", urlSlug: "maritime4", level: "specialist",
    sessions: [
        { session: "kogaku", urlSlug: "kogaku", expectedQuestions: 18, label: "無線工学", categories: ["無線工学"] },
        { session: "houki", urlSlug: "houki", expectedQuestions: 20, label: "法規", categories: ["法規"] },
    ],
    seasons: ["february", "august"], yearRange: { start: 2026, end: 2026 },
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
    seasons: ["february", "june"], yearRange: { start: 2026, end: 2026 },
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
    seasons: ["first", "second"], yearRange: { start: 2025, end: 2026 },
},
"kenchiku-setsubishi": {
    code: "kenchiku-setsubishi", nameFull: "建築設備士試験（第一次試験）", urlSlug: "kenchiku-setsubishi", level: "specialist",
    sessions: [
        { session: "am1", urlSlug: "am1", expectedQuestions: 27, label: "建築一般知識", categories: ["建築一般知識"] },
        { session: "am2", urlSlug: "am2", expectedQuestions: 18, label: "建築法規", categories: ["建築法規"] },
        { session: "pm", urlSlug: "pm", expectedQuestions: 60, label: "建築設備", categories: ["建築設備"] },
    ],
    seasons: ["annual"], yearRange: { start: 2025, end: 2026 },
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
        { session: "senmon", urlSlug: "senmon", expectedQuestions: 15, label: "学科専門", categories: ["学科専門"] }],
    seasons: ["first", "second"], yearRange: { start: 2026, end: 2026 } },
"jidosha-1-small-written": {
    code: "jidosha-1-small-written", nameFull: "一級小型自動車整備士（筆記）", urlSlug: "jidosha-1-small-written", level: "specialist",
    sessions: [{ session: "gakka", urlSlug: "gakka", expectedQuestions: 50, label: "学科", categories: ["一級小型自動車（筆記）"] }],
    seasons: ["first", "second"], yearRange: { start: 2024, end: 2026 },
},
"jidosha-2-gasoline": {
    code: "jidosha-2-gasoline", nameFull: "二級ガソリン自動車整備士", urlSlug: "jidosha-2-gasoline", level: "specialist",
    sessions: [{ session: "gakka", urlSlug: "gakka", expectedQuestions: 40, label: "学科", categories: ["二級ガソリン自動車"] }],
    seasons: ["first", "second"], yearRange: { start: 2025, end: 2026 },
},
"jidosha-2-diesel": {
    code: "jidosha-2-diesel", nameFull: "二級ジーゼル自動車整備士", urlSlug: "jidosha-2-diesel", level: "specialist",
    sessions: [{ session: "gakka", urlSlug: "gakka", expectedQuestions: 40, label: "学科", categories: ["二級ジーゼル自動車"] }],
    seasons: ["first", "second"], yearRange: { start: 2025, end: 2026 },
},
"jidosha-2-chassis": {
    code: "jidosha-2-chassis", nameFull: "二級自動車シャシ整備士", urlSlug: "jidosha-2-chassis", level: "specialist",
    sessions: [{ session: "gakka", urlSlug: "gakka", expectedQuestions: 30, label: "学科", categories: ["二級自動車シャシ"] }],
    seasons: ["first", "second"], yearRange: { start: 2024, end: 2026 },
},
"jidosha-2-motorcycle": {
    code: "jidosha-2-motorcycle", nameFull: "二級二輪自動車整備士", urlSlug: "jidosha-2-motorcycle", level: "specialist",
    sessions: [{ session: "gakka", urlSlug: "gakka", expectedQuestions: 40, label: "学科", categories: ["二級２輪自動車"] }],
    seasons: ["first", "second"], yearRange: { start: 2025, end: 2026 },
},
"jidosha-3-chassis": {
    code: "jidosha-3-chassis", nameFull: "三級自動車シャシ整備士", urlSlug: "jidosha-3-chassis", level: "specialist",
    sessions: [{ session: "gakka", urlSlug: "gakka", expectedQuestions: 30, label: "学科", categories: ["三級自動車シャシ"] }],
    seasons: ["first", "second"], yearRange: { start: 2025, end: 2026 },
},
"jidosha-3-gasoline": {
    code: "jidosha-3-gasoline", nameFull: "三級自動車ガソリン・エンジン整備士", urlSlug: "jidosha-3-gasoline", level: "specialist",
    sessions: [{ session: "gakka", urlSlug: "gakka", expectedQuestions: 30, label: "学科", categories: ["三級自動車ガソリン・エンジン"] }],
    seasons: ["first", "second"], yearRange: { start: 2025, end: 2026 },
},
"jidosha-3-diesel": {
    code: "jidosha-3-diesel", nameFull: "三級自動車ジーゼル・エンジン整備士", urlSlug: "jidosha-3-diesel", level: "specialist",
    sessions: [{ session: "gakka", urlSlug: "gakka", expectedQuestions: 30, label: "学科", categories: ["三級自動車ジーゼル・エンジン"] }],
    seasons: ["first", "second"], yearRange: { start: 2025, end: 2026 },
},
"jidosha-3-motorcycle": {
    code: "jidosha-3-motorcycle", nameFull: "三級二輪自動車整備士", urlSlug: "jidosha-3-motorcycle", level: "specialist",
    sessions: [{ session: "gakka", urlSlug: "gakka", expectedQuestions: 30, label: "学科", categories: ["三級２輪自動車"] }],
    seasons: ["first", "second"], yearRange: { start: 2024, end: 2026 },
},
"jidosha-body": {
    code: "jidosha-body", nameFull: "自動車車体整備士", urlSlug: "jidosha-body", level: "specialist",
    sessions: [{ session: "gakka", urlSlug: "gakka", expectedQuestions: 40, label: "学科", categories: ["自動車車体"] }],
    seasons: ["first", "second"], yearRange: { start: 2025, end: 2026 },
},
"jidosha-electrical": {
    code: "jidosha-electrical", nameFull: "自動車電気装置整備士", urlSlug: "jidosha-electrical", level: "specialist",
    sessions: [{ session: "gakka", urlSlug: "gakka", expectedQuestions: 40, label: "学科", categories: ["自動車電気装置"] }],
    seasons: ["first", "second"], yearRange: { start: 2024, end: 2026 },
},
"biyoshi": { code: "biyoshi", nameFull: "美容師", urlSlug: "biyoshi", level: "basic", sessions: [{ session: "gakka", urlSlug: "gakka", expectedQuestions: 55, label: "筆記", categories: ["美容師筆記"] }], seasons: ["first", "second"], yearRange: { start: 2026, end: 2026 } },
"kikenbutsu-otsu1": { code: "kikenbutsu-otsu1", nameFull: "危険物取扱者 乙種第1類", urlSlug: "kikenbutsu-otsu1", level: "basic", sessions: [{ session: "gakka", urlSlug: "gakka", expectedQuestions: 10, label: "筆記", categories: ["危険物の性質・火災予防・消火"] }], seasons: ["published"], yearRange: { start: 2026, end: 2026 } },
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
    seasons: ["annual"], yearRange: { start: 2024, end: 2025 },
},
denki1: {
    code: "denki1", nameFull: "1級電気工事施工管理技術検定（第一次検定）", urlSlug: "sekou-1denki", level: "advanced",
    sessions: [{ session: "gakka", urlSlug: "gakka", expectedQuestions: 89, label: "第一次検定",
            categories: ["電気工学等（必須）", "電気工学等（選択）", "電気設備（選択）", "関連分野（選択）", "施工管理法（必須）", "施工管理法・応用能力（必須）", "施工管理法（選択）", "法規（選択）"],
        }],
    seasons: ["annual"], yearRange: { start: 2025, end: 2026 },
},
shuwa: {
    code: "shuwa", nameFull: "手話通訳士（学科試験）", urlSlug: "shuwa", level: "specialist",
    sessions: [
        { session: "mondai-a", urlSlug: "mondai-a", expectedQuestions: 20, label: "障害者福祉の基礎知識", categories: ["障害者福祉の基礎知識"] },
        { session: "mondai-b", urlSlug: "mondai-b", expectedQuestions: 20, label: "聴覚障害者に関する基礎知識", categories: ["聴覚障害者に関する基礎知識"] },
        { session: "mondai-c", urlSlug: "mondai-c", expectedQuestions: 20, label: "手話通訳のあり方", categories: ["手話通訳のあり方"] },
        { session: "mondai-d", urlSlug: "mondai-d", expectedQuestions: 20, label: "国語", categories: ["国語"] },
    ],
    seasons: ["annual"], yearRange: { start: 2025, end: 2026 },
},
"reform-mgr": { code: "reform-mgr", nameFull: "マンションリフォームマネジャー学科試験", urlSlug: "reform-mgr", level: "specialist", sessions: [{ session: "gakka", urlSlug: "gakka", expectedQuestions: 50, label: "学科（未公開）", categories: ["??"] }], seasons: ["annual"], yearRange: { start: 2025, end: 2026 } },
"shohi-sodan": { code: "shohi-sodan", nameFull: "消費生活相談員資格試験（マークシート部分）", urlSlug: "shohi-sodan", level: "specialist", sessions: [{ session: "gakka", urlSlug: "gakka", expectedQuestions: 160, label: "マークシート式試験（未公開）", categories: ["??"] }], seasons: ["annual"], yearRange: { start: 2024, end: 2025 } },
"jken-katsuyo1": {
    code: "jken-katsuyo1", nameFull: "情報検定（J検）情報活用1級", urlSlug: "jken-katsuyo1", level: "basic",
    sessions: [{ session: "gakka", urlSlug: "gakka", expectedQuestions: 43, label: "情報活用1級", categories: ["情報と情報の利用", "パソコンを利用したシステム", "ネットワークの利用", "情報ネットワーク社会への対応", "情報セキュリティ", "表計算ソフト等を利用した問題解決"] }],
    seasons: ["first", "second"], yearRange: { start: 2025, end: 2026 },
},
"jken-katsuyo2": {
    code: "jken-katsuyo2", nameFull: "情報検定（J検）情報活用2級", urlSlug: "jken-katsuyo2", level: "basic",
    sessions: [{ session: "gakka", urlSlug: "gakka", expectedQuestions: 50, label: "情報活用2級", categories: ["経営戦略とシステム戦略", "プロジェクトマネジメント", "データ構造と情報表現", "問題解決処理手順", "パソコンの基礎", "インターネットの基礎", "アプリケーションソフトの利用"] }],
    seasons: ["first", "second"], yearRange: { start: 2025, end: 2026 },
},
"jken-katsuyo3": {
    code: "jken-katsuyo3", nameFull: "情報検定（J検）情報活用3級", urlSlug: "jken-katsuyo3", level: "basic",
    sessions: [{ session: "gakka", urlSlug: "gakka", expectedQuestions: 46, label: "情報活用3級", categories: ["情報表現と処理手順", "パソコンの基礎", "インターネットの基礎", "インターネットの利用", "情報機器の基本操作", "情報社会とコンピュータ", "情報モラル"] }],
    seasons: ["first", "second"], yearRange: { start: 2025, end: 2026 },
},
"jken-system": {
    code: "jken-system", nameFull: "情報検定（J検）情報システム試験", urlSlug: "jken-system", level: "basic",
    sessions: [
        { session: "jken-basic", urlSlug: "basic", expectedQuestions: 41, label: "基本スキル", categories: ["基本スキル"] },
        { session: "jken-programming", urlSlug: "programming", expectedQuestions: 32, label: "プログラミングスキル", categories: ["プログラミングスキル"] },
        { session: "jken-design", urlSlug: "design", expectedQuestions: 40, label: "システムデザインスキル", categories: ["システムデザインスキル"] },
    ],
    seasons: ["late", "early"], yearRange: { start: 2025, end: 2026 },
},
shinrishi: {
    code: "shinrishi", nameFull: "公認心理師試験", urlSlug: "shinrishi", level: "basic",
    sessions: [
        { session: "am", urlSlug: "am", expectedQuestions: 77, label: "午前", categories: ["公認心理師"] },
        { session: "pm", urlSlug: "pm", expectedQuestions: 77, label: "午後", categories: ["公認心理師"] },
    ],
    seasons: ["annual"], yearRange: { start: 2025, end: 2026 },
},
"khk-reito-3": {
    code: "khk-reito-3", nameFull: "高圧ガス製造保安責任者試験（第三種冷凍機械）", urlSlug: "khk-reito-3", level: "advanced",
    sessions: [
        { session: "houki", urlSlug: "houki", expectedQuestions: 20, label: "法令", categories: ["法令"] },
        { session: "hoan", urlSlug: "hoan", expectedQuestions: 15, label: "保安管理技術", categories: ["保安管理技術"] },
    ],
    seasons: ["annual"], yearRange: { start: 2024, end: 2025 },
},
"khk-reito-2": {
    code: "khk-reito-2", nameFull: "高圧ガス製造保安責任者試験（第二種冷凍機械）", urlSlug: "khk-reito-2", level: "advanced",
    sessions: [
        { session: "houki", urlSlug: "houki", expectedQuestions: 20, label: "法令", categories: ["法令"] },
        { session: "hoan", urlSlug: "hoan", expectedQuestions: 10, label: "保安管理技術", categories: ["保安管理技術"] },
        { session: "kogaku", urlSlug: "kogaku", expectedQuestions: 10, label: "学識", categories: ["学識"] },
    ],
    seasons: ["annual"], yearRange: { start: 2024, end: 2025 },
},
"khk-reito-1": {
    code: "khk-reito-1", nameFull: "高圧ガス製造保安責任者試験（第一種冷凍機械）", urlSlug: "khk-reito-1", level: "advanced",
    sessions: [
        { session: "houki", urlSlug: "houki", expectedQuestions: 20, label: "法令", categories: ["法令"] },
        { session: "hoan", urlSlug: "hoan", expectedQuestions: 15, label: "保安管理技術", categories: ["保安管理技術"] },
        { session: "kogaku", urlSlug: "kogaku", expectedQuestions: 5, label: "学識", categories: ["学識"] },
    ],
    seasons: ["annual"], yearRange: { start: 2024, end: 2025 },
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
    yearRange: { start: 2025, end: 2026 },
},
denki2: {
    code: "denki2", nameFull: "2級電気工事施工管理技術検定（第一次検定）", urlSlug: "sekou-2denki", level: "basic",
    sessions: [{ session: "gakka", urlSlug: "gakka", expectedQuestions: 62, label: "第一次検定",
            categories: ["電気工学等（必須）", "電気工学等（選択）", "電気設備（選択）", "関連分野（選択）", "施工管理法（必須）", "施工管理法・能力（必須）", "施工管理法（選択）", "法規（選択）"],
        }],
    seasons: ["early", "late"], yearRange: { start: 2025, end: 2026 },
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
    seasons: ["annual"], yearRange: { start: 2025, end: 2026 },
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
    seasons: ["annual"], yearRange: { start: 2025, end: 2026 },
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
    "yearRange": {
        "start": 2024,
        "end": 2025
    }
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
    "yearRange": {
        "start": 2024,
        "end": 2025
    }
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
    "yearRange": {
        "start": 2024,
        "end": 2025
    }
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
    seasons: ["annual"], yearRange: { start: 2025, end: 2026 },
},
kenki1: {
    code: "kenki1", nameFull: "1級建設機械施工管理技術検定（第一次検定）", urlSlug: "kenki1", level: "specialist",
    sessions: [{ session: "gakka", urlSlug: "gakka", expectedQuestions: 56, label: "第一次検定", categories: ["土木一般", "施工管理", "建設機械", "法規"] }],
    seasons: ["annual"], yearRange: { start: 2025, end: 2026 },
},
gyosei: {
    code: "gyosei", nameFull: "行政書士試験", urlSlug: "gyosei", level: "advanced",
    sessions: [{ session: "gakka", urlSlug: "gakka", expectedQuestions: 56, label: "択一式・多肢選択式・記述式（公式公開分）", categories: ["基礎法学", "憲法", "行政法", "民法", "商法・会社法", "基礎知識"] }],
    seasons: ["annual"], yearRange: { start: 2024, end: 2025 },
},
shihoshoshi: {
    code: "shihoshoshi", nameFull: "司法書士試験（午前・午後の多肢択一式）", urlSlug: "shihoshoshi", level: "specialist",
    sessions: [
        { session: "am", urlSlug: "am", expectedQuestions: 35, label: "午前（多肢択一式）", categories: ["憲法", "民法", "刑法", "会社法・商法"] },
        { session: "pm", urlSlug: "pm", expectedQuestions: 35, label: "午後（多肢択一式）", categories: ["民事訴訟法・民事執行法・民事保全法", "司法書士法", "供託法", "不動産登記法", "商業登記法"] },
    ], seasons: ["annual"], yearRange: { start: 2025, end: 2026 },
},
"career-consultant": {
    code: "career-consultant", nameFull: "国家資格キャリアコンサルタント試験（学科）", urlSlug: "career-consultant", level: "specialist",
    sessions: [{ session: "gakka", urlSlug: "gakka", expectedQuestions: 50, label: "学科試験", categories: ["キャリアコンサルティングの社会的意義", "キャリアコンサルティングを行うために必要な知識", "キャリアコンサルティングを行うために必要な技能", "キャリアコンサルタントの倫理と行動"] }],
    seasons: ["autumn", "july"], yearRange: { start: 2026, end: 2026 },
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
    ], seasons: ["annual"], yearRange: { start: 2025, end: 2026 },
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
    ], seasons: ["annual"], yearRange: { start: 2025, end: 2026 },
},
sokuryoshiho: {
    code: "sokuryoshiho", nameFull: "測量士補試験", urlSlug: "sokuryoshiho", level: "basic",
    sessions: [{ session: "gakka", urlSlug: "gakka", expectedQuestions: 28, label: "試験問題", categories: ["測量法規", "多角測量", "GNSS測量", "水準測量", "地形測量", "写真測量", "地図編集", "応用測量"] }],
    seasons: ["annual"], yearRange: { start: 2025, end: 2026 },
},
caremanager: {
    code: "caremanager", nameFull: "介護支援専門員実務研修受講試験", urlSlug: "caremanager", level: "basic",
    sessions: [{ session: "gakka", urlSlug: "gakka", expectedQuestions: 60, label: "試験問題", categories: ["介護支援分野", "保健医療サービスの知識等", "福祉サービスの知識等"] }],
    seasons: ["annual"], yearRange: { start: 2024, end: 2025 },
},
"kikai-hozen": {
    code: "kikai-hozen", nameFull: "機械保全技能検定 2級（機械系保全作業 学科）", urlSlug: "kikai-hozen", level: "basic",
    sessions: [{ session: "gakka", urlSlug: "gakka", expectedQuestions: 50, label: "学科（真偽法25・四肢択一25）", categories: ["機械一般", "電気一般", "機械保全法一般", "材料一般", "安全衛生", "機械系保全法"] }],
    seasons: ["annual"], yearRange: { start: 2024, end: 2025 },
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
  "yearRange": {
    "start": 2023,
    "end": 2024
  }
},
  "toso2": {"code": "toso2", "nameFull": "技能検定 2級塗装（建築塗装作業）学科試験", "urlSlug": "toso2", "level": "basic", "sessions": [{"session": "gakka", "urlSlug": "gakka", "expectedQuestions": 50, "label": "学科（A群 真偽法・B群 多肢択一法）", "categories": ["塗装の目的", "塗装方法・工具", "色彩・測色", "塗料・乾燥", "塗膜試験・欠陥", "養生・施工", "素地調整・仕様", "溶剤・安全衛生", "研磨・材料", "建築材料・構造"]}], "seasons": ["early"], "yearRange": {"start": 2023, "end": 2024}},
  "fujin-kodomofuku2": {"code": "fujin-kodomofuku2", "nameFull": "技能検定 2級婦人子供服製造（婦人子供注文服製作作業）学科試験", "urlSlug": "fujin-kodomofuku2", "level": "basic", "sessions": [{"session": "gakka", "urlSlug": "gakka", "expectedQuestions": 50, "label": "学科（A群 真偽法・B群 多肢択一法）", "categories": ["服装の歴史・様式", "製図・採寸", "糸・副資材", "繊維・生地", "縫製・仕上げ", "デザイン・色彩", "安全衛生", "裁断・仮縫い"]}], "seasons": ["early"], "yearRange": {"start": 2023, "end": 2023}},
  "kojo-bankin1": {"code": "kojo-bankin1", "nameFull": "技能検定 1級工場板金（曲げ板金作業）学科試験", "urlSlug": "kojo-bankin1", "level": "advanced", "sessions": [{"session": "gakka", "urlSlug": "gakka", "expectedQuestions": 50, "label": "学科（A群 真偽法・B群 多肢択一法）", "categories": ["せん断・穴あけ", "品質管理", "展開・板取り", "工具・機械", "曲げ加工", "材料・表面処理", "測定", "溶接・接合", "絞り加工", "製図", "電気・安全衛生"]}], "seasons": ["early"], "yearRange": {"start": 2023, "end": 2024}},
  "kinzoku-netsushori3": {"code": "kinzoku-netsushori3", "nameFull": "技能検定 3級金属熱処理（一般熱処理作業）学科試験", "urlSlug": "kinzoku-netsushori3", "level": "basic", "sessions": [{"session": "gakka", "urlSlug": "gakka", "expectedQuestions": 30, "label": "学科（真偽法）", "categories": ["品質管理", "安全衛生", "材料・加工", "材料試験", "洗浄・表面硬化", "炉・雰囲気", "焼入れ・焼戻し", "金属組織"]}], "seasons": ["early"], "yearRange": {"start": 2025, "end": 2025}},
  "kojo-bankin3": {"code": "kojo-bankin3", "nameFull": "技能検定 3級工場板金（曲げ板金作業）学科試験", "urlSlug": "kojo-bankin3", "level": "basic", "sessions": [{"session": "gakka", "urlSlug": "gakka", "expectedQuestions": 30, "label": "学科（真偽法）", "categories": ["せん断・穴あけ", "品質管理", "展開・板取り", "工具・機械", "曲げ加工", "材料・表面処理", "測定", "溶接・接合", "絞り加工", "製図", "電気・安全衛生"]}], "seasons": ["early"], "yearRange": {"start": 2024, "end": 2024}},
  "kojo-bankin2": {"code": "kojo-bankin2", "nameFull": "技能検定 2級工場板金（曲げ板金作業）学科試験", "urlSlug": "kojo-bankin2", "level": "basic", "sessions": [{"session": "gakka", "urlSlug": "gakka", "expectedQuestions": 50, "label": "学科（A群 真偽法・B群 多肢択一法）", "categories": ["せん断・穴あけ", "品質管理", "展開・板取り", "工具・機械", "曲げ加工", "材料・表面処理", "測定", "溶接・接合", "絞り加工", "製図", "電気・安全衛生"]}], "seasons": ["early"], "yearRange": {"start": 2024, "end": 2024}},
  "mekki2": {"code": "mekki2", "nameFull": "技能検定 2級めっき（電気めっき作業）学科試験", "urlSlug": "mekki2", "level": "basic", "sessions": [{"session": "gakka", "urlSlug": "gakka", "expectedQuestions": 50, "label": "学科（A群 真偽法・B群 多肢択一法）", "categories": ["前処理・研磨", "電気化学・薬品", "排水・環境", "品質管理・規格", "安全衛生", "めっき浴・皮膜", "設備・治具", "分析・試験", "材料・加工", "後処理・防食"]}], "seasons": ["early"], "yearRange": {"start": 2023, "end": 2024}},
  "kagu3": {"code": "kagu3", "nameFull": "技能検定 3級家具製作（家具手加工作業）学科試験", "urlSlug": "kagu3", "level": "basic", "sessions": [{"session": "gakka", "urlSlug": "gakka", "expectedQuestions": 30, "label": "学科（真偽法）", "categories": ["家具の種類・構造", "製図・測定", "電気・安全衛生", "木材・木質材料", "接合・組立て", "手工具", "木工機械・加工", "研磨・塗装"]}], "seasons": ["late"], "yearRange": {"start": 2024, "end": 2024}},
  "kagu1": {"code": "kagu1", "nameFull": "技能検定 1級家具製作（家具手加工作業）学科試験", "urlSlug": "kagu1", "level": "basic", "sessions": [{"session": "gakka", "urlSlug": "gakka", "expectedQuestions": 50, "label": "学科（A群 真偽法・B群 多肢択一法）", "categories": ["家具の種類・構造", "製図・測定", "電気・安全衛生", "法令・環境", "接合・組立て", "木材・木質材料", "手工具", "木工機械・加工", "研磨・塗装"]}], "seasons": ["early"], "yearRange": {"start": 2023, "end": 2024}},
  "kagu2": {"code": "kagu2", "nameFull": "技能検定 2級家具製作（家具手加工作業）学科試験", "urlSlug": "kagu2", "level": "basic", "sessions": [{"session": "gakka", "urlSlug": "gakka", "expectedQuestions": 50, "label": "学科（A群 真偽法・B群 多肢択一法）", "categories": ["家具の種類・構造", "製図・測定", "電気・安全衛生", "法令・環境", "接合・組立て", "木材・木質材料", "手工具", "研磨・塗装", "木工機械・加工"]}], "seasons": ["early"], "yearRange": {"start": 2024, "end": 2024}},
  "mekki3": {"code": "mekki3", "nameFull": "技能検定 3級めっき（電気めっき作業）学科試験", "urlSlug": "mekki3", "level": "basic", "sessions": [{"session": "gakka", "urlSlug": "gakka", "expectedQuestions": 30, "label": "学科（真偽法）", "categories": ["電気化学・薬品", "前処理・研磨", "めっき浴・皮膜", "設備・治具", "排水・環境", "安全衛生", "後処理・防食", "品質管理・規格", "分析・試験"]}], "seasons": ["early"], "yearRange": {"start": 2023, "end": 2023}},
  "mekki1": {"code": "mekki1", "nameFull": "技能検定 1級めっき（電気めっき作業）学科試験", "urlSlug": "mekki1", "level": "advanced", "sessions": [{"session": "gakka", "urlSlug": "gakka", "expectedQuestions": 50, "label": "学科（A群 真偽法・B群 多肢択一法）", "categories": ["前処理・研磨", "電気化学・薬品", "排水・環境", "品質管理・規格", "安全衛生", "めっき浴・皮膜", "設備・治具", "分析・試験", "材料・加工", "後処理・防食"]}], "seasons": ["early"], "yearRange": {"start": 2023, "end": 2025}},
  "kinzoku-netsushori1": {"code": "kinzoku-netsushori1", "nameFull": "技能検定 1級金属熱処理（一般熱処理作業）学科試験", "urlSlug": "kinzoku-netsushori1", "level": "advanced", "sessions": [{"session": "gakka", "urlSlug": "gakka", "expectedQuestions": 50, "label": "学科（A群 真偽法・B群 多肢択一法）", "categories": ["品質管理", "安全衛生", "材料・加工", "材料試験", "洗浄・表面硬化", "炉・雰囲気", "焼入れ・焼戻し", "製図・電気", "金属組織"]}], "seasons": ["early"], "yearRange": {"start": 2024, "end": 2025}},
  "tekko1": {"code": "tekko1", "nameFull": "技能検定 1級鉄工（製缶作業）学科試験", "urlSlug": "tekko1", "level": "advanced", "sessions": [{"session": "gakka", "urlSlug": "gakka", "expectedQuestions": 50, "label": "学科（A群 真偽法・B群 多肢択一法）", "categories": ["ガス切断・溶接", "ボイラー・圧力容器", "品質管理", "安全衛生", "展開・板取り", "曲げ・ひずみ矯正", "材料・熱処理", "測定・けがき", "穴あけ・機械加工", "表面処理・検査", "製図", "電気"]}], "seasons": ["early"], "yearRange": {"start": 2023, "end": 2024}},
  "denshi-kiki-kumitate1": {"code": "denshi-kiki-kumitate1", "nameFull": "技能検定 1級電子機器組立て（電子機器組立て作業）学科試験", "urlSlug": "denshi-kiki-kumitate1", "level": "advanced", "sessions": [{"session": "gakka", "urlSlug": "gakka", "expectedQuestions": 50, "label": "学科（A群 真偽法・B群 多肢択一法）", "categories": ["電子部品・回路", "電気理論", "情報処理", "実装・接続", "工作・測定", "品質管理", "材料・製図", "安全衛生"]}], "seasons": ["early"], "yearRange": {"start": 2025, "end": 2025}},
  "denshi-kiki-kumitate3": {"code": "denshi-kiki-kumitate3", "nameFull": "技能検定 3級電子機器組立て（電子機器組立て作業）学科試験", "urlSlug": "denshi-kiki-kumitate3", "level": "basic", "sessions": [{"session": "gakka", "urlSlug": "gakka", "expectedQuestions": 30, "label": "学科（真偽法）", "categories": ["電子部品・回路", "電気理論", "情報処理", "実装・接続", "工作・測定", "品質管理", "材料・製図", "安全衛生"]}], "seasons": ["early", "late"], "yearRange": {"start": 2025, "end": 2025}},
  "fujin-kodomofuku1": {"code": "fujin-kodomofuku1", "nameFull": "技能検定 1級婦人子供服製造（婦人子供注文服製作作業）学科試験", "urlSlug": "fujin-kodomofuku1", "level": "advanced", "sessions": [{"session": "gakka", "urlSlug": "gakka", "expectedQuestions": 50, "label": "学科（A群 真偽法・B群 多肢択一法）", "categories": ["服装の歴史・様式", "糸・副資材", "繊維・生地", "デザイン・色彩", "安全衛生", "縫製・仕上げ", "製図・採寸", "裁断・仮縫い"]}], "seasons": ["early"], "yearRange": {"start": 2024, "end": 2025}},
  "toso1": {"code": "toso1", "nameFull": "技能検定 1級塗装（建築塗装作業）学科試験", "urlSlug": "toso1", "level": "advanced", "sessions": [{"session": "gakka", "urlSlug": "gakka", "expectedQuestions": 50, "label": "学科（A群 真偽法・B群 多肢択一法）", "categories": ["塗装の目的", "塗装方法・工具", "色彩・測色", "塗膜試験・欠陥", "塗料・乾燥", "溶剤・安全衛生", "建築材料・構造", "素地調整・仕様", "研磨・材料", "養生・施工"]}], "seasons": ["early"], "yearRange": {"start": 2025, "end": 2025}},
  "kikai-hozen-denki1": { code: "kikai-hozen-denki1", nameFull: "機械保全技能検定 1級（電気系保全作業 学科）", urlSlug: "kikai-hozen-denki1", level: "advanced", sessions: [{ session: "gakka", urlSlug: "gakka", expectedQuestions: 50, label: "学科", categories: ["機械一般", "電気一般", "機械保全法一般", "材料一般", "安全衛生", "電気系保全法"] }], seasons: ["round2"], yearRange: { start: 2023, end: 2023 } },
"kikai-hozen-setsubi1": {
  "code": "kikai-hozen-setsubi1",
  "nameFull": "機械保全技能検定 1級（設備診断作業 学科）",
  "urlSlug": "kikai-hozen-setsubi1",
  "level": "advanced",
  "sessions": [
    {
      "session": "gakka",
      "urlSlug": "gakka",
      "expectedQuestions": 50,
      "label": "学科（真偽法25問・四肢択一25問）",
      "categories": [
        "機械一般",
        "電気一般",
        "機械保全法一般",
        "材料一般",
        "安全衛生",
        "機械診断",
        "振動診断",
        "非破壊検査",
        "絶縁診断",
        "ひずみ測定",
        "設備保全"
      ]
    }
  ],
  "seasons": [
    "round2"
  ],
  "yearRange": {
    "start": 2023,
    "end": 2024
  }
},
"kikai-hozen3": {
  "code": "kikai-hozen3",
  "nameFull": "機械保全技能検定 3級（機械系保全作業 学科）",
  "urlSlug": "kikai-hozen3",
  "level": "basic",
  "sessions": [
    {
      "session": "gakka",
      "urlSlug": "gakka",
      "expectedQuestions": 30,
      "label": "学科（真偽法30問）",
      "categories": [
        "機械一般",
        "電気一般",
        "機械保全法一般",
        "材料一般",
        "安全衛生",
        "機械系保全法"
      ]
    }
  ],
  "seasons": [
    "round1",
    "round2"
  ],
  "yearRange": {
    "start": 2023,
    "end": 2025
  }
},
"kikai-hozen-denki3": {
  "code": "kikai-hozen-denki3",
  "nameFull": "機械保全技能検定 3級（電気系保全作業 学科）",
  "urlSlug": "kikai-hozen-denki3",
  "level": "basic",
  "sessions": [
    {
      "session": "gakka",
      "urlSlug": "gakka",
      "expectedQuestions": 30,
      "label": "学科（真偽法30問）",
      "categories": [
        "機械一般",
        "電気一般",
        "機械保全法一般",
        "材料一般",
        "安全衛生",
        "電気系保全法"
      ]
    }
  ],
  "seasons": [
    "round1"
  ],
  "yearRange": {
    "start": 2024,
    "end": 2025
  }
},
"tobi3": {
  "code": "tobi3",
  "nameFull": "技能検定 3級とび（とび作業）学科試験",
  "urlSlug": "tobi3",
  "level": "basic",
  "sessions": [
    {
      "session": "gakka",
      "urlSlug": "gakka",
      "expectedQuestions": 30,
      "label": "学科（真偽法30問）",
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
  "yearRange": {
    "start": 2024,
    "end": 2024
  }
},
"kenchiku-daiku1": {
  "code": "kenchiku-daiku1",
  "nameFull": "技能検定 1級建築大工（大工工事作業）学科試験",
  "urlSlug": "kenchiku-daiku1",
  "level": "advanced",
  "sessions": [
    {
      "session": "gakka",
      "urlSlug": "gakka",
      "expectedQuestions": 50,
      "label": "学科（A群 真偽法・B群 多肢択一法）",
      "categories": [
        "建築構造",
        "力学",
        "規矩術",
        "工具",
        "施工計画",
        "仮設工事",
        "測量",
        "接合金物",
        "木造施工",
        "設備",
        "養生",
        "材料",
        "関係法規",
        "安全衛生",
        "基礎工事",
        "仕上げ",
        "建具金物",
        "製図",
        "墨付け"
      ]
    }
  ],
  "seasons": [
    "late"
  ],
  "yearRange": {
    "start": 2024,
    "end": 2024
  }
},
"kenchiku-daiku3": {
  "code": "kenchiku-daiku3",
  "nameFull": "技能検定 3級建築大工（大工工事作業）学科試験",
  "urlSlug": "kenchiku-daiku3",
  "level": "basic",
  "sessions": [
    {
      "session": "gakka",
      "urlSlug": "gakka",
      "expectedQuestions": 30,
      "label": "学科（真偽法30問）",
      "categories": [
        "建築構造",
        "力学",
        "規矩術",
        "工具",
        "施工計画",
        "仮設工事",
        "測量",
        "接合金物",
        "木造施工",
        "設備",
        "養生",
        "材料",
        "関係法規",
        "安全衛生",
        "基礎工事",
        "仕上げ",
        "建具金物",
        "製図",
        "墨付け"
      ]
    }
  ],
  "seasons": [
    "early",
    "late"
  ],
  "yearRange": {
    "start": 2024,
    "end": 2024
  }
},
tsukanshi: {
    code: "tsukanshi", nameFull: "通関士試験", urlSlug: "tsukanshi", level: "advanced",
    sessions: [
        { session: "tsukan-law", urlSlug: "tsukan-law", expectedQuestions: 20, label: "通関業法", categories: ["通関業法"] },
        { session: "customs-law", urlSlug: "customs-law", expectedQuestions: 30, label: "関税法等", categories: ["関税法等"] },
        { session: "tsukan-practical", urlSlug: "tsukan-practical", expectedQuestions: 15, label: "通関実務", categories: ["通関実務"] },
    ], seasons: ["annual"], yearRange: { start: 2025, end: 2025 },
}
};

/** IPA-only list retained for fetch/import tooling and legacy IPA invariants. */
export const ALL_EXAM_CODES: IpaExamCode[] = ["ip", "sg", "fe", "ap", "st", "sa", "pm", "nw", "db", "es", "sc", "sm", "au"];

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
  if (cfg.code === "denki1") {
    return season === "annual" && sessionCfg.session === "gakka" && (year === 2025 || year === 2026)
      ? `https://www.fcip-shiken.jp/pdf/r0${year - 2018}_1dg_mondai.pdf`
      : "";
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
