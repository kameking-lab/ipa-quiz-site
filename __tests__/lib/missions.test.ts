import { describe, it, expect, beforeEach } from "vitest";
import { LS_KEYS } from "@/lib/storage/keys";
import {
  MISSIONS,
  readMissions,
  setMissionProgress,
  incrementMission,
  claimMission,
  type MissionId,
} from "@/lib/gamification/missions";

const ALL_IDS = Object.keys(MISSIONS) as MissionId[];

// localStorage holds arbitrary serialized JSON, so seed with the raw shape.
function seed(rec: Record<string, unknown>): void {
  window.localStorage.setItem(LS_KEYS.dailyMissions, JSON.stringify(rec));
}

beforeEach(() => {
  window.localStorage.clear();
});

// MISSIONS は Record<MissionId,MissionDef> 型でキー網羅とフィールド型は守られるが、
// 型で表現できない以下の不変条件は手書き編集で静かに壊れうる。ミッションカードは
// title/description/icon を直接描画し、target は進捗バー/受取ゲート、xpReward は
// 付与XP を駆動する。冗長な id フィールドとキーの一致（コピペ drift）・文字列非空・
// target 正値（0 だと即達成/ゼロ除算的挙動）・xpReward 非負を回帰固定する。
describe("MISSIONS のデータ整合性", () => {
  it("各エントリの id フィールドはキーと一致する（コピペ drift 防止）", () => {
    for (const [key, def] of Object.entries(MISSIONS)) {
      expect(def.id, `key=${key} の id`).toBe(key);
    }
  });

  it("title / description / icon は非空", () => {
    for (const id of ALL_IDS) {
      const m = MISSIONS[id];
      expect(m.title.trim().length, `${id} title`).toBeGreaterThan(0);
      expect(m.description.trim().length, `${id} description`).toBeGreaterThan(0);
      expect(m.icon.trim().length, `${id} icon`).toBeGreaterThan(0);
    }
  });

  it("target は正・xpReward は非負の整数", () => {
    for (const id of ALL_IDS) {
      const m = MISSIONS[id];
      expect(m.target, `${id} target`).toBeGreaterThan(0);
      expect(Number.isInteger(m.target), `${id} target 整数`).toBe(true);
      expect(m.xpReward, `${id} xpReward`).toBeGreaterThanOrEqual(0);
      expect(Number.isInteger(m.xpReward), `${id} xpReward 整数`).toBe(true);
    }
  });
});

describe("readMissions — fresh day", () => {
  it("seeds exactly 3 distinct valid missions with empty progress/claimed", () => {
    const state = readMissions("2024-04-01");
    expect(state.date).toBe("2024-04-01");
    expect(state.missions).toHaveLength(3);
    // all picks are real mission ids
    for (const id of state.missions) expect(ALL_IDS).toContain(id);
    // no duplicates in the daily pick
    expect(new Set(state.missions).size).toBe(3);
    expect(state.progress).toEqual({});
    expect(state.claimed).toEqual({});
  });

  it("persists the freshly seeded record so a re-read returns it", () => {
    const first = readMissions("2024-04-01");
    const raw = window.localStorage.getItem(LS_KEYS.dailyMissions);
    expect(raw).not.toBeNull();
    const second = readMissions("2024-04-01");
    expect(second.missions).toEqual(first.missions);
  });
});

describe("dailySeededIds determinism", () => {
  it("yields the same daily pick for the same date", () => {
    const a = readMissions("2024-04-01").missions;
    window.localStorage.clear();
    const b = readMissions("2024-04-01").missions;
    expect(b).toEqual(a);
  });

  it("re-seeds for a new day when the stored date is stale", () => {
    seed({ date: "1999-01-01", missions: ["answer-10"], progress: { "answer-10": 99 }, claimed: {} });
    const state = readMissions("2024-04-01");
    expect(state.date).toBe("2024-04-01");
    expect(state.missions).toHaveLength(3);
    // stale progress is discarded on rollover
    expect(state.progress).toEqual({});
  });
});

describe("setMissionProgress — monotonic max", () => {
  it("keeps the highest value seen and never decreases", () => {
    setMissionProgress("answer-10", 5);
    setMissionProgress("answer-10", 3); // lower → ignored
    expect(readMissions().progress["answer-10"]).toBe(5);
    setMissionProgress("answer-10", 8); // higher → wins
    expect(readMissions().progress["answer-10"]).toBe(8);
  });
});

describe("incrementMission", () => {
  it("accumulates by delta from the current value", () => {
    incrementMission("answer-10"); // +1 → 1
    incrementMission("answer-10", 4); // +4 → 5
    expect(readMissions().progress["answer-10"]).toBe(5);
  });
});

describe("claimMission — threshold gating", () => {
  it("refuses to claim below target", () => {
    setMissionProgress("answer-10", 3); // target 10
    const res = claimMission("answer-10");
    expect(res).toEqual({ claimed: false, xp: 0 });
  });

  it("grants the reward once when target is met", () => {
    setMissionProgress("use-ai", MISSIONS["use-ai"].target); // target 1
    const res = claimMission("use-ai");
    expect(res).toEqual({ claimed: true, xp: MISSIONS["use-ai"].xpReward });
    expect(readMissions().claimed["use-ai"]).toBe(true);
  });

  it("is idempotent — a second claim grants nothing", () => {
    setMissionProgress("use-ai", MISSIONS["use-ai"].target);
    claimMission("use-ai");
    const again = claimMission("use-ai");
    expect(again).toEqual({ claimed: false, xp: 0 });
  });
});
