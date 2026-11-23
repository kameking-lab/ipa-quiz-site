import type { EssayQuestion } from "./types";

export type WorkshopExam = EssayQuestion["exam"];
export const SECTION_KEYS = ["ア", "イ", "ウ"] as const;
export type SectionKey = (typeof SECTION_KEYS)[number];

// Integration defaults for the member workflow. The development preview performs no generation.
export const WORKSHOP_RELEASE_DEFAULTS: {
  exams: readonly WorkshopExam[];
  variantIds: readonly string[];
  freeExperience: { mode: "sample" } | { mode: "first-section"; perMember: number };
  modelSelection: "compare-before-release" | "configured-model";
  memberDailyGeneration: { templateRevisions: number; variants: number } | null;
  retryIfAcceptanceBelow: number | null;
  legacyGrading: "switch-with-member-workflow" | "keep";
} = {
  exams: ["pm"],
  variantIds: ["pm-2025-q2", "pm-2024-q1", "pm-2023-q1"],
  freeExperience: { mode: "first-section", perMember: 1 },
  modelSelection: "compare-before-release",
  memberDailyGeneration: { templateRevisions: 3, variants: 10 },
  retryIfAcceptanceBelow: 0.8,
  legacyGrading: "switch-with-member-workflow",
};

export interface InterviewQuestion {
  prompt: string;
  choices: string[];
}

export interface EssayParagraph {
  heading: string;
  text: string;
}

export interface EssaySection {
  title: string;
  paragraphs: readonly EssayParagraph[];
  body: string;
}

export interface EssayDraft {
  title: string;
  sections: Record<SectionKey, EssaySection>;
  reuse: { section: SectionKey; theme: string; anchor: string; direction: string }[];
}

export function essaySection(title: string, paragraphs: readonly EssayParagraph[]): EssaySection {
  return { title, paragraphs, body: paragraphs.map(({ text }) => text).join("\n\n") };
}

export const WORKSHOP_ROLES: Record<WorkshopExam, { name: string; focus: string; sections: readonly [string, string, string] }> = {
  st: {
    name: "ITストラテジスト",
    focus: "事業上の判断",
    sections: ["事業特性、業務、経営課題", "根拠に基づく企画・分析・方針", "事業部門や経営層との調整、指摘後の改善"],
  },
  sa: {
    name: "システムアーキテクト",
    focus: "システム設計の判断",
    sections: ["業務目標、対象システム、制約", "改善・設計の内容と選定理由", "設計上の工夫、適用時の課題と対応"],
  },
  pm: {
    name: "プロジェクトマネージャ",
    focus: "プロジェクト管理の判断",
    sections: ["目標、担当範囲、重視した課題", "制約を踏まえた計画・判断と理由", "実行時の状況、見直しとその評価"],
  },
  au: {
    name: "システム監査技術者",
    focus: "監査上の判断",
    sections: ["監査対象とその目的・背景", "リスク評価やプロセス上の着眼点・証拠", "監査手続または体制上の着眼点・証拠"],
  },
  sm: {
    name: "ITサービスマネージャ",
    focus: "サービス運用の判断",
    sections: ["サービス概要、顧客と運用上の課題", "現状分析と、計画・管理・改善の内容", "取組の評価、残った課題や改善"],
  },
};

export const FIRST_INTERVIEW_QUESTION: Record<WorkshopExam, string> = {
  st: "どんな事業で、どのIT施策に携わりましたか？",
  sa: "どんな業務を支えるシステムを設計しましたか？",
  pm: "どんなプロジェクトを担当しましたか？",
  au: "どんなシステムや業務を監査しましたか？",
  sm: "どんなITサービスの運用を担当しましたか？",
};

export function countEssayCharacters(body: string): number {
  return Array.from(body.replace(/\r\n|[\r\n]/g, "")).length;
}
