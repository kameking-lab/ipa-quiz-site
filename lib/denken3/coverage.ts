import { DENKEN3_QUESTIONS } from "@/data/questions/denken3";
import { DENKEN3_NATIVE_QUESTIONS } from "@/lib/denken3/native";

const subjects = [
  { subject: "theory", session: "riron", originals: 18 },
  { subject: "power", session: "denryoku", originals: 17 },
  { subject: "machine", session: "kikai", originals: 18 },
  { subject: "law", session: "houki", originals: 13 },
] as const;

/** 同じ原問の旧演習と原本ページ、枝問(a)/(b)を重複して数えない。 */
export const DENKEN3_LATEST_TWO_COVERAGE = ([
  { sitting: "2026-upper", year: 2026, season: "first", examDate: "2026-08-30", label: "2026年度上期" },
  { sitting: "2025-lower", year: 2025, season: "second", examDate: "2026-03-22", label: "2025年度下期" },
] as const).map(edition => {
  const originals = subjects.flatMap(({ subject, session, originals }) =>
    Array.from({ length: originals }, (_, index) => {
      const number = index + 1;
      const fields = number >= (subject === "law" ? 11 : 15) ? 2 : 1;
      const native = DENKEN3_NATIVE_QUESTIONS.find(q => q.sitting === edition.sitting
        && q.subject === subject && q.number === number && q.examDate === edition.examDate);
      const legacy = DENKEN3_QUESTIONS.filter(q => q.year === edition.year
        && q.season === edition.season && q.session === session
        && q.qNumber === number && q.examDate === edition.examDate);
      const legacyFull = legacy.length === fields && legacy.every(q => q.explanationCoverage === "full"
        && q.choiceExplanations && Object.keys(q.choiceExplanations).length === 5);
      return {
        id: `denken3-${edition.sitting}-${subject}-q${String(number).padStart(2, "0")}`,
        subject, number, fields,
        published: Boolean(native) || legacy.length === fields,
        full: Boolean(native && native.slots.length === fields) || legacyFull,
      };
    }));
  return {
    ...edition, originals,
    requiredOriginals: originals.length,
    publishedOriginals: originals.filter(q => q.published).length,
    fullOriginals: originals.filter(q => q.full).length,
    requiredFields: originals.reduce((sum, q) => sum + q.fields, 0),
    publishedFields: originals.filter(q => q.published).reduce((sum, q) => sum + q.fields, 0),
    fullFields: originals.filter(q => q.full).reduce((sum, q) => sum + q.fields, 0),
    missingOriginalIds: originals.filter(q => !q.published).map(q => q.id),
    incompleteOriginalIds: originals.filter(q => !q.full).map(q => q.id),
  };
});
