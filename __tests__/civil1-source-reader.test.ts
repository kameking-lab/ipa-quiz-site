import { describe, expect, it } from "vitest";
import { CIVIL1_QUESTIONS, toCivil1Questions, type Civil1Source } from "@/data/questions/civil1";
import paperA from "@/data/questions/civil1/2026-july-a.json";

// A converter fixture tests metadata only; it is never registered as an exam original.
const fixture = (): Civil1Source => ({
  ...(paperA as Civil1Source),
  year: 2025,
  lastUpdated: "2026-10-11",
  questions: [{ ...paperA.questions[0]!, imageUrl: undefined }],
});

describe("civil1 source reader", () => {
  it("uses the source year for attribution, ID and update metadata", () => {
    const [question] = toCivil1Questions(fixture());
    expect(question!.id).toBe("civil1-2025-july-mondai-a-q1");
    expect(question!.sourceAttribution).toContain("令和7年度1級土木");
    expect(question!.sourceAttribution).not.toContain("令和8年度");
    expect(question!.lastUpdated).toBe("2026-10-11");
  });

  it("preserves the public 2026 pool and its explicit B7 hold", () => {
    expect(CIVIL1_QUESTIONS).toHaveLength(100);
    expect(CIVIL1_QUESTIONS.every((question) => question.year === 2026)).toBe(true);
    expect(CIVIL1_QUESTIONS.some((question) => question.session === "mondai-b" && question.qNumber === 7)).toBe(false);
    expect(CIVIL1_QUESTIONS.every((question) => question.lastUpdated === "2026-09-26")).toBe(true);
    expect(CIVIL1_QUESTIONS[0]!.sourceAttribution).toContain("令和8年度1級土木");
  });

  it("refuses explicitly unaccepted draft and held sources", () => {
    for (const publicationStatus of ["draft", "held"] as const) {
      expect(() => toCivil1Questions({ ...fixture(), publicationStatus })).toThrow("Unaccepted civil1");
    }
  });

  it("refuses duplicate official question numbers within a paper", () => {
    const source = fixture();
    source.questions.push({ ...source.questions[0]! });
    expect(() => toCivil1Questions(source)).toThrow("Duplicate or invalid");
  });

  it("refuses a missing choice explanation instead of publishing partial coverage", () => {
    const source = fixture();
    source.questions[0]!.choiceExplanations = ["", "理由", "理由", "理由"];
    expect(() => toCivil1Questions(source)).toThrow("Invalid civil1");
  });
});
