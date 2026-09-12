import { describe, expect, it } from "vitest";
import { questionSourceExam, questionSourceEdition } from "@/lib/questions/source-label";
import { getOfficialAnswerPdfUrl } from "@/lib/exam-config";

describe("original exam provenance", () => {
  it("does not attribute borrowed common AM1 papers to an exam held in the opposite season", () => {
    expect(questionSourceExam({ exam: "st", year: 2012, season: "spring", session: "am1" })).toBe("高度試験共通");
    expect(questionSourceExam({ exam: "st", year: 2012, season: "autumn", session: "am2" })).toBe("ITストラテジスト");
  });
  it("preserves the special and October exam names", () => {
    expect(questionSourceEdition({year:2011,season:"spring",sourcePdfUrl:"https://www.ipa.go.jp/2011h23tokubetsu_ap_am_qs.pdf"})).toBe("2011年度 特別試験");
    expect(questionSourceEdition({year:2020,season:"autumn",sourcePdfUrl:""})).toBe("令和2年度 10月試験");
  });
  it("uses the actual answer link rather than inventing a CMS hash", () => {
    expect(getOfficialAnswerPdfUrl("https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000f3yi-att/2009h21a_ap_am_qs.pdf")).toBe("https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000f3yi-att/2009h21a_ap_am_ans.pdf");
  });
});
