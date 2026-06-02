import { examLabelAt } from "@/lib/exam-naming/history";
import type { ChoiceKey, Question, Season } from "@/lib/questions/types";
import { SITE_BASE_URL, SITE_NAME } from "@/lib/seo/config";
import { ORG_ID, SITE_ID, STUDENT_AUDIENCE } from "@/lib/seo/structured-data";
import { examLabel, formatYearSeason } from "@/lib/utils";

/**
 * Approximate publish date (ISO `YYYY-MM-DD`) for an exam session, used for the
 * Q&A `Question.datePublished`/`dateCreated`. IPA spring exams run mid-April and
 * autumn exams mid-October; CBT divisions (IP/SG) run year-round, so we anchor
 * those to the exam year. A valid in-year date is what Google Q&A needs — exact
 * sitting dates per question are not tracked.
 */
function examPublishDateISO(year: number, season: Season): string {
  const monthDay =
    season === "autumn" ? "10-21" : season === "spring" ? "04-21" : "04-01";
  return `${year}-${monthDay}`;
}

/**
 * Qualify a date-only ISO string (`YYYY-MM-DD`) with the JST timezone so it
 * becomes a full ISO 8601 datetime (`YYYY-MM-DDT00:00:00+09:00`). Google's Q&A
 * rich-result validation emits recommendation warnings for bare dates on
 * `datePublished` / `dateCreated` / `dateModified`; a timezone-qualified
 * datetime clears them. The exam/update dates are Japan-local, so +09:00 is the
 * correct anchor. Inputs that already carry a time component pass through
 * unchanged.
 */
function toJstDateTimeISO(iso: string): string {
  return /^\d{4}-\d{2}-\d{2}$/.test(iso) ? `${iso}T00:00:00+09:00` : iso;
}

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

  // Q&A authorship: IPA authored the question; this site authored the answer
  // (explanation). Full inline Organization objects (not @id refs) so Google's
  // per-page Q&A validation resolves them without the homepage Organization node.
  const ipaAuthor = {
    "@type": "Organization",
    name: "情報処理推進機構 (IPA)",
    url: "https://www.ipa.go.jp/",
  };
  const siteAuthor = {
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_BASE_URL,
  };
  const questionDateISO = toJstDateTimeISO(examPublishDateISO(q.year, q.season));
  const lastUpdatedDateTimeISO = toJstDateTimeISO(lastUpdatedISO);

  // The accepted answer links to the in-page explanation anchor (#explanation).
  const acceptedAnswer = {
    "@type": "Answer",
    text: answerText ? `${answerKey}: ${answerText}` : String(answerKey),
    inLanguage: "ja",
    url: `${pageUrlAbs}#explanation`,
    author: siteAuthor,
    datePublished: lastUpdatedDateTimeISO,
    upvoteCount: 0,
  };

  const questionEntity = {
    "@type": "Question",
    "@id": `${pageUrlAbs}#question`,
    name: q.question.slice(0, 120),
    text: q.question,
    inLanguage: "ja",
    // Required by Google Q&A (the missing field was the critical error): total
    // answers = the correct one + the distractor choices.
    answerCount: 1 + otherChoices.length,
    author: ipaAuthor,
    datePublished: questionDateISO,
    dateCreated: questionDateISO,
    upvoteCount: 0,
    url: pageUrlAbs,
    acceptedAnswer,
    ...(otherChoices.length > 0
      ? {
          suggestedAnswer: otherChoices.map(([key, text]) => ({
            "@type": "Answer",
            text: `${key}: ${text}`,
            inLanguage: "ja",
            url: pageUrlAbs,
            author: siteAuthor,
            datePublished: lastUpdatedDateTimeISO,
            upvoteCount: 0,
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
    // IPA's past-exam usage terms (許諾不要・使用料不要・出典明記) live on the FAQ
    // page; the old mondai-kaiotu .html page was decommissioned (404). faq.html
    // is verified 200. See nonblog-external-ipa-link-health.test.ts.
    license: "https://www.ipa.go.jp/shiken/faq.html",
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
        dateModified: lastUpdatedDateTimeISO,
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
