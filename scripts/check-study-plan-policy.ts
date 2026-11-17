/** Advisory only: missing metadata must never block question publication. */
import { getHomeDirectory } from "@/lib/home/home-directory";
import fallback from "@/lib/home/featured-official.json";
import { planPolicyWarnings } from "@/lib/study-plan/policy";
import { japanDate } from "@/lib/study-plan/activity";
import mapping from "@/lib/study-plan/qualification-map.json";

try {
  const directory = getHomeDirectory();
  const items = directory.flatMap(domain => [...domain.featured, ...domain.compact]);
  const checked = new Map(fallback.exams.map(exam => [exam.key, exam.checkedAt]));
  const verified: Record<string, string | null> = mapping.scheduleVerifiedOn;
  const warnings = planPolicyWarnings(items.map(item => ({ exam: item.key, scheduleVerifiedOn: verified[item.key] ?? checked.get(item.key) ?? null })), japanDate(Date.now()));
  for (const warning of warnings) console.warn(`::warning title=Study plan metadata::${warning.exam}: ${warning.code}`);
  console.log(`Study plan metadata: ${items.length} qualifications, ${warnings.length} advisory warnings.`);
} catch (error) {
  console.warn(`::warning title=Study plan metadata::Check unavailable: ${error instanceof Error ? error.message : "unknown error"}`);
}
