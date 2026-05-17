import type { ExamCode } from "@/lib/questions/types";

export interface SuccessStoryPersona {
  ageRange: string;
  occupation: string;
  background: string;
  motivation: string;
  studyMonths: number;
  totalStudyHours: number;
  passedAt: string;
  score?: string;
}

export interface SuccessStory {
  slug: string;
  exam: ExamCode;
  title: string;
  description: string;
  persona: SuccessStoryPersona;
  strugglePoint: string;
  keyTakeaways: string[];
  publishedAt: string;
  updatedAt?: string;
  body: string;
  relatedQuizExam?: ExamCode;
  relatedBlogSlug?: string;
  relatedEssayExam?: ExamCode;
}

export interface SuccessStorySummary {
  slug: string;
  exam: ExamCode;
  title: string;
  description: string;
  ageRange: string;
  occupation: string;
  studyMonths: number;
  totalStudyHours: number;
  passedAt: string;
  publishedAt: string;
  updatedAt?: string;
}

export function toSummary(s: SuccessStory): SuccessStorySummary {
  return {
    slug: s.slug,
    exam: s.exam,
    title: s.title,
    description: s.description,
    ageRange: s.persona.ageRange,
    occupation: s.persona.occupation,
    studyMonths: s.persona.studyMonths,
    totalStudyHours: s.persona.totalStudyHours,
    passedAt: s.persona.passedAt,
    publishedAt: s.publishedAt,
    updatedAt: s.updatedAt,
  };
}
