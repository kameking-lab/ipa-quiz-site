import { SITE_BASE_URL, SITE_NAME } from "./config";

/** Canonical @id for site-wide singletons. Use SITE_BASE_URL + "/" + fragment so
 *  the path segment is explicit and consistent across all pages. */
export const SITE_ID = `${SITE_BASE_URL}/#website`;
export const ORG_ID = `${SITE_BASE_URL}/#organization`;

export const SITE_LOGO_IMAGE = {
  "@type": "ImageObject",
  url: `${SITE_BASE_URL}/icon-512.svg`,
  width: 512,
  height: 512,
} as const;

/** Shared Organization node referenced by publisher / creator fields. */
export function buildOrgNode() {
  return {
    "@type": "EducationalOrganization",
    "@id": ORG_ID,
    name: SITE_NAME,
    url: SITE_BASE_URL,
    logo: SITE_LOGO_IMAGE,
    sameAs: ["https://x.com/kakomon_ai_jp", "https://note.com/kakomon_ai"],
    description:
      "IPA 情報処理技術者試験 13 区分の過去問を AI コパイロット付きで無料提供する教育プラットフォーム。",
  };
}

/**
 * Shared WebSite node (home @graph singleton).
 *
 * The SearchAction must describe the site's *keyword search* with a free-text
 * query slot. It previously targeted `/quiz?mode=random&exam={exam_code}` —
 * "start a random quiz for an exam", which is not a search at all. The real
 * search endpoint is `/search?q=` (SearchClient seeds its active query from the
 * `q` param), so point the action there with the standard `search_term_string`.
 */
export function buildWebsiteNode(description: string) {
  return {
    "@type": "WebSite",
    "@id": SITE_ID,
    url: SITE_BASE_URL,
    name: SITE_NAME,
    inLanguage: "ja-JP",
    description,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_BASE_URL}/search?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

/** Minimal WebPage node for pages that don't warrant a richer type. */
export function buildWebPageNode(url: string, name: string, description: string) {
  return {
    "@type": "WebPage",
    "@id": `${url}#webpage`,
    url,
    name,
    inLanguage: "ja",
    description,
    isPartOf: { "@type": "WebSite", "@id": SITE_ID },
    publisher: { "@id": ORG_ID },
  };
}

/** Shared EducationalAudience block for LearningResource. */
export const STUDENT_AUDIENCE = {
  "@type": "EducationalAudience",
  educationalRole: "student",
} as const;
