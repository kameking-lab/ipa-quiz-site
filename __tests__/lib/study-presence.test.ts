import { expect, it } from "vitest";
import { parseStudyPresence, presenceExamName, isActiveStudyTab } from "@/lib/study-presence";
it("uses stable exam order on tied counts and only Japanese names", () => {
  const result = parseStudyPresence({ count: 2, exams: [{ exam: "fe", count: 1 }, { exam: "ap", count: 1 }] });
  expect(result?.exams.map(row => row.exam)).toEqual(["ap", "fe"]);
  expect(presenceExamName("fe")).toBe("基本情報技術者"); expect(presenceExamName("unknown")).toBeUndefined();
});
it.each([null, { count: 0, exams: null }, { count: 3, exams: [{ exam: "fe", count: 1 }] }, { count: 2, exams: [{ exam: "fe", count: 1 }, { exam: "fe", count: 1 }] }, { count: 1, exams: [{ exam: "unknown", count: 1 }] }, { count: 0, exams: [{ exam: "fe", count: 0 }] }])("fails closed on malformed snapshots", data => expect(parseStudyPresence(data)).toBeNull());
it("stops at the exact idle-window boundary and excludes hidden tabs", () => {
  expect(isActiveStudyTab(true, 0, 119_999)).toBe(true); expect(isActiveStudyTab(true, 0, 120_000)).toBe(false); expect(isActiveStudyTab(false, 0, 0)).toBe(false);
});

it("uses Japanese safety library names and the same hygiene qualification identity", () => {
  expect(presenceExamName("dai-1-shu-eisei-kanrisha")).toBe(presenceExamName("eisei1"));
  expect(presenceExamName("rodo-eisei-consultant")).toBe("労働衛生コンサルタント");
});
