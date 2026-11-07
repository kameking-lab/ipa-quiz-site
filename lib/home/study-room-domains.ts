import { QUALIFICATION_HUBS } from "@/lib/exam-qualification-hubs";
import { QUALIFICATION_CATALOG } from "@/lib/qualifications/catalog";
import { canonicalPresenceExam } from "@/lib/study-presence";

/** Build-time only: cover both the qualification catalog and public paper hubs. */
export function mascotExamDomains() {
  const result: Record<string, string> = {};
  for (const entry of QUALIFICATION_CATALOG) {
    if (entry.status === "live") result[entry.examCode ?? entry.slug] = entry.domain;
  }
  for (const code of ["ip", "sg", "fe", "ap", "sc", "nw", "db", "es", "st", "sa", "pm", "sm", "au"]) result[code] = "information-technology";
  for (const hub of QUALIFICATION_HUBS) {
    const code = canonicalPresenceExam(hub.slug);
    if (code) result[code] = hub.group === "survey-assistant" ? "construction" : "safety";
  }
  return result;
}
