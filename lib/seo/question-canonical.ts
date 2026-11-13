import { isPracticeReadyQuestion } from "@/lib/questions/filter";
import type { Question } from "@/lib/questions/types";

const CHOICE_KEYS = ["ア", "イ", "ウ", "エ", "オ", "カ", "キ", "ク", "ケ", "コ", "サ", "シ", "ス", "セ", "ソ"] as const;

/**
 * The advanced exams reuse one common morning-I paper across several exam
 * contexts. Only equivalent source questions are consolidated (an absent
 * image list and an empty one both mean no image URLs):
 * editorial fields such as the category and explanation deliberately do not
 * participate, so each requested exam page can keep its own learning context.
 */
function sourceQuestionFingerprint(q: Question): string {
  return JSON.stringify({
    type: q.type,
    question: q.question,
    choices: [...CHOICE_KEYS.map((key) => q.choices?.[key] ?? null), ...(q.choices?.タ !== undefined ? [q.choices.タ] : [])],
    answer: q.answer,
    hasImage: q.hasImage,
    imageUrls: q.imageUrls ?? [],
  });
}

function duplicateGroupKey(q: Question): string {
  return [q.year, q.season, q.session, q.qNumber, sourceQuestionFingerprint(q)].join("|");
}

function compareRepresentativeCandidates(a: Question, b: Question): number {
  // A canonical URL advertised in the sitemap must resolve to a playable page.
  const readiness = Number(isPracticeReadyQuestion(b)) - Number(isPracticeReadyQuestion(a));
  if (readiness !== 0) return readiness;

  // SC contains morning-I data for both spring and autumn throughout the
  // corpus, making it the most stable shared home when it belongs to a group.
  const scPreference = Number(b.exam === "sc") - Number(a.exam === "sc");
  if (scPreference !== 0) return scPreference;

  // The welfare common subjects are the 社会福祉士 morning paper; the
  // 精神保健福祉士 exam page links to the same PDFs.
  const shakaiPreference = Number(b.exam === "shakai") - Number(a.exam === "shakai");
  if (shakaiPreference !== 0) return shakaiPreference;

  // Do not let import/module order decide the representative.
  return a.id.localeCompare(b.id, "en");
}

const canonicalByPool = new WeakMap<readonly Question[], Map<string, Question>>();
const directByPool = new WeakMap<readonly Question[], Map<string, Question | null>>();

function buildCanonicalIndex(pool: readonly Question[]): Map<string, Question> {
  const canonicalById = new Map<string, Question>();
  const groups = new Map<string, Question[]>();

  for (const q of pool) {
    // 午前I（IPA高度試験）と、社会福祉士・精神保健福祉士の共通科目は同一問題冊子。
    if (q.session !== "am1" && q.session !== "kyotsu") {
      canonicalById.set(q.id, q);
      continue;
    }
    const key = duplicateGroupKey(q);
    const group = groups.get(key);
    if (group) group.push(q);
    else groups.set(key, [q]);
  }

  for (const group of groups.values()) {
    const representative = [...group].sort(compareRepresentativeCandidates)[0];
    if (!representative) continue;
    for (const q of group) canonicalById.set(q.id, representative);
  }

  return canonicalById;
}

function getCanonicalIndex(pool: readonly Question[]): Map<string, Question> {
  let index = canonicalByPool.get(pool);
  if (!index) {
    index = buildCanonicalIndex(pool);
    canonicalByPool.set(pool, index);
  }
  return index;
}

/** Resolve the canonical representative without replacing the requested page's content. */
export function getQuestionCanonicalRepresentative(
  pool: readonly Question[],
  question: Question,
): Question {
  const cached = canonicalByPool.get(pool);
  if (cached) return cached.get(question.id) ?? question;
  // Only shared papers need source fingerprinting. Ordinary question pages
  // can resolve their own ID without initializing every shared-paper group.
  if (question.session !== "am1" && question.session !== "kyotsu") {
    let direct = directByPool.get(pool);
    if (!direct) {
      direct = new Map();
      for (const candidate of pool) {
        direct.set(candidate.id, direct.has(candidate.id) ? null : candidate);
      }
      directByPool.set(pool, direct);
    }
    const match = direct.get(question.id);
    if (match === undefined) return question;
    if (match && match.session !== "am1" && match.session !== "kyotsu") return match;
    // Duplicate IDs and a shared-paper match keep the original resolution.
  }
  return getCanonicalIndex(pool).get(question.id) ?? question;
}

export function isQuestionCanonicalRepresentative(
  pool: readonly Question[],
  question: Question,
): boolean {
  return getQuestionCanonicalRepresentative(pool, question).id === question.id;
}
