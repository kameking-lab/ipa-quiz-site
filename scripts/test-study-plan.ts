/**
 * Smoke test for lib/study-plan/generator.
 * Runs five representative input patterns and asserts invariants without
 * needing the full Next.js build. Invoke with:
 *   pnpm exec tsx scripts/test-study-plan.ts
 */
import { generateStudyPlan, listDates, todayLocalDate } from "@/lib/study-plan/generator";
import type { StudyPlanInput, KnowledgeLevel } from "@/lib/study-plan/types";
import { LEVEL_MULTIPLIERS, REQUIRED_HOURS } from "@/lib/study-plan/constants";

type Case = { name: string; input: StudyPlanInput };

function addDays(iso: string, days: number): string {
  const d = new Date(`${iso}T00:00:00`);
  d.setDate(d.getDate() + days);
  return d.toISOString().slice(0, 10);
}

const today = todayLocalDate();

const cases: Case[] = [
  {
    name: "AP / beginner / 3 months",
    input: {
      exam: "ap",
      examDate: addDays(today, 90),
      level: "beginner",
      weekdayMinutes: 60,
      weekendMinutes: 180,
      weakCategories: [],
    },
  },
  {
    name: "IP / final-review / 14 days",
    input: {
      exam: "ip",
      examDate: addDays(today, 14),
      level: "final-review",
      weekdayMinutes: 30,
      weekendMinutes: 60,
      weakCategories: [],
    },
  },
  {
    name: "NW / learner / 6 months / weak categories",
    input: {
      exam: "nw",
      examDate: addDays(today, 180),
      level: "learner",
      weekdayMinutes: 45,
      weekendMinutes: 120,
      weakCategories: ["ネットワーク設計", "TCP/IP"],
    },
  },
  {
    name: "FE / foundation / 60 days / tight budget",
    input: {
      exam: "fe",
      examDate: addDays(today, 60),
      level: "foundation",
      weekdayMinutes: 15,
      weekendMinutes: 30,
      weakCategories: [],
    },
  },
  {
    name: "PM / beginner / 4 months / many weak",
    input: {
      exam: "pm",
      examDate: addDays(today, 120),
      level: "beginner" as KnowledgeLevel,
      weekdayMinutes: 90,
      weekendMinutes: 240,
      weakCategories: ["プロジェクトマネジメント", "リスク管理", "コスト管理"],
    },
  },
];

let failures = 0;

function assert(cond: boolean, msg: string): void {
  if (!cond) {
    failures += 1;
    console.error(`  ✗ ${msg}`);
  } else {
    console.log(`  ✓ ${msg}`);
  }
}

for (const c of cases) {
  console.log(`\n[${c.name}]`);
  const plan = generateStudyPlan(c.input);
  const dates = listDates(today, c.input.examDate);
  const expectedDays = Math.max(0, dates.length - 1);

  assert(plan.id.length > 0, "plan has id");
  assert(plan.daily.length === expectedDays, `daily length = ${expectedDays} (got ${plan.daily.length})`);
  assert(plan.summary.daysRemaining === expectedDays, "summary.daysRemaining matches");

  const expectedRequired = Math.round(
    REQUIRED_HOURS[c.input.exam] * LEVEL_MULTIPLIERS[c.input.level],
  );
  assert(plan.summary.totalHoursRequired === expectedRequired, `required hours = ${expectedRequired}`);

  const phases = new Set(plan.daily.map((d) => d.phase));
  if (expectedDays >= 10) {
    assert(phases.has("early"), "has early phase");
    assert(phases.has("middle"), "has middle phase");
    assert(phases.has("late"), "has late phase");
  }

  for (const d of plan.daily) {
    const totalEst = d.tasks.reduce((s, t) => s + t.estimatedMinutes, 0);
    assert(totalEst <= d.budgetMinutes + 1, `${d.date}: tasks within budget (${totalEst}/${d.budgetMinutes})`);
  }

  const keys = new Set<string>();
  let dup = false;
  for (const d of plan.daily) for (const t of d.tasks) {
    if (keys.has(t.key)) { dup = true; break; }
    keys.add(t.key);
  }
  assert(!dup, "task keys are unique");

  // At least one questions task overall
  const hasQuestion = plan.daily.some((d) => d.tasks.some((t) => t.kind === "questions"));
  if (expectedDays >= 3) {
    assert(hasQuestion, "has at least one 'questions' task");
  }

  // Late phase should include mock or review when budget allows
  if (expectedDays >= 30) {
    const lateHasMockOrReview = plan.daily
      .filter((d) => d.phase === "late")
      .some((d) => d.tasks.some((t) => t.kind === "mock" || t.kind === "review"));
    assert(lateHasMockOrReview, "late phase has mock or review");
  }
}

console.log("");
if (failures > 0) {
  console.error(`FAILED: ${failures} assertion(s)`);
  process.exit(1);
}
console.log("All study-plan generator scenarios passed.");
