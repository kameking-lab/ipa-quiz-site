import { describe, it, expect, beforeEach } from "vitest";
import {
  recordMockScore,
  getMockScores,
  getNickname,
  setNickname,
} from "@/lib/learning/mock-scores";

beforeEach(() => {
  window.localStorage.clear();
});

describe("recordMockScore / getMockScores", () => {
  it("returns no scores for a brand-new user", () => {
    expect(getMockScores()).toEqual([]);
  });

  it("stamps id + takenAt and appends in order", () => {
    const a = recordMockScore({ exam: "ap", score: 60, total: 80 });
    const b = recordMockScore({ exam: "fe", score: 40, total: 60 });
    expect(a.id).toBeTruthy();
    expect(a.takenAt).toBeGreaterThan(0);
    const scores = getMockScores();
    expect(scores.map((s) => s.id)).toEqual([a.id, b.id]);
    expect(scores[1].exam).toBe("fe");
  });
});

describe("nickname", () => {
  it("returns empty string when unset and round-trips a set value", () => {
    expect(getNickname()).toBe("");
    setNickname("studious-owl");
    expect(getNickname()).toBe("studious-owl");
  });
});

// read() returns a module-level empty object on the "no stored key" path.
// recordMockScore's state.scores.push() would corrupt it if it were shared by
// reference, leaking the entry into a later empty read.
describe("shared-empty footgun (absent-storage purity)", () => {
  it("does not leak a recorded score into a later empty read", () => {
    recordMockScore({ exam: "ap", score: 1, total: 1 }); // empty-path write
    window.localStorage.clear(); // key absent again
    expect(getMockScores()).toEqual([]);
  });
});
