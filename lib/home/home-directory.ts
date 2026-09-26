import "server-only";

import { EXAM_QUESTION_COUNTS } from "@/lib/constants/exam-question-counts";
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
import { QUALIFICATION_CATALOG } from "@/lib/qualifications/catalog";
import type { ExamCode } from "@/lib/questions/types";
import { getQuestionsByExamStrict, groupByYearSeason } from "@/lib/seo/exam-meta";

/**
 * トップページの「分野から選ぶ」ディレクトリ。
 * 数値はすべて収録データから算出する（手入力の件数・年度を持たない）。
 *  - IPA / その他資格の問題数: EXAM_QUESTION_COUNTS（/ipa の資格カードと同じ集計）
 *  - 期分: 各資格ページの「N 期分」バッジと同じ groupByYearSeason
 *  - 安全衛生: 各資格ハブと同じ getExamPaperStats の合計
 */

export type HomeDomainId = "it" | "safety" | "electrical" | "construction" | "money" | "welfare";

export interface HomeDirectoryItem {
  key: string;
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

function ipaItem(def: IpaCardDef): HomeDirectoryItem {
  return {
    key: def.code,
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
  domain: Exclude<HomeDomainId, "it" | "safety">;
}

const OTHER_CARDS: readonly OtherCardDef[] = [
  { code: "denken3", name: "電験三種", sub: "第三種電気主任技術者", domain: "electrical" },
  { code: "denko2", name: "第二種電気工事士", sub: "学科試験", domain: "electrical" },
  { code: "denko1", name: "第一種電気工事士", sub: "学科試験", domain: "electrical" },
  { code: "civil2", name: "2級土木施工管理", sub: "第一次検定（土木）", domain: "construction" },
  { code: "kankoji2", name: "2級管工事施工管理", sub: "第一次検定", domain: "construction" },
  { code: "fp3", name: "FP3級", sub: "FP技能検定3級（学科・実技）", domain: "money" },
  { code: "fp2", name: "FP2級", sub: "FP技能検定2級（学科・実技）", domain: "money" },
  { code: "takken", name: "宅建", sub: "宅地建物取引士資格試験", domain: "money" },
  { code: "kaigo", name: "介護福祉士", sub: "国家試験（総合問題を含む）", domain: "welfare" },
];

function otherItem(def: OtherCardDef): HomeDirectoryItem {
  const practical = def.code === "fp2" ? fp2PracticalCount() : def.code === "fp3" ? fp3PracticalCount() : 0;
  return {
    key: def.code,
    href: `/${def.code}`,
    name: def.name,
    sub: def.sub,
    questionCount: examQuestionCount(def.code) + practical,
    periodLabel: `${examPeriodCount(def.code)}期分`,
    extra: practical > 0 ? `学科${examQuestionCount(def.code)}問・実技${practical}問` : undefined,
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
  const others = OTHER_CARDS.filter((def) => isLiveExam(def.code)).map((def) => ({ def, item: otherItem(def) }));
  const byDomain = (id: OtherCardDef["domain"]) => others.filter(({ def }) => def.domain === id).map(({ item }) => item);

  const domains = [
    domain(
      {
        id: "it",
        title: "IT・情報処理",
        lead: "IPA 情報処理技術者試験。ITパスポートから高度試験まで。",
        allHref: "/ipa",
        allLabel: "IPAの試験をすべて見る",
      },
      IPA_FEATURED.map(ipaItem),
      IPA_ADVANCED.map(ipaItem),
    ),
    domain(
      {
        id: "safety",
        title: "安全衛生",
        lead: "安全衛生技術試験協会の免許試験、作業環境測定士、労働安全・労働衛生コンサルタント。",
        allHref: "/e-learning/exams",
        allLabel: "安全衛生の試験をすべて見る",
      },
      safetyItems(),
      safetyOtherItems(),
    ),
    domain(
      {
        id: "electrical",
        title: "電気",
        lead: "電験三種と第二種電気工事士の公式公開問題。",
        allHref: "/qualifications",
        allLabel: "その他資格の一覧",
      },
      byDomain("electrical"),
    ),
    domain(
      {
        id: "construction",
        title: "建設・施工管理",
        lead: "2級土木・2級管工事施工管理技術検定の第一次検定。",
        allHref: "/qualifications",
        allLabel: "その他資格の一覧",
      },
      byDomain("construction"),
    ),
    domain(
      {
        id: "money",
        title: "お金・不動産",
        lead: "FP技能検定（学科・実技）と宅建。",
        allHref: "/qualifications",
        allLabel: "その他資格の一覧",
      },
      byDomain("money"),
    ),
    domain(
      {
        id: "welfare",
        title: "福祉・介護",
        lead: "社会福祉振興・試験センターの福祉系国家試験。",
        allHref: "/qualifications",
        allLabel: "その他資格の一覧",
      },
      byDomain("welfare"),
    ),
  ];
  return domains.filter((d) => d.qualificationCount > 0);
}
