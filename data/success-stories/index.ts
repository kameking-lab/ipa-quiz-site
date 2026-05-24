import type { ExamCode } from "@/lib/questions/types";
import { buildSuccessStory } from "./generators";
import { ALL_PERSONAS } from "./personas";
import type { SuccessStory, SuccessStorySummary } from "./types";
import { toSummary } from "./types";

const ALL_STORIES: SuccessStory[] = ALL_PERSONAS.map(buildSuccessStory);
const BY_SLUG: Map<string, SuccessStory> = new Map(
  ALL_STORIES.map((s) => [s.slug, s]),
);

export function getAllSuccessStories(): SuccessStory[] {
  return ALL_STORIES;
}

export function getAllSuccessStorySummaries(): SuccessStorySummary[] {
  return ALL_STORIES.map(toSummary).sort((a, b) =>
    b.publishedAt.localeCompare(a.publishedAt),
  );
}

export function getSuccessStoryBySlug(slug: string): SuccessStory | undefined {
  return BY_SLUG.get(slug);
}

export function getSuccessStoriesByExam(
  exam: ExamCode,
): SuccessStorySummary[] {
  return ALL_STORIES.filter((s) => s.exam === exam)
    .map(toSummary)
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}

export function getAllSuccessStorySlugs(): { exam: ExamCode; slug: string }[] {
  return ALL_STORIES.map((s) => ({ exam: s.exam, slug: s.slug }));
}

export function getRelatedSuccessStories(
  slug: string,
  limit = 3,
): SuccessStorySummary[] {
  const target = BY_SLUG.get(slug);
  if (!target) return [];
  const sameExam = ALL_STORIES.filter(
    (s) => s.exam === target.exam && s.slug !== slug,
  )
    .map(toSummary)
    .slice(0, limit);
  if (sameExam.length >= limit) return sameExam;
  const others = ALL_STORIES.filter(
    (s) => s.exam !== target.exam && !sameExam.some((e) => e.slug === s.slug),
  )
    .map(toSummary)
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))
    .slice(0, limit - sameExam.length);
  return [...sameExam, ...others];
}

/**
 * Match the named story to other personas that share intuitively-similar
 * attributes. The matcher purposely runs on static metadata — no AI, no
 * LocalStorage — so the recommendation is identical for every visitor.
 *
 * Match criteria (any one passes):
 *   1. Same age decade AND same occupation bucket
 *   2. Same exam AND same study-months bucket
 *
 * Returns at most `limit` summaries, each annotated with the reason it was
 * matched so the UI can show a short '同じ20代社会人' style explainer.
 */
export interface SuccessStoryMatch {
  story: SuccessStorySummary;
  reason: string;
}

type OccupationBucket = "student" | "freelance" | "professional" | "other";
type StudyMonthsBucket = "lt3" | "3to6" | "6to12" | "12plus";

function ageDecade(ageRange: string): string {
  // ageRange values are "10代後半" / "20代前半" / etc. — strip the bracket.
  const m = /(\d+)代/.exec(ageRange);
  return m ? `${m[1]}代` : ageRange;
}

function occupationBucket(occupation: string): OccupationBucket {
  const o = occupation.toLowerCase();
  if (o.includes("学生") || o.includes("大学院") || o.includes("院生") || o.includes("新卒")) {
    return "student";
  }
  if (o.includes("フリーランス") || o.includes("個人事業")) return "freelance";
  if (occupation.trim().length > 0) return "professional";
  return "other";
}

const OCCUPATION_LABEL: Record<OccupationBucket, string> = {
  student: "学生",
  freelance: "フリーランス",
  professional: "社会人",
  other: "その他",
};

function studyMonthsBucket(m: number): StudyMonthsBucket {
  if (m < 3) return "lt3";
  if (m <= 6) return "3to6";
  if (m <= 12) return "6to12";
  return "12plus";
}

const STUDY_LABEL: Record<StudyMonthsBucket, string> = {
  lt3: "3か月未満",
  "3to6": "3〜6か月",
  "6to12": "6か月〜1年",
  "12plus": "1年以上",
};

export function getSimilarPersonaStories(
  slug: string,
  limit = 4,
): SuccessStoryMatch[] {
  const target = BY_SLUG.get(slug);
  if (!target) return [];

  const targetDecade = ageDecade(target.persona.ageRange);
  const targetOcc = occupationBucket(target.persona.occupation);
  const targetStudy = studyMonthsBucket(target.persona.studyMonths);

  const seen = new Set<string>([target.slug]);
  const out: SuccessStoryMatch[] = [];

  // Pass 1: same age decade + same occupation bucket
  for (const s of ALL_STORIES) {
    if (out.length >= limit) break;
    if (seen.has(s.slug)) continue;
    if (
      ageDecade(s.persona.ageRange) === targetDecade &&
      occupationBucket(s.persona.occupation) === targetOcc
    ) {
      out.push({
        story: toSummary(s),
        reason: `同じ${targetDecade}${OCCUPATION_LABEL[targetOcc]}`,
      });
      seen.add(s.slug);
    }
  }

  // Pass 2: same exam + same study-months bucket
  for (const s of ALL_STORIES) {
    if (out.length >= limit) break;
    if (seen.has(s.slug)) continue;
    if (
      s.exam === target.exam &&
      studyMonthsBucket(s.persona.studyMonths) === targetStudy
    ) {
      out.push({
        story: toSummary(s),
        reason: `同じ${target.exam.toUpperCase()}・学習${STUDY_LABEL[targetStudy]}`,
      });
      seen.add(s.slug);
    }
  }

  return out;
}

export function getSuccessStoryExams(): ExamCode[] {
  const set = new Set<ExamCode>();
  for (const s of ALL_STORIES) set.add(s.exam);
  return Array.from(set);
}

export function getSuccessStoryCountByExam(): Map<ExamCode, number> {
  const counts = new Map<ExamCode, number>();
  for (const s of ALL_STORIES) {
    counts.set(s.exam, (counts.get(s.exam) ?? 0) + 1);
  }
  return counts;
}
