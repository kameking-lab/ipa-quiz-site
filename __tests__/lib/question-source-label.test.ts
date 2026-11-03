import { describe, expect, it } from "vitest";
import { questionSourceExam, questionSourceEdition } from "@/lib/questions/source-label";
import { EXAM_CONFIGS, getOfficialAnswerPdfUrl } from "@/lib/exam-config";
import { examLabel, EXAM_LABELS } from "@/lib/utils";
import { getQuestionsByExamStrict, groupByYearSeason } from "@/lib/seo/exam-meta";

describe("original exam provenance", () => {
  it("does not attribute borrowed common AM1 papers to an exam held in the opposite season", () => {
    expect(questionSourceExam({ exam: "st", year: 2012, season: "spring", session: "am1" })).toBe("高度試験共通");
    expect(questionSourceExam({ exam: "st", year: 2012, season: "autumn", session: "am2" })).toBe("ITストラテジスト");
  });
  it("preserves the special and October exam names", () => {
    expect(questionSourceEdition({year:2011,season:"spring",sourcePdfUrl:"https://www.ipa.go.jp/2011h23tokubetsu_ap_am_qs.pdf"})).toBe("2011年度 特別試験");
    expect(questionSourceEdition({year:2020,season:"autumn",sourcePdfUrl:""})).toBe("令和2年度 10月試験");
  });
  it("uses the official publication month for safety manager source papers", () => {
    expect(questionSourceEdition({year:2025,season:"published",sourcePdfUrl:"https://www.exam.or.jp/wp-content/uploads/2025/10/LC20252114.pdf"})).toBe("2025年10月公表問題");
    expect(questionSourceEdition({year:2026,season:"published",sourcePdfUrl:"https://www.exam.or.jp/wp-content/uploads/2026/04/LC20260415-1.pdf"})).toBe("2026年4月公表問題");
    expect(questionSourceEdition({year:2025,season:"published",sourcePdfUrl:"https://example.com/questions.pdf"})).toBe("2025年公表問題");
    expect(questionSourceEdition({year:2025,season:"published",sourcePdfUrl:"https://www.jafp.or.jp/exam/mohan/files/g2_202505_qa.pdf"})).toBe("2025年5月公表問題");
    expect(questionSourceEdition({year:2026,season:"published",sourcePdfUrl:"https://www.jafp.or.jp/exam/mohan/files/g2_202605_qa.pdf"})).toBe("2026年5月公表問題");
  });
  it.each([
    ["kangoshi", 2024, "第114回（2025年実施）"],
    ["kangoshi", 2025, "第115回（2026年実施）"],
    ["rigaku-ryohoshi", 2025, "第60回（2025年実施）"],
    ["rigaku-ryohoshi", 2026, "第61回（2026年実施）"],
    ["sagyo-ryohoshi", 2024, "第60回（2025年実施）"],
    ["sagyo-ryohoshi", 2025, "第61回（2026年実施）"],
    ["shino-kunrenshi", 2024, "第55回（2025年実施）"],
    ["shino-kunrenshi", 2025, "第56回（2026年実施）"],
  ] as const)("identifies %s stored year %i by its official round and exam year", (exam, storedYear, label) => {
    const questions = getQuestionsByExamStrict(exam).filter(q => q.year === storedYear);
    expect(questions.length).toBeGreaterThan(0);
    expect(new Set(questions.map(questionSourceEdition))).toEqual(new Set([label]));
    const group = groupByYearSeason(questions)[0];
    expect(group).toMatchObject({ key: `${storedYear}-annual`, year: storedYear, label, count: questions.length });
  });
  it("does not infer medical exam years from arbitrary upload dates or other hosts", () => {
    const path = "/seisakunitsuite/bunya/kenkou_iryou/iryou/topics/dl/";
    expect(questionSourceEdition({ year: 2025, season: "annual", sourcePdfUrl: `https://example.com${path}tp260424-09a_01.pdf` })).toBe("令和7年度");
    expect(questionSourceEdition({ year: 2025, season: "annual", sourcePdfUrl: `https://www.mhlw.go.jp${path}tp270424-09a_01.pdf` })).toBe("令和7年度");
  });
  it("uses the actual answer link rather than inventing a CMS hash", () => {
    expect(getOfficialAnswerPdfUrl("https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000f3yi-att/2009h21a_ap_am_qs.pdf")).toBe("https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000f3yi-att/2009h21a_ap_am_ans.pdf");
  });
  it.each([
    ["hokenshi", "保健師"],
    ["josanshi", "助産師"],
    ["rigaku-ryohoshi", "理学療法士"],
    ["sagyo-ryohoshi", "作業療法士"],
    ["shino-kunrenshi", "視能訓練士"],
  ] as const)("uses the existing Japanese name for %s on questions and quizzes", (exam, label) => {
    expect(EXAM_CONFIGS[exam].nameFull).toBe(`${label}国家試験`);
    expect(EXAM_LABELS[exam]).toBe(label);
    expect(examLabel(exam)).toBe(label);
    expect(questionSourceExam({ exam, year: 2024, season: "annual", session: "am" })).toBe(label);
    expect(questionSourceExam({ exam, year: 2025, season: "annual", session: "pm" })).toBe(label);
  });
});
