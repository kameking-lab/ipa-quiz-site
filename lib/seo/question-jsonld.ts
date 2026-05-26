import { examLabelAt } from "@/lib/exam-naming/history";
import type { ChoiceKey, Question } from "@/lib/questions/types";
import { SITE_BASE_URL, SITE_NAME } from "@/lib/seo/config";
import { ORG_ID, SITE_ID, STUDENT_AUDIENCE } from "@/lib/seo/structured-data";
import { examLabel, formatYearSeason } from "@/lib/utils";

/** Human-readable label for an exam session segment. */
export function sessionLabel(session: string): string {
  const map: Record<string, string> = {
    am: "午前",
    am1: "午前I",
    am2: "午前II",
    pm: "午後",
    pm1: "午後I",
    pm2: "午後II",
    "kamoku-a": "科目A",
    "kamoku-b": "科目B",
  };
  return map[session] ?? session.toUpperCase();
}

export interface QuestionJsonLdInput {
  question: Question;
  /** Absolute canonical URL of the question page. */
  pageUrlAbs: string;
  /** Page <title>, reused for the LearningResource name. */
  title: string;
  /** ISO timestamp of the last data update, used for dateModified. */
  lastUpdatedISO: string;
}

/**
 * Build the structured-data graph for a single question page.
 *
 * Schema set (phase 10 / C-2 dedup): QAPage + LearningResource + BreadcrumbList.
 * The previously co-located `Quiz` node was removed — it duplicated the QAPage's
 * role (Google preferentially evaluates the Q&A type for this content) and added
 * no incremental rich-result eligibility, so the stacking read as redundant.
 *
 * `suggestedAnswer` now carries only the *non-accepted* choices, matching
 * schema.org semantics. Previously it listed every choice including the correct
 * one, which contradicted `acceptedAnswer`.
 */
export function buildQuestionJsonLd({
  question: q,
  pageUrlAbs,
  title,
  lastUpdatedISO,
}: QuestionJsonLdInput) {
  const answerKey = Array.isArray(q.answer) ? q.answer[0] : q.answer;
  const answerText =
    q.choices && answerKey in q.choices
      ? q.choices[answerKey as ChoiceKey]
      : undefined;
  const examPath = `/${q.exam}`;
  const yearSeasonPath = `${examPath}/${q.year}-${q.season}`;

  const otherChoices = q.choices
    ? (Object.entries(q.choices) as [ChoiceKey, string][]).filter(
        ([key]) => key !== answerKey,
      )
    : [];

  const questionEntity = {
    "@type": "Question",
    "@id": `${pageUrlAbs}#question`,
    name: q.question.slice(0, 120),
    text: q.question,
    inLanguage: "ja",
    acceptedAnswer: {
      "@type": "Answer",
      text: answerText ? `${answerKey}: ${answerText}` : String(answerKey),
    },
    ...(otherChoices.length > 0
      ? {
          suggestedAnswer: otherChoices.map(([key, text]) => ({
            "@type": "Answer",
            text: `${key}: ${text}`,
          })),
        }
      : {}),
  };

  const learningResource = {
    "@type": "LearningResource",
    "@id": `${pageUrlAbs}#learning-resource`,
    name: title,
    inLanguage: "ja",
    learningResourceType: "Practice problem",
    educationalLevel: "Professional",
    educationalUse: "Self-study",
    audience: STUDENT_AUDIENCE,
    teaches: q.category,
    educationalAlignment: [
      {
        "@type": "AlignmentObject",
        alignmentType: "educationalSubject",
        targetName: q.category,
      },
    ],
    keywords: [
      examLabel(q.exam),
      examLabelAt(q.exam, q.year, q.season),
      q.category,
      ...q.topicTags,
    ].join(", "),
    isAccessibleForFree: true,
    license: "https://www.ipa.go.jp/shiken/mondai-kaiotu.html",
    creator: {
      "@type": "Organization",
      name: "情報処理推進機構 (IPA)",
      url: "https://www.ipa.go.jp/",
    },
    publisher: {
      "@type": "Organization",
      "@id": ORG_ID,
    },
  };

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "QAPage",
        "@id": `${pageUrlAbs}#qapage`,
        url: pageUrlAbs,
        inLanguage: "ja",
        dateModified: lastUpdatedISO,
        mainEntity: questionEntity,
        isPartOf: {
          "@type": "WebSite",
          "@id": SITE_ID,
          name: SITE_NAME,
          url: SITE_BASE_URL,
        },
      },
      learningResource,
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "ホーム", item: SITE_BASE_URL },
          {
            "@type": "ListItem",
            position: 2,
            name: examLabel(q.exam),
            item: `${SITE_BASE_URL}${examPath}`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: formatYearSeason(q.year, q.season),
            item: `${SITE_BASE_URL}${yearSeasonPath}`,
          },
          {
            "@type": "ListItem",
            position: 4,
            name: `問${q.qNumber}`,
            item: pageUrlAbs,
          },
        ],
      },
    ],
  };
}
