import { describe, expect, it } from "vitest";
import { IPA_EXAM_INFO_URL, ipaSourceLabel, isPdfDocumentUrl } from "@/lib/exam-config";

describe("IPA source link labels", () => {
  it("labels only direct PDF documents as PDFs", () => {
    expect(isPdfDocumentUrl("https://www.ipa.go.jp/path/question.PDF?download=1")).toBe(true);
    expect(ipaSourceLabel("https://www.ipa.go.jp/path/question.pdf", "question")).toBe("問題PDF");
    expect(ipaSourceLabel("https://www.ipa.go.jp/path/answer.pdf", "answer")).toBe("公式解答PDF");
  });

  it("labels the fallback index honestly", () => {
    expect(isPdfDocumentUrl(IPA_EXAM_INFO_URL)).toBe(false);
    expect(ipaSourceLabel(IPA_EXAM_INFO_URL, "question")).toBe("IPA公式の過去問一覧");
    expect(ipaSourceLabel(IPA_EXAM_INFO_URL, "answer")).toBe("IPA公式の過去問一覧");
  });
});
