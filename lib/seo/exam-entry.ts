import type { ExamCode } from "@/lib/questions/types";

/** Search landing pages. These describe published features, not future plans. */
export const EXAM_ENTRIES = {
  sc: {
    scope: "午前I・午前II",
    afternoon: "午後記述",
    aiEssay: false,
    focus: "暗号・認証、ネットワークセキュリティ、インシデント対応",
    practice: "本文の事実と設問の条件を分け、対策の理由を短く書く練習をしましょう。",
    guide: "sc-incident-response-storytelling",
    guideLabel: "インシデント対応の記述を組み立てる",
  },
  nw: {
    scope: "午前I・午前II",
    afternoon: "午後I・IIの記述",
    aiEssay: false,
    focus: "TCP/IP、ルーティング、冗長化、ネットワーク設計",
    practice: "構成図に通信経路と障害時の動きを書き込み、設計の理由を説明しましょう。",
    guide: "nw-gogo-jikan-haibun",
    guideLabel: "午後問題の時間配分と解く順番",
  },
  st: {
    scope: "午前I・午前II",
    afternoon: "午後Iの記述・午後IIの論述",
    aiEssay: true,
    focus: "経営戦略、IT投資、業務改革、効果の評価",
    practice: "事業の課題→IT施策→効果の順に整理。午後Iは本文の根拠、午後IIは自分の事例を具体化します。",
    guide: "st-strategy-perspective",
    guideLabel: "経営視点でIT戦略を考える練習",
  },
  sa: {
    scope: "午前I・午前II",
    afternoon: "午後Iの記述・午後IIの論述",
    aiEssay: true,
    focus: "要件定義、アーキテクチャ、性能・可用性、設計判断",
    practice: "要件→設計上の選択→選んだ理由を一組に。午後Iは本文から、午後IIは経験した事例から根拠を整理します。",
    guide: "sa-architecture-tradeoff",
    guideLabel: "設計のトレードオフを説明する練習",
  },
  ap: {
    scope: "午前",
    afternoon: "午後記述",
    aiEssay: false,
    focus: "テクノロジー、マネジメント、ストラテジの苦手分野",
    practice: "午後は得意な分野を見つけ、問題文の条件に沿って根拠を抜き出す練習をしましょう。",
    guide: "ap-gogo-sentaku",
    guideLabel: "午後問題の分野選びと対策の進め方",
  },
} as const;

export type ExamEntryCode = keyof typeof EXAM_ENTRIES;

export function isExamEntryCode(exam: ExamCode | string): exam is ExamEntryCode {
  return Object.hasOwn(EXAM_ENTRIES, exam);
}

export function examEntrySummary(exam: ExamEntryCode): string {
  return `${EXAM_ENTRIES[exam].scope}の掲載済み過去問を年度別・分野別に演習。午後対策と学習の進め方もここから確認できます。`;
}

export function examEntryDescription(exam: ExamEntryCode, name: string, count: number): string {
  const entry = EXAM_ENTRIES[exam];
  const status = entry.aiEssay
    ? "午後I記述のAI採点は未対応。午後IIはオリジナル論述教材でAI添削を利用できます。"
    : `${entry.afternoon}のAI採点は未対応。午後対策ガイドと公式問題へのリンクを案内します。`;
  return `${name}の${entry.scope}過去問${count.toLocaleString("ja-JP")}問を年度別・分野別に掲載。正答・学習用解説を確認し、ログイン不要でまず10問。${status}`;
}
