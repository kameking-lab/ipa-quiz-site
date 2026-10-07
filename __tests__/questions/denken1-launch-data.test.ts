import { describe, expect, it } from "vitest";
import { DENKEN1_QUESTIONS } from "@/data/questions/denken1";
import { choiceDisplayLabel } from "@/lib/questions/display";
import { parseQuestionRoute, questionPagePath } from "@/lib/seo/question-url";

const KANA = [..."イロハニホヘトチリヌルヲワカヨ"];
const KEYS = [..."アイウエオカキクケコサシスセソ"];
// Read independently from the 2026-08-30 official answer PDF by subject/row.
const OFFICIAL = {
  theory: { session: "riron", number: 2, answers: [..."ロヘホカイ"], paper: "q01" },
  power: { session: "denryoku", number: 2, answers: [..."チハヲワリ"], paper: "q02" },
  machinery: { session: "kikai", number: 3, answers: [..."ホカヌチリ"], paper: "q03" },
  law: { session: "houki", number: 1, answers: [..."ハヘヲヌリ"], paper: "q04" },
} as const;

describe("denken1 2026 partial launch", () => {
  it("has precisely the five selected original questions and all five blanks", () => {
    expect(DENKEN1_QUESTIONS).toHaveLength(25);
    expect(new Set(DENKEN1_QUESTIONS.map((q) => q.id)).size).toBe(25);
    for (const [subject, sheet] of Object.entries(OFFICIAL)) {
      const rows = DENKEN1_QUESTIONS.filter((q) => q.subject === subject && q.qNumber === sheet.number);
      expect(rows).toHaveLength(5);
      rows.forEach((q, i) => {
        expect([q.exam, q.year, q.season, q.session, q.qNumber, q.part]).toEqual([
          "denken1", 2026, "primary", sheet.session, sheet.number, String(i + 1),
        ]);
        expect(q.officialAnswerNumber).toBe(sheet.answers[i]);
        expect(q.answer).toBe(KEYS[KANA.indexOf(sheet.answers[i])]);
        expect(q.sourcePdfUrl).toBe(`https://www.shiken.or.jp/chief/upload/20260830_ch_first_${sheet.paper}.pdf`);
        expect(q.sourceAnswerUrl).toBe("https://www.shiken.or.jp/chief/upload/20260830_ch_first_a01.pdf");
        expect(Object.keys(q.choices ?? {})).toEqual(KEYS);
        expect(Object.keys(q.choiceExplanations ?? {})).toEqual(KEYS);
        expect(Object.values(q.choiceExplanations ?? {}).every((v) => v.length > 20)).toBe(true);
        expect(q.question).toContain(`空欄(${i + 1})`);
        expect(parseQuestionRoute({ exam: q.exam, yearSeason: "2026-primary", section: q.session, qnum: `q${q.qNumber}-${q.part}` })).not.toBeNull();
        expect(questionPagePath(q)).toBe(`/q/denken1/2026-primary/${q.session}/q${q.qNumber}-${q.part}`);
      });
    }
  });

  it("displays the original kana labels and rejects foreign part numbering", () => {
    expect(KEYS.map((key) => choiceDisplayLabel("denken1", key as never))).toEqual(KANA.map((k) => `(${k})`));
    expect(parseQuestionRoute({ exam: "denken1", yearSeason: "2026-primary", section: "houki", qnum: "q1a" })).toBeNull();
  });
});
