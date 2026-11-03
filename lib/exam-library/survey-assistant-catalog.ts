import type { ExamCatalogEntry } from "@/lib/exam-library-model";

/** Lightweight metadata only. Safe for the existing client catalog consumers. */
export const SURVEY_ASSISTANT_PUBLICATION = "HOLD" as const;
export const SURVEY_ASSISTANT_GROUP = {
  id: "survey-assistant" as const, title: "測量士補試験", shortTitle: "測量士補",
  description: "国土地理院の原本と学習用解説。2026年No.12は参照専用です。", dateNote: "日付は試験実施日です。",
};
export type SurveyAssistantCatalogEntry = Omit<ExamCatalogEntry, "group"> & { group: "survey-assistant" };
const indexUrl = "https://www.gsi.go.jp/LAW/SHIKEN/SHIKEN-kakomon.html";
export const SURVEY_ASSISTANT_CATALOG: readonly SurveyAssistantCatalogEntry[] = [
  { id: "survey-assistant-2025", group: "survey-assistant", subject: "測量士補", label: "2025年 測量士補試験", date: "2025-05-18", dateKind: "exam", pdfUrl: "/exam-library/survey-assistant/561692b95a4f-2025-question-part1.pdf", sourceMode: "official-archive-copy", archiveSourceUrl: "/exam-library/survey-assistant/561692b95a4f-2025-question-part1.pdf", indexUrl, answerMode: "official-choice", checkedAt: "2026-10-30", questionCount: 28, scoredCount: 28 },
  { id: "survey-assistant-2026", group: "survey-assistant", subject: "測量士補", label: "2026年 測量士補試験", date: "2026-05-17", dateKind: "exam", pdfUrl: "/exam-library/survey-assistant/3b797566e6fb-2026-question.pdf", sourceMode: "official-archive-copy", archiveSourceUrl: "/exam-library/survey-assistant/3b797566e6fb-2026-question.pdf", indexUrl, answerMode: "official-choice", checkedAt: "2026-10-30", questionCount: 28, scoredCount: 27 },
];
