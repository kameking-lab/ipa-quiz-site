import "server-only";
import { ALL_QUIZ_EXAM_CODES } from "@/lib/exam-config";
import { EXAM_CATALOG } from "@/lib/exam-library-catalog";
import { QUALIFICATION_HUBS } from "@/lib/exam-qualification-hubs";

/** Plan creation offers only formats that the automatic daily session can open. */
export function planCatalogKeys(): string[] {
  return [...new Set<string>([...ALL_QUIZ_EXAM_CODES, ...QUALIFICATION_HUBS.map(hub => hub.slug),
    ...EXAM_CATALOG.map(entry => `${entry.group}-${entry.subject}`)])];
}
