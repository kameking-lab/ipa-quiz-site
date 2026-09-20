import { questionSourceEdition, questionSourceExam } from "@/lib/questions/source-label";
import type { ChoiceKey, Question } from "@/lib/questions/types";
import { SITE_BASE_URL, SITE_NAME } from "@/lib/seo/config";
import { ORG_ID, SITE_ID, STUDENT_AUDIENCE } from "@/lib/seo/structured-data";

/**
 * Qualify a date-only ISO string (`YYYY-MM-DD`) with the JST timezone so it
 * becomes a full ISO 8601 datetime (`YYYY-MM-DDT00:00:00+09:00`). The exam and
 * update dates are Japan-local, so +09:00 is the correct anchor. Inputs that
 * already carry a time component pass through unchanged.
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
 * Schema set: LearningResource (containing a Question) + BreadcrumbList.
 *
 * This is an editorial practice problem with a published correct answer. It is
 * not a user-generated Q&A page and visitors cannot submit answers for public
 * display, so QAPage would misrepresent both the page and Google's eligibility
 * rules. Distractors are rendered in the HTML UI, but are deliberately not
 * emitted as suggestedAnswer: a wrong multiple-choice option is not a proposed
 * answer authored by a user.
 */
export function buildQuestionJsonLd({
  question: q,
  pageUrlAbs,
  title,
  lastUpdatedISO,
}: QuestionJsonLdInput) {
  const answerKeys = Array.isArray(q.answer) ? q.answer : [q.answer];
  const examPath = `/${q.exam}`;
  const yearSeasonPath = `${examPath}/${q.year}-${q.season}`;

  // IPA authored the question; this site authored the published answer
  // (explanation). Full inline Organization objects keep the graph useful even
  // though the question page does not embed the homepage Organization node.
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
  const lastUpdatedDateTimeISO = toJstDateTimeISO(lastUpdatedISO);

  // The accepted answer links to the in-page explanation anchor (#explanation).
  const acceptedAnswers = answerKeys.map(answerKey => ({
    "@type": "Answer",
    text: q.choices?.[answerKey as ChoiceKey] ? `${answerKey}: ${q.choices[answerKey as ChoiceKey]}` : String(answerKey),
    inLanguage: "ja",
    url: `${pageUrlAbs}#explanation`,
    author: siteAuthor,
    datePublished: lastUpdatedDateTimeISO,
    upvoteCount: 0,
  }));
  const acceptedAnswer = acceptedAnswers.length === 1 ? acceptedAnswers[0] : acceptedAnswers;

  const questionEntity = {
    "@type": "Question",
    "@id": `${pageUrlAbs}#question`,
    name: q.question.slice(0, 120),
    text: q.question,
    inLanguage: "ja",
    author: ipaAuthor,
    upvoteCount: 0,
    url: pageUrlAbs,
    acceptedAnswer,
  };

  const learningResource = {
    "@type": "LearningResource",
    "@id": `${pageUrlAbs}#learning-resource`,
    name: title,
    url: pageUrlAbs,
    dateModified: lastUpdatedDateTimeISO,
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
      questionSourceExam(q),
      questionSourceExam(q),
      q.category,
      ...q.topicTags,
    ].join(", "),
    isAccessibleForFree: true,
    hasPart: questionEntity,
    isPartOf: {
      "@type": "WebSite",
      "@id": SITE_ID,
      name: SITE_NAME,
      url: SITE_BASE_URL,
    },
    // IPA's past-exam usage terms (許諾不要・使用料不要・出典明記) live on the FAQ
    // page; the old mondai-kaiotu .html page was decommissioned (404). faq.html
    // is verified 200. See nonblog-external-ipa-link-health.test.ts.
    license: "https://www.ipa.go.jp/shiken/faq.html",
    creator: {
      "@type": "Organization",
      name: "情報処理推進機構 (IPA)",
      url: "https://www.ipa.go.jp/",
    },
    // Self-resolving @id reference: like the QAPage's `isPartOf` WebSite (and
    // unlike a bare stub), the publisher carries name/url inline so Google
    // resolves it within this page. The /q surface does not embed the full
    // `buildOrgNode()` Organization node, so the @id alone would dangle — the
    // same defect class fixed for the exam-hub `Course.provider` (S115).
    publisher: {
      "@type": "Organization",
      "@id": ORG_ID,
      name: SITE_NAME,
      url: SITE_BASE_URL,
    },
  };

  return {
    "@context": "https://schema.org",
    "@graph": [
      learningResource,
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "ホーム", item: SITE_BASE_URL },
          {
            "@type": "ListItem",
            position: 2,
            name: questionSourceExam(q),
            item: `${SITE_BASE_URL}${examPath}`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: questionSourceEdition(q),
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
