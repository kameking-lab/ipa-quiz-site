import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { TOHAN_CATEGORIES, TOHAN_QUESTIONS } from "@/data/questions/tohan";
import { EXAM_CONFIGS } from "@/lib/exam-config";
import { getQualificationByExamCode, isExamPublished } from "@/lib/qualifications/catalog";
import { choiceDisplayLabel } from "@/lib/questions/display";
import { defaultPracticeSession } from "@/lib/questions/practice-session";
import { findQuestionByRoute, questionPagePath } from "@/lib/seo/question-url";
import { formatYearSeason } from "@/lib/utils";

/** 公式「令和７年度 関西広域連合 登録販売者試験 正答」PDF（R7touhan_kaitou.pdf）の問1〜120。 */
const OFFICIAL_KEY =
  "31535211455545323542" + "33512453322321421123" + "44412541324513532211" +
  "15332541224235455412" + "11433442323221535314" + "54322432523121541423";

const receipt = JSON.parse(
  readFileSync(path.join(process.cwd(), "reports/tohan-kansai-2025/source-receipt.json"), "utf8"),
) as {
  files: Record<string, { url: string; sha256: string }>;
  officialAnswerKey: Record<string, number>;
  yearSelection: { decision: string; reason: string };
};

const ZENHAN = "https://www.kouiki-kansai.jp/material/files/group/12/R7tourokuhannbaisyashiken_zennhan.pdf";
const KOUHAN = "https://www.kouiki-kansai.jp/material/files/group/12/R7tourokuhannbaisyashiken_kouhan.pdf";
const ANSWER = "https://www.kouiki-kansai.jp/material/files/group/12/R7touhan_kaitou.pdf";

const chapterOf = (n: number) =>
  n <= 20 ? "医薬品に共通する特性と基本的な知識"
    : n <= 60 ? "主な医薬品とその作用"
      : n <= 80 ? "人体の働きと医薬品"
        : n <= 100 ? "薬事に関する法規と制度"
          : "医薬品の適正使用と安全対策";

describe("登録販売者試験（関西広域連合）令和7年度 全120問", () => {
  it("公開済みで、年度・試験回・演習区分が決まっている", () => {
    expect(isExamPublished("tohan")).toBe(true);
    expect(getQualificationByExamCode("tohan")?.officialReuseTermsUrl).toBe("https://www.kouiki-kansai.jp/site/221.html");
    expect(defaultPracticeSession("tohan")).toBe("gakka");
    expect(formatYearSeason(2025, "kansai")).toBe("令和7年度 関西広域連合");
    expect(EXAM_CONFIGS.tohan.sessions[0]?.expectedQuestions).toBe(120);
    expect(EXAM_CONFIGS.tohan.sessions[0]?.categories).toEqual([...TOHAN_CATEGORIES]);
    expect(TOHAN_QUESTIONS).toHaveLength(120);
    expect(TOHAN_QUESTIONS.map((q) => q.qNumber)).toEqual(Array.from({ length: 120 }, (_, i) => i + 1));
  });

  it("正答は公式正答PDFと受領記録の両方に一致する", () => {
    expect(OFFICIAL_KEY).toHaveLength(120);
    for (const q of TOHAN_QUESTIONS) {
      const official = Number(OFFICIAL_KEY[q.qNumber - 1]);
      expect(q.officialAnswerNumber, q.id).toBe(String(official));
      expect(receipt.officialAnswerKey[String(q.qNumber)], q.id).toBe(official);
      expect(q.answer, q.id).toBe(["ア", "イ", "ウ", "エ", "オ"][official - 1]);
    }
    expect(receipt.yearSelection.reason).toContain("正答(例)");
  });

  it("手引きの試験項目を問番号の範囲どおりに付け、件数は20・40・20・20・20", () => {
    for (const q of TOHAN_QUESTIONS) expect(q.category, q.id).toBe(chapterOf(q.qNumber));
    const counts = Object.fromEntries(TOHAN_CATEGORIES.map((c) => [c, TOHAN_QUESTIONS.filter((q) => q.category === c).length]));
    expect(counts).toEqual({
      医薬品に共通する特性と基本的な知識: 20,
      人体の働きと医薬品: 20,
      主な医薬品とその作用: 40,
      薬事に関する法規と制度: 20,
      医薬品の適正使用と安全対策: 20,
    });
  });

  it("5肢すべてに解説と出典表記があり、表示データに利用条件の文言を含まない", () => {
    for (const q of TOHAN_QUESTIONS) {
      expect(Object.keys(q.choices ?? {}), q.id).toEqual(["ア", "イ", "ウ", "エ", "オ"]);
      for (const key of ["ア", "イ", "ウ", "エ", "オ"] as const) {
        expect(q.choices?.[key]?.trim().length, `${q.id}/${key}`).toBeGreaterThan(0);
        expect(q.choiceExplanations?.[key]?.trim().length, `${q.id}/${key}`).toBeGreaterThan(30);
      }
      expect(q.explanationCoverage, q.id).toBe("full");
      expect(q.explanation.startsWith(`正解は(${q.officialAnswerNumber})。`), q.id).toBe(true);
      expect(q.question, q.id).toMatch(/選べ。/);
      // ルビ除去後に本文・記述へ空白が紛れ込んでいない（成分表の列区切りは対象外）。
      const prose = q.question.split("\n").filter((line) => line.startsWith("ａ") || line.startsWith("ｂ") || line.startsWith("ｃ") || line.startsWith("ｄ") || /選べ。$/.test(line));
      for (const line of prose) expect(line, q.id).not.toMatch(/[ぁ-ん一-龥] [ぁ-ん一-龥]/);
      expect(q.sourcePdfUrl, q.id).toBe(q.qNumber <= 60 ? ZENHAN : KOUHAN);
      expect(q.sourceAnswerUrl, q.id).toBe(ANSWER);
      expect(q.sourceAttribution, q.id).toBe(
        `出典：関西広域連合 令和7年度 登録販売者試験（${q.qNumber <= 60 ? "前半" : "後半"}）問${q.qNumber}。ルビ・改行・表組みを整理。解説は本サイト作成。`,
      );
      // 出典表記・参考リンクに利用条件・許諾に関する文言を載せない（オーナー方針）。
      const shown = [q.sourceAttribution ?? "", ...(q.officialReferenceUrls ?? [])].join("\n");
      expect(shown, q.id).not.toMatch(/利用ルール|利用条件|CC BY|転載|許諾|加工して|site\/221/);
      expect(q.license, q.id).toBe("KANSAI-UNION-reuse");
      expect(q.hasImage, q.id).toBe(false);
    }
  });

  it("正しい組合せの肢だけが「正しい組合せ／正解」と説明される", () => {
    for (const q of TOHAN_QUESTIONS) {
      for (const [key, text] of Object.entries(q.choiceExplanations ?? {})) {
        const positive = /^(正しい組合せ|正解)。/.test(text);
        expect(positive, `${q.id}/${key}`).toBe(key === q.answer);
      }
    }
  });

  it("選択肢は原本と同じ(1)〜(5)で表示し、問題URLから引き直せる", () => {
    expect(choiceDisplayLabel("tohan", "ウ")).toBe("(3)");
    for (const q of TOHAN_QUESTIONS) {
      const [, , exam, yearSeason, section, qnum] = questionPagePath(q).split("/");
      expect(yearSeason, q.id).toBe("2025-kansai");
      expect(findQuestionByRoute(TOHAN_QUESTIONS, { exam, yearSeason, section, qnum })?.id, q.id).toBe(q.id);
    }
  });

  it("受領記録は公式PDFの取得元とハッシュを固定している", () => {
    expect(receipt.files["前半"]).toEqual(expect.objectContaining({ url: ZENHAN, sha256: "a277785add1961bc8260433ba8419b16a87596dbbb171f41a7d5b07c9d4a6156" }));
    expect(receipt.files["後半"]).toEqual(expect.objectContaining({ url: KOUHAN, sha256: "9e24049f58689aa346163962e0b140df3ba1b5ad9917b4e2a2a7350b02e295ba" }));
    expect(receipt.files["解答"]).toEqual(expect.objectContaining({ url: ANSWER, sha256: "1a67d7327ae77c79ab46c09daf8a3787fd10a1828c591b80242b6114d5c67724" }));
  });
});
