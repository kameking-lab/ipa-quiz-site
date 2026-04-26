import type { ExamCode, Question } from "./types";

/**
 * AP相当の知識範囲を、AP/FE/IP/SG共通カリキュラムから横断的に学習するためのマッピング。
 * IPA「共通キャリア・スキルフレームワーク」上、これらの試験は同じ知識体系を扱うため、
 * 分野横断学習が成立する。同義カテゴリ（例: AP「経営戦略」≒ FE/IP「ストラテジ」）を
 * 1グループにまとめ、ユーザーが分野指定で出題したときの母数を最大化する。
 */
export const AP_TOPIC_GROUPS: Array<{
  /** UI 表示用のグループ名（AP のカテゴリ表記をベース） */
  label: string;
  /** 各 exam における同義カテゴリ */
  byExam: Partial<Record<ExamCode, string[]>>;
}> = [
  {
    label: "基礎理論",
    byExam: {
      ap: ["基礎理論"],
      fe: ["基礎理論"],
      ip: ["基礎理論"],
    },
  },
  {
    label: "アルゴリズムとプログラミング",
    byExam: {
      ap: ["アルゴリズムとプログラミング"],
      fe: ["アルゴリズムとプログラミング"],
      ip: ["アルゴリズムとプログラミング"],
    },
  },
  {
    label: "コンピュータシステム",
    byExam: {
      ap: ["コンピュータシステム"],
      fe: ["コンピュータシステム"],
      ip: ["コンピュータシステム", "テクノロジ"],
    },
  },
  {
    label: "データベース",
    byExam: {
      ap: ["データベース"],
      fe: ["データベース"],
      ip: ["データベース"],
    },
  },
  {
    label: "ネットワーク",
    byExam: {
      ap: ["ネットワーク"],
      fe: ["ネットワーク"],
      ip: ["ネットワーク"],
    },
  },
  {
    label: "セキュリティ",
    byExam: {
      ap: ["セキュリティ"],
      fe: ["セキュリティ"],
      ip: ["セキュリティ"],
      sg: [
        "セキュリティ",
        "セキュリティ技術",
        "情報セキュリティ",
        "情報セキュリティ管理",
        "情報セキュリティ対策",
        "リスクマネジメント",
        "法務・規程",
      ],
    },
  },
  {
    label: "開発技術",
    byExam: {
      ap: ["開発技術"],
      fe: ["開発技術"],
      ip: ["開発技術"],
    },
  },
  {
    label: "マネジメント（PM・SM）",
    byExam: {
      ap: ["プロジェクトマネジメント", "サービスマネジメント"],
      fe: ["マネジメント"],
      ip: ["マネジメント"],
    },
  },
  {
    label: "ストラテジ（経営・法務）",
    byExam: {
      ap: ["システム戦略", "経営戦略", "企業と法務"],
      fe: ["ストラテジ"],
      ip: ["ストラテジ"],
    },
  },
];

export const AP_GROUP_EXAMS: ExamCode[] = ["ap", "fe", "ip", "sg"];

export interface TopicGroupCount {
  label: string;
  count: number;
  examGroup: ExamCode[];
  /** どの exam から何問プールされたかの内訳 */
  byExam: Partial<Record<ExamCode, number>>;
}

/**
 * AP_TOPIC_GROUPS を元に、各グループに含まれる質問数を計算する。
 * AP単独より大幅に多い母数になる。
 */
export function countApTopicGroups(allQuestions: Question[]): TopicGroupCount[] {
  const idx = new Map<ExamCode, Map<string, number>>();
  for (const q of allQuestions) {
    if (
      q.session !== "am" &&
      q.session !== "am1" &&
      q.session !== "am2" &&
      q.session !== "kamoku-a"
    )
      continue;
    if (q.type !== "multiple-choice") continue;
    let m = idx.get(q.exam);
    if (!m) {
      m = new Map();
      idx.set(q.exam, m);
    }
    m.set(q.category, (m.get(q.category) ?? 0) + 1);
  }

  return AP_TOPIC_GROUPS.map((g) => {
    let count = 0;
    const byExam: Partial<Record<ExamCode, number>> = {};
    for (const [examCode, cats] of Object.entries(g.byExam) as Array<
      [ExamCode, string[]]
    >) {
      const m = idx.get(examCode);
      if (!m) continue;
      let sub = 0;
      for (const c of cats) sub += m.get(c) ?? 0;
      if (sub > 0) {
        byExam[examCode] = sub;
        count += sub;
      }
    }
    return { label: g.label, count, examGroup: AP_GROUP_EXAMS, byExam };
  })
    .filter((g) => g.count > 0)
    .sort((a, b) => b.count - a.count);
}

/**
 * グループラベルから、フィルタに渡すべき category 文字列のリストと exam group を解決する。
 */
export function resolveApTopicGroup(
  label: string,
): { categories: string[]; examGroup: ExamCode[] } | null {
  const g = AP_TOPIC_GROUPS.find((x) => x.label === label);
  if (!g) return null;
  const categories = new Set<string>();
  for (const cats of Object.values(g.byExam)) {
    for (const c of cats) categories.add(c);
  }
  return { categories: [...categories], examGroup: AP_GROUP_EXAMS };
}
