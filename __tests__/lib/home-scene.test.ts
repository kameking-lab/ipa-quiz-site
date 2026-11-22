import { describe, expect, it } from "vitest";
import { homeSceneForHour } from "@/lib/home/home-scene";

describe("home landscape by local hour", () => {
  it.each([
    ["night", [0, 1, 2, 3, 4, 19, 20, 21, 22, 23]],
    ["morning", [5, 6, 7, 8, 9]],
    ["day", [10, 11, 12, 13, 14, 15]],
    ["evening", [16, 17, 18]],
  ] as const)("uses %s for every hour in its interval", (scene, hours) => {
    for (const hour of hours) expect(homeSceneForHour(hour)).toBe(scene);
  });
});
