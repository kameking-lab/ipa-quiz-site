/**
 * Success Stories 品質監査スクリプト。
 *
 * data/success-stories/personas.ts で定義された全合格体験記を機械的に検査する。
 *
 * 品質基準:
 *   (a) 件数        : 全体で ≥ 40 件
 *   (b) カテゴリ網羅: 13 区分のうち ≥ 8 区分にカバレッジ、各 ≥ 3 件推奨
 *   (c) 本文文字数  : 各記事の body が 1,200 字以上
 *   (d) 必須フィールド: title / description / persona / keyTakeaways すべて存在
 *   (e) keyTakeaways: 各記事 ≥ 3 件
 *   (f) slug一意性  : 全 slug が一意
 *   (g) 内部リンク  : body に少なくとも 1 つの内部リンク（/exam-code）
 *
 * 致命傷 (exit 1): (a)(c)(d)(f)(g) のいずれか違反
 * 軽微違反 (exit 0 + warning): (b)(e) のみの違反
 *
 * 使い方:
 *   pnpm tsx scripts/audit-success-stories.ts
 *   pnpm tsx scripts/audit-success-stories.ts --ci   # CI モード
 */

import {
  getAllSuccessStories,
  getAllSuccessStorySlugs,
  getSuccessStoryCountByExam,
} from "../data/success-stories";
import type { ExamCode } from "../lib/questions/types";

const CI_MODE = process.argv.includes("--ci");

const MIN_TOTAL = 40;
const MIN_PER_EXAM = 3;
const MIN_BODY_CHARS = 1200;
const MIN_TAKEAWAYS = 3;
const ALL_EXAMS: ExamCode[] = [
  "ip",
  "sg",
  "fe",
  "ap",
  "st",
  "sa",
  "pm",
  "nw",
  "db",
  "es",
  "sc",
  "sm",
  "au",
];

interface AuditIssue {
  slug: string;
  severity: "fatal" | "warn";
  message: string;
}

function main(): number {
  const stories = getAllSuccessStories();
  const issues: AuditIssue[] = [];

  // (a) Total count
  if (stories.length < MIN_TOTAL) {
    issues.push({
      slug: "[global]",
      severity: "fatal",
      message: `total count ${stories.length} < required ${MIN_TOTAL}`,
    });
  }

  // (b) Per-exam coverage
  const countsByExam = getSuccessStoryCountByExam();
  const missingExams: ExamCode[] = [];
  const underQuotaExams: { exam: ExamCode; count: number }[] = [];
  for (const exam of ALL_EXAMS) {
    const c = countsByExam.get(exam) ?? 0;
    if (c === 0) missingExams.push(exam);
    else if (c < MIN_PER_EXAM) underQuotaExams.push({ exam, count: c });
  }
  if (missingExams.length > 0) {
    issues.push({
      slug: "[global]",
      severity: "warn",
      message: `missing exam coverage: ${missingExams.join(", ")}`,
    });
  }
  for (const u of underQuotaExams) {
    issues.push({
      slug: "[global]",
      severity: "warn",
      message: `exam ${u.exam} has only ${u.count} stories (recommended ≥ ${MIN_PER_EXAM})`,
    });
  }

  // (f) slug uniqueness
  const slugs = getAllSuccessStorySlugs();
  const slugSet = new Set<string>();
  for (const { slug } of slugs) {
    if (slugSet.has(slug)) {
      issues.push({
        slug,
        severity: "fatal",
        message: `duplicate slug`,
      });
    }
    slugSet.add(slug);
  }

  // Per-story checks
  for (const story of stories) {
    // (c) body length
    if (story.body.length < MIN_BODY_CHARS) {
      issues.push({
        slug: story.slug,
        severity: "fatal",
        message: `body length ${story.body.length} < required ${MIN_BODY_CHARS}`,
      });
    }
    // (d) required fields
    if (!story.title || !story.description) {
      issues.push({
        slug: story.slug,
        severity: "fatal",
        message: `missing title or description`,
      });
    }
    if (!story.persona || !story.persona.occupation || !story.persona.background) {
      issues.push({
        slug: story.slug,
        severity: "fatal",
        message: `incomplete persona`,
      });
    }
    // (e) takeaways
    if (!story.keyTakeaways || story.keyTakeaways.length < MIN_TAKEAWAYS) {
      issues.push({
        slug: story.slug,
        severity: "warn",
        message: `keyTakeaways count ${story.keyTakeaways?.length ?? 0} < ${MIN_TAKEAWAYS}`,
      });
    }
    // (g) internal link
    if (!/\(\/[a-z-]+/.test(story.body)) {
      issues.push({
        slug: story.slug,
        severity: "fatal",
        message: `body has no internal link (markdown link starting with "/...")`,
      });
    }
  }

  // Reporting
  const fatal = issues.filter((i) => i.severity === "fatal");
  const warn = issues.filter((i) => i.severity === "warn");

  console.log("=== Success Stories Audit ===");
  console.log(`Total stories: ${stories.length}`);
  console.log(`Exams covered: ${countsByExam.size} / ${ALL_EXAMS.length}`);
  console.log(`Per-exam breakdown:`);
  for (const exam of ALL_EXAMS) {
    const c = countsByExam.get(exam) ?? 0;
    console.log(`  ${exam}: ${c}`);
  }
  console.log(`Total body chars (avg): ${Math.round(stories.reduce((a, s) => a + s.body.length, 0) / Math.max(stories.length, 1))}`);
  console.log("");
  console.log(`Issues: ${fatal.length} fatal, ${warn.length} warnings`);
  for (const i of fatal) {
    console.log(`  [FATAL] ${i.slug}: ${i.message}`);
  }
  for (const i of warn) {
    console.log(`  [WARN ] ${i.slug}: ${i.message}`);
  }

  if (fatal.length > 0) {
    return CI_MODE ? 1 : 1;
  }
  return 0;
}

process.exit(main());
