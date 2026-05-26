import { describe, expect, it } from "vitest";

import {
  RESPONSE_LENGTH_LABEL,
  buildResponseLengthDirective,
  type ResponseLength,
} from "@/lib/ai/prompts";

describe("buildResponseLengthDirective", () => {
  it("states an explicit, non-exceedable line cap matching each label", () => {
    // Label '3行' -> directive caps at 3 lines, etc. No '5〜7行'-style ranges
    // that contradict the label (即修正⑤).
    expect(buildResponseLengthDirective("short")).toContain("3行以内");
    expect(buildResponseLengthDirective("medium")).toContain("5行以内");
    expect(buildResponseLengthDirective("long")).toContain("10行以内");
  });

  it("frames medium/long as hard caps, not loose 目安", () => {
    expect(buildResponseLengthDirective("medium")).toContain("超えてはいけません");
    expect(buildResponseLengthDirective("long")).toContain("超えてはいけません");
  });

  it("labels match the directive line counts", () => {
    const expectedLine: Record<ResponseLength, string> = {
      short: "3行",
      medium: "5行",
      long: "10行",
    };
    for (const len of ["short", "medium", "long"] as ResponseLength[]) {
      expect(RESPONSE_LENGTH_LABEL[len]).toBe(expectedLine[len]);
      expect(buildResponseLengthDirective(len)).toContain(`${expectedLine[len]}以内`);
    }
  });
});
