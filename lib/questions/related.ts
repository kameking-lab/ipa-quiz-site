import { AP_TOPIC_GROUPS, AP_GROUP_EXAMS } from "./category-pool";
import { isPlaceholderExplanation } from "./filter";
import type { ExamCode, Question } from "./types";

/** 共通カリキュラム横断学習が成立する午前知識問題のセッション。 */
const MORNING_KNOWLEDGE_SESSIONS = new Set(["am", "am1", "am2", "kamoku-a"]);

function isMorningKnowledge(q: Question): boolean {
  return q.type === "multiple-choice" && MORNING_KNOWLEDGE_SESSIONS.has(q.session);
}

/** クロスリンク先として安全な問題か（404/noindex 先を作らない）。 */
function isLinkableTarget(q: Question): boolean {
  return !q.needsReview && !isPlaceholderExplanation(q);
}

export type CrossExamMode = "topic" | "category";

export interface CrossExamRelated {
  questions: Question[];
  mode: CrossExamMode;
}

/**
 * トピックタグを共有する他試験区分の過去問を、共有タグ数の多い順に返す。
 * 単純な filter().slice() は ALL_QUESTIONS 配列順の先頭を採るため、タグを 1 本
 * しか共有しない関連の薄い問題が複数タグ共有の問題を押し出す relevance-leak が
 * 起きる。共有タグ数の降順（同点は配列順を保つ安定ソート）で採る。
 */
function byTopicTags(
  current: Question,
  allQuestions: Question[],
  limit: number,
): Question[] {
  const tagSet = new Set(current.topicTags);
  return allQuestions
    .filter(
      (x) =>
        x.id !== current.id &&
        x.exam !== current.exam &&
        isLinkableTarget(x) &&
        x.topicTags.some((t) => tagSet.has(t)),
    )
    .map((x) => ({
      q: x,
      shared: x.topicTags.reduce((n, t) => (tagSet.has(t) ? n + 1 : n), 0),
    }))
    .sort((a, b) => b.shared - a.shared)
    .slice(0, limit)
    .map((s) => s.q);
}

/**
 * 共通カリキュラム(AP/FE/IP/SG)で同じ分野グループに属する他試験区分の午前知識
 * 問題を、各区分 1 問ずつ（新しい年度優先）返す。topicTag が未付与でも IPA
 * 共通キャリア・スキルフレームワーク上の同義分野（例: AP「経営戦略」≒ FE/IP
 * 「ストラテジ」）で横断クロスリンクを張り、/q 面の内部リンク網を補強する。
 * 高度試験など共通カリキュラム外の区分は対象外（空を返す）。
 */
function byCategoryGroup(
  current: Question,
  allQuestions: Question[],
  limit: number,
): Question[] {
  if (!AP_GROUP_EXAMS.includes(current.exam)) return [];
  if (!isMorningKnowledge(current)) return [];

  const group = AP_TOPIC_GROUPS.find((g) =>
    (g.byExam[current.exam] ?? []).includes(current.category),
  );
  if (!group) return [];

  // 各「他試験区分 → その区分でこのグループに属する category 集合」を引けるよう索引化。
  const otherExamCats = new Map<ExamCode, Set<string>>();
  for (const [examCode, cats] of Object.entries(group.byExam) as Array<
    [ExamCode, string[]]
  >) {
    if (examCode === current.exam) continue;
    otherExamCats.set(examCode, new Set(cats));
  }
  if (otherExamCats.size === 0) return [];

  // 各他区分から最新年度の代表 1 問を採り、特定区分が枠を独占しないようにする。
  const repByExam = new Map<ExamCode, Question>();
  for (const x of allQuestions) {
    if (x.exam === current.exam || x.id === current.id) continue;
    if (!isMorningKnowledge(x) || !isLinkableTarget(x)) continue;
    const cats = otherExamCats.get(x.exam);
    if (!cats || !cats.has(x.category)) continue;
    const cur = repByExam.get(x.exam);
    if (!cur || x.year > cur.year) repByExam.set(x.exam, x);
  }

  return [...repByExam.values()]
    .sort((a, b) => b.year - a.year)
    .slice(0, limit);
}

/**
 * /q ページの「他試験区分の関連問題」レール用。topicTag があればトピック精密
 * マッチ（mode:"topic"）、無ければ共通カリキュラムの同分野グループで代替
 * （mode:"category"）。どちらも該当しなければ空。
 */
export function getCrossExamRelatedQuestions(
  current: Question,
  allQuestions: Question[],
  limit: number,
): CrossExamRelated {
  if (current.topicTags.length > 0) {
    return { questions: byTopicTags(current, allQuestions, limit), mode: "topic" };
  }
  return {
    questions: byCategoryGroup(current, allQuestions, limit),
    mode: "category",
  };
}
