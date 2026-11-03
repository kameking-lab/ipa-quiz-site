import "server-only";

import {
  EXAM_CATALOG,
  sortExamEntries,
} from "@/lib/exam-library-catalog";
import {
  qualificationHubMatchesEntry,
  type QualificationHub,
} from "@/lib/exam-qualification-hubs";
import type { ExamCatalogEntry } from "@/lib/exam-library-model";

export function getQualificationHubEntries(
  hub: QualificationHub,
  entries: readonly ExamCatalogEntry[] = EXAM_CATALOG,
): ExamCatalogEntry[] {
  return sortExamEntries(entries.filter((entry) => qualificationHubMatchesEntry(hub, entry)));
}
