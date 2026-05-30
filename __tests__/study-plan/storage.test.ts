import { describe, it, expect, beforeEach } from "vitest";
import {
  listPlans,
  getPlan,
  savePlan,
  deletePlan,
  getProgress,
  setTaskDone,
  getPlanSyncEntries,
  mergeServerPlans,
  computeCompletionStats,
} from "@/lib/study-plan/storage";
import type { StudyPlan, ProgressMap } from "@/lib/study-plan/types";

function makePlan(
  id: string,
  createdAt: string,
  overrides: Partial<StudyPlan> = {},
): StudyPlan {
  return {
    id,
    createdAt,
    input: {
      exam: "ap",
      examDate: "2026-04-19",
      level: "learner",
      weekdayMinutes: 30,
      weekendMinutes: 60,
      weakCategories: [],
    },
    summary: {
      totalHoursRequired: 100,
      totalHoursAvailable: 80,
      daysRemaining: 90,
      coveragePercent: 80,
      focusedCategories: [],
    },
    daily: [],
    ...overrides,
  };
}

function planWithTasks(id: string, taskKeys: string[]): StudyPlan {
  return makePlan(id, "2026-01-01T00:00:00.000Z", {
    daily: [
      {
        date: "2026-01-01",
        phase: "early",
        isWeekend: false,
        budgetMinutes: 30,
        tasks: taskKeys.map((key, i) => ({
          key,
          kind: "questions" as const,
          title: `task ${i}`,
          estimatedMinutes: 10,
        })),
      },
    ],
  });
}

beforeEach(() => {
  localStorage.clear();
});

describe("listPlans / getPlan", () => {
  it("returns empty array when nothing is stored", () => {
    expect(listPlans()).toEqual([]);
  });

  it("returns empty array when stored JSON is corrupt (safeParse fallback)", () => {
    localStorage.setItem("ipa-quiz:study-plans:v1", "{not json");
    expect(listPlans()).toEqual([]);
  });

  it("sorts plans by createdAt descending", () => {
    savePlan(makePlan("a", "2026-01-01T00:00:00.000Z"));
    savePlan(makePlan("b", "2026-03-01T00:00:00.000Z"));
    savePlan(makePlan("c", "2026-02-01T00:00:00.000Z"));
    expect(listPlans().map((p) => p.id)).toEqual(["b", "c", "a"]);
  });

  it("getPlan finds by id and returns null when absent", () => {
    savePlan(makePlan("a", "2026-01-01T00:00:00.000Z"));
    expect(getPlan("a")?.id).toBe("a");
    expect(getPlan("missing")).toBeNull();
  });
});

describe("savePlan", () => {
  it("replaces an existing plan with the same id rather than duplicating", () => {
    savePlan(makePlan("a", "2026-01-01T00:00:00.000Z"));
    savePlan(
      makePlan("a", "2026-01-01T00:00:00.000Z", {
        summary: {
          totalHoursRequired: 999,
          totalHoursAvailable: 1,
          daysRemaining: 1,
          coveragePercent: 1,
          focusedCategories: [],
        },
      }),
    );
    const plans = listPlans();
    expect(plans).toHaveLength(1);
    expect(plans[0].summary.totalHoursRequired).toBe(999);
  });

  it("evicts the oldest plan (by createdAt) once MAX_PLANS (20) is exceeded", () => {
    for (let i = 1; i <= 21; i++) {
      const day = String(i).padStart(2, "0");
      savePlan(makePlan(`p${i}`, `2026-01-${day}T00:00:00.000Z`));
    }
    const plans = listPlans();
    expect(plans).toHaveLength(20);
    // p1 has the earliest createdAt -> dropped; p21 (newest) retained.
    const ids = plans.map((p) => p.id);
    expect(ids).not.toContain("p1");
    expect(ids).toContain("p21");
  });
});

describe("deletePlan", () => {
  it("removes the plan and its progress entry", () => {
    savePlan(makePlan("a", "2026-01-01T00:00:00.000Z"));
    setTaskDone("a", "t1", true);
    expect(getProgress("a")).toHaveProperty("t1");

    deletePlan("a");
    expect(getPlan("a")).toBeNull();
    expect(getProgress("a")).toEqual({});
  });
});

describe("getProgress / setTaskDone", () => {
  it("returns empty object when no progress is stored", () => {
    expect(getProgress("nope")).toEqual({});
  });

  it("marks a task done with a doneAt timestamp and returns the map", () => {
    const result = setTaskDone("a", "t1", true);
    expect(result.t1?.done).toBe(true);
    expect(typeof result.t1?.doneAt).toBe("string");
    expect(getProgress("a").t1?.done).toBe(true);
  });

  it("removes the task key when marked undone", () => {
    setTaskDone("a", "t1", true);
    const result = setTaskDone("a", "t1", false);
    expect(result).not.toHaveProperty("t1");
    expect(getProgress("a")).not.toHaveProperty("t1");
  });
});

describe("getPlanSyncEntries", () => {
  it("packages each plan with createdAt epoch and updatedAt = max(created, progress)", () => {
    savePlan(makePlan("a", "2026-01-10T00:00:00.000Z"));
    setTaskDone("a", "t1", true); // sets progress.updatedAt to now (> createdAt)

    const entries = getPlanSyncEntries();
    expect(entries).toHaveLength(1);
    const e = entries[0];
    expect(e.id).toBe("a");
    expect(e.createdAt).toBe(Date.parse("2026-01-10T00:00:00.000Z"));
    // progress was just updated -> updatedAt must be >= createdAt.
    expect(e.updatedAt).toBeGreaterThanOrEqual(e.createdAt);
    expect(e.progress).toHaveProperty("t1");
  });

  it("uses createdAt as updatedAt when there is no progress", () => {
    savePlan(makePlan("a", "2026-01-10T00:00:00.000Z"));
    const e = getPlanSyncEntries()[0];
    expect(e.updatedAt).toBe(Date.parse("2026-01-10T00:00:00.000Z"));
  });
});

describe("mergeServerPlans (last-write-wins)", () => {
  it("keeps the local plan when local is newer or equal", () => {
    savePlan(makePlan("a", "2026-01-10T00:00:00.000Z"));
    mergeServerPlans([
      {
        id: "a",
        payload: makePlan("a", "2099-01-01T00:00:00.000Z"),
        updatedAt: Date.parse("2026-01-05T00:00:00.000Z"), // older than local
      },
    ]);
    // Local (createdAt 2026-01-10) wins -> server payload ignored.
    expect(getPlan("a")?.createdAt).toBe("2026-01-10T00:00:00.000Z");
  });

  it("overwrites the local plan when the server entry is newer", () => {
    savePlan(makePlan("a", "2026-01-10T00:00:00.000Z"));
    const serverPlan = makePlan("a", "2026-02-20T00:00:00.000Z");
    mergeServerPlans([
      {
        id: "a",
        payload: serverPlan,
        updatedAt: Date.parse("2026-03-01T00:00:00.000Z"), // newer than local
      },
    ]);
    expect(getPlan("a")?.createdAt).toBe("2026-02-20T00:00:00.000Z");
  });

  it("adds a server plan that does not exist locally, including its progress", () => {
    const progress: ProgressMap = { t1: { done: true, doneAt: "2026-01-01" } };
    mergeServerPlans([
      {
        id: "new",
        payload: makePlan("new", "2026-01-01T00:00:00.000Z"),
        progress,
        updatedAt: Date.parse("2026-01-01T00:00:00.000Z"),
      },
    ]);
    expect(getPlan("new")?.id).toBe("new");
    expect(getProgress("new")).toHaveProperty("t1");
  });

  it("skips server entries whose payload is not an object", () => {
    mergeServerPlans([
      {
        id: "bad",
        // @ts-expect-error intentionally invalid payload for the guard
        payload: null,
        updatedAt: Date.now(),
      },
    ]);
    expect(getPlan("bad")).toBeNull();
  });
});

describe("computeCompletionStats", () => {
  it("counts every task across all days and rounds the percent", () => {
    const plan = planWithTasks("a", ["t1", "t2", "t3"]);
    const progress: ProgressMap = { t1: { done: true } };
    const stats = computeCompletionStats(plan, progress);
    expect(stats).toEqual({ total: 3, done: 1, percent: 33 });
  });

  it("returns percent 0 (not NaN) when the plan has no tasks", () => {
    const plan = makePlan("a", "2026-01-01T00:00:00.000Z");
    expect(computeCompletionStats(plan, {})).toEqual({
      total: 0,
      done: 0,
      percent: 0,
    });
  });

  it("reports 100 percent when all tasks are done", () => {
    const plan = planWithTasks("a", ["t1", "t2"]);
    const progress: ProgressMap = {
      t1: { done: true },
      t2: { done: true },
    };
    expect(computeCompletionStats(plan, progress).percent).toBe(100);
  });
});
