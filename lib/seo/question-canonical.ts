import { isPracticeReadyQuestion } from "@/lib/questions/filter";
import type { Question } from "@/lib/questions/types";

const CHOICE_KEYS = ["ア", "イ", "ウ", "エ", "オ", "カ", "キ", "ク", "ケ", "コ"] as const;

/**
 * The advanced exams reuse one common morning-I paper across several exam
 * contexts.  Only byte-for-byte equivalent source questions are consolidated:
 * editorial fields such as the category and explanation deliberately do not
 * participate, so each requested exam page can keep its own learning context.
 */
function sourceQuestionFingerprint(q: Question): string {
  return JSON.stringify({
    type: q.type,
    question: q.question,
    choices: CHOICE_KEYS.map((key) => q.choices?.[key] ?? null),
    answer: q.answer,
    hasImage: q.hasImage,
    imageUrls: q.imageUrls ?? null,
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

  // Do not let import/module order decide the representative.
  return a.id.localeCompare(b.id, "en");
}

const canonicalByPool = new WeakMap<readonly Question[], Map<string, Question>>();

function buildCanonicalIndex(pool: readonly Question[]): Map<string, Question> {
  const canonicalById = new Map<string, Question>();
  const groups = new Map<string, Question[]>();

  for (const q of pool) {
    if (q.session !== "am1") {
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
  return getCanonicalIndex(pool).get(question.id) ?? question;
}

export function isQuestionCanonicalRepresentative(
  pool: readonly Question[],
  question: Question,
): boolean {
  return getQuestionCanonicalRepresentative(pool, question).id === question.id;
}
