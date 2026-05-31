import { describe, expect, it } from "vitest";

import {
  EXAM_CONFIGS,
  IPA_EXAM_INFO_URL,
  buildPdfUrl,
  buildRawPdfPath,
  getOfficialAnswerPdfUrl,
  getSafePdfUrl,
} from "@/lib/exam-config";

// These helpers derive the IPA 出典 (source) links shown at the foot of every
// /q explanation (CLAUDE.md §8) and the PDF crawl/parse paths used by the
// pipeline scripts. They are pure string transforms with no test coverage; the
// IPA filename convention they encode (_qs→_ans swap, year-2018 offset, h/a
// season codes) is easy to break silently on a refactor and would send users to
// a 404 or the wrong PDF.

describe("getSafePdfUrl", () => {
  it("passes through an https URL unchanged", () => {
    const url = "https://www.jitec.ipa.go.jp/x/2024h06h_ap_am_qs.pdf";
    expect(getSafePdfUrl(url)).toBe(url);
  });

  it("falls back to the IPA info page when absent", () => {
    expect(getSafePdfUrl(undefined)).toBe(IPA_EXAM_INFO_URL);
    expect(getSafePdfUrl("")).toBe(IPA_EXAM_INFO_URL);
  });

  it("rejects non-https (http/placeholder) values", () => {
    expect(getSafePdfUrl("http://example.com/a.pdf")).toBe(IPA_EXAM_INFO_URL);
    expect(getSafePdfUrl("TODO")).toBe(IPA_EXAM_INFO_URL);
  });
});

describe("getOfficialAnswerPdfUrl", () => {
  it("swaps a trailing _qs.pdf for _ans.pdf", () => {
    expect(
      getOfficialAnswerPdfUrl("https://www.jitec.ipa.go.jp/x/2024h06h_ap_am_qs.pdf"),
    ).toBe("https://www.jitec.ipa.go.jp/x/2024h06h_ap_am_ans.pdf");
  });

  it("only swaps the trailing token, not an interior _qs.pdf", () => {
    // No trailing _qs.pdf → returned as-is (CBT / non-standard URLs).
    const url = "https://www.jitec.ipa.go.jp/x/2024h06h_ap_am_qs.pdf?v=1";
    expect(getOfficialAnswerPdfUrl(url)).toBe(url);
  });

  it("returns the source itself for an https URL that is not a _qs.pdf", () => {
    const url = "https://www.ipa.go.jp/cbt/sample.pdf";
    expect(getOfficialAnswerPdfUrl(url)).toBe(url);
  });

  it("falls back to the IPA info page when absent or non-https", () => {
    expect(getOfficialAnswerPdfUrl(undefined)).toBe(IPA_EXAM_INFO_URL);
    expect(getOfficialAnswerPdfUrl("http://example.com/a_qs.pdf")).toBe(
      IPA_EXAM_INFO_URL,
    );
  });
});

describe("buildPdfUrl", () => {
  const ap = EXAM_CONFIGS.ap;
  const amCfg = ap.sessions[0];

  it("encodes the IPA spring (h / 1) filename convention", () => {
    // year 2024 → rr = 2024-2018 = "06"; spring → sn "1", sc "h".
    expect(buildPdfUrl(ap, 2024, "spring", amCfg, "qs")).toBe(
      "https://www.jitec.ipa.go.jp/1_04hanni_sukiru/mondai_kaitou_2024h06_1/" +
        "2024h06h_ap_am_qs.pdf",
    );
  });

  it("encodes the IPA autumn (a / 2) filename convention", () => {
    expect(buildPdfUrl(ap, 2024, "autumn", amCfg, "ans")).toBe(
      "https://www.jitec.ipa.go.jp/1_04hanni_sukiru/mondai_kaitou_2024h06_2/" +
        "2024h06a_ap_am_ans.pdf",
    );
  });

  it("zero-pads the year offset below 2028", () => {
    // 2019 → rr = "01".
    expect(buildPdfUrl(ap, 2019, "spring", amCfg, "qs")).toContain("2019h01_1/");
  });

  it("returns empty string for CBT seasons (no jitec URL)", () => {
    expect(buildPdfUrl(ap, 2024, "cbt", amCfg, "qs")).toBe("");
  });
});

describe("buildRawPdfPath", () => {
  it("includes the session prefix by default", () => {
    expect(buildRawPdfPath("ap", 2024, "spring", "am", "qs")).toBe(
      "ap/2024-spring/am_qs.pdf",
    );
  });

  it("omits the session prefix when noSessionPrefix is set (IP files)", () => {
    expect(buildRawPdfPath("ip", 2020, "spring", "am", "ans", true)).toBe(
      "ip/2020-spring/ans.pdf",
    );
  });
});
