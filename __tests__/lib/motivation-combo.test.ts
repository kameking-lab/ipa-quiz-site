import { describe, it, expect } from "vitest";
import { comboLevel } from "@/lib/motivation/combo";

describe("comboLevel", () => {
  it("3未満は none", () => {
    expect(comboLevel(0)).toBe("none");
    expect(comboLevel(1)).toBe("none");
    expect(comboLevel(2)).toBe("none");
  });

  it("3以上5未満は small（境界 3 を含む）", () => {
    expect(comboLevel(3)).toBe("small");
    expect(comboLevel(4)).toBe("small");
  });

  it("5以上は big（境界 5 を含む）", () => {
    expect(comboLevel(5)).toBe("big");
    expect(comboLevel(12)).toBe("big");
  });

  it("負値も none に倒れる", () => {
    expect(comboLevel(-1)).toBe("none");
  });
});
