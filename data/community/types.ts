import type { ExamCode } from "@/lib/questions/types";

export type CommunityQuestionStatus = "open" | "answered" | "resolved";

export interface CommunityQuestionSeed {
  id: string;
  exam: ExamCode;
  title: string;
  body: string;
  authorName: string;
  authorYearsExp?: string;
  tags: string[];
  status: CommunityQuestionStatus;
  answerCount: number;
  topAnswerSnippet?: string;
  createdAt: string;
}

export type StoryDifficulty = "easy" | "moderate" | "hard";

export interface CommunityStorySeed {
  id: string;
  exam: ExamCode;
  title: string;
  authorName: string;
  authorRole: string;
  studyMonths: number;
  studyHoursPerDay: number;
  passedAt: string;
  difficulty: StoryDifficulty;
  morningScore?: number;
  afternoonScore?: number;
  body: string;
  tools: string[];
}

export interface CommunityQuestionDraft {
  id: string;
  exam: ExamCode;
  title: string;
  body: string;
  authorName: string;
  tags: string[];
  createdAt: string;
}
