import { EXAM_LIBRARY_PATH, type ExamGroupId } from "@/lib/exam-library-model";

/** 科目の年度一覧へ戻る導線を、一覧側の絞り込み契約と同じ形式で作る。 */
export function examLibraryHref(group?: ExamGroupId, subject?: string): string {
  if (!group) return EXAM_LIBRARY_PATH;
  const query = new URLSearchParams({ group, ...(subject ? { subject } : {}) });
  return `${EXAM_LIBRARY_PATH}?${query.toString()}`;
}
