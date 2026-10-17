import { tsuginoLearningUrl } from "@/lib/tsugino-qualification";
import type { ExamCode } from "@/lib/questions/types";
import entryQualifications from "@/data/note-catalog-entry-qualifications.json";

export const NOTE_CATALOG_URL = "https://tsugino-shikaku.jp/articles";
export function noteCatalogUrl(exam?: ExamCode): string {
  const learning = tsuginoLearningUrl(exam);
  const qualification = learning ? new URL(learning).pathname.split("/").at(-1) : undefined;
  const url = new URL(NOTE_CATALOG_URL);
  if (qualification) url.searchParams.set("qualification", qualification);
  return url.href;
}
export function noteCatalogDestination(href: string, source: string, exam?: ExamCode): string {
  try {
    const original = new URL(href);
    if (original.origin !== "https://note.com" || !/^\/(ipa_quiz_ai|sikaku_rakutoru|anzen_ai_jp)(?:\/?$|\/n\/n[a-f0-9]{12}$|\/m\/m[a-f0-9]{12}$)/u.test(original.pathname)) return href;
    const sourceExam = source.match(/^exam_(?!library)([a-z0-9]+)(?:_|$)/u)?.[1] as ExamCode | undefined;
    const destination = new URL(noteCatalogUrl(exam ?? sourceExam));
    const key = original.pathname.match(/\/n\/(n[a-f0-9]{12})$/u)?.[1];
    const mapped = key ? (entryQualifications as Record<string, string>)[key] : undefined;
    if (!destination.searchParams.has("qualification") && mapped) destination.searchParams.set("qualification", mapped);
    if (original.searchParams.has("utm_source")) destination.searchParams.set("utm_source", "kakomon_ai");
    return destination.href;
  } catch { return href; }
}
