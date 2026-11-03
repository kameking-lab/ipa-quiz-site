import { describe, expect, it } from "vitest";
import { SA_2024_SPRING_Q1_INDUSTRIES } from "@/data/questions/afternoon/sa/2024-spring-industries";
import { PM_2024_SPRING_Q1_INDUSTRIES } from "@/data/questions/afternoon/pm/2024-spring-industries";

import { SM_2024_AUTUMN_Q1_INDUSTRIES } from "@/data/questions/afternoon/sm/2024-autumn-industries";
import { AU_2024_AUTUMN_Q1_INDUSTRIES } from "@/data/questions/afternoon/au/2024-autumn-industries";

describe.each([
  ["SA", SA_2024_SPRING_Q1_INDUSTRIES],
  ["PM", PM_2024_SPRING_Q1_INDUSTRIES],
  ["SM", SM_2024_AUTUMN_Q1_INDUSTRIES],
  ["AU", AU_2024_AUTUMN_Q1_INDUSTRIES],
] as const)("%s 2024 reviewed industry answers", (_exam, answers) => {
  it("covers all eight industries with complete answers within the actual prompt limits", () => {
    expect(answers).toHaveLength(8);
    for (const answer of answers) {
      expect(answer.essayA.trim().length, answer.industryId).toBeGreaterThan(0);
      expect(answer.essayA.length, answer.industryId).toBeLessThanOrEqual(800);
      expect(answer.essayI.length, answer.industryId).toBeGreaterThanOrEqual(800);
      expect(answer.essayI.length, answer.industryId).toBeLessThanOrEqual(1600);
      expect(answer.essayU.length, answer.industryId).toBeGreaterThanOrEqual(600);
      expect(answer.essayU.length, answer.industryId).toBeLessThanOrEqual(1200);
    }
  });
});
