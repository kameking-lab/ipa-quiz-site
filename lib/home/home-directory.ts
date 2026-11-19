import { CHUSHO_SECONDARY_ORIGINAL_COUNT, CHUSHO_SECONDARY_SOLUTION_COUNT } from "@/lib/chusho-secondary/data";


import { PUBLISHED_SENTAKU } from "@/lib/sharoushi/sentaku";


import "server-only";

import { EXAM_QUESTION_COUNTS } from "@/lib/constants/exam-question-counts";

import { DENKEN1_NATIVE_PARTS, DENKEN1_PUBLISHED_ORIGINAL_COUNT } from "@/lib/denken1/native";


import { getExamPaperStats } from "@/lib/exam-library-papers";


import { getQualificationHubEntries } from "@/lib/exam-qualification-hub-data";


import { EXAM_CATALOG, EXAM_LIBRARY_PATH } from "@/lib/exam-library-catalog";


import {

  QUALIFICATION_HUBS,

  qualificationHubForEntry,

  qualificationHubPath,

} from "@/lib/exam-qualification-hubs";


import { FP2_PRACTICAL_EDITIONS, getPracticalEdition as getFp2PracticalEdition } from "@/lib/fp2/practical";


import { FP3_PRACTICAL_EDITIONS, getPracticalEdition as getFp3PracticalEdition } from "@/lib/fp3/practical";


import { QUALIFICATION_CATALOG, type QualificationDomain } from "@/lib/qualifications/catalog";


import type { ExamCode } from "@/lib/questions/types";


import { getQuestionsByExamStrict, groupByYearSeason } from "@/lib/seo/exam-meta";

/**
 * トップページの「分野から選ぶ」ディレクトリ。
 * 数値はすべて収録データから算出する（手入力の件数・年度を持たない）。
 *  - IPA / その他資格の問題数: EXAM_QUESTION_COUNTS（/ipa の資格カードと同じ集計）
 *  - 期分: 各資格ページの「N 期分」バッジと同じ groupByYearSeason
 *  - 安全衛生: 各資格ハブと同じ getExamPaperStats の合計
 */

export type HomeDomainId = "it" | "safety" | "electrical" | "construction" | "money" | "real-estate" | "legal" | "welfare" | "automotive";

export interface HomeDirectoryItem {

  key: string;

  /** Existing question IDs whose prefix differs from the registered exam code. */

  historyPrefixes?: string[];

  href: string;

  /** カード見出し（略称を含む短い名前） */

  name: string;

  /** 略称バッジ（IPA区分など） */

  abbr?: string;

  /** 補足の1行 */

  sub?: string;

  questionCount: number;

  /** 「N期分」「N回分」の表示用 */

  periodLabel: string;

  /** カードの下に出す補助バッジ（実技・学科など、データで裏付けがあるものだけ） */

  extra?: string;

}

export interface HomeDirectoryDomain {

  id: HomeDomainId;

  title: string;

  lead: string;

  /** 一覧ページ */

  allHref: string;

  allLabel: string;

  featured: HomeDirectoryItem[];

  /** 小さいチップで並べる残り（IPA高度試験など） */

  compact: HomeDirectoryItem[];

  totalQuestions: number;

  qualificationCount: number;

}

interface IpaCardDef {

  code: ExamCode;

  abbr: string;

  name: string;

  sub?: string;

}

const IPA_FEATURED: readonly IpaCardDef[] = [

  { code: "ip", abbr: "IP", name: "ITパスポート", sub: "ITの基礎知識" },

  { code: "sg", abbr: "SG", name: "情報セキュリティマネジメント", sub: "情報セキュリティの基本" },

  { code: "fe", abbr: "FE", name: "基本情報技術者", sub: "IT技術者の基本" },

  { code: "ap", abbr: "AP", name: "応用情報技術者", sub: "技術と管理の応用" },

];

const IPA_ADVANCED: readonly IpaCardDef[] = [

  { code: "sc", abbr: "SC", name: "情報処理安全確保支援士" },

  { code: "nw", abbr: "NW", name: "ネットワークスペシャリスト" },

  { code: "db", abbr: "DB", name: "データベーススペシャリスト" },

  { code: "es", abbr: "ES", name: "エンベデッドシステムスペシャリスト" },

  { code: "st", abbr: "ST", name: "ITストラテジスト" },

  { code: "sa", abbr: "SA", name: "システムアーキテクト" },

  { code: "pm", abbr: "PM", name: "プロジェクトマネージャ" },

  { code: "sm", abbr: "SM", name: "ITサービスマネージャ" },

  { code: "au", abbr: "AU", name: "システム監査技術者" },

];

function examQuestionCount(code: ExamCode): number {

  return EXAM_QUESTION_COUNTS[code] ?? 0;

}

function examPeriodCount(code: ExamCode): number {

  return groupByYearSeason(getQuestionsByExamStrict(code)).length;

}

function historyPrefixes(code: ExamCode): string[] | undefined {

  const prefixes = [...new Set(getQuestionsByExamStrict(code)

    .filter(question => !question.id.startsWith(`${code}-`))

    .map(question => question.id.replace(/-q\d+.*$/, "-q")))];

  return prefixes.length ? prefixes : undefined;

}

function ipaItem(def: IpaCardDef): HomeDirectoryItem {

  return {

    key: def.code,

    historyPrefixes: historyPrefixes(def.code),

    href: `/${def.code}`,

    name: def.name,

    abbr: def.abbr,

    sub: def.sub,

    questionCount: examQuestionCount(def.code),

    periodLabel: `${examPeriodCount(def.code)}期分`,

  };

}

function isLiveExam(code: ExamCode): boolean {

  return QUALIFICATION_CATALOG.some((item) => item.examCode === code && item.status === "live");

}

const fp2PracticalCount = (): number =>

  FP2_PRACTICAL_EDITIONS.reduce((sum, edition) => sum + (getFp2PracticalEdition(edition)?.questions.length ?? 0), 0);


const fp3PracticalCount = (): number =>

  FP3_PRACTICAL_EDITIONS.reduce((sum, edition) => sum + (getFp3PracticalEdition(edition)?.questions.length ?? 0), 0);

interface OtherCardDef {

  code: ExamCode;

  name: string;

  sub: string;

  domain: HomeDomainId;

}

const OTHER_CARDS: readonly OtherCardDef[] = [
  {"code": "kogai-18", "name": "公害防止管理者・水質関係技術特論", "sub": "2026年度・全20問／全肢解説", "domain": "safety"},
  {"code": "kogai-13", "name": "公害防止管理者・ばいじん・一般粉じん特論", "sub": "2026年度・全10問／全肢解説", "domain": "safety"},
  {"code": "concrete-assou1", "name": "コンクリート圧送施工技能士 1級", "sub": "コンクリート圧送工事作業 学科", "domain": "construction"},
  {"code": "zensho-eco-80", "name": "商業経済検定（ビジネス法規）", "sub": "第39・40回・ビジネス法規全100問", "domain": "money"},
  { code: "kogai-08", name: "公害防止管理者（汚水処理）", sub: "2026年度・汚水処理特論全25問", domain: "safety" },
  { code: "kogai-04", name: "公害防止管理者（ばいじん・粉じん）", sub: "2026年度・ばいじん・粉じん特論全15問", domain: "safety" },
  { code: "aigan-kangoshi", name: "愛玩動物看護師", sub: "第3・4回の必須・一般問題300問", domain: "welfare" },
  { code: "concrete-assou2", name: "コンクリート圧送施工技能士 2級", sub: "コンクリート圧送工事作業・学科100問", domain: "construction" },
  { code: "kawarabuki1", name: "かわらぶき技能士 1級", sub: "かわらぶき作業・学科100問", domain: "construction" },
  { code: "zensho-marketing", name: "商業経済検定・マーケティング", sub: "第39・40回の全100問・公式模範解答と解説", domain: "money" },
  { code: "kogai-11", name: "公害防止管理者・騒音・振動概論", sub: "2026年度・全25問と全肢解説", domain: "safety" },
  { code: "kogai-14", name: "公害防止管理者・ダイオキシン類概論", sub: "2026年度・全15問と全肢解説", domain: "safety" },
  {"code": "technical-illustration-cad1", "name": "テクニカルイラストレーション技能士1級（CAD作業）", "sub": "2025年度後期・学科全50問", "domain": "construction"},
  {"code": "kawarabuki2", "name": "かわらぶき技能士2級", "sub": "2024・2025年度後期の学科全100問を収録。真偽法と多肢択一法を、公式正答・全肢の独自解説・原図で学べます。", "domain": "construction"},
  {"code": "zensho-eco-79", "name": "商業経済検定・商品開発と流通", "sub": "2025・2024年度（第40・39回）全100小問", "domain": "money"},
  {"code": "career-gino-1", "name": "キャリアコンサルティング技能検定1級", "sub": "2025・2024年度後期・学科全100問", "domain": "welfare"},
  {"code": "kogai-12", "name": "公害防止管理者 騒音・振動特論", "sub": "2026年度・全30問", "domain": "safety"},
  {"code": "kogai-15", "name": "公害防止管理者 ダイオキシン類特論", "sub": "2026年度・全25問", "domain": "safety"},
  {"code": "dekyo-charge-1", "name": "工事担任者 第一級アナログ通信", "sub": "2025・2026年度の3回分・45大問216解答欄", "domain": "electrical"},
  {"code": "cfp-3", "name": "CFP® ライフプランニング・リタイアメントプランニング", "sub": "2026年度第1・2回の10問を全肢解説付きで部分収録", "domain": "money"},
  {"code": "dekyo-charge-2", "name": "工事担任者 第二級アナログ通信", "sub": "2026年度第1回・2025年度第1・2回の基礎・技術及び理論・法規186問を収録", "domain": "it"},
  {"code": "kogai-16", "name": "公害防止管理者・大気・水質概論", "sub": "2026年度・全10問と全肢解説", "domain": "safety"},
  {"code": "sakui-rotary1", "name": "さく井技能士1級（ロータリー式）", "sub": "さく井技能検定1級（ロータリー式さく井工事作業）の2025・2024年度後期各50問、計100問を、公式正答と全肢解説付きで収録。", "domain": "construction"},
  {"code": "kouku-kanseikan", "name": "航空管制官（基礎能力）", "sub": "航空管制官採用試験の2026年度基礎能力から、判断推理・数的推理・資料解釈・時事・情報を公式正答・全肢解説・原図付きで学べます。", "domain": "legal"},
  {"code": "cfp-realestate", "name": "CFP®不動産運用設計", "sub": "2026年度第1回・第2回の不動産運用設計各50問、計100問を公式正答・独自解説・原本の設例と図表付きで収録。", "domain": "money"},
  {"code": "building-cleaning3", "name": "ビルクリーニング技能士3級", "sub": "2025・2024年度の学科試験各25問、計50問を公式正答と独自解説付きで収録。", "domain": "safety"},
  {"code": "kogai-taiki-gairon", "name": "公害防止管理者・大気概論", "sub": "2026年度の大気概論・全10問を公式正答と全肢の独自解説付きで収録。", "domain": "safety"},
  {"code": "restaurant-1", "name": "レストランサービス技能検定1級（学科）", "sub": "2025・2026年度の学科試験を各100問、計200問収録。公式問題・正答と独自解説で、料飲サービス・食品衛生・国際儀礼を学べます。", "domain": "welfare"},
  {"code": "cfp-souzoku", "name": "CFP®・相続・事業承継設計", "sub": "2026年度第1・2回の相続・事業承継設計を全100問収録。公式問題・正答と独自解説で、相続・遺言・財産評価・事業承継を学べます。", "domain": "money"},
  {"code": "kogai-taiki-tokuron", "name": "公害防止管理者・大気特論", "sub": "2026年度・全15問と全肢解説", "domain": "safety"},
  {"code": "telecom-chief-denso", "name": "電気通信主任技術者・伝送交換", "sub": "2025・2026年度の3回・全180解答欄", "domain": "electrical"},
  { code: "eiken2", name: "英検2級", sub: "一次試験3回分・189問", domain: "welfare" },
  { code: "restaurant-2", name: "レストランサービス技能士 2級", sub: "2025・2026年度 学科100問ずつ", domain: "welfare" },
  { code: "kogai-17", name: "公害防止管理者・大気関係技術特論", sub: "2026年度・全20問と独自解説", domain: "safety" },
  { code: "dekyo-chief-3", name: "電気通信主任技術者・法規", sub: "2025・2026年度・3回92解答欄", domain: "electrical" },
  { code: "eiken4", name: "英検4級", sub: "直近3回の筆記・リスニング195問・全肢解説", domain: "money" },
  {"code": "nyukoku-keibikan", "name": "入国警備官", "sub": "2025年度 基礎能力40問・全肢解説", "domain": "money"},
  {"code": "chizai3", "name": "知的財産管理技能検定3級", "sub": "第53・54回 実技60問と全肢解説", "domain": "money"},
  {"code": "kogai-large-water", "name": "公害防止管理者・大規模水質特論", "sub": "2026年度・全10問", "domain": "safety"},
  {"code": "dekyo-chief-system", "name": "電気通信主任技術者・電気通信システム", "sub": "2025・2026年度の3回分・全60問", "domain": "electrical"},
  {"code":"glass-sekou1","name":"ガラス施工技能士 1級","sub":"ガラス工事作業 学科","domain":"construction"},
  {"code":"eikenp1","name":"英検準1級","sub":"直近3回・公式音声・英作文の公式解答例","domain":"welfare"},
  {"code":"zensho-eco-81","name":"商業経済検定 ビジネス・マネジメント","sub":"2024・2025年度の全100問・公式模範解答","domain":"money"},
  {"code":"kogai-07","name":"公害防止管理者・水質概論","sub":"2026年度・水質概論の全10問と原図","domain":"safety"},
  {"code":"webdesign-3","name":"ウェブデザイン技能検定3級","sub":"2025年度第4回・2026年度第1回と第2回の学科75問","domain":"it"},
  {code: "kokka-ippan-dai", name: "国家一般職（大卒程度）", "sub": "2026年度・基礎能力11問を部分収録", "domain": "legal"},
  {"code": "kokka-sogo-in", "name": "国家総合職（院卒者）", "sub": "2026年度・大卒共通の基礎能力9問を部分収録", "domain": "legal"},
  {"code": "toukei1", "name": "統計検定1級", "sub": "2025年11月・統計数理全5原問25小問と公式略解", "domain": "it"},
  { code: "sasshi1", name: "サッシ施工技能士 1級", sub: "ビル用サッシ施工作業 学科", domain: "safety" },
  { code: "sasshi2", name: "サッシ施工技能士 2級", sub: "ビル用サッシ施工作業 学科", domain: "safety" },
  {"code": "fujin-kodomofuku2", "name": "婦人子供服製造技能士 2級", "sub": "婦人子供注文服製作作業 学科（真偽法・多肢択一法）", "domain": "welfare"},
  {"code": "fujin-kodomofuku1", "name": "婦人子供服製造技能士 1級", "sub": "婦人子供注文服製作作業 学科（真偽法・多肢択一法）", "domain": "welfare"},
  {"code": "toso1", "name": "塗装技能士 1級", "sub": "建築塗装作業 学科（真偽法・多肢択一法）", "domain": "construction"},
  {"code": "kojo-bankin1", "name": "工場板金技能士 1級", "sub": "曲げ板金作業 学科（A群 真偽法・B群 多肢択一法）", "domain": "construction"},
  {"code": "kenchiku-bankin1", "name": "建築板金技能士 1級（ダクト板金作業）", "sub": "ダクト板金作業 学科（A群 真偽法・B群 多肢択一法）", "domain": "construction"},
  {"code": "kinzoku-netsushori3", "name": "金属熱処理技能士 3級", "sub": "一般熱処理作業 学科（真偽法）", "domain": "construction"},
  {"code": "kojo-bankin3", "name": "工場板金技能士 3級", "sub": "曲げ板金作業 学科（真偽法）", "domain": "construction"},
  {"code": "kojo-bankin2", "name": "工場板金技能士 2級", "sub": "曲げ板金作業 学科（A群 真偽法・B群 多肢択一法）", "domain": "construction"},
  {"code": "mekki2", "name": "めっき技能士 2級", "sub": "電気めっき作業 学科（A群 真偽法・B群 多肢択一法）", "domain": "construction"},
  {"code": "flower1", "name": "フラワー装飾技能士 1級", "sub": "フラワー装飾作業 学科（A群 真偽法・B群 多肢択一法）", "domain": "welfare"},
  {"code": "flower3", "name": "フラワー装飾技能士 3級", "sub": "フラワー装飾作業 学科（真偽法）", "domain": "welfare"},
  {"code": "kagu3", "name": "家具製作技能士 3級", "sub": "家具手加工作業 学科（真偽法）", "domain": "construction"},
  {"code": "diecast1", "name": "ダイカスト技能士 1級", "sub": "ホットチャンバダイカスト作業 学科", "domain": "safety"},
  {"code": "tetsudo-sharyo1", "name": "鉄道車両製造・整備技能士 1級", "sub": "機器ぎ装作業 学科", "domain": "safety"},
  {"code": "insatsu2", "name": "印刷技能士 2級", "sub": "オフセット印刷作業 学科", "domain": "safety"},
  {"code": "insatsu1", "name": "印刷技能士 1級", "sub": "オフセット印刷作業 学科", "domain": "safety"},
  {"code": "engei-soshoku2", "name": "園芸装飾技能士 2級", "sub": "室内園芸装飾作業 学科", "domain": "welfare"},
  {"code": "kyoka-plastic2", "name": "強化プラスチック成形技能士 2級", "sub": "手積み積層成形作業 学科", "domain": "construction"},
  {"code": "kyoka-plastic1", "name": "強化プラスチック成形技能士 1級", "sub": "手積み積層成形作業 学科", "domain": "construction"},
  {"code": "kagaku-bunseki3", "name": "化学分析技能士 3級", "sub": "化学分析作業 学科", "domain": "safety"},
  {"code": "kagaku-bunseki1", "name": "化学分析技能士 1級", "sub": "化学分析作業 学科", "domain": "safety"},
  {"code": "chikuro1", "name": "築炉技能士 1級", "sub": "築炉作業 学科", "domain": "construction"},
  {"code": "futsu-senban1", "name": "機械加工技能士 1級（普通旋盤作業）", "sub": "普通旋盤作業 学科", "domain": "electrical"},
  {"code": "shashutsu1", "name": "プラスチック成形技能士 1級（射出成形作業）", "sub": "射出成形作業 学科", "domain": "electrical"},
  {"code": "katawaku2", "name": "型枠施工技能士 2級", "sub": "型枠工事作業 学科", "domain": "construction"},
  {"code": "tekkin3", "name": "鉄筋施工技能士 3級（鉄筋組立て作業）", "sub": "鉄筋組立て作業 学科", "domain": "construction"},
  {"code": "tekkin2", "name": "鉄筋施工技能士 2級（鉄筋組立て作業）", "sub": "鉄筋組立て作業 学科", "domain": "construction"},
  {"code": "pan-seizo1", "name": "パン製造技能士 1級", "sub": "パン製造作業 学科", "domain": "welfare"},
  {"code": "pan-seizo2", "name": "パン製造技能士 2級", "sub": "パン製造作業 学科", "domain": "welfare"},
  {"code": "kikai-shiage1", "name": "仕上げ技能士 1級（機械組立仕上げ作業）", "sub": "機械組立仕上げ作業 学科", "domain": "electrical"},
  {"code": "kikai-seizu-tegaki1", "name": "機械・プラント製図技能士 1級（機械製図手書き作業）", "sub": "機械製図手書き作業 学科", "domain": "electrical"},
  {"code": "sequence1", "name": "シーケンス制御技能士 1級（シーケンス制御作業）", "sub": "シーケンス制御作業 学科", "domain": "electrical"},
  {"code": "reito-seko2", "name": "冷凍空気調和機器施工技能士 2級（冷凍空気調和機器施工作業）", "sub": "冷凍空気調和機器施工作業 学科", "domain": "construction"},
  {"code": "reito-seko1", "name": "冷凍空気調和機器施工技能士 1級（冷凍空気調和機器施工作業）", "sub": "冷凍空気調和機器施工作業 学科", "domain": "construction"},
  {"code": "kuukiatsu-kumitate2", "name": "空気圧装置組立て技能士 2級（空気圧装置組立て作業）", "sub": "空気圧装置組立て作業 学科", "domain": "construction"},
  {"code": "kuukiatsu-kumitate1", "name": "空気圧装置組立て技能士 1級（空気圧装置組立て作業）", "sub": "空気圧装置組立て作業 学科", "domain": "construction"},
  {"code": "henatsuki-kumitate2", "name": "電気機器組立て技能士 2級（変圧器組立て作業）", "sub": "変圧器組立て作業 学科", "domain": "electrical"},
  {"code": "henatsuki-kumitate1", "name": "電気機器組立て技能士 1級（変圧器組立て作業）", "sub": "変圧器組立て作業 学科", "domain": "electrical"},
  {"code": "sequence3", "name": "シーケンス制御技能士 3級（シーケンス制御作業）", "sub": "シーケンス制御作業 学科", "domain": "electrical"},
  {"code": "haidenban-kumitate3", "name": "電気機器組立て技能士 3級（配電盤・制御盤組立て作業）", "sub": "配電盤・制御盤組立て作業 学科", "domain": "electrical"},
  {"code": "sequence2", "name": "シーケンス制御技能士 2級（シーケンス制御作業）", "sub": "シーケンス制御作業 学科", "domain": "electrical"},
  {"code": "zoen-gino1", "name": "造園技能士 1級（造園工事作業）", "sub": "造園工事作業 学科", "domain": "construction"},
  {"code": "sakan1", "name": "左官技能士 1級（左官作業）", "sub": "左官作業 学科", "domain": "construction"},
  {"code": "sakan3", "name": "左官技能士 3級（左官作業）", "sub": "左官作業 学科", "domain": "construction"},
  {"code": "sakan2", "name": "左官技能士 2級（左官作業）", "sub": "左官作業 学科", "domain": "construction"},
  {"code": "kikai-seizu-cad1", "name": "機械・プラント製図技能士 1級（機械製図CAD作業）", "sub": "機械製図CAD作業 学科", "domain": "electrical"},
  {"code": "kikai-seizu-cad3", "name": "機械・プラント製図技能士 3級（機械製図CAD作業）", "sub": "機械製図CAD作業 学科", "domain": "electrical"},
  {"code": "plant-haikan-seizu2", "name": "機械・プラント製図技能士 2級（プラント配管製図作業）", "sub": "プラント配管製図作業 学科", "domain": "electrical"},
  {"code": "kikai-shiage2", "name": "仕上げ技能士 2級（機械組立仕上げ作業）", "sub": "機械組立仕上げ作業 学科", "domain": "electrical"},
  {"code": "kikai-shiage3", "name": "仕上げ技能士 3級（機械組立仕上げ作業）", "sub": "機械組立仕上げ作業 学科", "domain": "electrical"},
  {"code": "zoen-gino2", "name": "造園技能士 2級（造園工事作業）", "sub": "造園工事作業 学科", "domain": "construction"},
  {"code": "zoen-gino3", "name": "造園技能士 3級（造園工事作業）", "sub": "造園工事作業 学科", "domain": "construction"},
  {"code": "chuzo3", "name": "鋳造技能士 3級（鋳鉄鋳物鋳造作業）", "sub": "鋳鉄鋳物鋳造作業 学科", "domain": "construction"},
  {"code": "reito-seko3", "name": "冷凍空気調和機器施工技能士 3級（冷凍空気調和機器施工作業）", "sub": "冷凍空気調和機器施工作業 学科", "domain": "construction"},
  {"code": "chuzo2", "name": "鋳造技能士 2級（鋳鉄鋳物鋳造作業）", "sub": "鋳鉄鋳物鋳造作業 学科", "domain": "construction"},
  {"code": "chuzo1", "name": "鋳造技能士 1級（鋳鉄鋳物鋳造作業）", "sub": "鋳鉄鋳物鋳造作業 学科", "domain": "construction"},
  {"code": "netsuzetsuen2", "name": "熱絶縁施工技能士 2級（保温保冷工事作業）", "sub": "保温保冷工事作業 学科", "domain": "construction"},
  {"code": "hiseshoku-jokyo1", "name": "非接触除去加工技能士 1級（数値制御形彫り放電加工作業）", "sub": "数値制御形彫り放電加工作業 学科", "domain": "electrical"},
  {"code": "tategu1", "name": "建具製作技能士 1級（木製建具手加工作業）", "sub": "木製建具手加工作業 学科", "domain": "construction"},
  {"code": "shohin-soshoku1", "name": "商品装飾展示技能士 1級", "sub": "商品装飾展示作業 学科", "domain": "welfare"},
  {"code": "kogaku-glass1", "name": "光学機器製造技能士 1級（光学ガラス研磨作業）", "sub": "光学ガラス研磨作業 学科", "domain": "electrical"},
  {"code": "sangyo-sharyo1", "name": "産業車両整備技能士 1級", "sub": "産業車両整備作業 学科", "domain": "automotive"},
  {"code": "yogashi1", "name": "菓子製造技能士 1級（洋菓子製造作業）", "sub": "洋菓子製造作業 学科", "domain": "welfare"},
  {"code": "block-kenchiku3", "name": "ブロック建築技能士 3級（コンクリートブロック工事作業）", "sub": "コンクリートブロック工事作業 学科", "domain": "construction"},
  {"code": "block-kenchiku1", "name": "ブロック建築技能士 1級（コンクリートブロック工事作業）", "sub": "コンクリートブロック工事作業 学科", "domain": "construction"},
  {"code": "shuzo1", "name": "酒造技能士 1級（清酒製造作業）", "sub": "清酒製造作業 学科", "domain": "welfare"},
  {"code": "fraise1", "name": "機械加工技能士 1級（フライス盤作業）", "sub": "フライス盤作業 学科", "domain": "electrical"},
  {"code": "fraise2", "name": "機械加工技能士 2級（フライス盤作業）", "sub": "フライス盤作業 学科", "domain": "electrical"},
  {"code": "fraise3", "name": "機械加工技能士 3級（フライス盤作業）", "sub": "フライス盤作業 学科", "domain": "electrical"},
  {"code": "kikai-kensa1", "name": "機械検査技能士 1級", "sub": "機械検査作業 学科", "domain": "electrical"},
  {"code": "kikai-kensa2", "name": "機械検査技能士 2級", "sub": "機械検査作業 学科", "domain": "electrical"},
  {"code": "kogyo-hoso2", "name": "工業包装技能士 2級", "sub": "工業包装作業 学科", "domain": "electrical"},
  {"code": "katawaku1", "name": "型枠施工技能士 1級", "sub": "型枠工事作業 学科", "domain": "construction"},
  {"code": "katawaku3", "name": "型枠施工技能士 3級", "sub": "型枠工事作業 学科", "domain": "construction"},
  {"code": "tekkin-zumen1", "name": "鉄筋施工技能士 1級（鉄筋施工図作成作業）", "sub": "鉄筋施工図作成作業 学科", "domain": "construction"},
  {"code": "tekkin-zumen2", "name": "鉄筋施工技能士 2級（鉄筋施工図作成作業）", "sub": "鉄筋施工図作成作業 学科", "domain": "construction"},
  {"code": "tekkin-zumen3", "name": "鉄筋施工技能士 3級（鉄筋施工図作成作業）", "sub": "鉄筋施工図作成作業 学科", "domain": "construction"},
  {"code": "kinzoku-press1", "name": "金属プレス加工技能士 1級", "sub": "金属プレス作業 学科", "domain": "electrical"},
  {"code": "kinzoku-press2", "name": "金属プレス加工技能士 2級", "sub": "金属プレス作業 学科", "domain": "electrical"},
  {"code": "haikan-plant2", "name": "配管技能士 2級（プラント配管作業）", "sub": "プラント配管作業 学科", "domain": "construction"},
  {"code": "haikan-kenchiku3", "name": "配管技能士 3級（建築配管作業）", "sub": "建築配管作業 学科", "domain": "construction"},
  {"code": "bousui-frp1", "name": "防水施工技能士 1級（FRP防水工事作業）", "sub": "FRP防水工事作業 学科", "domain": "construction"},
  {"code": "bousui-frp2", "name": "防水施工技能士 2級（FRP防水工事作業）", "sub": "FRP防水工事作業 学科", "domain": "construction"},
  {"code": "naiso-carpet1", "name": "内装仕上げ施工技能士 1級（カーペット系床仕上げ工事作業）", "sub": "カーペット系床仕上げ工事作業 学科", "domain": "construction"},
  {"code": "haikan-plant1", "name": "配管技能士 1級（プラント配管作業）", "sub": "プラント配管作業 学科", "domain": "construction"},
  {"code": "shashutsu2", "name": "プラスチック成形技能士 2級（射出成形作業）", "sub": "射出成形作業 学科", "domain": "electrical"},
  {"code": "kikai-kensa3", "name": "機械検査技能士 3級", "sub": "機械検査作業 学科", "domain": "electrical"},
  {"code": "kagaku-bunseki2", "name": "化学分析技能士 2級", "sub": "化学分析作業 学科", "domain": "safety"},
  {"code": "engei-soshoku1", "name": "園芸装飾技能士 1級", "sub": "室内園芸装飾作業 学科", "domain": "welfare"},
  {"code": "engei-soshoku3", "name": "園芸装飾技能士 3級", "sub": "室内園芸装飾作業 学科", "domain": "welfare"},
  {"code": "kagu1", "name": "家具製作技能士 1級", "sub": "家具手加工作業 学科（A群 真偽法・B群 多肢択一法）", "domain": "construction"},
  {"code": "kagu2", "name": "家具製作技能士 2級", "sub": "家具手加工作業 学科（A群 真偽法・B群 多肢択一法）", "domain": "construction"},
  {"code": "mekki3", "name": "めっき技能士 3級", "sub": "電気めっき 学科（真偽法）", "domain": "construction"},
  {"code": "mekki1", "name": "めっき技能士 1級", "sub": "電気めっき作業 学科（A群 真偽法・B群 多肢択一法）", "domain": "construction"},
  {"code": "kinzoku-netsushori1", "name": "金属熱処理技能士 1級", "sub": "一般熱処理作業 学科（A群 真偽法・B群 多肢択一法）", "domain": "construction"},
  {"code": "tekko1", "name": "鉄工技能士 1級", "sub": "製缶作業 学科（A群 真偽法・B群 多肢択一法）", "domain": "construction"},
  {"code": "denshi-kiki-kumitate1", "name": "電子機器組立て技能士 1級", "sub": "電子機器組立て作業 学科（A群 真偽法・B群 多肢択一法）", "domain": "electrical"},
  {"code": "denshi-kiki-kumitate3", "name": "電子機器組立て技能士 3級", "sub": "電子機器組立て作業 学科（真偽法）", "domain": "electrical"},
  {"code": "toso2", "name": "塗装技能士 2級", "sub": "建築塗装作業 学科（真偽法・多肢択一法）", "domain": "construction"},
  {"code": "kikai-hozen-denki1", "name": "機械保全技能士 1級（電気系）", "sub": "電気系保全作業 学科", "domain": "electrical"},
  {"code": "kikai-hozen-setsubi1", "name": "機械保全技能士 1級（設備診断）", "sub": "設備診断作業 学科", "domain": "safety"},
  {"code": "kikai-hozen-denki3", "name": "機械保全技能士 3級（電気系）", "sub": "電気系保全作業 学科（真偽法）", "domain": "safety"},
  {"code": "kikai-hozen3", "name": "機械保全技能士 3級（機械系）", "sub": "機械系保全作業 学科（真偽法）", "domain": "safety"},
  { code: "tobi2", name: "とび技能士 2級", sub: "とび作業 学科（真偽法・多肢択一法）", domain: "safety" },
  { code: "tobi3", name: "とび技能士 3級", sub: "とび作業 学科（真偽法）", domain: "safety" },
  { code: "khk-kagaku", name: "高圧ガス化学", sub: "甲種・乙種・丙種（液石・特別）422原問", domain: "safety" },
  { code: "sekou-1kenchiku", name: "1級建築施工管理", sub: "第一次検定（令和6〜8年度216問）", domain: "construction" },
  {"code": "benrishi", "name": "弁理士（短答式）", "sub": "公式問題・正答・独自解説と原本図表を収録", "domain": "money"},
  {"code": "sokuryoshi", "name": "測量士", "sub": "公式問題・正答・独自解説と原本図表を収録", "domain": "construction"},
  {"code": "dokugeki-chiba", "name": "毒物劇物取扱者", "sub": "公式問題・正答・独自解説と原本図表を収録", "domain": "safety"},
  {"code": "jokaso-setsubishi", "name": "浄化槽設備士（学科）", "sub": "公式問題・正答・独自解説と原本図表を収録", "domain": "construction"},
  {"code": "chiiki-ryoko", "name": "地域限定旅行業務取扱管理者", "sub": "公式問題・正答・独自解説と原本図表を収録", "domain": "money"},
  {"code": "junkango-kansai", "name": "准看護師", "sub": "公式問題・正答・独自解説と原本図表を収録", "domain": "welfare"},
  {"code": "kukaku-seiri", "name": "土地区画整理士（学科）", "sub": "2026年度のみ40問。2025年度は未収録。", "domain": "construction"},
  {"code": "dojo-osen", "name": "土壌汚染調査技術管理者", "sub": "公式問題・正答・独自解説と原本図表を収録", "domain": "construction"},
  {"code": "kenchikushi2", "name": "二級建築士", "sub": "2024年の建築計画と2025・2026年の全学科", "domain": "construction"},
  {"code": "mokuzo-kenchikushi", "name": "木造建築士（学科）", "sub": "2025・2026年各100問、2024年建築計画25問", "domain": "construction"},
  { code: "kenchikushi1", name: "一級建築士", sub: "学科・設計製図", domain: "construction" },
  { code: "kisho", name: "気象予報士", sub: "第65・66回 学科60問・実技18問（手動照合）", domain: "safety" },
  { code: "jken-katsuyo3", name: "J検 情報活用3級", sub: "令和8年度前期・令和7年度後期", domain: "it" },
  { code: "jken-katsuyo2", name: "J検 情報活用2級", sub: "令和8年度前期・令和7年度後期", domain: "it" },
  { code: "jken-katsuyo1", name: "J検 情報活用1級", sub: "令和8年度前期・令和7年度後期", domain: "it" },
  { code: "gyosei", name: "行政書士", sub: "令和7・6年度と令和5年度の行政法・民法・商法20問", domain: "money" },
  { code: "career-consultant", name: "キャリアコンサルタント（学科）", sub: "公式問題・正答・全肢の独自解説を収録", domain: "welfare" },
  { code: "kanri-eiyoshi", name: "管理栄養士", sub: "公式問題・正答・独自解説と原本図表を収録", domain: "welfare" },
  { code: "caremanager", name: "ケアマネジャー", sub: "介護支援専門員実務研修受講試験", domain: "welfare" },
  { code: "sogo-ryoko", name: "総合旅行業務取扱管理者", sub: "旅行業法令・約款の公式問題・正答・独自解説", domain: "money" },
  { code: "shiho-tanto", name: "司法試験（短答）", sub: "憲法・民法・刑法の短答式", domain: "money" },
  { code: "yobi-tanto", name: "予備試験（短答）", sub: "法律基本科目7科目の短答式", domain: "money" },
  { code: "gijutsushi1-tekisei", name: "技術士第一次試験・適性科目", sub: "適性科目", domain: "construction" },
  { code: "career-gino-2", name: "キャリアコンサルティング技能検定2級", sub: "2級 学科試験", domain: "welfare" },
  { code: "juishi", name: "獣医師国家試験", sub: "必須問題と学説試験", domain: "welfare" },
  { code: "sokuryoshiho", name: "測量士補", sub: "国土地理院の公式問題・正答・独自解説", domain: "construction" },
  { code: "tekko2", name: "鉄工技能士 2級", sub: "製缶作業 学科（A群 真偽法・B群 多肢択一法）", domain: "construction" },
  { code: "denshi-kiki-kumitate2", name: "電子機器組立て技能士 2級", sub: "電子機器組立て作業 学科（真偽法・多肢択一）", domain: "electrical" },
  { code: "kenchiku-bankin-duct2", name: "建築板金技能士 2級（ダクト板金作業）", sub: "ダクト板金作業 学科（真偽法・多肢択一）", domain: "construction" },
  { code: "kinzoku-netsushori2", name: "金属熱処理技能士 2級", sub: "一般熱処理作業 学科（真偽法・多肢択一法）", domain: "safety" },
  {"code": "chikuro2", "name": "築炉技能士 2級", "sub": "築炉作業 学科", "domain": "construction"},
  {"code": "futsu-senban3", "name": "機械加工技能士 3級（普通旋盤作業）", "sub": "普通旋盤作業 学科（真偽法）", "domain": "electrical"},
  {"code": "shashutsu3", "name": "プラスチック成形技能士 3級（射出成形作業）", "sub": "射出成形作業 学科（真偽法）", "domain": "electrical"},
  {"code": "kogyo-hoso1", "name": "工業包装技能士 1級", "sub": "工業包装作業 学科", "domain": "electrical"},
  {"code": "haiden-seigyo1", "name": "電気機器組立て技能士 1級", "sub": "配電盤・制御盤組立て 学科", "domain": "electrical"},
  {"code": "kaiten-denki2", "name": "電気機器組立て技能士 2級（回転電機巻線製作作業）", "sub": "回転電機巻線製作作業 学科", "domain": "electrical"},
  {"code": "kaiten-denki1", "name": "電気機器組立て技能士 1級（回転電機巻線製作作業）", "sub": "回転電機巻線製作作業 学科", "domain": "electrical"},
  {"code": "haiden-seigyo3", "name": "電気機器組立て技能士 3級", "sub": "配電盤・制御盤組立て 学科", "domain": "electrical"},
  {"code": "kenchiku-bankin2", "name": "建築板金技能士 2級", "sub": "内外装板金作業 学科", "domain": "construction"},
  {"code": "kensetsu-kikai-seibi1", "name": "建設機械整備技能士 1級", "sub": "建設機械整備作業 学科", "domain": "construction"},
  {"code": "bousui-urethane2", "name": "防水施工技能士 2級（ウレタン）", "sub": "ウレタンゴム系塗膜防水工事作業 学科", "domain": "construction"},
  {"code": "plant-haikan-seizu1", "name": "機械・プラント製図技能士 1級（プラント配管製図作業）", "sub": "プラント配管製図作業 学科", "domain": "electrical"},
  {"code": "kikai-seizu3", "name": "機械・プラント製図技能士 3級（機械製図手書き作業）", "sub": "機械製図手書き作業 学科", "domain": "electrical"},
  {"code": "kikai-seizu2", "name": "機械・プラント製図技能士 2級（機械製図手書き作業）", "sub": "機械製図手書き作業 学科", "domain": "electrical"},
  {"code": "kikai-seizu-cad2", "name": "機械・プラント製図技能士 2級（機械製図CAD作業）", "sub": "機械製図CAD作業 学科", "domain": "electrical"},
  {"code": "naiso-carpet2", "name": "内装仕上げ施工技能士 2級（カーペット系床）", "sub": "カーペット系床仕上げ工事作業 学科", "domain": "construction"},
  {"code": "naiso-plastic1", "name": "内装仕上げ施工技能士 1級（プラスチック系床）", "sub": "プラスチック系床仕上げ工事作業 学科", "domain": "construction"},
  {"code": "naiso-plastic2", "name": "内装仕上げ施工技能士 2級（プラスチック系床）", "sub": "プラスチック系床仕上げ工事作業 学科", "domain": "construction"},
  {"code": "naiso-kosei2", "name": "内装仕上げ施工技能士 2級（鋼製下地）", "sub": "鋼製下地工事作業 学科", "domain": "construction"},
  {"code": "plant-haikan2", "name": "配管技能士 2級（プラント配管作業）", "sub": "プラント配管作業 学科", "domain": "construction"},
  {"code": "plant-haikan1", "name": "配管技能士 1級（プラント配管作業）", "sub": "プラント配管作業 学科", "domain": "construction"},
  { code: "kensetsu-kikai-seibi2", name: "建設機械整備技能士 2級", sub: "建設機械整備作業 学科（真偽法・多肢択一）", domain: "construction" },
  { code: "hyoso1", name: "表装技能士 1級", sub: "表具作業 学科（真偽法・多肢択一）", domain: "construction" },
  { code: "tairu2", name: "タイル張り技能士 2級", sub: "タイル張り作業 学科（真偽法・多肢択一）", domain: "construction" },
  { code: "sekizai1", name: "石材施工技能士 1級", sub: "石張り作業 学科（真偽法・多肢択一）", domain: "construction" },
  { code: "hyoso2", name: "表装技能士 2級", sub: "表具作業 学科（真偽法・多肢択一）", domain: "construction" },
  { code: "shohin-soshoku3", name: "商品装飾展示技能士 3級", sub: "商品装飾展示作業 学科（真偽法）", domain: "safety" },
  { code: "shashin1", name: "写真技能士 1級", sub: "肖像写真デジタル作業 学科（真偽法・多肢択一）", domain: "safety" },
  { code: "sessaku-kensaku1", name: "切削工具研削技能士 1級", sub: "工作機械用切削工具研削作業 学科（真偽法・多肢択一）", domain: "safety" },
  { code: "tatami1", name: "畳製作技能士 1級", sub: "畳製作作業 学科（真偽法・多肢択一）", domain: "safety" },
  { code: "funmatsu-yakin1", name: "粉末冶金技能士 1級", sub: "成形・再圧縮作業 学科（真偽法・多肢択一）", domain: "safety" },
  { code: "nunohaku1", name: "布はく縫製技能士 1級", sub: "ワイシャツ製造作業 学科（真偽法・多肢択一）", domain: "safety" },
  { code: "kikinzoku-soshin1", name: "貴金属装身具製作技能士 1級", sub: "貴金属装身具製作作業 学科（真偽法・多肢択一）", domain: "safety" },
  { code: "shashin3", name: "写真技能士 3級", sub: "肖像写真デジタル作業 学科（真偽法）", domain: "safety" },
  { code: "kikinzoku-soshin3", name: "貴金属装身具製作技能士 3級", sub: "貴金属装身具製作作業 学科（真偽法）", domain: "safety" },
  { code: "kikinzoku-soshin2", name: "貴金属装身具製作技能士 2級", sub: "貴金属装身具製作作業 学科（真偽法・多肢択一）", domain: "safety" },
  { code: "tobi1", name: "とび技能士 1級", sub: "とび作業 学科（A群 真偽法・B群 多肢択一法）", domain: "safety" },
  { code: "kenchiku-daiku1", name: "建築大工技能士 1級", sub: "大工工事作業 学科（A群 真偽法・B群 多肢択一法）", domain: "safety" },
  { code: "kenchiku-daiku3", name: "建築大工技能士 3級", sub: "大工工事作業 学科（真偽法）", domain: "safety" },
  { code: "kenchiku-daiku2", name: "建築大工技能士 2級", sub: "大工工事作業 学科（A群 真偽法・B群 多肢択一法）", domain: "safety" },
  { code: "shashin2", name: "写真技能士 2級", sub: "肖像写真デジタル作業 学科（真偽法・多肢択一）", domain: "safety" },
  { code: "flower2", name: "フラワー装飾技能士 2級", sub: "フラワー装飾作業 学科（真偽法・多肢択一法）", domain: "welfare" },
  { code: "diecast2", name: "ダイカスト技能士 2級", sub: "ホットチャンバダイカスト作業 学科（真偽法・多肢択一法）", domain: "safety" },
  { code: "tetsudo-sharyo2", name: "鉄道車両製造・整備技能士 2級", sub: "機器ぎ装作業 学科（真偽法・多肢択一法）", domain: "safety" },
  { code: "kikai-hozen", name: "機械保全技能士 2級", sub: "機械系保全作業 学科（真偽法・四肢択一）", domain: "safety" },
  { code: "kokuzei-senmonkan", name: "国税専門官", sub: "専門B（多肢選択式）", domain: "money" },
  { code: "tsukanshi", name: "通関士", sub: "通関業法・関税法等・通関実務", domain: "money" },
  { code: "kanteishi", name: "不動産鑑定士", sub: "2024年の鑑定理論と2025・2026年の短答式200問", domain: "money" },
  { code: "kaikeishi", name: "公認会計士", sub: "短答式226問・全肢解説（令和7年第II回は企業法・監査論）", domain: "money" },
  { code: "maritime1", name: "第一級海上無線通信士", sub: "2026年3月・9月 日本語筆記4科目190問・全肢解説・原図209枚、B40問は各5枠", domain: "electrical" },
  { code: "maritime2", name: "第二級海上無線通信士", sub: "2026年3月・9月 基礎・工学A・工学B・法規190原問、B40原問は各5枠", domain: "electrical" },
  { code: "general1", name: "第一級総合無線通信士", sub: "2026年3月・9月 日本語筆記280原問を保存、270原問を無料・回数制限なしで演習（地理10原問は保留）", domain: "electrical" },
  { code: "general2", name: "第二級総合無線通信士", sub: "2026年3月・9月 日本語筆記の5科目280原問、無料・回数制限なし", domain: "electrical" },
  { code: "general3", name: "第三級総合無線通信士", sub: "2026年3月・9月 日本語筆記の基礎・工学・法規140原問、無料・回数制限なし", domain: "electrical" },
  { code: "maritime3", name: "第三級海上無線通信士", sub: "2026年3月・9月の無線工学・法規70原問・全肢解説", domain: "electrical" },
  { code: "land-special2", name: "第二級陸上特殊無線技士", sub: "2021年10月・2022年2月の旧筆記試験48原問・全肢解説", domain: "electrical" },
  { code: "land-special3", name: "第三級陸上特殊無線技士", sub: "2021年10月・2022年2月の旧筆記試験48原問・全肢解説", domain: "electrical" },
  { code: "riku-tech2", name: "第二級陸上無線技術士", sub: "2026年2回分・全肢解説（確認中1原問を除く）", domain: "electrical" },
  { code: "amateur2", name: "第二級アマチュア無線技士", sub: "2026年2回分・全肢解説（確認中1原問を除く）", domain: "electrical" },
  { code: "maritime-radar", name: "レーダー級海上特殊無線技士", sub: "2026年2月・6月の法規・無線工学48原問・全肢解説", domain: "electrical" },
  { code: "amateur1", name: "第一級アマチュア無線技士", sub: "2026年5月・8月・11月 179原問・全肢解説（確認中1原問を除く）", domain: "electrical" },
  { code: "maritime-special1", name: "第一級海上特殊無線技士", sub: "2026年2月・6月 日本語の無線工学・法規48原問・全肢解説", domain: "electrical" },
  { code: "aviation-comm", name: "航空無線通信士", sub: "2026年2月・8月 日本語の無線工学・法規68原問・全肢解説", domain: "electrical" },
  { code: "riku-tech1", name: "第一級陸上無線技術士", sub: "2026年1月・7月の4科目190原問・全肢解説", domain: "electrical" },
  { code: "maritime4", name: "第四級海上無線通信士", sub: "2026年2月・8月の無線工学・法規76原問・全肢解説", domain: "electrical" },
  { code: "land-special1", name: "第一級陸上特殊無線技士", sub: "2026年2月・6月09:30 A版72原問（13:30 B版は未収録）", domain: "electrical" },
  { code: "riku-toku-kokunai", name: "国内電信級陸上特殊無線技士", sub: "2026年2月・6月 法規の全24問", domain: "electrical" },
  { code: "koku-toku", name: "航空特殊無線技士", sub: "2026年2月・6月 法規・無線工学の全48問", domain: "electrical" },
  { code: "kai-toku2", name: "第二級海上特殊無線技士", sub: "2022年10月・2023年2月の旧筆記 確認済み48問", domain: "electrical" },
  { code: "kai-toku3", name: "第三級海上特殊無線技士", sub: "2022年10月・2023年2月の旧筆記試験60問", domain: "electrical" },
  { code: "chosashi", name: "土地家屋調査士", sub: "令和7・6年度 午前・午後、令和5年度 午前", domain: "money" },
  { code: "chusho-kigyo-shindanshi", name: "中小企業診断士", sub: "第1次試験・2025／2026年度 全7科目、2024年度 財務・情報", domain: "money" },
  { code: "denken3", name: "電験三種", sub: "第三種電気主任技術者", domain: "electrical" },
  { code: "denken2", name: "電験二種", sub: "一次・二次試験", domain: "electrical" },
  { code: "denken1", name: "電験一種", sub: "第一種電気主任技術者 一次試験", domain: "electrical" },
  { code: "denko2", name: "第二種電気工事士", sub: "学科試験", domain: "electrical" },
  { code: "kenchiku-setsubishi", name: "建築設備士", sub: "令和6年建築一般知識・令和7・8年第一次試験", domain: "construction" },
  { code: "civil1", name: "1級土木施工管理", sub: "第一次検定（問題A・B）", domain: "construction" },
  { code: "denko1", name: "第一種電気工事士", sub: "学科試験", domain: "electrical" },
  { code: "civil2", name: "2級土木施工管理", sub: "第一次検定（土木）", domain: "construction" },
  { code: "kankoji2", name: "2級管工事施工管理", sub: "第一次検定", domain: "construction" },
  { code: "zoen2", name: "2級造園施工管理", sub: "第一次検定（前期・後期）", domain: "construction" },
  { code: "zoen1", name: "1級造園施工管理", sub: "第一次検定（問題A・B）", domain: "construction" },
  { code: "tsushin2", name: "2級電気通信工事施工管理", sub: "第一次検定（前期・後期）", domain: "construction" },
  { code: "tsushin1", name: "1級電気通信工事施工管理", sub: "第一次検定（問題A・B）", domain: "construction" },
  { code: "fp3", name: "FP3級", sub: "FP技能検定3級（学科・実技）", domain: "money" },
  { code: "fp2", name: "FP2級", sub: "FP技能検定2級（学科・実技）", domain: "money" },
  { code: "fp1", name: "FP1級", sub: "2026年1・5・9月 基礎各50問／5・9月 応用各15原問", domain: "money" },
  { code: "takken", name: "宅建", sub: "宅地建物取引士資格試験", domain: "money" },
  { code: "kaigo", name: "介護福祉士", sub: "国家試験（総合問題を含む）", domain: "welfare" },
  { code: "shakai", name: "社会福祉士", sub: "国家試験（共通・専門科目）", domain: "welfare" },
  { code: "shinrishi", name: "公認心理師", sub: "国家試験（午前・午後）", domain: "welfare" },
  { code: "seishin", name: "精神保健福祉士", sub: "国家試験（専門・共通科目）", domain: "welfare" },
  { code: "tohan", name: "登録販売者", sub: "令和5年度 前半・令和6・7年度 全問", domain: "welfare" },
  { code: "kogai-09", name: "公害防止管理者・水質有害物質特論", sub: "2026年度 全15問・全75肢解説", domain: "safety" },
  { code: "webdesign2", name: "ウェブデザイン技能検定2級", sub: "2025年度第4回・2026年度第1・2回 学科120問", domain: "it" },
  { code: "eiken5", name: "英検5級", sub: "2025・2026年度3回 リーディング75問・全300肢解説", domain: "welfare" },
  { code: "rodo-kijun-kantokukan", name: "労働基準監督官", sub: "2025・2026年度 基礎能力48問・全240肢解説", domain: "money" },
  { code: "chizai1", name: "知的財産管理技能検定1級", sub: "第53回 特許専門業務・実技5問15設問", domain: "money" },
  { code: "chizai2", name: "知的財産管理技能検定2級", sub: "第53・54回 学科・実技160原問と全肢解説", domain: "money" },
  { code: "kanri", name: "管理業務主任者", sub: "2024・2025年度の公式公開問題", domain: "money" },
  { code: "eisei1", name: "第一種衛生管理者", sub: "2025年10月・2026年4月公表（88問）", domain: "safety" },
  { code: "eisei2", name: "第二種衛生管理者", sub: "2025年10月・2026年4月公表（60問）", domain: "safety" },
  { code: "soukan", name: "技術士 総合技術監理部門", sub: "第二次試験 択一式（令和7・8年度）", domain: "construction" },
  { code: "hoikushi", name: "保育士試験", sub: "筆記9科目（令和8年度前期・157問）", domain: "welfare" },
  { code: "mankan", name: "マンション管理士", sub: "年度別の公式過去問", domain: "money" },
  { code: "kashikin", name: "貸金業務取扱主任者", sub: "第18〜20回公式問題（150問）", domain: "money" },
  { code: "sharoushi", name: "社会保険労務士", sub: "第58・57回と第56回の労基・安衛を収録", domain: "welfare" },
  { code: "kangoshi", name: "看護師", sub: "第113回239問・第115・114回午前午後を収録", domain: "welfare" },
  { code: "biyoshi", name: "美容師", sub: "第53・54回の確認済み106問（4問保留）", domain: "welfare" },
  { code: "kikenbutsu-otsu1", name: "危険物取扱者 乙種第1類", sub: "2026年6月公表版・性質/消火の実出題抜粋10問", domain: "safety" },
  { code: "kikenbutsu-otsu2", name: "危険物取扱者 乙種第2類", sub: "2026年6月公表版・性質/消火の実出題抜粋10問", domain: "safety" },
  { code: "kikenbutsu-otsu6", name: "危険物取扱者 乙種第6類", sub: "2026年6月公表版・性質/消火の実出題抜粋10問", domain: "safety" },
  { code: "riyoshi", name: "理容師", sub: "第52〜54回の全165原問・全肢解説", domain: "welfare" },
  { code: "hokenshi", name: "保健師", sub: "国家試験の確認済み原問を部分収録", domain: "welfare" },
  { code: "josanshi", name: "助産師", sub: "国家試験の確認済み原問を部分収録", domain: "welfare" },
  { code: "rigaku-ryohoshi", name: "理学療法士", sub: "第61回午前の採点対象99問を収録", domain: "welfare" },
  { code: "sagyo-ryohoshi", name: "作業療法士", sub: "第61回午前99問を含む、第60・61回の364問", domain: "welfare" },
  { code: "gengo-chokakushi", name: "言語聴覚士", sub: "第27・28回の公式通知を確認中（公開保留）", domain: "welfare" },
  { code: "judo-seifukushi", name: "柔道整復師", sub: "第34・33回 午前・午後、第32回 午前", domain: "welfare" },
  { code: "rinsho-kogishi", name: "臨床工学技士", sub: "第36回午前の全90問を含む第36・38・39回の公式問題", domain: "welfare" },
  { code: "gas-kou", name: "ガス主任技術者 甲種", sub: "令和8・7年度 法令・基礎・ガス技術", domain: "safety" },
  { code: "gas-otsu", name: "ガス主任技術者 乙種", sub: "令和8・7年度 法令・基礎・ガス技術", domain: "safety" },
  { code: "khk-reito-1", name: "第一種冷凍機械", sub: "令和7・6年度", domain: "safety" },
  { code: "khk-reito-2", name: "第二種冷凍機械", sub: "令和7・6年度", domain: "safety" },
  { code: "khk-reito-3", name: "第三種冷凍機械", sub: "令和7・6年度", domain: "safety" },
  { code: "gas-hei", name: "ガス主任技術者 丙種", sub: "令和8・7年度 法令・基礎・ガス技術", domain: "safety" },
  { code: "shino-kunrenshi", name: "視能訓練士", sub: "第54回午前と第55・56回午前・午後の294問", domain: "welfare" },
  { code: "rinsho-kensagishi", name: "臨床検査技師", sub: "\u7b2c72\u30fb71\u56de\uff082026\u30fb2025\u5e74\u5b9f\u65bd\uff09\u5348\u524d\u30fb\u5348\u5f8c\u306e\u78ba\u8a8d\u6e08\u307f\u539f\u554f\u3092\u90e8\u5206\u53ce\u9332", domain: "welfare" },
  { code: "shinryo-hoshasengishi", name: "診療放射線技師", sub: "第75回午前100問を含む518原問と全肢解説", domain: "welfare" },
  { code: "zensho-eco-77", name: "商業経済検定・ビジネス基礎", sub: "第40・39回の各50問・公式正答と独自解説付き", domain: "money" },
  { code: "eikenp2", name: "英検準2級", sub: "一次試験・公式音源と独自解説付き", domain: "welfare" },
  { code: "literas", name: "リテラス論理言語力検定", sub: "公式例題・社会理解力2級2問、3級1問を部分収録", domain: "welfare" },
  { code: "cfp", name: "CFP®資格審査試験", sub: "2026年度第1回・金融資産運用設計14問を全肢解説付きで部分収録", domain: "money" },
  {"code": "kokka-ippan-dai", "name": "国家一般職（大卒程度）", "sub": "2026年度の基礎能力試験から問11〜16・18〜21の10問を全肢解説付きで部分収録。", "domain": "money"},
  { code: "kokka-ippan-dai", name: "国家一般職（大卒程度）", sub: "2026年度・基礎能力13問を解説・原図付きで部分収録", domain: "legal" },
  { code: "kokka-ippan-dai", name: "国家一般職（大卒程度）", sub: "2026年度・基礎能力10問を解説・原図付きで部分収録", domain: "legal" },
  { code: "kokka-sogo-in", name: "国家総合職（院卒者）", sub: "2026年度・基礎能力14問を解説・原図付きで部分収録", domain: "legal" },
  { code: "kokka-sogo-dai", name: "国家総合職（大卒程度）", sub: "2026年度・基礎能力9問を全肢解説付きで部分収録", domain: "money" },
  { code: "boueki-c", name: "貿易実務検定C級", sub: "公式出題例・英語7問を全肢解説付きで部分収録", domain: "money" },
  { code: "service2", name: "サービス接遇検定2級", sub: "公式出題例・択一3問を全肢解説付きで部分収録", domain: "welfare" },
  { code: "apef3", name: "仏検3級", sub: "2015年度秋季・筆記12設問、全肢解説", domain: "welfare" },
  { code: "ishi", name: "医師国家試験", sub: "第120回・問題Aの問1〜15、全肢解説", domain: "welfare" },
  { code: "shika-ishi", name: "歯科医師", sub: "第119・118回の問題A〜D、第117回の問題B", domain: "welfare" },
  { code: "yakuzaishi", name: "薬剤師", sub: "第110回1日目③の45問など、第108・110・111回の407問", domain: "welfare" },
  { code: "ahaki-anma", name: "あん摩マッサージ指圧師", sub: "第34・33回の計319原問。第34回は全160問", domain: "welfare" },
  { code: "ahaki-hari-kyu", name: "はり師・きゅう師", sub: "第34・33回の午前・午後と第30回午前の全90問", domain: "welfare" },
];

function otherItem(def: OtherCardDef): HomeDirectoryItem {
  const practical = def.code === "fp2" ? fp2PracticalCount() : def.code === "fp3" ? fp3PracticalCount() : 0;
  return {
    key: def.code,
    historyPrefixes: historyPrefixes(def.code),
    href: `/${def.code}`,
    name: def.name,
    sub: def.sub,
    questionCount: examQuestionCount(def.code) + practical + (def.code === "sharoushi" ? PUBLISHED_SENTAKU.length : 0),
    periodLabel: `${examPeriodCount(def.code)}期分`,
    extra: def.code === "chusho-kigyo-shindanshi" ? "465原問・504設問" : def.code === "sharoushi" ? `択一式${examQuestionCount(def.code)}原問・選択式${PUBLISHED_SENTAKU.length}原問` : practical > 0 ? `学科${examQuestionCount(def.code)}問・実技${practical}問` : undefined,
  };
}

function safetyItems(): HomeDirectoryItem[] {

  return QUALIFICATION_HUBS.flatMap((hub) => {

    const papers = getQualificationHubEntries(hub).flatMap((entry) => {

      const stats = getExamPaperStats(entry.id);

      return stats ? [stats] : [];

    });

    if (papers.length === 0) return [];

    return [{

      key: hub.slug,

      href: qualificationHubPath(hub.slug),

      name: hub.name,

      questionCount: papers.reduce((sum, paper) => sum + paper.questionCount, 0),

      periodLabel: `${papers.length}回分`,

    }];

  });

}

/**
 * 恒久ハブを持たない免許試験（特級ボイラー技士・潜水士など）。
 * 公表問題ライブラリの科目絞り込みURLへ案内する（ハブがある科目はハブへ301される）。
 */
function safetyOtherItems(): HomeDirectoryItem[] {

  const bySubject = new Map<string, { group: string; questionCount: number; papers: number }>();

  for (const entry of EXAM_CATALOG) {

    if (qualificationHubForEntry(entry)) continue;

    const stats = getExamPaperStats(entry.id);

    if (!stats) continue;

    const current = bySubject.get(entry.subject) ?? { group: entry.group, questionCount: 0, papers: 0 };

    current.questionCount += stats.questionCount;

    current.papers += 1;

    bySubject.set(entry.subject, current);

  }

  return [...bySubject.entries()].map(([subject, value]) => ({

    key: `${value.group}-${subject}`,

    href: `${EXAM_LIBRARY_PATH}?group=${value.group}&subject=${encodeURIComponent(subject)}`,

    name: subject,

    questionCount: value.questionCount,

    periodLabel: `${value.papers}回分`,

  }));

}

function sumQuestions(items: readonly HomeDirectoryItem[]): number {

  return items.reduce((sum, item) => sum + item.questionCount, 0);

}

function domain(

  base: Omit<HomeDirectoryDomain, "totalQuestions" | "qualificationCount" | "featured" | "compact">,

  featured: HomeDirectoryItem[],

  compact: HomeDirectoryItem[] = [],

): HomeDirectoryDomain {

  const visibleFeatured = featured.filter((item) => item.questionCount > 0);

  const visibleCompact = compact.filter((item) => item.questionCount > 0);

  return {

    ...base,

    featured: visibleFeatured,

    compact: visibleCompact,

    totalQuestions: sumQuestions(visibleFeatured) + sumQuestions(visibleCompact),

    qualificationCount: visibleFeatured.length + visibleCompact.length,

  };

}

export function getHomeDirectory(): HomeDirectoryDomain[] {

  const catalogDomains: Record<QualificationDomain, HomeDomainId> = {
    "information-technology": "it",
    finance: "money",
    business: "money",
    "real-estate": "real-estate",
    accounting: "money",
    electrical: "electrical",
    construction: "construction",
    safety: "safety",
    legal: "legal",
    automotive: "automotive",
    welfare: "welfare",
    pharmacy: "welfare",
    "personal-services": "welfare",
  };

  const additionalCards: OtherCardDef[] = QUALIFICATION_CATALOG.flatMap((entry) => {

    if (entry.status !== "live" || !entry.examCode || entry.domain === "automotive" || OTHER_CARDS.some((card) => card.code === entry.examCode)) return [];

    return [{ code: entry.examCode, name: entry.shortName, sub: entry.reuseSummary, domain: catalogDomains[entry.domain] }];

  });

  // The registration catalog owns the category, including older hand-written cards.

  const others = [...OTHER_CARDS, ...additionalCards].filter((def) => isLiveExam(def.code)).map((def) => {

    const entry = QUALIFICATION_CATALOG.find((entry) => entry.examCode === def.code);

    const classified = { ...def, domain: entry ? catalogDomains[entry.domain] : def.domain };

    return { def: classified, item: otherItem(classified) };

  });

  const byDomain = (id: OtherCardDef["domain"]) => others.filter(({ def }) => def.domain === id).map(({ item }) => item);

  const libraryItems = safetyOtherItems();

  const libraryDomain = (item: HomeDirectoryItem): HomeDomainId => {

    if (item.key === "survey-assistant") return "construction";

    if (!item.key.startsWith("pe-first-")) return "safety";

    if (item.name.includes("情報工学")) return "it";

    if (item.name.includes("電気電子")) return "electrical";

    return "construction";

  };

  const libraryByDomain = (id: HomeDomainId) => libraryItems.filter(item => libraryDomain(item) === id);

  const hubItems = safetyItems();

  const domains = [

    domain(

      { id: "automotive", title: "自動車整備", lead: "自動車整備技能登録試験の学科。資格別に確認済みの原問を部分収録。", allHref: "/qualifications", allLabel: "資格ごとの収録範囲を見る" },

      QUALIFICATION_CATALOG.filter((item) => item.domain === "automotive" && item.status === "live" && item.examCode).map((item) => {

        const exam = item.examCode!;

        return { ...otherItem({ code: exam, name: item.shortName, sub: item.reuseSummary, domain: "automotive" }), periodLabel: `${examPeriodCount(exam)}回分` };

      }),

    ),

    domain(

      {

        id: "it",

        title: "IT・情報処理",

        lead: "IPA 情報処理技術者試験。ITパスポートから高度試験まで。",

        allHref: "/ipa",

        allLabel: "IPAの試験をすべて見る",

      },

      [...IPA_FEATURED.map(ipaItem), ...byDomain("it")],

      [...IPA_ADVANCED.map(ipaItem), ...libraryByDomain("it")],

    ),

    domain(

      {

        id: "safety",

        title: "安全衛生",

        lead: "安全衛生技術試験協会の免許試験、作業環境測定士、労働安全・労働衛生コンサルタント。",

        allHref: "/e-learning/exams",

        allLabel: "安全衛生の試験をすべて見る",

      },

      [...byDomain("safety").filter((item) => item.key !== "eisei1" && item.key !== "eisei2"), ...hubItems.filter(item => libraryDomain(item) === "safety")],

      libraryByDomain("safety"),

    ),

    domain(

      {

        id: "electrical",

        title: "電気・無線",

        lead: "電気主任技術者・電気工事士・無線など。",

        allHref: "/qualifications",

        allLabel: "その他資格の一覧",

      },

      byDomain("electrical"), libraryByDomain("electrical"),

    ),

    domain(

      {

        id: "construction",

        title: "建設・技術",

        lead: "建築・施工管理・測量・技術士など。",

        allHref: "/qualifications",

        allLabel: "その他資格の一覧",

      },

      [...byDomain("construction"), ...hubItems.filter(item => libraryDomain(item) === "construction")], libraryByDomain("construction"),

    ),

    domain(

      {

        id: "money",

        title: "お金・ビジネス",

        lead: "FP技能検定（学科・実技）、宅建、中小企業診断士など。",

        allHref: "/qualifications",

        allLabel: "その他資格の一覧",

      },

      [...byDomain("money"), { key: "chusho-secondary", href: "/chusho-secondary", name: "中小企業診断士二次", sub: "2023〜2025年度の全12事例と独自解答例", questionCount: CHUSHO_SECONDARY_ORIGINAL_COUNT, periodLabel: "3回分", extra: `${CHUSHO_SECONDARY_SOLUTION_COUNT}解答例・記述練習` }],

    ),

    domain(

      {

        id: "welfare",

        title: "医療・福祉・生活",

        lead: "医療・福祉の国家試験と登録販売者試験。",

        allHref: "/qualifications",

        allLabel: "その他資格の一覧",

      },

      byDomain("welfare"),

    ),

  ];

  domains.push(

    domain({ id: "real-estate", title: "不動産", lead: "宅建・マンション管理など。", allHref: "/qualifications", allLabel: "その他資格の一覧" }, byDomain("real-estate")),

    domain({ id: "legal", title: "法律・労務", lead: "法律・知的財産・社会保険など。", allHref: "/qualifications", allLabel: "その他資格の一覧" }, byDomain("legal")),

  );

  const order: HomeDomainId[] = ["it", "money", "real-estate", "legal", "electrical", "construction", "safety", "welfare", "automotive"];

  return domains.filter((d) => d.qualificationCount > 0).sort((a, b) => order.indexOf(a.id) - order.indexOf(b.id));

}
