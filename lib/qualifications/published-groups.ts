import "server-only";
import { getExamQuestionCount } from "@/lib/constants/exam-question-counts";
import { EXAM_CATALOG } from "@/lib/exam-library-catalog";
import { examLibraryHref } from "@/lib/exam-library-navigation";
import { getExamPaperStats } from "@/lib/exam-library-papers";
import { QUALIFICATION_CATALOG } from "./catalog";
import { groupQualifications, qualificationGroupMember } from "./groups";

export function getPublishedQualificationGroups() {
  const members = new Map<string, { key: string; href: string }>();
  for (const { examCode, status } of QUALIFICATION_CATALOG) {
    if (examCode && status === "live" && qualificationGroupMember(examCode) && getExamQuestionCount(examCode) > 0) {
      members.set(examCode, { key: examCode, href: `/${examCode}` });
    }
  }
  for (const { id, group, subject } of EXAM_CATALOG) {
    const key = `${group}-${subject}`;
    if (!members.has(key) && qualificationGroupMember(key) && getExamPaperStats(id)) {
      members.set(key, { key, href: examLibraryHref(group, subject) });
    }
  }
  return groupQualifications([...members.values()], member => member.key).flatMap(row => "group" in row ? [row] : []);
}
