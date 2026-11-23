import { describe, expect, it } from "vitest";
import { getQuestionCanonicalRepresentative } from "@/lib/seo/question-canonical";
import type { Question } from "@/lib/questions/types";

function ordinary(id: string): Question {
  return { id, session: "am", exam: "ap", year: 2024, season: "spring", qNumber: 1,
    type: "multiple-choice", category: "基礎理論", topicTags: [], difficulty: 1,
    question: "問題", choices: { ア: "選択肢" }, answer: "ア", explanation: "解説", hasImage: false,
    sourcePdfUrl: "", license: "IPA-public" };
}
describe("cold canonical lookup", () => {
  it("avoids fingerprinting unrelated shared papers for an ordinary question", () => {
    const q = ordinary("ordinary");
    const shared = { ...q, id: "shared", session: "am1", get choices(): never { throw new Error("unneeded fingerprint"); } } as Question;
    expect(getQuestionCanonicalRepresentative([q, shared], q)).toBe(q);
  });
  it("preserves pool objects, missing IDs, and duplicate-ID resolution", () => {
    const first = ordinary("same");
    const last = { ...first, year: 2023 };
    expect(getQuestionCanonicalRepresentative([first], { ...first })).toBe(first);
    const missing = ordinary("missing");
    expect(getQuestionCanonicalRepresentative([first], missing)).toBe(missing);
    expect(getQuestionCanonicalRepresentative([first, last], first)).toBe(last);
  });
});
